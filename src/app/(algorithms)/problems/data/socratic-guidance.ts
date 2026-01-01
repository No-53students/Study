// ============================================================================
// 苏格拉底式思维引导体系
// 通过提问引导学习者自主发现解决方案
// ============================================================================

export interface SocraticQuestion {
  id: string;
  question: string;
  purpose: string; // 为什么要问这个问题
  expectedInsight: string; // 期望学习者得到的洞察
  followUpOnYes?: string; // 如果回答是，接着问什么
  followUpOnNo?: string; // 如果回答否，接着问什么
  hint?: string; // 如果学习者卡住了，提供的提示
}

export interface ThinkingStage {
  stage: string;
  name: string;
  description: string;
  questions: SocraticQuestion[];
  commonMistakes: string[];
  breakthrough: string; // 这个阶段的关键突破点
}

export interface ProblemGuidance {
  problemId: string;
  problemName: string;
  category: string;
  stages: ThinkingStage[];
  masterInsight: string; // 掌握这道题后应该获得的核心洞察
  transferableSkills: string[]; // 可迁移到哪些问题
}

// ============================================================================
// 通用思维引导框架
// ============================================================================

export const universalThinkingFramework: ThinkingStage[] = [
  {
    stage: "understand",
    name: "理解问题",
    description: "确保完全理解题目要求",
    questions: [
      {
        id: "u1",
        question: "你能用自己的话复述这道题目吗？",
        purpose: "确保理解题意，而不是直接跳到解法",
        expectedInsight: "清晰理解输入、输出和约束条件",
        hint: "试着给一个不懂编程的朋友解释这道题",
      },
      {
        id: "u2",
        question: "输入是什么？输出是什么？有什么约束条件？",
        purpose: "明确问题边界",
        expectedInsight: "识别出数据范围、特殊情况",
        hint: "看看题目中的 constraints 部分",
      },
      {
        id: "u3",
        question: "你能举一个简单的例子，手动走一遍吗？",
        purpose: "通过具体例子理解问题",
        expectedInsight: "发现问题的模式和规律",
        hint: "用题目给的第一个示例，一步一步写出过程",
      },
      {
        id: "u4",
        question: "有没有特殊情况需要考虑？比如空输入、只有一个元素？",
        purpose: "考虑边界情况",
        expectedInsight: "养成考虑边界的习惯",
        hint: "想想最小的输入是什么样的",
      },
    ],
    commonMistakes: [
      "没看清约束条件就开始写代码",
      "忽略边界情况",
      "误解题意导致方向错误",
    ],
    breakthrough: "真正理解问题是解决问题的一半",
  },
  {
    stage: "analyze",
    name: "分析问题",
    description: "寻找问题的特征和可能的解法方向",
    questions: [
      {
        id: "a1",
        question: "这道题让你想到了什么？有没有见过类似的问题？",
        purpose: "激活已有知识",
        expectedInsight: "识别问题模式",
        hint: "想想这道题的核心操作是什么：查找？排序？遍历？",
      },
      {
        id: "a2",
        question: "暴力解法是什么？时间复杂度是多少？",
        purpose: "先有一个 baseline",
        expectedInsight: "理解优化的必要性",
        hint: "最直接、最简单的方法是什么？",
      },
      {
        id: "a3",
        question: "暴力解法中，哪些计算是重复的？",
        purpose: "找到优化点",
        expectedInsight: "发现可以用空间换时间的地方",
        hint: "有没有同样的计算做了多次？",
      },
      {
        id: "a4",
        question: "数据有什么特点？是有序的吗？有没有什么规律？",
        purpose: "利用数据特性",
        expectedInsight: "有序 → 二分，无序但需要查找 → 哈希表",
        hint: "题目说数据是有序的吗？需要去重吗？",
      },
    ],
    commonMistakes: [
      "直接想最优解，跳过暴力解法",
      "忽略数据的特殊性质",
      "没有分析时间复杂度要求",
    ],
    breakthrough: "找到问题的核心：什么操作是瓶颈？",
  },
  {
    stage: "plan",
    name: "设计方案",
    description: "选择合适的数据结构和算法",
    questions: [
      {
        id: "p1",
        question: "基于你的分析，什么数据结构最合适？",
        purpose: "选择工具",
        expectedInsight: "数据结构决定算法效率",
        followUpOnYes: "为什么选择它？它能解决什么问题？",
        hint: "查找快用哈希表，有序数据用二分，需要撤销用栈...",
      },
      {
        id: "p2",
        question: "你的算法思路能用一句话描述吗？",
        purpose: "确保思路清晰",
        expectedInsight: "能简洁描述说明真正理解了",
        hint: "试着填空：遍历数组，对于每个元素，做___",
      },
      {
        id: "p3",
        question: "这个方案的时间和空间复杂度是多少？符合要求吗？",
        purpose: "验证方案可行性",
        expectedInsight: "复杂度分析是设计的一部分",
        hint: "数有几层循环，每层循环多少次",
      },
      {
        id: "p4",
        question: "有没有更优的方案？值得尝试吗？",
        purpose: "权衡取舍",
        expectedInsight: "有时候足够好就够了",
        hint: "如果当前方案满足要求，先实现再说",
      },
    ],
    commonMistakes: [
      "选了数据结构但不知道为什么",
      "设计太复杂，难以实现",
      "没有验证复杂度",
    ],
    breakthrough: "找到最适合（而不一定是最优）的方案",
  },
  {
    stage: "implement",
    name: "编写代码",
    description: "将方案转化为代码",
    questions: [
      {
        id: "i1",
        question: "先写伪代码行不行？",
        purpose: "降低认知负担",
        expectedInsight: "伪代码帮助理清思路",
        hint: "用中文写出每一步要做什么",
      },
      {
        id: "i2",
        question: "需要什么变量？它们的初始值是什么？",
        purpose: "明确状态",
        expectedInsight: "变量代表算法的状态",
        hint: "想想需要记录什么信息",
      },
      {
        id: "i3",
        question: "循环的边界条件是什么？会不会越界？",
        purpose: "处理边界",
        expectedInsight: "边界错误是最常见的 bug",
        hint: "检查 i < n 还是 i <= n",
      },
      {
        id: "i4",
        question: "代码写完了，能在脑中或纸上跑一遍吗？",
        purpose: "代码审查",
        expectedInsight: "手动 trace 能发现很多问题",
        hint: "用最简单的例子走一遍",
      },
    ],
    commonMistakes: [
      "边界条件错误（off-by-one）",
      "变量命名不清晰",
      "代码太复杂，难以调试",
    ],
    breakthrough: "代码是思路的精确表达",
  },
  {
    stage: "verify",
    name: "验证与反思",
    description: "确保解法正确，并从中学习",
    questions: [
      {
        id: "v1",
        question: "所有示例都通过了吗？边界情况呢？",
        purpose: "基本验证",
        expectedInsight: "测试是发现 bug 的有效手段",
        hint: "特别测试空输入、单元素、最大输入",
      },
      {
        id: "v2",
        question: "这道题的核心思想是什么？",
        purpose: "提炼本质",
        expectedInsight: "从具体题目抽象出通用模式",
        hint: "如果只能记住一点，应该是什么？",
      },
      {
        id: "v3",
        question: "这个思路还能用在哪些问题上？",
        purpose: "知识迁移",
        expectedInsight: "一题多解，一解多题",
        hint: "想想有没有类似结构的问题",
      },
      {
        id: "v4",
        question: "下次遇到类似问题，你会怎么更快地识别？",
        purpose: "形成模式识别",
        expectedInsight: "建立问题到解法的映射",
        hint: "什么特征会提示你用这个方法？",
      },
    ],
    commonMistakes: [
      "做完就忘，没有总结",
      "只记住代码，不理解思路",
      "不做知识迁移",
    ],
    breakthrough: "从一道题学到可迁移的思维模式",
  },
];

// ============================================================================
// 针对具体问题的引导
// ============================================================================

export const problemGuidances: ProblemGuidance[] = [
  {
    problemId: "two-sum",
    problemName: "两数之和",
    category: "hash-table",
    stages: [
      {
        stage: "recognize",
        name: "识别问题模式",
        description: "这是一个查找配对的问题",
        questions: [
          {
            id: "ts1",
            question: "这道题的核心任务是什么？",
            purpose: "理解问题本质",
            expectedInsight: "找到两个数，使它们的和等于目标值",
            hint: "不是排序，不是统计，是查找",
          },
          {
            id: "ts2",
            question: "如果我固定了一个数，另一个数是什么？",
            purpose: "将两数问题转化为一数问题",
            expectedInsight: "另一个数 = target - 当前数（补数思想）",
            hint: "如果 target = 9，当前数是 2，需要找什么？",
          },
        ],
        commonMistakes: [
          "直接两层循环暴力搜索",
          "没有想到补数的概念",
        ],
        breakthrough: "两数之和 = 查找一个数的补数是否存在",
      },
      {
        stage: "optimize",
        name: "优化查找",
        description: "如何快速判断一个数是否存在",
        questions: [
          {
            id: "ts3",
            question: "暴力法的瓶颈在哪里？",
            purpose: "找到优化点",
            expectedInsight: "内层循环的查找是 O(n)，总体 O(n²)",
            hint: "哪个操作做了最多次？",
          },
          {
            id: "ts4",
            question: "有什么数据结构能让查找更快？",
            purpose: "选择工具",
            expectedInsight: "哈希表可以 O(1) 查找",
            hint: "想想你学过的数据结构，哪个查找最快？",
          },
          {
            id: "ts5",
            question: "哈希表里应该存什么？",
            purpose: "设计数据结构",
            expectedInsight: "存储值到索引的映射，因为题目要返回索引",
            hint: "题目要返回的是什么？值还是索引？",
          },
        ],
        commonMistakes: [
          "先把所有元素放入哈希表，再查找（需要两次遍历）",
          "忘记处理重复元素的情况",
        ],
        breakthrough: "一边遍历一边建表，既查找又存储",
      },
    ],
    masterInsight: "当需要查找配对时，用哈希表存储已遍历的元素，将 O(n²) 优化到 O(n)",
    transferableSkills: [
      "三数之和（先排序，再双指针）",
      "四数之和",
      "存在重复元素",
      "字母异位词分组",
    ],
  },
  {
    problemId: "valid-parentheses",
    problemName: "有效的括号",
    category: "stack",
    stages: [
      {
        stage: "recognize",
        name: "识别问题模式",
        description: "这是一个配对消除的问题",
        questions: [
          {
            id: "vp1",
            question: "什么样的括号序列是有效的？",
            purpose: "理解有效性条件",
            expectedInsight: "每个左括号都有一个匹配的右括号，且顺序正确",
            hint: "() 有效，)( 无效，区别是什么？",
          },
          {
            id: "vp2",
            question: "当我们遇到一个右括号时，它应该和哪个左括号匹配？",
            purpose: "发现配对规律",
            expectedInsight: "和最近的、未匹配的同类型左括号匹配",
            hint: "在 '([)]' 中，第一个 ) 应该和哪个匹配？",
          },
        ],
        commonMistakes: [
          "只统计左右括号数量是否相等",
          "没有考虑括号类型必须匹配",
        ],
        breakthrough: "最近匹配 = 后进先出 = 栈",
      },
      {
        stage: "design",
        name: "设计解法",
        description: "使用栈来追踪未匹配的左括号",
        questions: [
          {
            id: "vp3",
            question: "为什么栈适合这个问题？",
            purpose: "理解数据结构选择",
            expectedInsight: "栈的 LIFO 特性正好匹配「最近的左括号」的需求",
            hint: "想想栈的特点：后进先出",
          },
          {
            id: "vp4",
            question: "遇到左括号怎么办？遇到右括号怎么办？",
            purpose: "设计算法流程",
            expectedInsight: "左括号入栈，右括号出栈并检查匹配",
            hint: "左括号需要等待配对，右括号需要找配对",
          },
          {
            id: "vp5",
            question: "什么情况下括号无效？",
            purpose: "考虑失败情况",
            expectedInsight: "栈空时遇到右括号，或类型不匹配，或遍历结束栈非空",
            hint: "有哪些情况会导致无法正确配对？",
          },
        ],
        commonMistakes: [
          "忘记检查栈是否为空就直接弹出",
          "忘记最后检查栈是否清空",
        ],
        breakthrough: "栈用于处理「最近相关」的配对问题",
      },
    ],
    masterInsight: "当问题涉及「最近的未处理元素」时，考虑使用栈",
    transferableSkills: [
      "最小栈",
      "每日温度（单调栈）",
      "逆波兰表达式求值",
      "字符串解码",
    ],
  },
  {
    problemId: "climbing-stairs",
    problemName: "爬楼梯",
    category: "dynamic-programming",
    stages: [
      {
        stage: "recognize",
        name: "识别问题模式",
        description: "这是一个计数问题，有重叠子问题",
        questions: [
          {
            id: "cs1",
            question: "要爬到第 n 级台阶，最后一步有几种可能？",
            purpose: "找到问题的分解方式",
            expectedInsight: "最后一步要么走 1 级，要么走 2 级",
            hint: "你只能一次走 1 级或 2 级",
          },
          {
            id: "cs2",
            question: "如果最后走 1 级，前面需要解决什么问题？",
            purpose: "发现子问题",
            expectedInsight: "需要先爬到第 n-1 级",
            hint: "把大问题分解成小问题",
          },
          {
            id: "cs3",
            question: "爬到第 n 级的方法数和前面的方法数有什么关系？",
            purpose: "发现递推关系",
            expectedInsight: "f(n) = f(n-1) + f(n-2)",
            hint: "两种情况的方法数相加",
          },
        ],
        commonMistakes: [
          "尝试列举所有可能的路径",
          "没有发现这是斐波那契数列",
        ],
        breakthrough: "当前状态可以由之前的状态推导出来",
      },
      {
        stage: "optimize",
        name: "优化递归",
        description: "从递归到动态规划",
        questions: [
          {
            id: "cs4",
            question: "直接递归有什么问题？",
            purpose: "发现重复计算",
            expectedInsight: "同一个子问题会被计算多次，指数级时间复杂度",
            hint: "画出递归树，看看有没有重复节点",
          },
          {
            id: "cs5",
            question: "如何避免重复计算？",
            purpose: "引入记忆化",
            expectedInsight: "用数组存储已计算的结果",
            hint: "如果计算过了，就直接取结果",
          },
          {
            id: "cs6",
            question: "能不能从小到大计算，而不是递归？",
            purpose: "转化为迭代",
            expectedInsight: "从 f(1), f(2) 开始，一步步算到 f(n)",
            hint: "这就是动态规划的「填表」过程",
          },
          {
            id: "cs7",
            question: "只需要存储所有的 f(i) 吗？",
            purpose: "空间优化",
            expectedInsight: "只需要前两个值，可以用两个变量",
            hint: "看看递推公式，计算 f(n) 需要哪些值？",
          },
        ],
        commonMistakes: [
          "记忆化数组大小错误",
          "忘记初始条件 f(1)=1, f(2)=2",
        ],
        breakthrough: "DP = 递归 + 记忆化 = 自底向上填表",
      },
    ],
    masterInsight: "动态规划的核心是「用空间换时间」，避免重复计算",
    transferableSkills: [
      "打家劫舍",
      "最大子数组和",
      "零钱兑换",
      "不同路径",
    ],
  },
  {
    problemId: "binary-search",
    problemName: "二分查找",
    category: "binary-search",
    stages: [
      {
        stage: "recognize",
        name: "识别问题模式",
        description: "有序数组 + 查找 = 二分",
        questions: [
          {
            id: "bs1",
            question: "数组有什么特点？",
            purpose: "发现二分的适用条件",
            expectedInsight: "数组是有序的",
            hint: "题目说 nums 是什么样的数组？",
          },
          {
            id: "bs2",
            question: "如果数组有序，我们能利用什么性质？",
            purpose: "理解二分的核心思想",
            expectedInsight: "可以通过比较中点来排除一半的元素",
            hint: "如果 nums[mid] < target，说明目标在哪边？",
          },
        ],
        commonMistakes: [
          "忽略了数组有序这个条件",
          "没有意识到二分的适用场景",
        ],
        breakthrough: "有序 + 查找 → 二分，时间复杂度从 O(n) 降到 O(log n)",
      },
      {
        stage: "implement",
        name: "实现细节",
        description: "二分查找的边界处理",
        questions: [
          {
            id: "bs3",
            question: "left 和 right 的初始值应该是什么？",
            purpose: "定义搜索区间",
            expectedInsight: "取决于选择闭区间还是开区间",
            hint: "如果是 [left, right]，right 应该是 n-1",
          },
          {
            id: "bs4",
            question: "循环条件是 left < right 还是 left <= right？",
            purpose: "理解区间语义",
            expectedInsight: "闭区间用 <=，因为 left == right 时区间内还有一个元素",
            hint: "想想 left == right 时，区间内还有元素吗？",
          },
          {
            id: "bs5",
            question: "找到目标后应该怎么做？",
            purpose: "明确返回条件",
            expectedInsight: "直接返回 mid",
            hint: "这道题是精确查找，找到就返回",
          },
          {
            id: "bs6",
            question: "如何更新 left 和 right？",
            purpose: "避免死循环",
            expectedInsight: "必须确保搜索空间在缩小",
            hint: "left = mid + 1, right = mid - 1，不能是 left = mid",
          },
        ],
        commonMistakes: [
          "边界条件写错导致死循环",
          "更新 left/right 时忘记 +1/-1",
          "左闭右开和左闭右闭的处理方式混淆",
        ],
        breakthrough: "选择一种区间定义并始终保持一致",
      },
    ],
    masterInsight: "二分查找的关键是「区间定义要一致」，边界处理遵循所选定义",
    transferableSkills: [
      "搜索旋转排序数组",
      "查找元素的第一个和最后一个位置",
      "寻找峰值",
      "二分答案类问题",
    ],
  },
  {
    problemId: "number-of-islands",
    problemName: "岛屿数量",
    category: "graph",
    stages: [
      {
        stage: "recognize",
        name: "识别问题模式",
        description: "这是一个图的连通分量问题",
        questions: [
          {
            id: "ni1",
            question: "什么是一个岛屿？",
            purpose: "理解连通性",
            expectedInsight: "相邻的陆地（1）组成一个岛屿",
            hint: "上下左右相邻的 1 属于同一个岛",
          },
          {
            id: "ni2",
            question: "如何找到一个完整的岛屿？",
            purpose: "联想图的遍历",
            expectedInsight: "从一个 1 出发，遍历所有相邻的 1",
            hint: "这和图的遍历有什么关系？",
          },
          {
            id: "ni3",
            question: "如何避免重复计数同一个岛屿？",
            purpose: "思考标记方法",
            expectedInsight: "访问过的格子需要标记（改成 0 或使用 visited）",
            hint: "怎么知道这个格子已经被计算过了？",
          },
        ],
        commonMistakes: [
          "没有标记访问过的格子导致无限递归",
          "忽略边界检查导致数组越界",
        ],
        breakthrough: "岛屿数量 = 连通分量数量 = DFS/BFS 的启动次数",
      },
      {
        stage: "implement",
        name: "实现遍历",
        description: "使用 DFS 或 BFS 遍历岛屿",
        questions: [
          {
            id: "ni4",
            question: "用 DFS 还是 BFS？有什么区别？",
            purpose: "选择遍历方式",
            expectedInsight: "对于这道题，两者都可以，DFS 代码更简洁",
            hint: "DFS 用递归，BFS 用队列",
          },
          {
            id: "ni5",
            question: "什么时候计数器加 1？",
            purpose: "理解算法流程",
            expectedInsight: "每次从一个新的未访问的 1 开始遍历时",
            hint: "每个岛屿只在开始遍历时计数一次",
          },
          {
            id: "ni6",
            question: "如何处理四个方向的移动？",
            purpose: "简化代码",
            expectedInsight: "用方向数组 [(0,1), (0,-1), (1,0), (-1,0)]",
            hint: "不用写四个 if，用循环更简洁",
          },
        ],
        commonMistakes: [
          "递归函数没有返回条件",
          "BFS 忘记在入队时就标记",
          "方向处理逻辑重复",
        ],
        breakthrough: "DFS 模板：检查边界 → 检查是否是陆地 → 标记 → 递归四个方向",
      },
    ],
    masterInsight: "网格问题可以看作图问题，DFS/BFS 是处理连通性的标准方法",
    transferableSkills: [
      "岛屿的最大面积",
      "被围绕的区域",
      "太平洋大西洋水流问题",
      "腐烂的橘子（BFS）",
    ],
  },
];

// ============================================================================
// 根据问题类型获取引导
// ============================================================================

export function getGuidanceByProblemId(problemId: string): ProblemGuidance | undefined {
  return problemGuidances.find(g => g.problemId === problemId);
}

export function getUniversalGuidance(): ThinkingStage[] {
  return universalThinkingFramework;
}

// ============================================================================
// 根据类别获取通用引导问题
// ============================================================================

export const categoryGuidance: Record<string, SocraticQuestion[]> = {
  "hash-table": [
    {
      id: "hash1",
      question: "这道题需要快速查找吗？查找什么？",
      purpose: "识别哈希表的适用场景",
      expectedInsight: "需要 O(1) 查找某个值是否存在",
      hint: "有没有「判断是否存在」或「查找对应的值」的需求？",
    },
    {
      id: "hash2",
      question: "哈希表的 key 和 value 应该是什么？",
      purpose: "设计数据结构",
      expectedInsight: "key 是需要查找的值，value 是需要返回的信息",
      hint: "根据题目要返回什么，决定存储什么",
    },
  ],
  "two-pointers": [
    {
      id: "tp1",
      question: "数组是有序的吗？",
      purpose: "确认双指针的适用条件",
      expectedInsight: "有序数组可以用对撞指针",
      hint: "无序数组可能需要先排序，或者用其他方法",
    },
    {
      id: "tp2",
      question: "指针应该怎么移动？什么条件下移动哪个指针？",
      purpose: "设计指针移动策略",
      expectedInsight: "根据当前结果和目标的比较决定",
      hint: "如果当前和太小，应该移动哪个指针来增大？",
    },
  ],
  "sliding-window": [
    {
      id: "sw1",
      question: "这道题是在找什么样的子串/子数组？",
      purpose: "确认滑动窗口的适用场景",
      expectedInsight: "连续的子串/子数组，满足某个条件",
      hint: "关键词：连续、子串、子数组、最长、最短",
    },
    {
      id: "sw2",
      question: "窗口什么时候扩大？什么时候收缩？",
      purpose: "设计窗口控制策略",
      expectedInsight: "不满足时扩大，满足时可能需要收缩以找最优",
      hint: "右指针总是扩大窗口，左指针用来收缩",
    },
  ],
  "binary-search": [
    {
      id: "bs1",
      question: "数据是有序的吗？或者有没有单调性？",
      purpose: "确认二分的适用条件",
      expectedInsight: "有序或单调性是二分的前提",
      hint: "有时候答案本身具有单调性，也可以二分",
    },
    {
      id: "bs2",
      question: "如何根据 mid 的结果决定下一步搜索的方向？",
      purpose: "设计二分判断条件",
      expectedInsight: "明确的判断条件来缩小搜索范围",
      hint: "如果 nums[mid] 太小/太大，应该往哪边找？",
    },
  ],
  "dynamic-programming": [
    {
      id: "dp1",
      question: "这道题有最优子结构吗？大问题的最优解能否由小问题的最优解组成？",
      purpose: "确认 DP 的适用条件",
      expectedInsight: "可以将问题分解为子问题",
      hint: "试着找找问题的递推关系",
    },
    {
      id: "dp2",
      question: "状态如何定义？dp[i] 代表什么？",
      purpose: "定义状态",
      expectedInsight: "状态应该能推导出问题的答案",
      hint: "通常是「前 i 个元素的最优解」或「以第 i 个结尾的最优解」",
    },
    {
      id: "dp3",
      question: "状态转移方程是什么？dp[i] 和之前的状态有什么关系？",
      purpose: "找到递推关系",
      expectedInsight: "当前状态由之前哪些状态推导而来",
      hint: "考虑最后一步的选择，它会影响什么？",
    },
  ],
  "backtracking": [
    {
      id: "bt1",
      question: "这道题是要找所有可能的解吗？",
      purpose: "确认回溯的适用场景",
      expectedInsight: "排列、组合、子集等穷举类问题",
      hint: "回溯擅长处理「所有可能」的问题",
    },
    {
      id: "bt2",
      question: "每一步有哪些选择？什么情况下选择无效需要剪枝？",
      purpose: "设计选择策略",
      expectedInsight: "明确选择空间和剪枝条件",
      hint: "无效的选择越早排除，效率越高",
    },
  ],
  "tree": [
    {
      id: "tree1",
      question: "这个问题能否分解为对左子树和右子树分别解决？",
      purpose: "确认递归思维的适用性",
      expectedInsight: "树的问题通常可以递归分解",
      hint: "大多数树的问题都可以递归解决",
    },
    {
      id: "tree2",
      question: "需要什么遍历顺序？前序、中序、后序还是层序？",
      purpose: "选择遍历方式",
      expectedInsight: "不同问题适合不同的遍历顺序",
      hint: "需要先处理根节点？先处理子树？还是按层处理？",
    },
  ],
  "graph": [
    {
      id: "graph1",
      question: "这是要找路径还是判断连通性？",
      purpose: "确定问题类型",
      expectedInsight: "路径问题和连通性问题有不同的解法",
      hint: "找路径用 DFS，最短路径/层级用 BFS",
    },
    {
      id: "graph2",
      question: "图是有向的还是无向的？有没有环？",
      purpose: "分析图的性质",
      expectedInsight: "图的性质决定了算法选择",
      hint: "有环的图需要标记访问状态避免死循环",
    },
  ],
};

export function getCategoryGuidance(category: string): SocraticQuestion[] {
  return categoryGuidance[category] || [];
}
