"use client";

import { useState } from "react";
import { GuidedThinking } from "../../types";
import { SocraticQuestions } from "./SocraticQuestions";
import { ProgressiveRevealPanel } from "./ProgressiveRevealPanel";
import { ThinkingCheckpoints } from "./ThinkingCheckpoints";

interface GuidedThinkingPanelProps {
  thinking: GuidedThinking;
}

type TabId = "socratic" | "reveal" | "checkpoint";

interface Tab {
  id: TabId;
  label: string;
  icon: string;
  description: string;
}

const tabs: Tab[] = [
  { id: "socratic", label: "苏格拉底式提问", icon: "🤔", description: "通过问题引导思考" },
  { id: "reveal", label: "逐步揭示", icon: "🔍", description: "渐进式展示思路" },
  { id: "checkpoint", label: "理解检验", icon: "✅", description: "验证学习效果" },
];

/**
 * 思维引导面板 - 整合所有引导式学习组件
 */
export function GuidedThinkingPanel({ thinking }: GuidedThinkingPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("socratic");

  // 过滤掉没有数据的 tab
  const availableTabs = tabs.filter((tab) => {
    switch (tab.id) {
      case "socratic":
        return thinking.socraticQuestions && thinking.socraticQuestions.length > 0;
      case "reveal":
        return thinking.progressiveReveal && thinking.progressiveReveal.length > 0;
      case "checkpoint":
        return thinking.checkpoints && thinking.checkpoints.length > 0;
      default:
        return false;
    }
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "socratic":
        return thinking.socraticQuestions?.length ? (
          <SocraticQuestions questions={thinking.socraticQuestions} />
        ) : null;
      case "reveal":
        return thinking.progressiveReveal?.length ? (
          <ProgressiveRevealPanel reveals={thinking.progressiveReveal} />
        ) : null;
      case "checkpoint":
        return thinking.checkpoints?.length ? (
          <ThinkingCheckpoints checkpoints={thinking.checkpoints} />
        ) : null;
      default:
        return null;
    }
  };

  // 确保默认选中第一个可用的 tab
  const effectiveTab = availableTabs.find((t) => t.id === activeTab)
    ? activeTab
    : availableTabs[0]?.id || "socratic";

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🧭</span>
          思维引导
        </h2>
        <div className="text-sm text-zinc-600 dark:text-zinc-400">引导式学习，步步深入</div>
      </div>

      {/* 介绍卡片 */}
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-4 border border-cyan-500/30">
        <p className="text-zinc-700 dark:text-zinc-300 text-sm">
          <span className="text-cyan-400 font-medium">学习提示：</span>
          不要直接看答案！尝试先独立思考每个问题，这样能更好地理解和记忆解法。
        </p>
      </div>

      {/* Tab 导航 */}
      {availableTabs.length > 1 && (
        <div className="flex flex-wrap gap-2 p-1 bg-zinc-200 dark:bg-zinc-800/50 rounded-lg">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[120px] px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                effectiveTab === tab.id
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-700"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Tab 内容 */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
