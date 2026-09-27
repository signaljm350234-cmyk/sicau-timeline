"""校验 data/events.js（JSON 子集）：
用法: python tools/validate_data.py
退出码 0 = 0 错误；1 = 有错误。
"""
import json
import os
import re
import sys
from collections import Counter

try:
    sys.stdout.reconfigure(encoding="gbk", errors="replace")
    sys.stderr.reconfigure(encoding="gbk", errors="replace")
except Exception:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "data", "events.js")

CATEGORIES = {"competition", "second_classroom", "evaluation", "course", "award"}
LEVELS = {"国家级", "省级", "校级", "院级"}
SEMESTERS = {"%d-%d-%d" % (y, y + 1, s) for y in range(2025, 2029) for s in (1, 2)}
CONFIDENCE = {"confirmed", "pattern", "predicted"}
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
ID_RE = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")

errors = []
warnings = []


def err(eid, msg):
    errors.append("[%s] %s" % (eid, msg))


def load_events():
    text = open(SRC, encoding="utf-8").read()
    i, j = text.index("["), text.rindex("]") + 1
    return json.loads(text[i:j])


def check_date(eid, field, d, allow_empty=True):
    if d == "" and allow_empty:
        return
    if not DATE_RE.match(d):
        err(eid, "%s 日期格式非法: %r" % (field, d))


def main():
    events = load_events()
    ids = set()
    for e in events:
        eid = e.get("id", "?")
        for f in ("id", "title", "categories", "level", "organizer", "audience_tag",
                  "semester", "registration", "event", "points", "sources",
                  "confidence", "basis", "recurring", "notes"):
            if f not in e:
                err(eid, "缺字段 %s" % f)
        if eid in ids:
            err(eid, "id 重复")
        ids.add(eid)
        if not ID_RE.match(eid):
            err(eid, "id 非 kebab-case")
        if not e.get("title"):
            err(eid, "title 为空")
        cats = e.get("categories") or []
        if not cats or any(c not in CATEGORIES for c in cats):
            err(eid, "categories 非法: %r" % cats)
        if e.get("level") not in LEVELS:
            err(eid, "level 非法: %r" % e.get("level"))
        if e.get("semester") not in SEMESTERS:
            err(eid, "semester 非法: %r" % e.get("semester"))
        conf = e.get("confidence")
        if conf not in CONFIDENCE:
            err(eid, "confidence 非法: %r" % conf)
        if conf in ("pattern", "predicted") and not (e.get("basis") or "").strip():
            err(eid, "%s 必须有 basis" % conf)
        reg = e.get("registration") or {}
        ev = e.get("event") or {}
        for name, obj, order in (("registration", reg, True), ("event", ev, True)):
            if not isinstance(obj, dict) or "start" not in obj or "end" not in obj:
                err(eid, "%s 结构非法" % name)
                continue
            check_date(eid, name + ".start", obj.get("start", ""))
            check_date(eid, name + ".end", obj.get("end", ""))
            s, t = obj.get("start", ""), obj.get("end", "")
            if s and t and s > t:
                err(eid, "%s 起止倒置: %s > %s" % (name, s, t))
        rs, re_ = reg.get("start", ""), reg.get("end", "")
        es = ev.get("start", "")
        if rs and es and rs > es:
            err(eid, "报名晚于活动开始: %s > %s" % (rs, es))
        pts = e.get("points") or {}
        if not isinstance(pts, dict) or "second_classroom" not in pts or "zongce" not in pts:
            err(eid, "points 结构非法")
        srcs = e.get("sources") or []
        if not srcs:
            err(eid, "sources 为空")
        for s in srcs:
            for f in ("title", "url", "published", "accessed"):
                if f not in s:
                    err(eid, "source 缺字段 %s" % f)
            if not str(s.get("url", "")).startswith(("http://", "https://")):
                err(eid, "source url 非法: %r" % s.get("url"))
            p = s.get("published", "")
            if p:
                check_date(eid, "source.published", p)
        if not isinstance(e.get("recurring"), bool):
            err(eid, "recurring 必须为 boolean")

    # 统计
    stats = {
        "total": len(events),
        "by_semester": Counter(e.get("semester") for e in events),
        "by_category": Counter(c for e in events for c in (e.get("categories") or [])),
        "by_confidence": Counter(e.get("confidence") for e in events),
    }
    print("=== 统计 ===")
    print("总量:", stats["total"])
    for sem in sorted(SEMESTERS):
        print("  %s: %d" % (sem, stats["by_semester"].get(sem, 0)))
    for c, n in stats["by_category"].most_common():
        print("  类别 %s: %d" % (c, n))
    for c, n in stats["by_confidence"].most_common():
        print("  置信 %s: %d" % (c, n))
    empty_src = sum(1 for e in events if not (e.get("sources") or []))
    print("无来源条目:", empty_src)

    if warnings:
        print("=== 警告 ===")
        for w in warnings:
            print(w)
    if errors:
        print("=== 错误 (%d) ===" % len(errors))
        for e in errors:
            print(e)
        return 1
    print("0 错误 ✔")
    return 0


if __name__ == "__main__":
    sys.exit(main())
