/**
 * 智能推荐系统
 *
 * 基于用户学习进度和题目特征，提供个性化推荐
 */

import { Problem, Difficulty, Category, CATEGORIES } from "../types";
import { allProblems } from "./index";

// ============================================================================
// 推荐类型定义
// ============================================================================

export interface RecommendationReason {
  type: "difficulty" | "category" | "frontend" | "related" | "learning-path" | "review";
  text: string;
  priority: number;
}

export interface RecommendedProblem {
  problem: Problem;
  score: number;
  reasons: RecommendationReason[];
}

export interface RecommendationConfig {
  /** 已完成的题目 ID 列表 */
  completedProblems: string[];
  /** 用户偏好的分类 */
  preferredCategories?: Category[];
  /** 用户当前水平 */
  userLevel?: "beginner" | "intermediate" | "advanced";
  /** 是否优先前端相关 */
  prioritizeFrontend?: boolean;
  /** 推荐数量 */
  limit?: number;
  /** 排除的题目 ID */
  excludeProblems?: string[];
}

// ============================================================================
// 难度权重配置
// ============================================================================

const DIFFICULTY_WEIGHTS: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const DIFFICULTY_PROGRESSION: Record<string, Difficulty[]> = {
  beginner: ["easy", "easy", "medium"],
  intermediate: ["easy", "medium", "medium", "hard"],
  advanced: ["medium", "hard", "hard"],
};

// ============================================================================
// 前端相关度权重
// ============================================================================

const FRONTEND_RELEVANCE_WEIGHTS = {
  high: 3,
  medium: 2,
  low: 1,
  undefined: 0,
};

// ============================================================================
// 分类相关性矩阵
// ============================================================================

const CATEGORY_SIMILARITY: Record<Category, Category[]> = {
  "array-string": ["two-pointers", "sliding-window", "hash-table"],
  "two-pointers": ["array-string", "sliding-window", "linked-list"],
  "sliding-window": ["two-pointers", "array-string", "hash-table"],
  "matrix": ["array-string", "graph", "bst"],
  "hash-table": ["array-string", "sliding-window", "two-pointers"],
  "intervals": ["array-string", "greedy", "heap"],
  "stack": ["linked-list", "binary-tree", "backtracking"],
  "linked-list": ["two-pointers", "stack", "binary-tree"],
  "binary-tree": ["linked-list", "bst", "graph"],
  "bst": ["binary-tree", "binary-search", "heap"],
  "graph": ["binary-tree", "backtracking", "graph-bfs"],
  "graph-bfs": ["graph", "matrix", "binary-tree"],
  "trie": ["hash-table", "backtracking", "binary-tree"],
  "backtracking": ["graph", "binary-tree", "dp-1d"],
  "divide-conquer": ["binary-search", "binary-tree", "heap"],
  "kadane": ["dp-1d", "array-string", "sliding-window"],
  "binary-search": ["array-string", "divide-conquer", "bst"],
  "heap": ["binary-search", "bst", "intervals"],
  "bit-manipulation": ["math", "array-string", "hash-table"],
  "math": ["bit-manipulation", "array-string", "dp-1d"],
  "dp-1d": ["kadane", "backtracking", "dp-multi"],
  "dp-multi": ["dp-1d", "matrix", "graph"],
  "greedy": ["intervals", "heap", "array-string"],
  "techniques": ["array-string", "hash-table", "two-pointers"],
};

// ============================================================================
// 推荐学习顺序
// ============================================================================

const LEARNING_ORDER: Category[] = [
  "array-string",
  "hash-table",
  "two-pointers",
  "sliding-window",
  "stack",
  "linked-list",
  "binary-search",
  "binary-tree",
  "bst",
  "backtracking",
  "dp-1d",
  "graph",
  "heap",
  "dp-multi",
  "intervals",
  "matrix",
  "graph-bfs",
  "trie",
  "bit-manipulation",
  "math",
  "greedy",
  "divide-conquer",
  "kadane",
  "techniques",
];

// ============================================================================
// 核心推荐算法
// ============================================================================

/**
 * 计算题目推荐分数
 */
function calculateScore(
  problem: Problem,
  config: RecommendationConfig,
  context: {
    completedCategories: Set<Category>;
    avgDifficulty: number;
    recentCategories: Category[];
  }
): { score: number; reasons: RecommendationReason[] } {
  const reasons: RecommendationReason[] = [];
  let score = 0;

  // 1. 难度适配分数 (0-30分)
  const difficultyWeight = DIFFICULTY_WEIGHTS[problem.difficulty];
  const targetDifficulty = getTargetDifficulty(config.userLevel || "beginner", context.avgDifficulty);
  const difficultyDiff = Math.abs(difficultyWeight - targetDifficulty);

  if (difficultyDiff === 0) {
    score += 30;
    reasons.push({
      type: "difficulty",
      text: "难度适中",
      priority: 1,
    });
  } else if (difficultyDiff <= 1) {
    score += 20;
  } else {
    score += 10;
  }

  // 2. 前端相关度分数 (0-25分)
  if (config.prioritizeFrontend !== false) {
    const frontendWeight = FRONTEND_RELEVANCE_WEIGHTS[problem.frontendRelevance || "undefined"];
    if (frontendWeight >= 2) {
      score += frontendWeight * 8;
      reasons.push({
        type: "frontend",
        text: problem.frontendRelevance === "high" ? "前端高频题" : "前端相关",
        priority: frontendWeight === 3 ? 1 : 2,
      });
    }
  }

  // 3. 分类学习顺序分数 (0-20分)
  const categoryOrder = LEARNING_ORDER.indexOf(problem.category);
  const completedCategoryCount = context.completedCategories.size;

  if (categoryOrder <= completedCategoryCount) {
    // 当前或之前分类的题目
    score += 20;
    if (!context.completedCategories.has(problem.category)) {
      reasons.push({
        type: "learning-path",
        text: `学习 ${CATEGORIES.find(c => c.id === problem.category)?.name || problem.category}`,
        priority: 2,
      });
    }
  } else if (categoryOrder <= completedCategoryCount + 2) {
    // 接下来要学的分类
    score += 15;
    reasons.push({
      type: "learning-path",
      text: "下一步推荐",
      priority: 3,
    });
  } else {
    score += 5;
  }

  // 4. 偏好分类分数 (0-15分)
  if (config.preferredCategories?.includes(problem.category)) {
    score += 15;
    reasons.push({
      type: "category",
      text: "您感兴趣的分类",
      priority: 2,
    });
  }

  // 5. 相关分类分数 (0-10分)
  const similarCategories = CATEGORY_SIMILARITY[problem.category] || [];
  const recentCategoryMatch = context.recentCategories.some(cat =>
    similarCategories.includes(cat)
  );
  if (recentCategoryMatch) {
    score += 10;
    reasons.push({
      type: "related",
      text: "与最近学习相关",
      priority: 3,
    });
  }

  // 6. 关联题目加分 (0-10分)
  if (problem.relatedProblems?.some(id => config.completedProblems.includes(id))) {
    score += 10;
    reasons.push({
      type: "related",
      text: "已完成相关题目",
      priority: 3,
    });
  }

  return { score, reasons };
}

/**
 * 获取目标难度
 */
function getTargetDifficulty(userLevel: string, avgDifficulty: number): number {
  const levelTarget: Record<string, number> = {
    beginner: 1.2,
    intermediate: 1.8,
    advanced: 2.5,
  };

  const target = levelTarget[userLevel] || 1.5;

  // 如果用户已完成题目的平均难度高于目标，提升目标
  if (avgDifficulty > target) {
    return Math.min(avgDifficulty + 0.3, 3);
  }

  return target;
}

/**
 * 分析用户学习上下文
 */
function analyzeContext(completedProblems: string[]) {
  const completedCategories = new Set<Category>();
  const recentCategories: Category[] = [];
  let totalDifficulty = 0;

  const completed = allProblems.filter(p => completedProblems.includes(p.id));

  completed.forEach(problem => {
    completedCategories.add(problem.category);
    totalDifficulty += DIFFICULTY_WEIGHTS[problem.difficulty];
  });

  // 获取最近5道题的分类
  const recent = completed.slice(-5);
  recent.forEach(p => recentCategories.push(p.category));

  return {
    completedCategories,
    recentCategories,
    avgDifficulty: completed.length > 0 ? totalDifficulty / completed.length : 1,
  };
}

// ============================================================================
// 公开 API
// ============================================================================

/**
 * 获取推荐题目列表
 */
export function getRecommendations(config: RecommendationConfig): RecommendedProblem[] {
  const {
    completedProblems,
    limit = 10,
    excludeProblems = [],
  } = config;

  const context = analyzeContext(completedProblems);

  // 过滤可推荐的题目
  const eligibleProblems = allProblems.filter(problem =>
    !completedProblems.includes(problem.id) &&
    !excludeProblems.includes(problem.id)
  );

  // 计算每道题的分数
  const scored = eligibleProblems.map(problem => {
    const { score, reasons } = calculateScore(problem, config, context);
    return { problem, score, reasons };
  });

  // 按分数排序并取前 N 道
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit);
}

/**
 * 获取下一道推荐题目
 */
export function getNextProblem(config: RecommendationConfig): RecommendedProblem | null {
  const recommendations = getRecommendations({ ...config, limit: 1 });
  return recommendations[0] || null;
}

/**
 * 获取分类推荐
 */
export function getCategoryRecommendations(
  category: Category,
  completedProblems: string[],
  limit = 5
): RecommendedProblem[] {
  return getRecommendations({
    completedProblems,
    preferredCategories: [category],
    limit,
  });
}

/**
 * 获取复习推荐（已完成但需要复习的题目）
 */
export function getReviewRecommendations(
  completedProblems: string[],
  limit = 5
): RecommendedProblem[] {
  const completed = allProblems.filter(p => completedProblems.includes(p.id));

  // 优先复习：1.困难题 2.前端高频题 3.最早完成的题
  const scored = completed.map((problem, index) => {
    const reasons: RecommendationReason[] = [];
    let score = 0;

    // 困难题优先
    score += DIFFICULTY_WEIGHTS[problem.difficulty] * 10;
    if (problem.difficulty === "hard") {
      reasons.push({
        type: "review",
        text: "困难题需要复习",
        priority: 1,
      });
    }

    // 前端高频题优先
    if (problem.frontendRelevance === "high") {
      score += 20;
      reasons.push({
        type: "frontend",
        text: "前端高频题",
        priority: 1,
      });
    }

    // 越早完成的越需要复习
    score += (completed.length - index) * 2;

    return { problem, score, reasons };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
}

/**
 * 获取前端必刷推荐
 */
export function getFrontendMustDoRecommendations(
  completedProblems: string[],
  limit = 10
): RecommendedProblem[] {
  const frontendProblems = allProblems.filter(
    p => p.frontendRelevance === "high" && !completedProblems.includes(p.id)
  );

  // 按难度排序：简单 -> 中等 -> 困难
  const sorted = frontendProblems.sort((a, b) => {
    const diffA = DIFFICULTY_WEIGHTS[a.difficulty];
    const diffB = DIFFICULTY_WEIGHTS[b.difficulty];
    return diffA - diffB;
  });

  return sorted.slice(0, limit).map(problem => ({
    problem,
    score: 100,
    reasons: [{
      type: "frontend",
      text: "前端面试必刷",
      priority: 1,
    }],
  }));
}

/**
 * 获取学习路径进度
 */
export function getLearningProgress(completedProblems: string[]): {
  completed: number;
  total: number;
  percentage: number;
  currentCategory: Category | null;
  nextCategory: Category | null;
} {
  const completed = completedProblems.length;
  const total = allProblems.length;
  const percentage = Math.round((completed / total) * 100);

  // 找到当前正在学习的分类
  const completedCategories = new Set<Category>();
  allProblems
    .filter(p => completedProblems.includes(p.id))
    .forEach(p => completedCategories.add(p.category));

  let currentCategory: Category | null = null;
  let nextCategory: Category | null = null;

  for (const category of LEARNING_ORDER) {
    const categoryProblems = allProblems.filter(p => p.category === category);
    const categoryCompleted = categoryProblems.filter(p => completedProblems.includes(p.id));

    if (categoryCompleted.length > 0 && categoryCompleted.length < categoryProblems.length) {
      currentCategory = category;
      break;
    }

    if (categoryCompleted.length === 0 && !nextCategory) {
      nextCategory = category;
    }
  }

  return {
    completed,
    total,
    percentage,
    currentCategory,
    nextCategory: nextCategory || currentCategory,
  };
}

/**
 * 获取推荐理由的显示文本
 */
export function getReasonDisplay(reasons: RecommendationReason[]): string {
  if (reasons.length === 0) return "推荐练习";

  // 按优先级排序，取前两个
  const sorted = [...reasons].sort((a, b) => a.priority - b.priority);
  return sorted.slice(0, 2).map(r => r.text).join(" · ");
}

/**
 * 快速获取推荐（用于首页展示）
 */
export function getQuickRecommendations(completedProblems: string[]): {
  nextProblem: RecommendedProblem | null;
  frontendMustDo: RecommendedProblem[];
  reviewSuggestions: RecommendedProblem[];
} {
  return {
    nextProblem: getNextProblem({ completedProblems, prioritizeFrontend: true }),
    frontendMustDo: getFrontendMustDoRecommendations(completedProblems, 3),
    reviewSuggestions: getReviewRecommendations(completedProblems, 3),
  };
}
