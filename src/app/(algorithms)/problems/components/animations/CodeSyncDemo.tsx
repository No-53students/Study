"use client";

import { useMemo } from "react";
import { CodeSyncAnimation } from "./CodeSyncAnimation";
import { ArrayVisualizer } from "./ArrayVisualizer";
import {
  CodeSyncAnimationData,
  VisualizationStep,
} from "../../data/code-sync-animations";

export interface CodeSyncDemoProps {
  /** 代码同步动画数据 */
  data: CodeSyncAnimationData;
  /** 布局模式 */
  layout?: "split" | "stacked";
  /** 紧凑模式 */
  compact?: boolean;
}

/**
 * 代码同步动画演示组件
 *
 * 封装了 CodeSyncAnimation 并提供了可视化渲染逻辑
 */
export function CodeSyncDemo({
  data,
  layout = "split",
  compact = false,
}: CodeSyncDemoProps) {
  // 渲染可视化
  const renderVisualization = useMemo(() => {
    return (stepIndex: number) => {
      const vizStep = data.visualizationSteps[stepIndex];
      if (!vizStep) return null;

      switch (data.visualizationType) {
        case "array":
        case "two-pointers":
        case "sliding-window":
          return renderArrayVisualization(vizStep);

        case "hash-table":
          return renderHashTableVisualization(vizStep);

        default:
          return renderArrayVisualization(vizStep);
      }
    };
  }, [data.visualizationSteps, data.visualizationType]);

  return (
    <CodeSyncAnimation
      title={data.title}
      code={data.code}
      steps={data.steps}
      renderVisualization={renderVisualization}
      layout={layout}
      compact={compact}
    />
  );
}

/**
 * 渲染数组可视化
 */
function renderArrayVisualization(step: VisualizationStep) {
  if (!step.array) return null;

  return (
    <div className="space-y-4">
      <ArrayVisualizer
        array={step.array}
        pointers={step.pointers?.map((p) => ({
          index: p.index,
          label: p.label,
          color: p.color,
          position: "top" as const,
        }))}
        highlights={step.highlights}
        comparing={step.comparing}
        completed={step.completed}
        showIndices={true}
        size="md"
      />

      {/* 注释标签 */}
      {step.annotations && step.annotations.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center">
          {step.annotations.map((ann, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded-md bg-zinc-200 dark:bg-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300"
            >
              {ann.text}
            </span>
          ))}
        </div>
      )}

      {/* 哈希表状态（如果有） */}
      {step.hashTable && step.hashTable.length > 0 && (
        <div className="mt-4">
          <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">Map 状态:</div>
          <div className="flex flex-wrap gap-2">
            {step.hashTable.map((entry, idx) => (
              <div
                key={idx}
                className={`px-3 py-1.5 rounded-lg border text-sm font-mono ${
                  entry.highlight
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300"
                    : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <span className="text-blue-600 dark:text-blue-400">{String(entry.key)}</span>
                <span className="text-zinc-500 mx-1">→</span>
                <span className="text-amber-600 dark:text-amber-400">{String(entry.value)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 渲染哈希表可视化
 */
function renderHashTableVisualization(step: VisualizationStep) {
  // 复用数组可视化（因为两数之和同时有数组和哈希表）
  return renderArrayVisualization(step);
}

/**
 * 快速创建代码同步演示
 * 用于简单场景
 */
export function QuickCodeSyncDemo({
  title,
  code,
  steps,
  array,
}: {
  title: string;
  code: string;
  steps: { description: string; line?: number; variables?: Record<string, unknown> }[];
  array?: (number | string)[];
}) {
  const formattedSteps = steps.map((s) => ({
    description: s.description,
    executingLine: s.line,
    codeHighlight: s.line ? [s.line] : undefined,
    variables: s.variables
      ? Object.entries(s.variables).map(([name, value]) => ({
          name,
          value: value as string | number | boolean | null | undefined | unknown[],
          changed: true,
        }))
      : undefined,
  }));

  return (
    <CodeSyncAnimation
      title={title}
      code={code}
      steps={formattedSteps}
      renderVisualization={(stepIndex) => {
        if (!array) return null;
        return (
          <ArrayVisualizer
            array={array}
            showIndices={true}
            size="md"
          />
        );
      }}
    />
  );
}
