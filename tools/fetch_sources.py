"""限速只读抓取器：抓取公开页面并转存 UTF-8 到 research/raw/。

用法：
  python tools/fetch_sources.py                # 抓取 research/urls.txt 中所有未完成条目
  python tools/fetch_sources.py --retry-failed # 重试日志中失败的条目

约定：
- 不登录、不提交表单、不绕过验证码；遇到登录墙/验证码直接放弃并记录。
- 串行 + 每个请求间隔 >=1.5s；失败重试 <=2 次；记录 HTTP 状态。
- urls.txt 每行: tag<TAB>url  （tag 用于文件名与来源清单归类）
- 幂等：日志中已有 ok 记录的 URL 跳过。
"""
import hashlib
import os
import re
import sys
import time
from datetime import datetime

import requests

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "research", "raw")
URLS = os.path.join(ROOT, "research", "urls.txt")
LOG = os.path.join(RAW, "fetch_log.tsv")
DELAY = 1.5
RETRIES = 2
TIMEOUT = 30
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")

os.makedirs(RAW, exist_ok=True)


def load_log():
    done, failed = set(), set()
    if os.path.exists(LOG):
        with open(LOG, encoding="utf-8") as f:
            for line in f:
                parts = line.rstrip("\n").split("\t")
                if len(parts) < 7:
                    continue
                tag, url, status, code = parts[0], parts[1], parts[2], parts[3]
                if status == "ok":
                    done.add(url)
                else:
                    failed.add(url)
    return done, failed


def slugify(url):
    s = re.sub(r"^https?://", "", url)
    s = re.sub(r"[^A-Za-z0-9]+", "-", s).strip("-").lower()
    return s[:60]


def decode(resp):
    ct = resp.headers.get("Content-Type", "")
    m = re.search(r"charset=([\w-]+)", ct, re.I)
    if m:
        enc = m.group(1)
        try:
            return resp.content.decode(enc, errors="replace"), enc
        except LookupError:
            pass
    for enc in ("utf-8", "gb18030"):
        try:
            return resp.content.decode(enc), enc
        except UnicodeDecodeError:
            continue
    enc = resp.apparent_encoding or "utf-8"
    return resp.content.decode(enc, errors="replace"), enc


def log_row(seq, tag, url, status, code, enc, note):
    with open(LOG, "a", encoding="utf-8") as f:
        f.write("\t".join([tag, url, status, str(code), str(enc), str(seq), note,
                           datetime.now().strftime("%Y-%m-%d %H:%M:%S")]) + "\n")


def main():
    retry_failed = "--retry-failed" in sys.argv
    done, failed = load_log()
    entries = []
    with open(URLS, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "\t" in line:
                tag, url = line.split("\t", 1)
            else:
                tag, url = "auto", line
            entries.append((tag.strip(), url.strip()))

    seq0 = 0
    if os.path.exists(LOG):
        with open(LOG, encoding="utf-8") as f:
            seq0 = sum(1 for _ in f)

    session = requests.Session()
    session.headers["User-Agent"] = UA

    for i, (tag, url) in enumerate(entries):
        if url in done:
            print("SKIP  %s %s" % (tag, url))
            continue
        if url in failed and not retry_failed:
            print("SKIP(failed, use --retry-failed) %s" % url)
            continue
        seq = seq0 + i + 1
        note = ""
        status, code, enc = "fail", 0, ""
        for attempt in range(RETRIES + 1):
            try:
                r = session.get(url, timeout=TIMEOUT, allow_redirects=True)
                code = r.status_code
                ext = os.path.splitext(url.split("?")[0])[1].lower()
                if r.status_code == 200 and ext in (".png", ".jpg", ".jpeg", ".gif", ".pdf"):
                    fn = "%03d__%s__%s%s" % (seq, tag, slugify(url), ext)
                    with open(os.path.join(RAW, fn), "wb") as f:
                        f.write(r.content)
                    status, enc, note = "ok", "binary", fn
                    break
                text, enc = decode(r)
                if r.status_code == 200:
                    fn = "%03d__%s__%s.html" % (seq, tag, slugify(url))
                    path = os.path.join(RAW, fn)
                    with open(path, "w", encoding="utf-8") as f:
                        f.write(text)
                    status = "ok"
                    note = fn
                else:
                    note = "HTTP %d" % r.status_code
                break
            except Exception as exc:  # noqa: BLE001
                note = type(exc).__name__ + ": " + str(exc)[:120]
                time.sleep(DELAY)
        if "验证码" in note or "captcha" in note.lower() or "登录" in note:
            note += " [LOGIN-WALL/CHARTS: 放弃]"
        log_row(seq, tag, url, status, code, enc, note.replace("\t", " "))
        print("%-5s %-8s %s  %s" % (status.upper(), code, url, note))
        time.sleep(DELAY)


if __name__ == "__main__":
    main()
