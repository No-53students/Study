"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface MatrixStep {
  // 矩阵数据
  matrix: (number | string)[][];
  // 高亮单元格
  highlights?: {
    cells: [number, number][]; // [row, col]
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange";
    label?: string;
  }[];
  // 当前单元格
  current?: [number, number];
  // 访问过的单元格
  visited?: [number, number][];
  // 路径
  path?: [number, number][];
  // 当前操作说明
  description: string;
}

export interface MatrixAnimationProps {
  steps: MatrixStep[];
  title?: string;
  showCoordinates?: boolean;
}

const colorMap = {
  blue: { bg: "bg-blue-500", border: "border-blue-500", shadow: "shadow-blue-500/50" },
  green: { bg: "bg-green-500", border: "border-green-500", shadow: "shadow-green-500/50" },
  red: { bg: "bg-red-500", border: "border-red-500", shadow: "shadow-red-500/50" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-500", shadow: "shadow-yellow-500/50" },
  purple: { bg: "bg-purple-500", border: "border-purple-500", shadow: "shadow-purple-500/50" },
  orange: { bg: "bg-orange-500", border: "border-orange-500", shadow: "shadow-orange-500/50" },
};

export function MatrixAnimation({
  steps,
  title = "矩阵演示",
  showCoordinates = true,
}: MatrixAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
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

  interface CellStyle {
    bg: string;
    border: string;
    shadow: string;
    isCurrent?: boolean;
    pathOrder?: number;
  }

  const getCellStyle = (row: number, col: number): CellStyle => {
    // 当前单元格
    if (step.current && step.current[0] === row && step.current[1] === col) {
      return { ...colorMap.purple, isCurrent: true };
    }

    // 路径上的单元格
    const pathIndex = step.path?.findIndex((p) => p[0] === row && p[1] === col);
    if (pathIndex !== undefined && pathIndex >= 0) {
      return { ...colorMap.green, pathOrder: pathIndex + 1 };
    }

    // 高亮单元格
    for (const highlight of step.highlights || []) {
      if (highlight.cells.some((c) => c[0] === row && c[1] === col)) {
        return colorMap[highlight.color];
      }
    }

    // 已访问单元格
    if (step.visited?.some((v) => v[0] === row && v[1] === col)) {
      return { bg: "bg-zinc-600", border: "border-zinc-500", shadow: "" };
    }

    return { bg: "bg-zinc-800", border: "border-zinc-700", shadow: "" };
  };

  const rows = step.matrix.length;
  const cols = step.matrix[0]?.length || 0;

  return (
    <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 overflow-hidden">
      {/* 头部 */}
      <div className="px-4 py-3 border-b border-zinc-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-200">{title}</h3>
        <span className="text-xs text-zinc-400">步骤 {currentStep + 1} / {totalSteps}</span>
      </div>

      {/* 矩阵可视化 */}
      <div className="p-6 overflow-x-auto">
        <div className="inline-block">
          {/* 列索引 */}
          {showCoordinates && (
            <div className="flex ml-8 mb-1">
              {Array.from({ length: cols }).map((_, col) => (
                <div key={col} className="w-10 text-center text-xs text-zinc-500">
                  {col}
                </div>
              ))}
            </div>
          )}

          {/* 矩阵行 */}
          {step.matrix.map((row, rowIdx) => (
            <div key={rowIdx} className="flex items-center">
              {/* 行索引 */}
              {showCoordinates && (
                <div className="w-8 text-right pr-2 text-xs text-zinc-500">
                  {rowIdx}
                </div>
              )}

              {/* 单元格 */}
              <div className="flex">
                {row.map((cell, colIdx) => {
                  const style = getCellStyle(rowIdx, colIdx);

                  return (
                    <motion.div
                      key={`${rowIdx}-${colIdx}`}
                      className={`relative w-10 h-10 ${style.bg} ${style.border} border flex items-center justify-center font-mono text-sm text-white ${style.isCurrent ? `shadow-lg ${style.shadow}` : ""}`}
                      animate={{
                        scale: style.isCurrent ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {cell}
                      {/* 路径顺序 */}
                      {style.pathOrder && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full text-[10px] flex items-center justify-center"
                        >
                          {style.pathOrder}
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
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
      <div className="px-4 pb-4 flex flex-wrap gap-3 text-xs text-zinc-400">
        {step.current && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500 shadow shadow-purple-500/50"></span>
            当前位置
          </span>
        )}
        {step.path && step.path.length > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-green-500"></span>
            路径
          </span>
        )}
        {step.visited && step.visited.length > 0 && (
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-zinc-600"></span>
            已访问
          </span>
        )}
        {step.highlights?.map((h, i) => (
          h.label && (
            <span key={i} className="flex items-center gap-1.5">
              <span className={`w-3 h-3 rounded ${colorMap[h.color].bg}`}></span>
              {h.label}
            </span>
          )
        ))}
      </div>

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
            max="1500"
            step="100"
            value={1700 - speed}
            onChange={(e) => setSpeed(1700 - parseInt(e.target.value))}
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
