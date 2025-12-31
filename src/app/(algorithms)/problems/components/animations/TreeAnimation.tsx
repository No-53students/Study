"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TreeNode {
  value: number | string | null;
  id: string;
}

export interface TreeStep {
  // 树节点（层序遍历）
  nodes: (TreeNode | null)[];
  // 指针/访问标记
  pointers?: { [nodeId: string]: string[] };
  // 高亮节点
  highlights?: {
    nodeIds: string[];
    color: "blue" | "green" | "red" | "yellow" | "purple";
    label?: string;
  }[];
  // 当前操作说明
  description: string;
  // 访问路径（按顺序）
  visitPath?: string[];
}

export interface TreeAnimationProps {
  steps: TreeStep[];
  title?: string;
}

const colorMap = {
  blue: { bg: "bg-blue-500", border: "border-blue-500", shadow: "shadow-blue-500/50" },
  green: { bg: "bg-green-500", border: "border-green-500", shadow: "shadow-green-500/50" },
  red: { bg: "bg-red-500", border: "border-red-500", shadow: "shadow-red-500/50" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-500", shadow: "shadow-yellow-500/50" },
  purple: { bg: "bg-purple-500", border: "border-purple-500", shadow: "shadow-purple-500/50" },
};

export function TreeAnimation({
  steps,
  title = "二叉树演示",
}: TreeAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  // 如果没有步骤数据，显示空状态
  if (!step || totalSteps === 0) {
    return (
      <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden p-4">
        <p className="text-sm text-zinc-500 text-center">暂无动画数据</p>
      </div>
    );
  }

  // 计算树的层数
  const levels = useMemo(() => {
    const result: (TreeNode | null)[][] = [];
    let levelStart = 0;
    let levelSize = 1;

    while (levelStart < step.nodes.length) {
      const level = step.nodes.slice(levelStart, levelStart + levelSize);
      if (level.some((n) => n !== null)) {
        result.push(level);
      }
      levelStart += levelSize;
      levelSize *= 2;
    }

    return result;
  }, [step.nodes]);

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

  interface NodeStyle {
    bg: string;
    border: string;
    shadow: string;
    visited: boolean;
    order?: number;
  }

  const getNodeStyle = (nodeId: string): NodeStyle => {
    const visitIndex = step.visitPath?.indexOf(nodeId);
    if (visitIndex !== undefined && visitIndex >= 0) {
      return { ...colorMap.green, visited: true, order: visitIndex + 1 };
    }

    for (const highlight of step.highlights || []) {
      if (highlight.nodeIds.includes(nodeId)) {
        return { ...colorMap[highlight.color], visited: false };
      }
    }

    return { bg: "bg-zinc-700", border: "border-zinc-600", shadow: "", visited: false };
  };

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        <span className="text-xs text-zinc-400">步骤 {currentStep + 1} / {totalSteps}</span>
      </div>

      {/* 树可视化 */}
      <div className="p-6 overflow-x-auto">
        <div className="flex flex-col items-center gap-4 min-w-max">
          {levels.map((level, levelIdx) => {
            const nodeWidth = 48;
            const gap = Math.pow(2, levels.length - levelIdx - 1) * 24;

            return (
              <div
                key={levelIdx}
                className="flex justify-center items-start"
                style={{ gap: `${gap}px` }}
              >
                {level.map((node, nodeIdx) => {
                  if (!node) {
                    return (
                      <div
                        key={`empty-${levelIdx}-${nodeIdx}`}
                        className="w-12 h-12 opacity-0"
                      />
                    );
                  }

                  const style = getNodeStyle(node.id);
                  const pointerLabels = step.pointers?.[node.id] || [];

                  return (
                    <motion.div
                      key={node.id}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {/* 指针标签 */}
                      <AnimatePresence>
                        {pointerLabels.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mb-1 text-xs font-bold text-blue-400"
                          >
                            {pointerLabels.join(", ")}↓
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* 节点 */}
                      <motion.div
                        className={`relative w-12 h-12 ${style.bg} ${style.border} border-2 rounded-full flex items-center justify-center font-mono font-bold text-white ${style.visited ? `shadow-lg ${style.shadow}` : ""}`}
                        animate={{
                          scale: pointerLabels.length > 0 ? 1.15 : 1,
                        }}
                      >
                        {node.value}
                        {/* 访问顺序标记 */}
                        {style.visited && style.order && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-green-600 rounded-full text-xs flex items-center justify-center"
                          >
                            {style.order}
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* 步骤说明 */}
      <div className="px-4 pb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-lg bg-zinc-800/50 border border-zinc-700"
          >
            <p className="text-sm text-zinc-300">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 图例 */}
      {step.visitPath && step.visitPath.length > 0 && (
        <div className="px-4 pb-4">
          <div className="text-xs text-zinc-400">
            访问顺序: {step.visitPath.map((id, i) => {
              const node = step.nodes.find((n) => n?.id === id);
              return (
                <span key={id}>
                  {i > 0 && " → "}
                  <span className="text-green-400">{node?.value}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 控制栏 */}
      <div className="px-4 py-3 border-t border-zinc-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={reset} className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button onClick={prevStep} disabled={currentStep === 0} className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 disabled:opacity-30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={togglePlay} className={`p-2 rounded-lg ${isPlaying ? "bg-yellow-500/20 text-yellow-400" : "bg-blue-500/20 text-blue-400"}`}>
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
          <button onClick={nextStep} disabled={currentStep === totalSteps - 1} className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 disabled:opacity-30">
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
        </div>

        <div className="hidden sm:flex items-center flex-1 max-w-xs ml-4">
          <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div className="h-full bg-blue-500" animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
