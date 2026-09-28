// data/events.js — 四川农业大学 公共管理学院 土地资源管理 2025级（2029届）四年时间轴数据
// 口径与字段定义：research/数据字典.md ｜ 来源核验：research/来源清单.md（research/raw 有页面存档）
// confidence: confirmed=针对该年份的官方已发布日期 ｜ pattern=≥2届历史推算（仅月份可靠）｜ predicted=单届/弱证据
// 采集与整理：2026-09-26（accessed 统一为 2026-09-26）
window.EVENTS = [
  {
    "id": "freshman-checkin-military-2025",
    "title": "大一开学：新生报到与军训（2025级）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "四川农业大学（教务处/学工部）",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-1",
    "registration": { "start": "", "end": "", "note": "以当年迎新通知为准（2025年9月上旬）" },
    "event": { "start": "", "end": "", "note": "军训为培养方案第1学期必修（2周）；2025-2026学年校历未检索到原件，具体日期留空" },
    "points": { "second_classroom": "军训为实践环节（2周、0学分），不属于二课积分项目", "zongce": "无直接加分" },
    "sources": [
      { "title": "四川农业大学2025级培养方案入口（培养计划进程表：军训军事技能 2周/执行学期1）", "url": "https://jiaowu.sicau.edu.cn/web/web/lanmu/jihua_new.asp?jh_nj=2025", "published": "", "accessed": "2026-09-26" },
      { "title": "公共管理学院2023级新生入学教育工作方案", "url": "https://fpa.sicau.edu.cn/info/1074/1163.htm", "published": "2023-09-04", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-09-04 学院发布《2023级新生入学教育工作方案》；2025级培养方案确认军训执行学期=1（2周）；2026-2027校历显示秋季学期报到/行课均在9月上旬",
    "recurring": true,
    "notes": "数据缺口：2025-2026学年校历未公开检索到（jiaowu 旧文件已下线），本条目日期留空"
  },
  {
    "id": "major-intro-freshman-seminar-2025",
    "title": "专业概论与新生研讨（土管）第1学期开课",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-1",
    "registration": { "start": "", "end": "", "note": "按课表" },
    "event": { "start": "", "end": "", "note": "执行学期=1；0.5学分/8学时；同学期通识必修10门见培养方案" },
    "points": { "second_classroom": "课程成绩计入学业，不计二课积分", "zongce": "课程加权成绩是综测学业核心项" },
    "sources": [
      { "title": "四川农业大学2025级培养方案（公共管理学院 土地资源管理2025）— 人才培养计划进程表", "url": "https://jiaowu.sicau.edu.cn/web/web/lanmu/jihua_new.asp?jh_nj=2025", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": false,
    "notes": "大一上通识必修含：大学英语AⅠ、高等数学BⅠ、思想道德与法治、中国近现代史纲要、无机及分析化学BⅠ、大学体育Ⅰ、军事理论、国家安全教育、心理健康教育Ⅱ、形势与政策Ⅰ"
  },
  {
    "id": "party-application-autumn-2025",
    "title": "2025年秋季学期递交入党申请书",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-09-24", "end": "", "note": "通知发布日；递交截止以班级通知为准" },
    "event": { "start": "", "end": "", "note": "递交后卫检、谈话；满18周岁可申请" },
    "points": { "second_classroom": "入党申请书本身不计分；成为积极分子/发展对象后按德育板块记实", "zongce": "党员/团员思想品德表彰类可计附加分（思想品德获评表彰 校市级2分起）" },
    "sources": [
      { "title": "公共管理学院关于2025年秋季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2967.htm", "published": "2025-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "每年3月/9月两次递交窗口（2024-02-29、2024-09-07、2025-03-07、2025-09-24、2026-03-16、2026-09-22均有通知）"
  },
  {
    "id": "topnew-scholarship-2025",
    "title": "顶新康师傅明日朝阳奖学金评选（2025年）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/教育发展基金会",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-09-17", "end": "", "note": "申请材料提交以通知为准" },
    "event": { "start": "2025-09-17", "end": "", "note": "评审周期约2-3周" },
    "points": { "second_classroom": "获奖作为思想品德获评表彰依据（校市级2分/项，封顶按细则）", "zongce": "附加分按实际得分25%折算计入综测，大一大二上限5/8分" },
    "sources": [
      { "title": "关于开展2025年顶新康师傅明日朝阳奖学金评选工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2955.htm", "published": "2025-09-17", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2026年同类通知为9月11日发布（fpa/1074/8250.htm），9月为资助类奖助集中申报期"
  },
  {
    "id": "challenge-cup-15th-intra-2025",
    "title": "第十五届“挑战杯”创业计划竞赛院内初赛及重点项目遴选（2025）",
    "categories": ["competition"],
    "level": "院级",
    "organizer": "公共管理学院团委（校团委部署）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-09-26", "end": "", "note": "院内初赛报名与作品提交以通知附件为准" },
    "event": { "start": "2025-09-26", "end": "", "note": "后续：训练营2026-01-15开营、冠军争夺赛2026-04-03、省赛2026-06" },
    "points": { "second_classroom": "“挑战杯”按A1/B1/C1级通道赋分（省赛一等11分、校赛一等5分；团队限5人）", "zongce": "附加分=实际得分×25%，大二上限8分" },
    "sources": [
      { "title": "关于第十五届“挑战杯”中国大学生创业计划竞赛院内初赛及重点项目（第一轮）遴选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2973.htm", "published": "2025-09-26", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2025级入学首月即可组队参与；小挑（创业计划）与奇数届大挑（课外学术）每年秋季启动院内选拔"
  },
  {
    "id": "class-badge-design-3rd-2025",
    "title": "第三届班徽班训设计大赛（2025秋季）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-10-13", "end": "", "note": "以小班为单位报名" },
    "event": { "start": "2025-10-13", "end": "", "note": "10月为新生班团建设活动月" },
    "points": { "second_classroom": "参与/获奖按美育类文化艺术活动计基础分0.5-1分/次（大一上限1分）；获奖另按D级加分", "zongce": "基础分全额+附加分×25%计入综测" },
    "sources": [
      { "title": "第三届班徽班训设计大赛通知", "url": "https://fpa.sicau.edu.cn/info/1074/3001.htm", "published": "2025-10-13", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "第一届2023-10-22、第二届2024-11-01、第三届2025-10-13，10月为惯例窗口"
  },
  {
    "id": "qingma-class-recruit-2025",
    "title": "2025年第三期青马班学员招新",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-10-27", "end": "", "note": "招新通知发布日，报名截止以通知为准" },
    "event": { "start": "2025-10-27", "end": "", "note": "青马班培养周期为一学年" },
    "points": { "second_classroom": "党团学习考核优秀按A-D级赋1-3分（院级2分/校级3分，评优比例≤20%）", "zongce": "附加分×25%计入综测" },
    "sources": [
      { "title": "关于公共管理学院2025年第三期青马班学员招新的通知", "url": "https://fpa.sicau.edu.cn/info/1074/3032.htm", "published": "2025-10-27", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "校级“青马工程”主体班遴选在每年5月（2025-05-20、2026-05-29两次通知）"
  },
  {
    "id": "dormitory-civilized-2025",
    "title": "公管“最美（文明）寝室”评选（2025秋季）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-11-17", "end": "", "note": "以寝室为单位申报" },
    "event": { "start": "2025-11-17", "end": "", "note": "评比与公示在11-12月" },
    "points": { "second_classroom": "文明寝室类荣誉可按德育/劳育相关条款认定（以当年细则执行为准）", "zongce": "视认定结果计入" },
    "sources": [
      { "title": "关于组织开展公共管理学院寻找“公管最美（文明）寝室”活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/3140.htm", "published": "2025-11-17", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2024-11-28 同类通知（fpa/1074/2391.htm）"
  },
  {
    "id": "student-union-by-election-2025",
    "title": "第三届党建·团委·学生会主席团成员补录（2025-11）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-11-19", "end": "", "note": "补录通知发布日" },
    "event": { "start": "2025-11-19", "end": "", "note": "答辩遴选以通知为准" },
    "points": { "second_classroom": "学生干部考核合格记2分/学年（最多个2岗位，第二岗位1分）；优秀另记附加分3分", "zongce": "基础分上限大2分/学年+附加分×25%" },
    "sources": [
      { "title": "关于公共管理学院第三届党建·团委·学生会主席团成员候选人补录通知", "url": "https://fpa.sicau.edu.cn/info/1074/3180.htm", "published": "2025-11-19", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "学生组织换届主周期在每年4-6月（遴选+换届），11月多为补录"
  },
  {
    "id": "volunteer-uniform-wash-2025",
    "title": "“拂尘净服，劳行砺能”志愿服及学士服清洗活动（2025-11）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委志工部",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-11-24", "end": "", "note": "活动结束新闻发布日；报名通过i川农活动发布" },
    "event": { "start": "2025-11-24", "end": "", "note": "含劳动类志愿服务，可按劳育/志愿服务双通道认定" },
    "points": { "second_classroom": "志愿服务0.5分/2小时（不足2的倍数向下取整）；劳育认定0.5分/2小时", "zongce": "基础分满额+附加分×25%" },
    "sources": [
      { "title": "“拂尘净服，劳行砺能”志愿服及学士服清洗活动圆满结束", "url": "https://fpa.sicau.edu.cn/info/1092/5200.htm", "published": "2025-11-24", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "每学期1-2次，2024-11-08（1092/2413）同类活动；志愿活动在i川农发布报名"
  },
  {
    "id": "warm-winter-action-2025",
    "title": "“暖冬行动”资助活动（2025年）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院（学生资助）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-11-25", "end": "", "note": "通知发布日；面向家庭经济困难学生" },
    "event": { "start": "2025-11-25", "end": "", "note": "冬季送温暖，12月发放" },
    "points": { "second_classroom": "不属二课积分项目（资助类）", "zongce": "不直接加分" },
    "sources": [
      { "title": "关于开展2025年“暖冬行动”活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/3340.htm", "published": "2025-11-25", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2023-12-06、2024-12-04、2025-11-25 三届均为11月底-12月初"
  },
  {
    "id": "aids-run-2025",
    "title": "爱不“艾”跑·健康公益跑活动（2025-12）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委志工部",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-12-12", "end": "", "note": "活动举办新闻发布日" },
    "event": { "start": "2025-12-12", "end": "", "note": "体育+公益属性，可按体育/志愿服务认定" },
    "points": { "second_classroom": "体育活动0.5-1分/次；志愿服务按2小时0.5分计", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "爱不‘艾’跑，共筑健康公益跑活动成功举办", "url": "https://fpa.sicau.edu.cn/info/1092/5210.htm", "published": "2025-12-12", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "12月1日世界艾滋病日前后惯例举办公益跑/宣传活动（2023-12-08同类）"
  },
  {
    "id": "winter-social-practice-signup-2025",
    "title": "2026年学生寒假社会实践（返家乡）组织与报名（2025-12发布）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-12-11", "end": "", "note": "寒假前完成组队与实践立项" },
    "event": { "start": "2026-01-15", "end": "", "note": "寒假期间（约1月中旬-2月中旬）开展；“返家乡”与调研实践两类" },
    "points": { "second_classroom": "社会实践考核合格1分/次（德育基础分，大一大二上限2分）", "zongce": "基础分+获奖附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于组织开展2026年学生寒假社会实践活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/3690.htm", "published": "2025-12-11", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2023-12-14（fpa/1462）、2024-12-13（fpa/2435）、2025-12-11 三届均为12月中旬发布；对应总结评优在次年2月底-3月初"
  },
  {
    "id": "civil-servant-micro-major-2025",
    "title": "“公务员素养与能力”微专业招生（2025-12）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "公共管理学院（教务处备案）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "2025-12-29", "end": "", "note": "招生简章发布；报名以简章为准" },
    "event": { "start": "2026-03-01", "end": "", "note": "2026年春季开课（2026-05-06 报道顺利开课）" },
    "points": { "second_classroom": "微专业课程成绩单列，不计二课；完成培养可获微专业证书", "zongce": "课程成绩不计加权（以教务认定为准）" },
    "sources": [
      { "title": "四川农业大学“公务员素养与能力”微专业招生简章", "url": "https://fpa.sicau.edu.cn/info/1007/3980.htm", "published": "2025-12-29", "accessed": "2026-09-26" },
      { "title": "深耕公职育人赛道：我院公务员素养与能力微专业顺利开课", "url": "https://fpa.sicau.edu.cn/info/1007/6080.htm", "published": "2026-05-06", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "土地资源管理就业方向包括公务员/自然资源系统岗位；每年12月底前后发布简章"
  },
  {
    "id": "exam-ethics-winter-2025",
    "title": "期末考试诚信教育（2025-2026-1学期末）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "", "end": "", "note": "12月中下旬，覆盖期末复习与考试周" },
    "points": { "second_classroom": "无", "zongce": "违纪将影响德育素质成绩（操行分）与评优资格" },
    "sources": [
      { "title": "关于做好学生诚信考试教育工作的通知（2024年）", "url": "https://fpa.sicau.edu.cn/info/1074/2439.htm", "published": "2024-12-11", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-12-14（fpa/1074/1466.htm）、2024-12-11（fpa/1074/2439.htm）两届均在12月中旬",
    "recurring": true,
    "notes": "学期末诚信教育属例行工作"
  },
  {
    "id": "semester-1-finals-winter-break-2026",
    "title": "大一上学期期末考试与寒假（2026年1月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "", "end": "", "note": "期末考试约在第17-18周；寒假约1月中下旬-2月下旬；2025-2026校历未获取，日期留空" },
    "points": { "second_classroom": "无", "zongce": "课程加权成绩为综测学业核心；补考/重修记录影响转专业等资格" },
    "sources": [
      { "title": "2026-2027学年校历（教务处制，2026年6月）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" },
      { "title": "关于2026年寒假及留校学生管理有关事宜的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4020.htm", "published": "2026-01-04", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027校历（实抓）：上学期实践周1月18-24日、寒假1月18日起、下学期2月26-28日报到；2025-2026学年按同构推算",
    "recurring": true,
    "notes": "2026-01-04 学院发布寒假管理通知，佐证寒假窗口"
  },
  {
    "id": "return-home-practice-review-2026",
    "title": "寒假社会实践（返家乡）总结评优（2026年）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-03", "end": "", "note": "评优申报通知发布日" },
    "event": { "start": "2026-03-03", "end": "", "note": "院级优秀团队/个人评选与风采展示" },
    "points": { "second_classroom": "个人/团队获奖可计入社会实践类加分（视级别）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于2026年“返家乡”寒假社会实践总结评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4660.htm", "published": "2026-03-03", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于2025年“返家乡”寒假社会实践总结评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2518.htm", "published": "2025-02-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2024-03-05（fpa/1705）、2025-02-23、2026-03-03 三届均为2月底-3月初"
  },
  {
    "id": "lei-feng-volunteer-month-2026",
    "title": "“学雷锋”志愿服务月系列活动（2026年3月）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校团委/院志工部",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "", "end": "", "note": "活动在i川农发布报名，随时可报" },
    "event": { "start": "2026-03-05", "end": "", "note": "3月5日学雷锋日前后集中开展（校园绿境、社区服务、净享家园等）" },
    "points": { "second_classroom": "志愿服务0.5分/2小时；劳育类活动单列", "zongce": "基础分（大一大二上限2分/年）+附加分×25%" },
    "sources": [
      { "title": "学院志工部联合社区开展“学雷锋”主题志愿服务活动", "url": "https://fpa.sicau.edu.cn/info/1092/2622.htm", "published": "2025-03-05", "accessed": "2026-09-26" },
      { "title": "“践雷锋精神，创校园绿境”志愿活动圆满结束", "url": "https://fpa.sicau.edu.cn/info/1092/2633.htm", "published": "2025-03-17", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-03-05/03-09/03-17 连续开展三场（fpa/1092/2622、2596、2633）；2024-03 同类（fpa/1092/1333区域活动）—3月5日为惯例锚点",
    "recurring": true,
    "notes": "雷锋月为志愿类活动集中开展期；活动通过i川农发布与报名"
  },
  {
    "id": "research-interest-conclusion-spring-2026",
    "title": "2026年春季科研兴趣培养计划项目结题（大一下）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（学院组织答辩）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-10", "end": "", "note": "结题通知发布日（fpa/1074/4830）" },
    "event": { "start": "2026-03-19", "end": "", "note": "学院结题答辩（2026-03-19 新闻：春季科研兴趣项目结题答辩顺利进行）" },
    "points": { "second_classroom": "科研兴趣计划结题3分/项（限5人，依次递减）；校级创业训练结题4-6分/项", "zongce": "附加分=实际得分×25%（大二上限8分）" },
    "sources": [
      { "title": "公共管理学院关于2026年春季科研兴趣培养计划项目结题答辩的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4830.htm", "published": "2026-03-10", "accessed": "2026-09-26" },
      { "title": "公共管理学院2026年春季科研兴趣项目结题答辩顺利进行", "url": "https://fpa.sicau.edu.cn/info/1007/5250.htm", "published": "2026-03-19", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "科研兴趣计划每年4月/10月申报立项（学校《专业技能提升计划》口径），春季3月/秋季9月结题各一轮；立项后当年可结题"
  },
  {
    "id": "party-application-spring-2026",
    "title": "2026年春季学期递交入党申请书（大一下）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-16", "end": "", "note": "通知发布日" },
    "event": { "start": "", "end": "", "note": "递交后组织谈话、确定积极分子" },
    "points": { "second_classroom": "计实于德育板块（思想引领）", "zongce": "党员/思想品德表彰类附加分通道见细则" },
    "sources": [
      { "title": "公共管理学院关于2026年春季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4920.htm", "published": "2026-03-16", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2024-02-29、2025-03-07、2026-03-16 三年均为3月中旬"
  },
  {
    "id": "innovation-contest-intra-2026",
    "title": "中国国际大学生创新大赛（2026）院内选拔（大一下）",
    "categories": ["competition"],
    "level": "院级",
    "organizer": "公共管理学院（国创赛院赛）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-01-14", "end": "2026-03-20", "note": "院选拔赛通知1月14日发布；作品提交截止以通知为准" },
    "event": { "start": "2026-03-26", "end": "", "note": "院赛答辩（2026-03-26 新闻）；后续校初赛4月底-5月初、校决赛5月下旬、省赛6-7月" },
    "points": { "second_classroom": "国创赛按A1/B1/C1通道赋分（省赛一等11分起；国赛金奖直通车）", "zongce": "附加分×25%；国赛金奖前3名可触发二课满分直通车" },
    "sources": [
      { "title": "公共管理学院关于举办中国国际大学生创新大赛（2026）院内选拔赛的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4080.htm", "published": "2026-01-14", "accessed": "2026-09-26" },
      { "title": "公共管理学院2026年中国国际大学生创新大赛院赛答辩顺利举办", "url": "https://fpa.sicau.edu.cn/info/1007/5240.htm", "published": "2026-03-26", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "赛季节奏（已证实）：院赛3月下旬 → 校初赛4月底-5月初 → 校决赛5月下旬 → 省赛6-7月 → 国赛10月前后"
  },
  {
    "id": "tuan-review-2026",
    "title": "2025-2026年度五四团内评优（2026年）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院团委（校团委部署）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-27", "end": "2026-04-13", "note": "两次通知：3月27日、4月13日；申报窗口约2周" },
    "event": { "start": "2026-04-13", "end": "", "note": "五四前后表彰（优秀共青团员/团干部/团支部等）" },
    "points": { "second_classroom": "校级优秀共青团员等按思想品德获评表彰计（校市级2分/项）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2025-2026年度团内评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5620.htm", "published": "2026-04-13", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于开展2025-2026年度团内评优工作的通知（第一轮）", "url": "https://fpa.sicau.edu.cn/info/1074/5230.htm", "published": "2026-03-27", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "五四评优为每年3月底-4月固定动作"
  },
  {
    "id": "party-development-spring-2026",
    "title": "2026年春季学期党员发展工作（确定发展对象等）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-31", "end": "", "note": "通知发布日" },
    "event": { "start": "2026-03-31", "end": "", "note": "含发展对象确定、政审、公示等环节" },
    "points": { "second_classroom": "德育板块记实（思想引领）", "zongce": "思想品德表彰类附加分通道" },
    "sources": [
      { "title": "关于做好2026年春季学期党员发展工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5370.htm", "published": "2026-03-31", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "与秋季批次（9月递交、10-12月发展）形成一年两批"
  },
  {
    "id": "challenge-cup-15th-campus-final-2026",
    "title": "第十五届“小挑”校赛冠军争夺赛（2026年4月）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "校团委青年科技创新服务中心",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "", "end": "", "note": "校赛晋级队伍参加" },
    "event": { "start": "2026-04-03", "end": "", "note": "冠军争夺赛举行（新闻2026-04-03）" },
    "points": { "second_classroom": "校赛获奖按C1级赋分（一等5/二等4/三等3）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "第十五届“挑战杯”大学生创业计划竞赛冠军争夺赛顺利举行", "url": "https://tw.sicau.edu.cn/info/1069/14046.htm", "published": "2026-04-03", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "小挑赛季：2025-09校内初赛 → 2026-01训练营 → 2026-04校决赛 → 2026-05省赛训练营 → 2026-06省赛"
  },
  {
    "id": "sports-meet-44th-2026",
    "title": "校第四十四届运动会（2026年4月，参赛报名）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校体委（学院选拔组队）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-25", "end": "", "note": "学院运动员选拔约在赛前2-3周（参照2025年3月31日选拔通知）" },
    "event": { "start": "2026-04-20", "end": "", "note": "校运会（4月中下旬，通常2天）；体育学院另有体测等安排" },
    "points": { "second_classroom": "体育活动0.5-1分/次；获奖按体育赛事奖励（D级起）；体育队训练另计1-4分/年", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔校第四十三届运动会参赛运动员的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2650.htm", "published": "2025-03-31", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-03-31 第四十三届选拔通知（fpa/1074/2650）；2024-03-21 第四十二届选拔通知（fpa/1074/1737）—两届均为3月底选拔、4月比赛",
    "recurring": true,
    "notes": "具体比赛日期以当年秩序册为准"
  },
  {
    "id": "student-cadre-selection-2026",
    "title": "第四届团学组织学生干部遴选（2026年4月）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-04-16", "end": "", "note": "遴选通知发布日" },
    "event": { "start": "2026-04-16", "end": "", "note": "部长级/主席团遴选，5-6月完成换届" },
    "points": { "second_classroom": "学生干部考核合格2分/学年（最多个2岗位）", "zongce": "基础分（大二上限2分）+优秀附加分3分（×25%）" },
    "sources": [
      { "title": "关于公共管理学院第四届团学组织学生干部遴选工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5770.htm", "published": "2026-04-16", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大一下是竞选部门负责人的主要窗口（可竞聘代理部长）"
  },
  {
    "id": "innovation-training-intra-2026",
    "title": "2026年大学生创新训练计划项目申报院赛答辩（大一下）",
    "categories": ["competition"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-04-01", "end": "2026-04-17", "note": "校级通知4月发布（专业技能提升计划4月批次），学院组织院赛答辩" },
    "event": { "start": "2026-04-17", "end": "", "note": "院赛答辩顺利举行（2026-04-17 新闻）；立项后2026-07-17 省项目名单公布" },
    "points": { "second_classroom": "创新训练计划结题4-6分/项（校级至国家级）；科研兴趣计划结题3分/项", "zongce": "附加分×25%（大二上限8分）" },
    "sources": [
      { "title": "公共管理学院2026年大学生创新训练计划项目申报院赛答辩顺利举行", "url": "https://fpa.sicau.edu.cn/info/1007/5850.htm", "published": "2026-04-17", "accessed": "2026-09-26" },
      { "title": "关于公布立项2026年省级大学生创新训练计划项目名单的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7020", "published": "2026-07-17", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大创/科研兴趣每年4月/10月两批申报（学校本科专业技能提升计划）；大一即可跟导师组队立项"
  },
  {
    "id": "psych-committee-contest-2026",
    "title": "“同心筑梦，暖心护航”心理委员风采大赛院赛（2026年）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-04-30", "end": "", "note": "通知发布日" },
    "event": { "start": "2026-04-30", "end": "", "note": "5·25心理健康月活动之一" },
    "points": { "second_classroom": "按文化艺术/德育类活动计入基础分", "zongce": "基础分+获奖附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展“同心筑梦，暖心护航”心理委员风采大赛院赛的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6040.htm", "published": "2026-04-30", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "5月心理健康主题月配套活动"
  },
  {
    "id": "student-congress-delegate-2026",
    "title": "第三次学生代表大会代表选举（2026年5月）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院学生会",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-05-02", "end": "", "note": "选举通知发布日；以小班为单位推选代表" },
    "event": { "start": "2026-05-02", "end": "", "note": "学代会权益提案与代表履职（校级学代会5月21日选举完成）" },
    "points": { "second_classroom": "学生工作/民主管理经历记入德育板块", "zongce": "视认定" },
    "sources": [
      { "title": "关于四川农业大学公共管理学院第三次学生代表大会代表选举的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6060.htm", "published": "2026-05-02", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "校级学代会每年5月；学院一级为常设推选"
  },
  {
    "id": "transfer-major-2026",
    "title": "2026年本科生转专业（大一下窗口）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处（学院实施）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-05-09", "end": "2026-05-11", "note": "网上申请5月9日8:00-5月11日18:00（可填两个志愿）" },
    "event": { "start": "2026-05-12", "end": "2026-05-28", "note": "转出院审核5/12-13 → 转入院第一志愿5/14-18 → 第二志愿5/19-21 → 结果公示5/22-28" },
    "points": { "second_classroom": "无", "zongce": "无（学籍变更事项）" },
    "sources": [
      { "title": "公共管理学院2026年本科生转专业实施方案", "url": "https://fpa.sicau.edu.cn/info/1007/6140.htm", "published": "2026-05-08", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2025级申请条件：已修读课程全部合格；土资专业2025级拟接收36人。二年级还可再申请一次（约2027年5月）"
  },
  {
    "id": "challenge-cup-15th-provincial-2026",
    "title": "“小挑”省赛备战与参赛（2026年5-6月）",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "共青团四川省委（校团委组织）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-05-14", "end": "", "note": "省赛训练营（2026-05-14 新闻）" },
    "event": { "start": "2026-06-15", "end": "", "note": "省赛结果（2026-06-15 新闻：“3特5一”省赛再创佳绩）" },
    "points": { "second_classroom": "省赛按B1级赋分（一等11/二等9/三等7）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "全力备战！我校第十五届“小挑”省赛训练营成功举办", "url": "https://tw.sicau.edu.cn/info/1069/15376.htm", "published": "2026-05-14", "accessed": "2026-09-26" },
      { "title": "3特5一！我校“挑战杯”省赛再创佳绩", "url": "https://tw.sicau.edu.cn/info/1069/16176.htm", "published": "2026-06-15", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "省赛获奖是二课附加分大户（B1级），也是推免加分项"
  },
  {
    "id": "summer-social-practice-signup-2026",
    "title": "2026年暑期社会实践（三下乡）组织与报名",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-05-19", "end": "", "note": "通知发布；6月组队立项、遴选重点团队" },
    "event": { "start": "2026-07-05", "end": "2026-08-20", "note": "6-8月开展（蜀地新青年系列约10+支队）；8月20日总结评优" },
    "points": { "second_classroom": "社会实践考核合格1分/次；优秀团队/个人/调研报告另计", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于组织开展2026年学生暑假社会实践活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6470.htm", "published": "2026-05-19", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于2026年暑期社会实践总结评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7770.htm", "published": "2026-08-20", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2023-06、2024-05-28、2025-05-27、2026-05-19 四届均为5月下旬发布通知；8月下旬评优"
  },
  {
    "id": "qingma-project-selection-2026",
    "title": "第十三期“青马工程”主体班遴选（2026年）",
    "categories": ["evaluation"],
    "level": "校级",
    "organizer": "校团委",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-05-29", "end": "", "note": "遴选通知发布日（fpa/1074/6710）" },
    "event": { "start": "2026-05-29", "end": "", "note": "选拔后参加校级培养班（一学年）" },
    "points": { "second_classroom": "党团学习考核优秀校级3分/项", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于遴选四川农业大学第十三期“青马工程”主体班和第三期“青马工程”西部计划专项班的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6710.htm", "published": "2026-05-29", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2025-05-20 第十二期、2026-05-29 第十三期，每年5月底"
  },
  {
    "id": "rural-planning-contest-3rd-2026",
    "title": "第三届四川农业大学乡村发展策划大赛（2026年）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处主办、公共管理学院承办",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-04", "end": "2026-09-30", "note": "初赛材料提交截止9月30日（邮件+QQ群1077290054）" },
    "event": { "start": "2026-06-04", "end": "2026-09-30", "note": "初赛材料审核阶段；决赛另行通知" },
    "points": { "second_classroom": "校级竞赛获奖按C1级赋分（一等5/二等4/三等3）；C2指校级重点精品活动", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第三届四川农业大学乡村发展策划大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/6920.htm", "published": "2026-06-04", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "第一届2024-03-13通知（6月决赛）；第二届2025-04-27通知；第三届2026-06-04通知—土资专业对口赛事"
  },
  {
    "id": "class-committee-election-2026",
    "title": "2026-2027学年班、团委换届选举（大一下末）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "土资2025主要",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-11", "end": "", "note": "换届通知发布日" },
    "event": { "start": "2026-06-11", "end": "", "note": "班长/团支书/学委等班委选举" },
    "points": { "second_classroom": "班委属学生干部，考核合格记2分/学年", "zongce": "基础分+优秀附加分（×25%）" },
    "sources": [
      { "title": "公共管理学院关于2026-2027学年班、团委换届选举的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7030.htm", "published": "2026-06-11", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2024-05-27、2025-05-27、2026-06-11 三届均为5月底-6月中；大一下末是担任班委的最佳窗口"
  },
  {
    "id": "class-assistant-selection-2026",
    "title": "2026级小班驻班党员与班主任助理选拔（2026年6月）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-12", "end": "", "note": "选拔通知发布日" },
    "event": { "start": "2026-06-12", "end": "", "note": "面向2026级新生班，9月迎新季履职" },
    "points": { "second_classroom": "学生工作经历记2分/学年（属社会工作）", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔2026级小班驻班党员与班主任助理的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7050.htm", "published": "2026-06-12", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "2023-06（1910）、2025-06-09（2813）、2026-06-12 三年均为6月；大二起可申请"
  },
  {
    "id": "land-survey-contest-3rd-2026",
    "title": "第三届“研土有你”土地国情调查大赛（2026年）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "公共管理学院（教务处口径）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-23", "end": "2026-07-30", "note": "报名截止7月30日（提交附件1）" },
    "event": { "start": "2026-09-20", "end": "", "note": "初赛作品提交截止9月20日；决赛另行通知；优胜队伍推荐参加第十一届全国大学生土地资源实践创新大赛" },
    "points": { "second_classroom": "院级/校级赛事按对应级别赋分；获奖并晋级国赛按国赛级别认定", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第三届“研土有你”土地国情调查大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/7190.htm", "published": "2026-06-23", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于举办第三届“研土有你”土地国情调查大赛的通知（学生类转载）", "url": "https://fpa.sicau.edu.cn/info/1074/7200.htm", "published": "2026-06-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "第一届2024-04-24通知（2024-12-04结束）；第三届2026-06-23通知；优胜队伍推荐参加第十一届全国大学生土地资源实践创新大赛（见相关条目）"
  },
  {
    "id": "public-admin-case-2nd-2026",
    "title": "第二届公共管理案例挑战大赛（2026年）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "公共管理学院",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-23", "end": "2026-07-30", "note": "报名截止7月30日" },
    "event": { "start": "2026-09-01", "end": "2026-11-30", "note": "初赛评审9-10月；决赛（现场答辩）10-11月；优秀队伍推荐四川省大学生公共管理案例挑战大赛" },
    "points": { "second_classroom": "校级竞赛C1级赋分；晋级省赛按省赛级别", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第二届公共管理案例挑战大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/7170.htm", "published": "2026-06-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "第二届2026年；专业对口（公共管理学科案例研究）"
  },
  {
    "id": "cet-june-2026",
    "title": "全国大学英语四、六级考试（2026年上半年批次）",
    "categories": ["course"],
    "level": "国家级",
    "organizer": "教育部考试中心（学校教务处组织）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-20", "end": "", "note": "上半年报名约3月进行（以教务处通知为准）" },
    "event": { "start": "2026-06-13", "end": "", "note": "6月中旬笔试（具体日期以准考证为准）" },
    "points": { "second_classroom": "四级合格1分、六级合格2分（非英语专业）；雅思/托福另有加分", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于2026年下半年全国大学外语四六级考试报名的通知（下半年批次实抓，用于时钟校准）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7046", "published": "2026-09-15", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "单届证据：2026-09-15 教务处发布下半年四六级报名通知；上半年批次按全国统一安排推断，具体以当年教务处通知为准",
    "recurring": true,
    "notes": "四六级报名一般3月和9月各一次，考试6月/12月；四级证书影响毕业与多项申报资格"
  },
  {
    "id": "putonghua-spring-2026",
    "title": "普通话水平测试（2026年春季批次）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "语言文字工作委员会（人文学院承办）",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-03-15", "end": "", "note": "春季批次报名约3月（参照2026年秋季批次9月23日通知）" },
    "event": { "start": "2026-04-15", "end": "", "note": "测试时间以准考证为准" },
    "points": { "second_classroom": "普通话二甲1分、一乙2分（附加分）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "2026年秋季学期普通话水平测试报名通知（秋季批次实抓，用于时钟校准）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7070", "published": "2026-09-23", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "单届证据：2026-09-23 秋季批次报名通知（转人文学院公告）；春季批次按惯例推断",
    "recurring": true,
    "notes": "普通话证书为教师资格/公务员岗位常用资质，且计二课附加分"
  },
  {
    "id": "moral-quality-evaluation-2026",
    "title": "2025-2026学年学生综合素质测评·德育素质测评启动（大一下末）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院（学校学工部口径）",
    "audience_tag": "全院可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "2026-06-10", "end": "", "note": "学年德育测评安排发布" },
    "event": { "start": "2026-06-10", "end": "2026-07-04", "note": "德育素质测评+课堂成绩单第二数据提交（7月4日通知）" },
    "points": { "second_classroom": "德育测评结果为二课德育板块基础分认定依据", "zongce": "德育素质成绩计入综测总分（综测=学业+德育等模块加权）" },
    "sources": [
      { "title": "关于开展2024-2025学年度学生综合素质测评德育素质测评工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2821.htm", "published": "2025-06-10", "accessed": "2026-09-26" },
      { "title": "关于提交2024-2025学年课堂成绩单第二数据的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2859.htm", "published": "2025-07-04", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-06-05 操行评议通知（fpa/1074/1906）、2025-06-10 德育素质测评通知（fpa/1074/2821）两届均为学年末6月启动",
    "recurring": true,
    "notes": "学年综测链：6月德育测评 → 9月成绩发布 → 9-10月评优评奖"
  },
  {
    "id": "semester-2-finals-summer-2026",
    "title": "大一下学期期末考试与暑假（2026年6-7月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2025-2026-2",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2026-06-20", "end": "2026-07-15", "note": "期末考试6月中下旬；补（缓）考安排在开学前（2026-07-09 通知，参考2025-2026-2批次）" },
    "points": { "second_classroom": "无", "zongce": "课程加权为综测核心；不合格课程须补考/重修" },
    "sources": [
      { "title": "关于2025-2026-2学期不合格课程补（缓）考考试安排的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7006", "published": "2026-07-09", "accessed": "2026-09-26" },
      { "title": "2025年暑假及留校学生管理有关事宜的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2851.htm", "published": "2025-06-24", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-06-17（fpa/1924）、2025-06-24（fpa/2851）两届暑假通知均为6月下旬；补缓考通知2026-07-09",
    "recurring": true,
    "notes": "暑期为社会实践与竞赛备赛主窗口（三下乡、数学建模校赛等）"
  },
  {
    "id": "semester-start-2026-2027-1",
    "title": "大二上开学：报到注册与正式行课（2026-2027-1）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-04", "end": "2026-09-06", "note": "报到注册（校历）" },
    "event": { "start": "2026-09-07", "end": "2027-01-17", "note": "正式行课；实践周2027-01-18~24；寒假1月18日起" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "2026-2027学年校历（教务处制）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大二上开课（培养方案执行学期=3）：土地管理学、土地信息系统、测量学、地学基础、计量经济学、区域分析与规划学、微观经济学、线性代数、毛概等"
  },
  {
    "id": "cet-registration-autumn-2026",
    "title": "2026年下半年全国大学英语四、六级考试报名",
    "categories": ["course"],
    "level": "国家级",
    "organizer": "教务处（教育部考试中心）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-15", "end": "", "note": "报名通知发布；截止以通知为准" },
    "event": { "start": "2026-12-19", "end": "", "note": "12月中旬笔试（以准考证为准）" },
    "points": { "second_classroom": "四级合格1分、六级合格2分（非英语专业，附加分）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于2026年下半年全国大学外语四六级考试报名的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7046", "published": "2026-09-15", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大二是刷四六级的主力窗口；六级通过后考研/就业均有加成"
  },
  {
    "id": "cup-20th-precollege-2026",
    "title": "第二十届“挑战杯”课外学术科技作品竞赛校内预选赛启动（2026-2027）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "校团委青年科技创新服务中心（学院遴选）",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-16", "end": "2026-09-18", "note": "第一轮重点培育项目：9月18日8:00前提交汇总表与材料至院双创部邮箱" },
    "event": { "start": "2026-09-16", "end": "2026-10-09", "note": "院赛材料提交10月7-9日；院赛10月17日前报送；校赛复赛11月下旬" },
    "points": { "second_classroom": "按A1/B1/C1通道赋分；院赛按D级；重点培育资助：校决赛1000/省赛2000/国赛3000元扶持金", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于第二十届“挑战杯”中国大学生课外学术科技作品竞赛校内预选赛及校内重点项目（第一轮）遴选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8390.htm", "published": "2026-09-16", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大挑（课外学术）两年一届；本届国赛2027年。作品须为2027-06-01前两年内成果；集体作品3-10人；哲学社科类作品提交社会调查报告"
  },
  {
    "id": "golden-land-cup-10th-2026",
    "title": "第十届“金土地杯”国土空间规划大赛（2026年通知）",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "四川省相关学会/协会（教务处转发）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-17", "end": "", "note": "参赛通知发布；报名与作品提交以通知为准" },
    "event": { "start": "2026-09-17", "end": "", "note": "第十届赛事周期" },
    "points": { "second_classroom": "省级赛事获奖按B1/B2级赋分（经认定）；国赛级别按A2", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于开展“第十届金土地杯”国土空间规划大赛参赛通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7055", "published": "2026-09-17", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "对应培养方案核心课程：国土空间规划理论与方法、国土空间规划技术及应用"
  },
  {
    "id": "rural-territorial-space-value-5th-2026",
    "title": "第五届全国大学生乡村国土空间价值提升规划设计大赛（2026-2027）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "中国国土经济学会、世界青年科学家联合会自然资源与城乡发展专委会",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "分赛区组委会于2026年11月10日前指定村庄并下发报名通知；同一学生仅限参加一个分赛区" },
    "event": { "start": "2027-04-01", "end": "2027-05-10", "note": "分赛区大赛2027年4月上旬；全国现场大赛初步定2027年5月上旬（云南农业大学）" },
    "points": { "second_classroom": "经学校认定后按国家级竞赛通道赋分（以教务处当年竞赛目录为准）", "zongce": "附加分=实际得分×25%（大二上限8分）" },
    "sources": [
      { "title": "关于举办第五届全国大学生乡村国土空间价值提升规划设计大赛的通知（一号）（中国国土经济学会官方公众号发布，未标注发布日期）", "url": "https://mp.weixin.qq.com/s?__biz=Mzk0OTQyODM1NA==&mid=2247494182&idx=1&sn=6528960d8330691a5d3a4878bcbfa3b1", "published": "", "accessed": "2026-09-28" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "主题：统筹优化村镇布局、推进和美乡村建设；团队≤5名学生、指导教师≤4名；作品=研究报告+规划方案(Word/PDF)+海报(120×80cm, ≥300dpi)。分赛区划分及报名方式以学会后续通知为准"
  },
  {
    "id": "energy-saving-competition-2026",
    "title": "第二十届全国大学生节能减排社会实践与科技竞赛校内选拔赛（2026年）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "教务处（水利水电学院承办）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-18", "end": "", "note": "校内选拔赛通知发布" },
    "event": { "start": "2026-09-18", "end": "", "note": "校赛遴选战队参加第四届四川省赛及全国赛（国赛通常次年举办）" },
    "points": { "second_classroom": "国赛按A2级赋分；省赛B2；校赛C级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于开展第二十届全国大学生节能减排社会实践与科技竞赛暨第四届四川省节能减排竞赛校内选拔赛的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7058", "published": "2026-09-18", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "社会实践类赛道可用土地整治/生态修复主题参赛"
  },
  {
    "id": "financial-hardship-assessment-2026",
    "title": "2026-2027学年家庭经济困难学生认定（大二上）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院（学校资助中心口径）",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-16", "end": "2026-09-24", "note": "小班评议9/19-21；材料9/22-24报送（文法楼314）" },
    "event": { "start": "2026-09-16", "end": "2026-09-24", "note": "学院公示9/22-24；9/24上报学校" },
    "points": { "second_classroom": "无", "zongce": "无直接加分；认定结果是国家励志奖学金、国家助学金的申请前提" },
    "sources": [
      { "title": "关于开展2026-2027学年度家庭经济困难学生认定工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8400.htm", "published": "2026-09-16", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "每年9月固定开展；与9月24日国奖/励志评选形成链条"
  },
  {
    "id": "student-cadre-supplement-2026",
    "title": "第四届团学组织学生干部补录（2026-09）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-21", "end": "2026-09-23", "note": "报名9/21 12:00-9/23 12:00；申请表发2263261009@qq.com" },
    "event": { "start": "2026-09-24", "end": "", "note": "资格遴选9/23；答辩9/24 12:30-14:00（文法楼312，3+2模式）" },
    "points": { "second_classroom": "学生干部考核合格2分/学年；优秀3分（附加分）", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "关于公共管理学院第四届团学组织学生干部补录的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8500.htm", "published": "2026-09-20", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "面向2025级补录团委职业发展部代理部长1名；本次报名窗口为9月21-23日（3天）"
  },
  {
    "id": "physical-test-autumn-2026",
    "title": "三校区学生体质测试（2026年秋季）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "体育学院（教务处转发）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-20", "end": "", "note": "通知发布；测试安排见体育学院通知" },
    "event": { "start": "2026-10-01", "end": "", "note": "10-11月分批测试（以体育学院日程为准）" },
    "points": { "second_classroom": "体测成绩不计二课；体育达标影响评优（若干评选要求体测合格）", "zongce": "无直接加分" },
    "sources": [
      { "title": "关于对三校区学生进行体质测试的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7059", "published": "2026-09-20", "accessed": "2026-09-26" },
      { "title": "体育学院体测通知", "url": "https://ytxy.sicau.edu.cn/info/1095/21434.htm", "published": "2026-09-20", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "秋季学期固定项目"
  },
  {
    "id": "retake-course-selection-2026-2027-1",
    "title": "2026-2027-1学期重修选课（大二上）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-22", "end": "2026-09-24", "note": "选课9/22 9:00-9/24 18:00；仅限不合格必修/专业方向课" },
    "event": { "start": "2026-09-22", "end": "2026-09-24", "note": "重修跟班上课并参加期末考核" },
    "points": { "second_classroom": "无", "zongce": "重修记录影响转专业/评优资格（部分条款）" },
    "sources": [
      { "title": "关于2026-2027-1学期重修、毕业年级及创新实验班选课的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7066", "published": "2026-09-21", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "每学期开学第3周左右开放；大一起任何不合格必修课都要走此流程"
  },
  {
    "id": "party-application-and-activist-2026",
    "title": "2026年秋季递交入党申请书 + 积极分子培训（大二上）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "土资2025主要",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-22", "end": "2026-10-09", "note": "申请书以班级为单位10月9日16:20-18:00交文法楼313" },
    "event": { "start": "2026-09-22", "end": "2026-10-09", "note": "同期发布入党积极分子培训安排；满18周岁（截至9月15日）" },
    "points": { "second_classroom": "党团培训合格1分/期（思想引领）；积极分子培训结业计德育板块", "zongce": "附加分通道见细则" },
    "sources": [
      { "title": "公共管理学院关于2026年秋季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8540.htm", "published": "2026-09-22", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于2026年秋季入党积极分子培训有关事项的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8530.htm", "published": "2026-09-22", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大二上是提交后转积极分子的关键学期；后续发展对象最早在大二下/大三"
  },
  {
    "id": "agribusiness-manager-cert-2026",
    "title": "农业经理人职业技能等级认定报名（2026年，考试10月24日）",
    "categories": ["evaluation"],
    "level": "省级",
    "organizer": "四川农业大学公共管理学院（四川省职业技能鉴定指导中心指导）",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-10-08", "end": "2026-10-13", "note": "线上报名（扫码）；三级/高级工280元、四级/中级工225元" },
    "event": { "start": "2026-10-24", "end": "", "note": "考试（雅安校区10教B区）8:00起；三级8:00-12:10、四级8:00-11:40" },
    "points": { "second_classroom": "职业技能等级证书按“从业资格证”通道2分/项（以当年认定为准）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于开展农业经理人职业技能等级认定报名的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8560.htm", "published": "2026-09-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "学院2026-06-01新增2项职业技能备案资格（fpa/1007/6720），认定工作2026年9月首批开展；证书人社部OSTA联网可查"
  },
  {
    "id": "putonghua-registration-autumn-2026",
    "title": "2026年秋季学期普通话水平测试报名",
    "categories": ["course"],
    "level": "校级",
    "organizer": "人文学院（教务处转发）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-23", "end": "", "note": "报名通知发布（链接人文学院公告）" },
    "event": { "start": "2026-10-15", "end": "", "note": "测试时间以准考证为准" },
    "points": { "second_classroom": "二甲1分、一乙2分（附加分）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "2026年秋季学期普通话水平测试报名通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7070", "published": "2026-09-23", "accessed": "2026-09-26" },
      { "title": "普通话测试报名通知（人文学院）", "url": "https://rwy.sicau.edu.cn/info/1173/27758.htm", "published": "2026-09-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "普通话证书在教师资格认定及部分公务员/事业单位岗位招考中有等级要求"
  },
  {
    "id": "national-scholarship-2026",
    "title": "2025-2026学年国家奖学金、国家励志奖学金评选（大二上）",
    "categories": ["award"],
    "level": "国家级",
    "organizer": "学生处（校资助中心）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-24", "end": "", "note": "各学院按奖励资助工作日程执行（9月23日发布日程）" },
    "event": { "start": "2026-09-24", "end": "2026-10-31", "note": "评审与公示（10月集中完成）" },
    "points": { "second_classroom": "国家奖学金获奖可作思想品德表彰类附加分；国家励志为资助类", "zongce": "国奖10000元/年、励志6000元/年；获奖记入表彰" },
    "sources": [
      { "title": "关于开展2025-2026学年度国家奖学金、国家励志奖学金评选工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14982.htm", "published": "2026-09-24", "accessed": "2026-09-26" },
      { "title": "关于公布2026年学生奖励及资助工作日程安排的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14952.htm", "published": "2026-09-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "国奖全校128名/年、10000元；大二是最早参评的学年（评2025-2026学年，即大一学年表现）"
  },
  {
    "id": "outstanding-student-scholarship-2026",
    "title": "2025-2026学年优秀学生奖学金评选（大二上）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-24", "end": "", "note": "评选通知发布" },
    "event": { "start": "2026-09-24", "end": "2026-10-31", "note": "评审按学校日程安排" },
    "points": { "second_classroom": "获奖记入表彰（校市级2分通道）", "zongce": "全校300名×5000元/年" },
    "sources": [
      { "title": "关于开展2025-2026学年度优秀学生奖学金评选工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14972.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "与国奖/励志同批启动"
  },
  {
    "id": "single-item-scholarship-2026",
    "title": "2025-2026学年单项奖学金评审（大二上，材料10月12日截止）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/学院（学院收件邮箱 ggglxy_xxb@163.com）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-24", "end": "2026-10-12", "note": "电子档10月12日12:00前；纸质档10月12日12:30-14:00交文法楼313" },
    "event": { "start": "2026-09-24", "end": "2026-10-12", "note": "奖励范围2025-09-01至2026-08-31（毕业年级延长至9月3日）" },
    "points": { "second_classroom": "学术创新奖/竞赛奖等按分类认定（竞赛奖以证书落款时间认定）", "zongce": "同一项目多重获奖按最高级别奖励，不重复" },
    "sources": [
      { "title": "关于开展2025-2026学年单项奖学金评审工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8600.htm", "published": "2026-09-24", "accessed": "2026-09-26" },
      { "title": "关于开展2025-2026学年单项奖学金评审工作的通知（学校口径）", "url": "https://xsc.sicau.edu.cn/info/1013/15012.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "参评条件：二年级及以上（大二首次可评）；奖励类别含学术创新奖、竞赛奖、文化艺术体育奖、社会工作奖等——大一学年打的比赛在这里变现"
  },
  {
    "id": "comprehensive-evaluation-release-2026",
    "title": "2025-2026学年度综合素质测评成绩发布（大二上）",
    "categories": ["evaluation"],
    "level": "校级",
    "organizer": "学生处（学工系统）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2026-09-21", "end": "", "note": "非毕业年级定版成绩9月21日发布（可用于评优评奖）；毕业年级第一版9月8日发布" },
    "points": { "second_classroom": "综测中的二课成绩占比20%（基础分+附加分折算）", "zongce": "综测排名决定奖学金与推免排序" },
    "sources": [
      { "title": "关于发布2025-2026学年度综合素质测评成绩定版（非毕业年级）的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14842.htm", "published": "2026-09-21", "accessed": "2026-09-26" },
      { "title": "关于发布2025-2026学年度综合素质测评（毕业年级）第一版成绩的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14462.htm", "published": "2026-09-08", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "成绩可在学工系统查询；有异议按通知咨询（学生处/校团委分模块负责）"
  },
  {
    "id": "holiday-autumn-2026",
    "title": "中秋、国庆假期安排（2026年，9月25日-10月7日）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "学校办公室/学生处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2026-09-25", "end": "2026-10-07", "note": "中秋9/25-27；国庆10/1-7；9月20日、10月10日调休行课" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "关于做好2026年中秋、国庆假期学生安全教育管理工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14822.htm", "published": "2026-09-18", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "假期出境/离校需报备；假期前后为竞赛备赛与调研实践黄金窗口"
  },
  {
    "id": "work-study-fair-2026",
    "title": "2026-2027学年勤工助学双选会",
    "categories": ["evaluation"],
    "level": "校级",
    "organizer": "学生处学生资助中心",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-24", "end": "2026-10-10", "note": "通知9月24日发布；双选会10月10日16:00起" },
    "event": { "start": "2026-10-10", "end": "", "note": "用岗单位与学生双向选择确定上岗" },
    "points": { "second_classroom": "勤工助学经历可入社会工作履历（视认定）", "zongce": "视认定" },
    "sources": [
      { "title": "关于举办2026-2027学年四川农业大学勤工助学双选会的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14902.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "校内勤工助学岗位（图书馆/行政楼助理等），每小时计酬并积累工作经历"
  },
  {
    "id": "english-challenge-5th-2026",
    "title": "第五届大学生英语挑战赛（四）暨四川省跨文化能力大赛校园选拔赛",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "人文学院（教务处转发）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-23", "end": "", "note": "通知发布（人文学院官网报名）" },
    "event": { "start": "2026-10-01", "end": "", "note": "校园选拔赛10月举行（以人文学院通知为准）" },
    "points": { "second_classroom": "校级选拔按C级；省赛获奖按B1/B2", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于四川农业大学第五届大学生英语挑战赛（四）暨2026年四川省大学生跨文化能力大赛校园选拔赛的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7071", "published": "2026-09-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "英语类竞赛每年秋季举办（2026-06-18 亦有“挑战赛（三）外研社·国才杯”批次）"
  },
  {
    "id": "business-award-competition-2026",
    "title": "2026年四川省大学生商科实务技能大赛（会计技能赛道）校内选拔赛",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "管理学院（教务处转发）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-20", "end": "", "note": "通知发布（管理学院报名）" },
    "event": { "start": "2026-10-01", "end": "", "note": "校内选拔→省赛（以管理学院通知为准）" },
    "points": { "second_classroom": "省赛按B2级；校选按C级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办2026年“四川省大学生商科实务技能大赛——会计技能大赛赛道”校内选拔赛的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7062", "published": "2026-09-20", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "经管赛道，土资学生可跨专业参加（培养方案含经济学基础课）"
  },
  {
    "id": "iot-innovation-12th-2026",
    "title": "四川农业大学第十二届物联网应用创新大赛",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（信息工程学院承办）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-16", "end": "", "note": "报名通知发布" },
    "event": { "start": "2026-10-15", "end": "", "note": "比赛周期（以承办学院通知为准）" },
    "points": { "second_classroom": "校级C级赋分", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办四川农业大学第十二届物联网应用创新大赛的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7051", "published": "2026-09-16", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "土地监测/无人机+物联网方向可结合（培养方案含无人机技术与应用课程）"
  },
  {
    "id": "research-interest-conclusion-autumn-2026",
    "title": "2026年秋季科研兴趣培养计划结题（大二上）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（学院答辩）",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-09-08", "end": "2026-09-15", "note": "结题材料9月15日前提交至指导教师学院" },
    "event": { "start": "2026-09-21", "end": "", "note": "学院答辩9月21日14:30-17:30（7教312）；学院9月23日前报教务处" },
    "points": { "second_classroom": "科研兴趣计划结题3分/项（限5人递减）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于开展2026年秋季科研兴趣培养计划及校级创业训练计划项目结题工作的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7034", "published": "2026-09-08", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于2026年秋季科研兴趣培养计划项目结题答辩的通知", "url": "https://fpa.sicau.edu.cn/info/1007/8360.htm", "published": "2026-09-15", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大二上可承担学长项目结题或提交自己大一下立项项目的第一个结题节点"
  },
  {
    "id": "land-survey-contest-judging-2026",
    "title": "第三届“研土有你”土地国情调查大赛：初赛评审与决赛（2026秋）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "公共管理学院",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "报名已于7月30日截止（见大一下条目）" },
    "event": { "start": "2026-09-20", "end": "2026-12-31", "note": "作品提交9月20日截止；初赛评审→决赛（另行通知，参照第一届12月举行）" },
    "points": { "second_classroom": "获奖按院/校级D/C级；晋级全国土地资源实践创新大赛另计", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第三届“研土有你”土地国情调查大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/7190.htm", "published": "2026-06-23", "accessed": "2026-09-26" },
      { "title": "第一届四川农业大学“研土有你”土地国情调查大赛圆满结束", "url": "https://fpa.sicau.edu.cn/info/1007/2426.htm", "published": "2024-12-04", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "决赛时点依据第一届：2024-12-04 圆满结束（fpa/1007/2426）；第三届通知的初赛节点为2026-09-20",
    "recurring": true,
    "notes": "决赛时间以组委会另行通知为准"
  },
  {
    "id": "public-admin-case-2nd-autumn-2026",
    "title": "第二届公共管理案例挑战大赛：初赛评审与决赛（2026秋）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "公共管理学院",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "报名已于7月30日截止（见大一下条目）" },
    "event": { "start": "2026-09-01", "end": "2026-11-30", "note": "初赛评审9-10月；决赛（现场答辩）10-11月" },
    "points": { "second_classroom": "校级C1级赋分；晋级省赛按B级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第二届公共管理案例挑战大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/7170.htm", "published": "2026-06-23", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "决赛时间为通知给出的10-11月窗口"
  },
  {
    "id": "rural-planning-contest-judging-2026",
    "title": "第三届乡村发展策划大赛：初赛材料截止与评审（2026秋）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处/公共管理学院",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "2026-09-30", "note": "初赛材料9月30日前提交（邮箱3429299492@qq.com）" },
    "event": { "start": "2026-09-30", "end": "2026-12-31", "note": "初赛材料审核（无需现场答辩）→决赛另行通知" },
    "points": { "second_classroom": "校级C1级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第三届四川农业大学乡村发展策划大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/6920.htm", "published": "2026-06-04", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "乡村发展/村庄规划主题，与土地资源管理专业方向一致"
  },
  {
    "id": "welcome-volunteer-2026",
    "title": "2026年迎新志愿服务（大二上学期初）",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委志工部",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "迎新季通过i川农/班级群招募" },
    "event": { "start": "2026-09-04", "end": "2026-09-06", "note": "新生报到迎新岗（2026级）" },
    "points": { "second_classroom": "志愿服务0.5分/2小时", "zongce": "基础分（限2分/年）+附加分×25%" },
    "sources": [
      { "title": "公共管理学院2024迎新志愿活动圆满结束", "url": "https://fpa.sicau.edu.cn/info/1092/2103.htm", "published": "2024-09-06", "accessed": "2026-09-26" },
      { "title": "“新”程满加载，以“心”赴新约——2026迎新季纪实", "url": "https://tw.sicau.edu.cn/info/1187/17646.htm", "published": "2026-09-15", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-09-06 迎新志愿活动（fpa/1092/2103）；2026-09 迎新季报道（tw/1187/17646）—两届均为报到周同期",
    "recurring": true,
    "notes": "大二起可作为迎新志愿者（大一由学长学姐迎接）"
  },
  {
    "id": "hanmei-stars-2026",
    "title": "寒梅飘香工程“自强之星”“公益之星”“科创之星”评选（2026年秋）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/学院",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "2026-11-10", "end": "", "note": "评选通知约11月中旬发布（参照2025-11-11）" },
    "event": { "start": "2026-11-10", "end": "", "note": "评选与展示（11-12月）" },
    "points": { "second_classroom": "获评记入思想品德表彰（校级）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2024-2025学年度寒梅飘香工程“自强之星”“公益之星”“科创之星”评选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4110.htm", "published": "2025-11-11", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于开展2023-2024学年度寒梅飘香工程“自强之星”“公益之星”“科创之星”评选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2375.htm", "published": "2024-11-22", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-11-13（fpa/1074/1357）、2024-11-22（fpa/1074/2375）、2025-11-11（fpa/1074/4110）三届均为11月中下旬",
    "recurring": true,
    "notes": "三届日期均在11月中旬窗口"
  },
  {
    "id": "exam-ethics-winter-2026",
    "title": "期末考试诚信教育（2026-2027-1学期末）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2026-12-15", "end": "2027-01-10", "note": "12月中下旬至考试周" },
    "points": { "second_classroom": "无", "zongce": "违纪影响操行分与评优" },
    "sources": [
      { "title": "关于做好学生诚信考试教育工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2439.htm", "published": "2024-12-11", "accessed": "2026-09-26" },
      { "title": "关于做好学生诚信考试教育工作的通知（2023年）", "url": "https://fpa.sicau.edu.cn/info/1074/1466.htm", "published": "2023-12-14", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-12-14（fpa/1466）、2024-12-11（fpa/2439）两届，均为12月中旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "semester-3-finals-winter-2027",
    "title": "大二上学期期末考试、实践周与寒假（2027年1月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2027-01-04", "end": "2027-01-24", "note": "期末考试约第17-18周（1月上旬）；实践周1月18-24日；寒假1月18日起（校历）" },
    "points": { "second_classroom": "无", "zongce": "课程加权成绩计入综测" },
    "sources": [
      { "title": "2026-2027学年校历（教务处制）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "考试周具体安排由教务处另行公布；实践周含实践教学环节"
  },
  {
    "id": "semester-start-2026-2027-2",
    "title": "大二下开学：报到注册与正式行课（2026-2027-2）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-02-26", "end": "2027-02-28", "note": "报到注册（校历）" },
    "event": { "start": "2027-03-01", "end": "2027-07-11", "note": "正式行课；实践周7月12-18日；暑假7月12日起（校历）" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "2026-2027学年校历（教务处制）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": "大二下开课（培养方案执行学期=4）：土地法学、土地整治学、遥感基础与应用、土地利用系统分析与建模、人工智能、习概、GIS空间分析、Python地理数据处理等"
  },
  {
    "id": "lei-feng-volunteer-month-2027",
    "title": "“学雷锋”志愿服务月系列活动（2027年3月）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校团委/院志工部",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "i川农活动发布即可报名" },
    "event": { "start": "2027-03-05", "end": "", "note": "3月5日前后集中开展" },
    "points": { "second_classroom": "志愿服务0.5分/2小时；劳育类另计", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "学院志工部联合社区开展“学雷锋”主题志愿服务活动", "url": "https://fpa.sicau.edu.cn/info/1092/2622.htm", "published": "2025-03-05", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-03-05（fpa/1092/2622）、2025-03-17（fpa/1092/2633）连续开展；2026-03 亦为雷锋月活动期—3月5日锚点",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "party-application-spring-2027",
    "title": "2027年春季学期递交入党申请书（大二下）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-03-15", "end": "", "note": "约3月中旬发布通知（参照2024/2025/2026三年）" },
    "event": { "start": "2027-03-15", "end": "", "note": "递交与谈话" },
    "points": { "second_classroom": "德育板块记实", "zongce": "—" },
    "sources": [
      { "title": "公共管理学院关于2026年春季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4920.htm", "published": "2026-03-16", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-02-29（fpa/1702）、2025-03-07（fpa/2567）、2026-03-16（fpa/4920）三年均为2月底-3月中旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "land-resource-innovation-11th-2027",
    "title": "全国大学生土地资源实践创新大赛（第十一届，2027年）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "教育部高等学校公共管理类专业教学指导委员会（中国土地学会等指导）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "校内推荐通道：学院“研土有你”大赛遴选推荐（见相关条目）；全国报名窗口以官方通知为准" },
    "event": { "start": "2027-03-01", "end": "2027-08-31", "note": "第十届决赛2026-08-23于南京农业大学落幕；第十一届赛程预判2027年春季报名、暑期决赛（以官方为准）" },
    "points": { "second_classroom": "国赛获奖经认定后按国家级竞赛通道赋分（以教务处当年竞赛目录为准）", "zongce": "附加分=实际得分×25%" },
    "sources": [
      { "title": "国土院学子在第十届全国大学生土地资源实践创新大赛中喜获佳绩（学院官网新闻，含决赛时间地点）", "url": "http://guotu.jxau.edu.cn/", "published": "2026-08-26", "accessed": "2026-09-28" },
      { "title": "学院学子在第十届全国大学生土地资源实践创新大赛斩获特等奖（华中农业大学公共管理学院官网新闻，佐证）", "url": "https://ggxy.hzau.edu.cn/", "published": "2026-08-25", "accessed": "2026-09-28" },
      { "title": "第三届“研土有你”土地国情调查大赛通知（学院选拔：为第十一届全国大学生土地资源实践创新大赛选队）", "url": "https://fpa.sicau.edu.cn/info/1007/7190.htm", "published": "2026-06-23", "accessed": "2026-09-28" }
    ],
    "confidence": "predicted",
    "basis": "第十届决赛2026-08-23在南京农业大学（江西农大国土学院官网2026-08-26新闻）；学院2026-06-23通知明确“为第十一届…选拔决赛队伍”；第十一届具体日期未公布",
    "recurring": true,
    "notes": "第十届报道：大赛统筹融合全国大学生不动产估价技能大赛、国土空间规划技能大赛等板块；公开渠道未见组委会通知网页版（来源为高校官网报道+学院选拔通知）"
  },
  {
    "id": "national-territorial-planning-competition-7th-2027",
    "title": "全国大学生国土空间规划设计竞赛暨城乡规划毕业设计（论文）竞赛（“未来规划师”，第七届·2027）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "自然资源部人力资源开发中心（以官方通知为准）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "赛程通常春季启动；以官方通知为准" },
    "event": { "start": "2027-03-01", "end": "2027-08-31", "note": "第五届2025·广州、第六届2026·长沙（2026-08-23于湖南大学闭幕）；第七届时间待官方公布" },
    "points": { "second_classroom": "国赛获奖经认定后按国家级竞赛通道赋分（以教务处当年竞赛目录为准）", "zongce": "附加分=实际得分×25%" },
    "sources": [
      { "title": "我院在2026年第六届全国大学生国土空间规划设计竞赛中再创佳绩（学院官网新闻，含闭幕时间地点）", "url": "http://jzys.hpu.edu.cn/index.htm", "published": "2026-08-26", "accessed": "2026-09-28" },
      { "title": "未来规划师——“广州规划杯”第五届全国大学生国土空间规划设计竞赛在广州圆满落幕（广州市规划和自然资源局官网）", "url": "https://ghzyj.gz.gov.cn/xwzx/gzdt/content/post_10411747.html", "published": "", "accessed": "2026-09-28" }
    ],
    "confidence": "predicted",
    "basis": "第五届2025年于广州落幕（广州规自局官网）；第六届2026年于长沙（2026-08-23湖南大学闭幕，河南理工建艺学院新闻2026-08-26）；第七届日期未公布",
    "recurring": true,
    "notes": "含城乡规划毕业设计（论文）赛道，每年1届。公开渠道未见全国组委会通知网页版（现有来源为承办校及政府官网报道），报名通常经各校组织"
  },
  {
    "id": "ruc-rural-land-rights-survey-2027",
    "title": "全国农村承包地权益调查·调查员招募（2027年批次，参考2026年）",
    "categories": ["second_classroom"],
    "level": "国家级",
    "organizer": "中国人民大学中国调查与数据中心（全国农村承包地权益调查项目）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "2026年批次报名截止6月30日、扫码报名（官方原文）；2027年批次预计同期招募，以公众号 RUCdiaoxie 通知为准" },
    "event": { "start": "2027-07-01", "end": "2027-08-31", "note": "2026年批次：首次培训7月3日、7-8月实地入户调查（安卓手机/Pad电子问卷采集）" },
    "points": { "second_classroom": "大型社会调查经历，可作社会实践/科研履历（综测认定以学院当年口径为准）", "zongce": "视认定；另有劳务费、意外保险与人大中国调查与数据中心颁发的实践证明" },
    "sources": [
      { "title": "全国农村承包地权益调查2026调查员招募文件（RUCdiaoxie 公众号，含报名截止、培训与调查安排；页面未标注发布日期）", "url": "https://mp.weixin.qq.com/s/0yCsHfYW7PgNaXaikCiF1g", "published": "", "accessed": "2026-09-28" }
    ],
    "confidence": "predicted",
    "basis": "2026年批次官方招募文件：报名截止2026-06-30、首次培训2026-07-03、7-8月实地调查（覆盖14省约100县市，含四川）；2027年批次是否招募及时间未公布",
    "recurring": true,
    "notes": "项目背景：人大中国调查与数据中心大型调查网络（历史上含1999/2001/2005/2008/2010/2011/2016年“17省调查”与2018/2019/2021年“千人百村”等）。咨询邮箱 yuzhaoyang@ruc.edu.cn"
  },
  {
    "id": "qiushi-cup-11th-2027",
    "title": "“求是杯”全国公共管理案例大赛（第十一届·2027，参考2026年）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "中国人民大学公共管理学院（大赛组委会）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "历届报名窗口均为1月中旬—2月中旬（第八届2024-01-18~02-19、第十届2026-01-19~02-13，问卷报名）；第十一届预计同期，以“爱公管”公众号通知为准" },
    "event": { "start": "2027-05-01", "end": "2027-06-30", "note": "第九届决赛2025-05-18（人大通州校区）、第十届决赛2026-05-31（人大）；复赛/决赛均安排于5月中旬—6月中旬" },
    "points": { "second_classroom": "国家级赛事获奖经认定后按国家级竞赛通道赋分（以教务处当年竞赛目录为准）", "zongce": "附加分=实际得分×25%" },
    "sources": [
      { "title": "第九届“求是杯”全国公共管理案例大赛举办（中国人民大学新闻网，官方）", "url": "https://news.ruc.edu.cn/703145623733702.html", "published": "2025-05-22", "accessed": "2026-09-28" },
      { "title": "第十届“求是杯”全国公共管理案例大赛报名通知（全文转载，含报名时间2026-01-19~02-13、赛程与奖项）", "url": "http://m.52jingsai.com/article-23423.html", "published": "2026-01-22", "accessed": "2026-09-28" },
      { "title": "第八届“求是杯”全国公共管理案例大赛（赛氪赛事页，含第八届报名2024-01-18~02-19与“爱公管”公众号说明）", "url": "https://www.saikr.com/vse/49667", "published": "", "accessed": "2026-09-28" },
      { "title": "直播预告丨第十届“求是杯”全国公共管理案例大赛现场图文直播通道（组委会发布，文末落款2026-05-29）", "url": "https://mp.weixin.qq.com/s/w9jMfeieMi3itvBzpw6WiA", "published": "2026-05-29", "accessed": "2026-09-28" }
    ],
    "confidence": "pattern",
    "basis": "报名窗口两届一致：第八届2024-01-18~02-19、第十届2026-01-19~02-13；决赛：第九届2025-05-18（人大新闻网）、第十届2026-05-31（组委会公告）——预计1月中旬启动报名、5-6月决赛；第十一届时间未公布",
    "recurring": true,
    "notes": "面向全国在读本科生，3-5人/队、不可跨校；作品查重≤10%（CNKI）且AIGC检测；官方信息持续通过“爱公管”微信公众号发布（历届通知口径）。本学院另设校级“公共管理案例挑战大赛”作为四川省赛选拔（见相关条目），两者可并行参加"
  },
  {
    "id": "research-interest-conclusion-spring-2027",
    "title": "2027年春季科研兴趣培养计划结题（大二下）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（学院答辩）",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-03-10", "end": "", "note": "约3月上旬发布结题通知" },
    "event": { "start": "2027-03-20", "end": "", "note": "学院结题答辩（约3月中下旬）" },
    "points": { "second_classroom": "结题3分/项", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于2026年春季科研兴趣培养计划项目结题答辩的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4830.htm", "published": "2026-03-10", "accessed": "2026-09-26" },
      { "title": "公共管理学院2025年春季科研兴趣培养计划项目结题答辩顺利进行", "url": "https://fpa.sicau.edu.cn/info/1007/2652.htm", "published": "2025-03-19", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-03-19（fpa/2652）、2026-03-10通知+03-19答辩（fpa/4830、5250）两届均为3月",
    "recurring": true,
    "notes": "4月/10月立项→次年3月/9月结题，构成完整项目周期"
  },
  {
    "id": "tuan-review-2027",
    "title": "2026-2027年度五四团内评优（2027年）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-03-27", "end": "", "note": "约3月底发布（参照2026-03-27）" },
    "event": { "start": "2027-04-15", "end": "", "note": "五四前表彰" },
    "points": { "second_classroom": "优秀共青团员等按思想品德表彰（校市级2分）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2025-2026年度团内评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5230.htm", "published": "2026-03-27", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "单届明确日期（2026-03-27起两轮通知）＋五四表彰为年度制度性安排；按2026年节奏推送",
    "recurring": true,
    "notes": "若2025-2026学年已获评，本年度可争取更高等级"
  },
  {
    "id": "transfer-major-2027",
    "title": "2027年本科生转专业（大二下，最后一次机会）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处（学院实施）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-05-10", "end": "2027-05-12", "note": "约5月上旬（参照2026-05-09~11）" },
    "event": { "start": "2027-05-12", "end": "2027-05-28", "note": "学院审核+公示（参照2026年5/22-28公示）" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "公共管理学院2026年本科生转专业实施方案", "url": "https://fpa.sicau.edu.cn/info/1007/6140.htm", "published": "2026-05-08", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-05-08 方案 + 2026年5月分阶段日程（fpa/1007/6140）；2025-05 亦有转专业流程（2026方案中提及对2024级的名额限制）—两年份",
    "recurring": true,
    "notes": "大二为最后一次转专业窗口；土资专业接收名额充足（2025级36人）"
  },
  {
    "id": "challenge-cup-20th-prep-2027",
    "title": "第二十届“挑战杯”大挑：省赛备战与参赛（2027年，大二下-大三上）",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "校团委（省赛由团省委主办）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "校赛晋级队伍进入省赛集训（参照2026-05-14小挑训练营）" },
    "event": { "start": "2027-05-15", "end": "2027-06-30", "note": "省赛6月；国赛2027年下半年（第二十届）" },
    "points": { "second_classroom": "B1级（省赛）9-11分；国赛A1级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "全力备战！我校第十五届“小挑”省赛训练营成功举办", "url": "https://tw.sicau.edu.cn/info/1069/15376.htm", "published": "2026-05-14", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-05-14 省赛训练营 + 2026-06-15 省赛结果（tw/1069）显示“训练营5月、省赛6月”节奏；大挑（第二十届）赛程为2026-09校内预选→2027省赛/国赛",
    "recurring": true,
    "notes": "大挑国赛2027年为19届后两年一届的奇数届"
  },
  {
    "id": "sports-meet-45th-2027",
    "title": "校第四十五届运动会（2027年4月，参赛报名）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校体委（学院选拔组队）",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-03-25", "end": "", "note": "赛前2-3周学院选拔（参照2025-03-31第四十三届）" },
    "event": { "start": "2027-04-18", "end": "", "note": "4月中下旬（以秩序册为准）" },
    "points": { "second_classroom": "体育活动0.5-1分/次；获奖按D级及以上", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔校第四十三届运动会参赛运动员的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2650.htm", "published": "2025-03-31", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于选拔校第四十二届运动会参赛运动员的通知", "url": "https://fpa.sicau.edu.cn/info/1074/1737.htm", "published": "2024-03-21", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第四十二届（2024-03-21选拔）、第四十三届（2025-03-31选拔）两届均为3月底选拔、4月举行",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "summer-social-practice-signup-2027",
    "title": "2027年暑期社会实践（三下乡）组织与报名",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-05-20", "end": "", "note": "约5月下旬发布（参照2026-05-19）" },
    "event": { "start": "2027-07-01", "end": "2027-08-20", "note": "7-8月开展；8月下旬总结评优" },
    "points": { "second_classroom": "社会实践合格1分/次；优秀团队/个人另计", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于组织开展2026年学生暑假社会实践活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6470.htm", "published": "2026-05-19", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于组织开展2025年学生暑假社会实践活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2784.htm", "published": "2025-05-27", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-05-27（fpa/2784）、2026-05-19（fpa/6470）两届均为5月下旬；评优8月下旬（2025-08-30、2026-08-20）",
    "recurring": true,
    "notes": "大二暑期为社会实践重点窗口（可争取校级/省级优秀团队）"
  },
  {
    "id": "qingma-project-selection-2027",
    "title": "第十四期“青马工程”主体班遴选（2027年）",
    "categories": ["evaluation"],
    "level": "校级",
    "organizer": "校团委",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-05-28", "end": "", "note": "约5月底发布（参照2026-05-29）" },
    "event": { "start": "2027-05-28", "end": "", "note": "选拔与培养（一学年）" },
    "points": { "second_classroom": "党团学习考核优秀3分（校级）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于遴选四川农业大学第十三期“青马工程”主体班和第三期“青年马克思主义者培养工程”西部计划专项班的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6710.htm", "published": "2026-05-29", "accessed": "2026-09-26" },
      { "title": "关于遴选四川农业大学第十二期“青马工程”主体班和第二期“青马工程”西部计划专项班的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2766.htm", "published": "2025-05-20", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-05-20（fpa/2766）、2026-05-29（fpa/6710）两届均为5月下旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "class-committee-election-2027",
    "title": "2027-2028学年班、团委换届选举（大二下末）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "土资2025主要",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-06-10", "end": "", "note": "约6月上中旬（参照2026-06-11）" },
    "event": { "start": "2027-06-10", "end": "", "note": "班委换届选举" },
    "points": { "second_classroom": "班委考核合格2分/学年", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于2026-2027学年班、团委换届选举的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7030.htm", "published": "2026-06-11", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-05-27（fpa/1888）、2025-05-27（fpa/2789）、2026-06-11（fpa/7030）三届均为5月底-6月中",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "class-assistant-selection-2027",
    "title": "2027级小班驻班党员与班主任助理选拔（2027年6月）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-06-10", "end": "", "note": "约6月中旬（参照2026-06-12）" },
    "event": { "start": "2027-06-10", "end": "", "note": "面向2027级新生班级" },
    "points": { "second_classroom": "学生工作2分/学年", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔2026级小班驻班党员与班主任助理的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7050.htm", "published": "2026-06-12", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-06-06（fpa/1910）、2025-06-09（fpa/2813）、2026-06-12（fpa/7050）三年均为6月上中旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "rural-planning-contest-4th-2027",
    "title": "第四届乡村发展策划大赛（2027年，报名与初赛）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处/公共管理学院",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "2027-06-01", "end": "", "note": "约6月发布通知（参照2026-06-04）" },
    "event": { "start": "2027-06-01", "end": "2027-09-30", "note": "初赛周期约6-9月" },
    "points": { "second_classroom": "校级C1级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于举办第三届四川农业大学乡村发展策划大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/6920.htm", "published": "2026-06-04", "accessed": "2026-09-26" },
      { "title": "关于举办第二届四川农业大学乡村发展策划大赛的通知", "url": "https://fpa.sicau.edu.cn/info/1007/2725.htm", "published": "2025-04-27", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第一届2024-03-13、第二届2025-04-27、第三届2026-06-04 三届通知；二届已获校级奖队伍有经验优势",
    "recurring": true,
    "notes": "大二下可再次组队（大二上已参赛一届）"
  },
  {
    "id": "semester-4-finals-summer-2027",
    "title": "大二下学期期末考试、实践周与暑假（2027年7月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2026-2027-2",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2027-06-28", "end": "2027-07-18", "note": "期末考试约6月底-7月初；实践周7月12-18日；暑假7月12日起（校历）" },
    "points": { "second_classroom": "无", "zongce": "课程加权计入综测" },
    "sources": [
      { "title": "2026-2027学年校历（教务处制）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "semester-start-2027-2028-1",
    "title": "大三上开学（2027-2028-1）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "", "end": "", "note": "报到注册约9月上旬（参照2026-2027校历9月4-6日）" },
    "event": { "start": "2027-09-06", "end": "2028-01-16", "note": "行课至次年1月中旬；寒假约1月中下旬起" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "2026-2027学年校历（同类学期结构参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027学年校历：上学期9月4-6日报到、9月7日行课、次年1月18日寒假；大三按同构推算",
    "recurring": true,
    "notes": "大三上开课（培养方案执行学期=5）：不动产估价、国土空间规划理论与方法、土地工程设计、土地利用管理、土壤学B、数字城市与空间规划、无人机技术与应用等——专业核心课最密集的学期"
  },
  {
    "id": "challenge-cup-16th-intra-2027",
    "title": "第十六届“小挑”院内初赛及重点项目遴选（2027年秋）",
    "categories": ["competition"],
    "level": "院级",
    "organizer": "公共管理学院团委（校团委部署）",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-25", "end": "", "note": "约9月下旬发布（参照2025-09-26第十五届）" },
    "event": { "start": "2027-09-25", "end": "", "note": "初赛→训练营（次年1月）→校决赛（次年4月）→省赛（次年6月）" },
    "points": { "second_classroom": "挑战杯按A1/B1/C1通道；院赛D级起", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于第十五届“挑战杯”中国大学生创业计划竞赛院内初赛及重点项目（第一轮）遴选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2973.htm", "published": "2025-09-26", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第十五届（2025-09-26院内初赛通知）→ 第十六届按同一赛季节奏（9月启动）推算；培训营2026-01-15、校决赛2026-04-03、省赛2026-06-15 佐证赛季结构",
    "recurring": true,
    "notes": "大三为挑战杯项目负责人主力阶段"
  },
  {
    "id": "scholarship-season-2027",
    "title": "2027年评奖评优季（国奖/励志/优秀学生奖学金，大三）",
    "categories": ["award"],
    "level": "国家级",
    "organizer": "学生处（校资助中心）",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-22", "end": "", "note": "约9月下旬发布（参照2026-09-24）" },
    "event": { "start": "2027-09-22", "end": "2027-10-31", "note": "评审与公示" },
    "points": { "second_classroom": "获奖记入表彰", "zongce": "国奖10000元、励志6000元、优秀学生5000元（以当年文件为准）" },
    "sources": [
      { "title": "关于开展2025-2026学年度国家奖学金、国家励志奖学金评选工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14982.htm", "published": "2026-09-24", "accessed": "2026-09-26" },
      { "title": "关于开展2025-2026学年度优秀学生奖学金评选工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14972.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-24 三份评选通知（xsc/1013/14982、14972、15012）；评奖评优季为每年9月制度性安排",
    "recurring": true,
    "notes": "大三学年为奖学金竞争主战场（成绩+二课双线拉开差距）"
  },
  {
    "id": "single-item-scholarship-2027",
    "title": "2027年单项奖学金评审（大三）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/学院",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-22", "end": "2027-10-12", "note": "约9月下旬-10月12日（参照2026年10月12日截止）" },
    "event": { "start": "2027-09-22", "end": "2027-10-12", "note": "评审；奖励上一学年突出表现" },
    "points": { "second_classroom": "竞赛奖/学术创新奖等分类认定", "zongce": "不重复奖励，按最高级别" },
    "sources": [
      { "title": "关于开展2025-2026学年单项奖学金评审工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8600.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-24 通知+10月12日材料截止（fpa/1074/8600）；单项奖学金每年9-10月评审",
    "recurring": true,
    "notes": "大二-大三积累的竞赛证书在此变现（竞赛奖以证书落款时间认定）"
  },
  {
    "id": "comprehensive-evaluation-release-2027",
    "title": "2026-2027学年度综合素质测评成绩发布（大三上）",
    "categories": ["evaluation"],
    "level": "校级",
    "organizer": "学生处（学工系统）",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2027-09-21", "end": "", "note": "约9月下旬发布定版成绩" },
    "points": { "second_classroom": "综测中二课成绩占20%", "zongce": "综测排名影响推免与奖学金" },
    "sources": [
      { "title": "关于发布2025-2026学年度综合素质测评成绩定版（非毕业年级）的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14842.htm", "published": "2026-09-21", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-21 定版成绩发布（xsc/1013/14842）；每年9月同一流程",
    "recurring": true,
    "notes": "大三成绩直接影响推免排序（推免用前三学年综测+成绩）"
  },
  {
    "id": "hardship-assessment-2027",
    "title": "2027-2028学年家庭经济困难学生认定（大三上）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-16", "end": "2027-09-24", "note": "约9月中下旬（参照2026-09-16~24日程）" },
    "event": { "start": "2027-09-16", "end": "2027-09-24", "note": "小班评议→学院公示→上报" },
    "points": { "second_classroom": "无", "zongce": "国家励志/助学金申请前提" },
    "sources": [
      { "title": "关于开展2026-2027学年度家庭经济困难学生认定工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8400.htm", "published": "2026-09-16", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-16~24 完整日程（fpa/1074/8400）；每年9月固定",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "party-application-autumn-2027",
    "title": "2027年秋季递交入党申请书+积极分子培训（大三上）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-22", "end": "2027-10-09", "note": "约9月下旬-10月上旬递交" },
    "event": { "start": "2027-09-22", "end": "2027-10-09", "note": "谈话与积极分子培训" },
    "points": { "second_classroom": "党团培训合格1分/期", "zongce": "—" },
    "sources": [
      { "title": "公共管理学院关于2026年秋季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8540.htm", "published": "2026-09-22", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-09-07、2025-09-24、2026-09-22 三年均为9月下旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "research-interest-conclusion-autumn-2027",
    "title": "2027年秋季科研兴趣培养计划结题（大三上）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（学院答辩）",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-08", "end": "2027-09-15", "note": "约9月上旬发通知、9月15日前提交材料" },
    "event": { "start": "2027-09-20", "end": "", "note": "学院答辩约9月下旬" },
    "points": { "second_classroom": "结题3分/项", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于开展2026年秋季科研兴趣培养计划及校级创业训练计划项目结题工作的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7034", "published": "2026-09-08", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-10-14（fpa/1007/3004）、2026-09-08（jw bianhao7034）两届均为秋季学期初",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "challenge-cup-20th-national-2027",
    "title": "第二十届“挑战杯”大挑：国赛（2027年下半年）",
    "categories": ["competition"],
    "level": "国家级",
    "organizer": "共青团中央等（全国组委会）",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "", "end": "", "note": "晋级队伍参赛，具体以全国组委会通知为准" },
    "event": { "start": "2027-10-01", "end": "2027-12-31", "note": "国赛时间窗口（通知原文：为本届2027年赛事选拔）" },
    "points": { "second_classroom": "A1级（国赛一等15分）；国赛金奖前3名可触发二课满分直通车", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于第二十届“挑战杯”中国大学生课外学术科技作品竞赛校内预选赛及重点项目遴选的通知（原文“为2027年第二十届…选拔”）", "url": "https://fpa.sicau.edu.cn/info/1074/8390.htm", "published": "2026-09-16", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "单届证据：2026-09-16 通知明确“为2027年第二十届挑战杯全国…选拔、培育”；国赛具体月份以全国组委会通知为准",
    "recurring": true,
    "notes": "国赛举办月份未在通知中给出，按月份窗口标注意"
  },
  {
    "id": "hanmei-stars-2027",
    "title": "寒梅飘香工程三之星评选（2027年秋）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/学院",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-11-10", "end": "", "note": "约11月中旬（参照2025-11-11、2024-11-22）" },
    "event": { "start": "2027-11-10", "end": "", "note": "评选与展示" },
    "points": { "second_classroom": "获评记入表彰", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2024-2025学年度寒梅飘香工程“自强之星”“公益之星”“科创之星”评选的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4110.htm", "published": "2025-11-11", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-11-13、2024-11-22、2025-11-11 三届均为11月",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "physical-test-autumn-2027",
    "title": "体质测试（2027年秋季）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "体育学院",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "2027-09-20", "end": "", "note": "约9月下旬发通知" },
    "event": { "start": "2027-10-01", "end": "", "note": "10-11月分批测试" },
    "points": { "second_classroom": "不计二课", "zongce": "体测达标影响评优资格" },
    "sources": [
      { "title": "关于对三校区学生进行体质测试的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7059", "published": "2026-09-20", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-20 通知（jw/7059）；体测为每学年秋季固定项目",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "semester-5-finals-winter-2028",
    "title": "大三上学期期末考试与实践周（2028年1月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2028-01-03", "end": "2028-01-23", "note": "期末考试约第17-18周；实践周约1月中下旬；寒假约1月下旬起" },
    "points": { "second_classroom": "无", "zongce": "课程加权计入综测" },
    "sources": [
      { "title": "2026-2027学年校历（同类学期结构参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027校历：考试周约1月上旬、实践周1月18-24日、寒假1月18日起；按同构推算",
    "recurring": true,
    "notes": "大三上含土地整治与工程设计实践（1.5周）、土壤学实践教学（1周）等实践环节（培养方案执行学期=5）"
  },
  {
    "id": "semester-start-2027-2028-2",
    "title": "大三下开学（2027-2028-2）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-02-25", "end": "2028-02-27", "note": "报到注册约2月底（参照2026-2027校历2月26-28日）" },
    "event": { "start": "2028-02-28", "end": "2028-07-09", "note": "行课至7月上旬；实践周约7月中旬；暑假7月中旬起" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "2026-2027学年校历（同类学期结构参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027校历：下学期2月26-28日报到、3月1日行课、7月12日起暑假；按同构推算",
    "recurring": true,
    "notes": "大三下开课（培养方案执行学期=6）：地籍管理、国土空间规划技术及应用、土地资源学A、土地政策学、山地灾害防治工程学、土地工程概预算等"
  },
  {
    "id": "thesis-proposal-defense-2028",
    "title": "本科毕业论文（设计）开题答辩（大三下）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "土资2025主要",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-03-10", "end": "", "note": "约3月中旬发布开题安排" },
    "event": { "start": "2028-03-20", "end": "", "note": "开题答辩（约3月下旬-4月）；需确定导师与选题" },
    "points": { "second_classroom": "无", "zongce": "无（毕业论文为毕业要求）" },
    "sources": [
      { "title": "公共管理学院关于开展2027届本科毕业论文（设计）开题答辩的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4880.htm", "published": "2026-03-11", "accessed": "2026-09-26" },
      { "title": "人力资源管理系2021级毕业论文开题答辩安排", "url": "https://fpa.sicau.edu.cn/info/1074/1727.htm", "published": "2024-03-14", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-03-14（2025届开题安排）、2026-03-11（2027届开题通知）两届均为大三下3月",
    "recurring": true,
    "notes": "土资选题方向可结合：国土空间规划、土地整治、不动产估价、地籍管理等（贴合就业与推免方向）"
  },
  {
    "id": "party-application-spring-2028",
    "title": "2028年春季递交入党申请书（大三下）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-03-15", "end": "", "note": "约3月中旬（三年惯例）" },
    "event": { "start": "2028-03-15", "end": "", "note": "递交与谈话" },
    "points": { "second_classroom": "德育板块记实", "zongce": "—" },
    "sources": [
      { "title": "公共管理学院关于2026年春季学期递交入党申请书的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4920.htm", "published": "2026-03-16", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-02-29、2025-03-07、2026-03-16 三年均为春季开学初",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "tuan-review-2028",
    "title": "2027-2028年度五四团内评优（2028年）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-03-27", "end": "", "note": "约3月底（参照2026-03-27）" },
    "event": { "start": "2028-04-15", "end": "", "note": "五四表彰" },
    "points": { "second_classroom": "优秀共青团员等记表彰", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2025-2026年度团内评优工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5230.htm", "published": "2026-03-27", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "单届日期（2026-03-27）+ 五四表彰制度性安排",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "research-interest-conclusion-spring-2028",
    "title": "2028年春季科研兴趣培养计划结题（大三下）",
    "categories": ["competition"],
    "level": "校级",
    "organizer": "教务处（学院答辩）",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-03-10", "end": "", "note": "约3月上旬（2025/2026两届惯例）" },
    "event": { "start": "2028-03-20", "end": "", "note": "学院答辩3月下旬" },
    "points": { "second_classroom": "结题3分/项", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于2026年春季科研兴趣培养计划项目结题答辩的通知", "url": "https://fpa.sicau.edu.cn/info/1074/4830.htm", "published": "2026-03-10", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-03-19（fpa/2652）、2026-03-10（fpa/4830）两届均为3月",
    "recurring": true,
    "notes": "科研兴趣/大创结题时间在推免“创新能力评价成绩”认定（大四秋，见相关条目）之前"
  },
  {
    "id": "challenge-cup-16th-provincial-2028",
    "title": "第十六届“小挑”省赛（2028年6月，大三下）",
    "categories": ["competition"],
    "level": "省级",
    "organizer": "团省委（校团委组织）",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "", "end": "", "note": "校赛晋级队伍参加；省赛训练营约5月" },
    "event": { "start": "2028-05-15", "end": "2028-06-30", "note": "备战5月、省赛6月（参照15届：训练营2026-05-14、省赛2026-06-15）" },
    "points": { "second_classroom": "B1级9-11分", "zongce": "附加分×25%" },
    "sources": [
      { "title": "全力备战！我校第十五届“小挑”省赛训练营成功举办（参照）", "url": "https://tw.sicau.edu.cn/info/1069/15376.htm", "published": "2026-05-14", "accessed": "2026-09-26" },
      { "title": "3特5一！我校“挑战杯”省赛再创佳绩（参照）", "url": "https://tw.sicau.edu.cn/info/1069/16176.htm", "published": "2026-06-15", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第十五届赛季：训练营2026-05-14、省赛2026-06-15；第十六届按两年周期（2028）同节奏推算",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "sports-meet-46th-2028",
    "title": "校第四十六届运动会（2028年4月）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校体委",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-03-25", "end": "", "note": "赛前2-3周学院选拔" },
    "event": { "start": "2028-04-20", "end": "", "note": "4月中下旬（以秩序册为准）" },
    "points": { "second_classroom": "体育活动0.5-1分/次；获奖按级别", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔校第四十三届运动会参赛运动员的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2650.htm", "published": "2025-03-31", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第四十二届（2024-03-21）、第四十三届（2025-03-31）两届均为春季3月底选拔、4月比赛",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "summer-social-practice-signup-2028",
    "title": "2028年暑期社会实践组织与报名",
    "categories": ["second_classroom"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-05-20", "end": "", "note": "约5月下旬（四年惯例）" },
    "event": { "start": "2028-07-01", "end": "2028-08-20", "note": "7-8月开展；8月下旬评优" },
    "points": { "second_classroom": "社会实践合格1分/次", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于组织开展2026年学生暑假社会实践活动的通知", "url": "https://fpa.sicau.edu.cn/info/1074/6470.htm", "published": "2026-05-19", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-06、2024-05-28、2025-05-27、2026-05-19 四届均为5月下旬-6月初",
    "recurring": true,
    "notes": "大三暑期实践可与毕业论文调研合并做（一鱼两吃）"
  },
  {
    "id": "class-assistant-selection-2028",
    "title": "2028级小班班主任助理选拔（2028年5-6月）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "全院可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "2028-05-27", "end": "", "note": "约5月底-6月中（四年惯例）" },
    "event": { "start": "2028-05-27", "end": "", "note": "面向2028级新生班" },
    "points": { "second_classroom": "学生工作2分/学年", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔2026级小班驻班党员与班主任助理的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7050.htm", "published": "2026-06-12", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2023-06-06、2024-06-06、2025-06-09、2026-06-12 四年均为5月底-6月中",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "semester-6-finals-summer-2028",
    "title": "大三下学期期末考试与实践周（2028年7月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2027-2028-2",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2028-06-26", "end": "2028-07-16", "note": "期末考试6月底-7月初；实践周7月中旬；暑假7月中旬起" },
    "points": { "second_classroom": "无", "zongce": "课程加权计入综测（前三学年成绩定推免）" },
    "sources": [
      { "title": "2026-2027学年校历（同类学期结构参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027校历：实践周7月12-18日、暑假7月12日起；按同构推算",
    "recurring": true,
    "notes": "培养方案执行学期=6含国土空间规划综合实践（2周）、土地资源学实践（1.5周）"
  },
  {
    "id": "innovation-evaluation-certification-2028",
    "title": "2029届毕业生创新能力评价成绩（学术成果）认定（推免前置）",
    "categories": ["award"],
    "level": "院级",
    "organizer": "公共管理学院团委（二课运营中心）",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-08-13", "end": "2028-09-06", "note": "约8月中旬发布（参照2026-08-13第二次认定）；材料9月6日18:00前发二课邮箱" },
    "event": { "start": "2028-08-13", "end": "2028-09-06", "note": "学术论文/发明专利认定（署名第一作者或导师第一本人第二等口径）" },
    "points": { "second_classroom": "论文/专利按智育附加分（论文6-15分/篇；发明专利5分）", "zongce": "推免“创新能力评价成绩”直接依据" },
    "sources": [
      { "title": "关于开展2027届毕业生创新能力评价成绩（学术成果板块）第二次认定工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/7570.htm", "published": "2026-08-13", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-08-13 通知（2027届第二次认定，fpa/1074/7570）；推免学年8月固定动作（校团委另发目录公告）",
    "recurring": true,
    "notes": "推免三件套：学业成绩 + 综测 + 创新能力评价成绩；论文/专利需在9月5日前取得"
  },
  {
    "id": "tuimian-season-2028",
    "title": "2029届推免（保研）遴选：通知、报名、公示与系统填报（大四上）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "教务处/研究生院（学院实施）",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-09-07", "end": "2028-09-11", "note": "9月7日公布学院安排；9月7-11日报名并提交材料（9月11日16:30前，逾期视为放弃）" },
    "event": { "start": "2028-09-14", "end": "2028-09-21", "note": "9月14日资格审查与遴选公示；9月18日起国家推免系统注册；9月21日9:00起填报志愿" },
    "points": { "second_classroom": "推免本身非二课项目；推免排序依据含综测与创新能力评价成绩", "zongce": "综合成绩=学业+综测+创新能力（以当年遴选办法为准）" },
    "sources": [
      { "title": "公共管理学院关于做好2027年推荐优秀应届本科毕业生免试攻读研究生工作的通知", "url": "https://fpa.sicau.edu.cn/info/1007/8060.htm", "published": "2026-09-07", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于做好2025年推荐优秀应届本科毕业生免试攻读研究生工作的通知（2025年同期）", "url": "https://fpa.sicau.edu.cn/info/1074/2940.htm", "published": "2025-09-09", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-09-11、2025-09-09、2026-09-07 连续三年均为9月上旬启动（含2026年详细日程：报名9/7-11、公示9/14、系统9/18-21）",
    "recurring": true,
    "notes": "2027届土资推免名额15名（全院38名）——名额以当年文件为准；研究生支教团为并行渠道（另行遴选）"
  },
  {
    "id": "postgraduate-volunteer-teacher-2028",
    "title": "第31届研究生支教团遴选（2028年9月）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "校团委",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-09-07", "end": "", "note": "约9月上旬（参照第27-29届：2024-09-11、2025-09-09、2026-09-07）" },
    "event": { "start": "2028-09-07", "end": "", "note": "遴选后作为推免并行渠道（综合评价按校团委文件执行）" },
    "points": { "second_classroom": "志愿服务+学生工作经历", "zongce": "推免渠道之一" },
    "sources": [
      { "title": "公共管理学院关于遴选第29届研究生支教团有关工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/8090.htm", "published": "2026-09-07", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第27届2024-09-11、第28届2025-09-09、第29届2026-09-07 三届均为9月上旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "scholarship-season-2028",
    "title": "2028年评奖评优季（大四最后一轮）",
    "categories": ["award"],
    "level": "国家级",
    "organizer": "学生处",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-09-22", "end": "", "note": "约9月下旬（三年惯例）" },
    "event": { "start": "2028-09-22", "end": "2028-10-31", "note": "国奖/励志/优秀学生奖学金+单项奖学金评审" },
    "points": { "second_classroom": "获奖记表彰", "zongce": "大四为最后一次学年评优（评2027-2028学年）" },
    "sources": [
      { "title": "关于开展2025-2026学年度国家奖学金、国家励志奖学金评选工作的通知", "url": "https://xsc.sicau.edu.cn/info/1013/14982.htm", "published": "2026-09-24", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-24 评奖季通知（xsc/1013）；每年9月固定",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "outstanding-graduate-selection-2028",
    "title": "2029届优秀大学毕业生评选（大四上）",
    "categories": ["award"],
    "level": "校级",
    "organizer": "学生处/学院",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-10-16", "end": "", "note": "约10月中旬（参照2024-10-16、2025-10-16）" },
    "event": { "start": "2028-10-16", "end": "", "note": "院级评选→校级评审（优秀大学毕业生）" },
    "points": { "second_classroom": "毕业荣誉记表彰", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于开展2025届优秀大学毕业生评选工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/3015.htm", "published": "2025-10-16", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于开展2025届优秀大学毕业生评选工作的通知（2024年）", "url": "https://fpa.sicau.edu.cn/info/1074/2206.htm", "published": "2024-10-16", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-10-16（fpa/2206）、2025-10-16（fpa/3015）两届均为10月中旬",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "challenge-cup-21st-intra-2028",
    "title": "第二十一届“挑战杯”大挑院内预选赛（2028年秋，大四）",
    "categories": ["competition"],
    "level": "院级",
    "organizer": "公共管理学院团委（校团委部署）",
    "audience_tag": "全院可参加",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-09-16", "end": "2028-10-09", "note": "约9月中旬发通知（参照第十九届2024-09-12、第二十届2026-09-16）" },
    "event": { "start": "2028-10-07", "end": "2028-11-30", "note": "院赛材料10月上旬；校赛复赛11月下旬" },
    "points": { "second_classroom": "按A1/B1/C1通道；院赛D级", "zongce": "附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于第二十届“挑战杯”中国大学生课外学术科技作品竞赛校内预选赛的通知（参照）", "url": "https://fpa.sicau.edu.cn/info/1074/8390.htm", "published": "2026-09-16", "accessed": "2026-09-26" },
      { "title": "关于举行第十九届“挑战杯”全国大学生课外学术科技作品竞赛校内预选赛的通知（参照）", "url": "https://fpa.sicau.edu.cn/info/1074/2118.htm", "published": "2024-09-12", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第十九届（2024-09-12）、第二十届（2026-09-16）两届均为秋季启动；第二十一届按两年周期推算",
    "recurring": true,
    "notes": "大四仍可作为团队成员参与（推免已完成，参与主要为兴趣/履历）"
  },
  {
    "id": "physical-test-autumn-2028",
    "title": "体质测试（2028年秋季，大四）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "体育学院",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-1",
    "registration": { "start": "2028-09-20", "end": "", "note": "约9月下旬发通知" },
    "event": { "start": "2028-10-01", "end": "", "note": "10-11月测试（大四为毕业前最后一次体测）" },
    "points": { "second_classroom": "不计二课", "zongce": "体测成绩计入毕业审核（含毕业前补测）" },
    "sources": [
      { "title": "关于对三校区学生进行体质测试的通知", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7059", "published": "2026-09-20", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-09-20 通知；每学年秋季固定",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "semester-7-finals-winter-2029",
    "title": "大四上学期期末考试与实践周（2029年1月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-1",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2029-01-03", "end": "2029-01-21", "note": "期末考试与毕业学期前最后行课周（按同类学期结构）" },
    "points": { "second_classroom": "无", "zongce": "课程加权计入毕业审核" },
    "sources": [
      { "title": "2026-2027学年校历（同类学期结构参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/xl2026-2027.png", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-2027校历同构推算；大四上培养方案仅余国土空间生态修复等少量课程（执行学期=7）",
    "recurring": true,
    "notes": "培养方案执行学期=7含：国土空间生态修复、房地产开发经营与管理、资源与环境研究方法（研）等"
  },
  {
    "id": "graduation-practice-thesis-enroll-2029",
    "title": "毕业实习与毕业论文（设计）周期（大四下）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院/教务处",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-2",
    "registration": { "start": "", "end": "", "note": "无报名环节；实习单位对接约在第8学期初" },
    "event": { "start": "2029-03-01", "end": "2029-05-31", "note": "毕业实习15周、毕业论文（设计）20周（培养方案执行学期=8）" },
    "points": { "second_classroom": "无", "zongce": "毕业实习与论文为毕业硬性要求" },
    "sources": [
      { "title": "四川农业大学2025级培养方案（人工智能与实训环节：毕业论文20周/毕业实习15周，执行学期=8）", "url": "https://jiaowu.sicau.edu.cn/web/web/lanmu/jihua_new.asp?jh_nj=2025", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "confirmed",
    "basis": "",
    "recurring": false,
    "notes": "毕业实习可在自然资源局/规划院/房地产企业等对口单位"
  },
  {
    "id": "thesis-defense-2029",
    "title": "本科毕业论文（设计）答辩与后期工作（大四下）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-2",
    "registration": { "start": "", "end": "", "note": "答辩资格审核（含查重）在答辩前完成" },
    "event": { "start": "2029-04-14", "end": "", "note": "答辩约4月中旬（参照2026-04-14《2026届本科毕业论文答辩及后期工作安排的通知》）" },
    "points": { "second_classroom": "无", "zongce": "论文成绩计入毕业审核" },
    "sources": [
      { "title": "公共管理学院关于开展2026届本科毕业论文答辩及后期工作安排的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5640.htm", "published": "2026-04-14", "accessed": "2026-09-26" },
      { "title": "人力资源管理专业2024届毕业论文答辩安排（参照）", "url": "https://fpa.sicau.edu.cn/info/1074/1764.htm", "published": "2024-04-02", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2024-04-02（2024届）、2026-04-14（2026届）两届答辩安排均为4月",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "graduate-registration-form-2029",
    "title": "毕业生登记表填写（大四下）",
    "categories": ["course"],
    "level": "院级",
    "organizer": "公共管理学院",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-04-27", "end": "", "note": "约4月下旬（参照2025-04-29、2026-04-27）" },
    "event": { "start": "2029-04-27", "end": "", "note": "《普通高等学校毕业生登记表》为档案核心材料" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "公共管理学院关于组织2026届毕业生填写《普通高等学校毕业生登记表》的通知", "url": "https://fpa.sicau.edu.cn/info/1074/5940.htm", "published": "2026-04-27", "accessed": "2026-09-26" },
      { "title": "公共管理学院关于组织2025届毕业生填写《普通高等学校毕业生登记表》的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2730.htm", "published": "2025-04-29", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2025-04-29（fpa/2730）、2026-04-27（fpa/5940）两届均为4月底",
    "recurring": true,
    "notes": ""
  },
  {
    "id": "youth-league-transfer-2029",
    "title": "毕业生团籍转出（大四下）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院团委",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-05-27", "end": "", "note": "约5月下旬（参照2024-05-27）" },
    "event": { "start": "2029-05-27", "end": "2029-06-30", "note": "智慧团建系统转出至升学单位/工作单位/户籍地" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "公共管理学院关于做好2024届毕业生团籍转出工作的通知", "url": "https://fpa.sicau.edu.cn/info/1074/1889.htm", "published": "2024-05-27", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "单届证据：2024-05-27 通知（fpa/1074/1889）；毕业生团籍转出为离校前置手续",
    "recurring": true,
    "notes": "党员毕业生另需办理党组织关系转接"
  },
  {
    "id": "graduation-season-2029",
    "title": "毕业季：毕业鉴定、证书发放与离校（2029年6月）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "学校/学院",
    "audience_tag": "土资2025主要",
    "semester": "2028-2029-2",
    "registration": { "start": "", "end": "", "note": "无报名环节" },
    "event": { "start": "2029-06-01", "end": "2029-06-30", "note": "毕业审核、学位授予、证书发放、归档与离校（以当年学校安排为准）" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "毕业证或学位证遗失后补办证明或证明书流程（教务处办事流程，佐证毕业审核口径）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=6200", "published": "", "accessed": "2026-09-26" },
      { "title": "四川农业大学2025级培养方案：修读学分170、4年、授予工学学位", "url": "https://jiaowu.sicau.edu.cn/web/web/lanmu/jihua_new.asp?jh_nj=2025", "published": "", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "毕业审核与离校为每年6月制度性安排；培养方案确认毕业要求（170学分/4年/工学学位）",
    "recurring": true,
    "notes": "具体毕业典礼日期与离校安排以当年通知为准"
  },
  {
    "id": "party-development-spring-2029",
    "title": "2029年春季党员发展批次（大四下）",
    "categories": ["evaluation"],
    "level": "院级",
    "organizer": "公共管理学院党委",
    "audience_tag": "全院可参加",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-03-30", "end": "", "note": "约3月底（参照2026-03-31《春季学期党员发展工作通知》）" },
    "event": { "start": "2029-03-30", "end": "2029-06-30", "note": "发展对象确定、政审、公示、接收（毕业前最后批次）" },
    "points": { "second_classroom": "德育板块记实", "zongce": "党员身份按表彰类条款认定（视当年）" },
    "sources": [
      { "title": "关于做好2026年春季学期党员发展工作的通知（参照）", "url": "https://fpa.sicau.edu.cn/info/1074/5370.htm", "published": "2026-03-31", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "2026-03-31 春季党员发展通知（fpa/1074/5370）；春秋两批为制度性安排",
    "recurring": true,
    "notes": "毕业生党员组织关系转接受理在6月（与团籍转出同期）"
  },
  {
    "id": "graduate-loan-confirmation-2029",
    "title": "毕业生国家助学贷款毕业确认与诚信教育（大四下）",
    "categories": ["course"],
    "level": "校级",
    "organizer": "学生处资助中心/学院",
    "audience_tag": "全院可参加",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-05-13", "end": "", "note": "约5月中旬（参照2025-05-13）" },
    "event": { "start": "2029-05-13", "end": "", "note": "“云讲座”+毕业确认手续（有贷款同学必办）" },
    "points": { "second_classroom": "无", "zongce": "无" },
    "sources": [
      { "title": "公共管理学院关于开展2025届毕业生国家助学贷款毕业确认及诚信主题教育“云讲座”的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2764.htm", "published": "2025-05-13", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "单届证据：2025-05-13 通知（fpa/1074/2764）",
    "recurring": true,
    "notes": "有生源地/校园地贷款的同学务必办理毕业确认"
  },
  {
    "id": "cet-june-2029",
    "title": "全国大学英语四、六级考试（2029年上半年批次，毕业前最后机会）",
    "categories": ["course"],
    "level": "国家级",
    "organizer": "教务处",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-03-20", "end": "", "note": "约3月报名（以当年通知为准）" },
    "event": { "start": "2029-06-16", "end": "", "note": "6月中旬考试（以准考证为准）" },
    "points": { "second_classroom": "四级/六级合格1-2分（若此前未认定）", "zongce": "附加分×25%" },
    "sources": [
      { "title": "关于2026年下半年全国大学外语四六级考试报名的通知（报名节奏参照）", "url": "https://jiaowu.sicau.edu.cn/web/web/web/gwshenshow_x_2019.asp?bianhao=7046", "published": "2026-09-15", "accessed": "2026-09-26" }
    ],
    "confidence": "predicted",
    "basis": "报名节奏依据2026-09-15下半年通知+全国统考6月/12月两次安排；具体以当年教务处通知为准",
    "recurring": true,
    "notes": "六级证书对求职（公务员/事业单位）影响较大"
  },
  {
    "id": "sports-meet-47th-2029",
    "title": "校第四十七届运动会（2029年4月，毕业前最后一届）",
    "categories": ["second_classroom"],
    "level": "校级",
    "organizer": "校体委",
    "audience_tag": "全校可参加",
    "semester": "2028-2029-2",
    "registration": { "start": "2029-03-25", "end": "", "note": "赛前2-3周学院选拔" },
    "event": { "start": "2029-04-20", "end": "", "note": "4月中下旬（以秩序册为准）" },
    "points": { "second_classroom": "体育活动0.5-1分/次；获奖按级别", "zongce": "基础分+附加分×25%" },
    "sources": [
      { "title": "公共管理学院关于选拔校第四十三届运动会参赛运动员的通知", "url": "https://fpa.sicau.edu.cn/info/1074/2650.htm", "published": "2025-03-31", "accessed": "2026-09-26" }
    ],
    "confidence": "pattern",
    "basis": "第四十二届（2024-03-21）、第四十三届（2025-03-31）两届均为春季3月底选拔、4月比赛",
    "recurring": true,
    "notes": "大四保研/求职尘埃落定后的轻松参赛窗口"
  }
];




