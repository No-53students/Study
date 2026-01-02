"use client";

import { motion, AnimatePresence } from "framer-motion";

/**
 * 变量值类型
 */
export interface VariableValue {
  /** 变量名 */
  name: string;
  /** 当前值 */
  value: string | number | boolean | null | undefined | unknown[];
  /** 值类型：用于不同的显示样式 */
  type?: "number" | "string" | "boolean" | "array" | "object" | "null";
  /** 是否刚刚改变（用于高亮动画） */
  changed?: boolean;
  /** 变量说明 */
  description?: string;
}

export interface VariableWatcherProps {
  /** 变量列表 */
  variables: VariableValue[];
  /** 标题 */
  title?: string;
  /** 紧凑模式 */
  compact?: boolean;
  /** 显示类型标签 */
  showType?: boolean;
  /** 布局方向 */
  layout?: "horizontal" | "vertical";
}

/**
 * 变量监视器组件
 * 实时显示代码执行过程中的变量值变化
 */
export function VariableWatcher({
  variables,
  title = "变量监视",
  compact = false,
  showType = true,
  layout = "vertical",
}: VariableWatcherProps) {
  // 格式化值显示
  const formatValue = (value: VariableValue["value"], type?: string): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (Array.isArray(value)) {
      if (value.length <= 6) {
        return `[${value.join(", ")}]`;
      }
      return `[${value.slice(0, 5).join(", ")}, ... +${value.length - 5}]`;
    }
    if (typeof value === "object") {
      return JSON.stringify(value);
    }
    if (typeof value === "string") {
      return `"${value}"`;
    }
    return String(value);
  };

  // 获取类型标签样式
  const getTypeStyle = (type?: string) => {
    switch (type) {
      case "number":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "string":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "boolean":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "array":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "object":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "null":
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border-zinc-500/20";
    }
  };

  // 检测值类型
  const detectType = (value: VariableValue["value"]): string => {
    if (value === null) return "null";
    if (value === undefined) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value as string;
  };

  if (variables.length === 0) {
    return null;
  }

  const isHorizontal = layout === "horizontal";

  return (
    <div className="rounded-lg bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* 标题 */}
      <div className="px-3 py-2 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
        <svg
          className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">{title}</span>
      </div>

      {/* 变量列表 */}
      <div
        className={`p-3 ${
          isHorizontal
            ? "flex flex-wrap gap-3"
            : "space-y-2"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {variables.map((variable) => {
            const type = variable.type || detectType(variable.value);
            const formattedValue = formatValue(variable.value, type);

            return (
              <motion.div
                key={variable.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                className={`${
                  isHorizontal
                    ? "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700"
                    : "flex items-center justify-between gap-4 px-3 py-2 rounded-lg bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700"
                } ${variable.changed ? "ring-2 ring-yellow-500/50" : ""}`}
              >
                {/* 变量名 */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                    {variable.name}
                  </span>
                  {showType && !compact && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${getTypeStyle(
                        type
                      )}`}
                    >
                      {type}
                    </span>
                  )}
                </div>

                {/* 等号 */}
                <span className="text-zinc-500">=</span>

                {/* 值 */}
                <motion.span
                  key={formattedValue}
                  initial={variable.changed ? { scale: 1.1 } : false}
                  animate={{ scale: 1 }}
                  className={`font-mono text-sm ${
                    variable.changed
                      ? "text-yellow-600 dark:text-yellow-400 font-semibold"
                      : type === "number"
                      ? "text-blue-600 dark:text-blue-400"
                      : type === "string"
                      ? "text-green-600 dark:text-green-400"
                      : type === "boolean"
                      ? "text-purple-600 dark:text-purple-400"
                      : type === "array"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {formattedValue}
                </motion.span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 变量说明（如果有） */}
      {!compact && variables.some((v) => v.description) && (
        <div className="px-3 pb-3 pt-0">
          <div className="text-xs text-zinc-500 space-y-1">
            {variables
              .filter((v) => v.description)
              .map((v) => (
                <div key={v.name} className="flex gap-2">
                  <span className="font-mono text-zinc-600 dark:text-zinc-400">{v.name}:</span>
                  <span>{v.description}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 执行结果监视器
 * 显示代码执行的返回值或中间结果
 */
export interface ExecutionResultProps {
  /** 结果值 */
  value: unknown;
  /** 结果标签 */
  label?: string;
  /** 是否成功 */
  success?: boolean;
}

export function ExecutionResult({
  value,
  label = "执行结果",
  success = true,
}: ExecutionResultProps) {
  const formatValue = (val: unknown): string => {
    if (val === null) return "null";
    if (val === undefined) return "undefined";
    if (Array.isArray(val)) return JSON.stringify(val);
    if (typeof val === "object") return JSON.stringify(val);
    if (typeof val === "string") return `"${val}"`;
    return String(val);
  };

  return (
    <div
      className={`rounded-lg border overflow-hidden ${
        success
          ? "bg-emerald-500/5 border-emerald-500/20"
          : "bg-rose-500/5 border-rose-500/20"
      }`}
    >
      <div className="px-3 py-2 flex items-center justify-between">
        <span
          className={`text-xs font-medium ${
            success ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
          }`}
        >
          {label}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`font-mono text-sm ${
            success ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
          }`}
        >
          {formatValue(value)}
        </motion.span>
      </div>
    </div>
  );
}
