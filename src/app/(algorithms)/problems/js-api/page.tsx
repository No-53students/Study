"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  jsApiCategories,
  searchApiMethods,
  type JSApiMethod,
  type JSApiCategory,
} from "../data/js-api-reference";

// 分类颜色配置
const CATEGORY_COLORS: Record<
  string,
  { color: string; bg: string; border: string; light: string; dot: string }
> = {
  array: {
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    light: "text-blue-300",
    dot: "bg-blue-500",
  },
  "map-set": {
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    light: "text-emerald-300",
    dot: "bg-emerald-500",
  },
  string: {
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    light: "text-amber-300",
    dot: "bg-amber-500",
  },
  math: {
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    light: "text-purple-300",
    dot: "bg-purple-500",
  },
  bit: {
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    light: "text-rose-300",
    dot: "bg-rose-500",
  },
  techniques: {
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    light: "text-cyan-300",
    dot: "bg-cyan-500",
  },
};

function getColorConfig(categoryId: string) {
  return CATEGORY_COLORS[categoryId] || {
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
    light: "text-zinc-300",
    dot: "bg-zinc-500",
  };
}

// ====================== 左侧 API 列表 ======================
function ApiSidebar({
  categories,
  selectedMethod,
  onSelectMethod,
  searchQuery,
  onSearchChange,
}: {
  categories: JSApiCategory[];
  selectedMethod: { categoryId: string; methodName: string } | null;
  onSelectMethod: (categoryId: string, methodName: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.id))
  );

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  // 搜索结果
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return searchApiMethods(searchQuery);
  }, [searchQuery]);

  return (
    <aside className="w-80 shrink-0 border-r border-zinc-800 bg-zinc-950 flex flex-col h-full">
      {/* 搜索框 */}
      <div className="p-3 border-b border-zinc-800">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500"
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
            placeholder="搜索方法..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 方法列表 */}
      <div className="flex-1 overflow-y-auto">
        {searchResults ? (
          // 搜索结果
          <div className="p-2">
            <div className="px-2 py-1 text-xs text-zinc-500 mb-2">
              找到 {searchResults.length} 个结果
            </div>
            {searchResults.map(({ category, method }) => {
              const colorConfig = getColorConfig(category.id);
              const isSelected =
                selectedMethod?.categoryId === category.id &&
                selectedMethod?.methodName === method.name;
              const mutates = "mutatesOriginal" in method ? method.mutatesOriginal : undefined;

              return (
                <button
                  key={`${category.id}-${method.name}`}
                  onClick={() => onSelectMethod(category.id, method.name)}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                    isSelected
                      ? `${colorConfig.bg} ${colorConfig.border} border`
                      : "hover:bg-zinc-800/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{category.icon}</span>
                    <code className={`text-sm font-medium ${isSelected ? colorConfig.color : "text-zinc-200"}`}>
                      {method.name}
                    </code>
                    {mutates !== undefined && (
                      <span
                        className={`w-2 h-2 rounded-full ml-auto ${mutates ? "bg-red-500" : "bg-green-500"}`}
                      />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 pl-6">{method.description}</p>
                </button>
              );
            })}
          </div>
        ) : (
          // 分类列表
          <div className="p-2">
            {categories.map((category) => {
              const colorConfig = getColorConfig(category.id);
              const isExpanded = expandedCategories.has(category.id);

              return (
                <div key={category.id} className="mb-2">
                  {/* 分类标题 */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-800/50 transition-colors`}
                  >
                    <svg
                      className={`w-3 h-3 text-zinc-500 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-lg">{category.icon}</span>
                    <span className={`text-sm font-medium ${colorConfig.color}`}>{category.name}</span>
                    <span className="text-xs text-zinc-600 ml-auto">{category.methods.length}</span>
                  </button>

                  {/* 方法列表 */}
                  {isExpanded && (
                    <div className="ml-3 mt-1 space-y-0.5">
                      {category.methods.map((method) => {
                        const isSelected =
                          selectedMethod?.categoryId === category.id &&
                          selectedMethod?.methodName === method.name;
                        const mutates = "mutatesOriginal" in method ? method.mutatesOriginal : undefined;

                        return (
                          <button
                            key={method.name}
                            onClick={() => onSelectMethod(category.id, method.name)}
                            className={`w-full text-left px-3 py-1.5 rounded-md transition-colors flex items-center gap-2 ${
                              isSelected
                                ? `${colorConfig.bg} border ${colorConfig.border}`
                                : "hover:bg-zinc-800/50"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${colorConfig.dot}`} />
                            <code className={`text-sm ${isSelected ? colorConfig.color : "text-zinc-300"}`}>
                              {method.name}
                            </code>
                            {mutates !== undefined && (
                              <span
                                className={`w-2 h-2 rounded-full ml-auto shrink-0 ${
                                  mutates ? "bg-red-500" : "bg-green-500"
                                }`}
                                title={mutates ? "修改原数据" : "不修改原数据"}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 底部图例 */}
      <div className="p-3 border-t border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center justify-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span>不改原数据</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>改原数据</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ====================== 二级标题组件 ======================
function SectionTitle({
  children,
  color = "bg-cyan-500",
  icon,
  badge,
}: {
  children: React.ReactNode;
  color?: string;
  icon?: string;
  badge?: string | number;
}) {
  return (
    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
      <span className={`w-1 h-5 rounded-full ${color}`} />
      {icon && <span className="text-base">{icon}</span>}
      {children}
      {badge !== undefined && (
        <span className="text-xs text-zinc-500 font-normal ml-1">({badge})</span>
      )}
    </h2>
  );
}

// ====================== 右侧详情面板 ======================
function MethodDetail({
  method,
  category,
}: {
  method: JSApiMethod;
  category: JSApiCategory;
}) {
  const colorConfig = getColorConfig(category.id);
  const mutates = "mutatesOriginal" in method ? method.mutatesOriginal : undefined;

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-6 lg:p-8">
        {/* ==================== 头部信息 ==================== */}
        <header className="mb-8 pb-8 border-b border-zinc-800">
          {/* 分类标签 */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{category.icon}</span>
            <span className={`text-sm font-medium ${colorConfig.color}`}>{category.name}</span>
          </div>

          {/* 方法名 */}
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{method.name}</h1>

          {/* 核心标签 */}
          <div className="flex flex-wrap gap-2 mb-5">
            {mutates !== undefined && (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                  mutates
                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                    : "bg-green-500/20 text-green-400 border border-green-500/30"
                }`}
              >
                {mutates ? "⚠️ 会修改原数据" : "✓ 不修改原数据"}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              ⏱️ 时间 {method.timeComplexity}
            </span>
            {method.spaceComplexity && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-purple-500/10 text-purple-400 border border-purple-500/20">
                📦 空间 {method.spaceComplexity}
              </span>
            )}
          </div>

          {/* 方法签名 */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
            <div className="px-4 py-2 bg-zinc-800/50 border-b border-zinc-800">
              <span className="text-xs text-zinc-500 font-medium">语法格式</span>
            </div>
            <div className="p-4">
              <code className="text-lg text-emerald-400 font-mono">{method.signature}</code>
            </div>
          </div>
        </header>

        {/* ==================== 一、基础信息 ==================== */}
        <div className="mb-8">
          <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" />
            基础信息
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* 功能说明 */}
          <section className="mb-6">
            <SectionTitle color="bg-cyan-500" icon="📝">功能说明</SectionTitle>
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-5">
              <p className="text-base text-zinc-200 leading-relaxed">{method.description}</p>
              {method.detailedDescription && (
                <p className="text-sm text-zinc-400 leading-relaxed mt-3">{method.detailedDescription}</p>
              )}
            </div>
          </section>

          {/* 参数列表 */}
          {method.parameters && method.parameters.length > 0 && (
            <section className="mb-6">
              <SectionTitle color="bg-amber-500" icon="📋" badge={method.parameters.length}>参数列表</SectionTitle>
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-800/50">
                      <th className="px-4 py-3 text-left text-zinc-400 font-medium">参数名</th>
                      <th className="px-4 py-3 text-left text-zinc-400 font-medium">类型</th>
                      <th className="px-4 py-3 text-left text-zinc-400 font-medium">说明</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {method.parameters.map((param, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3">
                          <code className="text-amber-400">{param.name}</code>
                          {param.optional && <span className="text-zinc-600 ml-1">?</span>}
                        </td>
                        <td className="px-4 py-3">
                          <code className="text-purple-400">{param.type}</code>
                        </td>
                        <td className="px-4 py-3 text-zinc-400">{param.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 返回值 */}
          <section className="mb-6">
            <SectionTitle color="bg-purple-500" icon="↩️">返回值</SectionTitle>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <span className="text-sm text-purple-300">{method.returns}</span>
            </div>
          </section>
        </div>

        {/* ==================== 二、代码示例 ==================== */}
        <div className="mb-8">
          <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" />
            代码示例
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          <section className="mb-6">
            <SectionTitle color="bg-emerald-500" icon="💻" badge={method.examples.length}>基础用法</SectionTitle>
            <div className="space-y-4">
              {method.examples.map((example, i) => (
                <div key={i} className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
                  {example.title && (
                    <div className="px-4 py-2.5 bg-zinc-800/50 border-b border-zinc-800 flex items-center gap-2">
                      <span className="text-xs text-zinc-500">示例 {i + 1}</span>
                      <span className={`text-sm font-medium ${colorConfig.light}`}>{example.title}</span>
                    </div>
                  )}
                  <pre className="p-4 lg:p-5 text-sm overflow-x-auto">
                    <code className="text-emerald-400 whitespace-pre font-mono leading-relaxed">{example.code}</code>
                  </pre>
                  <div className="px-4 py-3 bg-zinc-800/30 border-t border-zinc-800 flex items-start gap-2">
                    <span className="shrink-0 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                      输出
                    </span>
                    <code className="text-sm text-amber-300 font-mono">{example.output}</code>
                  </div>
                  {example.explanation && (
                    <div className="px-4 py-3 bg-blue-500/5 border-t border-blue-500/10 flex items-start gap-2">
                      <span className="text-blue-400 shrink-0">💡</span>
                      <span className="text-sm text-blue-300">{example.explanation}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ==================== 三、应用场景 ==================== */}
        <div className="mb-8">
          <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" />
            应用场景
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          <section className="mb-6">
            <SectionTitle color="bg-blue-500" icon="🎯" badge={method.algorithmUseCases.length}>典型用途</SectionTitle>
            <div className="grid gap-2 sm:grid-cols-2">
              {method.algorithmUseCases.map((use, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${colorConfig.bg} border ${colorConfig.border} ${
                    use.startsWith("⭐") ? "ring-1 ring-yellow-500/30" : ""
                  }`}
                >
                  <span className={`text-sm ${use.startsWith("⭐") ? colorConfig.color : "text-zinc-300"}`}>
                    {use}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ==================== 四、复杂度分析 ==================== */}
        <div className="mb-8">
          <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
            <span className="w-4 h-px bg-zinc-700" />
            复杂度分析
            <span className="flex-1 h-px bg-zinc-800" />
          </div>

          <section className="mb-6">
            <SectionTitle color="bg-teal-500" icon="📊">时间与空间</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-cyan-400">⏱️</span>
                  <span className="text-sm font-medium text-zinc-300">时间复杂度</span>
                </div>
                <div className="text-2xl font-bold text-cyan-400 font-mono">{method.timeComplexity}</div>
                <p className="text-xs text-zinc-500 mt-2">
                  {method.timeComplexity === "O(1)" && "常数时间，与数据规模无关"}
                  {method.timeComplexity === "O(n)" && "线性时间，与数据规模成正比"}
                  {method.timeComplexity === "O(log n)" && "对数时间，每次操作减半"}
                  {method.timeComplexity === "O(n log n)" && "线性对数时间，常见于高效排序"}
                  {method.timeComplexity === "O(n²)" && "平方时间，嵌套循环场景"}
                </p>
              </div>
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-400">📦</span>
                  <span className="text-sm font-medium text-zinc-300">空间复杂度</span>
                </div>
                <div className="text-2xl font-bold text-purple-400 font-mono">{method.spaceComplexity || "O(1)"}</div>
                <p className="text-xs text-zinc-500 mt-2">
                  {(!method.spaceComplexity || method.spaceComplexity === "O(1)") && "原地操作，不需要额外空间"}
                  {method.spaceComplexity === "O(n)" && "需要与输入等量的额外空间"}
                  {method.spaceComplexity === "O(k)" && "空间与结果大小相关"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ==================== 五、方法对比 ==================== */}
        {method.comparison && method.comparison.length > 0 && (
          <div className="mb-8">
            <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-zinc-700" />
              方法对比
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            <section className="mb-6">
              <SectionTitle color="bg-indigo-500" icon="⚖️" badge={method.comparison.length}>如何选择</SectionTitle>
              <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 divide-y divide-zinc-800">
                {method.comparison.map((comp, i) => (
                  <div key={i} className="p-4 flex items-start gap-3">
                    <code className="shrink-0 text-sm font-medium text-purple-400 bg-purple-500/10 px-2 py-1 rounded">
                      {comp.method}
                    </code>
                    <span className="text-sm text-zinc-400">{comp.difference}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== 六、避坑指南 ==================== */}
        {((method.pitfalls && method.pitfalls.length > 0) || (method.performanceTips && method.performanceTips.length > 0)) && (
          <div className="mb-8">
            <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-zinc-700" />
              避坑指南
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* 常见错误 */}
            {method.pitfalls && method.pitfalls.length > 0 && (
              <section className="mb-6">
                <SectionTitle color="bg-red-500" icon="⚠️" badge={method.pitfalls.length}>常见错误</SectionTitle>
                <div className="space-y-2">
                  {method.pitfalls.map((pitfall, i) => {
                    const isGood = pitfall.startsWith("✅");
                    return (
                      <div
                        key={i}
                        className={`p-4 rounded-lg flex items-start gap-3 ${
                          isGood
                            ? "bg-green-500/10 border border-green-500/20"
                            : "bg-red-500/10 border border-red-500/20"
                        }`}
                      >
                        <span className="text-lg shrink-0">{isGood ? "✅" : "⚠️"}</span>
                        <span className={`text-sm ${isGood ? "text-green-300" : "text-red-300"}`}>
                          {pitfall.replace(/^[✅⚠️]\s*/, "")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 性能优化 */}
            {method.performanceTips && method.performanceTips.length > 0 && (
              <section className="mb-6">
                <SectionTitle color="bg-amber-500" icon="⚡" badge={method.performanceTips.length}>性能优化</SectionTitle>
                <div className="space-y-2">
                  {method.performanceTips.map((tip, i) => (
                    <div key={i} className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
                      <span className="text-lg shrink-0">💡</span>
                      <span className="text-sm text-amber-300">{tip}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ==================== 七、相关推荐 ==================== */}
        {((method.relatedMethods && method.relatedMethods.length > 0) || (method.relatedProblems && method.relatedProblems.length > 0)) && (
          <div className="mb-8">
            <div className="text-xs text-zinc-500 mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-zinc-700" />
              相关推荐
              <span className="flex-1 h-px bg-zinc-800" />
            </div>

            {/* 相关方法 */}
            {method.relatedMethods && method.relatedMethods.length > 0 && (
              <section className="mb-6">
                <SectionTitle color="bg-zinc-500" icon="🔗" badge={method.relatedMethods.length}>相关方法</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {method.relatedMethods.map((m, i) => (
                    <code key={i} className="px-3 py-1.5 rounded-lg bg-zinc-800 text-sm text-zinc-300 border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-colors">
                      {m}
                    </code>
                  ))}
                </div>
              </section>
            )}

            {/* 练习题目 */}
            {method.relatedProblems && method.relatedProblems.length > 0 && (
              <section className="mb-6">
                <SectionTitle color="bg-orange-500" icon="📝" badge={method.relatedProblems.length}>练习题目</SectionTitle>
                <div className="flex flex-wrap gap-2">
                  {method.relatedProblems.map((problemId, i) => (
                    <Link
                      key={i}
                      href={`/problems/leetcode?id=${problemId}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 text-sm text-orange-400 hover:bg-orange-500/20 transition-colors border border-orange-500/20"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {problemId}
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ====================== 欢迎页面（未选择方法时） ======================
function WelcomePanel({ stats }: { stats: { total: number; safe: number; mutating: number } }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-lg">
        <div className="text-6xl mb-6">📖</div>
        <h2 className="text-2xl font-bold text-white mb-4">JS API 速查手册</h2>
        <p className="text-zinc-400 mb-8 leading-relaxed">
          专为前端开发者设计的 LeetCode 刷题 API 速查手册。
          <br />
          从左侧选择一个方法开始学习。
        </p>

        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-xs text-zinc-500">总方法数</div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">{stats.safe}</div>
            <div className="text-xs text-zinc-500 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              安全方法
            </div>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900 border border-red-500/20">
            <div className="text-2xl font-bold text-red-400">{stats.mutating}</div>
            <div className="text-xs text-zinc-500 flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              改原数据
            </div>
          </div>
        </div>

        {/* 分类预览 */}
        <div className="flex flex-wrap justify-center gap-2">
          {jsApiCategories.map((cat) => {
            const colorConfig = getColorConfig(cat.id);
            return (
              <span
                key={cat.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm ${colorConfig.bg} ${colorConfig.color} border ${colorConfig.border}`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs opacity-60">({cat.methods.length})</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ====================== 主页面 ======================
export default function JSApiPage() {
  const [selectedMethod, setSelectedMethod] = useState<{
    categoryId: string;
    methodName: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 获取选中的方法详情
  const selectedMethodData = useMemo(() => {
    if (!selectedMethod) return null;
    const category = jsApiCategories.find((c) => c.id === selectedMethod.categoryId);
    if (!category) return null;
    const method = category.methods.find((m) => m.name === selectedMethod.methodName);
    if (!method) return null;
    return { category, method };
  }, [selectedMethod]);

  // 统计数据
  const stats = useMemo(() => {
    let total = 0;
    let mutating = 0;
    let safe = 0;

    jsApiCategories.forEach((cat) => {
      cat.methods.forEach((m) => {
        total++;
        if ("mutatesOriginal" in m) {
          if (m.mutatesOriginal) mutating++;
          else safe++;
        }
      });
    });

    return { total, mutating, safe };
  }, []);

  const handleSelectMethod = (categoryId: string, methodName: string) => {
    setSelectedMethod({ categoryId, methodName });
    setSearchQuery("");
  };

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="shrink-0 h-12 border-b border-zinc-800 bg-zinc-950 flex items-center px-4">
        <Link
          href="/problems"
          className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          返回题库
        </Link>
        <div className="w-px h-5 bg-zinc-800 mx-4" />
        <div className="flex items-center gap-2">
          <span className="text-lg">📖</span>
          <h1 className="text-sm font-semibold">JS API 速查手册</h1>
        </div>
        <div className="ml-auto text-xs text-zinc-500">
          {stats.total} 个方法 · {jsApiCategories.length} 个分类
        </div>
      </header>

      {/* 主体内容 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 左侧列表 */}
        <ApiSidebar
          categories={jsApiCategories}
          selectedMethod={selectedMethod}
          onSelectMethod={handleSelectMethod}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 右侧详情 */}
        {selectedMethodData ? (
          <MethodDetail
            method={selectedMethodData.method}
            category={selectedMethodData.category}
          />
        ) : (
          <WelcomePanel stats={stats} />
        )}
      </div>
    </div>
  );
}
