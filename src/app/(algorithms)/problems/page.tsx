import Link from "next/link";
import { CATEGORIES, DIFFICULTY_CONFIG, FRONTEND_RELEVANCE_CONFIG } from "./types";
import { getStatsByCategory, getStatsByDifficulty, allProblems } from "./data";

export default function ProblemsPage() {
  const categoryStats = getStatsByCategory();
  const difficultyStats = getStatsByDifficulty();
  const totalProblems = allProblems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 - 增强毛玻璃效果 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:inline">首页</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700"/>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm shadow-lg shadow-emerald-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h1 className="text-base sm:text-lg font-bold">算法题库</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/80 text-xs sm:text-sm text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/>
              <span>{totalProblems} 题</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8 pb-safe">
        {/* 统计概览 - 精美渐变卡片 */}
        <div className="mb-6 sm:mb-8 grid grid-cols-4 gap-2 sm:gap-4">
          {/* 总题目 - 特殊渐变 */}
          <div className="rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 p-2.5 sm:p-4 relative overflow-hidden group hover:border-zinc-600/50 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"/>
            <div className="relative">
              <div className="text-lg sm:text-3xl font-bold text-white">{totalProblems}</div>
              <div className="text-xs sm:text-sm text-zinc-400">总题目</div>
            </div>
          </div>
          {/* 简单 */}
          <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-900/20 border border-emerald-500/20 p-2.5 sm:p-4 relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl -translate-y-4 translate-x-4"/>
            <div className="relative">
              <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.easy.color}`}>
                {difficultyStats.easy}
              </div>
              <div className="text-xs sm:text-sm text-emerald-400/70">简单</div>
            </div>
          </div>
          {/* 中等 */}
          <div className="rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-900/20 border border-amber-500/20 p-2.5 sm:p-4 relative overflow-hidden group hover:border-amber-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-full blur-xl -translate-y-4 translate-x-4"/>
            <div className="relative">
              <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.medium.color}`}>
                {difficultyStats.medium}
              </div>
              <div className="text-xs sm:text-sm text-amber-400/70">中等</div>
            </div>
          </div>
          {/* 困难 */}
          <div className="rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-900/20 border border-rose-500/20 p-2.5 sm:p-4 relative overflow-hidden group hover:border-rose-500/40 transition-colors">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-full blur-xl -translate-y-4 translate-x-4"/>
            <div className="relative">
              <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.hard.color}`}>
                {difficultyStats.hard}
              </div>
              <div className="text-xs sm:text-sm text-rose-400/70">困难</div>
            </div>
          </div>
        </div>

        {/* 分类列表 - 增强标题和卡片样式 */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <div className="w-1 h-5 rounded-full bg-gradient-to-b from-emerald-400 to-teal-600"/>
          <h2 className="text-lg sm:text-xl font-bold">题目分类</h2>
          <span className="text-xs text-zinc-500 ml-auto">{CATEGORIES.filter(c => categoryStats[c.id] > 0).length} 个分类</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {CATEGORIES.map((category) => {
            const count = categoryStats[category.id] || 0;
            if (count === 0) return null;

            return (
              <Link
                key={category.id}
                href={`/problems/category/${category.id}`}
                className="group rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-3 sm:p-4 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 active:scale-[0.98] transition-all relative overflow-hidden"
              >
                {/* 悬浮背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"/>

                <div className="relative">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-zinc-800 group-hover:bg-gradient-to-br group-hover:from-emerald-500/20 group-hover:to-teal-500/20 transition-colors text-xl sm:text-2xl">
                      {category.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-sm sm:text-base group-hover:text-emerald-400 transition-colors truncate">
                        {category.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-500">{count} 道题</p>
                    </div>
                    {/* 箭头 */}
                    <svg className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 hidden sm:block">{category.description}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 快速开始 - 精美推荐卡片 */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-400 to-indigo-600"/>
            <h2 className="text-lg sm:text-xl font-bold">快速开始</h2>
            <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">推荐</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link
              href="/problems/two-sum"
              className="group rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-900/20 to-emerald-950/30 border border-emerald-500/30 p-4 sm:p-6 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all relative overflow-hidden"
            >
              {/* 装饰光晕 */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"/>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20">
                    简单
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-500 font-mono">#1</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 group-hover:text-emerald-400 transition-colors">两数之和</h3>
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                  经典入门题目，使用哈希表优化时间复杂度
                </p>
              </div>
            </Link>

            <Link
              href="/problems/merge-sorted-array"
              className="group rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-900/20 to-emerald-950/30 border border-emerald-500/30 p-4 sm:p-6 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98] transition-all relative overflow-hidden"
            >
              {/* 装饰光晕 */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"/>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md text-xs font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20">
                    简单
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-500 font-mono">#88</span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1.5 group-hover:text-emerald-400 transition-colors">合并两个有序数组</h3>
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                  逆向双指针技巧，原地合并数组
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* 所有题目列表 - 移动端使用卡片，桌面端使用表格 */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-1 h-5 rounded-full bg-gradient-to-b from-violet-400 to-purple-600"/>
            <h2 className="text-lg sm:text-xl font-bold">所有题目</h2>
            <span className="text-xs text-zinc-500 ml-auto">{allProblems.length} 道</span>
          </div>

          {/* 移动端卡片列表 - 增强样式 */}
          <div className="sm:hidden space-y-2">
            {allProblems.map((problem, index) => {
              const relevanceConfig = problem.frontendRelevance
                ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
                : null;

              return (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="group block rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-3 active:scale-[0.99] hover:border-zinc-700 transition-all relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-800/0 via-zinc-800/0 to-zinc-800/0 group-active:from-zinc-800/50 group-active:via-zinc-800/30 group-active:to-zinc-800/0 transition-all"/>
                  <div className="relative flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold bg-zinc-800 text-zinc-500">{index + 1}</span>
                        <span className="text-xs text-zinc-500 font-mono">#{problem.leetcodeId || "-"}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-xs font-semibold ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg} border ${problem.difficulty === 'easy' ? 'border-emerald-500/20' : problem.difficulty === 'medium' ? 'border-amber-500/20' : 'border-rose-500/20'}`}
                        >
                          {DIFFICULTY_CONFIG[problem.difficulty].label}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium truncate group-hover:text-emerald-400 transition-colors">{problem.title}</h3>
                    </div>
                    {relevanceConfig && (
                      <span
                        className={`shrink-0 px-1.5 py-0.5 rounded-md text-xs font-medium ${relevanceConfig.color} ${relevanceConfig.bg} border border-current/20`}
                      >
                        {relevanceConfig.icon}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 桌面端表格 - 精美现代风格 */}
          <div className="hidden sm:block rounded-xl border border-zinc-800/80 overflow-hidden bg-zinc-900/50">
            <table className="w-full">
              <thead className="bg-zinc-800/50">
                <tr className="text-left text-sm text-zinc-400">
                  <th className="px-4 py-3.5 font-semibold w-16">#</th>
                  <th className="px-4 py-3.5 font-semibold">题号</th>
                  <th className="px-4 py-3.5 font-semibold">题目</th>
                  <th className="px-4 py-3.5 font-semibold w-24">难度</th>
                  <th className="px-4 py-3.5 font-semibold w-28">前端</th>
                  <th className="px-4 py-3.5 font-semibold hidden md:table-cell">分类</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {allProblems.map((problem, index) => {
                  const relevanceConfig = problem.frontendRelevance
                    ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
                    : null;

                  return (
                    <tr
                      key={problem.id}
                      className="group hover:bg-zinc-800/30 transition-colors"
                    >
                      <td className="px-4 py-3.5 text-zinc-500 text-sm font-medium">
                        {index + 1}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-400 font-mono text-sm">
                        {problem.leetcodeId || "-"}
                      </td>
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="font-medium hover:text-emerald-400 transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg} border ${problem.difficulty === 'easy' ? 'border-emerald-500/20' : problem.difficulty === 'medium' ? 'border-amber-500/20' : 'border-rose-500/20'}`}
                        >
                          {DIFFICULTY_CONFIG[problem.difficulty].label}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {relevanceConfig && (
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${relevanceConfig.color} ${relevanceConfig.bg} border border-current/20`}
                            title={problem.frontendNote || relevanceConfig.description}
                          >
                            <span>{relevanceConfig.icon}</span>
                            <span>{relevanceConfig.label}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-400 text-sm hidden md:table-cell">
                        <span className="flex items-center gap-1.5">
                          <span className="text-base">{CATEGORIES.find((c) => c.id === problem.category)?.icon}</span>
                          {CATEGORIES.find((c) => c.id === problem.category)?.name}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
