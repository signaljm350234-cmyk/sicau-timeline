"""校验 events.js 引用的每个 URL 是否在 fetch_log 中有 ok 记录（即已打开原文）。
输出缺失清单到 research/urls_missing.txt（可直接追加进 urls.txt 再抓取）。
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
events = json.loads(text[text.index("["):text.rindex("]") + 1])

ok = set()
for line in open(os.path.join(ROOT, "research", "raw", "fetch_log.tsv"), encoding="utf-8"):
    p = line.rstrip("\n").split("\t")
    if len(p) >= 3 and p[2] == "ok":
        ok.add(p[1].strip())

refs = {}
for e in events:
    for s in e.get("sources", []):
        refs.setdefault(s["url"].strip(), set()).add(e["id"])

missing = {u: ids for u, ids in refs.items() if u not in ok}
with open(os.path.join(ROOT, "research", "urls_missing.txt"), "w", encoding="utf-8") as f:
    f.write("# 以下 URL 被 events.js 引用但尚未打开原文，需补抓\n")
    for u in sorted(missing):
        f.write("refill\t%s\n" % u)
print("referenced:", len(refs), "already-ok:", len(refs) - len(missing), "missing:", len(missing))
for u in sorted(missing):
    print("MISS", u, sorted(missing[u])[:2])
