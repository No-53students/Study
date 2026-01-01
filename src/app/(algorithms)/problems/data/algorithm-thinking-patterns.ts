/**
 * 算法思维模式库
 *
 * 这个文件定义了前端算法学习的核心思维框架
 * 目标：通过这个体系，学习者可以建立系统的算法思维
 */

// ==================== 类型定义 ====================

export interface ThinkingPattern {
  id: string;
  name: string;
  category: AlgorithmCategory;
  icon: string;

  // 核心认知
  coreIdea: {
    oneLineExplanation: string;      // 一句话说清楚
    intuition: string;               // 直觉理解
    visualMetaphor: string;          // 形象比喻
    whenToUse: string[];             // 什么时候用
    whenNotToUse: string[];          // 什么时候不用
  };

  // 识别信号
  recognitionSignals: {
    keywords: string[];              // 题目关键词
    dataStructures: string[];        // 涉及的数据结构
    constraintPatterns: string[];    // 约束条件模式
    examplePhrases: string[];        // 题目中的典型表述
  };

  // 思维步骤
  thinkingFramework: ThinkingStep[];

  // 代码骨架
  codeSkeletons: CodeSkeleton[];

  // 常见陷阱
  commonPitfalls: Pitfall[];

  // 复杂度分析
  complexityAnalysis: {
    typicalTime: string;
    typicalSpace: string;
    tradeoffs: string;
  };

  // 前端应用
  frontendApplications: FrontendApplication[];

  // 相关题目（按难度排序）
  relatedProblems: RelatedProblem[];

  // 变体和进阶
  variants: PatternVariant[];

  // 与其他模式的关系
  relationships: PatternRelationship[];
}

export interface ThinkingStep {
  step: number;
  name: string;
  question: string;           // 问自己的问题
  actions: string[];          // 具体行动
  checkpoints: string[];      // 验证点
  commonMistake?: string;     // 这一步常犯的错误
}

export interface CodeSkeleton {
  name: string;
  description: string;
  typescript: string;
  keyPoints: string[];
}

export interface Pitfall {
  name: string;
  description: string;
  example: string;
  solution: string;
  frequency: "high" | "medium" | "low";
}

export interface FrontendApplication {
  scenario: string;
  description: string;
  algorithmUsed: string;
  codeExample?: string;
  realWorldExample?: string;
}

export interface RelatedProblem {
  id: string;
  name: string;
  difficulty: "easy" | "medium" | "hard";
  isCore: boolean;            // 是否是核心必做题
  learningPoint: string;      // 这道题能学到什么
}

export interface PatternVariant {
  name: string;
  description: string;
  difference: string;
  exampleProblem?: string;
}

export interface PatternRelationship {
  patternId: string;
  relationship: "prerequisite" | "similar" | "extends" | "alternative";
  description: string;
}

export type AlgorithmCategory =
  | "array"
  | "string"
  | "hash-table"
  | "two-pointers"
  | "sliding-window"
  | "binary-search"
  | "linked-list"
  | "stack"
  | "queue"
  | "tree"
  | "graph"
  | "dp"
  | "backtracking"
  | "greedy"
  | "heap"
  | "bit-manipulation"
  | "math";

// ==================== 哈希表思维模式 ====================

export const hashTablePattern: ThinkingPattern = {
  id: "hash-table",
  name: "哈希表",
  category: "hash-table",
  icon: "🗂️",

  coreIdea: {
    oneLineExplanation: "用空间换时间，将 O(n) 查找优化到 O(1)",
    intuition: "哈希表就像一本字典，你想找某个词，不需要从头翻到尾，直接翻到对应的字母页就能找到。",
    visualMetaphor: "想象一个巨大的储物柜，每个柜子有编号。你把东西放进去时，根据东西的特征计算出柜子编号。取东西时，算一下编号直接去拿，不需要一个个柜子找。",
    whenToUse: [
      "需要快速判断某元素是否存在",
      "需要统计元素出现次数",
      "需要建立元素之间的映射关系",
      "需要去重",
      "两数之和类问题（查找补数）",
    ],
    whenNotToUse: [
      "需要保持元素顺序",
      "空间极度受限",
      "数据量很小（几个元素）",
      "需要范围查询（用二分更好）",
    ],
  },

  recognitionSignals: {
    keywords: ["查找", "存在", "出现次数", "重复", "配对", "映射", "两数之和", "补数"],
    dataStructures: ["数组", "字符串"],
    constraintPatterns: ["O(n) 时间要求", "查找操作频繁"],
    examplePhrases: [
      "判断是否存在...",
      "找到满足条件的两个数",
      "统计每个元素出现的次数",
      "是否包含重复元素",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "识别查找需求",
      question: "这道题的核心操作是「查找」吗？需要查找什么？",
      actions: [
        "分析题目，找出需要快速查找的信息",
        "确定查找的是存在性、次数还是映射值",
      ],
      checkpoints: [
        "能否用一句话描述需要查找的内容？",
        "暴力查找的复杂度是多少？能用 O(1) 代替吗？",
      ],
      commonMistake: "没有识别出隐藏的查找需求，比如「两数之和」其实是查找补数",
    },
    {
      step: 2,
      name: "设计哈希表结构",
      question: "哈希表的 key 和 value 分别存什么？",
      actions: [
        "key: 需要查找的内容（通常是元素值）",
        "value: 查找成功后需要的信息（索引、次数、关联数据）",
      ],
      checkpoints: [
        "key 能唯一标识要查找的内容吗？",
        "value 包含了所有需要的信息吗？",
      ],
      commonMistake: "key 和 value 设计反了，导致无法正确查找",
    },
    {
      step: 3,
      name: "确定遍历和存储顺序",
      question: "是先存储所有元素再查找，还是边遍历边存储？",
      actions: [
        "分析是否可能查找到自己（如两数之和）",
        "如果不能用同一元素两次，必须先查找后存储",
      ],
      checkpoints: [
        "[3,3] target=6 这种情况会出错吗？",
        "存储和查找的顺序能保证正确性吗？",
      ],
      commonMistake: "先存后查导致可能找到自己，返回错误结果",
    },
    {
      step: 4,
      name: "处理边界情况",
      question: "有哪些特殊情况需要考虑？",
      actions: [
        "空数组/空字符串",
        "只有一个元素",
        "没有找到结果",
        "有多个答案时返回哪个",
      ],
      checkpoints: [
        "每种边界情况都有对应处理吗？",
        "返回值格式正确吗？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "存在性检查",
      description: "判断某元素是否存在",
      typescript: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const num of nums) {
    if (seen.has(num)) {
      return true;  // 找到重复
    }
    seen.add(num);
  }

  return false;  // 没有重复
}`,
      keyPoints: ["用 Set 只需要存在性", "边遍历边检查边存储"],
    },
    {
      name: "查找配对/补数",
      description: "两数之和类问题",
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();  // 值 -> 索引

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return [];
}`,
      keyPoints: ["先查找后存储", "key 是值，value 是索引", "查找的是 target - current"],
    },
    {
      name: "计数统计",
      description: "统计元素出现次数",
      typescript: `function countElements(nums: number[]): Map<number, number> {
  const count = new Map<number, number>();

  for (const num of nums) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  return count;
}`,
      keyPoints: ["用 || 0 处理首次出现", "Map 比 Object 更适合动态 key"],
    },
    {
      name: "分组归类",
      description: "按特征分组",
      typescript: `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const str of strs) {
    // 计算特征 key（排序后的字符串）
    const key = str.split('').sort().join('');

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(str);
  }

  return Array.from(groups.values());
}`,
      keyPoints: ["key 是分组特征", "value 是该组的所有元素"],
    },
  ],

  commonPitfalls: [
    {
      name: "先存后查",
      description: "在两数之和类问题中先把元素存入哈希表再查找",
      example: "nums=[3,3], target=6 时返回 [0,0] 而不是 [0,1]",
      solution: "始终先查找后存储，确保不会找到自己",
      frequency: "high",
    },
    {
      name: "用 Object 代替 Map",
      description: "使用 Object 作为哈希表，key 会被转成字符串",
      example: "nums=[1, '1'] 时两个不同的值会被当作同一个 key",
      solution: "使用 Map，它能保持 key 的原始类型",
      frequency: "medium",
    },
    {
      name: "忽略返回值格式",
      description: "题目要求返回索引，却返回了值",
      example: "两数之和要求返回索引 [0,1]，却返回了值 [2,7]",
      solution: "仔细阅读题目，Map 的 value 存储题目需要的信息",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n) - 遍历一次数组",
    typicalSpace: "O(n) - 哈希表存储",
    tradeoffs: "用 O(n) 空间换取 O(1) 查找时间，将整体复杂度从 O(n²) 降到 O(n)",
  },

  frontendApplications: [
    {
      scenario: "数据去重",
      description: "使用 Set 对数组去重",
      algorithmUsed: "哈希表存在性检查",
      codeExample: `const unique = [...new Set(array)];`,
      realWorldExample: "过滤重复的用户 ID、去除重复的搜索关键词",
    },
    {
      scenario: "缓存实现",
      description: "使用 Map 实现 O(1) 的缓存读写",
      algorithmUsed: "哈希表映射",
      codeExample: `const cache = new Map();
function getWithCache(key) {
  if (cache.has(key)) return cache.get(key);
  const value = expensiveComputation(key);
  cache.set(key, value);
  return value;
}`,
      realWorldExample: "API 响应缓存、组件 memoization",
    },
    {
      scenario: "路由匹配",
      description: "URL 路径到组件的映射",
      algorithmUsed: "哈希表映射",
      codeExample: `const routes = new Map([
  ['/home', HomePage],
  ['/about', AboutPage],
  ['/user/:id', UserPage],
]);`,
      realWorldExample: "React Router、Vue Router 的路由表",
    },
    {
      scenario: "表单验证",
      description: "快速查找输入值是否在允许列表中",
      algorithmUsed: "哈希表存在性检查",
      codeExample: `const allowedValues = new Set(['apple', 'banana', 'orange']);
const isValid = allowedValues.has(userInput);`,
      realWorldExample: "下拉选择验证、标签输入验证",
    },
    {
      scenario: "状态管理",
      description: "Redux/Vuex 中的 state 本质是嵌套哈希表",
      algorithmUsed: "哈希表映射",
      codeExample: `const state = {
  users: { byId: { '1': {...}, '2': {...} } },
  posts: { byId: { '1': {...} } },
};
// O(1) 访问: state.users.byId['1']`,
      realWorldExample: "Normalized state 设计模式",
    },
  ],

  relatedProblems: [
    { id: "two-sum", name: "两数之和", difficulty: "easy", isCore: true, learningPoint: "哈希表查找补数的经典应用" },
    { id: "contains-duplicate", name: "存在重复元素", difficulty: "easy", isCore: true, learningPoint: "最基础的存在性检查" },
    { id: "valid-anagram", name: "有效的字母异位词", difficulty: "easy", isCore: true, learningPoint: "哈希表计数" },
    { id: "group-anagrams", name: "字母异位词分组", difficulty: "medium", isCore: true, learningPoint: "按特征分组" },
    { id: "two-sum-ii-input-array-is-sorted", name: "两数之和 II", difficulty: "medium", isCore: false, learningPoint: "有序数组用双指针更优" },
    { id: "3sum", name: "三数之和", difficulty: "medium", isCore: true, learningPoint: "降维 + 双指针/哈希表" },
    { id: "4sum", name: "四数之和", difficulty: "medium", isCore: false, learningPoint: "多数之和的通用思路" },
    { id: "longest-consecutive-sequence", name: "最长连续序列", difficulty: "medium", isCore: true, learningPoint: "巧妙的 O(n) 解法" },
    { id: "subarray-sum-equals-k", name: "和为K的子数组", difficulty: "medium", isCore: true, learningPoint: "前缀和 + 哈希表" },
  ],

  variants: [
    {
      name: "有序哈希表",
      description: "保持插入顺序的哈希表",
      difference: "JavaScript 的 Map 天然保持插入顺序，可用于 LRU 缓存",
      exampleProblem: "lru-cache",
    },
    {
      name: "双向映射",
      description: "同时支持 key->value 和 value->key 查找",
      difference: "需要维护两个 Map",
      exampleProblem: "word-pattern",
    },
    {
      name: "滚动哈希",
      description: "字符串匹配中的哈希技术",
      difference: "用于快速比较子串，Rabin-Karp 算法",
      exampleProblem: "repeated-dna-sequences",
    },
  ],

  relationships: [
    {
      patternId: "two-pointers",
      relationship: "alternative",
      description: "有序数组的两数之和问题，双指针比哈希表更优（O(1) 空间）",
    },
    {
      patternId: "sliding-window",
      relationship: "similar",
      description: "滑动窗口常用哈希表来记录窗口内元素",
    },
  ],
};

// ==================== 双指针思维模式 ====================

export const twoPointersPattern: ThinkingPattern = {
  id: "two-pointers",
  name: "双指针",
  category: "two-pointers",
  icon: "👆👆",

  coreIdea: {
    oneLineExplanation: "用两个指针协同遍历，减少不必要的搜索空间",
    intuition: "一个人从头找、一个人从尾找，比一个人来回跑效率高得多。",
    visualMetaphor: "想象两个人在一条直路上找东西。一个从左边开始，一个从右边开始，他们向中间靠拢，这样保证不会漏掉任何位置，而且每个位置只看一次。",
    whenToUse: [
      "有序数组的查找问题",
      "需要比较或配对两个元素",
      "原地修改数组（快慢指针）",
      "链表的环检测（快慢指针）",
      "回文判断",
    ],
    whenNotToUse: [
      "无序数组且不能排序",
      "需要全局最优解但局部贪心不成立",
      "需要回溯尝试多种可能",
    ],
  },

  recognitionSignals: {
    keywords: ["有序数组", "排序", "两个数", "配对", "回文", "原地", "O(1) 空间", "相向", "同向"],
    dataStructures: ["有序数组", "链表", "字符串"],
    constraintPatterns: ["空间 O(1)", "不能使用额外空间"],
    examplePhrases: [
      "在有序数组中找...",
      "原地修改数组",
      "判断是否为回文",
      "移除数组中的...",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "确定指针类型",
      question: "用对撞指针（相向）还是快慢指针（同向）？",
      actions: [
        "对撞指针：从两端向中间，适合查找配对、回文",
        "快慢指针：从同一端出发，适合原地修改、环检测",
      ],
      checkpoints: [
        "两个指针的移动方向是什么？",
        "什么条件下移动哪个指针？",
      ],
      commonMistake: "选错指针类型，比如用对撞指针解决需要原地修改的问题",
    },
    {
      step: 2,
      name: "设计移动规则",
      question: "每一步应该移动哪个指针？为什么？",
      actions: [
        "对撞指针：根据比较结果决定移动左还是右",
        "快慢指针：快指针负责探索，慢指针记录有效位置",
      ],
      checkpoints: [
        "移动规则能保证不漏掉答案吗？",
        "能用数学证明正确性吗？",
      ],
      commonMistake: "移动逻辑错误导致漏解或死循环",
    },
    {
      step: 3,
      name: "确定终止条件",
      question: "循环什么时候结束？",
      actions: [
        "对撞指针：left < right 或 left <= right",
        "快慢指针：快指针到达末尾",
      ],
      checkpoints: [
        "边界条件 < 还是 <= ？",
        "会不会越界？",
      ],
      commonMistake: "边界条件判断错误，导致多算或少算一个元素",
    },
    {
      step: 4,
      name: "处理特殊情况",
      question: "有哪些边界情况？",
      actions: [
        "空数组/单元素数组",
        "所有元素相同",
        "没有找到结果",
      ],
      checkpoints: [
        "空输入会出错吗？",
        "返回值格式正确吗？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "对撞指针（相向）",
      description: "两端向中间逼近",
      typescript: `function twoPointerCollision<T>(arr: T[]): Result {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    // 根据条件判断
    if (shouldMoveLeft(arr, left, right)) {
      left++;
    } else if (shouldMoveRight(arr, left, right)) {
      right--;
    } else {
      // 找到答案
      return { left, right };
    }
  }

  return null;  // 没找到
}`,
      keyPoints: ["left < right 保证不重复", "根据条件移动某一边", "中间相遇结束"],
    },
    {
      name: "快慢指针（同向）",
      description: "原地修改数组",
      typescript: `function fastSlowPointer(nums: number[]): number {
  let slow = 0;  // 指向下一个要写入的位置

  for (let fast = 0; fast < nums.length; fast++) {
    if (isValid(nums[fast])) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;  // 新数组长度
}`,
      keyPoints: ["slow 记录有效位置", "fast 探索所有元素", "slow 最终是新长度"],
    },
    {
      name: "快慢指针（环检测）",
      description: "Floyd 判圈算法",
      typescript: `function hasCycle(head: ListNode | null): boolean {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next!;

    if (slow === fast) {
      return true;  // 有环
    }
  }

  return false;  // 无环
}`,
      keyPoints: ["快指针每次走 2 步", "相遇说明有环", "检查 fast.next 防止空指针"],
    },
  ],

  commonPitfalls: [
    {
      name: "边界条件错误",
      description: "left < right 和 left <= right 混淆",
      example: "回文判断用 left < right，中心单字符不需要比较",
      solution: "根据问题语义确定：是否需要处理相遇的情况",
      frequency: "high",
    },
    {
      name: "移动逻辑错误",
      description: "盛水容器问题中移动了高的那边",
      example: "面积受限于短板，移动高边不可能增大面积",
      solution: "用数学证明：移动哪边才可能得到更优解",
      frequency: "medium",
    },
    {
      name: "快指针越界",
      description: "链表快慢指针没检查 fast.next",
      example: "fast.next.next 时如果 fast.next 为 null 会报错",
      solution: "循环条件加上 fast.next 的检查",
      frequency: "high",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n) - 每个元素最多访问一次",
    typicalSpace: "O(1) - 只用两个指针变量",
    tradeoffs: "双指针最大优势是 O(1) 空间，但需要数据有序或满足特定条件",
  },

  frontendApplications: [
    {
      scenario: "数组原地去重",
      description: "使用快慢指针原地删除重复元素",
      algorithmUsed: "快慢指针",
      codeExample: `function removeDuplicates(arr) {
  if (arr.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }
  return slow + 1;
}`,
      realWorldExample: "处理用户输入、清理数据",
    },
    {
      scenario: "回文检测",
      description: "判断字符串是否为回文",
      algorithmUsed: "对撞指针",
      codeExample: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      realWorldExample: "密码验证、特殊格式检查",
    },
    {
      scenario: "合并有序数组",
      description: "将两个有序数组合并为一个",
      algorithmUsed: "双指针归并",
      codeExample: `function merge(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}`,
      realWorldExample: "合并多个排序列表、归并排序",
    },
  ],

  relatedProblems: [
    { id: "two-sum-ii-input-array-is-sorted", name: "两数之和 II", difficulty: "medium", isCore: true, learningPoint: "对撞指针基础" },
    { id: "3sum", name: "三数之和", difficulty: "medium", isCore: true, learningPoint: "排序 + 双指针" },
    { id: "container-with-most-water", name: "盛最多水的容器", difficulty: "medium", isCore: true, learningPoint: "贪心移动策略" },
    { id: "move-zeroes", name: "移动零", difficulty: "easy", isCore: true, learningPoint: "快慢指针原地修改" },
    { id: "remove-duplicates-from-sorted-array", name: "删除有序数组中的重复项", difficulty: "easy", isCore: true, learningPoint: "快慢指针去重" },
    { id: "valid-palindrome", name: "验证回文串", difficulty: "easy", isCore: true, learningPoint: "对撞指针回文检测" },
    { id: "linked-list-cycle", name: "环形链表", difficulty: "easy", isCore: true, learningPoint: "快慢指针环检测" },
    { id: "linked-list-cycle-ii", name: "环形链表 II", difficulty: "medium", isCore: true, learningPoint: "找环入口" },
    { id: "trapping-rain-water", name: "接雨水", difficulty: "hard", isCore: true, learningPoint: "双指针进阶" },
  ],

  variants: [
    {
      name: "对撞指针",
      description: "从两端向中间移动",
      difference: "适合有序数组查找、回文判断",
      exampleProblem: "two-sum-ii-input-array-is-sorted",
    },
    {
      name: "快慢指针",
      description: "从同一端出发，速度不同",
      difference: "适合原地修改、环检测、找中点",
      exampleProblem: "linked-list-cycle",
    },
    {
      name: "滑动窗口",
      description: "双指针的特殊形式，维护一个窗口",
      difference: "更复杂的移动逻辑，通常处理子串/子数组",
      exampleProblem: "longest-substring-without-repeating-characters",
    },
  ],

  relationships: [
    {
      patternId: "hash-table",
      relationship: "alternative",
      description: "无序数组的两数之和用哈希表，有序数组用双指针更优",
    },
    {
      patternId: "sliding-window",
      relationship: "extends",
      description: "滑动窗口是双指针的进阶形式",
    },
    {
      patternId: "binary-search",
      relationship: "similar",
      description: "二分查找也是两个边界向中间逼近",
    },
  ],
};

// ==================== 滑动窗口思维模式 ====================

export const slidingWindowPattern: ThinkingPattern = {
  id: "sliding-window",
  name: "滑动窗口",
  category: "sliding-window",
  icon: "🪟",

  coreIdea: {
    oneLineExplanation: "维护一个满足条件的连续区间，通过滑动优化枚举",
    intuition: "不需要检查所有可能的子串，只需要让窗口「滑动」，复用之前的计算结果。",
    visualMetaphor: "想象一个可伸缩的相框在一幅长画上滑动。相框右边不断延伸探索新内容，当相框太大或内容不满足条件时，左边收缩。我们要找最优的相框位置和大小。",
    whenToUse: [
      "求最长/最短的连续子串/子数组",
      "子串/子数组需要满足某些条件",
      "需要统计满足条件的子串数量",
      "字符串的 anagram 匹配",
    ],
    whenNotToUse: [
      "元素不连续",
      "需要考虑子序列（可跳跃）",
      "无法通过窗口扩展/收缩来判断条件",
    ],
  },

  recognitionSignals: {
    keywords: ["子串", "子数组", "连续", "最长", "最短", "满足条件", "包含", "至少", "至多"],
    dataStructures: ["字符串", "数组"],
    constraintPatterns: ["连续元素", "O(n) 时间要求"],
    examplePhrases: [
      "最长的子串使得...",
      "最短的子数组使得...",
      "包含所有...的最小窗口",
      "满足条件的子串数量",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "确定窗口类型",
      question: "是固定大小窗口还是可变大小窗口？",
      actions: [
        "固定窗口：窗口大小已知，左右边界同时移动",
        "可变窗口：根据条件扩展或收缩",
      ],
      checkpoints: [
        "题目是否指定了窗口大小？",
        "窗口大小是否由条件动态决定？",
      ],
      commonMistake: "可变窗口问题误用固定窗口思路",
    },
    {
      step: 2,
      name: "定义窗口状态",
      question: "需要维护窗口的哪些信息？",
      actions: [
        "元素计数（Map 或数组）",
        "元素和/积",
        "是否满足条件的标志",
      ],
      checkpoints: [
        "状态能否在 O(1) 时间内更新？",
        "扩展和收缩时分别更新什么？",
      ],
      commonMistake: "状态维护过于复杂，更新时出错",
    },
    {
      step: 3,
      name: "设计扩展和收缩逻辑",
      question: "什么时候扩展？什么时候收缩？",
      actions: [
        "右边界扩展：每次迭代右移",
        "左边界收缩：当窗口不满足条件时",
        "求最长：在满足条件时更新答案",
        "求最短：在满足条件时收缩并更新答案",
      ],
      checkpoints: [
        "扩展和收缩的顺序正确吗？",
        "条件判断在正确的位置吗？",
      ],
      commonMistake: "收缩时机错误，导致漏解或死循环",
    },
    {
      step: 4,
      name: "处理边界和更新答案",
      question: "在什么时机更新答案？如何处理边界？",
      actions: [
        "确定更新答案的时机（收缩后 or 扩展后）",
        "处理空输入",
        "处理无解情况",
      ],
      checkpoints: [
        "窗口长度的计算是否正确？(right - left + 1 or right - left)",
        "无解时返回什么？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "求最长窗口",
      description: "找满足条件的最长子串/子数组",
      typescript: `function longestWindow(s: string): number {
  const window = new Map<string, number>();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // 扩展窗口：加入 s[right]
    window.set(s[right], (window.get(s[right]) || 0) + 1);

    // 收缩窗口：当不满足条件时
    while (!isValid(window)) {
      window.set(s[left], window.get(s[left])! - 1);
      if (window.get(s[left]) === 0) window.delete(s[left]);
      left++;
    }

    // 满足条件时更新答案
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}`,
      keyPoints: ["先扩展后收缩", "满足条件时更新最大值", "窗口长度 = right - left + 1"],
    },
    {
      name: "求最短窗口",
      description: "找满足条件的最短子串/子数组",
      typescript: `function shortestWindow(s: string, target: string): string {
  const need = new Map<string, number>();
  const window = new Map<string, number>();

  for (const c of target) {
    need.set(c, (need.get(c) || 0) + 1);
  }

  let left = 0;
  let valid = 0;  // 满足条件的字符数
  let minLen = Infinity;
  let start = 0;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    // 扩展窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) valid++;
    }

    // 满足条件时尝试收缩
    while (valid === need.size) {
      // 更新最小值
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }

      // 收缩窗口
      const d = s[left];
      left++;
      if (need.has(d)) {
        if (window.get(d) === need.get(d)) valid--;
        window.set(d, window.get(d)! - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}`,
      keyPoints: ["满足条件时先更新答案再收缩", "使用 valid 计数避免每次检查整个 Map"],
    },
    {
      name: "固定窗口",
      description: "窗口大小固定",
      typescript: `function fixedWindow(nums: number[], k: number): number[] {
  const result: number[] = [];
  let windowSum = 0;

  for (let i = 0; i < nums.length; i++) {
    // 加入新元素
    windowSum += nums[i];

    // 窗口形成后
    if (i >= k - 1) {
      result.push(windowSum);  // 记录结果
      windowSum -= nums[i - k + 1];  // 移除最左边元素
    }
  }

  return result;
}`,
      keyPoints: ["窗口满后开始记录", "同时添加右边和删除左边"],
    },
  ],

  commonPitfalls: [
    {
      name: "窗口长度计算错误",
      description: "right - left 和 right - left + 1 混淆",
      example: "[left, right] 闭区间长度是 right - left + 1",
      solution: "明确区间是左闭右开还是左闭右闭",
      frequency: "high",
    },
    {
      name: "收缩时机错误",
      description: "在错误的位置收缩窗口",
      example: "求最短时应该在满足条件时收缩，求最长时在不满足条件时收缩",
      solution: "根据题目要求确定收缩时机",
      frequency: "high",
    },
    {
      name: "状态更新遗漏",
      description: "扩展或收缩时忘记更新窗口状态",
      example: "从窗口删除元素时忘记从 Map 中删除",
      solution: "扩展和收缩的操作要对称",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n) - 每个元素最多被左右指针各访问一次",
    typicalSpace: "O(k) - k 是窗口内不同元素数量",
    tradeoffs: "虽然有嵌套循环，但左右指针各自只移动 n 次，总体仍是线性",
  },

  frontendApplications: [
    {
      scenario: "搜索建议防抖",
      description: "只处理最近 N 毫秒内的输入",
      algorithmUsed: "时间窗口",
      codeExample: `function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
      realWorldExample: "搜索框自动补全、表单验证",
    },
    {
      scenario: "限流器 (Rate Limiter)",
      description: "限制时间窗口内的请求数量",
      algorithmUsed: "滑动窗口计数",
      codeExample: `class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = [];
  }

  tryRequest() {
    const now = Date.now();
    // 移除窗口外的请求
    this.requests = this.requests.filter(t => now - t < this.windowMs);

    if (this.requests.length < this.limit) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}`,
      realWorldExample: "API 限流、登录尝试限制",
    },
    {
      scenario: "虚拟滚动",
      description: "只渲染可见窗口内的列表项",
      algorithmUsed: "视口窗口",
      realWorldExample: "长列表性能优化、无限滚动",
    },
    {
      scenario: "文本差异比较",
      description: "找两个字符串的最长公共子串",
      algorithmUsed: "滑动窗口匹配",
      realWorldExample: "代码 diff、文档比较",
    },
  ],

  relatedProblems: [
    { id: "longest-substring-without-repeating-characters", name: "无重复字符的最长子串", difficulty: "medium", isCore: true, learningPoint: "滑动窗口入门" },
    { id: "minimum-window-substring", name: "最小覆盖子串", difficulty: "hard", isCore: true, learningPoint: "求最短窗口经典题" },
    { id: "find-all-anagrams-in-a-string", name: "找到字符串中所有字母异位词", difficulty: "medium", isCore: true, learningPoint: "固定窗口" },
    { id: "sliding-window-maximum", name: "滑动窗口最大值", difficulty: "hard", isCore: true, learningPoint: "单调队列优化" },
    { id: "permutation-in-string", name: "字符串的排列", difficulty: "medium", isCore: false, learningPoint: "固定窗口判断 anagram" },
    { id: "longest-repeating-character-replacement", name: "替换后的最长重复字符", difficulty: "medium", isCore: false, learningPoint: "条件稍复杂的窗口" },
    { id: "max-consecutive-ones-iii", name: "最大连续1的个数 III", difficulty: "medium", isCore: false, learningPoint: "允许翻转 k 个 0" },
  ],

  variants: [
    {
      name: "固定窗口",
      description: "窗口大小不变",
      difference: "左右边界同时移动，不需要 while 收缩",
      exampleProblem: "find-all-anagrams-in-a-string",
    },
    {
      name: "可变窗口求最长",
      description: "不满足条件时收缩",
      difference: "while 条件是 !isValid()",
      exampleProblem: "longest-substring-without-repeating-characters",
    },
    {
      name: "可变窗口求最短",
      description: "满足条件时收缩",
      difference: "while 条件是 isValid()，在 while 内更新答案",
      exampleProblem: "minimum-window-substring",
    },
  ],

  relationships: [
    {
      patternId: "two-pointers",
      relationship: "extends",
      description: "滑动窗口是双指针的进阶形式，维护更复杂的窗口状态",
    },
    {
      patternId: "hash-table",
      relationship: "similar",
      description: "滑动窗口常用哈希表来维护窗口内元素的状态",
    },
  ],
};

// ==================== 二分查找思维模式 ====================

export const binarySearchPattern: ThinkingPattern = {
  id: "binary-search",
  name: "二分查找",
  category: "binary-search",
  icon: "🔍",

  coreIdea: {
    oneLineExplanation: "每次排除一半的搜索空间，将 O(n) 降到 O(log n)",
    intuition: "猜数字游戏：每次猜中间的数，根据提示「大了」或「小了」排除一半的可能。",
    visualMetaphor: "在一本字典中找单词。你不会从第一页开始翻，而是打开中间，看目标在前半还是后半，然后在对应的半边继续折半查找。",
    whenToUse: [
      "有序数组中查找元素",
      "查找满足条件的最大/最小值",
      "搜索空间可以二分",
      "判断条件具有单调性",
    ],
    whenNotToUse: [
      "数据无序且不能排序",
      "需要找所有满足条件的元素",
      "搜索空间不能二分",
    ],
  },

  recognitionSignals: {
    keywords: ["有序", "排序", "查找", "搜索", "最大", "最小", "第 K 个", "O(log n)"],
    dataStructures: ["有序数组", "矩阵（行列有序）"],
    constraintPatterns: ["数据量大 (10^5+)", "需要高效查找"],
    examplePhrases: [
      "在有序数组中查找...",
      "找到满足条件的最小值",
      "第 K 大/小的元素",
      "求...的最大/最小值",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "确定搜索空间",
      question: "二分查找的范围是什么？",
      actions: [
        "数组索引 [0, n-1]",
        "答案的值域 [min, max]",
        "其他可以二分的空间",
      ],
      checkpoints: [
        "搜索空间有序或具有单调性吗？",
        "边界值是多少？",
      ],
      commonMistake: "搜索空间定义错误，导致漏掉边界情况",
    },
    {
      step: 2,
      name: "选择二分模板",
      question: "找的是什么？精确值、左边界还是右边界？",
      actions: [
        "精确查找：找到目标直接返回",
        "左边界：找第一个 >= target 的位置",
        "右边界：找最后一个 <= target 的位置",
      ],
      checkpoints: [
        "模板选择正确吗？",
        "返回值的含义清楚吗？",
      ],
      commonMistake: "模板选错导致返回值偏差",
    },
    {
      step: 3,
      name: "设计 check 函数",
      question: "如何判断 mid 在答案的左边还是右边？",
      actions: [
        "明确什么情况下 mid 太大/太小",
        "确保 check 函数有单调性",
      ],
      checkpoints: [
        "check 函数有二段性吗？（一边满足，一边不满足）",
        "边界上 check 的返回值正确吗？",
      ],
      commonMistake: "check 函数逻辑错误",
    },
    {
      step: 4,
      name: "处理边界和返回值",
      question: "循环结束时 left/right 的含义是什么？",
      actions: [
        "理解不同模板结束时的状态",
        "处理目标不存在的情况",
      ],
      checkpoints: [
        "left == right 时是否正确？",
        "目标不存在时返回什么？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "精确查找",
      description: "查找目标值的位置",
      typescript: `function binarySearch(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] === target) {
      return mid;  // 找到了
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;  // 没找到
}`,
      keyPoints: ["left <= right", "找到立即返回", "返回 -1 表示不存在"],
    },
    {
      name: "左边界查找",
      description: "第一个 >= target 的位置",
      typescript: `function leftBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;  // 注意：右边界是 n

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] >= target) {
      right = mid;  // 可能是答案，继续往左找
    } else {
      left = mid + 1;
    }
  }

  return left;  // 第一个 >= target 的位置
}`,
      keyPoints: ["left < right", "right = mid 保留可能的答案", "返回 left 是插入位置"],
    },
    {
      name: "右边界查找",
      description: "最后一个 <= target 的位置",
      typescript: `function rightBound(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (nums[mid] <= target) {
      left = mid + 1;  // 可能有更大的，继续往右找
    } else {
      right = mid;
    }
  }

  return left - 1;  // 最后一个 <= target 的位置
}`,
      keyPoints: ["left < right", "left = mid + 1 跳过当前", "返回 left - 1"],
    },
    {
      name: "答案二分",
      description: "二分答案值域",
      typescript: `function binarySearchAnswer(nums: number[]): number {
  let left = minPossible;
  let right = maxPossible;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);

    if (check(mid)) {  // mid 满足条件
      right = mid;  // 尝试更小的值
    } else {
      left = mid + 1;
    }
  }

  return left;  // 最小的满足条件的值
}

function check(value: number): boolean {
  // 判断 value 是否满足条件
  // 必须具有单调性：如果 value 满足，value+1 也满足（或相反）
}`,
      keyPoints: ["搜索答案的值域而不是数组索引", "check 函数判断是否满足条件", "找最小满足条件的值"],
    },
  ],

  commonPitfalls: [
    {
      name: "整数溢出",
      description: "(left + right) / 2 可能溢出",
      example: "left 和 right 都接近 MAX_INT 时",
      solution: "使用 left + (right - left) / 2",
      frequency: "medium",
    },
    {
      name: "边界条件错误",
      description: "left <= right 和 left < right 混淆",
      example: "精确查找用 <=，左右边界查找用 <",
      solution: "根据模板选择正确的条件",
      frequency: "high",
    },
    {
      name: "死循环",
      description: "区间无法收缩",
      example: "left = mid 时如果 right = mid + 1，区间可能不变",
      solution: "确保每次循环区间都在缩小",
      frequency: "high",
    },
    {
      name: "返回值错误",
      description: "不同模板返回值含义不同",
      example: "左边界返回 left，右边界返回 left - 1",
      solution: "理解每个模板结束时的状态",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(log n) - 每次排除一半",
    typicalSpace: "O(1) - 只用几个变量",
    tradeoffs: "需要数据有序或条件具有单调性，但效率极高",
  },

  frontendApplications: [
    {
      scenario: "虚拟列表定位",
      description: "根据滚动位置快速定位应该渲染的起始项",
      algorithmUsed: "二分查找",
      codeExample: `function findStartIndex(itemHeights, scrollTop) {
  let left = 0, right = itemHeights.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    const offset = itemHeights.slice(0, mid).reduce((a, b) => a + b, 0);
    if (offset >= scrollTop) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}`,
      realWorldExample: "react-virtualized, react-window",
    },
    {
      scenario: "版本号比较",
      description: "在版本列表中查找特定版本",
      algorithmUsed: "二分查找",
      realWorldExample: "npm 版本管理、changelog 定位",
    },
    {
      scenario: "日期范围查询",
      description: "在有序日期列表中查找范围",
      algorithmUsed: "左右边界二分",
      realWorldExample: "日历组件、数据过滤",
    },
    {
      scenario: "断点查找",
      description: "在响应式设计中确定当前断点",
      algorithmUsed: "右边界二分",
      codeExample: `const breakpoints = [576, 768, 992, 1200];
function getCurrentBreakpoint(width) {
  let left = 0, right = breakpoints.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (breakpoints[mid] > width) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;  // 0=xs, 1=sm, 2=md, 3=lg, 4=xl
}`,
      realWorldExample: "Bootstrap, Tailwind 断点系统",
    },
  ],

  relatedProblems: [
    { id: "binary-search", name: "二分查找", difficulty: "easy", isCore: true, learningPoint: "最基础的二分" },
    { id: "search-insert-position", name: "搜索插入位置", difficulty: "easy", isCore: true, learningPoint: "左边界查找" },
    { id: "find-first-and-last-position-of-element-in-sorted-array", name: "排序数组中查找元素的第一个和最后一个位置", difficulty: "medium", isCore: true, learningPoint: "左右边界" },
    { id: "search-in-rotated-sorted-array", name: "搜索旋转排序数组", difficulty: "medium", isCore: true, learningPoint: "变体：部分有序" },
    { id: "find-minimum-in-rotated-sorted-array", name: "寻找旋转排序数组中的最小值", difficulty: "medium", isCore: false, learningPoint: "旋转数组找最小值" },
    { id: "koko-eating-bananas", name: "爱吃香蕉的珂珂", difficulty: "medium", isCore: true, learningPoint: "答案二分" },
    { id: "capacity-to-ship-packages-within-d-days", name: "在 D 天内送达包裹的能力", difficulty: "medium", isCore: false, learningPoint: "答案二分" },
    { id: "median-of-two-sorted-arrays", name: "寻找两个正序数组的中位数", difficulty: "hard", isCore: false, learningPoint: "二分的进阶应用" },
  ],

  variants: [
    {
      name: "精确查找",
      description: "查找目标值是否存在",
      difference: "找到立即返回，使用 left <= right",
      exampleProblem: "binary-search",
    },
    {
      name: "左边界查找",
      description: "第一个 >= target 的位置",
      difference: "使用 left < right，right = mid",
      exampleProblem: "search-insert-position",
    },
    {
      name: "答案二分",
      description: "二分答案值域而不是数组索引",
      difference: "需要设计 check 函数判断可行性",
      exampleProblem: "koko-eating-bananas",
    },
  ],

  relationships: [
    {
      patternId: "two-pointers",
      relationship: "similar",
      description: "二分查找也是两个边界向中间逼近，但收缩策略不同",
    },
  ],
};

// ==================== 导出所有思维模式 ====================

export const thinkingPatterns: Record<string, ThinkingPattern> = {
  "hash-table": hashTablePattern,
  "two-pointers": twoPointersPattern,
  "sliding-window": slidingWindowPattern,
  "binary-search": binarySearchPattern,
};

export const allPatterns = Object.values(thinkingPatterns);

// 按类别获取模式
export function getPatternsByCategory(category: AlgorithmCategory): ThinkingPattern[] {
  return allPatterns.filter(p => p.category === category);
}

// 获取某模式的所有核心题目
export function getCoreProblems(patternId: string): RelatedProblem[] {
  const pattern = thinkingPatterns[patternId];
  if (!pattern) return [];
  return pattern.relatedProblems.filter(p => p.isCore);
}
