"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { isDetailPage, getBackPath, getPageTitle } from "@/lib/mobile-routes";

export default function FloatingBackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动以调整样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 是否显示浮动按钮（只在详情页显示）
  const showButton = useMemo(() => isDetailPage(pathname), [pathname]);

  // 获取返回路径
  const backPath = useMemo(() => getBackPath(pathname), [pathname]);

  // 获取页面标题
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);

  if (!showButton) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 lg:hidden transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center h-12 px-2">
        {/* 返回按钮 */}
        <button
          onClick={() => router.push(backPath)}
          className={`flex items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 active:scale-95 ${
            isScrolled
              ? "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              : "text-zinc-700 dark:text-zinc-300 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-sm hover:shadow-md"
          }`}
          aria-label="返回上一页"
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
          <span className="text-sm font-medium">返回</span>
        </button>

        {/* 页面标题 - 滚动后显示 */}
        <div
          className={`flex-1 text-center transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {pageTitle}
          </span>
        </div>

        {/* 占位，保持返回按钮居左 */}
        <div className="w-[72px]" />
      </div>
    </div>
  );
}
