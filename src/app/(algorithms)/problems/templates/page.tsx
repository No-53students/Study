"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { allTemplates } from "../data/templates";

// 分类配置
const CATEGORY_CONFIG: Record<string, { icon: string; color: string; bg: string }> = {
  array: { icon: "📊", color: "text-blue-400", bg: "bg-blue-500/10" },
  string: { icon: "📝", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  "two-pointers": { icon: "👆", color: "text-purple-400", bg: "bg-purple-500/10" },
  "sliding-window": { icon: "🪟", color: "text-amber-400", bg: "bg-amber-500/10" },
  "binary-search": { icon: "🎯", color: "text-rose-400", bg: "bg-rose-500/10" },
  graph: { icon: "🕸️", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  tree: { icon: "🌳", color: "text-green-400", bg: "bg-green-500/10" },
  "linked-list": { icon: "🔗", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  stack: { icon: "📚", color: "text-orange-400", bg: "bg-orange-500/10" },
  dp: { icon: "📈", color: "text-pink-400", bg: "bg-pink-500/10" },
  backtracking: { icon: "🔙", color: "text-violet-400", bg: "bg-violet-500/10" },
};

// 难度配置
const DIFFICULTY_CONFIG = {
  easy: { label: "简单", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  medium: { label: "中等", color: "text-amber-400", bg: "bg-amber-500/10" },
  hard: { label: "困难", color: "text-rose-400", bg: "bg-rose-500/10" },
};

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // 获取所有分类
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allTemplates.forEach((t) => cats.add(t.category));
    return Array.from(cats);
  }, []);

  // 过滤模板
  const filteredTemplates = useMemo(() => {
    return allTemplates.filter((template) => {
      // 搜索过滤
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.recognitionPatterns.keywords.some((k) =>
            k.toLowerCase().includes(query)
          );
        if (!matchesSearch) return false;
      }

      // 分类过滤
      if (selectedCategory && template.category !== selectedCategory) {
        return false;
      }

      // 难度过滤
      if (selectedDifficulty && template.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/problems"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
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
              <span className="hidden sm:inline">题库</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white text-lg shadow-lg shadow-purple-500/20">
                📋
              </div>
              <h1 className="text-base sm:text-lg font-bold">解题模板库</h1>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-zinc-400">
            {filteredTemplates.length} 个模板
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-8 pb-safe">
        {/* 介绍卡片 */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
            <span>🎯</span> 看懂题解但写不出来？
          </h2>
          <p className="text-sm text-zinc-400 mb-4">
            解题模板库帮你识别算法类型，提供可复用的代码模板，从「看懂」到「会写」只差一个模板的距离。
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-xs text-zinc-300">
              🔍 关键词识别
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-xs text-zinc-300">
              🧠 思维步骤
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-xs text-zinc-300">
              📝 代码模板
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-800/50 text-xs text-zinc-300">
              ⚠️ 常见错误
            </span>
          </div>
        </div>

        {/* 搜索和过滤 */}
        <div className="mb-6 space-y-4">
          {/* 搜索框 */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="搜索模板名称、关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-zinc-700 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* 分类过滤 */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              全部
            </button>
            {categories.map((cat) => {
              const config = CATEGORY_CONFIG[cat] || {
                icon: "📦",
                color: "text-zinc-400",
                bg: "bg-zinc-500/10",
              };
              return (
                <button
                  key={cat}
                  onClick={() =>
                    setSelectedCategory(cat === selectedCategory ? null : cat)
                  }
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                    selectedCategory === cat
                      ? "bg-purple-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span>{config.icon}</span>
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 难度过滤 */}
          <div className="flex gap-2">
            {Object.entries(DIFFICULTY_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedDifficulty(key === selectedDifficulty ? null : key)
                }
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedDifficulty === key
                    ? `${config.bg} ${config.color} ring-1 ring-current`
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* 模板列表 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => {
            const catConfig = CATEGORY_CONFIG[template.category] || {
              icon: "📦",
              color: "text-zinc-400",
              bg: "bg-zinc-500/10",
            };
            const diffConfig =
              DIFFICULTY_CONFIG[template.difficulty as keyof typeof DIFFICULTY_CONFIG];

            return (
              <Link
                key={template.id}
                href={`/problems/templates/${template.id}`}
                className="group block rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 hover:border-purple-500/50 hover:bg-zinc-800/50 transition-all"
              >
                {/* 标题行 */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${catConfig.bg}`}
                    >
                      {catConfig.icon}
                    </span>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {template.name}
                      </h3>
                      <span
                        className={`text-xs ${diffConfig.color} ${diffConfig.bg} px-1.5 py-0.5 rounded`}
                      >
                        {diffConfig.label}
                      </span>
                    </div>
                  </div>
                  <svg
                    className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* 描述 */}
                <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                  {template.description}
                </p>

                {/* 关键词标签 */}
                <div className="flex flex-wrap gap-1">
                  {template.recognitionPatterns.keywords.slice(0, 4).map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs text-zinc-400"
                    >
                      {keyword}
                    </span>
                  ))}
                  {template.recognitionPatterns.keywords.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-xs text-zinc-500">
                      +{template.recognitionPatterns.keywords.length - 4}
                    </span>
                  )}
                </div>

                {/* 适用题目数量 */}
                <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
                  <span>适用 {template.applicableProblems.length} 道题</span>
                  <span>{template.variants?.length || 0} 个变体</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 空状态 */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-zinc-400">没有找到匹配的模板</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedDifficulty(null);
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:bg-zinc-700 transition-colors"
            >
              清除筛选
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
