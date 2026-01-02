"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface HashEntry {
  key: string | number;
  value: string | number;
  highlight?: "add" | "update" | "lookup" | "delete" | "found";
}

export interface HashTableStep {
  // 哈希表状态
  entries: HashEntry[];
  // 当前操作
  operation?: "set" | "get" | "delete" | "has" | "none";
  // 操作的键
  operationKey?: string | number;
  // 操作的值
  operationValue?: string | number;
  // 当前操作说明
  description: string;
  // 可选：输入数组
  inputArray?: (number | string)[];
  // 可选：当前处理的输入索引
  currentInputIndex?: number;
  // 可选：查找结果
  lookupResult?: string | number | null;
  // 可选：代码高亮行
  codeHighlight?: number[];
}

export interface HashTableAnimationProps {
  steps: HashTableStep[];
  title?: string;
  code?: string;
  size?: "sm" | "md" | "lg";
  showInput?: boolean;
}

const sizeConfig = {
  sm: { cell: "text-xs px-2 py-1", row: "h-7" },
  md: { cell: "text-sm px-3 py-1.5", row: "h-9" },
  lg: { cell: "text-base px-4 py-2", row: "h-11" },
};

const highlightColors = {
  add: "bg-green-500/30 border-green-500/50 text-green-300",
  update: "bg-yellow-500/30 border-yellow-500/50 text-yellow-300",
  lookup: "bg-blue-500/30 border-blue-500/50 text-blue-300",
  delete: "bg-red-500/30 border-red-500/50 text-red-300",
  found: "bg-purple-500/30 border-purple-500/50 text-purple-300",
};

export function HashTableAnimation({
  steps,
  title = "哈希表演示",
  code,
  size = "md",
  showInput = true,
}: HashTableAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  if (!step || totalSteps === 0) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80 overflow-hidden p-4">
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

  const { cell, row } = sizeConfig[size];

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{title}</h3>
        <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
          <span>步骤 {currentStep + 1} / {totalSteps}</span>
        </div>
      </div>

      {/* 动画区域 */}
      <div className="p-4">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-6">
          {/* 输入数组 */}
          {showInput && step.inputArray && (
            <div className="flex flex-col items-center">
              <div className="text-xs text-zinc-500 mb-2">输入数组</div>
              <div className="flex gap-1 flex-wrap justify-center">
                {step.inputArray.map((val, idx) => (
                  <motion.div
                    key={idx}
                    className={`w-10 h-10 flex items-center justify-center rounded font-mono text-sm
                      ${idx === step.currentInputIndex
                        ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500"
                        : idx < (step.currentInputIndex ?? 0)
                          ? "bg-zinc-100/50 dark:bg-zinc-800/50 text-zinc-600 border border-zinc-200/50 dark:border-zinc-700/50"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                      }
                    `}
                    animate={{
                      scale: idx === step.currentInputIndex ? 1.1 : 1,
                    }}
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 哈希表可视化 */}
          <div className="flex flex-col items-center flex-1 min-w-[250px]">
            <div className="text-xs text-zinc-500 mb-2 flex items-center gap-2">
              <span>HashMap</span>
              <span className="text-zinc-600">({step.entries.length} 项)</span>
            </div>

            <div className="w-full max-w-md rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
              {/* 表头 */}
              <div className={`flex border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800/50 ${row}`}>
                <div className={`flex-1 ${cell} font-medium text-zinc-700 dark:text-zinc-400 border-r border-zinc-200 dark:border-zinc-700`}>Key</div>
                <div className={`flex-1 ${cell} font-medium text-zinc-700 dark:text-zinc-400`}>Value</div>
              </div>

              {/* 表内容 */}
              <div className="max-h-[200px] overflow-y-auto">
                <AnimatePresence mode="popLayout">
                  {step.entries.length === 0 ? (
                    <div className="p-4 text-center text-zinc-600 text-sm">(空表)</div>
                  ) : (
                    step.entries.map((entry, index) => (
                      <motion.div
                        key={`${entry.key}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className={`flex border-b border-zinc-200/50 dark:border-zinc-700/50 ${row}
                          ${entry.highlight
                            ? highlightColors[entry.highlight]
                            : "bg-white dark:bg-zinc-900"
                          }
                        `}
                      >
                        <div className={`flex-1 ${cell} font-mono border-r border-zinc-200/50 dark:border-zinc-700/50 flex items-center`}>
                          <span className="text-cyan-600 dark:text-cyan-400">&quot;{entry.key}&quot;</span>
                        </div>
                        <div className={`flex-1 ${cell} font-mono flex items-center`}>
                          <motion.span
                            key={`${entry.key}-${entry.value}`}
                            initial={{ scale: 1.2 }}
                            animate={{ scale: 1 }}
                            className={entry.highlight === "update" ? "text-yellow-300" : "text-green-400"}
                          >
                            {typeof entry.value === "string" ? `"${entry.value}"` : entry.value}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 操作指示器 */}
            {step.operation && step.operation !== "none" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center gap-2"
              >
                <span className={`px-3 py-1 rounded-full text-xs font-medium
                  ${step.operation === "set"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : step.operation === "get"
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : step.operation === "delete"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                  }
                `}>
                  map.{step.operation}({step.operationKey}
                  {step.operation === "set" && step.operationValue !== undefined && `, ${step.operationValue}`})
                </span>
                {step.lookupResult !== undefined && (
                  <span className="text-sm">
                    → <span className="text-green-400 font-mono">{step.lookupResult === null ? "undefined" : step.lookupResult}</span>
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>

        {/* 步骤说明 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 图例 */}
      <div className="px-4 pb-2 flex flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500/50" />
          <span className="text-zinc-500">新增</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-500/30 border border-yellow-500/50" />
          <span className="text-zinc-500">更新</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-blue-500/30 border border-blue-500/50" />
          <span className="text-zinc-500">查找</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500/50" />
          <span className="text-zinc-500">找到</span>
        </div>
      </div>

      {/* 代码区域 */}
      {code && (
        <div className="px-4 pb-4">
          <div className="rounded-lg bg-white dark:bg-zinc-950 p-3 text-xs font-mono overflow-x-auto">
            <pre className="text-zinc-600 dark:text-zinc-400">
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
      <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
            title="重置"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
              className="h-full bg-green-500"
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
