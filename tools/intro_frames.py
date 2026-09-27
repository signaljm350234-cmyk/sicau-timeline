"""慢动作捕获开场动画 3 个相位（将页面 setTimeout 全部放慢 8 倍，截图后再关闭）。"""
import os

from playwright.sync_api import sync_playwright

ROOT = r"D:\AI Design\sicau-timeline"
url = "file:///" + os.path.join(ROOT, "index.html").replace("\\", "/")
SHOTS = os.path.join(ROOT, "research", "prototypes", "shots")

with sync_playwright() as p:
    br = p.chromium.launch(channel="msedge", headless=True)
    pg = br.new_page(viewport={"width": 1440, "height": 900})
    pg.add_init_script("const _st = window.setTimeout.bind(window);"
                       "window.setTimeout = (fn, ms) => _st(fn, Math.round(ms * 8));")
    pg.goto(url, wait_until="load")
    pg.wait_for_timeout(1400)   # 相位1：欢迎语出现，竖带开始上升
    pg.screenshot(path=os.path.join(SHOTS, "intro-phase1.png"))
    pg.wait_for_timeout(1100)   # 相位2：竖带穿过欢迎语
    pg.screenshot(path=os.path.join(SHOTS, "intro-phase2.png"))
    pg.wait_for_timeout(1300)   # 相位3：欢迎语淡出，竖带变细左移
    pg.screenshot(path=os.path.join(SHOTS, "intro-phase3.png"))
    pg.wait_for_timeout(4000)   # 收尾：标题渐现
    pg.screenshot(path=os.path.join(SHOTS, "intro-final-reveal.png"))
    br.close()
print("intro frames saved")
