import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, findProjectById, getRelatedProjects } from "../../../data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = findProjectById(id);
  if (!project) return { title: "项目未找到 - 李建华" };
  return {
    title: `${project.title} - 李建华 | 项目作品`,
    description: project.description,
  };
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function SectionCard({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
      <h2 className="flex items-center gap-2 text-base font-semibold text-white/90">
        <span>{emoji}</span>
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = findProjectById(id);
  if (!project) notFound();

  const related = getRelatedProjects(project.id);
  const isPersonal = project.category === "自研项目";

  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-5xl px-6 pb-20 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link className="transition hover:text-white" href="/">
            首页
          </Link>{" "}
          <span className="text-white/35">/</span>{" "}
          <Link className="transition hover:text-white" href="/projects">
            项目作品
          </Link>{" "}
          <span className="text-white/35">/</span>{" "}
          <span className="text-white/80">{project.title}</span>
        </div>

        {/* Hero Header */}
        <section
          className={`mt-6 rounded-3xl border p-8 ${
            isPersonal
              ? "border-emerald-500/20 bg-gradient-to-br from-emerald-500/8 to-white/5"
              : "border-sky-500/20 bg-gradient-to-br from-sky-500/8 to-white/5"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    isPersonal
                      ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                      : "border-sky-400/30 bg-sky-400/10 text-sky-300"
                  }`}
                >
                  {project.category}
                  {project.client ? ` · ${project.client}` : ""}
                </span>
                <span className="text-sm text-white/50">{project.period}</span>
              </div>
              <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {project.title}
              </h1>
              <p className="mt-3 text-base leading-7 text-white/70">
                {project.description}
              </p>
            </div>
          </div>

          {/* Meta Row */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/45">个人角色</div>
              <div className="mt-1 text-sm font-semibold text-white/85">
                {project.role}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/45">开发周期</div>
              <div className="mt-1 text-sm font-semibold text-white/85">
                {project.period}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
              <div className="text-xs text-white/45">技术栈数量</div>
              <div className="mt-1 text-sm font-semibold text-white/85">
                {project.stack.length} 项技术
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-5">
            <div className="text-xs text-white/45 mb-3">技术栈</div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
        </section>

        {/* Detail Sections */}
        <div className="mt-8 space-y-6">
          {/* Background */}
          <SectionCard title="项目背景" emoji="📋">
            <p className="text-sm leading-7 text-white/70">
              {project.detail.background}
            </p>
          </SectionCard>

          {/* Core Features */}
          <SectionCard title="核心功能" emoji="⚙️">
            <div className="space-y-3">
              {project.detail.coreFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/15 p-4"
                >
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      isPersonal
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-sky-500/20 text-sky-300"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p className="text-sm leading-6 text-white/75">{feature}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Technical Challenges */}
          <SectionCard title="技术难点与解决方案" emoji="🔧">
            <div className="space-y-3">
              {project.detail.technicalChallenges.map((challenge, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-white/5 bg-black/15 p-4"
                >
                  <span
                    className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      isPersonal ? "bg-emerald-400/60" : "bg-sky-400/60"
                    }`}
                  />
                  <p className="text-sm leading-6 text-white/75">{challenge}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Results */}
          <SectionCard title="项目成果" emoji="🎯">
            <div className="grid gap-3 sm:grid-cols-2">
              {project.detail.results.map((result, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border p-4 ${
                    isPersonal
                      ? "border-emerald-500/15 bg-emerald-500/5"
                      : "border-sky-500/15 bg-sky-500/5"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`mt-0.5 text-sm ${
                        isPersonal ? "text-emerald-400" : "text-sky-400"
                      }`}
                    >
                      ✓
                    </span>
                    <p className="text-sm leading-6 text-white/80">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Highlights Summary */}
          <SectionCard title="亮点速览" emoji="✨">
            <div className="grid gap-2 sm:grid-cols-2">
              {project.highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2 rounded-xl bg-white/3 p-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span className="text-sm text-white/70">{h}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-white/90">
                更多项目
              </h2>
              <Link
                href="/projects"
                className="text-sm text-white/60 transition hover:text-white"
              >
                查看全部 →
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/projects/${rp.id}`}
                  className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs ${
                        rp.category === "自研项目"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : "border-sky-400/30 bg-sky-400/10 text-sky-300"
                      }`}
                    >
                      {rp.category}
                    </span>
                    <span className="text-xs text-white/40">{rp.period}</span>
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-white/90 group-hover:text-sky-300 transition">
                    {rp.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-white/60">
                    {rp.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
