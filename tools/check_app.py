"""index.html 自动验收（Playwright + 系统 Edge）：
- 控制台 error 计数（验收 A4）
- 1440 桌面 / 375 手机 scrollWidth（验收 A4）
- 渲染卡片数 = 数据条数；筛选交互；深浅色切换（验收 A3/筛选）
- 开场动画截图（约 360ms 时刻）+ 稳定后全页截图（G4 材料）
用法: python tools/check_app.py [--http]
"""
import json
import os
import sys

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOTS = os.path.join(ROOT, "research", "prototypes", "shots")
os.makedirs(SHOTS, exist_ok=True)

# 期望值从内置数据动态计算（数据条数随维护更新，避免硬编码过期）
_text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
EVENTS = json.loads(_text[_text.index("["):_text.rindex("]") + 1])
TOTAL = len(EVENTS)
N_COMP = sum(1 for e in EVENTS if "competition" in e.get("categories", []))

base = "http://localhost:8000/index.html" if "--http" in sys.argv else \
    "file:///" + os.path.join(ROOT, "index.html").replace("\\", "/")

results = []
errors = []


def check(name, ok, detail=""):
    results.append((name, ok, detail))
    print("[%s] %s %s" % ("PASS" if ok else "FAIL", name, detail))


with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)

    # ---- 桌面 ----
    pg = browser.new_page(viewport={"width": 1440, "height": 900})
    pg.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(base, wait_until="load")
    pg.wait_for_timeout(200)
    pg.screenshot(path=os.path.join(SHOTS, "final-intro-a.png"))
    pg.wait_for_timeout(130)
    pg.screenshot(path=os.path.join(SHOTS, "final-intro-b.png"))
    pg.wait_for_timeout(700)
    total = pg.evaluate("document.querySelectorAll('.card').length")
    sw = pg.evaluate("document.documentElement.scrollWidth")
    intro_gone = pg.evaluate("getComputedStyle(document.getElementById('intro')).display")
    check("桌面: 卡片数=%d(内置条数)" % TOTAL, total == TOTAL, "got %s" % total)
    check("桌面: 无横向溢出", sw <= 1441, "scrollWidth=%d" % sw)
    check("桌面: 开场动画结束", intro_gone == "none", intro_gone)
    # 筛选：竞赛
    pg.click('.chip[data-cat="competition"]')
    pg.wait_for_timeout(150)
    n_comp = pg.evaluate("document.querySelectorAll('.card').length")
    check("筛选: 竞赛=%d" % N_COMP, n_comp == N_COMP, "got %s" % n_comp)
    pg.click('.chip[data-cat="competition"]')
    pg.wait_for_timeout(150)
    n_all = pg.evaluate("document.querySelectorAll('.card').length")
    check("筛选: 取消后=%d" % TOTAL, n_all == TOTAL, "got %s" % n_all)
    # 级别筛选
    pg.click('[data-lv="国家级"]')
    pg.wait_for_timeout(150)
    n_nat = pg.evaluate("document.querySelectorAll('.card').length")
    pg.click('[data-lv="全部"]')
    check("筛选: 国家级子集", 0 < n_nat < 124, "got %s" % n_nat)
    # 卡片展开
    pg.click(".card")
    pg.wait_for_timeout(120)
    opened = pg.evaluate("document.querySelectorAll('.card.open').length")
    check("卡片展开", opened == 1, "got %s" % opened)
    # 深浅色
    pg.click("#themeBtn")
    pg.wait_for_timeout(120)
    light = pg.evaluate("document.body.classList.contains('light')")
    check("深浅色切换", light is True, "light=%s" % light)
    pg.screenshot(path=os.path.join(SHOTS, "final-light-desktop.png"), full_page=False)
    pg.click("#themeBtn")
    pg.wait_for_timeout(200)
    pg.screenshot(path=os.path.join(SHOTS, "final-desktop.png"), full_page=True)
    # 锚点导航存在 + 标题直达链接
    navs = pg.evaluate("document.querySelectorAll('#semnav a').length")
    check("学期导航=8", navs == 8, "got %s" % navs)
    tlinks = pg.evaluate("document.querySelectorAll('a.ttl').length")
    check("标题直达官方通知链接=%d" % TOTAL, tlinks == TOTAL, "got %s" % tlinks)
    # scroll-spy：滚到底部后高亮应为 大四下
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(500)
    act = pg.evaluate("(document.querySelector('#semnav a.now')||{}).textContent || ''")
    check("滚动跟随: 底部=大四下", "大四下" in act, "active=%r" % act)
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(400)

    # ---- 手机 ----
    pm = browser.new_page(viewport={"width": 375, "height": 812}, device_scale_factor=2)
    pm.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
    pm.on("pageerror", lambda e: errors.append(str(e)))
    pm.goto(base, wait_until="load")
    pm.wait_for_timeout(2400)
    swm = pm.evaluate("document.documentElement.scrollWidth")
    check("手机375: 无横向滚动", swm <= 376, "scrollWidth=%d" % swm)
    pm.screenshot(path=os.path.join(SHOTS, "final-mobile.png"), full_page=True)

    browser.close()

check("控制台 error 总数=0", len(errors) == 0, "errors=%d" % len(errors))
for e in errors[:6]:
    print("   ERR:", e[:200])
fails = [r for r in results if not r[1]]
print("\n== 汇总: %d/%d 通过 ==" % (len(results) - len(fails), len(results)))
sys.exit(1 if fails else 0)
