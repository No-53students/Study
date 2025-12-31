import Link from "next/link";
import { CATEGORIES, DIFFICULTY_CONFIG, FRONTEND_RELEVANCE_CONFIG } from "./types";
import { getStatsByCategory, getStatsByDifficulty, allProblems } from "./data";

export default function ProblemsPage() {
  const categoryStats = getStatsByCategory();
  const difficultyStats = getStatsByDifficulty();
  const totalProblems = allProblems.length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              ← 首页
            </Link>
            <h1 className="text-base sm:text-lg font-semibold">算法题库</h1>
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-400">
            <span>共 {totalProblems} 道题目</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8 pb-safe">
        {/* 统计概览 */}
        <div className="mb-6 sm:mb-8 grid grid-cols-4 gap-2 sm:gap-4">
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 sm:p-4">
            <div className="text-lg sm:text-3xl font-bold text-white">{totalProblems}</div>
            <div className="text-xs sm:text-sm text-zinc-400">总题目</div>
          </div>
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 sm:p-4">
            <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.easy.color}`}>
              {difficultyStats.easy}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400">简单</div>
          </div>
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 sm:p-4">
            <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.medium.color}`}>
              {difficultyStats.medium}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400">中等</div>
          </div>
          <div className="rounded-lg bg-zinc-900 border border-zinc-800 p-2.5 sm:p-4">
            <div className={`text-lg sm:text-3xl font-bold ${DIFFICULTY_CONFIG.hard.color}`}>
              {difficultyStats.hard}
            </div>
            <div className="text-xs sm:text-sm text-zinc-400">困难</div>
          </div>
        </div>

        {/* 分类列表 */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">题目分类</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {CATEGORIES.map((category) => {
            const count = categoryStats[category.id] || 0;
            if (count === 0) return null;

            return (
              <Link
                key={category.id}
                href={`/problems/category/${category.id}`}
                className="group rounded-lg bg-zinc-900 border border-zinc-800 p-3 sm:p-4 hover:border-zinc-600 active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm sm:text-base group-hover:text-green-400 transition-colors truncate">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500">{count} 道题</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 hidden sm:block">{category.description}</p>
              </Link>
            );
          })}
        </div>

        {/* 快速开始 */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">快速开始</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <Link
              href="/problems/two-sum"
              className="rounded-lg bg-gradient-to-r from-green-900/50 to-green-800/30 border border-green-700/50 p-4 sm:p-6 hover:border-green-500/50 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/10">
                  简单
                </span>
                <span className="text-xs sm:text-sm text-zinc-400">#1</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-1">两数之和</h3>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                经典入门题目，使用哈希表优化时间复杂度
              </p>
            </Link>

            <Link
              href="/problems/merge-sorted-array"
              className="rounded-lg bg-gradient-to-r from-green-900/50 to-green-800/30 border border-green-700/50 p-4 sm:p-6 hover:border-green-500/50 active:scale-[0.98] transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-xs font-medium text-green-400 bg-green-500/10">
                  简单
                </span>
                <span className="text-xs sm:text-sm text-zinc-400">#88</span>
              </div>
              <h3 className="text-base sm:text-lg font-medium mb-1">合并两个有序数组</h3>
              <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2">
                逆向双指针技巧，原地合并数组
              </p>
            </Link>
          </div>
        </div>

        {/* 所有题目列表 - 移动端使用卡片，桌面端使用表格 */}
        <div className="mt-8 sm:mt-12">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">所有题目</h2>

          {/* 移动端卡片列表 */}
          <div className="sm:hidden space-y-2">
            {allProblems.map((problem) => {
              const relevanceConfig = problem.frontendRelevance
                ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
                : null;

              return (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.id}`}
                  className="block rounded-lg bg-zinc-900 border border-zinc-800 p-3 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-zinc-500">#{problem.leetcodeId || "-"}</span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg}`}
                        >
                          {DIFFICULTY_CONFIG[problem.difficulty].label}
                        </span>
                      </div>
                      <h3 className="text-sm font-medium truncate">{problem.title}</h3>
                    </div>
                    {relevanceConfig && (
                      <span
                        className={`shrink-0 px-1.5 py-0.5 rounded text-xs ${relevanceConfig.color} ${relevanceConfig.bg}`}
                      >
                        {relevanceConfig.icon}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 桌面端表格 */}
          <div className="hidden sm:block rounded-lg border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-zinc-900">
                <tr className="text-left text-sm text-zinc-400">
                  <th className="px-4 py-3 font-medium">题号</th>
                  <th className="px-4 py-3 font-medium">题目</th>
                  <th className="px-4 py-3 font-medium">难度</th>
                  <th className="px-4 py-3 font-medium">前端</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">分类</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {allProblems.map((problem) => {
                  const relevanceConfig = problem.frontendRelevance
                    ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
                    : null;

                  return (
                    <tr
                      key={problem.id}
                      className="hover:bg-zinc-900/50 transition-colors"
                    >
                      <td className="px-4 py-3 text-zinc-400">
                        {problem.leetcodeId || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/problems/${problem.id}`}
                          className="hover:text-green-400 transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${DIFFICULTY_CONFIG[problem.difficulty].color} ${DIFFICULTY_CONFIG[problem.difficulty].bg}`}
                        >
                          {DIFFICULTY_CONFIG[problem.difficulty].label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {relevanceConfig && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${relevanceConfig.color} ${relevanceConfig.bg}`}
                            title={problem.frontendNote || relevanceConfig.description}
                          >
                            <span>{relevanceConfig.icon}</span>
                            <span>{relevanceConfig.label}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-zinc-400 hidden md:table-cell">
                        {CATEGORIES.find((c) => c.id === problem.category)?.name}
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
