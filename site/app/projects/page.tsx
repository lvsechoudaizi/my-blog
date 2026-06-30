import Link from "next/link";
import { projects } from "../../data/projects";

type Filter = "all" | "企业项目" | "自研项目";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

export default function ProjectsPage() {
  const enterpriseProjects = projects.filter((p) => p.category === "企业项目");
  const personalProjects = projects.filter((p) => p.category === "自研项目");

  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link className="transition hover:text-white" href="/">
            首页
          </Link>{" "}
          <span className="text-white/35">/</span> 项目作品
        </div>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white/90">
              项目作品
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {enterpriseProjects.length} 个商业项目 +{" "}
              {personalProjects.length} 个自研项目，覆盖运营商、政务、金融、出版、AI
              等领域。
            </p>
          </div>
        </div>

        {/* Enterprise Projects */}
        <section className="mt-8">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-white/90">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 text-xs">
              🏢
            </span>
            商业项目
            <span className="text-sm font-normal text-white/50">
              工作中的核心交付项目
            </span>
          </h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {enterpriseProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 transition hover:from-white/15 hover:to-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
                    {project.client || "商业"}
                  </span>
                  <span className="text-xs text-white/40">
                    {project.period}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-semibold text-white/90 group-hover:text-sky-300 transition">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {project.highlights.slice(0, 2).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-white/55"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-400/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50">
                  <span>角色：{project.role}</span>
                  <span className="font-medium text-white/70 transition group-hover:text-sky-300">
                    查看详情 →
                  </span>
                </div>

                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-sky-400/10 blur-2xl" />
              </Link>
            ))}
          </div>
        </section>

        {/* Personal Projects */}
        <section className="mt-12">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-white/90">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-400/30 bg-emerald-400/10 text-xs">
              🚀
            </span>
            自研项目
            <span className="text-sm font-normal text-white/50">
              独立设计开发，体现全栈与 AI 工程化能力
            </span>
          </h2>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {personalProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group relative overflow-hidden rounded-3xl border border-emerald-500/15 bg-gradient-to-b from-emerald-500/5 to-white/5 p-7 transition hover:from-emerald-500/10 hover:to-white/10"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">
                    自研
                  </span>
                  <span className="text-xs text-white/40">
                    {project.period}
                  </span>
                </div>

                <h3 className="mt-3 text-base font-semibold text-white/90 group-hover:text-emerald-300 transition">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {project.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs text-white/55"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400/60" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <Chip key={s}>{s}</Chip>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-white/50">
                  <span>角色：{project.role}</span>
                  <span className="font-medium text-white/70 transition group-hover:text-emerald-300">
                    查看详情 →
                  </span>
                </div>

                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
