"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
  path: string;
  matchPaths?: string[];
  color: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "首页", path: "/", color: "blue" },
  { id: "react", label: "React", path: "/react-basics", matchPaths: ["/react-basics", "/hooks", "/use-"], color: "cyan" },
  { id: "algorithms", label: "算法", path: "/algorithms", matchPaths: ["/algorithms", "/problems", "/interview"], color: "emerald" },
  { id: "tools", label: "工具", path: "/tools", color: "amber" },
];

// 分类颜色配置
const colorConfig: Record<string, { text: string; bg: string; glow: string; indicator: string }> = {
  blue: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-400/15",
    glow: "shadow-blue-500/20",
    indicator: "bg-gradient-to-r from-blue-400 to-blue-600",
  },
  cyan: {
    text: "text-cyan-600 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/15",
    glow: "shadow-cyan-500/20",
    indicator: "bg-gradient-to-r from-cyan-400 to-cyan-600",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/15",
    glow: "shadow-emerald-500/20",
    indicator: "bg-gradient-to-r from-emerald-400 to-emerald-600",
  },
  amber: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10 dark:bg-amber-400/15",
    glow: "shadow-amber-500/20",
    indicator: "bg-gradient-to-r from-amber-400 to-amber-600",
  },
};

// 清晰直观的图标
const NavIcon = ({ id, active }: { id: string; active: boolean }) => {
  const size = "w-[22px] h-[22px]";

  switch (id) {
    case "home":
      return (
        <svg className={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          {active ? (
            <path d="M12 2.1L1 12h3v9h6v-6h4v6h6v-9h3L12 2.1z"/>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10"/>
          )}
        </svg>
      );
    case "react":
      return (
        <svg className={size} viewBox="-11 -11 22 22">
          <circle r="2.2" fill="currentColor"/>
          <g stroke="currentColor" fill="none" strokeWidth={active ? 1.3 : 1}>
            <ellipse rx="10" ry="4.5"/>
            <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
            <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case "algorithms":
      return (
        <svg className={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          {active ? (
            <>
              <rect x="4" y="12" width="4" height="8" rx="1"/>
              <rect x="10" y="8" width="4" height="12" rx="1"/>
              <rect x="16" y="4" width="4" height="16" rx="1"/>
            </>
          ) : (
            <>
              <rect x="4" y="12" width="4" height="8" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="10" y="8" width="4" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="16" y="4" width="4" height="16" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
        </svg>
      );
    case "tools":
      return (
        <svg className={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          {active ? (
            <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9l-4.3-4.3c-1.1 2.4-.7 5.4 1.3 7.4 1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.4-.4.4-1 0-1.4zM4.5 19.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.88 4.48c-1.08-.09-2.27.07-2.95.9l-7.15 8.69a2.55 2.55 0 11-3.59-3.59l8.69-7.15c.83-.69 1-.87.9-2.95a4.5 4.5 0 016.34-4.49l-3.28 3.28a3 3 0 002.25 2.25l3.28-3.28c.26.57.4 1.2.4 1.85z"/>
          )}
        </svg>
      );
    default:
      return null;
  }
};

export default function BottomNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  const isActive = useCallback((item: NavItem) => {
    if (item.path === "/" && pathname === "/") return true;
    if (item.path === "/" && pathname !== "/") return false;
    if (item.matchPaths) return item.matchPaths.some(p => pathname.startsWith(p));
    return pathname.startsWith(item.path);
  }, [pathname]);

  // 更新活跃索引
  useEffect(() => {
    const index = navItems.findIndex(item => isActive(item));
    if (index !== -1) setActiveIndex(index);
  }, [pathname, isActive]);

  if (!mounted) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
      role="navigation"
      aria-label="主导航"
    >
      {/* 背景 - 毛玻璃效果增强 */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/98 to-white/95 dark:from-zinc-900 dark:via-zinc-900/98 dark:to-zinc-900/95 backdrop-blur-xl border-t border-zinc-200/60 dark:border-zinc-700/60 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.3)]"/>

      {/* 顶部高光线 */}
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-zinc-300/50 dark:via-zinc-600/50 to-transparent" aria-hidden="true"/>

      {/* 滑动指示器 */}
      <div
        className="absolute top-0 h-0.5 w-[calc(25%-1rem)] transition-all duration-300 ease-out"
        style={{
          left: `calc(${activeIndex * 25}% + 0.5rem)`,
        }}
        aria-hidden="true"
      >
        <div className={`h-full rounded-full ${colorConfig[navItems[activeIndex]?.color || 'blue'].indicator} shadow-lg ${colorConfig[navItems[activeIndex]?.color || 'blue'].glow}`}/>
      </div>

      {/* 导航项 */}
      <div className="relative grid grid-cols-4 h-[calc(3.75rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)]" role="list">
        {navItems.map((item, index) => {
          const active = isActive(item);
          const colors = colorConfig[item.color];

          return (
            <Link
              key={item.id}
              href={item.path}
              className="flex flex-col items-center justify-center gap-1 relative group active:scale-95 transition-transform duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 rounded-2xl mx-1"
              role="listitem"
              aria-label={`${item.label}${active ? ', 当前页面' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {/* 活跃背景 - 柔和渐变 */}
              <div className={`absolute inset-x-3 top-1.5 bottom-1.5 rounded-2xl transition-all duration-300 ${
                active
                  ? `${colors.bg} shadow-sm ${colors.glow}`
                  : "group-hover:bg-zinc-100/50 dark:group-hover:bg-zinc-800/30"
              }`} aria-hidden="true"/>

              {/* 图标容器 */}
              <div className={`relative z-10 transition-all duration-200 ${
                active
                  ? `${colors.text} scale-110`
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
              }`} aria-hidden="true">
                <NavIcon id={item.id} active={active}/>
                {/* 活跃时的发光效果 */}
                {active && (
                  <div className={`absolute inset-0 blur-md opacity-40 ${colors.text}`}>
                    <NavIcon id={item.id} active={active}/>
                  </div>
                )}
              </div>

              {/* 标签 */}
              <span className={`relative z-10 text-[10px] font-semibold tracking-wide transition-all duration-200 ${
                active
                  ? colors.text
                  : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
              }`}>
                {item.label}
              </span>

              {/* 点击涟漪效果区域 */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden" aria-hidden="true">
                <div className="absolute inset-0 bg-current opacity-0 group-active:opacity-5 transition-opacity duration-150"/>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
