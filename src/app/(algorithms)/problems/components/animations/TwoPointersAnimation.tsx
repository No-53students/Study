"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrayVisualizer } from "./ArrayVisualizer";

export interface TwoPointersStep {
  // 数组状态
  array: (number | string)[];
  // 左指针位置
  left: number;
  // 右指针位置
  right: number;
  // 当前操作说明
  description: string;
  // 可选：高亮的元素
  highlights?: {
    indices: number[];
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
    label?: string;
  }[];
  // 可选：比较中的元素
  comparing?: number[];
  // 可选：已完成的元素
  completed?: number[];
  // 可选：代码高亮行
  codeHighlight?: number[];
}

export interface TwoPointersAnimationProps {
  // 动画步骤
  steps: TwoPointersStep[];
  // 标题
  title?: string;
  // 左指针标签
  leftLabel?: string;
  // 右指针标签
  rightLabel?: string;
  // 代码（可选）
  code?: string;
  // 尺寸
  size?: "sm" | "md" | "lg";
}

export function TwoPointersAnimation({
  steps,
  title = "双指针演示",
  leftLabel = "left",
  rightLabel = "right",
  code,
  size = "md",
}: TwoPointersAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const step = steps[currentStep];
  const totalSteps = steps.length;

  // 清除定时器
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // 播放/暂停
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

  // 重置
  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep(0);
  }, [clearTimer]);

  // 上一步
  const prevStep = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, [clearTimer]);

  // 下一步
  const nextStep = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1));
  }, [clearTimer, totalSteps]);

  // 清理
  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  // 速度改变时重启播放
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
        <ArrayVisualizer
          array={step.array}
          pointers={[
            { index: step.left, label: leftLabel, color: "blue", position: "top" },
            { index: step.right, label: rightLabel, color: "green", position: "top" },
          ]}
          highlights={step.highlights}
          comparing={step.comparing}
          completed={step.completed}
          showIndices={true}
          size={size}
        />

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

      {/* 代码区域（可选） */}
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
                  animate={{
                    backgroundColor: step.codeHighlight?.includes(idx + 1)
                      ? "rgba(234, 179, 8, 0.2)"
                      : "transparent",
                  }}
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

        {/* 速度控制 */}
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

        {/* 进度条 */}
        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs ml-4">
          <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
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
