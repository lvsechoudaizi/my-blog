import Link from "next/link";

export const metadata = {
  title: "关于我 | 李建华",
  description:
    "李建华，10年前端开发经验，高级前端工程师，精通 Vue3/React/TypeScript，熟练 SpringBoot/Docker 全栈开发，具备 AI Agent 应用开发能力。",
};

const skillGroups = [
  {
    title: "前端技术",
    level: "精通",
    color: "from-sky-400 to-blue-500",
    items: [
      { name: "Vue2 / Vue3", percent: 95 },
      { name: "TypeScript", percent: 90 },
      { name: "React", percent: 85 },
      { name: "Next.js", percent: 80 },
      { name: "Vite / Webpack", percent: 88 },
      { name: "Pinia / Vuex / Redux / Mobx", percent: 90 },
    ],
  },
  {
    title: "后端技术",
    level: "熟练",
    color: "from-emerald-400 to-green-500",
    items: [
      { name: "Spring Boot", percent: 78 },
      { name: "Spring Cloud Alibaba", percent: 72 },
      { name: "MyBatis-Plus", percent: 80 },
      { name: "Spring Security + JWT", percent: 75 },
      { name: "MySQL / Redis", percent: 76 },
    ],
  },
  {
    title: "数据可视化",
    level: "熟练",
    color: "from-violet-400 to-purple-500",
    items: [
      { name: "ECharts / Highcharts", percent: 88 },
      { name: "AntV G6 关系图谱", percent: 82 },
      { name: "ArcGIS 地图", percent: 75 },
      { name: "百度地图 BMapGL", percent: 78 },
    ],
  },
  {
    title: "AI 工程",
    level: "了解",
    color: "from-amber-400 to-orange-500",
    items: [
      { name: "SpringAI / LangChain4j", percent: 70 },
      { name: "RAG 知识库 / PGVector", percent: 68 },
      { name: "Function Calling / MCP", percent: 65 },
      { name: "Multi-Agent 架构", percent: 68 },
    ],
  },
  {
    title: "工程化 & 部署",
    level: "熟练",
    color: "from-pink-400 to-rose-500",
    items: [
      { name: "Docker / Docker Compose", percent: 82 },
      { name: "Nginx", percent: 80 },
      { name: "Nacos / 微服务", percent: 75 },
      { name: "微前端 Qiankun", percent: 85 },
      { name: "ESLint / Prettier / Husky", percent: 90 },
    ],
  },
];

const workExperience = [
  {
    company: "亚信科技（重庆艾瑞数智）",
    role: "高级前端开发工程师（正式编制）",
    period: "2022.03 — 2026.06",
    highlights: [
      "大型央企信息化服务商，作为各项目前端负责人",
      "主导前端技术规范化建设，搭建通用组件库",
      "独立负责多个运营商级大型前端项目",
      "业余持续深耕全栈与 AI 应用",
    ],
  },
  {
    company: "华龙网海数科技",
    role: "前端开发工程师（主力 React）",
    period: "2018.03 — 2022.03",
    highlights: [
      "政务、融媒体类 Web 项目前端全生命周期开发",
      "落地微前端架构（Qiankun），整合十几个子系统",
      "完成数据可视化大屏、地图应用、关系图谱",
    ],
  },
  {
    company: "南天电子信息产业股份有限公司",
    role: "Java 全栈开发 / 内部项目经理",
    period: "2015.12 — 2018.03",
    highlights: [
      "银行核心业务系统、ATM 金融终端软硬件研发",
      "兼任内部项目经理，协调跨部门交付",
    ],
  },
];

function ProgressBar({ percent, color }: { percent: number; color: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link className="transition hover:text-white" href="/">
            首页
          </Link>{" "}
          <span className="text-white/35">/</span> 关于我
        </div>

        {/* Hero / Intro */}
        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="h-24 w-24 shrink-0 border border-white/15 bg-gradient-to-br from-sky-400/50 via-fuchsia-400/35 to-emerald-400/30"
              style={{
                clipPath:
                  "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
              }}
            />
            <div className="flex-1">
              <h1 className="text-3xl font-semibold tracking-tight text-white/90 sm:text-4xl">
                李建华
              </h1>
              <p className="mt-2 text-base text-white/70">
                高级前端工程师 · 全栈开发工程师
              </p>
              <p className="mt-4 text-sm leading-7 text-white/65">
                10年前端开发经验，从银行金融终端到政务融媒体平台，再到运营商级数字化中台，
                完整经历了前端技术栈从 jQuery → AngularJS → Vue2 → Vue3/React
                的演进历程。擅长复杂业务系统的前端架构设计与组件化落地，同时持续拓展全栈与
                AI 工程能力，致力于成为能独立交付端到端解决方案的全栈工程师。
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { label: "经验", value: "10 年" },
                  { label: "年龄", value: "32 岁" },
                  { label: "学历", value: "本科 · 玉溪师范学院" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    <span className="text-white/60">{item.label}</span>{" "}
                    <span className="font-medium text-white/90">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Skill Matrix */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white/90">
            技能矩阵 / Skill Matrix
          </h2>
          <p className="mt-1 text-sm text-white/60">
            分模块展示技术能力与熟练度。
          </p>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {skillGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-semibold text-white/90">
                    {group.title}
                  </h3>
                  <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/60">
                    {group.level}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <div key={item.name}>
                      <div className="flex items-center justify-between text-xs text-white/70">
                        <span>{item.name}</span>
                        <span>{item.percent}%</span>
                      </div>
                      <div className="mt-1">
                        <ProgressBar percent={item.percent} color={group.color} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* AI Tools Row */}
          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-semibold text-white/90">
                AI 编程工具
              </h3>
              <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/60">
                日常使用
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Cursor",
                "Trae",
                "Claude Code",
                "GitHub Copilot",
                "Vibe Coding / SDD",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/75"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Work Experience Timeline */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white/90">
            职业经历 / Experience
          </h2>
          <p className="mt-1 text-sm text-white/60">
            10 年 3 段工作经历，从金融到政务再到运营商领域。
          </p>

          <div className="mt-5 space-y-0">
            {workExperience.map((exp, idx) => (
              <div key={exp.company} className="relative flex gap-6">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 shrink-0 rounded-full border-2 border-sky-400 bg-[#050A18]" />
                  {idx < workExperience.length - 1 && (
                    <div className="w-px flex-1 bg-white/15" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`rounded-3xl border border-white/10 bg-white/5 p-6 ${
                    idx < workExperience.length - 1 ? "mb-4" : ""
                  } flex-1`}
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-base font-semibold text-white/90">
                      {exp.company}
                    </h3>
                    <span className="text-xs text-white/50">{exp.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-sky-300/80">{exp.role}</p>
                  <ul className="mt-3 space-y-1.5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-sm text-white/65"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certificate */}
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-white/90">教育背景</h3>
            <div className="mt-3 space-y-1 text-sm text-white/70">
              <p>玉溪师范学院</p>
              <p className="text-white/50">通信工程 · 本科</p>
              <p className="text-xs text-white/40">2012 — 2016</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-white/90">证书资质</h3>
            <div className="mt-3 space-y-1 text-sm text-white/70">
              <p>中级信息系统项目管理师</p>
              <p className="text-xs text-white/40">软考中级</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-sm font-semibold text-white/90">求职意向</h3>
            <div className="mt-3 space-y-1 text-sm text-white/70">
              <p>前端开发 / 全栈开发工程师</p>
              <p className="text-xs text-white/40">
                具备 AI Agent 应用开发经验
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-white/90">
            联系方式 / Contact
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "邮箱", value: "931015218@qq.com", href: "mailto:931015218@qq.com" },
              { label: "电话 / 微信", value: "15730404707", href: "tel:15730404707" },
              { label: "项目作品", value: "查看详情", href: "/projects" },
              { label: "技术博客", value: "查看文章", href: "/blog" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
              >
                <div className="text-xs text-white/50">{item.label}</div>
                <div className="mt-2 text-sm font-semibold text-white/90">
                  {item.value}
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
