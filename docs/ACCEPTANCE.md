# 验收清单（docs/ACCEPTANCE.md）

对应需求书"最终验收标准 A1–A7"。状态列在 P4/P6 阶段逐项核对。

| 编号 | 验收标准 | 验证方式 | 状态 |
|---|---|---|---|
| A1 | 8 个学期均有事件，五类别齐全；总量≥100，confirmed≥40 | `python tools/validate_data.py` 统计输出 | ☑ 已达：124 条；8 学期 16/26/29/14/12/10/8/9；confirmed 61 |
| A2 | validate_data.py 0 错误；无来源条目=0；文件 UTF-8 | 同上 + 编码检查 | ☑ 已达：0 错误；无来源=0 |
| A3 | 事件卡可展开详情并含可点击来源；confidence 徽标显示正确 | `python tools/check_app.py`（卡片展开断言）+ `python tools/check_links.py`（来源抽检 10/10 可访问） | ☑ 已达（2026-09-27） |
| A4 | 375px 手机宽度与桌面均正常；控制台 0 error；两种打开方式均可用 | check_app.py：file:// 与 http://localhost:8000 各 11/11 通过；手机 scrollWidth=375；FCP 172ms | ☑ 已达（2026-09-27） |
| A5 | GitHub Pages 线上可访问且与本地一致 | 线上 URL 实测 + 数据比对 | ☐ 待 P5（gh 未安装，届时提醒授权） |
| A6 | CSS 变量含 palette.md ≥4 个色值；"颜色↔五类别"对照表存在且实际生效；无第三方资源 | assets/css/style.css 含 `#131011 #231C1D #583F36 #86D0BC #EDB148 #982B2C #EDE5D6 #9C9388` 及图1渐变全量；对照表：页面页脚图例 + research/prototypes/README.md；噪点/弧线/图标均 CSS/SVG 内联，0 外部请求 | ☑ 已达（2026-09-27） |
| A7 | docs/ 三份文档齐全（MAINTENANCE/DEPLOY/ACCEPTANCE）；维护指南可让用户独立新增一条事件 | 按 MAINTENANCE.md 演练：注入测试事件 → 校验（125 条 0 错误）→ 删除还原（124 条 0 错误） | ☑ 已达（2026-09-27） |

## 数据缺口与免责（如实声明）

1. **2025-2026 学年校历未获取官方原件**（jiaowu 旧文件已下线，多路径 404）：
   大一学年开学/放假节点以事件通知与 2026-2027 校历同构推算，相关条目 confidence=pattern 且日期字段留空。
2. 需登录的系统（i川农、教务管理系统、学工系统内页）**未采集**：二课活动条目以学院/校团委公开新闻与《赋分细则》口径构建。
3. cxcy.sicau.edu.cn（创新创业信息网）域名不可达，未采集；创新创业类信息以教务处与学院公开通知为准。
4. 2027 年及以后条目为 pattern/predicted 推算（依据已列在每条 basis 字段），**入学后应于每年 9 月/3 月复核更新**（见 MAINTENANCE.md）。
5. 金额/分值类信息均引自官方文件原文（见 research/OCR结果.md 与来源清单）；执行以学校当年度最新文件为准。
