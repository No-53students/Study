"use client";

import { useState } from "react";
import { ProgressiveReveal } from "../../types";

interface ProgressiveRevealPanelProps {
  reveals: ProgressiveReveal[];
}

/**
 * 逐步揭示组件 - 渐进式展示解题思路
 */
export function ProgressiveRevealPanel({ reveals }: ProgressiveRevealPanelProps) {
  const [revealedLevel, setRevealedLevel] = useState(0);

  const levelColors = {
    1: "from-green-500 to-emerald-500",
    2: "from-blue-500 to-cyan-500",
    3: "from-purple-500 to-violet-500",
    4: "from-orange-500 to-amber-500",
    5: "from-red-500 to-pink-500",
  };

  const handleRevealNext = () => {
    if (revealedLevel < reveals.length) {
      setRevealedLevel(revealedLevel + 1);
    }
  };

  const handleReset = () => {
    setRevealedLevel(0);
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-700/50 overflow-hidden">
      {/* 标题 */}
      <div className="p-4 border-b border-zinc-700/50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-amber-400 flex items-center gap-2">
          <span className="text-2xl">🔍</span>
          逐步揭示
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-400">
            {revealedLevel} / {reveals.length} 已揭示
          </span>
          {revealedLevel > 0 && (
            <button
              onClick={handleReset}
              className="text-xs text-zinc-500 hover:text-zinc-300"
            >
              重置
            </button>
          )}
        </div>
      </div>

      {/* 揭示内容 */}
      <div className="p-4 space-y-4">
        {reveals.map((reveal, index) => {
          const isRevealed = index < revealedLevel;
          const isNext = index === revealedLevel;
          const colorClass = levelColors[reveal.level as keyof typeof levelColors] || levelColors[1];

          return (
            <div
              key={index}
              className={`relative transition-all duration-300 ${
                isRevealed ? "opacity-100" : isNext ? "opacity-70" : "opacity-30"
              }`}
            >
              {/* 级别指示器 */}
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br ${
                    isRevealed ? colorClass : "from-zinc-700 to-zinc-800"
                  }`}
                >
                  {isRevealed ? reveal.level : "?"}
                </div>

                <div className="flex-1">
                  {isRevealed ? (
                    <div className="animate-fadeIn">
                      {/* 揭示内容 */}
                      <p className="text-zinc-200 mb-2">{reveal.content}</p>

                      {/* 代码片段 */}
                      {reveal.codeFragment && (
                        <div className="mt-2 p-3 bg-black/50 rounded-lg border border-zinc-700">
                          <pre className="text-sm text-green-400 overflow-x-auto">
                            <code>{reveal.codeFragment}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  ) : isNext ? (
                    <button
                      onClick={handleRevealNext}
                      className="w-full p-4 rounded-lg border border-dashed border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-colors text-left"
                    >
                      <span className="flex items-center gap-2">
                        <span>🔓</span>
                        <span>点击揭示第 {reveal.level} 层思路</span>
                      </span>
                    </button>
                  ) : (
                    <div className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/30">
                      <span className="text-zinc-500 flex items-center gap-2">
                        <span>🔒</span>
                        <span>第 {reveal.level} 层思路（先揭示前面的内容）</span>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* 全部揭示提示 */}
        {revealedLevel === reveals.length && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-center">
            <span className="text-green-400 text-lg">🎉 全部揭示完成！</span>
            <p className="text-zinc-400 text-sm mt-1">现在你应该能够独立解决这道题了</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
