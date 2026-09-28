/* ==========================================================================
   security.js — 页面级防护兜底（防 iframe 嵌套劫持 / 防外域跳转 / 旧 WebView 提示）
   背景：OPPO 系浏览器（ColorOS WebView）旧内核存在沙盒逃逸漏洞，恶意站点可将
   本站页面 iframe 嵌套后劫持跳转。本脚本为页面级兜底：
     1) 反 iframe 嵌套：一旦发现被嵌，强制跳出到顶层窗口（含定时巡检）
     2) 点击拦截：阻止"当前窗口"向外部域名跳转（target=_blank 的官方链接不受影响）
     3) location.assign/replace 守卫：可覆盖则覆盖，不可覆盖（现代引擎不可伪造）静默跳过
     4) http(s) 环境下动态注入 meta CSP（file:// 双击离线模式保持可用）
     5) OPPO / HeyTap / ColorOS UA 提示条（可关闭）
   全部逻辑包在 try/catch 中，任何环境不允许抛错。
   ========================================================================== */
(function () {
  "use strict";
  var W = window, D = document;

  /* ---------- 1) 反 iframe 嵌套（frame-busting） ---------- */
  function bust() {
    try {
      if (W.top === W.self) return;
      var target = W.location.href;
      try { W.top.location.replace(target); return; } catch (e1) { }
      try { W.top.location.href = target; return; } catch (e2) { }
      try { W.top.location = target; return; } catch (e3) { }
      /* 跨域受阻的旧内核：先隐身，再尝试顶层打开 */
      try { D.documentElement.style.visibility = "hidden"; } catch (e4) { }
      try { W.open(target, "_top"); } catch (e5) { }
      try { if (W.parent !== W.self) W.parent.postMessage({ type: "frame-bust" }, "*"); } catch (e6) { }
    } catch (e) { }
  }
  bust();
  try { W.setInterval(bust, 2000); } catch (e) { }

  /* ---------- 2) 同源判断 ---------- */
  function isSame(u) {
    try {
      var x = new URL(u, W.location.href);
      return x.origin === W.location.origin;
    } catch (e) { return false; }
  }

  /* ---------- 3) 点击拦截：当前窗口禁止跳转到外部域名 ---------- */
  function closestA(n) {
    while (n && n.nodeType === 1) {
      var t = n.tagName;
      if (t && (t === "A" || t === "a")) return n;
      n = n.parentNode;
    }
    return null;
  }
  try {
    D.addEventListener("click", function (ev) {
      var a = closestA(ev.target);
      if (!a) return;
      var raw = a.getAttribute("href") || "";
      if (raw.slice(0, 11).toLowerCase() === "javascript:") { ev.preventDefault(); return; }
      if (raw.charAt(0) === "#" || raw === "") return;
      if (a.target && a.target !== "_self") return;       /* _blank 官方通知链接放行 */
      if (!isSame(a.href)) ev.preventDefault();
    }, true);
  } catch (e) { }

  /* ---------- 4) location.assign / replace 守卫（不可伪造时静默跳过） ---------- */
  try {
    var _assign = W.location.assign, _replace = W.location.replace;
    try { W.location.assign = function (u) { if (isSame(u)) _assign.call(W.location, u); }; } catch (e1) { }
    try { W.location.replace = function (u) { if (isSame(u)) _replace.call(W.location, u); }; } catch (e2) { }
  } catch (e) { }

  /* ---------- 5) http(s) 动态注入 meta CSP（file:// 离线双击不受影响） ---------- */
  try {
    var http = /^https?:$/.test(W.location.protocol);
    var exists = D.querySelector ? D.querySelector('meta[http-equiv="Content-Security-Policy"]') : null;
    if (http && !exists) {
      var meta = D.createElement("meta");
      meta.setAttribute("http-equiv", "Content-Security-Policy");
      meta.setAttribute("content",
        "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data:; font-src 'self'; object-src 'none'; frame-src 'none'; " +
        "base-uri 'self'; form-action 'self'; upgrade-insecure-requests");
      var head = D.head || D.documentElement;
      head.insertBefore(meta, head.firstChild);
    }
  } catch (e) { }

  /* ---------- 6) OPPO / HeyTap / ColorOS 提示条（可关闭） ---------- */
  try {
    if (/HeyTapBrowser|OppoBrowser|ColorOS|OPPO|realme/i.test(navigator.userAgent)) {
      var show = function () {
        try {
          if (D.getElementById("ua-tip")) return;
          var bar = D.createElement("div");
          bar.id = "ua-tip";
          bar.setAttribute("style",
            "position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#231C1D;color:#EDE5D6;" +
            "font:13px/1.6 'Microsoft YaHei',sans-serif;padding:10px 46px 10px 14px;border-top:1px solid #583F36;");
          bar.textContent = "提示：检测到 OPPO/ColorOS 浏览器（内置 WebView 较旧）。本站已启用防劫持安全模式；如遇异常建议改用 Chrome / Edge 打开。";
          var x = D.createElement("button");
          x.textContent = "×";
          x.setAttribute("aria-label", "关闭");
          x.setAttribute("style",
            "position:absolute;right:10px;top:6px;background:none;border:0;color:#9C9388;font-size:18px;cursor:pointer;");
          x.onclick = function () { if (bar.parentNode) bar.parentNode.removeChild(bar); };
          bar.appendChild(x);
          (D.body || D.documentElement).appendChild(bar);
        } catch (e) { }
      };
      if (D.readyState === "loading") D.addEventListener("DOMContentLoaded", show);
      else show();
    }
  } catch (e) { }
})();
