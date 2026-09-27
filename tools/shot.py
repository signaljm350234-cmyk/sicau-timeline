"""截图工具（Playwright + 系统 Edge 通道，免下载浏览器）：
用法:
  python tools/shot.py <html相对路径> <输出前缀> [--mobile-only|--desktop-only]
产物: <输出前缀>-desktop.png (1440 全页) / <输出前缀>-mobile.png (375 全页)
同时输出控制台 error 数（用于 P4 验收）。
"""
import os
import sys

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def shoot(page, url, out, viewport, full=True):
    page.set_viewport_size(viewport)
    page.goto(url, wait_until="load")
    page.wait_for_timeout(600)
    page.screenshot(path=out, full_page=full)
    sw = page.evaluate("document.documentElement.scrollWidth")
    return sw


def main():
    rel, prefix = sys.argv[1], sys.argv[2]
    only = sys.argv[3] if len(sys.argv) > 3 else ""
    url = "file:///" + os.path.join(ROOT, rel).replace("\\", "/")
    errors = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(device_scale_factor=1)
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.on("pageerror", lambda e: errors.append(str(e)))
        if only in ("", "--desktop-only"):
            sw = shoot(page, url, prefix + "-desktop.png", {"width": 1440, "height": 900})
            print("desktop scrollWidth=%d %s" % (sw, "OK" if sw <= 1441 else "OVERFLOW"))
        if only in ("", "--mobile-only"):
            page2 = browser.new_page(device_scale_factor=2)
            page2.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
            page2.on("pageerror", lambda e: errors.append(str(e)))
            sw = shoot(page2, url, prefix + "-mobile.png", {"width": 375, "height": 812})
            print("mobile scrollWidth=%d %s" % (sw, "OK(no h-scroll)" if sw <= 376 else "OVERFLOW"))
        browser.close()
    print("console errors:", len(errors))
    for e in errors[:5]:
        print("  ERR:", e[:160])


if __name__ == "__main__":
    main()
