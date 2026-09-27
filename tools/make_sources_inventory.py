"""生成 research/来源清单.md：
1) 抓取台账（来自 fetch_log.tsv）
2) 页面标题回溯（来自 research/txt TITLE）
3) 关键来源人工整理区（占位，后续补充）
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "research", "raw")
TXT = os.path.join(ROOT, "research", "txt")
LOG = os.path.join(RAW, "fetch_log.tsv")

rows = []
for line in open(LOG, encoding="utf-8"):
    p = line.rstrip("\n").split("\t")
    if len(p) < 8:
        continue
    tag, url, status, code, enc, seq, note, ts = p[:8]
    rows.append(dict(tag=tag, url=url, status=status, code=code, enc=enc, seq=seq, note=note, ts=ts))

titles = {}
for name in os.listdir(TXT):
    if not name.endswith(".txt"):
        continue
    seq = name.split("__")[0]
    try:
        with open(os.path.join(TXT, name), encoding="utf-8") as f:
            for line in f:
                if line.startswith("### TITLE:"):
                    titles[seq] = line[10:].strip()
                    break
    except Exception:
        pass

ok = [r for r in rows if r["status"] == "ok"]
fail = [r for r in rows if r["status"] != "ok"]

with open(os.path.join(ROOT, "research", "来源清单.md"), "w", encoding="utf-8") as f:
    f.write("# 来源清单（research/来源清单.md）\n\n")
    f.write("- 抓取方式：tools/fetch_sources.py，串行限速 1.5s/请求，失败重试≤2 次，仅只读访问公开页面；\n")
    f.write("- 未登录任何系统、未提交表单；i川农/教务系统内页等需登录页面一律未尝试；\n")
    f.write("- 抓取时间：2026-09-26；页面编码已统一转 UTF-8 存档于 research/raw/。\n\n")
    f.write("## 抓取台账（成功 %d 条 / 失败 %d 条）\n\n" % (len(ok), len(fail)))
    f.write("| seq | tag | 页面标题 | URL | 状态 |\n|---|---|---|---|---|\n")
    for r in rows:
        f.write("| %s | %s | %s | %s | %s |\n" % (
            r["seq"], r["tag"], titles.get(r["seq"], "-")[:60], r["url"], r["status"]))
    f.write("\n## 失败记录（不可公开获取或已失效）\n\n")
    for r in fail:
        f.write("- `%s` → %s（%s）\n" % (r["url"], r["note"], r["tag"]))
    f.write("\n> 失败原因说明：cxcy.sicau.edu.cn（创新创业信息网）域名 DNS 解析失败，多次重试不可达；\n")
    f.write("> jiaowu 旧版相对路径一批 404（已用正确路径替代）；xgxt.sicau.edu.cn 仅返回 JS 跳转壳（学生管理系统需登录，未尝试）。\n")
    f.write("\n## 关键来源（用于 events.js 的来源，含发布日期与原文摘录）\n\n")
    f.write("（见 data/events.js 中各事件 sources 字段；同一 URL 在多个事件中复用。摘录均≤80字，原文可在 research/raw 对应文件中复核。）\n")

print("ok rows:", len(ok), "fail rows:", len(fail))
