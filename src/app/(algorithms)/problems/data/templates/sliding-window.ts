/**
 * 解题模板数据 - 滑动窗口模板
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export const slidingWindowTemplate: AlgorithmTemplate = {
  id: "sliding-window-dynamic",
  name: "动态滑动窗口",
  category: "滑动窗口",
  description: "窗口大小动态变化的滑动窗口，用于寻找满足条件的最长/最短子串/子数组",
  difficulty: "medium",

  recognitionPatterns: {
    keywords: ["子串", "子数组", "连续", "最长", "最短", "窗口", "不重复"],
    dataStructures: ["字符串", "数组", "哈希表"],
    problemTypes: ["最长子串", "最短子数组", "字母异位词"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "初始化窗口",
      description: "定义窗口的左右边界和辅助数据结构",
      question: "需要用什么数据结构来维护窗口状态？",
      example: "let left = 0; const windowMap = new Map();",
    },
    {
      step: 2,
      title: "扩展右边界",
      description: "右指针向右移动，将新元素加入窗口",
      question: "加入新元素后窗口状态如何变化？",
    },
    {
      step: 3,
      title: "收缩左边界",
      description: "当窗口不满足条件时，移动左指针收缩窗口",
      question: "什么条件下需要收缩窗口？",
    },
    {
      step: 4,
      title: "更新答案",
      description: "在适当的时机更新最优解",
      question: "应该在扩展后还是收缩后更新答案？",
    },
  ],

  codeTemplate: {
    typescript: `function slidingWindow(s: string): number {
  const window = new Map<string, number>();
  let left = 0;
  let result = 0;

  for (let right = 0; right < s.length; right++) {
    // 1. 扩展窗口：加入右边元素
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);

    // 2. 收缩窗口：当不满足条件时
    while (/* 窗口需要收缩的条件 */) {
      const d = s[left];
      window.set(d, window.get(d)! - 1);
      if (window.get(d) === 0) window.delete(d);
      left++;
    }

    // 3. 更新答案
    result = Math.max(result, right - left + 1);
  }

  return result;
}`,
    comments: `function slidingWindow(s: string): number {
  // 窗口：用 Map 记录窗口内每个字符的出现次数
  const window = new Map<string, number>();
  let left = 0;     // 左边界
  let result = 0;   // 结果

  // 遍历右边界
  for (let right = 0; right < s.length; right++) {
    // 1. 扩展窗口：将 s[right] 加入窗口
    const c = s[right];
    window.set(c, (window.get(c) || 0) + 1);

    // 2. 收缩窗口：当窗口不满足条件时，移动左边界
    // 例如：当窗口内有重复字符时收缩
    while (window.get(c)! > 1) {
      const d = s[left];
      window.set(d, window.get(d)! - 1);
      if (window.get(d) === 0) window.delete(d);
      left++;
    }

    // 3. 更新答案：记录最长的有效窗口
    result = Math.max(result, right - left + 1);
  }

  return result;
}`,
  },

  applicableProblems: [
    "longest-substring-without-repeating-characters",
    "minimum-window-substring",
    "find-all-anagrams-in-a-string",
    "permutation-in-string",
    "longest-repeating-character-replacement",
  ],

  commonMistakes: [
    {
      title: "收缩条件错误",
      explanation: "收缩窗口的条件是问题的关键，需要根据具体问题确定何时收缩",
      frequency: "high",
    },
    {
      title: "更新答案时机错误",
      wrongCode: "在收缩循环内更新答案",
      rightCode: "在收缩循环后更新答案",
      explanation: "求最长时应该在窗口有效时更新，求最短时应该在窗口刚好满足条件时更新",
      frequency: "medium",
    },
    {
      title: "窗口状态维护不完整",
      explanation: "加入和移除元素时，相关状态都要同步更新",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(k)",
    explanation: "每个元素最多进出窗口一次，空间取决于窗口内不同元素的数量",
  },

  coreExplanation: {
    whatIs: "滑动窗口是一种维护连续子序列的技巧，通过移动窗口边界来遍历所有可能的子序列",
    whyUse: "将暴力的 O(n²) 遍历所有子序列优化到 O(n)，因为每个元素只进出窗口一次",
    howItWorks: "右边界扩展窗口，左边界收缩窗口，在窗口满足/不满足条件的临界点更新答案",
    visualMetaphor: "就像用一个可伸缩的窗框在一串珠子上滑动，窗框大小根据珠子颜色动态调整",
  },

  variants: [
    {
      id: "fixed-window",
      name: "固定窗口变体",
      description: "窗口大小固定，整体滑动",
      useCase: "当问题指定了窗口大小时（如找长度为 k 的子数组）",
      codeSnippet: `for (let i = 0; i < nums.length; i++) {
  windowSum += nums[i];
  if (i >= k - 1) {
    result = Math.max(result, windowSum);
    windowSum -= nums[i - k + 1];
  }
}`,
      exampleProblem: "maximum-average-subarray-i",
    },
    {
      id: "minimum-window",
      name: "最短窗口变体",
      description: "寻找满足条件的最短窗口",
      useCase: "当需要找最小覆盖子串时",
      codeSnippet: `while (/* 窗口满足条件 */) {
  result = Math.min(result, right - left + 1);
  // 收缩窗口尝试更短的解
  left++;
}`,
      exampleProblem: "minimum-window-substring",
    },
  ],

  animation: {
    type: "sliding-window",
    title: "无重复字符的最长子串",
    description: "演示滑动窗口如何找到最长无重复字符子串",
    exampleInput: {
      description: "字符串 'abcabcbb'，找最长无重复子串",
      data: { s: "abcabcbb" },
    },
    steps: [
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 0,
        description: "初始化：窗口 [a]，长度 1",
        variables: { window: "a", maxLen: 1 },
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 1,
        description: "扩展：窗口 [ab]，长度 2",
        variables: { window: "ab", maxLen: 2 },
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 2,
        description: "扩展：窗口 [abc]，长度 3",
        variables: { window: "abc", maxLen: 3 },
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 3,
        highlights: [{ indices: [0, 3], color: "red", label: "重复" }],
        description: "发现重复 'a'，需要收缩",
        variables: { duplicate: "a" },
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 1,
        windowEnd: 3,
        description: "收缩：移除 'a'，窗口 [bca]，长度 3",
        variables: { window: "bca", maxLen: 3 },
      },
    ],
  },
};
