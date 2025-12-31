"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MarkdownViewer } from "./MarkdownViewer";

interface HookPageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  markdown: string;
}

export function HookPageLayout({
  title,
  description,
  children,
  markdown,
}: HookPageLayoutProps) {
  const [activeTab, setActiveTab] = useState<"demo" | "docs">("demo");
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动增加header阴影效果
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* 顶部导航 - 精致毛玻璃效果 */}
      <header className={`sticky top-0 z-20 border-b transition-all duration-300 ${
        scrolled
          ? "border-zinc-200/80 bg-white/90 shadow-sm shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:shadow-zinc-950/50"
          : "border-zinc-200/50 bg-white/70 dark:border-zinc-800/50 dark:bg-zinc-900/70"
      } backdrop-blur-xl`} role="banner">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-label="返回首页"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:inline">首页</span>
            </Link>

            {/* 分隔线 */}
            <div className="hidden sm:block w-px h-5 bg-zinc-200 dark:bg-zinc-700" aria-hidden="true"/>

            {/* 标题区域 */}
            <div className="min-w-0 flex-1">
              <h1 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {title}
              </h1>
            </div>
          </div>

          {/* 移动端 Tab 切换 - 精美胶囊设计 */}
          <div className="flex rounded-xl bg-zinc-100/80 p-1 dark:bg-zinc-800/80 lg:hidden shrink-0 shadow-inner" role="tablist" aria-label="内容切换">
            <button
              onClick={() => setActiveTab("demo")}
              className={`relative rounded-lg px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeTab === "demo"
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
              role="tab"
              aria-selected={activeTab === "demo"}
              aria-controls="demo-panel"
            >
              {activeTab === "demo" && (
                <span className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-lg shadow-sm" style={{ zIndex: -1 }} aria-hidden="true"/>
              )}
              <span className="relative flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                示例
              </span>
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`relative rounded-lg px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                activeTab === "docs"
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
              }`}
              role="tab"
              aria-selected={activeTab === "docs"}
              aria-controls="docs-panel"
            >
              {activeTab === "docs" && (
                <span className="absolute inset-0 bg-white dark:bg-zinc-700 rounded-lg shadow-sm" style={{ zIndex: -1 }} aria-hidden="true"/>
              )}
              <span className="relative flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                文档
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="w-full">
        <div className="flex flex-col lg:flex-row">
          {/* 左侧：示例演示 */}
          <div
            id="demo-panel"
            className={`w-full flex-shrink-0 lg:w-1/2 lg:block ${
              activeTab === "demo" ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby="demo-tab"
          >
            <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
              <div className="p-4 sm:p-6 lg:p-8 pb-safe">
                {/* 描述区域 - 带装饰 */}
                {description && (
                  <div className="mb-6 sm:mb-8 relative">
                    <div className="absolute -left-2 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-cyan-500 to-blue-600" aria-hidden="true"/>
                    <p className="pl-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {description}
                    </p>
                  </div>
                )}

                {/* 示例内容 */}
                <div className="space-y-6 sm:space-y-8">
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* 分隔线 - 桌面端 */}
          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent dark:via-zinc-800" aria-hidden="true"/>

          {/* 右侧：文档说明 */}
          <div
            id="docs-panel"
            className={`w-full lg:w-1/2 lg:block ${
              activeTab === "docs" ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby="docs-tab"
          >
            <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain">
              <div className="p-4 sm:p-6 lg:p-8 pb-safe">
                {/* 文档标题装饰 */}
                <div className="hidden lg:flex items-center gap-2 mb-6 pb-4 border-b border-zinc-200/50 dark:border-zinc-800/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md" aria-hidden="true">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">API 文档</span>
                </div>

                <MarkdownViewer content={markdown} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
