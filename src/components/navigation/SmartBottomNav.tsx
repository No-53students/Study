"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import PWALink from "@/components/PWALink";
import {
  getActiveTab,
  mainTabs,
  shouldHideBottomNav,
} from "@/lib/mobile-routes";

// 导航图标组件 - 与 Web 端 SidebarNav 保持一致
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
    case "react":
      return (
        <svg className={size} viewBox="-11 -11 22 22">
          <circle r="2.2" fill="currentColor" />
          <g stroke="currentColor" fill="none" strokeWidth={active ? 1.2 : 1}>
            <ellipse rx="10" ry="4.5" />
            <ellipse rx="10" ry="4.5" transform="rotate(60)" />
            <ellipse rx="10" ry="4.5" transform="rotate(120)" />
          </g>
        </svg>
      );
    case "algorithms":
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
    case "tools":
      return (
        <svg
          className={size}
          viewBox="0 0 24 24"
          fill={active ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={active ? 0 : 1.8}
        >
          {active ? (
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            />
          )}
        </svg>
      );
    default:
      return null;
  }
};

// 颜色配置 - 与 Web 端保持一致
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
  react: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/15",
    glow: "shadow-cyan-500/20",
    indicator: "bg-gradient-to-r from-cyan-400 to-cyan-600",
  },
  algorithms: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/15",
    glow: "shadow-emerald-500/20",
    indicator: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
  tools: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/15",
    glow: "shadow-amber-500/20",
    indicator: "bg-gradient-to-r from-amber-400 to-amber-600",
  },
};

export default function SmartBottomNav() {
  const pathname = usePathname();

  // 获取当前活跃的 Tab
  const activeTabId = useMemo(() => getActiveTab(pathname), [pathname]);
  const activeIndex = useMemo(
    () => mainTabs.findIndex((t) => t.id === activeTabId),
    [activeTabId]
  );

  // 详情页隐藏底部导航
  const hideNav = useMemo(() => shouldHideBottomNav(pathname), [pathname]);

  if (hideNav) return null;

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
            colorConfig[activeTabId]?.indicator || colorConfig.home.indicator
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
    </nav>
  );
}
