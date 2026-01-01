/**
 * 解题模板数据 - 双指针模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const twoPointersTemplate: AlgorithmTemplate = {
  id: "two-pointers-collision",
  name: "对撞双指针",
  category: "双指针",
  description: "从数组两端向中间移动的双指针技巧，适用于有序数组的查找和配对问题",
  difficulty: "easy",

  recognitionPatterns: {
    keywords: ["有序数组", "两数之和", "配对", "对撞", "首尾", "左右"],
    dataStructures: ["数组", "字符串"],
    problemTypes: ["查找配对", "验证回文", "区间问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "初始化指针",
      description: "左指针指向数组开头，右指针指向数组末尾",
      question: "指针的初始位置应该在哪里？",
      example: "left = 0, right = nums.length - 1",
    },
    {
      step: 2,
      title: "循环条件",
      description: "当左指针小于右指针时继续循环",
      question: "什么时候应该停止循环？",
      example: "while (left < right)",
    },
    {
      step: 3,
      title: "判断当前状态",
      description: "根据当前指针位置的值判断下一步操作",
      question: "如何根据当前值决定移动哪个指针？",
    },
    {
      step: 4,
      title: "移动指针",
      description: "根据判断结果移动左指针或右指针",
      question: "移动指针后状态如何变化？",
    },
  ],

  codeTemplate: {
    typescript: `function twoPointers(nums: number[], target: number): number[] {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;  // 和太小，左指针右移
    } else {
      right--; // 和太大，右指针左移
    }
  }

  return [-1, -1];
}`,
    javascript: `function twoPointers(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const sum = nums[left] + nums[right];

    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }

  return [-1, -1];
}`,
    comments: `function twoPointers(nums: number[], target: number): number[] {
  // 1. 初始化：左指针在开头，右指针在末尾
  let left = 0;
  let right = nums.length - 1;

  // 2. 循环条件：左指针 < 右指针
  while (left < right) {
    // 3. 计算当前状态
    const sum = nums[left] + nums[right];

    // 4. 判断并移动指针
    if (sum === target) {
      // 找到目标，返回结果
      return [left, right];
    } else if (sum < target) {
      // 和太小，需要更大的数，左指针右移
      left++;
    } else {
      // 和太大，需要更小的数，右指针左移
      right--;
    }
  }

  // 没找到
  return [-1, -1];
}`,
  },

  applicableProblems: [
    "two-sum-ii-input-array-is-sorted",
    "container-with-most-water",
    "three-sum",
    "valid-palindrome",
    "reverse-string",
  ],

  commonMistakes: [
    {
      title: "边界条件错误",
      wrongCode: "while (left <= right)",
      rightCode: "while (left < right)",
      explanation: "当 left === right 时，两个指针指向同一个元素，不能形成有效的配对",
      frequency: "high",
    },
    {
      title: "指针移动方向错误",
      wrongCode: "if (sum < target) right--;",
      rightCode: "if (sum < target) left++;",
      explanation: "和太小时应该让和变大，即移动左指针让较小的值变大",
      frequency: "medium",
    },
    {
      title: "没有处理无解情况",
      explanation: "循环结束后需要返回表示无解的值，不能直接返回 undefined",
      frequency: "low",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(1)",
    explanation: "每个元素最多被访问一次，空间只使用了两个指针变量",
  },

  coreExplanation: {
    whatIs: "对撞双指针是一种从数组两端向中间逼近的遍历方式",
    whyUse: "利用数组有序的特性，通过比较当前和与目标的大小关系，每次排除一半的搜索空间",
    howItWorks: "左指针从小到大移动，右指针从大到小移动，根据当前和与目标的关系决定移动哪个指针",
    visualMetaphor: "就像两个人从跑道两端向中间走，每次根据距离判断谁该多走一步",
  },

  variants: [
    {
      id: "palindrome-check",
      name: "回文验证变体",
      description: "用于验证字符串或数组是否为回文",
      useCase: "当需要检查首尾对称性时",
      codeSnippet: `while (left < right) {
  if (s[left] !== s[right]) return false;
  left++;
  right--;
}
return true;`,
      exampleProblem: "valid-palindrome",
    },
    {
      id: "three-sum-variant",
      name: "三数之和变体",
      description: "固定一个数，对剩余数组使用双指针",
      useCase: "当需要找三个数的组合时",
      codeSnippet: `for (let i = 0; i < nums.length - 2; i++) {
  let left = i + 1, right = nums.length - 1;
  while (left < right) {
    // 双指针逻辑
  }
}`,
      exampleProblem: "three-sum",
    },
  ],

  animation: {
    type: "two-pointers",
    title: "双指针查找目标和",
    description: "演示如何用双指针在有序数组中找到和为目标值的两个数",
    exampleInput: {
      description: "有序数组 [1, 2, 4, 6, 8, 10]，目标和 10",
      data: { nums: [1, 2, 4, 6, 8, 10], target: 10 },
    },
    steps: [
      {
        array: [1, 2, 4, 6, 8, 10],
        left: 0,
        right: 5,
        description: "初始化：left=0, right=5, sum=1+10=11 > 10",
        codeHighlight: [2, 3],
        variables: { sum: 11, target: 10 },
      },
      {
        array: [1, 2, 4, 6, 8, 10],
        left: 0,
        right: 4,
        description: "sum > target，右指针左移，sum=1+8=9 < 10",
        codeHighlight: [12],
        variables: { sum: 9, target: 10 },
      },
      {
        array: [1, 2, 4, 6, 8, 10],
        left: 1,
        right: 4,
        description: "sum < target，左指针右移，sum=2+8=10 = 10",
        codeHighlight: [10],
        variables: { sum: 10, target: 10 },
      },
      {
        array: [1, 2, 4, 6, 8, 10],
        left: 1,
        right: 4,
        completed: [1, 4],
        description: "找到目标！返回 [1, 4]",
        codeHighlight: [8],
        variables: { result: [1, 4] },
      },
    ],
  },
};
