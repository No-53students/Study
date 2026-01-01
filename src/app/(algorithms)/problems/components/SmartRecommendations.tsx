"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DIFFICULTY_CONFIG, FRONTEND_RELEVANCE_CONFIG, CATEGORIES } from "../types";
import {
  getQuickRecommendations,
  getRecommendations,
  getLearningProgress,
  getReasonDisplay,
  RecommendedProblem,
} from "../data/recommendations";

interface RecommendationCardProps {
  recommendation: RecommendedProblem;
  variant?: "default" | "compact" | "featured";
}

/**
 * 单个推荐卡片
 */
export function RecommendationCard({ recommendation, variant = "default" }: RecommendationCardProps) {
  const { problem, reasons } = recommendation;
  const diffConfig = DIFFICULTY_CONFIG[problem.difficulty];
  const relevanceConfig = problem.frontendRelevance
    ? FRONTEND_RELEVANCE_CONFIG[problem.frontendRelevance]
    : null;
  const category = CATEGORIES.find(c => c.id === problem.category);
  const reasonText = getReasonDisplay(reasons);

  if (variant === "compact") {
    return (
      <Link
        href={`/problems/${problem.id}`}
        className="group flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-zinc-600 hover:bg-zinc-800 transition-all"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-zinc-500 font-mono">#{problem.leetcodeId || "-"}</span>
            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${diffConfig.color} ${diffConfig.bg}`}>
              {diffConfig.label}
            </span>
          </div>
          <h4 className="text-sm font-medium text-white truncate group-hover:text-emerald-400 transition-colors">
            {problem.title}
          </h4>
        </div>
        <svg
          className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={`/problems/${problem.id}`}
        className="group block p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-900/10 to-transparent border border-emerald-500/20 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/10 transition-all relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-xs text-zinc-500 font-mono">#{problem.leetcodeId || "-"}</span>
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${diffConfig.color} ${diffConfig.bg} border ${diffConfig.border}`}>
              {diffConfig.label}
            </span>
            {relevanceConfig && (
              <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${relevanceConfig.color} ${relevanceConfig.bg}`}>
                {relevanceConfig.icon} {relevanceConfig.label}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-emerald-400 transition-colors">
            {problem.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>{category?.icon}</span>
            <span>{category?.name}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-emerald-400">{reasonText}</span>
          </div>
        </div>
      </Link>
    );
  }

  // default variant
  return (
    <Link
      href={`/problems/${problem.id}`}
      className="group block p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/80 transition-all"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-zinc-500 font-mono">#{problem.leetcodeId || "-"}</span>
          <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${diffConfig.color} ${diffConfig.bg}`}>
            {diffConfig.label}
          </span>
        </div>
        {relevanceConfig && (
          <span className={`px-1.5 py-0.5 rounded text-xs ${relevanceConfig.color} ${relevanceConfig.bg}`}>
            {relevanceConfig.icon}
          </span>
        )}
      </div>
      <h4 className="text-sm font-medium text-white mb-2 group-hover:text-emerald-400 transition-colors">
        {problem.title}
      </h4>
      <div className="text-xs text-zinc-500">
        {reasonText}
      </div>
    </Link>
  );
}

interface SmartRecommendationsProps {
  completedProblems: string[];
  className?: string;
}

/**
 * 智能推荐面板
 */
export function SmartRecommendations({ completedProblems, className = "" }: SmartRecommendationsProps) {
  const recommendations = useMemo(() => {
    return getQuickRecommendations(completedProblems);
  }, [completedProblems]);

  const progress = useMemo(() => {
    return getLearningProgress(completedProblems);
  }, [completedProblems]);

  const nextCategory = progress.nextCategory
    ? CATEGORIES.find(c => c.id === progress.nextCategory)
    : null;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 学习进度 */}
      <div className="rounded-xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <span className="text-lg">📊</span>
            学习进度
          </h3>
          <span className="text-lg font-bold text-blue-400">{progress.percentage}%</span>
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>已完成 {progress.completed} / {progress.total} 题</span>
          {nextCategory && (
            <span className="flex items-center gap-1">
              <span>下一步:</span>
              <span className="text-blue-400">{nextCategory.icon} {nextCategory.name}</span>
            </span>
          )}
        </div>
      </div>

      {/* 下一道推荐 */}
      {recommendations.nextProblem && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-lg">🎯</span>
            推荐下一题
          </h3>
          <RecommendationCard
            recommendation={recommendations.nextProblem}
            variant="featured"
          />
        </div>
      )}

      {/* 前端必刷 */}
      {recommendations.frontendMustDo.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-lg">🔥</span>
            前端面试必刷
          </h3>
          <div className="space-y-2">
            {recommendations.frontendMustDo.map(rec => (
              <RecommendationCard
                key={rec.problem.id}
                recommendation={rec}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}

      {/* 复习建议 */}
      {recommendations.reviewSuggestions.length > 0 && completedProblems.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <span className="text-lg">🔄</span>
            复习建议
          </h3>
          <div className="space-y-2">
            {recommendations.reviewSuggestions.map(rec => (
              <RecommendationCard
                key={rec.problem.id}
                recommendation={rec}
                variant="compact"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface RecommendationListProps {
  completedProblems: string[];
  limit?: number;
  showProgress?: boolean;
  className?: string;
}

/**
 * 推荐列表（用于页面展示）
 */
export function RecommendationList({
  completedProblems,
  limit = 10,
  showProgress = true,
  className = "",
}: RecommendationListProps) {
  const recommendations = useMemo(() => {
    return getRecommendations({
      completedProblems,
      prioritizeFrontend: true,
      limit,
    });
  }, [completedProblems, limit]);

  const progress = useMemo(() => {
    return getLearningProgress(completedProblems);
  }, [completedProblems]);

  return (
    <div className={className}>
      {showProgress && (
        <div className="mb-6 flex items-center gap-4">
          <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-sm text-zinc-400 shrink-0">
            {progress.completed} / {progress.total}
          </span>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map(rec => (
          <RecommendationCard
            key={rec.problem.id}
            recommendation={rec}
            variant="default"
          />
        ))}
      </div>
    </div>
  );
}

/**
 * 迷你推荐卡片（用于侧边栏）
 */
export function MiniRecommendation({
  completedProblems,
  className = "",
}: {
  completedProblems: string[];
  className?: string;
}) {
  const recommendations = useMemo(() => {
    return getRecommendations({
      completedProblems,
      prioritizeFrontend: true,
      limit: 3,
    });
  }, [completedProblems]);

  if (recommendations.length === 0) return null;

  return (
    <div className={`rounded-xl bg-zinc-900/80 border border-zinc-800 p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
        <span>💡</span>
        推荐练习
      </h4>
      <div className="space-y-2">
        {recommendations.map(rec => (
          <Link
            key={rec.problem.id}
            href={`/problems/${rec.problem.id}`}
            className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_CONFIG[rec.problem.difficulty].bg.replace('/10', '/50')}`} />
            <span className="truncate group-hover:text-emerald-400">{rec.problem.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
