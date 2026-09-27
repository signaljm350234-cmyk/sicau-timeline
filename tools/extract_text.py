"""把 research/raw/*.html 转为 research/txt/*.txt：
- LINKS 段：所有站内链接 + 锚文本 + 邻近日期（用于发现详情页/列表分页）
- TEXT 段：去脚本样式后的正文文本（whitespace 折叠）
"""
import glob
import os
import re

from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "research", "raw")
OUT = os.path.join(ROOT, "research", "txt")
os.makedirs(OUT, exist_ok=True)

DATE_RE = re.compile(r"(20\d{2})[-/.年](\d{1,2})[-/.月](\d{1,2})")
SKIP_HREF = re.compile(r"^(javascript:|mailto:|#|tel:)", re.I)


def norm_date(m):
    return "%s-%02d-%02d" % (m.group(1), int(m.group(2)), int(m.group(3)))


def clean(s):
    return re.sub(r"\s+", " ", s or "").strip()


def main():
    for path in sorted(glob.glob(os.path.join(RAW, "*.html"))):
        base = os.path.basename(path)[:-5]
        with open(path, encoding="utf-8", errors="replace") as f:
            soup = BeautifulSoup(f.read(), "lxml")
        for t in soup(["script", "style", "noscript"]):
            t.decompose()

        lines = []
        title = clean(soup.title.get_text()) if soup.title else ""
        lines.append("### TITLE: " + title)
        lines.append("### LINKS")
        seen = set()
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            if SKIP_HREF.match(href):
                continue
            text = clean(a.get_text())
            if not text:
                continue
            ctx = a
            blob = ""
            for _ in range(3):
                ctx = ctx.parent
                if ctx is None:
                    break
                blob = clean(ctx.get_text())
                if DATE_RE.search(blob) or len(blob) > 60:
                    break
            dm = DATE_RE.search(blob)
            date = norm_date(dm) if dm else ""
            key = (href, text)
            if key in seen:
                continue
            seen.add(key)
            lines.append("%s\t%s\t%s" % (href, text[:90], date))
        lines.append("### TEXT")
        body = clean(soup.get_text(" "))
        lines.append(body[:20000])
        with open(os.path.join(OUT, base + ".txt"), "w", encoding="utf-8") as f:
            f.write("\n".join(lines))
        print("ok", base, "links=%d text=%d" % (len(seen), min(len(body), 20000)))


if __name__ == "__main__":
    main()
