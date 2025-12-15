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

export default function Home() {
  const stats = ROUTE_GROUPS.map((group) => ({
    ...group,
    count: getAppRoutes(group.name).length,
  }));

  const totalRoutes = stats.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="p-8">
      {/* 顶部欢迎区域 */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          欢迎使用 React 开发教程
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Next.js 16 + React 19 + React Compiler
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl dark:bg-blue-900/30">
              📚
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">总教程数</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {totalRoutes}
              </p>
            </div>
          </div>
        </div>

        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-2xl dark:bg-zinc-800">
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {stat.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 快速入口 */}
      <div className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
          快速开始
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROUTE_GROUPS.map((group) => (
            <Link
              key={group.name}
              href={group.path}
              className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-700"
            >
              <div className="mb-3 text-3xl">{group.icon}</div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {group.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {group.subtitle}
              </p>
              <div className="mt-4 text-sm text-blue-600 group-hover:underline dark:text-blue-400">
                查看全部 →
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 说明 */}
      <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-3 font-semibold text-zinc-900 dark:text-white">
          如何添加新页面？
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          在{" "}
          <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm dark:bg-zinc-800">
            src/app/(分组名)
          </code>{" "}
          目录下创建新文件夹，并添加{" "}
          <code className="rounded bg-zinc-100 px-2 py-1 font-mono text-sm dark:bg-zinc-800">
            page.tsx
          </code>{" "}
          文件即可自动显示在对应分组的侧边栏中。
        </p>
      </div>

      {/* 构建信息 */}
      <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <span className="text-lg">🚀</span>
          部署信息
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
              <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Commit</p>
              <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                {buildInfo.commitShort}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">分支</p>
              <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                {buildInfo.branch}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">构建时间</p>
              <p className="font-mono text-sm font-medium text-zinc-900 dark:text-white">
                {formatTime(buildInfo.buildTime)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
