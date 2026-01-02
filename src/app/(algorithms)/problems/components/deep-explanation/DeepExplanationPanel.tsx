"use client";

import { useState } from "react";
import { DeepExplanation, GuidedThinking } from "../../types";
import { IntuitionCard } from "./IntuitionCard";
import { ThinkingTimeline } from "./ThinkingTimeline";
import { CodeWalkthroughPanel } from "./CodeWalkthroughPanel";
import { CommonMistakesPanel } from "./CommonMistakesPanel";
import { ComplexityAnalysisCard } from "./ComplexityAnalysisCard";
import { PatternComparisonsPanel, VariationsPanel } from "./PatternComparisonsPanel";
import { GuidedThinkingPanel } from "../guided-thinking";

interface DeepExplanationPanelProps {
  explanation: DeepExplanation;
  guidedThinking?: GuidedThinking;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
}

type TabId = "intuition" | "thinking" | "code" | "mistakes" | "complexity" | "related" | "guided";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: "intuition", label: "算法直觉", icon: "💡" },
  { id: "guided", label: "思维引导", icon: "🧭" },
  { id: "thinking", label: "思维过程", icon: "🧠" },
  { id: "code", label: "代码解析", icon: "📖" },
  { id: "complexity", label: "复杂度分析", icon: "📊" },
  { id: "mistakes", label: "常见错误", icon: "⚠️" },
  { id: "related", label: "相关题目", icon: "🔗" },
];

/**
 * 深度讲解面板 - 整合所有讲解组件
 */
export function DeepExplanationPanel({
  explanation,
  guidedThinking,
  code,
  timeComplexity,
  spaceComplexity,
}: DeepExplanationPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("intuition");

  // 过滤掉没有数据的 tab
  const availableTabs = tabs.filter((tab) => {
    switch (tab.id) {
      case "mistakes":
        return explanation.commonMistakes && explanation.commonMistakes.length > 0;
      case "related":
        return (
          (explanation.patternComparisons && explanation.patternComparisons.length > 0) ||
          (explanation.variations && explanation.variations.length > 0)
        );
      case "guided":
        return guidedThinking && (
          (guidedThinking.socraticQuestions && guidedThinking.socraticQuestions.length > 0) ||
          (guidedThinking.progressiveReveal && guidedThinking.progressiveReveal.length > 0) ||
          (guidedThinking.checkpoints && guidedThinking.checkpoints.length > 0)
        );
      default:
        return true;
    }
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "intuition":
        return <IntuitionCard intuition={explanation.intuition} />;
      case "thinking":
        return <ThinkingTimeline steps={explanation.thinkingProcess} />;
      case "code":
        return (
          <CodeWalkthroughPanel
            code={code}
            walkthroughs={explanation.codeWalkthrough}
          />
        );
      case "complexity":
        return (
          <ComplexityAnalysisCard
            analysis={explanation.complexityAnalysis}
            timeComplexity={timeComplexity}
            spaceComplexity={spaceComplexity}
          />
        );
      case "mistakes":
        return explanation.commonMistakes ? (
          <CommonMistakesPanel mistakes={explanation.commonMistakes} />
        ) : null;
      case "related":
        return (
          <div className="space-y-6">
            {explanation.patternComparisons && explanation.patternComparisons.length > 0 && (
              <PatternComparisonsPanel comparisons={explanation.patternComparisons} />
            )}
            {explanation.variations && explanation.variations.length > 0 && (
              <VariationsPanel variations={explanation.variations} />
            )}
          </div>
        );
      case "guided":
        return guidedThinking ? (
          <GuidedThinkingPanel thinking={guidedThinking} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          深度讲解
        </h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          点击各标签深入学习
        </div>
      </div>

      {/* Tab 导航 */}
      <div className="flex flex-wrap gap-2 p-1 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg">
        {availableTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="min-h-[400px]">{renderTabContent()}</div>

      {/* 面试技巧 */}
      {explanation.interviewTips && explanation.interviewTips.length > 0 && (
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-lg font-semibold text-purple-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">💼</span>
            面试技巧
          </h3>
          <ul className="space-y-2">
            {explanation.interviewTips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <span className="text-purple-400 mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 前端应用场景 */}
      {explanation.frontendApplications && explanation.frontendApplications.length > 0 && (
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/30">
          <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            前端应用场景
          </h3>
          <ul className="space-y-2">
            {explanation.frontendApplications.map((app, index) => (
              <li key={index} className="flex items-start gap-2 text-zinc-700 dark:text-zinc-300">
                <span className="text-blue-400 mt-1">→</span>
                {app}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
