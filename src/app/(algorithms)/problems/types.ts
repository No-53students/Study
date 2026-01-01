// 题目难度
export type Difficulty = "easy" | "medium" | "hard";

// 题目分类
export type Category =
  | "array-string"      // 数组/字符串
  | "two-pointers"      // 双指针
  | "sliding-window"    // 滑动窗口
  | "matrix"            // 矩阵
  | "hash-table"        // 哈希表
  | "intervals"         // 区间
  | "stack"             // 栈
  | "linked-list"       // 链表
  | "binary-tree"       // 二叉树
  | "bst"               // 二叉搜索树
  | "graph"             // 图
  | "graph-bfs"         // 图BFS
  | "trie"              // 字典树
  | "backtracking"      // 回溯
  | "divide-conquer"    // 分治
  | "kadane"            // Kadane算法
  | "binary-search"     // 二分查找
  | "heap"              // 堆
  | "bit-manipulation"  // 位运算
  | "math"              // 数学
  | "dp-1d"             // 一维动态规划
  | "dp-multi"          // 多维动态规划
  | "greedy"            // 贪心算法
  | "techniques";       // 技巧

// 分类信息
export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  icon: string;
}

// 测试用例
export interface TestCase {
  id: string;
  name: string;
  input: unknown[];
  expected: unknown;
  description?: string;
}

// 动画类型
export type AnimationType = "two-pointers" | "array" | "linked-list" | "tree" | "matrix" | "graph" | "sliding-window" | "stack" | "hash-table";

// 动画步骤基础接口
export interface AnimationStepBase {
  description: string;
}

// 动画配置
export interface AnimationConfig {
  type: AnimationType;
  steps: AnimationStepBase[];
  title?: string;
  // 动画类型特定的配置
  config?: Record<string, unknown>;
}

// 解法定义
export interface Solution {
  name: string;                  // 解法名称，如 "暴力法"、"双指针"、"哈希表"
  code: string;                  // 解法代码
  explanation?: string;          // 解法说明（Markdown）
  timeComplexity?: string;       // 时间复杂度
  spaceComplexity?: string;      // 空间复杂度
  animation?: AnimationConfig;   // 动画配置（可选）
}

// 前端相关度
export type FrontendRelevance = "high" | "medium" | "low";

// 题目定义
export interface Problem {
  id: string;                    // 唯一标识，如 "two-sum"
  leetcodeId?: number;           // LeetCode 题号
  title: string;                 // 中文标题
  titleEn?: string;              // 英文标题
  difficulty: Difficulty;        // 难度
  category: Category;            // 主分类
  tags?: string[];               // 标签
  description: string;           // 题目描述（Markdown）
  examples: string;              // 示例（Markdown）
  constraints: string;           // 提示/约束（Markdown）
  language?: string;             // 代码语言，默认 javascript
  initialCode: string;           // 初始代码模板
  solution: string;              // 参考答案代码（默认解法，保持向后兼容）
  solutions?: Solution[];        // 多种解法（可选）
  testCases: TestCase[];         // 测试用例
  hints?: string[];              // 提示
  explanation: string;           // 详细解题思路（Markdown）
  timeComplexity: string;        // 时间复杂度
  spaceComplexity: string;       // 空间复杂度
  relatedProblems?: string[];    // 相关题目ID
  frontendRelevance?: FrontendRelevance;  // 前端相关度：high-高频/medium-中等/low-较少涉及
  frontendNote?: string;         // 前端相关说明
}

// 分类配置
export const CATEGORIES: CategoryInfo[] = [
  { id: "array-string", name: "数组 / 字符串", description: "数组和字符串的基础操作与技巧", icon: "📊" },
  { id: "two-pointers", name: "双指针", description: "使用双指针技巧解决问题", icon: "👆" },
  { id: "sliding-window", name: "滑动窗口", description: "滑动窗口算法", icon: "🪟" },
  { id: "matrix", name: "矩阵", description: "二维数组/矩阵相关问题", icon: "🔲" },
  { id: "hash-table", name: "哈希表", description: "哈希表的应用", icon: "🗂️" },
  { id: "intervals", name: "区间", description: "区间合并、插入等问题", icon: "📏" },
  { id: "stack", name: "栈", description: "栈的应用", icon: "📚" },
  { id: "linked-list", name: "链表", description: "链表操作与技巧", icon: "🔗" },
  { id: "binary-tree", name: "二叉树", description: "二叉树遍历与操作", icon: "🌳" },
  { id: "bst", name: "二叉搜索树", description: "BST 特性与操作", icon: "🌲" },
  { id: "graph", name: "图", description: "图的遍历与算法", icon: "🕸️" },
  { id: "graph-bfs", name: "图 BFS", description: "广度优先搜索", icon: "🔍" },
  { id: "trie", name: "字典树", description: "前缀树/Trie", icon: "📝" },
  { id: "backtracking", name: "回溯", description: "回溯算法", icon: "↩️" },
  { id: "divide-conquer", name: "分治", description: "分治算法", icon: "✂️" },
  { id: "kadane", name: "Kadane 算法", description: "最大子数组问题", icon: "📈" },
  { id: "binary-search", name: "二分查找", description: "二分查找及其变体", icon: "🎯" },
  { id: "heap", name: "堆", description: "堆/优先队列", icon: "⛰️" },
  { id: "bit-manipulation", name: "位运算", description: "位运算技巧", icon: "🔢" },
  { id: "math", name: "数学", description: "数学相关问题", icon: "🧮" },
  { id: "dp-1d", name: "一维动态规划", description: "一维 DP 问题", icon: "📊" },
  { id: "dp-multi", name: "多维动态规划", description: "多维 DP 问题", icon: "🧊" },
  { id: "greedy", name: "贪心算法", description: "贪心策略", icon: "🎰" },
  { id: "techniques", name: "技巧", description: "编程技巧", icon: "💡" },
];

// 难度配置
export const DIFFICULTY_CONFIG = {
  easy: { label: "简单", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30" },
  medium: { label: "中等", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  hard: { label: "困难", color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
};

// 前端相关度配置
export const FRONTEND_RELEVANCE_CONFIG = {
  high: {
    label: "高频",
    description: "前端面试常考",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: "🔥"
  },
  medium: {
    label: "中等",
    description: "了解有益",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    icon: "📚"
  },
  low: {
    label: "较少",
    description: "前端较少涉及",
    color: "text-zinc-400",
    bg: "bg-zinc-500/10",
    border: "border-zinc-500/30",
    icon: "📖"
  },
};

// ==================== 深度讲解系统类型 ====================

/**
 * 算法直觉 - 帮助理解"为什么"用这个算法
 */
export interface AlgorithmIntuition {
  /** 从题目中观察到什么关键特征 */
  observation: string;
  /** 这个特征对应什么算法模式 */
  patternMatch: string;
  /** 为什么这个方法有效的核心原理 */
  whyItWorks: string;
  /** 形象的比喻帮助记忆 */
  metaphor?: string;
}

/**
 * 思维过程步骤 - 展示从0到1的推导过程
 */
export interface ThinkingStep {
  /** 步骤编号 */
  step: number;
  /** 标题 */
  title: string;
  /** 这一步在思考什么 */
  thought: string;
  /** 做出的决策或行动 */
  action: string;
  /** 对应的代码片段（可选） */
  codeSnippet?: string;
  /** 高亮代码行号（可选） */
  codeLines?: number[];
}

/**
 * 代码逐行解析
 */
export interface CodeWalkthrough {
  /** 行号范围 [起始行, 结束行] */
  lineRange: [number, number];
  /** 这段代码的解释 */
  explanation: string;
  /** 重点标记（可选） */
  keyPoint?: string;
  /** 这行容易犯的错误（可选） */
  commonMistake?: string;
}

/**
 * 复杂度深度分析
 */
export interface ComplexityAnalysis {
  /** 时间复杂度详细分解 */
  timeBreakdown: string;
  /** 空间复杂度详细分解 */
  spaceBreakdown: string;
  /** 最优情况（可选） */
  bestCase?: string;
  /** 最差情况（可选） */
  worstCase?: string;
  /** 为什么是这个复杂度 */
  reasoning?: string;
}

/**
 * 相似题型对比
 */
export interface PatternComparison {
  /** 相似题目ID */
  problemId: string;
  /** 题目标题 */
  title: string;
  /** 相似点 */
  similarity: string;
  /** 不同点 */
  difference: string;
  /** 学习建议 */
  tip?: string;
}

/**
 * 常见错误
 */
export interface CommonMistake {
  /** 错误类型 */
  type: "boundary" | "logic" | "complexity" | "syntax" | "edge-case";
  /** 错误描述 */
  description: string;
  /** 错误代码 */
  wrongCode: string;
  /** 正确代码 */
  correctCode: string;
  /** 为什么会犯这个错 */
  whyWrong: string;
  /** 如何避免 */
  howToAvoid: string;
}

/**
 * 变体练习
 */
export interface Variation {
  /** 变体描述 */
  description: string;
  /** 难度变化 */
  difficultyChange: "easier" | "same" | "harder";
  /** 需要修改的思路 */
  modification: string;
  /** 关联题目ID（可选） */
  relatedProblemId?: string;
}

/**
 * 深度讲解 - 完整的讲解体系
 */
export interface DeepExplanation {
  /** 算法直觉 */
  intuition: AlgorithmIntuition;
  /** 思维过程 */
  thinkingProcess: ThinkingStep[];
  /** 代码逐行解析 */
  codeWalkthrough: CodeWalkthrough[];
  /** 复杂度深度分析 */
  complexityAnalysis: ComplexityAnalysis;
  /** 相似题型对比 */
  patternComparisons?: PatternComparison[];
  /** 常见错误 */
  commonMistakes?: CommonMistake[];
  /** 变体练习 */
  variations?: Variation[];
  /** 面试技巧 */
  interviewTips?: string[];
  /** 前端应用场景 */
  frontendApplications?: string[];
}

// ==================== 思维引导系统类型 ====================

/**
 * 苏格拉底式提问
 */
export interface SocraticQuestion {
  /** 阶段 */
  stage: "understand" | "plan" | "code" | "optimize";
  /** 问题 */
  question: string;
  /** 提示（折叠显示） */
  hint: string;
  /** 答案（折叠显示） */
  answer: string;
  /** 这个问题想让你发现什么 */
  insight: string;
}

/**
 * 逐步揭示内容
 */
export interface ProgressiveReveal {
  /** 揭示级别 1-5 */
  level: 1 | 2 | 3 | 4 | 5;
  /** 揭示内容 */
  content: string;
  /** 代码片段（可选） */
  codeFragment?: string;
}

/**
 * 思维检查点
 */
export interface ThinkingCheckpoint {
  /** 问题 */
  question: string;
  /** 选项 */
  options: string[];
  /** 正确答案索引 */
  correctAnswer: number;
  /** 解释 */
  explanation: string;
}

/**
 * 思维引导配置
 */
export interface GuidedThinking {
  /** 苏格拉底式提问序列 */
  socraticQuestions: SocraticQuestion[];
  /** 逐步揭示内容 */
  progressiveReveal: ProgressiveReveal[];
  /** 思维检查点 */
  checkpoints?: ThinkingCheckpoint[];
}

// ==================== 扩展的题目定义 ====================

/**
 * 增强的题目定义（包含深度讲解）
 */
export interface EnhancedProblem extends Problem {
  /** 深度讲解（可选，逐步添加） */
  deepExplanation?: DeepExplanation;
  /** 思维引导（可选，逐步添加） */
  guidedThinking?: GuidedThinking;
  /** 核心知识点 */
  coreKnowledge?: string[];
  /** 前置知识 */
  prerequisites?: string[];
  /** 适用的解题模板ID */
  templateIds?: string[];
}

// ==================== 知识图谱系统类型 ====================

/**
 * 知识节点类型
 */
export type KnowledgeNodeType =
  | "concept"     // 概念节点（如：双指针、滑动窗口）
  | "technique"   // 技巧节点（如：快慢指针、哈希计数）
  | "pattern"     // 模式节点（如：回溯模板、BFS模板）
  | "problem"     // 题目节点
  | "category";   // 分类节点

/**
 * 知识节点
 */
export interface KnowledgeNode {
  /** 节点ID */
  id: string;
  /** 节点类型 */
  type: KnowledgeNodeType;
  /** 显示名称 */
  name: string;
  /** 描述 */
  description?: string;
  /** 难度等级 1-5 */
  difficulty?: 1 | 2 | 3 | 4 | 5;
  /** 重要程度 1-5 */
  importance?: 1 | 2 | 3 | 4 | 5;
  /** 相关标签 */
  tags?: string[];
  /** 颜色（用于可视化） */
  color?: string;
  /** 图标 */
  icon?: string;
  /** 关联的题目ID（仅当type为problem时） */
  problemId?: string;
  /** 学习状态 */
  status?: "locked" | "available" | "in-progress" | "mastered";
}

/**
 * 边关系类型
 */
export type EdgeRelationType =
  | "prerequisite"   // 前置知识
  | "extends"        // 扩展/进阶
  | "similar"        // 相似/同类
  | "applies"        // 应用于
  | "contains"       // 包含
  | "variant";       // 变体

/**
 * 知识边（节点之间的关系）
 */
export interface KnowledgeEdge {
  /** 源节点ID */
  source: string;
  /** 目标节点ID */
  target: string;
  /** 关系类型 */
  relation: EdgeRelationType;
  /** 关系描述 */
  description?: string;
  /** 关系强度 1-5 */
  strength?: 1 | 2 | 3 | 4 | 5;
}

/**
 * 学习路径
 */
export interface LearningPath {
  /** 路径ID */
  id: string;
  /** 路径名称 */
  name: string;
  /** 路径描述 */
  description: string;
  /** 目标技能 */
  targetSkills: string[];
  /** 节点序列（按学习顺序） */
  nodes: string[];
  /** 预计学习时间（分钟） */
  estimatedTime?: number;
  /** 难度等级 */
  difficulty: "beginner" | "intermediate" | "advanced";
}

/**
 * 知识图谱配置
 */
export interface KnowledgeGraph {
  /** 所有节点 */
  nodes: KnowledgeNode[];
  /** 所有边 */
  edges: KnowledgeEdge[];
  /** 学习路径（可选） */
  learningPaths?: LearningPath[];
}

// ==================== 学习路线图系统类型 ====================

/**
 * 路线图中的题目
 */
export interface RoadmapProblem {
  /** 题目ID */
  id: string;
  /** 为什么选这道题 */
  reason: string;
  /** 涉及的技术点 */
  techniques: string[];
  /** 相似题目（用于巩固） */
  similarProblems?: string[];
}

/**
 * 学习日程
 */
export interface RoadmapDay {
  /** 第几天 */
  day: number;
  /** 当日主题 */
  theme: string;
  /** 当日题目列表 */
  problems: RoadmapProblem[];
  /** 当日要点 */
  keyPoints: string[];
}

/**
 * 学习阶段
 */
export interface RoadmapStage {
  /** 阶段ID */
  id: string;
  /** 第几周 */
  week: number;
  /** 阶段名称 */
  name: string;
  /** 阶段描述 */
  description: string;
  /** 前置阶段ID列表 */
  prerequisites: string[];
  /** 本阶段学习目标 */
  goals: string[];
  /** 每日安排 */
  days: RoadmapDay[];
}

/**
 * 完整学习路线
 */
export interface Roadmap {
  /** 路线ID */
  id: string;
  /** 路线名称 */
  name: string;
  /** 路线描述 */
  description: string;
  /** 总题数 */
  totalProblems: number;
  /** 预计周数 */
  estimatedWeeks: number;
  /** 难度等级 */
  difficulty: "beginner" | "intermediate" | "advanced";
  /** 学习阶段列表 */
  stages: RoadmapStage[];
  /** 适用人群 */
  targetAudience?: string;
  /** 图标 */
  icon?: string;
}

/**
 * 用户路线图进度
 */
export interface RoadmapProgress {
  /** 路线ID */
  roadmapId: string;
  /** 已完成题目ID列表 */
  completedProblems: string[];
  /** 当前阶段索引 */
  currentStageIndex: number;
  /** 当前日期索引 */
  currentDayIndex: number;
  /** 开始日期 */
  startDate: string;
  /** 最后活跃日期 */
  lastActiveDate: string;
  /** 连续学习天数 */
  streak: number;
}

// ==================== 解题模板库系统类型 ====================

/**
 * 模板分类
 */
export type TemplateCategory =
  | "two-pointers"       // 双指针
  | "sliding-window"     // 滑动窗口
  | "binary-search"      // 二分查找
  | "dfs"                // 深度优先搜索
  | "bfs"                // 广度优先搜索
  | "backtracking"       // 回溯
  | "dynamic-programming"// 动态规划
  | "greedy"             // 贪心
  | "tree"               // 树
  | "graph"              // 图
  | "linked-list"        // 链表
  | "stack-queue"        // 栈和队列
  | "hash-table"         // 哈希表
  | "heap";              // 堆

/**
 * 模板变量
 */
export interface TemplateVariable {
  /** 变量名 */
  name: string;
  /** 变量描述 */
  description: string;
  /** 使用示例 */
  example: string;
}

/**
 * 代码行注释
 */
export interface LineComment {
  /** 行号 */
  line: number;
  /** 注释内容 */
  text: string;
}

/**
 * 模板思维步骤
 */
export interface TemplateThinkingStep {
  /** 步骤序号 */
  step: number;
  /** 要问自己的问题 */
  question: string;
  /** 对应的行动 */
  action: string;
  /** 对应模板的行号 */
  codeMapping?: number[];
}

/**
 * 模板错误示例
 */
export interface TemplateMistake {
  /** 错误描述 */
  description: string;
  /** 错误代码 */
  wrongCode: string;
  /** 正确代码 */
  correctCode: string;
  /** 解释 */
  explanation: string;
}

/**
 * 模板变体
 */
export interface TemplateVariant {
  /** 变体名称 */
  name: string;
  /** 适用场景 */
  scenario: string;
  /** 需要修改的部分 */
  modification: string;
}

/**
 * 算法模板
 */
export interface AlgorithmTemplate {
  /** 模板ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板分类 */
  category: TemplateCategory;
  /** 图标 */
  icon: string;

  /** 识别模式 */
  recognition: {
    /** 关键词 */
    keywords: string[];
    /** 适用场景描述 */
    patterns: string[];
    /** 不适用的情况 */
    antiPatterns: string[];
  };

  /** 代码模板 */
  template: {
    /** 模板代码 */
    code: string;
    /** 可替换的变量 */
    variables: TemplateVariable[];
    /** 每行注释 */
    comments: LineComment[];
  };

  /** 思维步骤 */
  thinkingSteps: TemplateThinkingStep[];

  /** 常见错误 */
  commonMistakes: TemplateMistake[];

  /** 适用题目ID列表 */
  applicableProblems: string[];

  /** 复杂度 */
  complexity: {
    time: string;
    space: string;
    explanation: string;
  };

  /** 变体 */
  variants: TemplateVariant[];
}

/**
 * 算法决策树节点
 */
export interface DecisionNode {
  /** 问题 */
  question: string;
  /** 选项 */
  options: DecisionOption[];
}

/**
 * 决策选项
 */
export interface DecisionOption {
  /** 答案 */
  answer: string;
  /** 下一步（节点或模板ID） */
  next: DecisionNode | string;
}
