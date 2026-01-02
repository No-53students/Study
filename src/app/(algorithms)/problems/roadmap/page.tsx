"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { frontend50Path, calculatePathProgress } from "../data/roadmaps/frontend-50";
import { PATH_DIFFICULTY_CONFIG } from "../types/roadmap";
import { SmartRecommendations } from "../components/SmartRecommendations";

// 本地存储 key
const STORAGE_KEY = "algorithm-learning-progress";

// 获取已完成的题目
function getCompletedProblems(): string[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    return parsed.completedProblems || [];
  } catch {
    return [];
  }
}

// 切换题目完成状态
function toggleProblemComplete(problemId: string): string[] {
  const current = getCompletedProblems();
  const isCompleted = current.includes(problemId);

  const newList = isCompleted
    ? current.filter((id) => id !== problemId)
    : [...current, problemId];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      completedProblems: newList,
      lastUpdated: new Date().toISOString(),
    })
  );

  return newList;
}

export default function RoadmapPage() {
  const path = frontend50Path;
  const [completedProblems, setCompletedProblems] = useState<string[]>([]);
  const [expandedStages, setExpandedStages] = useState<Set<string>>(
    new Set([path.stages[0]?.id])
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCompletedProblems(getCompletedProblems());
  }, []);

  const handleToggle = (problemId: string) => {
    const newList = toggleProblemComplete(problemId);
    setCompletedProblems(newList);
  };

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => {
      const next = new Set(prev);
      if (next.has(stageId)) {
        next.delete(stageId);
      } else {
        next.add(stageId);
      }
      return next;
    });
  };

  const progress = calculatePathProgress(path, completedProblems);
  const difficultyConfig = PATH_DIFFICULTY_CONFIG[path.difficulty];

  if (!mounted) {
    return (
      <div className="min-h-screen py-6 flex items-center justify-center">
        <div className="animate-pulse text-zinc-400">加载中...</div>
      </div>
    );
  }

  return (
    <main className="py-4 sm:py-8 pb-safe">
      <div className="lg:grid lg:grid-cols-[1fr,320px] lg:gap-6">
        {/* 主内容区域 */}
        <div>
        {/* 路线信息卡片 */}
        <div className="mb-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 p-4 sm:p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{path.name}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{path.description}</p>
            </div>
            <div className="text-3xl">{path.icon}</div>
          </div>

          {/* 进度条 */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-zinc-600 dark:text-zinc-400">学习进度</span>
              <span className="text-blue-400 font-medium">
                {progress.completed}/{progress.total} ({progress.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>
          </div>

          {/* 阶段进度缩略 */}
          <div className="flex flex-wrap gap-2">
            {progress.stageProgress.map((stage) => (
              <div
                key={stage.stageId}
                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/50 text-xs"
              >
                <span className="text-zinc-600 dark:text-zinc-400">{stage.stageName}</span>
                <span
                  className={`font-medium ${
                    stage.completed === stage.total
                      ? "text-emerald-400"
                      : stage.completed > 0
                      ? "text-blue-400"
                      : "text-zinc-500"
                  }`}
                >
                  {stage.completed}/{stage.total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 目标人群和前置知识 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm dark:shadow-none">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
              <span className="text-lg">👥</span> 适合人群
            </h3>
            <ul className="space-y-1">
              {path.targetAudience.map((audience, i) => (
                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                  {audience}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm dark:shadow-none">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center gap-2">
              <span className="text-lg">📚</span> 前置知识
            </h3>
            <ul className="space-y-1">
              {path.prerequisites.map((prereq, i) => (
                <li key={i} className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 学习阶段列表 */}
        <div className="space-y-4">
          {path.stages.map((stage, stageIndex) => {
            const stageProgress = progress.stageProgress.find(
              (s) => s.stageId === stage.id
            );
            const isExpanded = expandedStages.has(stage.id);
            const isStageCompleted =
              stageProgress && stageProgress.completed === stageProgress.total;
            const isLocked = stageIndex > 0 && !isStageCompleted;

            return (
              <div
                key={stage.id}
                className={`rounded-xl border transition-colors shadow-sm dark:shadow-none ${
                  isStageCompleted
                    ? "bg-emerald-50 dark:bg-emerald-500/5 border-emerald-200 dark:border-emerald-500/20"
                    : "bg-white dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {/* 阶段标题 */}
                <button
                  onClick={() => toggleStage(stage.id)}
                  className="w-full p-4 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-xl ${
                        isStageCompleted
                          ? "bg-emerald-100 dark:bg-emerald-500/20"
                          : "bg-zinc-100 dark:bg-zinc-800"
                      }`}
                    >
                      {isStageCompleted ? "✅" : stage.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{stage.name}</h3>
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            isStageCompleted
                              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                              : stageProgress && stageProgress.completed > 0
                              ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {stageProgress?.completed || 0}/{stageProgress?.total || 0}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-zinc-500 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* 每日任务列表 */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    {stage.days.map((day) => (
                      <div
                        key={day.id}
                        className="rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 overflow-hidden"
                      >
                        {/* 日期标题 */}
                        <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700/50">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm text-zinc-900 dark:text-white">{day.title}</h4>
                            <span className="text-xs text-zinc-500">
                              约 {day.estimatedMinutes} 分钟
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                            {day.description}
                          </p>
                        </div>

                        {/* 知识点标签 */}
                        {day.knowledgePoints && (
                          <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-700/50 flex flex-wrap gap-1.5">
                            {day.knowledgePoints.map((point, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-zinc-200/70 dark:bg-zinc-700/50 text-xs text-zinc-700 dark:text-zinc-300"
                              >
                                {point}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* 题目列表 */}
                        <div className="divide-y divide-zinc-200 dark:divide-zinc-700/50">
                          {day.problems.map((problem) => {
                            const isCompleted = completedProblems.includes(
                              problem.problemId
                            );
                            return (
                              <div
                                key={problem.problemId}
                                className="px-4 py-3 flex items-center justify-between gap-3"
                              >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                  <button
                                    onClick={() => handleToggle(problem.problemId)}
                                    className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                                      isCompleted
                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                        : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-zinc-500"
                                    }`}
                                  >
                                    {isCompleted && (
                                      <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </button>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                      <Link
                                        href={`/problems/${problem.problemId}`}
                                        className={`font-medium text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors truncate ${
                                          isCompleted
                                            ? "text-zinc-400 line-through"
                                            : "text-zinc-900 dark:text-white"
                                        }`}
                                      >
                                        {problem.problemId
                                          .split("-")
                                          .map(
                                            (word) =>
                                              word.charAt(0).toUpperCase() +
                                              word.slice(1)
                                          )
                                          .join(" ")}
                                      </Link>
                                      {problem.isCore && (
                                        <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                          必做
                                        </span>
                                      )}
                                    </div>
                                    {problem.hint && (
                                      <p className="text-xs text-zinc-500 mt-0.5 truncate">
                                        💡 {problem.hint}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <Link
                                  href={`/problems/${problem.problemId}`}
                                  className="flex-shrink-0 px-3 py-1.5 rounded-md bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-xs font-medium transition-colors"
                                >
                                  做题
                                </Link>
                              </div>
                            );
                          })}
                        </div>

                        {/* 学习小贴士 */}
                        {day.tips && (
                          <div className="px-4 py-3 bg-blue-50 dark:bg-blue-500/5 border-t border-zinc-200 dark:border-zinc-700/50">
                            <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                              💡 小贴士
                            </div>
                            {day.tips.map((tip, i) => (
                              <p key={i} className="text-xs text-zinc-600 dark:text-zinc-400">
                                • {tip}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
          </div>

          {/* 智能推荐侧边栏 */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <SmartRecommendations completedProblems={completedProblems} />
            </div>
          </aside>
        </div>

        {/* 移动端智能推荐 */}
        <div className="lg:hidden mt-8">
          <SmartRecommendations completedProblems={completedProblems} />
        </div>
      </main>
  );
}
