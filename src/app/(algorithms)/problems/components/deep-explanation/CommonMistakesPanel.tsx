"use client";

import { useState } from "react";
import { CommonMistake } from "../../types";

interface CommonMistakesPanelProps {
  mistakes: CommonMistake[];
}

const mistakeTypeConfig = {
  boundary: { label: "边界条件", color: "text-orange-400", bg: "bg-orange-500/10" },
  logic: { label: "逻辑错误", color: "text-red-400", bg: "bg-red-500/10" },
  complexity: { label: "复杂度问题", color: "text-purple-400", bg: "bg-purple-500/10" },
  syntax: { label: "语法错误", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  "edge-case": { label: "边缘情况", color: "text-blue-400", bg: "bg-blue-500/10" },
};

/**
 * 常见错误面板 - 展示容易犯的错误及解决方案
 */
export function CommonMistakesPanel({ mistakes }: CommonMistakesPanelProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
      <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        常见错误
      </h3>

      <div className="space-y-3">
        {mistakes.map((mistake, index) => {
          const isExpanded = expandedIndex === index;
          const config = mistakeTypeConfig[mistake.type];

          return (
            <div
              key={index}
              className={`rounded-lg border transition-all ${
                isExpanded
                  ? "bg-zinc-800 border-red-500/50"
                  : "bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600"
              }`}
            >
              {/* 标题栏 */}
              <div
                className="p-4 cursor-pointer flex items-center justify-between"
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded text-xs ${config.bg} ${config.color}`}>
                    {config.label}
                  </span>
                  <span className="text-zinc-200">{mistake.description}</span>
                </div>
                <span
                  className={`text-zinc-500 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>

              {/* 展开内容 */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 animate-fadeIn">
                  {/* 错误 vs 正确代码对比 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* 错误代码 */}
                    <div className="bg-red-500/10 rounded-lg p-3 border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-red-400">❌</span>
                        <span className="text-red-400 text-sm font-medium">错误写法</span>
                      </div>
                      <pre className="text-sm text-red-200 overflow-x-auto">
                        <code>{mistake.wrongCode}</code>
                      </pre>
                    </div>

                    {/* 正确代码 */}
                    <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-green-400 text-sm font-medium">正确写法</span>
                      </div>
                      <pre className="text-sm text-green-200 overflow-x-auto">
                        <code>{mistake.correctCode}</code>
                      </pre>
                    </div>
                  </div>

                  {/* 为什么会错 */}
                  <div className="bg-black/30 rounded-lg p-3">
                    <span className="text-yellow-400 text-sm">🤔 为什么会犯这个错：</span>
                    <p className="text-zinc-300 mt-1">{mistake.whyWrong}</p>
                  </div>

                  {/* 如何避免 */}
                  <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                    <span className="text-blue-400 text-sm">💡 如何避免：</span>
                    <p className="text-zinc-300 mt-1">{mistake.howToAvoid}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
