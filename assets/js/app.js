/* ==========================================================================
   土管2025级·四年时间轴 — 应用逻辑
   数据：window.EVENTS（data/events.js，124条全量）
   开场动画：WELCOME→三色竖带线性上穿→变细左移成一镜到底轴线（≤1s，可点击跳过）
   ========================================================================== */
(function () {
  "use strict";

  var CATS = {
    competition: "竞赛与双创",
    second_classroom: "二课活动",
    evaluation: "综测加分",
    course: "课程与考试",
    award: "评奖评优与推免"
  };
  var SEMS = [
    ["2025-2026-1", "大一上", "2025.9 – 2026.1"],
    ["2025-2026-2", "大一下", "2026.2 – 2026.6"],
    ["2026-2027-1", "大二上", "2026.9 – 2027.1"],
    ["2026-2027-2", "大二下", "2027.2 – 2027.7"],
    ["2027-2028-1", "大三上", "2027.9 – 2028.1"],
    ["2027-2028-2", "大三下", "2028.2 – 2028.7"],
    ["2028-2029-1", "大四上", "2028.9 – 2029.1"],
    ["2028-2029-2", "大四下", "2029.2 – 2029.6"]
  ];
  var CONF_LABEL = { confirmed: "已确认", pattern: "历史规律", predicted: "预计", custom: "自定义" };
  var TODAY = new Date();
  TODAY.setHours(0, 0, 0, 0);
  var EV = window.UserLayer ? window.UserLayer.merge(window.EVENTS || []) : (window.EVENTS || []).slice();

  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return Array.prototype.slice.call(document.querySelectorAll(s)); };

  function daysUntil(s) {
    if (!s) return null;
    var d = new Date(s + "T00:00:00");
    return Math.round((d - TODAY) / 864e5);
  }
  function earliest(ev) {
    var cands = [ev.event && ev.event.start, ev.registration && ev.registration.start].filter(Boolean);
    return cands.sort()[0] || "";
  }
  function catDots(cats) {
    return cats.map(function (c) { return '<span class="dot" style="background:var(--c-' + c.replace("second_classroom", "second").replace("evaluation", "eval") + ')"></span>'; }).join("");
  }
  function currentSemester() {
    var y = TODAY.getFullYear(), m = TODAY.getMonth() + 1;
    if (m >= 8) return y + "-" + (y + 1) + "-1";
    if (m <= 1) return (y - 1) + "-" + y + "-1";
    return (y - 1) + "-" + y + "-2";
  }

  /* ---------------- 开场动画 ---------------- */
  function runIntro() {
    var el = $("#intro");
    if (!el) return;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finished = false;
    var timers = [];
    function finish() {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      el.classList.add("done");
      document.body.classList.add("ready");
      setTimeout(revealCards, 40);
    }
    if (reduce) { finish(); return; }
    document.addEventListener("click", finish, { once: true });
    document.addEventListener("keydown", finish, { once: true });
    timers.push(setTimeout(function () { el.classList.add("ph1"); }, 0));
    timers.push(setTimeout(function () { el.classList.add("ph2"); }, 80));
    timers.push(setTimeout(function () { el.classList.add("ph3"); }, 400));
    timers.push(setTimeout(function () { el.classList.add("ph4"); }, 500));
    timers.push(setTimeout(finish, 680));
  }
  function revealCards() {
    var cards = $$(".card.pop");
    cards.forEach(function (c, i) {
      setTimeout(function () { c.classList.add("shown"); }, Math.min(i * 3, 420));
    });
  }

  /* ---------------- 渲染 ---------------- */
  var actCats = new Set();
  var actLv = "全部";

  function renderStats() {
    var conf = EV.filter(function (e) { return e.confidence === "confirmed"; }).length;
    var soon = EV.filter(function (e) {
      var d = upDeadline(e);
      return d && d.n <= 60;
    }).length;
    $("#stats").innerHTML =
      '<div class="stat"><b class="c1">' + EV.length + '</b><span>规划条目</span></div>' +
      '<div class="stat"><b>' + conf + '</b><span>官方已确认</span></div>' +
      '<div class="stat"><b class="c2">' + soon + '</b><span>60天内节点</span></div>' +
      '<div class="stat"><b class="c3">8</b><span>学期覆盖</span></div>';
  }
  function upDeadline(e) {
    var cands = [
      e.registration && e.registration.end,
      e.event && e.event.start,
      e.event && e.event.end
    ].filter(Boolean).map(function (s) { return { s: s, n: daysUntil(s) }; })
      .filter(function (x) { return x.n >= 0; });
    if (!cands.length) return null;
    cands.sort(function (a, b) { return a.n - b.n; });
    return cands[0];
  }
  function renderUpcoming() {
    var items = [];
    EV.forEach(function (e) {
      var d = upDeadline(e);
      if (d && d.n <= 200) items.push({ n: d.n, s: d.s, e: e });
    });
    items.sort(function (a, b) { return a.n - b.n; });
    var host = $("#upcoming");
    var clock = $("#updTime");
    if (clock) {
      var now = new Date();
      clock.textContent = "本地时间 " + now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0") + " " +
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + " · 每30秒自动刷新";
    }
    if (!items.length) {
      host.innerHTML = '<div class="up-item"><span class="cd ok">—</span><span class="t">未来200天内暂无截止节点</span></div>';
      return;
    }
    host.innerHTML = items.slice(0, 8).map(function (it) {
      var cls = it.n <= 14 ? "hot" : (it.n > 60 ? "ok" : "");
      var cd = it.n === 0 ? "今天 D-0" : (it.n === 1 ? "明天 D-1" : "D-" + it.n + " 天");
      return '<div class="up-item">' + catDots(it.e.categories) +
        '<span class="cd ' + cls + '">' + cd + '</span>' +
        '<span class="t">' + esc(it.e.title) + '</span>' +
        '<span class="d">' + it.s + '</span></div>';
    }).join("");
  }
  function pass(e) {
    var okCat = actCats.size === 0 || e.categories.some(function (c) { return actCats.has(c); });
    var okLv = actLv === "全部" || e.level === actLv;
    return okCat && okLv;
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function card(e) {
    var when = earliest(e) || "待定";
    var catTxt = e.categories.map(function (c) { return CATS[c]; }).join(" / ");
    var gap = (e.event.start === "" && e.registration.start === "") ? '<span class="badge gap">日期缺口</span>' : "";
    var srcs = (e.sources || []).map(function (s) {
      return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.title) +
        '</a><span class="pd">' + (s.published || "页面未标日期") + '</span>';
    }).join("");
    var basis = (e.confidence !== "confirmed" && e.basis) ? '<div class="seg"><span class="k">依据</span><span class="basis">' + esc(e.basis) + '</span></div>' : "";
    var notes = e.notes ? '<div class="seg"><span class="k">备注</span>' + esc(e.notes) + '</div>' : "";
    var tEl = (e.sources && e.sources.length)
      ? '<a class="ttl" href="' + esc(e.sources[0].url) + '" target="_blank" rel="noopener" title="打开官方通知">' + esc(e.title) + '</a>'
      : '<span class="ttl">' + esc(e.title) + '</span>';
    return '<article class="card pop" data-cat="' + e.categories.join(" ") + '" data-eid="' + esc(e.id) + '">' +
      '<div class="row1"><span class="when">' + (when === "待定" ? "待定" : esc(when)) + '</span>' +
      tEl + gap +
      '<span class="badge ' + e.confidence + '">' + CONF_LABEL[e.confidence] + '</span>' +
      '<span class="badge lv">' + esc(e.level) + '</span>' +
      '<button class="del" type="button" data-del="' + esc(e.id) + '" aria-label="删除或隐藏此条目" title="删除或隐藏此条目">×</button></div>' +
      '<div class="row2"><span>' + catTxt + '</span><span>' + esc(e.organizer) + '</span><span>' + esc(e.audience_tag) + '</span></div>' +
      '<div class="more">' +
      '<div class="seg"><span class="k">TIME</span>报名 ' + esc(e.registration.start || "—") + (e.registration.end ? " ~ " + esc(e.registration.end) : "") +
      ' ｜ 活动 ' + esc(e.event.start || "—") + (e.event.end ? " ~ " + esc(e.event.end) : "") +
      (e.registration.note ? '<br><span class="basis">' + esc(e.registration.note) + '</span>' : "") +
      (e.event.note ? '<br><span class="basis">' + esc(e.event.note) + '</span>' : "") + '</div>' +
      '<div class="seg"><span class="k">二课</span>' + esc(e.points.second_classroom) + '</div>' +
      '<div class="seg"><span class="k">综测</span>' + esc(e.points.zongce) + '</div>' +
      basis + notes +
      '<div class="seg"><span class="k">来源</span><span class="tag">' + (e.confidence === "custom" ? "自定义" : "官方") + '</span></div>' +
      '<div class="srcs">' + srcs + '</div>' +
      '</div></article>';
  }
  function renderTimeline() {
    var host = $("#timeline");
    var html = "";
    SEMS.forEach(function (sem) {
      var rows = EV.filter(function (e) { return e.semester === sem[0] && pass(e); })
        .sort(function (a, b) { return (earliest(a) || "9999") < (earliest(b) || "9999") ? -1 : 1; });
      if (!rows.length && !actCats.size && actLv === "全部" && !EV.some(function (e) { return e.semester === sem[0]; })) return;
      html += '<section class="sem" id="sem-' + sem[0] + '"><div class="rail"></div>' +
        '<div class="sem-head"><span class="big">' + sem[1] + '</span><span class="range">' + sem[2] + '</span><span class="code">' + sem[0] + '</span></div>';
      html += rows.length
        ? '<div class="cards">' + rows.map(card).join("") + '</div>'
        : '<div class="cards"><div class="empty">该学期无符合当前筛选条件的事件（试试切换类别/级别）</div></div>';
      html += '</section>';
    });
    host.innerHTML = html;
    $$(".card").forEach(function (c) {
      c.addEventListener("click", function () { c.classList.toggle("open"); });
    });
    if (document.body.classList.contains("ready")) revealCards();
  }
  function renderFilters() {
    var all = [["all", "全部"], ["competition", "竞赛与双创"], ["second_classroom", "二课活动"], ["evaluation", "综测加分"], ["course", "课程与考试"], ["award", "评奖评优与推免"]];
    var col = { all: "var(--txt)", competition: "var(--c-competition)", second_classroom: "var(--c-second)", evaluation: "var(--c-eval)", course: "var(--c-course)", award: "var(--c-award)" };
    var lvs = ["全部", "国家级", "省级", "校级", "院级"];
    $("#chips").innerHTML = all.map(function (p) {
      return '<button class="chip' + (p[0] === "all" ? " on" : "") + '" data-cat="' + p[0] + '">' +
        '<span class="dot" style="background:' + col[p[0]] + '"></span>' + p[1] + '</button>';
    }).join("") +
      '<span class="spacer"></span><span class="lvsel">' +
      lvs.map(function (l, i) { return '<button data-lv="' + l + '"' + (i ? "" : ' class="on"') + '>' + l + '</button>'; }).join("") +
      '</span><button class="theme-btn" id="themeBtn" type="button" aria-label="切换深浅色">◐ 浅色</button>';
  }
  function renderSemNav() {
    var cur = currentSemester();
    $("#semnav").innerHTML = SEMS.map(function (s) {
      return '<a href="#sem-' + s[0] + '"' + (s[0] === cur ? ' class="cur" title="当前学期"' : '') + '>' + s[1] + '</a>';
    }).join("");
  }
  /* 学期导航高亮：点击立即切换 + 滚动跟随（scroll-spy） */
  function initSpy() {
    var links = $$(".semnav a");
    function spy() {
      var y = window.scrollY + 170;
      var act = null;
      links.forEach(function (a) {
        var sec = document.getElementById(a.getAttribute("href").slice(1));
        if (sec && sec.offsetTop <= y) act = a;
      });
      if (!act && links.length) act = links[0];
      if (act) links.forEach(function (a) { a.classList.toggle("now", a === act); });
    }
    links.forEach(function (a) {
      a.addEventListener("click", function () {
        links.forEach(function (x) { x.classList.remove("now"); });
        a.classList.add("now");
      });
    });
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { spy(); ticking = false; });
    }, { passive: true });
    spy();
  }

  /* ---------------- 主题 ---------------- */
  function applyTheme(light) {
    document.body.classList.toggle("light", light);
    var b = $("#themeBtn");
    if (b) b.textContent = light ? "◐ 深色" : "◐ 浅色";
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("tl-theme"); } catch (e) { }
    applyTheme(saved === "light");
  }

  /* ---------------- 事件 ---------------- */
  document.addEventListener("click", function (ev) {
    if (ev.target.closest("a")) return;   // 标题/来源链接走浏览器默认行为
    var chip = ev.target.closest(".chip");
    if (chip) {
      var k = chip.dataset.cat;
      if (k === "all") actCats.clear();
      else if (actCats.has(k)) actCats.delete(k);
      else actCats.add(k);
      $$(".chip").forEach(function (c) {
        if (c.dataset.cat === "all") c.classList.toggle("on", actCats.size === 0);
        else c.classList.toggle("on", actCats.has(c.dataset.cat));
      });
      renderTimeline();
      return;
    }
    var lv = ev.target.closest("[data-lv]");
    if (lv) {
      actLv = lv.dataset.lv;
      $$("[data-lv]").forEach(function (b) { b.classList.toggle("on", b === lv); });
      renderTimeline();
      return;
    }
    if (ev.target.closest("#themeBtn")) {
      var light = !document.body.classList.contains("light");
      applyTheme(light);
      try { localStorage.setItem("tl-theme", light ? "light" : "dark"); } catch (e) { }
    }
  });

  /* ---------------- 启动 ---------------- */
  initTheme();
  renderStats();
  renderUpcoming();
  renderFilters();
  renderSemNav();
  renderTimeline();
  initSpy();
  setInterval(renderUpcoming, 30000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) renderUpcoming(); });
  /* v1.1 个人条目层：暴露刷新接口并初始化（见 assets/js/user-layer.js） */
  window.TL = {
    refreshAll: function () {
      EV = window.UserLayer ? window.UserLayer.merge(window.EVENTS || []) : EV;
      renderStats();
      renderUpcoming();
      renderTimeline();
    },
    resetFilters: function () {
      actCats.clear();
      actLv = "全部";
      $$(".chip").forEach(function (c) { c.classList.toggle("on", c.dataset.cat === "all"); });
      $$("[data-lv]").forEach(function (b) { b.classList.toggle("on", b.dataset.lv === "全部"); });
      renderTimeline();
    }
  };
  if (window.UserLayer) window.UserLayer.init(window.TL);
  runIntro();
})();
