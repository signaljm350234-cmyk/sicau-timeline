/* ==========================================================================
   user-layer.js — v1.1 个人条目层 + 分享码同步 + F8 定位编排
   功能：添加 / 删除（自定义=永久删除；内置=本机隐藏可恢复）/ 管理面板 /
         三载体备份（分享码 TL1: / 个人书签链接 #u= / JSON 文件）/
         新条目定位动画（线性滚动 → 单次闪烁 → 黄色备份提示条）/ 降级
   存储：tl-user-events-v1（自定义条目）· tl-hidden-ids-v1（隐藏名单）· tl-uid-v1（本机随机 id）
   原则：合并无状态每次重算；localStorage 全 try/catch；用户输入/导入一律转义与校验；
         纯前端零网络传输；无内联脚本 / 无内联事件属性（CSP: script-src 'self'）。
   接口：window.UserLayer = { merge, validate, encode, decode, importData, exportData, init, listBuiltIn }
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
  var KEY_UID = "tl-uid-v1";
  var CODE_PREFIX = "TL1:";
  var CHECK_MSG = "码不完整或已被修改，请重新复制完整内容";
  /* F8 动画常量（集中于此，便于调整） */
  var SCROLL_PX_PER_MS = 1.8;
  var SCROLL_MIN_MS = 350;
  var SCROLL_MAX_MS = 1000;
  var FLASH_DELAY_MS = 0;
  var FLASH_MS = 300;
  var TOAST_MS = 9000;

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

  /* ---------------- 本机随机 UID（仅随分享码携带，不做任何统计） ---------------- */
  function uuid() {
    var hex = "0123456789abcdef", s = "";
    for (var i = 0; i < 32; i++) s += hex[(Math.random() * 16) | 0];
    return s.slice(0, 8) + "-" + s.slice(8, 12) + "-4" + s.slice(13, 16) + "-" +
      "89ab".charAt((Math.random() * 4) | 0) + s.slice(17, 20) + "-" + s.slice(20);
  }
  function getUid() {
    try {
      var u = W.localStorage.getItem(KEY_UID);
      if (u && typeof u === "string" && u.length >= 8 && u.length <= 64) return u;
    } catch (e) { }
    var n = uuid();
    try { W.localStorage.setItem(KEY_UID, n); } catch (e) { }
    return n;
  }

  /* ---------------- 分享码编解码（自实现，零第三方；TL1: 前缀） ---------------- */
  var B64CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  function b64urlFromBytes(bytes) {
    var out = "", i, n1, n2;
    for (i = 0; i + 2 < bytes.length; i += 3) {
      var n = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      out += B64CHARS.charAt((n >> 18) & 63) + B64CHARS.charAt((n >> 12) & 63) +
        B64CHARS.charAt((n >> 6) & 63) + B64CHARS.charAt(n & 63);
    }
    var rem = bytes.length - i;
    if (rem === 1) {
      n1 = bytes[i] << 16;
      out += B64CHARS.charAt((n1 >> 18) & 63) + B64CHARS.charAt((n1 >> 12) & 63);
    } else if (rem === 2) {
      n2 = (bytes[i] << 16) | (bytes[i + 1] << 8);
      out += B64CHARS.charAt((n2 >> 18) & 63) + B64CHARS.charAt((n2 >> 12) & 63) + B64CHARS.charAt((n2 >> 6) & 63);
    }
    return out;
  }
  function bytesFromB64url(s) {
    if (/[^A-Za-z0-9\-_]/.test(s)) throw new Error("分享码格式错误（含非法字符）");
    var out = [], buf = 0, bits = 0, i, v;
    for (i = 0; i < s.length; i++) {
      v = B64CHARS.indexOf(s.charAt(i));
      if (v < 0) throw new Error("分享码格式错误（含非法字符）");
      buf = (buf << 6) | v;
      bits += 6;
      if (bits >= 8) { bits -= 8; out.push((buf >> bits) & 255); }
    }
    return new Uint8Array(out);
  }
  function fnv1a(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 16777619) >>> 0;
    }
    return ("0000000" + h.toString(16)).slice(-8).slice(0, 4);
  }
  function canCodecStream() {
    return typeof W.CompressionStream === "function" && typeof W.DecompressionStream === "function" &&
      typeof W.Blob === "function" && typeof W.Response === "function";
  }
  function deflateRaw(bytes) {
    try {
      var stream = new W.Blob([bytes]).stream().pipeThrough(new W.CompressionStream("deflate-raw"));
      return new W.Response(stream).arrayBuffer().then(function (buf) { return new Uint8Array(buf); });
    } catch (e) { return Promise.reject(e); }
  }
  function inflateRaw(bytes) {
    try {
      var stream = new W.Blob([bytes]).stream().pipeThrough(new W.DecompressionStream("deflate-raw"));
      return new W.Response(stream).arrayBuffer().then(function (buf) { return new Uint8Array(buf); });
    } catch (e) { return Promise.reject(e); }
  }
  /* 紧凑化：categories / level / semester 映射为索引；其余字段用短键 */
  function compactPayload(entries, hidden) {
    var p = { v: 1, t: new Date().toISOString(), uid: getUid(), e: [], h: [] };
    p.h = (hidden || []).slice(0, LIMIT_HIDDEN);
    (entries || []).slice(0, LIMIT_EVENTS).forEach(function (e) {
      var src = (e.sources && e.sources[0]) || {};
      p.e.push({
        i: String(e.id), ti: String(e.title || ""),
        c: (e.categories || []).map(function (x) { return CATS.indexOf(x); }).filter(function (x) { return x >= 0; }),
        l: LEVELS.indexOf(e.level),
        s: SEMS.map(function (x) { return x[0]; }).indexOf(e.semester),
        r: [e.registration && e.registration.start || "", e.registration && e.registration.end || ""],
        v: [e.event && e.event.start || "", e.event && e.event.end || ""],
        p2: [e.points && e.points.second_classroom || "", e.points && e.points.zongce || ""],
        n: String(e.notes || ""),
        su: String(src.url || ""), sn: String(src.title || "")
      });
    });
    return p;
  }
  function expandPayload(p) {
    var events = [], hidden = [];
    (p.e || []).forEach(function (x) {
      if (!x || typeof x !== "object") return;
      events.push({
        id: String(x.i || ""),
        title: String(x.ti || ""),
        categories: (x.c || []).map(function (k) { return CATS[k]; }).filter(Boolean),
        level: LEVELS[x.l] || "",
        semester: (SEMS[x.s] || [])[0] || "",
        registration: { start: (x.r && x.r[0]) || "", end: (x.r && x.r[1]) || "" },
        event: { start: (x.v && x.v[0]) || "", end: (x.v && x.v[1]) || "" },
        points: { second_classroom: (x.p2 && x.p2[0]) || "", zongce: (x.p2 && x.p2[1]) || "" },
        notes: String(x.n || ""),
        sources: x.su ? [{ title: String(x.sn || "自填来源"), url: String(x.su) }] : []
      });
    });
    hidden = (p.h || []).filter(function (x) { return typeof x === "string" && x; });
    return { events: events, hidden: hidden };
  }
  function encode(entries, hidden) {
    var json = JSON.stringify(compactPayload(entries, hidden));
    var bytes = new TextEncoder().encode(json);
    var useZ = canCodecStream();
    var work = useZ ? deflateRaw(bytes) : Promise.resolve(bytes);
    return work.then(function (out) {
      var content = b64urlFromBytes(out instanceof Uint8Array ? out : new Uint8Array(out));
      return CODE_PREFIX + (useZ ? "z" : "p") + fnv1a(content) + ":" + content;
    });
  }
  function decode(code) {
    try {
      var s = String(code == null ? "" : code).replace(/\s+/g, "");
      if (s.slice(0, CODE_PREFIX.length) !== CODE_PREFIX) {
        return Promise.reject(new Error("不是本应用的分享码（应以 TL1: 开头）"));
      }
      if (s.length > 60000) return Promise.reject(new Error("分享码内容过长，已拒绝"));
      var flag = s.charAt(CODE_PREFIX.length);
      if (flag !== "z" && flag !== "p") return Promise.reject(new Error("分享码格式错误（标志位异常）"));
      var rest = s.slice(CODE_PREFIX.length + 1);
      var ci = rest.indexOf(":");
      if (ci < 0) return Promise.reject(new Error(CHECK_MSG));
      var chk = rest.slice(0, ci), content = rest.slice(ci + 1);
      if (chk !== fnv1a(content)) return Promise.reject(new Error(CHECK_MSG));
      var bytes = bytesFromB64url(content);
      var work;
      if (flag === "z") {
        if (!canCodecStream()) return Promise.reject(new Error("当前浏览器不支持解压此分享码，请升级浏览器或改用 JSON 文件"));
        work = inflateRaw(bytes);
      } else {
        work = Promise.resolve(bytes);
      }
      return work.then(function (raw) {
        var obj = null;
        try { obj = JSON.parse(new TextDecoder().decode(raw)); }
        catch (e) { throw new Error("分享码内容损坏，无法解析"); }
        if (!obj || obj.v !== 1 || !Array.isArray(obj.e)) throw new Error("分享码版本不支持或内容不完整");
        var ex = expandPayload(obj);
        return { events: ex.events, hidden: ex.hidden, uid: String(obj.uid || ""), t: String(obj.t || "") };
      });
    } catch (e) {
      return Promise.reject(e);
    }
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
  function confirmDialog(title, body, okText, danger, onOk, onCancel) {
    pushDialog(function (d) {
      d.appendChild(el("h3", null, title));
      var p = el("p", "tl-note");
      p.textContent = body;
      d.appendChild(p);
      var acts = el("div", "tl-actions");
      acts.appendChild(btn("ghost", "取消", function () { popDialog(); if (onCancel) onCancel(); }));
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
        var ne = toEvent(draft, true, null);
        arr.push(ne);
        if (!writeArr(KEY_EVENTS, arr)) return;
        popDialog();
        addedFlow(String(ne.id));   /* F1：关闭表单 → 筛选复位 → F8 编排 */
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
  function openManageDialog(anchorBackup) {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    lastFocus = D.activeElement;
    var dlg = pushDialog(function (d) {
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

        /* ③ 备份与同步（F7 三载体；锚点 um-backup） */
        var sec3 = el("div", "tl-sec");
        sec3.id = "um-backup";
        sec3.appendChild(el("h4", null, "备份与同步"));
        sec3.appendChild(el("div", "tl-note", "三种载体任选其一：分享码文本 / 个人书签链接 / JSON 文件。全部仅在本机处理，不发送任何数据。"));

        var box = el("textarea", "tl-code");
        box.readOnly = true;
        box.hidden = true;
        box.setAttribute("data-f", "codebox");
        sec3.appendChild(box);
        var codeActs = el("div", "tl-actions");
        codeActs.hidden = true;
        var cpBtn = btn("ghost", "复制", function () { copyText(box.value, box); });
        cpBtn.setAttribute("data-f", "copycode");
        codeActs.appendChild(cpBtn);
        sec3.appendChild(codeActs);
        var codeNote = el("div", "tl-note tl-hide");
        codeNote.textContent = "① 换设备 / 清缓存可用此码恢复；② 码含你的条目内容，请勿公开发送。";
        sec3.appendChild(codeNote);

        function gen(asLink) {
          var mine2 = userEvents(), hid2 = hiddenIds();
          if (!mine2.length && !hid2.length) { toast("本机暂无可备份的数据"); return; }
          toast("正在生成…");
          encode(mine2, hid2).then(function (code) {
            box.hidden = false;
            codeActs.hidden = false;
            codeNote.classList.remove("tl-hide");
            box.value = asLink ? linkWith(code) : code;
            try { box.scrollTop = 0; } catch (e) { }
          }, function (e) {
            toast("生成失败：" + (e && e.message ? e.message : "未知错误"));
          });
        }
        var genRow = el("div", "tl-actions");
        genRow.appendChild(btn("ghost", "生成分享码", function () { gen(false); }));
        genRow.appendChild(btn("ghost", "生成书签链接", function () { gen(true); }));
        genRow.appendChild(btn("ghost", "导出 JSON 文件", function () { exportData(); }));
        sec3.appendChild(genRow);

        var impBox = el("textarea", "tl-code");
        impBox.setAttribute("data-f", "impbox");
        impBox.rows = 3;
        impBox.placeholder = "粘贴分享码（TL1:…）或 JSON 备份内容";
        sec3.appendChild(impBox);
        var impRow = el("div", "tl-actions");
        var fileIn = el("input");
        fileIn.type = "file";
        fileIn.accept = ".json,.txt,application/json,text/plain";
        fileIn.classList.add("tl-hide");
        fileIn.addEventListener("change", function () {
          var f = fileIn.files && fileIn.files[0];
          fileIn.value = "";
          if (f) importFileF(f, "merge");
        });
        impRow.appendChild(fileIn);
        impRow.appendChild(btn("ghost", "从文件导入", function () { fileIn.click(); }));
        impRow.appendChild(btn("primary", "粘贴导入（合并）", function () { importText(impBox.value, "merge"); }));
        impRow.appendChild(btn("danger", "覆盖导入", function () { importText(impBox.value, "overwrite"); }));
        sec3.appendChild(impRow);
        host.appendChild(sec3);

        /* ④ 清空我的所有自定义数据（二次确认） */
        var sec4 = el("div", "tl-sec");
        sec4.appendChild(el("h4", null, "危险操作"));
        sec4.appendChild(btn("danger", "清空我的所有自定义数据", function () {
          confirmDialog("清空自定义数据",
            "将删除本机全部自定义条目并清除隐藏名单（内置数据不受影响）。确定继续？（可先导出备份）",
            "继续", true, function () {
              confirmDialog("再次确认", "此操作不可恢复。确定清空本机全部自定义数据？", "确定清空", true, function () {
                try {
                  W.localStorage.removeItem(KEY_EVENTS);
                  W.localStorage.removeItem(KEY_HIDDEN);
                } catch (e) { }
                brokenData = false;
                TL.refreshAll();
                render();
                toast("已清空");
              });
            });
        }));
        sec4.appendChild(el("div", "tl-note", "上限：自定义条目 200 条 / 隐藏 300 条。数据仅存于本机浏览器。"));
        host.appendChild(sec4);
      }
      render();
      d.appendChild(el("div", "tl-note", ""));
      var acts = el("div", "tl-actions");
      acts.appendChild(btn("ghost", "关闭", popDialog));
      d.appendChild(acts);
    }, "管理我的数据");
    if (anchorBackup && dlg) {
      setTimeout(function () {
        var sec = dlg.querySelector("#um-backup");
        if (sec) {
          var dr = dlg.getBoundingClientRect(), sr = sec.getBoundingClientRect();
          dlg.scrollTop = dlg.scrollTop + (sr.top - dr.top) - 10;
        }
      }, 30);
    }
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
  function linkWith(code) {
    var base;
    try {
      base = (W.location.origin && W.location.origin !== "null")
        ? W.location.origin + W.location.pathname
        : W.location.href.split("#")[0];
    } catch (e) { base = ""; }
    return base + "#u=" + code;
  }
  function copyText(text, srcEl) {
    function fallback() {
      try { if (srcEl && srcEl.select) { srcEl.focus(); srcEl.select(); } } catch (e) { }
      toast("已选中内容，请按 Ctrl+C / 长按复制");
    }
    try {
      if (W.navigator && W.navigator.clipboard && W.navigator.clipboard.writeText) {
        W.navigator.clipboard.writeText(text).then(function () { toast("已复制到剪贴板"); }, fallback);
      } else fallback();
    } catch (e) { fallback(); }
  }

  /* ---------------- 导入统一管线（分享码 / JSON 文本 / 文件） ---------------- */
  function parseSource(text) {
    var s = String(text == null ? "" : text).trim();
    if (!s) return Promise.reject(new Error("内容为空，请先粘贴分享码或 JSON 备份"));
    if (s.indexOf(CODE_PREFIX) === 0) {
      return decode(s).then(function (r) { return { events: r.events, hidden: r.hidden, uid: r.uid }; });
    }
    if (s.length > 200000) return Promise.reject(new Error("内容过长，已拒绝"));
    var obj = null;
    try { obj = JSON.parse(s); } catch (e) {
      return Promise.reject(new Error("无法识别：分享码应以 TL1: 开头，或粘贴完整 JSON 备份"));
    }
    var evs = [], hid = [];
    if (Array.isArray(obj)) evs = obj;
    else if (obj && typeof obj === "object") {
      evs = Array.isArray(obj.events) ? obj.events : (Array.isArray(obj.e) ? obj.e : []);
      hid = Array.isArray(obj.hiddenIds) ? obj.hiddenIds : (Array.isArray(obj.h) ? obj.h : []);
    }
    if (!evs.length && !hid.length) return Promise.reject(new Error("内容中没有可导入的条目"));
    return Promise.resolve({ events: evs, hidden: hid, uid: String((obj && obj.uid) || "") });
  }
  function summarize(src, mode) {
    var good = [], bad = 0, skipped = 0, seen = {}, exist = {};
    var total = (src.events || []).length;
    userEvents().forEach(function (x) { exist[String(x.id)] = 1; });
    (src.events || []).slice(0, LIMIT_EVENTS + 50).forEach(function (raw) {
      if (good.length >= LIMIT_EVENTS) { bad++; return; }
      if (!raw || typeof raw !== "object") { bad++; return; }
      if (validate(raw).length) { bad++; return; }
      var rawId = String(raw.id == null ? "" : raw.id);
      if (mode === "merge" && (exist[rawId] || seen[rawId])) { skipped++; return; }
      var ev = toEvent(raw, false, seen);
      good.push(ev);
    });
    var hid = (src.hidden || [])
      .filter(function (x) { return typeof x === "string" && x && x.length <= 120; })
      .slice(0, LIMIT_HIDDEN);
    return { good: good, bad: bad, skipped: skipped, hid: hid, total: total, over: total > LIMIT_EVENTS };
  }
  function applyImport(sum, mode) {
    var events, hid;
    if (mode === "overwrite") {
      events = sum.good;
      hid = sum.hid;
    } else {
      events = userEvents();
      var have = {};
      events.forEach(function (x) { have[String(x.id)] = 1; });
      sum.good.forEach(function (e) { if (!have[String(e.id)]) { events.push(e); have[String(e.id)] = 1; } });
      if (events.length > LIMIT_EVENTS) events = events.slice(0, LIMIT_EVENTS);
      hid = hiddenIds();
      sum.hid.forEach(function (h) { if (hid.indexOf(h) < 0) hid.push(h); });
      hid = hid.slice(0, LIMIT_HIDDEN);
    }
    if (!writeArr(KEY_EVENTS, events)) return false;
    if (!writeArr(KEY_HIDDEN, hid)) return false;
    TL.refreshAll();
    return true;
  }
  function importText(text, mode) {
    mode = mode === "overwrite" ? "overwrite" : "merge";
    if (!storageOK) { toast("当前环境不支持本地存储"); return Promise.resolve(false); }
    return parseSource(text).then(function (src) {
      var sum = summarize(src, mode);
      if (sum.over) {
        toast("内容含 " + sum.total + " 条，超过本机上限 " + LIMIT_EVENTS + " 条，已拒绝");
        return false;
      }
      if (!sum.good.length && sum.bad > 0) {
        toast("没有可导入的有效条目（无效 " + sum.bad + " 条）");
        return false;
      }
      var smry = "新增 " + sum.good.length + " 条 / 跳过 " + sum.skipped + " 条重复 / 无效 " + sum.bad + " 条。";
      var modeTxt = mode === "overwrite"
        ? "覆盖模式：将整体替换本机全部自定义条目与隐藏名单。"
        : "合并模式：按 id 去重。";
      var uidNote = (src.uid && src.uid === getUid()) ? "（此码来自本机）" : "";
      if (!sum.good.length && !sum.bad && !sum.hid.length && !sum.skipped) {
        toast("没有可导入的数据");
        return false;
      }
      return new Promise(function (resolve) {
        confirmDialog("导入确认", smry + uidNote + modeTxt + "确定继续？", "继续", mode === "overwrite", function () {
          var doWrite = function () {
            if (applyImport(sum, mode)) {
              toast(mode === "overwrite"
                ? ("已覆盖导入 " + sum.good.length + " 条")
                : ("已合并导入 " + sum.good.length + " 条" + (sum.skipped ? "（跳过 " + sum.skipped + " 条重复）" : "")));
            }
            resolve(true);
          };
          if (mode === "overwrite") {
            confirmDialog("再次确认", "覆盖导入不可恢复（建议先导出备份）。确定替换本机全部数据？", "覆盖导入", true, doWrite, function () { resolve(false); });
          } else {
            doWrite();
          }
        }, function () { resolve(false); });
      });
    }, function (e) {
      toast(e && e.message ? e.message : "导入失败");
      return false;
    });
  }
  function importFileF(file, mode) {
    if (!storageOK) { toast("当前环境不支持本地存储"); return; }
    var reader = new FileReader();
    reader.onload = function () { importText(String(reader.result), mode || "merge"); };
    reader.onerror = function () { toast("读取文件失败"); };
    reader.readAsText(file);
  }

  /* ---------------- F8 编排：定位 → 闪烁 → 备份提示条（可取消 / 幂等） ---------------- */
  var fx = { cancelScroll: null, flashTimer: null, flashCardEl: null, toastEl: null, toastTimer: null };
  var fxGen = 0;

  function reducedMotion() {
    try { return W.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) { return false; }
  }
  function findCard(id) {
    var cards = D.querySelectorAll("article.card[data-eid]");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute("data-eid") === id) return cards[i];
    }
    return null;
  }
  function hideBackupToast() {
    if (fx.toastTimer) { clearTimeout(fx.toastTimer); fx.toastTimer = null; }
    var t = fx.toastEl;
    fx.toastEl = null;
    if (!t) return;
    t.classList.remove("in");
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 260);
  }
  function cancelFx() {
    if (fx.cancelScroll) { fx.cancelScroll(); fx.cancelScroll = null; }
    if (fx.flashTimer) { clearTimeout(fx.flashTimer); fx.flashTimer = null; }
    if (fx.flashCardEl) { fx.flashCardEl.classList.remove("flash"); fx.flashCardEl = null; }
    hideBackupToast();
  }
  /* F8-1 线性滚动（rAF 匀速；用户滚轮/触摸立即取消；reduced-motion 直接定位） */
  function scrollToCard(id) {
    return new Promise(function (resolve) {
      var cardEl = findCard(id);
      if (!cardEl) { resolve(); return; }
      var filtersEl = D.querySelector(".filters");
      var fh = filtersEl ? filtersEl.getBoundingClientRect().height : 0;
      var target = cardEl.getBoundingClientRect().top + W.scrollY - (fh + 24);
      var maxY = Math.max(0, D.documentElement.scrollHeight - W.innerHeight);
      target = Math.min(Math.max(0, target), maxY);
      var start = W.scrollY, delta = target - start;
      if (Math.abs(delta) < 2) { resolve(); return; }
      var html = D.documentElement;
      if (reducedMotion()) {
        var sbR = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";  /* 屏蔽全局 smooth，直接定位 */
        W.scrollTo(0, target);
        html.style.scrollBehavior = sbR;
        resolve();
        return;
      }
      var dur = Math.min(SCROLL_MAX_MS, Math.max(SCROLL_MIN_MS, Math.abs(delta) / SCROLL_PX_PER_MS));
      var sb = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";  /* 临时屏蔽全局 smooth，由 rAF 线性驱动 */
      var raf = null, t0 = null, done = false;
      function cleanup() {
        html.style.scrollBehavior = sb;
        W.removeEventListener("wheel", onUser, true);
        W.removeEventListener("touchstart", onUser, true);
        if (fx.cancelScroll === abort) fx.cancelScroll = null;
      }
      function finish() {
        if (done) return;
        done = true;
        if (raf) cancelAnimationFrame(raf);
        cleanup();
        resolve();
      }
      function abort() { finish(); }  /* 用户打断：按"已停止"处理，继续后续步骤 */
      function onUser() { abort(); }
      fx.cancelScroll = abort;
      W.addEventListener("wheel", onUser, true);
      W.addEventListener("touchstart", onUser, true);
      function step(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / dur);
        W.scrollTo(0, start + delta * k);
        if (k < 1) raf = W.requestAnimationFrame(step);
        else finish();
      }
      raf = W.requestAnimationFrame(step);
    });
  }
  /* F8-2 单次高亮闪烁（300ms；reduced-motion 由 CSS 降级为静态描边） */
  function flashCardFx(id) {
    return new Promise(function (resolve) {
      var cardEl = findCard(id);
      if (!cardEl) { resolve(); return; }
      cardEl.classList.remove("flash");
      void cardEl.offsetWidth;
      cardEl.classList.add("flash");
      fx.flashCardEl = cardEl;
      fx.flashTimer = setTimeout(function () {
        cardEl.classList.remove("flash");
        if (fx.flashCardEl === cardEl) fx.flashCardEl = null;
        fx.flashTimer = null;
        resolve();
      }, FLASH_DELAY_MS + FLASH_MS);
    });
  }
  /* F8-3 黄色备份提示条（9 秒自动收起；可关闭；避让 #ua-tip；z-index 10001） */
  function showBackupToast(onPrimary) {
    hideBackupToast();
    var bar = el("div", "userToast");
    bar.setAttribute("role", "status");
    bar.setAttribute("aria-live", "polite");
    var tip = D.getElementById("ua-tip");
    if (tip) {
      try { bar.style.bottom = (24 + tip.getBoundingClientRect().height) + "px"; } catch (e) { }
    }
    var x = el("button", "ut-close", "×");
    x.type = "button";
    x.setAttribute("aria-label", "关闭提示");
    x.addEventListener("click", hideBackupToast);
    bar.appendChild(x);
    bar.appendChild(el("div", "ut-title", "新条目已保存到本机"));
    bar.appendChild(el("div", "ut-body",
      "自定义条目只存在于当前浏览器：清理浏览器数据、更换设备，或 iPhone 超过 7 天未访问，都可能让它丢失。生成备份码后可随时找回。"));
    var acts = el("div", "ut-actions");
    acts.appendChild(btn("primary", "生成备份码", function () {
      hideBackupToast();
      if (onPrimary) onPrimary();
    }));
    acts.appendChild(btn("ghost", "知道了", hideBackupToast));
    bar.appendChild(acts);
    D.body.appendChild(bar);
    fx.toastEl = bar;
    if (reducedMotion()) {
      bar.classList.add("noanim", "in");
    } else {
      W.requestAnimationFrame(function () { W.requestAnimationFrame(function () { bar.classList.add("in"); }); });
    }
    fx.toastTimer = setTimeout(hideBackupToast, TOAST_MS);
  }
  /* 添加成功总编排：仅用于"添加成功"，取消旧动画，保证任一时刻 ≤1 套（F8-5②） */
  function addedFlow(id) {
    cancelFx();
    var gen = ++fxGen;
    TL.refreshAll();
    if (!findCard(id) && TL.resetFilters) TL.resetFilters();  /* F8-5① 筛选复位 */
    scrollToCard(id).then(function () {
      if (gen !== fxGen) return;
      flashCardFx(id).then(function () {
        if (gen !== fxGen) return;
        showBackupToast(function () { openManageDialog(true); });  /* 直达备份区 */
      });
    });
  }
  /* F7 载体2：个人书签链接 #u= 导入 */
  function handleShareHash() {
    var h = String(W.location.hash || "");
    if (h.slice(0, 3) !== "#u=") return;
    var code = h.slice(3);
    try { code = decodeURIComponent(code); } catch (e) { }
    function clearHash() {
      try { W.history.replaceState(null, "", W.location.pathname + W.location.search); } catch (e) { }
    }
    setTimeout(function () {
      if (!storageOK) { toast("当前环境不支持本地存储"); clearHash(); return; }
      pushDialog(function (d) {
        d.appendChild(el("h3", null, "检测到分享码"));
        d.appendChild(el("div", "tl-note", "是否导入？链接含条目内容，请勿公开转发。"));
        var acts = el("div", "tl-actions");
        acts.appendChild(btn("ghost", "忽略", function () { popDialog(); clearHash(); }));
        acts.appendChild(btn("primary", "导入", function () {
          popDialog();
          importText(code, "merge").then(function () { clearHash(); }, function () { clearHash(); });
        }));
        d.appendChild(acts);
      }, "检测到分享码");
    }, 500);
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
    /* F6 多标签联动：任一标签页增删后其余标签页即时刷新 */
    W.addEventListener("storage", function (ev) {
      if (!ev || !ev.key || ev.key.indexOf("tl-") === 0) {
        if (TL && TL.refreshAll) TL.refreshAll();
      }
    });
    /* F6 降级提示 */
    if (!storageOK) {
      var bar = D.querySelector(".userbar");
      if (bar && bar.parentNode) {
        bar.parentNode.insertBefore(
          el("div", "tl-note", "当前环境不支持本地存储：添加 / 管理已禁用，只读浏览不受影响。"),
          bar.nextSibling);
      }
    }
    /* F7 载体2：检测 #u= 分享链接（整页加载 + 同页 hash 变化双通道） */
    handleShareHash();
    W.addEventListener("hashchange", handleShareHash);
  }

  W.UserLayer = {
    merge: merge,
    validate: validate,
    encode: encode,
    decode: decode,
    importData: importText,
    exportData: exportData,
    init: init,
    listBuiltIn: listBuiltIn
  };
})();
