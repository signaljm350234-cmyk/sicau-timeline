"""手机端视口截图三连 + 首屏加载耗时（本地 file:// 与 http:// 均可）。"""
import os

from playwright.sync_api import sync_playwright

ROOT = r"D:\AI Design\sicau-timeline"
url = "file:///" + os.path.join(ROOT, "index.html").replace("\\", "/")
SHOTS = os.path.join(ROOT, "research", "prototypes", "shots")

with sync_playwright() as p:
    br = p.chromium.launch(channel="msedge", headless=True)
    pg = br.new_page(viewport={"width": 375, "height": 812}, device_scale_factor=2)
    pg.goto(url, wait_until="load")
    pg.wait_for_timeout(1500)
    pg.screenshot(path=os.path.join(SHOTS, "mob-top.png"))
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight*0.45)")
    pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(SHOTS, "mob-mid.png"))
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(400)
    pg.screenshot(path=os.path.join(SHOTS, "mob-bottom.png"))
    t = pg.evaluate("""() => {
      const n = performance.getEntriesByType('navigation')[0];
      return {dom: Math.round(n.domContentLoadedEventEnd), load: Math.round(n.loadEventEnd),
              paint: Math.round((performance.getEntriesByName('first-contentful-paint')[0]||{startTime:0}).startTime)};
    }""")
    print("mobile timings:", t)
    # 渲染卡片数（手机）
    n = pg.evaluate("document.querySelectorAll('.card').length")
    print("mobile cards:", n)
    br.close()
