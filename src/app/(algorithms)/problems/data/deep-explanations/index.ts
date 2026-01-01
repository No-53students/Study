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

// ==================== 有效的字母异位词 - 深度讲解 ====================
export const validAnagramDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "字母异位词意味着两个字符串包含完全相同的字符，只是排列顺序不同。关键是「相同的字符」和「相同的数量」。",
    patternMatch: "这是典型的「频率统计」问题。需要统计每个字符出现的次数，然后比较两个字符串的统计结果是否一致。",
    whyItWorks: "如果两个字符串是异位词，那么每个字符的出现次数必须相同。用哈希表记录字符频率，一加一减，最终全为零说明完全匹配。",
    metaphor: "想象两个人各有一堆字母积木。要判断他们的积木是否完全相同，可以让一个人一个个拿出积木，另一个人找到对应的放回去。如果最后两边都刚好清空，说明积木完全相同。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "快速排除",
      thought: "如果两个字符串长度不同，不可能是异位词。这是一个 O(1) 的快速判断。",
      action: "先比较长度",
      codeSnippet: "if (s.length !== t.length) return false;",
    },
    {
      step: 2,
      title: "选择统计方式",
      thought: "需要统计字符频率。可以用 Map，也可以用长度为 26 的数组（因为只有小写字母）。数组更快，索引计算：charCodeAt(i) - 97。",
      action: "创建频率数组",
      codeSnippet: "const count = new Array(26).fill(0);",
    },
    {
      step: 3,
      title: "巧妙的一次遍历",
      thought: "不需要分别统计两个字符串。可以同时遍历，s 的字符加 1，t 的字符减 1。如果是异位词，最终数组全为 0。",
      action: "一加一减",
      codeSnippet: `for (let i = 0; i < s.length; i++) {
  count[s.charCodeAt(i) - 97]++;
  count[t.charCodeAt(i) - 97]--;
}`,
    },
    {
      step: 4,
      title: "验证结果",
      thought: "检查数组是否全为 0。任何非零值说明某个字符数量不匹配。",
      action: "使用 every 检查",
      codeSnippet: "return count.every(c => c === 0);",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "快速排除：长度不同直接返回 false。这避免了不必要的计算。",
      keyPoint: "边界检查应该放在最前面，快速失败。",
    },
    {
      lineRange: [4, 4],
      explanation: "创建长度为 26 的数组，对应 26 个小写字母。初始值全为 0。",
      keyPoint: "用数组比 Map 更快，因为索引访问是 O(1) 且没有哈希计算开销。",
    },
    {
      lineRange: [6, 9],
      explanation: "同时遍历两个字符串。s 中的字符让对应位置 +1，t 中的字符让对应位置 -1。",
      keyPoint: "charCodeAt(i) - 97 将 'a'-'z' 映射到 0-25。97 是 'a' 的 ASCII 码。",
      commonMistake: "别忘了减 97！直接用 charCodeAt 会超出数组范围。",
    },
    {
      lineRange: [11, 11],
      explanation: "检查数组是否全为 0。every() 方法会在遇到第一个 false 时短路返回。",
      keyPoint: "也可以用 for 循环遍历检查，但 every 更简洁。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "遍历字符串一次 O(n) + 检查数组 O(26) = O(n)。常数因子很小。",
    spaceBreakdown: "只用了长度为 26 的固定数组，O(1) 空间。",
    bestCase: "长度不同时立即返回，O(1)。",
    worstCase: "必须遍历完整个字符串，O(n)。",
    reasoning: "这是字符频率统计的最优解法。时间 O(n)，空间 O(1)，无法再优化。",
  },

  patternComparisons: [
    {
      problemId: "find-all-anagrams-in-a-string",
      title: "找到字符串中所有字母异位词",
      similarity: "都需要判断异位词",
      difference: "那道题需要在长字符串中找所有匹配位置，用滑动窗口",
      tip: "滑动窗口 + 频率数组是找子串异位词的标准做法",
    },
    {
      problemId: "group-anagrams",
      title: "字母异位词分组",
      similarity: "都涉及异位词判断",
      difference: "那道题需要将异位词分组，可以用排序后的字符串作为 key",
      tip: "分组问题用 Map，key 是排序后的字符串",
    },
    {
      problemId: "first-unique-character-in-a-string",
      title: "字符串中的第一个唯一字符",
      similarity: "都用频率统计",
      difference: "那道题找出现一次的字符，本题比较两个频率",
      tip: "频率统计是字符串问题的基础技巧",
    },
  ],

  commonMistakes: [
    {
      type: "logic",
      description: "忘记先检查长度",
      wrongCode: `function isAnagram(s, t) {
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
  }
  // 如果 t 更长，后面的字符没被统计
}`,
      correctCode: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  // ...
}`,
      whyWrong: "如果 t 比 s 长，多余的字符不会被正确处理。先检查长度可以避免这个问题。",
      howToAvoid: "养成先写边界检查的习惯。",
    },
    {
      type: "syntax",
      description: "索引计算错误",
      wrongCode: `count[s.charCodeAt(i)]++;  // 直接用 charCodeAt`,
      correctCode: `count[s.charCodeAt(i) - 97]++;  // 减去 'a' 的 ASCII 码`,
      whyWrong: "'a' 的 ASCII 是 97，直接用会访问数组的第 97 位，超出 26 的范围。",
      howToAvoid: "记住：charCodeAt('a') = 97，需要偏移。或者用 s.charCodeAt(i) - 'a'.charCodeAt(0)。",
    },
    {
      type: "edge-case",
      description: "使用 Map 时的 Unicode 问题",
      wrongCode: `// 题目只说小写字母，但进阶问 Unicode
const count = new Array(26).fill(0);  // 只能处理 a-z`,
      correctCode: `// 用 Map 处理 Unicode
const count = new Map();
for (const char of s) {
  count.set(char, (count.get(char) || 0) + 1);
}`,
      whyWrong: "如果输入包含 Unicode 字符（如中文、emoji），26 位数组无法处理。",
      howToAvoid: "面试时主动问清楚输入范围。如果可能有 Unicode，改用 Map。",
    },
  ],
};

export const validAnagramGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "什么是「字母异位词」？请用自己的话描述。",
      hint: "想想两个词用了相同的字母，但排列不同。",
      answer: "字母异位词是指由相同的字母组成、每个字母出现次数相同、但排列顺序不同的两个词。",
      insight: "异位词的关键是「相同字母 + 相同数量」，顺序无关紧要。",
    },
    {
      stage: "understand",
      question: "有什么方法可以快速排除不是异位词的情况？",
      hint: "最简单的特征是什么？",
      answer: "如果两个字符串长度不同，一定不是异位词。",
      insight: "边界检查往往能提前返回，避免无效计算。",
    },
    {
      stage: "plan",
      question: "你能想到哪些方法判断两个字符串是异位词？",
      hint: "想想排序、计数等方法。",
      answer: "方法1：排序后比较；方法2：统计每个字符的频率。",
      insight: "多种方法中选择最优的，排序 O(n log n)，计数 O(n)。",
    },
    {
      stage: "plan",
      question: "如何高效地统计字符频率？",
      hint: "用什么数据结构？有没有比 Map 更快的方式？",
      answer: "可以用长度 26 的数组，索引对应 a-z，值表示出现次数。",
      insight: "固定范围的计数问题，数组比哈希表更高效。",
    },
    {
      stage: "code",
      question: "如何将字符 'a'-'z' 映射到数组索引 0-25？",
      hint: "字符有 ASCII 码，'a' 是多少？",
      answer: "charCodeAt(i) - 97，因为 'a' 的 ASCII 码是 97。",
      insight: "字符与数字的转换是常用技巧。",
    },
    {
      stage: "optimize",
      question: "能否只用一次遍历完成统计？",
      hint: "同时处理两个字符串。",
      answer: "遍历时 s 的字符 +1，t 的字符 -1，最后检查是否全为 0。",
      insight: "相消技巧可以减少遍历次数。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "核心思路：统计字符频率，比较两个字符串的频率是否相同。",
    },
    {
      level: 2,
      content: "优化技巧：一边遍历一边处理，s 的字符加 1，t 的字符减 1。",
      codeFragment: `count[s.charCodeAt(i) - 97]++;
count[t.charCodeAt(i) - 97]--;`,
    },
    {
      level: 3,
      content: "完整思路：先检查长度，再一次遍历统计，最后验证全为 0。",
      codeFragment: `if (s.length !== t.length) return false;
const count = new Array(26).fill(0);
for (let i = 0; i < s.length; i++) {
  count[s.charCodeAt(i) - 97]++;
  count[t.charCodeAt(i) - 97]--;
}
return count.every(c => c === 0);`,
    },
  ],

  checkpoints: [
    {
      question: "为什么数组长度是 26？",
      options: ["随便选的", "26 个英文字母", "ASCII 码范围", "题目要求"],
      correctAnswer: 1,
      explanation: "题目说只有小写字母 a-z，共 26 个，所以用长度 26 的数组。",
    },
    {
      question: "charCodeAt(i) - 97 的作用是什么？",
      options: [
        "获取字符的 ASCII 码",
        "将 'a'-'z' 映射到 0-25",
        "计算字符串长度",
        "判断是否为字母",
      ],
      correctAnswer: 1,
      explanation: "'a' 的 ASCII 是 97，减去 97 后 'a'=0, 'b'=1, ..., 'z'=25。",
    },
    {
      question: "如果输入包含 Unicode 字符，应该怎么改？",
      options: [
        "增加数组长度",
        "改用 Map 存储频率",
        "无法处理 Unicode",
        "用 Set 去重",
      ],
      correctAnswer: 1,
      explanation: "Map 的 key 可以是任意字符，不受固定大小限制。",
    },
  ],
};

// ==================== merge-sorted-array 深度讲解 ====================
export const mergeSortedArrayDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "两个有序数组合并，需要把 nums2 的元素插入到 nums1 中，保持有序。",
    patternMatch: "这是典型的「双指针」问题，但有一个关键约束：必须原地修改 nums1。",
    whyItWorks: "从后往前填充可以利用 nums1 尾部的空闲空间，避免覆盖还未处理的元素。",
    metaphor: "想象两队人按身高排好队，要合并成一队。如果从矮的开始安排，前面的人会被挤走；但从高的开始，往后站，就不会影响前面的人。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "理解问题约束",
      thought: "nums1 长度是 m+n，前 m 个是有效元素，后 n 个是 0。",
      action: "识别出 nums1 尾部有空位可以利用。",
    },
    {
      step: 2,
      title: "尝试正向思路（发现问题）",
      thought: "如果从前往后填充，nums1 的元素会被覆盖。",
      action: "发现正向方法不可行，需要换思路。",
    },
    {
      step: 3,
      title: "逆向思维",
      thought: "从后往前填充！nums1 尾部是空位，不会覆盖有效元素。",
      action: "决定使用逆向双指针策略。",
    },
    {
      step: 4,
      title: "设计三指针",
      thought: "需要追踪三个位置：nums1有效末尾、nums2末尾、填充位置。",
      action: "定义 p1=m-1, p2=n-1, p=m+n-1。",
    },
    {
      step: 5,
      title: "比较填充",
      thought: "每次比较 nums1[p1] 和 nums2[p2]，较大的应该放到末尾。",
      action: "较大的放到 nums1[p]，对应指针左移。",
    },
    {
      step: 6,
      title: "终止条件",
      thought: "nums2 的元素必须全部放入，nums1 的元素已在正确位置。",
      action: "循环条件是 p2 >= 0。",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "初始化三个指针：p1 指向 nums1 有效部分末尾，p2 指向 nums2 末尾，p 指向最终位置。",
      keyPoint: "p = m + n - 1 是关键，这是合并后数组的最后一个位置。",
    },
    {
      lineRange: [5, 5],
      explanation: "循环条件是 p2 >= 0，因为 nums2 的所有元素都必须放入 nums1。",
      keyPoint: "为什么不用 p1 >= 0？因为 nums1 的元素本来就在正确位置，不需要移动。",
    },
    {
      lineRange: [6, 8],
      explanation: "如果 nums1[p1] 更大，把它放到 p 位置，p1 左移。",
      keyPoint: "条件 p1 >= 0 防止越界。",
    },
    {
      lineRange: [9, 11],
      explanation: "否则把 nums2[p2] 放到 p 位置，p2 左移。",
      keyPoint: "当 p1 < 0 时，只需把 nums2 剩余元素依次填入。",
    },
    {
      lineRange: [12, 12],
      explanation: "p 左移，准备填充下一个位置。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "每个元素最多被访问一次，总共 m + n 个元素",
    spaceBreakdown: "只使用了三个指针变量，O(1) 额外空间",
    bestCase: "O(m + n)，无论输入如何都需要遍历所有元素",
    worstCase: "O(m + n)",
    reasoning: "双指针各自只会移动一次，不会回退，所以是线性时间。",
  },

  patternComparisons: [
    {
      problemId: "merge-two-sorted-lists",
      title: "合并两个有序链表",
      similarity: "都是合并有序序列，使用双指针比较",
      difference: "链表可以改变指针，不需要逆向；数组需要考虑原地修改",
    },
    {
      problemId: "two-sum-ii-input-array-is-sorted",
      title: "两数之和 II",
      similarity: "都使用双指针技巧处理有序数组",
      difference: "本题是合并，那题是查找；指针移动方向不同",
    },
  ],

  commonMistakes: [
    {
      type: "logic",
      description: "从前往后填充导致覆盖",
      wrongCode: `let p = 0;
while (p1 < m && p2 < n) {
  if (nums1[p1] < nums2[p2]) {
    nums1[p++] = nums1[p1++]; // 问题：p1 的值被覆盖！
  } else {
    nums1[p++] = nums2[p2++];
  }
}`,
      correctCode: `let p = m + n - 1;
while (p2 >= 0) {
  if (p1 >= 0 && nums1[p1] > nums2[p2]) {
    nums1[p--] = nums1[p1--];
  } else {
    nums1[p--] = nums2[p2--];
  }
}`,
      whyWrong: "从前往后填充时，nums1[p] 可能覆盖还未处理的 nums1[p1]。",
      howToAvoid: "逆向思维！利用尾部空位，从后往前填充。",
    },
    {
      type: "boundary",
      description: "忘记处理 nums1 先用完的情况",
      wrongCode: `while (p2 >= 0 && p1 >= 0) { // 错误：p1 < 0 时 nums2 还有元素
  // ...
}`,
      correctCode: `while (p2 >= 0) {
  if (p1 >= 0 && nums1[p1] > nums2[p2]) {
    nums1[p--] = nums1[p1--];
  } else {
    nums1[p--] = nums2[p2--];
  }
}`,
      whyWrong: "如果 nums1 的有效元素先用完，nums2 剩余元素需要继续填入。",
      howToAvoid: "循环条件是 p2 >= 0，因为 nums2 必须全部放入。",
    },
  ],

  interviewTips: [
    "先问清楚：是否可以使用额外空间？这决定了用哪种方法。",
    "提到「逆向双指针」时，解释为什么从后往前不会覆盖。",
    "可以提一下：如果允许额外空间，可以新建数组正向合并。",
  ],

  frontendApplications: [
    "合并多个排序好的时间线事件（协作编辑、日程管理）",
    "合并来自不同数据源的有序列表（如聊天消息合并）",
    "虚拟滚动中合并预加载的有序数据块",
  ],
};

export const mergeSortedArrayGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么 nums1 的长度是 m + n？这暗示了什么？",
      hint: "后面多出来的空间有什么用？",
      answer: "nums1 预留了 n 个空位用于放置 nums2 的元素，这意味着我们需要原地合并。",
      insight: "题目已经暗示了不需要额外空间。",
    },
    {
      stage: "plan",
      question: "如果从前往后填充，会遇到什么问题？",
      hint: "想想 nums1[0] 放到新位置后，原来的值会怎样？",
      answer: "从前往后填充时，新填入的元素可能覆盖 nums1 中还未处理的元素。",
      insight: "正向思路遇到障碍时，考虑逆向。",
    },
    {
      stage: "plan",
      question: "从后往前填充为什么可行？",
      hint: "nums1 的尾部是什么？",
      answer: "nums1 尾部是空位(0)，从后往前填充不会覆盖有效元素。",
      insight: "利用问题的特殊结构是算法设计的关键。",
    },
    {
      stage: "code",
      question: "需要几个指针？各自指向哪里？",
      hint: "需要知道两个数组当前比较位置，还需要知道填充位置。",
      answer: "三个指针：p1 指向 nums1 有效末尾，p2 指向 nums2 末尾，p 指向填充位置。",
      insight: "指针数量 = 需要追踪的位置数量。",
    },
    {
      stage: "code",
      question: "循环什么时候结束？",
      hint: "哪个数组的元素必须全部处理？",
      answer: "当 p2 < 0 时结束，因为 nums2 的所有元素都必须放入 nums1。",
      insight: "nums1 的元素本来就在正确位置，不需要额外处理。",
    },
    {
      stage: "optimize",
      question: "这个解法还能优化吗？",
      hint: "考虑时间和空间复杂度。",
      answer: "时间 O(m+n)，空间 O(1)，已经是最优解，无法再优化。",
      insight: "每个元素必须被处理一次，所以 O(m+n) 是下界。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "关键洞察：从后往前填充，利用 nums1 尾部的空位。",
    },
    {
      level: 2,
      content: "设置三个指针：p1 = m-1, p2 = n-1, p = m+n-1",
      codeFragment: `let p1 = m - 1;
let p2 = n - 1;
let p = m + n - 1;`,
    },
    {
      level: 3,
      content: "比较并填充：每次取较大的放到 p 位置。",
      codeFragment: `while (p2 >= 0) {
  if (p1 >= 0 && nums1[p1] > nums2[p2]) {
    nums1[p--] = nums1[p1--];
  } else {
    nums1[p--] = nums2[p2--];
  }
}`,
    },
  ],

  checkpoints: [
    {
      question: "为什么要从后往前填充？",
      options: [
        "代码更简洁",
        "避免覆盖 nums1 的有效元素",
        "提高时间复杂度",
        "减少比较次数",
      ],
      correctAnswer: 1,
      explanation: "从后往前填充利用了 nums1 尾部的空位，不会覆盖还未处理的元素。",
    },
    {
      question: "为什么循环条件是 p2 >= 0 而不是 p1 >= 0？",
      options: [
        "随意选择的",
        "nums2 的元素必须全部放入 nums1",
        "nums1 的元素更多",
        "防止数组越界",
      ],
      correctAnswer: 1,
      explanation: "nums1 的元素本来就在正确位置，但 nums2 的每个元素都必须被移入 nums1。",
    },
    {
      question: "如果 nums1 = [4,5,6,0,0,0], nums2 = [1,2,3]，最终结果是？",
      options: [
        "[1,2,3,4,5,6]",
        "[4,5,6,1,2,3]",
        "[1,4,2,5,3,6]",
        "[4,1,5,2,6,3]",
      ],
      correctAnswer: 0,
      explanation: "按照逆向双指针逻辑，6>3 放6，5>3 放5，4>3 放4，然后放3,2,1。结果是 [1,2,3,4,5,6]。",
    },
  ],
};

// ==================== three-sum 深度讲解 ====================
export const threeSumDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找三个数和为 0，暴力需要 O(n³)，但数组可以排序利用有序性。",
    patternMatch: "这是「两数之和」的升级版：固定一个数，剩下变成在有序数组中找两数之和。",
    whyItWorks: "排序后，固定一个数 nums[i]，用双指针在剩余区间找 target = -nums[i]。",
    metaphor: "想象三个人站在数轴上，要让他们的位置之和为 0。固定一个人后，另外两个人向中间靠拢，直到找到平衡点。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "分析暴力解法",
      thought: "三重循环遍历所有组合，O(n³) 太慢。",
      action: "需要优化，考虑利用有序性。",
    },
    {
      step: 2,
      title: "降维思考",
      thought: "三数之和 = 固定一个数 + 两数之和。",
      action: "外层遍历固定 nums[i]，内层用双指针找 -nums[i]。",
    },
    {
      step: 3,
      title: "排序是关键",
      thought: "排序后才能用双指针；排序也方便跳过重复。",
      action: "先 sort()，然后遍历。",
    },
    {
      step: 4,
      title: "去重是难点",
      thought: "[-1,-1,0,1] 中 -1 出现两次，但只能用一次作为第一个数。",
      action: "跳过与前一个相同的数：if (i > 0 && nums[i] === nums[i-1]) continue。",
    },
    {
      step: 5,
      title: "双指针找两数",
      thought: "left 从 i+1 开始，right 从末尾开始。",
      action: "sum < 0 时 left++，sum > 0 时 right--，sum === 0 时记录并跳过重复。",
    },
    {
      step: 6,
      title: "剪枝优化",
      thought: "如果最小三数和 > 0，后面不可能有解。",
      action: "提前 break 或 continue 剪枝。",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "排序数组，这是使用双指针的前提。",
      keyPoint: "排序复杂度 O(n log n)，不影响总体 O(n²)。",
    },
    {
      lineRange: [4, 7],
      explanation: "外层循环固定第一个数，跳过重复的 nums[i]。",
      keyPoint: "注意是 i > 0 时才检查，避免越界。",
    },
    {
      lineRange: [9, 15],
      explanation: "剪枝：最小和 > 0 则 break，当前最大和 < 0 则 continue。",
      keyPoint: "剪枝可以显著提升实际性能。",
    },
    {
      lineRange: [17, 19],
      explanation: "初始化双指针：left 从 i+1，right 从末尾。",
      keyPoint: "left 必须从 i+1 开始，避免重复使用同一个元素。",
    },
    {
      lineRange: [21, 30],
      explanation: "双指针移动：sum === 0 时记录并跳过重复，否则调整指针。",
      keyPoint: "找到解后，left 和 right 都要跳过重复值。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "排序 O(n log n) + 外层遍历 O(n) × 内层双指针 O(n) = O(n²)",
    spaceBreakdown: "排序需要 O(log n) 栈空间，结果数组不计入空间复杂度",
    bestCase: "O(n²)，即使数组有序也需要遍历",
    worstCase: "O(n²)",
    reasoning: "外层固定一个数，内层双指针各扫一遍，总共 n × n。",
  },

  patternComparisons: [
    {
      problemId: "two-sum",
      title: "两数之和",
      similarity: "都是找目标和，两数之和是三数之和的子问题",
      difference: "两数之和用哈希表 O(n)，三数之和用排序+双指针",
      tip: "理解两数之和是理解三数之和的基础",
    },
    {
      problemId: "container-with-most-water",
      title: "盛最多水的容器",
      similarity: "都使用双指针从两端向中间靠拢",
      difference: "本题是找特定和，那题是求最大面积",
    },
    {
      problemId: "four-sum",
      title: "四数之和",
      similarity: "同样的思路，再加一层循环",
      difference: "四数之和复杂度 O(n³)",
    },
  ],

  commonMistakes: [
    {
      type: "logic",
      description: "去重逻辑写错位置",
      wrongCode: `if (nums[i] === nums[i + 1]) continue; // 错：应该比较 i-1`,
      correctCode: `if (i > 0 && nums[i] === nums[i - 1]) continue;`,
      whyWrong: "比较 i+1 会跳过有效解，应该比较已处理过的 i-1。",
      howToAvoid: "去重是跳过「和前一个相同」的元素，不是跳过「和后一个相同」。",
    },
    {
      type: "boundary",
      description: "忘记处理找到解后的去重",
      wrongCode: `if (sum === 0) {
  result.push([nums[i], nums[left], nums[right]]);
  left++;
  right--;
}`,
      correctCode: `if (sum === 0) {
  result.push([nums[i], nums[left], nums[right]]);
  while (left < right && nums[left] === nums[left + 1]) left++;
  while (left < right && nums[right] === nums[right - 1]) right--;
  left++;
  right--;
}`,
      whyWrong: "不跳过重复会导致结果中有重复的三元组。",
      howToAvoid: "找到解后，左右指针都要跳过相同的值。",
    },
    {
      type: "edge-case",
      description: "没有考虑全是 0 的情况",
      wrongCode: `// 假设数组不会全是相同数字`,
      correctCode: `// [0,0,0] 应该返回 [[0,0,0]]
// 去重逻辑会正确处理这种情况`,
      whyWrong: "全是 0 时，去重逻辑必须正确处理。",
      howToAvoid: "用 [0,0,0] 测试你的代码。",
    },
  ],

  interviewTips: [
    "先说清楚降维思路：三数之和 = 固定一个 + 两数之和",
    "主动提到去重的两个位置：外层循环和找到解后",
    "提到剪枝优化，展示你考虑性能的习惯",
    "可以问面试官：是否需要处理重复？结果顺序是否重要？",
  ],

  frontendApplications: [
    "表单多字段联动验证（如三个输入的总和必须为 0）",
    "预算分配系统（三个部门预算调整，总变化为 0）",
    "游戏中平衡性检测（三种属性的加成和为 0）",
  ],
};

export const threeSumGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "暴力解法的复杂度是多少？为什么需要优化？",
      hint: "三重循环遍历所有组合。",
      answer: "暴力需要 O(n³)，当 n=3000 时约 27 亿次操作，会超时。",
      insight: "面试时先分析暴力解法，再说明为什么需要优化。",
    },
    {
      stage: "plan",
      question: "如何把「三数之和」问题降维？",
      hint: "如果固定一个数，问题变成什么？",
      answer: "固定 nums[i] 后，问题变成在剩余数组中找两数之和等于 -nums[i]。",
      insight: "降维是解决复杂问题的通用技巧。",
    },
    {
      stage: "plan",
      question: "为什么需要先排序？",
      hint: "排序对双指针有什么帮助？对去重呢？",
      answer: "排序后可以用双指针 O(n) 找两数之和；排序也让相同的数相邻，方便去重。",
      insight: "排序是很多双指针问题的前置步骤。",
    },
    {
      stage: "code",
      question: "如何避免重复的三元组？",
      hint: "重复来自哪里？如何跳过？",
      answer: "两个位置去重：1) 外层循环跳过相同的 nums[i]；2) 找到解后跳过相同的 left 和 right。",
      insight: "去重是本题最容易出错的地方。",
    },
    {
      stage: "code",
      question: "去重时为什么是 nums[i] === nums[i-1] 而不是 nums[i] === nums[i+1]？",
      hint: "如果是 [−1,−1,0,1]，哪种写法会漏解？",
      answer: "比较 i+1 会跳过第一个 -1，导致漏掉 [-1,-1,2]。应该比较 i-1，跳过的是第二个 -1。",
      insight: "去重是跳过「已处理过的重复」，不是「将要处理的重复」。",
    },
    {
      stage: "optimize",
      question: "有哪些剪枝可以提升性能？",
      hint: "什么情况下可以提前终止？",
      answer: "1) 最小三数和 > 0 时 break；2) 当前数与最大两数和 < 0 时 continue。",
      insight: "剪枝不影响复杂度，但能显著提升实际性能。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "核心思路：排序 + 固定一个数 + 双指针找另外两数。",
    },
    {
      level: 2,
      content: "去重：外层跳过相同的 nums[i]，内层找到解后跳过相同的 left 和 right。",
      codeFragment: `if (i > 0 && nums[i] === nums[i - 1]) continue;
// ...
while (left < right && nums[left] === nums[left + 1]) left++;
while (left < right && nums[right] === nums[right - 1]) right--;`,
    },
    {
      level: 3,
      content: "完整框架：排序 → 遍历固定 i → 双指针找 left/right → 去重。",
      codeFragment: `nums.sort((a, b) => a - b);
for (let i = 0; i < n - 2; i++) {
  if (i > 0 && nums[i] === nums[i - 1]) continue;
  let left = i + 1, right = n - 1;
  while (left < right) {
    const sum = nums[i] + nums[left] + nums[right];
    if (sum === 0) {
      result.push([nums[i], nums[left], nums[right]]);
      while (left < right && nums[left] === nums[left + 1]) left++;
      while (left < right && nums[right] === nums[right - 1]) right--;
      left++; right--;
    } else if (sum < 0) left++;
    else right--;
  }
}`,
    },
  ],

  checkpoints: [
    {
      question: "三数之和的时间复杂度是多少？",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(n³)"],
      correctAnswer: 2,
      explanation: "排序 O(n log n) + 外层 O(n) × 内层双指针 O(n) = O(n²)。",
    },
    {
      question: "如果输入是 [-1,-1,0,1,2]，正确的去重应该让哪个 -1 被跳过？",
      options: [
        "第一个 -1",
        "第二个 -1",
        "两个都跳过",
        "两个都不跳过",
      ],
      correctAnswer: 1,
      explanation: "第一个 -1 正常处理，第二个 -1 和前一个相同，被跳过。",
    },
    {
      question: "为什么找到解后 left 和 right 都要移动？",
      options: [
        "避免死循环",
        "提高性能",
        "因为同样的 left/right 值不会再产生新解",
        "以上都对",
      ],
      correctAnswer: 3,
      explanation: "都对：避免死循环、提高性能、且同样的值不会再有新解。",
    },
  ],
};

// ==================== minimum-window-substring 深度讲解 ====================
export const minimumWindowSubstringDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "需要找包含 t 所有字符的最短子串，暴力枚举所有子串是 O(n²)。",
    patternMatch: "这是「滑动窗口」的经典应用：右指针扩展找可行解，左指针收缩优化解。",
    whyItWorks: "用两个哈希表：need 记录 t 的需求，window 记录当前窗口。当 window 满足 need 时收缩。",
    metaphor: "想象你在超市购物，购物车(window)要凑齐清单(need)上的所有商品。你先往前走把东西都放进车里，然后回头看能不能把多余的东西放回去，找到最小的购物车。",
  },

  thinkingProcess: [
    {
      step: 1,
      title: "定义窗口状态",
      thought: "需要知道窗口是否满足条件，用两个 Map 跟踪。",
      action: "need 存 t 中每个字符的需求量，window 存当前窗口的字符量。",
    },
    {
      step: 2,
      title: "定义「满足条件」",
      thought: "每个需要的字符数量都达标才算满足。",
      action: "用 valid 计数：当 window[c] === need[c] 时 valid++。",
    },
    {
      step: 3,
      title: "扩展窗口（右指针）",
      thought: "不断扩展直到满足条件。",
      action: "right++，如果 s[right] 在 need 中，更新 window 和 valid。",
    },
    {
      step: 4,
      title: "收缩窗口（左指针）",
      thought: "满足条件时尝试收缩，寻找更短的解。",
      action: "while (valid === need.size)：更新答案，left++。",
    },
    {
      step: 5,
      title: "更新答案的时机",
      thought: "求最短，所以在收缩的 while 循环内更新。",
      action: "每次满足条件时比较并记录最小长度。",
    },
    {
      step: 6,
      title: "处理收缩后的状态",
      thought: "左指针移动后可能破坏条件。",
      action: "如果移走的字符在 need 中且 window[c] < need[c]，valid--。",
    },
  ],

  codeWalkthrough: [
    {
      lineRange: [1, 5],
      explanation: "初始化 need Map，统计 t 中每个字符的出现次数。",
      keyPoint: "need.size 是需要满足的不同字符数，不是 t.length。",
    },
    {
      lineRange: [7, 10],
      explanation: "初始化窗口状态：window Map、left 指针、valid 计数、结果变量。",
      keyPoint: "valid 表示满足条件的字符种类数。",
    },
    {
      lineRange: [12, 18],
      explanation: "扩展窗口：如果字符在 need 中，加入 window。当该字符数量达标时 valid++。",
      keyPoint: "只有 window[c] === need[c] 时才 valid++，多了不再加。",
    },
    {
      lineRange: [20, 28],
      explanation: "收缩窗口：当 valid === need.size 时满足条件，更新最小长度，然后左指针右移。",
      keyPoint: "在 while 内更新答案是因为求最短。",
    },
    {
      lineRange: [30, 35],
      explanation: "移除左边字符后更新状态，如果该字符变得不够了，valid--。",
      keyPoint: "只有从刚好满足变成不满足时才 valid--。",
    },
  ],

  complexityAnalysis: {
    timeBreakdown: "left 和 right 各最多移动 n 次，每次操作 O(1)，总共 O(n)",
    spaceBreakdown: "两个 Map 最多存储字符集大小（52 个字母），O(1) 或 O(字符集)",
    bestCase: "O(n)，需要遍历整个字符串",
    worstCase: "O(n)",
    reasoning: "双指针各自单向移动，不会回退，每个字符最多被访问两次。",
  },

  patternComparisons: [
    {
      problemId: "longest-substring-without-repeating-characters",
      title: "无重复字符的最长子串",
      similarity: "都是滑动窗口，都用哈希表维护状态",
      difference: "那题求最长（不满足时收缩），本题求最短（满足时收缩）",
      tip: "求最长在 for 循环内更新答案，求最短在 while 循环内更新",
    },
    {
      problemId: "find-all-anagrams-in-a-string",
      title: "找到字符串中所有字母异位词",
      similarity: "都要匹配字符频率",
      difference: "那题是固定窗口大小，本题是可变窗口求最短",
    },
  ],

  commonMistakes: [
    {
      type: "logic",
      description: "valid 计数时机错误",
      wrongCode: `if (need.has(c)) {
  window.set(c, (window.get(c) || 0) + 1);
  valid++; // 错：每次都加
}`,
      correctCode: `if (need.has(c)) {
  window.set(c, (window.get(c) || 0) + 1);
  if (window.get(c) === need.get(c)) {
    valid++; // 对：只有刚好满足时才加
  }
}`,
      whyWrong: "valid 表示满足条件的字符种类数，只有刚好达标时才加 1。",
      howToAvoid: "valid++ 的条件是 window[c] === need[c]，不是 window[c] >= need[c]。",
    },
    {
      type: "logic",
      description: "收缩条件写反",
      wrongCode: `while (valid < need.size) { // 错：应该是 ===
  // 收缩
}`,
      correctCode: `while (valid === need.size) {
  // 满足条件时收缩
}`,
      whyWrong: "求最短要在满足条件时收缩，求最长要在不满足条件时收缩。",
      howToAvoid: "明确目标：求最短 → 满足时收缩；求最长 → 不满足时收缩。",
    },
    {
      type: "boundary",
      description: "忘记处理无解情况",
      wrongCode: `return s.substring(start, start + minLen);`,
      correctCode: `return minLen === Infinity ? "" : s.substring(start, start + minLen);`,
      whyWrong: "如果没有找到覆盖子串，minLen 仍是 Infinity。",
      howToAvoid: "检查 minLen 是否更新过。",
    },
  ],

  interviewTips: [
    "先说清楚滑动窗口模板：右扩展左收缩",
    "解释 valid 变量的含义：满足条件的字符种类数",
    "强调求最短时在 while 内更新答案，求最长时在 for 内更新",
    "可以画图演示窗口滑动过程",
  ],

  frontendApplications: [
    "搜索高亮：找到包含所有搜索关键词的最短文本片段",
    "日志分析：找到包含所有错误类型的最短时间段",
    "权限检查：找到满足所有权限要求的最小角色集合",
  ],
};

export const minimumWindowSubstringGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "「覆盖」是什么意思？需要顺序一致吗？",
      hint: "t = \"ABC\"，子串必须是 \"ABC\" 还是只要包含 A、B、C？",
      answer: "覆盖只要包含所有字符即可，不要求顺序。\"BANC\" 覆盖 \"ABC\"。",
      insight: "理解题意是第一步，覆盖 ≠ 子序列 ≠ 子串匹配。",
    },
    {
      stage: "plan",
      question: "如何判断窗口是否覆盖了 t？",
      hint: "t 中可能有重复字符，比如 t = \"AABC\"。",
      answer: "用两个哈希表：need 记录 t 的需求，window 记录当前窗口。比较每个字符的数量。",
      insight: "哈希表是统计频率的利器。",
    },
    {
      stage: "plan",
      question: "如何高效地判断「所有字符都满足」？",
      hint: "每次都遍历两个 Map 比较吗？",
      answer: "用 valid 计数：每个字符刚好满足时 valid++。当 valid === need.size 时整体满足。",
      insight: "用计数变量避免重复遍历。",
    },
    {
      stage: "code",
      question: "什么时候扩展窗口？什么时候收缩？",
      hint: "目标是找最短的满足窗口。",
      answer: "不满足时扩展（right++），满足时收缩（left++）并更新答案。",
      insight: "求最短 → 满足时收缩；求最长 → 不满足时收缩。",
    },
    {
      stage: "code",
      question: "为什么 valid++ 的条件是 window[c] === need[c] 而不是 >=？",
      hint: "如果 need['A'] = 2，window['A'] 从 2 变成 3 时要 valid++ 吗？",
      answer: "valid 表示满足条件的字符种类数。从 1→2 是「刚满足」要++，从 2→3 已经满足了不用加。",
      insight: "valid 计数的是「种类」，不是「个数」。",
    },
    {
      stage: "optimize",
      question: "时间复杂度是多少？每个字符被访问几次？",
      hint: "left 和 right 各自怎么移动？",
      answer: "O(n)。每个字符最多被 right 访问一次、被 left 访问一次，共 2n 次。",
      insight: "双指针不回退，所以是线性时间。",
    },
  ],

  progressiveReveal: [
    {
      level: 1,
      content: "滑动窗口模板：右扩展找可行解，左收缩优化解。",
    },
    {
      level: 2,
      content: "用 valid 计数满足条件的字符种类，避免每次遍历 Map。",
      codeFragment: `let valid = 0;
// 当 window[c] === need[c] 时 valid++
// 当 valid === need.size 时窗口满足条件`,
    },
    {
      level: 3,
      content: "完整框架：扩展 → 判断 → 收缩 → 更新答案。",
      codeFragment: `for (let right = 0; right < s.length; right++) {
  // 1. 扩展窗口
  if (need.has(s[right])) {
    window.set(s[right], ...);
    if (window.get(s[right]) === need.get(s[right])) valid++;
  }
  // 2. 收缩窗口
  while (valid === need.size) {
    // 更新最小长度
    if (right - left + 1 < minLen) { ... }
    // 移除左边字符
    if (need.has(s[left])) {
      if (window.get(s[left]) === need.get(s[left])) valid--;
      window.set(s[left], ...);
    }
    left++;
  }
}`,
    },
  ],

  checkpoints: [
    {
      question: "valid 变量表示什么？",
      options: [
        "窗口中的字符总数",
        "满足条件的字符种类数",
        "t 的长度",
        "窗口的大小",
      ],
      correctAnswer: 1,
      explanation: "valid 表示窗口中满足 need 条件的字符种类数，当 valid === need.size 时完全覆盖。",
    },
    {
      question: "求最短子串时，在哪里更新答案？",
      options: [
        "for 循环内",
        "while 收缩循环内",
        "while 循环后",
        "两处都可以",
      ],
      correctAnswer: 1,
      explanation: "求最短要在满足条件时不断收缩并更新答案，所以在 while 循环内更新。",
    },
    {
      question: "s = \"ADOBECODEBANC\", t = \"ABC\"，最小覆盖子串是？",
      options: ["ABC", "ADOBEC", "BANC", "CODEBANC"],
      correctAnswer: 2,
      explanation: "\"BANC\" 包含 A、B、C 且长度最短（4）。",
    },
  ],
};

// ==================== #5 反转链表 (reverse-linked-list) ====================
const reverseLinkedListDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "链表节点通过 next 指针串联，反转就是改变每个节点的指向方向",
    patternMatch: "迭代遍历 + 指针操作模式：用三个指针（prev、curr、next）完成原地反转",
    whyItWorks: "在遍历过程中，先保存下一个节点，再将当前节点指向前一个节点，最后移动指针继续处理，每个节点只需处理一次",
    metaphor: "就像把一列火车车厢一个个掉头重新连接：断开当前车厢与后面的连接，转向与前面车厢相连",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "理解问题本质",
      thought: "链表由节点组成，每个节点有 val 和 next。反转就是让每个节点的 next 指向它前面的节点，而不是后面的。",
      action: "画出链表 1->2->3->null，目标是变成 null<-1<-2<-3，即 3->2->1->null。",
    },
    {
      step: 2,
      title: "分析需要维护的指针",
      thought: "在反转过程中，我们需要：1) 当前节点 curr；2) 前一个节点 prev（用来让 curr.next 指向）；3) 下一个节点 next（因为改变 curr.next 后会丢失原来的下一个节点）",
      action: "初始化 prev = null（因为新链表的尾部指向 null），curr = head",
    },
    {
      step: 3,
      title: "设计迭代步骤",
      thought: "每一步需要：1) 先保存 next；2) 反转当前节点指向；3) 移动 prev 和 curr",
      action: "循环：next = curr.next; curr.next = prev; prev = curr; curr = next;",
      codeSnippet: "while (curr) {\n  const next = curr.next;\n  curr.next = prev;\n  prev = curr;\n  curr = next;\n}",
    },
    {
      step: 4,
      title: "确定返回值",
      thought: "循环结束时 curr 为 null，prev 指向原链表的最后一个节点，也就是新链表的头",
      action: "返回 prev",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 1], explanation: "prev 初始化为 null，因为反转后原来的 head 变成尾节点，指向 null" },
    { lineRange: [2, 2], explanation: "curr 从头节点开始遍历" },
    { lineRange: [3, 3], explanation: "遍历直到 curr 为 null（链表末尾）" },
    { lineRange: [4, 4], explanation: "先保存下一个节点，否则改变 curr.next 后就找不到了", keyPoint: "必须先保存 next" },
    { lineRange: [5, 5], explanation: "核心操作：反转指针，让当前节点指向前一个节点", keyPoint: "反转指针" },
    { lineRange: [6, 7], explanation: "prev 和 curr 各前进一步，准备处理下一个节点" },
    { lineRange: [9, 9], explanation: "prev 现在指向原链表的最后一个节点，即新链表的头", keyPoint: "返回 prev" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n)：遍历链表一次，每个节点只访问一次",
    spaceBreakdown: "O(1)：只使用了固定的几个指针变量（prev、curr、next），不需要额外空间",
    reasoning: "迭代解法在原地修改指针，不需要创建新节点或使用递归栈",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "忘记保存 next 导致链表断裂",
      wrongCode: "curr.next = prev;\ncurr = curr.next; // 错误！curr.next 已经是 prev 了",
      correctCode: "const next = curr.next;\ncurr.next = prev;\ncurr = next;",
      whyWrong: "修改 curr.next 后，原来的下一个节点的引用就丢失了",
      howToAvoid: "在修改任何指针之前，先保存需要的引用",
    },
    {
      type: "logic",
      description: "返回 curr 而不是 prev",
      wrongCode: "return curr; // curr 此时为 null",
      correctCode: "return prev; // prev 是新链表的头",
      whyWrong: "循环条件是 while(curr)，结束时 curr 必然为 null",
      howToAvoid: "画图模拟最后几步，理解循环结束时各指针的状态",
    },
  ],
  interviewTips: [
    "面试官可能要求同时写出迭代和递归两种解法",
    "递归解法更优雅但空间复杂度是 O(n)，可能追问两者区别",
    "可能追问：反转链表的前 N 个节点、反转 [m, n] 区间的节点",
  ],
  frontendApplications: [
    "撤销/重做功能的实现（操作历史链表的反转遍历）",
    "浏览器历史记录的前进/后退导航",
    "动画序列的反向播放",
    "面包屑导航的数据结构操作",
  ],
};

const reverseLinkedListGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "链表中每个节点有哪些属性？反转意味着什么？",
      hint: "想想节点的 next 指针原来指向哪里，反转后应该指向哪里",
      answer: "每个节点有 val 和 next。反转意味着每个节点的 next 从指向后一个节点变成指向前一个节点。",
      insight: "理解反转的本质是指针方向的改变，而不是节点位置的交换",
    },
    {
      stage: "plan",
      question: "在修改一个节点的 next 指向前一个节点后，我们还能找到原来的下一个节点吗？",
      hint: "想想 curr.next = prev 执行后会发生什么",
      answer: "不能，因为 curr.next 已经被修改了。所以需要提前保存原来的 next。",
      insight: "这就是为什么需要三个指针：prev、curr、next",
    },
    {
      stage: "code",
      question: "遍历结束后，curr 和 prev 分别指向什么？应该返回哪个？",
      hint: "画图模拟最后几步",
      answer: "curr 指向 null（循环条件不满足），prev 指向原链表的最后一个节点（新链表的头）。返回 prev。",
      insight: "理解循环结束条件和各指针的最终状态",
    },
    {
      stage: "optimize",
      question: "如何用递归实现？递归和迭代的空间复杂度有什么区别？",
      hint: "递归调用会占用栈空间",
      answer: "递归：先递归到最后，返回时反转指针。迭代 O(1) 空间，递归 O(n) 栈空间。",
      insight: "面试时可能被要求两种解法，理解各自优缺点",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化两个指针：prev = null，curr = head",
    },
    {
      level: 2,
      content: "循环中先保存 next = curr.next",
    },
    {
      level: 3,
      content: "反转指针：curr.next = prev",
      codeFragment: "const next = curr.next;\ncurr.next = prev;",
    },
    {
      level: 4,
      content: "移动指针：prev = curr; curr = next",
      codeFragment: "prev = curr;\ncurr = next;",
    },
    {
      level: 5,
      content: "完整迭代解法",
      codeFragment: "function reverseList(head: ListNode | null): ListNode | null {\n  let prev: ListNode | null = null;\n  let curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}",
    },
  ],
  checkpoints: [
    {
      question: "为什么 prev 初始化为 null？",
      options: ["因为 prev 还没有值", "因为反转后原头节点的 next 应该是 null", "随便初始化都可以", "因为链表可能为空"],
      correctAnswer: 1,
      explanation: "反转后，原来的头节点变成尾节点，它的 next 应该指向 null。",
    },
    {
      question: "在一次循环迭代中，操作的正确顺序是？",
      options: [
        "保存next -> 反转指针 -> 移动prev -> 移动curr",
        "反转指针 -> 保存next -> 移动prev -> 移动curr",
        "移动curr -> 反转指针 -> 保存next -> 移动prev",
        "移动prev -> 移动curr -> 反转指针 -> 保存next"
      ],
      correctAnswer: 0,
      explanation: "必须先保存 next，否则反转指针后就找不到下一个节点了。",
    },
    {
      question: "链表 1->2->3->null 反转后，返回的新头节点的值是？",
      options: ["1", "2", "3", "null"],
      correctAnswer: 2,
      explanation: "反转后变成 3->2->1->null，所以新头节点的值是 3。",
    },
  ],
};

// ==================== #6 二叉树的层序遍历 (binary-tree-level-order-traversal) ====================
const binaryTreeLevelOrderDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "层序遍历要求按层输出节点，每一层从左到右，需要知道每一层的边界",
    patternMatch: "BFS（广度优先搜索）模式：使用队列按层处理节点，每次处理完一整层再进入下一层",
    whyItWorks: "队列的 FIFO 特性保证了同一层的节点会连续出队，通过记录当前层的节点数量来分隔不同层",
    metaphor: "就像公司组织架构图：先处理所有总监，再处理所有经理，最后处理所有员工，每层从左到右依次点名",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "理解层序遍历的要求",
      thought: "要按层输出，每层一个数组，所以需要知道每层有哪些节点",
      action: "画出示例树，标记每层的节点：第1层[3], 第2层[9,20], 第3层[15,7]",
    },
    {
      step: 2,
      title: "选择合适的数据结构",
      thought: "需要先进先出的特性来保证同层节点的顺序，队列是最佳选择",
      action: "使用队列存储待处理的节点",
    },
    {
      step: 3,
      title: "设计分层处理逻辑",
      thought: "关键问题：如何知道当前层结束了？答案：在处理每层前记录队列长度",
      action: "外层循环处理层，内层循环处理当前层的所有节点",
      codeSnippet: "while (queue.length > 0) {\n  const levelSize = queue.length; // 当前层节点数\n  const level = [];\n  for (let i = 0; i < levelSize; i++) {\n    const node = queue.shift();\n    level.push(node.val);\n    // 将子节点加入队列\n  }\n  result.push(level);\n}",
    },
    {
      step: 4,
      title: "处理子节点入队",
      thought: "每个节点出队时，将其非空子节点加入队列，它们属于下一层",
      action: "if (node.left) queue.push(node.left); if (node.right) queue.push(node.right);",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 1], explanation: "处理空树边界情况" },
    { lineRange: [2, 2], explanation: "初始化结果数组" },
    { lineRange: [3, 3], explanation: "初始化队列，将根节点入队", keyPoint: "队列初始化" },
    { lineRange: [4, 4], explanation: "只要队列不空，说明还有节点未处理" },
    { lineRange: [5, 5], explanation: "记录当前层的节点数量，这是分层的关键", keyPoint: "分层关键" },
    { lineRange: [6, 6], explanation: "初始化当前层的结果数组" },
    { lineRange: [7, 10], explanation: "处理当前层的所有节点：出队、记录值、子节点入队" },
    { lineRange: [11, 11], explanation: "当前层处理完毕，加入结果数组" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n)：每个节点入队一次出队一次，共 2n 次操作",
    spaceBreakdown: "O(n)：最坏情况下（完全二叉树最后一层），队列中最多存储 n/2 个节点",
    worstCase: "完全二叉树：最后一层有 n/2 个节点同时在队列中",
    bestCase: "斜树：每层只有一个节点，队列最多存储 1 个节点",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "没有在循环开始时记录层大小，导致边界混乱",
      wrongCode: "while (queue.length > 0) {\n  const node = queue.shift();\n  // 无法知道当前层何时结束\n}",
      correctCode: "while (queue.length > 0) {\n  const levelSize = queue.length;\n  for (let i = 0; i < levelSize; i++) {\n    const node = queue.shift();\n  }\n}",
      whyWrong: "在循环中子节点会不断入队，queue.length 会动态变化",
      howToAvoid: "在处理每层之前，先用变量保存当前层的节点数",
    },
    {
      type: "edge-case",
      description: "忘记处理空树情况",
      wrongCode: "const queue = [root];\n// root 为 null 时会出错",
      correctCode: "if (!root) return [];\nconst queue = [root];",
      whyWrong: "空树时 root 为 null，后续操作会报错",
      howToAvoid: "在函数开头检查 root 是否为 null",
    },
  ],
  interviewTips: [
    "掌握 BFS 模板后，可以扩展到：锯齿形层序遍历、按层求和、找每层最大值等",
    "可能被问到如何用 DFS 实现层序遍历（需要额外传递层数参数）",
    "空间优化：如果只需要判断某层是否存在特定节点，不需要存储整层结果",
  ],
  frontendApplications: [
    "虚拟 DOM 树的层级 diff 比较",
    "组件树的层级渲染和批量更新",
    "文件目录树的层级展示",
    "组织架构图的层级布局算法",
  ],
};

const binaryTreeLevelOrderGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "层序遍历和前/中/后序遍历有什么区别？为什么需要不同的实现方式？",
      hint: "想想这几种遍历的顺序特点",
      answer: "前/中/后序是深度优先（DFS），层序是广度优先（BFS）。DFS 用递归/栈，BFS 用队列。",
      insight: "树的遍历本质上分为 DFS 和 BFS 两大类，选择合适的数据结构是关键",
    },
    {
      stage: "plan",
      question: "使用队列处理时，如何知道一层的节点处理完了，该进入下一层了？",
      hint: "入队和出队是交错进行的，需要一种方式来标记层的边界",
      answer: "在开始处理每层之前，先记录队列当前长度，这就是当前层的节点数。",
      insight: "记录层大小是 BFS 分层遍历的核心技巧",
    },
    {
      stage: "code",
      question: "为什么要用 for 循环而不是直接用 while 循环处理队列？",
      hint: "在处理节点时，子节点会被加入队列",
      answer: "for 循环次数固定（当前层节点数），不受新入队节点影响；while 循环的条件会动态变化。",
      insight: "用固定次数的循环隔离当前层，是 BFS 分层的标准模式",
    },
    {
      stage: "optimize",
      question: "如果题目要求锯齿形层序遍历（奇数层从左到右，偶数层从右到左）怎么改？",
      hint: "哪些层需要反转？",
      answer: "只需在偶数层（或奇数层，取决于定义）将 level 数组反转后再加入结果，或者使用双端队列。",
      insight: "掌握基础 BFS 模板后，变体题只需小改动",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "使用队列存储节点，根节点先入队",
    },
    {
      level: 2,
      content: "外层 while 循环：队列不空时继续处理",
    },
    {
      level: 3,
      content: "每层开始时记录 levelSize = queue.length",
      codeFragment: "const levelSize = queue.length;",
    },
    {
      level: 4,
      content: "内层 for 循环处理当前层所有节点",
      codeFragment: "for (let i = 0; i < levelSize; i++) {\n  const node = queue.shift();\n  level.push(node.val);\n  if (node.left) queue.push(node.left);\n  if (node.right) queue.push(node.right);\n}",
    },
    {
      level: 5,
      content: "完整 BFS 层序遍历解法",
      codeFragment: "function levelOrder(root: TreeNode | null): number[][] {\n  if (!root) return [];\n  const result: number[][] = [];\n  const queue: TreeNode[] = [root];\n  while (queue.length > 0) {\n    const levelSize = queue.length;\n    const level: number[] = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift()!;\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}",
    },
  ],
  checkpoints: [
    {
      question: "BFS 层序遍历使用什么数据结构？",
      options: ["栈 Stack", "队列 Queue", "堆 Heap", "哈希表 HashMap"],
      correctAnswer: 1,
      explanation: "队列的 FIFO 特性保证了同层节点按从左到右的顺序处理。",
    },
    {
      question: "如何知道当前层处理完毕了？",
      options: [
        "队列为空时",
        "在开始处理前记录队列长度",
        "使用特殊标记节点",
        "计数处理的节点数"
      ],
      correctAnswer: 1,
      explanation: "在处理每层之前记录队列长度，这个长度就是当前层的节点数。",
    },
    {
      question: "对于有 n 个节点的树，层序遍历的时间复杂度是？",
      options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
      correctAnswer: 1,
      explanation: "每个节点入队一次出队一次，共 O(n) 次操作。",
    },
  ],
};

// ==================== #7 爬楼梯 (climbing-stairs) ====================
const climbingStairsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "到达第 n 阶只能从第 n-1 阶（跨1步）或第 n-2 阶（跨2步）到达，问题有重叠子问题结构",
    patternMatch: "动态规划入门模式：状态转移公式 dp[n] = dp[n-1] + dp[n-2]，与斐波那契数列本质相同",
    whyItWorks: "到达每一阶的方法数等于能到达它的前两阶方法数之和，因为每次只能走1或2步",
    metaphor: "就像计算到达某个地铁站的路线数：从倒数第一站走一站到这里，或从倒数第二站走两站到这里，路线总数就是这两站路线数之和",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析问题结构",
      thought: "每次可以爬1或2个台阶。到达第n阶，最后一步要么从n-1来，要么从n-2来",
      action: "写出递推关系：f(n) = f(n-1) + f(n-2)",
    },
    {
      step: 2,
      title: "确定边界条件",
      thought: "递推需要起点。第1阶只有1种方法，第2阶有2种方法（1+1 或 2）",
      action: "dp[1] = 1, dp[2] = 2",
    },
    {
      step: 3,
      title: "选择实现方式",
      thought: "可以用数组存所有状态，也可以只用两个变量（因为只依赖前两个状态）",
      action: "空间优化：用 prev2, prev1 两个变量滚动计算",
      codeSnippet: "let prev2 = 1, prev1 = 2;\nfor (let i = 3; i <= n; i++) {\n  const curr = prev1 + prev2;\n  prev2 = prev1;\n  prev1 = curr;\n}",
    },
    {
      step: 4,
      title: "处理特殊情况",
      thought: "n=1时直接返回1，n=2时直接返回2，n>=3时才需要循环",
      action: "在循环开始前处理边界情况",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 1], explanation: "处理 n=1 的边界情况" },
    { lineRange: [2, 2], explanation: "处理 n=2 的边界情况" },
    { lineRange: [3, 3], explanation: "初始化前两阶的方法数", keyPoint: "边界条件" },
    { lineRange: [4, 4], explanation: "从第3阶开始计算，直到第n阶" },
    { lineRange: [5, 5], explanation: "当前阶方法数 = 前一阶 + 前两阶", keyPoint: "状态转移" },
    { lineRange: [6, 7], explanation: "滚动变量：prev2 变成 prev1，prev1 变成 curr" },
    { lineRange: [9, 9], explanation: "返回到达第n阶的方法数" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n)：从3到n循环一次，每次常数时间操作",
    spaceBreakdown: "O(1)：只使用了两个变量存储中间状态，没有使用数组",
    reasoning: "空间优化后只保留最近两个状态，因为计算当前状态只需要前两个状态",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "边界条件错误：dp[0] 和 dp[1] 的值",
      wrongCode: "dp[0] = 0; dp[1] = 1; // 会导致 dp[2] = 1，错误",
      correctCode: "dp[1] = 1; dp[2] = 2; // 或 dp[0] = 1; dp[1] = 1;",
      whyWrong: "dp 数组索引含义不清晰，导致边界值错误",
      howToAvoid: "明确定义 dp[i] 表示到达第i阶的方法数，然后推导边界值",
    },
    {
      type: "logic",
      description: "使用递归但没有记忆化，导致超时",
      wrongCode: "function climb(n) {\n  if (n <= 2) return n;\n  return climb(n-1) + climb(n-2);\n}",
      correctCode: "使用 dp 数组或带记忆化的递归",
      whyWrong: "朴素递归时间复杂度是 O(2^n)，存在大量重复计算",
      howToAvoid: "识别重叠子问题后，用 DP 或记忆化消除重复计算",
    },
  ],
  interviewTips: [
    "这是 DP 入门必刷题，面试官期望你能快速识别并写出解法",
    "可能追问空间优化：从 O(n) 数组优化到 O(1) 两个变量",
    "变体：每次可以爬1-k步、不能连续爬2步、最小花费爬楼梯等",
  ],
  frontendApplications: [
    "分页器：从第1页到第n页的所有可能路径",
    "步骤表单：用户可以跳过某些步骤时的路径计算",
    "动画帧序列：计算从起始帧到目标帧的过渡方式",
  ],
};

const climbingStairsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "到达第10阶楼梯，最后一步有哪些可能？这告诉我们什么？",
      hint: "每次只能爬1或2个台阶",
      answer: "只能从第9阶爬1步，或从第8阶爬2步到达。说明 f(10) = f(9) + f(8)。",
      insight: "这就是状态转移方程的来源：当前状态由前面的状态决定",
    },
    {
      stage: "plan",
      question: "这个递推关系像哪个经典数学问题？",
      hint: "每项等于前两项之和",
      answer: "斐波那契数列！f(n) = f(n-1) + f(n-2)，只是边界条件不同。",
      insight: "很多 DP 问题本质上是斐波那契的变形，识别这个模式可以快速解题",
    },
    {
      stage: "code",
      question: "如果用数组 dp[] 存储，dp[1] 和 dp[2] 应该是多少？",
      hint: "dp[i] 表示到达第i阶的方法数",
      answer: "dp[1] = 1（只有爬1步这一种）；dp[2] = 2（1+1 或 2）",
      insight: "正确的边界条件是 DP 的基础，要根据问题定义仔细推导",
    },
    {
      stage: "optimize",
      question: "计算 dp[i] 只需要哪些之前的值？能否优化空间复杂度？",
      hint: "观察状态转移方程中用到了哪些项",
      answer: "只需要 dp[i-1] 和 dp[i-2]，可以用两个变量滚动计算，O(1) 空间。",
      insight: "当 DP 只依赖有限个前置状态时，都可以用滚动变量优化空间",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "状态转移方程：f(n) = f(n-1) + f(n-2)",
    },
    {
      level: 2,
      content: "边界条件：f(1) = 1, f(2) = 2",
    },
    {
      level: 3,
      content: "使用两个变量滚动计算，从第3阶开始",
      codeFragment: "let prev2 = 1, prev1 = 2;",
    },
    {
      level: 4,
      content: "循环计算并滚动更新变量",
      codeFragment: "for (let i = 3; i <= n; i++) {\n  const curr = prev1 + prev2;\n  prev2 = prev1;\n  prev1 = curr;\n}",
    },
    {
      level: 5,
      content: "完整 O(1) 空间解法",
      codeFragment: "function climbStairs(n: number): number {\n  if (n <= 2) return n;\n  let prev2 = 1, prev1 = 2;\n  for (let i = 3; i <= n; i++) {\n    const curr = prev1 + prev2;\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}",
    },
  ],
  checkpoints: [
    {
      question: "爬楼梯问题的状态转移方程是？",
      options: [
        "dp[i] = dp[i-1] * dp[i-2]",
        "dp[i] = dp[i-1] + dp[i-2]",
        "dp[i] = max(dp[i-1], dp[i-2])",
        "dp[i] = dp[i-1] - dp[i-2]"
      ],
      correctAnswer: 1,
      explanation: "到第i阶可以从第i-1阶（1步）或第i-2阶（2步）来，方法数相加。",
    },
    {
      question: "n=3时，有多少种不同的方法爬到楼顶？",
      options: ["1", "2", "3", "4"],
      correctAnswer: 2,
      explanation: "三种方法：1+1+1, 1+2, 2+1。dp[3] = dp[2] + dp[1] = 2 + 1 = 3。",
    },
    {
      question: "空间优化后的时间和空间复杂度是？",
      options: ["O(n), O(n)", "O(n), O(1)", "O(1), O(1)", "O(2^n), O(n)"],
      correctAnswer: 1,
      explanation: "时间仍需 O(n) 遍历，但空间优化到 O(1)，只用两个变量。",
    },
  ],
};

// ==================== #8 二分查找 (binary-search) ====================
const binarySearchDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "有序数组中查找目标值，每次比较可以排除一半的元素",
    patternMatch: "二分查找模式：维护 [left, right] 搜索区间，每次取中间值比较，根据结果缩小一半区间",
    whyItWorks: "有序性保证了：如果 nums[mid] < target，则目标只可能在右半边；反之在左半边。每次排除一半，效率极高",
    metaphor: "就像翻字典找单词：打开中间页，比较目标单词应该在前面还是后面，然后只在对应半本中继续找",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "确定搜索区间和循环条件",
      thought: "使用闭区间 [left, right]，当 left <= right 时区间有效，继续搜索",
      action: "初始化 left = 0, right = nums.length - 1",
    },
    {
      step: 2,
      title: "计算中间位置",
      thought: "mid = (left + right) / 2，但 left + right 可能溢出（在某些语言中）",
      action: "使用 mid = left + Math.floor((right - left) / 2) 避免溢出",
    },
    {
      step: 3,
      title: "比较并缩小区间",
      thought: "三种情况：等于则返回；小于则在右边找；大于则在左边找",
      action: "if (nums[mid] === target) return mid; else if (nums[mid] < target) left = mid + 1; else right = mid - 1;",
      codeSnippet: "if (nums[mid] === target) {\n  return mid;\n} else if (nums[mid] < target) {\n  left = mid + 1;\n} else {\n  right = mid - 1;\n}",
    },
    {
      step: 4,
      title: "处理未找到情况",
      thought: "循环结束时 left > right，说明区间为空，目标不存在",
      action: "return -1",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 1], explanation: "初始化左边界为数组起始位置" },
    { lineRange: [2, 2], explanation: "初始化右边界为数组末尾位置", keyPoint: "闭区间初始化" },
    { lineRange: [3, 3], explanation: "当搜索区间有效时继续循环", keyPoint: "循环条件 <=" },
    { lineRange: [4, 4], explanation: "计算中间位置，避免整数溢出", keyPoint: "防溢出写法" },
    { lineRange: [5, 6], explanation: "找到目标，直接返回下标" },
    { lineRange: [7, 8], explanation: "目标在右半部分，左边界右移" },
    { lineRange: [9, 10], explanation: "目标在左半部分，右边界左移" },
    { lineRange: [12, 12], explanation: "循环结束未找到，返回 -1" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(log n)：每次迭代排除一半元素，最多迭代 log₂n 次",
    spaceBreakdown: "O(1)：只使用几个变量，不需要额外空间",
    reasoning: "每次将搜索空间减半是二分查找高效的核心原因",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "循环条件用 < 而不是 <=",
      wrongCode: "while (left < right) // 可能漏掉只剩一个元素的情况",
      correctCode: "while (left <= right) // 闭区间需要 <=",
      whyWrong: "使用 < 时，当 left == right 时不进入循环，可能漏掉目标元素",
      howToAvoid: "闭区间 [left, right] 用 <=；左闭右开 [left, right) 用 <",
    },
    {
      type: "logic",
      description: "边界更新时没有 +1 或 -1",
      wrongCode: "left = mid; // 或 right = mid;",
      correctCode: "left = mid + 1; // 或 right = mid - 1;",
      whyWrong: "mid 已经比较过了，不需要再包含在下一轮搜索区间中，否则可能死循环",
      howToAvoid: "记住：比较过的元素要排除出搜索区间",
    },
    {
      type: "logic",
      description: "计算 mid 时整数溢出",
      wrongCode: "const mid = (left + right) / 2; // left + right 可能溢出",
      correctCode: "const mid = left + Math.floor((right - left) / 2);",
      whyWrong: "在某些语言（如 Java、C++）中，大数相加会溢出",
      howToAvoid: "使用 left + (right - left) / 2 的写法，养成习惯",
    },
  ],
  interviewTips: [
    "二分查找有很多变体：找第一个等于、最后一个等于、第一个大于等于等",
    "面试中常考「旋转数组」「查找峰值」等二分变形题",
    "能够快速写出 bug-free 的二分是基本功，要熟练掌握",
  ],
  frontendApplications: [
    "虚拟滚动：根据滚动位置二分查找对应的数据项",
    "时间轴/进度条：点击位置快速定位到对应时间点",
    "自动补全：在大量选项中快速查找匹配项",
    "性能监控：在时序数据中查找特定时间范围的记录",
  ],
};

const binarySearchGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么二分查找要求数组有序？无序数组可以用二分吗？",
      hint: "想想二分的核心是什么操作",
      answer: "二分依赖有序性来判断目标在左边还是右边。无序数组无法通过一次比较排除一半元素。",
      insight: "「有序」是二分查找的前提条件，没有有序性就没有二分",
    },
    {
      stage: "plan",
      question: "搜索区间 [left, right] 什么时候变成无效？这意味着什么？",
      hint: "什么情况下 left 会超过 right？",
      answer: "当 left > right 时区间无效，说明整个数组都搜索完了，目标不存在。",
      insight: "循环条件 left <= right 保证了区间有效性",
    },
    {
      stage: "code",
      question: "如果 nums[mid] < target，为什么是 left = mid + 1 而不是 left = mid？",
      hint: "mid 这个位置的元素已经比较过了",
      answer: "nums[mid] 已经比较过且不等于 target，不需要再包含在搜索区间中。用 mid + 1 排除它。",
      insight: "边界更新时排除已比较元素，是二分不死循环的关键",
    },
    {
      stage: "optimize",
      question: "如果要找「第一个大于等于 target 的位置」，该怎么改？",
      hint: "找到 target 后不能直接返回，因为可能不是第一个",
      answer: "找到时不返回，而是 right = mid - 1 继续往左找；最后返回 left。",
      insight: "二分查找的变体通过调整边界更新逻辑和返回值来实现",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化闭区间 [left, right]",
    },
    {
      level: 2,
      content: "循环条件：while (left <= right)",
    },
    {
      level: 3,
      content: "计算中间位置（防溢出）",
      codeFragment: "const mid = left + Math.floor((right - left) / 2);",
    },
    {
      level: 4,
      content: "比较并更新边界",
      codeFragment: "if (nums[mid] === target) return mid;\nelse if (nums[mid] < target) left = mid + 1;\nelse right = mid - 1;",
    },
    {
      level: 5,
      content: "完整二分查找解法",
      codeFragment: "function search(nums: number[], target: number): number {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = left + Math.floor((right - left) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}",
    },
  ],
  checkpoints: [
    {
      question: "二分查找的时间复杂度是？",
      options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
      correctAnswer: 1,
      explanation: "每次迭代将搜索空间减半，最多迭代 log₂n 次。",
    },
    {
      question: "使用闭区间 [left, right] 时，循环条件应该是？",
      options: ["left < right", "left <= right", "left < right - 1", "left + 1 < right"],
      correctAnswer: 1,
      explanation: "闭区间意味着两端都包含，当 left == right 时还有一个元素需要检查。",
    },
    {
      question: "在 [1,3,5,7,9] 中查找 5，第一次 mid 指向哪个元素？",
      options: ["1", "3", "5", "7"],
      correctAnswer: 2,
      explanation: "mid = 0 + (4 - 0) / 2 = 2，nums[2] = 5，正好是目标。",
    },
  ],
};

// ==================== #9 LRU 缓存 (lru-cache) ====================
const lruCacheDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "需要 O(1) 时间复杂度的 get 和 put，同时要维护访问顺序以便淘汰最久未使用的元素",
    patternMatch: "哈希表 + 双向链表组合模式：哈希表提供 O(1) 查找，双向链表维护访问顺序并支持 O(1) 删除和移动",
    whyItWorks: "哈希表存储 key 到链表节点的映射，链表头部是最近使用的，尾部是最久未使用的。访问时移到头部，满了就删尾部",
    metaphor: "就像图书馆的热门书架：最近被借阅的书放在最前面，很久没人看的书就从书架移走",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析需求和复杂度要求",
      thought: "get 和 put 都要 O(1)。get 需要快速查找（哈希表）；put 需要快速插入和删除最久未用的（链表）",
      action: "选择哈希表 + 双向链表的组合数据结构",
    },
    {
      step: 2,
      title: "设计双向链表节点",
      thought: "节点需要存储 key、value，以及 prev、next 指针。key 用于删除时从哈希表中移除",
      action: "定义 Node 类：{ key, value, prev, next }",
    },
    {
      step: 3,
      title: "设计链表操作",
      thought: "需要三个基本操作：添加到头部、删除节点、移动到头部（删除+添加）",
      action: "使用虚拟头尾节点简化边界处理",
      codeSnippet: "// 添加到头部\naddToHead(node) {\n  node.prev = this.head;\n  node.next = this.head.next;\n  this.head.next.prev = node;\n  this.head.next = node;\n}",
    },
    {
      step: 4,
      title: "实现 get 和 put",
      thought: "get：查哈希表，存在则移到头部并返回值。put：存在则更新并移到头部；不存在则创建节点，加到头部，超容量则删尾部",
      action: "实现完整的 get 和 put 方法",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 5], explanation: "定义 Node 类，包含 key、value 和双向指针" },
    { lineRange: [7, 12], explanation: "LRUCache 构造函数：初始化容量、哈希表、虚拟头尾节点", keyPoint: "虚拟节点简化边界" },
    { lineRange: [14, 20], explanation: "addToHead：将节点添加到链表头部（最近使用位置）" },
    { lineRange: [22, 26], explanation: "removeNode：从链表中删除指定节点" },
    { lineRange: [28, 31], explanation: "moveToHead：删除后重新添加到头部" },
    { lineRange: [33, 36], explanation: "removeTail：删除并返回尾部节点（最久未使用）" },
    { lineRange: [38, 45], explanation: "get：从哈希表查找，存在则移到头部并返回值", keyPoint: "get 会更新访问顺序" },
    { lineRange: [47, 60], explanation: "put：更新或新增节点，超容量时淘汰尾部", keyPoint: "容量检查和淘汰" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(1)：get 和 put 都是常数时间，哈希表查找 O(1)，链表操作 O(1)",
    spaceBreakdown: "O(capacity)：最多存储 capacity 个键值对，每个需要一个链表节点和一个哈希表条目",
    reasoning: "哈希表提供 O(1) 的键查找，双向链表提供 O(1) 的节点删除和移动",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "get 时忘记更新节点位置",
      wrongCode: "get(key) {\n  if (this.cache.has(key)) return this.cache.get(key).value;\n  return -1;\n}",
      correctCode: "get(key) {\n  if (this.cache.has(key)) {\n    const node = this.cache.get(key);\n    this.moveToHead(node); // 更新访问顺序\n    return node.value;\n  }\n  return -1;\n}",
      whyWrong: "LRU 的核心是「最近使用」，get 也算使用，必须更新顺序",
      howToAvoid: "记住 LRU 的 R 代表 Recently，任何访问都要更新位置",
    },
    {
      type: "logic",
      description: "删除尾部节点时忘记从哈希表中移除",
      wrongCode: "if (this.cache.size > this.capacity) {\n  this.removeTail(); // 只删了链表，没删哈希表\n}",
      correctCode: "if (this.cache.size > this.capacity) {\n  const tail = this.removeTail();\n  this.cache.delete(tail.key); // 同时删除哈希表条目\n}",
      whyWrong: "链表和哈希表必须保持同步，否则会出现幽灵数据",
      howToAvoid: "每次链表操作都要考虑是否需要同步更新哈希表",
    },
  ],
  interviewTips: [
    "这是面试高频题，要能快速画出数据结构示意图",
    "可能追问：如何实现 LFU（最不经常使用）缓存？",
    "使用虚拟头尾节点可以大大简化代码，避免空指针判断",
    "JavaScript 的 Map 保持插入顺序，可以用来简化实现（但面试中可能要求手写链表）",
  ],
  frontendApplications: [
    "浏览器 HTTP 缓存的实现原理",
    "React Query / SWR 等数据请求库的缓存策略",
    "图片懒加载时的缓存管理",
    "前端路由的页面组件缓存（如 Vue 的 keep-alive）",
  ],
};

const lruCacheGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么单独用哈希表或单独用链表都不能满足 O(1) 的要求？",
      hint: "分析各自的时间复杂度瓶颈",
      answer: "哈希表查找 O(1) 但无法维护顺序；普通链表维护顺序但查找是 O(n)。需要组合使用。",
      insight: "很多复杂数据结构是通过组合简单结构来获得多种优势",
    },
    {
      stage: "plan",
      question: "为什么要用双向链表而不是单向链表？",
      hint: "想想删除一个节点需要什么信息",
      answer: "删除节点需要修改前驱的 next，单向链表找前驱要 O(n)，双向链表直接有 prev 指针。",
      insight: "双向链表牺牲空间换取 O(1) 的任意位置删除能力",
    },
    {
      stage: "code",
      question: "为什么链表节点要存储 key？只存 value 不行吗？",
      hint: "删除尾部节点时需要做什么",
      answer: "删除尾部节点时，需要从哈希表中也删除对应条目，必须知道 key 才能执行 cache.delete(key)。",
      insight: "数据结构设计时要考虑所有操作的需求，确保信息完整",
    },
    {
      stage: "optimize",
      question: "虚拟头尾节点（dummy head/tail）有什么好处？",
      hint: "想想没有它们时，插入和删除要做什么额外判断",
      answer: "避免处理空链表、头部插入、尾部删除等边界情况，代码更简洁不易出错。",
      insight: "虚拟节点是链表题的常用技巧，能大大简化边界处理",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "选择数据结构：哈希表（Map）+ 双向链表",
    },
    {
      level: 2,
      content: "定义链表节点：包含 key、value、prev、next",
    },
    {
      level: 3,
      content: "链表操作：addToHead、removeNode、moveToHead、removeTail",
      codeFragment: "removeNode(node) {\n  node.prev.next = node.next;\n  node.next.prev = node.prev;\n}",
    },
    {
      level: 4,
      content: "get 操作：查找 + 移到头部",
      codeFragment: "get(key) {\n  if (!this.cache.has(key)) return -1;\n  const node = this.cache.get(key);\n  this.moveToHead(node);\n  return node.value;\n}",
    },
    {
      level: 5,
      content: "完整 LRU Cache 实现",
      codeFragment: "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n    this.head = { prev: null, next: null };\n    this.tail = { prev: null, next: null };\n    this.head.next = this.tail;\n    this.tail.prev = this.head;\n  }\n  // ... 完整实现\n}",
    },
  ],
  checkpoints: [
    {
      question: "LRU Cache 使用什么数据结构组合？",
      options: [
        "数组 + 栈",
        "哈希表 + 双向链表",
        "二叉树 + 队列",
        "哈希表 + 单向链表"
      ],
      correctAnswer: 1,
      explanation: "哈希表提供 O(1) 查找，双向链表提供 O(1) 的删除和移动。",
    },
    {
      question: "当缓存满了需要淘汰时，应该删除链表的哪个位置？",
      options: ["头部", "尾部", "中间", "随机位置"],
      correctAnswer: 1,
      explanation: "尾部是最久未使用的元素，应该被淘汰。头部是最近使用的。",
    },
    {
      question: "get 操作除了返回值，还需要做什么？",
      options: [
        "什么都不用做",
        "将节点移到链表头部",
        "将节点移到链表尾部",
        "删除该节点"
      ],
      correctAnswer: 1,
      explanation: "get 也算「使用」，需要将节点移到头部，更新为最近使用。",
    },
  ],
};

// ==================== #10 子集 (subsets) ====================
const subsetsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "要生成所有可能的子集，每个元素都有「选」或「不选」两种选择",
    patternMatch: "回溯（决策树）模式：从空集开始，对每个元素做选或不选的决策，遍历完所有可能的决策路径",
    whyItWorks: "回溯本质是深度优先遍历决策树，每条从根到叶的路径对应一个子集",
    metaphor: "就像菜单点餐：每道菜都可以选择要或不要，所有组合就是所有可能的点餐方案",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "理解子集的特点",
      thought: "n 个元素的数组有 2^n 个子集（包括空集），因为每个元素有选/不选两种状态",
      action: "画出决策树：每层对应一个元素的选择",
    },
    {
      step: 2,
      title: "设计回溯框架",
      thought: "回溯三要素：路径（当前选择）、选择列表（剩余元素）、结束条件（遍历完所有元素）",
      action: "定义 backtrack(start, path) 函数",
    },
    {
      step: 3,
      title: "实现回溯逻辑",
      thought: "每次调用都将当前路径加入结果，然后尝试添加每个后续元素",
      action: "result.push([...path]); for (i = start...) { path.push(nums[i]); backtrack(i+1, path); path.pop(); }",
      codeSnippet: "function backtrack(start: number, path: number[]) {\n  result.push([...path]); // 收集当前路径\n  for (let i = start; i < nums.length; i++) {\n    path.push(nums[i]);    // 做选择\n    backtrack(i + 1, path); // 递归\n    path.pop();             // 撤销选择\n  }\n}",
    },
    {
      step: 4,
      title: "理解为什么从 start 开始",
      thought: "子集不考虑顺序，[1,2] 和 [2,1] 是同一个子集，从 start 开始可以避免重复",
      action: "每次只考虑当前元素及其后面的元素",
    },
  ],
  codeWalkthrough: [
    { lineRange: [1, 1], explanation: "初始化结果数组，用于存储所有子集" },
    { lineRange: [3, 3], explanation: "定义回溯函数，start 表示从哪个索引开始选择" },
    { lineRange: [4, 4], explanation: "将当前路径（子集）加入结果，注意要拷贝数组", keyPoint: "每个路径都是有效子集" },
    { lineRange: [5, 5], explanation: "从 start 开始遍历，避免重复", keyPoint: "去重的关键" },
    { lineRange: [6, 6], explanation: "做选择：将当前元素加入路径" },
    { lineRange: [7, 7], explanation: "递归：从下一个索引开始继续选择" },
    { lineRange: [8, 8], explanation: "撤销选择：回溯时移除刚添加的元素", keyPoint: "回溯的核心" },
    { lineRange: [11, 11], explanation: "从索引 0、空路径开始回溯" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n × 2^n)：共 2^n 个子集，每个子集平均长度 n/2，拷贝需要 O(n)",
    spaceBreakdown: "O(n)：递归栈深度最大为 n，path 数组最大长度为 n（不计算结果数组）",
    reasoning: "回溯遍历完整决策树，每个叶子节点对应一个子集",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "结果中存储路径引用而不是拷贝",
      wrongCode: "result.push(path); // path 会被后续修改影响",
      correctCode: "result.push([...path]); // 拷贝当前路径",
      whyWrong: "path 是同一个数组引用，后续 push 和 pop 会影响已加入结果的「子集」",
      howToAvoid: "在 JavaScript 中，用 [...path] 或 path.slice() 进行浅拷贝",
    },
    {
      type: "logic",
      description: "循环从 0 开始而不是 start，导致重复子集",
      wrongCode: "for (let i = 0; i < nums.length; i++) // 会产生 [1,2] 和 [2,1]",
      correctCode: "for (let i = start; i < nums.length; i++)",
      whyWrong: "子集不区分顺序，从 0 开始会生成顺序不同但元素相同的重复子集",
      howToAvoid: "用 start 参数确保只向后选择，保证元素在子集中的顺序与原数组一致",
    },
  ],
  interviewTips: [
    "子集问题是回溯的入门经典题，必须熟练掌握",
    "变体：有重复元素的子集（需要先排序再跳过重复）、固定大小的子集（组合）",
    "可以用迭代法（位运算）实现：遍历 0 到 2^n-1，每个数的二进制表示对应一个子集",
  ],
  frontendApplications: [
    "表单筛选条件的所有组合预览",
    "购物车商品的优惠组合计算",
    "权限系统的权限组合生成",
    "AB 测试的多变量组合方案",
  ],
};

const subsetsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "n 个不同元素的数组有多少个子集？这个数字是怎么来的？",
      hint: "每个元素有几种选择？",
      answer: "2^n 个子集。每个元素可以选或不选，n 个元素就是 2×2×...×2 = 2^n 种组合。",
      insight: "理解子集数量是理解时间复杂度的基础",
    },
    {
      stage: "plan",
      question: "回溯法中的「选择」、「递归」、「撤销」分别对应什么操作？",
      hint: "想想 path 数组的变化",
      answer: "选择：path.push(nums[i])；递归：backtrack(i+1)；撤销：path.pop()",
      insight: "回溯的核心模式：做选择 → 递归探索 → 撤销选择（恢复状态）",
    },
    {
      stage: "code",
      question: "为什么每次进入回溯函数就要收集结果，而不是在某个终止条件时？",
      hint: "子集的特点是什么？",
      answer: "因为所有中间状态都是有效子集（包括空集），不需要等到叶子节点才收集。",
      insight: "不同于排列/组合问题需要在特定条件收集，子集每个节点都是答案",
    },
    {
      stage: "optimize",
      question: "如果数组有重复元素，如何避免生成重复的子集？",
      hint: "需要排序吗？",
      answer: "先排序，然后在循环中跳过相邻的重复元素：if (i > start && nums[i] === nums[i-1]) continue;",
      insight: "排序 + 剪枝是处理重复元素的标准套路",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化结果数组，定义 backtrack 函数",
    },
    {
      level: 2,
      content: "每次调用 backtrack 时，将当前路径加入结果",
    },
    {
      level: 3,
      content: "循环从 start 开始，避免重复子集",
      codeFragment: "for (let i = start; i < nums.length; i++) {",
    },
    {
      level: 4,
      content: "做选择、递归、撤销选择",
      codeFragment: "path.push(nums[i]);\nbacktrack(i + 1, path);\npath.pop();",
    },
    {
      level: 5,
      content: "完整回溯解法",
      codeFragment: "function subsets(nums: number[]): number[][] {\n  const result: number[][] = [];\n  function backtrack(start: number, path: number[]) {\n    result.push([...path]);\n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);\n      backtrack(i + 1, path);\n      path.pop();\n    }\n  }\n  backtrack(0, []);\n  return result;\n}",
    },
  ],
  checkpoints: [
    {
      question: "[1, 2, 3] 的所有子集有多少个？",
      options: ["6", "7", "8", "9"],
      correctAnswer: 2,
      explanation: "2^3 = 8 个子集，包括空集 [] 和全集 [1,2,3]。",
    },
    {
      question: "为什么 result.push(path) 而不是 result.push([...path])？",
      options: [
        "两者效果一样",
        "直接 push path 会导致后续修改影响已收集的结果",
        "push 引用更节省内存",
        "题目要求返回引用"
      ],
      correctAnswer: 1,
      explanation: "path 是引用，后续 push 和 pop 会修改它，导致结果中的「子集」被污染。",
    },
    {
      question: "循环从 start 而不是 0 开始的目的是？",
      options: ["提高效率", "避免生成重复的子集", "减少递归深度", "符合题目要求"],
      correctAnswer: 1,
      explanation: "子集 [1,2] 和 [2,1] 是同一个，从 start 开始确保只向后选择，避免重复。",
    },
  ],
};

// ==================== #11 Move Zeroes 深度讲解 ====================
const moveZeroesDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "需要把所有 0 移到末尾，同时保持非零元素的相对顺序",
    patternMatch: "这是一个「分区」问题，将数组分成「非零区」和「零区」，可以用双指针原地完成",
    whyItWorks: "用一个慢指针标记「下一个非零元素应该放的位置」，快指针扫描数组，遇到非零就放到慢指针位置，慢指针右边自然都是 0",
    metaphor: "想象整理书架：从左到右扫描，遇到真正的书就往左边挪，最终右边都是空位（0）",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "理解问题本质",
      thought: "移动零到末尾 = 把非零元素挪到前面，且保持相对顺序",
      action: "确认是原地操作，不能用额外数组",
    },
    {
      step: 2,
      title: "设计双指针策略",
      thought: "slow 指向「下一个非零应放位置」，fast 遍历数组寻找非零元素",
      action: "当 fast 找到非零元素时，放到 slow 位置，slow++",
    },
    {
      step: 3,
      title: "处理交换逻辑",
      thought: "直接交换 nums[slow] 和 nums[fast] 可以避免覆盖问题",
      action: "使用 swap 操作，两指针元素互换",
    },
    {
      step: 4,
      title: "验证正确性",
      thought: "slow 之前都是非零元素，slow 到 fast 之间都是 0",
      action: "用 [0,1,0,3,12] 模拟验证",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "slow 指针初始化为 0，表示从数组开头开始放置非零元素",
      keyPoint: "slow 始终指向「下一个非零元素应该放置的位置」",
    },
    {
      lineRange: [3, 4],
      explanation: "fast 指针遍历整个数组，寻找非零元素",
      keyPoint: "fast 的作用是「发现」非零元素",
    },
    {
      lineRange: [5, 8],
      explanation: "当 fast 发现非零元素时，与 slow 位置交换，然后 slow 前进",
      keyPoint: "交换保证了原地操作，slow++ 为下一个非零元素腾出位置",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - fast 指针遍历数组一次，每个元素最多被访问一次",
    spaceBreakdown: "O(1) - 只用了两个指针变量，原地交换不需要额外空间",
    bestCase: "O(n) - 即使全是非零元素，仍需遍历一次",
    worstCase: "O(n) - 即使全是零，仍需遍历一次",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "忘记 slow 和 fast 相等时也要处理",
      wrongCode: "if (nums[fast] !== 0 && slow !== fast) { swap }",
      correctCode: "if (nums[fast] !== 0) { swap; slow++; }",
      whyWrong: "即使 slow === fast，当元素非零时 slow 也需要前进",
      howToAvoid: "交换操作对于 slow === fast 是无害的，不需要特判",
    },
    {
      type: "logic",
      description: "使用赋值而非交换导致覆盖",
      wrongCode: "nums[slow] = nums[fast]; slow++;",
      correctCode: "[nums[slow], nums[fast]] = [nums[fast], nums[slow]]; slow++;",
      whyWrong: "直接赋值会丢失 nums[slow] 的值（如果它是 0，后面需要保留）",
      howToAvoid: "使用交换操作可以保持数组元素总量不变",
    },
  ],
  interviewTips: [
    "先问是否需要保持相对顺序（本题需要）",
    "明确是原地修改还是可以用额外空间",
    "可以提出「覆盖法」和「交换法」两种变体",
  ],
  frontendApplications: [
    "消息列表：将已读消息移到底部，未读保持在顶部且保持时间顺序",
    "任务管理：将已完成任务沉底，进行中任务保持相对顺序",
    "过滤后重排：筛选条件变化时原地调整数组顺序",
  ],
};

const moveZeroesGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "「移动零到末尾」可以换一种等价的表述吗？",
      hint: "从非零元素的角度想想",
      answer: "把所有非零元素移到前面，保持相对顺序，剩下的位置自然都是 0。",
      insight: "问题转化：「移动 0」→「安排非 0」",
    },
    {
      stage: "plan",
      question: "如何用一个指针标记「非零区的边界」？",
      hint: "这个指针应该指向什么位置？",
      answer: "指向「下一个非零元素应该放置的位置」，所有 < slow 的位置都已经放好了非零元素。",
      insight: "slow 指针维护的是一个「不变式」：[0, slow) 都是非零元素",
    },
    {
      stage: "code",
      question: "找到非零元素后，为什么要「交换」而不是直接「赋值」？",
      hint: "想想 nums[slow] 原来是什么",
      answer: "nums[slow] 可能是 0，需要保留它（放到后面去）；交换保证了元素不丢失。",
      insight: "交换是「双向」的，赋值是「单向」的，原地操作通常需要交换",
    },
    {
      stage: "optimize",
      question: "有没有办法减少不必要的交换操作？",
      hint: "当 slow === fast 且元素非零时...",
      answer: "可以在 slow !== fast 时才真正交换，slow === fast 时只需 slow++",
      insight: "这是微优化，面试中提一下体现严谨性即可",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "定义 slow 指针从 0 开始，表示非零区的边界",
    },
    {
      level: 2,
      content: "用 fast 遍历数组，寻找非零元素",
      codeFragment: "for (let fast = 0; fast < nums.length; fast++)",
    },
    {
      level: 3,
      content: "遇到非零元素，与 slow 位置交换",
      codeFragment: "if (nums[fast] !== 0) {\n  [nums[slow], nums[fast]] = [nums[fast], nums[slow]];\n}",
    },
    {
      level: 4,
      content: "交换后 slow 前进",
      codeFragment: "slow++;",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function moveZeroes(nums: number[]): void {\n  let slow = 0;\n  for (let fast = 0; fast < nums.length; fast++) {\n    if (nums[fast] !== 0) {\n      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];\n      slow++;\n    }\n  }\n}",
    },
  ],
  checkpoints: [
    {
      question: "处理 [0, 1, 0, 3, 12] 后，slow 指针最终值是？",
      options: ["3", "4", "5", "2"],
      correctAnswer: 1,
      explanation: "有 4 个非零元素 (1, 3, 12 加上循环结束)，slow 最终为 4",
    },
    {
      question: "为什么不能用 splice 删除 0 再 push 到末尾？",
      options: [
        "可以，效果一样",
        "splice 会改变数组长度，导致遍历问题",
        "题目要求原地操作，splice 不算",
        "push 会改变引用"
      ],
      correctAnswer: 1,
      explanation: "在遍历中使用 splice 会导致索引混乱，而且 splice 是 O(n)，总复杂度变 O(n²)",
    },
  ],
};

// ==================== #12 Valid Palindrome 深度讲解 ====================
const validPalindromeDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "回文串正着读和反着读一样，只考虑字母和数字，忽略大小写",
    patternMatch: "双指针从两端向中间收缩，比较对应字符是否相等",
    whyItWorks: "回文的定义决定了首尾对应位置的字符必须相同，双指针可以高效验证这一点",
    metaphor: "像折纸一样，把字符串对折，两边的字符应该完全重合",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "预处理考虑",
      thought: "需要过滤非字母数字字符，统一大小写",
      action: "可以预处理成新字符串，或者在遍历时动态跳过",
    },
    {
      step: 2,
      title: "选择验证策略",
      thought: "双指针从两端向中间比较是最直观的方法",
      action: "left 从 0 开始，right 从 length-1 开始",
    },
    {
      step: 3,
      title: "处理跳过逻辑",
      thought: "遇到非字母数字时，对应指针移动跳过",
      action: "用 isAlphanumeric 函数判断，不符合条件就 left++ 或 right--",
    },
    {
      step: 4,
      title: "比较与收缩",
      thought: "两指针都指向有效字符时，比较是否相等（忽略大小写）",
      action: "不相等直接返回 false，相等则两指针同时向中间移动",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "定义辅助函数判断字符是否为字母或数字",
      keyPoint: "使用正则 /[a-zA-Z0-9]/ 或 charCode 判断",
    },
    {
      lineRange: [4, 5],
      explanation: "初始化双指针，分别指向字符串首尾",
      keyPoint: "left = 0, right = s.length - 1",
    },
    {
      lineRange: [6, 12],
      explanation: "跳过非字母数字字符，左右指针各自移动直到指向有效字符",
      keyPoint: "注意要保持 left < right 的条件，防止越界",
    },
    {
      lineRange: [13, 16],
      explanation: "比较两个有效字符（转小写后），不相等返回 false",
      keyPoint: "s[left].toLowerCase() !== s[right].toLowerCase()",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个字符最多被访问一次，双指针总共遍历整个字符串",
    spaceBreakdown: "O(1) - 只使用了两个指针变量，原地比较不需要额外空间",
    bestCase: "O(1) - 首尾字符直接不匹配",
    worstCase: "O(n) - 是回文串，需要比较所有字符对",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "跳过非字母数字时忘记检查 left < right",
      wrongCode: "while (!isAlphanumeric(s[left])) left++;",
      correctCode: "while (left < right && !isAlphanumeric(s[left])) left++;",
      whyWrong: "如果字符串全是非字母数字，会导致 left 越界",
      howToAvoid: "所有 while 循环都要包含边界条件",
    },
    {
      type: "logic",
      description: "忘记处理大小写",
      wrongCode: "if (s[left] !== s[right]) return false;",
      correctCode: "if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;",
      whyWrong: "'A' 和 'a' 应该被视为相同字符",
      howToAvoid: "题目说「忽略大小写」，比较前统一转换",
    },
  ],
  interviewTips: [
    "先确认什么字符算「有效」：只有字母数字？还是包括空格？",
    "问清楚大小写处理规则",
    "可以提出 O(n) 空间的预处理方法作为对比",
  ],
  frontendApplications: [
    "表单验证：检查用户输入是否符合回文格式（如某些 ID 规则）",
    "搜索建议：判断用户输入是否为回文以提供特殊提示",
    "游戏开发：回文检测用于文字游戏、谜题验证",
  ],
};

const validPalindromeGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么不能直接反转字符串再比较？",
      hint: "考虑时间和空间复杂度",
      answer: "可以，但需要 O(n) 额外空间存储反转后的字符串。双指针方法只需 O(1) 空间。",
      insight: "双指针原地比较是空间优化的典型思路",
    },
    {
      stage: "plan",
      question: "左右指针移动的终止条件是什么？",
      hint: "什么时候可以确定比较完成了？",
      answer: "当 left >= right 时，所有需要比较的字符对都已检查完毕。",
      insight: "对于奇数长度的字符串，中间字符不需要比较",
    },
    {
      stage: "code",
      question: "如何高效判断一个字符是否为字母或数字？",
      hint: "有几种方法？",
      answer: "1. 正则 /[a-zA-Z0-9]/.test(c)  2. charCode 范围判断  3. c.toLowerCase() !== c.toUpperCase() 判断是否为字母",
      insight: "正则最易读，charCode 最高效",
    },
    {
      stage: "optimize",
      question: "能否用一个 while 循环完成所有逻辑？",
      hint: "嵌套 while 和内部 if 的关系",
      answer: "可以把跳过逻辑放在外层 while 内部，用 if-continue 或嵌套 while 都行",
      insight: "代码风格的选择，清晰性优先于炫技",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "定义 isAlphanumeric 辅助函数",
      codeFragment: "const isAlphanumeric = (c: string) => /[a-zA-Z0-9]/.test(c);",
    },
    {
      level: 2,
      content: "初始化双指针",
      codeFragment: "let left = 0, right = s.length - 1;",
    },
    {
      level: 3,
      content: "主循环：left < right 时持续比较",
      codeFragment: "while (left < right) { ... }",
    },
    {
      level: 4,
      content: "跳过非字母数字字符",
      codeFragment: "while (left < right && !isAlphanumeric(s[left])) left++;\nwhile (left < right && !isAlphanumeric(s[right])) right--;",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function isPalindrome(s: string): boolean {\n  const isAlphanumeric = (c: string) => /[a-zA-Z0-9]/.test(c);\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    while (left < right && !isAlphanumeric(s[left])) left++;\n    while (left < right && !isAlphanumeric(s[right])) right--;\n    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n    left++; right--;\n  }\n  return true;\n}",
    },
  ],
  checkpoints: [
    {
      question: "\"A man, a plan, a canal: Panama\" 是回文吗？",
      options: ["是", "否"],
      correctAnswer: 0,
      explanation: "只看字母数字：amanaplanacanalpanama，正反读一样",
    },
    {
      question: "\" \" (只有空格) 是回文吗？",
      options: ["是", "否"],
      correctAnswer: 0,
      explanation: "过滤掉空格后是空字符串，空字符串定义为回文",
    },
  ],
};

// ==================== #13 First Unique Character 深度讲解 ====================
const firstUniqueCharDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找到第一个只出现一次的字符，需要统计每个字符的出现次数",
    patternMatch: "经典的「计数 + 查找」模式，用哈希表统计频率，再遍历找第一个频率为 1 的",
    whyItWorks: "第一次遍历建立频率表，第二次遍历按原顺序查找，保证找到的是「第一个」",
    metaphor: "像点名：先统计每个名字出现了几次，再按花名册顺序找第一个只出现一次的",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析问题需求",
      thought: "需要知道每个字符出现了多少次，才能判断是否唯一",
      action: "决定使用哈希表（或数组）存储字符频率",
    },
    {
      step: 2,
      title: "设计两次遍历",
      thought: "第一次统计频率，第二次找第一个频率为 1 的",
      action: "两次 for 循环，分别处理统计和查找",
    },
    {
      step: 3,
      title: "选择数据结构",
      thought: "字符串只包含小写字母？可以用长度 26 的数组；否则用 Map",
      action: "根据题目约束选择最优数据结构",
    },
    {
      step: 4,
      title: "返回结果",
      thought: "找到返回索引，找不到返回 -1",
      action: "在第二次遍历中直接 return，遍历完没找到返回 -1",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "创建 Map 或数组用于存储字符频率",
      keyPoint: "Map 更通用，数组更高效（如果只有小写字母）",
    },
    {
      lineRange: [3, 5],
      explanation: "第一次遍历：统计每个字符的出现次数",
      keyPoint: "freq.set(c, (freq.get(c) || 0) + 1)",
    },
    {
      lineRange: [6, 9],
      explanation: "第二次遍历：按原始顺序查找第一个频率为 1 的字符",
      keyPoint: "保持原顺序是关键，所以遍历原字符串而非 Map",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 两次遍历字符串，每次 O(n)，总共 O(2n) = O(n)",
    spaceBreakdown: "O(1) 或 O(k) - 如果只有小写字母，最多 26 个键；如果是通用字符集，取决于不同字符数量",
    reasoning: "空间复杂度取决于字符集大小，对于固定字符集（如 ASCII）视为常数",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "直接遍历 Map 找频率为 1 的键",
      wrongCode: "for (const [char, count] of freq) { if (count === 1) return s.indexOf(char); }",
      correctCode: "for (let i = 0; i < s.length; i++) { if (freq.get(s[i]) === 1) return i; }",
      whyWrong: "Map 不保证插入顺序（在某些实现中），且 indexOf 是额外的 O(n)",
      howToAvoid: "第二次遍历原字符串，保证顺序正确",
    },
    {
      type: "edge-case",
      description: "忘记处理没有唯一字符的情况",
      wrongCode: "// 没有 return -1",
      correctCode: "return -1; // 在函数末尾",
      whyWrong: "如果所有字符都重复，函数需要返回 -1",
      howToAvoid: "养成处理「未找到」情况的习惯",
    },
  ],
  interviewTips: [
    "确认字符集范围：只有小写字母？ASCII？Unicode？",
    "如果只遍历一次可以吗？（可以用 indexOf + lastIndexOf 判断，但复杂度更高）",
    "提及数组 vs Map 的取舍",
  ],
  frontendApplications: [
    "搜索高亮：找到查询词中第一个独特字符作为特殊标记",
    "字符统计：编辑器中显示每个字符的使用频率",
    "密码强度：检测密码中是否有足够的独特字符",
  ],
};

const firstUniqueCharGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么需要两次遍历而不是一次？",
      hint: "「第一个」这个要求意味着什么？",
      answer: "一次遍历无法确定当前字符在后面是否还会出现。必须先统计完所有频率，再按顺序查找。",
      insight: "顺序敏感的问题通常需要多次遍历或使用有序数据结构",
    },
    {
      stage: "plan",
      question: "能否用一次遍历 + indexOf/lastIndexOf 判断唯一性？",
      hint: "想想时间复杂度",
      answer: "可以：if (s.indexOf(c) === s.lastIndexOf(c)) return i; 但 indexOf 是 O(n)，总复杂度变 O(n²)",
      insight: "有时候两次 O(n) 比一次 O(n²) 更优",
    },
    {
      stage: "code",
      question: "用数组 [26] 还是 Map 存储频率？",
      hint: "考虑字符集和实际使用场景",
      answer: "如果题目明确只有小写字母，用 new Array(26).fill(0) 更高效；否则用 Map 更通用",
      insight: "根据约束条件选择数据结构是工程思维的体现",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "创建频率 Map",
      codeFragment: "const freq = new Map<string, number>();",
    },
    {
      level: 2,
      content: "第一次遍历统计频率",
      codeFragment: "for (const c of s) {\n  freq.set(c, (freq.get(c) || 0) + 1);\n}",
    },
    {
      level: 3,
      content: "第二次遍历找第一个频率为 1 的字符",
      codeFragment: "for (let i = 0; i < s.length; i++) {\n  if (freq.get(s[i]) === 1) return i;\n}",
    },
    {
      level: 4,
      content: "处理未找到的情况",
      codeFragment: "return -1;",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function firstUniqChar(s: string): number {\n  const freq = new Map<string, number>();\n  for (const c of s) {\n    freq.set(c, (freq.get(c) || 0) + 1);\n  }\n  for (let i = 0; i < s.length; i++) {\n    if (freq.get(s[i]) === 1) return i;\n  }\n  return -1;\n}",
    },
  ],
  checkpoints: [
    {
      question: "\"leetcode\" 中第一个唯一字符的索引是？",
      options: ["0", "2", "5", "-1"],
      correctAnswer: 0,
      explanation: "'l' 只出现一次，索引为 0",
    },
    {
      question: "\"aabb\" 中第一个唯一字符的索引是？",
      options: ["0", "2", "-1", "1"],
      correctAnswer: 2,
      explanation: "所有字符都出现两次，没有唯一字符，返回 -1",
    },
  ],
};

// ==================== #14 Two Sum II 深度讲解 ====================
const twoSumIIDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "数组已排序，要找两数之和等于 target，返回下标（1-indexed）",
    patternMatch: "有序数组 + 两数之和 = 双指针从两端收缩的经典模式",
    whyItWorks: "左指针增大和会变大，右指针减小和会变小，通过调整指针方向逼近 target",
    metaphor: "像调节天平：和太大就减小大的那边（右指针左移），和太小就增大小的那边（左指针右移）",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "识别有序数组特征",
      thought: "既然数组有序，应该利用这个性质，避免 O(n²) 的暴力解法",
      action: "考虑二分查找或双指针",
    },
    {
      step: 2,
      title: "选择双指针策略",
      thought: "双指针可以根据当前和与 target 的比较来决定移动方向",
      action: "left 从最小元素开始，right 从最大元素开始",
    },
    {
      step: 3,
      title: "设计移动规则",
      thought: "和太大需要变小，和太小需要变大",
      action: "sum > target: right--; sum < target: left++; sum === target: 返回",
    },
    {
      step: 4,
      title: "处理返回值",
      thought: "题目要求返回 1-indexed 的下标",
      action: "return [left + 1, right + 1]",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "初始化双指针，分别指向数组首尾",
      keyPoint: "利用有序性，最小 + 最大是一个好的起点",
    },
    {
      lineRange: [3, 5],
      explanation: "计算当前和并与 target 比较",
      keyPoint: "三种情况：相等、太大、太小",
    },
    {
      lineRange: [6, 10],
      explanation: "根据比较结果移动指针",
      keyPoint: "只移动一个指针，保持二分思想的效率",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每次循环移动一个指针，最多移动 n 次",
    spaceBreakdown: "O(1) - 只使用两个指针变量",
    reasoning: "相比哈希表解法（O(n) 空间），双指针充分利用了有序性，空间更优",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "忘记返回 1-indexed 下标",
      wrongCode: "return [left, right];",
      correctCode: "return [left + 1, right + 1];",
      whyWrong: "题目要求下标从 1 开始计数",
      howToAvoid: "仔细阅读题目的返回值要求",
    },
    {
      type: "logic",
      description: "两个指针移动方向搞反",
      wrongCode: "if (sum > target) left++; else right--;",
      correctCode: "if (sum > target) right--; else left++;",
      whyWrong: "sum 太大应该减小，所以要减小较大的数（右指针左移）",
      howToAvoid: "记住：左指针增大和，右指针减小和",
    },
  ],
  interviewTips: [
    "对比 Two Sum I（无序数组）的哈希表解法",
    "提及为什么不用二分查找（虽然可行，但复杂度 O(n log n)，不如双指针 O(n)）",
    "强调利用有序性是关键",
  ],
  frontendApplications: [
    "价格匹配：在有序价格列表中找两件商品总价等于预算",
    "时间区间：找两个时间点间隔等于指定时长",
    "配对系统：在排序后的数据中快速找匹配对",
  ],
};

const twoSumIIGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "与 Two Sum I（无序数组）相比，有序数组带来了什么优势？",
      hint: "想想哪些操作可以更快",
      answer: "有序意味着可以用二分查找或双指针，利用单调性减少搜索空间。",
      insight: "有序是很强的性质，通常能优化时间或空间",
    },
    {
      stage: "plan",
      question: "为什么选择双指针而不是对每个元素二分查找？",
      hint: "比较两种方法的复杂度",
      answer: "二分查找：O(n log n)；双指针：O(n)。双指针更优。",
      insight: "双指针利用了「已经排除的搜索空间不需要重复检查」的特性",
    },
    {
      stage: "code",
      question: "循环条件是 left < right 还是 left <= right？",
      hint: "什么时候 left === right？",
      answer: "left < right。当 left === right 时，是同一个元素，不能选两次。",
      insight: "题目要求两个不同位置的元素",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化双指针",
      codeFragment: "let left = 0, right = numbers.length - 1;",
    },
    {
      level: 2,
      content: "循环条件",
      codeFragment: "while (left < right) {",
    },
    {
      level: 3,
      content: "计算当前和",
      codeFragment: "const sum = numbers[left] + numbers[right];",
    },
    {
      level: 4,
      content: "根据比较结果移动指针",
      codeFragment: "if (sum === target) return [left + 1, right + 1];\nelse if (sum < target) left++;\nelse right--;",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function twoSum(numbers: number[], target: number): number[] {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    else if (sum < target) left++;\n    else right--;\n  }\n  return [-1, -1]; // 题目保证有解，不会执行到这里\n}",
    },
  ],
  checkpoints: [
    {
      question: "[2, 7, 11, 15], target = 9，答案是？",
      options: ["[0, 1]", "[1, 2]", "[2, 7]", "[1, 3]"],
      correctAnswer: 1,
      explanation: "2 + 7 = 9，下标是 0 和 1，但要返回 1-indexed，所以是 [1, 2]",
    },
    {
      question: "为什么这个方法不会错过答案？",
      options: [
        "双指针会遍历所有组合",
        "每次移动都在排除不可能的组合，答案不会被排除",
        "有序数组保证答案在中间",
        "随机移动最终会找到"
      ],
      correctAnswer: 1,
      explanation: "如果 sum < target，left 右边的所有组合都太小，可以安全跳过；类似地，sum > target 时 right 左边的组合都太大",
    },
  ],
};

// ==================== #15 Middle of Linked List 深度讲解 ====================
const middleOfLinkedListDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找链表的中间节点，不知道链表长度",
    patternMatch: "快慢指针：快指针走两步，慢指针走一步，快指针到终点时慢指针在中间",
    whyItWorks: "快指针速度是慢指针的 2 倍，走完全程时慢指针正好走了一半",
    metaphor: "像操场跑步：一个人跑两圈时，另一个人正好跑一圈；链表版本是跑完全程 vs 跑到中点",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析常规思路",
      thought: "先遍历一次得到长度 n，再遍历到 n/2 位置",
      action: "这需要两次遍历，能否一次完成？",
    },
    {
      step: 2,
      title: "引入快慢指针",
      thought: "快指针速度是慢指针的 2 倍，存在数学关系",
      action: "设置 slow 和 fast 都从 head 开始",
    },
    {
      step: 3,
      title: "设计移动规则",
      thought: "fast 每次走 2 步，slow 每次走 1 步",
      action: "fast = fast.next.next, slow = slow.next",
    },
    {
      step: 4,
      title: "确定终止条件",
      thought: "fast 到达终点（null 或最后一个节点）时停止",
      action: "while (fast && fast.next)",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "初始化快慢指针，都从 head 开始",
      keyPoint: "两个指针起点相同是关键",
    },
    {
      lineRange: [3, 4],
      explanation: "循环条件：fast 和 fast.next 都不为 null",
      keyPoint: "保证 fast 可以安全地走两步",
    },
    {
      lineRange: [5, 6],
      explanation: "快指针走两步，慢指针走一步",
      keyPoint: "速度比 2:1 是核心",
    },
    {
      lineRange: [7, 7],
      explanation: "返回慢指针，此时它指向中间节点",
      keyPoint: "对于偶数长度链表，返回的是第二个中间节点",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 快指针遍历整个链表一次",
    spaceBreakdown: "O(1) - 只使用两个指针变量",
    reasoning: "相比两次遍历的方法，虽然时间复杂度相同，但实际只需一次遍历",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "循环条件写错导致空指针",
      wrongCode: "while (fast.next && fast.next.next)",
      correctCode: "while (fast && fast.next)",
      whyWrong: "如果 fast 本身是 null，访问 fast.next 会报错",
      howToAvoid: "先检查 fast 本身，再检查 fast.next",
    },
    {
      type: "logic",
      description: "偶数长度时返回了第一个中间节点",
      wrongCode: "// 需要先判断 fast.next.next 是否存在再移动",
      correctCode: "// 标准写法会返回第二个中间节点，符合题意",
      whyWrong: "题目要求「如果有两个中间节点，则返回第二个」",
      howToAvoid: "理解标准快慢指针的行为",
    },
  ],
  interviewTips: [
    "可以先问：偶数长度时返回哪个中间节点？",
    "快慢指针是链表面试的基础模式，要熟练",
    "可以扩展到「找链表的 1/3 位置」：快指针走 3 步",
  ],
  frontendApplications: [
    "音频播放器：快速跳到中间位置",
    "分页组件：找到页码列表的中间页",
    "数据流处理：找到流式数据的中位数位置（概念相似）",
  ],
};

const middleOfLinkedListGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "如果链表长度是 5，中间节点是第几个？如果长度是 6 呢？",
      hint: "从 1 开始计数",
      answer: "长度 5：第 3 个（正中间）；长度 6：题目要求返回第 4 个（第二个中间）",
      insight: "理解奇偶情况的差异",
    },
    {
      stage: "plan",
      question: "快慢指针为什么能找到中点？",
      hint: "想想速度和距离的关系",
      answer: "快指针速度是慢指针的 2 倍，当快指针走完 n 步时，慢指针走了 n/2 步。",
      insight: "数学关系：距离 = 速度 × 时间",
    },
    {
      stage: "code",
      question: "为什么循环条件是 fast && fast.next 而不是 fast.next && fast.next.next？",
      hint: "考虑链表长度为 1 或 2 的情况",
      answer: "如果只检查 fast.next，当 fast 为 null 时会报错。先检查 fast 再检查 fast.next 更安全。",
      insight: "链表问题要特别注意空指针",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化快慢指针",
      codeFragment: "let slow = head, fast = head;",
    },
    {
      level: 2,
      content: "循环条件：fast 和 fast.next 都存在",
      codeFragment: "while (fast && fast.next) {",
    },
    {
      level: 3,
      content: "慢指针走一步，快指针走两步",
      codeFragment: "slow = slow.next;\nfast = fast.next.next;",
    },
    {
      level: 4,
      content: "返回慢指针",
      codeFragment: "return slow;",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function middleNode(head: ListNode | null): ListNode | null {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n  }\n  return slow;\n}",
    },
  ],
  checkpoints: [
    {
      question: "链表 [1,2,3,4,5] 的中间节点值是？",
      options: ["2", "3", "4", "2.5"],
      correctAnswer: 1,
      explanation: "5 个节点，中间是第 3 个，值为 3",
    },
    {
      question: "链表 [1,2,3,4,5,6] 的中间节点值是？",
      options: ["3", "4", "3.5", "3 或 4"],
      correctAnswer: 1,
      explanation: "6 个节点有两个中间（3和4），题目要求返回第二个，即 4",
    },
  ],
};

// ==================== #16 Min Stack 深度讲解 ====================
const minStackDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "设计一个栈，支持 push、pop、top 和 getMin，且 getMin 要求 O(1)",
    patternMatch: "辅助栈模式：用一个额外的栈同步记录每个状态下的最小值",
    whyItWorks: "每次 push 时，辅助栈记录「当前栈的最小值」，pop 时同步弹出，任何时刻辅助栈顶就是当前最小值",
    metaphor: "像历史记录：主栈记录数据变化，辅助栈记录每个时间点的「最小值快照」",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析难点",
      thought: "普通栈的 getMin 需要 O(n) 遍历，如何优化到 O(1)？",
      action: "需要用空间换时间，预存储最小值信息",
    },
    {
      step: 2,
      title: "设计辅助结构",
      thought: "用一个辅助栈，与主栈同步操作，记录每个状态的最小值",
      action: "push 时辅助栈压入 min(新值, 当前最小值)",
    },
    {
      step: 3,
      title: "同步操作",
      thought: "pop 时两个栈都要弹出，保持同步",
      action: "主栈 pop，辅助栈也 pop",
    },
    {
      step: 4,
      title: "获取最小值",
      thought: "辅助栈顶始终是当前状态的最小值",
      action: "getMin 直接返回辅助栈顶",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 4],
      explanation: "初始化两个栈：主栈存数据，辅助栈存最小值",
      keyPoint: "两个栈始终保持相同长度",
    },
    {
      lineRange: [5, 9],
      explanation: "push 操作：主栈压入值，辅助栈压入当前最小值",
      keyPoint: "辅助栈压入 Math.min(val, 当前最小值)",
    },
    {
      lineRange: [10, 12],
      explanation: "pop 操作：两个栈同步弹出",
      keyPoint: "保持两栈同步是关键",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(1) - 所有操作都是常数时间",
    spaceBreakdown: "O(n) - 辅助栈需要与主栈相同的空间",
    reasoning: "用 O(n) 空间换取 getMin 的 O(1) 时间",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "辅助栈只在新最小值时才 push",
      wrongCode: "if (val <= this.minStack.top()) this.minStack.push(val);",
      correctCode: "this.minStack.push(Math.min(val, this.minStack.top() ?? Infinity));",
      whyWrong: "如果只记录新最小值，pop 时无法正确恢复之前的最小值",
      howToAvoid: "每次 push 都同步更新辅助栈",
    },
    {
      type: "edge-case",
      description: "空栈时获取最小值",
      wrongCode: "return this.minStack[this.minStack.length - 1];",
      correctCode: "if (this.minStack.length === 0) return -Infinity; // 或抛出异常",
      whyWrong: "空栈时访问会返回 undefined",
      howToAvoid: "考虑边界情况，或题目保证不会对空栈调用 getMin",
    },
  ],
  interviewTips: [
    "先确认所有操作的时间复杂度要求",
    "可以讨论空间优化：辅助栈只在真正更新最小值时才压入",
    "提及单栈解法：每个元素存储 {value, currentMin} 元组",
  ],
  frontendApplications: [
    "撤销栈：编辑器中的撤销操作，同时记录每个状态的某种统计信息",
    "实时监控：维护一个数据窗口的最小值/最大值",
    "状态管理：Redux 中保留每个状态快照的统计信息",
  ],
};

const minStackGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么普通的数组栈无法满足 O(1) getMin？",
      hint: "想想 pop 操作后最小值可能的变化",
      answer: "弹出当前最小值后，新的最小值需要重新遍历整个栈才能确定。",
      insight: "问题的关键在于「恢复历史状态」",
    },
    {
      stage: "plan",
      question: "辅助栈中存的是什么？",
      hint: "不是简单地存最小值的值...",
      answer: "存的是「当主栈有 n 个元素时，这 n 个元素的最小值是多少」",
      insight: "辅助栈是「最小值的历史快照」",
    },
    {
      stage: "code",
      question: "push 时辅助栈应该压入什么？",
      hint: "新值可能不是最小值",
      answer: "压入 min(新值, 辅助栈当前栈顶)，即「包含新值后的最小值」",
      insight: "每次都要和之前的最小值比较",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "定义两个栈",
      codeFragment: "private stack: number[] = [];\nprivate minStack: number[] = [];",
    },
    {
      level: 2,
      content: "push 时同步压入两个栈",
      codeFragment: "push(val: number): void {\n  this.stack.push(val);\n  const currentMin = this.minStack.length === 0 ? val : Math.min(val, this.minStack[this.minStack.length - 1]);\n  this.minStack.push(currentMin);\n}",
    },
    {
      level: 3,
      content: "pop 时同步弹出",
      codeFragment: "pop(): void {\n  this.stack.pop();\n  this.minStack.pop();\n}",
    },
    {
      level: 4,
      content: "top 和 getMin",
      codeFragment: "top(): number { return this.stack[this.stack.length - 1]; }\ngetMin(): number { return this.minStack[this.minStack.length - 1]; }",
    },
  ],
  checkpoints: [
    {
      question: "依次 push(-2, 0, -3) 后，getMin 返回？",
      options: ["-2", "-3", "0", "-5"],
      correctAnswer: 1,
      explanation: "-3 是三个元素中最小的",
    },
    {
      question: "接上题，pop 后 getMin 返回？",
      options: ["-2", "-3", "0", "undefined"],
      correctAnswer: 0,
      explanation: "弹出 -3 后，剩余 [-2, 0]，最小值是 -2",
    },
  ],
};

// ==================== #17 Daily Temperatures 深度讲解 ====================
const dailyTemperaturesDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "对每一天，找到下一个更高温度的天数间隔",
    patternMatch: "「下一个更大元素」问题的典型场景，用单调递减栈解决",
    whyItWorks: "栈中保存「还没找到更高温度的日期」，遇到更高温度时，依次出栈并记录间隔",
    metaphor: "像排队等候：矮个子在前面等，来了高个子，前面所有比他矮的都能「看到」他了",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析暴力解法",
      thought: "对每一天，向后遍历找第一个更高的，O(n²)",
      action: "考虑如何优化",
    },
    {
      step: 2,
      title: "引入单调栈",
      thought: "维护一个递减栈，栈中存的是「还在等待更高温度」的日期索引",
      action: "从左到右遍历，用栈记录未解决的日期",
    },
    {
      step: 3,
      title: "设计入栈出栈规则",
      thought: "遇到更高温度，栈中所有比它低的都找到了答案",
      action: "while 栈顶温度 < 当前温度：出栈并计算间隔",
    },
    {
      step: 4,
      title: "处理结果",
      thought: "出栈时计算天数差，当前索引入栈",
      action: "result[栈顶索引] = 当前索引 - 栈顶索引",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "初始化结果数组（全 0）和单调栈",
      keyPoint: "结果默认为 0，表示没有更高温度",
    },
    {
      lineRange: [3, 7],
      explanation: "当前温度比栈顶高时，栈顶出栈并记录答案",
      keyPoint: "栈存的是索引，不是温度值",
    },
    {
      lineRange: [8, 9],
      explanation: "当前索引入栈，等待未来的更高温度",
      keyPoint: "每个索引都会入栈一次",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个元素最多入栈出栈各一次",
    spaceBreakdown: "O(n) - 栈最多存 n 个元素（递减序列时）",
    reasoning: "虽然有嵌套循环，但每个元素只处理一次，摊销 O(n)",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "栈中存温度值而不是索引",
      wrongCode: "stack.push(temperatures[i]);",
      correctCode: "stack.push(i);",
      whyWrong: "需要计算天数间隔，必须知道索引位置",
      howToAvoid: "明确栈中存储的是什么",
    },
    {
      type: "logic",
      description: "比较条件写反",
      wrongCode: "while (stack.length && temperatures[stack.top()] > temperatures[i])",
      correctCode: "while (stack.length && temperatures[stack[stack.length-1]] < temperatures[i])",
      whyWrong: "应该是当前温度更高时才出栈",
      howToAvoid: "理解「找下一个更大」的逻辑",
    },
  ],
  interviewTips: [
    "画图解释单调栈的工作过程",
    "提及变体：「下一个更小元素」用单调递增栈",
    "对比暴力解法，强调单调栈将 O(n²) 优化到 O(n)",
  ],
  frontendApplications: [
    "股票分析：找每天股价下一次上涨的时间",
    "任务调度：找每个任务下一个更高优先级任务",
    "滚动加载：找每个元素何时进入视口",
  ],
};

const dailyTemperaturesGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "这题和「下一个更大元素」有什么关系？",
      hint: "抽象一下问题本质",
      answer: "本质相同，都是找「右边第一个比当前大的元素」，只是这里要返回间隔天数而非温度值。",
      insight: "识别问题模式是关键",
    },
    {
      stage: "plan",
      question: "为什么栈要维护「递减」的特性？",
      hint: "想想遇到更高温度时会发生什么",
      answer: "递减保证栈顶是「最近的、还在等待的、最高的」温度。遇到更高温度时，按顺序解决等待的问题。",
      insight: "单调性让出栈顺序与问题需求一致",
    },
    {
      stage: "code",
      question: "为什么循环结束后栈中可能还有元素？",
      hint: "栈中剩余的元素代表什么？",
      answer: "剩余的是「右边没有更高温度的日期」，它们的结果保持为 0。",
      insight: "初始化结果数组为 0 巧妙处理了这种情况",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化结果数组和栈",
      codeFragment: "const result = new Array(temperatures.length).fill(0);\nconst stack: number[] = [];",
    },
    {
      level: 2,
      content: "遍历每天的温度",
      codeFragment: "for (let i = 0; i < temperatures.length; i++) {",
    },
    {
      level: 3,
      content: "当前温度高于栈顶时，出栈并计算间隔",
      codeFragment: "while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {\n  const prevIndex = stack.pop()!;\n  result[prevIndex] = i - prevIndex;\n}",
    },
    {
      level: 4,
      content: "当前索引入栈",
      codeFragment: "stack.push(i);",
    },
    {
      level: 5,
      content: "完整解法",
      codeFragment: "function dailyTemperatures(temperatures: number[]): number[] {\n  const result = new Array(temperatures.length).fill(0);\n  const stack: number[] = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {\n      const prevIndex = stack.pop()!;\n      result[prevIndex] = i - prevIndex;\n    }\n    stack.push(i);\n  }\n  return result;\n}",
    },
  ],
  checkpoints: [
    {
      question: "[73,74,75,71,69,72,76,73] 的输出是？",
      options: ["[1,1,4,2,1,1,0,0]", "[1,1,1,2,1,1,0,0]", "[0,0,0,0,0,0,0,0]", "[1,2,3,2,1,1,0,0]"],
      correctAnswer: 0,
      explanation: "73→74(1天), 74→75(1天), 75→76(4天), 71→72(2天), 69→72(1天), 72→76(1天), 76和73没有更高",
    },
  ],
};

// ==================== #18 Merge Two Sorted Lists 深度讲解 ====================
const mergeTwoSortedListsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "合并两个有序链表为一个新的有序链表",
    patternMatch: "双指针 + 哨兵节点，类似归并排序的合并阶段",
    whyItWorks: "每次比较两个链表头部，取较小的接到结果链表尾部，直到一个链表耗尽",
    metaphor: "像两队人按身高排队合并：每次从两队首选身高较矮的接到新队伍",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "设计结果链表",
      thought: "需要一个指针指向结果链表的尾部，方便追加节点",
      action: "使用哨兵节点（dummy head）简化头部处理",
    },
    {
      step: 2,
      title: "双指针比较",
      thought: "分别指向两个链表当前节点，比较值大小",
      action: "取较小的节点接到结果尾部，指针前进",
    },
    {
      step: 3,
      title: "处理剩余节点",
      thought: "一个链表遍历完后，另一个可能还有剩余",
      action: "直接将剩余部分接到结果尾部",
    },
    {
      step: 4,
      title: "返回结果",
      thought: "跳过哨兵节点返回真正的头部",
      action: "return dummy.next",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "创建哨兵节点和结果尾指针",
      keyPoint: "哨兵节点避免了处理头节点的特殊情况",
    },
    {
      lineRange: [4, 10],
      explanation: "主循环：比较两个链表头部，取较小的接到结果",
      keyPoint: "每次只移动被选中的链表指针",
    },
    {
      lineRange: [11, 12],
      explanation: "处理剩余部分",
      keyPoint: "用 || 运算符简洁处理两种情况",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n + m) - 每个节点都被访问一次",
    spaceBreakdown: "O(1) - 只使用了几个指针，复用原有节点",
    reasoning: "原地修改链表指针，不创建新节点",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "忘记处理剩余节点",
      wrongCode: "// while 循环结束后直接 return",
      correctCode: "tail.next = list1 || list2;",
      whyWrong: "一个链表遍历完后另一个可能还有节点",
      howToAvoid: "合并类问题都要考虑「尾部处理」",
    },
    {
      type: "logic",
      description: "返回 dummy 而不是 dummy.next",
      wrongCode: "return dummy;",
      correctCode: "return dummy.next;",
      whyWrong: "dummy 是哨兵节点，不是真正的数据",
      howToAvoid: "理解哨兵节点的作用",
    },
  ],
  interviewTips: [
    "可以先写递归解法（更简洁），再讨论迭代解法",
    "强调哨兵节点的好处：避免 if 判断头节点",
    "提及原地合并 vs 创建新链表的区别",
  ],
  frontendApplications: [
    "合并多个有序数据流",
    "日历事件合并：将多个有序事件列表合并",
    "聊天记录合并：按时间顺序合并多个聊天源",
  ],
};

const mergeTwoSortedListsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "这题和归并排序有什么关系？",
      hint: "归并排序的核心操作是什么？",
      answer: "这就是归并排序的「合并」阶段，只不过数据结构是链表而非数组。",
      insight: "链表合并是归并排序的基础操作",
    },
    {
      stage: "plan",
      question: "为什么要用哨兵节点（dummy head）？",
      hint: "如果不用会怎样？",
      answer: "不用的话需要单独处理结果链表的第一个节点，增加代码复杂度。",
      insight: "哨兵节点统一了头部和中间节点的处理逻辑",
    },
    {
      stage: "code",
      question: "递归解法是怎样的？",
      hint: "想想子问题",
      answer: "比较 l1 和 l2 头部，较小者的 next 指向「递归合并剩余部分」的结果。",
      insight: "递归解法代码更简洁，但有 O(n+m) 栈空间开销",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "创建哨兵节点",
      codeFragment: "const dummy = new ListNode(-1);\nlet tail = dummy;",
    },
    {
      level: 2,
      content: "主循环比较两个链表",
      codeFragment: "while (list1 && list2) {",
    },
    {
      level: 3,
      content: "取较小值接到结果",
      codeFragment: "if (list1.val <= list2.val) {\n  tail.next = list1;\n  list1 = list1.next;\n} else {\n  tail.next = list2;\n  list2 = list2.next;\n}\ntail = tail.next;",
    },
    {
      level: 4,
      content: "处理剩余和返回",
      codeFragment: "tail.next = list1 || list2;\nreturn dummy.next;",
    },
  ],
  checkpoints: [
    {
      question: "[1,2,4] 和 [1,3,4] 合并后是？",
      options: ["[1,1,2,3,4,4]", "[1,2,3,4,4,1]", "[1,2,4,1,3,4]", "[1,1,2,4,3,4]"],
      correctAnswer: 0,
      explanation: "按顺序合并：1,1,2,3,4,4",
    },
  ],
};

// ==================== #19 Binary Tree Inorder Traversal 深度讲解 ====================
const binaryTreeInorderDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "中序遍历：左子树 → 根节点 → 右子树",
    patternMatch: "递归天然契合树的结构，迭代需要用栈模拟递归调用栈",
    whyItWorks: "递归隐式使用调用栈，迭代显式使用栈，本质都是 DFS",
    metaphor: "像阅读书籍：先看目录（左子树），再看正文（根），最后看附录（右子树）",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "递归思路",
      thought: "中序遍历的定义本身就是递归的",
      action: "inorder(left) → visit(root) → inorder(right)",
    },
    {
      step: 2,
      title: "迭代思路",
      thought: "用栈模拟递归，关键是什么时候入栈、什么时候访问",
      action: "一直往左走并入栈，走到底后弹出访问，然后转向右子树",
    },
    {
      step: 3,
      title: "设计迭代流程",
      thought: "维护当前节点指针和栈",
      action: "current 非空或栈非空时继续循环",
    },
    {
      step: 4,
      title: "处理左-根-右顺序",
      thought: "先处理所有左节点，再处理当前节点，最后处理右节点",
      action: "内层 while 处理左，弹栈处理根，current = node.right 处理右",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "递归解法：直接按定义实现",
      keyPoint: "左 → 根 → 右的访问顺序",
    },
    {
      lineRange: [4, 8],
      explanation: "迭代解法：用栈模拟递归",
      keyPoint: "一直往左走的过程就是「递归调用」的过程",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个节点访问一次",
    spaceBreakdown: "O(h) - h 是树的高度，最坏情况（链状）为 O(n)",
    reasoning: "递归用调用栈，迭代用显式栈，空间都取决于树高",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "迭代时访问节点的时机错误",
      wrongCode: "result.push(current.val); stack.push(current); current = current.left;",
      correctCode: "stack.push(current); current = current.left; // 后面弹栈时才访问",
      whyWrong: "中序遍历应该在「从左子树返回后」才访问根节点",
      howToAvoid: "理解栈模拟的是「递归返回」的过程",
    },
    {
      type: "boundary",
      description: "迭代循环条件不完整",
      wrongCode: "while (stack.length)",
      correctCode: "while (current || stack.length)",
      whyWrong: "初始时栈为空但 current 非空，会直接跳过循环",
      howToAvoid: "当前节点和栈都要作为继续条件",
    },
  ],
  interviewTips: [
    "先写递归（简单），再讨论迭代（展示栈的使用能力）",
    "提及 Morris 遍历（O(1) 空间）作为进阶",
    "对比前序、中序、后序的区别",
  ],
  frontendApplications: [
    "DOM 遍历：特定顺序访问 DOM 树节点",
    "文件系统：按特定顺序遍历目录树",
    "BST 中序遍历得到有序序列",
  ],
};

const binaryTreeInorderGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么中序遍历 BST 得到的是有序序列？",
      hint: "想想 BST 的性质",
      answer: "BST 左子树所有值 < 根 < 右子树所有值，中序遍历正好按这个顺序访问。",
      insight: "中序遍历 + BST = 有序序列，这是重要的性质",
    },
    {
      stage: "plan",
      question: "迭代解法中，栈存储的是什么？",
      hint: "对比递归调用栈",
      answer: "栈存储的是「还没访问，但已经处理完左子树的节点」，相当于递归中「返回到这个节点」的状态。",
      insight: "栈模拟的是递归调用栈",
    },
    {
      stage: "code",
      question: "为什么迭代解法有两层循环？",
      hint: "内层 while 和外层 while 分别做什么？",
      answer: "内层一直往左走（模拟递归深入），外层处理弹栈和转向右子树（模拟递归返回）。",
      insight: "两层循环对应递归的「去」和「回」",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "递归解法",
      codeFragment: "function inorderRecursive(root: TreeNode | null): number[] {\n  if (!root) return [];\n  return [...inorderRecursive(root.left), root.val, ...inorderRecursive(root.right)];\n}",
    },
    {
      level: 2,
      content: "迭代解法：初始化",
      codeFragment: "const result: number[] = [];\nconst stack: TreeNode[] = [];\nlet current = root;",
    },
    {
      level: 3,
      content: "迭代解法：主循环结构",
      codeFragment: "while (current || stack.length) {",
    },
    {
      level: 4,
      content: "迭代解法：一直往左走",
      codeFragment: "while (current) {\n  stack.push(current);\n  current = current.left;\n}",
    },
    {
      level: 5,
      content: "完整迭代解法",
      codeFragment: "function inorderTraversal(root: TreeNode | null): number[] {\n  const result: number[] = [];\n  const stack: TreeNode[] = [];\n  let current = root;\n  while (current || stack.length) {\n    while (current) {\n      stack.push(current);\n      current = current.left;\n    }\n    current = stack.pop()!;\n    result.push(current.val);\n    current = current.right;\n  }\n  return result;\n}",
    },
  ],
  checkpoints: [
    {
      question: "树 [1,null,2,3] 的中序遍历是？",
      options: ["[1,2,3]", "[1,3,2]", "[3,2,1]", "[2,3,1]"],
      correctAnswer: 1,
      explanation: "树结构是 1 的右子树是 2，2 的左子树是 3。中序：1 → 3 → 2",
    },
  ],
};

// ==================== #20 Maximum Depth of Binary Tree 深度讲解 ====================
const maxDepthBinaryTreeDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "求二叉树的最大深度（根到最远叶子节点的距离）",
    patternMatch: "递归分治：最大深度 = 1 + max(左子树深度, 右子树深度)",
    whyItWorks: "树的深度可以递归定义：叶子节点深度为 1，非叶子节点深度为子树深度 + 1",
    metaphor: "像量大楼高度：每层加 1，哪边更高就取哪边",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "递归定义",
      thought: "树的深度可以用子树深度表示",
      action: "depth(node) = 1 + max(depth(left), depth(right))",
    },
    {
      step: 2,
      title: "确定基准情况",
      thought: "空节点深度为 0",
      action: "if (!root) return 0",
    },
    {
      step: 3,
      title: "递归调用",
      thought: "分别求左右子树深度",
      action: "递归调用自身处理子树",
    },
    {
      step: 4,
      title: "合并结果",
      thought: "取较大值并加 1",
      action: "return 1 + Math.max(left, right)",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "基准情况：空树深度为 0",
      keyPoint: "这是递归的终止条件",
    },
    {
      lineRange: [3, 4],
      explanation: "递归计算左右子树深度",
      keyPoint: "分治思想：大问题拆成小问题",
    },
    {
      lineRange: [5, 5],
      explanation: "返回较大深度 + 1",
      keyPoint: "+1 代表当前节点这一层",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个节点访问一次",
    spaceBreakdown: "O(h) - 递归栈深度，h 是树高",
    bestCase: "O(log n) - 完全平衡二叉树",
    worstCase: "O(n) - 链状树",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "基准情况返回 1 而非 0",
      wrongCode: "if (!root) return 1;",
      correctCode: "if (!root) return 0;",
      whyWrong: "空树深度是 0，不是 1",
      howToAvoid: "理解「深度」的定义",
    },
    {
      type: "logic",
      description: "只考虑一边子树",
      wrongCode: "return 1 + maxDepth(root.left);",
      correctCode: "return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));",
      whyWrong: "需要取左右子树深度的较大值",
      howToAvoid: "记住是求「最大」深度",
    },
  ],
  interviewTips: [
    "可以用 BFS 计算深度（层数）",
    "递归解法最简洁，一行可以搞定",
    "提及「深度」vs「高度」的区别",
  ],
  frontendApplications: [
    "DOM 树深度：计算 DOM 嵌套层数",
    "组件树分析：检测过深的组件嵌套",
    "JSON 结构分析：计算 JSON 对象的嵌套深度",
  ],
};

const maxDepthBinaryTreeGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "深度和高度有什么区别？",
      hint: "从哪个方向开始计数？",
      answer: "深度是从根向下数（根深度为 1 或 0），高度是从叶子向上数。树的最大深度 = 树的高度。",
      insight: "不同的定义会影响边界条件的处理",
    },
    {
      stage: "plan",
      question: "用 BFS 如何求最大深度？",
      hint: "BFS 的特点是什么？",
      answer: "BFS 按层遍历，遍历完最后一层时的层数就是最大深度。",
      insight: "BFS 解法：层数 = 深度",
    },
    {
      stage: "code",
      question: "一行递归怎么写？",
      hint: "利用三元运算符",
      answer: "return root ? 1 + Math.max(maxDepth(root.left), maxDepth(root.right)) : 0;",
      insight: "简洁不等于更好，可读性同样重要",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "基准情况",
      codeFragment: "if (!root) return 0;",
    },
    {
      level: 2,
      content: "递归计算子树深度",
      codeFragment: "const leftDepth = maxDepth(root.left);\nconst rightDepth = maxDepth(root.right);",
    },
    {
      level: 3,
      content: "返回结果",
      codeFragment: "return 1 + Math.max(leftDepth, rightDepth);",
    },
    {
      level: 4,
      content: "完整解法",
      codeFragment: "function maxDepth(root: TreeNode | null): number {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}",
    },
  ],
  checkpoints: [
    {
      question: "树 [3,9,20,null,null,15,7] 的最大深度是？",
      options: ["2", "3", "4", "5"],
      correctAnswer: 1,
      explanation: "三层：根节点 3，第二层 9 和 20，第三层 15 和 7",
    },
    {
      question: "空树 [] 的深度是？",
      options: ["-1", "0", "1", "undefined"],
      correctAnswer: 1,
      explanation: "空树没有节点，深度为 0",
    },
  ],
};

// ==================== #21 Invert Binary Tree 深度讲解 ====================
const invertBinaryTreeDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "翻转二叉树，即交换每个节点的左右子树",
    patternMatch: "递归处理：先翻转左右子树，再交换它们",
    whyItWorks: "树的翻转可以分解为子树的翻转 + 当前节点的左右交换",
    metaphor: "像镜子反射：每个节点的左右孩子互换位置，整棵树就变成镜像",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析翻转定义",
      thought: "翻转 = 每个节点的左右子树交换",
      action: "递归处理每个节点",
    },
    {
      step: 2,
      title: "确定基准情况",
      thought: "空节点不需要翻转",
      action: "if (!root) return null",
    },
    {
      step: 3,
      title: "递归翻转",
      thought: "先递归翻转左右子树",
      action: "递归调用处理子树",
    },
    {
      step: 4,
      title: "交换左右",
      thought: "交换当前节点的左右子节点",
      action: "[root.left, root.right] = [root.right, root.left]",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "基准情况：空节点返回 null",
      keyPoint: "递归终止条件",
    },
    {
      lineRange: [3, 4],
      explanation: "递归翻转左右子树（可选步骤，交换前后都行）",
      keyPoint: "先翻转子树再交换",
    },
    {
      lineRange: [5, 6],
      explanation: "交换左右子节点",
      keyPoint: "这是翻转的核心操作",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个节点访问一次",
    spaceBreakdown: "O(h) - 递归栈深度，h 是树高",
    reasoning: "遍历整棵树，每个节点做常数时间操作",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "只交换了值而不是节点",
      wrongCode: "[root.left.val, root.right.val] = [root.right.val, root.left.val];",
      correctCode: "[root.left, root.right] = [root.right, root.left];",
      whyWrong: "需要交换整个子树，不只是值",
      howToAvoid: "理解翻转是结构性的，不只是值的变化",
    },
  ],
  interviewTips: [
    "这是经典面试题，Homebrew 作者就因为没做出来被 Google 拒绝",
    "可以用 BFS 或 DFS 实现",
    "强调递归的简洁性",
  ],
  frontendApplications: [
    "DOM 结构镜像：创建页面的镜像布局",
    "组件树变换：批量调整组件层级结构",
    "数据结构转换：将树形数据结构翻转",
  ],
};

const invertBinaryTreeGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "翻转后，原来的左子树在哪里？",
      hint: "每一层都发生了什么？",
      answer: "原来的左子树变成了右子树，且左子树内部也完成了翻转。",
      insight: "翻转是递归的：整体翻转 + 局部翻转",
    },
    {
      stage: "plan",
      question: "先交换再递归，还是先递归再交换？",
      hint: "两种顺序结果一样吗？",
      answer: "两种顺序结果一样。可以先交换再递归，也可以先递归再交换。",
      insight: "因为交换和递归操作是独立的",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "基准情况",
      codeFragment: "if (!root) return null;",
    },
    {
      level: 2,
      content: "交换左右子节点",
      codeFragment: "[root.left, root.right] = [root.right, root.left];",
    },
    {
      level: 3,
      content: "递归翻转子树",
      codeFragment: "invertTree(root.left);\ninvertTree(root.right);",
    },
    {
      level: 4,
      content: "完整解法",
      codeFragment: "function invertTree(root: TreeNode | null): TreeNode | null {\n  if (!root) return null;\n  [root.left, root.right] = [root.right, root.left];\n  invertTree(root.left);\n  invertTree(root.right);\n  return root;\n}",
    },
  ],
  checkpoints: [
    {
      question: "翻转 [4,2,7,1,3,6,9] 后根节点的左子节点是？",
      options: ["2", "7", "1", "4"],
      correctAnswer: 1,
      explanation: "原来的右子节点 7 变成了左子节点",
    },
  ],
};

// ==================== #22 Symmetric Tree 深度讲解 ====================
const symmetricTreeDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "判断二叉树是否对称（镜像相等）",
    patternMatch: "比较两棵子树是否互为镜像：左的左 == 右的右，左的右 == 右的左",
    whyItWorks: "对称性可以递归定义：根节点的左右子树互为镜像",
    metaphor: "像照镜子：左边看到的和右边看到的应该对应相等",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "定义镜像条件",
      thought: "两棵树镜像意味着：根相等，左子树与右子树镜像",
      action: "设计 isMirror(t1, t2) 辅助函数",
    },
    {
      step: 2,
      title: "确定基准情况",
      thought: "两个都为空→镜像；一个空一个不空→不镜像",
      action: "处理 null 的情况",
    },
    {
      step: 3,
      title: "递归比较",
      thought: "值相等且交叉子树镜像",
      action: "t1.val === t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "入口函数调用辅助函数",
      keyPoint: "检查根的左右子树是否镜像",
    },
    {
      lineRange: [3, 5],
      explanation: "处理空节点情况",
      keyPoint: "都空→true，只有一个空→false",
    },
    {
      lineRange: [6, 8],
      explanation: "递归检查镜像条件",
      keyPoint: "值相等 + 交叉子树镜像",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个节点访问一次",
    spaceBreakdown: "O(h) - 递归栈深度",
    reasoning: "遍历整棵树进行比较",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "比较方向搞错",
      wrongCode: "isMirror(t1.left, t2.left) && isMirror(t1.right, t2.right)",
      correctCode: "isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left)",
      whyWrong: "镜像是交叉比较，不是同向比较",
      howToAvoid: "记住：左的左对应右的右，左的右对应右的左",
    },
  ],
  interviewTips: [
    "可以用 BFS 迭代实现，用队列成对比较",
    "强调「镜像」的交叉比较逻辑",
  ],
  frontendApplications: [
    "UI 对称性检测：检查布局是否对称",
    "数据校验：验证树形结构的对称性",
  ],
};

const symmetricTreeGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "对称和相等有什么区别？",
      hint: "比较的方向不同",
      answer: "相等是同向比较（左对左，右对右），对称是交叉比较（左对右，右对左）。",
      insight: "对称 = 镜像相等",
    },
    {
      stage: "plan",
      question: "如何用迭代（BFS）判断对称？",
      hint: "队列怎么用？",
      answer: "用队列成对存储需要比较的节点，每次取两个出来比较，然后把它们的子节点交叉入队。",
      insight: "BFS 需要维护比较对的关系",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "辅助函数签名",
      codeFragment: "function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {",
    },
    {
      level: 2,
      content: "处理空节点",
      codeFragment: "if (!t1 && !t2) return true;\nif (!t1 || !t2) return false;",
    },
    {
      level: 3,
      content: "递归镜像检查",
      codeFragment: "return t1.val === t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);",
    },
    {
      level: 4,
      content: "完整解法",
      codeFragment: "function isSymmetric(root: TreeNode | null): boolean {\n  function isMirror(t1: TreeNode | null, t2: TreeNode | null): boolean {\n    if (!t1 && !t2) return true;\n    if (!t1 || !t2) return false;\n    return t1.val === t2.val && isMirror(t1.left, t2.right) && isMirror(t1.right, t2.left);\n  }\n  return isMirror(root, root);\n}",
    },
  ],
  checkpoints: [
    {
      question: "[1,2,2,3,4,4,3] 是对称的吗？",
      options: ["是", "否"],
      correctAnswer: 0,
      explanation: "左右子树完全镜像",
    },
  ],
};

// ==================== #23 Validate Binary Search Tree 深度讲解 ====================
const validateBSTDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "验证是否为有效 BST：左子树所有值 < 根 < 右子树所有值",
    patternMatch: "递归传递上下界：每个节点的值必须在 (min, max) 范围内",
    whyItWorks: "BST 性质可以用范围约束表达，递归时不断缩小有效范围",
    metaphor: "像走迷宫设边界：往左走，上界变成当前值；往右走，下界变成当前值",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "分析 BST 性质",
      thought: "不只是左孩子 < 根 < 右孩子，而是整个左子树 < 根 < 整个右子树",
      action: "需要用范围约束而非局部比较",
    },
    {
      step: 2,
      title: "设计递归参数",
      thought: "传递当前节点允许的最小值和最大值",
      action: "isValid(node, min, max)",
    },
    {
      step: 3,
      title: "更新范围",
      thought: "往左走，max 变为当前值；往右走，min 变为当前值",
      action: "递归时更新边界",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "基准情况：空节点是有效的",
      keyPoint: "空树是 BST",
    },
    {
      lineRange: [3, 4],
      explanation: "检查当前值是否在范围内",
      keyPoint: "必须严格小于 max，严格大于 min",
    },
    {
      lineRange: [5, 6],
      explanation: "递归验证子树，更新边界",
      keyPoint: "左子树 max 更新为当前值，右子树 min 更新为当前值",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 每个节点访问一次",
    spaceBreakdown: "O(h) - 递归栈深度",
    reasoning: "需要检查每个节点是否满足约束",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "只检查局部而非全局约束",
      wrongCode: "root.left.val < root.val && root.right.val > root.val",
      correctCode: "// 使用范围约束，传递 min 和 max",
      whyWrong: "BST 要求整个左子树都小于根，不只是直接左孩子",
      howToAvoid: "用范围约束替代局部比较",
    },
    {
      type: "boundary",
      description: "边界值处理错误",
      wrongCode: "if (node.val <= min || node.val >= max)",
      correctCode: "// 初始 min=-Infinity, max=Infinity，并用严格不等式",
      whyWrong: "要处理节点值等于边界的情况",
      howToAvoid: "使用 -Infinity 和 Infinity 作为初始边界",
    },
  ],
  interviewTips: [
    "提及中序遍历方法：BST 中序遍历是递增的",
    "注意整数边界问题（如果用 Number.MIN_VALUE）",
  ],
  frontendApplications: [
    "数据验证：验证树形配置数据的有效性",
    "搜索优化：验证索引结构是否正确",
  ],
};

const validateBSTGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么只检查 left.val < root.val < right.val 不够？",
      hint: "画一个反例",
      answer: "例如 [5,4,6,null,null,3,7]，3 在 5 的右子树中但小于 5，只检查局部会遗漏。",
      insight: "BST 是全局性质，不是局部性质",
    },
    {
      stage: "plan",
      question: "用中序遍历怎么验证 BST？",
      hint: "中序遍历 BST 有什么特点？",
      answer: "BST 的中序遍历是严格递增的。只需检查中序遍历的每个值是否大于前一个。",
      insight: "两种方法本质相同，范围约束更直观",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "辅助函数",
      codeFragment: "function isValid(node: TreeNode | null, min: number, max: number): boolean {",
    },
    {
      level: 2,
      content: "基准情况和范围检查",
      codeFragment: "if (!node) return true;\nif (node.val <= min || node.val >= max) return false;",
    },
    {
      level: 3,
      content: "递归验证子树",
      codeFragment: "return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);",
    },
    {
      level: 4,
      content: "完整解法",
      codeFragment: "function isValidBST(root: TreeNode | null): boolean {\n  function isValid(node: TreeNode | null, min: number, max: number): boolean {\n    if (!node) return true;\n    if (node.val <= min || node.val >= max) return false;\n    return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);\n  }\n  return isValid(root, -Infinity, Infinity);\n}",
    },
  ],
  checkpoints: [
    {
      question: "[2,1,3] 是有效 BST 吗？",
      options: ["是", "否"],
      correctAnswer: 0,
      explanation: "1 < 2 < 3，满足 BST 性质",
    },
  ],
};

// ==================== #24 House Robber 深度讲解 ====================
const houseRobberDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "不能抢相邻的房子，求最大收益",
    patternMatch: "经典 DP：dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
    whyItWorks: "对于每个房子，要么不抢（继承 i-1），要么抢（i-2 + 当前）",
    metaphor: "像选课：选了这门课就不能选相邻时间的课，求学分最大化",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "定义状态",
      thought: "dp[i] 表示到第 i 个房子为止能获得的最大金额",
      action: "状态定义决定了转移方程",
    },
    {
      step: 2,
      title: "状态转移",
      thought: "对于第 i 个房子：抢或不抢",
      action: "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
    },
    {
      step: 3,
      title: "初始化",
      thought: "前两个房子需要特殊处理",
      action: "dp[0] = nums[0], dp[1] = max(nums[0], nums[1])",
    },
    {
      step: 4,
      title: "空间优化",
      thought: "只依赖前两个状态，可以用两个变量代替数组",
      action: "prev1, prev2 滚动更新",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 3],
      explanation: "处理边界情况",
      keyPoint: "空数组和单元素数组",
    },
    {
      lineRange: [4, 6],
      explanation: "初始化前两个状态",
      keyPoint: "第一个房子只能抢，第二个取两者较大",
    },
    {
      lineRange: [7, 10],
      explanation: "状态转移",
      keyPoint: "每次取「不抢当前」和「抢当前」的较大值",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 遍历一次",
    spaceBreakdown: "O(1) - 优化后只用两个变量",
    reasoning: "DP 数组可以优化为滚动变量",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "初始化 dp[1] 错误",
      wrongCode: "dp[1] = nums[1];",
      correctCode: "dp[1] = Math.max(nums[0], nums[1]);",
      whyWrong: "dp[1] 应该是前两个房子的最优解，可能选第一个",
      howToAvoid: "dp[i] 表示的是「到 i 为止」的最优解，不是「必须选 i」",
    },
  ],
  interviewTips: [
    "先写 O(n) 空间解法，再优化到 O(1)",
    "提及变体：环形房子（House Robber II）",
  ],
  frontendApplications: [
    "任务调度：选择不冲突的任务获得最大收益",
    "广告投放：选择不相邻时段投放获得最大曝光",
  ],
};

const houseRobberGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么贪心（每次选最大的）不行？",
      hint: "想一个反例",
      answer: "[2,7,9,3,1]，贪心选 9 后只能选 2 或 1，但选 7+3 更优",
      insight: "局部最优不等于全局最优，需要 DP",
    },
    {
      stage: "plan",
      question: "状态定义为「必须抢第 i 家」和「到第 i 家为止」有什么区别？",
      hint: "哪个更容易转移？",
      answer: "「到 i 为止」更好，因为不需要关心最后一步是否抢了",
      insight: "状态定义影响转移方程的复杂度",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "状态定义",
      codeFragment: "// dp[i] = 到第 i 个房子为止的最大收益",
    },
    {
      level: 2,
      content: "初始化",
      codeFragment: "let prev2 = 0, prev1 = 0;",
    },
    {
      level: 3,
      content: "状态转移",
      codeFragment: "for (const num of nums) {\n  const curr = Math.max(prev1, prev2 + num);\n  prev2 = prev1;\n  prev1 = curr;\n}",
    },
    {
      level: 4,
      content: "完整解法",
      codeFragment: "function rob(nums: number[]): number {\n  let prev2 = 0, prev1 = 0;\n  for (const num of nums) {\n    const curr = Math.max(prev1, prev2 + num);\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}",
    },
  ],
  checkpoints: [
    {
      question: "[2,7,9,3,1] 的最大收益是？",
      options: ["10", "11", "12", "13"],
      correctAnswer: 2,
      explanation: "选 2 + 9 + 1 = 12 或 7 + 3 = 10，最优是 12",
    },
  ],
};

// ==================== #25 Maximum Subarray 深度讲解 ====================
const maximumSubarrayDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找连续子数组的最大和",
    patternMatch: "Kadane 算法：维护「以当前位置结尾的最大子数组和」",
    whyItWorks: "对于每个位置，要么加入之前的子数组，要么重新开始",
    metaphor: "像记账：如果之前累计是正的就继续累加，是负的就重新开始",
  },
  thinkingProcess: [
    {
      step: 1,
      title: "定义状态",
      thought: "dp[i] = 以 nums[i] 结尾的最大子数组和",
      action: "关键是「以 i 结尾」而非「到 i 为止」",
    },
    {
      step: 2,
      title: "状态转移",
      thought: "要么继续之前的子数组，要么重新开始",
      action: "dp[i] = max(dp[i-1] + nums[i], nums[i])",
    },
    {
      step: 3,
      title: "记录全局最大",
      thought: "答案是所有 dp[i] 的最大值",
      action: "遍历时维护全局最大值",
    },
    {
      step: 4,
      title: "空间优化",
      thought: "只依赖前一个状态",
      action: "用变量代替数组",
    },
  ],
  codeWalkthrough: [
    {
      lineRange: [1, 2],
      explanation: "初始化：当前最大和、全局最大",
      keyPoint: "初始值都是第一个元素",
    },
    {
      lineRange: [3, 6],
      explanation: "遍历数组，更新当前最大和全局最大",
      keyPoint: "max(继续, 重新开始)",
    },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) - 一次遍历",
    spaceBreakdown: "O(1) - 只用常数空间",
    reasoning: "Kadane 算法是最优的线性时间解法",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "全局最大初始化为 0",
      wrongCode: "let maxSum = 0;",
      correctCode: "let maxSum = nums[0];",
      whyWrong: "如果数组全是负数，最大和也是负数，不应初始化为 0",
      howToAvoid: "初始化为第一个元素或 -Infinity",
    },
  ],
  interviewTips: [
    "分治法也能解决，复杂度 O(n log n)",
    "提及返回子数组本身而非和的变体",
  ],
  frontendApplications: [
    "性能分析：找连续时间段内的最大增益",
    "用户行为分析：找最活跃的连续时间段",
  ],
};

const maximumSubarrayGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "为什么状态是「以 i 结尾」而不是「到 i 为止」？",
      hint: "想想子数组的连续性",
      answer: "子数组必须连续，「以 i 结尾」保证了这个性质，方便决定是否继续扩展。",
      insight: "状态定义要匹配问题的约束",
    },
    {
      stage: "plan",
      question: "什么时候应该「重新开始」？",
      hint: "之前的累加和是什么情况？",
      answer: "当之前的累加和为负数时，继续加只会让当前值变小，不如重新开始。",
      insight: "负数累加和只会拖累后面的元素",
    },
  ],
  progressiveReveal: [
    {
      level: 1,
      content: "初始化",
      codeFragment: "let currentMax = nums[0];\nlet globalMax = nums[0];",
    },
    {
      level: 2,
      content: "遍历更新",
      codeFragment: "for (let i = 1; i < nums.length; i++) {\n  currentMax = Math.max(currentMax + nums[i], nums[i]);\n  globalMax = Math.max(globalMax, currentMax);\n}",
    },
    {
      level: 3,
      content: "完整解法",
      codeFragment: "function maxSubArray(nums: number[]): number {\n  let currentMax = nums[0];\n  let globalMax = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentMax = Math.max(currentMax + nums[i], nums[i]);\n    globalMax = Math.max(globalMax, currentMax);\n  }\n  return globalMax;\n}",
    },
  ],
  checkpoints: [
    {
      question: "[-2,1,-3,4,-1,2,1,-5,4] 的最大子数组和是？",
      options: ["4", "5", "6", "7"],
      correctAnswer: 2,
      explanation: "最大子数组是 [4,-1,2,1]，和为 6",
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
  "valid-anagram": validAnagramDeepExplanation,
  "merge-sorted-array": mergeSortedArrayDeepExplanation,
  "three-sum": threeSumDeepExplanation,
  "minimum-window-substring": minimumWindowSubstringDeepExplanation,
  "reverse-linked-list": reverseLinkedListDeepExplanation,
  "binary-tree-level-order-traversal": binaryTreeLevelOrderDeepExplanation,
  "climbing-stairs": climbingStairsDeepExplanation,
  "binary-search": binarySearchDeepExplanation,
  "lru-cache": lruCacheDeepExplanation,
  "subsets": subsetsDeepExplanation,
  "move-zeroes": moveZeroesDeepExplanation,
  "valid-palindrome": validPalindromeDeepExplanation,
  "first-unique-character-in-a-string": firstUniqueCharDeepExplanation,
  "two-sum-ii-input-array-is-sorted": twoSumIIDeepExplanation,
  "middle-of-the-linked-list": middleOfLinkedListDeepExplanation,
  "min-stack": minStackDeepExplanation,
  "daily-temperatures": dailyTemperaturesDeepExplanation,
  "merge-two-sorted-lists": mergeTwoSortedListsDeepExplanation,
  "binary-tree-inorder-traversal": binaryTreeInorderDeepExplanation,
  "maximum-depth-of-binary-tree": maxDepthBinaryTreeDeepExplanation,
  "invert-binary-tree": invertBinaryTreeDeepExplanation,
  "symmetric-tree": symmetricTreeDeepExplanation,
  "validate-binary-search-tree": validateBSTDeepExplanation,
  "house-robber": houseRobberDeepExplanation,
  "maximum-subarray": maximumSubarrayDeepExplanation,
};

export const guidedThinkings: Record<string, GuidedThinking> = {
  "two-sum": twoSumGuidedThinking,
  "longest-substring-without-repeating-characters": longestSubstringGuidedThinking,
  "container-with-most-water": containerWaterGuidedThinking,
  "valid-parentheses": validParenthesesGuidedThinking,
  "linked-list-cycle": linkedListCycleGuidedThinking,
  "valid-anagram": validAnagramGuidedThinking,
  "merge-sorted-array": mergeSortedArrayGuidedThinking,
  "three-sum": threeSumGuidedThinking,
  "minimum-window-substring": minimumWindowSubstringGuidedThinking,
  "reverse-linked-list": reverseLinkedListGuidedThinking,
  "binary-tree-level-order-traversal": binaryTreeLevelOrderGuidedThinking,
  "climbing-stairs": climbingStairsGuidedThinking,
  "binary-search": binarySearchGuidedThinking,
  "lru-cache": lruCacheGuidedThinking,
  "subsets": subsetsGuidedThinking,
  "move-zeroes": moveZeroesGuidedThinking,
  "valid-palindrome": validPalindromeGuidedThinking,
  "first-unique-character-in-a-string": firstUniqueCharGuidedThinking,
  "two-sum-ii-input-array-is-sorted": twoSumIIGuidedThinking,
  "middle-of-the-linked-list": middleOfLinkedListGuidedThinking,
  "min-stack": minStackGuidedThinking,
  "daily-temperatures": dailyTemperaturesGuidedThinking,
  "merge-two-sorted-lists": mergeTwoSortedListsGuidedThinking,
  "binary-tree-inorder-traversal": binaryTreeInorderGuidedThinking,
  "maximum-depth-of-binary-tree": maxDepthBinaryTreeGuidedThinking,
  "invert-binary-tree": invertBinaryTreeGuidedThinking,
  "symmetric-tree": symmetricTreeGuidedThinking,
  "validate-binary-search-tree": validateBSTGuidedThinking,
  "house-robber": houseRobberGuidedThinking,
  "maximum-subarray": maximumSubarrayGuidedThinking,
};

// ==================== #26 unique-paths 不同路径 ====================
const uniquePathsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "机器人只能向右或向下移动，从左上角到右下角的路径数",
    patternMatch: "到达任意格子的路径数 = 从上方来的路径数 + 从左方来的路径数",
    whyItWorks: "每个位置只能从上方或左方到达，利用加法原理，子问题的解可以组合成原问题的解",
    metaphor: "就像在网格城市中数从A区到B区的走法，每个路口的走法数等于从北边和西边来的走法之和",
  },
  thinkingProcess: [
    { step: 1, title: "理解问题本质", thought: "机器人只能右移或下移", action: "画出小规模网格，手动数路径" },
    { step: 2, title: "发现递推关系", thought: "到达(i,j)只能从(i-1,j)或(i,j-1)", action: "定义 dp[i][j] = 到达(i,j)的路径数" },
    { step: 3, title: "确定边界条件", thought: "第一行和第一列只有一种走法", action: "dp[0][j] = dp[i][0] = 1" },
    { step: 4, title: "填表顺序", thought: "从左到右，从上到下填表", action: "dp[i][j] = dp[i-1][j] + dp[i][j-1]" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "创建二维DP数组，所有值初始化为1（处理边界）", keyPoint: "边界初始化" },
    { lineRange: [3, 5], explanation: "从(1,1)开始遍历，每个格子的路径数等于上方和左方之和", keyPoint: "状态转移" },
    { lineRange: [6, 6], explanation: "返回右下角的值即为答案", keyPoint: "目标位置" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(m × n)，遍历整个网格一次",
    spaceBreakdown: "O(m × n)，可优化到 O(n) 只用一行",
    bestCase: "m=1 或 n=1 时，O(1) 只有一条路径",
    reasoning: "每个格子只计算一次，无重复计算",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "忘记初始化边界",
      wrongCode: "const dp = Array(m).fill(Array(n).fill(0))",
      correctCode: "const dp = Array.from({length: m}, () => Array(n).fill(1))",
      whyWrong: "第一行第一列应该是1，表示只有一种走法",
      howToAvoid: "先画出小网格手动验证边界情况",
    },
  ],
  interviewTips: [
    "可以用组合数学直接计算：C(m+n-2, m-1)",
    "空间优化版本只需要一行数组",
    "这是路径DP的基础模板，掌握后可解决带障碍版本",
  ],
  frontendApplications: [
    "表格/网格导航的路径计算",
    "游戏地图寻路算法的基础",
    "拖拽排序中的位置计算",
  ],
};

const uniquePathsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "机器人每一步可以做什么选择？这些选择之间有什么关系？",
      hint: "只能向右或向下",
      answer: "每一步只有两个选择：右移或下移，决策是独立的",
      insight: "有限选择 + 无后效性 = 动态规划适用",
    },
    {
      stage: "plan",
      question: "如何用子问题的解构建原问题的解？",
      hint: "到达某点的路径从哪里来？",
      answer: "到达(i,j)的路径 = 到达(i-1,j)的路径 + 到达(i,j-1)的路径",
      insight: "加法原理：互斥事件的方案数可以相加",
    },
  ],
  progressiveReveal: [
    { level: 1, content: "定义 dp[i][j] 表示从起点到(i,j)的路径数" },
    { level: 2, content: "状态转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]", codeFragment: "dp[i][j] = dp[i-1][j] + dp[i][j-1]" },
    { level: 3, content: "完整解法", codeFragment: "function uniquePaths(m: number, n: number): number {\n  const dp = Array.from({length: m}, () => Array(n).fill(1));\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = dp[i-1][j] + dp[i][j-1];\n    }\n  }\n  return dp[m-1][n-1];\n}" },
  ],
  checkpoints: [
    { question: "uniquePaths(3, 7) 的结果是？", options: ["21", "28", "35", "42"], correctAnswer: 1, explanation: "3×7网格有28条不同路径，等于C(8,2)=28" },
  ],
};

// ==================== #27 minimum-path-sum 最小路径和 ====================
const minimumPathSumDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "在网格中从左上到右下，找使路径上数字之和最小的路径",
    patternMatch: "到达每个格子的最小路径和 = 当前值 + min(上方最小和, 左方最小和)",
    whyItWorks: "最优子结构：全局最优路径必然包含到达前一格子的最优路径",
    metaphor: "像在地图上找最省费用的路线，每个路口选择之前总花费最少的方向继续",
  },
  thinkingProcess: [
    { step: 1, title: "分析约束", thought: "只能右移或下移，求最小和", action: "这是典型的路径DP问题" },
    { step: 2, title: "定义状态", thought: "dp[i][j] = 到达(i,j)的最小路径和", action: "状态表示包含了历史信息" },
    { step: 3, title: "推导转移", thought: "从上方或左方来，选更小的", action: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])" },
    { step: 4, title: "初始化", thought: "第一行只能从左来，第一列只能从上来", action: "累加边界值" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 3], explanation: "初始化第一行，只能从左边累加", keyPoint: "左边界处理" },
    { lineRange: [4, 6], explanation: "初始化第一列，只能从上边累加", keyPoint: "上边界处理" },
    { lineRange: [7, 11], explanation: "从(1,1)开始，每个位置取上方和左方的最小值加当前值", keyPoint: "状态转移" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(m × n)，每个格子访问一次",
    spaceBreakdown: "O(1) 原地修改，或 O(m × n) 使用额外数组",
    reasoning: "可以直接修改输入数组来节省空间",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "边界处理遗漏",
      wrongCode: "dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1])",
      correctCode: "// 需要单独处理 i=0 或 j=0 的情况",
      whyWrong: "第一行没有上方，第一列没有左方，会越界",
      howToAvoid: "先处理边界再处理内部",
    },
  ],
  interviewTips: [
    "可以原地修改输入数组，空间 O(1)",
    "与不同路径的区别：这里求最小和，不是计数",
    "扩展：如果可以斜着走呢？状态转移要加一项",
  ],
  frontendApplications: [
    "图片处理中的Seam Carving（缩放算法）",
    "CSS Grid布局中的路径计算",
    "游戏中的最短路径AI",
  ],
};

const minimumPathSumGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "这道题和「不同路径」有什么相似和不同？",
      hint: "约束相同，但目标不同",
      answer: "约束相同（只能右下移动），但这里求最小和而非路径数",
      insight: "相似的问题结构可以用相似的DP框架",
    },
    {
      stage: "plan",
      question: "为什么可以用贪心的思想（每步选最小）吗？",
      hint: "贪心只看当前，DP看全局",
      answer: "不能用简单贪心，因为局部最优不一定导致全局最优，需要DP考虑所有路径",
      insight: "但DP的状态转移中包含了「选最小」这个操作",
    },
  ],
  progressiveReveal: [
    { level: 1, content: "dp[i][j] = 到达(i,j)的最小路径和" },
    { level: 2, content: "dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])", codeFragment: "dp[i][j] = grid[i][j] + Math.min(dp[i-1][j], dp[i][j-1])" },
    { level: 3, content: "完整解法", codeFragment: "function minPathSum(grid: number[][]): number {\n  const m = grid.length, n = grid[0].length;\n  for (let i = 1; i < n; i++) grid[0][i] += grid[0][i-1];\n  for (let i = 1; i < m; i++) grid[i][0] += grid[i-1][0];\n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      grid[i][j] += Math.min(grid[i-1][j], grid[i][j-1]);\n    }\n  }\n  return grid[m-1][n-1];\n}" },
  ],
};

// ==================== #28 longest-common-subsequence 最长公共子序列 ====================
const longestCommonSubsequenceDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找两个字符串中都存在的最长子序列（不要求连续）",
    patternMatch: "如果当前字符相同就+1，否则取两种「放弃」情况的最大值",
    whyItWorks: "每个位置只有「匹配」和「不匹配」两种状态，可以递推构建解",
    metaphor: "像在两本书中找共同的关键词，保持相对顺序，词越多越好",
  },
  thinkingProcess: [
    { step: 1, title: "理解子序列", thought: "子序列不要求连续，但要保持相对顺序", action: "区分子序列和子串" },
    { step: 2, title: "定义状态", thought: "dp[i][j] = text1前i个字符和text2前j个字符的LCS长度", action: "二维DP" },
    { step: 3, title: "分析转移", thought: "若 text1[i-1] == text2[j-1] 则匹配", action: "匹配则+1，否则取max" },
    { step: 4, title: "边界", thought: "空字符串的LCS为0", action: "dp[0][j] = dp[i][0] = 0" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "创建(m+1)×(n+1)的DP数组，多一行一列处理边界", keyPoint: "维度+1技巧" },
    { lineRange: [3, 8], explanation: "字符相同则 dp[i][j] = dp[i-1][j-1] + 1", keyPoint: "匹配情况" },
    { lineRange: [9, 9], explanation: "字符不同则取 max(dp[i-1][j], dp[i][j-1])", keyPoint: "不匹配情况" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(m × n)，填满整个DP表",
    spaceBreakdown: "O(m × n)，可优化到 O(min(m,n))",
    reasoning: "每个状态只依赖于三个相邻状态",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "混淆子序列和子串",
      wrongCode: "// 以为必须连续匹配",
      correctCode: "// 子序列只需保持相对顺序，不需连续",
      whyWrong: "子串要求连续，子序列只要求相对顺序",
      howToAvoid: "明确题目定义，子序列可以跳过字符",
    },
  ],
  interviewTips: [
    "LCS是经典DP问题，变体很多（编辑距离等）",
    "可以扩展到打印具体的LCS序列",
    "如果要求连续，那就变成「最长公共子串」问题",
  ],
  frontendApplications: [
    "Diff算法的核心（Git/代码对比）",
    "文本相似度计算",
    "自动补全的匹配算法",
  ],
};

const longestCommonSubsequenceGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "子序列和子串有什么区别？",
      hint: "连续性",
      answer: "子串必须连续，子序列只需保持相对顺序",
      insight: "这个区别决定了状态转移的方式",
    },
    {
      stage: "plan",
      question: "当两个字符不匹配时，为什么要取 max 而不是直接等于前一个状态？",
      hint: "考虑 'ace' 和 'bce' 的情况",
      answer: "因为可能需要「跳过」当前字符继续匹配，有两种跳过方式",
      insight: "取max是在两种「放弃策略」中选更优的",
    },
  ],
  progressiveReveal: [
    { level: 1, content: "dp[i][j] = text1[0..i-1] 和 text2[0..j-1] 的LCS长度" },
    { level: 2, content: "如果 text1[i-1] == text2[j-1]：dp[i][j] = dp[i-1][j-1] + 1", codeFragment: "if (text1[i-1] === text2[j-1]) {\n  dp[i][j] = dp[i-1][j-1] + 1;\n}" },
    { level: 3, content: "完整解法", codeFragment: "function longestCommonSubsequence(text1: string, text2: string): number {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({length: m+1}, () => Array(n+1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i-1] === text2[j-1]) {\n        dp[i][j] = dp[i-1][j-1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n      }\n    }\n  }\n  return dp[m][n];\n}" },
  ],
};

// ==================== #29 search-in-rotated-sorted-array 搜索旋转排序数组 ====================
const searchRotatedArrayDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "数组在某点旋转后分成两个有序部分",
    patternMatch: "虽然整体无序，但每次二分后至少有一半是有序的",
    whyItWorks: "利用有序的那一半判断目标在哪边，缩小搜索范围",
    metaphor: "像在折叠过的尺子上找刻度，先判断折点位置，再在正确的半边找",
  },
  thinkingProcess: [
    { step: 1, title: "观察数组特性", thought: "旋转后有两段有序区间", action: "画图理解旋转效果" },
    { step: 2, title: "二分的关键", thought: "每次mid将数组分成两半，至少一半有序", action: "通过 nums[left] <= nums[mid] 判断左半是否有序" },
    { step: 3, title: "确定搜索方向", thought: "判断target在有序的那半还是无序的那半", action: "在有序区间用范围判断" },
    { step: 4, title: "边界处理", thought: "注意等号和边界条件", action: "用 <= 而非 <" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "标准二分初始化", keyPoint: "left和right的初始值" },
    { lineRange: [3, 5], explanation: "判断左半边是否有序（包括只有一个元素的情况）", keyPoint: "nums[left] <= nums[mid]" },
    { lineRange: [6, 10], explanation: "左半边有序时，判断target是否在左半边范围内", keyPoint: "范围判断" },
    { lineRange: [11, 15], explanation: "右半边有序时，判断target是否在右半边范围内", keyPoint: "对称处理" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(log n)，每次排除一半",
    spaceBreakdown: "O(1)，只用几个变量",
    worstCase: "即使有重复元素也是 O(log n)（本题无重复）",
    reasoning: "本质还是二分，只是判断条件更复杂",
  },
  commonMistakes: [
    {
      type: "boundary",
      description: "判断有序区间时漏掉等号",
      wrongCode: "if (nums[left] < nums[mid])",
      correctCode: "if (nums[left] <= nums[mid])",
      whyWrong: "当left==mid时（两个元素），左半边也算有序",
      howToAvoid: "考虑最小情况：两个元素时的行为",
    },
    {
      type: "logic",
      description: "target范围判断漏掉边界",
      wrongCode: "if (target > nums[left] && target < nums[mid])",
      correctCode: "if (target >= nums[left] && target < nums[mid])",
      whyWrong: "target可能正好等于nums[left]",
      howToAvoid: "边界值也是合法的搜索目标",
    },
  ],
  interviewTips: [
    "这是二分变体的经典题目，高频考点",
    "掌握「至少一半有序」的核心洞察",
    "变体：有重复元素怎么处理？找最小值怎么做？",
  ],
  frontendApplications: [
    "循环列表/轮播图中的元素查找",
    "日志文件中按时间戳搜索（可能跨天）",
    "环形缓冲区的数据查找",
  ],
};

const searchRotatedArrayGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "旋转后的数组有什么特殊性质？",
      hint: "画出 [4,5,6,7,0,1,2] 的示意图",
      answer: "分成两段各自有序的区间，前段的最小值大于后段的最大值",
      insight: "这个性质让我们可以用修改版的二分",
    },
    {
      stage: "plan",
      question: "如何确定应该往哪边继续搜索？",
      hint: "先判断哪半边是有序的",
      answer: "判断有序的那半边，看target是否在其范围内",
      insight: "在有序区间中可以用简单的范围判断",
    },
  ],
  progressiveReveal: [
    { level: 1, content: "每次二分，至少有一半是有序的" },
    { level: 2, content: "用 nums[left] <= nums[mid] 判断左半边是否有序", codeFragment: "if (nums[left] <= nums[mid]) {\n  // 左半边有序\n}" },
    { level: 3, content: "完整解法", codeFragment: "function search(nums: number[], target: number): number {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[left] <= nums[mid]) {\n      if (target >= nums[left] && target < nums[mid]) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    } else {\n      if (target > nums[mid] && target <= nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n  }\n  return -1;\n}" },
  ],
};

// ==================== #30 find-first-and-last-position 查找元素位置 ====================
const findFirstLastPositionDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "在有序数组中找target的第一个和最后一个位置",
    patternMatch: "两次二分：一次找左边界，一次找右边界",
    whyItWorks: "找左边界时「遇到相等继续向左」，找右边界时「遇到相等继续向右」",
    metaphor: "像在书架上找某系列书的第一本和最后一本，先定位范围再确定边界",
  },
  thinkingProcess: [
    { step: 1, title: "分解问题", thought: "分别找第一个和最后一个位置", action: "两次二分查找" },
    { step: 2, title: "找左边界", thought: "找到target时不停，继续向左找", action: "nums[mid] >= target 时 right = mid - 1" },
    { step: 3, title: "找右边界", thought: "找到target时不停，继续向右找", action: "nums[mid] <= target 时 left = mid + 1" },
    { step: 4, title: "验证结果", thought: "二分结束后验证找到的位置是否有效", action: "检查越界和值是否匹配" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 10], explanation: "findLeft: 找第一个 >= target 的位置", keyPoint: "left 最终指向第一个 >= target 的位置" },
    { lineRange: [11, 20], explanation: "findRight: 找最后一个 <= target 的位置", keyPoint: "right 最终指向最后一个 <= target 的位置" },
    { lineRange: [21, 25], explanation: "验证结果：检查找到的位置是否有效", keyPoint: "防止越界和值不匹配" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(log n)，两次二分",
    spaceBreakdown: "O(1)",
    reasoning: "虽然是两次二分，但每次都是 O(log n)，总体还是 O(log n)",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "找边界时更新错误",
      wrongCode: "// 找左边界：if (nums[mid] == target) return mid;",
      correctCode: "// 找左边界：if (nums[mid] >= target) right = mid - 1;",
      whyWrong: "找边界时即使相等也要继续找，不能直接返回",
      howToAvoid: "记住：找左边界向左收缩，找右边界向右收缩",
    },
  ],
  interviewTips: [
    "这是二分查找边界问题的标准题",
    "可以用一个通用的 findBound(isLeft) 函数",
    "变体：统计target出现次数 = right - left + 1",
  ],
  frontendApplications: [
    "日期范围筛选",
    "分页查询的边界计算",
    "区间选择组件的逻辑",
  ],
};

const findFirstLastPositionGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    {
      stage: "understand",
      question: "普通二分和找边界二分有什么区别？",
      hint: "找到target后的行为不同",
      answer: "普通二分找到就返回，边界二分找到后继续向一侧收缩",
      insight: "边界二分要「贪心」地往目标方向多走一步",
    },
    {
      stage: "plan",
      question: "如何用一次二分同时找到左右边界？",
      hint: "可以，但不如分开找清晰",
      answer: "分开找更清晰，且便于理解和调试",
      insight: "代码的可读性有时比微小的性能优化更重要",
    },
  ],
  progressiveReveal: [
    { level: 1, content: "问题拆解：分别找左边界和右边界" },
    { level: 2, content: "找左边界：nums[mid] >= target 时 right = mid - 1", codeFragment: "if (nums[mid] >= target) right = mid - 1;\nelse left = mid + 1;" },
    { level: 3, content: "完整解法", codeFragment: "function searchRange(nums: number[], target: number): number[] {\n  const findLeft = () => {\n    let l = 0, r = nums.length - 1, res = -1;\n    while (l <= r) {\n      const mid = Math.floor((l + r) / 2);\n      if (nums[mid] >= target) {\n        if (nums[mid] === target) res = mid;\n        r = mid - 1;\n      } else l = mid + 1;\n    }\n    return res;\n  };\n  const findRight = () => {\n    let l = 0, r = nums.length - 1, res = -1;\n    while (l <= r) {\n      const mid = Math.floor((l + r) / 2);\n      if (nums[mid] <= target) {\n        if (nums[mid] === target) res = mid;\n        l = mid + 1;\n      } else r = mid - 1;\n    }\n    return res;\n  };\n  return [findLeft(), findRight()];\n}" },
  ],
};

// ==================== #31 top-k-frequent-elements 前K个高频元素 ====================
const topKFrequentDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找出现次数最多的前K个元素",
    patternMatch: "先统计频率，再用堆或桶排序选出前K个",
    whyItWorks: "频率统计用哈希表 O(n)，堆维护前K个 O(n log k)",
    metaphor: "像统计班级里各科目最受欢迎的前K个老师，先数票再排名",
  },
  thinkingProcess: [
    { step: 1, title: "统计频率", thought: "用哈希表记录每个元素出现次数", action: "Map<number, count>" },
    { step: 2, title: "选择策略", thought: "如何高效找前K大？", action: "小顶堆/桶排序/快速选择" },
    { step: 3, title: "堆的思路", thought: "维护大小为K的小顶堆", action: "堆顶是第K大，小于它的被淘汰" },
    { step: 4, title: "桶排序思路", thought: "频率作为桶索引", action: "从高频桶往低频桶取K个" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 4], explanation: "用Map统计每个元素的频率", keyPoint: "O(n)遍历统计" },
    { lineRange: [5, 8], explanation: "桶排序：创建频率桶，索引表示频率", keyPoint: "bucket[freq] 存放频率为freq的元素" },
    { lineRange: [9, 15], explanation: "从高频桶向低频桶收集结果，直到收集K个", keyPoint: "O(n)遍历桶" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n) 桶排序方法，O(n log k) 堆方法",
    spaceBreakdown: "O(n) 存储频率和桶",
    reasoning: "桶排序利用频率范围有限的特性，更高效",
  },
  commonMistakes: [
    {
      type: "logic",
      description: "用排序而非堆",
      wrongCode: "frequencies.sort((a, b) => b[1] - a[1]).slice(0, k)",
      correctCode: "// 使用小顶堆维护前K个",
      whyWrong: "排序是 O(n log n)，堆是 O(n log k)，k 小时堆更快",
      howToAvoid: "当只需要前K个时，优先考虑堆或桶排序",
    },
  ],
  interviewTips: [
    "三种方法：排序 O(n log n)、堆 O(n log k)、桶排序 O(n)",
    "桶排序最快但需要额外空间",
    "JS没有内置堆，可以用数组模拟或用排序替代",
  ],
  frontendApplications: ["热搜榜/热门标签", "用户行为分析中的高频操作", "搜索关键词统计"],
};

const topKFrequentGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "这道题可以分解成哪两个子问题？", hint: "先做什么再做什么", answer: "1) 统计频率 2) 从频率中选前K大", insight: "复杂问题分解成简单子问题" },
    { stage: "plan", question: "为什么用小顶堆而不是大顶堆？", hint: "堆的大小是K", answer: "小顶堆堆顶是K个中最小的，新元素比它大才能进堆", insight: "维护前K大用小顶堆，维护前K小用大顶堆" },
  ],
  progressiveReveal: [
    { level: 1, content: "先用Map统计频率，再从频率中选前K大" },
    { level: 2, content: "桶排序：用频率作为索引", codeFragment: "const bucket: number[][] = Array.from({length: n + 1}, () => []);\nfor (const [num, freq] of freqMap) bucket[freq].push(num);" },
    { level: 3, content: "完整解法", codeFragment: "function topKFrequent(nums: number[], k: number): number[] {\n  const freqMap = new Map<number, number>();\n  for (const num of nums) freqMap.set(num, (freqMap.get(num) || 0) + 1);\n  const bucket: number[][] = Array.from({length: nums.length + 1}, () => []);\n  for (const [num, freq] of freqMap) bucket[freq].push(num);\n  const result: number[] = [];\n  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) result.push(...bucket[i]);\n  return result.slice(0, k);\n}" },
  ],
};

// ==================== #32 product-of-array-except-self 除自身以外数组的乘积 ====================
const productExceptSelfDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "result[i] = 左边所有数的乘积 × 右边所有数的乘积",
    patternMatch: "分别计算前缀积和后缀积，再相乘",
    whyItWorks: "把问题分解为「不包含自己」= 「左边的积」×「右边的积」",
    metaphor: "像计算班级除自己外其他人的总分，等于自己前面的人总分加上后面的人总分",
  },
  thinkingProcess: [
    { step: 1, title: "暴力思路", thought: "每个位置都遍历一遍？O(n²)", action: "题目要求O(n)，需要优化" },
    { step: 2, title: "前缀积", thought: "prefix[i] = nums[0] * ... * nums[i-1]", action: "一次遍历计算所有前缀积" },
    { step: 3, title: "后缀积", thought: "suffix[i] = nums[i+1] * ... * nums[n-1]", action: "一次遍历计算所有后缀积" },
    { step: 4, title: "空间优化", thought: "可以复用结果数组", action: "先存前缀积，再乘后缀积" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 4], explanation: "正向遍历，result[i]先存左边的乘积", keyPoint: "left累乘" },
    { lineRange: [5, 8], explanation: "反向遍历，result[i]乘上右边的乘积", keyPoint: "right累乘" },
    { lineRange: [9, 9], explanation: "返回结果数组", keyPoint: "原地计算节省空间" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，两次遍历", spaceBreakdown: "O(1)，结果数组不计入额外空间", reasoning: "前缀和后缀的思想广泛应用于数组问题" },
  commonMistakes: [
    { type: "logic", description: "边界初始化错误", wrongCode: "let left = 0;", correctCode: "let left = 1;", whyWrong: "乘法的单位元是1，不是0", howToAvoid: "想清楚累积运算的初始值" },
  ],
  interviewTips: ["关键是想到「前缀积×后缀积」的分解", "不能用除法（可能有0）", "空间优化版本是加分项"],
  frontendApplications: ["多维数据分析中的占比计算", "图表中除某一项外的总和/积", "性能指标的排除分析"],
};

const productExceptSelfGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么不能直接用总乘积除以当前元素？", hint: "考虑元素为0的情况", answer: "数组中可能有0，除法会出问题", insight: "题目约束往往暗示某些方法不可行" },
    { stage: "plan", question: "如何不用除法计算「除自身外的乘积」？", hint: "分成左边和右边", answer: "result[i] = 左边的乘积 × 右边的乘积", insight: "把「排除自己」分解为「自己左边」和「自己右边」" },
  ],
  progressiveReveal: [
    { level: 1, content: "result[i] = 左边所有数的乘积 × 右边所有数的乘积" },
    { level: 2, content: "先正向计算前缀积，再反向乘后缀积", codeFragment: "for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }\nfor (let i = n-1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }" },
    { level: 3, content: "完整解法", codeFragment: "function productExceptSelf(nums: number[]): number[] {\n  const n = nums.length, result = new Array(n);\n  let left = 1;\n  for (let i = 0; i < n; i++) { result[i] = left; left *= nums[i]; }\n  let right = 1;\n  for (let i = n - 1; i >= 0; i--) { result[i] *= right; right *= nums[i]; }\n  return result;\n}" },
  ],
};

// ==================== #33 permutations 全排列 ====================
const permutationsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "生成数组的所有排列方式",
    patternMatch: "回溯：每个位置尝试所有可能的数字，用used数组标记已使用",
    whyItWorks: "通过递归枚举每个位置的选择，回溯时撤销选择继续尝试",
    metaphor: "像安排n个人坐n个座位，每个座位依次选一个还没坐下的人",
  },
  thinkingProcess: [
    { step: 1, title: "理解排列", thought: "n个数的全排列有n!种", action: "需要枚举所有可能" },
    { step: 2, title: "递归结构", thought: "每层决定一个位置放什么", action: "选择→递归→撤销" },
    { step: 3, title: "标记已用", thought: "避免重复使用同一元素", action: "用Set或boolean数组" },
    { step: 4, title: "终止条件", thought: "当前排列长度等于n时收集结果", action: "push一份拷贝" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 3], explanation: "定义结果数组和回溯函数", keyPoint: "path存当前路径" },
    { lineRange: [4, 6], explanation: "递归终止：路径长度等于n时加入结果", keyPoint: "需要拷贝path" },
    { lineRange: [7, 12], explanation: "遍历所有数字，未使用的加入路径并递归", keyPoint: "选择→递归→撤销" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n × n!)，共n!个排列", spaceBreakdown: "O(n) 递归栈深度", reasoning: "排列总数是n!，这是问题的固有复杂度" },
  commonMistakes: [
    { type: "logic", description: "忘记复制path", wrongCode: "result.push(path)", correctCode: "result.push([...path])", whyWrong: "path会被后续修改，需要保存当前状态的快照", howToAvoid: "收集结果时始终拷贝当前路径" },
    { type: "logic", description: "忘记撤销选择", wrongCode: "path.push(num); backtrack();", correctCode: "path.push(num); backtrack(); path.pop();", whyWrong: "不撤销会导致路径持续增长", howToAvoid: "回溯三部曲：选择→递归→撤销" },
  ],
  interviewTips: ["回溯问题的经典模板", "与组合问题的区别：排列关注顺序", "有重复元素时需要排序+剪枝"],
  frontendApplications: ["密码生成器", "排列组合类的配置生成", "测试用例的穷举生成"],
};

const permutationsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "排列和组合有什么区别？", hint: "[1,2]和[2,1]是否相同？", answer: "排列考虑顺序，[1,2]≠[2,1]；组合不考虑顺序", insight: "这决定了回溯时的遍历起点不同" },
    { stage: "plan", question: "如何确保每个元素只使用一次？", hint: "需要记录状态", answer: "用used数组或Set标记已使用的元素", insight: "状态标记是回溯算法的关键技巧" },
  ],
  progressiveReveal: [
    { level: 1, content: "回溯框架：选择→递归→撤销" },
    { level: 2, content: "用Set标记已使用的元素", codeFragment: "if (used.has(num)) continue;\nused.add(num); path.push(num);\nbacktrack();\npath.pop(); used.delete(num);" },
    { level: 3, content: "完整解法", codeFragment: "function permute(nums: number[]): number[][] {\n  const result: number[][] = [], path: number[] = [], used = new Set<number>();\n  function backtrack() {\n    if (path.length === nums.length) { result.push([...path]); return; }\n    for (const num of nums) {\n      if (used.has(num)) continue;\n      used.add(num); path.push(num); backtrack(); path.pop(); used.delete(num);\n    }\n  }\n  backtrack();\n  return result;\n}" },
  ],
};

// ==================== #34 combination-sum 组合总和 ====================
const combinationSumDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找出所有和为target的组合，元素可以重复使用",
    patternMatch: "回溯+剪枝：尝试加入每个候选数，可重复选同一个",
    whyItWorks: "通过递归尝试所有可能，回溯时撤销并尝试下一个",
    metaphor: "像凑零钱，有不同面值的硬币，找出所有凑成目标金额的方式",
  },
  thinkingProcess: [
    { step: 1, title: "确定可重复", thought: "同一元素可以多次使用", action: "递归时从当前位置开始" },
    { step: 2, title: "回溯框架", thought: "选择→递归→撤销", action: "标准回溯模板" },
    { step: 3, title: "剪枝优化", thought: "当前和已超过target时停止", action: "提前返回" },
    { step: 4, title: "避免重复", thought: "如何避免[2,3]和[3,2]重复？", action: "只往后选" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 3], explanation: "排序数组，方便剪枝", keyPoint: "排序后小的在前" },
    { lineRange: [4, 6], explanation: "和等于target时收集结果", keyPoint: "找到有效组合" },
    { lineRange: [7, 12], explanation: "从start开始遍历，可以重复选同一个数", keyPoint: "递归时传i而非i+1" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n^(target/min))，指数级", spaceBreakdown: "O(target/min) 递归栈深度", reasoning: "最坏情况是用最小元素凑成target" },
  commonMistakes: [
    { type: "logic", description: "重复组合", wrongCode: "for (let i = 0; ...)", correctCode: "for (let i = start; ...)", whyWrong: "从0开始会产生[2,3]和[3,2]这样的重复组合", howToAvoid: "组合问题的start参数防止向前选择" },
  ],
  interviewTips: ["与排列的区别：组合不关心顺序", "与子集的区别：这里有target约束", "元素可重复用→递归传i；不可重复→传i+1"],
  frontendApplications: ["购物车凑单满减计算", "配置组合生成", "资源分配方案"],
};

const combinationSumGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "元素可以重复使用，这如何影响递归？", hint: "递归时的起始索引", answer: "递归时从当前索引i开始，而不是i+1", insight: "这样同一个元素可以被多次选择" },
    { stage: "plan", question: "如何避免生成重复的组合如[2,3]和[3,2]？", hint: "限制选择的方向", answer: "只向后选择，通过start参数控制遍历起点", insight: "组合问题的核心技巧：限制搜索方向" },
  ],
  progressiveReveal: [
    { level: 1, content: "回溯 + 剪枝，元素可重复选" },
    { level: 2, content: "从当前位置开始递归以允许重复", codeFragment: "for (let i = start; i < candidates.length; i++) {\n  path.push(candidates[i]);\n  backtrack(i, sum + candidates[i]); // 传i\n  path.pop();\n}" },
    { level: 3, content: "完整解法", codeFragment: "function combinationSum(candidates: number[], target: number): number[][] {\n  const result: number[][] = [];\n  candidates.sort((a, b) => a - b);\n  function backtrack(start: number, path: number[], sum: number) {\n    if (sum === target) { result.push([...path]); return; }\n    for (let i = start; i < candidates.length; i++) {\n      if (sum + candidates[i] > target) break;\n      path.push(candidates[i]); backtrack(i, path, sum + candidates[i]); path.pop();\n    }\n  }\n  backtrack(0, [], 0);\n  return result;\n}" },
  ],
};

// ==================== #35 find-all-anagrams-in-a-string 找到字符串中所有字母异位词 ====================
const findAllAnagramsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "找s中所有是p的异位词的子串起始索引",
    patternMatch: "滑动窗口 + 字符计数比较",
    whyItWorks: "窗口大小固定为p的长度，滑动时增删字符更新计数",
    metaphor: "像用一个固定大小的放大镜在字符串上滑动，每次检查镜内字符是否匹配",
  },
  thinkingProcess: [
    { step: 1, title: "理解异位词", thought: "字符相同，顺序不同", action: "字符频率统计相同即可" },
    { step: 2, title: "固定窗口", thought: "子串长度必须等于p", action: "窗口大小固定为p.length" },
    { step: 3, title: "滑动更新", thought: "窗口右移时左出右进", action: "增加右边字符，减少左边字符" },
    { step: 4, title: "匹配判断", thought: "如何快速比较两个频率表？", action: "用match计数跟踪匹配的字符种类" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 4], explanation: "初始化p的字符频率和窗口", keyPoint: "pCount记录目标频率" },
    { lineRange: [5, 10], explanation: "初始化第一个窗口", keyPoint: "前p个字符" },
    { lineRange: [11, 20], explanation: "滑动窗口，每次移动一位，更新频率并检查匹配", keyPoint: "左出右进" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，窗口滑动一次", spaceBreakdown: "O(1)，字符集大小固定(26个字母)", reasoning: "每个字符最多被访问两次" },
  commonMistakes: [
    { type: "boundary", description: "窗口大小理解错误", wrongCode: "// 用变长窗口", correctCode: "// 窗口大小始终等于 p.length", whyWrong: "异位词长度必须相等", howToAvoid: "这是定长滑动窗口问题" },
  ],
  interviewTips: ["与「最小覆盖子串」类似，但这是定长窗口", "优化：用数组代替Map更快", "可以只用一个频率数组（差值法）"],
  frontendApplications: ["搜索高亮中的模糊匹配", "拼写检查中的近似词检测", "DNA序列分析"],
};

const findAllAnagramsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "这道题和「最小覆盖子串」有什么区别？", hint: "窗口大小", answer: "这里是定长窗口（必须正好等于p的长度），那里是变长窗口", insight: "定长窗口更简单，滑动时左右同时移动" },
    { stage: "plan", question: "如何高效判断窗口内是否为异位词？", hint: "不用每次都完整比较", answer: "用match计数，跟踪有多少种字符的频率完全匹配", insight: "增量更新比全量比较更高效" },
  ],
  progressiveReveal: [
    { level: 1, content: "定长滑动窗口，窗口大小 = p.length" },
    { level: 2, content: "用数组统计字符频率", codeFragment: "const pCount = new Array(26).fill(0);\nfor (const c of p) pCount[c.charCodeAt(0) - 97]++;" },
    { level: 3, content: "完整解法", codeFragment: "function findAnagrams(s: string, p: string): number[] {\n  if (s.length < p.length) return [];\n  const result: number[] = [], pCount = new Array(26).fill(0), sCount = new Array(26).fill(0);\n  for (const c of p) pCount[c.charCodeAt(0) - 97]++;\n  for (let i = 0; i < s.length; i++) {\n    sCount[s.charCodeAt(i) - 97]++;\n    if (i >= p.length) sCount[s.charCodeAt(i - p.length) - 97]--;\n    if (i >= p.length - 1 && pCount.every((v, idx) => v === sCount[idx])) result.push(i - p.length + 1);\n  }\n  return result;\n}" },
  ],
};

// ==================== 最终导出（包含#26-#35）====================
// 将#26-#35添加到导出对象
Object.assign(deepExplanations, {
  "unique-paths": uniquePathsDeepExplanation,
  "minimum-path-sum": minimumPathSumDeepExplanation,
  "longest-common-subsequence": longestCommonSubsequenceDeepExplanation,
  "search-in-rotated-sorted-array": searchRotatedArrayDeepExplanation,
  "find-first-and-last-position-of-element-in-sorted-array": findFirstLastPositionDeepExplanation,
  "top-k-frequent-elements": topKFrequentDeepExplanation,
  "product-of-array-except-self": productExceptSelfDeepExplanation,
  "permutations": permutationsDeepExplanation,
  "combination-sum": combinationSumDeepExplanation,
  "find-all-anagrams-in-a-string": findAllAnagramsDeepExplanation,
});

Object.assign(guidedThinkings, {
  "unique-paths": uniquePathsGuidedThinking,
  "minimum-path-sum": minimumPathSumGuidedThinking,
  "longest-common-subsequence": longestCommonSubsequenceGuidedThinking,
  "search-in-rotated-sorted-array": searchRotatedArrayGuidedThinking,
  "find-first-and-last-position-of-element-in-sorted-array": findFirstLastPositionGuidedThinking,
  "top-k-frequent-elements": topKFrequentGuidedThinking,
  "product-of-array-except-self": productExceptSelfGuidedThinking,
  "permutations": permutationsGuidedThinking,
  "combination-sum": combinationSumGuidedThinking,
  "find-all-anagrams-in-a-string": findAllAnagramsGuidedThinking,
});

// ==================== #36 contains-duplicate 存在重复元素 ====================
const containsDuplicateDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "判断数组中是否存在重复元素",
    patternMatch: "使用Set记录已见过的元素，遇到重复立即返回",
    whyItWorks: "Set的查找是O(1)，遍历时检查是否已存在",
    metaphor: "像签到表，每人签到时检查是否已经签过",
  },
  thinkingProcess: [
    { step: 1, title: "暴力思路", thought: "两层循环比较每对元素", action: "O(n²)太慢" },
    { step: 2, title: "排序思路", thought: "排序后重复元素相邻", action: "O(n log n)" },
    { step: 3, title: "哈希表思路", thought: "用Set记录见过的元素", action: "O(n)时间O(n)空间" },
    { step: 4, title: "优化", thought: "边遍历边检查，提前返回", action: "最优情况O(1)" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "创建Set存储已见元素", keyPoint: "Set自动去重" },
    { lineRange: [3, 6], explanation: "遍历数组，检查是否已存在", keyPoint: "has()是O(1)" },
    { lineRange: [7, 7], explanation: "全部遍历完无重复", keyPoint: "返回false" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，最坏遍历整个数组", spaceBreakdown: "O(n)，存储所有不重复元素", bestCase: "O(1)，第一个元素就重复", reasoning: "哈希表查找O(1)" },
  commonMistakes: [
    { type: "complexity", description: "使用数组includes", wrongCode: "if (seen.includes(num))", correctCode: "if (seen.has(num))", whyWrong: "数组includes是O(n)，总体O(n²)", howToAvoid: "用Set的has()替代" },
  ],
  interviewTips: ["最简单的哈希表入门题", "也可以用 new Set(nums).size !== nums.length 一行解决", "考虑排序解法作为备选"],
  frontendApplications: ["表单验证中检测重复输入", "去重逻辑", "唯一性校验"],
};

const containsDuplicateGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么不用两层循环？", hint: "时间复杂度", answer: "两层循环O(n²)，数据量大时太慢", insight: "追求更优解是算法学习的核心" },
    { stage: "plan", question: "什么数据结构适合快速判断元素是否存在？", hint: "查找O(1)", answer: "Set或Map，哈希表查找O(1)", insight: "选择合适的数据结构是解题关键" },
  ],
  progressiveReveal: [
    { level: 1, content: "用Set记录已见过的元素" },
    { level: 2, content: "遍历时检查是否已存在", codeFragment: "const seen = new Set();\nfor (const num of nums) {\n  if (seen.has(num)) return true;\n  seen.add(num);\n}" },
    { level: 3, content: "完整解法", codeFragment: "function containsDuplicate(nums: number[]): boolean {\n  const seen = new Set<number>();\n  for (const num of nums) {\n    if (seen.has(num)) return true;\n    seen.add(num);\n  }\n  return false;\n}" },
  ],
};

// ==================== #37 remove-duplicates-from-sorted-array 删除有序数组中的重复项 ====================
const removeDuplicatesDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "原地删除有序数组中的重复元素，返回新长度",
    patternMatch: "双指针：慢指针记录不重复位置，快指针遍历",
    whyItWorks: "有序数组中重复元素相邻，快指针遇到不同值就写入慢指针位置",
    metaphor: "像整理书架，一个手指标记放书位置，另一个手指找不重复的书",
  },
  thinkingProcess: [
    { step: 1, title: "理解原地", thought: "不能用额外数组", action: "必须在原数组上操作" },
    { step: 2, title: "利用有序", thought: "有序意味着重复元素相邻", action: "只需比较相邻元素" },
    { step: 3, title: "双指针", thought: "slow指向下一个不重复位置，fast遍历", action: "fast遇到新值就复制到slow" },
    { step: 4, title: "返回长度", thought: "slow+1就是新数组长度", action: "返回slow+1" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "空数组特判，slow初始化为0", keyPoint: "第一个元素一定保留" },
    { lineRange: [3, 6], explanation: "fast遍历，遇到不同值就slow++并复制", keyPoint: "slow始终指向最后一个不重复元素" },
    { lineRange: [7, 7], explanation: "返回新长度", keyPoint: "slow+1" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，一次遍历", spaceBreakdown: "O(1)，原地操作", reasoning: "双指针是原地操作的经典技巧" },
  commonMistakes: [
    { type: "logic", description: "返回值错误", wrongCode: "return slow;", correctCode: "return slow + 1;", whyWrong: "slow是索引，长度要+1", howToAvoid: "返回前验证边界情况" },
  ],
  interviewTips: ["双指针原地操作的经典题", "有序是关键条件", "变体：允许重复k次怎么做？"],
  frontendApplications: ["数据去重优化", "内存敏感场景的原地处理", "流数据的实时去重"],
};

const removeDuplicatesGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "「原地」操作意味着什么？", hint: "空间限制", answer: "不能使用额外数组，只能在原数组上修改", insight: "原地操作常用双指针" },
    { stage: "plan", question: "有序数组的重复元素有什么特点？", hint: "位置关系", answer: "重复元素一定相邻", insight: "有序性简化了问题" },
  ],
  progressiveReveal: [
    { level: 1, content: "双指针：slow记录位置，fast遍历" },
    { level: 2, content: "遇到不同值就写入", codeFragment: "if (nums[fast] !== nums[slow]) {\n  slow++;\n  nums[slow] = nums[fast];\n}" },
    { level: 3, content: "完整解法", codeFragment: "function removeDuplicates(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  let slow = 0;\n  for (let fast = 1; fast < nums.length; fast++) {\n    if (nums[fast] !== nums[slow]) {\n      slow++;\n      nums[slow] = nums[fast];\n    }\n  }\n  return slow + 1;\n}" },
  ],
};

// ==================== #38 reverse-string 反转字符串 ====================
const reverseStringDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "原地反转字符数组",
    patternMatch: "双指针从两端向中间，交换字符",
    whyItWorks: "左右指针相遇时，所有字符都已交换到正确位置",
    metaphor: "像翻转纸牌，从两端同时向中间翻",
  },
  thinkingProcess: [
    { step: 1, title: "双指针", thought: "left从头，right从尾", action: "向中间移动" },
    { step: 2, title: "交换", thought: "交换left和right位置的字符", action: "使用临时变量或解构" },
    { step: 3, title: "终止条件", thought: "left >= right时停止", action: "奇数长度中间元素不用动" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "初始化左右指针", keyPoint: "两端开始" },
    { lineRange: [3, 6], explanation: "交换并移动指针", keyPoint: "ES6解构交换" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n/2) = O(n)", spaceBreakdown: "O(1)，原地操作", reasoning: "每个元素只被访问一次" },
  commonMistakes: [
    { type: "syntax", description: "交换时覆盖", wrongCode: "s[l] = s[r]; s[r] = s[l];", correctCode: "[s[l], s[r]] = [s[r], s[l]];", whyWrong: "第一次赋值已覆盖原值", howToAvoid: "用解构或临时变量" },
  ],
  interviewTips: ["最基础的双指针题", "原地反转是很多问题的子操作", "可以用递归但空间不是O(1)"],
  frontendApplications: ["字符串处理", "数组反转（Array.reverse的实现原理）", "回文检测的基础"],
};

const reverseStringGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么要原地反转？", hint: "题目要求", answer: "题目要求O(1)额外空间", insight: "双指针是原地操作的标准方法" },
    { stage: "plan", question: "两个指针如何移动？", hint: "对称", answer: "left向右，right向左，直到相遇", insight: "对称问题用双指针对向移动" },
  ],
  progressiveReveal: [
    { level: 1, content: "双指针从两端向中间" },
    { level: 2, content: "交换并移动", codeFragment: "[s[left], s[right]] = [s[right], s[left]];\nleft++;\nright--;" },
    { level: 3, content: "完整解法", codeFragment: "function reverseString(s: string[]): void {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n}" },
  ],
};

// ==================== #39 remove-nth-node-from-end-of-list 删除链表的倒数第N个结点 ====================
const removeNthFromEndDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "删除链表倒数第n个节点",
    patternMatch: "双指针：fast先走n步，然后同步移动，fast到末尾时slow在目标前一位",
    whyItWorks: "两指针保持n步距离，fast到末尾时slow刚好在倒数第n+1个位置",
    metaphor: "像用固定长度的尺子量链表，尺子一端到终点时，另一端就在目标位置",
  },
  thinkingProcess: [
    { step: 1, title: "计算长度？", thought: "可以先遍历算长度，但需要两次遍历", action: "寻找一次遍历的方法" },
    { step: 2, title: "双指针", thought: "fast先走n步拉开距离", action: "保持n步间隔" },
    { step: 3, title: "同步移动", thought: "fast到末尾时slow在目标前", action: "删除slow.next" },
    { step: 4, title: "边界", thought: "删除头节点怎么办？", action: "使用dummy节点" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "创建dummy节点指向head", keyPoint: "处理删除头节点的情况" },
    { lineRange: [3, 4], explanation: "fast先走n+1步", keyPoint: "多走一步让slow停在目标前一位" },
    { lineRange: [5, 8], explanation: "同步移动直到fast为null", keyPoint: "保持间隔" },
    { lineRange: [9, 10], explanation: "删除slow.next节点", keyPoint: "跳过目标节点" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，一次遍历", spaceBreakdown: "O(1)", reasoning: "双指针只需常数空间" },
  commonMistakes: [
    { type: "boundary", description: "忘记dummy节点", wrongCode: "let slow = head, fast = head;", correctCode: "let dummy = new ListNode(0, head);\nlet slow = dummy, fast = dummy;", whyWrong: "删除头节点时会出错", howToAvoid: "链表题常用dummy节点" },
  ],
  interviewTips: ["快慢指针的经典应用", "dummy节点是链表题的常用技巧", "变体：删除倒数第n到第m个节点"],
  frontendApplications: ["LRU缓存的链表操作", "历史记录管理", "撤销栈操作"],
};

const removeNthFromEndGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么不先遍历计算长度？", hint: "效率", answer: "可以，但需要两次遍历，双指针只需一次", insight: "一次遍历解决问题更优雅" },
    { stage: "plan", question: "fast需要先走几步？", hint: "考虑slow最终位置", answer: "走n+1步，这样slow停在目标前一位便于删除", insight: "删除节点需要知道前驱" },
  ],
  progressiveReveal: [
    { level: 1, content: "fast先走n+1步，然后同步移动" },
    { level: 2, content: "用dummy节点处理边界", codeFragment: "const dummy = new ListNode(0, head);\nlet slow = dummy, fast = dummy;\nfor (let i = 0; i <= n; i++) fast = fast.next;" },
    { level: 3, content: "完整解法", codeFragment: "function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n  const dummy = new ListNode(0, head);\n  let slow: ListNode = dummy, fast: ListNode | null = dummy;\n  for (let i = 0; i <= n; i++) fast = fast!.next;\n  while (fast) {\n    slow = slow.next!;\n    fast = fast.next;\n  }\n  slow.next = slow.next!.next;\n  return dummy.next;\n}" },
  ],
};

// ==================== #40 palindrome-linked-list 回文链表 ====================
const palindromeLinkedListDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "判断链表是否是回文",
    patternMatch: "快慢指针找中点 + 反转后半部分 + 比较",
    whyItWorks: "反转后半部分后，从两端向中间比较",
    metaphor: "把链表从中间折叠，看两边是否对称",
  },
  thinkingProcess: [
    { step: 1, title: "转数组？", thought: "可以，但空间O(n)", action: "寻找O(1)空间方法" },
    { step: 2, title: "找中点", thought: "快慢指针，fast走两步slow走一步", action: "slow最终在中点" },
    { step: 3, title: "反转后半", thought: "反转slow之后的部分", action: "用反转链表的方法" },
    { step: 4, title: "比较", thought: "从头和从反转后的中点比较", action: "不相等就不是回文" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 4], explanation: "快慢指针找中点", keyPoint: "fast到末尾时slow在中点" },
    { lineRange: [5, 10], explanation: "反转后半部分", keyPoint: "标准的反转链表" },
    { lineRange: [11, 15], explanation: "从两端比较", keyPoint: "有不同就返回false" },
  ],
  complexityAnalysis: { timeBreakdown: "O(n)，遍历3次（找中点、反转、比较）", spaceBreakdown: "O(1)，只用几个指针", reasoning: "原地反转不需要额外空间" },
  commonMistakes: [
    { type: "logic", description: "奇偶长度处理", wrongCode: "// 不考虑奇偶差异", correctCode: "// 奇数长度时中间节点不影响结果", whyWrong: "奇数长度的中间节点比较时会被跳过", howToAvoid: "画图分析奇偶情况" },
  ],
  interviewTips: ["综合了快慢指针和反转链表两个技巧", "面试时可以先说O(n)空间的解法，再优化", "可以选择恢复链表结构"],
  frontendApplications: ["数据校验", "对称性检测", "双向链表的简化检查"],
};

const palindromeLinkedListGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么不直接转成数组判断？", hint: "空间复杂度", answer: "转数组需要O(n)空间，原地操作只需O(1)", insight: "面试常追问空间优化" },
    { stage: "plan", question: "如何找链表中点？", hint: "快慢指针", answer: "快指针走两步，慢指针走一步，快到末尾时慢在中点", insight: "这是链表找中点的标准方法" },
  ],
  progressiveReveal: [
    { level: 1, content: "找中点 → 反转后半 → 比较" },
    { level: 2, content: "快慢指针找中点", codeFragment: "let slow = head, fast = head;\nwhile (fast && fast.next) {\n  slow = slow.next;\n  fast = fast.next.next;\n}" },
    { level: 3, content: "完整解法", codeFragment: "function isPalindrome(head: ListNode | null): boolean {\n  if (!head || !head.next) return true;\n  // 找中点\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next!;\n    fast = fast.next.next;\n  }\n  // 反转后半\n  let prev = null, curr: ListNode | null = slow;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  // 比较\n  let p1: ListNode | null = head, p2: ListNode | null = prev;\n  while (p2) {\n    if (p1!.val !== p2.val) return false;\n    p1 = p1!.next;\n    p2 = p2.next;\n  }\n  return true;\n}" },
  ],
};

// ==================== 添加#36-#40到导出 ====================
Object.assign(deepExplanations, {
  "contains-duplicate": containsDuplicateDeepExplanation,
  "remove-duplicates-from-sorted-array": removeDuplicatesDeepExplanation,
  "reverse-string": reverseStringDeepExplanation,
  "remove-nth-node-from-end-of-list": removeNthFromEndDeepExplanation,
  "palindrome-linked-list": palindromeLinkedListDeepExplanation,
});

Object.assign(guidedThinkings, {
  "contains-duplicate": containsDuplicateGuidedThinking,
  "remove-duplicates-from-sorted-array": removeDuplicatesGuidedThinking,
  "reverse-string": reverseStringGuidedThinking,
  "remove-nth-node-from-end-of-list": removeNthFromEndGuidedThinking,
  "palindrome-linked-list": palindromeLinkedListGuidedThinking,
});

// ==================== #41 trapping-rain-water 接雨水 ====================
const trappingRainWaterDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "每个位置能接的水量 = min(左边最高, 右边最高) - 当前高度",
    patternMatch: "双指针：从两端向中间，维护左右最大值",
    whyItWorks: "较低一侧的水量由其最大值决定，可以确定地计算",
    metaphor: "想象下雨后的积水，每个位置的水位由两侧最高的「墙」决定",
  },
  thinkingProcess: [
    { step: 1, title: "暴力思路", thought: "每个位置分别找左右最大值", action: "O(n²) 太慢" },
    { step: 2, title: "预处理", thought: "提前计算每个位置的左右最大值数组", action: "O(n) 时间，O(n) 空间" },
    { step: 3, title: "双指针优化", thought: "左右指针向中间移动，动态维护最大值", action: "O(n) 时间，O(1) 空间" },
    { step: 4, title: "关键洞察", thought: "较低一侧的水量可以直接确定", action: "移动较低一侧的指针" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 3], explanation: "初始化双指针和左右最大值", keyPoint: "左右指针从两端开始" },
    { lineRange: [4, 6], explanation: "更新左右最大值", keyPoint: "动态维护到当前位置的最大高度" },
    { lineRange: [7, 12], explanation: "计算水量并移动指针", keyPoint: "较低一侧可以确定水量" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n)，每个位置最多访问一次",
    spaceBreakdown: "O(1)，只用几个变量",
    reasoning: "双指针从两端向中间移动，每步确定一个位置的水量"
  },
  commonMistakes: [
    { type: "logic", description: "理解错水量计算", wrongCode: "water += leftMax - height[left];", correctCode: "water += leftMax - height[left]; // 只在 leftMax < rightMax 时", whyWrong: "只有较低一侧才能确定水量", howToAvoid: "画图理解木桶原理" },
    { type: "boundary", description: "忘记更新最大值在计算之前", wrongCode: "water += leftMax - height[left];\nleftMax = Math.max(...);", correctCode: "leftMax = Math.max(leftMax, height[left]);\nwater += leftMax - height[left];", whyWrong: "当前位置可能是新的最大值", howToAvoid: "先更新再计算" },
  ],
  interviewTips: [
    "这是面试Hard题的经典代表",
    "可以用单调栈解法作为变体讨论",
    "先说O(n)空间的预处理方法，再优化到O(1)",
    "类似题目：盛最多水的容器",
  ],
  frontendApplications: [
    "瀑布流布局中的空间计算",
    "时间轴上的重叠区域计算",
    "图表中的面积计算",
  ],
};

const trappingRainWaterGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "每个位置能接多少水取决于什么？", hint: "两侧的高度", answer: "取决于左右两侧最高的柱子中较矮的那个", insight: "木桶原理：短板决定水位" },
    { stage: "plan", question: "为什么双指针可以只用O(1)空间？", hint: "较低一侧的水量", answer: "较低一侧的水量由其一侧的最大值决定，不需要知道另一侧的精确值", insight: "巧妙利用「至少」的性质" },
    { stage: "optimize", question: "还有什么其他解法？", hint: "数据结构", answer: "单调递减栈，按层计算水量", insight: "不同思路可能有相同复杂度" },
  ],
  progressiveReveal: [
    { level: 1, content: "每个位置水量 = min(左max, 右max) - height[i]" },
    { level: 2, content: "双指针从两端向中间，维护leftMax和rightMax", codeFragment: "let left = 0, right = height.length - 1;\nlet leftMax = 0, rightMax = 0;\nlet water = 0;" },
    { level: 3, content: "完整解法", codeFragment: "function trap(height: number[]): number {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0;\n  let water = 0;\n  \n  while (left < right) {\n    leftMax = Math.max(leftMax, height[left]);\n    rightMax = Math.max(rightMax, height[right]);\n    \n    if (leftMax < rightMax) {\n      water += leftMax - height[left];\n      left++;\n    } else {\n      water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}" },
  ],
  checkpoints: [
    { question: "leftMax < rightMax 时为什么可以确定左边的水量？", options: ["因为左边较低所以先算", "因为右边至少有 rightMax 那么高，左边水量由 leftMax 决定", "随便哪边都行"], correctAnswer: 1, explanation: "右边至少有 rightMax 那么高，所以左边的水位由 leftMax 决定，可以直接计算" },
    { question: "如果所有柱子高度相同会怎样？", options: ["水量为0", "水量等于柱子数", "无法计算"], correctAnswer: 0, explanation: "当所有高度相同时，leftMax - height[i] 总是 0，所以不会有积水" },
  ],
};

// ==================== #42 coin-change 零钱兑换 ====================
const coinChangeDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "凑出目标金额的最少硬币数",
    patternMatch: "完全背包DP：dp[i] = min(dp[i], dp[i-coin] + 1)",
    whyItWorks: "每个金额的最优解可由更小金额的最优解推导",
    metaphor: "像爬楼梯，每次可以跨多种步数，求最少步数到达目标",
  },
  thinkingProcess: [
    { step: 1, title: "贪心可行吗", thought: "优先用大面额？不一定最优", action: "如 coins=[1,3,4], amount=6, 贪心得4+1+1=3枚，最优是3+3=2枚" },
    { step: 2, title: "定义状态", thought: "dp[i] = 凑出金额i的最少硬币数", action: "从0到amount遍历" },
    { step: 3, title: "状态转移", thought: "每种硬币都尝试", action: "dp[i] = min(dp[i], dp[i-coin] + 1)" },
    { step: 4, title: "初始化", thought: "dp[0]=0，其他为无穷大", action: "0元需要0枚硬币" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "初始化dp数组为Infinity", keyPoint: "dp[0]=0是base case" },
    { lineRange: [3, 8], explanation: "遍历金额，尝试每种硬币", keyPoint: "内层循环遍历硬币" },
    { lineRange: [9, 10], explanation: "返回结果或-1", keyPoint: "仍为Infinity表示凑不出" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(amount × coins.length)",
    spaceBreakdown: "O(amount)",
    reasoning: "一维DP数组，每个金额尝试所有硬币"
  },
  commonMistakes: [
    { type: "logic", description: "用贪心算法", wrongCode: "// 总是先用最大面额", correctCode: "// 使用动态规划尝试所有可能", whyWrong: "贪心不保证最优", howToAvoid: "想反例：[1,3,4], 6" },
    { type: "boundary", description: "忘记判断无解", wrongCode: "return dp[amount];", correctCode: "return dp[amount] === Infinity ? -1 : dp[amount];", whyWrong: "可能凑不出目标金额", howToAvoid: "检查是否仍为初始值" },
  ],
  interviewTips: [
    "经典的完全背包问题变体",
    "面试时先解释为什么贪心不行",
    "可以讨论BFS解法：层数就是硬币数",
    "变体：硬币组合数（ways而非min）",
  ],
  frontendApplications: [
    "购物车凑单计算",
    "资源分配最优化",
    "缓存预算分配",
  ],
};

const coinChangeGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么不能贪心地优先使用大面额？", hint: "举反例", answer: "coins=[1,3,4], amount=6，贪心得4+1+1=3枚，但3+3=2枚更优", insight: "贪心的局部最优不等于全局最优" },
    { stage: "plan", question: "dp[i]的含义是什么？", hint: "子问题", answer: "凑出金额i需要的最少硬币数", insight: "大问题由小问题推导" },
    { stage: "code", question: "为什么初始化为Infinity而不是-1？", hint: "求最小值", answer: "方便取min操作，-1需要特殊判断", insight: "选择合适的哨兵值简化逻辑" },
  ],
  progressiveReveal: [
    { level: 1, content: "dp[i] = 凑出金额i的最少硬币数" },
    { level: 2, content: "dp[i] = min(dp[i], dp[i-coin] + 1)", codeFragment: "for (const coin of coins) {\n  if (i >= coin) {\n    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n  }\n}" },
    { level: 3, content: "完整解法", codeFragment: "function coinChange(coins: number[], amount: number): number {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  \n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i >= coin) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  \n  return dp[amount] === Infinity ? -1 : dp[amount];\n}" },
  ],
  checkpoints: [
    { question: "如果coins=[2], amount=3会怎样？", options: ["返回1", "返回-1，因为无法用2凑出3", "返回2"], correctAnswer: 1, explanation: "只有面额2的硬币无法凑出奇数金额3" },
    { question: "可以用BFS解吗？", options: ["不可以", "可以，从0开始BFS到amount，层数就是硬币数", "只能用DFS"], correctAnswer: 1, explanation: "BFS从0开始，每次加一个硬币面额，最先到达amount的路径就是最少硬币数" },
  ],
};

// ==================== #43 word-break 单词拆分 ====================
const wordBreakDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "判断字符串能否被词典中的单词完全拆分",
    patternMatch: "DP：dp[i] = 前i个字符能否被拆分",
    whyItWorks: "如果前j个字符可拆分，且s[j:i]在词典中，则前i个字符可拆分",
    metaphor: "像接龙游戏，看能否用词典里的词接满整个字符串",
  },
  thinkingProcess: [
    { step: 1, title: "回溯尝试", thought: "从头开始尝试每个可能的单词", action: "可能超时，需要记忆化" },
    { step: 2, title: "DP思路", thought: "dp[i]表示s[0:i]能否拆分", action: "遍历所有可能的分割点" },
    { step: 3, title: "状态转移", thought: "枚举j，检查dp[j]和s[j:i]", action: "dp[i] = dp[j] && wordDict.has(s[j:i])" },
    { step: 4, title: "优化查找", thought: "用Set存储词典加速查找", action: "O(1)查询" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "初始化dp数组和词典Set", keyPoint: "dp[0]=true表示空串可拆分" },
    { lineRange: [3, 5], explanation: "双重循环遍历所有分割点", keyPoint: "i是结束位置，j是分割位置" },
    { lineRange: [6, 9], explanation: "检查条件并更新dp", keyPoint: "dp[j]为真且子串在词典中" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n² × k)，n是字符串长度，k是单词平均长度",
    spaceBreakdown: "O(n + m)，dp数组和词典Set",
    reasoning: "双重循环枚举分割，子串操作O(k)"
  },
  commonMistakes: [
    { type: "logic", description: "忘记dp[0]=true", wrongCode: "dp[0] = false;", correctCode: "dp[0] = true;", whyWrong: "空前缀是有效的起点", howToAvoid: "空串是base case" },
    { type: "boundary", description: "子串索引错误", wrongCode: "s.slice(j, i-1)", correctCode: "s.slice(j, i)", whyWrong: "slice是左闭右开", howToAvoid: "仔细检查索引范围" },
  ],
  interviewTips: [
    "可以先说回溯+记忆化，再转为DP",
    "变体：返回所有可能的拆分方式",
    "优化：按单词最大长度限制j的范围",
    "类似题目：完美平方数",
  ],
  frontendApplications: [
    "富文本编辑器的分词",
    "搜索建议的词组匹配",
    "国际化中的词语拆分",
  ],
};

const wordBreakGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么简单的贪心匹配不行？", hint: "考虑重叠情况", answer: "如s='catsandog', dict=['cats','dog','sand','and','cat']，贪心匹配cats后剩下andog无法完成", insight: "需要尝试所有可能的拆分点" },
    { stage: "plan", question: "dp[0]为什么是true？", hint: "边界条件", answer: "空串认为是可以拆分的，作为递推的起点", insight: "空集/空串通常是特殊的base case" },
    { stage: "optimize", question: "如何优化时间复杂度？", hint: "限制j的范围", answer: "j只需要从max(0, i-maxWordLen)开始，因为太长的子串不可能在词典中", insight: "利用问题的约束剪枝" },
  ],
  progressiveReveal: [
    { level: 1, content: "dp[i] = s的前i个字符能否被拆分" },
    { level: 2, content: "枚举分割点j，检查dp[j]和s[j:i]", codeFragment: "for (let j = 0; j < i; j++) {\n  if (dp[j] && wordSet.has(s.slice(j, i))) {\n    dp[i] = true;\n    break;\n  }\n}" },
    { level: 3, content: "完整解法", codeFragment: "function wordBreak(s: string, wordDict: string[]): boolean {\n  const wordSet = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  \n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordSet.has(s.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  \n  return dp[s.length];\n}" },
  ],
  checkpoints: [
    { question: "s='applepenapple', dict=['apple','pen']能拆分吗？", options: ["不能", "能，apple + pen + apple", "需要更多单词"], correctAnswer: 1, explanation: "可以拆分为 apple + pen + apple 三个词典中的单词" },
    { question: "为什么找到一个有效分割就break？", options: ["为了效率", "只需判断能否拆分，不需要所有方案", "防止死循环"], correctAnswer: 1, explanation: "题目只要求判断是否能拆分，找到一种方案即可，不需要枚举所有方案" },
  ],
};

// ==================== #44 merge-intervals 合并区间 ====================
const mergeIntervalsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "合并有重叠的区间",
    patternMatch: "排序 + 贪心：按起点排序后顺序合并",
    whyItWorks: "排序后只需比较当前区间和上一个合并结果",
    metaphor: "像整理重叠的时间段，把能连起来的合成一个",
  },
  thinkingProcess: [
    { step: 1, title: "何时重叠", thought: "两区间重叠条件", action: "前一个的end >= 后一个的start" },
    { step: 2, title: "为什么排序", thought: "按起点排序后问题变简单", action: "只需考虑相邻区间" },
    { step: 3, title: "如何合并", thought: "重叠时更新end为较大值", action: "不重叠时直接加入结果" },
    { step: 4, title: "一次遍历", thought: "维护当前正在构建的区间", action: "遍历更新或添加" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 2], explanation: "按起点排序", keyPoint: "确保有序处理" },
    { lineRange: [3, 4], explanation: "初始化结果数组", keyPoint: "放入第一个区间" },
    { lineRange: [5, 12], explanation: "遍历合并", keyPoint: "重叠更新end，否则添加新区间" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(n log n)，主要是排序",
    spaceBreakdown: "O(log n) 或 O(n)，取决于排序实现",
    reasoning: "排序后一次遍历"
  },
  commonMistakes: [
    { type: "logic", description: "忘记更新end为较大值", wrongCode: "last[1] = curr[1];", correctCode: "last[1] = Math.max(last[1], curr[1]);", whyWrong: "当前区间可能被完全包含", howToAvoid: "考虑[1,4]和[2,3]的情况" },
    { type: "boundary", description: "未处理空数组", wrongCode: "// 直接开始遍历", correctCode: "if (intervals.length === 0) return [];", whyWrong: "空数组取intervals[0]会报错", howToAvoid: "先处理边界" },
  ],
  interviewTips: [
    "区间问题通常先排序",
    "可以讨论按起点还是终点排序的区别",
    "变体：插入区间、区间交集",
    "注意处理完全包含的情况",
  ],
  frontendApplications: [
    "日历应用的时间段合并",
    "视频进度条的已观看区间合并",
    "多选范围的合并处理",
  ],
};

const mergeIntervalsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "为什么要先排序？", hint: "简化问题", answer: "排序后只需考虑相邻区间是否重叠，不需要比较所有对", insight: "排序是区间问题的常用预处理" },
    { stage: "plan", question: "[1,4]和[2,3]如何合并？", hint: "谁包含谁", answer: "合并为[1,4]，因为[2,3]完全在[1,4]内", insight: "合并时end取较大值" },
    { stage: "code", question: "能否原地修改？", hint: "双指针", answer: "可以用双指针原地合并，但增加了复杂度，面试时返回新数组更清晰", insight: "权衡代码可读性和空间效率" },
  ],
  progressiveReveal: [
    { level: 1, content: "按起点排序，然后顺序合并" },
    { level: 2, content: "重叠条件：last[1] >= curr[0]", codeFragment: "if (last[1] >= intervals[i][0]) {\n  last[1] = Math.max(last[1], intervals[i][1]);\n} else {\n  result.push(intervals[i]);\n}" },
    { level: 3, content: "完整解法", codeFragment: "function merge(intervals: number[][]): number[][] {\n  if (intervals.length === 0) return [];\n  \n  intervals.sort((a, b) => a[0] - b[0]);\n  const result: number[][] = [intervals[0]];\n  \n  for (let i = 1; i < intervals.length; i++) {\n    const last = result[result.length - 1];\n    const curr = intervals[i];\n    \n    if (last[1] >= curr[0]) {\n      last[1] = Math.max(last[1], curr[1]);\n    } else {\n      result.push(curr);\n    }\n  }\n  \n  return result;\n}" },
  ],
  checkpoints: [
    { question: "[[1,4],[0,4]]排序后是什么？", options: ["[[1,4],[0,4]]保持不变", "[[0,4],[1,4]]，按起点排序", "[[0,4]]直接合并"], correctAnswer: 1, explanation: "按区间起点升序排序，0 < 1，所以[0,4]排在前面" },
    { question: "[[1,4],[4,5]]算重叠吗？", options: ["不算，只是相邻", "算，因为1≤4≤4，合并为[1,5]", "需要看具体定义"], correctAnswer: 1, explanation: "当 last[1] >= curr[0] 时认为重叠，4 >= 4 满足条件" },
  ],
};

// ==================== #45 letter-combinations-of-a-phone-number 电话号码的字母组合 ====================
const letterCombinationsDeepExplanation: DeepExplanation = {
  intuition: {
    observation: "给定数字字符串，返回所有可能的字母组合",
    patternMatch: "回溯/DFS：每个数字对应多个字母，穷举所有组合",
    whyItWorks: "决策树的遍历，每层选择一个字母",
    metaphor: "像老式手机打字，每个数字键对应多个字母的排列组合",
  },
  thinkingProcess: [
    { step: 1, title: "建立映射", thought: "每个数字对应的字母", action: "用对象或数组存储映射" },
    { step: 2, title: "回溯框架", thought: "每一步选择一个字母", action: "递归处理下一个数字" },
    { step: 3, title: "递归终止", thought: "处理完所有数字", action: "当前组合加入结果" },
    { step: 4, title: "边界处理", thought: "空字符串输入", action: "返回空数组" },
  ],
  codeWalkthrough: [
    { lineRange: [1, 4], explanation: "建立数字到字母的映射", keyPoint: "注意1不映射任何字母" },
    { lineRange: [5, 8], explanation: "回溯函数定义", keyPoint: "index跟踪当前处理的数字" },
    { lineRange: [9, 14], explanation: "遍历当前数字的所有字母并递归", keyPoint: "选择-递归-撤销选择" },
  ],
  complexityAnalysis: {
    timeBreakdown: "O(4^n × n)，n是数字个数，最多4个字母",
    spaceBreakdown: "O(n)，递归栈深度",
    reasoning: "每个数字最多4种选择，共n层"
  },
  commonMistakes: [
    { type: "boundary", description: "未处理空输入", wrongCode: "// 直接开始回溯", correctCode: "if (digits.length === 0) return [];", whyWrong: "空字符串应返回[]而非['']", howToAvoid: "先处理边界情况" },
    { type: "logic", description: "映射表错误", wrongCode: "'7': 'pqrs', '9': 'xyz'", correctCode: "'7': 'pqrs', '9': 'wxyz'", whyWrong: "7和9对应4个字母", howToAvoid: "仔细检查映射关系" },
  ],
  interviewTips: [
    "经典的回溯入门题",
    "可以用迭代BFS方式解决",
    "面试时先画决策树再写代码",
    "讨论时间复杂度时注意4^n的来源",
  ],
  frontendApplications: [
    "搜索建议的多音字处理",
    "表单多选项的组合生成",
    "路由参数的所有可能组合",
  ],
};

const letterCombinationsGuidedThinking: GuidedThinking = {
  socraticQuestions: [
    { stage: "understand", question: "这是排列问题还是组合问题？", hint: "顺序", answer: "是组合问题，每个数字位置选一个字母，按顺序组成字符串", insight: "区分排列和组合是回溯题的第一步" },
    { stage: "plan", question: "回溯的终止条件是什么？", hint: "什么时候收集结果", answer: "当处理完所有数字时（index === digits.length）", insight: "终止条件对应决策树的叶子节点" },
    { stage: "code", question: "可以用迭代解吗？", hint: "BFS思路", answer: "可以，从空字符串开始，每次为每个现有组合加上新数字对应的每个字母", insight: "回溯和BFS通常可以互转" },
  ],
  progressiveReveal: [
    { level: 1, content: "建立映射，回溯穷举所有组合" },
    { level: 2, content: "每层选择当前数字对应的一个字母", codeFragment: "const letters = phoneMap[digits[index]];\nfor (const letter of letters) {\n  backtrack(index + 1, path + letter);\n}" },
    { level: 3, content: "完整解法", codeFragment: "function letterCombinations(digits: string): string[] {\n  if (digits.length === 0) return [];\n  \n  const phoneMap: Record<string, string> = {\n    '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n    '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'\n  };\n  \n  const result: string[] = [];\n  \n  function backtrack(index: number, path: string) {\n    if (index === digits.length) {\n      result.push(path);\n      return;\n    }\n    \n    const letters = phoneMap[digits[index]];\n    for (const letter of letters) {\n      backtrack(index + 1, path + letter);\n    }\n  }\n  \n  backtrack(0, '');\n  return result;\n}" },
  ],
  checkpoints: [
    { question: "digits='23'有多少种组合？", options: ["6种", "9种：ad,ae,af,bd,be,bf,cd,ce,cf", "8种"], correctAnswer: 1, explanation: "2对应abc(3个)，3对应def(3个)，共3×3=9种组合" },
    { question: "为什么这道题不需要used数组？", options: ["因为字母可以重复使用", "因为每个数字位置只选择一次，用index控制即可", "需要used数组"], correctAnswer: 1, explanation: "每个数字位置只会被处理一次，用index递增控制，不会重复选择" },
  ],
};

// ==================== 添加#41-#45到导出 ====================
Object.assign(deepExplanations, {
  "trapping-rain-water": trappingRainWaterDeepExplanation,
  "coin-change": coinChangeDeepExplanation,
  "word-break": wordBreakDeepExplanation,
  "merge-intervals": mergeIntervalsDeepExplanation,
  "letter-combinations-of-a-phone-number": letterCombinationsDeepExplanation,
});

Object.assign(guidedThinkings, {
  "trapping-rain-water": trappingRainWaterGuidedThinking,
  "coin-change": coinChangeGuidedThinking,
  "word-break": wordBreakGuidedThinking,
  "merge-intervals": mergeIntervalsGuidedThinking,
  "letter-combinations-of-a-phone-number": letterCombinationsGuidedThinking,
});
