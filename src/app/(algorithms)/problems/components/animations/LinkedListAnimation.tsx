"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface LinkedListNode {
  value: number | string;
  id: string;
}

export interface LinkedListStep {
  // 链表节点
  nodes: LinkedListNode[];
  // 指针位置（节点id到指针标签的映射）
  pointers?: { [nodeId: string]: string[] };
  // 高亮节点
  highlights?: {
    nodeIds: string[];
    color: "blue" | "green" | "red" | "yellow" | "purple";
  }[];
  // 当前操作说明
  description: string;
  // 新连接（从id到id）
  newConnections?: { from: string; to: string }[];
  // 断开的连接
  brokenConnections?: { from: string; to: string }[];
}

export interface LinkedListAnimationProps {
  steps: LinkedListStep[];
  title?: string;
}

const colorMap = {
  blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-600 dark:text-blue-400" },
  green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-600 dark:text-green-400" },
  red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-600 dark:text-red-400" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-600 dark:text-yellow-400" },
  purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-600 dark:text-purple-400" },
};

export function LinkedListAnimation({
  steps,
  title = "链表演示",
}: LinkedListAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const step = steps[currentStep];

  // 如果没有步骤数据，显示空状态
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

  const getNodeStyle = (nodeId: string) => {
    for (const highlight of step.highlights || []) {
      if (highlight.nodeIds.includes(nodeId)) {
        return colorMap[highlight.color];
      }
    }
    return { bg: "bg-zinc-700", border: "border-zinc-600", text: "text-zinc-600 dark:text-zinc-400" };
  };

  const isConnectionBroken = (fromId: string, toId: string) => {
    return step.brokenConnections?.some(
      (c) => c.from === fromId && c.to === toId
    );
  };

  const isNewConnection = (fromId: string, toId: string) => {
    return step.newConnections?.some(
      (c) => c.from === fromId && c.to === toId
    );
  };

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">{title}</h3>
        <span className="text-xs text-zinc-600 dark:text-zinc-400">步骤 {currentStep + 1} / {totalSteps}</span>
      </div>

      {/* 动画区域 */}
      <div className="p-6 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <AnimatePresence>
            {step.nodes.map((node, idx) => {
              const style = getNodeStyle(node.id);
              const pointerLabels = step.pointers?.[node.id] || [];
              const nextNode = step.nodes[idx + 1];
              const isBroken = nextNode && isConnectionBroken(node.id, nextNode.id);
              const isNew = nextNode && isNewConnection(node.id, nextNode.id);

              return (
                <motion.div
                  key={node.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* 节点 */}
                  <div className="flex flex-col items-center">
                    {/* 指针标签 */}
                    <div className="h-6 flex flex-col items-center">
                      <AnimatePresence>
                        {pointerLabels.map((label) => (
                          <motion.span
                            key={label}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs font-bold text-blue-600 dark:text-blue-400"
                          >
                            {label}↓
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* 节点本体 */}
                    <motion.div
                      className={`w-12 h-12 ${style.bg} ${style.border} border-2 rounded-lg flex items-center justify-center font-mono font-bold text-white shadow-lg`}
                      animate={{
                        scale: pointerLabels.length > 0 ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {node.value}
                    </motion.div>
                  </div>

                  {/* 箭头 */}
                  {idx < step.nodes.length - 1 && (
                    <motion.div
                      className="flex items-center mx-1"
                      animate={{
                        opacity: isBroken ? 0.3 : 1,
                      }}
                    >
                      <motion.div
                        className={`w-8 h-0.5 ${
                          isNew
                            ? "bg-green-500"
                            : isBroken
                            ? "bg-red-500"
                            : "bg-zinc-500"
                        }`}
                        animate={{
                          scaleX: isBroken ? 0.5 : 1,
                        }}
                        style={{ originX: 0 }}
                      />
                      <motion.div
                        className={`w-0 h-0 border-t-4 border-b-4 border-l-6 ${
                          isNew
                            ? "border-l-green-500"
                            : isBroken
                            ? "border-l-red-500"
                            : "border-l-zinc-500"
                        } border-t-transparent border-b-transparent`}
                        animate={{
                          opacity: isBroken ? 0.3 : 1,
                        }}
                      />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* null 终止符 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center"
            >
              <div className="w-8 h-0.5 bg-zinc-500" />
              <div className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded text-xs text-zinc-500 font-mono">
                null
              </div>
            </motion.div>
          </AnimatePresence>
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
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700"
          >
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{step.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>

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
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors disabled:opacity-30"
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
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-blue-500/20 text-blue-400"
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
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors disabled:opacity-30"
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
        </div>

        <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs ml-4">
          <div className="flex-1 h-1 bg-zinc-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
