import Link from "next/link";

// 题库分类数据
const problemCategories = [
  { id: "array-string", name: "数组 / 字符串", icon: "📝", file: "数组-字符串.js" },
  { id: "two-pointers", name: "双指针", icon: "👆", file: "双指针.js" },
  { id: "sliding-window", name: "滑动窗口", icon: "🪟", file: "滑动窗口.js" },
  { id: "matrix", name: "矩阵", icon: "🔢", file: "矩阵.js" },
  { id: "hash-table", name: "哈希表", icon: "#️⃣", file: "哈希表.js" },
];

export default function ProblemBankPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/problems"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
              </svg>
              <span className="hidden sm:inline">返回题库</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700"/>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm shadow-lg shadow-violet-500/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <h1 className="text-base sm:text-lg font-bold">LeetCode 题库</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-6 sm:py-8">
        {/* 说明 */}
        <div className="mb-6 sm:mb-8 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-500/20 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-xl">
              📚
            </div>
            <div>
              <h2 className="font-semibold text-base sm:text-lg mb-1">LeetCode 面试经典 150 题</h2>
              <p className="text-sm text-zinc-400">
                精选 LeetCode 面试高频题目，按算法分类整理，助你系统备战技术面试
              </p>
            </div>
          </div>
        </div>

        {/* 分类卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {problemCategories.map((category) => (
            <div
              key={category.id}
              className="group rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 sm:p-5 hover:border-violet-500/30 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-2xl group-hover:bg-violet-500/20 transition-colors">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base group-hover:text-violet-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-zinc-500">{category.file}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">数据文件</span>
                <Link
                  href={`/problems/category/${category.id}`}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  查看题目 →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 快捷入口 */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <Link
            href="/problems"
            className="group rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4 hover:border-emerald-400/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xl">
                📋
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-emerald-400 transition-colors">
                  算法题库
                </h3>
                <p className="text-xs text-zinc-500">全部题目列表</p>
              </div>
            </div>
          </Link>
          <Link
            href="/problems/roadmap"
            className="group rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-4 hover:border-blue-400/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-xl">
                🎯
              </div>
              <div>
                <h3 className="font-semibold text-sm group-hover:text-blue-400 transition-colors">
                  学习路线
                </h3>
                <p className="text-xs text-zinc-500">前端必刷 50 题</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
