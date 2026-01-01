/**
 * 代码同步动画数据类型
 *
 * 用于创建动画与代码执行紧密联动的学习体验
 */

import { CodeSyncStep } from "../components/animations";

/**
 * 代码同步动画配置
 */
export interface CodeSyncAnimationData {
  /** 动画ID */
  id: string;

  /** 动画标题 */
  title: string;

  /** 问题描述 */
  description: string;

  /** 完整的解法代码 */
  code: string;

  /** 输入数据描述 */
  input: {
    description: string;
    data: Record<string, unknown>;
  };

  /** 动画步骤 */
  steps: CodeSyncStep[];

  /** 可视化类型 */
  visualizationType:
    | "array"
    | "hash-table"
    | "linked-list"
    | "tree"
    | "matrix"
    | "stack"
    | "two-pointers"
    | "sliding-window";

  /** 可视化数据（每步对应的可视化状态） */
  visualizationSteps: VisualizationStep[];
}

/**
 * 可视化步骤数据
 */
export interface VisualizationStep {
  /** 数组数据 */
  array?: (number | string)[];

  /** 指针位置 */
  pointers?: {
    index: number;
    label: string;
    color: "blue" | "green" | "red" | "yellow" | "purple";
  }[];

  /** 高亮元素 */
  highlights?: {
    indices: number[];
    color: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
    label?: string;
  }[];

  /** 已完成的元素 */
  completed?: number[];

  /** 比较中的元素 */
  comparing?: number[];

  /** 哈希表状态 */
  hashTable?: { key: string | number; value: unknown; highlight?: boolean }[];

  /** 栈状态 */
  stack?: (string | number)[];

  /** 链表状态 */
  linkedList?: { value: unknown; next?: number; highlight?: boolean }[];

  /** 额外的注释标签 */
  annotations?: { index: number; text: string }[];
}

// ==================== Two Sum 代码同步动画数据 ====================

export const twoSumCodeSyncAnimation: CodeSyncAnimationData = {
  id: "two-sum-hash-map",
  title: "两数之和 - 哈希表解法",
  description: "使用哈希表一次遍历找到两数之和",

  code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,

  input: {
    description: "nums = [2, 7, 11, 15], target = 9",
    data: { nums: [2, 7, 11, 15], target: 9 },
  },

  visualizationType: "hash-table",

  steps: [
    {
      description: "初始化：创建一个空的哈希表 Map",
      executingLine: 2,
      codeHighlight: [2],
      variables: [
        { name: "nums", value: [2, 7, 11, 15], type: "array" },
        { name: "target", value: 9, type: "number" },
        { name: "map", value: "{}", type: "object", changed: true },
      ],
      thought: "哈希表用于存储我们遍历过的数字和它们的索引，方便快速查找",
    },
    {
      description: "开始遍历：i = 0, 当前元素 nums[0] = 2",
      executingLine: 4,
      codeHighlight: [4],
      variables: [
        { name: "i", value: 0, type: "number", changed: true },
        { name: "nums[i]", value: 2, type: "number", changed: true },
        { name: "map", value: "{}", type: "object" },
      ],
      thought: "从数组第一个元素开始遍历",
    },
    {
      description: "计算补数：complement = 9 - 2 = 7",
      executingLine: 5,
      codeHighlight: [5],
      variables: [
        { name: "i", value: 0, type: "number" },
        { name: "nums[i]", value: 2, type: "number" },
        { name: "complement", value: 7, type: "number", changed: true },
        { name: "map", value: "{}", type: "object" },
      ],
      thought: "我们需要找到值为 7 的元素，因为 2 + 7 = 9",
      codeComment: "target - nums[i] = 9 - 2 = 7",
    },
    {
      description: "检查 Map：7 不在 Map 中",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "i", value: 0, type: "number" },
        { name: "complement", value: 7, type: "number" },
        { name: "map.has(7)", value: false, type: "boolean", changed: true },
      ],
      thought: "补数 7 还没有被遍历过，继续",
    },
    {
      description: "存入 Map：map.set(2, 0)，将当前元素存入哈希表",
      executingLine: 11,
      codeHighlight: [11],
      variables: [
        { name: "i", value: 0, type: "number" },
        { name: "nums[i]", value: 2, type: "number" },
        { name: "map", value: "{ 2 → 0 }", type: "object", changed: true },
      ],
      thought: "把数值 2 和它的索引 0 存入 Map，供后续查找",
      codeComment: "存储格式：数值 → 索引",
    },
    {
      description: "继续遍历：i = 1, 当前元素 nums[1] = 7",
      executingLine: 4,
      codeHighlight: [4],
      variables: [
        { name: "i", value: 1, type: "number", changed: true },
        { name: "nums[i]", value: 7, type: "number", changed: true },
        { name: "map", value: "{ 2 → 0 }", type: "object" },
      ],
    },
    {
      description: "计算补数：complement = 9 - 7 = 2",
      executingLine: 5,
      codeHighlight: [5],
      variables: [
        { name: "i", value: 1, type: "number" },
        { name: "nums[i]", value: 7, type: "number" },
        { name: "complement", value: 2, type: "number", changed: true },
        { name: "map", value: "{ 2 → 0 }", type: "object" },
      ],
      thought: "我们需要找到值为 2 的元素",
    },
    {
      description: "检查 Map：2 在 Map 中！map.get(2) = 0",
      executingLine: 7,
      codeHighlight: [7, 8],
      variables: [
        { name: "i", value: 1, type: "number" },
        { name: "complement", value: 2, type: "number" },
        { name: "map.has(2)", value: true, type: "boolean", changed: true },
        { name: "map.get(2)", value: 0, type: "number", changed: true },
      ],
      thought: "找到了！补数 2 的索引是 0，当前索引是 1",
    },
    {
      description: "返回结果：[0, 1]",
      executingLine: 8,
      codeHighlight: [8],
      variables: [
        { name: "result", value: [0, 1], type: "array", changed: true },
      ],
      result: {
        value: [0, 1],
        label: "找到答案",
        success: true,
      },
      thought: "nums[0] + nums[1] = 2 + 7 = 9 = target ✓",
    },
  ],

  visualizationSteps: [
    {
      array: [2, 7, 11, 15],
      hashTable: [],
      annotations: [{ index: -1, text: "target = 9" }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 0, label: "i=0", color: "blue" }],
      highlights: [{ indices: [0], color: "yellow", label: "当前" }],
      hashTable: [],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 0, label: "i=0", color: "blue" }],
      highlights: [{ indices: [0], color: "yellow", label: "2" }],
      hashTable: [],
      annotations: [{ index: 0, text: "找 7" }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 0, label: "i=0", color: "blue" }],
      highlights: [{ indices: [0], color: "yellow" }],
      hashTable: [],
      annotations: [{ index: 0, text: "7 不在 Map" }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 0, label: "i=0", color: "blue" }],
      completed: [0],
      hashTable: [{ key: 2, value: 0, highlight: true }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 1, label: "i=1", color: "blue" }],
      completed: [0],
      highlights: [{ indices: [1], color: "yellow", label: "当前" }],
      hashTable: [{ key: 2, value: 0 }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 1, label: "i=1", color: "blue" }],
      completed: [0],
      highlights: [{ indices: [1], color: "yellow", label: "7" }],
      hashTable: [{ key: 2, value: 0 }],
      annotations: [{ index: 1, text: "找 2" }],
    },
    {
      array: [2, 7, 11, 15],
      pointers: [{ index: 1, label: "i=1", color: "blue" }],
      highlights: [
        { indices: [0], color: "green", label: "补数" },
        { indices: [1], color: "green", label: "当前" },
      ],
      hashTable: [{ key: 2, value: 0, highlight: true }],
      annotations: [{ index: 0, text: "找到!" }],
    },
    {
      array: [2, 7, 11, 15],
      highlights: [{ indices: [0, 1], color: "green", label: "答案" }],
      hashTable: [{ key: 2, value: 0 }],
      annotations: [
        { index: 0, text: "[0" },
        { index: 1, text: "1]" },
      ],
    },
  ],
};

// ==================== 滑动窗口示例 ====================

export const maxSlidingWindowCodeSync: CodeSyncAnimationData = {
  id: "max-sliding-window",
  title: "滑动窗口最大值",
  description: "使用滑动窗口找到每个窗口的最大值",

  code: `function maxSlidingWindow(nums, k) {
  const result = [];

  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = i; j < i + k; j++) {
      max = Math.max(max, nums[j]);
    }
    result.push(max);
  }

  return result;
}`,

  input: {
    description: "nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3",
    data: { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3 },
  },

  visualizationType: "sliding-window",

  steps: [
    {
      description: "初始化结果数组",
      executingLine: 2,
      codeHighlight: [2],
      variables: [
        { name: "nums", value: [1, 3, -1, -3, 5, 3, 6, 7], type: "array" },
        { name: "k", value: 3, type: "number" },
        { name: "result", value: [], type: "array", changed: true },
      ],
      thought: "创建一个数组来存储每个窗口的最大值",
    },
    {
      description: "第一个窗口 [1, 3, -1]，找最大值",
      executingLine: 4,
      codeHighlight: [4, 5, 6, 7],
      variables: [
        { name: "i", value: 0, type: "number", changed: true },
        { name: "窗口", value: [1, 3, -1], type: "array" },
        { name: "max", value: 3, type: "number", changed: true },
      ],
      thought: "窗口内最大值是 3",
    },
    {
      description: "滑动窗口 [3, -1, -3]，找最大值",
      executingLine: 4,
      codeHighlight: [4, 5, 6, 7],
      variables: [
        { name: "i", value: 1, type: "number", changed: true },
        { name: "窗口", value: [3, -1, -3], type: "array" },
        { name: "max", value: 3, type: "number" },
        { name: "result", value: [3], type: "array" },
      ],
      thought: "窗口内最大值是 3",
    },
    {
      description: "滑动窗口 [-1, -3, 5]，找最大值",
      executingLine: 4,
      codeHighlight: [4, 5, 6, 7],
      variables: [
        { name: "i", value: 2, type: "number", changed: true },
        { name: "窗口", value: [-1, -3, 5], type: "array" },
        { name: "max", value: 5, type: "number", changed: true },
        { name: "result", value: [3, 3], type: "array" },
      ],
      thought: "窗口内最大值是 5",
    },
  ],

  visualizationSteps: [
    {
      array: [1, 3, -1, -3, 5, 3, 6, 7],
    },
    {
      array: [1, 3, -1, -3, 5, 3, 6, 7],
      highlights: [{ indices: [0, 1, 2], color: "blue", label: "窗口" }],
      annotations: [{ index: 1, text: "max=3" }],
    },
    {
      array: [1, 3, -1, -3, 5, 3, 6, 7],
      highlights: [{ indices: [1, 2, 3], color: "blue", label: "窗口" }],
      completed: [0],
      annotations: [{ index: 1, text: "max=3" }],
    },
    {
      array: [1, 3, -1, -3, 5, 3, 6, 7],
      highlights: [{ indices: [2, 3, 4], color: "blue", label: "窗口" }],
      completed: [0, 1],
      annotations: [{ index: 4, text: "max=5" }],
    },
  ],
};

// ==================== 导出所有代码同步动画数据 ====================

// ==================== 有效的括号 - 栈解法 ====================

export const validParenthesesCodeSync: CodeSyncAnimationData = {
  id: "valid-parentheses-stack",
  title: "有效的括号 - 栈解法",
  description: "使用栈来匹配括号",

  code: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,

  input: {
    description: 's = "([{}])"',
    data: { s: "([{}])" },
  },

  visualizationType: "stack",

  steps: [
    {
      description: "初始化：创建空栈和括号映射表",
      executingLine: 2,
      codeHighlight: [2, 3],
      variables: [
        { name: "s", value: "([{}])", type: "string" },
        { name: "stack", value: [], type: "array", changed: true },
      ],
      thought: "栈用于存储左括号，遇到右括号时检查匹配",
    },
    {
      description: "遇到 '('，左括号入栈",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "char", value: "(", type: "string", changed: true },
        { name: "stack", value: ["("], type: "array", changed: true },
      ],
      thought: "左括号直接入栈，等待匹配的右括号",
    },
    {
      description: "遇到 '['，左括号入栈",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "char", value: "[", type: "string", changed: true },
        { name: "stack", value: ["(", "["], type: "array", changed: true },
      ],
    },
    {
      description: "遇到 '{'，左括号入栈",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "char", value: "{", type: "string", changed: true },
        { name: "stack", value: ["(", "[", "{"], type: "array", changed: true },
      ],
    },
    {
      description: "遇到 '}'，弹出栈顶 '{'，匹配成功！",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "char", value: "}", type: "string", changed: true },
        { name: "pairs['}']", value: "{", type: "string" },
        { name: "stack.pop()", value: "{", type: "string" },
        { name: "stack", value: ["(", "["], type: "array", changed: true },
      ],
      thought: "栈顶的 '{' 和当前的 '}' 匹配",
    },
    {
      description: "遇到 ']'，弹出栈顶 '['，匹配成功！",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "char", value: "]", type: "string", changed: true },
        { name: "stack.pop()", value: "[", type: "string" },
        { name: "stack", value: ["("], type: "array", changed: true },
      ],
    },
    {
      description: "遇到 ')'，弹出栈顶 '('，匹配成功！",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "char", value: ")", type: "string", changed: true },
        { name: "stack.pop()", value: "(", type: "string" },
        { name: "stack", value: [], type: "array", changed: true },
      ],
    },
    {
      description: "遍历完成，栈为空，所有括号都匹配！",
      executingLine: 14,
      codeHighlight: [14],
      variables: [
        { name: "stack.length", value: 0, type: "number" },
      ],
      result: { value: true, label: "有效括号", success: true },
      thought: "栈为空说明所有左括号都找到了匹配的右括号",
    },
  ],

  visualizationSteps: [
    { stack: [], annotations: [{ index: 0, text: 's = "([{}])"' }] },
    { stack: ["("], highlights: [{ indices: [0], color: "green" }] },
    { stack: ["(", "["], highlights: [{ indices: [0, 1], color: "green" }] },
    { stack: ["(", "[", "{"], highlights: [{ indices: [0, 1, 2], color: "green" }] },
    { stack: ["(", "["], highlights: [{ indices: [0, 1], color: "green" }], annotations: [{ index: 0, text: "} 匹配 {" }] },
    { stack: ["("], highlights: [{ indices: [0], color: "green" }], annotations: [{ index: 0, text: "] 匹配 [" }] },
    { stack: [], annotations: [{ index: 0, text: ") 匹配 (" }] },
    { stack: [], annotations: [{ index: 0, text: "栈空 → true" }] },
  ],
};

// ==================== 反转链表 ====================

export const reverseLinkedListCodeSync: CodeSyncAnimationData = {
  id: "reverse-linked-list",
  title: "反转链表 - 迭代法",
  description: "使用三个指针迭代反转链表",

  code: `function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}`,

  input: {
    description: "head = [1, 2, 3, 4, 5]",
    data: { head: [1, 2, 3, 4, 5] },
  },

  visualizationType: "linked-list",

  steps: [
    {
      description: "初始化：prev = null, curr = head",
      executingLine: 2,
      codeHighlight: [2, 3],
      variables: [
        { name: "prev", value: null, type: "null", changed: true },
        { name: "curr", value: "节点1", type: "object", changed: true },
      ],
      thought: "prev 最终会成为新的头节点，curr 用于遍历",
    },
    {
      description: "保存下一个节点：next = curr.next (节点2)",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "prev", value: null, type: "null" },
        { name: "curr", value: "节点1", type: "object" },
        { name: "next", value: "节点2", type: "object", changed: true },
      ],
      thought: "先保存 next，否则改变 curr.next 后就丢失了",
    },
    {
      description: "反转指针：curr.next = prev (1 → null)",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "curr.next", value: null, type: "null", changed: true },
      ],
      thought: "关键操作！将当前节点指向前一个节点",
    },
    {
      description: "移动指针：prev = curr, curr = next",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "prev", value: "节点1", type: "object", changed: true },
        { name: "curr", value: "节点2", type: "object", changed: true },
      ],
      thought: "向前移动，准备处理下一个节点",
    },
    {
      description: "第二轮：保存 next = 节点3，反转 2 → 1",
      executingLine: 7,
      codeHighlight: [6, 7],
      variables: [
        { name: "prev", value: "节点1", type: "object" },
        { name: "curr", value: "节点2", type: "object" },
        { name: "next", value: "节点3", type: "object" },
        { name: "curr.next", value: "节点1", type: "object", changed: true },
      ],
    },
    {
      description: "继续直到 curr = null...",
      executingLine: 5,
      codeHighlight: [5],
      variables: [
        { name: "链表状态", value: "5→4→3→2→1→null", type: "string" },
      ],
      thought: "重复操作直到遍历完所有节点",
    },
    {
      description: "返回 prev，即新的头节点",
      executingLine: 12,
      codeHighlight: [12],
      variables: [
        { name: "prev", value: "节点5", type: "object" },
        { name: "curr", value: null, type: "null" },
      ],
      result: { value: "[5,4,3,2,1]", label: "反转完成", success: true },
    },
  ],

  visualizationSteps: [
    { linkedList: [{ value: 1, next: 1 }, { value: 2, next: 2 }, { value: 3, next: 3 }, { value: 4, next: 4 }, { value: 5 }] },
    { linkedList: [{ value: 1, next: 1, highlight: true }, { value: 2, next: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
    { linkedList: [{ value: 1, highlight: true }, { value: 2, next: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
    { linkedList: [{ value: 1 }, { value: 2, highlight: true, next: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
    { linkedList: [{ value: 1 }, { value: 2, highlight: true }, { value: 3 }, { value: 4 }, { value: 5 }] },
    { linkedList: [{ value: 5, next: 4 }, { value: 4, next: 3 }, { value: 3, next: 2 }, { value: 2, next: 1 }, { value: 1 }] },
    { linkedList: [{ value: 5, next: 4, highlight: true }, { value: 4, next: 3 }, { value: 3, next: 2 }, { value: 2, next: 1 }, { value: 1 }] },
  ],
};

// ==================== 二分查找 ====================

export const binarySearchCodeSync: CodeSyncAnimationData = {
  id: "binary-search",
  title: "二分查找",
  description: "在有序数组中高效查找目标值",

  code: `function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

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

  input: {
    description: "nums = [-1, 0, 3, 5, 9, 12], target = 9",
    data: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
  },

  visualizationType: "two-pointers",

  steps: [
    {
      description: "初始化：left = 0, right = 5",
      executingLine: 2,
      codeHighlight: [2, 3],
      variables: [
        { name: "nums", value: [-1, 0, 3, 5, 9, 12], type: "array" },
        { name: "target", value: 9, type: "number" },
        { name: "left", value: 0, type: "number", changed: true },
        { name: "right", value: 5, type: "number", changed: true },
      ],
      thought: "搜索范围是整个数组",
    },
    {
      description: "计算中点：mid = (0 + 5) / 2 = 2",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "left", value: 0, type: "number" },
        { name: "right", value: 5, type: "number" },
        { name: "mid", value: 2, type: "number", changed: true },
        { name: "nums[mid]", value: 3, type: "number", changed: true },
      ],
      thought: "取中间位置的元素进行比较",
    },
    {
      description: "比较：nums[2] = 3 < 9，目标在右半部分",
      executingLine: 10,
      codeHighlight: [10, 11],
      variables: [
        { name: "nums[mid]", value: 3, type: "number" },
        { name: "target", value: 9, type: "number" },
        { name: "3 < 9", value: true, type: "boolean" },
        { name: "left", value: 3, type: "number", changed: true },
      ],
      thought: "目标比中点大，排除左半部分",
    },
    {
      description: "新的中点：mid = (3 + 5) / 2 = 4",
      executingLine: 6,
      codeHighlight: [5, 6],
      variables: [
        { name: "left", value: 3, type: "number" },
        { name: "right", value: 5, type: "number" },
        { name: "mid", value: 4, type: "number", changed: true },
        { name: "nums[mid]", value: 9, type: "number", changed: true },
      ],
    },
    {
      description: "找到目标！nums[4] = 9 === target",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "nums[mid]", value: 9, type: "number" },
        { name: "target", value: 9, type: "number" },
        { name: "nums[mid] === target", value: true, type: "boolean", changed: true },
      ],
      result: { value: 4, label: "找到索引", success: true },
      thought: "目标值在索引 4 的位置",
    },
  ],

  visualizationSteps: [
    {
      array: [-1, 0, 3, 5, 9, 12],
      pointers: [
        { index: 0, label: "left", color: "blue" },
        { index: 5, label: "right", color: "green" },
      ],
    },
    {
      array: [-1, 0, 3, 5, 9, 12],
      pointers: [
        { index: 0, label: "left", color: "blue" },
        { index: 2, label: "mid", color: "yellow" },
        { index: 5, label: "right", color: "green" },
      ],
      highlights: [{ indices: [2], color: "yellow", label: "比较" }],
    },
    {
      array: [-1, 0, 3, 5, 9, 12],
      pointers: [
        { index: 3, label: "left", color: "blue" },
        { index: 5, label: "right", color: "green" },
      ],
      completed: [0, 1, 2],
      annotations: [{ index: 2, text: "排除" }],
    },
    {
      array: [-1, 0, 3, 5, 9, 12],
      pointers: [
        { index: 3, label: "left", color: "blue" },
        { index: 4, label: "mid", color: "yellow" },
        { index: 5, label: "right", color: "green" },
      ],
      completed: [0, 1, 2],
      highlights: [{ indices: [4], color: "yellow", label: "比较" }],
    },
    {
      array: [-1, 0, 3, 5, 9, 12],
      highlights: [{ indices: [4], color: "green", label: "找到!" }],
      completed: [0, 1, 2],
    },
  ],
};

export const allCodeSyncAnimations: CodeSyncAnimationData[] = [
  twoSumCodeSyncAnimation,
  maxSlidingWindowCodeSync,
  validParenthesesCodeSync,
  reverseLinkedListCodeSync,
  binarySearchCodeSync,
];

/**
 * 根据 ID 获取代码同步动画数据
 */
export function getCodeSyncAnimationById(
  id: string
): CodeSyncAnimationData | undefined {
  return allCodeSyncAnimations.find((a) => a.id === id);
}

/**
 * 根据问题 ID 获取相关的代码同步动画
 */
export function getCodeSyncAnimationsByProblemId(
  problemId: string
): CodeSyncAnimationData[] {
  // 简单映射：可以扩展为更复杂的逻辑
  const mapping: Record<string, string[]> = {
    "two-sum": ["two-sum-hash-map"],
    "sliding-window-maximum": ["max-sliding-window"],
    "valid-parentheses": ["valid-parentheses-stack"],
    "reverse-linked-list": ["reverse-linked-list"],
    "binary-search": ["binary-search"],
  };

  const animationIds = mapping[problemId] || [];
  return animationIds
    .map((id) => getCodeSyncAnimationById(id))
    .filter((a): a is CodeSyncAnimationData => a !== undefined);
}
