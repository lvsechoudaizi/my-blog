"use client";

import { useState } from "react";
import Link from "next/link";
import { sortedPosts, allTags, type BlogPost } from "../../data/blogs";
import { profile } from "../../data/profile";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-sky-500/10 via-white/5 to-fuchsia-500/5 p-8 transition hover:from-sky-500/15 hover:to-fuchsia-500/10"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
          {post.category}
        </span>
        <span className="text-xs text-white/40">精选</span>
      </div>
      <h2 className="mt-3 text-xl font-bold text-white/90 group-hover:text-sky-300 transition sm:text-2xl">
        {post.title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-white/65">{post.excerpt}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4 text-xs text-white/45">
        <span>{post.date}</span>
        <span>{post.readingMinutes} min</span>
        <span>{post.views.toLocaleString()} views</span>
      </div>
      <div className="mt-3 text-sm font-medium text-white/50 transition group-hover:text-sky-300">
        阅读全文 →
      </div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
    </Link>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
    >
      <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-lg font-bold text-white/20">
        {String(index + 1).padStart(2, "0")}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-white/90 group-hover:text-sky-300 transition">
          {post.title}
        </h3>
        <p className="mt-1.5 text-xs leading-5 text-white/55 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-white/40">
          <span>{post.date}</span>
          <span>{post.readingMinutes} min</span>
          <div className="flex gap-1.5">
            {post.tags.slice(0, 3).map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function PostGrid({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-6 transition hover:from-white/12 hover:to-white/6"
    >
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/50">
          {post.category}
        </span>
        <span className="text-xs text-white/35">{post.date}</span>
      </div>
      <h3 className="mt-3 text-base font-semibold text-white/90 group-hover:text-sky-300 transition">
        {post.title}
      </h3>
      <p className="mt-2 text-xs leading-5 text-white/55 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {post.tags.slice(0, 3).map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-white/40">
        <span>{post.readingMinutes} min</span>
        <span className="transition group-hover:text-sky-300">阅读全文 →</span>
      </div>
    </Link>
  );
}

export default function BlogListPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? sortedPosts.filter((p) => p.tags.includes(activeTag))
    : sortedPosts;

  const featured = filtered[0];
  const gridPosts = filtered.slice(1, 5);
  const listPosts = filtered.slice(5);

  return (
    <main className="relative flex-1">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8">
        {/* Breadcrumb */}
        <div className="text-sm text-white/60">
          <Link className="transition hover:text-white" href="/">
            首页
          </Link>{" "}
          <span className="text-white/35">/</span> 技术博客
        </div>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white/90">
              技术博客
            </h1>
            <p className="mt-1 text-sm text-white/55">
              {sortedPosts.length} 篇原创技术文章，涵盖前端工程化、全栈开发、AI
              工程实践。
            </p>
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeTag === null
                ? "border-sky-400/40 bg-sky-400/15 text-sky-300"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            全部
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(t === activeTag ? null : t)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                activeTag === t
                  ? "border-sky-400/40 bg-sky-400/15 text-sky-300"
                  : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <div className="flex flex-col gap-6">
            {/* Featured Post */}
            {featured && <FeaturedCard post={featured} />}

            {/* Grid: 4 posts */}
            {gridPosts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white/70 mb-4">
                  推荐阅读
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {gridPosts.map((post) => (
                    <PostGrid key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* List: remaining */}
            {listPosts.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-white/70 mb-4">
                  更多文章
                </h2>
                <div className="flex flex-col gap-3">
                  {listPosts.map((post, i) => (
                    <PostCard key={post.slug} post={post} index={i + 5} />
                  ))}
                </div>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
                <p className="text-white/50">
                  暂无匹配「{activeTag}」标签的文章
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-4">
            {/* Author Card */}
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
                    {profile.name}
                  </div>
                  <div className="mt-1 text-xs leading-5 text-white/60">
                    {profile.title}
                  </div>
                  <div className="mt-2 text-xs text-white/45">
                    {sortedPosts.length} 篇文章 · {allTags.length} 个标签
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white/90 mb-4">
                博客统计
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "文章数", value: sortedPosts.length },
                  { label: "标签数", value: allTags.length },
                  {
                    label: "总阅读",
                    value: sortedPosts
                      .reduce((s, p) => s + p.views, 0)
                      .toLocaleString(),
                  },
                  {
                    label: "总时长",
                    value: `${sortedPosts.reduce((s, p) => s + p.readingMinutes, 0)} min`,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center"
                  >
                    <div className="text-lg font-bold text-white/85">
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
                  { label: "回到首页", href: "/" },
                  { label: "关于我", href: "/about" },
                  { label: "项目作品", href: "/projects" },
                  { label: "GitHub", href: profile.github },
                ].map((item) => {
                  const isExternal = item.href.startsWith("http");
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="flex h-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-sm text-white/75 transition hover:bg-white/10"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
