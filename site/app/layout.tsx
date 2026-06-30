import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "李建华 | 高级前端工程师 · 全栈开发",
  description: "李建华的个人官网与技术博客。10年前端开发经验，精通 Vue3/React/TypeScript/Next.js，熟练 SpringBoot/Spring Cloud/Docker 全栈开发，具备 AI Agent 应用开发能力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-slate-100">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050A18]/70 backdrop-blur">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <span className="text-sky-300">L</span>
              </span>
              <span className="text-white/85">李建华</span>
            </Link>
            <nav className="flex items-center gap-5 text-sm text-white/70">
              <Link className="transition hover:text-white" href="/">
                首页
              </Link>
              <Link className="transition hover:text-white" href="/blog">
                技术博客
              </Link>
              <Link className="transition hover:text-white" href="/projects">
                项目作品
              </Link>
              <Link className="transition hover:text-white" href="/about">
                关于我
              </Link>
            </nav>
          </div>
        </header>
        {children}

        <footer className="border-t border-white/10 bg-white/5 px-7 py-7 text-sm text-white/60">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-medium text-white/80">© 2026 李建华</span>
              <span className="text-white/30">·</span>
              <span>Built with Next.js + Tailwind</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                className="text-white/70 transition hover:text-white"
                href="mailto:931015218@qq.com"
              >
                Email
              </a>
              <a
                className="text-white/70 transition hover:text-white"
                href="tel:15730404707"
              >
                电话
              </a>
              <Link className="text-white/70 transition hover:text-white" href="/blog">
                Blog
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
