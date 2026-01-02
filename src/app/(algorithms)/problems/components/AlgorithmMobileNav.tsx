"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

// 算法页面路由配置
const algorithmPages = [
  { path: "/problems", title: "题库", backTo: "/" },
  { path: "/problems/roadmap", title: "学习路线", backTo: "/problems" },
  { path: "/problems/templates", title: "解题模板", backTo: "/problems" },
  { path: "/problems/animations", title: "动画演示", backTo: "/problems" },
  { path: "/problems/knowledge-graph", title: "知识图谱", backTo: "/problems" },
  { path: "/problems/categories", title: "分类浏览", backTo: "/problems" },
  { path: "/problems/cases", title: "实战案例", backTo: "/problems" },
  { path: "/problems/leetcode", title: "LeetCode", backTo: "/problems" },
  { path: "/problems/js-api", title: "JS API", backTo: "/problems" },
];

export function AlgorithmMobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 获取当前页面信息
  const navInfo = useMemo(() => {
    // 精确匹配一级算法页面
    const exactMatch = algorithmPages.find((p) => pathname === p.path);
    if (exactMatch) {
      return {
        title: exactMatch.title,
        backTo: exactMatch.backTo,
      };
    }

    // 前缀匹配（子页面）
    for (const page of algorithmPages) {
      if (page.path !== "/problems" && pathname.startsWith(page.path + "/")) {
        // 从路径提取标题
        const parts = pathname.split("/").filter(Boolean);
        const lastPart = parts[parts.length - 1];
        const title = lastPart
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        return {
          title,
          backTo: page.path,
        };
      }
    }

    // 题目详情页 (/problems/xxx)
    if (pathname.startsWith("/problems/") && !algorithmPages.some(p => pathname.startsWith(p.path + "/") || pathname === p.path)) {
      const parts = pathname.split("/").filter(Boolean);
      const problemId = parts[parts.length - 1];
      const title = problemId
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return {
        title,
        backTo: "/problems",
      };
    }

    return null;
  }, [pathname]);

  if (!navInfo) return null;

  return (
    <nav className="lg:hidden -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 mb-4 bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center">
        {/* 返回按钮 */}
        <button
          onClick={() => router.push(navInfo.backTo)}
          className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors -ml-1 pr-3"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* 当前页面标题 */}
        <span className="text-sm font-medium text-zinc-900 dark:text-white truncate">
          {navInfo.title}
        </span>
      </div>
    </nav>
  );
}
