"use client";

import { useState } from "react";
import { ThinkingStep } from "../../types";

interface ThinkingTimelineProps {
  steps: ThinkingStep[];
  onStepClick?: (step: number) => void;
}

/**
 * 思维过程时间线 - 展示从0到1的推导过程
 */
export function ThinkingTimeline({ steps, onStepClick }: ThinkingTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700/50">
      <h3 className="text-lg font-semibold text-green-400 mb-6 flex items-center gap-2">
        <span className="text-2xl">🧠</span>
        思维过程
      </h3>

      <div className="relative">
        {/* 时间线轴 */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />

        {/* 步骤列表 */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isExpanded = expandedStep === index;
            const isLast = index === steps.length - 1;

            return (
              <div
                key={step.step}
                className={`relative pl-14 ${!isLast ? "pb-4" : ""}`}
              >
                {/* 步骤节点 */}
                <div
                  className={`absolute left-4 w-5 h-5 rounded-full border-2 cursor-pointer transition-all ${
                    isExpanded
                      ? "bg-green-500 border-green-400 scale-125"
                      : "bg-zinc-100 dark:bg-zinc-800 border-green-500 hover:bg-green-500/20"
                  }`}
                  onClick={() => {
                    setExpandedStep(isExpanded ? null : index);
                    onStepClick?.(step.step);
                  }}
                >
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </span>
                </div>

                {/* 步骤内容 */}
                <div
                  className={`bg-zinc-100 dark:bg-zinc-800/50 rounded-lg p-4 border transition-all cursor-pointer ${
                    isExpanded
                      ? "border-green-500/50 bg-zinc-200 dark:bg-zinc-800"
                      : "border-zinc-200 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600"
                  }`}
                  onClick={() => setExpandedStep(isExpanded ? null : index)}
                >
                  {/* 标题 */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-zinc-200">{step.title}</h4>
                    <span
                      className={`text-zinc-400 dark:text-zinc-500 transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </div>

                  {/* 思考内容 */}
                  <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    <span className="text-blue-400">💭 思考：</span>
                    {step.thought}
                  </div>

                  {/* 展开内容 */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3 animate-fadeIn">
                      {/* 行动 */}
                      <div className="bg-black/30 rounded-lg p-3">
                        <span className="text-green-400 text-sm">⚡ 决策：</span>
                        <p className="text-zinc-700 dark:text-zinc-300 mt-1">{step.action}</p>
                      </div>

                      {/* 代码片段 */}
                      {step.codeSnippet && (
                        <div className="bg-black/50 rounded-lg p-3">
                          <span className="text-purple-400 text-sm">📝 对应代码：</span>
                          <pre className="mt-2 text-sm text-zinc-700 dark:text-zinc-300 overflow-x-auto">
                            <code>{step.codeSnippet}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
