"""个人条目层（v1.1）自动化验收。
用法:
  python tools/check_user_layer.py            # file:// 模式
  python tools/check_user_layer.py --http     # http://localhost:8000 模式（需先启动服务器）
覆盖：合并基线 / 添加+倒计时+徽标 / 持久化 / 隐藏+恢复 / 删除 / 导出导入（含非法输入）/
      375px 模态 / 深浅色截图 / 控制台 0 error / localStorage 禁用降级。
"""
import json
import os
import sys
import time
from datetime import date, timedelta

from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHOTS = os.path.join(ROOT, "research", "prototypes", "shots")
TEMP = os.path.join(os.environ.get("TEMP", "."), "opencode")
os.makedirs(SHOTS, exist_ok=True)
os.makedirs(TEMP, exist_ok=True)

sys.stdout.reconfigure(encoding="gbk", errors="replace")

_text = open(os.path.join(ROOT, "data", "events.js"), encoding="utf-8").read()
EVENTS = json.loads(_text[_text.index("["):_text.rindex("]") + 1])
TOTAL = len(EVENTS)
ALL_IDS = [str(e["id"]) for e in EVENTS]

base = ("http://localhost:8000/index.html" if "--http" in sys.argv else
        "file:///" + os.path.join(ROOT, "index.html").replace("\\", "/"))

PASS, FAIL, ERRORS = [], [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print("[%s] %s %s" % ("PASS" if ok else "FAIL", name, detail))


def wire(pg):
    pg.on("console", lambda m: ERRORS.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: ERRORS.append(str(e)))


def wait_cards(pg, n):
    pg.wait_for_function("n => document.querySelectorAll('.card').length === n",
                         arg=n, timeout=7000)
    return pg.evaluate("document.querySelectorAll('.card').length")


def up_rows(pg):
    return pg.evaluate("Array.from(document.querySelectorAll('.up-item')).map(function(r){return {cd:(r.querySelector('.cd')||{}).textContent||'', t:(r.querySelector('.t')||{}).textContent||''};})")


def stat1(pg):
    return pg.evaluate("document.querySelector('#stats .stat b').textContent")


def toast_text(pg):
    pg.wait_for_timeout(350)
    return pg.evaluate("(document.querySelector('.tl-toast')||{}).textContent || ''")


def sem_of(dstr):
    y, m = int(dstr[:4]), int(dstr[5:7])
    if m >= 8:
        return "%d-%d-1" % (y, y + 1)
    if m <= 1:
        return "%d-%d-1" % (y - 1, y)
    return "%d-%d-2" % (y - 1, y)


today = date.today()
d5 = (today + timedelta(days=5)).isoformat()
d10 = (today + timedelta(days=10)).isoformat()


def mk_event(title, start, uid=None):
    return {"id": uid or ("user-%d-0001" % int(time.time() * 1000)), "title": title,
            "categories": ["competition"], "level": "校级", "organizer": "", "audience_tag": "",
            "semester": sem_of(start), "registration": {"start": "", "end": "", "note": ""},
            "event": {"start": start, "end": "", "note": ""},
            "points": {"second_classroom": "", "zongce": ""}, "sources": [],
            "confidence": "custom", "basis": "", "recurring": False, "notes": ""}


print("== 目标:", base, " 内置条数:", TOTAL, "==")
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    wire(pg)

    # ① 基线（清空存储）
    pg.goto(base, wait_until="load", timeout=60000)
    pg.wait_for_timeout(500)
    pg.evaluate("() => { try { localStorage.clear(); } catch(e){} }")
    pg.reload(wait_until="load")
    pg.wait_for_timeout(2500)
    n = pg.evaluate("document.querySelectorAll('.card').length")
    check("① 基线卡片=%d" % TOTAL, n == TOTAL, "got %s" % n)

    # ② UI 添加（活动开始=今天+5）
    pg.click("#addBtn")
    pg.wait_for_timeout(300)
    check("② 添加对话框打开", pg.evaluate("!document.getElementById('userModal').hidden"))
    pg.fill('[data-f="title"]', "验收-自定义赛事")
    pg.click('.uchip[data-cat="competition"]')
    pg.fill('[data-f="evS"]', d5)
    pg.wait_for_timeout(200)
    hint = pg.evaluate("document.querySelector('.tl-hint').textContent")
    check("② 学期自动提示", ("将归入" in hint and sem_of(d5) in pg.evaluate("document.querySelector('[data-f=\"sem\"]').value")), hint)
    pg.get_by_role("button", name="保存", exact=True).click()
    wait_cards(pg, TOTAL + 1)
    check("② 添加后卡片=%d" % (TOTAL + 1), True)
    check("② 统计数=%d" % (TOTAL + 1), stat1(pg) == str(TOTAL + 1), stat1(pg))
    rows = up_rows(pg)
    hit = [r for r in rows if r["t"] == "验收-自定义赛事"]
    check("② UPCOMING 含新条目且 D-5", bool(hit) and "D-5" in hit[0]["cd"], str(hit[:1]))
    badges = pg.evaluate("Array.from(document.querySelectorAll('.card .badge.custom')).map(n=>n.textContent)")
    check("② 自定义徽标显示", "自定义" in badges, str(badges[:3]))
    uid = pg.evaluate("() => { var a=JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]'); return a[0] && a[0].id; }")
    check("② 存储已写入", bool(uid), str(uid))

    # ③ 刷新持久化
    pg.reload(wait_until="load")
    pg.wait_for_timeout(2500)
    n = pg.evaluate("document.querySelectorAll('.card').length")
    check("③ 刷新后仍为 %d" % (TOTAL + 1), n == TOTAL + 1, "got %s" % n)

    # ④ 隐藏内置（挑一个当前在 UPCOMING 里的内置条目）
    rows = up_rows(pg)
    target_id, target_title = None, None
    title2id = {e["title"]: str(e["id"]) for e in EVENTS}
    for r in rows:
        if r["t"] in title2id:
            target_title, target_id = r["t"], title2id[r["t"]]
            break
    check("④ 找到可测试的内置条目", bool(target_id), str(target_title))
    if target_id:
        pg.click('article[data-eid="%s"] .del' % target_id)
        pg.wait_for_timeout(300)
        pg.get_by_role("button", name="隐藏", exact=True).click()
        wait_cards(pg, TOTAL)
        rows2 = up_rows(pg)
        check("④ 隐藏后卡片=%d" % TOTAL, True)
        check("④ 该条已从 UPCOMING 消失", all(r["t"] != target_title for r in rows2))
        check("④ 统计数=%d" % TOTAL, stat1(pg) == str(TOTAL), stat1(pg))
        pg.click("#manageBtn")
        pg.wait_for_timeout(300)
        shown = pg.evaluate("Array.from(document.querySelectorAll('#userModal .tl-sec:nth-child(2) .tl-item .t')).map(n=>n.textContent)")
        check("④ 管理中列出已隐藏条目", target_title in shown, str(shown[:3]))
        pg.get_by_role("button", name="恢复", exact=True).click()
        wait_cards(pg, TOTAL + 1)
        rows3 = up_rows(pg)
        check("④ 恢复后回到 UPCOMING", any(r["t"] == target_title for r in rows3))
        pg.get_by_role("button", name="关闭", exact=True).click()
        pg.wait_for_timeout(200)

    # ⑤ 删除自定义
    pg.click('article[data-eid="%s"] .del' % uid)
    pg.wait_for_timeout(300)
    pg.get_by_role("button", name="永久删除", exact=True).click()
    wait_cards(pg, TOTAL)
    rows4 = up_rows(pg)
    check("⑤ 删除后卡片=%d" % TOTAL, True)
    check("⑤ 倒计时条目消失", all(r["t"] != "验收-自定义赛事" for r in rows4))
    left = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]').length")
    check("⑤ 存储已清空自定义条目", left == 0, "left=%s" % left)

    # ⑥ 导出 / 导入
    seed_ev = mk_event("导入测试-A", d10, uid="user-1700000000000-0001")
    # 预注入 Blob 捕获（Chromium 的 file:// 页面会抑制下载事件，用内容捕获兜底校验）
    pg.add_init_script("window.__tlBlobs = []; var _c = URL.createObjectURL;"
                       "URL.createObjectURL = function (b) { try { window.__tlBlobs.push(b); } catch (e) {}"
                       "return _c.call(URL, b); };")
    pg.evaluate("([ev,hid]) => { localStorage.setItem('tl-user-events-v1', JSON.stringify(ev)); localStorage.setItem('tl-hidden-ids-v1', JSON.stringify(hid)); }",
                [[seed_ev], [target_id]])
    pg.reload(wait_until="load")
    pg.wait_for_timeout(2500)
    n = pg.evaluate("document.querySelectorAll('.card').length")
    check("⑥ 种入后卡片=%d(-1隐藏+1自定义)" % TOTAL, n == TOTAL, "got %s" % n)
    pg.click("#manageBtn")
    pg.wait_for_timeout(300)
    dl_path = None
    try:
        with pg.expect_download(timeout=4000) as dl:
            pg.get_by_role("button", name="导出 JSON", exact=True).click()
        dl_path = os.path.join(TEMP, "tl-export.json")
        dl.value.save_as(dl_path)
    except Exception:
        pg.wait_for_timeout(600)
    t = toast_text(pg)
    check("⑥ 导出触发（下载或内容捕获）", ("已导出" in t) or bool(dl_path), t)
    data = None
    if dl_path:
        data = json.load(open(dl_path, encoding="utf-8"))
    else:
        raw = pg.evaluate("async () => { try { return await window.__tlBlobs[0].text(); } catch (e) { return ''; } }")
        try:
            data = json.loads(raw)
        except Exception:
            data = None
    check("⑥ 导出结构", bool(data) and data.get("version") == 1 and len(data.get("events", [])) == 1 and len(data.get("hiddenIds", [])) == 1,
          "v=%s e=%s h=%s" % (data and data.get("version"), data and len(data.get("events", [])), data and len(data.get("hiddenIds", []))))

    badjson = os.path.join(TEMP, "tl-bad.json")
    open(badjson, "w", encoding="utf-8").write("{oops not json")
    pg.locator('#userModal input[type="file"]').set_input_files(badjson)
    t = toast_text(pg)
    check("⑥ 坏 JSON 被拒绝", "不是有效" in t or "导入失败" in t, t)

    badurl = os.path.join(TEMP, "tl-badurl.json")
    ev_bad = mk_event("坏URL条目", d10, uid="user-1700000000000-0002")
    ev_bad["sources"] = [{"title": "x", "url": "ftp://bad", "published": "", "accessed": "2026-01-01"}]
    json.dump({"version": 1, "events": [ev_bad], "hiddenIds": []}, open(badurl, "w", encoding="utf-8"))
    pg.locator('#userModal input[type="file"]').set_input_files(badurl)
    t = toast_text(pg)
    check("⑥ 非法 URL 被拒绝", "没有可导入的有效条目" in t or "无效" in t, t)
    n = pg.evaluate("document.querySelectorAll('.card').length")
    check("⑥ 拒绝后数据未变", n == TOTAL, "got %s" % n)

    good = os.path.join(TEMP, "tl-good.json")
    ev_b = mk_event("导入测试-B", d10, uid="user-1700000000000-0003")
    ev_c = mk_event("导入测试-C", d5, uid="user-1700000000000-0004")
    json.dump({"version": 1, "events": [ev_b, ev_c], "hiddenIds": []}, open(good, "w", encoding="utf-8"))
    pg.locator('#userModal input[type="file"]').set_input_files(good)
    pg.wait_for_timeout(300)
    dlgtext = pg.evaluate("(document.querySelector('#userModal .tl-dialog:last-child')||{}).textContent || ''")
    check("⑥ 导入确认展示 N/M", "将导入 2 条" in dlgtext, dlgtext[:60])
    pg.get_by_role("button", name="导入", exact=True).click()
    wait_cards(pg, TOTAL + 2)
    check("⑥ 导入后卡片=%d(隐藏被清除+恢复)" % (TOTAL + 2), True)
    pg.wait_for_timeout(200)

    # ⑦ 视觉：暗/亮 + 375px + 截图
    pg.evaluate("() => { try{ localStorage.clear(); }catch(e){} }")
    pg.reload(wait_until="load")
    pg.wait_for_timeout(2500)
    pg.screenshot(path=os.path.join(SHOTS, "userlayer-desktop.png"), full_page=True)
    pg.click("#addBtn")
    pg.wait_for_timeout(300)
    pg.screenshot(path=os.path.join(SHOTS, "userlayer-modal.png"))
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(200)
    pg.click("#themeBtn")
    pg.wait_for_timeout(400)
    pg.click("#addBtn")
    pg.wait_for_timeout(300)
    pg.screenshot(path=os.path.join(SHOTS, "userlayer-light.png"))
    pg.keyboard.press("Escape")
    pg.click("#themeBtn")

    pm = b.new_page(viewport={"width": 375, "height": 812}, device_scale_factor=2)
    wire(pm)
    pm.goto(base, wait_until="load", timeout=60000)
    pm.wait_for_timeout(2500)
    pm.click("#addBtn")
    pm.wait_for_timeout(400)
    sw = pm.evaluate("document.documentElement.scrollWidth")
    check("⑦ 375px 模态无横向滚动", sw <= 376, "scrollWidth=%d" % sw)
    pm.screenshot(path=os.path.join(SHOTS, "userlayer-mobile.png"))
    pm.keyboard.press("Escape")

    # ⑨ 降级：localStorage 被禁用
    ctx = b.new_context(viewport={"width": 1200, "height": 800})
    p2 = ctx.new_page()
    wire(p2)
    p2.add_init_script("Object.defineProperty(window, 'localStorage', { get: function () { throw new Error('denied'); } });")
    p2.goto(base, wait_until="load", timeout=60000)
    p2.wait_for_timeout(2500)
    nd = p2.evaluate("document.querySelectorAll('.card').length")
    check("⑨ 禁用存储时只读正常", nd == TOTAL, "got %s" % nd)
    check("⑨ 入口已禁用", p2.evaluate("document.getElementById('addBtn').disabled") and p2.evaluate("document.getElementById('manageBtn').disabled"))
    ctx.close()

    b.close()

check("总体：控制台 error 总数=0", len(ERRORS) == 0, "errors=%d %s" % (len(ERRORS), ERRORS[:3]))
print("\n== 汇总: %d 通过 / %d 失败 ==" % (len(PASS), len(FAIL)))
for f in FAIL:
    print("  FAIL:", f)
sys.exit(1 if FAIL else 0)
