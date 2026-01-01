/**
 * 解题模板数据 - 动态规划模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const dpLinearTemplate: AlgorithmTemplate = {
  id: "dp-linear",
  name: "一维动态规划",
  category: "动态规划",
  description: "用一维数组记录状态，适用于线性序列问题",
  difficulty: "medium",

  recognitionPatterns: {
    keywords: ["最大", "最小", "最长", "方案数", "能否达到", "最优"],
    dataStructures: ["数组", "字符串"],
    problemTypes: ["爬楼梯", "打家劫舍", "最大子数组", "硬币找零"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "定义状态",
      description: "确定 dp[i] 表示什么含义",
      question: "dp[i] 应该表示什么？前 i 个元素的结果？以第 i 个元素结尾的结果？",
      example: "dp[i] = 爬到第 i 阶楼梯的方法数",
    },
    {
      step: 2,
      title: "找状态转移方程",
      description: "确定 dp[i] 如何从之前的状态推导出来",
      question: "dp[i] 和哪些之前的状态有关？关系是什么？",
      example: "dp[i] = dp[i-1] + dp[i-2]",
    },
    {
      step: 3,
      title: "确定初始值",
      description: "确定最基础的状态值",
      question: "dp[0]、dp[1] 等基础情况是什么？",
      example: "dp[0] = 1, dp[1] = 1",
    },
    {
      step: 4,
      title: "确定遍历顺序",
      description: "确保计算 dp[i] 时所依赖的状态已经计算过",
      question: "应该从前往后还是从后往前遍历？",
    },
    {
      step: 5,
      title: "返回结果",
      description: "根据状态定义确定返回哪个值",
    },
  ],

  codeTemplate: {
    typescript: `function dp(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  // 1. 定义 dp 数组
  const dp = new Array(n).fill(0);

  // 2. 初始化
  dp[0] = nums[0];

  // 3. 状态转移
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  // 4. 返回结果
  return dp[n - 1];
}`,
    comments: `function dp(nums: number[]): number {
  const n = nums.length;
  if (n === 0) return 0;

  // 1. 定义 dp 数组
  // dp[i] 表示考虑前 i 个元素能获得的最大值
  const dp = new Array(n).fill(0);

  // 2. 初始化边界情况
  dp[0] = nums[0];  // 只有一个元素时

  // 3. 状态转移
  // 对于第 i 个元素，有两种选择：
  // - 不选：dp[i] = dp[i-1]
  // - 选：dp[i] = dp[i-2] + nums[i]（不能选相邻的）
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(
      dp[i - 1],                    // 不选当前元素
      (i >= 2 ? dp[i - 2] : 0) + nums[i]  // 选当前元素
    );
  }

  // 4. 返回结果
  return dp[n - 1];
}`,
  },

  applicableProblems: [
    "climbing-stairs",
    "house-robber",
    "maximum-subarray",
    "coin-change",
    "longest-increasing-subsequence",
  ],

  commonMistakes: [
    {
      title: "状态定义不清晰",
      explanation: "dp[i] 的含义必须明确：是「前 i 个」还是「以第 i 个结尾」，这决定了转移方程和最终答案",
      frequency: "high",
    },
    {
      title: "边界条件遗漏",
      explanation: "数组为空、只有一个元素等边界情况需要特殊处理",
      frequency: "medium",
    },
    {
      title: "转移顺序错误",
      explanation: "计算 dp[i] 时，它依赖的状态必须已经计算过",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(n) 或 O(1)",
    explanation: "遍历一次数组，空间可以通过滚动数组优化到 O(1)",
  },

  coreExplanation: {
    whatIs: "动态规划将大问题分解为子问题，通过保存子问题的解避免重复计算",
    whyUse: "当问题具有「最优子结构」和「重叠子问题」特性时，DP 比暴力递归更高效",
    howItWorks: "从最小的子问题开始，逐步构建更大问题的解，每一步都利用之前的计算结果",
    visualMetaphor: "就像爬楼梯，先知道爬 1 阶和 2 阶的方法数，就能推出爬 3 阶的方法数",
  },

  variants: [
    {
      id: "space-optimized",
      name: "空间优化版本",
      description: "用两个变量代替数组",
      useCase: "当 dp[i] 只依赖前面固定个状态时",
      codeSnippet: `let prev2 = 0, prev1 = nums[0];
for (let i = 1; i < n; i++) {
  const curr = Math.max(prev1, prev2 + nums[i]);
  prev2 = prev1;
  prev1 = curr;
}
return prev1;`,
      exampleProblem: "house-robber",
    },
    {
      id: "kadane",
      name: "Kadane 算法",
      description: "求最大子数组和的特殊形式",
      useCase: "当需要找连续子数组的最大和时",
      codeSnippet: `let maxSum = nums[0], currentSum = nums[0];
for (let i = 1; i < nums.length; i++) {
  currentSum = Math.max(nums[i], currentSum + nums[i]);
  maxSum = Math.max(maxSum, currentSum);
}
return maxSum;`,
      exampleProblem: "maximum-subarray",
    },
  ],

  animation: {
    type: "dp",
    title: "打家劫舍 DP 过程",
    description: "演示如何用 DP 求解打家劫舍问题",
    exampleInput: {
      description: "房屋金额 [2, 7, 9, 3, 1]，求最大收益",
      data: { nums: [2, 7, 9, 3, 1] },
    },
    steps: [
      {
        array: [2, 7, 9, 3, 1],
        dp: [2, 0, 0, 0, 0],
        current: 0,
        description: "初始化：dp[0] = 2（只有第一间房）",
        variables: { dp0: 2 },
      },
      {
        array: [2, 7, 9, 3, 1],
        dp: [2, 7, 0, 0, 0],
        current: 1,
        description: "dp[1] = max(dp[0], nums[1]) = max(2, 7) = 7",
        variables: { dp1: 7 },
      },
      {
        array: [2, 7, 9, 3, 1],
        dp: [2, 7, 11, 0, 0],
        current: 2,
        description: "dp[2] = max(dp[1], dp[0]+nums[2]) = max(7, 2+9) = 11",
        variables: { dp2: 11 },
      },
      {
        array: [2, 7, 9, 3, 1],
        dp: [2, 7, 11, 11, 0],
        current: 3,
        description: "dp[3] = max(dp[2], dp[1]+nums[3]) = max(11, 7+3) = 11",
        variables: { dp3: 11 },
      },
      {
        array: [2, 7, 9, 3, 1],
        dp: [2, 7, 11, 11, 12],
        current: 4,
        completed: [4],
        description: "dp[4] = max(dp[3], dp[2]+nums[4]) = max(11, 11+1) = 12",
        variables: { result: 12 },
      },
    ],
  },
};
