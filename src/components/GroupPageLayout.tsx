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
  { label: string; className: string }
> = {
  beginner: {
    label: "入门",
    className:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  intermediate: {
    label: "中级",
    className:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  advanced: {
    label: "高级",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
    <div className="flex min-h-screen items-start sm:items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-4 sm:gap-8 bg-white px-4 py-6 sm:px-8 lg:px-16 sm:py-16 pb-safe dark:bg-black">
        {/* 返回链接 */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <span>←</span>
          <span>{backLabel}</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-3xl sm:text-4xl">{icon}</span>
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-black dark:text-zinc-50 truncate">
              {title}
            </h1>
            <p className="mt-0.5 sm:mt-1 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 truncate">{subtitle}</p>
          </div>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {routes.length} 个
          </span>
        </div>

        {/* 路由列表 */}
        <div className="space-y-6 sm:space-y-8">
          {beginnerRoutes.length > 0 && (
            <DifficultyGroup
              title="入门级"
              subtitle="基础概念，建议先学"
              routes={beginnerRoutes}
              color="green"
            />
          )}
          {intermediateRoutes.length > 0 && (
            <DifficultyGroup
              title="中级"
              subtitle="进阶技巧与优化"
              routes={intermediateRoutes}
              color="yellow"
            />
          )}
          {advancedRoutes.length > 0 && (
            <DifficultyGroup
              title="高级"
              subtitle="复杂场景与设计模式"
              routes={advancedRoutes}
              color="red"
            />
          )}
          {otherRoutes.length > 0 && (
            <DifficultyGroup
              title="其他"
              subtitle=""
              routes={otherRoutes}
              color="gray"
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
  color,
}: {
  title: string;
  subtitle: string;
  routes: RouteInfo[];
  color: "green" | "yellow" | "red" | "gray";
}) {
  const colorClasses = {
    green: "border-l-green-500",
    yellow: "border-l-yellow-500",
    red: "border-l-red-500",
    gray: "border-l-zinc-400",
  };

  return (
    <div className={`border-l-4 pl-3 sm:pl-4 ${colorClasses[color]}`}>
      <div className="mb-2 sm:mb-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        {subtitle && <p className="text-xs sm:text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div className="grid gap-2 sm:gap-3 sm:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="group flex items-center justify-between rounded-lg border border-zinc-200 p-2.5 sm:p-3 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
          >
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">
                {route.displayName}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {route.path}
              </span>
            </div>
            {route.difficulty && (
              <span
                className={`ml-2 shrink-0 rounded px-1.5 sm:px-2 py-0.5 text-xs font-medium ${DIFFICULTY_CONFIG[route.difficulty].className}`}
              >
                {DIFFICULTY_CONFIG[route.difficulty].label}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
