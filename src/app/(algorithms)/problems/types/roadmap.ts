/**
 * 学习路线图类型定义
 * 用于构建前端算法学习路径系统
 */

// ==================== 学习路径配置类型 ====================

/**
 * 路径难度等级
 */
export type PathDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

/**
 * 学习路径阶段
 */
export interface PathStage {
  id: string;
  name: string;
  description: string;
  icon?: string; // 图标
  days: PathDay[];
  milestone?: string; // 阶段里程碑
  checkpoints?: string[]; // 检查点
}

/**
 * 学习路径中的一天
 */
export interface PathDay {
  id?: string; // 可选的唯一标识
  day?: number;
  title?: string; // 标题
  description?: string; // 描述
  theme?: string;
  focus?: string[];
  estimatedMinutes?: number; // 预计学习时间
  problems: ProblemReference[];
  knowledgePoints?: string[]; // 知识点
  tips?: string[];
  review?: string[];
}

/**
 * 问题引用
 */
export interface ProblemReference {
  problemId: string;
  name?: string; // 题目名称（可选，可从 problemId 查询）
  isCore?: boolean; // 是否核心必做
  timeLimit?: number; // 建议时间限制（分钟）
  hint?: string; // 单个提示
  hints?: string[]; // 多个提示
}

/**
 * 完整学习路径配置
 */
export interface LearningPathConfig {
  id: string;
  name: string;
  difficulty: PathDifficulty;
  estimatedDays: number;
  targetAudience: string[];
  prerequisites: string[];
  outcomes: string[];
  stages: PathStage[];
}

// ==================== 学习路线相关类型 ====================

/**
 * 学习路线
 */
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalProblems: number;
  estimatedWeeks: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  targetAudience: string[];  // 目标人群
  prerequisites: string[];   // 前置知识
  stages: Stage[];
}

/**
 * 学习阶段
 */
export interface Stage {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  days: Day[];
  unlockCondition?: UnlockCondition;  // 解锁条件
}

/**
 * 每日学习计划
 */
export interface Day {
  id: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;  // 预计学习时间（分钟）
  problems: DayProblem[];
  knowledgePoints?: string[];  // 涉及的知识点
  tips?: string[];  // 学习小贴士
}

/**
 * 每日题目配置
 */
export interface DayProblem {
  problemId: string;
  isCore: boolean;      // 是否核心必做题
  order: number;
  hint?: string;        // 做题提示
  relatedTemplate?: string;  // 关联的解题模板ID
}

/**
 * 解锁条件
 */
export interface UnlockCondition {
  type: "problems_completed" | "stage_completed" | "always";
  requiredProblems?: string[];  // 需要完成的题目ID
  requiredStageId?: string;     // 需要完成的阶段ID
  minCompletionRate?: number;   // 最低完成率 (0-1)
}

// ==================== 用户进度相关类型 ====================

/**
 * 用户学习进度
 */
export interface UserProgress {
  roadmapId: string;       // 学习路线ID
  userId: string;          // 用户ID
  startedAt: string;
  lastStudiedAt: string;
  completedProblems: CompletedProblem[];
  currentStageId: string;
  currentDayId: string;
  streak: number;  // 连续学习天数
  totalStudyMinutes: number;
}

/**
 * 已完成题目记录
 */
export interface CompletedProblem {
  problemId: string;
  completedAt: string;
  timeSpentMinutes: number;
  attempts: number;        // 尝试次数
  usedHint: boolean;       // 是否使用了提示
  difficulty: "easy" | "normal" | "hard";  // 主观难度评价
  notes?: string;          // 个人笔记
}

/**
 * 学习统计
 */
export interface StudyStats {
  totalProblems: number;
  completedProblems: number;
  completionRate: number;
  totalStudyDays: number;
  currentStreak: number;
  longestStreak: number;
  averageTimePerProblem: number;  // 平均每题时间（分钟）
  categoryStats: CategoryStat[];
  weeklyProgress: WeeklyProgress[];
}

/**
 * 分类统计
 */
export interface CategoryStat {
  categoryId: string;
  categoryName: string;
  total: number;
  completed: number;
  completionRate: number;
  averageTime: number;
}

/**
 * 周进度
 */
export interface WeeklyProgress {
  weekStart: string;
  problemsCompleted: number;
  minutesSpent: number;
}

// ==================== 解题模板相关类型 ====================

/**
 * 解题模板
 */
export interface AlgorithmTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";

  // 识别关键词
  recognitionPatterns: {
    keywords: string[];        // 题目关键词
    dataStructures: string[];  // 涉及的数据结构
    problemTypes: string[];    // 问题类型
  };

  // 思维步骤
  thinkingSteps: ThinkingStep[];

  // 代码模板
  codeTemplate: {
    typescript: string;
    javascript?: string;
    comments: string;  // 带注释版本
  };

  // 适用题目
  applicableProblems: string[];  // 问题ID列表

  // 常见错误
  commonMistakes: CommonMistake[];

  // 复杂度
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };

  // ========== 新增：详细讲解和动画 ==========

  // 核心原理讲解
  coreExplanation?: {
    whatIs: string;           // 什么是这个算法
    whyUse: string;           // 为什么使用它
    howItWorks: string;       // 它是如何工作的
    visualMetaphor?: string;  // 形象比喻
  };

  // 变体模式
  variants?: TemplateVariant[];

  // 动画示例
  animation?: TemplateAnimation;
}

/**
 * 模板变体
 */
export interface TemplateVariant {
  id: string;
  name: string;
  description: string;
  useCase: string;           // 使用场景
  codeSnippet: string;       // 代码片段
  exampleProblem?: string;   // 示例题目ID
}

/**
 * 模板动画配置
 */
export interface TemplateAnimation {
  type: "two-pointers" | "array" | "sliding-window" | "binary-search" | "linked-list" | "tree" | "matrix" | "graph" | "stack" | "dp";
  title: string;
  description: string;
  // 示例输入
  exampleInput: {
    description: string;
    data: unknown;
  };
  // 动画步骤
  steps: TemplateAnimationStep[];
}

/**
 * 模板动画步骤
 */
export interface TemplateAnimationStep {
  // 数组类型动画
  array?: (number | string)[];
  // 指针位置（双指针）
  left?: number;
  right?: number;
  // 滑动窗口
  windowStart?: number;
  windowEnd?: number;
  // 二分查找
  mid?: number;
  low?: number;
  high?: number;
  target?: number;
  // 当前索引
  current?: number;
  // 栈状态
  stack?: (number | string)[];
  // DP数组
  dp?: number[] | number[][];
  // 高亮索引
  highlights?: {
    indices: number[];
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
    label?: string;
  }[];
  // 已完成的索引
  completed?: number[];
  // 比较中的索引
  comparing?: number[];
  // 步骤说明
  description: string;
  // 代码高亮行号
  codeHighlight?: number[];
  // 额外信息（如计算结果、变量值等）
  variables?: Record<string, unknown>;
}

/**
 * 思维步骤
 */
export interface ThinkingStep {
  step: number;
  title: string;
  description: string;
  question?: string;  // 引导性问题
  example?: string;
}

/**
 * 常见错误
 */
export interface CommonMistake {
  title: string;
  wrongCode?: string;
  rightCode?: string;
  explanation: string;
  frequency: "high" | "medium" | "low";
}

// ==================== 能力评估相关类型 ====================

/**
 * 能力雷达图数据
 */
export interface SkillRadar {
  userId: string;
  updatedAt: string;
  dimensions: SkillDimension[];
}

/**
 * 能力维度
 */
export interface SkillDimension {
  id: string;
  name: string;
  score: number;       // 0-100
  level: "beginner" | "intermediate" | "advanced" | "expert";
  subSkills: SubSkill[];
}

/**
 * 子技能
 */
export interface SubSkill {
  id: string;
  name: string;
  score: number;
  problemsAttempted: number;
  problemsSolved: number;
}

/**
 * 薄弱项分析
 */
export interface WeaknessAnalysis {
  weakCategories: {
    categoryId: string;
    categoryName: string;
    score: number;
    recommendedProblems: string[];
  }[];
  suggestedActions: string[];
  reviewReminders: ReviewReminder[];
}

/**
 * 复习提醒
 */
export interface ReviewReminder {
  problemId: string;
  lastReviewedAt: string;
  nextReviewAt: string;
  reviewCount: number;
  retention: number;  // 记忆保持率
}

// ==================== 前端实战案例相关类型 ====================

/**
 * 前端实战案例
 */
export interface FrontendCase {
  id: string;
  title: string;
  description: string;
  category: "performance" | "component" | "data-structure" | "utility";

  // 关联的算法
  relatedAlgorithms: {
    algorithmName: string;
    problemIds: string[];
    explanation: string;
  }[];

  // 场景描述
  scenario: {
    background: string;     // 业务背景
    problem: string;        // 问题描述
    requirement: string;    // 需求说明
  };

  // 解决方案
  solution: {
    approach: string;       // 解决思路
    code: string;           // 代码实现
    keyPoints: string[];    // 关键点
  };

  // 性能对比
  performance?: {
    before: { description: string; metrics: string };
    after: { description: string; metrics: string };
  };

  // 扩展阅读
  references?: {
    title: string;
    url: string;
  }[];
}

// ==================== 常量配置 ====================

/**
 * 难度配置
 */
export const PATH_DIFFICULTY_CONFIG = {
  beginner: {
    label: "入门",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    description: "适合零基础学习者",
  },
  intermediate: {
    label: "进阶",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    description: "适合有一定基础的学习者",
  },
  advanced: {
    label: "高级",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    borderColor: "border-rose-500/20",
    description: "适合准备大厂面试的学习者",
  },
} as const;

/**
 * 学习阶段图标
 */
export const STAGE_ICONS = {
  foundation: "🏗️",
  practice: "💪",
  advanced: "🚀",
  master: "👑",
} as const;

/**
 * 技能维度配置
 */
export const SKILL_DIMENSIONS = [
  { id: "array", name: "数组与字符串", icon: "📝" },
  { id: "linked-list", name: "链表", icon: "🔗" },
  { id: "tree", name: "树与图", icon: "🌳" },
  { id: "dp", name: "动态规划", icon: "📊" },
  { id: "search", name: "搜索与回溯", icon: "🔍" },
  { id: "sort", name: "排序与查找", icon: "📈" },
] as const;
