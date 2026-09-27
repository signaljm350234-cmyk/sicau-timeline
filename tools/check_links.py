"""抽检 events.js 中 10 个随机来源 URL 的可访问性（HTTP<400 即通过）。"""
import json
import os
import random
import sys

import requests

ROOT = r"D:\AI Design\sicau-timeline"
text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
events = json.loads(text[text.index("["):text.rindex("]") + 1])
urls = sorted({s["url"] for e in events for s in e["sources"]})
random.seed(7)
sample = random.sample(urls, 10)
ua = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"}
ok = 0
for u in sample:
    try:
        r = requests.get(u, timeout=20, headers=ua)
        good = r.status_code < 400
        ok += good
        print("%s %s %s" % ("PASS" if good else "FAIL", r.status_code, u))
    except Exception as exc:  # noqa: BLE001
        print("FAIL %s %s" % (type(exc).__name__, u))
print("== %d/10 可访问 ==" % ok)
sys.exit(0 if ok == 10 else 1)
