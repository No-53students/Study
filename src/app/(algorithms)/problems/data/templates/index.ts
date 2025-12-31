/**
 * 算法解题模板库
 *
 * 解决问题：看懂题解但写不出来
 * 核心功能：
 * 1. 识别关键词 - 帮助判断用什么算法
 * 2. 思维步骤 - 一步步引导思考
 * 3. 代码模板 - 可直接套用的模板
 * 4. 常见错误 - 避坑指南
 */

import { AlgorithmTemplate } from "../../types/roadmap";

export type { AlgorithmTemplate } from "../../types/roadmap";

// ==================== 双指针模板 ====================
export const twoPointersTemplate: AlgorithmTemplate = {
  id: "two-pointers",
  name: "双指针",
  category: "array",
  description: "使用两个指针从不同位置遍历数组，常用于有序数组、链表问题",
  difficulty: "easy",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "双指针是一种算法技巧，通过同时维护两个指针（索引），在一次遍历中完成需要嵌套循环才能完成的操作。",
    whyUse: "将 O(n²) 的暴力解法优化到 O(n)。当问题涉及有序数组的配对查找、原地修改、或者需要从两端向中间逼近时，双指针是首选。",
    howItWorks: `1. 对撞指针：两个指针分别从数组两端向中间移动，每次根据条件移动其中一个
2. 快慢指针：两个指针同向移动，但速度不同，用于原地修改、找中点、检测环
3. 每次移动都排除不可能的解空间，保证不遗漏`,
    visualMetaphor: "想象两个人从走廊两端走向彼此。如果他们的距离和太大，离得远的那个人往前走一步；如果太小，另一个人往前走。直到他们刚好碰面。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "collision",
      name: "对撞指针",
      description: "从两端向中间移动，常用于有序数组",
      useCase: "两数之和、三数之和、接雨水、盛水容器",
      codeSnippet: `let left = 0, right = n - 1;
while (left < right) {
  if (满足条件) return [left, right];
  if (需要更大) left++;
  else right--;
}`,
      exampleProblem: "two-sum",
    },
    {
      id: "fast-slow",
      name: "快慢指针",
      description: "同向移动但速度不同",
      useCase: "原地删除、移动元素、找链表中点、检测环",
      codeSnippet: `let slow = 0, fast = 0;
while (fast < n) {
  if (满足条件) {
    arr[slow] = arr[fast];
    slow++;
  }
  fast++;
}`,
      exampleProblem: "remove-duplicates-from-sorted-array",
    },
    {
      id: "same-direction",
      name: "同向双指针",
      description: "两个指针同向移动，维护一个区间",
      useCase: "滑动窗口的简化版",
      codeSnippet: `let j = 0;
for (let i = 0; i < n; i++) {
  while (j < n && 可以扩展) {
    j++;
  }
  // 更新答案
}`,
      exampleProblem: "longest-substring-without-repeating-characters",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "two-pointers",
    title: "双指针演示 - 两数之和 II",
    description: "在有序数组 [2, 7, 11, 15] 中找到和为 9 的两个数",
    exampleInput: {
      description: "numbers = [2, 7, 11, 15], target = 9",
      data: { numbers: [2, 7, 11, 15], target: 9 },
    },
    steps: [
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 3,
        description: "初始化：left 指向第一个元素 2，right 指向最后一个元素 15",
        variables: { sum: 17, target: 9 },
        codeHighlight: [2, 3],
      },
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 3,
        comparing: [0, 3],
        description: "计算 sum = 2 + 15 = 17 > 9，需要更小的和，right 左移",
        variables: { sum: 17, target: 9, action: "right--" },
        codeHighlight: [7, 8],
      },
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 2,
        description: "right 移动到索引 2，指向 11",
        variables: { sum: 13, target: 9 },
        codeHighlight: [5],
      },
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 2,
        comparing: [0, 2],
        description: "计算 sum = 2 + 11 = 13 > 9，仍然太大，right 继续左移",
        variables: { sum: 13, target: 9, action: "right--" },
        codeHighlight: [7, 8],
      },
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 1,
        description: "right 移动到索引 1，指向 7",
        variables: { sum: 9, target: 9 },
        codeHighlight: [5],
      },
      {
        array: [2, 7, 11, 15],
        left: 0,
        right: 1,
        comparing: [0, 1],
        highlights: [{ indices: [0, 1], color: "green", label: "找到答案" }],
        description: "计算 sum = 2 + 7 = 9 = target，找到答案！返回 [1, 2]（1-indexed）",
        variables: { sum: 9, target: 9, result: [1, 2] },
        codeHighlight: [9, 10],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["有序数组", "两数之和", "回文", "反转", "合并", "去重", "移动零"],
    dataStructures: ["数组", "字符串", "链表"],
    problemTypes: ["查找配对", "原地修改", "判断性质"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定指针类型",
      description: "判断使用哪种双指针模式",
      question: "需要从两端向中间？还是同向移动？",
      example: "对撞指针：回文、两数之和 | 快慢指针：去重、移动零",
    },
    {
      step: 2,
      title: "确定初始位置",
      description: "设定两个指针的起始位置",
      question: "指针应该从哪里开始？",
      example: "对撞：left=0, right=n-1 | 快慢：slow=0, fast=0",
    },
    {
      step: 3,
      title: "确定移动条件",
      description: "什么情况下移动哪个指针",
      question: "什么时候移动 left？什么时候移动 right？",
      example: "两数之和：sum < target 移动 left，sum > target 移动 right",
    },
    {
      step: 4,
      title: "确定终止条件",
      description: "循环何时结束",
      question: "指针相遇？还是遍历完成？",
      example: "while (left < right) 或 while (fast < n)",
    },
  ],

  codeTemplate: {
    typescript: `function twoPointers(arr: number[]): number[] {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 根据条件移动指针
    if (/* 条件 */) {
      left++;
    } else {
      right--;
    }
  }

  return result;
}`,
    comments: `function twoPointers(arr: number[]): number[] {
  // 1. 初始化双指针
  let left = 0;              // 左指针从头开始
  let right = arr.length - 1; // 右指针从尾开始

  // 2. 循环直到指针相遇
  while (left < right) {
    // 3. 计算当前状态（如：两数之和）
    const current = arr[left] + arr[right];

    // 4. 根据条件判断移动哪个指针
    if (current < target) {
      // 需要更大的值，移动左指针
      left++;
    } else if (current > target) {
      // 需要更小的值，移动右指针
      right--;
    } else {
      // 找到答案
      return [left, right];
    }
  }

  return [-1, -1]; // 未找到
}`,
  },

  applicableProblems: [
    "two-sum",
    "3sum",
    "container-with-most-water",
    "valid-palindrome",
    "reverse-string",
    "merge-sorted-array",
    "remove-duplicates-from-sorted-array",
    "move-zeroes",
  ],

  commonMistakes: [
    {
      title: "边界条件错误",
      wrongCode: "while (left <= right)",
      rightCode: "while (left < right)",
      explanation: "对撞指针用 <，相等时已经处理完所有元素",
      frequency: "high",
    },
    {
      title: "忘记移动指针",
      wrongCode: "if (condition) { /* 处理 */ }",
      rightCode: "if (condition) { /* 处理 */ left++; }",
      explanation: "处理完当前元素后必须移动指针，否则死循环",
      frequency: "high",
    },
    {
      title: "指针初始化错误",
      wrongCode: "right = arr.length",
      rightCode: "right = arr.length - 1",
      explanation: "数组索引从0开始，最后一个元素索引是 length-1",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(1)",
    explanation: "只需遍历一次数组，使用固定的额外空间存储指针",
  },
};

// ==================== 滑动窗口模板 ====================
export const slidingWindowTemplate: AlgorithmTemplate = {
  id: "sliding-window",
  name: "滑动窗口",
  category: "array",
  description: "维护一个窗口在数组/字符串上滑动，用于解决子串/子数组问题",
  difficulty: "medium",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "滑动窗口是一种处理连续子数组/子串问题的技巧。通过维护一个可变大小的窗口，在数组上从左向右滑动，避免重复计算。",
    whyUse: "将 O(n²) 或 O(n³) 的暴力枚举优化到 O(n)。当问题涉及连续子数组/子串的最值、计数或存在性判断时，滑动窗口是首选。",
    howItWorks: `1. 右边界扩展：不断将新元素加入窗口
2. 左边界收缩：当窗口不满足条件时，移除左边元素
3. 更新答案：在适当的时机（扩展时或收缩时）更新最优解
4. 核心：每个元素最多被加入和移除窗口各一次，总时间 O(n)`,
    visualMetaphor: "想象用一个可伸缩的框在一排数字上滑动。框右边不断扩大，直到不满足条件；然后左边收缩，直到重新满足条件。不断重复，记录过程中符合要求的最大/最小框。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "flexible",
      name: "可变窗口",
      description: "窗口大小动态变化，根据条件扩展和收缩",
      useCase: "无重复最长子串、最小覆盖子串、水果成篮",
      codeSnippet: `let left = 0;
for (let right = 0; right < n; right++) {
  // 扩展窗口
  add(arr[right]);

  // 收缩窗口直到满足条件
  while (!valid()) {
    remove(arr[left]);
    left++;
  }

  // 更新答案
  result = Math.max(result, right - left + 1);
}`,
      exampleProblem: "longest-substring-without-repeating-characters",
    },
    {
      id: "fixed",
      name: "固定窗口",
      description: "窗口大小固定为 k",
      useCase: "大小为 k 的最大和子数组、字符串的排列",
      codeSnippet: `// 初始化第一个窗口
for (let i = 0; i < k; i++) {
  add(arr[i]);
}
result = calculate();

// 滑动窗口
for (let i = k; i < n; i++) {
  add(arr[i]);        // 加入右边
  remove(arr[i - k]); // 移除左边
  result = Math.max(result, calculate());
}`,
      exampleProblem: "find-all-anagrams-in-a-string",
    },
    {
      id: "shrink-first",
      name: "先收缩后扩展",
      description: "先让窗口满足条件，再尝试收缩找更优解",
      useCase: "最小覆盖子串、最小长度子数组",
      codeSnippet: `for (let right = 0; right < n; right++) {
  add(arr[right]);

  // 满足条件后尽量收缩
  while (valid()) {
    result = Math.min(result, right - left + 1);
    remove(arr[left]);
    left++;
  }
}`,
      exampleProblem: "minimum-window-substring",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "sliding-window",
    title: "滑动窗口演示 - 无重复字符的最长子串",
    description: "在字符串 'abcabcbb' 中找到不含重复字符的最长子串",
    exampleInput: {
      description: "s = 'abcabcbb'",
      data: { s: "abcabcbb" },
    },
    steps: [
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 0,
        description: "初始化：窗口为空，right 指向第一个字符",
        variables: { window: {}, maxLen: 0 },
        codeHighlight: [2, 3, 4],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 0,
        highlights: [{ indices: [0], color: "blue", label: "窗口" }],
        description: "加入 'a'，窗口 = {a}，无重复，长度 = 1",
        variables: { window: { a: 1 }, maxLen: 1, currentLen: 1 },
        codeHighlight: [6, 7, 8],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 1,
        highlights: [{ indices: [0, 1], color: "blue", label: "窗口" }],
        description: "加入 'b'，窗口 = {a, b}，无重复，长度 = 2",
        variables: { window: { a: 1, b: 1 }, maxLen: 2, currentLen: 2 },
        codeHighlight: [6, 7, 8],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 2,
        highlights: [{ indices: [0, 1, 2], color: "blue", label: "窗口" }],
        description: "加入 'c'，窗口 = {a, b, c}，无重复，长度 = 3",
        variables: { window: { a: 1, b: 1, c: 1 }, maxLen: 3, currentLen: 3 },
        codeHighlight: [6, 7, 8],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 0,
        windowEnd: 3,
        highlights: [
          { indices: [0], color: "red", label: "重复" },
          { indices: [3], color: "red", label: "重复" },
        ],
        description: "加入 'a'，发现重复！窗口 = {a:2, b, c}，需要收缩",
        variables: { window: { a: 2, b: 1, c: 1 }, maxLen: 3, duplicate: "a" },
        codeHighlight: [11, 12],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 1,
        windowEnd: 3,
        highlights: [{ indices: [1, 2, 3], color: "blue", label: "窗口" }],
        description: "移除左边的 'a'，窗口 = {b, c, a}，无重复，长度 = 3",
        variables: { window: { a: 1, b: 1, c: 1 }, maxLen: 3, currentLen: 3 },
        codeHighlight: [13, 14, 15],
      },
      {
        array: ["a", "b", "c", "a", "b", "c", "b", "b"],
        windowStart: 2,
        windowEnd: 4,
        highlights: [{ indices: [2, 3, 4], color: "blue", label: "窗口" }],
        description: "继续滑动... 最终答案：最长无重复子串长度 = 3 ('abc')",
        variables: { window: { c: 1, a: 1, b: 1 }, maxLen: 3, result: "abc" },
        codeHighlight: [19],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["连续子数组", "子串", "最长", "最短", "包含", "不重复", "窗口"],
    dataStructures: ["数组", "字符串"],
    problemTypes: ["最值问题", "计数问题", "存在性问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定窗口类型",
      description: "固定大小还是可变大小的窗口",
      question: "窗口大小固定吗？还是需要动态调整？",
      example: "固定：最大平均值子数组 | 可变：无重复最长子串",
    },
    {
      step: 2,
      title: "确定窗口扩展条件",
      description: "什么时候扩大窗口（右边界右移）",
      question: "什么情况下可以继续扩展窗口？",
      example: "当前窗口满足条件时继续扩展，寻找更优解",
    },
    {
      step: 3,
      title: "确定窗口收缩条件",
      description: "什么时候缩小窗口（左边界右移）",
      question: "什么情况下需要收缩窗口？",
      example: "窗口不满足条件时收缩，直到重新满足条件",
    },
    {
      step: 4,
      title: "更新答案时机",
      description: "在扩展还是收缩时更新答案",
      question: "什么时候记录/更新最优解？",
      example: "求最长：扩展时更新 | 求最短：收缩时更新",
    },
  ],

  codeTemplate: {
    typescript: `function slidingWindow(s: string): number {
  const window = new Map<string, number>();
  let left = 0, right = 0;
  let result = 0;

  while (right < s.length) {
    // 扩展窗口
    const c = s[right];
    right++;
    // 更新窗口内数据

    // 判断是否需要收缩
    while (/* 需要收缩的条件 */) {
      const d = s[left];
      left++;
      // 更新窗口内数据
    }

    // 更新答案
    result = Math.max(result, right - left);
  }

  return result;
}`,
    comments: `function slidingWindow(s: string): number {
  // 1. 初始化窗口和指针
  const window = new Map<string, number>(); // 记录窗口内字符频率
  let left = 0, right = 0;  // 窗口左右边界
  let result = 0;            // 记录结果

  // 2. 右边界不断右移，扩展窗口
  while (right < s.length) {
    // 3. 将右边字符加入窗口
    const c = s[right];
    right++;
    // 更新窗口内数据（如：字符计数）
    window.set(c, (window.get(c) || 0) + 1);

    // 4. 判断是否需要收缩窗口
    while (/* 窗口不满足条件，如：有重复字符 */) {
      // 5. 将左边字符移出窗口
      const d = s[left];
      left++;
      // 更新窗口内数据
      window.set(d, window.get(d)! - 1);
    }

    // 6. 更新答案（根据题目要求）
    result = Math.max(result, right - left);
  }

  return result;
}`,
  },

  applicableProblems: [
    "longest-substring-without-repeating-characters",
    "minimum-window-substring",
    "find-all-anagrams-in-a-string",
    "permutation-in-string",
    "sliding-window-maximum",
  ],

  commonMistakes: [
    {
      title: "窗口大小计算错误",
      wrongCode: "right - left + 1",
      rightCode: "right - left // 因为 right 已经++了",
      explanation: "注意 right++ 的时机，计算长度时要考虑这一点",
      frequency: "high",
    },
    {
      title: "收缩条件写反",
      wrongCode: "while (window.size < k)",
      rightCode: "while (window.size > k)",
      explanation: "收缩是为了让窗口重新满足条件，条件要写对",
      frequency: "medium",
    },
    {
      title: "忘记在收缩时更新窗口状态",
      wrongCode: "left++",
      rightCode: "window.delete(s[left]); left++",
      explanation: "收缩窗口时要同步更新窗口内的数据结构",
      frequency: "high",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(k)，k为字符集大小",
    explanation: "每个元素最多被访问两次（进入和离开窗口），窗口用哈希表存储",
  },
};

// ==================== 二分查找模板 ====================
export const binarySearchTemplate: AlgorithmTemplate = {
  id: "binary-search",
  name: "二分查找",
  category: "search",
  description: "在有序数组中快速查找目标值或边界，时间复杂度 O(log n)",
  difficulty: "easy",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "二分查找是一种在有序数组中快速定位目标的算法。每次将搜索范围缩小一半，直到找到目标或确定目标不存在。",
    whyUse: "将 O(n) 的线性查找优化到 O(log n)。当数据有序或可以通过某个条件二分时（答案单调性），二分查找是最优选择。",
    howItWorks: `1. 设定搜索区间 [left, right]
2. 计算中点 mid = left + (right - left) / 2
3. 比较 nums[mid] 与目标，缩小一半区间
4. 重复直到找到目标或区间为空`,
    visualMetaphor: "想象猜数字游戏。每次猜中间的数，根据'太大'或'太小'的反馈，排除一半的可能。100个数最多只需7次就能猜中。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "exact",
      name: "精确查找",
      description: "查找目标值的确切位置",
      useCase: "标准二分查找、搜索插入位置",
      codeSnippet: `while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] === target) return mid;
  if (nums[mid] < target) left = mid + 1;
  else right = mid - 1;
}
return -1;`,
      exampleProblem: "binary-search",
    },
    {
      id: "left-bound",
      name: "左边界查找",
      description: "找第一个 >= target 的位置",
      useCase: "第一个出现的位置、插入位置",
      codeSnippet: `while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] >= target) right = mid - 1;
  else left = mid + 1;
}
return left;  // 第一个 >= target`,
      exampleProblem: "find-first-and-last-position",
    },
    {
      id: "right-bound",
      name: "右边界查找",
      description: "找最后一个 <= target 的位置",
      useCase: "最后一个出现的位置",
      codeSnippet: `while (left <= right) {
  const mid = left + Math.floor((right - left) / 2);
  if (nums[mid] <= target) left = mid + 1;
  else right = mid - 1;
}
return right;  // 最后一个 <= target`,
      exampleProblem: "find-first-and-last-position",
    },
    {
      id: "answer-search",
      name: "答案二分",
      description: "二分答案而不是数组索引",
      useCase: "最小化最大值、分割数组、运输货物",
      codeSnippet: `let left = minPossible, right = maxPossible;
while (left < right) {
  const mid = left + Math.floor((right - left) / 2);
  if (isValid(mid)) right = mid;  // 可行，尝试更小
  else left = mid + 1;            // 不可行，需要更大
}
return left;`,
      exampleProblem: "capacity-to-ship-packages",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "binary-search",
    title: "二分查找演示 - 查找目标值",
    description: "在有序数组 [-1, 0, 3, 5, 9, 12] 中查找 9",
    exampleInput: {
      description: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
      data: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
    },
    steps: [
      {
        array: [-1, 0, 3, 5, 9, 12],
        low: 0,
        high: 5,
        target: 9,
        description: "初始化：left = 0, right = 5，搜索整个数组",
        variables: { left: 0, right: 5, target: 9 },
        codeHighlight: [2, 3],
      },
      {
        array: [-1, 0, 3, 5, 9, 12],
        low: 0,
        high: 5,
        mid: 2,
        target: 9,
        highlights: [{ indices: [2], color: "yellow", label: "mid" }],
        description: "计算 mid = 2，nums[2] = 3 < 9，目标在右半边",
        variables: { left: 0, right: 5, mid: 2, "nums[mid]": 3, action: "left = mid + 1" },
        codeHighlight: [5, 7, 8],
      },
      {
        array: [-1, 0, 3, 5, 9, 12],
        low: 3,
        high: 5,
        target: 9,
        highlights: [{ indices: [3, 4, 5], color: "blue", label: "搜索区间" }],
        description: "left 移动到 3，现在搜索 [5, 9, 12]",
        variables: { left: 3, right: 5, target: 9 },
        codeHighlight: [5],
      },
      {
        array: [-1, 0, 3, 5, 9, 12],
        low: 3,
        high: 5,
        mid: 4,
        target: 9,
        highlights: [{ indices: [4], color: "green", label: "找到!" }],
        description: "计算 mid = 4，nums[4] = 9 === target，找到目标！返回 4",
        variables: { left: 3, right: 5, mid: 4, "nums[mid]": 9, result: 4 },
        codeHighlight: [6, 7],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["有序", "排序", "查找", "第一个", "最后一个", "旋转", "峰值"],
    dataStructures: ["有序数组"],
    problemTypes: ["精确查找", "边界查找", "答案二分"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定搜索区间",
      description: "使用左闭右闭 [left, right] 还是左闭右开 [left, right)",
      question: "区间如何定义？这决定了循环条件和边界更新",
      example: "推荐使用左闭右闭，更直观易懂",
    },
    {
      step: 2,
      title: "确定循环条件",
      description: "基于区间定义确定循环条件",
      question: "什么时候停止搜索？",
      example: "左闭右闭用 while(left <= right)，左闭右开用 while(left < right)",
    },
    {
      step: 3,
      title: "确定中点计算",
      description: "避免整数溢出的中点计算方式",
      question: "如何计算中点？",
      example: "mid = left + Math.floor((right - left) / 2)",
    },
    {
      step: 4,
      title: "确定边界更新",
      description: "根据比较结果更新搜索区间",
      question: "找到目标后如何处理？没找到如何缩小范围？",
      example: "左闭右闭：left = mid + 1 或 right = mid - 1",
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
  // 1. 定义搜索区间 [left, right]（左闭右闭）
  let left = 0;
  let right = nums.length - 1;

  // 2. 循环条件：区间不为空时继续搜索
  while (left <= right) {
    // 3. 计算中点（避免溢出的写法）
    const mid = left + Math.floor((right - left) / 2);

    // 4. 比较中点值与目标值
    if (nums[mid] === target) {
      // 找到目标，返回索引
      return mid;
    } else if (nums[mid] < target) {
      // 目标在右半边，更新左边界
      left = mid + 1;
    } else {
      // 目标在左半边，更新右边界
      right = mid - 1;
    }
  }

  // 5. 未找到目标
  return -1;
}

// 查找左边界（第一个 >= target 的位置）
function leftBound(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] >= target) {
      right = mid - 1;  // 继续向左找
    } else {
      left = mid + 1;
    }
  }

  return left;  // left 就是第一个 >= target 的位置
}`,
  },

  applicableProblems: [
    "binary-search",
    "search-insert-position",
    "search-in-rotated-sorted-array",
    "find-minimum-in-rotated-sorted-array",
    "find-first-and-last-position",
    "search-a-2d-matrix",
  ],

  commonMistakes: [
    {
      title: "死循环",
      wrongCode: "while (left < right) { if (nums[mid] < target) left = mid; }",
      rightCode: "left = mid + 1",
      explanation: "必须 +1 或 -1，否则区间不会缩小导致死循环",
      frequency: "high",
    },
    {
      title: "整数溢出",
      wrongCode: "mid = (left + right) / 2",
      rightCode: "mid = left + Math.floor((right - left) / 2)",
      explanation: "left + right 可能溢出，用减法避免",
      frequency: "medium",
    },
    {
      title: "边界条件不一致",
      wrongCode: "right = nums.length; while (left <= right)",
      rightCode: "right = nums.length - 1; while (left <= right)",
      explanation: "区间定义要和循环条件、更新逻辑保持一致",
      frequency: "high",
    },
  ],

  complexity: {
    time: "O(log n)",
    space: "O(1)",
    explanation: "每次将搜索范围缩小一半，只用常数空间",
  },
};

// ==================== BFS 模板 ====================
export const bfsTemplate: AlgorithmTemplate = {
  id: "bfs",
  name: "广度优先搜索 (BFS)",
  category: "graph",
  description: "层序遍历图或树，常用于求最短路径、层级遍历",
  difficulty: "medium",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "BFS 是一种图遍历算法，从起点开始，先访问所有距离为 1 的节点，再访问距离为 2 的节点，以此类推。使用队列实现。",
    whyUse: "BFS 天然适合求最短路径（无权图）。当第一次到达目标时，走过的步数就是最短距离。也适合层序遍历、扩散传播类问题。",
    howItWorks: `1. 将起点加入队列，标记已访问
2. 从队列取出节点，处理当前节点
3. 将所有未访问的邻居加入队列
4. 重复直到队列为空或找到目标`,
    visualMetaphor: "想象往平静的水面扔一块石头，波纹一圈一圈向外扩散。BFS 就是按照这种方式探索：先探索完第一圈，再探索第二圈，以此类推。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "level-order",
      name: "层序遍历",
      description: "按层处理节点，记录每层结果",
      useCase: "二叉树层序遍历、按层输出、计算层数",
      codeSnippet: `const result: number[][] = [];
while (queue.length) {
  const level: number[] = [];
  const size = queue.length;  // 记录当前层大小

  for (let i = 0; i < size; i++) {
    const node = queue.shift()!;
    level.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  result.push(level);
}`,
      exampleProblem: "binary-tree-level-order-traversal",
    },
    {
      id: "multi-source",
      name: "多源BFS",
      description: "从多个起点同时开始扩散",
      useCase: "腐烂的橘子、墙与门、最近的0",
      codeSnippet: `// 所有起点同时入队
for (const start of starts) {
  queue.push(start);
  visited.add(start);
}

// 标准 BFS
while (queue.length) { ... }`,
      exampleProblem: "rotting-oranges",
    },
    {
      id: "shortest-path",
      name: "最短路径",
      description: "找到从起点到终点的最短距离",
      useCase: "迷宫最短路、单词接龙、打开转盘锁",
      codeSnippet: `let distance = 0;
while (queue.length) {
  const size = queue.length;
  for (let i = 0; i < size; i++) {
    const node = queue.shift()!;
    if (isTarget(node)) return distance;
    // 扩展邻居...
  }
  distance++;
}`,
      exampleProblem: "word-ladder",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "graph",
    title: "BFS 演示 - 二叉树层序遍历",
    description: "按层遍历二叉树 [3, 9, 20, null, null, 15, 7]",
    exampleInput: {
      description: "root = [3, 9, 20, null, null, 15, 7]",
      data: { tree: [3, 9, 20, null, null, 15, 7] },
    },
    steps: [
      {
        array: [3, 9, 20, 15, 7],
        current: 0,
        description: "初始化：将根节点 3 加入队列",
        variables: { queue: [3], level: 0, result: [] },
        codeHighlight: [1, 2],
      },
      {
        array: [3, 9, 20, 15, 7],
        current: 0,
        completed: [0],
        highlights: [{ indices: [0], color: "green", label: "第1层" }],
        description: "处理第1层：取出 3，将其子节点 9、20 加入队列",
        variables: { queue: [9, 20], level: 1, result: [[3]] },
        codeHighlight: [5, 6, 7, 8],
      },
      {
        array: [3, 9, 20, 15, 7],
        current: 1,
        completed: [0, 1, 2],
        highlights: [{ indices: [1, 2], color: "blue", label: "第2层" }],
        description: "处理第2层：取出 9 和 20，将 15、7 加入队列",
        variables: { queue: [15, 7], level: 2, result: [[3], [9, 20]] },
        codeHighlight: [5, 6, 7, 8],
      },
      {
        array: [3, 9, 20, 15, 7],
        completed: [0, 1, 2, 3, 4],
        highlights: [{ indices: [3, 4], color: "purple", label: "第3层" }],
        description: "处理第3层：取出 15 和 7，无子节点，队列为空",
        variables: { queue: [], level: 3, result: [[3], [9, 20], [15, 7]] },
        codeHighlight: [10],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["最短", "层序", "最近", "最少步数", "扩散", "感染"],
    dataStructures: ["树", "图", "矩阵"],
    problemTypes: ["最短路径", "层级遍历", "连通性"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定起点和终点",
      description: "从哪里开始搜索，什么时候结束",
      question: "起点是什么？什么条件下找到答案？",
      example: "起点可能是一个节点、多个节点、或满足某条件的所有位置",
    },
    {
      step: 2,
      title: "确定扩展方向",
      description: "从当前节点可以走向哪些相邻节点",
      question: "如何定义'相邻'？有哪些方向？",
      example: "二叉树：左右子节点 | 矩阵：上下左右四个方向",
    },
    {
      step: 3,
      title: "处理访问标记",
      description: "避免重复访问同一节点",
      question: "如何标记已访问？何时标记？",
      example: "入队时标记（推荐）或出队时标记",
    },
    {
      step: 4,
      title: "记录层级/距离",
      description: "如果需要知道距离或层级",
      question: "需要记录层数吗？如何记录？",
      example: "记录队列大小，或者将距离信息存入队列",
    },
  ],

  codeTemplate: {
    typescript: `function bfs(start: Node): number {
  const queue: Node[] = [start];
  const visited = new Set<Node>([start]);
  let level = 0;

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;

      // 判断是否到达终点
      if (/* 终止条件 */) {
        return level;
      }

      // 遍历相邻节点
      for (const neighbor of getNeighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    level++;
  }

  return -1;
}`,
    comments: `function bfs(start: Node): number {
  // 1. 初始化队列和访问集合
  const queue: Node[] = [start];        // BFS 用队列
  const visited = new Set<Node>([start]); // 记录已访问
  let level = 0;                          // 记录层级/距离

  // 2. 队列不为空时继续搜索
  while (queue.length > 0) {
    // 3. 记录当前层的节点数（层序遍历的关键）
    const size = queue.length;

    // 4. 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;  // 取出队首

      // 5. 判断是否到达终点
      if (/* 找到目标 */) {
        return level;  // 返回最短距离
      }

      // 6. 将相邻的未访问节点加入队列
      for (const neighbor of getNeighbors(node)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);  // 入队时标记！
          queue.push(neighbor);
        }
      }
    }

    // 7. 进入下一层
    level++;
  }

  return -1;  // 无法到达
}`,
  },

  applicableProblems: [
    "binary-tree-level-order-traversal",
    "minimum-depth-of-binary-tree",
    "number-of-islands",
    "rotting-oranges",
    "word-ladder",
    "open-the-lock",
  ],

  commonMistakes: [
    {
      title: "出队时才标记导致重复入队",
      wrongCode: "const node = queue.shift(); visited.add(node);",
      rightCode: "visited.add(neighbor); queue.push(neighbor);",
      explanation: "应该在入队时标记，否则同一节点可能多次入队",
      frequency: "high",
    },
    {
      title: "忘记记录层级大小",
      wrongCode: "while (queue.length) { const node = queue.shift(); }",
      rightCode: "const size = queue.length; for (let i = 0; i < size; i++)",
      explanation: "如果需要层级信息，必须先记录当前层大小",
      frequency: "medium",
    },
    {
      title: "矩阵越界未检查",
      wrongCode: "queue.push([x + dx, y + dy])",
      rightCode: "if (x >= 0 && x < m && y >= 0 && y < n) queue.push([x, y])",
      explanation: "访问矩阵前必须检查坐标是否越界",
      frequency: "high",
    },
  ],

  complexity: {
    time: "O(V + E)，V是节点数，E是边数",
    space: "O(V)",
    explanation: "每个节点最多入队一次，队列最大存储一层的节点",
  },
};

// ==================== DFS 模板 ====================
export const dfsTemplate: AlgorithmTemplate = {
  id: "dfs",
  name: "深度优先搜索 (DFS)",
  category: "graph",
  description: "递归探索图或树的所有分支，常用于遍历、路径查找、回溯",
  difficulty: "medium",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "DFS 是一种图遍历算法，从起点开始，沿着一条路径尽可能深入，直到无法继续，再回溯尝试其他路径。使用递归或栈实现。",
    whyUse: "DFS 适合探索所有可能的路径、检测连通性、拓扑排序。当需要找到所有解而不是最优解时，DFS 是首选。",
    howItWorks: `1. 访问当前节点，标记已访问
2. 递归访问所有未访问的邻居
3. 如果所有邻居都已访问，回溯到上一层
4. 重复直到所有节点都被访问`,
    visualMetaphor: "想象在迷宫中探索。你沿着一条路一直走到死胡同，然后回头到上一个岔路口，尝试另一条路。直到找到出口或走遍所有路径。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "recursive",
      name: "递归DFS",
      description: "使用函数调用栈实现",
      useCase: "树遍历、连通分量、岛屿问题",
      codeSnippet: `function dfs(node: TreeNode | null): void {
  if (!node) return;  // 终止条件

  // 处理当前节点
  visit(node);

  // 递归处理子节点
  dfs(node.left);
  dfs(node.right);
}`,
      exampleProblem: "maximum-depth-of-binary-tree",
    },
    {
      id: "iterative",
      name: "迭代DFS",
      description: "使用显式栈实现",
      useCase: "需要控制遍历顺序、避免栈溢出",
      codeSnippet: `const stack = [start];
while (stack.length) {
  const node = stack.pop()!;
  if (visited.has(node)) continue;
  visited.add(node);

  for (const neighbor of getNeighbors(node)) {
    stack.push(neighbor);
  }
}`,
      exampleProblem: "number-of-islands",
    },
    {
      id: "path-finding",
      name: "路径DFS",
      description: "记录路径，需要回溯",
      useCase: "所有路径、路径和、排列组合",
      codeSnippet: `function dfs(node: TreeNode, path: number[], result: number[][]): void {
  path.push(node.val);  // 做选择

  if (isLeaf(node)) {
    result.push([...path]);  // 记录路径
  } else {
    if (node.left) dfs(node.left, path, result);
    if (node.right) dfs(node.right, path, result);
  }

  path.pop();  // 撤销选择（回溯）
}`,
      exampleProblem: "path-sum",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "tree",
    title: "DFS 演示 - 二叉树前序遍历",
    description: "前序遍历二叉树 [1, 2, 3, 4, 5]",
    exampleInput: {
      description: "root = [1, 2, 3, 4, 5]",
      data: { tree: [1, 2, 3, 4, 5] },
    },
    steps: [
      {
        array: [1, 2, 3, 4, 5],
        current: 0,
        description: "访问根节点 1，前序遍历先访问根",
        variables: { result: [1], stack: "递归栈: [1]" },
        codeHighlight: [4, 5],
      },
      {
        array: [1, 2, 3, 4, 5],
        current: 1,
        completed: [0],
        description: "递归访问左子节点 2",
        variables: { result: [1, 2], stack: "递归栈: [1, 2]" },
        codeHighlight: [7],
      },
      {
        array: [1, 2, 3, 4, 5],
        current: 3,
        completed: [0, 1],
        description: "递归访问 2 的左子节点 4",
        variables: { result: [1, 2, 4], stack: "递归栈: [1, 2, 4]" },
        codeHighlight: [7],
      },
      {
        array: [1, 2, 3, 4, 5],
        current: 4,
        completed: [0, 1, 3],
        description: "4 无子节点，回溯到 2，访问右子节点 5",
        variables: { result: [1, 2, 4, 5], stack: "递归栈: [1, 2, 5]" },
        codeHighlight: [8],
      },
      {
        array: [1, 2, 3, 4, 5],
        current: 2,
        completed: [0, 1, 3, 4],
        description: "回溯到 1，访问右子节点 3",
        variables: { result: [1, 2, 4, 5, 3], stack: "递归栈: [1, 3]" },
        codeHighlight: [8],
      },
      {
        array: [1, 2, 3, 4, 5],
        completed: [0, 1, 2, 3, 4],
        description: "遍历完成！结果: [1, 2, 4, 5, 3]",
        variables: { result: [1, 2, 4, 5, 3], stack: "递归栈: []" },
        codeHighlight: [1],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["所有路径", "遍历", "连通", "岛屿", "组合", "排列"],
    dataStructures: ["树", "图", "矩阵"],
    problemTypes: ["遍历问题", "路径问题", "连通性问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定递归参数",
      description: "DFS 函数需要传递什么信息",
      question: "需要传递当前位置？路径信息？还是其他状态？",
      example: "通常包括：当前节点、已访问集合、当前路径等",
    },
    {
      step: 2,
      title: "确定终止条件",
      description: "什么时候停止递归",
      question: "到达叶子节点？越界？还是满足某条件？",
      example: "树：node === null | 矩阵：越界或已访问 | 目标：找到答案",
    },
    {
      step: 3,
      title: "处理当前节点",
      description: "在当前节点需要做什么",
      question: "需要记录路径？计算结果？还是标记访问？",
      example: "路径问题：将当前节点加入路径",
    },
    {
      step: 4,
      title: "递归探索相邻节点",
      description: "向下一层递归",
      question: "如何遍历所有可能的下一步？",
      example: "树：dfs(left), dfs(right) | 图：遍历所有邻居",
    },
  ],

  codeTemplate: {
    typescript: `function dfs(node: TreeNode | null): void {
  // 终止条件
  if (node === null) return;

  // 处理当前节点
  console.log(node.val);

  // 递归处理子节点
  dfs(node.left);
  dfs(node.right);
}

// 矩阵 DFS
function dfsMatrix(grid: number[][], i: number, j: number): void {
  const m = grid.length, n = grid[0].length;

  // 终止条件：越界或已访问
  if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
    return;
  }

  // 标记已访问
  grid[i][j] = 0;

  // 四个方向递归
  dfsMatrix(grid, i + 1, j);
  dfsMatrix(grid, i - 1, j);
  dfsMatrix(grid, i, j + 1);
  dfsMatrix(grid, i, j - 1);
}`,
    comments: `function dfs(node: TreeNode | null, path: number[], result: number[][]): void {
  // 1. 终止条件
  if (node === null) return;

  // 2. 处理当前节点（做选择）
  path.push(node.val);

  // 3. 判断是否到达目标（如：叶子节点）
  if (node.left === null && node.right === null) {
    result.push([...path]);  // 记录路径（注意要拷贝）
  }

  // 4. 递归探索
  dfs(node.left, path, result);
  dfs(node.right, path, result);

  // 5. 回溯（撤销选择）
  path.pop();
}`,
  },

  applicableProblems: [
    "binary-tree-inorder-traversal",
    "maximum-depth-of-binary-tree",
    "path-sum",
    "number-of-islands",
    "surrounded-regions",
    "clone-graph",
  ],

  commonMistakes: [
    {
      title: "忘记终止条件导致栈溢出",
      wrongCode: "function dfs(node) { dfs(node.left); }",
      rightCode: "function dfs(node) { if (!node) return; dfs(node.left); }",
      explanation: "递归必须有终止条件，否则无限递归",
      frequency: "high",
    },
    {
      title: "回溯时忘记撤销选择",
      wrongCode: "path.push(node); dfs(next);",
      rightCode: "path.push(node); dfs(next); path.pop();",
      explanation: "回溯问题必须在递归返回后撤销之前的选择",
      frequency: "high",
    },
    {
      title: "记录结果时直接引用",
      wrongCode: "result.push(path)",
      rightCode: "result.push([...path])",
      explanation: "必须拷贝路径，否则后续修改会影响已记录的结果",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(V + E) 或 O(n)",
    space: "O(h)，h 是递归深度",
    explanation: "访问所有节点，空间取决于递归深度（树的高度）",
  },
};

// ==================== 回溯模板 ====================
export const backtrackingTemplate: AlgorithmTemplate = {
  id: "backtracking",
  name: "回溯算法",
  category: "search",
  description: "穷举所有可能的解，通过剪枝优化，常用于排列组合、子集问题",
  difficulty: "medium",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "回溯是一种通过穷举来寻找所有可能解的算法。它在每一步做出选择，如果发现当前选择不能得到解，就回退（回溯）到上一步，尝试其他选择。",
    whyUse: "当问题需要找出所有满足条件的解（排列、组合、子集、分割等）时，回溯是标准解法。虽然时间复杂度高，但通过剪枝可以显著优化。",
    howItWorks: `1. 做选择：将当前元素加入路径
2. 递归：进入下一层决策
3. 撤销选择：回溯，恢复状态，尝试其他选择
4. 剪枝：提前排除不可能的分支`,
    visualMetaphor: "想象在一棵决策树上行走。每个节点是一个选择，从根到叶子的路径是一个完整的方案。回溯就是遍历这棵树，记录所有有效的路径。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "subsets",
      name: "子集型回溯",
      description: "每个元素选或不选，记录所有状态",
      useCase: "子集、幂集、组合",
      codeSnippet: `function backtrack(start: number): void {
  result.push([...path]);  // 每个节点都是一个解

  for (let i = start; i < n; i++) {
    path.push(nums[i]);     // 做选择
    backtrack(i + 1);       // 不能重复选
    path.pop();             // 撤销选择
  }
}`,
      exampleProblem: "subsets",
    },
    {
      id: "permutation",
      name: "排列型回溯",
      description: "所有元素的全排列",
      useCase: "全排列、字符串排列",
      codeSnippet: `function backtrack(): void {
  if (path.length === n) {
    result.push([...path]);
    return;
  }

  for (let i = 0; i < n; i++) {
    if (used[i]) continue;  // 跳过已使用
    used[i] = true;
    path.push(nums[i]);
    backtrack();
    path.pop();
    used[i] = false;
  }
}`,
      exampleProblem: "permutations",
    },
    {
      id: "combination-sum",
      name: "组合求和",
      description: "选择元素使和等于目标",
      useCase: "组合总和、零钱兑换路径",
      codeSnippet: `function backtrack(start: number, remain: number): void {
  if (remain === 0) {
    result.push([...path]);
    return;
  }

  for (let i = start; i < n; i++) {
    if (nums[i] > remain) break;  // 剪枝
    path.push(nums[i]);
    backtrack(i, remain - nums[i]);  // 可重复选
    path.pop();
  }
}`,
      exampleProblem: "combination-sum",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "tree",
    title: "回溯演示 - 生成子集",
    description: "生成数组 [1, 2] 的所有子集",
    exampleInput: {
      description: "nums = [1, 2]",
      data: { nums: [1, 2] },
    },
    steps: [
      {
        array: [1, 2],
        description: "开始：path = []，记录空集 []",
        variables: { path: [], result: [[]] },
        codeHighlight: [2],
      },
      {
        array: [1, 2],
        current: 0,
        highlights: [{ indices: [0], color: "blue", label: "选择" }],
        description: "选择 1：path = [1]，记录 [1]",
        variables: { path: [1], result: [[], [1]], i: 0 },
        codeHighlight: [4, 5],
      },
      {
        array: [1, 2],
        current: 1,
        highlights: [{ indices: [0, 1], color: "blue", label: "选择" }],
        description: "继续选择 2：path = [1, 2]，记录 [1, 2]",
        variables: { path: [1, 2], result: [[], [1], [1, 2]], i: 1 },
        codeHighlight: [4, 5],
      },
      {
        array: [1, 2],
        current: 0,
        highlights: [{ indices: [0], color: "yellow", label: "回溯" }],
        description: "回溯：撤销选择 2，path = [1]，无更多选择",
        variables: { path: [1], result: [[], [1], [1, 2]], action: "pop" },
        codeHighlight: [7],
      },
      {
        array: [1, 2],
        highlights: [{ indices: [], color: "yellow", label: "回溯" }],
        description: "再次回溯：撤销选择 1，path = []",
        variables: { path: [], result: [[], [1], [1, 2]], action: "pop" },
        codeHighlight: [7],
      },
      {
        array: [1, 2],
        current: 1,
        highlights: [{ indices: [1], color: "green", label: "选择" }],
        description: "从 i=1 开始：选择 2，path = [2]，记录 [2]",
        variables: { path: [2], result: [[], [1], [1, 2], [2]], i: 1 },
        codeHighlight: [4, 5],
      },
      {
        array: [1, 2],
        completed: [0, 1],
        description: "完成！所有子集：[[], [1], [1,2], [2]]",
        variables: { result: [[], [1], [1, 2], [2]] },
        codeHighlight: [2],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["所有", "全部", "排列", "组合", "子集", "划分", "可能"],
    dataStructures: ["数组", "字符串"],
    problemTypes: ["排列问题", "组合问题", "子集问题", "切割问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "画出决策树",
      description: "理解问题的递归结构",
      question: "每一步有哪些选择？形成什么样的树？",
      example: "子集：每个元素选或不选 | 排列：选择未使用的任意元素",
    },
    {
      step: 2,
      title: "确定路径和选择列表",
      description: "明确已做的选择和待做的选择",
      question: "path 记录什么？还有哪些可选？",
      example: "path 是已选元素，选择列表是剩余可选元素",
    },
    {
      step: 3,
      title: "确定结束条件",
      description: "什么时候得到一个完整解",
      question: "什么时候将 path 加入结果集？",
      example: "子集：每个节点都是解 | 排列：path 长度等于 n",
    },
    {
      step: 4,
      title: "考虑剪枝优化",
      description: "提前排除不可能的分支",
      question: "哪些分支一定不会产生解？如何提前排除？",
      example: "组合求和：当前和已超过目标，不再继续",
    },
  ],

  codeTemplate: {
    typescript: `function backtrack(
  nums: number[],
  path: number[],
  result: number[][],
  start: number
): void {
  // 记录结果
  result.push([...path]);

  // 遍历选择
  for (let i = start; i < nums.length; i++) {
    // 做选择
    path.push(nums[i]);

    // 递归
    backtrack(nums, path, result, i + 1);

    // 撤销选择
    path.pop();
  }
}`,
    comments: `function backtrack(
  nums: number[],
  path: number[],      // 当前路径（已做的选择）
  result: number[][],  // 结果集
  start: number        // 起始位置（避免重复）
): void {
  // 1. 结束条件：将当前路径加入结果
  // 子集问题：每个节点都是一个解
  result.push([...path]);

  // 2. 遍历所有选择
  for (let i = start; i < nums.length; i++) {
    // 3. 剪枝（可选）：跳过重复元素
    // if (i > start && nums[i] === nums[i-1]) continue;

    // 4. 做选择
    path.push(nums[i]);

    // 5. 递归进入下一层
    // 组合/子集：i + 1（不能重复使用）
    // 排列：0（可以使用任何未选的元素）
    backtrack(nums, path, result, i + 1);

    // 6. 撤销选择（回溯）
    path.pop();
  }
}

// 调用
const result: number[][] = [];
backtrack(nums, [], result, 0);`,
  },

  applicableProblems: [
    "subsets",
    "permutations",
    "combination-sum",
    "combinations",
    "palindrome-partitioning",
    "letter-combinations-of-a-phone-number",
    "n-queens",
  ],

  commonMistakes: [
    {
      title: "组合问题使用排列写法",
      wrongCode: "for (let i = 0; i < nums.length; i++)",
      rightCode: "for (let i = start; i < nums.length; i++)",
      explanation: "组合无序，需要用 start 避免重复；排列有序，从 0 开始",
      frequency: "high",
    },
    {
      title: "去重逻辑错误",
      wrongCode: "if (nums[i] === nums[i-1]) continue",
      rightCode: "if (i > start && nums[i] === nums[i-1]) continue",
      explanation: "只在同层去重（i > start），不同层可以选相同元素",
      frequency: "high",
    },
    {
      title: "忘记排序导致去重失败",
      wrongCode: "backtrack(nums, ...)",
      rightCode: "nums.sort((a, b) => a - b); backtrack(nums, ...)",
      explanation: "去重前必须先排序，让相同元素相邻",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n * 2^n) 子集 | O(n * n!) 排列",
    space: "O(n) 递归深度",
    explanation: "指数级或阶乘级复杂度，剪枝可以优化常数",
  },
};

// ==================== 动态规划模板 ====================
export const dpTemplate: AlgorithmTemplate = {
  id: "dynamic-programming",
  name: "动态规划",
  category: "dp",
  description: "将问题分解为重叠子问题，通过记录子问题的解避免重复计算",
  difficulty: "hard",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "动态规划是一种通过把原问题分解为相对简单的子问题来求解的方法。它将子问题的解存储起来，避免重复计算，从而提高效率。",
    whyUse: "当问题具有「最优子结构」（大问题的最优解包含小问题的最优解）和「重叠子问题」（同一个子问题会被多次计算）时，DP 是最优解法。",
    howItWorks: `1. 定义状态：dp[i] 代表什么含义
2. 状态转移：dp[i] 如何从 dp[i-1]、dp[i-2] 等推导
3. 初始化：边界条件 dp[0]、dp[1] 等
4. 遍历顺序：确保计算 dp[i] 时所需状态已计算
5. 返回值：根据状态定义确定答案`,
    visualMetaphor: "想象爬楼梯。到达第 n 阶的方法数 = 到达第 n-1 阶的方法数 + 到达第 n-2 阶的方法数。我们把每一阶的方法数记录下来，就不需要重复计算了。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "linear",
      name: "线性DP",
      description: "状态只依赖于前几个状态",
      useCase: "爬楼梯、打家劫舍、最大子数组和",
      codeSnippet: `const dp = new Array(n).fill(0);
dp[0] = base0;
dp[1] = base1;

for (let i = 2; i < n; i++) {
  dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i]);
}
return dp[n-1];`,
      exampleProblem: "climbing-stairs",
    },
    {
      id: "knapsack",
      name: "背包DP",
      description: "从物品中选择，满足容量限制的最优解",
      useCase: "01背包、完全背包、零钱兑换",
      codeSnippet: `const dp = new Array(amount + 1).fill(Infinity);
dp[0] = 0;

for (const coin of coins) {
  for (let i = coin; i <= amount; i++) {
    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}
return dp[amount] === Infinity ? -1 : dp[amount];`,
      exampleProblem: "coin-change",
    },
    {
      id: "interval",
      name: "区间DP",
      description: "在区间上进行决策",
      useCase: "戳气球、最长回文子串、合并石子",
      codeSnippet: `// dp[i][j] 表示区间 [i, j] 的最优解
for (let len = 2; len <= n; len++) {
  for (let i = 0; i + len - 1 < n; i++) {
    const j = i + len - 1;
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.max(dp[i][j], dp[i][k] + dp[k+1][j] + cost);
    }
  }
}`,
      exampleProblem: "burst-balloons",
    },
    {
      id: "sequence",
      name: "序列DP",
      description: "处理两个序列的匹配问题",
      useCase: "最长公共子序列、编辑距离",
      codeSnippet: `// dp[i][j] 表示 s1[0..i] 和 s2[0..j] 的 LCS 长度
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (s1[i-1] === s2[j-1]) {
      dp[i][j] = dp[i-1][j-1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
}`,
      exampleProblem: "longest-common-subsequence",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "dp",
    title: "动态规划演示 - 爬楼梯",
    description: "计算爬 5 阶楼梯有多少种方法（每次可以爬 1 或 2 阶）",
    exampleInput: {
      description: "n = 5",
      data: { n: 5 },
    },
    steps: [
      {
        dp: [1, 1, 0, 0, 0, 0],
        current: 1,
        description: "初始化：dp[0] = 1（原地不动），dp[1] = 1（爬1阶只有1种方法）",
        variables: { "dp[0]": 1, "dp[1]": 1 },
        codeHighlight: [2, 3],
      },
      {
        dp: [1, 1, 2, 0, 0, 0],
        current: 2,
        highlights: [{ indices: [0, 1], color: "blue", label: "依赖" }],
        description: "dp[2] = dp[1] + dp[0] = 1 + 1 = 2（从第1阶跨1步，或从第0阶跨2步）",
        variables: { "dp[2]": "dp[1] + dp[0] = 2" },
        codeHighlight: [6],
      },
      {
        dp: [1, 1, 2, 3, 0, 0],
        current: 3,
        highlights: [{ indices: [1, 2], color: "blue", label: "依赖" }],
        description: "dp[3] = dp[2] + dp[1] = 2 + 1 = 3",
        variables: { "dp[3]": "dp[2] + dp[1] = 3" },
        codeHighlight: [6],
      },
      {
        dp: [1, 1, 2, 3, 5, 0],
        current: 4,
        highlights: [{ indices: [2, 3], color: "blue", label: "依赖" }],
        description: "dp[4] = dp[3] + dp[2] = 3 + 2 = 5",
        variables: { "dp[4]": "dp[3] + dp[2] = 5" },
        codeHighlight: [6],
      },
      {
        dp: [1, 1, 2, 3, 5, 8],
        current: 5,
        highlights: [{ indices: [3, 4], color: "blue", label: "依赖" }],
        completed: [5],
        description: "dp[5] = dp[4] + dp[3] = 5 + 3 = 8，答案是 8 种方法！",
        variables: { "dp[5]": "dp[4] + dp[3] = 8", result: 8 },
        codeHighlight: [8],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["最大", "最小", "最长", "最短", "方案数", "是否可能", "最优"],
    dataStructures: ["数组", "字符串", "矩阵"],
    problemTypes: ["最值问题", "计数问题", "存在性问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "定义状态",
      description: "dp[i] 或 dp[i][j] 表示什么",
      question: "如何用一个数组元素表示一个子问题的解？",
      example: "dp[i] = 以第 i 个元素结尾的最长子序列长度",
    },
    {
      step: 2,
      title: "确定状态转移方程",
      description: "大问题如何由小问题推导",
      question: "dp[i] 如何由 dp[i-1]、dp[i-2] 等推导出来？",
      example: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
    },
    {
      step: 3,
      title: "确定初始状态",
      description: "最小子问题的解是什么",
      question: "dp[0]、dp[1] 等边界情况的值是多少？",
      example: "dp[0] = nums[0]，dp[1] = max(nums[0], nums[1])",
    },
    {
      step: 4,
      title: "确定遍历顺序",
      description: "按什么顺序计算状态",
      question: "计算 dp[i] 时需要哪些状态已经计算好？",
      example: "通常从小到大，有时需要逆序或多维遍历",
    },
    {
      step: 5,
      title: "确定返回值",
      description: "最终答案是哪个状态",
      question: "答案是 dp[n-1]？还是 dp 数组的最大值？",
      example: "LIS：max(dp) | 背包：dp[n] | 路径：dp[m-1][n-1]",
    },
  ],

  codeTemplate: {
    typescript: `function dp(nums: number[]): number {
  const n = nums.length;
  const dp = new Array(n).fill(0);

  // 初始化
  dp[0] = nums[0];

  // 状态转移
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}`,
    comments: `function dp(nums: number[]): number {
  const n = nums.length;

  // 1. 定义状态：dp[i] 表示考虑前 i 个元素的最优解
  const dp = new Array(n).fill(0);

  // 2. 初始化边界情况
  dp[0] = nums[0];                           // 只有一个元素
  dp[1] = Math.max(nums[0], nums[1]);        // 两个元素取较大

  // 3. 状态转移
  for (let i = 2; i < n; i++) {
    // 选择：不选当前元素 vs 选当前元素
    dp[i] = Math.max(
      dp[i - 1],           // 不选 nums[i]
      dp[i - 2] + nums[i]  // 选 nums[i]（不能选相邻的）
    );
  }

  // 4. 返回结果
  return dp[n - 1];
}

// 空间优化版本（滚动数组）
function dpOptimized(nums: number[]): number {
  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
  },

  applicableProblems: [
    "climbing-stairs",
    "house-robber",
    "maximum-subarray",
    "longest-increasing-subsequence",
    "coin-change",
    "unique-paths",
    "longest-common-subsequence",
  ],

  commonMistakes: [
    {
      title: "状态定义不清晰",
      wrongCode: "dp[i] = 前 i 个元素的解",
      rightCode: "dp[i] = 以第 i 个元素结尾的解",
      explanation: "状态定义要精确，'前 i 个'和'以 i 结尾'含义不同",
      frequency: "high",
    },
    {
      title: "初始化不完整",
      wrongCode: "dp[0] = 0",
      rightCode: "dp[0] = nums[0]; // 根据题意初始化",
      explanation: "初始化要覆盖所有边界情况，不能想当然地填 0",
      frequency: "medium",
    },
    {
      title: "遍历顺序错误",
      wrongCode: "for (let i = n-1; i >= 0; i--)",
      rightCode: "for (let i = 0; i < n; i++)",
      explanation: "确保计算 dp[i] 时所需的状态已经计算完成",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n) 或 O(n²) 取决于状态转移",
    space: "O(n)，可优化至 O(1)",
    explanation: "遍历所有状态，空间可以通过滚动数组优化",
  },
};

// ==================== 单调栈模板 ====================
export const monotonicStackTemplate: AlgorithmTemplate = {
  id: "monotonic-stack",
  name: "单调栈",
  category: "stack",
  description: "维护一个单调递增或递减的栈，常用于寻找下一个更大/更小元素",
  difficulty: "medium",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: "单调栈是一种特殊的栈，栈中元素始终保持单调递增或递减。当新元素破坏单调性时，弹出栈顶元素直到恢复单调性。",
    whyUse: "将 O(n²) 的暴力查找优化到 O(n)。当需要找到每个元素的「下一个更大/更小元素」或者处理「柱状图」类问题时，单调栈是最优解法。",
    howItWorks: `1. 遍历数组，尝试将当前元素入栈
2. 如果当前元素破坏单调性，弹出栈顶
3. 被弹出元素的「下一个更大」就是当前元素
4. 当前元素入栈，继续遍历`,
    visualMetaphor: "想象一排身高不同的人站成一列，每个人向右看，能看到的第一个比自己高的人就是「下一个更大」。单调栈就是模拟这个过程。",
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "next-greater",
      name: "下一个更大元素",
      description: "找每个元素右边第一个比它大的元素",
      useCase: "每日温度、下一个更大元素",
      codeSnippet: `const stack: number[] = [];  // 存索引，递减栈
const result = new Array(n).fill(-1);

for (let i = 0; i < n; i++) {
  while (stack.length && nums[i] > nums[stack.at(-1)!]) {
    const idx = stack.pop()!;
    result[idx] = nums[i];
  }
  stack.push(i);
}`,
      exampleProblem: "daily-temperatures",
    },
    {
      id: "prev-smaller",
      name: "前一个更小元素",
      description: "找每个元素左边第一个比它小的元素",
      useCase: "柱状图最大矩形的左边界",
      codeSnippet: `const stack: number[] = [];  // 递增栈
const leftSmaller = new Array(n).fill(-1);

for (let i = 0; i < n; i++) {
  while (stack.length && nums[stack.at(-1)!] >= nums[i]) {
    stack.pop();
  }
  if (stack.length) {
    leftSmaller[i] = stack.at(-1)!;
  }
  stack.push(i);
}`,
      exampleProblem: "largest-rectangle-in-histogram",
    },
    {
      id: "circular",
      name: "循环数组",
      description: "环形数组中找下一个更大元素",
      useCase: "下一个更大元素 II",
      codeSnippet: `// 遍历两遍数组
for (let i = 0; i < 2 * n; i++) {
  const idx = i % n;
  while (stack.length && nums[idx] > nums[stack.at(-1)!]) {
    result[stack.pop()!] = nums[idx];
  }
  if (i < n) stack.push(idx);
}`,
      exampleProblem: "next-greater-element-ii",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "stack",
    title: "单调栈演示 - 每日温度",
    description: "找出数组 [73, 74, 75, 71, 69, 72] 中每个元素的下一个更大元素的距离",
    exampleInput: {
      description: "temperatures = [73, 74, 75, 71, 69, 72]",
      data: { temperatures: [73, 74, 75, 71, 69, 72] },
    },
    steps: [
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [0],
        current: 0,
        description: "遍历 73（索引0），栈为空，直接入栈。栈: [0]",
        variables: { stack: [0], result: [0, 0, 0, 0, 0, 0] },
        codeHighlight: [8],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [1],
        current: 1,
        highlights: [{ indices: [0], color: "green", label: "弹出" }],
        description: "遍历 74 > 73，弹出索引0，result[0] = 1-0 = 1。栈: [1]",
        variables: { stack: [1], result: [1, 0, 0, 0, 0, 0] },
        codeHighlight: [5, 6, 7],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [2],
        current: 2,
        highlights: [{ indices: [1], color: "green", label: "弹出" }],
        description: "遍历 75 > 74，弹出索引1，result[1] = 2-1 = 1。栈: [2]",
        variables: { stack: [2], result: [1, 1, 0, 0, 0, 0] },
        codeHighlight: [5, 6, 7],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [2, 3],
        current: 3,
        description: "遍历 71 < 75，直接入栈。栈: [2, 3]",
        variables: { stack: [2, 3], result: [1, 1, 0, 0, 0, 0] },
        codeHighlight: [8],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [2, 3, 4],
        current: 4,
        description: "遍历 69 < 71，直接入栈。栈: [2, 3, 4]",
        variables: { stack: [2, 3, 4], result: [1, 1, 0, 0, 0, 0] },
        codeHighlight: [8],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        stack: [2, 5],
        current: 5,
        highlights: [{ indices: [3, 4], color: "green", label: "弹出" }],
        description: "遍历 72 > 69 > 71，连续弹出，result[4]=1, result[3]=2。栈: [2, 5]",
        variables: { stack: [2, 5], result: [1, 1, 0, 2, 1, 0] },
        codeHighlight: [5, 6, 7],
      },
      {
        array: [73, 74, 75, 71, 69, 72],
        completed: [0, 1, 2, 3, 4, 5],
        description: "遍历结束！栈中剩余元素无更大值（保持0）。结果: [1, 1, 0, 2, 1, 0]",
        variables: { result: [1, 1, 0, 2, 1, 0] },
        codeHighlight: [10],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["下一个更大", "下一个更小", "前一个更大", "温度", "股票"],
    dataStructures: ["数组"],
    problemTypes: ["查找问题", "区间问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定单调性",
      description: "栈应该保持递增还是递减",
      question: "找更大元素还是更小元素？",
      example: "找下一个更大：单调递减栈 | 找下一个更小：单调递增栈",
    },
    {
      step: 2,
      title: "确定栈中存储内容",
      description: "存元素值还是索引",
      question: "需要知道位置吗？",
      example: "需要计算距离时存索引，只需要值时存值",
    },
    {
      step: 3,
      title: "确定遍历方向",
      description: "从前往后还是从后往前",
      question: "找'下一个'还是'前一个'？",
      example: "找下一个：从前往后 | 找前一个：可以从后往前",
    },
    {
      step: 4,
      title: "处理弹栈逻辑",
      description: "什么时候弹出栈顶元素",
      question: "当前元素和栈顶的关系是什么？",
      example: "当前 > 栈顶时，栈顶的'下一个更大'就是当前元素",
    },
  ],

  codeTemplate: {
    typescript: `function nextGreater(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack: number[] = []; // 存索引

  for (let i = 0; i < n; i++) {
    // 当前元素比栈顶大，说明找到了栈顶的答案
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop()!;
      result[idx] = nums[i];
    }
    stack.push(i);
  }

  return result;
}`,
    comments: `function nextGreater(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);  // 初始化为 -1（表示不存在）
  const stack: number[] = [];             // 单调递减栈，存索引

  // 从前往后遍历
  for (let i = 0; i < n; i++) {
    // 当前元素比栈顶大时，栈顶元素的"下一个更大"就是当前元素
    while (stack.length && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop()!;     // 弹出栈顶
      result[idx] = nums[i];        // 记录答案
    }

    // 当前元素入栈
    stack.push(i);
  }

  // 栈中剩余的元素没有"下一个更大"，保持 -1
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
      title: "单调性搞反",
      wrongCode: "while (stack.length && nums[i] < nums[stack.top])",
      rightCode: "while (stack.length && nums[i] > nums[stack.top])",
      explanation: "找更大用递减栈（>弹出），找更小用递增栈（<弹出）",
      frequency: "high",
    },
    {
      title: "忘记处理环形数组",
      wrongCode: "for (let i = 0; i < n; i++)",
      rightCode: "for (let i = 0; i < 2 * n; i++) { const idx = i % n; }",
      explanation: "环形数组需要遍历两遍",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(n)",
    explanation: "每个元素最多入栈出栈一次",
  },
};

// ==================== 链表操作模板 ====================
export const linkedListTemplate: AlgorithmTemplate = {
  id: "linked-list",
  name: "链表操作",
  category: "linked-list",
  description: "链表的基本操作：反转、合并、查找中点、检测环等",
  difficulty: "easy",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: `链表是一种线性数据结构，由节点组成，每个节点包含数据和指向下一个节点的指针。
与数组不同，链表的元素在内存中不连续存储，通过指针连接。

链表的基本操作包括：
- **遍历**：从头节点开始，通过 next 指针逐个访问
- **反转**：改变每个节点的 next 指针方向
- **合并**：将两个链表按规则连接
- **查找**：使用快慢指针找中点、检测环`,

    whyUse: `链表在以下场景有优势：
1. **频繁插入删除**：O(1) 时间插入删除（已知位置）
2. **动态大小**：不需要预分配固定空间
3. **内存利用**：可以利用碎片化内存

常见链表问题类型：
- 反转类：整体反转、部分反转、K个一组反转
- 合并类：合并有序链表、合并K个链表
- 快慢指针：找中点、检测环、找环入口
- 双指针：删除倒数第N个节点、相交链表`,

    howItWorks: `链表操作的核心技巧：

**1. 虚拟头节点（Dummy Node）**
当头节点可能被删除或改变时，使用虚拟头节点简化边界处理：
\`\`\`
const dummy = new ListNode(0);
dummy.next = head;
// 操作后返回 dummy.next
\`\`\`

**2. 双指针/快慢指针**
- 找中点：slow 走一步，fast 走两步
- 找环：快慢相遇则有环
- 找环入口：相遇后，一个从头开始，再次相遇即入口

**3. 反转链表**
核心是三个指针：prev（已反转）、curr（当前）、next（待反转）
\`\`\`
while (curr) {
  next = curr.next;   // 保存下一个
  curr.next = prev;   // 反转指向
  prev = curr;        // 移动 prev
  curr = next;        // 移动 curr
}
\`\`\`

**4. 递归思维**
链表天然适合递归，因为链表本身就是递归结构（头节点 + 剩余链表）`,

    visualMetaphor: `想象一列火车：
- 每节车厢是一个**节点**
- 车厢之间的连接是 **next 指针**
- 反转链表就像让每节车厢的连接方向反过来
- 找中点就像两个人从头开始走，一个走两步一个走一步，快的到终点时慢的在中间
- 检测环就像在圆形赛道上，跑得快的人一定会追上跑得慢的人`,
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "reverse",
      name: "链表反转",
      description: "反转整个链表或部分链表",
      useCase: "需要改变链表顺序时",
      codeSnippet: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;  // 保存下一个
    curr.next = prev;        // 反转指向
    prev = curr;             // 移动 prev
    curr = next;             // 移动 curr
  }

  return prev;
}`,
      exampleProblem: "reverse-linked-list",
    },
    {
      id: "fast-slow",
      name: "快慢指针",
      description: "找中点、检测环、找环入口",
      useCase: "需要找链表中间位置或检测环时",
      codeSnippet: `// 找中点
function findMiddle(head: ListNode): ListNode {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  return slow;  // 偶数长度返回后半部分第一个
}

// 检测环
function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
      exampleProblem: "linked-list-cycle",
    },
    {
      id: "merge",
      name: "链表合并",
      description: "合并两个或多个有序链表",
      useCase: "需要将多个链表合并成一个时",
      codeSnippet: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;  // 接上剩余部分
  return dummy.next;
}`,
      exampleProblem: "merge-two-sorted-lists",
    },
    {
      id: "nth-from-end",
      name: "倒数第N个",
      description: "使用双指针找倒数第N个节点",
      useCase: "需要访问链表尾部位置时",
      codeSnippet: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy;
  let slow: ListNode | null = dummy;

  // fast 先走 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast!.next;
  }

  // 同时走，fast 到末尾时 slow 在目标前一个
  while (fast) {
    fast = fast.next;
    slow = slow!.next;
  }

  // 删除目标节点
  slow!.next = slow!.next!.next;
  return dummy.next;
}`,
      exampleProblem: "remove-nth-node-from-end-of-list",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "linked-list",
    title: "链表反转演示",
    description: "反转链表 1 → 2 → 3 → 4 → null",
    exampleInput: {
      description: "链表: 1 → 2 → 3 → 4",
      data: { list: [1, 2, 3, 4] },
    },
    steps: [
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [0], color: "blue", label: "curr" },
        ],
        description: "初始状态：prev = null, curr = 1",
        variables: { prev: "null", curr: 1, next: "?" },
        codeHighlight: [2, 3],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [0], color: "blue", label: "curr" },
          { indices: [1], color: "yellow", label: "next" },
        ],
        description: "保存 next = curr.next = 2",
        variables: { prev: "null", curr: 1, next: 2 },
        codeHighlight: [6],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [0], color: "green", label: "prev" },
          { indices: [1], color: "blue", label: "curr" },
        ],
        description: "反转指向：1.next = null，移动指针：prev = 1, curr = 2",
        variables: { prev: 1, curr: 2, reversed: "1 → null" },
        codeHighlight: [7, 8, 9],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [1], color: "blue", label: "curr" },
          { indices: [2], color: "yellow", label: "next" },
        ],
        description: "保存 next = 3",
        variables: { prev: 1, curr: 2, next: 3 },
        codeHighlight: [6],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [1], color: "green", label: "prev" },
          { indices: [2], color: "blue", label: "curr" },
        ],
        description: "反转指向：2.next = 1，移动指针：prev = 2, curr = 3",
        variables: { prev: 2, curr: 3, reversed: "2 → 1 → null" },
        codeHighlight: [7, 8, 9],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [2], color: "green", label: "prev" },
          { indices: [3], color: "blue", label: "curr" },
        ],
        description: "反转指向：3.next = 2，移动指针：prev = 3, curr = 4",
        variables: { prev: 3, curr: 4, reversed: "3 → 2 → 1 → null" },
        codeHighlight: [7, 8, 9],
      },
      {
        array: [1, 2, 3, 4],
        highlights: [
          { indices: [3], color: "green", label: "prev" },
        ],
        description: "反转指向：4.next = 3，curr = null，循环结束",
        variables: { prev: 4, curr: "null", reversed: "4 → 3 → 2 → 1 → null" },
        codeHighlight: [7, 8, 9],
      },
      {
        array: [4, 3, 2, 1],
        completed: [0, 1, 2, 3],
        description: "返回 prev = 4，反转完成！结果: 4 → 3 → 2 → 1 → null",
        variables: { result: "4 → 3 → 2 → 1 → null" },
        codeHighlight: [12],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["链表", "节点", "反转", "合并", "中点", "环", "相交"],
    dataStructures: ["单链表", "双向链表"],
    problemTypes: ["反转问题", "合并问题", "环检测", "位置查找"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "画图理清指针关系",
      description: "链表问题一定要画图",
      question: "节点之间如何连接？操作后应该变成什么样？",
      example: "画出操作前后的链表结构，标注每个指针的指向",
    },
    {
      step: 2,
      title: "考虑是否需要虚拟头节点",
      description: "简化头节点的边界处理",
      question: "头节点可能被删除或改变吗？",
      example: "合并链表、删除节点时使用 dummy 节点",
    },
    {
      step: 3,
      title: "确定需要几个指针",
      description: "跟踪必要的节点",
      question: "需要前驱节点吗？需要快慢指针吗？",
      example: "反转需要 prev/curr/next，找中点需要 slow/fast",
    },
    {
      step: 4,
      title: "注意指针操作顺序",
      description: "避免断链",
      question: "改变指针指向时，会不会丢失后续节点？",
      example: "先保存 next = curr.next，再操作 curr.next",
    },
  ],

  codeTemplate: {
    typescript: `// 反转链表
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

// 找中点
function findMiddle(head: ListNode | null): ListNode | null {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}

// 检测环
function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`,
    comments: `// 反转链表（迭代法）
function reverseList(head: ListNode | null): ListNode | null {
  // 1. 初始化三个指针
  let prev: ListNode | null = null;  // 已反转部分的头
  let curr = head;                    // 当前处理的节点

  while (curr) {
    // 2. 保存下一个节点（防止断链）
    const next = curr.next;

    // 3. 反转指针
    curr.next = prev;

    // 4. 移动指针
    prev = curr;
    curr = next;
  }

  // 5. prev 现在指向新的头节点
  return prev;
}

// 合并两个有序链表
function mergeLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  // 使用虚拟头节点简化操作
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // 接上剩余部分
  curr.next = l1 || l2;

  return dummy.next;
}`,
  },

  applicableProblems: [
    "reverse-linked-list",
    "merge-two-sorted-lists",
    "linked-list-cycle",
    "middle-of-the-linked-list",
    "remove-nth-node-from-end-of-list",
    "palindrome-linked-list",
  ],

  commonMistakes: [
    {
      title: "操作前未保存 next 导致断链",
      wrongCode: "curr.next = prev; curr = curr.next;",
      rightCode: "const next = curr.next; curr.next = prev; curr = next;",
      explanation: "改变 next 指向前必须先保存原来的 next",
      frequency: "high",
    },
    {
      title: "忘记处理空链表",
      wrongCode: "head.next",
      rightCode: "if (!head) return null; head.next",
      explanation: "操作前检查链表是否为空",
      frequency: "medium",
    },
    {
      title: "快慢指针边界错误",
      wrongCode: "while (fast.next)",
      rightCode: "while (fast && fast.next)",
      explanation: "fast 本身也可能为 null，都要检查",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(1) 迭代 / O(n) 递归",
    explanation: "通常只需遍历一次，空间取决于使用迭代还是递归",
  },
};

// ==================== 二叉树遍历模板 ====================
export const treeTraversalTemplate: AlgorithmTemplate = {
  id: "tree-traversal",
  name: "二叉树遍历",
  category: "tree",
  description: "二叉树的前序、中序、后序、层序遍历，递归和迭代实现",
  difficulty: "easy",

  // ========== 核心原理讲解 ==========
  coreExplanation: {
    whatIs: `二叉树遍历是按照特定顺序访问树中所有节点的过程。
根据访问根节点的时机，分为三种深度优先遍历：

- **前序遍历（Preorder）**：根 → 左 → 右
- **中序遍历（Inorder）**：左 → 根 → 右
- **后序遍历（Postorder）**：左 → 右 → 根

还有一种广度优先遍历：
- **层序遍历（Level Order）**：逐层从左到右访问`,

    whyUse: `不同遍历方式适用于不同场景：

**前序遍历**：
- 复制/序列化树结构
- 打印树结构（父节点优先）
- 求解前缀表达式

**中序遍历**：
- BST 得到有序序列
- 表达式树得到中缀表达式
- 二叉搜索树验证

**后序遍历**：
- 删除树（先删子节点）
- 计算目录大小（先算子目录）
- 表达式求值

**层序遍历**：
- 计算层数/最大宽度
- 按层打印
- 寻找最近的目标节点`,

    howItWorks: `**递归实现**
递归是最直观的方式，三种遍历只是调整代码顺序：
\`\`\`
function traverse(node) {
  if (!node) return;
  // result.push(node.val);  // 前序：这里处理
  traverse(node.left);
  // result.push(node.val);  // 中序：这里处理
  traverse(node.right);
  // result.push(node.val);  // 后序：这里处理
}
\`\`\`

**迭代实现（使用栈）**
核心思想：用栈模拟递归调用栈
\`\`\`
// 中序遍历迭代
while (curr || stack.length) {
  while (curr) {           // 一路向左
    stack.push(curr);
    curr = curr.left;
  }
  curr = stack.pop();      // 回溯
  result.push(curr.val);   // 访问
  curr = curr.right;       // 转向右子树
}
\`\`\`

**层序遍历（使用队列）**
\`\`\`
queue.push(root);
while (queue.length) {
  const size = queue.length;  // 记录当前层节点数
  for (let i = 0; i < size; i++) {
    const node = queue.shift();
    // 处理当前节点
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
\`\`\``,

    visualMetaphor: `想象你在参观一棵家谱树：
- **前序遍历**：像自上而下介绍，先介绍爷爷，再介绍爸爸和叔叔
- **中序遍历**：像年龄排序，先介绍最小的孙子，然后父亲，再伯伯...
- **后序遍历**：像从下往上汇报，先汇报子女情况，最后汇报自己
- **层序遍历**：像拍集体照，一排一排站好，按排拍照`,
  },

  // ========== 变体模式 ==========
  variants: [
    {
      id: "preorder",
      name: "前序遍历",
      description: "根 → 左 → 右",
      useCase: "需要先处理父节点，如复制树、序列化",
      codeSnippet: `// 递归
function preorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) return;
    result.push(node.val);    // 先访问根
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return result;
}

// 迭代
function preorderIterative(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    // 先右后左，出栈时就是先左后右
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}`,
      exampleProblem: "binary-tree-preorder-traversal",
    },
    {
      id: "inorder",
      name: "中序遍历",
      description: "左 → 根 → 右",
      useCase: "BST 得到有序序列，验证 BST",
      codeSnippet: `// 递归
function inorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);    // 中间访问根
    dfs(node.right);
  }
  dfs(root);
  return result;
}

// 迭代
function inorderIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr = root;

  while (curr || stack.length) {
    while (curr) {            // 一路向左
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop()!;
    result.push(curr.val);    // 访问
    curr = curr.right;        // 转向右子树
  }
  return result;
}`,
      exampleProblem: "binary-tree-inorder-traversal",
    },
    {
      id: "postorder",
      name: "后序遍历",
      description: "左 → 右 → 根",
      useCase: "需要先处理子节点，如删除树、计算大小",
      codeSnippet: `// 递归
function postorder(root: TreeNode | null): number[] {
  const result: number[] = [];
  function dfs(node: TreeNode | null) {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    result.push(node.val);    // 最后访问根
  }
  dfs(root);
  return result;
}

// 迭代（前序变形后反转）
function postorderIterative(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length) {
    const node = stack.pop()!;
    result.push(node.val);
    // 与前序相反：先左后右
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return result.reverse();  // 反转得到后序
}`,
      exampleProblem: "binary-tree-postorder-traversal",
    },
    {
      id: "levelorder",
      name: "层序遍历",
      description: "逐层从左到右",
      useCase: "按层处理、最短路径、计算深度宽度",
      codeSnippet: `function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const level: number[] = [];
    const size = queue.length;  // 关键：记录当前层大小

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`,
      exampleProblem: "binary-tree-level-order-traversal",
    },
  ],

  // ========== 动画示例 ==========
  animation: {
    type: "tree",
    title: "二叉树中序遍历演示",
    description: "中序遍历二叉树：左 → 根 → 右",
    exampleInput: {
      description: "二叉树结构：\n    1\n   / \\\n  2   3\n / \\\n4   5",
      data: { tree: [1, 2, 3, 4, 5] },
    },
    steps: [
      {
        description: "开始中序遍历，从根节点1开始，先往左走",
        variables: { current: 1, stack: [], result: [] },
        codeHighlight: [1, 2],
      },
      {
        description: "访问节点2，继续往左走",
        variables: { current: 2, stack: [1], result: [] },
        codeHighlight: [5, 6],
      },
      {
        description: "访问节点4，没有左子节点，访问4",
        variables: { current: 4, stack: [1, 2], result: [] },
        codeHighlight: [5, 6],
      },
      {
        description: "节点4没有左子树，访问4，然后检查右子树",
        variables: { current: 4, stack: [1, 2], result: [4] },
        codeHighlight: [9, 10],
      },
      {
        description: "节点4没有右子树，回溯到节点2，访问2",
        variables: { current: 2, stack: [1], result: [4, 2] },
        codeHighlight: [9, 10],
      },
      {
        description: "检查节点2的右子树，访问节点5",
        variables: { current: 5, stack: [1], result: [4, 2] },
        codeHighlight: [11, 5],
      },
      {
        description: "节点5没有子节点，访问5",
        variables: { current: 5, stack: [1], result: [4, 2, 5] },
        codeHighlight: [9, 10],
      },
      {
        description: "回溯到节点1，访问1",
        variables: { current: 1, stack: [], result: [4, 2, 5, 1] },
        codeHighlight: [9, 10],
      },
      {
        description: "检查节点1的右子树，访问节点3",
        variables: { current: 3, stack: [], result: [4, 2, 5, 1] },
        codeHighlight: [11, 5],
      },
      {
        description: "节点3没有子节点，访问3，遍历完成！",
        variables: { current: 3, stack: [], result: [4, 2, 5, 1, 3] },
        codeHighlight: [9, 10],
      },
      {
        completed: [0, 1, 2, 3, 4],
        description: "中序遍历完成！结果: [4, 2, 5, 1, 3]",
        variables: { result: [4, 2, 5, 1, 3] },
        codeHighlight: [14],
      },
    ],
  },

  recognitionPatterns: {
    keywords: ["遍历", "前序", "中序", "后序", "层序", "深度", "路径"],
    dataStructures: ["二叉树"],
    problemTypes: ["遍历问题", "路径问题", "构造问题"],
  },

  thinkingSteps: [
    {
      step: 1,
      title: "确定遍历顺序",
      description: "根据题目要求选择遍历方式",
      question: "题目需要什么顺序访问节点？",
      example: "前序：根-左-右 | 中序：左-根-右 | 后序：左-右-根 | 层序：逐层",
    },
    {
      step: 2,
      title: "选择实现方式",
      description: "递归简洁，迭代更灵活",
      question: "用递归还是迭代？",
      example: "面试推荐掌握两种方式，递归更容易写对",
    },
    {
      step: 3,
      title: "确定处理逻辑",
      description: "在什么时机处理节点",
      question: "访问节点时需要做什么？",
      example: "记录值、计算路径和、判断条件等",
    },
  ],

  codeTemplate: {
    typescript: `// 递归遍历
function inorder(root: TreeNode | null, result: number[]): void {
  if (!root) return;
  inorder(root.left, result);   // 左
  result.push(root.val);         // 根
  inorder(root.right, result);  // 右
}

// 迭代中序遍历
function inorderIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let curr = root;

  while (curr || stack.length) {
    // 一路向左
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }

    // 访问节点
    curr = stack.pop()!;
    result.push(curr.val);

    // 转向右子树
    curr = curr.right;
  }

  return result;
}

// 层序遍历
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];

  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const level: number[] = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}`,
    comments: `// 三种递归遍历的区别只在于 result.push 的位置
function preorder(root: TreeNode | null, result: number[]): void {
  if (!root) return;
  result.push(root.val);         // 前序：先访问根
  preorder(root.left, result);
  preorder(root.right, result);
}

function inorder(root: TreeNode | null, result: number[]): void {
  if (!root) return;
  inorder(root.left, result);
  result.push(root.val);         // 中序：中间访问根
  inorder(root.right, result);
}

function postorder(root: TreeNode | null, result: number[]): void {
  if (!root) return;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);         // 后序：最后访问根
}`,
  },

  applicableProblems: [
    "binary-tree-inorder-traversal",
    "binary-tree-preorder-traversal",
    "binary-tree-postorder-traversal",
    "binary-tree-level-order-traversal",
    "maximum-depth-of-binary-tree",
    "symmetric-tree",
  ],

  commonMistakes: [
    {
      title: "迭代遍历忘记处理右子树",
      wrongCode: "curr = stack.pop(); result.push(curr.val);",
      rightCode: "curr = stack.pop(); result.push(curr.val); curr = curr.right;",
      explanation: "访问完当前节点后，要转向右子树继续处理",
      frequency: "medium",
    },
    {
      title: "层序遍历未记录层大小",
      wrongCode: "while (queue.length) { const node = queue.shift(); }",
      rightCode: "const size = queue.length; for (let i = 0; i < size; i++)",
      explanation: "需要区分层级时，必须先记录当前层的节点数",
      frequency: "medium",
    },
  ],

  complexity: {
    time: "O(n)",
    space: "O(h) 递归 / O(n) 层序",
    explanation: "访问所有节点，递归空间取决于树高，层序最多存一层节点",
  },
};

// 导出所有模板
export const allTemplates: AlgorithmTemplate[] = [
  twoPointersTemplate,
  slidingWindowTemplate,
  binarySearchTemplate,
  bfsTemplate,
  dfsTemplate,
  backtrackingTemplate,
  dpTemplate,
  monotonicStackTemplate,
  linkedListTemplate,
  treeTraversalTemplate,
];

// 根据 ID 获取模板
export function getTemplateById(id: string): AlgorithmTemplate | undefined {
  return allTemplates.find((t) => t.id === id);
}

// 根据关键词匹配模板
export function matchTemplatesByKeywords(keywords: string[]): AlgorithmTemplate[] {
  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  return allTemplates.filter((template) =>
    template.recognitionPatterns.keywords.some((k) =>
      lowerKeywords.some((lk) => k.includes(lk) || lk.includes(k))
    )
  );
}

// 根据题目 ID 获取适用的模板
export function getTemplatesForProblem(problemId: string): AlgorithmTemplate[] {
  return allTemplates.filter((template) =>
    template.applicableProblems.includes(problemId)
  );
}
