"""对指定详情页文件做日期密集提取：所有日期模式 ±110 字符上下文，去重后输出。"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TXT = os.path.join(ROOT, "research", "txt")
OUT = os.path.join(ROOT, "research", "digests")

WANT = ["061", "062", "064", "066", "070", "071", "072", "073", "074", "125", "131", "132", "034", "035", "058", "059"]
DATE1 = re.compile(r"\d{1,2}\s*月\s*\d{1,2}\s*日")
DATE2 = re.compile(r"20\d\d[-/年]\s*\d{1,2}[-/月]\s*\d{1,2}\s*日?")

files = {}
for path in glob.glob(os.path.join(TXT, "*.txt")):
    seq = os.path.basename(path).split("__")[0].split("_")[0]
    if seq in WANT:
        files[seq] = path

with open(os.path.join(OUT, "details_digest2.txt"), "w", encoding="utf-8") as out:
    for seq in WANT:
        path = files.get(seq)
        if not path:
            continue
        base = os.path.basename(path)[:-4]
        text = open(path, encoding="utf-8").read()
        body = text.split("### TEXT", 1)[-1]
        body = re.sub(r"^.*?网站首页", "", body)
        body = re.sub(r"\s+", " ", body)
        spans, seen = [], set()
        for m in list(DATE1.finditer(body)) + list(DATE2.finditer(body)):
            a, b = max(0, m.start() - 110), min(len(body), m.end() + 110)
            key = body[a + 40: b - 40]
            if key in seen:
                continue
            seen.add(key)
            spans.append((m.start(), body[a:b]))
        spans.sort()
        out.write("\n===== %s =====\n" % base)
        for _, s in spans[:40]:
            out.write("- ..." + s + "...\n")
print("done")
