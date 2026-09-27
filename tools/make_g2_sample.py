"""从 events.js 生成 G2 核对样本（随机15条，含各 confidence）+ 完整统计。"""
import json
import os
import random
import sys

sys.stdout.reconfigure(encoding="gbk", errors="replace")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
events = json.loads(text[text.index("["):text.rindex("]") + 1])

random.seed(20260926)
by_conf = {"confirmed": [], "pattern": [], "predicted": []}
for e in events:
    by_conf[e["confidence"]].append(e)

sample = (random.sample(by_conf["confirmed"], 8)
          + random.sample(by_conf["pattern"], 5)
          + random.sample(by_conf["predicted"], 2))
out = []
for e in sample:
    reg = e["registration"]
    ev = e["event"]
    line = ("### %s\n- 学期: %s ｜ 类别: %s ｜ 级别: %s ｜ 置信: %s\n"
            "- 报名: %s ~ %s（%s）\n- 活动: %s ~ %s（%s）\n- 来源: %s\n- basis: %s\n"
            % (e["title"], e["semester"], "/".join(e["categories"]), e["level"],
               e["confidence"], reg["start"] or "-", reg["end"] or "-", reg["note"],
               ev["start"] or "-", ev["end"] or "-", ev["note"],
               "; ".join(s["url"] for s in e["sources"]), e["basis"] or "-"))
    out.append(line)
with open(os.path.join(ROOT, "research", "digests", "g2_sample.txt"), "w", encoding="utf-8") as f:
    f.write("\n".join(out))
print("sample written:", len(sample))
