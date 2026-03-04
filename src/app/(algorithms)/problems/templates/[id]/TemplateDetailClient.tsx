"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlgorithmTemplate, TemplateVariant } from "../../data/templates";
import { CodeHighlighter, InlineCode } from "../../components/CodeHighlighter";
import { getProblemById } from "../../data";
import { TwoPointersAnimation } from "../../components/animations/TwoPointersAnimation";

// 难度配置
const DIFFICULTY_CONFIG = {
  easy: { label: "简单", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10" },
  medium: { label: "中等", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500/10" },
  hard: { label: "困难", color: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500/10" },
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
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null);

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
                <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">❓</span> 什么是{template.name}？
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {template.coreExplanation.whatIs}
                  </p>
                </div>

                {/* 为什么使用 */}
                <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🎯</span> 为什么使用？
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {template.coreExplanation.whyUse}
                  </p>
                </div>

                {/* 如何工作 */}
                <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">⚙️</span> 如何工作？
                  </h3>
                  <div className="text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                    {template.coreExplanation.howItWorks}
                  </div>
                </div>

                {/* 形象比喻 */}
                {template.coreExplanation.visualMetaphor && (
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-200 dark:border-purple-500/20 p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                      <span className="text-xl">🎨</span> 形象比喻
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed italic">
                      「{template.coreExplanation.visualMetaphor}」
                    </p>
                  </div>
                )}
              </>
            )}

            {/* 识别关键词 */}
            <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-xl">🔍</span> 识别关键词
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                当你在题目中看到以下关键词时，考虑使用{template.name}：
              </p>
              <div className="flex flex-wrap gap-2">
                {template.recognitionPatterns.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm border border-blue-200 dark:border-blue-500/20"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* 复杂度 */}
            <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="text-xl">📊</span> 时间空间复杂度
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">时间复杂度</div>
                  <div className="text-lg font-mono text-emerald-600 dark:text-emerald-400">
                    {template.complexity.time}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900">
                  <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">空间复杂度</div>
                  <div className="text-lg font-mono text-blue-600 dark:text-blue-400">
                    {template.complexity.space}
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {template.complexity.explanation}
              </p>
            </div>
          </div>
        );

      case "thinking":
        return (
          <div className="space-y-4">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              按照以下步骤思考，一步步解决问题：
            </p>
            {template.thinkingSteps.map((step, index) => (
              <div
                key={index}
                className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4 sm:p-6 shadow-sm dark:shadow-none"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-zinc-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-300 mb-3">{step.description}</p>
                    {step.question && (
                      <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-sm text-blue-700 dark:text-blue-300">
                        💭 {step.question}
                      </div>
                    )}
                    {step.example && (
                      <div className="mt-3 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900 font-mono text-sm text-emerald-600 dark:text-emerald-400">
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
              <p className="text-zinc-500 dark:text-zinc-400">可直接复用的代码模板</p>
              <button
                onClick={() => setShowComments(!showComments)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  showComments
                    ? "bg-purple-600 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {showComments ? "📝 带注释" : "📄 简洁版"}
              </button>
            </div>

            <CodeHighlighter
              code={showComments
                ? template.codeTemplate.comments
                : template.codeTemplate.typescript}
              language="typescript"
              title={showComments ? "带注释版本" : "简洁版本"}
              showLineNumbers={true}
              maxHeight="500px"
            />
          </div>
        );

      case "variants":
        return (
          <div className="space-y-6">
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              {template.name}有以下常见变体，点击展开查看详细讲解和动画演示：
            </p>
            {template.variants?.map((variant, index) => (
              <VariantCard
                key={index}
                variant={variant}
                isExpanded={expandedVariant === variant.id}
                onToggle={() => setExpandedVariant(
                  expandedVariant === variant.id ? null : variant.id
                )}
              />
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
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              避免以下常见错误，提高代码正确率：
            </p>
            {template.commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                  <h4 className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {mistake.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      mistake.frequency === "high"
                        ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        : mistake.frequency === "medium"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
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
                  <p className="text-zinc-600 dark:text-zinc-300 mb-4">{mistake.explanation}</p>
                  {mistake.wrongCode && mistake.rightCode && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-rose-600 dark:text-rose-400 mb-2 flex items-center gap-1">
                          <span>❌</span> 错误写法
                        </div>
                        <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 overflow-x-auto">
                          <InlineCode code={mistake.wrongCode} language="typescript" />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-2 flex items-center gap-1">
                          <span>✅</span> 正确写法
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20 overflow-x-auto">
                          <InlineCode code={mistake.rightCode} language="typescript" />
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
            <p className="text-zinc-500 dark:text-zinc-400 mb-4">
              以下题目可以使用{template.name}解决：
            </p>
            <div className="grid gap-2">
              {template.applicableProblems.map((problemId) => {
                const problem = getProblemById(problemId);
                return (
                  <Link
                    key={problemId}
                    href={`/problems/${problemId}`}
                    className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all group shadow-sm dark:shadow-none"
                  >
                    <span className="text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white">
                      {problem?.title || problemId}
                    </span>
                    <svg
                      className="w-5 h-5 text-zinc-400 dark:text-zinc-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 group-hover:translate-x-0.5 transition-all"
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
                );
              })}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="py-4 sm:py-8 pb-safe">
      {/* 模板简介 */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 border border-purple-200 dark:border-purple-500/20 p-4 sm:p-6">
          <p className="text-zinc-600 dark:text-zinc-300">{template.description}</p>
        </div>

        {/* Tab 导航 */}
        <div className="mb-6 flex flex-wrap gap-2 p-1 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300/50 dark:hover:bg-zinc-700"
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
  );
}

/**
 * 变体卡片组件 - 展示详细讲解和动画
 */
interface VariantCardProps {
  variant: TemplateVariant;
  isExpanded: boolean;
  onToggle: () => void;
}

function VariantCard({ variant, isExpanded, onToggle }: VariantCardProps) {
  const [showFullCode, setShowFullCode] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [selectedAnimationIndex, setSelectedAnimationIndex] = useState(0);

  // 获取当前动画 - 优先使用 animations 数组，否则使用单个 animation
  const hasMultipleAnimations = variant.animations && variant.animations.length > 0;
  const currentAnimation = hasMultipleAnimations
    ? variant.animations![selectedAnimationIndex]?.animation
    : variant.animation;
  const currentProblem = hasMultipleAnimations
    ? variant.animations![selectedAnimationIndex]
    : null;

  return (
    <div className="rounded-xl bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 overflow-hidden shadow-sm dark:shadow-none">
      {/* 标题栏（可点击展开/折叠） */}
      <button
        onClick={onToggle}
        className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-700/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🔄</span>
          <div className="text-left">
            <h4 className="font-semibold text-zinc-900 dark:text-white">{variant.name}</h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{variant.description}</p>
          </div>
        </div>
        <motion.svg
          className="w-5 h-5 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </motion.svg>
      </button>

      {/* 展开内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-6 pb-6 space-y-6 border-t border-zinc-200 dark:border-zinc-700 pt-4">
              {/* 使用场景 */}
              <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700">
                <div className="text-xs text-zinc-500 mb-2 flex items-center gap-1">
                  <span>🎯</span> 使用场景
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">{variant.useCase}</div>
              </div>

              {/* 详细讲解 */}
              {variant.detailedExplanation && (
                <div className="space-y-4">
                  {/* 核心思想 */}
                  <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-200 dark:border-blue-500/20">
                    <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1">
                      <span>💡</span> 核心思想
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      {variant.detailedExplanation.coreIdea}
                    </p>
                  </div>

                  {/* 实现要点 */}
                  <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700">
                    <div className="text-xs text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1">
                      <span>✅</span> 实现要点
                    </div>
                    <ul className="space-y-2">
                      {variant.detailedExplanation.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                          <span className="text-emerald-500 dark:text-emerald-400 mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 与基础版本的区别 */}
                  {variant.detailedExplanation.differenceFromBase && (
                    <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                      <div className="text-xs text-amber-600 dark:text-amber-400 mb-2 flex items-center gap-1">
                        <span>🔀</span> 与基础版本的区别
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300">
                        {variant.detailedExplanation.differenceFromBase}
                      </p>
                    </div>
                  )}

                  {/* 常见陷阱 */}
                  {variant.detailedExplanation.pitfalls && variant.detailedExplanation.pitfalls.length > 0 && (
                    <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                      <div className="text-xs text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-1">
                        <span>⚠️</span> 常见陷阱
                      </div>
                      <ul className="space-y-2">
                        {variant.detailedExplanation.pitfalls.map((pitfall, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                            <span className="text-rose-500 dark:text-rose-400 mt-0.5">!</span>
                            {pitfall}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* 代码展示 */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                    <span>📝</span> 代码模板
                  </h5>
                  <div className="flex items-center gap-2">
                    {variant.fullCode && (
                      <button
                        onClick={() => setShowFullCode(!showFullCode)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          showFullCode
                            ? "bg-purple-600 text-white"
                            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        {showFullCode ? "完整代码" : "代码片段"}
                      </button>
                    )}
                    {showFullCode && variant.fullCode && (
                      <button
                        onClick={() => setShowComments(!showComments)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          showComments
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                        }`}
                      >
                        {showComments ? "带注释" : "简洁版"}
                      </button>
                    )}
                  </div>
                </div>

                {showFullCode && variant.fullCode ? (
                  <CodeHighlighter
                    code={showComments ? variant.fullCode.comments : variant.fullCode.typescript}
                    language="typescript"
                    showLineNumbers={true}
                    maxHeight="400px"
                  />
                ) : (
                  <CodeHighlighter
                    code={variant.codeSnippet}
                    language="typescript"
                    showLineNumbers={false}
                    maxHeight="300px"
                  />
                )}
              </div>

              {/* 动画演示 */}
              {(currentAnimation || hasMultipleAnimations) && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h5 className="text-sm font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-2">
                      <span>🎬</span> 动画演示
                    </h5>

                    {/* 多题型切换按钮 */}
                    {hasMultipleAnimations && (
                      <div className="flex flex-wrap gap-2">
                        {variant.animations!.map((anim, index) => {
                          const diffConfig = DIFFICULTY_CONFIG[anim.difficulty];
                          return (
                            <button
                              key={anim.problemId}
                              onClick={() => setSelectedAnimationIndex(index)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                                selectedAnimationIndex === index
                                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                  : "bg-zinc-200 dark:bg-zinc-700/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${diffConfig.bg.replace('/10', '/60')}`} />
                              {anim.problemName}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* 当前选中的题目信息 */}
                  {currentProblem && (
                    <div className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${DIFFICULTY_CONFIG[currentProblem.difficulty].bg} ${DIFFICULTY_CONFIG[currentProblem.difficulty].color}`}>
                          {DIFFICULTY_CONFIG[currentProblem.difficulty].label}
                        </span>
                        <span className="text-sm text-zinc-600 dark:text-zinc-300">{currentProblem.problemName}</span>
                      </div>
                      <Link
                        href={`/problems/${currentProblem.problemId}`}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center gap-1"
                      >
                        查看题目
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </Link>
                    </div>
                  )}

                  {/* 动画展示 */}
                  {currentAnimation && (
                    <div className="rounded-lg overflow-hidden">
                      <TwoPointersAnimation
                        steps={currentAnimation.steps.map(step => ({
                          array: step.array || [],
                          left: step.left ?? 0,
                          right: step.right ?? 0,
                          description: step.description,
                          highlights: step.highlights,
                          comparing: step.comparing,
                          completed: step.completed,
                          codeHighlight: step.codeHighlight
                        }))}
                        title={currentAnimation.title}
                        leftLabel={variant.id === "fast-slow" ? "slow" : "left"}
                        rightLabel={variant.id === "fast-slow" ? "fast" : "right"}
                        code={showFullCode && variant.fullCode
                          ? (showComments ? variant.fullCode.comments : variant.fullCode.typescript)
                          : variant.codeSnippet}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* 示例题目 */}
              {variant.exampleProblem && (
                <Link
                  href={`/problems/${variant.exampleProblem}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
                >
                  <span>📚</span>
                  练习题目: {variant.exampleProblem.split("-").map(
                    w => w.charAt(0).toUpperCase() + w.slice(1)
                  ).join(" ")}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
