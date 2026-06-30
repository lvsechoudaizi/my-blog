import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { posts, findPostBySlug, getRelatedPosts } from "../../../data/blogs";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) return { title: "文章未找到 - 李建华" };
  return {
    title: `${post.title} - 李建华 | 技术博客`,
    description: post.excerpt,
  };
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = findPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link className="transition hover:text-white" href="/">
            首页
          </Link>{" "}
          <span className="text-white/35">/</span>{" "}
          <Link className="transition hover:text-white" href="/blog">
            技术博客
          </Link>{" "}
          <span className="text-white/35">/</span>{" "}
          <span className="text-white/80">{post.title}</span>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Article */}
          <article className="min-w-0">
            {/* Header */}
            <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/8 via-white/5 to-fuchsia-500/5 p-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
                  {post.category}
                </span>
                <span className="text-xs text-white/40">{post.date}</span>
                <span className="text-xs text-white/35">·</span>
                <span className="text-xs text-white/40">
                  {post.readingMinutes} min
                </span>
                <span className="text-xs text-white/35">·</span>
                <span className="text-xs text-white/40">
                  {post.views.toLocaleString()} views
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {post.title}
              </h1>

              <p className="mt-4 text-sm leading-7 text-white/65">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </header>

            {/* TOC */}
            <nav className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-white/85">
                <span>📑</span> 目录
              </div>
              <div className="mt-3 space-y-1.5">
                {post.toc.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-sm text-white/60"
                  >
                    <span className="text-xs text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </nav>

            {/* Sections */}
            <div className="mt-6 space-y-6">
              {post.sections.map((section, i) => (
                <section
                  key={i}
                  className="rounded-3xl border border-white/10 bg-white/5 p-7"
                >
                  <h2 className="flex items-center gap-3 text-lg font-semibold text-white/90">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 text-xs text-sky-300">
                      {i + 1}
                    </span>
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-3">
                    {section.content.map((p, j) => (
                      <p
                        key={j}
                        className="text-sm leading-7 text-white/70"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {section.code && (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                        <span className="text-xs text-white/40">
                          {section.code.lang}
                        </span>
                      </div>
                      <div className="p-4 overflow-x-auto">
                        <pre className="text-xs leading-6 text-white/80">
                          <code>{section.code.snippet}</code>
                        </pre>
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Related Posts */}
            <section className="mt-10">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white/90">
                  相关推荐
                </h2>
                <Link
                  href="/blog"
                  className="text-sm text-white/50 transition hover:text-white"
                >
                  返回列表 →
                </Link>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                  >
                    <div className="flex items-center gap-2 text-xs text-white/45">
                      <span>{p.date}</span>
                      <span>·</span>
                      <span>{p.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-white/90 group-hover:text-sky-300 transition">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-white/55 line-clamp-2">
                      {p.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Comment Placeholder */}
            <section className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-6">
              <div className="text-base font-semibold text-white/90">评论</div>
              <div className="mt-1 text-xs text-white/50">
                后续可接入 Gitalk / Giscus / 自研评论接口
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="flex-1 text-sm text-white/35">
                  输入评论...
                </span>
                <button
                  type="button"
                  className="h-8 rounded-xl bg-white px-4 text-sm font-semibold text-slate-950 transition hover:bg-white/90"
                >
                  提交
                </button>
              </div>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Author */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div
                  className="h-14 w-14 shrink-0 border border-white/10 bg-gradient-to-br from-sky-400/50 via-fuchsia-400/35 to-emerald-400/30"
                  style={{
                    clipPath:
                      "polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)",
                  }}
                />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white/90">
                    李建华
                  </div>
                  <div className="mt-1 text-xs leading-5 text-white/60">
                    高级前端工程师 · 全栈开发
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["Vue3", "React", "SpringBoot", "AI"].map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Article Info */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white/90 mb-4">
                文章信息
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "阅读时长", value: `${post.readingMinutes} min` },
                  { label: "浏览量", value: post.views.toLocaleString() },
                  { label: "分类", value: post.category },
                  { label: "状态", value: "公开" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center"
                  >
                    <div className="text-sm font-semibold text-white/85">
                      {item.value}
                    </div>
                    <div className="mt-0.5 text-xs text-white/45">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white/90 mb-4">
                快速入口
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "博客列表", href: "/blog" },
                  { label: "回到首页", href: "/" },
                  { label: "项目作品", href: "/projects" },
                  { label: "关于我", href: "/about" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex h-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm text-white/75 transition hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
