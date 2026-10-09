# 土管2025级 · 大学四年时间轴

四川农业大学 公共管理学院 · 土地资源管理专业 2025级（2025.9—2029.6）全周期成长时间轴：
**学科竞赛与双创 / 二课活动(i川农) / 综测加分 / 课程与考试 / 评奖评优与推免**五类事项，共 129 条规划事件（62 条官方已确认）。

**在线访问**：
- 🟢 **国内推荐**：`https://sicau-timeline.pages.dev`（Cloudflare Pages，免备案）
- GitHub Pages（海外/备用）：`https://signaljm350234-cmyk.github.io/sicau-timeline/`
- 部署细节见 [`docs/DEPLOY_CLOUDFLARE.md`](docs/DEPLOY_CLOUDFLARE.md) / [`docs/DEPLOY_TENCENT.md`](docs/DEPLOY_TENCENT.md)

## 特点

- 纯静态单页：双击 `index.html` 即可离线打开；零外部 CDN 依赖（字体本地打包、图标内联 SVG）
- 开场动画：三色竖带线性上穿 → 落位为时间轴主脊（可点击跳过，符合 `prefers-reduced-motion` 时自动跳过）
- 功能：8 学期导航（滚动跟随）、五类别 + 级别筛选、事件卡展开、**实时倒计时**（按访客本地时间每 30 秒刷新）、深浅色切换、移动端自适应（≤720px 标题移至日期下方完整显示）
- 每条事件含：时间窗口、二课/综测分值说明、官方来源链接（点击标题直达通知原文）、置信度徽标（已确认/历史规律/预计）
- **个人条目层（v1.1）**：页面内「＋ 添加 / 管理」——自定义条目、删除/隐藏/恢复内置条目、导出/导入 JSON 备份；数据只存访客本机浏览器（localStorage），不上传任何服务器

## 数据口径

- `confirmed` 官方已发布 ｜ `pattern` ≥2届历史推算 ｜ `predicted` 单届/弱证据
- 全部来源为校团委 / 教务处 / 学生处 / 公共管理学院官网公开页面；政策数字以官方文件原文为准
- 2027 年及以后条目为推算（依据写在每条 `basis` 字段），建议每年 9 月 / 3 月复核更新

## 本地使用与更新

```powershell
# 本地预览（或直接双击 index.html）
python -m http.server 8000

# 更新一条事件后必须校验（0 错误才可发布）
python tools/validate_data.py

# 发布
git add -A; git commit -m "data: ..."; git push
```

详细维护步骤见 [`docs/MAINTENANCE.md`](docs/MAINTENANCE.md)；部署与回滚见 [`docs/DEPLOY.md`](docs/DEPLOY.md)。

## 目录

```
index.html  assets/（css/js/fonts/img）  data/events.js  docs/  tools/
```

## 许可与声明

- 字体：Poppins（SIL OFL）、URW Gothic（AGPL v3 + 字体嵌入例外），许可证文本在 `assets/fonts/`。
- 本页为学习辅助资料，**非学校官方发布**；政策与日期一切以学校当年度最新文件为准。
- 仓库不含任何个人信息（学号/姓名/联系方式）与第三方版权素材。
