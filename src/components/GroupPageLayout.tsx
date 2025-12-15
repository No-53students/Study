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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-8 bg-white px-8 py-16 dark:bg-black sm:px-16">
        {/* 返回链接 */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <span>←</span>
          <span>{backLabel}</span>
        </Link>

        {/* Header */}
        <div className="flex items-center gap-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
              {title}
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">{subtitle}</p>
          </div>
          <span className="ml-auto rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {routes.length} 个
          </span>
        </div>

        {/* 路由列表 */}
        <div className="space-y-8">
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
    <div className={`border-l-4 pl-4 ${colorClasses[color]}`}>
      <div className="mb-3">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
        {subtitle && <p className="text-sm text-zinc-500">{subtitle}</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {routes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className="group flex items-center justify-between rounded-lg border border-zinc-200 p-3 transition-all hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
          >
            <div className="flex flex-col">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {route.displayName}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {route.path}
              </span>
            </div>
            {route.difficulty && (
              <span
                className={`ml-2 shrink-0 rounded px-2 py-0.5 text-xs font-medium ${DIFFICULTY_CONFIG[route.difficulty].className}`}
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
