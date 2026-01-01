import { KnowledgeGraph, KnowledgeNode, KnowledgeEdge, LearningPath } from "../types";

// ============================================================================
// 完整算法知识图谱 - 覆盖前端面试所有核心算法
// ============================================================================

// 核心知识节点
const coreNodes: KnowledgeNode[] = [
  // ========== 分类节点 (16个主要算法类别) ==========
  {
    id: "cat-array",
    type: "category",
    name: "数组与字符串",
    description: "最基础的数据结构操作，是所有算法的起点",
    difficulty: 1,
    importance: 5,
    icon: "📊",
    color: "#3b82f6",
  },
  {
    id: "cat-hash",
    type: "category",
    name: "哈希表",
    description: "O(1) 查找的利器，空间换时间的典范",
    difficulty: 2,
    importance: 5,
    icon: "🗃️",
    color: "#22c55e",
  },
  {
    id: "cat-two-pointers",
    type: "category",
    name: "双指针",
    description: "有序数组/链表的高效遍历技巧",
    difficulty: 2,
    importance: 5,
    icon: "👆👆",
    color: "#a855f7",
  },
  {
    id: "cat-sliding-window",
    type: "category",
    name: "滑动窗口",
    description: "子串/子数组问题的利器，双指针的变体",
    difficulty: 3,
    importance: 4,
    icon: "🪟",
    color: "#f59e0b",
  },
  {
    id: "cat-binary-search",
    type: "category",
    name: "二分查找",
    description: "有序数据的高效查找，O(log n) 的魔法",
    difficulty: 2,
    importance: 5,
    icon: "🔍",
    color: "#ec4899",
  },
  {
    id: "cat-stack",
    type: "category",
    name: "栈",
    description: "LIFO 结构，括号匹配/单调栈必备",
    difficulty: 2,
    importance: 5,
    icon: "📚",
    color: "#14b8a6",
  },
  {
    id: "cat-queue",
    type: "category",
    name: "队列",
    description: "FIFO 结构，BFS 遍历的核心",
    difficulty: 2,
    importance: 4,
    icon: "🚶‍♂️",
    color: "#06b6d4",
  },
  {
    id: "cat-linked-list",
    type: "category",
    name: "链表",
    description: "动态数据结构，指针操作的艺术",
    difficulty: 2,
    importance: 4,
    icon: "🔗",
    color: "#8b5cf6",
  },
  {
    id: "cat-tree",
    type: "category",
    name: "二叉树",
    description: "层次结构，递归思维的最佳练习场",
    difficulty: 3,
    importance: 5,
    icon: "🌲",
    color: "#10b981",
  },
  {
    id: "cat-graph",
    type: "category",
    name: "图",
    description: "复杂关系网络，BFS/DFS 的舞台",
    difficulty: 4,
    importance: 4,
    icon: "🕸️",
    color: "#6366f1",
  },
  {
    id: "cat-dp",
    type: "category",
    name: "动态规划",
    description: "最优子结构 + 重叠子问题，面试的终极挑战",
    difficulty: 4,
    importance: 5,
    icon: "🧩",
    color: "#f43f5e",
  },
  {
    id: "cat-backtracking",
    type: "category",
    name: "回溯",
    description: "穷举所有可能，排列组合的通解",
    difficulty: 3,
    importance: 4,
    icon: "🔙",
    color: "#d946ef",
  },
  {
    id: "cat-greedy",
    type: "category",
    name: "贪心",
    description: "局部最优到全局最优，直觉的数学证明",
    difficulty: 3,
    importance: 3,
    icon: "🎯",
    color: "#eab308",
  },
  {
    id: "cat-heap",
    type: "category",
    name: "堆/优先队列",
    description: "动态获取最值，Top K 问题的利器",
    difficulty: 3,
    importance: 4,
    icon: "⛰️",
    color: "#f97316",
  },
  {
    id: "cat-bit",
    type: "category",
    name: "位运算",
    description: "底层二进制操作，高效且优雅",
    difficulty: 3,
    importance: 3,
    icon: "🔢",
    color: "#64748b",
  },
  {
    id: "cat-math",
    type: "category",
    name: "数学",
    description: "数论、几何、组合数学问题",
    difficulty: 3,
    importance: 2,
    icon: "🔢",
    color: "#78716c",
  },

  // ========== 概念节点 - 每个类别的核心思想 ==========
  // 哈希表概念
  {
    id: "concept-complement",
    type: "concept",
    name: "补数思想",
    description: "将查找问题转化为已知量的补数查找",
    difficulty: 2,
    importance: 4,
    tags: ["哈希表", "数组"],
  },
  {
    id: "concept-two-sum",
    type: "concept",
    name: "两数之和模式",
    description: "利用哈希表实现 O(1) 查找配对元素",
    difficulty: 2,
    importance: 5,
    tags: ["经典", "必会"],
  },
  {
    id: "concept-hash-grouping",
    type: "concept",
    name: "哈希分组",
    description: "按特征将元素分组，快速判断同类",
    difficulty: 2,
    importance: 4,
    tags: ["哈希表", "字符串"],
  },

  // 双指针概念
  {
    id: "concept-collision",
    type: "concept",
    name: "对撞指针",
    description: "从两端向中间移动的双指针技巧",
    difficulty: 2,
    importance: 4,
  },
  {
    id: "concept-fast-slow",
    type: "concept",
    name: "快慢指针",
    description: "不同速度移动的双指针，用于环检测等",
    difficulty: 2,
    importance: 4,
  },
  {
    id: "concept-same-direction",
    type: "concept",
    name: "同向指针",
    description: "两个指针同向移动，追及问题",
    difficulty: 2,
    importance: 3,
  },

  // 滑动窗口概念
  {
    id: "concept-window-size",
    type: "concept",
    name: "窗口大小控制",
    description: "根据条件动态调整窗口边界",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "concept-window-valid",
    type: "concept",
    name: "窗口有效性",
    description: "判断当前窗口是否满足题目条件",
    difficulty: 3,
    importance: 4,
  },

  // 二分查找概念
  {
    id: "concept-binary-boundary",
    type: "concept",
    name: "边界查找",
    description: "找到满足条件的第一个/最后一个位置",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "concept-binary-answer",
    type: "concept",
    name: "二分答案",
    description: "答案具有单调性时，二分猜答案",
    difficulty: 4,
    importance: 4,
  },

  // 栈概念
  {
    id: "concept-lifo",
    type: "concept",
    name: "后进先出",
    description: "栈的核心特性，最近相关性问题",
    difficulty: 1,
    importance: 5,
  },
  {
    id: "concept-monotonic-stack",
    type: "concept",
    name: "单调栈",
    description: "维护栈的单调性，处理下一个更大元素",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "concept-bracket-match",
    type: "concept",
    name: "括号匹配",
    description: "栈的经典应用，成对消除",
    difficulty: 2,
    importance: 5,
  },

  // 链表概念
  {
    id: "concept-dummy-head",
    type: "concept",
    name: "虚拟头节点",
    description: "简化边界处理，统一操作",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "concept-reverse-list",
    type: "concept",
    name: "链表反转",
    description: "三指针法反转链表",
    difficulty: 2,
    importance: 5,
  },

  // 二叉树概念
  {
    id: "concept-tree-recursion",
    type: "concept",
    name: "树的递归思维",
    description: "将问题分解为左右子树的子问题",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "concept-tree-traversal",
    type: "concept",
    name: "树的遍历",
    description: "前序/中序/后序/层序遍历",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "concept-bfs-level",
    type: "concept",
    name: "层序遍历",
    description: "BFS 按层处理，适合层级相关问题",
    difficulty: 2,
    importance: 4,
  },

  // 图概念
  {
    id: "concept-graph-dfs",
    type: "concept",
    name: "图的 DFS",
    description: "深度优先探索所有路径",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "concept-graph-bfs",
    type: "concept",
    name: "图的 BFS",
    description: "最短路径、层级遍历的利器",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "concept-topological",
    type: "concept",
    name: "拓扑排序",
    description: "有向无环图的线性排序",
    difficulty: 4,
    importance: 3,
  },

  // 动态规划概念
  {
    id: "concept-dp-state",
    type: "concept",
    name: "状态定义",
    description: "DP 的第一步，定义 dp[i] 代表什么",
    difficulty: 4,
    importance: 5,
  },
  {
    id: "concept-dp-transition",
    type: "concept",
    name: "状态转移",
    description: "如何从小问题推导到大问题",
    difficulty: 4,
    importance: 5,
  },
  {
    id: "concept-dp-space-opt",
    type: "concept",
    name: "空间优化",
    description: "滚动数组将 O(n) 优化到 O(1)",
    difficulty: 4,
    importance: 3,
  },
  {
    id: "concept-dp-path",
    type: "concept",
    name: "路径问题",
    description: "网格路径计数和最优路径",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "concept-dp-subsequence",
    type: "concept",
    name: "子序列问题",
    description: "LCS、LIS 等经典子序列 DP",
    difficulty: 4,
    importance: 4,
  },

  // 回溯概念
  {
    id: "concept-backtrack-template",
    type: "concept",
    name: "回溯模板",
    description: "选择、探索、撤销的标准流程",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "concept-pruning",
    type: "concept",
    name: "剪枝优化",
    description: "提前终止无效分支，大幅提升效率",
    difficulty: 3,
    importance: 4,
  },

  // 贪心概念
  {
    id: "concept-greedy-choice",
    type: "concept",
    name: "贪心选择",
    description: "每步选择当前最优解",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "concept-interval-greedy",
    type: "concept",
    name: "区间贪心",
    description: "区间调度问题的贪心策略",
    difficulty: 3,
    importance: 4,
  },

  // 堆概念
  {
    id: "concept-heap-property",
    type: "concept",
    name: "堆的性质",
    description: "父节点总是大于/小于子节点",
    difficulty: 2,
    importance: 4,
  },
  {
    id: "concept-top-k",
    type: "concept",
    name: "Top K 问题",
    description: "维护 K 个最大/最小元素",
    difficulty: 3,
    importance: 5,
  },

  // 位运算概念
  {
    id: "concept-bit-operations",
    type: "concept",
    name: "位运算基础",
    description: "与/或/异或/移位操作",
    difficulty: 2,
    importance: 3,
  },
  {
    id: "concept-bit-mask",
    type: "concept",
    name: "位掩码",
    description: "用二进制表示集合状态",
    difficulty: 3,
    importance: 3,
  },

  // ========== 技巧节点 ==========
  {
    id: "tech-hash-count",
    type: "technique",
    name: "哈希计数",
    description: "使用哈希表统计元素出现次数",
    difficulty: 1,
    importance: 5,
  },
  {
    id: "tech-hash-index",
    type: "technique",
    name: "值->索引映射",
    description: "哈希表存储值到索引的映射，快速定位",
    difficulty: 2,
    importance: 4,
  },
  {
    id: "tech-shrink-window",
    type: "technique",
    name: "收缩窗口",
    description: "当窗口不满足条件时从左侧收缩",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "tech-binary-left-bound",
    type: "technique",
    name: "左边界二分",
    description: "找到第一个大于等于 target 的位置",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "tech-binary-right-bound",
    type: "technique",
    name: "右边界二分",
    description: "找到最后一个小于等于 target 的位置",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "tech-inplace-modify",
    type: "technique",
    name: "原地修改",
    description: "不使用额外空间，在原数组上操作",
    difficulty: 2,
    importance: 4,
  },
  {
    id: "tech-prefix-sum",
    type: "technique",
    name: "前缀和",
    description: "O(1) 计算区间和",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "tech-memoization",
    type: "technique",
    name: "记忆化搜索",
    description: "缓存递归结果，避免重复计算",
    difficulty: 3,
    importance: 5,
  },

  // ========== 模板节点 ==========
  {
    id: "pattern-two-sum",
    type: "pattern",
    name: "两数之和模板",
    description: "遍历 + 哈希查找补数的标准模板",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "pattern-sliding-window",
    type: "pattern",
    name: "滑动窗口模板",
    description: "右扩左缩的标准滑动窗口模板",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "pattern-two-pointers",
    type: "pattern",
    name: "双指针模板",
    description: "对撞指针的标准模板",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "pattern-binary-search",
    type: "pattern",
    name: "二分查找模板",
    description: "左闭右开/左闭右闭的标准模板",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "pattern-tree-dfs",
    type: "pattern",
    name: "树 DFS 模板",
    description: "递归遍历二叉树的标准模板",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "pattern-tree-bfs",
    type: "pattern",
    name: "树 BFS 模板",
    description: "层序遍历二叉树的标准模板",
    difficulty: 2,
    importance: 5,
  },
  {
    id: "pattern-graph-dfs",
    type: "pattern",
    name: "图 DFS 模板",
    description: "图的深度优先遍历模板",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "pattern-graph-bfs",
    type: "pattern",
    name: "图 BFS 模板",
    description: "图的广度优先遍历模板",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "pattern-backtrack",
    type: "pattern",
    name: "回溯模板",
    description: "选择-探索-撤销的标准回溯模板",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "pattern-dp-1d",
    type: "pattern",
    name: "一维 DP 模板",
    description: "dp[i] 表示以 i 结尾的最优解",
    difficulty: 3,
    importance: 5,
  },
  {
    id: "pattern-dp-2d",
    type: "pattern",
    name: "二维 DP 模板",
    description: "dp[i][j] 处理两个维度的状态",
    difficulty: 4,
    importance: 4,
  },
  {
    id: "pattern-monotonic-stack",
    type: "pattern",
    name: "单调栈模板",
    description: "维护栈的单调性处理下一个更大元素",
    difficulty: 3,
    importance: 4,
  },
  {
    id: "pattern-union-find",
    type: "pattern",
    name: "并查集模板",
    description: "处理连通性问题的标准模板",
    difficulty: 3,
    importance: 4,
  },

  // ========== 题目节点 - 高频50题 ==========
  // 哈希表题目
  {
    id: "problem-two-sum",
    type: "problem",
    name: "两数之和",
    description: "LeetCode #1 - 经典入门题",
    difficulty: 1,
    importance: 5,
    problemId: "two-sum",
    status: "mastered",
  },
  {
    id: "problem-valid-anagram",
    type: "problem",
    name: "有效的字母异位词",
    description: "LeetCode #242 - 哈希计数应用",
    difficulty: 1,
    importance: 3,
    problemId: "valid-anagram",
    status: "available",
  },
  {
    id: "problem-group-anagrams",
    type: "problem",
    name: "字母异位词分组",
    description: "LeetCode #49 - 哈希分组应用",
    difficulty: 2,
    importance: 4,
    problemId: "group-anagrams",
    status: "available",
  },

  // 双指针题目
  {
    id: "problem-three-sum",
    type: "problem",
    name: "三数之和",
    description: "LeetCode #15 - 两数之和的进阶",
    difficulty: 3,
    importance: 5,
    problemId: "three-sum",
    status: "available",
  },
  {
    id: "problem-container-water",
    type: "problem",
    name: "盛最多水的容器",
    description: "LeetCode #11 - 对撞指针经典",
    difficulty: 2,
    importance: 4,
    problemId: "container-with-most-water",
    status: "available",
  },
  {
    id: "problem-trapping-rain-water",
    type: "problem",
    name: "接雨水",
    description: "LeetCode #42 - 双指针进阶",
    difficulty: 4,
    importance: 5,
    problemId: "trapping-rain-water",
    status: "available",
  },

  // 滑动窗口题目
  {
    id: "problem-longest-substring",
    type: "problem",
    name: "无重复字符的最长子串",
    description: "LeetCode #3 - 滑动窗口经典",
    difficulty: 3,
    importance: 5,
    problemId: "longest-substring-without-repeating",
    status: "available",
  },
  {
    id: "problem-min-window",
    type: "problem",
    name: "最小覆盖子串",
    description: "LeetCode #76 - 滑动窗口进阶",
    difficulty: 4,
    importance: 4,
    problemId: "minimum-window-substring",
    status: "available",
  },

  // 二分查找题目
  {
    id: "problem-binary-search",
    type: "problem",
    name: "二分查找",
    description: "LeetCode #704 - 二分入门",
    difficulty: 1,
    importance: 5,
    problemId: "binary-search",
    status: "available",
  },
  {
    id: "problem-search-rotated",
    type: "problem",
    name: "搜索旋转排序数组",
    description: "LeetCode #33 - 二分变体",
    difficulty: 3,
    importance: 4,
    problemId: "search-in-rotated-sorted-array",
    status: "available",
  },
  {
    id: "problem-find-first-last",
    type: "problem",
    name: "在排序数组中查找元素的第一个和最后一个位置",
    description: "LeetCode #34 - 边界二分",
    difficulty: 3,
    importance: 5,
    problemId: "find-first-and-last-position",
    status: "available",
  },

  // 栈题目
  {
    id: "problem-valid-parentheses",
    type: "problem",
    name: "有效的括号",
    description: "LeetCode #20 - 栈的经典应用",
    difficulty: 1,
    importance: 5,
    problemId: "valid-parentheses",
    status: "available",
  },
  {
    id: "problem-daily-temperatures",
    type: "problem",
    name: "每日温度",
    description: "LeetCode #739 - 单调栈入门",
    difficulty: 3,
    importance: 4,
    problemId: "daily-temperatures",
    status: "available",
  },
  {
    id: "problem-largest-rectangle",
    type: "problem",
    name: "柱状图中最大的矩形",
    description: "LeetCode #84 - 单调栈进阶",
    difficulty: 4,
    importance: 4,
    problemId: "largest-rectangle-in-histogram",
    status: "available",
  },

  // 链表题目
  {
    id: "problem-reverse-list",
    type: "problem",
    name: "反转链表",
    description: "LeetCode #206 - 链表基础",
    difficulty: 1,
    importance: 5,
    problemId: "reverse-linked-list",
    status: "available",
  },
  {
    id: "problem-linked-list-cycle",
    type: "problem",
    name: "环形链表",
    description: "LeetCode #141 - 快慢指针",
    difficulty: 2,
    importance: 5,
    problemId: "linked-list-cycle",
    status: "available",
  },
  {
    id: "problem-merge-two-lists",
    type: "problem",
    name: "合并两个有序链表",
    description: "LeetCode #21 - 链表合并",
    difficulty: 1,
    importance: 5,
    problemId: "merge-two-sorted-lists",
    status: "available",
  },
  {
    id: "problem-lru-cache",
    type: "problem",
    name: "LRU 缓存",
    description: "LeetCode #146 - 哈希+双向链表",
    difficulty: 3,
    importance: 5,
    problemId: "lru-cache",
    status: "available",
  },

  // 二叉树题目
  {
    id: "problem-invert-tree",
    type: "problem",
    name: "翻转二叉树",
    description: "LeetCode #226 - 树的递归入门",
    difficulty: 1,
    importance: 4,
    problemId: "invert-binary-tree",
    status: "available",
  },
  {
    id: "problem-max-depth",
    type: "problem",
    name: "二叉树的最大深度",
    description: "LeetCode #104 - 树的递归基础",
    difficulty: 1,
    importance: 5,
    problemId: "maximum-depth-of-binary-tree",
    status: "available",
  },
  {
    id: "problem-level-order",
    type: "problem",
    name: "二叉树的层序遍历",
    description: "LeetCode #102 - BFS 遍历",
    difficulty: 2,
    importance: 5,
    problemId: "binary-tree-level-order-traversal",
    status: "available",
  },
  {
    id: "problem-validate-bst",
    type: "problem",
    name: "验证二叉搜索树",
    description: "LeetCode #98 - BST 性质",
    difficulty: 2,
    importance: 4,
    problemId: "validate-binary-search-tree",
    status: "available",
  },
  {
    id: "problem-lowest-common-ancestor",
    type: "problem",
    name: "二叉树的最近公共祖先",
    description: "LeetCode #236 - 树的递归进阶",
    difficulty: 3,
    importance: 5,
    problemId: "lowest-common-ancestor",
    status: "available",
  },

  // 图题目
  {
    id: "problem-num-islands",
    type: "problem",
    name: "岛屿数量",
    description: "LeetCode #200 - DFS/BFS 经典",
    difficulty: 2,
    importance: 5,
    problemId: "number-of-islands",
    status: "available",
  },
  {
    id: "problem-clone-graph",
    type: "problem",
    name: "克隆图",
    description: "LeetCode #133 - 图的遍历",
    difficulty: 2,
    importance: 4,
    problemId: "clone-graph",
    status: "available",
  },
  {
    id: "problem-course-schedule",
    type: "problem",
    name: "课程表",
    description: "LeetCode #207 - 拓扑排序",
    difficulty: 3,
    importance: 4,
    problemId: "course-schedule",
    status: "available",
  },

  // 动态规划题目
  {
    id: "problem-climbing-stairs",
    type: "problem",
    name: "爬楼梯",
    description: "LeetCode #70 - DP 入门",
    difficulty: 1,
    importance: 5,
    problemId: "climbing-stairs",
    status: "available",
  },
  {
    id: "problem-coin-change",
    type: "problem",
    name: "零钱兑换",
    description: "LeetCode #322 - 完全背包",
    difficulty: 3,
    importance: 5,
    problemId: "coin-change",
    status: "available",
  },
  {
    id: "problem-longest-increasing",
    type: "problem",
    name: "最长递增子序列",
    description: "LeetCode #300 - LIS 问题",
    difficulty: 3,
    importance: 5,
    problemId: "longest-increasing-subsequence",
    status: "available",
  },
  {
    id: "problem-unique-paths",
    type: "problem",
    name: "不同路径",
    description: "LeetCode #62 - 路径 DP",
    difficulty: 2,
    importance: 4,
    problemId: "unique-paths",
    status: "available",
  },
  {
    id: "problem-word-break",
    type: "problem",
    name: "单词拆分",
    description: "LeetCode #139 - 字符串 DP",
    difficulty: 3,
    importance: 4,
    problemId: "word-break",
    status: "available",
  },
  {
    id: "problem-house-robber",
    type: "problem",
    name: "打家劫舍",
    description: "LeetCode #198 - 线性 DP",
    difficulty: 2,
    importance: 5,
    problemId: "house-robber",
    status: "available",
  },

  // 回溯题目
  {
    id: "problem-permutations",
    type: "problem",
    name: "全排列",
    description: "LeetCode #46 - 回溯经典",
    difficulty: 2,
    importance: 5,
    problemId: "permutations",
    status: "available",
  },
  {
    id: "problem-subsets",
    type: "problem",
    name: "子集",
    description: "LeetCode #78 - 回溯入门",
    difficulty: 2,
    importance: 5,
    problemId: "subsets",
    status: "available",
  },
  {
    id: "problem-combination-sum",
    type: "problem",
    name: "组合总和",
    description: "LeetCode #39 - 回溯应用",
    difficulty: 2,
    importance: 4,
    problemId: "combination-sum",
    status: "available",
  },
  {
    id: "problem-n-queens",
    type: "problem",
    name: "N 皇后",
    description: "LeetCode #51 - 回溯进阶",
    difficulty: 4,
    importance: 3,
    problemId: "n-queens",
    status: "available",
  },

  // 贪心题目
  {
    id: "problem-jump-game",
    type: "problem",
    name: "跳跃游戏",
    description: "LeetCode #55 - 贪心入门",
    difficulty: 2,
    importance: 4,
    problemId: "jump-game",
    status: "available",
  },
  {
    id: "problem-merge-intervals",
    type: "problem",
    name: "合并区间",
    description: "LeetCode #56 - 区间贪心",
    difficulty: 2,
    importance: 5,
    problemId: "merge-intervals",
    status: "available",
  },

  // 堆题目
  {
    id: "problem-top-k-frequent",
    type: "problem",
    name: "前 K 个高频元素",
    description: "LeetCode #347 - 堆的应用",
    difficulty: 2,
    importance: 4,
    problemId: "top-k-frequent-elements",
    status: "available",
  },
  {
    id: "problem-find-median",
    type: "problem",
    name: "数据流的中位数",
    description: "LeetCode #295 - 对顶堆",
    difficulty: 4,
    importance: 3,
    problemId: "find-median-from-data-stream",
    status: "available",
  },

  // 位运算题目
  {
    id: "problem-single-number",
    type: "problem",
    name: "只出现一次的数字",
    description: "LeetCode #136 - 异或应用",
    difficulty: 1,
    importance: 4,
    problemId: "single-number",
    status: "available",
  },

  // 数组题目
  {
    id: "problem-merge-sorted-array",
    type: "problem",
    name: "合并两个有序数组",
    description: "LeetCode #88 - 双指针应用",
    difficulty: 1,
    importance: 4,
    problemId: "merge-sorted-array",
    status: "available",
  },
  {
    id: "problem-product-except-self",
    type: "problem",
    name: "除自身以外数组的乘积",
    description: "LeetCode #238 - 前缀积",
    difficulty: 2,
    importance: 4,
    problemId: "product-of-array-except-self",
    status: "available",
  },
  {
    id: "problem-max-subarray",
    type: "problem",
    name: "最大子数组和",
    description: "LeetCode #53 - Kadane 算法",
    difficulty: 2,
    importance: 5,
    problemId: "maximum-subarray",
    status: "available",
  },
];

// ============================================================================
// 知识关系 - 完整的算法知识网络
// ============================================================================
const coreEdges: KnowledgeEdge[] = [
  // ========== 分类之间的前置知识关系 ==========
  // 数组是所有的基础
  { source: "cat-array", target: "cat-hash", relation: "prerequisite", strength: 5, description: "数组是哈希表的基础" },
  { source: "cat-array", target: "cat-two-pointers", relation: "prerequisite", strength: 5, description: "数组是双指针的基础" },
  { source: "cat-array", target: "cat-binary-search", relation: "prerequisite", strength: 5, description: "数组是二分的基础" },

  // 双指针进阶
  { source: "cat-two-pointers", target: "cat-sliding-window", relation: "prerequisite", strength: 5, description: "滑动窗口是双指针的特化" },

  // 栈队列关系
  { source: "cat-array", target: "cat-stack", relation: "prerequisite", strength: 4 },
  { source: "cat-array", target: "cat-queue", relation: "prerequisite", strength: 4 },
  { source: "cat-stack", target: "cat-tree", relation: "prerequisite", strength: 3, description: "栈用于树的迭代遍历" },
  { source: "cat-queue", target: "cat-tree", relation: "prerequisite", strength: 4, description: "队列用于层序遍历" },
  { source: "cat-queue", target: "cat-graph", relation: "prerequisite", strength: 5, description: "队列用于 BFS" },

  // 链表基础
  { source: "cat-array", target: "cat-linked-list", relation: "prerequisite", strength: 3 },
  { source: "cat-two-pointers", target: "cat-linked-list", relation: "similar", strength: 4, description: "链表中快慢指针" },

  // 树和图的关系
  { source: "cat-tree", target: "cat-graph", relation: "prerequisite", strength: 5, description: "树是特殊的图" },
  { source: "cat-linked-list", target: "cat-tree", relation: "prerequisite", strength: 3, description: "树节点类似链表" },

  // 动态规划前置
  { source: "cat-array", target: "cat-dp", relation: "prerequisite", strength: 4 },
  { source: "cat-tree", target: "cat-dp", relation: "similar", strength: 3, description: "树形 DP" },
  { source: "cat-graph", target: "cat-dp", relation: "similar", strength: 3, description: "图上 DP" },

  // 回溯前置
  { source: "cat-tree", target: "cat-backtracking", relation: "prerequisite", strength: 5, description: "回溯是树的遍历" },
  { source: "cat-dp", target: "cat-backtracking", relation: "similar", strength: 4, description: "记忆化回溯 = DP" },

  // 贪心和 DP 的关系
  { source: "cat-greedy", target: "cat-dp", relation: "similar", strength: 4, description: "贪心是特殊的 DP" },

  // 堆的前置
  { source: "cat-tree", target: "cat-heap", relation: "prerequisite", strength: 4, description: "堆是完全二叉树" },
  { source: "cat-array", target: "cat-heap", relation: "prerequisite", strength: 3, description: "堆的数组实现" },

  // 位运算
  { source: "cat-array", target: "cat-bit", relation: "prerequisite", strength: 2 },
  { source: "cat-math", target: "cat-bit", relation: "similar", strength: 3 },

  // ========== 分类 -> 概念 ==========
  // 哈希表概念
  { source: "cat-hash", target: "concept-complement", relation: "contains", strength: 5 },
  { source: "cat-hash", target: "concept-two-sum", relation: "contains", strength: 5 },
  { source: "cat-hash", target: "concept-hash-grouping", relation: "contains", strength: 4 },

  // 双指针概念
  { source: "cat-two-pointers", target: "concept-collision", relation: "contains", strength: 5 },
  { source: "cat-two-pointers", target: "concept-fast-slow", relation: "contains", strength: 5 },
  { source: "cat-two-pointers", target: "concept-same-direction", relation: "contains", strength: 4 },

  // 滑动窗口概念
  { source: "cat-sliding-window", target: "concept-window-size", relation: "contains", strength: 5 },
  { source: "cat-sliding-window", target: "concept-window-valid", relation: "contains", strength: 5 },

  // 二分概念
  { source: "cat-binary-search", target: "concept-binary-boundary", relation: "contains", strength: 5 },
  { source: "cat-binary-search", target: "concept-binary-answer", relation: "contains", strength: 4 },

  // 栈概念
  { source: "cat-stack", target: "concept-lifo", relation: "contains", strength: 5 },
  { source: "cat-stack", target: "concept-monotonic-stack", relation: "contains", strength: 4 },
  { source: "cat-stack", target: "concept-bracket-match", relation: "contains", strength: 5 },

  // 链表概念
  { source: "cat-linked-list", target: "concept-dummy-head", relation: "contains", strength: 5 },
  { source: "cat-linked-list", target: "concept-reverse-list", relation: "contains", strength: 5 },
  { source: "cat-linked-list", target: "concept-fast-slow", relation: "contains", strength: 4 },

  // 树概念
  { source: "cat-tree", target: "concept-tree-recursion", relation: "contains", strength: 5 },
  { source: "cat-tree", target: "concept-tree-traversal", relation: "contains", strength: 5 },
  { source: "cat-tree", target: "concept-bfs-level", relation: "contains", strength: 4 },

  // 图概念
  { source: "cat-graph", target: "concept-graph-dfs", relation: "contains", strength: 5 },
  { source: "cat-graph", target: "concept-graph-bfs", relation: "contains", strength: 5 },
  { source: "cat-graph", target: "concept-topological", relation: "contains", strength: 4 },

  // DP 概念
  { source: "cat-dp", target: "concept-dp-state", relation: "contains", strength: 5 },
  { source: "cat-dp", target: "concept-dp-transition", relation: "contains", strength: 5 },
  { source: "cat-dp", target: "concept-dp-space-opt", relation: "contains", strength: 4 },
  { source: "cat-dp", target: "concept-dp-path", relation: "contains", strength: 4 },
  { source: "cat-dp", target: "concept-dp-subsequence", relation: "contains", strength: 4 },

  // 回溯概念
  { source: "cat-backtracking", target: "concept-backtrack-template", relation: "contains", strength: 5 },
  { source: "cat-backtracking", target: "concept-pruning", relation: "contains", strength: 4 },

  // 贪心概念
  { source: "cat-greedy", target: "concept-greedy-choice", relation: "contains", strength: 5 },
  { source: "cat-greedy", target: "concept-interval-greedy", relation: "contains", strength: 4 },

  // 堆概念
  { source: "cat-heap", target: "concept-heap-property", relation: "contains", strength: 5 },
  { source: "cat-heap", target: "concept-top-k", relation: "contains", strength: 5 },

  // 位运算概念
  { source: "cat-bit", target: "concept-bit-operations", relation: "contains", strength: 5 },
  { source: "cat-bit", target: "concept-bit-mask", relation: "contains", strength: 4 },

  // ========== 概念 -> 技巧 ==========
  { source: "concept-two-sum", target: "tech-hash-index", relation: "applies", strength: 5 },
  { source: "concept-complement", target: "tech-hash-count", relation: "applies", strength: 4 },
  { source: "concept-hash-grouping", target: "tech-hash-count", relation: "applies", strength: 4 },
  { source: "concept-window-size", target: "tech-shrink-window", relation: "applies", strength: 5 },
  { source: "concept-binary-boundary", target: "tech-binary-left-bound", relation: "applies", strength: 5 },
  { source: "concept-binary-boundary", target: "tech-binary-right-bound", relation: "applies", strength: 5 },
  { source: "concept-dp-transition", target: "tech-memoization", relation: "applies", strength: 5 },

  // ========== 技巧/概念 -> 模板 ==========
  { source: "tech-hash-index", target: "pattern-two-sum", relation: "applies", strength: 5 },
  { source: "tech-shrink-window", target: "pattern-sliding-window", relation: "applies", strength: 5 },
  { source: "concept-collision", target: "pattern-two-pointers", relation: "applies", strength: 5 },
  { source: "tech-binary-left-bound", target: "pattern-binary-search", relation: "applies", strength: 5 },
  { source: "concept-tree-recursion", target: "pattern-tree-dfs", relation: "applies", strength: 5 },
  { source: "concept-bfs-level", target: "pattern-tree-bfs", relation: "applies", strength: 5 },
  { source: "concept-graph-dfs", target: "pattern-graph-dfs", relation: "applies", strength: 5 },
  { source: "concept-graph-bfs", target: "pattern-graph-bfs", relation: "applies", strength: 5 },
  { source: "concept-backtrack-template", target: "pattern-backtrack", relation: "applies", strength: 5 },
  { source: "concept-dp-state", target: "pattern-dp-1d", relation: "applies", strength: 5 },
  { source: "concept-dp-state", target: "pattern-dp-2d", relation: "applies", strength: 5 },
  { source: "concept-monotonic-stack", target: "pattern-monotonic-stack", relation: "applies", strength: 5 },

  // ========== 模板 -> 题目 ==========
  // 哈希题目
  { source: "pattern-two-sum", target: "problem-two-sum", relation: "applies", strength: 5 },
  { source: "tech-hash-count", target: "problem-valid-anagram", relation: "applies", strength: 5 },
  { source: "concept-hash-grouping", target: "problem-group-anagrams", relation: "applies", strength: 5 },

  // 双指针题目
  { source: "pattern-two-sum", target: "problem-three-sum", relation: "applies", strength: 4 },
  { source: "pattern-two-pointers", target: "problem-container-water", relation: "applies", strength: 5 },
  { source: "pattern-two-pointers", target: "problem-trapping-rain-water", relation: "applies", strength: 5 },
  { source: "pattern-two-pointers", target: "problem-merge-sorted-array", relation: "applies", strength: 4 },

  // 滑动窗口题目
  { source: "pattern-sliding-window", target: "problem-longest-substring", relation: "applies", strength: 5 },
  { source: "pattern-sliding-window", target: "problem-min-window", relation: "applies", strength: 5 },

  // 二分题目
  { source: "pattern-binary-search", target: "problem-binary-search", relation: "applies", strength: 5 },
  { source: "pattern-binary-search", target: "problem-search-rotated", relation: "applies", strength: 4 },
  { source: "pattern-binary-search", target: "problem-find-first-last", relation: "applies", strength: 5 },

  // 栈题目
  { source: "concept-bracket-match", target: "problem-valid-parentheses", relation: "applies", strength: 5 },
  { source: "pattern-monotonic-stack", target: "problem-daily-temperatures", relation: "applies", strength: 5 },
  { source: "pattern-monotonic-stack", target: "problem-largest-rectangle", relation: "applies", strength: 5 },

  // 链表题目
  { source: "concept-reverse-list", target: "problem-reverse-list", relation: "applies", strength: 5 },
  { source: "concept-fast-slow", target: "problem-linked-list-cycle", relation: "applies", strength: 5 },
  { source: "concept-dummy-head", target: "problem-merge-two-lists", relation: "applies", strength: 4 },
  { source: "cat-linked-list", target: "problem-lru-cache", relation: "applies", strength: 5 },
  { source: "cat-hash", target: "problem-lru-cache", relation: "applies", strength: 5 },

  // 树题目
  { source: "pattern-tree-dfs", target: "problem-invert-tree", relation: "applies", strength: 5 },
  { source: "pattern-tree-dfs", target: "problem-max-depth", relation: "applies", strength: 5 },
  { source: "pattern-tree-bfs", target: "problem-level-order", relation: "applies", strength: 5 },
  { source: "pattern-tree-dfs", target: "problem-validate-bst", relation: "applies", strength: 4 },
  { source: "pattern-tree-dfs", target: "problem-lowest-common-ancestor", relation: "applies", strength: 5 },

  // 图题目
  { source: "pattern-graph-dfs", target: "problem-num-islands", relation: "applies", strength: 5 },
  { source: "pattern-graph-bfs", target: "problem-num-islands", relation: "applies", strength: 5 },
  { source: "pattern-graph-dfs", target: "problem-clone-graph", relation: "applies", strength: 5 },
  { source: "concept-topological", target: "problem-course-schedule", relation: "applies", strength: 5 },

  // DP 题目
  { source: "pattern-dp-1d", target: "problem-climbing-stairs", relation: "applies", strength: 5 },
  { source: "pattern-dp-1d", target: "problem-coin-change", relation: "applies", strength: 5 },
  { source: "pattern-dp-1d", target: "problem-longest-increasing", relation: "applies", strength: 5 },
  { source: "pattern-dp-2d", target: "problem-unique-paths", relation: "applies", strength: 5 },
  { source: "pattern-dp-1d", target: "problem-word-break", relation: "applies", strength: 4 },
  { source: "pattern-dp-1d", target: "problem-house-robber", relation: "applies", strength: 5 },
  { source: "pattern-dp-1d", target: "problem-max-subarray", relation: "applies", strength: 4 },

  // 回溯题目
  { source: "pattern-backtrack", target: "problem-permutations", relation: "applies", strength: 5 },
  { source: "pattern-backtrack", target: "problem-subsets", relation: "applies", strength: 5 },
  { source: "pattern-backtrack", target: "problem-combination-sum", relation: "applies", strength: 5 },
  { source: "pattern-backtrack", target: "problem-n-queens", relation: "applies", strength: 5 },

  // 贪心题目
  { source: "concept-greedy-choice", target: "problem-jump-game", relation: "applies", strength: 5 },
  { source: "concept-interval-greedy", target: "problem-merge-intervals", relation: "applies", strength: 5 },

  // 堆题目
  { source: "concept-top-k", target: "problem-top-k-frequent", relation: "applies", strength: 5 },
  { source: "concept-heap-property", target: "problem-find-median", relation: "applies", strength: 5 },

  // 位运算题目
  { source: "concept-bit-operations", target: "problem-single-number", relation: "applies", strength: 5 },

  // 其他题目
  { source: "tech-prefix-sum", target: "problem-product-except-self", relation: "applies", strength: 5 },

  // ========== 题目关联（进阶、相似）==========
  // 哈希表系列
  { source: "problem-two-sum", target: "problem-three-sum", relation: "extends", strength: 5, description: "从两数到三数" },
  { source: "problem-two-sum", target: "problem-valid-anagram", relation: "similar", strength: 3, description: "都用哈希计数" },
  { source: "problem-valid-anagram", target: "problem-group-anagrams", relation: "extends", strength: 5, description: "从判断到分组" },

  // 双指针系列
  { source: "problem-container-water", target: "problem-trapping-rain-water", relation: "extends", strength: 5, description: "接水问题进阶" },
  { source: "problem-merge-sorted-array", target: "problem-merge-two-lists", relation: "similar", strength: 4, description: "合并思想" },

  // 滑动窗口系列
  { source: "problem-longest-substring", target: "problem-min-window", relation: "extends", strength: 5, description: "窗口问题进阶" },

  // 二分系列
  { source: "problem-binary-search", target: "problem-find-first-last", relation: "extends", strength: 5, description: "边界二分" },
  { source: "problem-binary-search", target: "problem-search-rotated", relation: "extends", strength: 4, description: "变体二分" },

  // 栈系列
  { source: "problem-valid-parentheses", target: "problem-daily-temperatures", relation: "extends", strength: 3, description: "栈进阶到单调栈" },
  { source: "problem-daily-temperatures", target: "problem-largest-rectangle", relation: "extends", strength: 5, description: "单调栈进阶" },

  // 链表系列
  { source: "problem-reverse-list", target: "problem-linked-list-cycle", relation: "similar", strength: 3, description: "链表基础" },
  { source: "problem-merge-two-lists", target: "problem-lru-cache", relation: "extends", strength: 4, description: "链表应用" },

  // 树系列
  { source: "problem-max-depth", target: "problem-invert-tree", relation: "similar", strength: 4, description: "树递归基础" },
  { source: "problem-invert-tree", target: "problem-validate-bst", relation: "extends", strength: 3, description: "树递归进阶" },
  { source: "problem-validate-bst", target: "problem-lowest-common-ancestor", relation: "extends", strength: 4, description: "树递归综合" },
  { source: "problem-level-order", target: "problem-max-depth", relation: "similar", strength: 3, description: "BFS vs DFS" },

  // 图系列
  { source: "problem-num-islands", target: "problem-clone-graph", relation: "similar", strength: 4, description: "图遍历" },
  { source: "problem-num-islands", target: "problem-course-schedule", relation: "extends", strength: 3, description: "到拓扑排序" },

  // DP 系列
  { source: "problem-climbing-stairs", target: "problem-house-robber", relation: "extends", strength: 5, description: "DP 入门进阶" },
  { source: "problem-house-robber", target: "problem-coin-change", relation: "extends", strength: 4, description: "到完全背包" },
  { source: "problem-unique-paths", target: "problem-coin-change", relation: "similar", strength: 3, description: "路径 vs 背包" },
  { source: "problem-climbing-stairs", target: "problem-longest-increasing", relation: "extends", strength: 3, description: "到 LIS" },
  { source: "problem-max-subarray", target: "problem-house-robber", relation: "similar", strength: 4, description: "线性 DP" },

  // 回溯系列
  { source: "problem-subsets", target: "problem-permutations", relation: "extends", strength: 5, description: "子集到排列" },
  { source: "problem-subsets", target: "problem-combination-sum", relation: "extends", strength: 5, description: "子集到组合" },
  { source: "problem-permutations", target: "problem-n-queens", relation: "extends", strength: 4, description: "排列到约束" },

  // 贪心系列
  { source: "problem-jump-game", target: "problem-merge-intervals", relation: "similar", strength: 3, description: "贪心思想" },

  // 跨类别关联
  { source: "problem-lru-cache", target: "problem-top-k-frequent", relation: "similar", strength: 3, description: "数据结构设计" },
  { source: "problem-trapping-rain-water", target: "problem-largest-rectangle", relation: "similar", strength: 4, description: "单调栈应用" },
];

// ============================================================================
// 学习路径 - 系统化算法学习路线
// ============================================================================
const learningPaths: LearningPath[] = [
  {
    id: "path-absolute-beginner",
    name: "零基础入门",
    description: "从最简单的数组操作开始，建立算法基础",
    targetSkills: ["数组操作", "哈希查找", "基础遍历"],
    nodes: [
      "cat-array", "problem-two-sum", "cat-hash", "concept-two-sum",
      "tech-hash-count", "problem-valid-anagram", "problem-merge-sorted-array"
    ],
    estimatedTime: 60,
    difficulty: "beginner",
  },
  {
    id: "path-hash-basics",
    name: "哈希表入门",
    description: "掌握哈希表的基本用法，从两数之和到字母异位词",
    targetSkills: ["哈希查找", "哈希计数", "补数思想", "分组技巧"],
    nodes: [
      "cat-hash", "concept-two-sum", "concept-complement", "concept-hash-grouping",
      "tech-hash-index", "tech-hash-count", "pattern-two-sum",
      "problem-two-sum", "problem-valid-anagram", "problem-group-anagrams"
    ],
    estimatedTime: 120,
    difficulty: "beginner",
  },
  {
    id: "path-two-pointers",
    name: "双指针技巧",
    description: "从基础双指针到滑动窗口的完整进阶",
    targetSkills: ["对撞指针", "快慢指针", "滑动窗口"],
    nodes: [
      "cat-two-pointers", "concept-collision", "concept-fast-slow",
      "pattern-two-pointers", "problem-container-water", "problem-three-sum",
      "cat-sliding-window", "concept-window-size", "tech-shrink-window",
      "pattern-sliding-window", "problem-longest-substring", "problem-min-window"
    ],
    estimatedTime: 180,
    difficulty: "intermediate",
  },
  {
    id: "path-binary-search-mastery",
    name: "二分查找精通",
    description: "从基础二分到二分答案的完整进阶",
    targetSkills: ["基础二分", "边界查找", "二分答案"],
    nodes: [
      "cat-binary-search", "concept-binary-boundary", "concept-binary-answer",
      "tech-binary-left-bound", "tech-binary-right-bound", "pattern-binary-search",
      "problem-binary-search", "problem-find-first-last", "problem-search-rotated"
    ],
    estimatedTime: 120,
    difficulty: "intermediate",
  },
  {
    id: "path-stack-queue",
    name: "栈与队列",
    description: "掌握栈的LIFO特性和单调栈技巧",
    targetSkills: ["括号匹配", "单调栈", "表达式求值"],
    nodes: [
      "cat-stack", "concept-lifo", "concept-bracket-match", "concept-monotonic-stack",
      "pattern-monotonic-stack", "problem-valid-parentheses",
      "problem-daily-temperatures", "problem-largest-rectangle"
    ],
    estimatedTime: 150,
    difficulty: "intermediate",
  },
  {
    id: "path-linked-list",
    name: "链表专题",
    description: "链表操作技巧和经典问题",
    targetSkills: ["链表反转", "快慢指针", "虚拟头节点"],
    nodes: [
      "cat-linked-list", "concept-dummy-head", "concept-reverse-list", "concept-fast-slow",
      "problem-reverse-list", "problem-linked-list-cycle",
      "problem-merge-two-lists", "problem-lru-cache"
    ],
    estimatedTime: 120,
    difficulty: "intermediate",
  },
  {
    id: "path-tree-fundamentals",
    name: "二叉树基础",
    description: "树的递归思维和遍历方式",
    targetSkills: ["树的递归", "DFS遍历", "BFS遍历"],
    nodes: [
      "cat-tree", "concept-tree-recursion", "concept-tree-traversal", "concept-bfs-level",
      "pattern-tree-dfs", "pattern-tree-bfs",
      "problem-max-depth", "problem-invert-tree", "problem-level-order"
    ],
    estimatedTime: 120,
    difficulty: "intermediate",
  },
  {
    id: "path-tree-advanced",
    name: "二叉树进阶",
    description: "BST性质和复杂树问题",
    targetSkills: ["BST验证", "公共祖先", "树的构建"],
    nodes: [
      "cat-tree", "problem-validate-bst", "problem-lowest-common-ancestor"
    ],
    estimatedTime: 90,
    difficulty: "advanced",
  },
  {
    id: "path-graph-basics",
    name: "图的遍历",
    description: "图的DFS和BFS基础应用",
    targetSkills: ["图的表示", "DFS遍历", "BFS遍历", "拓扑排序"],
    nodes: [
      "cat-graph", "concept-graph-dfs", "concept-graph-bfs", "concept-topological",
      "pattern-graph-dfs", "pattern-graph-bfs",
      "problem-num-islands", "problem-clone-graph", "problem-course-schedule"
    ],
    estimatedTime: 180,
    difficulty: "advanced",
  },
  {
    id: "path-dp-beginner",
    name: "动态规划入门",
    description: "理解状态定义和转移方程",
    targetSkills: ["状态定义", "转移方程", "空间优化"],
    nodes: [
      "cat-dp", "concept-dp-state", "concept-dp-transition", "concept-dp-space-opt",
      "pattern-dp-1d", "problem-climbing-stairs", "problem-house-robber", "problem-max-subarray"
    ],
    estimatedTime: 180,
    difficulty: "intermediate",
  },
  {
    id: "path-dp-advanced",
    name: "动态规划进阶",
    description: "背包问题、LIS、路径DP等经典问题",
    targetSkills: ["完全背包", "LIS问题", "路径DP"],
    nodes: [
      "cat-dp", "concept-dp-path", "concept-dp-subsequence",
      "pattern-dp-2d", "problem-coin-change", "problem-longest-increasing",
      "problem-unique-paths", "problem-word-break"
    ],
    estimatedTime: 240,
    difficulty: "advanced",
  },
  {
    id: "path-backtracking",
    name: "回溯算法",
    description: "排列组合和约束满足问题",
    targetSkills: ["回溯模板", "排列组合", "剪枝优化"],
    nodes: [
      "cat-backtracking", "concept-backtrack-template", "concept-pruning",
      "pattern-backtrack",
      "problem-subsets", "problem-permutations", "problem-combination-sum", "problem-n-queens"
    ],
    estimatedTime: 180,
    difficulty: "intermediate",
  },
  {
    id: "path-greedy",
    name: "贪心算法",
    description: "贪心选择和区间问题",
    targetSkills: ["贪心选择", "区间调度"],
    nodes: [
      "cat-greedy", "concept-greedy-choice", "concept-interval-greedy",
      "problem-jump-game", "problem-merge-intervals"
    ],
    estimatedTime: 90,
    difficulty: "intermediate",
  },
  {
    id: "path-heap",
    name: "堆与优先队列",
    description: "Top K问题和数据流问题",
    targetSkills: ["堆操作", "Top K", "对顶堆"],
    nodes: [
      "cat-heap", "concept-heap-property", "concept-top-k",
      "problem-top-k-frequent", "problem-find-median"
    ],
    estimatedTime: 90,
    difficulty: "intermediate",
  },
  {
    id: "path-frontend-essential",
    name: "前端算法必会",
    description: "前端开发中最常用的算法问题",
    targetSkills: ["哈希应用", "树的遍历", "链表操作", "二分查找"],
    nodes: [
      "problem-two-sum", "problem-valid-parentheses", "problem-lru-cache",
      "problem-merge-intervals", "problem-binary-search",
      "problem-invert-tree", "problem-level-order", "problem-num-islands"
    ],
    estimatedTime: 240,
    difficulty: "intermediate",
  },
  {
    id: "path-interview-top-20",
    name: "面试高频20题",
    description: "面试出现频率最高的20道题目",
    targetSkills: ["综合应用"],
    nodes: [
      "problem-two-sum", "problem-three-sum", "problem-longest-substring",
      "problem-valid-parentheses", "problem-merge-two-lists", "problem-reverse-list",
      "problem-max-depth", "problem-level-order", "problem-validate-bst",
      "problem-num-islands", "problem-climbing-stairs", "problem-coin-change",
      "problem-house-robber", "problem-permutations", "problem-subsets",
      "problem-binary-search", "problem-merge-intervals", "problem-lru-cache",
      "problem-max-subarray", "problem-trapping-rain-water"
    ],
    estimatedTime: 600,
    difficulty: "advanced",
  },
];

// 完整的知识图谱
export const algorithmKnowledgeGraph: KnowledgeGraph = {
  nodes: coreNodes,
  edges: coreEdges,
  learningPaths,
};

// 获取与特定题目相关的知识节点
export function getRelatedKnowledge(problemId: string): {
  centerNode: KnowledgeNode | null;
  relatedNodes: KnowledgeNode[];
  edges: KnowledgeEdge[];
} {
  const problemNode = coreNodes.find(n => n.problemId === problemId);
  if (!problemNode) {
    return { centerNode: null, relatedNodes: [], edges: [] };
  }

  const relatedEdges = coreEdges.filter(
    e => e.source === problemNode.id || e.target === problemNode.id
  );

  const relatedNodeIds = new Set<string>();
  relatedEdges.forEach(e => {
    relatedNodeIds.add(e.source);
    relatedNodeIds.add(e.target);
  });
  relatedNodeIds.delete(problemNode.id);

  const relatedNodes = coreNodes.filter(n => relatedNodeIds.has(n.id));

  return {
    centerNode: problemNode,
    relatedNodes,
    edges: relatedEdges,
  };
}

// 获取学习路径
export function getLearningPathById(pathId: string): LearningPath | undefined {
  return learningPaths.find(p => p.id === pathId);
}

// 获取所有学习路径
export function getAllLearningPaths(): LearningPath[] {
  return learningPaths;
}
