# 维护指南（MAINTENANCE.md）—— 怎么更新这个时间轴

> 目标：让你（或任何同学）在没有原作者的情况下，也能独立新增 / 修改一条事件并发布上线。

## 0. 项目结构

```
index.html          页面骨架（开场动画 + 结构）
assets/css/style.css  全部样式（含回退字体、深浅色、移动端适配）
assets/js/app.js      渲染逻辑（筛选 / 倒计时 / 学期导航 / 开场动画）
assets/js/user-layer.js 个人条目层（访客本机增删/隐藏/导入导出，不碰 events.js）
data/events.js        全部事件数据 ← 日常只改这里
docs/                 文档（本文件 / DEPLOY.md / ACCEPTANCE.md）
tools/               校验与辅助脚本（validate_data.py 最常用）
```

## 1. 本地预览

- 最简单：双击 `index.html`（离线可用）。
- 推荐：项目目录里运行 `python -m http.server 8000`，浏览器开 http://127.0.0.1:8000 。
- 手机同 WiFi 预览：`python -m http.server 8000 --bind 0.0.0.0`，手机访问 `http://电脑IP:8000`。

## 2. 新增一条事件（5 步）

1. 打开 `data/events.js`，在对应学期处（文件按学期顺序排列，`semester` 字段为准）复制一条现有事件作为模板，整段粘贴。
2. 逐字段修改（字段表见下）。**必填**：`id`（唯一、kebab-case）、`title`、`categories`、`level`、`organizer`、`audience_tag`、`semester`、`registration`、`event`、`points`、`sources`、`confidence`、`basis`、`recurring`、`notes`。
3. 来源必须有：`sources[0].url` 指向官方页面（校团委 / 教务处 / 学生处 / 公管学院官网），`published` 填通知发布日期。
4. 在项目目录运行校验：`python tools/validate_data.py` → **必须 0 错误**（会同时打印统计）。
5. 提交发布：`git add -A && git commit -m "data: 新增xxx事件" && git push`（GitHub Pages 1–2 分钟后自动生效）。

### 字段速查

| 字段 | 说明 |
|---|---|
| `semester` | 8 个学期之一：`2025-2026-1` … `2028-2029-2` |
| `categories` | 可多选：`competition` 竞赛双创 / `second_classroom` 二课 / `evaluation` 综测 / `course` 课程考试 / `award` 评奖评优推免 |
| `level` | `国家级` / `省级` / `校级` / `院级` |
| `audience_tag` | `土资2025主要` / `全院可参加` / `全校可参加` |
| `registration` | `{start,end,note}` 报名窗口；无报名环节填 `""` |
| `event` | `{start,end,note}` 活动/考试时间；日期未知填 `""` 并写进 `note` |
| `points.second_classroom` | 二课积分说明（查《第二课堂成绩单实施办法(2025修订)》赋分细则） |
| `points.zongce` | 综测加分说明（附加分=实际得分×25%，上限大一大二5/8分） |
| `sources[]` | `{title,url,published,accessed}` 至少 1 条，指向官方页面 |
| `confidence` | 见下节，**不许越级** |
| `basis` | `pattern`/`predicted` 必填：写清依据的年份与日期（如 "2025-03-05、2026-03-16 两年通知"） |
| `notes` | 备注（数据缺口、口径说明等） |

### confidence 标准（严格遵守）

- `confirmed`：**该年份官方已发布**（你在官网亲眼看到日期）。
- `pattern`：≥2 届历史日期推算（只保证月份）。
- `predicted`：单届证据或弱证据。
- 禁止"凭印象/常识"填日期；查不到就把日期留空并在 `notes` 里写明。

## 3. 修改 / 删除事件

- 改内容：直接编辑对应字段 → 跑校验 → push。
- 删除：整段删除（含开头 `{` 到结尾 `},`）→ 跑校验 → push。
- `id` 不要复用/改来改去（id 是事件的唯一身份证）。

## 4. 年度更新节奏（建议）

- **每年 9 月**：更新开学节点（报到/行课）、评奖评优季（国奖/励志/优秀学生/单项）、入党申请、当年已发布的新通知；把新一年的 `confirmed` 事件补进对应学期。
- **每年 3 月**：更新春季批次（雷锋月志愿、春季入党、团内评优、科研结题、暑期实践通知）＋复核上学期遗留的 `pattern` 条目，能升级为 `confirmed` 就升级（改 `confidence` 并补 `basis=""`）。
- **有精力时**：把下学期要用的 `predicted` 条目根据新通知校正。

## 5. 常见问题

| 症状 | 处理 |
|---|---|
| validate 报"id 重复" | 换一个唯一 id |
| validate 报"报名晚于活动开始" | 检查 `registration.end` 与 `event.start` 顺序；确实如此则调整口径 |
| validate 报"pattern/predicted 必须有 basis" | 补 `basis` 文字 |
| 页面打开空白 | 打开浏览器控制台（F12）看报错；常见是 `data/events.js` 里缺逗号/引号 → 用 https://jsonlint.com 检查 |
| 倒计时不对 | 倒计时用**访客设备本地时间**，检查手机时间设置 |
| 手机上看不到标题 | 已自适应（≤720px 标题移到日期下方）；若仍异常清缓存强刷 |

## 6. 数据来源与口径

- 采集与记录过程、来源清单、色板、PDF 识别结果等在本地 `research/` 目录（**不发布**，含第三方参考图）。
- 政策类数字（二课分值/综测上限/推免名额）以 `research/OCR结果.md` 转录的官方文件为准；一切以学校当年最新文件为最终依据。

## 7. 个人条目层（页面内功能，与 data/events.js 无关）

- 页面筛选栏下方有「＋ 添加 / 管理」：访客可新增自定义条目、删除（自定义=永久）/ 隐藏（内置=可恢复）条目、导出 / 导入 JSON 备份。
- 数据只存**访客本机浏览器** localStorage（键：`tl-user-events-v1` 自定义条目、`tl-hidden-ids-v1` 隐藏名单），**永远不会写入 data/events.js，也不上传任何服务器**。
- 容量上限：自定义 200 条 / 隐藏名单 300 条；换浏览器、清缓存、无痕模式都会丢，建议用「导出」备份。
- 自检脚本：`python tools/check_user_layer.py`（file:// 与 http 双模式，30 项断言）。
- 页面内删除按钮文案：自定义条目为「永久删除」，内置条目为「隐藏」（均可取消）。
