"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useMemo } from "react";

type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface RouteInfo {
  path: string;
  name: string;
  displayName: string;
  difficulty?: DifficultyLevel;
}

interface RouteGroup {
  name: string;
  title: string;
  icon: string;
  path: string;
  routes: RouteInfo[];
}

interface SidebarProps {
  groups: RouteGroup[];
}

// 难度分组配置
const DIFFICULTY_CONFIG: Record<DifficultyLevel, { label: string; color: string }> = {
  beginner: { label: "入门", color: "text-green-600 dark:text-green-400" },
  intermediate: { label: "进阶", color: "text-amber-600 dark:text-amber-400" },
  advanced: { label: "高级", color: "text-rose-600 dark:text-rose-400" },
};

// 按难度分组的路由列表
function DifficultyGroupedRoutes({ routes, pathname }: { routes: RouteInfo[]; pathname: string }) {
  const groupedRoutes = useMemo(() => {
    const groups: Record<DifficultyLevel | "other", RouteInfo[]> = {
      beginner: [],
      intermediate: [],
      advanced: [],
      other: [],
    };

    routes.forEach((route) => {
      const key = route.difficulty || "other";
      groups[key].push(route);
    });

    return groups;
  }, [routes]);

  const isActive = (path: string) => pathname === path;

  // 简化显示名称
  const getShortName = (displayName: string) => {
    // 移除括号内的英文注释，如 "栈 (Stack)" -> "栈"
    return displayName.replace(/\s*\([^)]+\)$/, "");
  };

  return (
    <div className="mt-1 ml-2.5 border-l border-zinc-200 pl-2.5 dark:border-zinc-700">
      {(["beginner", "intermediate", "advanced", "other"] as const).map((difficulty) => {
        const routeList = groupedRoutes[difficulty];
        if (routeList.length === 0) return null;

        const config = difficulty !== "other" ? DIFFICULTY_CONFIG[difficulty] : null;

        return (
          <div key={difficulty} className="mb-1.5 last:mb-0">
            {config && (
              <div className={`px-2 py-0.5 text-[10px] font-medium ${config.color}`}>
                {config.label}
              </div>
            )}
            <ul className="space-y-px">
              {routeList.map((route) => (
                <li key={route.path}>
                  <Link
                    href={route.path}
                    className={`block rounded px-2 py-1 text-[13px] transition-colors truncate ${
                      isActive(route.path)
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
                    }`}
                    title={route.displayName}
                  >
                    {getShortName(route.displayName)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    groups.map((g) => g.name) // 默认全部展开
  );
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 同步侧边栏折叠状态到 body class
  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
    return () => {
      document.body.classList.remove("sidebar-collapsed");
    };
  }, [isCollapsed]);

  const toggleGroup = useCallback((groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((n) => n !== groupName)
        : [...prev, groupName]
    );
  }, []);

  const isGroupActive = (group: RouteGroup) =>
    pathname.startsWith(group.path) || group.routes.some((r) => pathname === r.path);

  return (
    <>
      {/* 桌面端折叠按钮 */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-4 z-50 hidden h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 lg:flex ${
          isCollapsed ? "left-4" : "left-[calc(var(--sidebar-width)-1rem)]"
        }`}
        aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
      >
        <svg
          className={`h-4 w-4 text-zinc-600 transition-transform duration-300 dark:text-zinc-400 ${
            isCollapsed ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* 侧边栏 - 仅桌面端显示 */}
      <aside
        className={`fixed left-0 top-0 z-40 hidden h-[100dvh] w-64 border-r border-zinc-200 bg-white transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-900 lg:block ${
          isCollapsed ? "lg:-translate-x-full" : "lg:w-[var(--sidebar-width)] lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-sm text-white font-bold">
              R
            </div>
            <span className="text-base font-semibold text-zinc-900 dark:text-white">
              React 教程
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="h-[calc(100dvh-3.5rem)] overflow-y-auto overscroll-contain p-3 pb-4">
          <ul className="space-y-0.5">
            {/* 首页 */}
            <li>
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <span className="text-base">🏠</span>
                <span>首页</span>
              </Link>
            </li>

            {/* 分组菜单 */}
            {groups.map((group) => (
              <li key={group.name}>
                {/* 一级目录 */}
                <button
                  onClick={() => toggleGroup(group.name)}
                  className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                    isGroupActive(group)
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{group.icon}</span>
                    <span>{group.title}</span>
                  </div>
                  <svg
                    className={`h-3.5 w-3.5 transition-transform ${
                      expandedGroups.includes(group.name) ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                {/* 二级目录 - 按难度分组 */}
                {expandedGroups.includes(group.name) && group.routes.length > 0 && (
                  <DifficultyGroupedRoutes routes={group.routes} pathname={pathname} />
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
