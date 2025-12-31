import Link from "next/link";
import { allTemplates } from "../problems/data/templates";

export default function ConceptsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">首页</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm shadow-lg shadow-indigo-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h1 className="text-base sm:text-lg font-bold">算法基础</h1>
            </div>
          </div>
          <Link
            href="/problems"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm font-medium hover:bg-emerald-500/20 transition-colors"
          >
            去做题
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-10">
        {/* 介绍区域 */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            掌握算法核心概念
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            在做题之前，先理解算法的核心原理和模式。通过模板库学习标准解法，让做题更有方向。
          </p>
        </div>

        {/* 功能入口 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
          {/* 解题模板库 */}
          <Link
            href="/concepts/templates"
            className="group relative rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 p-6 sm:p-8 hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10 active:scale-[0.99] transition-all overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-3xl sm:text-4xl shadow-lg shadow-purple-500/30">
                  📋
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    解题模板库
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {allTemplates.length} 个核心算法模板
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 mb-4">
                每个模板包含详细的原理讲解、代码框架、常见错误和动画演示，帮助你快速掌握算法套路。
              </p>

              <div className="flex flex-wrap gap-2">
                {["双指针", "滑动窗口", "二分查找", "BFS/DFS", "动态规划"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <svg
              className="absolute bottom-6 right-6 w-6 h-6 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>

          {/* 复杂度分析（即将上线） */}
          <div className="relative rounded-2xl bg-zinc-900/50 border border-zinc-800 p-6 sm:p-8 opacity-70">
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs bg-zinc-800 text-zinc-500">
              即将上线
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-zinc-800 text-3xl sm:text-4xl">
                📊
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-500">
                  复杂度分析
                </h3>
                <p className="text-sm text-zinc-600">
                  理解时间与空间复杂度
                </p>
              </div>
            </div>

            <p className="text-zinc-600 mb-4">
              学习如何分析算法的时间复杂度和空间复杂度，包括常见复杂度对比、主定理、递归分析等。
            </p>

            <div className="flex flex-wrap gap-2">
              {["O(n)", "O(log n)", "O(n²)", "递归分析", "摊还分析"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-600 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 模板预览 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">热门模板</h3>
            <Link
              href="/concepts/templates"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              查看全部
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {allTemplates.slice(0, 5).map((template) => (
              <Link
                key={template.id}
                href="/concepts/templates"
                className="group rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all"
              >
                <div className="text-2xl mb-2">
                  {template.category === "array" && "📝"}
                  {template.category === "search" && "🔍"}
                  {template.category === "graph" && "🕸️"}
                  {template.category === "dp" && "📊"}
                  {template.category === "stack" && "📚"}
                  {template.category === "linked-list" && "🔗"}
                  {template.category === "tree" && "🌳"}
                </div>
                <h4 className="font-medium text-sm group-hover:text-purple-400 transition-colors">
                  {template.name}
                </h4>
                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                  {template.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* 学习建议 */}
        <div className="rounded-xl bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 border border-blue-500/10 p-5">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <span className="text-lg">💡</span>
            学习建议
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold shrink-0">
                1
              </span>
              <div>
                <div className="font-medium mb-1">先学模板</div>
                <div className="text-zinc-400">理解每种算法的核心思想和代码框架</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold shrink-0">
                2
              </span>
              <div>
                <div className="font-medium mb-1">看动画演示</div>
                <div className="text-zinc-400">通过可视化加深对算法执行过程的理解</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold shrink-0">
                3
              </span>
              <div>
                <div className="font-medium mb-1">去做题实践</div>
                <div className="text-zinc-400">用模板解决实际问题，巩固所学知识</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
