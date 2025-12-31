import Link from "next/link";
import { ROUTE_GROUPS, getAppRoutes } from "@/lib/routes";
import { buildInfo } from "@/lib/build-info";

// 格式化时间
function formatTime(isoString: string) {
  try {
    const date = new Date(isoString);
    return date.toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return isoString;
  }
}

// 分组颜色配置
const groupColors: Record<string, { bg: string; icon: string; border: string; glow: string; text: string }> = {
  hooks: {
    bg: "from-cyan-500/10 to-blue-500/10",
    icon: "from-cyan-500 to-blue-600",
    border: "border-cyan-200/50 dark:border-cyan-800/50",
    glow: "group-hover:shadow-cyan-500/20",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  "react-basics": {
    bg: "from-blue-500/10 to-indigo-500/10",
    icon: "from-blue-500 to-indigo-600",
    border: "border-blue-200/50 dark:border-blue-800/50",
    glow: "group-hover:shadow-blue-500/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  algorithms: {
    bg: "from-emerald-500/10 to-teal-500/10",
    icon: "from-emerald-500 to-teal-600",
    border: "border-emerald-200/50 dark:border-emerald-800/50",
    glow: "group-hover:shadow-emerald-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  interview: {
    bg: "from-amber-500/10 to-orange-500/10",
    icon: "from-amber-500 to-orange-600",
    border: "border-amber-200/50 dark:border-amber-800/50",
    glow: "group-hover:shadow-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
  },
};

export default function Home() {
  const stats = ROUTE_GROUPS.map((group) => ({
    ...group,
    count: getAppRoutes(group.name).length,
  }));

  const totalRoutes = stats.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 pb-safe min-h-screen">
      {/* 顶部欢迎区域 - 带渐变装饰 */}
      <div className="mb-8 sm:mb-10 relative">
        {/* 背景装饰 */}
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"/>
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl"/>

        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-blue-500/25">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="-11 -11 22 22">
                <circle r="2" fill="currentColor"/>
                <g stroke="currentColor" fill="none" strokeWidth="1">
                  <ellipse rx="10" ry="4.5"/>
                  <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                  <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
                </g>
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white">
                React 开发教程
              </h1>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
                Next.js 16 + React 19 + React Compiler
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            系统化学习 React 核心概念、Hooks 使用方法、算法面试题解析
          </p>
        </div>
      </div>

      {/* 统计卡片 - 精美设计 */}
      <div className="mb-8 sm:mb-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
        {/* 总教程数 - 特殊样式 */}
        <div className="col-span-2 lg:col-span-1 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-4 sm:p-5 shadow-lg shadow-blue-500/20 relative overflow-hidden">
          {/* 装饰图案 */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl translate-x-6 -translate-y-6"/>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full blur-lg -translate-x-4 translate-y-4"/>

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm text-white text-xl">
                📚
              </div>
              <div>
                <p className="text-xs sm:text-sm text-white/80">总教程数</p>
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  {totalRoutes}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 其他统计卡片 */}
        {stats.map((stat) => {
          const colors = groupColors[stat.name] || groupColors.hooks;
          return (
            <div
              key={stat.name}
              className={`rounded-2xl border bg-gradient-to-br ${colors.bg} ${colors.border} p-4 sm:p-5 transition-all hover:shadow-lg hover:-translate-y-0.5 dark:bg-zinc-900/50`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-gradient-to-br ${colors.icon} text-white text-xl shadow-md`}>
                  {stat.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 truncate">
                    {stat.title}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                    {stat.count}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 快速入口 - 更精致的卡片设计 */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-gradient-to-b from-blue-500 to-indigo-600"/>
            快速开始
          </h2>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            选择学习模块
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTE_GROUPS.map((group, index) => {
            const colors = groupColors[group.name] || groupColors.hooks;
            return (
              <Link
                key={group.name}
                href={group.path}
                className={`group relative rounded-2xl border bg-white p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-[0.98] dark:bg-zinc-900/80 ${colors.border} ${colors.glow}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 悬浮渐变背景 */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}/>

                {/* 内容 */}
                <div className="relative">
                  <div className={`mb-3 sm:mb-4 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${colors.icon} text-2xl sm:text-3xl text-white shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    {group.icon}
                  </div>
                  <h3 className="font-bold text-zinc-900 dark:text-white text-base sm:text-lg mb-1">
                    {group.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                    {group.subtitle}
                  </p>
                  <div className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.text} group-hover:gap-2.5 transition-all duration-300`}>
                    查看全部
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 说明卡片 - 更现代的设计 */}
      <div className="mb-8 sm:mb-10 rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-zinc-50 to-white p-5 sm:p-6 dark:border-zinc-800/80 dark:from-zinc-900 dark:to-zinc-900/50 relative overflow-hidden">
        {/* 装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full"/>

        <div className="relative">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 shrink-0">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-zinc-900 dark:text-white mb-2">
                如何添加新页面？
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                在{" "}
                <code className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs sm:text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">
                  src/app/(分组名)
                </code>{" "}
                目录下创建新文件夹，并添加{" "}
                <code className="inline-flex items-center rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs sm:text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50">
                  page.tsx
                </code>{" "}
                文件即可自动显示在对应分组的侧边栏中。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 构建信息 - 精致现代风格 */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 dark:border-zinc-800/80 dark:bg-zinc-900/80 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-emerald-500/5 via-blue-500/5 to-transparent rounded-full blur-2xl"/>

        <div className="relative">
          <h2 className="mb-4 sm:mb-5 font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm shadow-md">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            部署信息
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-sm shrink-0">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Commit</p>
                <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {buildInfo.commitShort}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm shrink-0">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">分支</p>
                <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {buildInfo.branch}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-700/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-sm shrink-0">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">构建时间</p>
                <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-white truncate">
                  {formatTime(buildInfo.buildTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
