/**
 * 个人官网 - 核心数据文件
 * 基于简历信息填充，所有前台页面从此读取
 */

export const profile = {
  name: "李建华",
  nameEn: "Lijianhua",
  title: "高级前端工程师 · 全栈开发工程师",
  subtitle: "10年前端架构经验 · Java全栈 · AI Agent 应用开发",
  bio: "专注前端工程化 & 全栈开发，擅长 Vue3/React/TypeScript/Next.js，熟练 SpringBoot/Spring Cloud/Docker，具备 AI Agent 应用落地能力。持续沉淀技术、输出价值。",
  shortBio: "前端开发工程师 · 热衷工程化与性能优化",
  phone: "15730404707",
  email: "931015218@qq.com",
  github: "https://github.com/",
  juejin: "https://juejin.cn/",
  csdn: "https://www.csdn.net/",
  yearsExp: "10年+",
  projectCount: "10+",
  blogCount: "10",
  jobTarget: "全栈开发工程师 / 前端高级开发工程师",
  certificate: "中级信息系统项目管理师",
  education: {
    school: "玉溪师范学院",
    major: "通信工程",
    degree: "本科",
    period: "2012 - 2016",
  },
  avatar: "/avatar.png", // 需要替换为真实头像
};

export const coreSkills = [
  {
    name: "前端技术",
    items: [
      "Vue2/Vue3",
      "TypeScript",
      "React",
      "Next.js",
      "Vite/Webpack",
      "Pinia/Vuex",
    ],
  },
  {
    name: "可视化",
    items: [
      "ECharts",
      "Highcharts",
      "AntV G6",
      "ArcGIS",
      "BMapGL",
      "数据大屏",
    ],
  },
  {
    name: "后端技术",
    items: [
      "Spring Boot",
      "Spring Cloud",
      "Gateway",
      "MyBatis-Plus",
      "Security+JWT",
    ],
  },
  {
    name: "AI 工程",
    items: [
      "SpringAI",
      "LangChain4j",
      "RAG",
      "Multi-Agent",
      "Function Calling",
      "MCP Server",
    ],
  },
  {
    name: "工程化 & 部署",
    items: [
      "Docker/Compose",
      "Nginx",
      "Nacos",
      "Redis",
      "MySQL",
      "微前端Qiankun",
    ],
  },
  {
    name: "AI 编程工具",
    items: [
      "Cursor",
      "Trae",
      "Claude Code",
      "GitHub Copilot",
      "Vibe Coding",
      "SDD",
    ],
  },
];

/** 技能矩阵（关于我页面用，带熟练度） */
export const skillMatrix = [
  {
    category: "前端开发",
    level: "精通",
    skills: [
      "Vue2/Vue3 + TypeScript",
      "React + Redux/Mobx",
      "Next.js SSG/ISR",
      "Vite/Webpack 工程化",
      "Element UI / Ant Design",
    ],
  },
  {
    category: "数据可视化",
    level: "精通",
    skills: [
      "ECharts/Highcharts 大屏",
      "AntV G6 关系图谱",
      "ArcGIS/BMapGL 地图",
      "条件树编排",
    ],
  },
  {
    category: "后端开发",
    level: "熟练",
    skills: [
      "Spring Boot",
      "Spring Cloud Alibaba",
      "Spring Security + JWT",
      "MyBatis-Plus",
      "MySQL 数据库设计",
    ],
  },
  {
    category: "AI 工程化",
    level: "熟练",
    skills: [
      "RAG 知识库构建",
      "Multi-Agent 协作",
      "Function Calling",
      "Prompt 工程",
      "LangChain4j / SpringAI",
    ],
  },
  {
    category: "部署 & 运维",
    level: "熟练",
    skills: [
      "Docker/Compose 容器化",
      "Nginx 反向代理",
      "Nacos 配置中心",
      "Redis 缓存",
      "CI/CD 流水线",
    ],
  },
  {
    category: "工程化体系",
    level: "精通",
    skills: [
      "ESLint/Prettier/Husky",
      "微前端 Qiankun",
      "Git 规范",
      "Yeoman 脚手架",
      "SEO/GEO 优化",
    ],
  },
];

/** 工作经历 */
export const workExperience = [
  {
    company: "亚信科技（重庆艾瑞数智）",
    role: "高级前端开发工程师",
    period: "2022.03 - 2026.06",
    type: "正式编制",
    description:
      "大型央企信息化服务商，作为各项目前端负责人，全权承担前端架构设计、项目初始化、技术规范制定、代码评审、版本交付全流程。主导交付多个中国移动、电信运营商级中大型业务系统。",
    highlights: [
      "主导团队前端技术规范化建设，搭建通用组件库与统一工程规范体系",
      "独立负责多个运营商级大型前端项目从零搭建，覆盖 Vue2/Vue3+TS、可视化大屏、GIS地图、AI集成等",
      "适配敏捷高强度迭代模式（周迭代 + 紧急加急 + 夜间发布），沉淀高稳定、可快速迭代的工程化方案",
      "业余持续深耕技术转型，独立完成全栈项目与 RAG AI 应用研发",
    ],
  },
  {
    company: "华龙网海数科技",
    role: "前端开发工程师",
    period: "2018.03 - 2022.03",
    type: "主力 React 技术栈",
    description:
      "负责集团政务、融媒体类 Web 项目前端全生命周期开发，独立承接需求评审、项目初始化、业务开发、组件封装、性能优化及线上维护。",
    highlights: [
      "主导多个中后台管理系统与政府门户建设",
      "落地微前端架构（Qiankun），整合多个独立业务系统",
      "完成数据可视化大屏、百度地图点位渲染、AntV G6 关系图谱等复杂可视化模块",
      "沉淀通用业务组件库，降低重复开发成本",
    ],
  },
  {
    company: "南天电子信息产业股份有限公司",
    role: "Java 全栈开发 / 内部项目经理",
    period: "2015.12 - 2018.03",
    type: "全栈开发",
    description:
      "公司主营银行核心业务系统、ATM 等金融终端软硬件研发，负责银行柜面系统、终端配套管理平台全栈开发，兼任内部项目经理。",
    highlights: [
      "负责金融业务需求拆解、数据库设计、接口编写、前端联调、bug 闭环",
      "独立完成项目立项申报、研发排期、人员协调、进度管控、验收复盘全流程",
    ],
  },
];

/* 项目数据已迁移至 data/projects.ts */

/* 博客数据已迁移至 data/blogs.ts */

/** 站点统计（占位数据，后续从后端API获取） */
export const siteStats = {
  totalViews: "持续更新",
  totalPosts: "持续更新",
  totalProjects: "10+",
};

/** 快速入口链接 */
export const quickLinks = [
  { label: "技术博客", href: "/blog" },
  { label: "项目作品", href: "/projects" },
  { label: "关于我", href: "/about" },
  { label: "GitHub", href: "https://github.com/", external: true },
  { label: "掘金", href: "https://juejin.cn/", external: true },
  { label: "邮箱", href: "mailto:931015218@qq.com", external: true },
];
