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

// ==================== 接雨水 - 双指针解法 ====================

export const trappingRainWaterCodeSync: CodeSyncAnimationData = {
  id: "trapping-rain-water",
  title: "接雨水 - 双指针解法",
  description: "使用左右双指针计算能接多少雨水",

  code: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}`,

  input: {
    description: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
    data: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
  },

  visualizationType: "two-pointers",

  steps: [
    {
      description: "初始化：双指针分别指向数组两端",
      executingLine: 2,
      codeHighlight: [2, 3, 4],
      variables: [
        { name: "height", value: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1], type: "array" },
        { name: "left", value: 0, type: "number", changed: true },
        { name: "right", value: 11, type: "number", changed: true },
        { name: "leftMax", value: 0, type: "number", changed: true },
        { name: "rightMax", value: 0, type: "number", changed: true },
        { name: "water", value: 0, type: "number", changed: true },
      ],
      thought: "leftMax 和 rightMax 记录左右两边的最大高度",
    },
    {
      description: "比较 height[0]=0 < height[11]=1，处理左边",
      executingLine: 7,
      codeHighlight: [6, 7],
      variables: [
        { name: "height[left]", value: 0, type: "number" },
        { name: "height[right]", value: 1, type: "number" },
        { name: "0 < 1", value: true, type: "boolean", changed: true },
      ],
      thought: "左边较小，说明左边能接的水由 leftMax 决定",
    },
    {
      description: "height[0]=0 >= leftMax=0，更新 leftMax",
      executingLine: 8,
      codeHighlight: [8, 9],
      variables: [
        { name: "height[left]", value: 0, type: "number" },
        { name: "leftMax", value: 0, type: "number" },
      ],
      thought: "当前柱子不能接水（是边界或新最高），更新最大值",
    },
    {
      description: "左指针右移 left++",
      executingLine: 12,
      codeHighlight: [12],
      variables: [
        { name: "left", value: 1, type: "number", changed: true },
      ],
    },
    {
      description: "比较 height[1]=1 < height[11]=1 为 false，处理右边",
      executingLine: 14,
      codeHighlight: [6, 14],
      variables: [
        { name: "height[left]", value: 1, type: "number" },
        { name: "height[right]", value: 1, type: "number" },
        { name: "1 < 1", value: false, type: "boolean" },
      ],
      thought: "左边不小于右边，处理右边的柱子",
    },
    {
      description: "height[11]=1 >= rightMax=0，更新 rightMax=1",
      executingLine: 15,
      codeHighlight: [15, 16],
      variables: [
        { name: "height[right]", value: 1, type: "number" },
        { name: "rightMax", value: 1, type: "number", changed: true },
      ],
    },
    {
      description: "右指针左移 right--",
      executingLine: 20,
      codeHighlight: [20],
      variables: [
        { name: "right", value: 10, type: "number", changed: true },
      ],
    },
    {
      description: "继续处理... height[1]=1 < height[10]=2",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "height[left]", value: 1, type: "number" },
        { name: "height[right]", value: 2, type: "number" },
        { name: "leftMax", value: 0, type: "number" },
      ],
      thought: "左边较小，更新 leftMax = 1",
    },
    {
      description: "发现可以接水！leftMax=2, height[2]=0",
      executingLine: 11,
      codeHighlight: [10, 11],
      variables: [
        { name: "left", value: 2, type: "number" },
        { name: "height[left]", value: 0, type: "number" },
        { name: "leftMax", value: 1, type: "number" },
        { name: "water", value: 1, type: "number", changed: true },
      ],
      thought: "当前柱子比 leftMax 矮，可以接水 leftMax - height[left] = 1",
      codeComment: "water += 1 - 0 = 1",
    },
    {
      description: "继续处理直到 left >= right...",
      executingLine: 6,
      codeHighlight: [6],
      variables: [
        { name: "累计接水量", value: "逐步累加中...", type: "string" },
      ],
      thought: "每次处理较矮一边的柱子，计算能接的水",
    },
    {
      description: "完成！总共接水 6 单位",
      executingLine: 24,
      codeHighlight: [24],
      variables: [
        { name: "water", value: 6, type: "number" },
      ],
      result: { value: 6, label: "总接水量", success: true },
      thought: "双指针从两端向中间移动，确保每个位置都能正确计算接水量",
    },
  ],

  visualizationSteps: [
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 0, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      annotations: [{ index: -1, text: "water=0" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 0, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      highlights: [{ indices: [0], color: "yellow", label: "比较" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 0, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      annotations: [{ index: 0, text: "leftMax=0" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 1, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      completed: [0],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 1, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      highlights: [{ indices: [11], color: "yellow", label: "处理右边" }],
      completed: [0],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 1, label: "L", color: "blue" },
        { index: 11, label: "R", color: "green" },
      ],
      completed: [0],
      annotations: [{ index: 11, text: "rightMax=1" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 1, label: "L", color: "blue" },
        { index: 10, label: "R", color: "green" },
      ],
      completed: [0, 11],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 1, label: "L", color: "blue" },
        { index: 10, label: "R", color: "green" },
      ],
      completed: [0, 11],
      annotations: [{ index: 1, text: "leftMax=1" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 2, label: "L", color: "blue" },
        { index: 10, label: "R", color: "green" },
      ],
      completed: [0, 1, 11],
      highlights: [{ indices: [2], color: "blue", label: "+1水" }],
      annotations: [{ index: 2, text: "water=1" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      pointers: [
        { index: 5, label: "L", color: "blue" },
        { index: 8, label: "R", color: "green" },
      ],
      completed: [0, 1, 2, 3, 4, 9, 10, 11],
      highlights: [{ indices: [5, 6], color: "blue", label: "接水区" }],
    },
    {
      array: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      highlights: [{ indices: [2, 4, 5, 6, 9], color: "blue", label: "接水" }],
      completed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      annotations: [{ index: 7, text: "总计=6" }],
    },
  ],
};

// ==================== 三数之和 - 排序+双指针 ====================

export const threeSumCodeSync: CodeSyncAnimationData = {
  id: "three-sum",
  title: "三数之和 - 排序+双指针",
  description: "排序后使用双指针找出所有和为0的三元组",

  code: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1, right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return result;
}`,

  input: {
    description: "nums = [-1, 0, 1, 2, -1, -4]",
    data: { nums: [-1, 0, 1, 2, -1, -4] },
  },

  visualizationType: "two-pointers",

  steps: [
    {
      description: "先排序数组",
      executingLine: 2,
      codeHighlight: [2],
      variables: [
        { name: "原数组", value: [-1, 0, 1, 2, -1, -4], type: "array" },
        { name: "排序后", value: [-4, -1, -1, 0, 1, 2], type: "array", changed: true },
      ],
      thought: "排序后才能使用双指针技巧，因为数组有序才能判断移动方向",
    },
    {
      description: "固定 i=0, nums[0]=-4",
      executingLine: 5,
      codeHighlight: [5],
      variables: [
        { name: "i", value: 0, type: "number", changed: true },
        { name: "nums[i]", value: -4, type: "number" },
        { name: "left", value: 1, type: "number", changed: true },
        { name: "right", value: 5, type: "number", changed: true },
      ],
      thought: "固定第一个数，用双指针找剩余两个数",
    },
    {
      description: "计算 sum = -4 + (-1) + 2 = -3 < 0",
      executingLine: 11,
      codeHighlight: [11],
      variables: [
        { name: "nums[i]", value: -4, type: "number" },
        { name: "nums[left]", value: -1, type: "number" },
        { name: "nums[right]", value: 2, type: "number" },
        { name: "sum", value: -3, type: "number", changed: true },
      ],
      thought: "和太小，需要增大，移动左指针",
    },
    {
      description: "sum < 0, left++",
      executingLine: 19,
      codeHighlight: [18, 19],
      variables: [
        { name: "left", value: 2, type: "number", changed: true },
      ],
      thought: "左指针右移，让和变大",
    },
    {
      description: "i=0 的情况找不到，跳到 i=1",
      executingLine: 5,
      codeHighlight: [5, 6],
      variables: [
        { name: "i", value: 1, type: "number", changed: true },
        { name: "nums[i]", value: -1, type: "number" },
      ],
    },
    {
      description: "固定 i=1, left=2, right=5",
      executingLine: 8,
      codeHighlight: [8],
      variables: [
        { name: "nums[i]", value: -1, type: "number" },
        { name: "left", value: 2, type: "number", changed: true },
        { name: "right", value: 5, type: "number", changed: true },
      ],
    },
    {
      description: "sum = -1 + (-1) + 2 = 0，找到一组！",
      executingLine: 13,
      codeHighlight: [11, 13, 14],
      variables: [
        { name: "nums[i]", value: -1, type: "number" },
        { name: "nums[left]", value: -1, type: "number" },
        { name: "nums[right]", value: 2, type: "number" },
        { name: "sum", value: 0, type: "number", changed: true },
        { name: "result", value: [[-1, -1, 2]], type: "array", changed: true },
      ],
      thought: "找到三元组 [-1, -1, 2]",
    },
    {
      description: "跳过重复元素，继续找",
      executingLine: 15,
      codeHighlight: [15, 16, 17],
      variables: [
        { name: "left", value: 3, type: "number", changed: true },
        { name: "right", value: 4, type: "number", changed: true },
      ],
      thought: "跳过相同元素避免重复答案",
    },
    {
      description: "sum = -1 + 0 + 1 = 0，又找到一组！",
      executingLine: 13,
      codeHighlight: [13, 14],
      variables: [
        { name: "nums[i]", value: -1, type: "number" },
        { name: "nums[left]", value: 0, type: "number" },
        { name: "nums[right]", value: 1, type: "number" },
        { name: "sum", value: 0, type: "number" },
        { name: "result", value: [[-1, -1, 2], [-1, 0, 1]], type: "array", changed: true },
      ],
    },
    {
      description: "完成！找到所有三元组",
      executingLine: 25,
      codeHighlight: [25],
      variables: [
        { name: "result", value: [[-1, -1, 2], [-1, 0, 1]], type: "array" },
      ],
      result: { value: [[-1, -1, 2], [-1, 0, 1]], label: "所有三元组", success: true },
    },
  ],

  visualizationSteps: [
    {
      array: [-4, -1, -1, 0, 1, 2],
      annotations: [{ index: -1, text: "已排序" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 0, label: "i", color: "purple" },
        { index: 1, label: "L", color: "blue" },
        { index: 5, label: "R", color: "green" },
      ],
      highlights: [{ indices: [0], color: "purple", label: "固定" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 0, label: "i", color: "purple" },
        { index: 1, label: "L", color: "blue" },
        { index: 5, label: "R", color: "green" },
      ],
      comparing: [0, 1, 5],
      annotations: [{ index: 3, text: "sum=-3" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 0, label: "i", color: "purple" },
        { index: 2, label: "L", color: "blue" },
        { index: 5, label: "R", color: "green" },
      ],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: "i", color: "purple" },
      ],
      completed: [0],
      highlights: [{ indices: [1], color: "purple", label: "固定" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: "i", color: "purple" },
        { index: 2, label: "L", color: "blue" },
        { index: 5, label: "R", color: "green" },
      ],
      completed: [0],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: "i", color: "purple" },
        { index: 2, label: "L", color: "blue" },
        { index: 5, label: "R", color: "green" },
      ],
      highlights: [{ indices: [1, 2, 5], color: "green", label: "找到!" }],
      completed: [0],
      annotations: [{ index: 3, text: "[-1,-1,2]" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: "i", color: "purple" },
        { index: 3, label: "L", color: "blue" },
        { index: 4, label: "R", color: "green" },
      ],
      completed: [0, 2, 5],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      pointers: [
        { index: 1, label: "i", color: "purple" },
        { index: 3, label: "L", color: "blue" },
        { index: 4, label: "R", color: "green" },
      ],
      highlights: [{ indices: [1, 3, 4], color: "green", label: "找到!" }],
      completed: [0, 2, 5],
      annotations: [{ index: 3, text: "[-1,0,1]" }],
    },
    {
      array: [-4, -1, -1, 0, 1, 2],
      highlights: [
        { indices: [1, 2, 5], color: "green" },
        { indices: [1, 3, 4], color: "blue" },
      ],
      completed: [0, 1, 2, 3, 4, 5],
      annotations: [{ index: 3, text: "2组解" }],
    },
  ],
};

// ==================== 爬楼梯 - 动态规划 ====================

export const climbingStairsCodeSync: CodeSyncAnimationData = {
  id: "climbing-stairs",
  title: "爬楼梯 - 动态规划",
  description: "使用DP计算爬到第n阶的方法数",

  code: `function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;  // dp[i-2]
  let prev1 = 2;  // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,

  input: {
    description: "n = 5 (爬5阶楼梯)",
    data: { n: 5 },
  },

  visualizationType: "array",

  steps: [
    {
      description: "初始化：爬1阶有1种方法，爬2阶有2种方法",
      executingLine: 4,
      codeHighlight: [4, 5],
      variables: [
        { name: "n", value: 5, type: "number" },
        { name: "prev2 (dp[1])", value: 1, type: "number", changed: true },
        { name: "prev1 (dp[2])", value: 2, type: "number", changed: true },
      ],
      thought: "爬1阶只有1种方法(跨1步)；爬2阶有2种方法(1+1或直接跨2步)",
    },
    {
      description: "计算 i=3：dp[3] = dp[2] + dp[1] = 2 + 1 = 3",
      executingLine: 8,
      codeHighlight: [7, 8],
      variables: [
        { name: "i", value: 3, type: "number", changed: true },
        { name: "curr (dp[3])", value: 3, type: "number", changed: true },
        { name: "prev1 (dp[2])", value: 2, type: "number" },
        { name: "prev2 (dp[1])", value: 1, type: "number" },
      ],
      thought: "到第3阶 = 从第2阶跨1步 + 从第1阶跨2步",
      codeComment: "斐波那契思想：当前 = 前两个之和",
    },
    {
      description: "滚动变量：prev2 = 2, prev1 = 3",
      executingLine: 9,
      codeHighlight: [9, 10],
      variables: [
        { name: "prev2", value: 2, type: "number", changed: true },
        { name: "prev1", value: 3, type: "number", changed: true },
      ],
      thought: "只保留最近两个值，空间优化 O(1)",
    },
    {
      description: "计算 i=4：dp[4] = dp[3] + dp[2] = 3 + 2 = 5",
      executingLine: 8,
      codeHighlight: [7, 8],
      variables: [
        { name: "i", value: 4, type: "number", changed: true },
        { name: "curr (dp[4])", value: 5, type: "number", changed: true },
        { name: "prev1 (dp[3])", value: 3, type: "number" },
        { name: "prev2 (dp[2])", value: 2, type: "number" },
      ],
    },
    {
      description: "滚动变量：prev2 = 3, prev1 = 5",
      executingLine: 9,
      codeHighlight: [9, 10],
      variables: [
        { name: "prev2", value: 3, type: "number", changed: true },
        { name: "prev1", value: 5, type: "number", changed: true },
      ],
    },
    {
      description: "计算 i=5：dp[5] = dp[4] + dp[3] = 5 + 3 = 8",
      executingLine: 8,
      codeHighlight: [7, 8],
      variables: [
        { name: "i", value: 5, type: "number", changed: true },
        { name: "curr (dp[5])", value: 8, type: "number", changed: true },
        { name: "prev1 (dp[4])", value: 5, type: "number" },
        { name: "prev2 (dp[3])", value: 3, type: "number" },
      ],
    },
    {
      description: "完成！爬5阶楼梯有8种方法",
      executingLine: 13,
      codeHighlight: [13],
      variables: [
        { name: "prev1", value: 8, type: "number" },
      ],
      result: { value: 8, label: "方法数", success: true },
      thought: "时间O(n)，空间O(1)，完美的DP优化",
    },
  ],

  visualizationSteps: [
    {
      array: ["-", 1, 2, "?", "?", "?"],
      annotations: [{ index: 0, text: "dp数组" }],
    },
    {
      array: ["-", 1, 2, "?", "?", "?"],
      pointers: [
        { index: 1, label: "prev2", color: "blue" },
        { index: 2, label: "prev1", color: "green" },
      ],
      highlights: [{ indices: [1, 2], color: "green", label: "初始值" }],
    },
    {
      array: ["-", 1, 2, 3, "?", "?"],
      pointers: [
        { index: 2, label: "prev2", color: "blue" },
        { index: 3, label: "prev1", color: "green" },
      ],
      highlights: [{ indices: [3], color: "yellow", label: "计算中" }],
      annotations: [{ index: 3, text: "2+1=3" }],
    },
    {
      array: ["-", 1, 2, 3, "?", "?"],
      pointers: [
        { index: 2, label: "prev2", color: "blue" },
        { index: 3, label: "prev1", color: "green" },
      ],
      completed: [1, 2, 3],
    },
    {
      array: ["-", 1, 2, 3, 5, "?"],
      pointers: [
        { index: 3, label: "prev2", color: "blue" },
        { index: 4, label: "prev1", color: "green" },
      ],
      highlights: [{ indices: [4], color: "yellow", label: "计算中" }],
      completed: [1, 2, 3],
      annotations: [{ index: 4, text: "3+2=5" }],
    },
    {
      array: ["-", 1, 2, 3, 5, "?"],
      pointers: [
        { index: 3, label: "prev2", color: "blue" },
        { index: 4, label: "prev1", color: "green" },
      ],
      completed: [1, 2, 3, 4],
    },
    {
      array: ["-", 1, 2, 3, 5, 8],
      highlights: [{ indices: [5], color: "green", label: "答案" }],
      completed: [1, 2, 3, 4, 5],
      annotations: [{ index: 5, text: "5+3=8" }],
    },
  ],
};

// ==================== 合并区间 ====================

export const mergeIntervalsCodeSync: CodeSyncAnimationData = {
  id: "merge-intervals",
  title: "合并区间",
  description: "合并所有重叠的区间",

  code: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      result.push(current);
    }
  }

  return result;
}`,

  input: {
    description: "intervals = [[1,3], [2,6], [8,10], [15,18]]",
    data: { intervals: [[1,3], [2,6], [8,10], [15,18]] },
  },

  visualizationType: "array",

  steps: [
    {
      description: "按起始位置排序区间",
      executingLine: 2,
      codeHighlight: [2],
      variables: [
        { name: "intervals", value: [[1,3], [2,6], [8,10], [15,18]], type: "array" },
      ],
      thought: "排序后，只需检查相邻区间是否重叠",
    },
    {
      description: "初始化结果，放入第一个区间 [1,3]",
      executingLine: 3,
      codeHighlight: [3],
      variables: [
        { name: "result", value: [[1,3]], type: "array", changed: true },
      ],
    },
    {
      description: "检查 [2,6] 与 [1,3] 是否重叠",
      executingLine: 9,
      codeHighlight: [5, 6, 7, 9],
      variables: [
        { name: "current", value: [2,6], type: "array", changed: true },
        { name: "last", value: [1,3], type: "array" },
        { name: "current[0] <= last[1]", value: "2 <= 3 = true", type: "boolean", changed: true },
      ],
      thought: "2 <= 3，区间重叠！",
    },
    {
      description: "合并：last[1] = max(3, 6) = 6",
      executingLine: 10,
      codeHighlight: [10],
      variables: [
        { name: "last", value: [1,6], type: "array", changed: true },
        { name: "result", value: [[1,6]], type: "array", changed: true },
      ],
      thought: "扩展结束位置到更大的值",
    },
    {
      description: "检查 [8,10] 与 [1,6] 是否重叠",
      executingLine: 9,
      codeHighlight: [9],
      variables: [
        { name: "current", value: [8,10], type: "array", changed: true },
        { name: "last", value: [1,6], type: "array" },
        { name: "current[0] <= last[1]", value: "8 <= 6 = false", type: "boolean" },
      ],
      thought: "8 > 6，不重叠",
    },
    {
      description: "不重叠，直接加入结果",
      executingLine: 12,
      codeHighlight: [11, 12],
      variables: [
        { name: "result", value: [[1,6], [8,10]], type: "array", changed: true },
      ],
    },
    {
      description: "检查 [15,18] 与 [8,10] 是否重叠",
      executingLine: 9,
      codeHighlight: [9],
      variables: [
        { name: "current", value: [15,18], type: "array", changed: true },
        { name: "last", value: [8,10], type: "array" },
        { name: "15 <= 10", value: false, type: "boolean" },
      ],
      thought: "15 > 10，不重叠",
    },
    {
      description: "不重叠，直接加入结果",
      executingLine: 12,
      codeHighlight: [12],
      variables: [
        { name: "result", value: [[1,6], [8,10], [15,18]], type: "array", changed: true },
      ],
    },
    {
      description: "完成！合并后的区间",
      executingLine: 16,
      codeHighlight: [16],
      variables: [
        { name: "result", value: [[1,6], [8,10], [15,18]], type: "array" },
      ],
      result: { value: [[1,6], [8,10], [15,18]], label: "合并结果", success: true },
    },
  ],

  visualizationSteps: [
    {
      array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
      annotations: [{ index: -1, text: "已排序" }],
    },
    {
      array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
      highlights: [{ indices: [0], color: "green", label: "result" }],
    },
    {
      array: ["[1,3]", "[2,6]", "[8,10]", "[15,18]"],
      highlights: [{ indices: [0, 1], color: "yellow", label: "比较" }],
      annotations: [{ index: 1, text: "2<=3?" }],
    },
    {
      array: ["[1,6]", "[2,6]", "[8,10]", "[15,18]"],
      highlights: [{ indices: [0], color: "green", label: "合并" }],
      completed: [1],
      annotations: [{ index: 0, text: "合并!" }],
    },
    {
      array: ["[1,6]", "-", "[8,10]", "[15,18]"],
      highlights: [{ indices: [0, 2], color: "yellow", label: "比较" }],
      completed: [1],
      annotations: [{ index: 2, text: "8<=6?" }],
    },
    {
      array: ["[1,6]", "-", "[8,10]", "[15,18]"],
      highlights: [
        { indices: [0], color: "green" },
        { indices: [2], color: "green", label: "新增" },
      ],
      completed: [1],
    },
    {
      array: ["[1,6]", "-", "[8,10]", "[15,18]"],
      highlights: [{ indices: [2, 3], color: "yellow", label: "比较" }],
      completed: [1],
      annotations: [{ index: 3, text: "15<=10?" }],
    },
    {
      array: ["[1,6]", "-", "[8,10]", "[15,18]"],
      highlights: [
        { indices: [0, 2, 3], color: "green", label: "结果" },
      ],
      completed: [1],
    },
    {
      array: ["[1,6]", "[8,10]", "[15,18]"],
      highlights: [{ indices: [0, 1, 2], color: "green", label: "最终" }],
    },
  ],
};

// ==================== 零钱兑换 - 动态规划 ====================

export const coinChangeCodeSync: CodeSyncAnimationData = {
  id: "coin-change",
  title: "零钱兑换 - 动态规划",
  description: "使用完全背包DP求最少硬币数",

  code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  input: {
    description: "coins = [1, 2, 5], amount = 11",
    data: { coins: [1, 2, 5], amount: 11 },
  },

  visualizationType: "array",

  steps: [
    {
      description: "初始化 dp 数组，dp[0] = 0",
      executingLine: 2,
      codeHighlight: [2, 3],
      variables: [
        { name: "coins", value: [1, 2, 5], type: "array" },
        { name: "amount", value: 11, type: "number" },
        { name: "dp", value: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"], type: "array", changed: true },
      ],
      thought: "dp[i] 表示凑成金额 i 需要的最少硬币数",
    },
    {
      description: "使用硬币 1：更新 dp[1] 到 dp[11]",
      executingLine: 5,
      codeHighlight: [5, 6, 7],
      variables: [
        { name: "coin", value: 1, type: "number", changed: true },
        { name: "dp[1]", value: 1, type: "number" },
        { name: "dp[2]", value: 2, type: "number" },
      ],
      thought: "用硬币1，dp[i] = dp[i-1] + 1",
    },
    {
      description: "硬币1处理完成",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "dp", value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], type: "array", changed: true },
      ],
      thought: "只用硬币1，需要 amount 个硬币",
    },
    {
      description: "使用硬币 2：更新 dp[2] 到 dp[11]",
      executingLine: 5,
      codeHighlight: [5, 6],
      variables: [
        { name: "coin", value: 2, type: "number", changed: true },
      ],
      thought: "dp[i] = min(dp[i], dp[i-2] + 1)",
    },
    {
      description: "dp[2] = min(2, dp[0]+1) = min(2, 1) = 1",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "i", value: 2, type: "number" },
        { name: "dp[i-coin]", value: 0, type: "number" },
        { name: "dp[2]", value: 1, type: "number", changed: true },
      ],
      thought: "用一个硬币2比用两个硬币1更优",
    },
    {
      description: "硬币2处理完成",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "dp", value: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6], type: "array", changed: true },
      ],
    },
    {
      description: "使用硬币 5：更新 dp[5] 到 dp[11]",
      executingLine: 5,
      codeHighlight: [5, 6],
      variables: [
        { name: "coin", value: 5, type: "number", changed: true },
      ],
    },
    {
      description: "dp[5] = min(3, dp[0]+1) = min(3, 1) = 1",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "i", value: 5, type: "number" },
        { name: "dp[5]", value: 1, type: "number", changed: true },
      ],
      thought: "一个硬币5就能凑成5",
    },
    {
      description: "dp[11] = min(6, dp[6]+1) = min(6, 3) = 3",
      executingLine: 7,
      codeHighlight: [7],
      variables: [
        { name: "i", value: 11, type: "number" },
        { name: "dp[6]", value: 2, type: "number" },
        { name: "dp[11]", value: 3, type: "number", changed: true },
      ],
      thought: "11 = 5 + 5 + 1，需要3个硬币",
    },
    {
      description: "完成！最少需要3个硬币",
      executingLine: 11,
      codeHighlight: [11],
      variables: [
        { name: "dp[11]", value: 3, type: "number" },
        { name: "组合", value: "5 + 5 + 1", type: "string" },
      ],
      result: { value: 3, label: "最少硬币数", success: true },
    },
  ],

  visualizationSteps: [
    {
      array: [0, "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞", "∞"],
      annotations: [{ index: 0, text: "dp[0]=0" }],
    },
    {
      array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      highlights: [{ indices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], color: "yellow", label: "coin=1" }],
      annotations: [{ index: 11, text: "用硬币1" }],
    },
    {
      array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      completed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      array: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
      highlights: [{ indices: [2, 4, 6, 8, 10], color: "blue", label: "coin=2" }],
      annotations: [{ index: 6, text: "用硬币2" }],
    },
    {
      array: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
      highlights: [{ indices: [2], color: "green", label: "更优" }],
      annotations: [{ index: 2, text: "2→1" }],
    },
    {
      array: [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6],
      completed: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    },
    {
      array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
      highlights: [{ indices: [5, 10], color: "purple", label: "coin=5" }],
      annotations: [{ index: 5, text: "用硬币5" }],
    },
    {
      array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
      highlights: [{ indices: [5], color: "green", label: "更优" }],
      annotations: [{ index: 5, text: "3→1" }],
    },
    {
      array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
      highlights: [{ indices: [11], color: "yellow", label: "计算" }],
      annotations: [{ index: 11, text: "5+5+1" }],
    },
    {
      array: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3],
      highlights: [{ indices: [11], color: "green", label: "答案" }],
      annotations: [{ index: 11, text: "=3" }],
    },
  ],
};

export const allCodeSyncAnimations: CodeSyncAnimationData[] = [
  twoSumCodeSyncAnimation,
  maxSlidingWindowCodeSync,
  validParenthesesCodeSync,
  reverseLinkedListCodeSync,
  binarySearchCodeSync,
  trappingRainWaterCodeSync,
  threeSumCodeSync,
  climbingStairsCodeSync,
  mergeIntervalsCodeSync,
  coinChangeCodeSync,
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
    "trapping-rain-water": ["trapping-rain-water"],
    "three-sum": ["three-sum"],
    "climbing-stairs": ["climbing-stairs"],
    "merge-intervals": ["merge-intervals"],
    "coin-change": ["coin-change"],
  };

  const animationIds = mapping[problemId] || [];
  return animationIds
    .map((id) => getCodeSyncAnimationById(id))
    .filter((a): a is CodeSyncAnimationData => a !== undefined);
}
