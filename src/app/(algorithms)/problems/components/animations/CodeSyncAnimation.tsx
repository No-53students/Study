"use client";

import { useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VariableWatcher, VariableValue, ExecutionResult } from "./VariableWatcher";

/**
 * 代码同步动画步骤接口
 * 将动画可视化与代码执行紧密关联
 */
export interface CodeSyncStep {
  /** 步骤描述 */
  description: string;

  /** 高亮的代码行号（1-based） */
  codeHighlight?: number[];

  /** 当前执行的代码行（用于显示执行指示器） */
  executingLine?: number;

  /** 变量状态 */
  variables?: VariableValue[];

  /** 中间结果或返回值 */
  result?: {
    value: unknown;
    label?: string;
    success?: boolean;
  };

  /** 思考提示：帮助理解这一步在做什么 */
  thought?: string;

  /** 代码片段注释：对当前执行代码的解释 */
  codeComment?: string;
}

export interface CodeSyncAnimationProps {
  /** 标题 */
  title?: string;

  /** 完整的解法代码 */
  code: string;

  /** 动画步骤 */
  steps: CodeSyncStep[];

  /** 渲染动画可视化的函数 */
  renderVisualization: (stepIndex: number) => ReactNode;

  /** 代码语言（用于语法高亮） */
  language?: "typescript" | "javascript";

  /** 布局模式 */
  layout?: "split" | "stacked";

  /** 动画播放速度（毫秒） */
  defaultSpeed?: number;

  /** 是否自动播放 */
  autoPlay?: boolean;

  /** 是否循环播放 */
  loop?: boolean;

  /** 紧凑模式 */
  compact?: boolean;
}

/**
 * 代码同步动画组件
 *
 * 核心功能：
 * 1. 左侧显示数据结构可视化（数组、链表、树等）
 * 2. 右侧显示代码，当前执行行高亮
 * 3. 底部显示变量监视器，实时显示变量值
 * 4. 步骤描述和思考提示
 */
export function CodeSyncAnimation({
  title = "算法演示",
  code,
  steps,
  renderVisualization,
  language = "typescript",
  layout = "split",
  defaultSpeed = 1000,
  autoPlay = false,
  loop = false,
  compact = false,
}: CodeSyncAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(defaultSpeed);
  const [showCode, setShowCode] = useState(true);
  const [showVariables, setShowVariables] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];
  const codeLines = code.split("\n");

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
            if (loop) {
              return 0;
            }
            clearTimer();
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
  }, [isPlaying, speed, totalSteps, loop, clearTimer]);

  // 重置
  const reset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep(0);
  }, [clearTimer]);

  // 上一步/下一步
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

  // 跳转到指定步骤
  const goToStep = useCallback((stepIndex: number) => {
    clearTimer();
    setIsPlaying(false);
    setCurrentStep(Math.max(0, Math.min(totalSteps - 1, stepIndex)));
  }, [clearTimer, totalSteps]);

  // 清理定时器
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
            if (loop) return 0;
            clearTimer();
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
  }, [speed, isPlaying, totalSteps, loop, clearTimer]);

  // 自动滚动到高亮行
  useEffect(() => {
    if (codeContainerRef.current && step?.executingLine) {
      const lineElement = codeContainerRef.current.querySelector(
        `[data-line="${step.executingLine}"]`
      );
      if (lineElement) {
        lineElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [step?.executingLine]);

  if (!step || totalSteps === 0) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 p-8">
        <p className="text-sm text-zinc-500 text-center">暂无动画数据</p>
      </div>
    );
  }

  const isSplit = layout === "split";

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showCode
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              代码
            </button>
            <button
              onClick={() => setShowVariables(!showVariables)}
              className={`px-2 py-1 rounded text-xs transition-colors ${
                showVariables
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-zinc-700 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              变量
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <span>
            步骤 {currentStep + 1} / {totalSteps}
          </span>
        </div>
      </div>

      {/* 主内容区 */}
      <div className={`${isSplit ? "flex" : "flex flex-col"}`}>
        {/* 左侧：动画可视化 */}
        <div
          className={`${
            isSplit ? "flex-1 border-r border-zinc-700" : "w-full"
          } p-4`}
        >
          {/* 可视化区域 */}
          <div className="mb-4">{renderVisualization(currentStep)}</div>

          {/* 步骤描述 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {/* 主描述 */}
              <div className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
                <p className="text-sm text-zinc-300">{step.description}</p>
              </div>

              {/* 思考提示 */}
              {step.thought && (
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💭</span>
                    <p className="text-sm text-purple-300">{step.thought}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 右侧：代码和变量 */}
        {(showCode || showVariables) && (
          <div
            className={`${
              isSplit ? "w-[400px]" : "w-full border-t border-zinc-700"
            } flex flex-col`}
          >
            {/* 代码区域 */}
            {showCode && (
              <div
                ref={codeContainerRef}
                className="flex-1 overflow-auto max-h-[400px]"
              >
                <div className="p-3 font-mono text-xs leading-relaxed">
                  {codeLines.map((line, idx) => {
                    const lineNum = idx + 1;
                    const isHighlighted = step.codeHighlight?.includes(lineNum);
                    const isExecuting = step.executingLine === lineNum;

                    return (
                      <motion.div
                        key={idx}
                        data-line={lineNum}
                        className={`flex px-2 -mx-2 rounded ${
                          isExecuting
                            ? "bg-yellow-500/20"
                            : isHighlighted
                            ? "bg-blue-500/10"
                            : ""
                        }`}
                        animate={{
                          backgroundColor: isExecuting
                            ? "rgba(234, 179, 8, 0.2)"
                            : isHighlighted
                            ? "rgba(59, 130, 246, 0.1)"
                            : "transparent",
                        }}
                      >
                        {/* 行号 */}
                        <span className="text-zinc-600 select-none w-8 text-right mr-3 flex-shrink-0">
                          {lineNum}
                        </span>

                        {/* 执行指示器 */}
                        <span className="w-4 flex-shrink-0">
                          {isExecuting && (
                            <motion.span
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-yellow-400"
                            >
                              ▶
                            </motion.span>
                          )}
                        </span>

                        {/* 代码内容 */}
                        <span
                          className={`flex-1 ${
                            isExecuting
                              ? "text-yellow-300"
                              : isHighlighted
                              ? "text-blue-300"
                              : "text-zinc-400"
                          }`}
                        >
                          {line || " "}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 代码注释 */}
            {showCode && step.codeComment && (
              <div className="px-3 pb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <p className="text-xs text-amber-300">{step.codeComment}</p>
                </div>
              </div>
            )}

            {/* 变量监视器 */}
            {showVariables && step.variables && step.variables.length > 0 && (
              <div className="p-3 border-t border-zinc-700">
                <VariableWatcher
                  variables={step.variables}
                  compact={compact}
                  layout="vertical"
                />
              </div>
            )}

            {/* 执行结果 */}
            {step.result && (
              <div className="p-3 border-t border-zinc-700">
                <ExecutionResult
                  value={step.result.value}
                  label={step.result.label}
                  success={step.result.success}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 控制栏 */}
      <div className="px-4 py-3 border-t border-zinc-700 flex items-center justify-between gap-4">
        {/* 播放控制 */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors"
            title="重置"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="上一步"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === totalSteps - 1}
            className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            title="下一步"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
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
          <span className="text-xs text-zinc-500 w-12">
            {(speed / 1000).toFixed(1)}s
          </span>
        </div>

        {/* 进度条/步骤指示器 */}
        <div className="hidden sm:flex items-center gap-1 flex-1 max-w-xs overflow-x-auto">
          {totalSteps <= 12 ? (
            // 少于12步显示点状指示器
            steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToStep(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentStep
                    ? "w-4 bg-blue-500"
                    : idx < currentStep
                    ? "bg-blue-400/50"
                    : "bg-zinc-600"
                }`}
                title={`步骤 ${idx + 1}`}
              />
            ))
          ) : (
            // 多于12步显示进度条
            <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentStep + 1) / totalSteps) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * 快捷方式：创建变量值
 */
export function createVariable(
  name: string,
  value: VariableValue["value"],
  options?: {
    changed?: boolean;
    description?: string;
    type?: VariableValue["type"];
  }
): VariableValue {
  return {
    name,
    value,
    ...options,
  };
}

/**
 * 快捷方式：创建代码同步步骤
 */
export function createStep(
  description: string,
  options?: Partial<Omit<CodeSyncStep, "description">>
): CodeSyncStep {
  return {
    description,
    ...options,
  };
}
