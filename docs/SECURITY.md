# 安全防护说明（SECURITY.md）

> 背景：有反馈称本站页面在 **OPPO 自带浏览器（ColorOS WebView 旧内核）** 中会被恶意 iframe
> 嵌套劫持、跳转到外部演示站（lynX 演示页）。经排查：**网站源码本身未被入侵**（见文末自检），
> 问题是旧内核 WebView 的沙盒逃逸缺陷 + 本站当时未配置任何反嵌套响应头。

## 三层防护（已全部部署）

| 层 | 位置 | 作用 |
|---|---|---|
| ① HTTP 响应头（最高优先级） | Cloudflare Pages 根目录 `_headers` | `X-Frame-Options: DENY` 从根源禁止任何外部站点 iframe 嵌套本站；`X-Content-Type-Options: nosniff` 关闭 MIME 嗅探；`Content-Security-Policy`（含 `frame-ancestors 'none'`）限制仅加载本站资源 |
| ② 页面级 JS 兜底 | `assets/js/security.js`（head 首个脚本） | 被嵌套时强制跳出到顶层（含 2 秒巡检，防二次注入）；拦截"当前窗口"向外部域名的点击跳转（`target=_blank` 的官方通知链接不受影响）；在 http(s) 下动态注入 meta CSP；OPPO/HeyTap/ColorOS UA 提示条（可关闭） |
| ③ GitHub Pages 站 | 无响应头能力 | 依赖 ② 的 JS + meta CSP 兜底（平台限制，见"已知局限"） |

> 个人数据与分享码：个人条目/隐藏名单只存本机 localStorage；分享码仅经剪贴板、URL hash（`#u=`，不进查询串）或本地文件传递——**全程零网络传输**，导入内容一律经转义与校验后才渲染。

响应头 CSP（`_headers` 实配）：
```
default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';
img-src 'self' data:; font-src 'self'; object-src 'none'; frame-src 'none';
frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
```

## 与原始需求的三处差异（及原因）

1. **移除 `navigate-to 'self'`**：该指令已被 CSP 规范删除、**所有浏览器均未实现**，写入只会产生
   `Unrecognized CSP directive` 控制台告警（违反本站"控制台 0 报错"验收）。其"禁止跳转外部域名"的
   目标由 `security.js` 的点击拦截等效实现。
2. **增加 `frame-ancestors 'none'`**：现代浏览器中 X-Frame-Options 的替代/并存项，缺它就是缺最核心的防线。
3. **`style-src` 保留 `'unsafe-inline'`、`img-src` 保留 `data:`**：本站的类别色点用内联 style 属性、
   噪点纹理与 favicon 用 data: URI——完全禁用会导致页面样式残破。脚本层仍为严格 `script-src 'self'`（零内联 JS）。
4. **meta CSP 仅 http(s) 注入**：若静态写入 meta，`file://` 双击离线模式会因 `'self'` 无法匹配
   而加载不到 css/js/font，破坏"双击 index.html 即可用"的交付要求；故由 security.js 在 http(s) 环境动态注入。
5. **`upgrade-insecure-requests` 仅在 https 源注入**（2026-10-09 修复）：早期版本在 http 下也注入该
   指令，导致手机经局域网 http（如 `http://192.168.x.x`）访问时 css/js/font 被强制升级为 https 而全部
   阻断（表现为裸 HTML）。现已仅在 https 注入；`check_security.py` 增加 C6–C8「局域网源模拟」回归防复发。

## 已知局限（如实声明）

- 网页防护只能阻止"**本站页面被恶意站点嵌套后劫持**"；用户如果**主动访问恶意站点**，其自身漏洞无法由本站阻止。
- OPPO 浏览器旧内核的漏洞本体无法从网页侧修复，本方案是把"被利用面"降到最低。
- **GitHub Pages 站不支持自定义响应头**：其防线只有 JS+meta 层；现代浏览器中跨域 iframe 可能仍能
  嵌入展示该站（但 JS 会尝试跳脱，且无法被静默改写跳转）。**对外分享请优先使用 Cloudflare Pages 地址**。
- 旧内核 WebView 是否支持 `frame-ancestors`/XFO 取决于其引擎版本；security.js 的 frame-busting 对
  旧内核（恰好是历史行为允许跨域 `top.location` 赋值的那批引擎）理论上应生效，但**未能在真机 OPPO 上验证**，
  如实标注。

## 如何验证

```powershell
python tools/check_security.py
```
自动完成 16 项断言：源码恶意模式扫描（6 文件）→ 本地 iframe 逃逸实测 → http/file 双模式功能回归 →
局域网源模拟（非 localhost http 源不被 CSP 阻断子资源）→ 线上响应头 + 线上 129 卡片/0 报错回归。

手工测试页（`tools/security-tests/`）：
- `attacker-frame.html`：模拟恶意站点嵌套——被嵌套的样板页应"逃逸"到顶层；
- `protected-sample.html`：完整可直接运行的防护样板（含 Nginx 配置与内联脚本，整段可复制到其他项目）。

## 源码自检结论（2026-09-28）

- 扫描 index.html / app.js / security.js / events.js / style.css：**无 iframe、无 eval、无 document.write、
  无外部脚本引入、无 location 跳转注入代码**；
- 线上文件与仓库哈希比对：index/app/style 完全一致；events.js 仅 CRLF/LF 换行差异，内容一致——
  **站点未被入侵，无需清理**。
