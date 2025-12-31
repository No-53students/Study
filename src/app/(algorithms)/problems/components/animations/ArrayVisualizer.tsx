"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

export interface ArrayVisualizerProps {
  array: (number | string)[];
  // 高亮的索引
  highlights?: {
    indices: number[];
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
    label?: string;
  }[];
  // 指针位置
  pointers?: {
    index: number;
    label: string;
    color: "blue" | "green" | "red" | "yellow" | "purple";
    position?: "top" | "bottom";
  }[];
  // 比较中的元素
  comparing?: number[];
  // 交换中的元素
  swapping?: number[];
  // 已完成/已排序的元素
  completed?: number[];
  // 当前处理的元素
  current?: number;
  // 显示索引
  showIndices?: boolean;
  // 显示为条形图模式（适合排序）
  barMode?: boolean;
  // 标题
  title?: string;
  // 说明文字
  description?: string;
  // 尺寸
  size?: "sm" | "md" | "lg";
  // 动画持续时间
  animationDuration?: number;
}

const colorMap = {
  blue: { bg: "bg-blue-500", border: "border-blue-600", shadow: "shadow-blue-500/50" },
  green: { bg: "bg-green-500", border: "border-green-600", shadow: "shadow-green-500/50" },
  red: { bg: "bg-red-500", border: "border-red-600", shadow: "shadow-red-500/50" },
  yellow: { bg: "bg-yellow-500", border: "border-yellow-600", shadow: "shadow-yellow-500/50" },
  purple: { bg: "bg-purple-500", border: "border-purple-600", shadow: "shadow-purple-500/50" },
  orange: { bg: "bg-orange-500", border: "border-orange-600", shadow: "shadow-orange-500/50" },
  gray: { bg: "bg-zinc-500", border: "border-zinc-600", shadow: "shadow-zinc-500/50" },
};

const pointerColorMap = {
  blue: "text-blue-400",
  green: "text-green-400",
  red: "text-red-400",
  yellow: "text-yellow-400",
  purple: "text-purple-400",
};

const sizeMap = {
  sm: { cell: "w-8 h-8 text-xs", pointer: "text-[10px]" },
  md: { cell: "w-10 h-10 text-sm", pointer: "text-xs" },
  lg: { cell: "w-12 h-12 text-base", pointer: "text-sm" },
};

export function ArrayVisualizer({
  array,
  highlights = [],
  pointers = [],
  comparing = [],
  swapping = [],
  completed = [],
  current,
  showIndices = true,
  barMode = false,
  title,
  description,
  size = "md",
  animationDuration = 0.3,
}: ArrayVisualizerProps) {
  const maxValue = useMemo(() => {
    if (!barMode) return 0;
    return Math.max(...array.map((v) => (typeof v === "number" ? v : 0)), 1);
  }, [array, barMode]);

  const getCellStyle = (index: number) => {
    // 优先级：swapping > comparing > current > completed > highlights > default
    if (swapping.includes(index)) {
      return {
        color: colorMap.red,
        scale: 1.15,
        glow: true,
        rotate: [0, -5, 5, 0],
      };
    }
    if (comparing.includes(index)) {
      return { color: colorMap.yellow, scale: 1.1, glow: true };
    }
    if (current === index) {
      return { color: colorMap.purple, scale: 1.05, glow: true };
    }
    if (completed.includes(index)) {
      return { color: colorMap.green, scale: 1.0 };
    }

    // 检查 highlights
    for (const highlight of highlights) {
      if (highlight.indices.includes(index)) {
        return { color: colorMap[highlight.color], scale: 1.0 };
      }
    }

    return {
      color: { bg: "bg-zinc-700", border: "border-zinc-600", shadow: "" },
      scale: 1.0
    };
  };

  const { cell: cellSize, pointer: pointerSize } = sizeMap[size];

  if (barMode) {
    return (
      <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
        {title && <h4 className="text-sm font-medium mb-2 text-zinc-300">{title}</h4>}
        {description && <p className="text-xs text-zinc-500 mb-3">{description}</p>}

        <div className="flex items-end justify-center gap-1 h-40 px-2">
          {array.map((value, idx) => {
            const numValue = typeof value === "number" ? value : 0;
            const height = (numValue / maxValue) * 100;
            const style = getCellStyle(idx);

            return (
              <motion.div
                key={`${idx}-${value}`}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animationDuration }}
              >
                <motion.div
                  className={`${style.color.bg} ${style.color.border} border-2 w-8 rounded-t flex items-end justify-center pb-1 ${style.glow ? `shadow-lg ${style.color.shadow}` : ""}`}
                  animate={{
                    height: `${Math.max(height, 15)}%`,
                    scale: style.scale,
                    rotate: style.rotate || 0,
                  }}
                  transition={{
                    duration: animationDuration,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  style={{ minHeight: "24px" }}
                >
                  <span className="text-xs text-white font-medium drop-shadow">{value}</span>
                </motion.div>
                {showIndices && (
                  <span className="text-[10px] text-zinc-500 mt-1">{idx}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* 图例 */}
        <Legend
          swapping={swapping.length > 0}
          comparing={comparing.length > 0}
          completed={completed.length > 0}
          highlights={highlights}
        />
      </div>
    );
  }

  // 标准数组显示模式
  return (
    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
      {title && <h4 className="text-sm font-medium mb-2 text-zinc-300">{title}</h4>}
      {description && <p className="text-xs text-zinc-500 mb-3">{description}</p>}

      <div className="flex flex-col items-center">
        {/* 顶部指针 */}
        <div className="flex gap-1.5 mb-1 min-h-[24px]">
          {array.map((_, idx) => {
            const topPointers = pointers.filter(
              (p) => p.index === idx && p.position !== "bottom"
            );
            return (
              <div key={idx} className={`${cellSize} flex flex-col items-center justify-end`}>
                <AnimatePresence mode="wait">
                  {topPointers.map((p) => (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`${pointerSize} font-bold ${pointerColorMap[p.color]} flex flex-col items-center`}
                    >
                      <span>{p.label}</span>
                      <motion.span
                        animate={{ y: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        ↓
                      </motion.span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* 数组单元格 */}
        <div className="flex gap-1.5">
          {array.map((value, idx) => {
            const style = getCellStyle(idx);

            return (
              <motion.div
                key={idx}
                className={`${cellSize} ${style.color.bg} ${style.color.border} border-2 rounded flex items-center justify-center font-mono font-medium text-white ${style.glow ? `shadow-lg ${style.color.shadow}` : ""}`}
                layout
                animate={{
                  scale: style.scale,
                  rotate: style.rotate || 0,
                }}
                transition={{
                  duration: animationDuration,
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              >
                <motion.span
                  key={`${idx}-${value}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.15 }}
                >
                  {value}
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* 索引 */}
        {showIndices && (
          <div className="flex gap-1.5 mt-1">
            {array.map((_, idx) => (
              <div
                key={idx}
                className={`${cellSize} flex items-center justify-center text-[10px] text-zinc-500`}
              >
                {idx}
              </div>
            ))}
          </div>
        )}

        {/* 底部指针 */}
        <div className="flex gap-1.5 mt-1 min-h-[24px]">
          {array.map((_, idx) => {
            const bottomPointers = pointers.filter(
              (p) => p.index === idx && p.position === "bottom"
            );
            return (
              <div key={idx} className={`${cellSize} flex flex-col items-center`}>
                <AnimatePresence mode="wait">
                  {bottomPointers.map((p) => (
                    <motion.div
                      key={p.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`${pointerSize} font-bold ${pointerColorMap[p.color]} flex flex-col items-center`}
                    >
                      <motion.span
                        animate={{ y: [0, -2, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                      >
                        ↑
                      </motion.span>
                      <span>{p.label}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 图例 */}
      <Legend
        swapping={swapping.length > 0}
        comparing={comparing.length > 0}
        completed={completed.length > 0}
        highlights={highlights}
      />
    </div>
  );
}

// 图例组件
function Legend({
  swapping,
  comparing,
  completed,
  highlights
}: {
  swapping: boolean;
  comparing: boolean;
  completed: boolean;
  highlights: ArrayVisualizerProps["highlights"];
}) {
  const hasLegend = swapping || comparing || completed || (highlights && highlights.some(h => h.label));

  if (!hasLegend) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-zinc-800 text-xs text-zinc-400">
      {swapping && (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-red-500 shadow shadow-red-500/50"></span>
          交换中
        </span>
      )}
      {comparing && (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-yellow-500 shadow shadow-yellow-500/50"></span>
          比较中
        </span>
      )}
      {completed && (
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-green-500"></span>
          已完成
        </span>
      )}
      {highlights?.map((h, i) => (
        h.label && (
          <span key={i} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded ${colorMap[h.color].bg}`}></span>
            {h.label}
          </span>
        )
      ))}
    </div>
  );
}
