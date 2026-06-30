/**
 * 项目数据 - 统一管理所有项目信息
 * 供官网首页、项目列表、项目详情页使用
 */

export type Project = {
  id: string;
  title: string;
  period: string;
  category: "企业项目" | "自研项目";
  client?: string;
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  detail: {
    background: string;
    coreFeatures: string[];
    technicalChallenges: string[];
    results: string[];
  };
};

export const projects: Project[] = [
  {
    id: "lean-ops",
    title: "精益运营平台",
    period: "2024.01 — 2024.12",
    category: "企业项目",
    client: "中国移动",
    role: "前端负责人",
    stack: [
      "Vue2",
      "Vuex",
      "Element-UI",
      "ECharts",
      "Highcharts 3D",
      "AntV G6",
      "Webpack5",
    ],
    description:
      "面向中国移动市场运营、营销管理与预警处置场景的一体化中后台系统，打通指标监控→问题识别→任务下发→结果追踪完整链路。",
    highlights: [
      "对接 4A/OA 登录，Axios 请求层统一治理 token/签名/异常/超时",
      "配套 ESLint/Prettier/Husky 质量保障机制",
      "采用敏捷周交付（周一需求→周三提测→周四夜间上线）",
      "组件库成为团队多个后续项目的复用基石",
    ],
    detail: {
      background:
        "中国移动市场运营部门需要一个一体化中后台系统，覆盖日常运营分析、营销任务协同、预警监控闭环、产品经营跟踪等核心业务。原有系统功能分散、数据割裂，无法形成从指标监控到结果追踪的完整闭环。本人作为前端负责人，全权承担架构设计、技术规范制定与版本交付。",
      coreFeatures: [
        "经营分析看板：集成 ECharts、Highcharts 3D、AntV G6 实现多维度业务数据分析、趋势预测和流程关系图",
        "营销任务协同：打通任务下发、执行追踪、结果回流全链路，支持多角色协同",
        "预警监控闭环：实时预警指标监控、问题自动识别、处置工单流转",
        "统一权限体系：对接 4A/OA 单点登录，封装统一鉴权流程",
        "个人工作台：按角色定制首页看板，聚合待办、关注指标、常用入口",
      ],
      technicalChallenges: [
        "敏捷高强度迭代：周一出需求→周三提测→周四夜间上线，需保证代码质量和交付稳定性",
        "请求层统一治理：Axios 封装统一处理 token 刷新、接口签名、异常提示、超时重试、登录态失效",
        "大屏驾驶舱渲染：Highcharts 3D + 多图表同屏渲染性能优化",
        "工程规范化：ESLint/Prettier/Husky/lint-staged 全流程代码质量保障",
      ],
      results: [
        "组件库沉淀完善，成为团队多个后续新项目的复用基石",
        "敏捷周交付模式稳定运行，保障持续高质量迭代",
        "打通运营全流程闭环，显著提升运营管理效率",
        "工程规范体系被团队采纳并推广到其他项目",
      ],
    },
  },
  {
    id: "holistic-insight",
    title: "智慧全息洞察运营平台",
    period: "2024.12 — 2025.08",
    category: "企业项目",
    client: "河南移动",
    role: "高级前端开发",
    stack: [
      "Vue2",
      "React",
      "Redux",
      "ArcGIS",
      "Element UI",
      "jsPlumb",
      "esri-loader",
    ],
    description:
      "面向运营管理、客户精细化经营的数字化运营中台，覆盖全息洞察、AI 智能画像、热力营销、地图看管、客群圈选等核心场景。",
    highlights: [
      "Vue2 主工程 + React/Redux 客群子工程（iframe + postMessage 跨页协同）",
      "首次落地 ArcGIS 地图可视化，实现地理维度运营洞察",
      "可视化条件树客群圈选，标签筛选与目标人数实时联动",
      "支持从宏观总览下钻至区域、网格、客群及任务明细",
    ],
    detail: {
      background:
        "河南移动需要一个覆盖客户精细化经营全链路的数字化运营中台，整合全息洞察、AI画像、热力营销、地图看管等能力，支撑多区域、多角色用户在统一平台内完成运营分析与决策。项目时间紧、需求频繁追加，需要快速响应并持续交付。",
      coreFeatures: [
        "全息洞察看板：AI 智能画像 + 客户细分 + 多维切片，从宏观到微观的数据下钻",
        "GIS 地图看管：基于 ArcGIS 实现区域热力图、网格管理、地理维度运营",
        "热力营销筛选：结合地理信息与业务标签，精准定位营销目标区域",
        "客群圈选引擎：可视化条件树编排，标签选择→分段值配置→人数实时预估→表达式生成",
        "派发执行闭环：策略配置→任务编排→过程监控→结果回流",
      ],
      technicalChallenges: [
        "双技术栈协同：Vue2 主工程通过 iframe + postMessage 嵌入 React/Redux 客群子工程，实现跨页面保存、回退、会话同步",
        "ArcGIS 首次落地：在时间紧迫的情况下从零学习 esri-loader 并完成地图可视化开发",
        "条件树可视化：使用 jsPlumb 实现拖拽式条件连线，支持标签模糊搜索、分页筛选、跨页全选",
        "高频需求变更：客户临时需求追加频繁，需要架构具备足够弹性",
      ],
      results: [
        "成功落地 ArcGIS 地图能力，填补团队 GIS 技术空白",
        "双技术栈 iframe 协同方案稳定运行，为后续类似场景提供可复用模式",
        "客群圈选引擎大幅提升运营人员配置效率",
        "在高频变更下保障系统稳定交付",
      ],
    },
  },
  {
    id: "ai-complaint",
    title: "AI 神匠投诉处理平台",
    period: "2025.10 — 2026.02",
    category: "企业项目",
    client: "运营商",
    role: "前端核心开发",
    stack: [
      "Vue3",
      "TypeScript",
      "Vite",
      "Pinia",
      "Element UI",
      "docx-preview",
      "mammoth",
      "pdf.js",
      "html2canvas",
      "xlsx",
    ],
    description:
      "面向投诉处理与报告质检的 AI 智能辅助平台，打通多源数据，形成来单查询→资料整合→报告生成→AI质检→人工复核业务闭环。",
    highlights: [
      "设计多模态质检与预览体系（Word/PDF/图片/音频联动展示）",
      "集成 AI 录音敏感词识别、材料要素识别、签名一致性校验",
      "搭建统一前端工作台整合多后端服务",
      "分场景 Loading 控制、状态分层展示优化大体量数据交互体验",
    ],
    detail: {
      background:
        "运营商投诉处理流程涉及用户画像、业务订购、账单记录、接触记录、历史投诉轨迹等多源数据，原有系统数据分散、质检依赖人工逐条审核，效率低且标准不一。本项目目标是建设 AI 智能辅助平台，将投诉处理全流程数字化、智能化，形成来单查询到结果沉淀的完整闭环。",
      coreFeatures: [
        "统一工作台：整合多后端服务与多类业务接口，一站式处理投诉工单",
        "多模态预览体系：支持 Word/PDF/图片/音频联动展示，AI 识别结果与人工审核闭环结合",
        "投诉报告生成：上传附件→自动归集材料→报告生成→审核流转→统计分析",
        "AI 质检引擎：录音敏感词识别、材料要素自动提取、签名一致性校验、报告合规性判断",
        "申诉用户一键查询：打通用户画像、订购、账单、接触记录等多源数据聚合展示",
      ],
      technicalChallenges: [
        "多模态文件解析：集成 docx-preview/mammoth/pdf.js/html2canvas/file-saver/xlsx 处理各类文件格式",
        "大体量数据体验优化：分场景 Loading 控制、分页检索、状态分层展示、预览页轻量化",
        "AI 工作流集成：对接多后端 AI 服务接口，协调质检结果与人工审核动作的闭环",
        "请求层治理：沉淀通用请求层、权限控制、路由治理和文件下载/预览能力",
      ],
      results: [
        "投诉处理效率显著提升，质检标准化水平大幅提高",
        "多模态预览体系减少人工切换工具的操作成本",
        "统一工作台降低复杂业务页面的接入成本",
        "满足集团投诉处理时效与规范性要求",
      ],
    },
  },
  {
    id: "digital-publishing",
    title: "数字出版生态平台集群",
    period: "2019.01 — 2022.03",
    category: "企业项目",
    client: "出版集团",
    role: "前端主力开发",
    stack: [
      "React",
      "Qiankun",
      "TypeScript",
      "Mobx",
      "Ant Design",
      "Yeoman",
      "ECharts",
      "BMapGL",
      "AntV G6",
    ],
    description:
      "出版集团数字化转型核心，构建「数据底座→内容中台→展示门户」三层架构的完整数字出版生态体系。",
    highlights: [
      "微前端整合十几个独立业务子系统，Yeoman 脚手架新项目搭建提速 70%",
      "CKEditor 公式编辑 + Epub 解析，组件化减少 40% 重复代码",
      "百度地图大屏 + AntV-G6 知识关联图谱",
      "从底层数据治理到上层可视化展示的全链路架构能力",
    ],
    detail: {
      background:
        "出版集团数字化转型需要构建完整的数字出版生态，涵盖底层数据支撑、内容资源管理和上层展示运营。项目按三层架构拆分：应用支撑平台（数据底座）、资源管理平台（内容中台）、安全阅读云门户（展示门户），本人作为 React 主力开发深度参与全部三层建设。",
      coreFeatures: [
        "应用支撑平台（数据底座）：微前端整合用户、产品、渠道、订单、财务结算等十几个独立业务子系统",
        "资源管理平台（内容中台）：统一管理纸质图书/试题/电子书/有声读物/图片素材，支持上传→审核→敏感词过滤→版本发布全流程",
        "安全阅读云门户（展示门户）：图书资源商城、内容阅读页、发行数据大屏、线下网点地理分布可视化",
        "Yeoman 项目脚手架：一键生成标准化 React+TS 项目结构，新项目搭建提速 70%",
        "知识关联图谱：AntV-G6 构建书籍内容关联关系可视化",
      ],
      technicalChallenges: [
        "微前端架构落地：Qiankun 整合十几个子应用，处理路由隔离、样式隔离、全局状态通信",
        "Epub 电子书解析：处理电子书文件解析与内容在线预览渲染",
        "CKEditor 深度集成：公式编辑、图文排版、富文本内容管理",
        "大屏渲染性能：优化大量图表同时渲染造成的页面卡顿，保障长时间稳定运行",
        "海量数据列表：虚拟滚动优化，解决大批量资源数据渲染卡顿",
      ],
      results: [
        "微前端改造成功，解决多项目技术栈冲突问题",
        "组件化方案减少 40% 重复代码，支撑日均上千条资源审核",
        "Yeoman 脚手架使新项目搭建时间缩短 70%",
        "完成从数据治理到可视化展示的全链路建设",
      ],
    },
  },
  {
    id: "credit-chongqing",
    title: "信用重庆（政府门户网站）",
    period: "2018.05 — 2018.12",
    category: "企业项目",
    client: "重庆市政府",
    role: "独立前端开发",
    stack: ["Vue", "Ejs", "Gulp", "Express", "Axios", "Less"],
    description:
      "重庆市政府官方信用公示门户，承担守信激励、失信黑名单公示、政策新闻发布、企业信用信息查询等政务对外宣传。",
    highlights: [
      "独立完成全站页面开发与静态资源打包部署",
      "保障政府门户平稳上线，熟练掌握前端工程化构建与模板化开发模式",
    ],
    detail: {
      background:
        "重庆市政府需要一个官方信用公示门户，用于守信激励宣传、失信黑名单公示、政策新闻发布和企业信用信息查询。作为独立前端开发，负责从项目初始化到上线部署的全流程。",
      coreFeatures: [
        "首页轮播与信用榜单展示",
        "信息列表、分页查询、条件筛选",
        "企业信用信息检索与详情展示",
        "Gulp 构建流程 + Ejs 模板引擎页面布局",
      ],
      technicalChallenges: [
        "前端工程化构建：基于 Gulp 搭建完整构建流程，处理样式编译、资源压缩、文件合并",
        "前后端分离调试：Express 搭建简易本地服务实现分离开发",
        "政务网站稳定性：保障政府门户访问稳定性和首屏加载速度",
      ],
      results: [
        "独立完成全站开发与部署，政府门户平稳上线",
        "掌握前端工程化构建与模板化开发模式",
      ],
    },
  },
  {
    id: "my-blog",
    title: "My Blog 全栈个人官网",
    period: "持续迭代",
    category: "自研项目",
    role: "独立全栈开发",
    stack: [
      "Next.js",
      "Vue3",
      "TypeScript",
      "Spring Boot",
      "Spring Cloud Alibaba",
      "Spring Cloud Gateway",
      "Nacos",
      "Redis",
      "MySQL",
      "Docker",
    ],
    description:
      "「双前端 + 同一后端 API」全栈架构：Next.js 官网端（SSG/ISR，SEO优先）+ Vue3 管理后台 + Spring Cloud Alibaba 微服务后端。",
    highlights: [
      "后端：Spring Boot + Spring Cloud Gateway + Spring Security/JWT + Nacos + Redis + MySQL",
      "工程化：Maven + Docker/Docker Compose + Nginx 完整部署链路",
      "覆盖接口设计、鉴权、缓存、配置管理、部署链路完整实现",
      "使用 Trae 编辑器 AI 辅助开发",
    ],
    detail: {
      background:
        "作为前端工程师向全栈转型的实践项目，目标构建一个完整的个人技术品牌展示平台。采用「双前端 + 同一后端 API」架构，避免官网端与管理端各自维护一套接口。官网端使用 Next.js 优先输出可被搜索引擎抓取的 HTML（SSG/ISR），管理端使用 Vue3 SPA 聚焦内容运营效率。",
      coreFeatures: [
        "Next.js 官网端：首页、技术博客（Markdown渲染+代码高亮）、项目作品、关于我、404页面",
        "Vue3 管理后台：控制台仪表盘、文章CRUD（Markdown编辑器）、分类/标签管理、项目管理、个人信息维护、网站配置",
        "Spring Cloud Gateway 统一网关：路由转发、JWT 鉴权、用户信息透传",
        "Nacos 配置中心：网站配置动态化，修改无需重启",
        "Docker/Compose 本地开发：MySQL + Redis + Nacos 一键启动",
      ],
      technicalChallenges: [
        "双前端架构设计：共享同一后端 API，通过 Gateway 统一承接流量入口",
        "Spring Security + JWT 认证链路：Token 签发、刷新、网关校验、下游透传",
        "Nacos 动态配置：网站配置存入配置中心，前端实时获取最新配置",
        "权限体系：路由守卫 + 按钮级权限控制 + 角色权限管理",
        "部署链路：Docker Compose 编排基础设施，Nginx 反向代理前端静态资源",
      ],
      results: [
        "完成从前端到后端到运维的全链路实践",
        "双端复用同一 API，降低维护成本",
        "覆盖接口设计、鉴权、缓存、配置管理、容器化部署完整实现",
        "体现前端工程师向全栈工程落地延展的能力",
      ],
    },
  },
  {
    id: "storyforge",
    title: "StoryForge AI 智能写作平台",
    period: "自研项目",
    category: "自研项目",
    role: "独立全栈开发",
    stack: [
      "TypeScript",
      "NestJS",
      "WebSocket/SSE",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "大模型 API",
    ],
    description:
      "基于 RAG + Multi-Agent 架构的智能长文本创作平台，Planner/Writer/Keeper 三层 Agent 协作，打破单一 Prompt 套壳局限。",
    highlights: [
      "独创「注意力衰减 + 摘要压缩」记忆机制，Token 消耗降低 89%",
      "智能多模型路由使 API 成本降低约 70%",
      "LLM-as-Judge 5维度评分形成数据飞轮",
      "90%+ 代码由 AI（Claude Code）辅助生成",
    ],
    detail: {
      background:
        "传统单一 Prompt 调用大模型生成长文本存在逻辑断层、风格不一致、Token 消耗高等问题。本项目将小说生成过程解耦为大纲规划、章节撰写和角色管理等多个环节，由专属 Agent 协作完成，同时集成 RAG 风格检索、多模型动态路由和质量评估闭环，提供工业级 AI 写作解决方案。",
      coreFeatures: [
        "Multi-Agent 协同：Planner（大纲规划）、Writer（章节撰写）、Keeper（角色一致性管理）三层 Agent 各司其职",
        "RAG 风格检索引擎：自研文本分块 + 向量存储，余弦相似度检索用户写作样本，实现个性化文风注入",
        "上下文记忆机制：注意力衰减 + 摘要压缩，在保持全局连贯性的同时大幅缩减上下文长度",
        "智能多模型路由：根据任务复杂度动态路由至不同规模大模型（简单压缩→小模型，复杂撰写→大模型）",
        "全链路可观测：TraceLogger 追踪调用成本与链路，LLM-as-Judge 5维度结构化评分",
      ],
      technicalChallenges: [
        "长上下文记忆：独创注意力衰减 + 摘要压缩机制，解决长文本创作中 Token 爆炸问题",
        "Agent 协作编排：设计三层 Agent 的职责边界与通信协议，避免循环调用和信息丢失",
        "Function Calling 工具调用：让 Agent 具备调用外部工具的能力（查资料、更新角色库等）",
        "成本优化：多模型路由策略，简单任务用便宜模型，复杂任务用强力模型",
        "流式输出：WebSocket/SSE 实现打字机效果的实时流式输出",
      ],
      results: [
        "Token 消耗降低 89%，大幅降低使用成本",
        "API 成本降低约 70%（智能多模型路由）",
        "LLM-as-Judge 评分形成数据飞轮，持续优化生成质量",
        "90%+ 代码由 Claude Code 辅助生成，体现 AI 辅助编程的深度实践",
        "遵循企业级 AI 工程流程，Git 保障每个迭代的可回滚性",
      ],
    },
  },
];

/** 精选项目（首页展示4个） */
export const featuredProjects: Project[] = [
  projects.find((p) => p.id === "lean-ops")!,
  projects.find((p) => p.id === "ai-complaint")!,
  projects.find((p) => p.id === "digital-publishing")!,
  projects.find((p) => p.id === "storyforge")!,
];

/** 按 ID 查找项目 */
export function findProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

/** 获取相关项目推荐（排除当前项目，取2个） */
export function getRelatedProjects(currentId: string): Project[] {
  return projects.filter((p) => p.id !== currentId).slice(0, 2);
}
