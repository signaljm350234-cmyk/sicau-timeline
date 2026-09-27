"""在 research/来源清单.md 追加“events.js 引用来源总表”（唯一 URL + 被引用次数 + 最近发布日期）。"""
import json
import os
import re
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
events = json.loads(text[text.index("["):text.rindex("]") + 1])

agg = defaultdict(lambda: {"title": "", "published": "", "count": 0, "events": []})
for e in events:
    for s in e.get("sources", []):
        a = agg[s["url"]]
        a["count"] += 1
        if s.get("published") and s["published"] > a["published"]:
            a["published"] = s["published"]
        if not a["title"]:
            a["title"] = s["title"]
        a["events"].append(e["id"])

with open(os.path.join(ROOT, "research", "来源清单.md"), "a", encoding="utf-8") as f:
    f.write("\n## events.js 引用来源总表（%d 个唯一 URL）\n\n" % len(agg))
    f.write("| 最近发布日期 | 标题 | URL | 被引用事件数 |\n|---|---|---|---|\n")
    for url, a in sorted(agg.items(), key=lambda kv: kv[1]["published"], reverse=True):
        f.write("| %s | %s | %s | %d |\n" % (a["published"] or "-", a["title"][:70], url, a["count"]))
    f.write("\n> 每事件的具体引用与≤80字要点见 data/events.js 对应条目（points/notes 字段）。\n")
print("unique urls:", len(agg))
