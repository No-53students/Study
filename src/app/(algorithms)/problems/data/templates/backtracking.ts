/**
 * 解题模板数据 - 回溯模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const backtrackingTemplate: AlgorithmTemplate = {
  id: "backtracking",
  name: "回溯算法",
  category: "回溯",
  description: "通过递归尝试所有可能的选择，当发现当前选择无法得到解时回退并尝试其他选择",
  difficulty: "medium",

  recognitionPatterns: {
    keywords: ["排列", "组合", "子集", "全部", "所有可能", "路径"],
    dataStructures: ["数组", "字符串"],
    problemTypes: ["排列问题", "组合问题", "子集问题", "棋盘问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "定义路径和选择列表",
      description: "确定当前已做的选择（路径）和可供选择的元素（选择列表）",
      question: "什么是「路径」？什么是「选择列表」？",
    },
    {
      step: 2,
      title: "确定结束条件",
      description: "确定何时将当前路径加入结果集",
      question: "什么时候应该停止递归并保存结果？",
    },
    {
      step: 3,
      title: "做选择",
      description: "从选择列表中选一个元素加入路径",
      question: "如何避免重复选择？",
    },
    {
      step: 4,
      title: "递归",
      description: "进入下一层决策树",
    },
    {
      step: 5,
      title: "撤销选择",
      description: "回退到上一个状态，尝试其他选择",
      question: "撤销选择时需要恢复哪些状态？",
    },
  ],

  codeTemplate: {
    typescript: `function backtrack(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);

  function dfs(start: number) {
    // 结束条件
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = start; i < nums.length; i++) {
      // 剪枝：跳过已使用的元素
      if (used[i]) continue;

      // 做选择
      path.push(nums[i]);
      used[i] = true;

      // 递归
      dfs(i + 1);

      // 撤销选择
      path.pop();
      used[i] = false;
    }
  }

  dfs(0);
  return result;
}`,
    comments: `function backtrack(nums: number[]): number[][] {
  const result: number[][] = [];  // 存放所有结果
  const path: number[] = [];       // 当前路径（已做的选择）
  const used = new Array(nums.length).fill(false);  // 标记已使用的元素

  function dfs(start: number) {
    // 1. 结束条件：路径长度达到目标时，保存结果
    if (path.length === nums.length) {
      result.push([...path]);  // 注意要拷贝
      return;
    }

    // 2. 遍历选择列表
    for (let i = start; i < nums.length; i++) {
      // 3. 剪枝：跳过不合法的选择
      if (used[i]) continue;

      // 4. 做选择
      path.push(nums[i]);
      used[i] = true;

      // 5. 递归进入下一层
      dfs(i + 1);

      // 6. 撤销选择（回溯）
      path.pop();
      used[i] = false;
    }
  }

  dfs(0);
  return result;
}`,
  },

  applicableProblems: [
    "subsets",
    "permutations",
    "combination-sum",
    "combinations",
    "palindrome-partitioning",
    "n-queens",
  ],

  commonMistakes: [
    {
      title: "忘记撤销选择",
      explanation: "做选择后进入递归，递归返回后必须撤销选择，否则会影响后续的搜索",
      frequency: "high",
    },
    {
      title: "结果拷贝问题",
      wrongCode: "result.push(path);",
      rightCode: "result.push([...path]);",
      explanation: "path 是引用类型，需要拷贝一份，否则后续修改会影响已保存的结果",
      frequency: "high",
    },
    {
      title: "重复元素处理",
      explanation: "当输入有重复元素时，需要先排序，然后跳过相同的相邻元素",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n! 或 2^n)",
    space: "O(n)",
    explanation: "时间复杂度取决于解的数量，空间主要是递归栈和路径的深度",
  },

  coreExplanation: {
    whatIs: "回溯是一种通过穷举来搜索解的算法，当发现当前路径不能得到解时会「回头」尝试其他路径",
    whyUse: "当问题需要穷举所有可能的解，且解可以表示为一系列选择时使用",
    howItWorks: "递归地做选择、探索、撤销选择，形成一棵决策树，遍历所有分支",
    visualMetaphor: "就像走迷宫，走到死胡同就退回上一个路口，尝试其他方向",
  },

  variants: [
    {
      id: "subsets",
      name: "子集问题",
      description: "在每个位置选择「选」或「不选」",
      useCase: "求所有子集、组合",
      codeSnippet: `function dfs(start: number) {
  result.push([...path]);  // 每个节点都是一个子集
  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    dfs(i + 1);
    path.pop();
  }
}`,
      exampleProblem: "subsets",
    },
    {
      id: "permutations",
      name: "排列问题",
      description: "用 visited 数组标记已选元素",
      useCase: "求所有排列",
      codeSnippet: `function dfs() {
  if (path.length === nums.length) {
    result.push([...path]);
    return;
  }
  for (let i = 0; i < nums.length; i++) {
    if (used[i]) continue;
    used[i] = true;
    path.push(nums[i]);
    dfs();
    path.pop();
    used[i] = false;
  }
}`,
      exampleProblem: "permutations",
    },
  ],

  animation: {
    type: "tree",
    title: "子集生成过程",
    description: "演示回溯算法如何生成 [1,2,3] 的所有子集",
    exampleInput: {
      description: "数组 [1, 2, 3]，生成所有子集",
      data: { nums: [1, 2, 3] },
    },
    steps: [
      {
        array: [1, 2, 3],
        current: -1,
        description: "开始：path=[]，加入结果",
        variables: { path: [], result: [[]] },
      },
      {
        array: [1, 2, 3],
        current: 0,
        description: "选择 1：path=[1]，加入结果",
        variables: { path: [1], result: [[], [1]] },
      },
      {
        array: [1, 2, 3],
        current: 1,
        description: "选择 2：path=[1,2]，加入结果",
        variables: { path: [1, 2], result: [[], [1], [1, 2]] },
      },
      {
        array: [1, 2, 3],
        current: 2,
        description: "选择 3：path=[1,2,3]，加入结果",
        variables: { path: [1, 2, 3], result: [[], [1], [1, 2], [1, 2, 3]] },
      },
      {
        array: [1, 2, 3],
        current: 1,
        description: "回溯：撤销 3，path=[1,2]",
        variables: { path: [1, 2] },
      },
    ],
  },
};
