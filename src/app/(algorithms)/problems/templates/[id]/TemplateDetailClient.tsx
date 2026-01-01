"use client";

import Link from "next/link";
import { useState } from "react";
import { AlgorithmTemplate } from "../../data/templates";

// 难度配置
const DIFFICULTY_CONFIG = {
  easy: { label: "简单", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  medium: { label: "中等", color: "text-amber-400", bg: "bg-amber-500/10" },
  hard: { label: "困难", color: "text-rose-400", bg: "bg-rose-500/10" },
};

type TabId = "core" | "thinking" | "code" | "variants" | "mistakes" | "problems";

const tabs = [
  { id: "core" as TabId, label: "核心原理", icon: "💡" },
  { id: "thinking" as TabId, label: "思维步骤", icon: "🧠" },
  { id: "code" as TabId, label: "代码模板", icon: "📝" },
  { id: "variants" as TabId, label: "变体模式", icon: "🔄" },
  { id: "mistakes" as TabId, label: "常见错误", icon: "⚠️" },
  { id: "problems" as TabId, label: "适用题目", icon: "📚" },
];

interface TemplateDetailClientProps {
  template: AlgorithmTemplate;
}

export default function TemplateDetailClient({ template }: TemplateDetailClientProps) {
  const [activeTab, setActiveTab] = useState<TabId>("core");
  const [showComments, setShowComments] = useState(true);

  const diffConfig =
    DIFFICULTY_CONFIG[template.difficulty as keyof typeof DIFFICULTY_CONFIG];

  const renderTabContent = () => {
    switch (activeTab) {
      case "core":
        return (
          <div className="space-y-6">
            {template.coreExplanation && (
              <>
                {/* 什么是 */}
                <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">❓</span> 什么是{template.name}？
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {template.coreExplanation.whatIs}
                  </p>
                </div>

                {/* 为什么使用 */}
                <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span> 为什么使用？
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">
                    {template.coreExplanation.whyUse}
                  </p>
                </div>

                {/* 如何工作 */}
                <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">⚙️</span> 如何工作？
                  </h3>
                  <div className="text-zinc-300 leading-relaxed whitespace-pre-line">
                    {template.coreExplanation.howItWorks}
                  </div>
                </div>

                {/* 形象比喻 */}
                {template.coreExplanation.visualMetaphor && (
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <span className="text-xl">🎨</span> 形象比喻
                    </h3>
                    <p className="text-zinc-300 leading-relaxed italic">
                      「{template.coreExplanation.visualMetaphor}」
                    </p>
                  </div>
                )}
              </>
            )}

            {/* 识别关键词 */}
            <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">🔍</span> 识别关键词
              </h3>
              <p className="text-sm text-zinc-400 mb-3">
                当你在题目中看到以下关键词时，考虑使用{template.name}：
              </p>
              <div className="flex flex-wrap gap-2">
                {template.recognitionPatterns.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 text-sm border border-blue-500/20"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 复杂度 */}
            <div className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span> 时间空间复杂度
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-zinc-900">
                  <div className="text-sm text-zinc-400 mb-1">时间复杂度</div>
                  <div className="text-lg font-mono text-emerald-400">
                    {template.complexity.time}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-900">
                  <div className="text-sm text-zinc-400 mb-1">空间复杂度</div>
                  <div className="text-lg font-mono text-blue-400">
                    {template.complexity.space}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400">
                {template.complexity.explanation}
              </p>
            </div>
          </div>
        );

      case "thinking":
        return (
          <div className="space-y-4">
            <p className="text-zinc-400 mb-4">
              按照以下步骤思考，一步步解决问题：
            </p>
            {template.thinkingSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-zinc-300 mb-3">{step.description}</p>
                    {step.question && (
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
                        💭 {step.question}
                      </div>
                    )}
                    {step.example && (
                      <div className="mt-3 p-3 rounded-lg bg-zinc-900 font-mono text-sm text-emerald-400">
                        {step.example}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "code":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400">可直接复用的代码模板</p>
              <button
                onClick={() => setShowComments(!showComments)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  showComments
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {showComments ? "📝 带注释" : "📄 简洁版"}
              </button>
            </div>

            <div className="rounded-xl bg-zinc-900 border border-zinc-800 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700">
                <span className="text-sm text-zinc-400">TypeScript</span>
                <button
                  onClick={() => {
                    const code = showComments
                      ? template.codeTemplate.comments
                      : template.codeTemplate.typescript;
                    navigator.clipboard.writeText(code);
                  }}
                  className="px-2 py-1 rounded text-xs bg-zinc-700 text-zinc-300 hover:bg-zinc-600 transition-colors"
                >
                  复制
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-zinc-300">
                  {showComments
                    ? template.codeTemplate.comments
                    : template.codeTemplate.typescript}
                </code>
              </pre>
            </div>
          </div>
        );

      case "variants":
        return (
          <div className="space-y-4">
            <p className="text-zinc-400 mb-4">
              {template.name}有以下常见变体，根据具体问题选择：
            </p>
            {template.variants?.map((variant, index) => (
              <div
                key={index}
                className="rounded-xl bg-zinc-800/50 border border-zinc-700 p-4 sm:p-6"
              >
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  <span className="text-lg">🔄</span> {variant.name}
                </h4>
                <p className="text-zinc-400 text-sm mb-3">
                  {variant.description}
                </p>
                <div className="mb-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-700">
                  <div className="text-xs text-zinc-500 mb-1">使用场景</div>
                  <div className="text-sm text-zinc-300">{variant.useCase}</div>
                </div>
                <div className="rounded-lg bg-zinc-900 p-3 overflow-x-auto">
                  <pre className="text-sm">
                    <code className="text-zinc-300">{variant.codeSnippet}</code>
                  </pre>
                </div>
                {variant.exampleProblem && (
                  <Link
                    href={`/problems/${variant.exampleProblem}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
                  >
                    📝 示例题目: {variant.exampleProblem}
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
            {(!template.variants || template.variants.length === 0) && (
              <div className="text-center py-8 text-zinc-500">
                暂无变体模式
              </div>
            )}
          </div>
        );

      case "mistakes":
        return (
          <div className="space-y-4">
            <p className="text-zinc-400 mb-4">
              避免以下常见错误，提高代码正确率：
            </p>
            {template.commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="rounded-xl bg-zinc-800/50 border border-zinc-700 overflow-hidden"
              >
                <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                  <h4 className="font-semibold text-white flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {mistake.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      mistake.frequency === "high"
                        ? "bg-rose-500/10 text-rose-400"
                        : mistake.frequency === "medium"
                        ? "bg-amber-500/10 text-amber-400"
                        : "bg-zinc-500/10 text-zinc-400"
                    }`}
                  >
                    {mistake.frequency === "high"
                      ? "高频"
                      : mistake.frequency === "medium"
                      ? "中频"
                      : "低频"}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-zinc-300 mb-4">{mistake.explanation}</p>
                  {mistake.wrongCode && mistake.rightCode && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-rose-400 mb-2 flex items-center gap-1">
                          <span>❌</span> 错误写法
                        </div>
                        <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 font-mono text-sm text-rose-300">
                          {mistake.wrongCode}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-400 mb-2 flex items-center gap-1">
                          <span>✅</span> 正确写法
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 font-mono text-sm text-emerald-300">
                          {mistake.rightCode}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case "problems":
        return (
          <div className="space-y-4">
            <p className="text-zinc-400 mb-4">
              以下题目可以使用{template.name}解决：
            </p>
            <div className="grid gap-2">
              {template.applicableProblems.map((problemId) => (
                <Link
                  key={problemId}
                  href={`/problems/${problemId}`}
                  className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:border-purple-500/50 hover:bg-zinc-800 transition-all group"
                >
                  <span className="text-zinc-300 group-hover:text-white">
                    {problemId
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </span>
                  <svg
                    className="w-5 h-5 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 border-b border-zinc-800/80 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex h-12 sm:h-14 max-w-5xl items-center justify-between px-3 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/problems/templates"
              className="group flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="hidden sm:inline">模板库</span>
            </Link>
            <div className="hidden sm:block w-px h-5 bg-zinc-700" />
            <h1 className="text-base sm:text-lg font-bold truncate">
              {template.name}
            </h1>
          </div>
          <span
            className={`px-2 py-0.5 rounded-md text-xs font-medium ${diffConfig.color} ${diffConfig.bg}`}
          >
            {diffConfig.label}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-3 sm:px-4 py-4 sm:py-8 pb-safe">
        {/* 模板简介 */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-500/20 p-4 sm:p-6">
          <p className="text-zinc-300">{template.description}</p>
        </div>

        {/* Tab 导航 */}
        <div className="mb-6 flex flex-wrap gap-2 p-1 bg-zinc-800/50 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              <span className="hidden sm:inline">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 内容 */}
        <div className="min-h-[400px]">{renderTabContent()}</div>
      </main>
    </div>
  );
}
