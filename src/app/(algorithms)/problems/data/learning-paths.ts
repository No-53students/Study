/**
 * 多维学习路线系统
 *
 * 提供不同维度的学习路线：
 * - 按难度：入门 → 进阶 → 精通
 * - 按时间：速成 / 标准 / 深度
 * - 按目标：面试冲刺 / 技能提升 / 系统学习
 * - 按工作经验：新手 / 中级 / 高级
 */

import { LearningPath, PathStage, ProblemReference, PathDifficulty } from "../types/roadmap";

// ==================== 类型定义 ====================

export interface LearningPathConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: PathDifficulty;
  estimatedDays: number;
  targetAudience: string[];
  prerequisites: string[];
  outcomes: string[];           // 学完能达到什么水平
  stages: PathStage[];
}

export interface LearningMilestone {
  id: string;
  name: string;
  description: string;
  skills: string[];             // 需要掌握的技能
  problems: string[];           // 需要完成的题目
  assessment: AssessmentQuestion[]; // 自测题
}

export interface AssessmentQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// ==================== 速成路线：2 周面试冲刺 ====================

export const twoWeekSprintPath: LearningPathConfig = {
  id: "two-week-sprint",
  name: "2 周面试冲刺",
  description: "专为准备面试设计的速成路线，覆盖最高频的 30 道题目",
  icon: "⚡",
  difficulty: "intermediate",
  estimatedDays: 14,
  targetAudience: [
    "即将面试的前端开发者",
    "有一定基础想快速复习的人",
    "时间紧迫需要高效准备的人",
  ],
  prerequisites: [
    "了解 JavaScript 基本语法",
    "知道数组、对象的基本操作",
    "有过刷题经历（即使很少）",
  ],
  outcomes: [
    "掌握 80% 前端高频算法考点",
    "能够独立解决 Easy 和部分 Medium 题目",
    "面试时能清晰讲解思路",
  ],
  stages: [
    {
      id: "sprint-week1",
      name: "第一周：基础必刷",
      description: "掌握哈希表、双指针、滑动窗口三大核心技巧",
      icon: "📚",
      days: [
        {
          id: "sprint-d1",
          title: "Day 1: 哈希表",
          description: "掌握用空间换时间的核心思想",
          estimatedMinutes: 90,
          problems: [
            { problemId: "two-sum", isCore: true, hint: "补数思想，先查后存" },
            { problemId: "contains-duplicate", isCore: true, hint: "Set 去重" },
            { problemId: "valid-anagram", isCore: true, hint: "字符计数" },
          ],
          knowledgePoints: ["哈希表 O(1) 查找", "补数思想", "字符计数"],
          tips: ["Map 优于 Object", "先查找后存入避免找到自己"],
        },
        {
          id: "sprint-d2",
          title: "Day 2: 双指针基础",
          description: "掌握对撞指针和快慢指针",
          estimatedMinutes: 90,
          problems: [
            { problemId: "valid-palindrome", isCore: true, hint: "对撞指针" },
            { problemId: "move-zeroes", isCore: true, hint: "快慢指针原地修改" },
            { problemId: "two-sum-ii-input-array-is-sorted", isCore: true, hint: "有序数组对撞" },
          ],
          knowledgePoints: ["对撞指针", "快慢指针", "有序数组优化"],
          tips: ["画图理解指针移动", "有序数组优先考虑双指针"],
        },
        {
          id: "sprint-d3",
          title: "Day 3: 双指针进阶",
          description: "经典双指针问题",
          estimatedMinutes: 90,
          problems: [
            { problemId: "container-with-most-water", isCore: true, hint: "贪心移动矮边" },
            { problemId: "3sum", isCore: true, hint: "排序 + 双指针" },
            { problemId: "remove-duplicates-from-sorted-array", isCore: false, hint: "快慢指针" },
          ],
          knowledgePoints: ["贪心策略", "去重技巧", "三数之和"],
        },
        {
          id: "sprint-d4",
          title: "Day 4: 滑动窗口",
          description: "子串/子数组问题的利器",
          estimatedMinutes: 90,
          problems: [
            { problemId: "longest-substring-without-repeating-characters", isCore: true, hint: "窗口内不重复" },
            { problemId: "maximum-average-subarray-i", isCore: true, hint: "固定窗口" },
            { problemId: "minimum-size-subarray-sum", isCore: false, hint: "可变窗口求最短" },
          ],
          knowledgePoints: ["固定窗口", "可变窗口", "窗口内状态维护"],
          tips: ["求最长：不满足时收缩", "求最短：满足时收缩"],
        },
        {
          id: "sprint-d5",
          title: "Day 5: 栈",
          description: "括号匹配和单调栈",
          estimatedMinutes: 90,
          problems: [
            { problemId: "valid-parentheses", isCore: true, hint: "左括号入栈" },
            { problemId: "daily-temperatures", isCore: true, hint: "单调递减栈" },
            { problemId: "min-stack", isCore: false, hint: "辅助栈" },
          ],
          knowledgePoints: ["LIFO", "括号匹配", "单调栈"],
        },
        {
          id: "sprint-d6",
          title: "Day 6: 链表",
          description: "指针操作的艺术",
          estimatedMinutes: 90,
          problems: [
            { problemId: "reverse-linked-list", isCore: true, hint: "三指针反转" },
            { problemId: "linked-list-cycle", isCore: true, hint: "快慢指针" },
            { problemId: "merge-two-sorted-lists", isCore: true, hint: "虚拟头节点" },
          ],
          knowledgePoints: ["链表反转", "快慢指针", "虚拟头节点"],
          tips: ["一定要画图！", "先保存 next 再断开"],
        },
        {
          id: "sprint-d7",
          title: "Day 7: 复习与巩固",
          description: "回顾本周内容，查漏补缺",
          estimatedMinutes: 120,
          problems: [
            { problemId: "group-anagrams", isCore: false, hint: "哈希分组" },
            { problemId: "remove-nth-node-from-end-of-list", isCore: false, hint: "快慢指针" },
          ],
          tips: ["重做做错的题", "整理错题笔记"],
        },
      ],
    },
    {
      id: "sprint-week2",
      name: "第二周：进阶提升",
      description: "掌握二分、树、动态规划等进阶内容",
      icon: "🚀",
      days: [
        {
          id: "sprint-d8",
          title: "Day 8: 二分查找",
          description: "O(log n) 的魔力",
          estimatedMinutes: 90,
          problems: [
            { problemId: "binary-search", isCore: true, hint: "基础二分" },
            { problemId: "search-insert-position", isCore: true, hint: "左边界" },
            { problemId: "find-first-and-last-position-of-element-in-sorted-array", isCore: true, hint: "左右边界" },
          ],
          knowledgePoints: ["二分模板", "左右边界", "区间收缩"],
        },
        {
          id: "sprint-d9",
          title: "Day 9: 二叉树基础",
          description: "递归思维的培养",
          estimatedMinutes: 90,
          problems: [
            { problemId: "maximum-depth-of-binary-tree", isCore: true, hint: "递归求深度" },
            { problemId: "invert-binary-tree", isCore: true, hint: "交换左右子树" },
            { problemId: "symmetric-tree", isCore: true, hint: "镜像递归" },
          ],
          knowledgePoints: ["递归遍历", "树的深度", "对称判断"],
        },
        {
          id: "sprint-d10",
          title: "Day 10: 二叉树遍历",
          description: "前中后序和层序遍历",
          estimatedMinutes: 90,
          problems: [
            { problemId: "binary-tree-level-order-traversal", isCore: true, hint: "BFS 队列" },
            { problemId: "validate-binary-search-tree", isCore: true, hint: "中序遍历" },
            { problemId: "lowest-common-ancestor-of-a-binary-tree", isCore: false, hint: "后序遍历" },
          ],
          knowledgePoints: ["BFS", "中序遍历", "LCA"],
        },
        {
          id: "sprint-d11",
          title: "Day 11: 动态规划入门",
          description: "状态定义和转移方程",
          estimatedMinutes: 90,
          problems: [
            { problemId: "climbing-stairs", isCore: true, hint: "dp[i] = dp[i-1] + dp[i-2]" },
            { problemId: "house-robber", isCore: true, hint: "选或不选" },
            { problemId: "maximum-subarray", isCore: true, hint: "Kadane 算法" },
          ],
          knowledgePoints: ["状态定义", "转移方程", "空间优化"],
        },
        {
          id: "sprint-d12",
          title: "Day 12: 动态规划进阶",
          description: "二维 DP 和背包问题",
          estimatedMinutes: 90,
          problems: [
            { problemId: "unique-paths", isCore: true, hint: "网格 DP" },
            { problemId: "coin-change", isCore: true, hint: "完全背包" },
            { problemId: "longest-increasing-subsequence", isCore: false, hint: "LIS" },
          ],
          knowledgePoints: ["二维 DP", "背包问题", "LIS"],
        },
        {
          id: "sprint-d13",
          title: "Day 13: 回溯算法",
          description: "穷举和剪枝",
          estimatedMinutes: 90,
          problems: [
            { problemId: "subsets", isCore: true, hint: "子集型回溯" },
            { problemId: "permutations", isCore: true, hint: "排列型回溯" },
            { problemId: "combination-sum", isCore: false, hint: "可重复选择" },
          ],
          knowledgePoints: ["回溯模板", "排列组合", "剪枝优化"],
        },
        {
          id: "sprint-d14",
          title: "Day 14: 模拟面试",
          description: "综合练习和面试模拟",
          estimatedMinutes: 120,
          problems: [
            { problemId: "lru-cache", isCore: true, hint: "哈希 + 链表" },
            { problemId: "product-of-array-except-self", isCore: false, hint: "前缀积" },
          ],
          tips: ["限时做题", "大声讲解思路", "复盘错题"],
        },
      ],
    },
  ],
};

// ==================== 标准路线：4 周系统学习 ====================

export const fourWeekStandardPath: LearningPathConfig = {
  id: "four-week-standard",
  name: "4 周系统学习",
  description: "循序渐进的标准学习路线，每个知识点都有充分练习",
  icon: "📖",
  difficulty: "intermediate",
  estimatedDays: 28,
  targetAudience: [
    "想系统学习算法的前端开发者",
    "有足够时间准备的人",
    "希望打好基础的人",
  ],
  prerequisites: [
    "熟悉 JavaScript 语法",
    "了解基本数据结构概念",
  ],
  outcomes: [
    "掌握前端所需的核心算法知识",
    "能够独立解决 Medium 难度题目",
    "具备算法思维，能举一反三",
  ],
  stages: [
    {
      id: "std-week1",
      name: "第一周：数据结构基础",
      description: "哈希表、栈、队列、链表",
      icon: "🧱",
      days: [
        {
          id: "std-d1",
          title: "Day 1: 哈希表入门",
          description: "Map 和 Set 的使用",
          estimatedMinutes: 60,
          problems: [
            { problemId: "two-sum", isCore: true },
            { problemId: "contains-duplicate", isCore: true },
          ],
          knowledgePoints: ["Map 基本操作", "Set 去重"],
        },
        {
          id: "std-d2",
          title: "Day 2: 哈希表应用",
          description: "计数和分组",
          estimatedMinutes: 60,
          problems: [
            { problemId: "valid-anagram", isCore: true },
            { problemId: "group-anagrams", isCore: true },
          ],
          knowledgePoints: ["字符计数", "按特征分组"],
        },
        {
          id: "std-d3",
          title: "Day 3: 栈基础",
          description: "LIFO 特性",
          estimatedMinutes: 60,
          problems: [
            { problemId: "valid-parentheses", isCore: true },
            { problemId: "implement-stack-using-queues", isCore: false },
          ],
          knowledgePoints: ["栈的 LIFO", "括号匹配"],
        },
        {
          id: "std-d4",
          title: "Day 4: 单调栈",
          description: "下一个更大/更小元素",
          estimatedMinutes: 60,
          problems: [
            { problemId: "daily-temperatures", isCore: true },
            { problemId: "next-greater-element-i", isCore: true },
          ],
          knowledgePoints: ["单调栈原理", "存索引技巧"],
        },
        {
          id: "std-d5",
          title: "Day 5: 链表基础",
          description: "节点操作",
          estimatedMinutes: 60,
          problems: [
            { problemId: "reverse-linked-list", isCore: true },
            { problemId: "merge-two-sorted-lists", isCore: true },
          ],
          knowledgePoints: ["链表反转", "虚拟头节点"],
        },
        {
          id: "std-d6",
          title: "Day 6: 链表进阶",
          description: "快慢指针",
          estimatedMinutes: 60,
          problems: [
            { problemId: "linked-list-cycle", isCore: true },
            { problemId: "middle-of-the-linked-list", isCore: true },
          ],
          knowledgePoints: ["快慢指针", "环检测"],
        },
        {
          id: "std-d7",
          title: "Day 7: 复习巩固",
          description: "本周回顾",
          estimatedMinutes: 90,
          problems: [
            { problemId: "lru-cache", isCore: true, hint: "综合运用链表和哈希表" },
          ],
        },
      ],
    },
    {
      id: "std-week2",
      name: "第二周：数组技巧",
      description: "双指针、滑动窗口、前缀和",
      icon: "🔢",
      days: [
        {
          id: "std-d8",
          title: "Day 8: 对撞指针",
          description: "从两端向中间",
          estimatedMinutes: 60,
          problems: [
            { problemId: "two-sum-ii-input-array-is-sorted", isCore: true },
            { problemId: "valid-palindrome", isCore: true },
          ],
          knowledgePoints: ["对撞指针", "有序数组"],
        },
        {
          id: "std-d9",
          title: "Day 9: 快慢指针",
          description: "原地修改数组",
          estimatedMinutes: 60,
          problems: [
            { problemId: "move-zeroes", isCore: true },
            { problemId: "remove-duplicates-from-sorted-array", isCore: true },
          ],
          knowledgePoints: ["快慢指针", "原地修改"],
        },
        {
          id: "std-d10",
          title: "Day 10: 双指针综合",
          description: "经典问题",
          estimatedMinutes: 90,
          problems: [
            { problemId: "container-with-most-water", isCore: true },
            { problemId: "3sum", isCore: true },
          ],
          knowledgePoints: ["贪心策略", "去重"],
        },
        {
          id: "std-d11",
          title: "Day 11: 滑动窗口入门",
          description: "固定窗口和可变窗口",
          estimatedMinutes: 60,
          problems: [
            { problemId: "maximum-average-subarray-i", isCore: true },
            { problemId: "longest-substring-without-repeating-characters", isCore: true },
          ],
          knowledgePoints: ["固定窗口", "可变窗口"],
        },
        {
          id: "std-d12",
          title: "Day 12: 滑动窗口进阶",
          description: "窗口内状态维护",
          estimatedMinutes: 60,
          problems: [
            { problemId: "minimum-window-substring", isCore: true },
            { problemId: "find-all-anagrams-in-a-string", isCore: false },
          ],
          knowledgePoints: ["最小窗口", "字母异位词"],
        },
        {
          id: "std-d13",
          title: "Day 13: 前缀和",
          description: "区间求和",
          estimatedMinutes: 60,
          problems: [
            { problemId: "range-sum-query-immutable", isCore: true },
            { problemId: "subarray-sum-equals-k", isCore: true },
          ],
          knowledgePoints: ["前缀和", "哈希表优化"],
        },
        {
          id: "std-d14",
          title: "Day 14: 本周复习",
          description: "数组技巧总结",
          estimatedMinutes: 90,
          problems: [
            { problemId: "trapping-rain-water", isCore: false, hint: "双指针或单调栈" },
          ],
        },
      ],
    },
    {
      id: "std-week3",
      name: "第三周：二分与树",
      description: "二分查找、二叉树遍历与操作",
      icon: "🌲",
      days: [
        {
          id: "std-d15",
          title: "Day 15: 二分查找基础",
          description: "精确查找和边界查找",
          estimatedMinutes: 60,
          problems: [
            { problemId: "binary-search", isCore: true },
            { problemId: "search-insert-position", isCore: true },
          ],
          knowledgePoints: ["二分模板", "左边界"],
        },
        {
          id: "std-d16",
          title: "Day 16: 二分查找应用",
          description: "变体问题",
          estimatedMinutes: 60,
          problems: [
            { problemId: "find-first-and-last-position-of-element-in-sorted-array", isCore: true },
            { problemId: "search-in-rotated-sorted-array", isCore: true },
          ],
          knowledgePoints: ["左右边界", "旋转数组"],
        },
        {
          id: "std-d17",
          title: "Day 17: 二叉树递归基础",
          description: "递归思维",
          estimatedMinutes: 60,
          problems: [
            { problemId: "maximum-depth-of-binary-tree", isCore: true },
            { problemId: "invert-binary-tree", isCore: true },
          ],
          knowledgePoints: ["递归", "树的深度"],
        },
        {
          id: "std-d18",
          title: "Day 18: 二叉树遍历",
          description: "前中后序、层序",
          estimatedMinutes: 60,
          problems: [
            { problemId: "binary-tree-inorder-traversal", isCore: true },
            { problemId: "binary-tree-level-order-traversal", isCore: true },
          ],
          knowledgePoints: ["中序遍历", "层序遍历 BFS"],
        },
        {
          id: "std-d19",
          title: "Day 19: 二叉搜索树",
          description: "BST 的特性",
          estimatedMinutes: 60,
          problems: [
            { problemId: "validate-binary-search-tree", isCore: true },
            { problemId: "kth-smallest-element-in-a-bst", isCore: true },
          ],
          knowledgePoints: ["BST 中序有序", "验证 BST"],
        },
        {
          id: "std-d20",
          title: "Day 20: 树的路径问题",
          description: "路径和、LCA",
          estimatedMinutes: 60,
          problems: [
            { problemId: "path-sum", isCore: true },
            { problemId: "lowest-common-ancestor-of-a-binary-tree", isCore: true },
          ],
          knowledgePoints: ["路径和", "最近公共祖先"],
        },
        {
          id: "std-d21",
          title: "Day 21: 本周复习",
          description: "树的综合",
          estimatedMinutes: 90,
          problems: [
            { problemId: "serialize-and-deserialize-binary-tree", isCore: false },
          ],
        },
      ],
    },
    {
      id: "std-week4",
      name: "第四周：DP 与回溯",
      description: "动态规划、回溯算法、贪心",
      icon: "🧮",
      days: [
        {
          id: "std-d22",
          title: "Day 22: 动态规划入门",
          description: "一维 DP",
          estimatedMinutes: 60,
          problems: [
            { problemId: "climbing-stairs", isCore: true },
            { problemId: "house-robber", isCore: true },
          ],
          knowledgePoints: ["状态定义", "转移方程"],
        },
        {
          id: "std-d23",
          title: "Day 23: 动态规划进阶",
          description: "背包问题",
          estimatedMinutes: 60,
          problems: [
            { problemId: "coin-change", isCore: true },
            { problemId: "partition-equal-subset-sum", isCore: true },
          ],
          knowledgePoints: ["完全背包", "0-1 背包"],
        },
        {
          id: "std-d24",
          title: "Day 24: 二维 DP",
          description: "网格和字符串 DP",
          estimatedMinutes: 60,
          problems: [
            { problemId: "unique-paths", isCore: true },
            { problemId: "longest-common-subsequence", isCore: true },
          ],
          knowledgePoints: ["网格 DP", "LCS"],
        },
        {
          id: "std-d25",
          title: "Day 25: 回溯入门",
          description: "排列组合子集",
          estimatedMinutes: 60,
          problems: [
            { problemId: "subsets", isCore: true },
            { problemId: "permutations", isCore: true },
          ],
          knowledgePoints: ["回溯模板", "排列组合"],
        },
        {
          id: "std-d26",
          title: "Day 26: 回溯进阶",
          description: "剪枝优化",
          estimatedMinutes: 60,
          problems: [
            { problemId: "combination-sum", isCore: true },
            { problemId: "word-search", isCore: true },
          ],
          knowledgePoints: ["剪枝", "网格回溯"],
        },
        {
          id: "std-d27",
          title: "Day 27: 贪心算法",
          description: "局部最优到全局最优",
          estimatedMinutes: 60,
          problems: [
            { problemId: "best-time-to-buy-and-sell-stock", isCore: true },
            { problemId: "jump-game", isCore: true },
          ],
          knowledgePoints: ["贪心思想", "股票问题"],
        },
        {
          id: "std-d28",
          title: "Day 28: 综合测试",
          description: "模拟面试",
          estimatedMinutes: 120,
          problems: [
            { problemId: "edit-distance", isCore: false },
            { problemId: "word-break", isCore: false },
          ],
          tips: ["限时 45 分钟", "手写代码不用 IDE"],
        },
      ],
    },
  ],
};

// ==================== 深度路线：8 周精通 ====================

export const eightWeekMasteryPath: LearningPathConfig = {
  id: "eight-week-mastery",
  name: "8 周深度精通",
  description: "全面深入的学习路线，覆盖所有前端算法知识点，包含进阶技巧",
  icon: "🏆",
  difficulty: "advanced",
  estimatedDays: 56,
  targetAudience: [
    "想要精通算法的开发者",
    "准备大厂面试的人",
    "有充足学习时间的人",
  ],
  prerequisites: [
    "熟练掌握 JavaScript",
    "有一定的数据结构基础",
    "愿意投入大量时间",
  ],
  outcomes: [
    "能够解决 Hard 难度题目",
    "具备完整的算法知识体系",
    "能够在面试中游刃有余",
    "具备分析和设计算法的能力",
  ],
  stages: [
    {
      id: "mastery-week1-2",
      name: "第 1-2 周：数据结构精讲",
      description: "深入理解每种数据结构的原理和应用",
      icon: "🧱",
      days: [
        // Day 1-14 的详细内容（简化展示）
        {
          id: "mastery-d1",
          title: "Day 1: 数组深入",
          description: "数组的内存模型和操作",
          estimatedMinutes: 90,
          problems: [
            { problemId: "rotate-array", isCore: true },
            { problemId: "product-of-array-except-self", isCore: true },
          ],
          knowledgePoints: ["数组操作", "原地算法"],
        },
        // ... 更多 days
      ],
    },
    {
      id: "mastery-week3-4",
      name: "第 3-4 周：经典算法",
      description: "双指针、滑动窗口、二分查找、排序",
      icon: "⚙️",
      days: [],
    },
    {
      id: "mastery-week5-6",
      name: "第 5-6 周：树与图",
      description: "二叉树、BST、图论算法",
      icon: "🌲",
      days: [],
    },
    {
      id: "mastery-week7-8",
      name: "第 7-8 周：动态规划与高级技巧",
      description: "DP 分类、回溯、贪心、位运算",
      icon: "🧮",
      days: [],
    },
  ],
};

// ==================== 按经验分类的路线 ====================

export const juniorDeveloperPath: LearningPathConfig = {
  id: "junior-developer",
  name: "初级开发者 (0-1 年)",
  description: "适合刚入行的前端开发者，从零开始建立算法思维",
  icon: "🌱",
  difficulty: "beginner",
  estimatedDays: 35,
  targetAudience: [
    "应届毕业生",
    "转行的新人",
    "工作 0-1 年的开发者",
  ],
  prerequisites: [
    "基本的 JavaScript 语法",
    "了解什么是数组和对象",
  ],
  outcomes: [
    "掌握基础数据结构",
    "能解决 Easy 难度题目",
    "建立算法思维基础",
  ],
  stages: [],
};

export const midLevelDeveloperPath: LearningPathConfig = {
  id: "mid-level-developer",
  name: "中级开发者 (1-3 年)",
  description: "适合有一定经验的开发者，查漏补缺冲击大厂",
  icon: "🌿",
  difficulty: "intermediate",
  estimatedDays: 28,
  targetAudience: [
    "工作 1-3 年的开发者",
    "想跳槽到更好公司的人",
    "需要系统复习的人",
  ],
  prerequisites: [
    "熟悉 JavaScript",
    "做过一些算法题",
  ],
  outcomes: [
    "能解决大部分 Medium 题目",
    "掌握常见算法模式",
    "面试时能清晰表达思路",
  ],
  stages: [],
};

export const seniorDeveloperPath: LearningPathConfig = {
  id: "senior-developer",
  name: "高级开发者 (3+ 年)",
  description: "适合资深开发者，专注于难题和算法设计",
  icon: "🌳",
  difficulty: "advanced",
  estimatedDays: 21,
  targetAudience: [
    "工作 3 年以上的开发者",
    "准备技术专家面试的人",
    "想要精进算法能力的人",
  ],
  prerequisites: [
    "精通 JavaScript",
    "有较好的算法基础",
  ],
  outcomes: [
    "能解决 Hard 难度题目",
    "具备算法设计能力",
    "能指导他人学习算法",
  ],
  stages: [],
};

// ==================== 导出所有路线 ====================

export const allLearningPaths: LearningPathConfig[] = [
  twoWeekSprintPath,
  fourWeekStandardPath,
  eightWeekMasteryPath,
  juniorDeveloperPath,
  midLevelDeveloperPath,
  seniorDeveloperPath,
];

// 按维度获取路线
export function getPathsByDimension(dimension: "time" | "experience" | "difficulty"): LearningPathConfig[] {
  switch (dimension) {
    case "time":
      return [twoWeekSprintPath, fourWeekStandardPath, eightWeekMasteryPath];
    case "experience":
      return [juniorDeveloperPath, midLevelDeveloperPath, seniorDeveloperPath];
    case "difficulty":
      return allLearningPaths.sort((a, b) => {
        const order: Record<PathDifficulty, number> = { beginner: 0, intermediate: 1, advanced: 2, expert: 3 };
        return order[a.difficulty] - order[b.difficulty];
      });
    default:
      return allLearningPaths;
  }
}

// 根据用户信息推荐路线
export function recommendPath(
  experience: "junior" | "mid" | "senior",
  availableDays: number,
  goal: "interview" | "skill" | "deep"
): LearningPathConfig {
  if (goal === "interview" && availableDays <= 14) {
    return twoWeekSprintPath;
  }

  if (experience === "junior") {
    return juniorDeveloperPath;
  }

  if (experience === "senior" && goal === "deep") {
    return eightWeekMasteryPath;
  }

  if (availableDays <= 28) {
    return fourWeekStandardPath;
  }

  return eightWeekMasteryPath;
}
