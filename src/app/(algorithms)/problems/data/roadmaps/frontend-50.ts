/**
 * 前端工程师必刷50题学习路线
 *
 * 设计理念：
 * 1. 从易到难，循序渐进
 * 2. 每个阶段聚焦特定类型
 * 3. 题目关联前端实际场景
 * 4. 包含解题模板引导
 */

import { LearningPath } from "../../types/roadmap";

export const frontend50Path: LearningPath = {
  id: "frontend-50",
  name: "前端工程师必刷50题",
  description: "专为前端工程师设计的算法学习路线，涵盖面试高频题目和实际开发场景",
  icon: "🎯",
  totalProblems: 50,
  estimatedWeeks: 8,
  difficulty: "beginner",
  targetAudience: [
    "准备前端面试的工程师",
    "想提升算法能力的前端开发者",
    "转行前端的程序员",
  ],
  prerequisites: [
    "JavaScript/TypeScript 基础语法",
    "基本数据结构概念（数组、对象）",
    "了解时间复杂度概念",
  ],
  stages: [
    // ==================== 第一阶段：基础入门 ====================
    {
      id: "stage-1-foundation",
      name: "基础入门",
      description: "掌握最基本的算法思想：哈希表和双指针，这两种技巧可以解决80%的数组问题",
      icon: "🏗️",
      order: 1,
      unlockCondition: { type: "always" },
      days: [
        {
          id: "day-1",
          title: "Day 1：哈希表入门",
          description: "学习使用 Map/Set 优化查找，O(1) 时间复杂度的魔法",
          order: 1,
          estimatedMinutes: 60,
          knowledgePoints: ["哈希表原理", "Map/Set 用法", "空间换时间"],
          tips: [
            "前端场景：数据去重、快速查找、缓存实现",
            "记住：当需要频繁查找时，优先考虑哈希表",
          ],
          problems: [
            {
              problemId: "two-sum",
              isCore: true,
              order: 1,
              hint: "用 Map 存储已遍历的值，实现 O(1) 查找",
              relatedTemplate: "hash-lookup",
            },
            {
              problemId: "contains-duplicate",
              isCore: true,
              order: 2,
              hint: "Set 天然去重，一行代码搞定",
            },
            {
              problemId: "valid-anagram",
              isCore: false,
              order: 3,
              hint: "用对象记录字符频率，比较两个频率表",
            },
          ],
        },
        {
          id: "day-2",
          title: "Day 2：双指针基础",
          description: "学习使用两个指针从两端向中间遍历，优化时间复杂度",
          order: 2,
          estimatedMinutes: 60,
          knowledgePoints: ["对撞指针", "快慢指针", "指针移动条件"],
          tips: [
            "前端场景：表单校验（回文检测）、数组处理",
            "关键：确定指针移动的条件和终止条件",
          ],
          problems: [
            {
              problemId: "valid-palindrome",
              isCore: true,
              order: 1,
              hint: "左右指针向中间移动，跳过非字母数字字符",
              relatedTemplate: "two-pointers-opposite",
            },
            {
              problemId: "reverse-string",
              isCore: true,
              order: 2,
              hint: "经典对撞指针，交换两端元素",
            },
            {
              problemId: "merge-sorted-array",
              isCore: false,
              order: 3,
              hint: "逆向思维：从后往前填充，避免覆盖",
            },
          ],
        },
        {
          id: "day-3",
          title: "Day 3：双指针进阶",
          description: "处理更复杂的双指针场景，包括三数之和等经典问题",
          order: 3,
          estimatedMinutes: 90,
          knowledgePoints: ["排序预处理", "去重技巧", "边界处理"],
          tips: [
            "三数之和是面试高频题，必须掌握",
            "注意去重逻辑，避免重复答案",
          ],
          problems: [
            {
              problemId: "container-with-most-water",
              isCore: true,
              order: 1,
              hint: "贪心 + 双指针，每次移动较短的那一边",
              relatedTemplate: "two-pointers-greedy",
            },
            {
              problemId: "3sum",
              isCore: true,
              order: 2,
              hint: "排序 + 固定一个数 + 双指针找另外两个数",
            },
          ],
        },
      ],
    },

    // ==================== 第二阶段：数组与字符串 ====================
    {
      id: "stage-2-array-string",
      name: "数组与字符串",
      description: "深入掌握数组操作技巧，包括滑动窗口、前缀和等高级技巧",
      icon: "📝",
      order: 2,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-1-foundation",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-4",
          title: "Day 4：滑动窗口入门",
          description: "学习滑动窗口技巧，解决子串/子数组问题",
          order: 1,
          estimatedMinutes: 90,
          knowledgePoints: ["固定窗口", "可变窗口", "窗口扩展与收缩"],
          tips: [
            "前端场景：防抖节流的底层思想、日志分析",
            "关键：何时扩展窗口，何时收缩窗口",
          ],
          problems: [
            {
              problemId: "longest-substring-without-repeating-characters",
              isCore: true,
              order: 1,
              hint: "可变窗口 + Set 记录窗口内字符",
              relatedTemplate: "sliding-window-variable",
            },
            {
              problemId: "minimum-window-substring",
              isCore: true,
              order: 2,
              hint: "经典滑动窗口，用 Map 记录字符需求",
            },
          ],
        },
        {
          id: "day-5",
          title: "Day 5：数组技巧",
          description: "掌握常见的数组处理技巧",
          order: 2,
          estimatedMinutes: 60,
          knowledgePoints: ["原地修改", "前缀和", "差分数组"],
          tips: [
            "前端场景：列表数据处理、表格计算",
            "原地修改可以节省空间，但要注意不破坏原数据",
          ],
          problems: [
            {
              problemId: "remove-duplicates-from-sorted-array",
              isCore: true,
              order: 1,
              hint: "快慢指针，慢指针记录不重复元素位置",
            },
            {
              problemId: "move-zeroes",
              isCore: true,
              order: 2,
              hint: "双指针原地交换，保持非零元素相对顺序",
            },
            {
              problemId: "rotate-array",
              isCore: false,
              order: 3,
              hint: "三次反转法，空间 O(1)",
            },
          ],
        },
        {
          id: "day-6",
          title: "Day 6：字符串处理",
          description: "掌握字符串常见算法",
          order: 3,
          estimatedMinutes: 60,
          knowledgePoints: ["字符串匹配", "字符计数", "字符串转换"],
          tips: [
            "前端场景：富文本处理、模板解析、URL解析",
            "JavaScript 字符串是不可变的，注意性能",
          ],
          problems: [
            {
              problemId: "longest-common-prefix",
              isCore: true,
              order: 1,
              hint: "纵向比较或分治法",
            },
            {
              problemId: "group-anagrams",
              isCore: true,
              order: 2,
              hint: "排序后的字符串作为 key",
            },
          ],
        },
      ],
    },

    // ==================== 第三阶段：链表与栈 ====================
    {
      id: "stage-3-linked-list-stack",
      name: "链表与栈",
      description: "掌握链表操作和栈的应用，这是前端面试的常考点",
      icon: "🔗",
      order: 3,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-2-array-string",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-7",
          title: "Day 7：链表基础",
          description: "学习链表的基本操作：反转、合并、查找",
          order: 1,
          estimatedMinutes: 90,
          knowledgePoints: ["链表遍历", "指针操作", "虚拟头节点"],
          tips: [
            "前端场景：React Fiber 链表结构、任务队列",
            "画图！画图！画图！链表题一定要画图",
          ],
          problems: [
            {
              problemId: "reverse-linked-list",
              isCore: true,
              order: 1,
              hint: "三指针法：prev、curr、next",
              relatedTemplate: "linked-list-reverse",
            },
            {
              problemId: "merge-two-sorted-lists",
              isCore: true,
              order: 2,
              hint: "虚拟头节点简化边界处理",
            },
            {
              problemId: "linked-list-cycle",
              isCore: true,
              order: 3,
              hint: "快慢指针，快指针每次走两步",
            },
          ],
        },
        {
          id: "day-8",
          title: "Day 8：链表进阶",
          description: "处理更复杂的链表问题",
          order: 2,
          estimatedMinutes: 90,
          knowledgePoints: ["找中点", "删除节点", "重排链表"],
          tips: [
            "链表问题的关键是理清指针关系",
            "不要忘记处理边界情况：空链表、单节点",
          ],
          problems: [
            {
              problemId: "remove-nth-node-from-end-of-list",
              isCore: true,
              order: 1,
              hint: "快慢指针，快指针先走 n 步",
            },
            {
              problemId: "middle-of-the-linked-list",
              isCore: false,
              order: 2,
              hint: "快慢指针找中点",
            },
          ],
        },
        {
          id: "day-9",
          title: "Day 9：栈的应用",
          description: "学习栈在算法中的典型应用",
          order: 3,
          estimatedMinutes: 90,
          knowledgePoints: ["括号匹配", "单调栈", "栈模拟"],
          tips: [
            "前端场景：浏览器历史记录、撤销重做、表达式解析",
            "看到'最近'、'匹配'、'嵌套'就想到栈",
          ],
          problems: [
            {
              problemId: "valid-parentheses",
              isCore: true,
              order: 1,
              hint: "左括号入栈，右括号检查栈顶匹配",
              relatedTemplate: "stack-matching",
            },
            {
              problemId: "min-stack",
              isCore: true,
              order: 2,
              hint: "辅助栈记录最小值",
            },
            {
              problemId: "daily-temperatures",
              isCore: true,
              order: 3,
              hint: "单调递减栈，记录索引",
              relatedTemplate: "monotonic-stack",
            },
          ],
        },
      ],
    },

    // ==================== 第四阶段：二叉树 ====================
    {
      id: "stage-4-binary-tree",
      name: "二叉树",
      description: "掌握二叉树的遍历和常见操作，理解递归思想",
      icon: "🌳",
      order: 4,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-3-linked-list-stack",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-10",
          title: "Day 10：树的遍历",
          description: "掌握二叉树的三种遍历方式",
          order: 1,
          estimatedMinutes: 90,
          knowledgePoints: ["前序遍历", "中序遍历", "后序遍历", "层序遍历"],
          tips: [
            "前端场景：DOM树遍历、组件树渲染、虚拟DOM Diff",
            "递归是最自然的方式，但要理解迭代写法",
          ],
          problems: [
            {
              problemId: "binary-tree-inorder-traversal",
              isCore: true,
              order: 1,
              hint: "递归：左-根-右；迭代：用栈模拟",
              relatedTemplate: "tree-traversal",
            },
            {
              problemId: "binary-tree-level-order-traversal",
              isCore: true,
              order: 2,
              hint: "BFS + 队列，记录每层节点数",
            },
          ],
        },
        {
          id: "day-11",
          title: "Day 11：树的基本操作",
          description: "学习二叉树的常见操作",
          order: 2,
          estimatedMinutes: 90,
          knowledgePoints: ["递归思想", "树的深度", "对称性判断"],
          tips: [
            "树的问题大多可以用递归解决",
            "递归三要素：终止条件、本级任务、返回值",
          ],
          problems: [
            {
              problemId: "maximum-depth-of-binary-tree",
              isCore: true,
              order: 1,
              hint: "递归：max(左子树深度, 右子树深度) + 1",
            },
            {
              problemId: "symmetric-tree",
              isCore: true,
              order: 2,
              hint: "递归比较左子树和右子树的镜像关系",
            },
            {
              problemId: "invert-binary-tree",
              isCore: true,
              order: 3,
              hint: "递归交换左右子树",
            },
          ],
        },
        {
          id: "day-12",
          title: "Day 12：树的路径问题",
          description: "解决树中的路径相关问题",
          order: 3,
          estimatedMinutes: 90,
          knowledgePoints: ["路径和", "公共祖先", "路径记录"],
          tips: [
            "路径问题通常需要回溯或记录路径",
            "自底向上 vs 自顶向下的思考方式",
          ],
          problems: [
            {
              problemId: "path-sum",
              isCore: true,
              order: 1,
              hint: "递归减去当前节点值，到叶子节点判断是否为0",
            },
            {
              problemId: "lowest-common-ancestor-of-a-binary-tree",
              isCore: true,
              order: 2,
              hint: "后序遍历，自底向上找公共祖先",
            },
          ],
        },
      ],
    },

    // ==================== 第五阶段：二分查找 ====================
    {
      id: "stage-5-binary-search",
      name: "二分查找",
      description: "掌握二分查找及其变体，这是优化查找效率的利器",
      icon: "🔍",
      order: 5,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-4-binary-tree",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-13",
          title: "Day 13：二分查找基础",
          description: "掌握标准二分查找和边界处理",
          order: 1,
          estimatedMinutes: 60,
          knowledgePoints: ["标准二分", "左边界", "右边界"],
          tips: [
            "前端场景：无限滚动加载、版本号比较",
            "关键：循环条件和边界更新，推荐使用左闭右闭",
          ],
          problems: [
            {
              problemId: "binary-search",
              isCore: true,
              order: 1,
              hint: "标准二分模板，注意边界条件",
              relatedTemplate: "binary-search-basic",
            },
            {
              problemId: "search-insert-position",
              isCore: true,
              order: 2,
              hint: "找第一个 >= target 的位置",
            },
          ],
        },
        {
          id: "day-14",
          title: "Day 14：二分查找变体",
          description: "处理更复杂的二分场景",
          order: 2,
          estimatedMinutes: 90,
          knowledgePoints: ["旋转数组", "峰值查找", "答案二分"],
          tips: [
            "二分的本质是缩小搜索范围",
            "只要能判断答案在左半边还是右半边，就能用二分",
          ],
          problems: [
            {
              problemId: "search-in-rotated-sorted-array",
              isCore: true,
              order: 1,
              hint: "先判断哪半边有序，再判断target在哪边",
            },
            {
              problemId: "find-minimum-in-rotated-sorted-array",
              isCore: true,
              order: 2,
              hint: "与右端点比较，确定最小值在哪边",
            },
          ],
        },
      ],
    },

    // ==================== 第六阶段：动态规划 ====================
    {
      id: "stage-6-dp",
      name: "动态规划入门",
      description: "学习动态规划的基本思想，从简单问题开始",
      icon: "📊",
      order: 6,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-5-binary-search",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-15",
          title: "Day 15：动态规划入门",
          description: "理解动态规划的核心思想",
          order: 1,
          estimatedMinutes: 90,
          knowledgePoints: ["状态定义", "状态转移", "初始化", "返回值"],
          tips: [
            "DP 四要素：状态、转移方程、初始化、返回值",
            "先写递归，再改记忆化，最后改成迭代",
          ],
          problems: [
            {
              problemId: "climbing-stairs",
              isCore: true,
              order: 1,
              hint: "dp[i] = dp[i-1] + dp[i-2]",
              relatedTemplate: "dp-basic",
            },
            {
              problemId: "house-robber",
              isCore: true,
              order: 2,
              hint: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
            },
          ],
        },
        {
          id: "day-16",
          title: "Day 16：经典DP问题",
          description: "练习更多经典的动态规划问题",
          order: 2,
          estimatedMinutes: 90,
          knowledgePoints: ["最长子序列", "背包问题", "路径问题"],
          tips: [
            "子序列问题通常定义 dp[i] 为以 i 结尾的最优解",
            "画出状态转移表格有助于理解",
          ],
          problems: [
            {
              problemId: "maximum-subarray",
              isCore: true,
              order: 1,
              hint: "dp[i] = max(nums[i], dp[i-1] + nums[i])",
            },
            {
              problemId: "longest-increasing-subsequence",
              isCore: true,
              order: 2,
              hint: "dp[i] = max(dp[j] + 1) 对于所有 j < i 且 nums[j] < nums[i]",
            },
            {
              problemId: "coin-change",
              isCore: true,
              order: 3,
              hint: "完全背包问题，dp[i] = min(dp[i-coin] + 1)",
            },
          ],
        },
      ],
    },

    // ==================== 第七阶段：回溯与DFS ====================
    {
      id: "stage-7-backtracking",
      name: "回溯算法",
      description: "学习回溯算法，解决排列组合等问题",
      icon: "🔄",
      order: 7,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-6-dp",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-17",
          title: "Day 17：回溯基础",
          description: "理解回溯算法的模板和思想",
          order: 1,
          estimatedMinutes: 90,
          knowledgePoints: ["回溯模板", "剪枝优化", "去重"],
          tips: [
            "回溯 = DFS + 选择 + 撤销选择",
            "画出决策树有助于理解回溯过程",
          ],
          problems: [
            {
              problemId: "subsets",
              isCore: true,
              order: 1,
              hint: "每个元素可选可不选",
              relatedTemplate: "backtracking-basic",
            },
            {
              problemId: "permutations",
              isCore: true,
              order: 2,
              hint: "全排列，用 visited 数组标记已使用元素",
            },
          ],
        },
        {
          id: "day-18",
          title: "Day 18：回溯进阶",
          description: "处理更复杂的回溯问题",
          order: 2,
          estimatedMinutes: 90,
          knowledgePoints: ["组合问题", "棋盘问题", "字符串回溯"],
          tips: [
            "组合与排列的区别：组合无序，排列有序",
            "剪枝是提高回溯效率的关键",
          ],
          problems: [
            {
              problemId: "combination-sum",
              isCore: true,
              order: 1,
              hint: "元素可重复使用，传入当前索引",
            },
            {
              problemId: "letter-combinations-of-a-phone-number",
              isCore: true,
              order: 2,
              hint: "用映射表存储数字对应的字母",
            },
          ],
        },
      ],
    },

    // ==================== 第八阶段：综合实战 ====================
    {
      id: "stage-8-practice",
      name: "综合实战",
      description: "综合运用所学知识，挑战面试真题",
      icon: "🏆",
      order: 8,
      unlockCondition: {
        type: "stage_completed",
        requiredStageId: "stage-7-backtracking",
        minCompletionRate: 0.7,
      },
      days: [
        {
          id: "day-19",
          title: "Day 19：高频面试题 (上)",
          description: "练习大厂高频面试题",
          order: 1,
          estimatedMinutes: 120,
          knowledgePoints: ["综合运用", "思路分析", "代码优化"],
          tips: [
            "面试时先和面试官沟通思路",
            "写代码时注意边界条件",
          ],
          problems: [
            {
              problemId: "lru-cache",
              isCore: true,
              order: 1,
              hint: "Map + 双向链表，或直接用 Map 的有序性",
            },
            {
              problemId: "trapping-rain-water",
              isCore: true,
              order: 2,
              hint: "双指针或单调栈",
            },
          ],
        },
        {
          id: "day-20",
          title: "Day 20：高频面试题 (下)",
          description: "继续练习大厂高频面试题",
          order: 2,
          estimatedMinutes: 120,
          knowledgePoints: ["设计问题", "系统思维", "复杂度分析"],
          tips: [
            "设计题要考虑扩展性和边界情况",
            "先实现再优化",
          ],
          problems: [
            {
              problemId: "merge-intervals",
              isCore: true,
              order: 1,
              hint: "先排序，再合并相邻区间",
            },
            {
              problemId: "top-k-frequent-elements",
              isCore: true,
              order: 2,
              hint: "哈希表计数 + 堆或桶排序",
            },
          ],
        },
      ],
    },
  ],
};

// 导出所有学习路线
export const learningPaths: LearningPath[] = [frontend50Path];

// 根据ID获取学习路线
export function getLearningPathById(id: string): LearningPath | undefined {
  return learningPaths.find((path) => path.id === id);
}

// 获取某个阶段的所有题目ID
export function getStageProblems(path: LearningPath, stageId: string): string[] {
  const stage = path.stages.find((s) => s.id === stageId);
  if (!stage) return [];

  return stage.days.flatMap((day) =>
    day.problems.map((p) => p.problemId)
  );
}

// 获取学习路线的所有题目ID
export function getAllPathProblems(path: LearningPath): string[] {
  return path.stages.flatMap((stage) =>
    stage.days.flatMap((day) =>
      day.problems.map((p) => p.problemId)
    )
  );
}

// 计算路线进度
export function calculatePathProgress(
  path: LearningPath,
  completedProblems: string[]
): {
  total: number;
  completed: number;
  percentage: number;
  stageProgress: { stageId: string; stageName: string; completed: number; total: number }[];
} {
  const allProblems = getAllPathProblems(path);
  const completedSet = new Set(completedProblems);

  const stageProgress = path.stages.map((stage) => {
    const stageProblems = getStageProblems(path, stage.id);
    return {
      stageId: stage.id,
      stageName: stage.name,
      completed: stageProblems.filter((p) => completedSet.has(p)).length,
      total: stageProblems.length,
    };
  });

  const completed = allProblems.filter((p) => completedSet.has(p)).length;

  return {
    total: allProblems.length,
    completed,
    percentage: Math.round((completed / allProblems.length) * 100),
    stageProgress,
  };
}
