"use client";

import Link from "next/link";
import { useState } from "react";
import { allCases, FrontendCase } from "../data/cases";

// 分类配置 - 支持亮色/暗色模式
const CATEGORY_CONFIG = {
  performance: { name: "性能优化", icon: "🚀", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  component: { name: "组件实现", icon: "🧩", color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-500/10" },
  "data-structure": { name: "数据结构", icon: "📊", color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10" },
  utility: { name: "工具函数", icon: "🔧", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
};

export default function CasesPage() {
  const [selectedCase, setSelectedCase] = useState<FrontendCase | null>(allCases[0]);
  const [activeTab, setActiveTab] = useState<"scenario" | "solution" | "code">("scenario");

  return (
    <main className="py-4 sm:py-6">
      {/* 介绍卡片 */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎯</div>
            <div>
              <h2 className="font-semibold mb-1">算法在前端的实际应用</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                这里展示算法在真实前端开发中的应用场景，帮助你理解为什么要学算法，
                以及如何将算法知识应用到实际项目中。
              </p>
            </div>
          </div>
        </div>

        {/* 分类筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => {
            const count = allCases.filter((c) => c.category === key).length;
            return (
              <div
                key={key}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${config.bg} border border-current/20`}
              >
                <span>{config.icon}</span>
                <span className={`text-sm ${config.color}`}>{config.name}</span>
                <span className="text-xs text-zinc-500">({count})</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 案例列表 */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-3">选择案例</h3>
            {allCases.map((caseItem) => {
              const catConfig = CATEGORY_CONFIG[caseItem.category];
              const isSelected = selectedCase?.id === caseItem.id;

              return (
                <button
                  key={caseItem.id}
                  onClick={() => {
                    setSelectedCase(caseItem);
                    setActiveTab("scenario");
                  }}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${
                    isSelected
                      ? "bg-orange-500/10 border-orange-500/30"
                      : "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{catConfig.icon}</span>
                    <span className="font-medium text-sm">{caseItem.title}</span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2 pl-7">
                    {caseItem.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2 pl-7">
                    {caseItem.relatedAlgorithms.slice(0, 2).map((alg, i) => (
                      <span
                        key={i}
                        className="px-1.5 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      >
                        {alg.algorithmName}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 案例详情 */}
          {selectedCase && (
            <div className="lg:col-span-2 space-y-4">
              {/* 案例标题 */}
              <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">
                      {CATEGORY_CONFIG[selectedCase.category].icon}
                    </span>
                    <div>
                      <h2 className="text-xl font-bold">{selectedCase.title}</h2>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{selectedCase.description}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      CATEGORY_CONFIG[selectedCase.category].color
                    } ${CATEGORY_CONFIG[selectedCase.category].bg}`}
                  >
                    {CATEGORY_CONFIG[selectedCase.category].name}
                  </span>
                </div>

                {/* 关联算法 */}
                <div>
                  <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                    🔗 涉及的算法
                  </h4>
                  <div className="space-y-2">
                    {selectedCase.relatedAlgorithms.map((alg, i) => (
                      <div
                        key={i}
                        className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 p-2 border border-zinc-200 dark:border-zinc-700/50"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-orange-600 dark:text-orange-400">
                            {alg.algorithmName}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">{alg.explanation}</p>
                        <div className="flex flex-wrap gap-1">
                          {alg.problemIds.map((problemId) => (
                            <Link
                              key={problemId}
                              href={`/problems/${problemId}`}
                              className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-300 text-xs transition-colors"
                            >
                              {problemId}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tab 切换 */}
              <div className="flex gap-1 p-1 rounded-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
                {[
                  { key: "scenario", label: "场景描述", icon: "📋" },
                  { key: "solution", label: "解决方案", icon: "💡" },
                  { key: "code", label: "代码实现", icon: "💻" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as typeof activeTab)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm transition-colors ${
                      activeTab === tab.key
                        ? "bg-orange-500/20 text-orange-600 dark:text-orange-400"
                        : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab 内容 */}
              <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4">
                {activeTab === "scenario" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">🏢</span> 业务背景
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        {selectedCase.scenario.background}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">❓</span> 遇到的问题
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        {selectedCase.scenario.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">🎯</span> 需求目标
                      </h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        {selectedCase.scenario.requirement}
                      </p>
                    </div>

                    {selectedCase.performance && (
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                          <span className="text-lg">📊</span> 性能对比
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-lg bg-rose-500/10 border border-rose-500/20 p-3">
                            <div className="text-xs text-rose-600 dark:text-rose-400 font-medium mb-1">
                              ❌ 优化前
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                              {selectedCase.performance.before.description}
                            </p>
                            <p className="text-xs text-rose-600 dark:text-rose-300 font-mono">
                              {selectedCase.performance.before.metrics}
                            </p>
                          </div>
                          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3">
                            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                              ✅ 优化后
                            </div>
                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-1">
                              {selectedCase.performance.after.description}
                            </p>
                            <p className="text-xs text-emerald-600 dark:text-emerald-300 font-mono">
                              {selectedCase.performance.after.metrics}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "solution" && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">🧠</span> 解决思路
                      </h4>
                      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
                        <pre className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                          {selectedCase.solution.approach.trim()}
                        </pre>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                        <span className="text-lg">⭐</span> 关键要点
                      </h4>
                      <ul className="space-y-2">
                        {selectedCase.solution.keyPoints.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
                          >
                            <span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {selectedCase.references && selectedCase.references.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
                          <span className="text-lg">📚</span> 扩展阅读
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCase.references.map((ref, i) => (
                            <a
                              key={i}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-sm text-blue-500 dark:text-blue-400 transition-colors"
                            >
                              {ref.title} ↗
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "code" && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                        <span className="text-lg">💻</span> TypeScript 实现
                      </h4>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(selectedCase.solution.code);
                        }}
                        className="px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs text-zinc-600 dark:text-zinc-400 transition-colors"
                      >
                        复制代码
                      </button>
                    </div>
                    <pre className="bg-zinc-900 dark:bg-zinc-950 rounded-lg p-4 overflow-x-auto text-sm max-h-[500px] overflow-y-auto">
                      <code className="text-zinc-200 dark:text-zinc-300">{selectedCase.solution.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
  );
}
