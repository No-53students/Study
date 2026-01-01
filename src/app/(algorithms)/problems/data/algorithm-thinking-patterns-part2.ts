/**
 * 算法思维模式库 - 第二部分
 *
 * 包含：栈、动态规划、回溯、树、链表等进阶模式
 */

import { ThinkingPattern, FrontendApplication, RelatedProblem } from "./algorithm-thinking-patterns";

// ==================== 栈思维模式 ====================

export const stackPattern: ThinkingPattern = {
  id: "stack",
  name: "栈",
  category: "stack",
  icon: "📚",

  coreIdea: {
    oneLineExplanation: "后进先出 (LIFO)，处理「最近」相关的匹配问题",
    intuition: "栈就像一摞盘子，最后放上去的要最先拿走。当问题涉及「最近」「配对」「嵌套」时，栈是首选。",
    visualMetaphor: "想象往狭窄的桶里放东西。最后放进去的在最上面，必须先拿出来。这种「后进先出」的特性完美匹配括号配对、函数调用等场景。",
    whenToUse: [
      "括号匹配、标签配对",
      "表达式求值",
      "单调栈（找下一个更大/更小元素）",
      "深度优先搜索的迭代实现",
      "撤销操作（undo）",
    ],
    whenNotToUse: [
      "需要随机访问元素",
      "先进先出的场景（用队列）",
      "需要找全局最优（可能需要其他算法）",
    ],
  },

  recognitionSignals: {
    keywords: ["括号", "匹配", "配对", "嵌套", "最近", "下一个更大", "单调", "表达式", "逆波兰"],
    dataStructures: ["字符串", "数组"],
    constraintPatterns: ["匹配问题", "顺序依赖"],
    examplePhrases: [
      "有效的括号",
      "下一个更大的元素",
      "计算表达式的值",
      "最近的...匹配",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "识别栈的应用场景",
      question: "这个问题是否涉及「最近匹配」或「嵌套结构」？",
      actions: [
        "括号/标签匹配 → 经典栈",
        "找下一个更大/更小 → 单调栈",
        "表达式求值 → 双栈或转后缀",
      ],
      checkpoints: [
        "问题是否有「后进先出」的特性？",
        "是否需要记录「之前的状态」？",
      ],
      commonMistake: "没有识别出单调栈的应用场景",
    },
    {
      step: 2,
      name: "确定栈存储的内容",
      question: "栈里应该存什么？元素本身还是索引？",
      actions: [
        "需要位置信息 → 存索引",
        "只需要值 → 存值",
        "需要两者 → 存对象 {index, value}",
      ],
      checkpoints: [
        "弹栈时能获取所需的信息吗？",
        "存储的信息足够解决问题吗？",
      ],
      commonMistake: "单调栈应该存索引（可以算距离），却存了值",
    },
    {
      step: 3,
      name: "设计入栈和出栈逻辑",
      question: "什么时候入栈？什么时候出栈？",
      actions: [
        "括号匹配：左括号入栈，右括号时弹栈比较",
        "单调栈：破坏单调性时弹栈处理",
      ],
      checkpoints: [
        "入栈和出栈的时机正确吗？",
        "出栈时的处理逻辑正确吗？",
      ],
      commonMistake: "单调栈方向搞反（递增 vs 递减）",
    },
    {
      step: 4,
      name: "处理边界情况",
      question: "遍历结束后栈里还有元素怎么办？",
      actions: [
        "括号匹配：栈非空说明有未匹配的左括号",
        "单调栈：栈里剩余的元素可能需要特殊处理",
      ],
      checkpoints: [
        "空栈时出栈会出错吗？",
        "遍历结束后栈的状态正确处理了吗？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "括号匹配",
      description: "检查括号是否有效",
      typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);  // 左括号入栈
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;  // 不匹配
      }
    }
  }

  return stack.length === 0;  // 栈空才有效
}`,
      keyPoints: ["左括号入栈", "右括号弹栈比较", "最后检查栈是否为空"],
    },
    {
      name: "单调递减栈 - 找下一个更大元素",
      description: "找每个元素右边第一个比它大的元素",
      typescript: `function nextGreaterElement(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack: number[] = [];  // 存索引

  for (let i = 0; i < n; i++) {
    // 当前元素比栈顶大，弹栈处理
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const j = stack.pop()!;
      result[j] = nums[i];  // nums[i] 是 nums[j] 的下一个更大元素
    }
    stack.push(i);  // 当前索引入栈
  }

  return result;
}`,
      keyPoints: ["栈存索引", "破坏单调性时弹栈", "弹出的元素找到了答案"],
    },
    {
      name: "表达式求值",
      description: "计算基本的算术表达式",
      typescript: `function calculate(s: string): number {
  const stack: number[] = [];
  let num = 0;
  let sign = 1;
  let result = 0;

  for (const char of s) {
    if (char >= '0' && char <= '9') {
      num = num * 10 + parseInt(char);
    } else if (char === '+') {
      result += sign * num;
      num = 0;
      sign = 1;
    } else if (char === '-') {
      result += sign * num;
      num = 0;
      sign = -1;
    } else if (char === '(') {
      stack.push(result);
      stack.push(sign);
      result = 0;
      sign = 1;
    } else if (char === ')') {
      result += sign * num;
      num = 0;
      result *= stack.pop()!;  // 符号
      result += stack.pop()!;  // 之前的结果
    }
  }

  return result + sign * num;
}`,
      keyPoints: ["遇到 ( 保存当前状态", "遇到 ) 恢复状态并计算", "处理多位数"],
    },
  ],

  commonPitfalls: [
    {
      name: "空栈出栈",
      description: "没有检查栈是否为空就 pop",
      example: "输入 ')(' 时第一个 ) 就会导致空栈 pop",
      solution: "出栈前检查 stack.length > 0",
      frequency: "high",
    },
    {
      name: "单调栈方向错误",
      description: "找更大元素用递增栈，找更小元素用递减栈，搞反了",
      example: "找下一个更大应该维护递减栈（从栈底到栈顶递减）",
      solution: "画图理解：栈顶是待处理的最小元素",
      frequency: "high",
    },
    {
      name: "忘记处理栈中剩余元素",
      description: "遍历结束后栈里可能还有元素",
      example: "单调栈中，栈里剩余的元素没有「下一个更大」",
      solution: "遍历结束后清空栈，或用哨兵值",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n) - 每个元素最多入栈出栈各一次",
    typicalSpace: "O(n) - 最坏情况栈存满所有元素",
    tradeoffs: "栈操作 O(1)，整体线性时间",
  },

  frontendApplications: [
    {
      scenario: "HTML/JSX 标签验证",
      description: "检查标签是否正确闭合",
      algorithmUsed: "括号匹配",
      codeExample: `function validateHTML(html) {
  const stack = [];
  const tagRegex = /<\\/?([a-z]+)[^>]*>/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const isClosing = match[0].startsWith('</');

    if (isClosing) {
      if (stack.pop() !== tag) return false;
    } else if (!selfClosingTags.has(tag)) {
      stack.push(tag);
    }
  }

  return stack.length === 0;
}`,
      realWorldExample: "代码编辑器、Lint 工具",
    },
    {
      scenario: "撤销/重做功能",
      description: "使用两个栈实现 undo/redo",
      algorithmUsed: "双栈",
      codeExample: `class UndoManager {
  undoStack = [];
  redoStack = [];

  execute(command) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];  // 新操作清空 redo
  }

  undo() {
    const cmd = this.undoStack.pop();
    if (cmd) {
      cmd.undo();
      this.redoStack.push(cmd);
    }
  }

  redo() {
    const cmd = this.redoStack.pop();
    if (cmd) {
      cmd.execute();
      this.undoStack.push(cmd);
    }
  }
}`,
      realWorldExample: "文本编辑器、设计工具",
    },
    {
      scenario: "浏览器历史",
      description: "前进后退按钮的实现",
      algorithmUsed: "双栈",
      realWorldExample: "浏览器历史 API",
    },
    {
      scenario: "函数调用栈",
      description: "理解 JavaScript 调用栈和栈溢出",
      algorithmUsed: "栈",
      realWorldExample: "调试器、性能分析",
    },
  ],

  relatedProblems: [
    { id: "valid-parentheses", name: "有效的括号", difficulty: "easy", isCore: true, learningPoint: "栈的入门题" },
    { id: "min-stack", name: "最小栈", difficulty: "medium", isCore: true, learningPoint: "辅助栈维护最小值" },
    { id: "daily-temperatures", name: "每日温度", difficulty: "medium", isCore: true, learningPoint: "单调栈入门" },
    { id: "next-greater-element-i", name: "下一个更大元素 I", difficulty: "easy", isCore: true, learningPoint: "单调栈基础" },
    { id: "largest-rectangle-in-histogram", name: "柱状图中最大的矩形", difficulty: "hard", isCore: true, learningPoint: "单调栈经典题" },
    { id: "trapping-rain-water", name: "接雨水", difficulty: "hard", isCore: true, learningPoint: "单调栈进阶" },
    { id: "basic-calculator", name: "基本计算器", difficulty: "hard", isCore: false, learningPoint: "表达式求值" },
    { id: "decode-string", name: "字符串解码", difficulty: "medium", isCore: false, learningPoint: "嵌套结构处理" },
  ],

  variants: [
    {
      name: "单调递增栈",
      description: "栈内元素从底到顶递增",
      difference: "用于找下一个更小元素",
      exampleProblem: "trapping-rain-water",
    },
    {
      name: "单调递减栈",
      description: "栈内元素从底到顶递减",
      difference: "用于找下一个更大元素",
      exampleProblem: "daily-temperatures",
    },
    {
      name: "双栈",
      description: "使用两个栈协同工作",
      difference: "用于撤销/重做、表达式求值",
      exampleProblem: "basic-calculator",
    },
  ],

  relationships: [
    {
      patternId: "recursion",
      relationship: "similar",
      description: "递归本质上使用调用栈，可以用显式栈转为迭代",
    },
    {
      patternId: "two-pointers",
      relationship: "alternative",
      description: "接雨水可以用双指针代替单调栈，各有优劣",
    },
  ],
};

// ==================== 动态规划思维模式 ====================

export const dpPattern: ThinkingPattern = {
  id: "dp",
  name: "动态规划",
  category: "dp",
  icon: "🧮",

  coreIdea: {
    oneLineExplanation: "将大问题分解为子问题，记录子问题答案避免重复计算",
    intuition: "不要重复解决同一个问题。如果你算过了，就把答案记下来，下次直接用。",
    visualMetaphor: "想象爬楼梯：到第 n 阶的方法数 = 到第 n-1 阶的方法数 + 到第 n-2 阶的方法数。算过的楼层写在小本本上，下次直接查。",
    whenToUse: [
      "求最优解（最大、最小、最长、最短）",
      "计数问题（有多少种方法）",
      "问题可以分解为重叠子问题",
      "具有最优子结构",
    ],
    whenNotToUse: [
      "需要具体的解，不只是最优值",
      "子问题不重叠（用分治）",
      "没有最优子结构",
    ],
  },

  recognitionSignals: {
    keywords: ["最少", "最多", "最长", "最短", "方法数", "路径数", "可能", "能否", "至少", "至多"],
    dataStructures: ["数组", "字符串", "矩阵"],
    constraintPatterns: ["求最优解", "计数问题"],
    examplePhrases: [
      "最少需要多少个...",
      "有多少种方法...",
      "是否能够...",
      "最长的...序列",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "定义状态",
      question: "dp[i] 或 dp[i][j] 代表什么？",
      actions: [
        "明确 dp 数组的含义",
        "确定维度（一维、二维、多维）",
        "确定下标的含义",
      ],
      checkpoints: [
        "状态定义能否表达最终答案？",
        "状态之间是否有转移关系？",
      ],
      commonMistake: "状态定义不清楚，导致转移方程推导困难",
    },
    {
      step: 2,
      name: "推导转移方程",
      question: "dp[i] 怎么从之前的状态推导出来？",
      actions: [
        "找出 dp[i] 依赖哪些状态",
        "写出转移方程",
        "考虑所有可能的情况",
      ],
      checkpoints: [
        "转移方程覆盖了所有情况吗？",
        "方程是否正确（举例验证）？",
      ],
      commonMistake: "遗漏某些情况，导致状态转移不完整",
    },
    {
      step: 3,
      name: "确定初始状态和边界",
      question: "最小子问题的答案是什么？",
      actions: [
        "确定 dp[0] 或 dp[0][0] 等初始值",
        "处理边界情况",
      ],
      checkpoints: [
        "初始状态能推导出后续状态吗？",
        "边界条件处理正确吗？",
      ],
      commonMistake: "初始状态错误，导致整个结果错误",
    },
    {
      step: 4,
      name: "确定遍历顺序和最终答案",
      question: "按什么顺序填表？答案在哪里？",
      actions: [
        "确保计算 dp[i] 时，它依赖的状态已经算好",
        "确定最终答案的位置（dp[n] 还是 max(dp)）",
      ],
      checkpoints: [
        "遍历顺序符合依赖关系吗？",
        "知道从哪里获取最终答案吗？",
      ],
      commonMistake: "遍历顺序错误，使用了还没算好的状态",
    },
    {
      step: 5,
      name: "优化空间（可选）",
      question: "能否降低空间复杂度？",
      actions: [
        "如果 dp[i] 只依赖 dp[i-1]，可以用滚动数组",
        "二维可能压缩为一维",
      ],
      checkpoints: [
        "优化后状态转移是否正确？",
        "遍历顺序是否需要调整？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "一维 DP - 爬楼梯",
      description: "最基础的 DP 模型",
      typescript: `function climbStairs(n: number): number {
  if (n <= 2) return n;

  // dp[i] = 到第 i 阶的方法数
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];  // 转移方程
  }

  return dp[n];
}

// 空间优化版本
function climbStairsOptimized(n: number): number {
  if (n <= 2) return n;

  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
      keyPoints: ["dp[i] 定义清楚", "转移方程 dp[i] = dp[i-1] + dp[i-2]", "只依赖前两个状态可以优化空间"],
    },
    {
      name: "二维 DP - 最长公共子序列",
      description: "两个序列比较的经典问题",
      typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  // dp[i][j] = text1[0..i-1] 和 text2[0..j-1] 的 LCS 长度
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;  // 字符相等，LCS+1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);  // 取较大值
      }
    }
  }

  return dp[m][n];
}`,
      keyPoints: ["二维数组表示两个序列的状态", "相等时对角线+1", "不等时取上或左的最大值"],
    },
    {
      name: "背包问题",
      description: "经典的组合优化问题",
      typescript: `// 0-1 背包：每个物品只能选一次
function knapsack01(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  // dp[i][j] = 前 i 个物品，容量为 j 时的最大价值
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (j < weights[i - 1]) {
        dp[i][j] = dp[i - 1][j];  // 放不下，不选
      } else {
        dp[i][j] = Math.max(
          dp[i - 1][j],  // 不选第 i 个物品
          dp[i - 1][j - weights[i - 1]] + values[i - 1]  // 选第 i 个物品
        );
      }
    }
  }

  return dp[n][capacity];
}

// 完全背包：每个物品可以选无限次
function knapsackComplete(weights: number[], values: number[], capacity: number): number {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    for (let j = weights[i]; j <= capacity; j++) {  // 正序遍历
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}`,
      keyPoints: ["0-1 背包逆序遍历（每个物品只能选一次）", "完全背包正序遍历（可以选多次）", "状态压缩后要注意遍历顺序"],
    },
  ],

  commonPitfalls: [
    {
      name: "状态定义不清",
      description: "不清楚 dp[i] 到底代表什么",
      example: "dp[i] 是「到第 i 个」还是「前 i 个」？",
      solution: "写代码前先用文字明确 dp[i] 的含义",
      frequency: "high",
    },
    {
      name: "遗漏状态转移情况",
      description: "转移方程没有覆盖所有情况",
      example: "编辑距离遗漏了插入/删除/替换某一种操作",
      solution: "枚举所有可能的决策",
      frequency: "high",
    },
    {
      name: "初始状态错误",
      description: "dp[0] 或边界值设置错误",
      example: "硬币兑换问题 dp[0] 应该是 0 还是 1？",
      solution: "从最小子问题推导初始值",
      frequency: "medium",
    },
    {
      name: "遍历顺序错误",
      description: "计算时依赖的状态还没有算好",
      example: "0-1 背包状态压缩后应该逆序遍历",
      solution: "根据状态依赖关系确定遍历顺序",
      frequency: "high",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n²) 或 O(nm) - 填表的复杂度",
    typicalSpace: "O(n) 或 O(nm) - 可用滚动数组优化",
    tradeoffs: "用空间记忆化换取时间，避免重复计算",
  },

  frontendApplications: [
    {
      scenario: "文本差异比较 (Diff)",
      description: "计算两个字符串的编辑距离或最长公共子序列",
      algorithmUsed: "最长公共子序列 / 编辑距离",
      codeExample: `// 简化的 diff 算法
function diff(oldText, newText) {
  const lcs = longestCommonSubsequence(oldText.split(''), newText.split(''));
  // 基于 LCS 生成 diff
}`,
      realWorldExample: "Git diff、Monaco Editor、代码审查工具",
    },
    {
      scenario: "文本换行 (Text Wrapping)",
      description: "计算最优的文本换行位置",
      algorithmUsed: "动态规划最小化「丑陋度」",
      realWorldExample: "富文本编辑器、排版系统",
    },
    {
      scenario: "资源加载优化",
      description: "类似背包问题的资源选择",
      algorithmUsed: "背包问题",
      realWorldExample: "按优先级加载资源、带宽分配",
    },
    {
      scenario: "自动补全排序",
      description: "基于编辑距离的模糊匹配排序",
      algorithmUsed: "编辑距离",
      codeExample: `function fuzzyMatch(query, options) {
  return options
    .map(opt => ({ opt, dist: editDistance(query, opt) }))
    .sort((a, b) => a.dist - b.dist)
    .map(x => x.opt);
}`,
      realWorldExample: "命令面板、搜索建议",
    },
  ],

  relatedProblems: [
    { id: "climbing-stairs", name: "爬楼梯", difficulty: "easy", isCore: true, learningPoint: "DP 入门" },
    { id: "house-robber", name: "打家劫舍", difficulty: "medium", isCore: true, learningPoint: "一维 DP 经典" },
    { id: "coin-change", name: "零钱兑换", difficulty: "medium", isCore: true, learningPoint: "完全背包" },
    { id: "longest-increasing-subsequence", name: "最长递增子序列", difficulty: "medium", isCore: true, learningPoint: "经典 DP + 可用二分优化" },
    { id: "longest-common-subsequence", name: "最长公共子序列", difficulty: "medium", isCore: true, learningPoint: "二维 DP 入门" },
    { id: "edit-distance", name: "编辑距离", difficulty: "medium", isCore: true, learningPoint: "二维 DP 经典" },
    { id: "unique-paths", name: "不同路径", difficulty: "medium", isCore: true, learningPoint: "网格 DP" },
    { id: "word-break", name: "单词拆分", difficulty: "medium", isCore: true, learningPoint: "字符串 DP" },
    { id: "partition-equal-subset-sum", name: "分割等和子集", difficulty: "medium", isCore: true, learningPoint: "0-1 背包变形" },
    { id: "best-time-to-buy-and-sell-stock", name: "买卖股票的最佳时机", difficulty: "easy", isCore: true, learningPoint: "状态机 DP" },
  ],

  variants: [
    {
      name: "线性 DP",
      description: "状态沿着序列线性转移",
      difference: "dp[i] 只依赖 dp[i-1] 等",
      exampleProblem: "climbing-stairs",
    },
    {
      name: "区间 DP",
      description: "状态定义在区间上",
      difference: "dp[i][j] 表示区间 [i,j] 的结果",
      exampleProblem: "longest-palindromic-subsequence",
    },
    {
      name: "背包 DP",
      description: "选择物品填充容量",
      difference: "状态压缩、遍历顺序有讲究",
      exampleProblem: "coin-change",
    },
    {
      name: "状态机 DP",
      description: "用多个状态表示不同的「阶段」",
      difference: "多个 dp 数组或更高维度",
      exampleProblem: "best-time-to-buy-and-sell-stock",
    },
  ],

  relationships: [
    {
      patternId: "recursion",
      relationship: "extends",
      description: "DP 是带记忆化的递归，避免重复计算",
    },
    {
      patternId: "greedy",
      relationship: "alternative",
      description: "贪心是局部最优，DP 是全局最优。某些问题两者都能解",
    },
  ],
};

// ==================== 回溯思维模式 ====================

export const backtrackingPattern: ThinkingPattern = {
  id: "backtracking",
  name: "回溯",
  category: "backtracking",
  icon: "🔙",

  coreIdea: {
    oneLineExplanation: "穷举所有可能，走不通就回头，直到找到答案",
    intuition: "走迷宫：每个岔路口做个标记，走不通就回到标记处换条路走。",
    visualMetaphor: "想象你在一棵决策树上走。每个节点是一个选择，走到叶子节点看是否满足条件。不满足就「回溯」到父节点，尝试其他分支。",
    whenToUse: [
      "排列组合问题",
      "子集问题",
      "搜索所有可能的解",
      "棋盘类问题（N皇后、数独）",
      "路径搜索（带约束）",
    ],
    whenNotToUse: [
      "只需要最优解的数值（可能用 DP 更好）",
      "搜索空间太大（需要剪枝或换算法）",
      "问题有多项式时间解法",
    ],
  },

  recognitionSignals: {
    keywords: ["所有", "全部", "排列", "组合", "子集", "方案", "路径", "可能", "穷举"],
    dataStructures: ["数组", "字符串", "矩阵"],
    constraintPatterns: ["求所有解", "约束条件", "选或不选"],
    examplePhrases: [
      "找出所有...",
      "所有可能的...",
      "生成所有...",
      "...的全排列",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "确定搜索空间",
      question: "有哪些选择？搜索树长什么样？",
      actions: [
        "画出决策树的前几层",
        "确定每一层的选择范围",
      ],
      checkpoints: [
        "能画出搜索树吗？",
        "每个节点有多少个分支？",
      ],
      commonMistake: "没有清晰的搜索树概念，导致遗漏或重复",
    },
    {
      step: 2,
      name: "确定路径和选择列表",
      question: "当前路径是什么？还有哪些选择可做？",
      actions: [
        "path: 已经做出的选择",
        "choices: 还可以选择的元素",
      ],
      checkpoints: [
        "如何避免重复选择？",
        "如何标记已选择的元素？",
      ],
      commonMistake: "没有正确维护「已选择」和「可选择」的状态",
    },
    {
      step: 3,
      name: "确定结束条件和结果收集",
      question: "什么时候收集结果？什么时候返回？",
      actions: [
        "到达叶子节点时收集结果",
        "满足某个条件时提前返回（剪枝）",
      ],
      checkpoints: [
        "结束条件写对了吗？",
        "结果是深拷贝还是引用？",
      ],
      commonMistake: "收集结果时忘记深拷贝，导致所有结果都一样",
    },
    {
      step: 4,
      name: "实现回溯",
      question: "如何撤销选择？",
      actions: [
        "做选择: path.push(choice)",
        "递归: backtrack(nextState)",
        "撤销选择: path.pop()",
      ],
      checkpoints: [
        "做选择和撤销选择是否对称？",
        "状态恢复正确吗？",
      ],
      commonMistake: "忘记撤销选择，导致状态污染",
    },
    {
      step: 5,
      name: "剪枝优化",
      question: "有哪些分支可以提前排除？",
      actions: [
        "排序后利用单调性剪枝",
        "提前判断不可能达到目标的分支",
        "利用约束条件减少搜索空间",
      ],
      checkpoints: [
        "剪枝条件正确吗？会不会漏解？",
        "剪枝带来了多少优化？",
      ],
    },
  ],

  codeSkeletons: [
    {
      name: "排列问题",
      description: "生成所有排列",
      typescript: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];
  const used = new Array(nums.length).fill(false);

  function backtrack() {
    // 结束条件
    if (path.length === nums.length) {
      result.push([...path]);  // 深拷贝！
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;  // 跳过已使用的元素

      // 做选择
      path.push(nums[i]);
      used[i] = true;

      // 递归
      backtrack();

      // 撤销选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}`,
      keyPoints: ["used 数组标记已使用", "做选择和撤销选择对称", "收集结果时深拷贝"],
    },
    {
      name: "组合问题",
      description: "从 n 个数中选 k 个",
      typescript: `function combine(n: number, k: number): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number) {
    // 结束条件
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 剪枝：剩余元素不够选了
    if (path.length + (n - start + 1) < k) {
      return;
    }

    for (let i = start; i <= n; i++) {
      path.push(i);
      backtrack(i + 1);  // 从 i+1 开始，避免重复
      path.pop();
    }
  }

  backtrack(1);
  return result;
}`,
      keyPoints: ["start 参数避免重复", "剪枝提前返回", "组合不关心顺序"],
    },
    {
      name: "子集问题",
      description: "生成所有子集",
      typescript: `function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const path: number[] = [];

  function backtrack(start: number) {
    // 每个节点都是一个子集
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1);
      path.pop();
    }
  }

  backtrack(0);
  return result;
}`,
      keyPoints: ["不需要结束条件判断", "每个节点都收集结果", "start 保证不重复"],
    },
  ],

  commonPitfalls: [
    {
      name: "忘记深拷贝",
      description: "收集结果时直接 push path 的引用",
      example: "result.push(path) 导致所有结果都一样（都是最终状态）",
      solution: "使用 result.push([...path]) 或 result.push(path.slice())",
      frequency: "high",
    },
    {
      name: "忘记撤销选择",
      description: "递归后没有恢复状态",
      example: "path.push 后忘记 path.pop",
      solution: "做选择和撤销选择必须成对出现",
      frequency: "high",
    },
    {
      name: "重复结果",
      description: "没有正确处理去重",
      example: "[1,1,2] 的组合可能生成重复结果",
      solution: "先排序，然后跳过同层的相同元素",
      frequency: "medium",
    },
    {
      name: "超时",
      description: "搜索空间太大没有剪枝",
      example: "N 皇后问题不剪枝会超时",
      solution: "分析约束条件，提前排除不可能的分支",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n!) 或 O(2^n) - 取决于搜索空间大小",
    typicalSpace: "O(n) - 递归栈深度",
    tradeoffs: "回溯是指数级复杂度，但剪枝可以大大降低实际运行时间",
  },

  frontendApplications: [
    {
      scenario: "表单条件组合",
      description: "生成所有可能的筛选条件组合",
      algorithmUsed: "子集生成",
      codeExample: `function generateFilterCombinations(filters) {
  const result = [];
  function backtrack(start, path) {
    if (path.length > 0) result.push([...path]);
    for (let i = start; i < filters.length; i++) {
      path.push(filters[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`,
      realWorldExample: "电商筛选、数据分析工具",
    },
    {
      scenario: "权限组合验证",
      description: "检查权限的所有可能组合",
      algorithmUsed: "排列/组合",
      realWorldExample: "RBAC 权限系统、访问控制",
    },
    {
      scenario: "路径查找",
      description: "在图或树结构中找所有路径",
      algorithmUsed: "DFS + 回溯",
      realWorldExample: "文件系统遍历、组件树分析",
    },
    {
      scenario: "自动布局",
      description: "尝试不同的布局组合找最优解",
      algorithmUsed: "回溯 + 剪枝",
      realWorldExample: "仪表盘布局、棋盘游戏",
    },
  ],

  relatedProblems: [
    { id: "subsets", name: "子集", difficulty: "medium", isCore: true, learningPoint: "回溯入门" },
    { id: "permutations", name: "全排列", difficulty: "medium", isCore: true, learningPoint: "排列问题模板" },
    { id: "combinations", name: "组合", difficulty: "medium", isCore: true, learningPoint: "组合问题模板" },
    { id: "combination-sum", name: "组合总和", difficulty: "medium", isCore: true, learningPoint: "可重复选择" },
    { id: "palindrome-partitioning", name: "分割回文串", difficulty: "medium", isCore: false, learningPoint: "字符串回溯" },
    { id: "n-queens", name: "N 皇后", difficulty: "hard", isCore: true, learningPoint: "经典回溯" },
    { id: "sudoku-solver", name: "解数独", difficulty: "hard", isCore: false, learningPoint: "约束满足问题" },
    { id: "word-search", name: "单词搜索", difficulty: "medium", isCore: true, learningPoint: "网格回溯" },
    { id: "letter-combinations-of-a-phone-number", name: "电话号码的字母组合", difficulty: "medium", isCore: false, learningPoint: "多层选择" },
  ],

  variants: [
    {
      name: "子集型回溯",
      description: "每个节点都是结果",
      difference: "不需要判断结束条件",
      exampleProblem: "subsets",
    },
    {
      name: "排列型回溯",
      description: "选择的顺序重要",
      difference: "需要 used 数组标记已选元素",
      exampleProblem: "permutations",
    },
    {
      name: "组合型回溯",
      description: "选择的顺序不重要",
      difference: "用 start 参数避免重复",
      exampleProblem: "combinations",
    },
  ],

  relationships: [
    {
      patternId: "dp",
      relationship: "alternative",
      description: "如果只需要最优值，DP 通常更高效。需要所有解时用回溯",
    },
    {
      patternId: "dfs",
      relationship: "similar",
      description: "回溯是 DFS 的具体应用，强调「撤销选择」",
    },
  ],
};

// ==================== 链表思维模式 ====================

export const linkedListPattern: ThinkingPattern = {
  id: "linked-list",
  name: "链表",
  category: "linked-list",
  icon: "🔗",

  coreIdea: {
    oneLineExplanation: "通过指针操作节点，掌握「前驱」「当前」「后继」三个指针",
    intuition: "链表操作就像接水管：想要在中间加一节，需要先记住后面的，断开连接，接上新的，再连回去。",
    visualMetaphor: "想象一列火车车厢，每节车厢只知道下一节在哪里。要插入新车厢，需要先解开挂钩，挂上新车厢，再连上后面的。",
    whenToUse: [
      "链表的增删改查",
      "反转链表",
      "合并链表",
      "环检测（快慢指针）",
      "找中点（快慢指针）",
    ],
    whenNotToUse: [
      "需要随机访问第 k 个元素",
      "需要频繁读取（数组更好）",
    ],
  },

  recognitionSignals: {
    keywords: ["链表", "节点", "反转", "合并", "环", "中点", "删除节点"],
    dataStructures: ["链表"],
    constraintPatterns: ["指针操作", "O(1) 空间修改"],
    examplePhrases: [
      "反转链表",
      "合并两个有序链表",
      "判断链表是否有环",
      "删除链表中的节点",
    ],
  },

  thinkingFramework: [
    {
      step: 1,
      name: "画图！画图！画图！",
      question: "操作前后的指针变化是什么？",
      actions: [
        "画出操作前的链表状态",
        "画出操作后的链表状态",
        "标注每个指针的变化",
      ],
      checkpoints: [
        "画图了吗？（这是最重要的一步）",
        "每个指针的变化都标清楚了吗？",
      ],
      commonMistake: "不画图直接写代码，指针操作顺序错误",
    },
    {
      step: 2,
      name: "考虑是否需要虚拟头节点",
      question: "头节点需要特殊处理吗？",
      actions: [
        "如果需要删除/修改头节点，使用虚拟头节点",
        "虚拟头节点简化边界条件处理",
      ],
      checkpoints: [
        "头节点可能被删除吗？",
        "添加虚拟头节点能简化代码吗？",
      ],
      commonMistake: "没有使用虚拟头节点导致需要大量边界判断",
    },
    {
      step: 3,
      name: "确定需要的指针",
      question: "需要哪些指针？prev, curr, next?",
      actions: [
        "反转链表需要 prev, curr, next 三个指针",
        "删除节点需要 prev 指针",
        "快慢指针：slow, fast",
      ],
      checkpoints: [
        "指针的初始值是什么？",
        "指针如何移动？",
      ],
      commonMistake: "指针数量不对或初始化错误",
    },
    {
      step: 4,
      name: "确定操作顺序",
      question: "指针操作的顺序是什么？",
      actions: [
        "先保存后面的节点，再断开连接",
        "注意避免丢失节点引用",
      ],
      checkpoints: [
        "会不会丢失节点的引用？",
        "操作顺序能保证正确性吗？",
      ],
      commonMistake: "操作顺序错误导致链表断开或形成环",
    },
  ],

  codeSkeletons: [
    {
      name: "反转链表",
      description: "将链表逆序",
      typescript: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;  // 1. 先保存下一个节点
    curr.next = prev;        // 2. 反转指针
    prev = curr;             // 3. 前移 prev
    curr = next;             // 4. 前移 curr
  }

  return prev;  // prev 现在是新的头
}`,
      keyPoints: ["三个指针 prev, curr, next", "先保存 next 再断开", "返回 prev"],
    },
    {
      name: "快慢指针 - 找中点",
      description: "找链表的中间节点",
      typescript: `function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;  // 偶数长度返回中间偏右的节点
}`,
      keyPoints: ["快指针走两步，慢指针走一步", "结束时慢指针在中间", "检查 fast.next 防止空指针"],
    },
    {
      name: "虚拟头节点 - 删除节点",
      description: "删除链表中的指定节点",
      typescript: `function removeElements(head: ListNode | null, val: number): ListNode | null {
  // 虚拟头节点，简化头节点的删除
  const dummy = new ListNode(0, head);
  let curr = dummy;

  while (curr.next !== null) {
    if (curr.next.val === val) {
      curr.next = curr.next.next;  // 删除节点
    } else {
      curr = curr.next;
    }
  }

  return dummy.next;
}`,
      keyPoints: ["虚拟头节点 dummy", "操作的是 curr.next", "返回 dummy.next"],
    },
    {
      name: "合并有序链表",
      description: "合并两个有序链表",
      typescript: `function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail = dummy;

  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  tail.next = l1 !== null ? l1 : l2;

  return dummy.next;
}`,
      keyPoints: ["dummy 作为结果链表的头", "tail 指向结果链表的尾", "最后接上剩余部分"],
    },
  ],

  commonPitfalls: [
    {
      name: "丢失节点引用",
      description: "修改 next 指针后找不到后面的节点",
      example: "curr.next = prev 后，curr.next 已经不指向原来的下一个节点了",
      solution: "先用临时变量保存 next = curr.next",
      frequency: "high",
    },
    {
      name: "忘记处理空链表",
      description: "head 为 null 时访问 head.next 报错",
      example: "if (head.val === target) 当 head 为 null 时崩溃",
      solution: "先检查 head !== null",
      frequency: "high",
    },
    {
      name: "虚拟头节点没有断开",
      description: "返回虚拟头节点而不是 dummy.next",
      example: "return dummy 返回了多余的节点",
      solution: "始终返回 dummy.next",
      frequency: "medium",
    },
    {
      name: "形成环",
      description: "指针操作不当导致链表成环",
      example: "反转时忘记断开原来的连接",
      solution: "画图确认每一步的指针变化",
      frequency: "medium",
    },
  ],

  complexityAnalysis: {
    typicalTime: "O(n) - 遍历链表",
    typicalSpace: "O(1) - 原地修改",
    tradeoffs: "链表修改 O(1)，但随机访问 O(n)。与数组特性互补",
  },

  frontendApplications: [
    {
      scenario: "浏览器历史",
      description: "前进后退的双向链表实现",
      algorithmUsed: "双向链表",
      realWorldExample: "浏览器历史 API",
    },
    {
      scenario: "LRU 缓存",
      description: "最近最少使用缓存的链表实现",
      algorithmUsed: "双向链表 + 哈希表",
      codeExample: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();  // 保持插入顺序
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);  // 移到末尾
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      this.cache.delete(this.cache.keys().next().value);  // 删除最老的
    }
  }
}`,
      realWorldExample: "浏览器缓存、API 缓存",
    },
    {
      scenario: "任务队列",
      description: "异步任务的链表管理",
      algorithmUsed: "链表",
      realWorldExample: "Promise 链、中间件管道",
    },
    {
      scenario: "DOM 操作",
      description: "DOM 树本质上是链式结构",
      algorithmUsed: "树/链表遍历",
      realWorldExample: "Virtual DOM diff 算法",
    },
  ],

  relatedProblems: [
    { id: "reverse-linked-list", name: "反转链表", difficulty: "easy", isCore: true, learningPoint: "链表基础操作" },
    { id: "merge-two-sorted-lists", name: "合并两个有序链表", difficulty: "easy", isCore: true, learningPoint: "链表合并" },
    { id: "linked-list-cycle", name: "环形链表", difficulty: "easy", isCore: true, learningPoint: "快慢指针" },
    { id: "linked-list-cycle-ii", name: "环形链表 II", difficulty: "medium", isCore: true, learningPoint: "找环入口" },
    { id: "middle-of-the-linked-list", name: "链表的中间结点", difficulty: "easy", isCore: true, learningPoint: "快慢指针找中点" },
    { id: "remove-nth-node-from-end-of-list", name: "删除链表的倒数第 N 个结点", difficulty: "medium", isCore: true, learningPoint: "快慢指针" },
    { id: "lru-cache", name: "LRU 缓存", difficulty: "medium", isCore: true, learningPoint: "双向链表 + 哈希表" },
    { id: "add-two-numbers", name: "两数相加", difficulty: "medium", isCore: false, learningPoint: "链表遍历" },
    { id: "reorder-list", name: "重排链表", difficulty: "medium", isCore: false, learningPoint: "综合应用" },
  ],

  variants: [
    {
      name: "单向链表",
      description: "每个节点只有 next 指针",
      difference: "只能向前遍历",
      exampleProblem: "reverse-linked-list",
    },
    {
      name: "双向链表",
      description: "每个节点有 prev 和 next 指针",
      difference: "可以双向遍历，LRU 缓存常用",
      exampleProblem: "lru-cache",
    },
    {
      name: "环形链表",
      description: "尾节点指向某个节点形成环",
      difference: "需要快慢指针检测",
      exampleProblem: "linked-list-cycle",
    },
  ],

  relationships: [
    {
      patternId: "two-pointers",
      relationship: "extends",
      description: "链表的快慢指针是双指针的应用",
    },
    {
      patternId: "recursion",
      relationship: "similar",
      description: "链表天然适合递归处理（head + rest）",
    },
  ],
};

// ==================== 导出所有模式 ====================

export const additionalPatterns = {
  stack: stackPattern,
  dp: dpPattern,
  backtracking: backtrackingPattern,
  "linked-list": linkedListPattern,
};
