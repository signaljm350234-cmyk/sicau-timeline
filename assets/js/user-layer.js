/* ==========================================================================
   user-layer.js — v1.1 个人条目层
   功能：添加 / 删除（自定义=永久删除；内置=本机隐藏可恢复）/ 管理面板 / 导入导出 / 降级
   存储：tl-user-events-v1（自定义条目数组）· tl-hidden-ids-v1（内置条目隐藏名单）
   原则：合并无状态每次重算；所有 localStorage 读写 try/catch；用户输入一律转义；
         无内联脚本 / 无内联事件属性（CSP: script-src 'self'）。
   接口：window.UserLayer = { merge, validate, exportData, importData, init, listBuiltIn }
   ========================================================================== */
(function () {
  "use strict";
  var W = window, D = document;

  var KEY_EVENTS = "tl-user-events-v1";
  var KEY_HIDDEN = "tl-hidden-ids-v1";
  var LIMIT_EVENTS = 200;
  var LIMIT_HIDDEN = 300;

  var CATS = ["competition", "second_classroom", "evaluation", "course", "award"];
  var CAT_LABEL = {
    competition: "竞赛与双创", second_classroom: "二课活动",
    evaluation: "综测加分", course: "课程与考试", award: "评奖评优与推免"
  };
  var CAT_COL = {
    competition: "var(--c-competition)", second_classroom: "var(--c-second)",
    evaluation: "var(--c-eval)", course: "var(--c-course)", award: "var(--c-award)"
  };
  var LEVELS = ["国家级", "省级", "校级", "院级"];
  var SEMS = [
    ["2025-2026-1", "大一上"], ["2025-2026-2", "大一下"],
    ["2026-2027-1", "大二上"], ["2026-2027-2", "大二下"],
    ["2027-2028-1", "大三上"], ["2027-2028-2", "大三下"],
    ["2028-2029-1", "大四上"], ["2028-2029-2", "大四下"]
  ];
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  var URL_RE = /^https?:\/\//i;

  var TL = null;
  var storageOK = false;
  var brokenData = false;
  var root = null;
  var dlgStack = [];
  var toastTimer = null;
  var lastFocus = null;

  /* ---------------- 基础工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function el(tag, cls, text) {
    var n = D.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function warn(msg, e) {
    try { W.console.warn("[user-layer] " + msg, e || ""); } catch (_) { }
  }
  function todayStr() {
    var n = new Date();
    return n.getFullYear() + "-" + String(n.getMonth() + 1).padStart(2, "0") + "-" + String(n.getDate()).padStart(2, "0");
  }
  function rnd4() { return String(Math.floor(1000 + Math.random() * 9000)); }
  function semOf(dateStr) {
    var y = +dateStr.slice(0, 4), m = +dateStr.slice(5, 7);
    if (m >= 8) return y + "-" + (y + 1) + "-1";
    if (m <= 1) return (y - 1) + "-" + y + "-1";
    return (y - 1) + "-" + y + "-2";
  }
  function semLabel(code) {
    for (var i = 0; i < SEMS.length; i++) { if (SEMS[i][0] === code) return SEMS[i][1]; }
    return code;
  }
  function semExists(code) {
    return SEMS.some(function (s) { return s[0] === code; });
  }

  /* ---------------- 存储（全部 try/catch） ---------------- */
  function storageProbe() {
    try {
      var k = "__tl_probe__";
      W.localStorage.setItem(k, "1");
      W.localStorage.removeItem(k);
      return true;
    } catch (e) { warn("localStorage 不可用", e); return false; }
  }
  function readArr(key) {
    try {
      var raw = W.localStorage.getItem(key);
      if (!raw) return [];
      var v = JSON.parse(raw);
      if (!Array.isArray(v)) throw new Error("不是数组");
      return v;
    } catch (e) { brokenData = true; warn("本地数据读取失败 " + key, e); return []; }
  }
  function writeArr(key, arr) {
    try {
      W.localStorage.setItem(key, JSON.stringify(arr));
      return true;
    } catch (e) { warn("本地数据写入失败 " + key, e); toast("保存失败：本地存储不可用"); return false; }
  }
  function userEvents() {
    return readArr(KEY_EVENTS).filter(function (x) { return x && typeof x === "object" && x.id; });
  }
  function hiddenIds() { return readArr(KEY_HIDDEN).map(String); }

  /* ---------------- 接口：合并 ---------------- */
  function merge(builtIn) {
    var hid = {};
    hiddenIds().forEach(function (id) { hid[id] = 1; });
    var base = (builtIn || []).filter(function (e) { return e && !hid[String(e.id)]; });
    return base.concat(userEvents());
  }
  function listBuiltIn() {
    return (W.EVENTS || []).map(function (e) { return { id: String(e.id), title: e.title }; });
  }

  /* ---------------- 接口：校验 ---------------- */
  function validate(d) {
    var errs = [];
    d = d || {};
    var t = String(d.title == null ? "" : d.title).trim();
    if (!t || t.length > 80) errs.push("标题需为 1–80 字");
    var cats = d.categories || [];
    if (!cats.length || cats.some(function (c) { return CATS.indexOf(c) < 0; })) errs.push("类别需至少选择 1 个");
    if (LEVELS.indexOf(d.level) < 0) errs.push("级别无效");
    if (!semExists(d.semester)) errs.push("学期无效");
    [["registration", "报名"], ["event", "活动"]].forEach(function (p) {
      var o = d[p[0]] || {};
      var s = String(o.start == null ? "" : o.start).trim();
      var e2 = String(o.end == null ? "" : o.end).trim();
      if (s && !DATE_RE.test(s)) errs.push(p[1] + "开始日期格式错误");
      if (e2 && !DATE_RE.test(e2)) errs.push(p[1] + "结束日期格式错误");
      if (s && e2 && e2 < s) errs.push(p[1] + "结束日期早于开始日期");
    });
    var u = "";
    if (d.sources && d.sources[0] && d.sources[0].url) u = String(d.sources[0].url).trim();
    if (u && !URL_RE.test(u)) errs.push("来源 URL 仅支持 http:// 或 https://");
    return errs;
  }

  /* 草案/导入对象 → 完整事件对象（归一化，保证 shape 与内置同构） */
  function toEvent(d, forceNewId, seenIds) {
    var id = String(d.id == null ? "" : d.id);
    if (forceNewId || !/^user-/.test(id) || (seenIds && seenIds[id])) {
      id = "user-" + Date.now() + "-" + rnd4();
      while (seenIds && seenIds[id]) id = "user-" + Date.now() + "-" + rnd4();
    }
    if (seenIds) seenIds[id] = 1;
    var reg = d.registration || {}, ev = d.event || {};
    var srcUrl = "";
    if (d.sources && d.sources[0] && d.sources[0].url) srcUrl = String(d.sources[0].url).trim();
    var srcName = (d.sources && d.sources[0] && d.sources[0].title) ? String(d.sources[0].title).trim() : "";
    var catOk = (d.categories || []).filter(function (c) { return CATS.indexOf(c) >= 0; });
    return {
      id: id,
      title: String(d.title || "").trim(),
      categories: catOk,
      level: LEVELS.indexOf(d.level) >= 0 ? d.level : "校级",
      organizer: "",
      audience_tag: "",
      semester: d.semester,
      registration: {
        start: String(reg.start == null ? "" : reg.start).trim(),
        end: String(reg.end == null ? "" : reg.end).trim(),
        note: ""
      },
      event: {
        start: String(ev.start == null ? "" : ev.start).trim(),
        end: String(ev.end == null ? "" : ev.end).trim(),
        note: ""
      },
      points: {
        second_classroom: (d.points && d.points.second_classroom) ? String(d.points.second_classroom).trim() : "",
        zongce: (d.points && d.points.zongce) ? String(d.points.zongce).trim() : ""
      },
      sources: srcUrl ? [{ title: srcName || "自填来源", url: srcUrl, published: "", accessed: todayStr() }] : [],
      confidence: "custom",
      basis: "",
      recurring: false,
      notes: String(d.notes || "").trim()
    };
  }

  /* ---------------- Toast ---------------- */
  var toastEl = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = el("div", "tl-toast");
      toastEl.setAttribute("role", "status");
      D.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2600);
  }

  /* ---------------- 模态框（栈式） ---------------- */
  function focusFirst(d) {
    var t = d.querySelector("input, select, textarea, button");
    if (t) { try { t.focus(); } catch (e) { } }
  }
  function pushDialog(buildFn, label) {
    if (!root) return null;
    var prev = dlgStack[dlgStack.length - 1];
    if (prev) prev.classList.add("tl-hide");
    var d = el("div", "tl-dialog");
    d.setAttribute("role", "dialog");
    d.setAttribute("aria-modal", "true");
    d.setAttribute("aria-label", label || "对话框");
    dlgStack.push(d);
    root.hidden = false;
    root.appendChild(d);
    buildFn(d);
    focusFirst(d);
    return d;
  }
  function popDialog() {
    var d = dlgStack.pop();
    if (d && d.parentNode) d.parentNode.removeChild(d);
    var prev = dlgStack[dlgStack.length - 1];
    if (prev) {
      prev.classList.remove("tl-hide");
      focusFirst(prev);
    } else {
      root.hidden = true;
      if (lastFocus) { try { lastFocus.focus(); } catch (e) { } lastFocus = null; }
    }
  }
  function btn(cls, text, onClick) {
    var b = el("button", "tl-btn " + (cls || ""), text);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function confirmDialog(title, body, okText, danger, onOk) {
    pushDialog(function (d) {
      d.appendChild(el("h3", null, title));
      var p = el("p", "tl-note");
      p.textContent = body;
      d.appendChild(p);
      var acts = el("div", "tl-actions");
      acts.appendChild(btn("ghost", "取消", popDialog));
      acts.appendChild(btn(danger ? "danger" : "primary", okText, function () {
        popDialog();
        onOk();
      }));
      d.appendChild(acts);
    }, title);
  }

  /* ---------------- 添加表单 ---------------- */
  function openAddDialog() {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    lastFocus = D.activeElement;
    pushDialog(function (d) {
      d.appendChild(el("h3", null, "添加条目"));
      var errBox = el("div", "tl-err");
      d.appendChild(errBox);

      function row(labelText, node) {
        var r = el("div", "tl-row");
        var l = el("label", null, labelText);
        r.appendChild(l);
        r.appendChild(node);
        d.appendChild(r);
        return r;
      }
      var titleIn = el("input", "tl-input");
      titleIn.type = "text"; titleIn.maxLength = 80; titleIn.placeholder = "必填，1–80 字"; titleIn.setAttribute("data-f", "title");
      row("标题 *", titleIn);

      var chips = el("div", "tl-chips");
      var selected = {};
      CATS.forEach(function (c) {
        var b = el("button", "uchip");
        b.type = "button";
        b.setAttribute("data-cat", c);
        b.setAttribute("aria-pressed", "false");
        var dot = el("span", "dot");
        dot.setAttribute("style", "background:" + CAT_COL[c]);  /* 常量色，非用户输入 */
        b.appendChild(dot);
        b.appendChild(D.createTextNode(CAT_LABEL[c]));
        b.addEventListener("click", function () {
          if (selected[c]) { delete selected[c]; b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); }
          else { selected[c] = 1; b.classList.add("on"); b.setAttribute("aria-pressed", "true"); }
        });
        chips.appendChild(b);
      });
      row("类别 *（可多选）", chips);

      var lvSel = el("select", "tl-input");
      LEVELS.forEach(function (l) { var o = el("option", null, l); o.value = l; lvSel.appendChild(o); });
      lvSel.value = "校级"; lvSel.setAttribute("data-f", "level");
      row("级别", lvSel);

      var regS = el("input", "tl-input"), regE = el("input", "tl-input");
      regS.type = "date"; regE.type = "date"; regS.setAttribute("data-f", "regS"); regE.setAttribute("data-f", "regE");
      var reg2 = el("div", "tl-2col"); reg2.appendChild(regS); reg2.appendChild(regE);
      row("报名起止（可空）", reg2);

      var evS = el("input", "tl-input"), evE = el("input", "tl-input");
      evS.type = "date"; evE.type = "date"; evS.setAttribute("data-f", "evS"); evE.setAttribute("data-f", "evE");
      var ev2 = el("div", "tl-2col"); ev2.appendChild(evS); ev2.appendChild(evE);
      row("活动起止（可空）", ev2);

      var semSel = el("select", "tl-input");
      var ph = el("option", null, "（按日期自动/请手动选择）");
      ph.value = "";
      semSel.setAttribute("data-f", "sem"); semSel.appendChild(ph);
      SEMS.forEach(function (s) { var o = el("option", null, s[1] + "（" + s[0] + "）"); o.value = s[0]; semSel.appendChild(o); });
      var hint = el("div", "tl-hint");
      row("学期所属", semSel);
      d.appendChild(hint);
      var manualSem = false;
      semSel.addEventListener("change", function () { if (semSel.value) manualSem = true; });

      function autoSem() {
        var cands = [regS.value, evS.value].filter(function (x) { return x; }).sort();
        if (!cands.length) return "";
        return semOf(cands[0]);
      }
      function refreshHint() {
        var code = autoSem();
        if (code && !manualSem) semSel.value = code;
        if (semSel.value) {
          hint.textContent = "将归入：" + semLabel(semSel.value) + "（" + semSel.value + "）";
          hint.classList.remove("warn");
        } else {
          hint.textContent = "两个日期均为空——请手动选择学期";
          hint.classList.add("warn");
        }
      }
      [regS, evS].forEach(function (i) { i.addEventListener("input", refreshHint); i.addEventListener("change", refreshHint); });

      var scIn = el("input", "tl-input"); scIn.type = "text"; scIn.placeholder = "如：志愿服务 0.5 分/2 小时（可空）"; scIn.setAttribute("data-f", "sc");
      row("二课说明", scIn);
      var zcIn = el("input", "tl-input"); zcIn.type = "text"; zcIn.placeholder = "如：附加分×25%（可空）"; zcIn.setAttribute("data-f", "zc");
      row("综测说明", zcIn);
      var notesIn = el("input", "tl-input"); notesIn.type = "text"; notesIn.placeholder = "（可空）";
      row("备注", notesIn);
      var srcNameIn = el("input", "tl-input"); srcNameIn.type = "text"; srcNameIn.placeholder = "来源名称（可空）";
      row("来源名称", srcNameIn);
      var srcUrlIn = el("input", "tl-input"); srcUrlIn.type = "url"; srcUrlIn.setAttribute("data-f", "srcUrl"); srcUrlIn.placeholder = "https://…（可空，仅 http/https）";
      row("来源 URL", srcUrlIn);

      refreshHint();

      var acts = el("div", "tl-actions");
      acts.appendChild(btn("ghost", "取消", popDialog));
      acts.appendChild(btn("primary", "保存", function () {
        var draft = {
          title: titleIn.value,
          categories: CATS.filter(function (c) { return selected[c]; }),
          level: lvSel.value,
          semester: semSel.value,
          registration: { start: regS.value, end: regE.value },
          event: { start: evS.value, end: evE.value },
          points: { second_classroom: scIn.value, zongce: zcIn.value },
          notes: notesIn.value,
          sources: srcUrlIn.value.trim() ? [{ title: srcNameIn.value, url: srcUrlIn.value, published: "", accessed: todayStr() }] : []
        };
        var errs = validate(draft);
        if (!errs.length && userEvents().length >= LIMIT_EVENTS) errs.push("已达到自定义条目上限（200 条）");
        if (errs.length) {
          errBox.textContent = errs.join("；");
          errBox.classList.add("show");
          return;
        }
        var arr = userEvents();
        arr.push(toEvent(draft, true, null));
        if (!writeArr(KEY_EVENTS, arr)) return;
        popDialog();
        TL.refreshAll();
        toast("已添加：" + draft.title.trim());
      }));
      d.appendChild(acts);
    }, "添加条目");
  }

  /* ---------------- 删除 / 隐藏 ---------------- */
  function handleDelete(id) {
    if (!storageOK) { toast("当前环境不支持本地存储，无法修改"); return; }
    var mine = null;
    userEvents().forEach(function (x) { if (String(x.id) === id) mine = x; });
    if (mine) {
      confirmDialog("删除自定义条目",
        "确定永久删除「" + mine.title + "」吗？此操作不可恢复（导出 JSON 可提前备份）。",
        "永久删除", true, function () {
          var arr = userEvents().filter(function (x) { return String(x.id) !== id; });
          if (writeArr(KEY_EVENTS, arr)) {
            TL.refreshAll();
            toast("已删除");
          }
        });
      return;
    }
    var builtin = null;
    (W.EVENTS || []).forEach(function (x) { if (String(x.id) === id) builtin = x; });
    if (!builtin) { TL.refreshAll(); return; }
    confirmDialog("隐藏内置条目",
      "将隐藏「" + builtin.title + "」（仅在本机生效，可在「管理」中恢复）。",
      "隐藏", false, function () {
        var h = hiddenIds();
        if (h.length >= LIMIT_HIDDEN) { toast("隐藏数量已达上限（300 条）"); return; }
        if (h.indexOf(id) < 0) h.push(id);
        if (writeArr(KEY_HIDDEN, h)) {
          TL.refreshAll();
          toast("已隐藏，可在「管理」中恢复");
        }
      });
  }

  /* ---------------- 管理面板 ---------------- */
  function openManageDialog() {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    lastFocus = D.activeElement;
    pushDialog(function (d) {
      d.appendChild(el("h3", null, "管理我的数据"));
      if (brokenData) {
        var wbar = el("div", "tl-err show");
        wbar.textContent = "本地数据异常，可一键重置。";
        var rb = btn("danger", "重置本地数据", function () {
          confirmDialog("重置本地数据", "将清除本机保存的自定义条目与隐藏名单，确定继续？", "重置", true, function () {
            try {
              W.localStorage.removeItem(KEY_EVENTS);
              W.localStorage.removeItem(KEY_HIDDEN);
            } catch (e) { }
            brokenData = false;
            TL.refreshAll();
            popDialog();
            openManageDialog();
            toast("已重置");
          });
        });
        wbar.appendChild(rb);
        d.appendChild(wbar);
      }

      var host = el("div");
      d.appendChild(host);

      function render() {
        host.innerHTML = "";
        /* ① 我的条目 */
        var sec1 = el("div", "tl-sec");
        var mine = userEvents();
        sec1.appendChild(el("h4", null, "我的条目（" + mine.length + "）"));
        if (!mine.length) {
          sec1.appendChild(el("div", "tl-note", "暂无自定义条目。"));
        } else {
          var list1 = el("div", "tl-list");
          mine.forEach(function (ev) {
            var it = el("div", "tl-item");
            it.appendChild(el("span", "t", ev.title));
            var del = btn("danger", "删除", function () {
              confirmDialog("删除自定义条目", "确定永久删除「" + ev.title + "」吗？此操作不可恢复。", "永久删除", true, function () {
                var arr = userEvents().filter(function (x) { return String(x.id) !== String(ev.id); });
                if (writeArr(KEY_EVENTS, arr)) { TL.refreshAll(); render(); toast("已删除"); }
              });
            });
            it.appendChild(del);
            list1.appendChild(it);
          });
          sec1.appendChild(list1);
        }
        host.appendChild(sec1);

        /* ② 已隐藏的内置条目 */
        var sec2 = el("div", "tl-sec");
        var hid = hiddenIds();
        var titleMap = {};
        listBuiltIn().forEach(function (b) { titleMap[b.id] = b.title; });
        sec2.appendChild(el("h4", null, "已隐藏的内置条目（" + hid.length + "）"));
        if (!hid.length) {
          sec2.appendChild(el("div", "tl-note", "暂无隐藏条目。"));
        } else {
          var list2 = el("div", "tl-list");
          hid.forEach(function (id) {
            var it = el("div", "tl-item");
            it.appendChild(el("span", "t", titleMap[id] || id));
            it.appendChild(btn("ghost", "恢复", function () {
              var h2 = hiddenIds().filter(function (x) { return x !== id; });
              if (writeArr(KEY_HIDDEN, h2)) { TL.refreshAll(); render(); toast("已恢复"); }
            }));
            list2.appendChild(it);
          });
          sec2.appendChild(list2);
          sec2.appendChild(btn("ghost", "恢复全部（" + hid.length + " 条）", function () {
            confirmDialog("恢复全部", "将恢复全部 " + hid.length + " 条已隐藏的内置条目，确定继续？", "恢复全部", false, function () {
              if (writeArr(KEY_HIDDEN, [])) { TL.refreshAll(); render(); toast("已全部恢复"); }
            });
          }));
        }
        host.appendChild(sec2);

        /* ③ 数据保险 */
        var sec3 = el("div", "tl-sec");
        sec3.appendChild(el("h4", null, "数据保险"));
        var row3 = el("div", "tl-actions");
        row3.appendChild(btn("ghost", "导出 JSON", function (e) { exportData(); }));
        var fileIn = el("input");
        fileIn.type = "file";
        fileIn.accept = "application/json,.json";
        fileIn.classList.add("tl-hide");
        fileIn.addEventListener("change", function () {
          var f = fileIn.files && fileIn.files[0];
          fileIn.value = "";
          if (f) importFile(f);
        });
        row3.appendChild(fileIn);
        row3.appendChild(btn("ghost", "导入 JSON", function () { fileIn.click(); }));
        row3.appendChild(btn("danger", "清空我的所有自定义数据", function () {
          confirmDialog("清空自定义数据", "将删除本机全部自定义条目并清除隐藏名单，确定继续？（可先导出备份）", "清空", true, function () {
            try {
              W.localStorage.removeItem(KEY_EVENTS);
              W.localStorage.removeItem(KEY_HIDDEN);
            } catch (e) { }
            brokenData = false;
            TL.refreshAll();
            render();
            toast("已清空");
          });
        }));
        sec3.appendChild(row3);
        sec3.appendChild(el("div", "tl-note", "上限：自定义条目 200 条 / 隐藏 300 条。数据仅存于本机浏览器。"));
        host.appendChild(sec3);
      }
      render();
      d.appendChild(el("div", "tl-note", ""));
      var acts = el("div", "tl-actions");
      acts.appendChild(btn("ghost", "关闭", popDialog));
      d.appendChild(acts);
    }, "管理我的数据");
  }

  /* ---------------- 导出 / 导入 ---------------- */
  function exportData() {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    var data = { version: 1, events: userEvents(), hiddenIds: hiddenIds() };
    try {
      var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = D.createElement("a");
      a.href = url;
      a.download = "sicau-timeline-userdata-" + todayStr().replace(/-/g, "") + ".json";
      D.body.appendChild(a);
      a.click();
      D.body.removeChild(a);
      setTimeout(function () { try { URL.revokeObjectURL(url); } catch (e) { } }, 4000);
      toast("已导出 JSON（含自定义条目与隐藏名单）");
    } catch (e) { warn("导出失败", e); toast("导出失败：" + e.message); }
  }
  function importFile(file) {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var parsed = null;
      try { parsed = JSON.parse(String(reader.result)); }
      catch (e) { toast("导入失败：不是有效的 JSON 文件"); return; }
      var srcEvents = [], srcHidden = [];
      if (Array.isArray(parsed)) {
        srcEvents = parsed;
      } else if (parsed && typeof parsed === "object" && Array.isArray(parsed.events)) {
        srcEvents = parsed.events;
        srcHidden = Array.isArray(parsed.hiddenIds) ? parsed.hiddenIds : [];
      } else { toast("导入失败：文件结构不符"); return; }

      var seen = {};
      var good = [], bad = 0;
      srcEvents.slice(0, LIMIT_EVENTS + 50).forEach(function (raw) {
        if (good.length >= LIMIT_EVENTS) { bad++; return; }
        if (!raw || typeof raw !== "object") { bad++; return; }
        var errs = validate(raw);
        if (errs.length) { bad++; return; }
        good.push(toEvent(raw, false, seen));
      });
      if (!good.length) { toast("没有可导入的有效条目（无效 " + bad + " 条）"); return; }
      var hid = srcHidden
        .filter(function (x) { return typeof x === "string" && x && x.length <= 120; })
        .slice(0, LIMIT_HIDDEN);

      confirmDialog("导入确认",
        "将导入 " + good.length + " 条（无效 " + bad + " 条将被忽略），并替换当前的自定义条目与隐藏名单。确定继续？",
        "导入", false, function () {
          if (writeArr(KEY_EVENTS, good) && writeArr(KEY_HIDDEN, hid)) {
            TL.refreshAll();
            toast("已导入 " + good.length + " 条");
            popDialog();          /* 关闭管理面板，回到干净状态 */
          }
        });
    };
    reader.onerror = function () { toast("读取文件失败"); };
    reader.readAsText(file);
  }

  /* ---------------- 初始化 ---------------- */
  function init(tl) {
    TL = tl;
    root = D.getElementById("userModal");
    storageOK = storageProbe();
    var addBtn = D.getElementById("addBtn");
    var manageBtn = D.getElementById("manageBtn");
    if (addBtn && manageBtn) {
      if (storageOK) {
        addBtn.addEventListener("click", openAddDialog);
        manageBtn.addEventListener("click", openManageDialog);
      } else {
        addBtn.disabled = true;
        manageBtn.disabled = true;
        addBtn.title = "当前环境不支持本地存储";
        manageBtn.title = "当前环境不支持本地存储";
      }
    }
    if (root) {
      root.addEventListener("click", function (e) { if (e.target === root) popDialog(); });
    }
    D.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root && !root.hidden) popDialog();
    });
    /* 捕获阶段拦截删除按钮：阻止卡片展开等冒泡行为 */
    D.addEventListener("click", function (e) {
      var t = e.target;
      var b = t && t.closest ? t.closest("[data-del]") : null;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      handleDelete(String(b.getAttribute("data-del")));
    }, true);
  }

  W.UserLayer = {
    merge: merge,
    validate: validate,
    exportData: exportData,
    importData: importFile,
    init: init,
    listBuiltIn: listBuiltIn
  };
})();
