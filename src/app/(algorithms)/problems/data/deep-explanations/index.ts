/**
 * 深度讲解数据
 *
 * 存放各题目的深度讲解内容，与题目数据分离，便于维护
 */

import { DeepExplanation, GuidedThinking } from "../../types";

// ==================== 两数之和 - 深度讲解 ====================
export const twoSumDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "题目要求找到两个数，它们的和等于 target。如果我知道其中一个数 x，那么另一个数必须是 target - x。",
    patternMatch: "这是典型的「查找配对」问题。当需要快速判断某个值是否存在时，哈希表是首选数据结构。",
    whyItWorks: "哈希表的查找时间是 O(1)。对于每个元素 x，我们不需要遍历整个数组去找 target - x，只需要查一下哈希表。这将 O(n²) 优化到 O(n)。",
    metaphor: "想象你在派对上要找一个能和你凑成「完美组合」的人。暴力法是走遍整个房间问每个人；哈希表法是在门口放一本签到簿，每个人进来时登记自己的「特征」。当你进门时，只需要翻一下签到簿，看看你需要的那个人来了没有。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "理解问题本质",
      thought: "题目说找两个数的和等于 target。这意味着如果选定了一个数 x，另一个数就确定了，是 target - x。",
      action: "将「两数之和」问题转化为「查找补数」问题",
      codeSnippet: "const complement = target - nums[i];",
    },
    {
      step: 2,
      title: "选择数据结构",
      thought: "我需要快速查找某个值是否存在于已遍历的元素中。数组查找是 O(n)，太慢了。什么数据结构能做到 O(1) 查找？哈希表！",
      action: "选用 Map 作为存储结构，key 是数值，value 是索引",
      codeSnippet: "const map = new Map();",
    },
    {
      step: 3,
      title: "设计遍历顺序",
      thought: "是先把所有数存入哈希表再查找，还是边遍历边存储？考虑到不能使用同一个元素两次，边遍历边存储更安全。",
      action: "一边遍历，一边检查补数是否在 Map 中，然后再存入当前元素",
      codeSnippet: `for (let i = 0; i < nums.length; i++) {
  if (map.has(complement)) return [...];
  map.set(nums[i], i);
}`,
    },
    {
      step: 4,
      title: "处理返回值",
      thought: "找到补数后，需要返回两个索引。补数的索引从 Map 获取，当前索引是循环变量 i。",
      action: "返回 [map.get(complement), i]",
      codeSnippet: "return [map.get(complement), i];",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "创建一个空的 Map，用于存储已遍历的元素。Key 是数值，Value 是该数值在原数组中的索引。",
      keyPoint: "选择 Map 而不是 Object，因为 Map 的 key 可以是任意类型，且性能更稳定。",
    },
    {
      lineRange: [4, 4],
      explanation: "开始遍历数组。每次迭代处理一个元素，变量 i 是当前元素的索引。",
    },
    {
      lineRange: [5, 6],
      explanation: "计算「补数」—— 要和当前元素 nums[i] 配对才能达到 target 的那个数。",
      keyPoint: "这是问题转化的关键：从「找两个数之和」变成「找一个特定的数」。",
    },
    {
      lineRange: [8, 11],
      explanation: "检查补数是否已经在 Map 中。如果在，说明之前遍历过一个数，它和当前数的和等于 target。",
      keyPoint: "map.has() 查找时间是 O(1)，这是哈希表的核心优势。",
      commonMistake: "注意返回顺序：先是补数的索引 map.get(complement)，后是当前索引 i。因为补数是先遍历到的。",
    },
    {
      lineRange: [13, 14],
      explanation: "如果没找到补数，把当前元素和它的索引存入 Map，供后续元素查找。",
      keyPoint: "先查找再存入，确保不会把同一个元素用两次。",
      commonMistake: "不要在循环开始时就存入，否则 [3,3] target=6 会返回 [0,0]。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "遍历数组一次，每次迭代中 map.has() 和 map.set() 都是 O(1) 操作，所以总时间复杂度是 O(n)。",
    spaceBreakdown: "最坏情况下，需要把 n-1 个元素存入 Map（倒数第二个元素才找到答案），所以空间复杂度是 O(n)。",
    bestCase: "运气好的话，第二个元素就是答案，只需要存入 1 个元素。但这不改变渐进复杂度。",
    worstCase: "答案是最后两个元素时，需要存入 n-1 个元素。",
    reasoning: "哈希表用 O(n) 空间换取 O(1) 的查找时间，这是典型的「空间换时间」策略。在 n 较大时（比如 10^4），O(n) 比 O(n²) 快 10000 倍！",
  },

  patternComparisons: [
    {
      problemId: "two-sum-ii-input-array-is-sorted",
      title: "两数之和 II（有序数组）",
      similarity: "都是找两个数的和等于 target",
      difference: "有序数组可以用双指针 O(1) 空间，无需哈希表",
      tip: "遇到有序数组，优先考虑双指针",
    },
    {
      problemId: "3sum",
      title: "三数之和",
      similarity: "都是找数的组合满足条件",
      difference: "三数之和需要固定一个数，对剩余部分用双指针或哈希表",
      tip: "多数之和问题可以降维处理",
    },
    {
      problemId: "contains-duplicate",
      title: "存在重复元素",
      similarity: "都用哈希表快速查找",
      difference: "本题查找补数，那题查找重复",
      tip: "哈希表是查找问题的万金油",
    },
  ],

  commonMistakes: [
    {
      type: "logic",
      description: "先存入再查找，导致同一元素被使用两次",
      wrongCode: `for (let i = 0; i < nums.length; i++) {
  map.set(nums[i], i);  // ❌ 先存入
  if (map.has(target - nums[i])) {  // 会找到自己
    return [map.get(target - nums[i]), i];
  }
}`,
      correctCode: `for (let i = 0; i < nums.length; i++) {
  if (map.has(target - nums[i])) {  // ✅ 先查找
    return [map.get(target - nums[i]), i];
  }
  map.set(nums[i], i);  // 后存入
}`,
      whyWrong: "当 target = 6, nums = [3, ...] 时，先存入 3，再查找 6-3=3，会找到刚存入的自己，返回 [0, 0]，但题目要求不能使用同一个元素两次。",
      howToAvoid: "始终遵循「先查找，后存入」的顺序。这样查找的 Map 里只有之前的元素。",
    },
    {
      type: "edge-case",
      description: "返回索引顺序错误",
      wrongCode: `return [i, map.get(complement)];  // ❌ 顺序颠倒`,
      correctCode: `return [map.get(complement), i];  // ✅ 补数索引在前`,
      whyWrong: "补数是先遍历到的元素，所以它的索引更小，应该放在前面。虽然题目说「可以按任意顺序返回」，但测试用例通常期望较小索引在前。",
      howToAvoid: "记住：Map 里存的是「过去」的元素，i 是「现在」的索引。过去在前，现在在后。",
    },
    {
      type: "syntax",
      description: "使用 Object 替代 Map 时的类型问题",
      wrongCode: `const map = {};
if (map[complement] !== undefined) {  // ❌ 数字 key 会被转成字符串
  return [map[complement], i];
}`,
      correctCode: `const map = new Map();
if (map.has(complement)) {  // ✅ Map 支持任意类型的 key
  return [map.get(complement), i];
}`,
      whyWrong: "Object 的 key 会被自动转换为字符串，当 nums 包含负数或非整数时可能出问题。Map 的 key 保持原始类型。",
      howToAvoid: "在算法题中，优先使用 Map 而非 Object 作为哈希表。",
    },
  ],

  variations: [
    {
      description: "如果数组是有序的，还能用 O(1) 空间解决吗？",
      difficultyChange: "same",
      modification: "使用双指针：左指针从头、右指针从尾，根据和的大小移动指针",
      relatedProblemId: "two-sum-ii-input-array-is-sorted",
    },
    {
      description: "如果要找所有满足条件的数对（不只是一对）呢？",
      difficultyChange: "harder",
      modification: "找到一对后不立即返回，继续遍历。需要注意去重。",
    },
    {
      description: "如果不能使用额外空间（O(1) 空间限制）呢？",
      difficultyChange: "same",
      modification: "只能用 O(n²) 暴力法，或者先排序再用双指针（但会丢失原始索引）",
    },
  ],

  interviewTips: [
    "面试时先说暴力法 O(n²)，再优化到哈希表 O(n)，展示思考过程",
    "解释为什么「先查找后存入」而不是反过来",
    "主动提到「这是用空间换时间」，展示对复杂度权衡的理解",
    "如果面试官追问「数组有序呢」，说双指针可以 O(1) 空间",
    "这道题是 LeetCode 第 1 题，面试官默认你会。要答得清晰、完整、快速",
  ],

  frontendApplications: [
    "**数据去重**：用 Set（Map 的简化版）快速判断元素是否存在",
    "**缓存实现**：Map 存储 key-value，实现 O(1) 的缓存读取",
    "**表单验证**：快速查找某个值是否在允许列表中",
    "**路由匹配**：URL 到组件的映射就是哈希表",
    "**状态管理**：Redux 的 state 本质上是嵌套的哈希表结构",
  ],
};

// ==================== 两数之和 - 思维引导 ====================
export const twoSumGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "题目要找两个数的和等于 target。如果我已经选定了第一个数 x，第二个数应该是多少？",
      hint: "用 target 减去 x 试试？",
      answer: "第二个数必须是 target - x，这就是「补数」的概念。",
      insight: "将「两数之和」问题转化为「寻找补数」问题，这是解题的关键转化。",
    },
    {
      stage: "understand",
      question: "暴力法需要 O(n²) 时间，瓶颈在哪里？",
      hint: "对于每个数 x，我们在做什么操作？",
      answer: "对于每个 x，我们需要在剩余数组中查找 target - x，这个查找操作是 O(n)。",
      insight: "识别出「查找」是性能瓶颈，就能想到用哈希表优化。",
    },
    {
      stage: "plan",
      question: "什么数据结构能让查找操作变成 O(1)？",
      hint: "想想前端中经常用来快速查找的数据结构...",
      answer: "哈希表（Map/Set/Object）可以 O(1) 查找。",
      insight: "哈希表是「快速查找」问题的首选数据结构。",
    },
    {
      stage: "plan",
      question: "应该先把所有数存入哈希表再查找，还是边遍历边存储？为什么？",
      hint: "考虑 nums = [3, 3], target = 6 这个例子...",
      answer: "边遍历边存储。如果先全部存入，遇到 [3,3] target=6 时，查找 6-3=3 会找到自己，返回 [0,0]，但题目不允许使用同一元素两次。",
      insight: "「先查找后存入」确保只能找到之前的元素，不会找到自己。",
    },
    {
      stage: "code",
      question: "Map 里应该存什么？key 和 value 分别是什么？",
      hint: "我们需要查找「某个值是否存在」，还需要知道它的「位置」...",
      answer: "key 是数值，value 是索引。这样既能 O(1) 判断补数存在，又能拿到它的索引。",
      insight: "根据需求设计数据结构：需要查什么就把什么作为 key。",
    },
    {
      stage: "optimize",
      question: "这个解法还能优化吗？空间能降到 O(1) 吗？",
      hint: "如果数组是有序的呢？",
      answer: "如果数组有序，可以用双指针从两端向中间逼近，空间 O(1)。但本题数组无序，哈希表已经是最优解。",
      insight: "有序数组考虑双指针，无序数组考虑哈希表。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "两个数的和等于 target，意味着知道一个数就能算出另一个数。",
    },
    {
      level: 2,
      content: "如果当前数是 x，需要找的补数是 target - x。问题变成：补数在数组中存在吗？",
      codeFragment: "const complement = target - nums[i];",
    },
    {
      level: 3,
      content: "用哈希表存储已遍历的元素，查找补数只需 O(1) 时间。",
      codeFragment: `const map = new Map();
// map: 数值 -> 索引`,
    },
    {
      level: 4,
      content: "边遍历边存储：先检查补数是否在 Map 中，再把当前元素存入 Map。",
      codeFragment: `if (map.has(complement)) {
  return [map.get(complement), i];
}
map.set(nums[i], i);`,
    },
    {
      level: 5,
      content: "完整代码：",
      codeFragment: `function twoSum(nums, target) {
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
    },
  ],

  checkpoints: [
    {
      question: "两数之和问题的核心转化是什么？",
      options: [
        "转化为排序问题",
        "转化为查找补数问题",
        "转化为递归问题",
        "转化为动态规划问题",
      ],
      correctAnswer: 1,
      explanation: "知道一个数 x，另一个数就是 target - x。问题变成：在数组中查找这个补数。",
    },
    {
      question: "为什么用哈希表而不是数组来存储已遍历的元素？",
      options: [
        "哈希表更节省空间",
        "哈希表查找是 O(1)，数组是 O(n)",
        "数组不能存储负数",
        "题目要求用哈希表",
      ],
      correctAnswer: 1,
      explanation: "哈希表的 has() 操作是 O(1)，而数组的 includes() 是 O(n)。这是优化的关键。",
    },
    {
      question: "对于 nums = [3, 3], target = 6，为什么不能先把所有元素存入 Map 再查找？",
      options: [
        "会导致内存溢出",
        "Map 不支持重复的 key",
        "会把自己找出来，返回 [0, 0]",
        "时间复杂度会变高",
      ],
      correctAnswer: 2,
      explanation: "如果先全部存入，查找 6-3=3 时会找到自己。边遍历边存储确保只能找到之前的元素。",
    },
  ],
};

// ==================== 无重复字符的最长子串 - 深度讲解 ====================
export const longestSubstringDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "要找不含重复字符的最长子串。子串是连续的，所以可以用一个「窗口」来表示当前考虑的子串。",
    patternMatch: "这是典型的「滑动窗口」问题。窗口有左右两个边界，右边界扩展探索新元素，左边界收缩消除重复。",
    whyItWorks: "当发现重复字符时，左边界必须移动到重复字符之后，才能继续探索。用 Set 或 Map 记录窗口内的字符，保证 O(1) 判重。",
    metaphor: "想象一个可伸缩的相框在一幅画上滑动。相框右边不断探索新内容，当发现重复图案时，左边收缩跳过重复部分。我们要找能框住最多不重复内容的位置。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "识别问题类型",
      thought: "「子串」意味着连续，「最长」意味着要遍历所有可能并找最大值。连续 + 遍历 = 滑动窗口。",
      action: "决定使用滑动窗口算法",
    },
    {
      step: 2,
      title: "确定窗口含义",
      thought: "窗口 [left, right] 表示当前不含重复字符的子串。需要一个数据结构快速判断字符是否在窗口内。",
      action: "用 Set 存储窗口内的字符",
      codeSnippet: "const charSet = new Set();",
    },
    {
      step: 3,
      title: "设计窗口移动规则",
      thought: "右边界每次加入一个新字符。如果新字符已在窗口中，需要收缩左边界直到消除重复。",
      action: "右扩展 + 条件左收缩",
      codeSnippet: `while (charSet.has(s[right])) {
  charSet.delete(s[left]);
  left++;
}
charSet.add(s[right]);`,
    },
    {
      step: 4,
      title: "记录最大长度",
      thought: "每次成功扩展后，更新最大长度。窗口长度 = right - left + 1。",
      action: "维护 maxLen 变量",
      codeSnippet: "maxLen = Math.max(maxLen, right - left + 1);",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "初始化：Set 记录窗口内字符，left 是左边界，maxLen 记录最大长度。",
      keyPoint: "Set 的 has() 和 delete() 都是 O(1) 操作。",
    },
    {
      lineRange: [5, 5],
      explanation: "右边界从 0 遍历到末尾，每次尝试加入新字符。",
    },
    {
      lineRange: [6, 9],
      explanation: "如果新字符已存在，不断收缩左边界，删除左边的字符，直到消除重复。",
      keyPoint: "这是滑动窗口的核心：遇到不满足条件时收缩窗口。",
      commonMistake: "不要直接跳到重复字符的位置，要逐个删除，否则会漏删中间的字符。",
    },
    {
      lineRange: [10, 10],
      explanation: "重复消除后，安全地加入新字符。",
    },
    {
      lineRange: [11, 11],
      explanation: "更新最大长度。窗口大小 = right - left + 1。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "右指针遍历 n 次，左指针最多也移动 n 次（每个字符最多被加入和删除各一次），所以总时间 O(n)。",
    spaceBreakdown: "Set 最多存储窗口内的字符，最坏情况是所有字符都不重复，O(min(n, m))，m 是字符集大小。",
    bestCase: "所有字符相同，每次都要收缩，但仍是 O(n)。",
    worstCase: "所有字符不同，Set 存满 n 个字符。",
    reasoning: "虽然有嵌套循环，但左右指针各自只移动 n 次，不会重复遍历，所以是线性时间。",
  },

  commonMistakes: [
    {
      type: "logic",
      description: "遇到重复时直接跳转，导致窗口内仍有重复",
      wrongCode: `if (charSet.has(s[right])) {
  left = map.get(s[right]) + 1;  // ❌ 直接跳转
}`,
      correctCode: `while (charSet.has(s[right])) {
  charSet.delete(s[left]);
  left++;
}`,
      whyWrong: "直接跳转会保留左边界到重复位置之间的字符，它们仍在 Set 中，造成数据不一致。",
      howToAvoid: "逐个收缩左边界，确保删除的字符和移动的位置一致。",
    },
    {
      type: "boundary",
      description: "窗口长度计算错误",
      wrongCode: "maxLen = Math.max(maxLen, right - left);  // ❌ 少了 1",
      correctCode: "maxLen = Math.max(maxLen, right - left + 1);",
      whyWrong: "子串 [left, right] 的长度是 right - left + 1，不是 right - left。",
      howToAvoid: "左闭右闭区间 [a, b] 的长度 = b - a + 1。",
    },
  ],

  variations: [
    {
      description: "如果允许最多 k 个重复字符呢？",
      difficultyChange: "harder",
      modification: "用 Map 计数，当某字符计数超过 k 时收缩窗口",
    },
    {
      description: "如果要返回最长子串本身而不是长度呢？",
      difficultyChange: "same",
      modification: "记录 maxLen 时同时记录 left 位置，最后用 slice 截取",
    },
  ],

  interviewTips: [
    "先说暴力法 O(n³)：枚举所有子串 O(n²)，检查重复 O(n)",
    "然后优化到滑动窗口 O(n)，强调「每个字符最多被访问两次」",
    "可以提到 Map 优化：直接跳到重复位置，但要解释如何保持数据一致",
    "这是滑动窗口的经典入门题，务必熟练",
  ],

  frontendApplications: [
    "**输入验证**：检查输入是否包含重复字符",
    "**文本处理**：找最长不重复词段",
    "**缓存策略**：类似 LRU 的滑动窗口思想",
  ],
};

// ==================== 无重复字符的最长子串 - 思维引导 ====================
export const longestSubstringGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "「子串」和「子序列」有什么区别？这道题要求的是哪种？",
      hint: "子串要求连续吗？",
      answer: "子串必须连续，子序列可以不连续。本题是子串，所以可以用滑动窗口。",
      insight: "识别「子串」关键词，联想到滑动窗口算法。",
    },
    {
      stage: "plan",
      question: "如何用「窗口」表示一个不含重复字符的子串？",
      hint: "窗口需要维护什么信息？",
      answer: "窗口 [left, right] 表示当前子串，用 Set 记录窗口内的字符以快速判重。",
      insight: "窗口的定义决定了算法的正确性。",
    },
    {
      stage: "plan",
      question: "当遇到重复字符时，窗口应该如何变化？",
      hint: "能不能一步到位？还是要逐步收缩？",
      answer: "要逐步收缩左边界，同时从 Set 中删除对应字符，直到消除重复。",
      insight: "保持窗口内数据结构（Set）和实际窗口范围的一致性。",
    },
    {
      stage: "optimize",
      question: "有没有办法让左边界直接跳到重复位置，而不是逐步移动？",
      hint: "需要额外记录什么信息？",
      answer: "用 Map 记录每个字符最近出现的位置，直接跳转。但要注意只能往右跳，不能往左。",
      insight: "空间换时间的进一步优化。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "子串是连续的，可以用 [left, right] 两个指针表示。",
    },
    {
      level: 2,
      content: "右指针探索新字符，遇到重复时收缩左边界。这就是滑动窗口。",
    },
    {
      level: 3,
      content: "用 Set 记录窗口内字符，O(1) 判断是否重复。",
      codeFragment: `const charSet = new Set();`,
    },
    {
      level: 4,
      content: "遇到重复时，循环收缩左边界直到消除重复。",
      codeFragment: `while (charSet.has(s[right])) {
  charSet.delete(s[left]);
  left++;
}`,
    },
    {
      level: 5,
      content: "完整代码实现。",
      codeFragment: `function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
    },
  ],

  checkpoints: [
    {
      question: "滑动窗口算法的时间复杂度是多少？",
      options: ["O(n²)", "O(n)", "O(n log n)", "O(2ⁿ)"],
      correctAnswer: 1,
      explanation: "虽然有嵌套循环，但每个元素最多被左右指针各访问一次，总共 O(n)。",
    },
    {
      question: "为什么要用 Set 而不是数组来记录窗口内的字符？",
      options: [
        "数组不能存字符",
        "Set 的查找和删除是 O(1)",
        "Set 更节省空间",
        "题目要求用 Set",
      ],
      correctAnswer: 1,
      explanation: "Set 的 has() 和 delete() 都是 O(1)，数组的 includes() 和 splice() 是 O(n)。",
    },
  ],
};

// ==================== 盛最多水的容器 - 深度讲解 ====================
export const containerWaterDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "两条线和底边围成的面积 = min(左高, 右高) × 宽度。我们要找面积最大的组合。",
    patternMatch: "这是典型的「对撞指针」问题。从两端向中间逼近，通过贪心策略减少搜索空间。",
    whyItWorks: "宽度每次减少 1，为了让面积可能变大，必须移动较矮的那条边。因为面积受限于短板，移动高的边只会让宽度变小而高度不变。",
    metaphor: "想象两个人分别站在数轴两端，各举着一块板。他们要找出能装最多水的位置。每次矮的那个人向中间移动，因为只有他移动才有可能找到更高的板。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "分析面积公式",
      thought: "面积 = min(height[i], height[j]) × (j - i)。高度取决于短板，宽度取决于距离。",
      action: "理解面积的两个影响因素",
    },
    {
      step: 2,
      title: "暴力法分析",
      thought: "枚举所有 (i, j) 组合，时间 O(n²)。有没有更快的方法？",
      action: "寻找减少搜索空间的策略",
    },
    {
      step: 3,
      title: "发现贪心策略",
      thought: "从最宽开始（两端）。宽度每次减少 1，要让面积可能增大，必须让高度可能增大。",
      action: "移动较矮的那条边，因为它是短板",
      codeSnippet: `if (height[left] < height[right]) {
  left++;
} else {
  right--;
}`,
    },
    {
      step: 4,
      title: "证明正确性",
      thought: "假设移动高边而不是矮边，新面积 = min(新高, 旧矮) × (更小宽度) ≤ 旧矮 × 更小宽度 < 原面积。所以移动高边一定不会更优。",
      action: "贪心策略的正确性证明",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "初始化：双指针从两端开始，记录最大面积。",
    },
    {
      lineRange: [4, 4],
      explanation: "当左指针小于右指针时继续循环。相遇时结束。",
    },
    {
      lineRange: [5, 6],
      explanation: "计算当前面积：取两边高度的最小值 × 宽度。",
    },
    {
      lineRange: [7, 7],
      explanation: "更新最大面积。",
    },
    {
      lineRange: [9, 13],
      explanation: "移动较矮的那条边。这是贪心策略的核心。",
      keyPoint: "移动矮边才有可能找到更高的边，从而增大面积。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "左右指针各自最多移动 n 次，相遇后结束，所以时间 O(n)。",
    spaceBreakdown: "只用了几个变量，空间 O(1)。",
    reasoning: "对撞指针将 O(n²) 的枚举优化到 O(n)，关键在于贪心策略能保证不会漏掉最优解。",
  },

  commonMistakes: [
    {
      type: "logic",
      description: "移动高边而不是矮边",
      wrongCode: `if (height[left] > height[right]) {
  left++;  // ❌ 移动高边
}`,
      correctCode: `if (height[left] < height[right]) {
  left++;  // ✅ 移动矮边
}`,
      whyWrong: "移动高边后，新的高度不可能超过原来的矮边（它还在），而宽度变小了，面积一定不会更大。",
      howToAvoid: "记住：面积受限于短板，要让面积可能变大，必须让短板有机会变高。",
    },
  ],

  variations: [
    {
      description: "如果可以移除最多 k 条线呢？",
      difficultyChange: "harder",
      modification: "需要考虑动态规划或更复杂的贪心策略",
    },
    {
      description: "如果线可以倾斜呢？",
      difficultyChange: "harder",
      modification: "需要考虑几何计算，不再是简单的矩形面积",
    },
  ],

  interviewTips: [
    "先画图理解面积公式",
    "解释为什么贪心策略是正确的（反证法）",
    "强调「对撞指针」是这类问题的常用技巧",
    "可以问面试官：如果数组是有序的，有没有更优解？（答案是没有，仍然需要考虑所有组合）",
  ],

  frontendApplications: [
    "**布局计算**：计算两个元素之间的可用空间",
    "**响应式设计**：在限制条件下最大化内容区域",
    "**图表绘制**：在柱状图中找最大矩形（接雨水问题的变体）",
  ],
};

// ==================== 盛最多水的容器 - 思维引导 ====================
export const containerWaterGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "容器的面积由什么决定？写出面积公式。",
      hint: "想想容器的形状...",
      answer: "面积 = min(左高, 右高) × 宽度。高度取决于较矮的那条边（木桶原理）。",
      insight: "理解问题的数学本质是解题的第一步。",
    },
    {
      stage: "understand",
      question: "暴力法需要枚举多少种组合？时间复杂度是多少？",
      hint: "每两条线组成一个容器...",
      answer: "枚举所有 (i, j) 组合，共 n(n-1)/2 种，时间 O(n²)。",
      insight: "识别暴力法的复杂度，才能评估优化的价值。",
    },
    {
      stage: "plan",
      question: "如果从最宽的容器开始（两端），宽度会变化吗？向哪个方向变？",
      hint: "两个指针相向移动...",
      answer: "宽度只会减小，因为两个指针向中间移动。",
      insight: "宽度单调递减，这是贪心策略的基础。",
    },
    {
      stage: "plan",
      question: "宽度减小时，要让面积可能增大，应该移动哪个指针？为什么？",
      hint: "面积 = 短板 × 宽度...",
      answer: "移动较矮的那个指针。因为面积受限于短板，移动高板不可能增大面积（短板还在，宽度变小）。",
      insight: "这是贪心策略的核心：放弃一定不会更优的选择。",
    },
    {
      stage: "optimize",
      question: "这个贪心策略会不会漏掉最优解？如何证明？",
      hint: "反证法：假设移动高板能得到更优解...",
      answer: "不会。假设移动高板得到更优解，新面积 = min(新高, 旧短) × 新宽 ≤ 旧短 × 新宽 < 旧短 × 旧宽 = 原面积。矛盾！",
      insight: "能够证明贪心策略的正确性，是面试的加分项。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "面积 = min(左高, 右高) × 宽度。要最大化面积，需要平衡高度和宽度。",
    },
    {
      level: 2,
      content: "从两端开始，这时宽度最大。用双指针逼近。",
      codeFragment: `let left = 0, right = height.length - 1;`,
    },
    {
      level: 3,
      content: "每次移动较矮的那个指针，因为面积受限于短板。",
      codeFragment: `if (height[left] < height[right]) {
  left++;
} else {
  right--;
}`,
    },
    {
      level: 4,
      content: "完整代码实现。",
      codeFragment: `function maxArea(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxArea;
}`,
    },
  ],

  checkpoints: [
    {
      question: "对撞指针的时间复杂度是多少？",
      options: ["O(n²)", "O(n)", "O(n log n)", "O(1)"],
      correctAnswer: 1,
      explanation: "左右指针各最多移动 n 次，相遇后结束，所以是 O(n)。",
    },
    {
      question: "为什么要移动较矮的指针而不是较高的？",
      options: [
        "较矮的指针移动更快",
        "面积受限于短板，移动高板不可能增大面积",
        "题目要求这样做",
        "两种都可以",
      ],
      correctAnswer: 1,
      explanation: "面积 = 短板 × 宽度。移动高板时，短板不变，宽度减小，面积一定减小。",
    },
  ],
};

// ==================== 有效的括号 - 深度讲解 ====================
export const validParenthesesDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "括号匹配有两个规则：类型匹配（左右括号类型相同）和顺序匹配（最近的左括号和最近的右括号匹配）。",
    patternMatch: "「最近匹配」的特性完美契合栈的「后进先出」(LIFO) 性质。遇到左括号入栈，遇到右括号和栈顶匹配。",
    whyItWorks: "栈天然保持了「最近」的顺序。栈顶永远是最近的未匹配左括号，正好和当前右括号配对。",
    metaphor: "想象你在打开多层礼物盒。每打开一个盒子就把盒盖放在手边（入栈）。当你要盖上盒子时，必须先盖最近打开的那个（栈顶），不能跳着盖。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "分析匹配规则",
      thought: "右括号必须和「最近的」未匹配左括号匹配。这个「最近」的特性让我想到栈。",
      action: "决定使用栈来存储左括号",
    },
    {
      step: 2,
      title: "设计匹配逻辑",
      thought: "遇到左括号入栈，遇到右括号检查栈顶。需要一个映射表来判断类型是否匹配。",
      action: "创建右括号到左括号的映射",
      codeSnippet: `const pairs = { ')': '(', ']': '[', '}': '{' };`,
    },
    {
      step: 3,
      title: "处理遍历过程",
      thought: "遍历每个字符：左括号入栈，右括号弹栈匹配。如果栈空或类型不匹配，直接返回 false。",
      action: "实现主循环逻辑",
      codeSnippet: `for (const char of s) {
  if (char === '(' || char === '[' || char === '{') {
    stack.push(char);
  } else {
    if (stack.pop() !== pairs[char]) return false;
  }
}`,
    },
    {
      step: 4,
      title: "处理边界情况",
      thought: "遍历结束后，如果栈不为空，说明有未匹配的左括号，也是无效的。",
      action: "检查栈是否为空",
      codeSnippet: "return stack.length === 0;",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 1],
      explanation: "创建空栈，用于存储遇到的左括号。",
      keyPoint: "栈是 LIFO 结构，栈顶永远是最近的元素。",
    },
    {
      lineRange: [2, 5],
      explanation: "建立右括号到左括号的映射表，用于快速判断匹配。",
      keyPoint: "用 Object 作为映射表，查找是 O(1)。",
    },
    {
      lineRange: [7, 9],
      explanation: "遇到左括号直接入栈，等待后续的右括号来匹配。",
    },
    {
      lineRange: [10, 14],
      explanation: "遇到右括号，弹出栈顶元素检查是否匹配。",
      keyPoint: "stack.pop() 同时完成了取值和删除操作。",
      commonMistake: "要先检查栈是否为空。如果栈空说明没有左括号可匹配。",
    },
    {
      lineRange: [17, 17],
      explanation: "遍历结束后检查栈是否为空。非空说明有多余的左括号。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "遍历字符串一次，每个字符的入栈/出栈操作都是 O(1)，总时间 O(n)。",
    spaceBreakdown: "最坏情况下全是左括号，栈存储 n 个元素，空间 O(n)。",
    bestCase: "第一个字符就是右括号，立即返回 false，O(1)。",
    worstCase: "全是左括号，栈存满 n 个元素，最后返回 false。",
    reasoning: "栈的每个操作都是 O(1)，总操作次数等于字符串长度。",
  },

  commonMistakes: [
    {
      type: "edge-case",
      description: "忘记检查栈为空的情况",
      wrongCode: `if (stack.pop() !== pairs[char]) {  // ❌ 栈可能为空
  return false;
}`,
      correctCode: `if (stack.length === 0 || stack.pop() !== pairs[char]) {
  return false;
}`,
      whyWrong: "如果字符串以右括号开头如 ']'，栈为空时 pop() 返回 undefined，虽然不等于 '['，但逻辑不够清晰。",
      howToAvoid: "先显式检查栈长度，代码更健壮可读。",
    },
    {
      type: "logic",
      description: "忘记最后检查栈是否为空",
      wrongCode: `for (...) { ... }
return true;  // ❌ 可能还有未匹配的左括号`,
      correctCode: `for (...) { ... }
return stack.length === 0;  // ✅ 确保没有多余的左括号`,
      whyWrong: "输入 '(' 时，循环正常结束，但栈里还有一个 '(' 没匹配。",
      howToAvoid: "记住「完全匹配」的两个条件：类型匹配 + 数量相等。",
    },
  ],

  variations: [
    {
      description: "如果括号可以不按顺序匹配呢？如 '([)]'",
      difficultyChange: "harder",
      modification: "需要用计数而不是栈，分别统计每种括号的数量",
    },
    {
      description: "如果可以删除最多 k 个括号使其有效呢？",
      difficultyChange: "harder",
      modification: "动态规划或回溯算法",
      relatedProblemId: "minimum-remove-to-make-valid-parentheses",
    },
  ],

  interviewTips: [
    "开口就说「这是栈的经典应用」，展示模式识别能力",
    "解释为什么栈适合这道题（LIFO 和「最近匹配」的对应）",
    "主动说出两个边界情况：栈空时遇到右括号、遍历结束后栈非空",
    "这道题太经典，务必能在 5 分钟内写出 bug-free 代码",
  ],

  frontendApplications: [
    "**HTML/JSX 标签匹配**：检查标签是否正确闭合",
    "**代码编辑器**：实时检查括号匹配，高亮不匹配的括号",
    "**表达式求值**：括号匹配是表达式解析的基础",
    "**Lint 工具**：ESLint 检查代码格式时会用到类似逻辑",
  ],
};

// ==================== 有效的括号 - 思维引导 ====================
export const validParenthesesGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "括号「有效」需要满足哪些条件？",
      hint: "考虑类型和顺序...",
      answer: "1) 每个右括号都有对应的同类型左括号；2) 匹配顺序正确（最近的左括号先匹配）。",
      insight: "分解问题的要求，逐一验证。",
    },
    {
      stage: "understand",
      question: "')(' 和 '()' 有什么区别？为什么前者无效？",
      hint: "考虑遇到右括号时的状态...",
      answer: "')(' 无效是因为遇到 ')' 时还没有可匹配的 '('。顺序很重要。",
      insight: "右括号必须「找到」一个已经出现的左括号才能匹配。",
    },
    {
      stage: "plan",
      question: "'([)]' 为什么无效？应该和哪个左括号匹配？",
      hint: "最近原则...",
      answer: "']' 应该和最近的 '[' 匹配，但最近的未匹配左括号是 '('，类型不对。",
      insight: "「最近匹配」原则 → 后进先出 → 栈！",
    },
    {
      stage: "code",
      question: "如何用栈来实现匹配？遇到左括号和右括号分别做什么？",
      hint: "入栈和出栈...",
      answer: "左括号入栈，右括号时弹栈检查是否匹配。",
      insight: "栈顶永远是最近的未匹配左括号。",
    },
    {
      stage: "code",
      question: "遍历结束后，还需要检查什么？",
      hint: "'((' 会怎样？",
      answer: "检查栈是否为空。非空说明有多余的左括号未匹配。",
      insight: "完全匹配 = 类型匹配 + 数量相等。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "右括号必须和「最近的」未匹配左括号配对。这是栈的典型应用场景。",
    },
    {
      level: 2,
      content: "用栈存储左括号，用映射表判断类型匹配。",
      codeFragment: `const stack = [];
const pairs = { ')': '(', ']': '[', '}': '{' };`,
    },
    {
      level: 3,
      content: "遍历字符串：左括号入栈，右括号弹栈匹配。",
      codeFragment: `for (const char of s) {
  if ('([{'.includes(char)) {
    stack.push(char);
  } else {
    if (stack.pop() !== pairs[char]) return false;
  }
}`,
    },
    {
      level: 4,
      content: "完整代码，包括边界检查。",
      codeFragment: `function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
    },
  ],

  checkpoints: [
    {
      question: "为什么括号匹配问题适合用栈？",
      options: [
        "栈的查找效率高",
        "栈的 LIFO 特性和「最近匹配」原则契合",
        "栈比数组更节省空间",
        "题目要求用栈",
      ],
      correctAnswer: 1,
      explanation: "栈是后进先出，栈顶是最近入栈的元素，正好对应「最近的左括号」。",
    },
    {
      question: "输入 '([)]' 为什么返回 false？",
      options: [
        "括号数量不匹配",
        "最近的 '[' 和 ')' 类型不匹配",
        "缺少左括号",
        "缺少右括号",
      ],
      correctAnswer: 1,
      explanation: "遇到 ')' 时，栈顶是 '['（最近的左括号），但 ')' 应该匹配 '('，类型不对。",
    },
  ],
};

// ==================== 环形链表 - 深度讲解 ====================
export const linkedListCycleDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "如果链表有环，从头开始遍历会无限循环。我们需要一种方法检测「是否回到了之前经过的节点」。",
    patternMatch: "这是「快慢指针」(Floyd 判圈算法) 的经典应用。快指针每次走 2 步，慢指针每次走 1 步，如果有环，它们一定会相遇。",
    whyItWorks: "想象操场跑步：快的人每圈比慢的人多跑一定距离，最终会「套圈」追上慢的人。在环形链表中，快指针每次比慢指针多走 1 步，最终一定追上。",
    metaphor: "两个人在环形跑道上跑步，一个速度是另一个的两倍。无论起点在哪，快的人一定会追上慢的人。如果跑道不是环形（有终点），快的人会先到终点。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "分析问题本质",
      thought: "如何知道链表有环？如果遍历时再次到达之前访问过的节点，就有环。",
      action: "考虑记录访问过的节点",
    },
    {
      step: 2,
      title: "方法一：哈希表",
      thought: "用 Set 记录访问过的节点。如果遇到重复节点，说明有环。空间 O(n)。",
      action: "实现哈希表解法（备选）",
      codeSnippet: `const visited = new Set();
while (head) {
  if (visited.has(head)) return true;
  visited.add(head);
  head = head.next;
}
return false;`,
    },
    {
      step: 3,
      title: "方法二：快慢指针",
      thought: "能不能用 O(1) 空间？快慢指针！如果有环，快指针会追上慢指针。",
      action: "实现快慢指针解法",
      codeSnippet: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}
return false;`,
    },
    {
      step: 4,
      title: "证明正确性",
      thought: "假设环长度为 C。当慢指针进入环时，快指针在环内某位置。每次迭代，快指针追近 1 步，最多 C 次就能追上。",
      action: "理解算法的数学证明",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 1],
      explanation: "边界检查：空链表或只有一个节点且无环，直接返回 false。",
      keyPoint: "单节点要形成环，必须 next 指向自己，这里的检查是优化。",
    },
    {
      lineRange: [3, 4],
      explanation: "初始化快慢指针，都从 head 开始。",
    },
    {
      lineRange: [6, 6],
      explanation: "循环条件：fast 和 fast.next 都存在。如果无环，fast 会先到 null。",
      keyPoint: "检查 fast.next 是因为 fast 每次走两步，要确保第二步有效。",
    },
    {
      lineRange: [7, 8],
      explanation: "慢指针走一步，快指针走两步。",
    },
    {
      lineRange: [10, 12],
      explanation: "如果快慢指针相遇，说明有环。",
      keyPoint: "比较的是节点引用，不是节点值。两个不同节点可能有相同的值。",
    },
    {
      lineRange: [15, 15],
      explanation: "循环正常结束（fast 到达 null），说明无环。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "无环时，快指针遍历 n/2 次到达末尾。有环时，最多 n 次追上慢指针。总时间 O(n)。",
    spaceBreakdown: "只用了两个指针变量，空间 O(1)。这是相比哈希表方法的优势。",
    bestCase: "链表很短或环在开头，O(1) 就能检测到。",
    worstCase: "环在末尾，需要遍历整个链表。",
    reasoning: "快慢指针用 O(1) 空间实现了 O(n) 时间的环检测，是空间最优解。",
  },

  commonMistakes: [
    {
      type: "logic",
      description: "比较节点值而不是节点引用",
      wrongCode: `if (slow.val === fast.val) return true;  // ❌ 值相同不代表是同一个节点`,
      correctCode: `if (slow === fast) return true;  // ✅ 比较引用`,
      whyWrong: "链表中可能有多个值相同的节点。我们要检测的是「同一个节点」被访问两次。",
      howToAvoid: "链表题一般比较节点引用，不是值。",
    },
    {
      type: "edge-case",
      description: "忘记检查 fast.next",
      wrongCode: `while (fast) {  // ❌ 没检查 fast.next
  fast = fast.next.next;  // 可能空指针
}`,
      correctCode: `while (fast && fast.next) {
  fast = fast.next.next;
}`,
      whyWrong: "fast 每次走两步，如果 fast.next 是 null，fast.next.next 会报错。",
      howToAvoid: "快指针走 k 步，就要检查前 k-1 步都不为 null。",
    },
  ],

  variations: [
    {
      description: "如果要返回环的入口节点呢？（环形链表 II）",
      difficultyChange: "harder",
      modification: "相遇后，一个指针回到 head，两个都每次走一步，再次相遇就是入口",
      relatedProblemId: "linked-list-cycle-ii",
    },
    {
      description: "如果链表有多个环呢？",
      difficultyChange: "harder",
      modification: "标准链表不可能有多个环（每个节点只有一个 next）",
    },
  ],

  interviewTips: [
    "先说哈希表解法 O(n) 空间，再优化到快慢指针 O(1) 空间",
    "解释为什么快慢指针一定会相遇（追及问题）",
    "主动提到进阶问题「找环入口」，展示知识深度",
    "这是 Floyd 判圈算法，适当提及算法名称",
  ],

  frontendApplications: [
    "**检测循环依赖**：模块或组件的循环引用检测",
    "**垃圾回收**：JavaScript 引擎检测循环引用（虽然现代 GC 有其他方法）",
    "**无限滚动**：检测列表数据是否形成循环",
    "**状态机**：检测状态转换是否形成死循环",
  ],
};

// ==================== 环形链表 - 思维引导 ====================
export const linkedListCycleGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "什么情况下链表会有环？如何判断遇到了环？",
      hint: "遍历链表时会发生什么...",
      answer: "如果某个节点的 next 指向之前的节点，就形成环。遍历时会无限循环，回到之前访问过的节点。",
      insight: "环的本质是「重复访问同一节点」。",
    },
    {
      stage: "plan",
      question: "如何记录「之前访问过的节点」？",
      hint: "用什么数据结构存储...",
      answer: "用 Set 存储访问过的节点引用。每次访问检查是否在 Set 中。",
      insight: "这是 O(n) 空间的直观解法。",
    },
    {
      stage: "plan",
      question: "有没有不用额外空间的方法？想想龟兔赛跑...",
      hint: "两个不同速度的指针...",
      answer: "快慢指针！快的追慢的，如果有环，一定会追上（套圈）。",
      insight: "Floyd 判圈算法，O(1) 空间。",
    },
    {
      stage: "code",
      question: "快指针每次走 2 步，为什么循环条件要检查 fast && fast.next？",
      hint: "如果 fast.next 是 null...",
      answer: "因为 fast.next.next 需要 fast.next 存在。否则会空指针错误。",
      insight: "走 k 步要检查前 k-1 步都有效。",
    },
    {
      stage: "optimize",
      question: "为什么快指针走 2 步而不是 3 步或更多？",
      hint: "考虑追及的步数...",
      answer: "快 2 步保证每次追近 1 步，环长度为 C 时最多 C 次追上。更快的速度不会更优，反而可能跳过。",
      insight: "速度差为 1 是最简单可靠的追及策略。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "环意味着遍历会重复访问某个节点。如何检测重复？",
    },
    {
      level: 2,
      content: "方法一：用 Set 记录访问过的节点，空间 O(n)。",
      codeFragment: `const visited = new Set();
while (head) {
  if (visited.has(head)) return true;
  visited.add(head);
  head = head.next;
}`,
    },
    {
      level: 3,
      content: "方法二：快慢指针，空间 O(1)。有环时快指针会追上慢指针。",
      codeFragment: `let slow = head, fast = head;
while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
  if (slow === fast) return true;
}`,
    },
    {
      level: 4,
      content: "完整代码，包括边界检查。",
      codeFragment: `function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }

  return false;
}`,
    },
  ],

  checkpoints: [
    {
      question: "快慢指针检测环的时间复杂度是多少？",
      options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
      correctAnswer: 1,
      explanation: "最坏情况下，慢指针遍历整个链表一次，快指针两次，都是 O(n)。",
    },
    {
      question: "为什么要比较节点引用而不是节点值？",
      options: [
        "值比较更慢",
        "链表可能有相同值的不同节点",
        "题目要求比较引用",
        "引用更容易比较",
      ],
      correctAnswer: 1,
      explanation: "环是「同一个节点」被访问两次，不是「相同值」。不同节点可能有相同的值。",
    },
  ],
};

// ==================== 导出所有深度讲解数据 ====================
export const deepExplanations: Record<string, DeepExplanation> = {
  "two-sum": twoSumDeepExplanation,
  "longest-substring-without-repeating-characters": longestSubstringDeepExplanation,
  "container-with-most-water": containerWaterDeepExplanation,
  "valid-parentheses": validParenthesesDeepExplanation,
  "linked-list-cycle": linkedListCycleDeepExplanation,
};

export const guidedThinkings: Record<string, GuidedThinking> = {
  "two-sum": twoSumGuidedThinking,
  "longest-substring-without-repeating-characters": longestSubstringGuidedThinking,
  "container-with-most-water": containerWaterGuidedThinking,
  "valid-parentheses": validParenthesesGuidedThinking,
  "linked-list-cycle": linkedListCycleGuidedThinking,
};
