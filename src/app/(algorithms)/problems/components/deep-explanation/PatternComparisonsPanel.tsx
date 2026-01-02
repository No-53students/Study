"use client";

import { PatternComparison, Variation } from "../../types";
import Link from "next/link";

interface PatternComparisonsPanelProps {
  comparisons: PatternComparison[];
}

/**
 * 相似题型对比面板
 */
export function PatternComparisonsPanel({ comparisons }: PatternComparisonsPanelProps) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700/50">
      <h3 className="text-lg font-semibold text-amber-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">🔗</span>
        相似题型对比
      </h3>

      <div className="space-y-4">
        {comparisons.map((comparison, index) => (
          <div
            key={index}
            className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <Link
                href={`/problems/leetcode?id=${comparison.problemId}`}
                className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2"
              >
                📝 {comparison.title}
                <span className="text-xs text-zinc-400 dark:text-zinc-500">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 相似点 */}
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                <span className="text-green-400 text-sm">✓ 相似点</span>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">{comparison.similarity}</p>
              </div>

              {/* 不同点 */}
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                <span className="text-blue-400 text-sm">✗ 不同点</span>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">{comparison.difference}</p>
              </div>
            </div>

            {/* 学习建议 */}
            {comparison.tip && (
              <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                💡 {comparison.tip}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface VariationsPanelProps {
  variations: Variation[];
}

/**
 * 变体练习面板
 */
export function VariationsPanel({ variations }: VariationsPanelProps) {
  const difficultyConfig = {
    easier: { label: "更简单", color: "text-green-400", bg: "bg-green-500/10" },
    same: { label: "同等难度", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    harder: { label: "更困难", color: "text-red-400", bg: "bg-red-500/10" },
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700/50">
      <h3 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">🎯</span>
        变体练习
      </h3>

      <div className="space-y-3">
        {variations.map((variation, index) => {
          const config = difficultyConfig[variation.difficultyChange];

          return (
            <div
              key={index}
              className="bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${config.bg} ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <p className="text-zinc-200 font-medium">{variation.description}</p>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-2">
                    💡 思路调整：{variation.modification}
                  </p>
                </div>

                {variation.relatedProblemId && (
                  <Link
                    href={`/problems/leetcode?id=${variation.relatedProblemId}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    去练习 →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
