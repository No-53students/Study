"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";

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

interface Category {
  id: string;
  name: string;
  groups: string[];
  color: string; // 品牌色
}

const categories: Category[] = [
  { id: "home", name: "首页", groups: [], color: "blue" },
  { id: "react", name: "React", groups: ["hooks", "react-basics"], color: "cyan" },
  { id: "algorithms", name: "算法", groups: ["algorithms", "interview"], color: "emerald" },
  { id: "tools", name: "工具", groups: [], color: "amber" },
];

// 分类颜色配置
const categoryColors: Record<string, { active: string; hover: string; indicator: string; glow: string }> = {
  blue: {
    active: "bg-blue-500/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
    hover: "hover:bg-blue-500/10 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400",
    indicator: "bg-gradient-to-b from-blue-400 to-blue-600",
    glow: "shadow-blue-500/30",
  },
  cyan: {
    active: "bg-cyan-500/15 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400",
    hover: "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:bg-cyan-500/10 dark:hover:text-cyan-400",
    indicator: "bg-gradient-to-b from-cyan-400 to-cyan-600",
    glow: "shadow-cyan-500/30",
  },
  emerald: {
    active: "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
    hover: "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400",
    indicator: "bg-gradient-to-b from-emerald-400 to-emerald-600",
    glow: "shadow-emerald-500/30",
  },
  amber: {
    active: "bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
    hover: "hover:bg-amber-500/10 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400",
    indicator: "bg-gradient-to-b from-amber-400 to-amber-600",
    glow: "shadow-amber-500/30",
  },
};

// 精美的分类图标
const CategoryIcon = ({ id, active }: { id: string; active: boolean }) => {
  const size = "w-5 h-5";

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
          <g stroke="currentColor" fill="none" strokeWidth={active ? 1.2 : 1}>
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
              <rect x="4" y="13" width="4" height="7" rx="1"/>
              <rect x="10" y="9" width="4" height="11" rx="1"/>
              <rect x="16" y="5" width="4" height="15" rx="1"/>
            </>
          ) : (
            <>
              <rect x="4" y="13" width="4" height="7" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="10" y="9" width="4" height="11" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="16" y="5" width="4" height="15" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
            </>
          )}
        </svg>
      );
    case "tools":
      return (
        <svg className={size} viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? 0 : 1.8}>
          {active ? (
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
          )}
        </svg>
      );
    default:
      return null;
  }
};

interface SidebarNavProps {
  groups: RouteGroup[];
}

export default function SidebarNav({ groups }: SidebarNavProps) {
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<string>("home");
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contentKey, setContentKey] = useState(0); // 用于触发淡入动画
  const prevCategoryRef = useRef(activeCategory);

  // 根据当前路径确定活跃分类
  useEffect(() => {
    if (pathname === "/") {
      setActiveCategory("home");
      return;
    }

    for (const category of categories) {
      if (category.groups.length === 0) continue;
      const categoryGroups = groups.filter(g => category.groups.includes(g.name));
      for (const group of categoryGroups) {
        if (pathname.startsWith(group.path) || group.routes.some(r => pathname === r.path)) {
          setActiveCategory(category.id);
          if (!expandedGroups.includes(group.name)) {
            setExpandedGroups(prev => [...prev, group.name]);
          }
          return;
        }
      }
    }
  }, [pathname, groups]);

  // 分类切换时触发动画
  useEffect(() => {
    if (prevCategoryRef.current !== activeCategory) {
      setContentKey(k => k + 1);
      prevCategoryRef.current = activeCategory;
    }
  }, [activeCategory]);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    document.body.classList.toggle("sidebar-collapsed", isCollapsed);
    return () => { document.body.classList.remove("sidebar-collapsed"); };
  }, [isCollapsed]);

  const toggleGroup = useCallback((groupName: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupName) ? prev.filter(n => n !== groupName) : [...prev, groupName]
    );
  }, []);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
    if (category.id === "home") window.location.href = "/";
  };

  const currentGroups = activeCategory === "home"
    ? []
    : groups.filter(g => categories.find(c => c.id === activeCategory)?.groups.includes(g.name));

  const activeColor = categoryColors[categories.find(c => c.id === activeCategory)?.color || "blue"];

  return (
    <>
      {/* 移动端顶部导航栏 - 精致设计 */}
      <header className="fixed left-0 top-0 z-50 flex h-14 w-full items-center justify-between bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-zinc-200/80 dark:border-zinc-800/80 px-4 pt-[env(safe-area-inset-top)] lg:hidden shadow-sm" role="banner">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="返回首页">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300" aria-hidden="true">
            <svg className="w-5 h-5" viewBox="-11 -11 22 22">
              <circle r="2" fill="currentColor"/>
              <g stroke="currentColor" fill="none" strokeWidth="1">
                <ellipse rx="10" ry="4.5"/>
                <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
              </g>
            </svg>
            {/* 微光效果 */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent"/>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-zinc-900 dark:text-white">开发教程</span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400">React & 算法</span>
          </div>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-sidebar"
          aria-label={isMobileMenuOpen ? "关闭菜单" : "打开菜单"}
        >
          <div className="relative w-5 h-4 flex flex-col justify-between" aria-hidden="true">
            <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}/>
            <span className={`block h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 w-0" : "w-4"}`}/>
            <span className={`block h-0.5 w-5 bg-current rounded-full transition-all duration-300 origin-center ${isMobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}/>
          </div>
        </button>
      </header>

      {/* 遮罩层 - 带模糊效果 */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* 折叠按钮 - 精致悬浮设计 */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-5 z-50 hidden h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 lg:flex group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${isCollapsed ? "left-4" : "left-[15.25rem]"}`}
        aria-label={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
        aria-expanded={!isCollapsed}
      >
        <svg className={`h-3.5 w-3.5 text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-all duration-300 ${isCollapsed ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* 侧边栏 */}
      <aside
        id="mobile-sidebar"
        className={`fixed left-0 top-0 z-40 h-[100dvh] flex border-r border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 pt-14 lg:pt-0 transition-transform duration-300 ease-out sidebar-shadow ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} ${isCollapsed ? "lg:-translate-x-full" : "lg:translate-x-0"}`}
        style={{ width: "16rem" }}
        role="complementary"
        aria-label="侧边导航栏"
      >
        {/* 一级导航 - 图标栏 */}
        <div className="w-14 flex flex-col items-center py-4 border-r border-zinc-100 dark:border-zinc-800/80 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-900/50 shrink-0" role="navigation" aria-label="分类导航">
          {/* Logo */}
          <Link href="/" className="hidden lg:flex mb-5 h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300 group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" aria-label="返回首页">
            <svg className="w-5 h-5 relative z-10" viewBox="-11 -11 22 22" aria-hidden="true">
              <circle r="2" fill="currentColor"/>
              <g stroke="currentColor" fill="none" strokeWidth="1">
                <ellipse rx="10" ry="4.5"/>
                <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
                <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
              </g>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" aria-hidden="true"/>
          </Link>

          {/* 分类图标 */}
          <div className="flex flex-col items-center gap-1.5" role="tablist" aria-label="内容分类">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              const colors = categoryColors[category.color];
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl"
                  title={category.name}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${category.name}${isActive ? ', 当前选中' : ''}`}
                >
                  {/* 左侧发光指示条 */}
                  <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full transition-all duration-300 ${isActive ? `${colors.indicator} shadow-lg ${colors.glow}` : "bg-transparent"}`} aria-hidden="true"/>

                  {/* 图标按钮 */}
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-200 ${
                    isActive ? colors.active : `text-zinc-400 ${colors.hover}`
                  }`} aria-hidden="true">
                    <CategoryIcon id={category.id} active={isActive}/>
                  </div>

                  {/* Tooltip - 带动画 */}
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-700 text-white text-xs font-medium whitespace-nowrap opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 shadow-xl" role="tooltip">
                    {category.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-zinc-900 dark:border-r-zinc-700" aria-hidden="true"/>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 二级导航 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* 标题区 - 带渐变装饰 */}
          <div className="px-4 py-4 border-b border-zinc-100 dark:border-zinc-800/80 relative overflow-hidden" role="tabpanel" aria-labelledby={`category-${activeCategory}`}>
            <div className="absolute top-0 left-0 w-16 h-1 rounded-br-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-80" aria-hidden="true"/>
            <h2 id={`category-${activeCategory}`} className="text-base font-bold text-zinc-800 dark:text-zinc-100">
              {categories.find(c => c.id === activeCategory)?.name || "导航"}
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {activeCategory === "home" && "选择学习模块"}
              {activeCategory === "react" && "React 基础与进阶"}
              {activeCategory === "algorithms" && "数据结构与算法"}
              {activeCategory === "tools" && "开发工具集"}
            </p>
          </div>

          {/* 路由列表 - 带淡入动画 */}
          <nav key={contentKey} className="flex-1 overflow-y-auto overscroll-contain px-3 py-3 animate-fade-in" aria-label="页面导航">
            {activeCategory === "home" ? (
              <div className="space-y-1">
                <Link
                  href="/"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    pathname === "/"
                      ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-600 font-semibold dark:text-blue-400 shadow-sm"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80"
                  }`}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${pathname === "/" ? "bg-blue-500/20" : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"} transition-colors`} aria-hidden="true">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10h4v-6h6v6h4V10"/>
                    </svg>
                  </div>
                  <span>返回首页</span>
                </Link>
                <div className="pt-4 pb-2">
                  <p className="px-3 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">快速入口</p>
                </div>
                {groups.slice(0, 4).map((group) => (
                  <Link
                    key={group.name}
                    href={group.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800/80 transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-lg group-hover:scale-110 transition-transform" aria-hidden="true">
                      {group.icon}
                    </div>
                    <span className="truncate group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{group.title}</span>
                  </Link>
                ))}
              </div>
            ) : activeCategory === "tools" ? (
              <div className="flex flex-col items-center justify-center h-full text-center px-6 py-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center mb-4 shadow-lg shadow-amber-500/10">
                  <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200 mb-1">敬请期待</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Git / Node / Webpack</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-500">即将推出</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {currentGroups.map((group) => {
                  const isExpanded = expandedGroups.includes(group.name);
                  const hasActiveRoute = group.routes.some(r => pathname === r.path);

                  return (
                    <div key={group.name} className="rounded-xl overflow-hidden">
                      {/* 分组标题 */}
                      <button
                        onClick={() => toggleGroup(group.name)}
                        className={`flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                          hasActiveRoute
                            ? "bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/50 shadow-sm"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }`}
                        aria-expanded={isExpanded}
                        aria-controls={`group-${group.name}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg ${hasActiveRoute ? "bg-white dark:bg-zinc-700 shadow-sm" : "bg-zinc-100 dark:bg-zinc-800"} transition-colors`} aria-hidden="true">
                            {group.icon}
                          </div>
                          <div className="flex flex-col items-start min-w-0">
                            <span className={`truncate ${hasActiveRoute ? "font-semibold text-zinc-900 dark:text-white" : "text-zinc-700 dark:text-zinc-300"}`}>
                              {group.title}
                            </span>
                            <span className="text-[10px] text-zinc-400">{group.routes.length} 个教程</span>
                          </div>
                        </div>
                        <svg className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-90" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                        </svg>
                      </button>

                      {/* 路由列表 - 平滑展开动画 */}
                      <div
                        id={`group-${group.name}`}
                        className={`overflow-hidden transition-all duration-300 ease-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
                        role="region"
                        aria-labelledby={`group-button-${group.name}`}
                      >
                        <ul className="ml-5 mt-2 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 space-y-0.5" role="list">
                          {group.routes.map((route, index) => {
                            const isActive = pathname === route.path;
                            return (
                              <li key={route.path} role="listitem">
                                <Link
                                  href={route.path}
                                  className={`group flex items-center px-3 py-2 rounded-lg text-[13px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                                    isActive
                                      ? "bg-gradient-to-r from-blue-500/15 to-indigo-500/10 text-blue-600 font-semibold dark:text-blue-400"
                                      : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 hover:pl-4 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60"
                                  }`}
                                  style={{ animationDelay: `${index * 30}ms` }}
                                  aria-current={isActive ? "page" : undefined}
                                >
                                  {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 animate-pulse" aria-hidden="true"/>
                                  )}
                                  <span className="block truncate">{route.displayName}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
