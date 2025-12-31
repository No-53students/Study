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
export type AnimationType = "two-pointers" | "array" | "linked-list" | "tree" | "matrix" | "graph";

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
