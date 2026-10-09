"""个人条目层 + 分享码同步 + F8 定位编排 自动化验收（v1.1 完整版）。
用法:
  python tools/check_user_layer.py            # file:// 模式
  python tools/check_user_layer.py --http     # http://localhost:8000 模式（需先启动服务器；含多标签 storage 联动）
覆盖 ①–⑬：基线 / 添加+F8 编排（线性滚动·闪烁·黄色提示条·直达备份区）/ 筛选复位 /
       快速连续添加 / reduced-motion / 持久化(+多标签联动) / 分享码往返 / 坏码拒绝 /
       #u= 书签链接 / 合并与覆盖 / 删除与隐藏恢复 / 375px 与深浅色截图 / 控制台 0 error /
       localStorage 禁用降级。
"""
import json
import os
import re
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

HTTP = "--http" in sys.argv
base = ("http://localhost:8000/index.html" if HTTP else
        "file:///" + os.path.join(ROOT, "index.html").replace("\\", "/"))

PASS, FAIL, ERRORS = [], [], []


def check(name, ok, detail=""):
    (PASS if ok else FAIL).append(name)
    print("[%s] %s %s" % ("PASS" if ok else "FAIL", name, detail))


def wire(pg):
    pg.on("console", lambda m: ERRORS.append(m.text) if m.type == "error" else None)
    pg.on("pageerror", lambda e: ERRORS.append(str(e)))


def cards(pg):
    return pg.evaluate("document.querySelectorAll('.card').length")


def wait_cards(pg, n, timeout=8000):
    pg.wait_for_function("n => document.querySelectorAll('.card').length === n", arg=n, timeout=timeout)


def up_rows(pg):
    return pg.evaluate("Array.from(document.querySelectorAll('.up-item')).map(function(r){return {cd:(r.querySelector('.cd')||{}).textContent||'', t:(r.querySelector('.t')||{}).textContent||''};})")


def stat1(pg):
    return pg.evaluate("document.querySelector('#stats .stat b').textContent")


def toast_text(pg, wait=450):
    pg.wait_for_timeout(wait)
    return pg.evaluate("(document.querySelector('.tl-toast')||{}).textContent || ''")


def utoast_text(pg):
    return pg.evaluate("(document.querySelector('.userToast')||{}).textContent || ''")


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


def mk_event(title, start, uid=None, cat="competition"):
    return {"id": uid or ("user-%d-0001" % int(time.time() * 1000)), "title": title,
            "categories": [cat], "level": "校级", "organizer": "", "audience_tag": "",
            "semester": sem_of(start), "registration": {"start": "", "end": "", "note": ""},
            "event": {"start": start, "end": "", "note": ""},
            "points": {"second_classroom": "", "zongce": ""}, "sources": [],
            "confidence": "custom", "basis": "", "recurring": False, "notes": ""}


def clear_store(pg):
    pg.evaluate("() => { try { localStorage.clear(); } catch(e){} }")


def reload(pg, wait=2500):
    pg.reload(wait_until="load")
    pg.wait_for_timeout(wait)


def ui_add(pg, title, cat, dstr, pause=250):
    pg.click("#addBtn")
    pg.wait_for_timeout(pause)
    pg.fill('[data-f="title"]', title)
    pg.click('.uchip[data-cat="%s"]' % cat)
    pg.fill('[data-f="evS"]', dstr)
    pg.wait_for_timeout(150)
    pg.get_by_role("button", name="保存", exact=True).click()


def last_custom_id(pg):
    return pg.evaluate("() => { var a=JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]'); return a.length? String(a[a.length-1].id):''; }")


def settle_scroll(pg, timeout_ms=5000):
    last, stable, t0 = -1, 0, time.time()
    while (time.time() - t0) * 1000 < timeout_ms:
        y = pg.evaluate("window.scrollY")
        if abs(y - last) < 1:
            stable += 1
            if stable >= 2:
                return y
        else:
            stable = 0
        last = y
        pg.wait_for_timeout(60)
    return pg.evaluate("window.scrollY")


def poll_flash(pg, window_ms=900):
    """返回 (seen, duration_ms|None)。"""
    t0 = time.time()
    seen, t_seen = False, None
    while (time.time() - t0) * 1000 < window_ms:
        has = pg.evaluate("!!document.querySelector('.card.flash')")
        if has and not seen:
            seen, t_seen = True, time.time()
        if seen and not has:
            return True, (time.time() - t_seen) * 1000
        pg.wait_for_timeout(35)
    return seen, None


def card_top(pg, eid):
    return pg.evaluate("(id) => { var c=document.querySelector('article[data-eid=\"'+id+'\"]'); return c? c.getBoundingClientRect().top : -1; }", eid)


def filters_h(pg):
    return pg.evaluate("(document.querySelector('.filters')||{}).getBoundingClientRect ? document.querySelector('.filters').getBoundingClientRect().height : 0")


print("== 目标:", base, " 内置条数:", TOTAL, "==")
with sync_playwright() as p:
    b = p.chromium.launch(channel="msedge", headless=True)
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    wire(pg)

    # ---------------- ① 基线 ----------------
    pg.goto(base, wait_until="load", timeout=60000)
    pg.wait_for_timeout(500)
    clear_store(pg)
    reload(pg)
    n = cards(pg)
    check("① 基线卡片=%d" % TOTAL, n == TOTAL, "got %s" % n)

    # ---------------- ② 添加（含 F8 编排实拍） ----------------
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(300)
    pre_y = pg.evaluate("window.scrollY")
    ui_add(pg, "验收-自定义赛事", "competition", d5)
    wait_cards(pg, TOTAL + 1)
    id_a = last_custom_id(pg)
    check("② 添加后卡片=%d" % (TOTAL + 1), True)
    check("② 统计数=%d" % (TOTAL + 1), stat1(pg) == str(TOTAL + 1), stat1(pg))
    rows = up_rows(pg)
    hit = [r for r in rows if r["t"] == "验收-自定义赛事"]
    check("② UPCOMING 含新条目且 D-5", bool(hit) and "D-5" in hit[0]["cd"], str(hit[:1]))
    badges = pg.evaluate("Array.from(document.querySelectorAll('.card .badge.custom')).map(n=>n.textContent)")
    check("② 自定义徽标显示", "自定义" in badges, str(badges[:3]))
    check("② 存储已写入", bool(id_a), str(id_a))

    # ---------------- ③ F8 编排断言 ----------------
    post_y = settle_scroll(pg)
    fh = filters_h(pg)
    top = card_top(pg, id_a)
    check("③-1 保存后线性滚动发生（scrollY %d → %d）" % (pre_y, post_y), abs(post_y - pre_y) > 300, "delta=%d" % (post_y - pre_y))
    check("③-1 最终停在目标卡片（误差±30px）", top >= 0 and abs(top - (fh + 24)) <= 30,
          "card_top=%.1f expect=%.1f" % (top, fh + 24))
    seen, dur = poll_flash(pg)
    check("③-2 滚动停止后出现单次闪烁", seen, "dur=%s" % dur)
    check("③-2 闪烁约 300ms 内消失", (dur is not None) and 120 <= dur <= 800, "dur=%s" % dur)
    pg.wait_for_selector(".userToast", state="visible", timeout=5000)
    ut = utoast_text(pg)
    check("③-3 黄色提示条出现且文案正确",
          ("新条目已保存到本机" in ut) and ("生成备份码" in ut) and ("知道了" in ut), ut[:60])
    check("③-3 role=status + aria-live=polite",
          pg.evaluate("(function(){var t=document.querySelector('.userToast');return t.getAttribute('role')==='status' && t.getAttribute('aria-live')==='polite';})()"))
    try:
        pg.screenshot(path=os.path.join(SHOTS, "userlayer-toast.png"))
    except Exception:
        pass
    pg.locator(".userToast .tl-btn.primary").click()
    pg.wait_for_timeout(450)
    check("③-4 主按钮打开管理面板", pg.evaluate("!document.getElementById('userModal').hidden"))
    vis = pg.evaluate("""() => {
      var d=document.querySelector('#userModal .tl-dialog:last-child');
      var s=document.querySelector('#um-backup');
      if(!d||!s) return {ok:false};
      var dr=d.getBoundingClientRect(), sr=s.getBoundingClientRect();
      return {ok:(sr.top >= dr.top - 5) && (sr.top <= dr.bottom - 40),
              dlgTop:Math.round(dr.top), secTop:Math.round(sr.top), dlgBottom:Math.round(dr.bottom)};
    }""")
    check("③-4 已锚定到备份区 #um-backup（对话框可视区内）", bool(vis.get("ok")), str(vis))
    try:
        pg.screenshot(path=os.path.join(SHOTS, "userlayer-manage-backup.png"))
    except Exception:
        pass
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(300)

    # ---------------- ④ 筛选复位 ----------------
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(400)
    pg.click('.chip[data-cat="competition"]')
    pg.wait_for_timeout(250)
    check("④ 已选中类别筛选（竞赛与双创）",
          pg.evaluate("document.querySelector('.chip[data-cat=\"competition\"]').classList.contains('on')"))
    ui_add(pg, "验收-课程条目", "course", d5)
    wait_cards(pg, TOTAL + 2)
    id_b = last_custom_id(pg)
    pg.wait_for_timeout(250)
    check("④ 保存后筛选全部复位（all chip 高亮）",
          pg.evaluate("document.querySelector('.chip[data-cat=\"all\"]').classList.contains('on')") and
          (not pg.evaluate("document.querySelector('.chip[data-cat=\"competition\"]').classList.contains('on')")))
    check("④ 新卡片可见", card_top(pg, id_b) >= 0)
    settle_scroll(pg)
    fh = filters_h(pg)
    check("④ 新卡片可定位（误差±30px）", abs(card_top(pg, id_b) - (fh + 24)) <= 30,
          "top=%.1f" % card_top(pg, id_b))
    pg.locator(".userToast .tl-btn.ghost").click()  # 知道了
    pg.wait_for_timeout(300)

    # ---------------- ⑤ 快速连续添加 ----------------
    ui_add(pg, "验收-连发1", "competition", d5, pause=200)
    pg.wait_for_timeout(120)
    ui_add(pg, "验收-连发2", "competition", d10, pause=200)
    wait_cards(pg, TOTAL + 4)
    pg.wait_for_timeout(1400)
    toast_n = pg.evaluate("document.querySelectorAll('.userToast').length")
    flash_n = pg.evaluate("document.querySelectorAll('.card.flash').length")
    check("⑤ 任一时刻 ≤1 个提示条", toast_n <= 1, "n=%s" % toast_n)
    check("⑤ 两类动画不叠加（flash≤1）", flash_n <= 1, "n=%s" % flash_n)
    titles = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]').map(e=>e.title)")
    check("⑤ 两条都在", ("验收-连发1" in titles) and ("验收-连发2" in titles), str(titles[-3:]))

    # ---------------- ⑥ reduced-motion ----------------
    pg.emulate_media(reduced_motion="reduce")
    pg.evaluate("window.scrollTo(0, 0)")
    pg.wait_for_timeout(400)
    ui_add(pg, "验收-减动效", "competition", d5)
    wait_cards(pg, TOTAL + 5)
    id_d = last_custom_id(pg)
    fh = filters_h(pg)
    check("⑥ 直接定位（无滚动动画）", abs(card_top(pg, id_d) - (fh + 24)) <= 30,
          "top=%.1f" % card_top(pg, id_d))
    got_flash = False
    try:
        pg.wait_for_selector('article[data-eid="%s"].flash' % id_d, timeout=900)
        got_flash = True
    except Exception:
        pass
    check("⑥ 静态描边高亮（animation:none）",
          got_flash and pg.evaluate("(id) => { var c=document.querySelector('article[data-eid=\"'+id+'\"]'); return !!c && getComputedStyle(c).animationName === 'none'; }", id_d))
    try:
        pg.wait_for_selector(".userToast.noanim", state="attached", timeout=2000)
    except Exception:
        pass
    check("⑥ 提示条直接出现（noanim）",
          pg.evaluate("!!document.querySelector('.userToast.noanim.in')"))
    pg.emulate_media(reduced_motion="no-preference")
    pg.locator(".userToast .tl-btn.ghost").click()
    pg.wait_for_timeout(300)

    # ---------------- ⑦ 持久化 + 多标签联动 ----------------
    before = cards(pg)
    reload(pg)
    after = cards(pg)
    check("⑦ 刷新后仍为 %d（持久化）" % before, before == after, "before=%d after=%d" % (before, after))
    if HTTP:
        ctx2 = b.new_context(viewport={"width": 1200, "height": 800})
        p1, p2 = ctx2.new_page(), ctx2.new_page()
        wire(p1); wire(p2)
        p1.goto(base, wait_until="load", timeout=60000)
        p1.wait_for_timeout(500)
        p1.evaluate("() => localStorage.clear()")
        seed = mk_event("联动-即将删除", d5, uid="user-1700000001111-0001")
        p1.evaluate("(ev) => { localStorage.setItem('tl-user-events-v1', JSON.stringify([ev])); }", seed)
        p1.reload(wait_until="load"); p1.wait_for_timeout(2200)
        p2.goto(base, wait_until="load", timeout=60000)
        p2.wait_for_timeout(2200)
        check("⑦ 两标签初始一致=%d" % (TOTAL + 1), cards(p1) == TOTAL + 1 and cards(p2) == TOTAL + 1,
              "p1=%d p2=%d" % (cards(p1), cards(p2)))
        p1.click('article[data-eid="user-1700000001111-0001"] .del')
        p1.wait_for_timeout(300)
        p1.get_by_role("button", name="永久删除", exact=True).click()
        p1.wait_for_timeout(300)
        ok2 = False
        for _ in range(20):
            if cards(p2) == TOTAL:
                ok2 = True
                break
            p2.wait_for_timeout(200)
        check("⑦ storage 事件联动：第二页自动 %d" % TOTAL, ok2, "p2=%d" % cards(p2))
        ctx2.close()
    else:
        print("   (--http 模式才测多标签 storage 联动)")

    # ---------------- ⑧ 分享码往返 ----------------
    clear_store(pg)
    reload(pg)
    e1 = mk_event("码测试-A", d10, uid="user-1700000002222-0001")
    e2 = mk_event("码测试-B", d5, uid="user-1700000002222-0002")
    pg.evaluate("(evs) => { localStorage.setItem('tl-user-events-v1', JSON.stringify(evs)); }", [e1, e2])
    reload(pg)
    check("⑧ 种入 2 条 → %d" % (TOTAL + 2), cards(pg) == TOTAL + 2, "got %d" % cards(pg))
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.get_by_role("button", name="生成分享码", exact=True).click()
    code = ""
    for _ in range(20):
        code = pg.evaluate("(document.querySelector('#userModal [data-f=\"codebox\"]')||{}).value || ''")
        if code:
            break
        pg.wait_for_timeout(250)
    check("⑧ 分享码生成（TL1: 前缀）", code.startswith("TL1:") and len(code) > 40, code[:24] + "… len=%d" % len(code))
    note = pg.evaluate("Array.from(document.querySelectorAll('#um-backup .tl-note')).map(n=>n.textContent).join('|')")
    check("⑧ 生成提示文案", ("清缓存可用此码恢复" in note) and ("请勿公开发送" in note), note[:50])
    pg.get_by_role("button", name="生成书签链接", exact=True).click()
    pg.wait_for_timeout(500)
    link_val = pg.evaluate("(document.querySelector('#userModal [data-f=\"codebox\"]')||{}).value || ''")
    check("⑧ 书签链接含 #u=", "#u=TL1:" in link_val, link_val[:40] + "…")
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(250)
    clear_store(pg)
    reload(pg)
    check("⑧ 清存储后回到 %d" % TOTAL, cards(pg) == TOTAL, "got %d" % cards(pg))
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.fill('#userModal [data-f="impbox"]', code)
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    pg.wait_for_timeout(350)
    dlg = pg.evaluate("(document.querySelector('#userModal .tl-dialog:last-child')||{}).textContent||''")
    check("⑧ 摘要：新增 2 / 跳过 0 / 无效 0", ("新增 2 条" in dlg) and ("跳过 0 条重复" in dlg) and ("无效 0 条" in dlg), dlg[:80])
    pg.get_by_role("button", name="继续", exact=True).click()
    wait_cards(pg, TOTAL + 2)
    check("⑧ 导入后卡片=%d" % (TOTAL + 2), True)
    ts = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]').map(e=>e.title)")
    check("⑧ 条目内容还原", ("码测试-A" in ts) and ("码测试-B" in ts), str(ts))
    pg.fill('#userModal [data-f="impbox"]', code)
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    pg.wait_for_timeout(350)
    dlg = pg.evaluate("(document.querySelector('#userModal .tl-dialog:last-child')||{}).textContent||''")
    check("⑧ 重复导入：摘要显示全部跳过", ("新增 0 条" in dlg) and ("跳过 2 条重复" in dlg), dlg[:80])
    pg.get_by_role("button", name="继续", exact=True).click()
    pg.wait_for_timeout(600)
    check("⑧ 重复导入后仍为 %d" % (TOTAL + 2), cards(pg) == TOTAL + 2, "got %d" % cards(pg))

    # ---------------- ⑨ 坏码 / 坏数据拒绝 ----------------
    trunc = code[:-10]
    pg.fill('#userModal [data-f="impbox"]', trunc)
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    t = toast_text(pg)
    check("⑨ 截断码被拒（中文提示）", "码不完整" in t, t[:50])
    mid = len(code) // 2
    other = "A" if code[mid] != "A" else "B"
    tampered = code[:mid] + other + code[mid + 1:]
    pg.fill('#userModal [data-f="impbox"]', tampered)
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    t = toast_text(pg)
    check("⑨ 篡改校验码被拒", "码不完整" in t, t[:50])
    pg.fill('#userModal [data-f="impbox"]', "{oops not json")
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    t = toast_text(pg)
    check("⑨ 坏 JSON 被拒", "无法识别" in t, t[:50])
    bad = mk_event("坏URL", d10, uid="user-1700000002222-0003")
    bad["sources"] = [{"title": "x", "url": "ftp://bad", "published": "", "accessed": "2026-01-01"}]
    pg.fill('#userModal [data-f="impbox"]', json.dumps({"version": 1, "events": [bad], "hiddenIds": []}, ensure_ascii=False))
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    t = toast_text(pg)
    check("⑨ 非法 URL 被拒", "没有可导入的有效条目" in t, t[:50])
    many = []
    for i in range(201):
        ev = mk_event("伪造-%03d" % i, d10, uid="user-1700000003333-%04d" % i)
        many.append(ev)
    pg.fill('#userModal [data-f="impbox"]', json.dumps({"version": 1, "events": many, "hiddenIds": []}, ensure_ascii=False))
    pg.get_by_role("button", name="粘贴导入（合并）", exact=True).click()
    t = toast_text(pg)
    check("⑨ 伪造 201 条被拒（超上限）", ("超过本机上限" in t) and ("已拒绝" in t), t[:60])
    check("⑨ 全部拒绝后数据未变=%d" % (TOTAL + 2), cards(pg) == TOTAL + 2, "got %d" % cards(pg))
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(300)

    # ---------------- ⑩ 个人书签链接 + 合并/覆盖 ----------------
    clear_store(pg)
    reload(pg)
    l1 = mk_event("链接恢复-1", d5, uid="user-1700000004444-0001")
    link_code = pg.evaluate("(ev) => window.UserLayer.encode([ev], [])", l1)
    check("⑩ encode 直调可用", link_code.startswith("TL1:"), link_code[:20] + "…")
    pg.goto("about:blank")
    pg.goto(base + "#u=" + link_code, wait_until="load", timeout=60000)
    pg.wait_for_timeout(3000)
    dtext = pg.evaluate("(document.querySelector('#userModal .tl-dialog:last-child')||{}).textContent||''")
    check("⑩ #u= 检测到并弹确认", "检测到分享码" in dtext, dtext[:50])
    pg.get_by_role("button", name="导入", exact=True).click()
    pg.wait_for_timeout(400)
    pg.get_by_role("button", name="继续", exact=True).click()
    wait_cards(pg, TOTAL + 1)
    check("⑩ 同意后合并导入 = %d" % (TOTAL + 1), True)
    pg.wait_for_timeout(500)
    check("⑩ hash 已清除", pg.evaluate("location.hash") == "", pg.evaluate("location.href")[-30:])
    # 覆盖模式
    olda = mk_event("旧A", d10, uid="user-1700000004444-0002")
    pg.evaluate("(evs) => { localStorage.setItem('tl-user-events-v1', JSON.stringify(evs)); }", [olda])
    reload(pg)
    check("⑩ 覆盖前种入旧A = %d" % (TOTAL + 1), cards(pg) == TOTAL + 1, "got %d" % cards(pg))
    newb = mk_event("覆盖B", d5, uid="user-1700000004444-0003")
    code_b = pg.evaluate("(ev) => window.UserLayer.encode([ev], [])", newb)
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.fill('#userModal [data-f="impbox"]', code_b)
    pg.get_by_role("button", name="覆盖导入", exact=True).click()
    pg.wait_for_timeout(350)
    pg.get_by_role("button", name="继续", exact=True).click()
    pg.wait_for_timeout(350)
    pg.locator("#userModal .tl-dialog:last-child").get_by_role("button", name="覆盖导入", exact=True).click()
    pg.wait_for_timeout(700)
    ts = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]').map(e=>e.title)")
    check("⑩ 覆盖模式：仅剩覆盖B", ts == ["覆盖B"], str(ts))
    check("⑩ 覆盖后卡片=%d" % (TOTAL + 1), cards(pg) == TOTAL + 1, "got %d" % cards(pg))
    # 载体3：JSON 导出 / 文件导入 往返
    pg.evaluate("() => { window.__tlBlobs = []; var _c = URL.createObjectURL; URL.createObjectURL = function (b) { try { window.__tlBlobs.push(b); } catch (e) {} return _c.call(URL, b); }; }")
    pg.get_by_role("button", name="导出 JSON 文件", exact=True).click()
    pg.wait_for_timeout(700)
    raw = pg.evaluate("async () => { try { return await window.__tlBlobs[0].text(); } catch (e) { return ''; } }")
    ok_json = False
    try:
        data = json.loads(raw)
        ok_json = data.get("version") == 1 and len(data.get("events", [])) == 1
    except Exception:
        data = None
    check("⑩ 载体3 JSON 导出结构", ok_json, (raw or "")[:50])
    rp_path = os.path.join(TEMP, "tl-roundtrip.json")
    open(rp_path, "w", encoding="utf-8").write(raw)
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(250)
    clear_store(pg)
    reload(pg)
    check("⑩ 清空后=%d" % TOTAL, cards(pg) == TOTAL, "got %d" % cards(pg))
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.locator('#userModal input[type="file"]').set_input_files(rp_path)
    pg.wait_for_timeout(400)
    pg.get_by_role("button", name="继续", exact=True).click()
    wait_cards(pg, TOTAL + 1)
    ts2 = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]').map(e=>e.title)")
    check("⑩ 载体3 文件导入还原", ts2 == ["覆盖B"], str(ts2))
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(300)

    # ---------------- ⑪ 删除 / 隐藏 / 恢复 ----------------
    bid = pg.evaluate("() => JSON.parse(localStorage.getItem('tl-user-events-v1')||'[]')[0].id")
    pg.click('article[data-eid="%s"] .del' % bid)
    pg.wait_for_timeout(300)
    pg.get_by_role("button", name="永久删除", exact=True).click()
    wait_cards(pg, TOTAL)
    rows = up_rows(pg)
    check("⑪ 删除自定义后=%d 且倒计时消失" % TOTAL, not any(r["t"] == "覆盖B" for r in rows))
    title2id = {e["title"]: str(e["id"]) for e in EVENTS}
    tgt_id, tgt_title = None, None
    for r in up_rows(pg):
        if r["t"] in title2id:
            tgt_title, tgt_id = r["t"], title2id[r["t"]]
            break
    check("⑪ 找到内置条目用于隐藏", bool(tgt_id), str(tgt_title))
    if tgt_id:
        pg.click('article[data-eid="%s"] .del' % tgt_id)
        pg.wait_for_timeout(300)
        pg.get_by_role("button", name="隐藏", exact=True).click()
        wait_cards(pg, TOTAL - 1)
        check("⑪ 隐藏后=%d 且从 UPCOMING 消失" % (TOTAL - 1),
              all(r["t"] != tgt_title for r in up_rows(pg)))
        pg.click("#manageBtn")
        pg.wait_for_timeout(350)
        pg.get_by_role("button", name="恢复", exact=True).click()
        wait_cards(pg, TOTAL)
        check("⑪ 恢复后回到 %d" % TOTAL, any(r["t"] == tgt_title for r in up_rows(pg)))
        pg.keyboard.press("Escape")
        pg.wait_for_timeout(250)

    # ---------------- ⑫ 375px / 深浅色截图 / 控制台 ----------------
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.screenshot(path=os.path.join(SHOTS, "userlayer-modal-dark.png"))
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(200)
    pg.click("#themeBtn")
    pg.wait_for_timeout(400)
    pg.click("#manageBtn")
    pg.wait_for_timeout(350)
    pg.screenshot(path=os.path.join(SHOTS, "userlayer-modal-light.png"))
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(200)
    pg.click("#themeBtn")
    pg.wait_for_timeout(300)
    try:
        pg.screenshot(path=os.path.join(SHOTS, "userlayer-desktop.png"), full_page=True)
    except Exception:
        pass

    pm = b.new_page(viewport={"width": 375, "height": 812}, device_scale_factor=2)
    wire(pm)
    pm.goto(base, wait_until="load", timeout=60000)
    pm.wait_for_timeout(500)
    pm.evaluate("() => { try { localStorage.clear(); } catch(e){} }")
    pm.reload(wait_until="load")
    pm.wait_for_timeout(2500)
    ui_add(pm, "手机验收条目", "competition", d5)
    pm.wait_for_selector(".userToast", state="visible", timeout=6000)
    sw = pm.evaluate("document.documentElement.scrollWidth")
    check("⑫ 375px 提示条无横向滚动", sw <= 376, "scrollWidth=%d" % sw)
    pm.screenshot(path=os.path.join(SHOTS, "userlayer-mobile-toast.png"))
    pm.click("#addBtn") if False else None
    pm.keyboard.press("Escape")
    pm.wait_for_timeout(200)

    # 降级：localStorage 被禁用
    ctx = b.new_context(viewport={"width": 1200, "height": 800})
    p2 = ctx.new_page()
    wire(p2)
    p2.add_init_script("Object.defineProperty(window, 'localStorage', { get: function () { throw new Error('denied'); } });")
    p2.goto(base, wait_until="load", timeout=60000)
    p2.wait_for_timeout(2500)
    nd = p2.evaluate("document.querySelectorAll('.card').length")
    check("⑫ 禁用存储时只读正常", nd == TOTAL, "got %s" % nd)
    check("⑫ 入口已禁用", p2.evaluate("document.getElementById('addBtn').disabled") and p2.evaluate("document.getElementById('manageBtn').disabled"))
    note_ok = p2.evaluate("(document.body.textContent||'').indexOf('当前环境不支持本地存储') >= 0")
    check("⑫ 禁用提示文案存在", note_ok)
    ctx.close()

    b.close()

check("⑬ 总体：控制台 error 总数=0", len(ERRORS) == 0, "errors=%d %s" % (len(ERRORS), ERRORS[:3]))
print("\n== 汇总: %d 通过 / %d 失败 ==" % (len(PASS), len(FAIL)))
for f in FAIL:
    print("  FAIL:", f)
sys.exit(1 if FAIL else 0)
