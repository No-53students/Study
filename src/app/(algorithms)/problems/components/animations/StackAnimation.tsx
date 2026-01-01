"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StackStep {
  // 栈状态（从底到顶）
  stack: (number | string)[];
  // 当前操作
  operation?: "push" | "pop" | "peek" | "none";
  // 操作的值
  operationValue?: number | string;
  // 当前操作说明
  description: string;
  // 可选：高亮的栈元素索引
  highlights?: number[];
  // 可选：输入数组（显示待处理元素）
  inputArray?: (number | string)[];
  // 可选：当前处理的输入索引
  currentInputIndex?: number;
  // 可选：输出/结果
  output?: (number | string)[];
  // 可选：代码高亮行
  codeHighlight?: number[];
}

export interface StackAnimationProps {
  steps: StackStep[];
  title?: string;
  code?: string;
  size?: "sm" | "md" | "lg";
  showInput?: boolean;
  showOutput?: boolean;
}

const sizeConfig = {
  sm: { cell: "w-10 h-8 text-xs", width: "w-16" },
  md: { cell: "w-14 h-10 text-sm", width: "w-20" },
  lg: { cell: "w-18 h-12 text-base", width: "w-24" },
};

export function StackAnimation({
  steps,
  title = "栈操作演示",
  code,
  size = "md",
  showInput = true,
  showOutput = true,
}: StackAnimationProps) {
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

  const { cell, width } = sizeConfig[size];

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
        <div className="flex items-start justify-center gap-8">
          {/* 输入数组 */}
          {showInput && step.inputArray && (
            <div className="flex flex-col items-center">
              <div className="text-xs text-zinc-500 mb-2">输入</div>
              <div className="flex gap-1">
                {step.inputArray.map((val, idx) => (
                  <motion.div
                    key={idx}
                    className={`${cell} flex items-center justify-center rounded font-mono
                      ${idx === step.currentInputIndex
                        ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500"
                        : idx < (step.currentInputIndex ?? 0)
                          ? "bg-zinc-800/50 text-zinc-600"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
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

          {/* 栈可视化 */}
          <div className="flex flex-col items-center">
            <div className="text-xs text-zinc-500 mb-2">栈 (Stack)</div>
            <div className={`${width} relative min-h-[200px] flex flex-col-reverse items-center`}>
              {/* 栈底 */}
              <div className="w-full h-2 bg-zinc-600 rounded-b" />

              {/* 栈壁 */}
              <div className="absolute left-0 top-0 bottom-2 w-1 bg-zinc-600 rounded-l" />
              <div className="absolute right-0 top-0 bottom-2 w-1 bg-zinc-600 rounded-r" />

              {/* 栈元素 */}
              <AnimatePresence mode="popLayout">
                {step.stack.map((value, index) => {
                  const isTop = index === step.stack.length - 1;
                  const isHighlighted = step.highlights?.includes(index);

                  return (
                    <motion.div
                      key={`stack-${index}-${value}`}
                      initial={{ opacity: 0, y: -30, scale: 0.8 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        backgroundColor: isHighlighted
                          ? "rgba(168, 85, 247, 0.4)"
                          : isTop
                            ? "rgba(59, 130, 246, 0.4)"
                            : "rgba(63, 63, 70, 1)"
                      }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ duration: 0.3, type: "spring" }}
                      className={`w-full ${cell} flex items-center justify-center font-mono font-medium rounded
                        ${isTop
                          ? "text-blue-300 border border-blue-500/50"
                          : isHighlighted
                            ? "text-purple-300 border border-purple-500/50"
                            : "text-zinc-300 border border-zinc-600"
                        }
                      `}
                      style={{ marginBottom: "2px" }}
                    >
                      {value}
                      {isTop && (
                        <span className="absolute -right-8 text-[10px] text-blue-400">← top</span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* 空栈提示 */}
              {step.stack.length === 0 && (
                <div className="text-xs text-zinc-600 absolute top-1/2 -translate-y-1/2">
                  (空栈)
                </div>
              )}

              {/* 操作指示器 */}
              {step.operation && step.operation !== "none" && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`absolute -top-8 px-2 py-1 rounded text-xs font-medium
                    ${step.operation === "push"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : step.operation === "pop"
                        ? "bg-red-500/20 text-red-400 border border-red-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }
                  `}
                >
                  {step.operation}({step.operationValue})
                </motion.div>
              )}
            </div>
          </div>

          {/* 输出结果 */}
          {showOutput && step.output && (
            <div className="flex flex-col items-center">
              <div className="text-xs text-zinc-500 mb-2">输出</div>
              <div className="flex gap-1">
                {step.output.map((val, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`${cell} flex items-center justify-center rounded font-mono
                      bg-green-500/20 text-green-300 border border-green-500/50
                    `}
                  >
                    {val}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

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
              className="h-full bg-purple-500"
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
