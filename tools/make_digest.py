"""汇总 research/txt 中所有列表条目的 (文件, 日期, 标题, 相对链接) 到 research/digests/links_digest.txt。"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TXT = os.path.join(ROOT, "research", "txt")
OUT = os.path.join(ROOT, "research", "digests")
os.makedirs(OUT, exist_ok=True)
pat = re.compile(r"^(.*)\t(.*)\t(20\d\d-\d\d-\d\d)$")

rows = []
for path in sorted(glob.glob(os.path.join(TXT, "*.txt"))):
    base = os.path.basename(path)[:-4]
    section = None
    for line in open(path, encoding="utf-8"):
        line = line.rstrip("\n")
        if line.startswith("### "):
            section = line[4:]
            continue
        if section != "LINKS":
            continue
        m = pat.match(line)
        if m:
            href, title, date = m.groups()
            rows.append((base.split("__")[0], base, date, title.strip(), href))

rows.sort(key=lambda r: r[2], reverse=True)
with open(os.path.join(OUT, "links_digest.txt"), "w", encoding="utf-8") as f:
    for seq, base, date, title, href in rows:
        f.write("%s\t%s\t%s\t%s\n" % (date, seq, title, href))
print("rows:", len(rows))
