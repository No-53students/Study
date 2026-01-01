/**
 * 解题模板数据 - 二分查找模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const binarySearchTemplate: AlgorithmTemplate = {
  id: "binary-search-standard",
  name: "标准二分查找",
  category: "二分查找",
  description: "在有序数组中高效查找目标值或边界的经典算法",
  difficulty: "easy",

  recognitionPatterns: {
    keywords: ["有序", "排序", "查找", "搜索", "O(log n)", "二分"],
    dataStructures: ["有序数组"],
    problemTypes: ["精确查找", "边界查找", "旋转数组"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定搜索范围",
      description: "初始化 left 和 right 边界",
      question: "搜索范围是 [left, right] 还是 [left, right)？",
      example: "let left = 0, right = nums.length - 1;",
    },
    {
      step: 2,
      title: "计算中点",
      description: "计算中间位置，避免整数溢出",
      question: "如何防止 (left + right) 溢出？",
      example: "const mid = left + Math.floor((right - left) / 2);",
    },
    {
      step: 3,
      title: "比较与缩小范围",
      description: "根据中点值与目标的比较结果缩小搜索范围",
      question: "找到目标时是否需要继续搜索？",
    },
    {
      step: 4,
      title: "处理结果",
      description: "循环结束后返回结果或处理未找到的情况",
    },
  ],

  codeTemplate: {
    typescript: `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}`,
    comments: `function binarySearch(nums: number[], target: number): number {
  // 1. 定义搜索区间 [left, right]（闭区间）
  let left = 0;
  let right = nums.length - 1;

  // 2. 循环条件：区间不为空
  while (left <= right) {
    // 3. 计算中点（防溢出写法）
    const mid = left + Math.floor((right - left) / 2);

    // 4. 根据比较结果缩小区间
    if (nums[mid] === target) {
      // 找到目标，直接返回
      return mid;
    } else if (nums[mid] < target) {
      // 目标在右半部分，排除左半部分
      left = mid + 1;
    } else {
      // 目标在左半部分，排除右半部分
      right = mid - 1;
    }
  }

  // 5. 未找到目标
  return -1;
}`,
  },

  applicableProblems: [
    "binary-search",
    "search-in-rotated-sorted-array",
    "find-first-and-last-position-of-element-in-sorted-array",
    "search-insert-position",
    "find-minimum-in-rotated-sorted-array",
  ],

  commonMistakes: [
    {
      title: "循环条件与边界更新不匹配",
      wrongCode: "while (left < right) { right = mid - 1; }",
      rightCode: "while (left <= right) { right = mid - 1; }",
      explanation: "使用闭区间时，循环条件是 left <= right；使用左闭右开区间时，是 left < right",
      frequency: "high",
    },
    {
      title: "中点计算溢出",
      wrongCode: "const mid = (left + right) / 2;",
      rightCode: "const mid = left + Math.floor((right - left) / 2);",
      explanation: "当 left 和 right 都很大时，left + right 可能溢出",
      frequency: "medium",
    },
    {
      title: "死循环",
      explanation: "边界更新时没有排除 mid，导致搜索范围无法缩小",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(log n)",
    space: "O(1)",
    explanation: "每次迭代将搜索范围减半，只需要常数空间存储指针",
  },

  coreExplanation: {
    whatIs: "二分查找是一种在有序数组中快速定位目标的算法",
    whyUse: "将线性查找的 O(n) 优化到 O(log n)，每次都排除一半的元素",
    howItWorks: "比较中间元素与目标，根据大小关系决定在哪一半继续搜索",
    visualMetaphor: "就像猜数字游戏，每次都问「大了还是小了」，快速逼近答案",
  },

  variants: [
    {
      id: "left-bound",
      name: "左边界二分",
      description: "找到第一个等于目标的位置",
      useCase: "当数组中有重复元素，需要找最左边的目标时",
      codeSnippet: `while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] >= target) {
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}
return left; // 检查 left 是否有效`,
      exampleProblem: "find-first-and-last-position-of-element-in-sorted-array",
    },
    {
      id: "right-bound",
      name: "右边界二分",
      description: "找到最后一个等于目标的位置",
      useCase: "当数组中有重复元素，需要找最右边的目标时",
      codeSnippet: `while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] <= target) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}
return right; // 检查 right 是否有效`,
    },
  ],

  animation: {
    type: "binary-search",
    title: "二分查找目标值",
    description: "演示在有序数组中二分查找目标值 7",
    exampleInput: {
      description: "有序数组 [1, 3, 5, 7, 9, 11, 13]，查找 7",
      data: { nums: [1, 3, 5, 7, 9, 11, 13], target: 7 },
    },
    steps: [
      {
        array: [1, 3, 5, 7, 9, 11, 13],
        low: 0,
        high: 6,
        mid: 3,
        target: 7,
        description: "初始：left=0, right=6, mid=3, nums[3]=7",
        codeHighlight: [2, 3, 6],
      },
      {
        array: [1, 3, 5, 7, 9, 11, 13],
        low: 0,
        high: 6,
        mid: 3,
        target: 7,
        completed: [3],
        description: "nums[3]=7 === target，找到了！返回索引 3",
        codeHighlight: [8, 9],
        variables: { result: 3 },
      },
    ],
  },
};
