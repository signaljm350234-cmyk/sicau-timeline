# Cloudflare Pages 部署说明（国内推荐线路）

- **线上地址**：https://sicau-timeline.pages.dev
- **部署方式**：Cloudflare Pages「连接到 Git」直连本仓库 `signaljm350234-cmyk/sicau-timeline`
- **构建配置**：Framework preset = None；Build command = 留空；Build output directory = `/`
- 无需备案、免费、无限带宽、自动 HTTPS

## 为什么用它

GitHub Pages 在国内部分网络（尤其手机蜂窝数据）被阻断、平台系（CloudBase/EdgeOne）要求 ICP 备案。
Cloudflare Pages 免备案、国内多数网络可直连，作为**国内主用地址**。

## 日常更新（最舒服的一点）

内容更新**不需要动 Cloudflare**：

1. 修改本仓库的 `data/events.js`（GitHub 网页上点 ✏️ 直接编辑也行）
2. Commit 后 1~2 分钟：
   - Cloudflare Pages 自动重新部署（本站）
   - GitHub Pages 自动重新发布（备用站）
3. 两个地址同步生效。

## 排障记录

- 首次部署若出现"所有路径都返回首页 HTML"（css/js 全部变成 HTML），说明误用了"单文件/直传"模式；
  正确做法是走 **连接到 Git** 或上传**文件夹/zip**（保持 `index.html`、`assets/`、`data/` 的目录结构）。
- Cloudflare 控制台在国内访问偶尔缓慢，挂你自己的代理不冲突。

## 三个地址对照

| 线路 | 地址 | 适用 |
|---|---|---|
| Cloudflare Pages | https://sicau-timeline.pages.dev | 国内主用（免备案） |
| GitHub Pages | https://signaljm350234-cmyk.github.io/sicau-timeline/ | 海外/备份 |
| 腾讯云 CloudBase | （待备案后启用） | 未来拥有域名后再考虑 |
