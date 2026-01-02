import Link from "next/link";
import { CATEGORIES } from "../types";
import { getProblemsByCategory } from "../data";

export default function CategoriesPage() {
  return (
    <main className="py-6 sm:py-8">
        {/* 说明 */}
        <div className="mb-6 sm:mb-8 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-200 dark:border-violet-500/20 p-4 sm:p-5 shadow-sm dark:shadow-none">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-xl">
              📚
            </div>
            <div>
              <h2 className="font-semibold text-base sm:text-lg mb-1 text-zinc-900 dark:text-white">LeetCode 面试经典 150 题</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                精选 LeetCode 面试高频题目，按算法分类整理，助你系统备战技术面试
              </p>
            </div>
          </div>
        </div>

        {/* 分类卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => {
            const problems = getProblemsByCategory(category.id);
            return (
              <Link
                key={category.id}
                href={`/problems/category/${category.id}`}
                className="group rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 hover:border-violet-300 dark:hover:border-violet-500/30 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-2xl group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">{problems.length} 道题目</span>
                  <span className="text-xs text-violet-500 dark:text-violet-400 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">
                    查看题目 →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 快捷入口 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link
            href="/problems"
            className="group rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-500/20 p-4 hover:border-emerald-300 dark:hover:border-emerald-400/40 transition-all shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xl">
                📋
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  算法题库
                </h3>
                <p className="text-xs text-zinc-500">全部题目列表</p>
              </div>
            </div>
          </Link>
          <Link
            href="/problems/roadmap"
            className="group rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-200 dark:border-blue-500/20 p-4 hover:border-blue-300 dark:hover:border-blue-400/40 transition-all shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xl">
                🎯
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  学习路线
                </h3>
                <p className="text-xs text-zinc-500">前端必刷 50 题</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
  );
}
