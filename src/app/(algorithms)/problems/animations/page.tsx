"use client";

import { useState } from "react";
import { CodeSyncDemo } from "../components/animations";
import {
  allCodeSyncAnimations,
  CodeSyncAnimationData,
} from "../data/code-sync-animations";

export default function AnimationsPage() {
  const [selectedAnimation, setSelectedAnimation] =
    useState<CodeSyncAnimationData>(allCodeSyncAnimations[0]);
  const [layout, setLayout] = useState<"split" | "stacked">("split");

  return (
    <main className="py-4 sm:py-8">
      {/* 介绍卡片 */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
            <span>🎯</span> 代码同步动画
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            通过动画与代码的同步展示，深入理解算法执行过程。每一步都能看到：
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300">
              📊 数据结构可视化
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300">
              💻 代码行高亮
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300">
              👁️ 变量实时监视
            </span>
            <span className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs text-zinc-700 dark:text-zinc-300">
              💭 思考提示
            </span>
          </div>
        </div>

        {/* 动画选择器和布局切换 */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {allCodeSyncAnimations.map((animation) => (
              <button
                key={animation.id}
                onClick={() => setSelectedAnimation(animation)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedAnimation.id === animation.id
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {animation.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">布局:</span>
            <button
              onClick={() => setLayout("split")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                layout === "split"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              左右分栏
            </button>
            <button
              onClick={() => setLayout("stacked")}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                layout === "stacked"
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              上下堆叠
            </button>
          </div>
        </div>

        {/* 动画演示区域 */}
        <div className="mb-6">
          <CodeSyncDemo data={selectedAnimation} layout={layout} />
        </div>

        {/* 输入数据展示 */}
        <div className="rounded-xl bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">输入数据</h3>
          <div className="font-mono text-sm text-zinc-600 dark:text-zinc-400">
            {selectedAnimation.input.description}
          </div>
        </div>

        {/* 动画列表预览 */}
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-4">所有可用动画</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCodeSyncAnimations.map((animation) => (
              <button
                key={animation.id}
                onClick={() => setSelectedAnimation(animation)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedAnimation.id === animation.id
                    ? "bg-blue-500/10 border-blue-500/50"
                    : "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">
                    {animation.visualizationType === "hash-table"
                      ? "🗂️"
                      : animation.visualizationType === "stack"
                      ? "📚"
                      : animation.visualizationType === "linked-list"
                      ? "🔗"
                      : animation.visualizationType === "two-pointers"
                      ? "👆"
                      : animation.visualizationType === "sliding-window"
                      ? "🪟"
                      : "📊"}
                  </span>
                  <div>
                    <h4 className="font-semibold">
                      {animation.title}
                    </h4>
                    <span className="text-xs text-zinc-500">
                      {animation.steps.length} 步
                    </span>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {animation.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </main>
  );
}
