"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { allTemplates, AlgorithmTemplate } from "../../problems/data/templates";
import { TemplateVariant, TemplateAnimationStep } from "../../problems/types/roadmap";

// 难度配置
const DIFFICULTY_CONFIG = {
  easy: { label: "简单", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  medium: { label: "中等", color: "text-amber-400", bg: "bg-amber-500/10" },
  hard: { label: "困难", color: "text-rose-400", bg: "bg-rose-500/10" },
};

// 分类配置
const CATEGORY_CONFIG: Record<string, { name: string; icon: string }> = {
  array: { name: "数组", icon: "📝" },
  search: { name: "搜索", icon: "🔍" },
  graph: { name: "图", icon: "🕸️" },
  dp: { name: "动态规划", icon: "📊" },
  stack: { name: "栈", icon: "📚" },
  "linked-list": { name: "链表", icon: "🔗" },
  tree: { name: "树", icon: "🌳" },
};

// 动画播放器组件
function AnimationPlayer({
  steps,
  title,
  description,
}: {
  steps: TemplateAnimationStep[];
  title: string;
  description: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = steps[currentStep];

  // 自动播放
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isPlaying, steps.length]);

  return (
    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <span className="text-lg">🎬</span>
        {title}
      </h3>
      <p className="text-sm text-zinc-400 mb-4">{description}</p>

      {/* 可视化区域 */}
      <div className="bg-zinc-950 rounded-lg p-4 mb-4">
        {/* 数组可视化 */}
        {step.array && (
          <div className="flex justify-center gap-1 mb-4 flex-wrap">
            {step.array.map((val, i) => {
              // 确定元素的样式
              let bgColor = "bg-zinc-700";
              let borderColor = "border-zinc-600";
              let label = "";

              // 检查高亮
              if (step.highlights) {
                for (const h of step.highlights) {
                  if (h.indices.includes(i)) {
                    const colorMap: Record<string, string> = {
                      blue: "bg-blue-500/30 border-blue-500",
                      green: "bg-emerald-500/30 border-emerald-500",
                      red: "bg-rose-500/30 border-rose-500",
                      yellow: "bg-amber-500/30 border-amber-500",
                      purple: "bg-purple-500/30 border-purple-500",
                      orange: "bg-orange-500/30 border-orange-500",
                      gray: "bg-zinc-600 border-zinc-500",
                    };
                    bgColor = colorMap[h.color]?.split(" ")[0] || bgColor;
                    borderColor = colorMap[h.color]?.split(" ")[1] || borderColor;
                    if (h.label) label = h.label;
                  }
                }
              }

              // 检查特殊指针
              if (step.left === i) {
                bgColor = "bg-blue-500/30";
                borderColor = "border-blue-500";
                label = "L";
              }
              if (step.right === i) {
                bgColor = "bg-green-500/30";
                borderColor = "border-green-500";
                label = "R";
              }
              if (step.windowStart !== undefined && step.windowEnd !== undefined) {
                if (i >= step.windowStart && i <= step.windowEnd) {
                  bgColor = "bg-blue-500/20";
                  borderColor = "border-blue-500/50";
                }
              }
              if (step.completed?.includes(i)) {
                bgColor = "bg-emerald-500/20";
                borderColor = "border-emerald-500";
              }

              return (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border-2 ${bgColor} ${borderColor} font-mono text-sm transition-all duration-300`}
                  >
                    {val}
                  </div>
                  {label && (
                    <span className="text-xs mt-1 text-zinc-400">{label}</span>
                  )}
                  <span className="text-xs text-zinc-600">{i}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* 栈可视化 */}
        {step.stack && step.stack.length > 0 && (
          <div className="flex items-end justify-center gap-1 mb-4">
            <span className="text-xs text-zinc-500 mr-2">栈:</span>
            {step.stack.map((val, i) => (
              <div
                key={i}
                className="w-8 h-8 flex items-center justify-center rounded bg-purple-500/30 border border-purple-500 text-sm font-mono"
              >
                {val}
              </div>
            ))}
            <span className="text-xs text-zinc-500 ml-1">← top</span>
          </div>
        )}

        {/* DP 数组可视化 */}
        {step.dp && (
          <div className="flex justify-center gap-1 mb-4 flex-wrap">
            {Array.isArray(step.dp[0]) ? (
              // 2D DP
              <div className="space-y-1">
                {(step.dp as number[][]).map((row, i) => (
                  <div key={i} className="flex gap-1">
                    {row.map((val, j) => (
                      <div
                        key={j}
                        className="w-8 h-8 flex items-center justify-center rounded bg-indigo-500/20 border border-indigo-500/50 text-xs font-mono"
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              // 1D DP
              (step.dp as number[]).map((val, i) => (
                <div
                  key={i}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500/20 border border-indigo-500/50 font-mono text-sm"
                >
                  {val}
                </div>
              ))
            )}
          </div>
        )}

        {/* 变量显示 */}
        {step.variables && (
          <div className="flex flex-wrap justify-center gap-3 text-xs">
            {Object.entries(step.variables).map(([key, value]) => (
              <div key={key} className="bg-zinc-800 rounded px-2 py-1">
                <span className="text-zinc-500">{key}: </span>
                <span className="text-emerald-400 font-mono">
                  {JSON.stringify(value)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 步骤说明 */}
      <div className="bg-zinc-800/50 rounded-lg p-3 mb-4">
        <p className="text-sm">{step.description}</p>
      </div>

      {/* 控制区 */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-3 py-1.5 rounded-md bg-zinc-800 text-sm disabled:opacity-50 hover:bg-zinc-700 transition-colors"
          >
            上一步
          </button>
          <button
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false);
              } else {
                if (currentStep >= steps.length - 1) {
                  setCurrentStep(0);
                }
                setIsPlaying(true);
              }
            }}
            className="px-3 py-1.5 rounded-md bg-purple-500/20 text-purple-400 text-sm hover:bg-purple-500/30 transition-colors"
          >
            {isPlaying ? "暂停" : "播放"}
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="px-3 py-1.5 rounded-md bg-zinc-800 text-sm disabled:opacity-50 hover:bg-zinc-700 transition-colors"
          >
            下一步
          </button>
        </div>
        <div className="text-xs text-zinc-500">
          {currentStep + 1} / {steps.length}
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-500 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

// 变体代码展示组件
function VariantCard({ variant }: { variant: TemplateVariant }) {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-lg bg-zinc-800/50 border border-zinc-700/50 overflow-hidden">
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-800/80 transition-colors"
      >
        <div>
          <div className="font-medium text-sm">{variant.name}</div>
          <div className="text-xs text-zinc-400">{variant.description}</div>
        </div>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform ${showCode ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {showCode && (
        <div className="border-t border-zinc-700/50">
          <div className="px-3 py-2 bg-zinc-900/50 text-xs text-zinc-400">
            <span className="text-blue-400">使用场景：</span> {variant.useCase}
          </div>
          <pre className="p-3 overflow-x-auto text-xs bg-zinc-950/50">
            <code className="text-zinc-300">{variant.codeSnippet}</code>
          </pre>
          {variant.exampleProblem && (
            <div className="px-3 py-2 border-t border-zinc-700/50">
              <Link
                href={`/problems/${variant.exampleProblem}`}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
              >
                示例题目 →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<AlgorithmTemplate | null>(
    allTemplates[0]
  );
  const [showCode, setShowCode] = useState<"template" | "comments">("comments");
  const [activeTab, setActiveTab] = useState<"basic" | "detail" | "animation">("basic");

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-7xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/concepts"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">算法基础</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white text-lg shadow-lg shadow-purple-500/20">
                📋
              </div>
              <h1 className="text-base sm:text-lg font-bold">解题模板库</h1>
            </div>
          </div>
          <div className="text-xs text-zinc-500">
            {allTemplates.length} 个模板
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-3 sm:px-4 py-4 sm:py-6">
        {/* 介绍卡片 */}
        <div className="mb-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h2 className="font-semibold mb-1">为什么需要模板？</h2>
              <p className="text-sm text-zinc-400">
                算法模板帮助你快速识别问题类型，提供标准化的解题思路和代码框架。
                掌握模板后，遇到新题时只需套用并微调，大大降低做题难度。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* 模板列表 */}
          <div className="lg:col-span-1 space-y-2">
            <h3 className="text-sm font-semibold text-zinc-400 mb-3">选择模板</h3>
            {allTemplates.map((template) => {
              const diffConfig = DIFFICULTY_CONFIG[template.difficulty];
              const catConfig = CATEGORY_CONFIG[template.category];
              const isSelected = selectedTemplate?.id === template.id;

              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${
                    isSelected
                      ? "bg-purple-500/10 border-purple-500/30"
                      : "bg-zinc-900/80 border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{catConfig?.icon || "📦"}</span>
                    <span className="font-medium">{template.name}</span>
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded text-xs ${diffConfig.color} ${diffConfig.bg}`}
                    >
                      {diffConfig.label}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1">
                    {template.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* 模板详情 */}
          {selectedTemplate && (
            <div className="lg:col-span-2 space-y-4">
              {/* 模板标题 */}
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">
                    {CATEGORY_CONFIG[selectedTemplate.category]?.icon || "📦"}
                  </span>
                  <div>
                    <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                    <p className="text-sm text-zinc-400">{selectedTemplate.description}</p>
                  </div>
                </div>

                {/* 识别关键词 */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-zinc-300 mb-2">
                    🔑 识别关键词（看到这些词就想到这个模板）
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTemplate.recognitionPatterns.keywords.map((keyword, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 复杂度 */}
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-zinc-500">时间复杂度：</span>
                    <span className="text-emerald-400 font-mono">
                      {selectedTemplate.complexity.time}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500">空间复杂度：</span>
                    <span className="text-blue-400 font-mono">
                      {selectedTemplate.complexity.space}
                    </span>
                  </div>
                </div>
              </div>

              {/* 标签切换 */}
              <div className="flex gap-1 bg-zinc-900/80 rounded-xl p-1 border border-zinc-800">
                <button
                  onClick={() => setActiveTab("basic")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "basic"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  📝 基础模板
                </button>
                <button
                  onClick={() => setActiveTab("detail")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "detail"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  📖 深入讲解
                </button>
                <button
                  onClick={() => setActiveTab("animation")}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "animation"
                      ? "bg-purple-500/20 text-purple-400"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  🎬 动画演示
                </button>
              </div>

              {/* 基础模板内容 */}
              {activeTab === "basic" && (
                <>
                  {/* 思维步骤 */}
                  <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-lg">🧠</span>
                      思维步骤（按这个顺序思考）
                    </h3>
                    <div className="space-y-3">
                      {selectedTemplate.thinkingSteps.map((step) => (
                        <div
                          key={step.step}
                          className="rounded-lg bg-zinc-800/50 p-3 border border-zinc-700/50"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs font-bold">
                              {step.step}
                            </span>
                            <h4 className="font-medium">{step.title}</h4>
                          </div>
                          <p className="text-sm text-zinc-400 mb-2">{step.description}</p>
                          {step.question && (
                            <p className="text-sm text-blue-400 mb-1">
                              💭 {step.question}
                            </p>
                          )}
                          {step.example && (
                            <p className="text-xs text-zinc-500 bg-zinc-800 rounded px-2 py-1">
                              例：{step.example}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 代码模板 */}
                  <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <span className="text-lg">💻</span>
                        代码模板
                      </h3>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowCode("template")}
                          className={`px-3 py-1 rounded-md text-xs transition-colors ${
                            showCode === "template"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          简洁版
                        </button>
                        <button
                          onClick={() => setShowCode("comments")}
                          className={`px-3 py-1 rounded-md text-xs transition-colors ${
                            showCode === "comments"
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-zinc-800 text-zinc-400 hover:text-white"
                          }`}
                        >
                          带注释
                        </button>
                      </div>
                    </div>
                    <pre className="bg-zinc-950 rounded-lg p-4 overflow-x-auto text-sm">
                      <code className="text-zinc-300">
                        {showCode === "template"
                          ? selectedTemplate.codeTemplate.typescript
                          : selectedTemplate.codeTemplate.comments}
                      </code>
                    </pre>
                  </div>

                  {/* 常见错误 */}
                  <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      常见错误（避坑指南）
                    </h3>
                    <div className="space-y-3">
                      {selectedTemplate.commonMistakes.map((mistake, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-zinc-800/50 p-3 border border-zinc-700/50"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`px-1.5 py-0.5 rounded text-xs ${
                                mistake.frequency === "high"
                                  ? "bg-rose-500/20 text-rose-400"
                                  : mistake.frequency === "medium"
                                  ? "bg-amber-500/20 text-amber-400"
                                  : "bg-zinc-700 text-zinc-400"
                              }`}
                            >
                              {mistake.frequency === "high"
                                ? "高频"
                                : mistake.frequency === "medium"
                                ? "中频"
                                : "低频"}
                            </span>
                            <span className="font-medium">{mistake.title}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-2">
                            {mistake.wrongCode && (
                              <div>
                                <div className="text-xs text-rose-400 mb-1">❌ 错误写法</div>
                                <pre className="bg-rose-950/30 rounded px-2 py-1 text-xs text-rose-300 overflow-x-auto">
                                  {mistake.wrongCode}
                                </pre>
                              </div>
                            )}
                            {mistake.rightCode && (
                              <div>
                                <div className="text-xs text-emerald-400 mb-1">✅ 正确写法</div>
                                <pre className="bg-emerald-950/30 rounded px-2 py-1 text-xs text-emerald-300 overflow-x-auto">
                                  {mistake.rightCode}
                                </pre>
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-zinc-400">{mistake.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* 深入讲解内容 */}
              {activeTab === "detail" && (
                <>
                  {/* 核心原理讲解 */}
                  {selectedTemplate.coreExplanation && (
                    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <span className="text-lg">💡</span>
                        核心原理
                      </h3>

                      <div className="space-y-4">
                        {/* 什么是 */}
                        <div className="rounded-lg bg-blue-500/5 border border-blue-500/20 p-4">
                          <h4 className="text-sm font-semibold text-blue-400 mb-2">
                            📌 这是什么？
                          </h4>
                          <div className="text-sm text-zinc-300 whitespace-pre-wrap">
                            {selectedTemplate.coreExplanation.whatIs}
                          </div>
                        </div>

                        {/* 为什么用 */}
                        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/20 p-4">
                          <h4 className="text-sm font-semibold text-emerald-400 mb-2">
                            🎯 为什么使用？
                          </h4>
                          <div className="text-sm text-zinc-300 whitespace-pre-wrap">
                            {selectedTemplate.coreExplanation.whyUse}
                          </div>
                        </div>

                        {/* 如何工作 */}
                        <div className="rounded-lg bg-purple-500/5 border border-purple-500/20 p-4">
                          <h4 className="text-sm font-semibold text-purple-400 mb-2">
                            ⚙️ 如何运作？
                          </h4>
                          <div className="text-sm text-zinc-300 whitespace-pre-wrap font-mono">
                            {selectedTemplate.coreExplanation.howItWorks}
                          </div>
                        </div>

                        {/* 形象比喻 */}
                        {selectedTemplate.coreExplanation.visualMetaphor && (
                          <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4">
                            <h4 className="text-sm font-semibold text-amber-400 mb-2">
                              🎨 形象比喻
                            </h4>
                            <div className="text-sm text-zinc-300 whitespace-pre-wrap">
                              {selectedTemplate.coreExplanation.visualMetaphor}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* 变体模式 */}
                  {selectedTemplate.variants && selectedTemplate.variants.length > 0 && (
                    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <span className="text-lg">🔄</span>
                        变体模式（{selectedTemplate.variants.length} 种）
                      </h3>
                      <div className="space-y-2">
                        {selectedTemplate.variants.map((variant) => (
                          <VariantCard key={variant.id} variant={variant} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* 动画演示内容 */}
              {activeTab === "animation" && (
                <>
                  {selectedTemplate.animation ? (
                    <AnimationPlayer
                      steps={selectedTemplate.animation.steps}
                      title={selectedTemplate.animation.title}
                      description={selectedTemplate.animation.description}
                    />
                  ) : (
                    <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-8 text-center">
                      <div className="text-4xl mb-4">🚧</div>
                      <h3 className="font-semibold mb-2">动画正在制作中</h3>
                      <p className="text-sm text-zinc-400">
                        此模板的动画演示即将上线，敬请期待！
                      </p>
                    </div>
                  )}
                </>
              )}

              {/* 适用题目 */}
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <span className="text-lg">📚</span>
                  适用题目（去练习！）
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.applicableProblems.map((problemId) => (
                    <Link
                      key={problemId}
                      href={`/problems/${problemId}`}
                      className="px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-sm transition-colors"
                    >
                      {problemId
                        .split("-")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(" ")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
