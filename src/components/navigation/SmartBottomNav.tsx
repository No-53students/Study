"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import PWALink from "@/components/PWALink";
import {
  isPrimaryPage,
  getSiblings,
  getActiveTab,
  mainTabs,
  getBackPath,
} from "@/lib/mobile-routes";

// 导航图标组件
const NavIcon = ({
  id,
  active,
}: {
  id: string;
  active: boolean;
}) => {
  const size = "w-[22px] h-[22px]";

  switch (id) {
    case "home":
      return (
        <svg
          className={size}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.8}
        >
          {active ? (
            <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10"
            />
          )}
        </svg>
      );
    case "learn":
      return (
        <svg
          className={size}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.8}
        >
          {active ? (
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          )}
        </svg>
      );
    case "practice":
      return (
        <svg
          className={size}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.8}
        >
          {active ? (
            <>
              <rect x="4" y="12" width="4" height="8" rx="1" />
              <rect x="10" y="8" width="4" height="12" rx="1" />
              <rect x="16" y="4" width="4" height="16" rx="1" />
            </>
          ) : (
            <>
              <rect
                x="4"
                y="12"
                width="4"
                height="8"
                rx="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="10"
                y="8"
                width="4"
                height="12"
                rx="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="16"
                y="4"
                width="4"
                height="16"
                rx="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </svg>
      );
    case "profile":
      return (
        <svg
          className={size}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.8}
        >
          {active ? (
            <>
              <circle cx="12" cy="8" r="4" />
              <path d="M20 21a8 8 0 10-16 0" />
            </>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          )}
        </svg>
      );
    default:
      return null;
  }
};

// 颜色配置
const colorConfig: Record<
  string,
  { text: string; bg: string; glow: string; indicator: string }
> = {
  home: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-400/15",
    glow: "shadow-blue-500/20",
    indicator: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  learn: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/15",
    glow: "shadow-cyan-500/20",
    indicator: "bg-gradient-to-r from-cyan-400 to-cyan-600",
  },
  practice: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/15",
    glow: "shadow-emerald-500/20",
    indicator: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
  profile: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/15",
    glow: "shadow-amber-500/20",
    indicator: "bg-gradient-to-r from-amber-400 to-amber-600",
  },
};

export default function SmartBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 判断是否为一级页面
  const isPrimary = useMemo(() => isPrimaryPage(pathname), [pathname]);

  // 获取当前活跃的 Tab
  const activeTabId = useMemo(() => getActiveTab(pathname), [pathname]);
  const activeIndex = useMemo(
    () => mainTabs.findIndex((t) => t.id === activeTabId),
    [activeTabId]
  );

  // 获取同级导航信息
  const siblings = useMemo(() => getSiblings(pathname), [pathname]);

  // 获取返回路径
  const backPath = useMemo(() => getBackPath(pathname), [pathname]);

  if (!mounted) return null;

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden"
      role="navigation"
      aria-label="移动端导航"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/98 to-white/95 dark:from-zinc-900 dark:via-zinc-900/98 dark:to-zinc-900/95 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-700/60 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.3)]" />

      {/* 顶部高光线 */}
      <div
        className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-zinc-600/50 to-transparent"
        aria-hidden="true"
      />

      {isPrimary ? (
        // 模式 A: 主 Tab 导航
        <>
          {/* 滑动指示器 */}
          <div
            className="absolute top-0 h-0.5 w-[calc(25%-1rem)] transition-all duration-300 ease-out"
            style={{
              left: `calc(${activeIndex * 25}% + 0.5rem)`,
            }}
            aria-hidden="true"
          >
            <div
              className={`h-full rounded-full ${
                colorConfig[activeTabId]?.indicator ||
                colorConfig.home.indicator
              } shadow-lg ${
                colorConfig[activeTabId]?.glow || colorConfig.home.glow
              }`}
            />
          </div>

          <div
            className="relative grid grid-cols-4 h-[calc(3.75rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]"
            role="list"
          >
            {mainTabs.map((tab) => {
              const isActive = activeTabId === tab.id;
              const colors = colorConfig[tab.id] || colorConfig.home;

              return (
                <PWALink
                  key={tab.id}
                  href={tab.path}
                  className="flex flex-col items-center justify-center gap-1 relative group active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 rounded-2xl mx-1"
                  role="listitem"
                  aria-label={`${tab.label}${isActive ? ", 当前页面" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* 活跃背景 */}
                  <div
                    className={`absolute inset-x-3 top-1.5 bottom-1.5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? `${colors.bg} shadow-sm ${colors.glow}`
                        : "group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/30"
                    }`}
                    aria-hidden="true"
                  />

                  {/* 图标 */}
                  <div
                    className={`relative z-10 transition-all duration-200 ${
                      isActive
                        ? `${colors.text} scale-110`
                        : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
                    }`}
                    aria-hidden="true"
                  >
                    <NavIcon id={tab.id} active={isActive} />
                    {/* 发光效果 */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 blur-md opacity-40 ${colors.text}`}
                      >
                        <NavIcon id={tab.id} active={isActive} />
                      </div>
                    )}
                  </div>

                  {/* 标签 */}
                  <span
                    className={`relative z-10 text-[11px] font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? colors.text
                        : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                </PWALink>
              );
            })}
          </div>
        </>
      ) : (
        // 模式 B: 上下文导航
        <div className="relative flex items-center h-[calc(3.5rem+env(safe-area-inset-bottom))] px-4 pb-[env(safe-area-inset-bottom)]">
          {/* 返回按钮 */}
          <button
            onClick={() => router.push(backPath)}
            className="flex items-center gap-1 px-3 py-2 -ml-3 rounded-xl active:bg-zinc-100 dark:active:bg-zinc-800 transition-colors"
            aria-label="返回"
          >
            <svg
              className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              返回
            </span>
          </button>

          {/* 当前页面标题 */}
          <div className="flex-1 text-center px-2">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate block">
              {siblings.title}
            </span>
            {siblings.total > 0 && (
              <span className="text-[10px] text-zinc-400">
                {siblings.current} / {siblings.total}
              </span>
            )}
          </div>

          {/* 上/下一个切换 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => siblings.prev && router.push(siblings.prev)}
              disabled={!siblings.prev}
              className={`p-2 rounded-xl transition-colors ${
                siblings.prev
                  ? "active:bg-zinc-100 dark:active:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  : "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
              }`}
              aria-label="上一个"
              aria-disabled={!siblings.prev}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => siblings.next && router.push(siblings.next)}
              disabled={!siblings.next}
              className={`p-2 rounded-xl transition-colors ${
                siblings.next
                  ? "active:bg-zinc-100 dark:active:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  : "text-zinc-300 dark:text-zinc-700 cursor-not-allowed"
              }`}
              aria-label="下一个"
              aria-disabled={!siblings.next}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
