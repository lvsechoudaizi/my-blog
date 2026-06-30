import Link from "next/link";
import {
  profile,
  coreSkills,
  quickLinks,
  siteStats,
} from "../data/profile";
import { featuredProjects } from "../data/projects";
import { sortedPosts } from "../data/blogs";

export default function Home() {
  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
        {/* Hero Section */}
        <section className="grid gap-10 rounded-3xl border border-white/10 bg-white/5 px-7 py-10 backdrop-blur sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          {/* Left: Main Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium tracking-wide text-white/70">
                个人官网 / 技术作品集
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                你好，我是{" "}
                <span className="text-sky-300">{profile.name}</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                {profile.bio}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "工作年限", value: profile.yearsExp },
                { label: "项目经验", value: profile.projectCount },
                { label: "技术博客", value: profile.blogCount },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                >
                  <span className="text-white/60">{item.label}</span>{" "}
                  <span className="font-medium text-white/90">
                    {item.value}
                  </span>
                </div>
              ))}
              {profile.certificate && (
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                  <span className="text-white/60">证书</span>{" "}
                  <span className="font-medium text-white/90">
                    {profile.certificate}
                  </span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
              >
                进入技术博客
              </Link>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white/90 transition hover:bg-white/10"
              >
                关于我 / 简历
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 text-sm text-white/60">
              <div className="h-px flex-1 bg-white/10" />
              <span>tech stack</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Core Skills Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              {coreSkills.map((group) => (
                <div
                  key={group.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white/90">
                      {group.name}
                    </h3>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Card & Quick Links */}
          <div className="flex flex-col gap-6">
            {/* Profile Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="flex items-start gap-4">
                <div
                  className="relative h-20 w-20 shrink-0 overflow-hidden border border-white/15 bg-gradient-to-br from-sky-400/50 via-fuchsia-400/35 to-emerald-400/30"
                  style={{
                    clipPath:
                      "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-white/90">
                    {profile.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-white/65">
                    {profile.title}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Vue3", "React", "SpringBoot", "Docker", "AI Agent"].map(
                      (t) => (
                        <span
                          key={t}
                          className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70"
                        >
                          {t}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-sky-400/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-2xl" />
            </div>

            {/* Quick Links */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white/90">
                  快速入口
                </h3>
                <span className="text-xs text-white/40">quick links</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {quickLinks.map((item) => {
                  const isExternal =
                    "external" in item && item.external;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="group flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-black/20 px-3 text-sm font-medium text-white/80 transition hover:bg-white/10"
                    >
                      <span className="truncate">{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Site Stats */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white/90">
                  站点数据
                </h3>
                <span className="text-xs text-white/40">stats</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { label: "访问量", value: siteStats.totalViews },
                  { label: "文章数", value: siteStats.totalPosts },
                  { label: "项目数", value: siteStats.totalProjects },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center"
                  >
                    <div className="text-sm font-semibold text-white/90">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs text-white/50">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Job Target */}
            <div className="rounded-3xl border border-sky-500/20 bg-sky-500/5 p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white/90">
                  求职意向
                </h3>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400">
                  Open to Work
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/75">
                {profile.jobTarget}
              </p>
              <p className="mt-2 text-xs text-white/50">
                {profile.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* Latest Blog Posts */}
        <section className="mt-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white/90">
                最新博客
              </h2>
              <p className="mt-1 text-sm text-white/60">
                精选近期技术文章，持续输出工程化与全栈实践。
              </p>
            </div>
            <Link
              href="/blog"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              查看全部 →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {sortedPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
              >
                <div className="flex items-center gap-3 text-xs text-white/50">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingMinutes} min</span>
                  <span>·</span>
                  <span>{post.views.toLocaleString()} views</span>
                </div>
                <h3 className="mt-3 text-base font-semibold text-white/90">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/65">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-lg font-semibold text-white/90">
                精选项目
              </h2>
              <p className="mt-1 text-sm text-white/60">
                用项目沉淀方法论，用输出提升影响力。
              </p>
            </div>
            <Link
              href="/projects"
              className="text-sm font-medium text-white/75 transition hover:text-white"
            >
              查看更多 →
            </Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-7 transition hover:from-white/15 hover:to-white/10"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2 py-0.5 text-xs ${
                        p.category === "自研项目"
                          ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                          : "border-sky-500/20 bg-sky-500/10 text-sky-300"
                      }`}
                    >
                      {p.category}
                    </span>
                    <span className="text-xs text-white/50">{p.period}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-white/90">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {p.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70"
                      >
                        {s}
                      </span>
                    ))}
                    {p.stack.length > 5 && (
                      <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/50">
                        +{p.stack.length - 5}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 text-xs font-medium text-white/50 transition group-hover:text-sky-300">
                    查看详情 →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-14 rounded-3xl border border-white/10 bg-white/5 px-7 py-7 text-sm text-white/60">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-white/80">
                © 2026 {profile.name}
              </span>
              <span className="text-white/30">·</span>
              <span>Built with Next.js + Tailwind</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="text-white/70 transition hover:text-white"
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="text-white/70 transition hover:text-white"
                href={profile.juejin}
                target="_blank"
                rel="noreferrer"
              >
                掘金
              </a>
              <a
                className="text-white/70 transition hover:text-white"
                href={`mailto:${profile.email}`}
              >
                Email
              </a>
              <Link
                className="text-white/70 transition hover:text-white"
                href="/blog"
              >
                Blog
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
