"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
            <Link
              href="/"
              className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 shrink-0"
            >
              ← 首页
            </Link>
            <h1 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {title}
            </h1>
          </div>

          {/* 移动端 Tab 切换 */}
          <div className="flex gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-800 lg:hidden shrink-0">
            <button
              onClick={() => setActiveTab("demo")}
              className={`rounded-md px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "demo"
                  ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}
            >
              示例
            </button>
            <button
              onClick={() => setActiveTab("docs")}
              className={`rounded-md px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-colors ${
                activeTab === "docs"
                  ? "bg-white text-zinc-900 shadow dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400"
              }`}
            >
              文档
            </button>
          </div>
        </div>
      </header>

      {/* 主体内容 */}
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row">
          {/* 左侧：示例演示 */}
          <div
            className={`w-full flex-shrink-0 border-r border-zinc-200 dark:border-zinc-800 lg:w-1/2 lg:block ${
              activeTab === "demo" ? "block" : "hidden"
            }`}
          >
            <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto p-4 sm:p-6 pb-safe">
              {description && (
                <p className="mb-4 sm:mb-6 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {description}
                </p>
              )}
              <div className="space-y-4 sm:space-y-6">{children}</div>
            </div>
          </div>

          {/* 右侧：文档说明 */}
          <div
            className={`w-full lg:w-1/2 lg:block ${
              activeTab === "docs" ? "block" : "hidden"
            }`}
          >
            <div className="lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] overflow-y-auto p-4 sm:p-6 pb-safe">
              <MarkdownViewer content={markdown} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
