"use client";

import { AlgorithmIntuition } from "../../types";

interface IntuitionCardProps {
  intuition: AlgorithmIntuition;
}

/**
 * 算法直觉卡片 - 帮助理解"为什么"用这个算法
 */
export function IntuitionCard({ intuition }: IntuitionCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/30">
      <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">💡</span>
        算法直觉
      </h3>

      <div className="space-y-4">
        {/* 观察 */}
        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">👁️</span>
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-1">观察到什么</h4>
              <p className="text-zinc-200">{intuition.observation}</p>
            </div>
          </div>
        </div>

        {/* 模式匹配 */}
        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🧩</span>
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-1">对应什么模式</h4>
              <p className="text-zinc-200">{intuition.patternMatch}</p>
            </div>
          </div>
        </div>

        {/* 为什么有效 */}
        <div className="bg-black/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-1">为什么有效</h4>
              <p className="text-zinc-200">{intuition.whyItWorks}</p>
            </div>
          </div>
        </div>

        {/* 形象比喻 */}
        {intuition.metaphor && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-lg p-4 border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <span className="text-xl">🎭</span>
              <div>
                <h4 className="text-sm font-medium text-yellow-400 mb-1">形象比喻</h4>
                <p className="text-zinc-200 italic">{intuition.metaphor}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
