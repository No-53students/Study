import Link from "next/link";
import {
  RouteInfo,
  DifficultyLevel,
  ModuleType,
  MODULE_CONFIG,
  groupRoutesByModule,
} from "@/lib/routes";

interface RouteListProps {
  routes: RouteInfo[];
}

/**
 * 难度标签配置
 */
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

/**
 * 路由列表组件
 * 展示所有可用的路由入口，按模块分组
 */
export function RouteList({ routes }: RouteListProps) {
  if (routes.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        暂无路由，在 src/app 目录下创建新文件夹和 page.tsx 即可自动显示
      </p>
    );
  }

  const grouped = groupRoutesByModule(routes);
  const moduleOrder: ModuleType[] = ["hooks", "components", "patterns", "other"];

  return (
    <div className="space-y-10">
      {moduleOrder.map((moduleType) => {
        const moduleRoutes = grouped[moduleType];
        if (moduleRoutes.length === 0) return null;

        const config = MODULE_CONFIG[moduleType];

        return (
          <ModuleSection
            key={moduleType}
            title={config.title}
            subtitle={config.subtitle}
            icon={config.icon}
            routes={moduleRoutes}
          />
        );
      })}
    </div>
  );
}

function ModuleSection({
  title,
  subtitle,
  icon,
  routes,
}: {
  title: string;
  subtitle: string;
  icon: string;
  routes: RouteInfo[];
}) {
  // 按难度分组
  const beginnerRoutes = routes.filter((r) => r.difficulty === "beginner");
  const intermediateRoutes = routes.filter(
    (r) => r.difficulty === "intermediate"
  );
  const advancedRoutes = routes.filter((r) => r.difficulty === "advanced");
  const otherRoutes = routes.filter((r) => !r.difficulty);

  return (
    <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-700">
      {/* 模块标题 */}
      <div className="mb-6 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
        <span className="ml-auto rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {routes.length} 个
        </span>
      </div>

      {/* 难度分组 */}
      <div className="space-y-6">
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
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
