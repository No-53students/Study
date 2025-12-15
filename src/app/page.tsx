import Link from "next/link";
import { ROUTE_GROUPS, getAppRoutes } from "@/lib/routes";

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
    </div>
  );
}
