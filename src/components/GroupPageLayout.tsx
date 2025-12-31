import Link from "next/link";
import {
  RouteInfo,
  DifficultyLevel,
} from "@/lib/routes";

interface GroupPageLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  routes: RouteInfo[];
  backHref: string;
  backLabel: string;
}

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; className: string; icon: string; bg: string }
> = {
  beginner: {
    label: "入门",
    className: "text-emerald-600 dark:text-emerald-400",
    icon: "from-emerald-500 to-teal-600",
    bg: "from-emerald-500/5 to-teal-500/5",
  },
  intermediate: {
    label: "中级",
    className: "text-amber-600 dark:text-amber-400",
    icon: "from-amber-500 to-orange-600",
    bg: "from-amber-500/5 to-orange-500/5",
  },
  advanced: {
    label: "高级",
    className: "text-rose-600 dark:text-rose-400",
    icon: "from-rose-500 to-red-600",
    bg: "from-rose-500/5 to-red-500/5",
  },
};

export function GroupPageLayout({
  title,
  subtitle,
  icon,
  routes,
  backHref,
  backLabel,
}: GroupPageLayoutProps) {
  // 按难度分组
  const beginnerRoutes = routes.filter((r) => r.difficulty === "beginner");
  const intermediateRoutes = routes.filter((r) => r.difficulty === "intermediate");
  const advancedRoutes = routes.filter((r) => r.difficulty === "advanced");
  const otherRoutes = routes.filter((r) => !r.difficulty);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <main className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12 pb-safe">
        {/* 返回链接 - 带动画 */}
        <Link
          href={backHref}
          className="group inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors mb-6 sm:mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
          aria-label={`返回${backLabel}`}
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
          </svg>
          <span>{backLabel}</span>
        </Link>

        {/* Header - 精美卡片设计 */}
        <header className="relative mb-8 sm:mb-10 p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm overflow-hidden">
          {/* 背景装饰 */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-2xl" aria-hidden="true"/>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-2xl" aria-hidden="true"/>

          <div className="relative flex items-center gap-4">
            {/* 图标容器 */}
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-3xl sm:text-4xl shadow-lg shadow-blue-500/20 transform hover:scale-105 hover:rotate-3 transition-transform" aria-hidden="true">
              {icon}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 truncate">
                {title}
              </h1>
              <p className="mt-1 text-sm sm:text-base text-zinc-500 dark:text-zinc-400 truncate">
                {subtitle}
              </p>
            </div>

            {/* 计数徽章 */}
            <div className="shrink-0 flex flex-col items-center p-3 rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50">
              <span className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white" aria-label={`共${routes.length}个教程`}>
                {routes.length}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">教程</span>
            </div>
          </div>
        </header>

        {/* 进度统计条 */}
        <nav className="mb-6 sm:mb-8 flex gap-2 sm:gap-3 overflow-x-auto pb-2" aria-label="难度级别统计">
          {beginnerRoutes.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-800/50 shrink-0">
              <div className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true"/>
              <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">入门 {beginnerRoutes.length}</span>
            </div>
          )}
          {intermediateRoutes.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/50 shrink-0">
              <div className="w-2 h-2 rounded-full bg-amber-500" aria-hidden="true"/>
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">中级 {intermediateRoutes.length}</span>
            </div>
          )}
          {advancedRoutes.length > 0 && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200/50 dark:border-rose-800/50 shrink-0">
              <div className="w-2 h-2 rounded-full bg-rose-500" aria-hidden="true"/>
              <span className="text-xs font-medium text-rose-700 dark:text-rose-400">高级 {advancedRoutes.length}</span>
            </div>
          )}
        </nav>

        {/* 路由列表 */}
        <div className="space-y-8 sm:space-y-10">
          {beginnerRoutes.length > 0 && (
            <DifficultyGroup
              title="入门级"
              subtitle="基础概念，建议先学"
              routes={beginnerRoutes}
              difficulty="beginner"
            />
          )}
          {intermediateRoutes.length > 0 && (
            <DifficultyGroup
              title="中级"
              subtitle="进阶技巧与优化"
              routes={intermediateRoutes}
              difficulty="intermediate"
            />
          )}
          {advancedRoutes.length > 0 && (
            <DifficultyGroup
              title="高级"
              subtitle="复杂场景与设计模式"
              routes={advancedRoutes}
              difficulty="advanced"
            />
          )}
          {otherRoutes.length > 0 && (
            <DifficultyGroup
              title="其他"
              subtitle=""
              routes={otherRoutes}
              difficulty={null}
            />
          )}
        </div>
      </main>
    </div>
  );
}

function DifficultyGroup({
  title,
  subtitle,
  routes,
  difficulty,
}: {
  title: string;
  subtitle: string;
  routes: RouteInfo[];
  difficulty: DifficultyLevel | null;
}) {
  const config = difficulty ? DIFFICULTY_CONFIG[difficulty] : null;

  return (
    <section aria-labelledby={`section-${difficulty || 'other'}`}>
      {/* 分组标题 */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${config?.icon || "from-zinc-400 to-zinc-500"} text-white shadow-md`} aria-hidden="true">
          {difficulty === "beginner" && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          )}
          {difficulty === "intermediate" && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          )}
          {difficulty === "advanced" && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          )}
          {!difficulty && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </div>
        <div>
          <h2 id={`section-${difficulty || 'other'}`} className={`font-bold text-base sm:text-lg ${config?.className || "text-zinc-600 dark:text-zinc-400"}`}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
          )}
        </div>
      </div>

      {/* 路由卡片网格 */}
      <ul className="grid gap-3 sm:gap-4 sm:grid-cols-2" role="list">
        {routes.map((route, index) => (
          <li key={route.path} role="listitem">
            <Link
              href={route.path}
              className={`group relative flex flex-col rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] overflow-hidden bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* 悬浮渐变背景 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${config?.bg || "from-zinc-500/5 to-zinc-500/5"} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} aria-hidden="true"/>

              <div className="relative flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    {/* 序号 */}
                    <span className="flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400" aria-hidden="true">
                      {index + 1}
                    </span>
                    {/* 难度标签 */}
                    {route.difficulty && (
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${config?.className} bg-current/10`}>
                        {DIFFICULTY_CONFIG[route.difficulty].label}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {route.displayName}
                  </h3>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5 font-mono">
                    {route.path}
                  </p>
                </div>

                {/* 箭头图标 */}
                <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                  <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
