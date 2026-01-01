"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface SlidingWindowStep {
  // 数组状态
  array: (number | string)[];
  // 窗口左边界
  windowStart: number;
  // 窗口右边界
  windowEnd: number;
  // 当前操作说明
  description: string;
  // 可选：窗口内的计算结果
  windowValue?: number | string;
  // 可选：最佳结果
  bestValue?: number | string;
  // 可选：高亮元素
  highlights?: {
    indices: number[];
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
    label?: string;
  }[];
  // 可选：代码高亮行
  codeHighlight?: number[];
}

export interface SlidingWindowAnimationProps {
  steps: SlidingWindowStep[];
  title?: string;
  code?: string;
  size?: "sm" | "md" | "lg";
  showSum?: boolean;
}

const sizeConfig = {
  sm: { cell: "w-8 h-8 text-xs", gap: "gap-0.5" },
  md: { cell: "w-12 h-12 text-sm", gap: "gap-1" },
  lg: { cell: "w-16 h-16 text-base", gap: "gap-2" },
};

export function SlidingWindowAnimation({
  steps,
  title = "滑动窗口演示",
  code,
  size = "md",
  showSum = true,
}: SlidingWindowAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  if (!step || totalSteps === 0) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden p-4">
        <p className="text-sm text-zinc-500 text-center">暂无动画数据</p>
      </div>
    );
  }

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      clearTimer();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            clearTimer();
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
  }, [isPlaying, speed, totalSteps, clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep(0);
  }, [clearTimer]);

  const prevStep = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, [clearTimer]);

  const nextStep = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  }, [clearTimer, totalSteps]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  useEffect(() => {
    if (isPlaying) {
      clearTimer();
      intervalRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalSteps - 1) {
            clearTimer();
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
  }, [speed, isPlaying, totalSteps, clearTimer]);

  const { cell, gap } = sizeConfig[size];

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>步骤 {currentStep + 1} / {totalSteps}</span>
        </div>
      </div>

      {/* 动画区域 */}
      <div className="p-4">
        {/* 数组可视化 */}
        <div className="flex flex-col items-center">
          <div className={`flex ${gap} relative`}>
            {step.array.map((value, index) => {
              const isInWindow = index >= step.windowStart && index <= step.windowEnd;
              const highlight = step.highlights?.find(h => h.indices.includes(index));

              return (
                <motion.div
                  key={index}
                  className={`${cell} flex items-center justify-center rounded-lg font-mono font-medium relative
                    ${isInWindow
                      ? "bg-gradient-to-br from-cyan-500/40 to-blue-500/40 text-cyan-200 border-2 border-cyan-400/50"
                      : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }
                    ${highlight ? `ring-2 ring-${highlight.color}-400` : ""}
                  `}
                  animate={{
                    scale: isInWindow ? 1.05 : 1,
                    y: isInWindow ? -4 : 0,
                  }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  {value}
                  {/* 索引 */}
                  <span className="absolute -bottom-5 text-[10px] text-zinc-500">
                    {index}
                  </span>
                </motion.div>
              );
            })}

            {/* 窗口边界指示器 */}
            <motion.div
              className="absolute -top-6 flex items-center justify-center"
              animate={{
                left: `calc(${step.windowStart * (size === "sm" ? 34 : size === "md" ? 52 : 68)}px)`,
                width: `calc(${(step.windowEnd - step.windowStart + 1) * (size === "sm" ? 34 : size === "md" ? 52 : 68)}px)`,
              }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <div className="flex items-center gap-1 bg-cyan-500/20 px-2 py-0.5 rounded text-xs text-cyan-400 border border-cyan-500/30">
                <span>窗口</span>
                <span className="text-cyan-300">[{step.windowStart}, {step.windowEnd}]</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 窗口统计信息 */}
        {showSum && (
          <div className="mt-8 flex justify-center gap-6">
            {step.windowValue !== undefined && (
              <motion.div
                className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.3 }}
                key={`window-${currentStep}`}
              >
                <span className="text-xs text-zinc-400">窗口值: </span>
                <span className="text-lg font-bold text-cyan-400">{step.windowValue}</span>
              </motion.div>
            )}
            {step.bestValue !== undefined && (
              <motion.div className="px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/30">
                <span className="text-xs text-zinc-400">最佳值: </span>
                <span className="text-lg font-bold text-green-400">{step.bestValue}</span>
              </motion.div>
            )}
          </div>
        )}

        {/* 步骤说明 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
          >
            <p className="text-sm text-zinc-300">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 代码区域 */}
      {code && (
        <div className="px-4 pb-4">
          <div className="rounded-lg bg-zinc-950 p-3 text-xs font-mono overflow-x-auto">
            <pre className="text-zinc-400">
              {code.split("\n").map((line, idx) => (
                <motion.div
                  key={idx}
                  className={`${
                    step.codeHighlight?.includes(idx + 1)
                      ? "bg-yellow-500/20 text-yellow-300"
                      : ""
                  } px-2 -mx-2`}
                >
                  <span className="text-zinc-600 select-none mr-4">
                    {String(idx + 1).padStart(2, " ")}
                  </span>
                  {line}
                </motion.div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {/* 控制栏 */}
      <div className="px-4 py-3 border-t border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="重置"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="上一步"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={togglePlay}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying
                ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30"
            }`}
            title={isPlaying ? "暂停" : "播放"}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="下一步"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">速度:</span>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={2200 - speed}
            onChange={(e) => setSpeed(2200 - parseInt(e.target.value))}
            className="w-20 h-1 accent-blue-500"
          />
          <span className="text-xs text-zinc-500 w-12">{(speed / 1000).toFixed(1)}s</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs ml-4">
          <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
