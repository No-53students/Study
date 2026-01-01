/**
 * 前端面试必刷50题 - 学习路线图
 *
 * 精选50道前端面试高频算法题，覆盖90%面试场景
 * 按照难度递进，从基础到进阶系统性学习
 */

import { LearningPath, Stage, Day, DayProblem } from "../../types/roadmap";

// ==================== 题目数据 ====================

// 第一周第1天：哈希表入门
const week1Day1Problems: DayProblem[] = [
  {
    problemId: "two-sum",
    isCore: true,
    order: 1,
    hint: "用哈希表存储已遍历的数，查找补数",
    relatedTemplate: "hash-map-lookup",
  },
  {
    problemId: "valid-anagram",
    isCore: true,
    order: 2,
    hint: "统计字符频率，比较两个计数器",
  },
  {
    problemId: "contains-duplicate",
    isCore: false,
    order: 3,
    hint: "Set 去重，判断长度变化",
  },
];

// 第一周第2天：数组基础操作
const week1Day2Problems: DayProblem[] = [
  {
    problemId: "merge-sorted-array",
    isCore: true,
    order: 1,
    hint: "从后往前遍历，避免覆盖",
  },
  {
    problemId: "move-zeroes",
    isCore: true,
    order: 2,
    hint: "快慢指针，非零元素前移",
  },
  {
    problemId: "remove-duplicates-from-sorted-array",
    isCore: false,
    order: 3,
    hint: "有序数组用双指针去重",
  },
];

// 第一周第3天：字符串处理
const week1Day3Problems: DayProblem[] = [
  {
    problemId: "valid-palindrome",
    isCore: true,
    order: 1,
    hint: "对撞指针，跳过非字母数字字符",
  },
  {
    problemId: "reverse-string",
    isCore: false,
    order: 2,
    hint: "双指针交换首尾",
  },
  {
    problemId: "first-unique-character-in-a-string",
    isCore: true,
    order: 3,
    hint: "哈希计数，两次遍历",
  },
];

// 第二周第1天：对撞双指针
const week2Day1Problems: DayProblem[] = [
  {
    problemId: "two-sum-ii-input-array-is-sorted",
    isCore: true,
    order: 1,
    hint: "有序数组用双指针，O(1) 空间",
    relatedTemplate: "two-pointers-collision",
  },
  {
    problemId: "container-with-most-water",
    isCore: true,
    order: 2,
    hint: "贪心移动较小的那边",
  },
  {
    problemId: "three-sum",
    isCore: true,
    order: 3,
    hint: "排序 + 固定一个数 + 双指针",
  },
];

// 第二周第2天：快慢指针
const week2Day2Problems: DayProblem[] = [
  {
    problemId: "linked-list-cycle",
    isCore: true,
    order: 1,
    hint: "快指针走两步，慢指针走一步",
    relatedTemplate: "fast-slow-pointers",
  },
  {
    problemId: "middle-of-the-linked-list",
    isCore: true,
    order: 2,
    hint: "快指针到头时慢指针在中间",
  },
  {
    problemId: "remove-nth-node-from-end-of-list",
    isCore: false,
    order: 3,
    hint: "快指针先走 n 步",
  },
];

// 第二周第3天：滑动窗口
const week2Day3Problems: DayProblem[] = [
  {
    problemId: "longest-substring-without-repeating-characters",
    isCore: true,
    order: 1,
    hint: "维护窗口内字符集合，遇重复收缩",
    relatedTemplate: "sliding-window-dynamic",
  },
  {
    problemId: "minimum-window-substring",
    isCore: true,
    order: 2,
    hint: "先扩展找可行解，再收缩优化",
  },
  {
    problemId: "find-all-anagrams-in-a-string",
    isCore: false,
    order: 3,
    hint: "固定窗口大小，滑动比较",
  },
];

// 第三周第1天：栈的应用
const week3Day1Problems: DayProblem[] = [
  {
    problemId: "valid-parentheses",
    isCore: true,
    order: 1,
    hint: "遇左括号入栈，遇右括号匹配出栈",
    relatedTemplate: "stack-matching",
  },
  {
    problemId: "min-stack",
    isCore: true,
    order: 2,
    hint: "辅助栈同步记录最小值",
  },
  {
    problemId: "daily-temperatures",
    isCore: true,
    order: 3,
    hint: "单调递减栈，栈中存索引",
    relatedTemplate: "monotonic-stack",
  },
];

// 第三周第2天：链表操作
const week3Day2Problems: DayProblem[] = [
  {
    problemId: "reverse-linked-list",
    isCore: true,
    order: 1,
    hint: "三指针迭代或递归反转",
    relatedTemplate: "linked-list-reverse",
  },
  {
    problemId: "merge-two-sorted-lists",
    isCore: true,
    order: 2,
    hint: "哨兵节点简化处理",
  },
  {
    problemId: "palindrome-linked-list",
    isCore: false,
    order: 3,
    hint: "找中点 + 反转后半 + 比较",
  },
];

// 第三周第3天：二叉树遍历
const week3Day3Problems: DayProblem[] = [
  {
    problemId: "binary-tree-inorder-traversal",
    isCore: true,
    order: 1,
    hint: "递归简单，迭代用栈模拟",
    relatedTemplate: "tree-traversal",
  },
  {
    problemId: "maximum-depth-of-binary-tree",
    isCore: true,
    order: 2,
    hint: "递归：1 + max(左深度, 右深度)",
  },
  {
    problemId: "invert-binary-tree",
    isCore: true,
    order: 3,
    hint: "递归交换左右子树",
  },
];

// 第三周第4天：二叉树进阶
const week3Day4Problems: DayProblem[] = [
  {
    problemId: "symmetric-tree",
    isCore: true,
    order: 1,
    hint: "双指针递归，左右对称比较",
  },
  {
    problemId: "binary-tree-level-order-traversal",
    isCore: true,
    order: 2,
    hint: "BFS + 队列，按层处理",
    relatedTemplate: "tree-bfs",
  },
  {
    problemId: "validate-binary-search-tree",
    isCore: true,
    order: 3,
    hint: "中序遍历递增，或区间验证",
  },
];

// 第四周第1天：一维动态规划
const week4Day1Problems: DayProblem[] = [
  {
    problemId: "climbing-stairs",
    isCore: true,
    order: 1,
    hint: "dp[i] = dp[i-1] + dp[i-2]",
    relatedTemplate: "dp-linear",
  },
  {
    problemId: "house-robber",
    isCore: true,
    order: 2,
    hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
  },
  {
    problemId: "maximum-subarray",
    isCore: true,
    order: 3,
    hint: "Kadane: 要么加入，要么重新开始",
  },
];

// 第四周第2天：二维动态规划
const week4Day2Problems: DayProblem[] = [
  {
    problemId: "unique-paths",
    isCore: true,
    order: 1,
    hint: "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
    relatedTemplate: "dp-grid",
  },
  {
    problemId: "minimum-path-sum",
    isCore: true,
    order: 2,
    hint: "类似路径问题，取最小",
  },
  {
    problemId: "longest-common-subsequence",
    isCore: true,
    order: 3,
    hint: "双字符串 DP，相等+1，不等取max",
  },
];

// 第四周第3天：二分查找
const week4Day3Problems: DayProblem[] = [
  {
    problemId: "binary-search",
    isCore: true,
    order: 1,
    hint: "标准模板，注意边界",
    relatedTemplate: "binary-search-standard",
  },
  {
    problemId: "search-in-rotated-sorted-array",
    isCore: true,
    order: 2,
    hint: "先判断哪边有序",
  },
  {
    problemId: "find-first-and-last-position-of-element-in-sorted-array",
    isCore: true,
    order: 3,
    hint: "两次二分，分别找左右边界",
  },
];

// 第四周第4天：高频综合题
const week4Day4Problems: DayProblem[] = [
  {
    problemId: "lru-cache",
    isCore: true,
    order: 1,
    hint: "哈希表 + 双向链表",
    relatedTemplate: "lru-cache",
  },
  {
    problemId: "top-k-frequent-elements",
    isCore: true,
    order: 2,
    hint: "堆或桶排序",
  },
  {
    problemId: "product-of-array-except-self",
    isCore: true,
    order: 3,
    hint: "前缀积 × 后缀积",
  },
];

// 第四周第5天：回溯与递归
const week4Day5Problems: DayProblem[] = [
  {
    problemId: "subsets",
    isCore: true,
    order: 1,
    hint: "选或不选，递归生成",
    relatedTemplate: "backtracking",
  },
  {
    problemId: "permutations",
    isCore: true,
    order: 2,
    hint: "回溯，用 visited 标记",
  },
  {
    problemId: "combination-sum",
    isCore: true,
    order: 3,
    hint: "可重复选，start 不变",
  },
];

// ==================== 每日计划 ====================

const week1Days: Day[] = [
  {
    id: "w1d1",
    title: "Day 1：哈希表入门",
    description: "掌握哈希表的基本用法，理解空间换时间的思想",
    order: 1,
    estimatedMinutes: 60,
    problems: week1Day1Problems,
    knowledgePoints: ["哈希表查找 O(1)", "补数思想", "频率统计"],
    tips: [
      "Map 比 Object 更适合做哈希表，key 可以是任意类型",
      "先想暴力解法，再想优化",
    ],
  },
  {
    id: "w1d2",
    title: "Day 2：数组基础操作",
    description: "学会原地操作数组，掌握双指针的基本用法",
    order: 2,
    estimatedMinutes: 60,
    problems: week1Day2Problems,
    knowledgePoints: ["双指针", "原地操作", "逆向遍历"],
    tips: [
      "原地操作时考虑从后往前遍历",
      "快慢指针用于数组分区",
    ],
  },
  {
    id: "w1d3",
    title: "Day 3：字符串处理",
    description: "练习对撞指针和字符串的基本处理技巧",
    order: 3,
    estimatedMinutes: 60,
    problems: week1Day3Problems,
    knowledgePoints: ["对撞指针", "字符串遍历", "边界处理"],
    tips: [
      "字符串可以看作字符数组处理",
      "注意大小写转换和特殊字符过滤",
    ],
  },
];

const week2Days: Day[] = [
  {
    id: "w2d1",
    title: "Day 4：对撞双指针",
    description: "深入理解对撞指针，解决有序数组问题",
    order: 1,
    estimatedMinutes: 90,
    problems: week2Day1Problems,
    knowledgePoints: ["对撞指针", "有序数组", "去重技巧"],
    tips: [
      "对撞指针适用于有序数组",
      "三数之和可以降维成两数之和",
    ],
  },
  {
    id: "w2d2",
    title: "Day 5：快慢指针",
    description: "掌握快慢指针在链表中的应用",
    order: 2,
    estimatedMinutes: 60,
    problems: week2Day2Problems,
    knowledgePoints: ["快慢指针", "环检测", "链表中点"],
    tips: [
      "快指针速度是慢指针的两倍",
      "先走 n 步可以定位倒数第 n 个",
    ],
  },
  {
    id: "w2d3",
    title: "Day 6：滑动窗口",
    description: "学习滑动窗口模板，解决子串/子数组问题",
    order: 3,
    estimatedMinutes: 90,
    problems: week2Day3Problems,
    knowledgePoints: ["滑动窗口", "窗口收缩", "最优子串"],
    tips: [
      "滑动窗口模板：右扩展、条件判断、左收缩",
      "固定窗口和动态窗口的处理方式不同",
    ],
  },
];

const week3Days: Day[] = [
  {
    id: "w3d1",
    title: "Day 7：栈的应用",
    description: "理解栈的 LIFO 特性，学习单调栈技巧",
    order: 1,
    estimatedMinutes: 90,
    problems: week3Day1Problems,
    knowledgePoints: ["栈", "括号匹配", "单调栈"],
    tips: [
      "栈适合「最近匹配」问题",
      "单调栈用于找下一个更大/更小元素",
    ],
  },
  {
    id: "w3d2",
    title: "Day 8：链表操作",
    description: "掌握链表的反转、合并等基本操作",
    order: 2,
    estimatedMinutes: 60,
    problems: week3Day2Problems,
    knowledgePoints: ["链表反转", "哨兵节点", "链表合并"],
    tips: [
      "反转链表需要三个指针：prev, curr, next",
      "链表题多画图理解指针变化",
    ],
  },
  {
    id: "w3d3",
    title: "Day 9：二叉树遍历",
    description: "熟练前中后序遍历，建立递归思维",
    order: 3,
    estimatedMinutes: 60,
    problems: week3Day3Problems,
    knowledgePoints: ["递归", "树遍历", "DFS"],
    tips: [
      "递归三要素：终止条件、当前层逻辑、返回值",
      "树的问题大多可以用递归解决",
    ],
  },
  {
    id: "w3d4",
    title: "Day 10：二叉树进阶",
    description: "学习层序遍历和 BST 性质验证",
    order: 4,
    estimatedMinutes: 60,
    problems: week3Day4Problems,
    knowledgePoints: ["BFS", "层序遍历", "BST"],
    tips: [
      "层序遍历用 BFS + 队列",
      "BST 的中序遍历结果是递增的",
    ],
  },
];

const week4Days: Day[] = [
  {
    id: "w4d1",
    title: "Day 11：一维动态规划",
    description: "理解 DP 三要素，解决一维 DP 问题",
    order: 1,
    estimatedMinutes: 90,
    problems: week4Day1Problems,
    knowledgePoints: ["动态规划", "状态转移", "空间优化"],
    tips: [
      "DP 三要素：状态定义、转移方程、初始值",
      "「选或不选」是常见的 DP 模式",
    ],
  },
  {
    id: "w4d2",
    title: "Day 12：二维动态规划",
    description: "掌握二维 DP 的网格路径问题",
    order: 2,
    estimatedMinutes: 90,
    problems: week4Day2Problems,
    knowledgePoints: ["二维 DP", "网格路径", "字符串 DP"],
    tips: [
      "二维 DP 通常需要 O(mn) 空间",
      "可以用滚动数组优化到 O(n)",
    ],
  },
  {
    id: "w4d3",
    title: "Day 13：二分查找",
    description: "熟练标准二分模板和边界查找",
    order: 3,
    estimatedMinutes: 60,
    problems: week4Day3Problems,
    knowledgePoints: ["二分查找", "左右边界", "旋转数组"],
    tips: [
      "二分查找的循环条件和边界更新要配套",
      "旋转数组至少有一半是有序的",
    ],
  },
  {
    id: "w4d4",
    title: "Day 14：高频综合题",
    description: "练习面试高频设计题和技巧题",
    order: 4,
    estimatedMinutes: 90,
    problems: week4Day4Problems,
    knowledgePoints: ["LRU", "TopK", "前缀积"],
    tips: [
      "LRU 是面试高频设计题",
      "TopK 问题可以用堆或快速选择",
    ],
  },
  {
    id: "w4d5",
    title: "Day 15：回溯与递归",
    description: "掌握回溯模板，解决排列组合问题",
    order: 5,
    estimatedMinutes: 90,
    problems: week4Day5Problems,
    knowledgePoints: ["回溯", "排列", "组合"],
    tips: [
      "回溯 = 递归 + 撤销选择",
      "排列用 visited，组合用 start",
    ],
  },
];

// ==================== 学习阶段 ====================

const stages: Stage[] = [
  {
    id: "stage-1",
    name: "第一周：基础数据结构",
    description: "掌握数组、字符串、哈希表的基本操作，建立算法思维基础",
    icon: "🏗️",
    order: 1,
    days: week1Days,
    unlockCondition: { type: "always" },
  },
  {
    id: "stage-2",
    name: "第二周：双指针与滑动窗口",
    description: "掌握双指针和滑动窗口两大核心技巧，解决子数组/子串问题",
    icon: "👆",
    order: 2,
    days: week2Days,
    unlockCondition: {
      type: "stage_completed",
      requiredStageId: "stage-1",
      minCompletionRate: 0.7,
    },
  },
  {
    id: "stage-3",
    name: "第三周：栈、链表与二叉树",
    description: "掌握栈的 LIFO 特性、链表操作、二叉树遍历，建立递归思维",
    icon: "🌳",
    order: 3,
    days: week3Days,
    unlockCondition: {
      type: "stage_completed",
      requiredStageId: "stage-2",
      minCompletionRate: 0.7,
    },
  },
  {
    id: "stage-4",
    name: "第四周：动态规划与高频题",
    description: "掌握动态规划基础，刷完高频面试题",
    icon: "🚀",
    order: 4,
    days: week4Days,
    unlockCondition: {
      type: "stage_completed",
      requiredStageId: "stage-3",
      minCompletionRate: 0.7,
    },
  },
];

// ==================== 完整学习路线 ====================

export const frontend50Path: LearningPath = {
  id: "frontend-essential-50",
  name: "前端面试必刷50题",
  description: "精选50道前端面试高频算法题，覆盖90%面试场景。从基础数据结构到高级算法，循序渐进。",
  icon: "🎯",
  totalProblems: 50,
  estimatedWeeks: 4,
  difficulty: "beginner",
  targetAudience: [
    "准备前端面试的开发者",
    "希望系统学习算法的前端工程师",
    "零基础算法入门者",
  ],
  prerequisites: [
    "熟悉 JavaScript/TypeScript 基础语法",
    "了解基本数据结构概念（数组、对象）",
    "每天能投入 1-2 小时学习时间",
  ],
  stages,
};

// ==================== 辅助函数 ====================

/**
 * 计算学习路线的进度
 */
export function calculatePathProgress(
  path: LearningPath,
  completedProblems: string[]
): {
  total: number;
  completed: number;
  percentage: number;
  stageProgress: {
    stageId: string;
    stageName: string;
    total: number;
    completed: number;
  }[];
} {
  const completedSet = new Set(completedProblems);
  let totalProblems = 0;
  let completedCount = 0;

  const stageProgress = path.stages.map((stage) => {
    let stageTotal = 0;
    let stageCompleted = 0;

    stage.days.forEach((day) => {
      day.problems.forEach((problem) => {
        stageTotal++;
        totalProblems++;
        if (completedSet.has(problem.problemId)) {
          stageCompleted++;
          completedCount++;
        }
      });
    });

    return {
      stageId: stage.id,
      stageName: stage.name,
      total: stageTotal,
      completed: stageCompleted,
    };
  });

  return {
    total: totalProblems,
    completed: completedCount,
    percentage: totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0,
    stageProgress,
  };
}

/**
 * 获取某天的所有题目 ID
 */
export function getDayProblemIds(day: Day): string[] {
  return day.problems.map((p) => p.problemId);
}

/**
 * 获取某阶段的所有题目 ID
 */
export function getStageProblemIds(stage: Stage): string[] {
  return stage.days.flatMap((day) => getDayProblemIds(day));
}

/**
 * 判断阶段是否解锁
 */
export function isStageUnlocked(
  stage: Stage,
  path: LearningPath,
  completedProblems: string[]
): boolean {
  const condition = stage.unlockCondition;
  if (!condition || condition.type === "always") {
    return true;
  }

  if (condition.type === "stage_completed" && condition.requiredStageId) {
    const requiredStage = path.stages.find(
      (s) => s.id === condition.requiredStageId
    );
    if (!requiredStage) return true;

    const requiredProblems = getStageProblemIds(requiredStage);
    const completedSet = new Set(completedProblems);
    const completedInStage = requiredProblems.filter((id) =>
      completedSet.has(id)
    ).length;
    const completionRate = completedInStage / requiredProblems.length;

    return completionRate >= (condition.minCompletionRate || 1);
  }

  if (condition.type === "problems_completed" && condition.requiredProblems) {
    const completedSet = new Set(completedProblems);
    return condition.requiredProblems.every((id) => completedSet.has(id));
  }

  return true;
}
