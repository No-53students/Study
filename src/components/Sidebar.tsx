"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface RouteInfo {
  path: string;
  name: string;
  displayName: string;
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

export default function Sidebar({ groups }: SidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    groups.map((g) => g.name) // 默认全部展开
  );

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((n) => n !== groupName)
        : [...prev, groupName]
    );
  };

  const isActive = (path: string) => pathname === path;
  const isGroupActive = (group: RouteGroup) =>
    pathname.startsWith(group.path) || group.routes.some((r) => pathname === r.path);

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-zinc-200 px-6 dark:border-zinc-800">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            R
          </div>
          <span className="text-lg font-semibold text-zinc-900 dark:text-white">
            React 教程
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
        <ul className="space-y-1">
          {/* 首页 */}
          <li>
            <Link
              href="/"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                  : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <span className="text-lg">🏠</span>
              <span>首页</span>
            </Link>
          </li>

          {/* 分组菜单 */}
          {groups.map((group) => (
            <li key={group.name}>
              {/* 一级目录 */}
              <button
                onClick={() => toggleGroup(group.name)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  isGroupActive(group)
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{group.icon}</span>
                  <span>{group.title}</span>
                </div>
                <svg
                  className={`h-4 w-4 transition-transform ${
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

              {/* 二级目录 */}
              {expandedGroups.includes(group.name) && group.routes.length > 0 && (
                <ul className="mt-1 ml-4 space-y-1 border-l border-zinc-200 pl-4 dark:border-zinc-700">
                  {group.routes.map((route) => (
                    <li key={route.path}>
                      <Link
                        href={route.path}
                        className={`block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                          isActive(route.path)
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-white"
                        }`}
                      >
                        {route.displayName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
