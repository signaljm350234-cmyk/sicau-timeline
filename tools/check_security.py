"""安全检查与验证（可重复运行）：
A. 源码恶意模式扫描（防注入）
B. 本地 iframe 嵌套逃逸实测（同源场景，验证反嵌套 JS）
C. 功能回归（file:// 与 http 双模式：卡片数 / 控制台错误）
D. 线上响应头检查（Cloudflare Pages：XFO / nosniff / CSP）
用法: python tools/check_security.py
"""
import os
import re
import subprocess
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.stdout.reconfigure(encoding="gbk", errors="replace")
import requests

PASS = []
FAIL = []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print("[%s] %s %s" % ("PASS" if ok else "FAIL", name, detail))


# ---------------- A. 源码扫描 ----------------
print("== A. 源码恶意模式扫描 ==")
FILES = ["index.html", "assets/js/app.js", "assets/js/security.js", "data/events.js", "assets/css/style.css"]
PATTERNS = [
    ("iframe标签", r"<iframe"),
    ("外部脚本", r"""<script[^>]+src=["']https?://"""),
    ("eval", r"\beval\s*\("),
    ("document.write", r"document\.write"),
    ("atob", r"\batob\s*\("),
    ("fromCharCode", r"fromCharCode"),
    ("javascript:伪协议", r"\bjavascript:(?!\s*;|\s*$)[^\s\"']*"),
    ("createElement(script)", r"createElement\s*\(\s*[\"']script"),
]
# security.js 自身含 JS 全量防护代码，扫描时排除其定义性字样
ALLOW_LINES = ("security.js",)
clean = True
for f in FILES:
    t = open(os.path.join(ROOT, f.replace("/", os.sep)), encoding="utf-8").read()
    hits = []
    for name, pat in PATTERNS:
        for m in re.finditer(pat, t):
            line = t[:m.start()].count("\n") + 1
            if any(f.endswith(a) for a in ALLOW_LINES) and name in ("javascript:伪协议", "createElement(script)"):
                continue
            hits.append((name, line))
    if hits:
        clean = False
        print("   [%s] 命中: %s" % (f, hits[:6]))
    else:
        print("   [%s] 干净" % f)
check("A. 源码扫描无恶意模式", clean)

# ---------------- B. 本地嵌套逃逸实测 ----------------
print("== B. iframe 嵌套逃逸实测（localhost 同源场景）==")
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8899", "--bind", "127.0.0.1"],
                       cwd=ROOT, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(2)
try:
    from playwright.sync_api import sync_playwright

    with sync_playwright() as p:
        b = p.chromium.launch(channel="msedge", headless=True)
        pg = b.new_page()
        pg.goto("http://127.0.0.1:8899/tools/security-tests/attacker-frame.html",
                wait_until="load", timeout=30000)
        pg.wait_for_timeout(2600)
        url = pg.url
        check("B. 被嵌套页面成功逃逸到顶层",
              url.endswith("protected-sample.html"), "top url = " + url[-60:])

        # C. 功能回归（http 模式, 带 meta CSP 注入）
        errs = []
        pg2 = b.new_page(viewport={"width": 1440, "height": 900})
        pg2.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
        pg2.on("pageerror", lambda e: errs.append(str(e)))
        pg2.goto("http://127.0.0.1:8899/index.html", wait_until="load", timeout=30000)
        pg2.wait_for_timeout(2200)
        n = pg2.evaluate("document.querySelectorAll('.card').length")
        check("C1. http 模式：卡片=124", n == 124, "got %s" % n)
        check("C2. http 模式：控制台错误=0", len(errs) == 0, "errors=%d %s" % (len(errs), errs[:2]))

        # file:// 离线模式回归
        errs2 = []
        pg3 = b.new_page(viewport={"width": 1440, "height": 900})
        pg3.on("console", lambda m: errs2.append(m.text) if m.type == "error" else None)
        pg3.on("pageerror", lambda e: errs2.append(str(e)))
        pg3.goto("file:///" + os.path.join(ROOT, "index.html").replace("\\", "/"),
                 wait_until="load", timeout=30000)
        pg3.wait_for_timeout(2200)
        n2 = pg3.evaluate("document.querySelectorAll('.card').length")
        csp = pg3.evaluate("!!document.querySelector('meta[http-equiv=\"Content-Security-Policy\"]')")
        check("C3. file:// 离线：卡片=124", n2 == 124, "got %s" % n2)
        check("C4. file:// 未注入 meta CSP（保持离线可用）", csp is False, "injected=%s" % csp)
        check("C5. file:// 控制台错误=0", len(errs2) == 0, "errors=%d" % len(errs2))
        b.close()
finally:
    srv.terminate()

# ---------------- D. 线上响应头 + 线上回归 ----------------
print("== D. Cloudflare Pages 线上检查 ==")
try:
    r = requests.get("https://sicau-timeline.pages.dev/", timeout=25)
    h = {k.lower(): v for k, v in r.headers.items()}
    check("D1. X-Frame-Options: DENY", h.get("x-frame-options", "").upper() == "DENY", h.get("x-frame-options", "(缺)"))
    check("D2. X-Content-Type-Options: nosniff", h.get("x-content-type-options", "") == "nosniff", h.get("x-content-type-options", "(缺)"))
    csp = h.get("content-security-policy", "")
    check("D3. CSP 含 frame-ancestors 'none'", "frame-ancestors 'none'" in csp, csp[:80] or "(缺)")
    check("D4. CSP 含 default-src 'self'", "default-src 'self'" in csp)

    from playwright.sync_api import sync_playwright

    errs3 = []
    with sync_playwright() as p:
        b = p.chromium.launch(channel="msedge", headless=True)
        pg = b.new_page(viewport={"width": 1440, "height": 900})
        pg.on("console", lambda m: errs3.append(m.text) if m.type == "error" else None)
        pg.on("pageerror", lambda e: errs3.append(str(e)))
        pg.goto("https://sicau-timeline.pages.dev/", wait_until="load", timeout=60000)
        pg.wait_for_timeout(2500)
        n3 = pg.evaluate("document.querySelectorAll('.card').length")
        b.close()
    check("D5. 线上功能回归：卡片=124", n3 == 124, "got %s" % n3)
    check("D6. 线上控制台错误=0", len(errs3) == 0, "errors=%d %s" % (len(errs3), errs3[:2]))
except Exception as e:
    check("D. 线上检查", False, str(e)[:120])

print("\n== 汇总: %d 通过 / %d 失败 ==" % (len(PASS), len(FAIL)))
sys.exit(1 if FAIL else 0)
