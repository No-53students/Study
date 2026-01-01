"use client";

import { ComplexityAnalysis } from "../../types";

interface ComplexityAnalysisCardProps {
  analysis: ComplexityAnalysis;
  timeComplexity: string;
  spaceComplexity: string;
}

/**
 * 复杂度深度分析卡片
 */
export function ComplexityAnalysisCard({
  analysis,
  timeComplexity,
  spaceComplexity,
}: ComplexityAnalysisCardProps) {
  return (
    <div className="bg-zinc-900/50 rounded-xl p-6 border border-zinc-700/50">
      <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        复杂度深度分析
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 时间复杂度 */}
        <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-green-400 font-medium">时间复杂度</span>
            <span className="text-2xl font-bold text-green-300">{timeComplexity}</span>
          </div>
          <p className="text-sm text-zinc-300">{analysis.timeBreakdown}</p>
        </div>

        {/* 空间复杂度 */}
        <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-blue-400 font-medium">空间复杂度</span>
            <span className="text-2xl font-bold text-blue-300">{spaceComplexity}</span>
          </div>
          <p className="text-sm text-zinc-300">{analysis.spaceBreakdown}</p>
        </div>
      </div>

      {/* 最好/最坏情况 */}
      {(analysis.bestCase || analysis.worstCase) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {analysis.bestCase && (
            <div className="bg-black/20 rounded-lg p-3">
              <span className="text-sm text-zinc-400">🌟 最优情况</span>
              <p className="text-zinc-300 mt-1">{analysis.bestCase}</p>
            </div>
          )}
          {analysis.worstCase && (
            <div className="bg-black/20 rounded-lg p-3">
              <span className="text-sm text-zinc-400">⚡ 最差情况</span>
              <p className="text-zinc-300 mt-1">{analysis.worstCase}</p>
            </div>
          )}
        </div>
      )}

      {/* 深度解释 */}
      {analysis.reasoning && (
        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/30">
          <span className="text-purple-400 text-sm font-medium">🎓 深度理解</span>
          <p className="text-zinc-300 mt-2">{analysis.reasoning}</p>
        </div>
      )}

      {/* 复杂度对比图示 */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <span className="text-sm text-zinc-400 mb-2 block">复杂度等级参考</span>
        <div className="flex items-center gap-2 text-xs">
          <ComplexityBadge level="O(1)" color="green" />
          <span className="text-zinc-600">→</span>
          <ComplexityBadge level="O(log n)" color="green" />
          <span className="text-zinc-600">→</span>
          <ComplexityBadge level="O(n)" color="yellow" />
          <span className="text-zinc-600">→</span>
          <ComplexityBadge level="O(n log n)" color="yellow" />
          <span className="text-zinc-600">→</span>
          <ComplexityBadge level="O(n²)" color="orange" />
          <span className="text-zinc-600">→</span>
          <ComplexityBadge level="O(2ⁿ)" color="red" />
        </div>
      </div>
    </div>
  );
}

function ComplexityBadge({ level, color }: { level: string; color: string }) {
  const colorClasses = {
    green: "bg-green-500/20 text-green-400 border-green-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    red: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span className={`px-2 py-1 rounded border ${colorClasses[color as keyof typeof colorClasses]}`}>
      {level}
    </span>
  );
}
