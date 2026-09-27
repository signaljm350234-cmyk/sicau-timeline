"""对 research/txt 中的详情页做要点提取：日期上下文 + 关键句子。
输出 research/digests/details_digest.txt"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TXT = os.path.join(ROOT, "research", "txt")
OUT = os.path.join(ROOT, "research", "digests")
os.makedirs(OUT, exist_ok=True)

DATE1 = re.compile(r"\d{1,2}月\d{1,2}日")
DATE2 = re.compile(r"20\d\d[-/年]\d{1,2}[-/月]\d{1,2}日?")
KEY = re.compile(r"(时间|报名|截止|截 止|初赛|复赛|决赛|答辩|材料|提交|评选|对象|要求|加分|成绩|资格|范围|流程|安排|比赛|评审)")

# 只看详情页（编号 >= 061 且文件较短或含详情特征），列表页略过
targets = []
for path in sorted(glob.glob(os.path.join(TXT, "*.txt"))):
    base = os.path.basename(path)
    seq = int(base.split("__")[0].split("_")[0]) if base.split("__")[0].split("_")[0].isdigit() else -1
    if seq < 60:
        continue
    targets.append(path)

with open(os.path.join(OUT, "details_digest.txt"), "w", encoding="utf-8") as out:
    for path in targets:
        base = os.path.basename(path)[:-4]
        text = open(path, encoding="utf-8").read()
        title = ""
        for line in text.splitlines():
            if line.startswith("### TITLE:"):
                title = line[10:].strip()
                break
        body = text.split("### TEXT", 1)[-1]
        # 去掉常见导航前缀
        body = re.sub(r"^.*?网站首页", "", body)
        sents = re.split(r"(?<=[。；;])", body)
        picked = []
        for s in sents:
            s = s.strip()
            if not s:
                continue
            if DATE1.search(s) or DATE2.search(s):
                if len(s) > 300:
                    # 太长，取日期两侧
                    m = DATE1.search(s) or DATE2.search(s)
                    a = max(0, m.start() - 60)
                    s = s[a:a + 220]
                picked.append(s)
        # 去重并限制条数
        seen, uniq = set(), []
        for p in picked:
            k = p[:40]
            if k in seen:
                continue
            seen.add(k)
            uniq.append(p)
        out.write("\n===== %s | %s =====\n" % (base, title))
        for p in uniq[:26]:
            out.write("- " + p + "\n")
print("targets:", len(targets))
