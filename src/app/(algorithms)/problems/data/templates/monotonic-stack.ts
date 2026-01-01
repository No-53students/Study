/**
 * 解题模板数据 - 单调栈模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const monotonicStackTemplate: AlgorithmTemplate = {
  id: "monotonic-stack",
  name: "单调栈",
  category: "栈",
  description: "维护一个单调递增或递减的栈，用于高效找到每个元素的下一个更大/更小元素",
  difficulty: "medium",

  recognitionPatterns: {
    keywords: ["下一个更大", "下一个更小", "每日温度", "柱状图", "接雨水"],
    dataStructures: ["栈", "数组"],
    problemTypes: ["下一个更大元素", "柱状图面积", "接雨水"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定单调性",
      description: "根据问题确定栈是单调递增还是单调递减",
      question: "找下一个更大元素用递减栈，找下一个更小元素用递增栈",
    },
    {
      step: 2,
      title: "确定栈中存储的内容",
      description: "通常存索引而不是值，这样可以同时获取位置和值",
      question: "为什么存索引比存值更方便？",
    },
    {
      step: 3,
      title: "遍历处理",
      description: "遍历数组，对每个元素进行入栈前的处理",
      question: "什么时候需要出栈？出栈时做什么处理？",
    },
    {
      step: 4,
      title: "处理剩余元素",
      description: "遍历结束后栈中剩余元素的处理",
      question: "栈中剩余的元素说明什么？",
    },
  ],

  codeTemplate: {
    typescript: `function nextGreaterElement(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack: number[] = [];  // 存索引，单调递减栈

  for (let i = 0; i < n; i++) {
    // 当前元素比栈顶大，说明找到了栈顶的下一个更大元素
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const topIndex = stack.pop()!;
      result[topIndex] = nums[i];
    }
    stack.push(i);
  }

  return result;
}`,
    comments: `function nextGreaterElement(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);  // 默认 -1 表示没有更大元素
  const stack: number[] = [];  // 单调递减栈，存储索引

  for (let i = 0; i < n; i++) {
    // 1. 当前元素比栈顶大，意味着当前元素就是栈顶的「下一个更大元素」
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const topIndex = stack.pop()!;
      result[topIndex] = nums[i];  // 记录答案
    }

    // 2. 当前元素入栈，等待找到它的「下一个更大元素」
    stack.push(i);
  }

  // 栈中剩余的元素都没有更大的元素，result 默认已是 -1
  return result;
}`,
  },

  applicableProblems: [
    "daily-temperatures",
    "next-greater-element-i",
    "next-greater-element-ii",
    "largest-rectangle-in-histogram",
    "trapping-rain-water",
  ],

  commonMistakes: [
    {
      title: "单调性选择错误",
      explanation: "找下一个更大用递减栈（从栈底到栈顶递减），找下一个更小用递增栈",
      frequency: "high",
    },
    {
      title: "存值而不是存索引",
      wrongCode: "stack.push(nums[i]);",
      rightCode: "stack.push(i);",
      explanation: "存索引可以同时获取位置和值，更灵活",
      frequency: "medium",
    },
    {
      title: "循环数组处理",
      explanation: "对于循环数组，需要遍历两遍或使用取模运算",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)",
    explanation: "每个元素最多入栈出栈各一次，栈空间最坏情况下存储所有元素",
  },

  coreExplanation: {
    whatIs: "单调栈是一种保持栈内元素单调有序的数据结构",
    whyUse: "将暴力的 O(n²) 查找优化到 O(n)，利用单调性一次遍历解决问题",
    howItWorks: "遍历数组时，维护一个单调栈，当新元素破坏单调性时，栈顶元素找到了它的答案",
    visualMetaphor: "就像排队看演唱会，前面的矮个子被后面的高个子「淘汰」，高个子成为矮个子能看到的第一个人",
  },

  variants: [
    {
      id: "circular-array",
      name: "循环数组变体",
      description: "处理循环数组，元素的下一个更大可能在前面",
      useCase: "当数组是循环的时候",
      codeSnippet: `for (let i = 0; i < 2 * n; i++) {
  const idx = i % n;
  while (stack.length && nums[idx] > nums[stack[stack.length - 1]]) {
    result[stack.pop()!] = nums[idx];
  }
  if (i < n) stack.push(idx);
}`,
      exampleProblem: "next-greater-element-ii",
    },
    {
      id: "histogram",
      name: "柱状图面积",
      description: "找每个柱子左右第一个更矮的柱子",
      useCase: "计算柱状图中最大矩形面积",
      codeSnippet: `// 递增栈，找左右第一个更小的
while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
  const h = heights[stack.pop()!];
  const w = stack.length ? i - stack[stack.length - 1] - 1 : i;
  maxArea = Math.max(maxArea, h * w);
}`,
      exampleProblem: "largest-rectangle-in-histogram",
    },
  ],

  animation: {
    type: "stack",
    title: "每日温度 - 单调栈",
    description: "演示如何用单调栈求每天需要等几天才有更高温度",
    exampleInput: {
      description: "温度 [73, 74, 75, 71, 69, 72, 76, 73]",
      data: { temperatures: [73, 74, 75, 71, 69, 72, 76, 73] },
    },
    steps: [
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [0],
        current: 0,
        description: "初始化：73 入栈，stack=[0]",
        variables: { result: [0, 0, 0, 0, 0, 0, 0, 0] },
      },
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [1],
        current: 1,
        completed: [0],
        description: "74 > 73，弹出0，result[0]=1；74入栈",
        variables: { result: [1, 0, 0, 0, 0, 0, 0, 0] },
      },
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [2],
        current: 2,
        completed: [0, 1],
        description: "75 > 74，弹出1，result[1]=1；75入栈",
        variables: { result: [1, 1, 0, 0, 0, 0, 0, 0] },
      },
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [2, 3],
        current: 3,
        description: "71 < 75，直接入栈",
        variables: { stack: [2, 3] },
      },
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [2, 3, 4],
        current: 4,
        description: "69 < 71，直接入栈",
        variables: { stack: [2, 3, 4] },
      },
      {
        array: [73, 74, 75, 71, 69, 72, 76, 73],
        stack: [2, 5],
        current: 5,
        completed: [0, 1, 3, 4],
        description: "72 > 69 和 71，弹出4和3；72入栈",
        variables: { result: [1, 1, 0, 2, 1, 0, 0, 0] },
      },
    ],
  },
};
