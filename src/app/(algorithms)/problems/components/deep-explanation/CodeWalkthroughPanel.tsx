"use client";

import { useState } from "react";
import { CodeWalkthrough } from "../../types";

interface CodeWalkthroughPanelProps {
  code: string;
  walkthroughs: CodeWalkthrough[];
}

/**
 * 代码逐行解析面板
 */
export function CodeWalkthroughPanel({ code, walkthroughs }: CodeWalkthroughPanelProps) {
  const [activeRange, setActiveRange] = useState<[number, number] | null>(null);
  const codeLines = code.split("\n");

  // 获取当前行的解析信息
  const getWalkthroughForLine = (lineNum: number) => {
    return walkthroughs.find(
      (w) => lineNum >= w.lineRange[0] && lineNum <= w.lineRange[1]
    );
  };

  // 检查行是否在活动范围内
  const isLineActive = (lineNum: number) => {
    if (!activeRange) return false;
    return lineNum >= activeRange[0] && lineNum <= activeRange[1];
  };

  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-700/50 overflow-hidden">
      <h3 className="text-lg font-semibold text-purple-400 p-4 border-b border-zinc-700/50 flex items-center gap-2">
        <span className="text-2xl">📖</span>
        代码逐行解析
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* 左侧：代码 */}
        <div className="border-r border-zinc-700/50 overflow-auto max-h-[600px]">
          <pre className="p-4 text-sm">
            {codeLines.map((line, index) => {
              const lineNum = index + 1;
              const walkthrough = getWalkthroughForLine(lineNum);
              const isActive = isLineActive(lineNum);
              const hasWalkthrough = !!walkthrough;

              return (
                <div
                  key={index}
                  className={`flex transition-colors ${
                    isActive
                      ? "bg-purple-500/20"
                      : hasWalkthrough
                      ? "hover:bg-zinc-800 cursor-pointer"
                      : ""
                  }`}
                  onClick={() => {
                    if (walkthrough) {
                      setActiveRange(
                        activeRange?.[0] === walkthrough.lineRange[0]
                          ? null
                          : walkthrough.lineRange
                      );
                    }
                  }}
                >
                  {/* 行号 */}
                  <span
                    className={`w-10 text-right pr-4 select-none ${
                      isActive ? "text-purple-400" : "text-zinc-600"
                    }`}
                  >
                    {lineNum}
                  </span>
                  {/* 代码内容 */}
                  <code
                    className={`flex-1 ${
                      isActive ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {line || " "}
                  </code>
                  {/* 指示器 */}
                  {hasWalkthrough && walkthrough.lineRange[0] === lineNum && (
                    <span className="text-purple-400 px-2">💡</span>
                  )}
                </div>
              );
            })}
          </pre>
        </div>

        {/* 右侧：解析列表 */}
        <div className="overflow-auto max-h-[600px] p-4 space-y-3">
          {walkthroughs.map((walkthrough, index) => {
            const isActive =
              activeRange?.[0] === walkthrough.lineRange[0];

            return (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? "bg-purple-500/20 border-purple-500/50"
                    : "bg-zinc-800/50 border-zinc-700/50 hover:border-zinc-600"
                }`}
                onClick={() =>
                  setActiveRange(isActive ? null : walkthrough.lineRange)
                }
              >
                {/* 行号标识 */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-zinc-700 rounded text-xs text-zinc-400">
                    行 {walkthrough.lineRange[0]}
                    {walkthrough.lineRange[0] !== walkthrough.lineRange[1] &&
                      ` - ${walkthrough.lineRange[1]}`}
                  </span>
                  {walkthrough.keyPoint && (
                    <span className="px-2 py-0.5 bg-yellow-500/20 rounded text-xs text-yellow-400">
                      重点
                    </span>
                  )}
                </div>

                {/* 解释 */}
                <p className="text-zinc-300 text-sm">{walkthrough.explanation}</p>

                {/* 重点标记 */}
                {walkthrough.keyPoint && (
                  <div className="mt-2 p-2 bg-yellow-500/10 rounded border border-yellow-500/30">
                    <span className="text-yellow-400 text-xs">⭐ 重点：</span>
                    <p className="text-yellow-200 text-sm mt-1">
                      {walkthrough.keyPoint}
                    </p>
                  </div>
                )}

                {/* 常见错误 */}
                {walkthrough.commonMistake && (
                  <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/30">
                    <span className="text-red-400 text-xs">⚠️ 易错点：</span>
                    <p className="text-red-200 text-sm mt-1">
                      {walkthrough.commonMistake}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
