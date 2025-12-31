import { Problem } from "../types";

export const dp1dProblems: Problem[] = [
  // 1. 爬楼梯 (70)
  {
    id: "climbing-stairs",
    leetcodeId: 70,
    title: "爬楼梯",
    titleEn: "Climbing Stairs",
    difficulty: "easy",
    category: "dp-1d",
    tags: ["记忆化搜索", "数学", "动态规划"],
    frontendRelevance: "high",
    frontendNote: "DP入门，斐波那契变体",
    description: `假设你正在爬楼梯。需要 \`n\` 阶你才能到达楼顶。

每次你可以爬 \`1\` 或 \`2\` 个台阶。你有多少种不同的方法可以爬到楼顶呢？`,
    examples: `**示例 1：**
\`\`\`
输入：n = 2
输出：2
解释：有两种方法可以爬到楼顶。
1. 1 阶 + 1 阶
2. 2 阶
\`\`\`

**示例 2：**
\`\`\`
输入：n = 3
输出：3
解释：有三种方法可以爬到楼顶。
1. 1 阶 + 1 阶 + 1 阶
2. 1 阶 + 2 阶
3. 2 阶 + 1 阶
\`\`\``,
    constraints: `- \`1 <= n <= 45\``,
    initialCode: `function climbStairs(n) {
  // 在此处编写你的代码

}`,
    solution: `function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
    testCases: [
      {
        id: "1",
        name: "2阶楼梯",
        input: [2],
        expected: 2
      },
      {
        id: "2",
        name: "3阶楼梯",
        input: [3],
        expected: 3
      }
    ],
    hints: [
      "到达第 n 阶的方法 = 到达第 n-1 阶的方法 + 到达第 n-2 阶的方法",
      "这是斐波那契数列",
      "可以使用滚动变量优化空间"
    ],
    explanation: `## 解题思路

### 动态规划

状态转移方程：dp[i] = dp[i-1] + dp[i-2]

到达第 i 阶的方法等于：
- 从第 i-1 阶爬 1 阶
- 从第 i-2 阶爬 2 阶

### 空间优化

只需要保存前两个状态，使用滚动变量。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["house-robber", "coin-change"],
    solutions: [
      {
        name: "动态规划 - 空间优化（推荐）",
        code: `/**
 * 爬楼梯 - 动态规划（空间优化，推荐）
 *
 * 核心思想：
 * 到达第 n 阶的方法数 = 到达第 n-1 阶的方法数 + 到达第 n-2 阶的方法数
 * 这本质上就是斐波那契数列！
 *
 * 状态转移方程：dp[i] = dp[i-1] + dp[i-2]
 * 基础情况：dp[1] = 1, dp[2] = 2
 *
 * 空间优化：只需保存前两个状态，使用滚动变量
 *
 * 时间复杂度：O(n) - 线性遍历
 * 空间复杂度：O(1) - 只用两个变量
 */
function climbStairs(n) {
  // 基础情况：1阶有1种方法，2阶有2种方法
  if (n <= 2) return n;

  // prev2 = dp[i-2]，prev1 = dp[i-1]
  let prev2 = 1;  // 到达第1阶的方法数
  let prev1 = 2;  // 到达第2阶的方法数

  // 从第3阶开始计算
  for (let i = 3; i <= n; i++) {
    // dp[i] = dp[i-1] + dp[i-2]
    const curr = prev1 + prev2;
    // 滚动更新
    prev2 = prev1;
    prev1 = curr;
  }

  // prev1 就是 dp[n]
  return prev1;
}`,
        explanation: `## 动态规划 - 空间优化

### 算法原理

到达第 n 阶有两种方式：
\`\`\`
1. 从第 n-1 阶爬 1 阶
2. 从第 n-2 阶爬 2 阶

所以：dp[n] = dp[n-1] + dp[n-2]
\`\`\`

这就是斐波那契数列！

### 执行过程

\`\`\`
n = 5

初始：prev2=1, prev1=2

i=3: curr=2+1=3, prev2=2, prev1=3
i=4: curr=3+2=5, prev2=3, prev1=5
i=5: curr=5+3=8, prev2=5, prev1=8

返回 8
\`\`\`

### 为什么可以空间优化？

\`\`\`
dp[i] 只依赖 dp[i-1] 和 dp[i-2]
所以只需保存最近两个值，不需要整个数组
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(1)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 数组",
        code: `/**
 * 爬楼梯 - 动态规划（数组版本）
 *
 * 核心思想：
 * 使用数组存储每一阶的方法数，更直观地展示 DP 过程。
 *
 * 状态定义：dp[i] = 到达第 i 阶的方法数
 * 状态转移：dp[i] = dp[i-1] + dp[i-2]
 * 基础情况：dp[1] = 1, dp[2] = 2
 *
 * 时间复杂度：O(n) - 线性遍历
 * 空间复杂度：O(n) - dp 数组
 */
function climbStairs(n) {
  // 基础情况
  if (n <= 2) return n;

  // dp[i] 表示到达第 i 阶的方法数
  const dp = new Array(n + 1);
  dp[1] = 1;  // 1阶只有1种方法：爬1阶
  dp[2] = 2;  // 2阶有2种方法：1+1 或 2

  // 从第3阶开始填表
  for (let i = 3; i <= n; i++) {
    // 到达第 i 阶 = 从 i-1 爬1阶 + 从 i-2 爬2阶
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,
        explanation: `## 动态规划 - 数组版本

### 算法原理

明确的 DP 五要素：
\`\`\`
1. 状态：dp[i] = 到达第 i 阶的方法数
2. 转移：dp[i] = dp[i-1] + dp[i-2]
3. 初始：dp[1] = 1, dp[2] = 2
4. 方向：从小到大
5. 答案：dp[n]
\`\`\`

### dp 数组变化

\`\`\`
n = 5

dp[1] = 1
dp[2] = 2
dp[3] = dp[2] + dp[1] = 2 + 1 = 3
dp[4] = dp[3] + dp[2] = 3 + 2 = 5
dp[5] = dp[4] + dp[3] = 5 + 3 = 8
\`\`\`

### 与空间优化版对比

| 版本 | 优点 | 缺点 |
|-----|-----|-----|
| 数组版 | 直观，易理解 | 空间 O(n) |
| 优化版 | 空间 O(1) | 需要理解滚动 |

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 爬楼梯 - 递归 + 记忆化
 *
 * 核心思想：
 * 自顶向下的递归思考方式：
 * 要到达第 n 阶，可以从 n-1 阶爬1阶，或从 n-2 阶爬2阶。
 *
 * 使用记忆化避免重复计算（纯递归会有指数级重复）。
 *
 * 时间复杂度：O(n) - 每个状态计算一次
 * 空间复杂度：O(n) - 递归栈 + 记忆化存储
 */
function climbStairs(n) {
  // 记忆化：存储已计算的结果
  const memo = new Map();

  /**
   * 递归计算到达第 n 阶的方法数
   * @param {number} n - 目标阶数
   * @returns {number} - 方法数
   */
  const climb = (n) => {
    // 基础情况
    if (n <= 2) return n;
    // 如果已计算过，直接返回
    if (memo.has(n)) return memo.get(n);

    // 递归计算：climb(n-1) + climb(n-2)
    const result = climb(n - 1) + climb(n - 2);
    // 存入记忆化
    memo.set(n, result);
    return result;
  };

  return climb(n);
}`,
        explanation: `## 递归 + 记忆化

### 算法原理

自顶向下思考：
\`\`\`
climb(n) = climb(n-1) + climb(n-2)
\`\`\`

记忆化的作用：
\`\`\`
纯递归：climb(5) 会重复计算 climb(3) 多次
记忆化：每个状态只计算一次
\`\`\`

### 递归树（记忆化前）

\`\`\`
                climb(5)
               /        \\
          climb(4)      climb(3)
          /    \\         /    \\
     climb(3) climb(2) climb(2) climb(1)
     /    \\
climb(2) climb(1)

climb(3) 和 climb(2) 被重复计算！
\`\`\`

### 记忆化后

\`\`\`
climb(5) → 计算 climb(4) + climb(3)
  climb(4) → 计算 climb(3) + climb(2)
    climb(3) → 计算 climb(2) + climb(1) → 存入 memo
    climb(2) → 返回 2
  climb(3) → 直接从 memo 读取！

每个状态只计算一次
\`\`\`

### DP vs 记忆化

| 方法 | 思维方式 | 顺序 |
|-----|---------|-----|
| DP | 自底向上 | 从小到大填表 |
| 记忆化 | 自顶向下 | 按需计算 |

两者时间复杂度相同，只是思考方向不同。

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 打家劫舍 (198)
  {
    id: "house-robber",
    leetcodeId: 198,
    title: "打家劫舍",
    titleEn: "House Robber",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["数组", "动态规划"],
    frontendRelevance: "high",
    frontendNote: "DP入门",
    description: `你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **不触动警报装置的情况下**，一夜之内能够偷窃到的最高金额。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1)，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2)，偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
     偷窃到的最高金额 = 2 + 9 + 1 = 12。
\`\`\``,
    constraints: `- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 400\``,
    initialCode: `function rob(nums) {
  // 在此处编写你的代码

}`,
    solution: `function rob(nums) {
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[1,2,3,1]]],
        expected: 4
      },
      {
        id: "2",
        name: "示例2",
        input: [[[2,7,9,3,1]]],
        expected: 12
      }
    ],
    hints: [
      "对于第 i 个房屋，要么偷（加上 i-2 的最大值），要么不偷（取 i-1 的最大值）",
      "dp[i] = max(dp[i-1], dp[i-2] + nums[i])",
      "可以用滚动变量优化空间"
    ],
    explanation: `## 解题思路

### 动态规划

状态转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])

对于第 i 个房屋，有两种选择：
- 不偷：最大金额就是 dp[i-1]
- 偷：最大金额是 dp[i-2] + nums[i]（不能偷相邻的）

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["climbing-stairs", "coin-change"],
    solutions: [
      {
        name: "动态规划 - 空间优化（推荐）",
        code: `/**
 * 打家劫舍 - 动态规划（空间优化，推荐）
 *
 * 核心思想：
 * 对于每个房屋，有两种选择：
 * 1. 偷当前房屋：获得 nums[i] + dp[i-2]（不能偷相邻的）
 * 2. 不偷当前房屋：保持 dp[i-1]
 *
 * 状态转移方程：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 *
 * 空间优化：只需保存前两个状态
 *
 * 时间复杂度：O(n) - 线性遍历
 * 空间复杂度：O(1) - 只用两个变量
 */
function rob(nums) {
  // 边界情况：只有一个房屋
  if (nums.length === 1) return nums[0];

  // prev2 = dp[i-2]：前前个位置的最大金额
  // prev1 = dp[i-1]：前一个位置的最大金额
  let prev2 = 0;
  let prev1 = 0;

  // 遍历每个房屋
  for (const num of nums) {
    // dp[i] = max(不偷当前, 偷当前)
    //       = max(dp[i-1], dp[i-2] + nums[i])
    const curr = Math.max(prev1, prev2 + num);
    // 滚动更新
    prev2 = prev1;
    prev1 = curr;
  }

  // prev1 就是最终答案
  return prev1;
}`,
        explanation: `## 动态规划 - 空间优化

### 算法原理

对于每个房屋，只有两个选择：
\`\`\`
偷：nums[i] + dp[i-2]（不能偷相邻的）
不偷：dp[i-1]（保持之前的最大值）

取两者的最大值
\`\`\`

### 状态定义

\`\`\`
dp[i] = 偷到第 i 个房屋时能获得的最大金额
注意：不一定偷第 i 个房屋
\`\`\`

### 执行过程

\`\`\`
nums = [2, 7, 9, 3, 1]

初始：prev2=0, prev1=0

i=0, num=2: curr=max(0, 0+2)=2, prev2=0, prev1=2
i=1, num=7: curr=max(2, 0+7)=7, prev2=2, prev1=7
i=2, num=9: curr=max(7, 2+9)=11, prev2=7, prev1=11
i=3, num=3: curr=max(11, 7+3)=11, prev2=11, prev1=11
i=4, num=1: curr=max(11, 11+1)=12, prev2=11, prev1=12

返回 12
\`\`\`

### 为什么可以空间优化？

\`\`\`
dp[i] 只依赖 dp[i-1] 和 dp[i-2]
所以只需保存最近两个值
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(1)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 数组",
        code: `/**
 * 打家劫舍 - 动态规划（数组版本）
 *
 * 核心思想：
 * 使用数组存储每个位置的最大金额，更直观地展示 DP 过程。
 *
 * 状态定义：dp[i] = 偷到第 i 个房屋时能获得的最大金额
 * 状态转移：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 * 基础情况：
 *   dp[0] = nums[0]（只有一个房屋，必偷）
 *   dp[1] = max(nums[0], nums[1])（两个房屋，选金额大的）
 *
 * 时间复杂度：O(n) - 线性遍历
 * 空间复杂度：O(n) - dp 数组
 */
function rob(nums) {
  const n = nums.length;
  // 边界情况：只有一个房屋
  if (n === 1) return nums[0];

  // dp[i] 表示偷到第 i 个房屋时的最大金额
  const dp = new Array(n);
  // 基础情况
  dp[0] = nums[0];                       // 只有一个房屋
  dp[1] = Math.max(nums[0], nums[1]);    // 两个房屋选金额大的

  // 从第3个房屋开始填表
  for (let i = 2; i < n; i++) {
    // 偷或不偷当前房屋，取最大值
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}`,
        explanation: `## 动态规划 - 数组版本

### 算法原理

DP 五要素：
\`\`\`
1. 状态：dp[i] = 偷到第 i 个房屋的最大金额
2. 转移：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
3. 初始：dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
4. 方向：从小到大
5. 答案：dp[n-1]
\`\`\`

### dp 数组变化

\`\`\`
nums = [2, 7, 9, 3, 1]

dp[0] = 2（只有第一个房屋）
dp[1] = max(2, 7) = 7（前两个选最大）
dp[2] = max(7, 2+9) = 11
dp[3] = max(11, 7+3) = 11
dp[4] = max(11, 11+1) = 12
\`\`\`

### 初始化的含义

\`\`\`
dp[0] = nums[0]：
  只有一个房屋，必须偷它

dp[1] = max(nums[0], nums[1])：
  两个相邻房屋，只能偷一个，选金额大的
\`\`\`

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 打家劫舍 - 递归 + 记忆化
 *
 * 核心思想：
 * 自顶向下思考：从最后一个房屋开始递归。
 * 对于第 i 个房屋，选择偷或不偷，取最大值。
 *
 * 递推关系：dp(i) = max(dp(i-1), dp(i-2) + nums[i])
 * 基础情况：dp(-1) = 0, dp(-2) = 0
 *
 * 时间复杂度：O(n) - 每个状态计算一次
 * 空间复杂度：O(n) - 递归栈 + 记忆化数组
 */
function rob(nums) {
  const n = nums.length;
  // 记忆化数组：-1 表示未计算
  const memo = new Array(n).fill(-1);

  /**
   * 递归计算偷到第 i 个房屋的最大金额
   * @param {number} i - 当前考虑的房屋索引
   * @returns {number} - 最大金额
   */
  const dp = (i) => {
    // 基础情况：没有房屋可偷
    if (i < 0) return 0;
    // 如果已计算过，直接返回
    if (memo[i] !== -1) return memo[i];

    // 选择偷或不偷，取最大值
    // 偷：dp(i-2) + nums[i]
    // 不偷：dp(i-1)
    memo[i] = Math.max(dp(i - 1), dp(i - 2) + nums[i]);
    return memo[i];
  };

  // 从最后一个房屋开始考虑
  return dp(n - 1);
}`,
        explanation: `## 递归 + 记忆化

### 算法原理

自顶向下思考：
\`\`\`
"我要偷到第 n-1 个房屋，最多能偷多少？"
→ 要么偷它，要么不偷它
→ 偷：需要知道偷到 n-3 的最大值
→ 不偷：需要知道偷到 n-2 的最大值
→ 递归！
\`\`\`

### 递归树

\`\`\`
nums = [2, 7, 9, 3, 1]

dp(4)
= max(dp(3), dp(2) + 1)
= max(
    max(dp(2), dp(1) + 3),
    max(dp(1), dp(0) + 9) + 1
  )
...
\`\`\`

### 记忆化的作用

\`\`\`
避免重复计算：
dp(4) 调用 dp(3) 和 dp(2)
dp(3) 调用 dp(2) 和 dp(1)
dp(2) 被调用两次！

记忆化后，dp(2) 只计算一次
\`\`\`

### DP vs 记忆化

| 方法 | 思维方式 | 适用场景 |
|-----|---------|---------|
| DP | 自底向上 | 所有状态都需要 |
| 记忆化 | 自顶向下 | 可能只需部分状态 |

### 复杂度
- 时间：O(n)
- 空间：O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. 零钱兑换 (322)
  {
    id: "coin-change",
    leetcodeId: 322,
    title: "零钱兑换",
    titleEn: "Coin Change",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["广度优先搜索", "数组", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "零钱兑换DP",
    description: `给你一个整数数组 \`coins\`，表示不同面额的硬币；以及一个整数 \`amount\`，表示总金额。

计算并返回可以凑成总金额所需的 **最少的硬币个数**。如果没有任何一种硬币组合能组成总金额，返回 \`-1\`。

你可以认为每种硬币的数量是无限的。`,
    examples: `**示例 1：**
\`\`\`
输入：coins = [1,2,5], amount = 11
输出：3
解释：11 = 5 + 5 + 1
\`\`\`

**示例 2：**
\`\`\`
输入：coins = [2], amount = 3
输出：-1
\`\`\`

**示例 3：**
\`\`\`
输入：coins = [1], amount = 0
输出：0
\`\`\``,
    constraints: `- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\``,
    initialCode: `function coinChange(coins, amount) {
  // 在此处编写你的代码

}`,
    solution: `function coinChange(coins, amount) {
  // dp[i] 表示凑成金额 i 所需的最少硬币数
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,2,5], 11],
        expected: 3
      },
      {
        id: "2",
        name: "无解",
        input: [[2], 3],
        expected: -1
      },
      {
        id: "3",
        name: "金额为0",
        input: [[1], 0],
        expected: 0
      }
    ],
    hints: [
      "dp[i] = min(dp[i-coin] + 1) for all coins",
      "初始化为 Infinity，dp[0] = 0",
      "完全背包问题的变种"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i] 表示凑成金额 i 所需的最少硬币数

状态转移：对于每个金额 i，遍历所有硬币：
dp[i] = min(dp[i], dp[i - coin] + 1)

边界条件：dp[0] = 0

### 复杂度分析
- 时间复杂度：O(amount × n)
- 空间复杂度：O(amount)`,
    timeComplexity: "O(amount × n)",
    spaceComplexity: "O(amount)",
    relatedProblems: ["climbing-stairs", "house-robber"],
    solutions: [
      {
        name: "动态规划 - 自底向上（推荐）",
        code: `/**
 * 零钱兑换 - 动态规划（自底向上，推荐）
 *
 * 核心思想：
 * 完全背包问题变种：每种硬币可以使用无限次。
 * 对于每个金额 i，尝试使用每种硬币，取最少硬币数。
 *
 * 状态定义：dp[i] = 凑成金额 i 所需的最少硬币数
 * 状态转移：dp[i] = min(dp[i - coin] + 1) for all coins
 * 基础情况：dp[0] = 0（金额为 0 需要 0 个硬币）
 *
 * 时间复杂度：O(amount × n) - amount 个状态，每个检查 n 个硬币
 * 空间复杂度：O(amount) - dp 数组
 */
function coinChange(coins, amount) {
  // dp[i] 表示凑成金额 i 所需的最少硬币数
  // 初始化为 Infinity，表示暂时无法凑成
  const dp = new Array(amount + 1).fill(Infinity);
  // 基础情况：金额为 0 需要 0 个硬币
  dp[0] = 0;

  // 遍历每个金额（从 1 到 amount）
  for (let i = 1; i <= amount; i++) {
    // 尝试使用每种硬币
    for (const coin of coins) {
      // 硬币面值不能超过当前金额，且 i-coin 必须可达
      if (coin <= i && dp[i - coin] !== Infinity) {
        // 选择用更少硬币的方案
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  // 如果 dp[amount] 仍为 Infinity，说明无法凑成
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        explanation: `## 动态规划 - 自底向上

### 算法原理

这是**完全背包**问题：每种硬币可以无限次使用。

\`\`\`
问题转化：
- 背包容量 = amount
- 物品 = 各种面值的硬币
- 目标 = 用最少物品装满背包
\`\`\`

### DP 五要素

\`\`\`
1. 状态：dp[i] = 凑成金额 i 的最少硬币数
2. 转移：dp[i] = min(dp[i - coin] + 1)
3. 初始：dp[0] = 0，其他为 Infinity
4. 方向：从小到大
5. 答案：dp[amount]
\`\`\`

### 执行过程

\`\`\`
coins = [1, 2, 5], amount = 11

dp[0] = 0
dp[1] = dp[0]+1 = 1        (用1)
dp[2] = min(dp[1]+1, dp[0]+1) = 1  (用2)
dp[3] = min(dp[2]+1, dp[1]+1) = 2  (用1+2)
dp[4] = min(dp[3]+1, dp[2]+1) = 2  (用2+2)
dp[5] = min(dp[4]+1, dp[3]+1, dp[0]+1) = 1  (用5)
...
dp[11] = 3  (用5+5+1)
\`\`\`

### 与 0-1 背包的区别

| 问题类型 | 每个物品使用次数 | 遍历顺序 |
|---------|----------------|---------|
| 0-1 背包 | 只能用一次 | 倒序遍历 |
| 完全背包 | 可用无限次 | 正序遍历 |

### 复杂度
- 时间：O(amount × n)
- 空间：O(amount)`,
        timeComplexity: "O(amount × n)",
        spaceComplexity: "O(amount)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 零钱兑换 - 递归 + 记忆化
 *
 * 核心思想：
 * 自顶向下思考：要凑成金额 amount，可以先用一枚硬币，
 * 然后递归求解剩余金额的最少硬币数。
 *
 * 递推关系：dp(amount) = min(dp(amount - coin) + 1)
 * 基础情况：
 *   - dp(0) = 0（金额为 0 需要 0 个硬币）
 *   - dp(负数) = -1（无法凑成）
 *
 * 时间复杂度：O(amount × n) - 每个状态计算一次
 * 空间复杂度：O(amount) - 递归栈 + 记忆化
 */
function coinChange(coins, amount) {
  // 记忆化：存储已计算的结果
  const memo = new Map();

  /**
   * 递归计算凑成金额 remain 的最少硬币数
   * @param {number} remain - 剩余金额
   * @returns {number} - 最少硬币数，-1 表示无法凑成
   */
  const dp = (remain) => {
    // 基础情况：金额为负，无法凑成
    if (remain < 0) return -1;
    // 基础情况：金额为 0，需要 0 个硬币
    if (remain === 0) return 0;
    // 如果已计算过，直接返回
    if (memo.has(remain)) return memo.get(remain);

    // 尝试每种硬币，找最少硬币数
    let minCoins = Infinity;
    for (const coin of coins) {
      // 递归计算用掉一枚硬币后的最少数量
      const res = dp(remain - coin);
      // 如果可以凑成（res >= 0），更新最小值
      if (res >= 0) {
        minCoins = Math.min(minCoins, res + 1);
      }
    }

    // 如果所有硬币都无法凑成，返回 -1
    const result = minCoins === Infinity ? -1 : minCoins;
    // 存入记忆化
    memo.set(remain, result);
    return result;
  };

  return dp(amount);
}`,
        explanation: `## 递归 + 记忆化

### 算法原理

自顶向下思考：
\`\`\`
"要凑成金额 11，我可以：
 - 用 1 元硬币，然后凑 10 元
 - 用 2 元硬币，然后凑 9 元
 - 用 5 元硬币，然后凑 6 元
 取最少的方案"
\`\`\`

### 递归树

\`\`\`
coins = [1, 2, 5], amount = 11

dp(11)
├── dp(10) + 1  (用1)
├── dp(9) + 1   (用2)
└── dp(6) + 1   (用5)
    ├── dp(5) + 1
    ├── dp(4) + 1
    └── dp(1) + 1
        ...
\`\`\`

### 记忆化的作用

\`\`\`
不用记忆化：
dp(6) 可能被 dp(11)→dp(10)→dp(9)→dp(8)→dp(6) 调用
也可能被 dp(11)→dp(6) 调用
重复计算！

用记忆化：
每个金额只计算一次，时间从 O(n^amount) → O(amount × n)
\`\`\`

### DP vs 记忆化

| 方法 | 思维方式 | 特点 |
|-----|---------|-----|
| DP | 自底向上 | 所有状态都计算 |
| 记忆化 | 自顶向下 | 按需计算 |

### 复杂度
- 时间：O(amount × n)
- 空间：O(amount)`,
        timeComplexity: "O(amount × n)",
        spaceComplexity: "O(amount)",
      },
      {
        name: "BFS 广度优先搜索",
        code: `/**
 * 零钱兑换 - BFS 广度优先搜索
 *
 * 核心思想：
 * 将问题转化为图的最短路径问题：
 * - 节点：0 到 amount 的每个金额
 * - 边：两个金额相差一枚硬币的面值
 * - 目标：从 0 到 amount 的最短路径（即最少硬币数）
 *
 * BFS 的特点：第一次到达目标时，一定是最短路径。
 *
 * 时间复杂度：O(amount × n) - 每个金额最多入队一次
 * 空间复杂度：O(amount) - visited 集合 + 队列
 */
function coinChange(coins, amount) {
  // 特殊情况：金额为 0，不需要硬币
  if (amount === 0) return 0;

  // visited：记录已访问的金额，避免重复
  const visited = new Set([0]);
  // 队列：BFS 的核心数据结构，从 0 开始
  const queue = [0];
  // steps：当前走了多少步（即用了多少硬币）
  let steps = 0;

  while (queue.length > 0) {
    // 每一层代表用一枚硬币
    steps++;
    const size = queue.length;

    // 处理当前层的所有节点
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      // 尝试使用每种硬币
      for (const coin of coins) {
        const next = curr + coin;
        // 如果刚好凑成目标金额，返回步数
        if (next === amount) return steps;
        // 如果金额合法且未访问过，加入队列
        if (next < amount && !visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }

  // 无法凑成目标金额
  return -1;
}`,
        explanation: `## BFS 广度优先搜索

### 算法原理

将问题转化为**图的最短路径**问题：
\`\`\`
节点：每个可能的金额（0 到 amount）
边：如果金额 a + coin = b，则 a 和 b 之间有边
目标：从 0 到 amount 的最短路径
\`\`\`

### BFS 的优势

\`\`\`
BFS 按层遍历：
第 1 层：用 1 枚硬币能到达的金额
第 2 层：用 2 枚硬币能到达的金额
...
第一次到达 amount 时，就是最少硬币数！
\`\`\`

### 执行过程

\`\`\`
coins = [1, 2, 5], amount = 11

第 0 层：{0}
第 1 层：{1, 2, 5}
第 2 层：{3, 4, 6, 7, 10}
第 3 层：{8, 9, 11, ...}
         ↑
       找到 11！返回 3
\`\`\`

### 图示

\`\`\`
0 ──+1──> 1 ──+1──> 2 ──+1──> ...
│         │         │
+2        +2        +2
↓         ↓         ↓
2 ──+1──> 3 ──+1──> 4 ──+1──> ...
│         │         │
+5        +5        +5
↓         ↓         ↓
5 ──+1──> 6 ──+1──> 7 ──+1──> ...
\`\`\`

### 与 DP 对比

| 方法 | 思路 | 特点 |
|-----|-----|-----|
| DP | 逐个计算所有金额 | 一定计算所有状态 |
| BFS | 按层搜索 | 可能提前找到答案 |

### 复杂度
- 时间：O(amount × n)
- 空间：O(amount)`,
        timeComplexity: "O(amount × n)",
        spaceComplexity: "O(amount)",
      },
    ],
  },

  // 4. 最长递增子序列 (300)
  {
    id: "longest-increasing-subsequence",
    leetcodeId: 300,
    title: "最长递增子序列",
    titleEn: "Longest Increasing Subsequence",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["数组", "二分查找", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "最长递增子序列",
    description: `给你一个整数数组 \`nums\`，找到其中最长严格递增子序列的长度。

**子序列** 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，\`[3,6,2,7]\` 是数组 \`[0,3,1,6,2,2,7]\` 的子序列。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [0,1,0,3,2,3]
输出：4
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [7,7,7,7,7,7,7]
输出：1
\`\`\``,
    constraints: `- \`1 <= nums.length <= 2500\`
- \`-10^4 <= nums[i] <= 10^4\``,
    initialCode: `function lengthOfLIS(nums) {
  // 在此处编写你的代码

}`,
    solution: `function lengthOfLIS(nums) {
  // 贪心 + 二分查找
  const tails = [];

  for (const num of nums) {
    let left = 0;
    let right = tails.length;

    // 二分查找第一个 >= num 的位置
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      tails.push(num);
    } else {
      tails[left] = num;
    }
  }

  return tails.length;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[10,9,2,5,3,7,101,18]]],
        expected: 4
      },
      {
        id: "2",
        name: "示例2",
        input: [[[0,1,0,3,2,3]]],
        expected: 4
      },
      {
        id: "3",
        name: "全相同",
        input: [[[7,7,7,7,7,7,7]]],
        expected: 1
      }
    ],
    hints: [
      "动态规划：dp[i] = max(dp[j] + 1) for j < i and nums[j] < nums[i]",
      "贪心 + 二分：维护一个递增数组，用二分查找替换位置",
      "贪心优化可以将时间复杂度降到 O(n log n)"
    ],
    explanation: `## 解题思路

### 贪心 + 二分查找

维护一个 tails 数组，tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素。

对于每个元素：
1. 如果大于 tails 末尾，添加到末尾
2. 否则用二分查找找到第一个 >= 它的位置并替换

### 复杂度分析
- 时间复杂度：O(n log n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["coin-change", "word-break"],
    solutions: [
      {
        name: "贪心 + 二分查找（推荐）",
        code: `/**
 * 最长递增子序列 - 贪心 + 二分查找（推荐）
 *
 * 核心思想：
 * 维护一个 tails 数组，tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素。
 * 这样设计是为了让子序列更容易扩展（末尾越小，越容易接上更大的数）。
 *
 * 贪心策略：保持每个长度的子序列末尾尽可能小。
 *
 * 二分查找：对于每个新元素，用二分找到它应该替换的位置。
 *
 * 时间复杂度：O(n log n) - n 个元素，每个二分查找 O(log n)
 * 空间复杂度：O(n) - tails 数组最大长度为 n
 */
function lengthOfLIS(nums) {
  // tails[i] = 长度为 i+1 的递增子序列的最小末尾元素
  const tails = [];

  for (const num of nums) {
    // 二分查找：找第一个 >= num 的位置
    let left = 0;
    let right = tails.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        // tails[mid] < num，num 可以接在后面
        left = mid + 1;
      } else {
        // tails[mid] >= num，可以替换 tails[mid]
        right = mid;
      }
    }

    // left 是第一个 >= num 的位置
    if (left === tails.length) {
      // num 比所有元素都大，扩展长度
      tails.push(num);
    } else {
      // 替换位置 left，使该长度子序列末尾更小
      tails[left] = num;
    }
  }

  // tails 的长度就是最长递增子序列的长度
  return tails.length;
}`,
        explanation: `## 贪心 + 二分查找

### 核心思想

\`\`\`
关键洞察：
要让递增子序列尽可能长，应该让每个长度的子序列末尾尽可能小。
末尾越小，后面越容易接上更大的数！
\`\`\`

### tails 数组的含义

\`\`\`
tails[i] = 长度为 i+1 的递增子序列的最小末尾元素

例：nums = [10, 9, 2, 5, 3, 7]
长度为 1 的子序列：[10], [9], [2], [5], [3], [7]
  最小末尾 = 2 → tails[0] = 2
长度为 2 的子序列：[2,5], [2,3], [2,7], [3,7], [5,7]
  最小末尾 = 3 → tails[1] = 3
...
\`\`\`

### 执行过程

\`\`\`
nums = [10, 9, 2, 5, 3, 7, 101, 18]

num=10: tails=[] → 追加 → tails=[10]
num=9:  tails=[10] → 替换10 → tails=[9]
num=2:  tails=[9] → 替换9 → tails=[2]
num=5:  tails=[2] → 追加 → tails=[2,5]
num=3:  tails=[2,5] → 替换5 → tails=[2,3]
num=7:  tails=[2,3] → 追加 → tails=[2,3,7]
num=101: tails=[2,3,7] → 追加 → tails=[2,3,7,101]
num=18: tails=[2,3,7,101] → 替换101 → tails=[2,3,7,18]

最终长度 = 4
\`\`\`

### 为什么替换不影响结果？

\`\`\`
替换只是更新"最小末尾"，不改变已有子序列的长度。
替换后的数组可能不是真实的子序列，但长度是正确的！
\`\`\`

### 复杂度
- 时间：O(n log n) - 比 O(n²) 快很多
- 空间：O(n)`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - O(n²)",
        code: `/**
 * 最长递增子序列 - 动态规划 O(n²)
 *
 * 核心思想：
 * 对于每个位置 i，找出所有 j < i 且 nums[j] < nums[i] 的位置，
 * 取 dp[j] 的最大值 + 1。
 *
 * 状态定义：dp[i] = 以 nums[i] 结尾的最长递增子序列长度
 * 状态转移：dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]
 * 基础情况：dp[i] = 1（每个元素自己就是长度为 1 的子序列）
 *
 * 时间复杂度：O(n²) - 双重循环
 * 空间复杂度：O(n) - dp 数组
 */
function lengthOfLIS(nums) {
  const n = nums.length;
  // dp[i] = 以 nums[i] 结尾的最长递增子序列长度
  // 初始化为 1，每个元素自己就是一个子序列
  const dp = new Array(n).fill(1);

  // 记录全局最大长度
  let maxLen = 1;

  // 遍历每个位置
  for (let i = 1; i < n; i++) {
    // 检查所有 j < i 的位置
    for (let j = 0; j < i; j++) {
      // 如果 nums[j] < nums[i]，可以接在 j 后面
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    // 更新全局最大值
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}`,
        explanation: `## 动态规划 - O(n²)

### 算法原理

\`\`\`
定义：dp[i] = 以 nums[i] 结尾的最长递增子序列长度
关键：必须以 nums[i] 结尾！
\`\`\`

### DP 五要素

\`\`\`
1. 状态：dp[i] = 以 nums[i] 结尾的 LIS 长度
2. 转移：dp[i] = max(dp[j] + 1) for j < i, nums[j] < nums[i]
3. 初始：dp[i] = 1
4. 方向：从左到右
5. 答案：max(dp[i])（不是 dp[n-1]！）
\`\`\`

### 执行过程

\`\`\`
nums = [10, 9, 2, 5, 3, 7]

i=0: dp[0]=1  (没有前面的数)
i=1: dp[1]=1  (9<10，不能接)
i=2: dp[2]=1  (2<10, 2<9，不能接)
i=3: dp[3]=max(dp[2]+1)=2  (5>2)
i=4: dp[4]=max(dp[2]+1)=2  (3>2)
i=5: dp[5]=max(dp[2]+1, dp[3]+1, dp[4]+1)=3  (7>2,5,3)

dp = [1, 1, 1, 2, 2, 3]
答案 = max(dp) = 3
\`\`\`

### 为什么答案是 max(dp) 不是 dp[n-1]？

\`\`\`
因为最长子序列不一定以最后一个元素结尾！
例：[1, 3, 2]
dp = [1, 2, 2]
dp[2]=2，但 LIS 是 [1,3] 长度为 2
\`\`\`

### 复杂度
- 时间：O(n²)
- 空间：O(n)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 最长递增子序列 - 递归 + 记忆化
 *
 * 核心思想：
 * 自顶向下思考：以 nums[i] 结尾的 LIS 长度 =
 *   max(以 nums[j] 结尾的 LIS 长度 + 1)，其中 j < i 且 nums[j] < nums[i]
 *
 * 使用记忆化避免重复计算。
 *
 * 时间复杂度：O(n²) - 每个状态计算一次，每个状态需要 O(n) 遍历
 * 空间复杂度：O(n) - 递归栈 + 记忆化数组
 */
function lengthOfLIS(nums) {
  const n = nums.length;
  // 记忆化：memo[i] = 以 nums[i] 结尾的 LIS 长度，-1 表示未计算
  const memo = new Array(n).fill(-1);

  /**
   * 递归计算以 nums[i] 结尾的最长递增子序列长度
   * @param {number} i - 当前位置
   * @returns {number} - LIS 长度
   */
  const dp = (i) => {
    // 如果已计算过，直接返回
    if (memo[i] !== -1) return memo[i];

    // 至少长度为 1（元素自身）
    let maxLen = 1;
    // 遍历所有 j < i
    for (let j = 0; j < i; j++) {
      // 如果 nums[j] < nums[i]，可以接在后面
      if (nums[j] < nums[i]) {
        maxLen = Math.max(maxLen, dp(j) + 1);
      }
    }

    // 存入记忆化
    memo[i] = maxLen;
    return maxLen;
  };

  // 对每个位置求 LIS 长度，取最大值
  let result = 1;
  for (let i = 0; i < n; i++) {
    result = Math.max(result, dp(i));
  }

  return result;
}`,
        explanation: `## 递归 + 记忆化

### 算法原理

自顶向下思考：
\`\`\`
"以 nums[5]=7 结尾的 LIS 长度是多少？"
→ 看看前面哪些数比 7 小
→ 取它们的 LIS 长度的最大值 + 1
\`\`\`

### 递归树

\`\`\`
nums = [2, 5, 3, 7]

dp(3)  (7)
├── dp(2) + 1  (7>3)
│   └── dp(0) + 1  (3>2)
├── dp(1) + 1  (7>5)
│   └── dp(0) + 1  (5>2)
└── dp(0) + 1  (7>2)

dp(0) 被多次调用 → 需要记忆化！
\`\`\`

### 记忆化的作用

\`\`\`
没有记忆化：O(2^n) 指数级
有记忆化：O(n²) 每个状态算一次
\`\`\`

### 与迭代 DP 对比

| 方法 | 思维方式 | 代码风格 |
|-----|---------|---------|
| 迭代 DP | 自底向上 | 两层 for 循环 |
| 记忆化 | 自顶向下 | 递归 + memo |

两种方法时间复杂度相同，只是思考方式不同。

### 复杂度
- 时间：O(n²)
- 空间：O(n)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 5. 单词拆分 (139)
  {
    id: "word-break",
    leetcodeId: 139,
    title: "单词拆分",
    titleEn: "Word Break",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["字典树", "记忆化搜索", "数组", "哈希表", "字符串", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "单词拆分DP",
    description: `给你一个字符串 \`s\` 和一个字符串列表 \`wordDict\` 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 \`s\` 则返回 \`true\`。

**注意**：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "leetcode", wordDict = ["leet","code"]
输出：true
解释：返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "applepenapple", wordDict = ["apple","pen"]
输出：true
解释：返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
     注意，你可以重复使用字典中的单词。
\`\`\`

**示例 3：**
\`\`\`
输入：s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
输出：false
\`\`\``,
    constraints: `- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 1000\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` 和 \`wordDict[i]\` 仅由小写英文字母组成
- \`wordDict\` 中的所有字符串 **互不相同**`,
    initialCode: `function wordBreak(s, wordDict) {
  // 在此处编写你的代码

}`,
    solution: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;

  // dp[i] 表示 s[0...i-1] 是否可以被拆分
  const dp = new Array(n + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[n];
}`,
    testCases: [
      {
        id: "1",
        name: "可拆分",
        input: ["leetcode", ["leet","code"]],
        expected: true
      },
      {
        id: "2",
        name: "重复使用",
        input: ["applepenapple", ["apple","pen"]],
        expected: true
      },
      {
        id: "3",
        name: "不可拆分",
        input: ["catsandog", ["cats","dog","sand","and","cat"]],
        expected: false
      }
    ],
    hints: [
      "dp[i] 表示 s[0...i-1] 是否可以被拆分",
      "dp[i] = dp[j] && wordDict.contains(s[j...i-1])",
      "用 Set 加速单词查找"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i] 表示 s[0...i-1] 是否可以被字典中的单词拼接

状态转移：
- dp[i] = true，如果存在 j < i 使得：
  - dp[j] = true（前 j 个字符可以被拆分）
  - s[j...i-1] 在字典中

边界条件：dp[0] = true

### 复杂度分析
- 时间复杂度：O(n²)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    relatedProblems: ["longest-increasing-subsequence", "coin-change"],
    solutions: [
      {
        name: "动态规划（推荐）",
        code: `/**
 * 单词拆分 - 动态规划（推荐）
 *
 * 核心思想：
 * 判断字符串是否可以被拆分成字典中的单词。
 * 对于每个位置 i，检查是否存在 j < i，使得：
 *   1. s[0...j-1] 可以被拆分（dp[j] = true）
 *   2. s[j...i-1] 在字典中
 *
 * 状态定义：dp[i] = s[0...i-1] 是否可以被拆分
 * 状态转移：dp[i] = dp[j] && wordSet.has(s[j...i-1])
 * 基础情况：dp[0] = true（空字符串可以被拆分）
 *
 * 时间复杂度：O(n²) - 双重循环，每次 slice O(n) 但均摊 O(1)
 * 空间复杂度：O(n) - dp 数组 + Set
 */
function wordBreak(s, wordDict) {
  // 用 Set 加速单词查找，O(1) 时间
  const wordSet = new Set(wordDict);
  const n = s.length;

  // dp[i] 表示 s[0...i-1] 是否可以被字典中的单词拼接
  const dp = new Array(n + 1).fill(false);
  // 基础情况：空字符串可以被拆分
  dp[0] = true;

  // 遍历每个位置 i（s[0...i-1] 的长度）
  for (let i = 1; i <= n; i++) {
    // 尝试每个分割点 j
    for (let j = 0; j < i; j++) {
      // 如果 s[0...j-1] 可以被拆分，且 s[j...i-1] 在字典中
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        dp[i] = true;
        break;  // 找到一种拆分方式即可
      }
    }
  }

  return dp[n];
}`,
        explanation: `## 动态规划

### 算法原理

\`\`\`
问题分解：
s = "leetcode"，字典 = ["leet", "code"]

如果 s 可以被拆分，那么存在一个分割点：
s[0...j-1] 可以被拆分 AND s[j...n-1] 在字典中

例如：j=4 时，"leet" 可拆分，"code" 在字典中
\`\`\`

### DP 五要素

\`\`\`
1. 状态：dp[i] = s[0...i-1] 是否可以被拆分
2. 转移：dp[i] = any(dp[j] && s[j...i-1] in dict)
3. 初始：dp[0] = true
4. 方向：从左到右
5. 答案：dp[n]
\`\`\`

### 执行过程

\`\`\`
s = "leetcode", dict = ["leet", "code"]

dp[0] = true  (空串)
dp[1] = false (l 不在字典)
dp[2] = false (le 不在字典)
dp[3] = false (lee 不在字典)
dp[4] = true  (dp[0] && "leet" ∈ dict)
dp[5] = false
dp[6] = false
dp[7] = false
dp[8] = true  (dp[4] && "code" ∈ dict)
\`\`\`

### 优化点

\`\`\`
1. 用 Set 代替数组，查找 O(1)
2. 找到一种拆分就 break
3. 可以按单词长度优化 j 的范围
\`\`\`

### 复杂度
- 时间：O(n²)
- 空间：O(n)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 单词拆分 - 递归 + 记忆化
 *
 * 核心思想：
 * 自顶向下思考：从位置 start 开始，尝试匹配每个可能的前缀。
 * 如果前缀在字典中，递归检查剩余部分是否可以被拆分。
 *
 * 递推关系：canBreak(start) = any(word ∈ dict && canBreak(start + len(word)))
 * 基础情况：canBreak(s.length) = true（到达末尾，拆分成功）
 *
 * 时间复杂度：O(n²) - 每个起始位置计算一次
 * 空间复杂度：O(n) - 递归栈 + 记忆化
 */
function wordBreak(s, wordDict) {
  // 用 Set 加速单词查找
  const wordSet = new Set(wordDict);
  // 记忆化：存储每个起始位置的结果
  const memo = new Map();

  /**
   * 递归检查从 start 位置开始的子串是否可以被拆分
   * @param {number} start - 起始位置
   * @returns {boolean} - 是否可以拆分
   */
  const canBreak = (start) => {
    // 基础情况：到达字符串末尾，拆分成功
    if (start === s.length) return true;
    // 如果已计算过，直接返回
    if (memo.has(start)) return memo.get(start);

    // 尝试每个可能的结束位置
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      // 如果当前前缀在字典中，且剩余部分可以被拆分
      if (wordSet.has(word) && canBreak(end)) {
        memo.set(start, true);
        return true;
      }
    }

    // 所有分割方式都不行
    memo.set(start, false);
    return false;
  };

  return canBreak(0);
}`,
        explanation: `## 递归 + 记忆化

### 算法原理

自顶向下思考：
\`\`\`
"从位置 0 开始，能否拆分 'leetcode'？"
→ 尝试匹配 "l", "le", "lee", "leet", ...
→ "leet" 在字典中！递归检查 "code"
→ "code" 在字典中，且到达末尾
→ 可以拆分！
\`\`\`

### 递归树

\`\`\`
s = "leetcode", dict = ["leet", "code"]

canBreak(0)
├── "l" 不在字典
├── "le" 不在字典
├── "lee" 不在字典
├── "leet" 在字典 → canBreak(4)
│   ├── "c" 不在字典
│   ├── "co" 不在字典
│   ├── "cod" 不在字典
│   └── "code" 在字典 → canBreak(8) = true
└── 找到！返回 true
\`\`\`

### 记忆化的作用

\`\`\`
例如 s = "aaaa", dict = ["a", "aa"]

不用记忆化：
canBreak(2) 会被多次调用：
  - "aa" → canBreak(2)
  - "a" + "a" → canBreak(2)

用记忆化：每个位置只计算一次
\`\`\`

### 复杂度
- 时间：O(n²)
- 空间：O(n)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "BFS 广度优先搜索",
        code: `/**
 * 单词拆分 - BFS 广度优先搜索
 *
 * 核心思想：
 * 将问题转化为图的可达性问题：
 * - 节点：字符串中的每个位置（0 到 n）
 * - 边：如果 s[i...j] 在字典中，则 i 到 j 有边
 * - 目标：从位置 0 能否到达位置 n
 *
 * BFS 搜索从 0 出发，能否到达 n。
 *
 * 时间复杂度：O(n²) - 每个位置最多入队一次
 * 空间复杂度：O(n) - visited 集合 + 队列
 */
function wordBreak(s, wordDict) {
  // 用 Set 加速单词查找
  const wordSet = new Set(wordDict);
  const n = s.length;
  // visited：记录已访问的位置，避免重复
  const visited = new Set([0]);
  // 队列：BFS 的核心，从位置 0 开始
  const queue = [0];

  while (queue.length > 0) {
    // 取出当前位置
    const start = queue.shift();

    // 尝试每个可能的结束位置
    for (let end = start + 1; end <= n; end++) {
      // 如果已访问过，跳过
      if (visited.has(end)) continue;

      const word = s.slice(start, end);
      // 如果当前子串在字典中
      if (wordSet.has(word)) {
        // 如果到达末尾，拆分成功
        if (end === n) return true;
        // 否则将结束位置加入队列继续搜索
        queue.push(end);
        visited.add(end);
      }
    }
  }

  // 无法到达末尾
  return false;
}`,
        explanation: `## BFS 广度优先搜索

### 算法原理

将问题转化为**图的可达性**问题：
\`\`\`
节点：字符串中的位置 0, 1, 2, ..., n
边：如果 s[i...j] 在字典中，则 i → j 有边
目标：从 0 能否到达 n
\`\`\`

### 图的结构

\`\`\`
s = "leetcode", dict = ["leet", "code", "lee", "t"]

0 ──"leet"──> 4 ──"code"──> 8 ✓
│
└──"lee"───> 3 ──"t"────> 4 ──"code"──> 8 ✓
\`\`\`

### BFS 执行过程

\`\`\`
初始队列：[0]
visited: {0}

取出 0：
  s[0:4]="leet" ∈ dict → 入队 4
  s[0:3]="lee" ∈ dict → 入队 3
队列：[4, 3]
visited: {0, 3, 4}

取出 4：
  s[4:8]="code" ∈ dict → end=8=n，返回 true！
\`\`\`

### 与 DP 对比

| 方法 | 思路 | 特点 |
|-----|-----|-----|
| DP | 逐位置填表 | 一定遍历所有位置 |
| BFS | 按层搜索 | 可能提前找到答案 |

### 复杂度
- 时间：O(n²)
- 空间：O(n)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 6. 杨辉三角 (118)
  {
    id: "pascals-triangle",
    leetcodeId: 118,
    title: "杨辉三角",
    titleEn: "Pascal's Triangle",
    difficulty: "easy",
    category: "dp-1d",
    tags: ["数组", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "杨辉三角",
    description: `给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。

在「杨辉三角」中，每个数是它左上方和右上方的数的和。`,
    examples: `**示例 1：**
\`\`\`
输入：numRows = 5
输出：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
\`\`\`

**示例 2：**
\`\`\`
输入：numRows = 1
输出：[[1]]
\`\`\``,
    constraints: `- \`1 <= numRows <= 30\``,
    initialCode: `function generate(numRows) {
  // 在此处编写代码
}`,
    solution: `function generate(numRows) {
  const result = [];

  for (let i = 0; i < numRows; i++) {
    const row = new Array(i + 1).fill(1);

    for (let j = 1; j < i; j++) {
      row[j] = result[i - 1][j - 1] + result[i - 1][j];
    }

    result.push(row);
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "5行", input: [5], expected: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]] },
      { id: "2", name: "1行", input: [1], expected: [[1]] },
    ],
    hints: [
      "每一行的首尾都是 1",
      "中间的数等于上一行相邻两数之和",
      "第 i 行有 i+1 个数",
    ],
    explanation: `## 解题思路

### 动态规划

杨辉三角的规律：
1. 每行首尾为 1
2. 中间元素 = 上一行相邻两元素之和

### 状态转移

\`\`\`
triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
\`\`\`

### 复杂度分析
- 时间复杂度：O(numRows²)
- 空间复杂度：O(1)（不算输出）`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    relatedProblems: ["pascals-triangle-ii"],
    solutions: [
      {
        name: "动态规划（推荐）",
        code: `/**
 * 杨辉三角 - 动态规划
 *
 * 核心思想：
 * 杨辉三角每个位置的值 = 上一行左上方的值 + 上一行正上方的值
 * 即 triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
 *
 * 边界条件：
 * - 每行的第一个和最后一个元素都是 1
 * - 第 i 行有 i+1 个元素（从 0 开始计数）
 *
 * 时间复杂度：O(n²) - 共 1+2+3+...+n = n(n+1)/2 个元素
 * 空间复杂度：O(1) - 不计算输出数组
 */
function generate(numRows) {
  // 存储最终结果的二维数组
  const result = [];

  // 逐行生成杨辉三角
  for (let i = 0; i < numRows; i++) {
    // 创建第 i 行，长度为 i+1，初始值全为 1
    // 这样首尾元素自动就是 1，只需计算中间元素
    const row = new Array(i + 1).fill(1);

    // 计算中间元素（从第 3 行开始才有中间元素）
    // j 从 1 到 i-1，即跳过首尾的 1
    for (let j = 1; j < i; j++) {
      // 当前位置 = 上一行的 [j-1] + [j]
      // 例如：第 3 行的 2 = 第 2 行的 1 + 1
      row[j] = result[i - 1][j - 1] + result[i - 1][j];
    }

    // 将当前行加入结果
    result.push(row);
  }

  return result;
}`,
        explanation: `## 动态规划法

### 核心思想

\`\`\`
杨辉三角的数学规律：
1. 每行首尾都是 1
2. 中间元素 = 左上 + 右上
3. 第 n 行有 n 个数（从 1 开始计数）
\`\`\`

### 杨辉三角的结构

\`\`\`
        1           第 0 行：1 个元素
       1 1          第 1 行：2 个元素
      1 2 1         第 2 行：3 个元素
     1 3 3 1        第 3 行：4 个元素
    1 4 6 4 1       第 4 行：5 个元素

triangle[2][1] = 2 = triangle[1][0] + triangle[1][1] = 1 + 1
triangle[4][2] = 6 = triangle[3][1] + triangle[3][2] = 3 + 3
\`\`\`

### DP 推导

\`\`\`
状态：triangle[i][j] = 第 i 行第 j 个数的值
转移：triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j]
边界：triangle[i][0] = triangle[i][i] = 1
方向：从上到下，从左到右
答案：整个 triangle 数组
\`\`\`

### 执行过程

\`\`\`
numRows = 5

i=0: row = [1]
i=1: row = [1, 1]
i=2: row = [1, 1+1=2, 1]
i=3: row = [1, 1+2=3, 2+1=3, 1]
i=4: row = [1, 1+3=4, 3+3=6, 3+1=4, 1]

结果：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
\`\`\`

### 复杂度分析

- 时间：O(n²) - 生成 n(n+1)/2 个元素
- 空间：O(1) - 除输出外无额外空间`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 7. 乘积最大子数组 (152)
  {
    id: "maximum-product-subarray",
    leetcodeId: 152,
    title: "乘积最大子数组",
    titleEn: "Maximum Product Subarray",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["数组", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "乘积最大子数组",
    description: `给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案是一个 32 位整数。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [2,3,-2,4]
输出：6
解释：子数组 [2,3] 有最大乘积 6。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [-2,0,-1]
输出：0
解释：结果不能为 2, 因为 [-2,-1] 不是子数组。
\`\`\``,
    constraints: `- \`1 <= nums.length <= 2 * 10^4\`
- \`-10 <= nums[i] <= 10\`
- \`nums\` 的任何子数组的乘积都 保证 是一个 32 位整数`,
    initialCode: `function maxProduct(nums) {
  // 在此处编写代码
}`,
    solution: `function maxProduct(nums) {
  let maxProd = nums[0];
  let minProd = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // 负数会使最大变最小，最小变最大
    if (num < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }

    maxProd = Math.max(num, maxProd * num);
    minProd = Math.min(num, minProd * num);

    result = Math.max(result, maxProd);
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[2,3,-2,4]], expected: 6 },
      { id: "2", name: "示例2", input: [[-2,0,-1]], expected: 0 },
      { id: "3", name: "单个负数", input: [[-2]], expected: -2 },
    ],
    hints: [
      "负数乘负数会变成正数",
      "需要同时维护最大值和最小值",
      "遇到负数时，最大最小值互换",
    ],
    explanation: `## 解题思路

### 动态规划

与最大子数组和不同，乘积有特殊性：
- 负数 × 负数 = 正数
- 所以最小值乘上负数可能变成最大值

### 状态定义

同时维护：
- maxProd：以当前元素结尾的最大乘积
- minProd：以当前元素结尾的最小乘积

### 状态转移

遇到负数时，交换 maxProd 和 minProd：
\`\`\`
maxProd = max(num, maxProd * num)
minProd = min(num, minProd * num)
\`\`\`

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["maximum-subarray"],
    solutions: [
      {
        name: "动态规划（推荐）",
        code: `/**
 * 乘积最大子数组 - 动态规划
 *
 * 核心思想：
 * 与最大子数组和不同，乘积有一个特殊性质：负负得正！
 * 所以我们需要同时维护以当前位置结尾的 最大乘积 和 最小乘积。
 *
 * 为什么需要最小乘积？
 * - 当遇到负数时，最小乘积（可能是负数）乘以负数会变成最大乘积
 * - 例如：[-2, 3, -4]，当遍历到 -4 时，之前的最小乘积 -6 乘以 -4 = 24
 *
 * 状态定义：
 * - maxProd：以当前元素结尾的最大乘积
 * - minProd：以当前元素结尾的最小乘积
 *
 * 状态转移（遇到负数时交换 max 和 min）：
 * - maxProd = max(num, maxProd * num)
 * - minProd = min(num, minProd * num)
 *
 * 时间复杂度：O(n) - 单次遍历
 * 空间复杂度：O(1) - 只用常数变量
 */
function maxProduct(nums) {
  // maxProd：以当前位置结尾的子数组的最大乘积
  let maxProd = nums[0];
  // minProd：以当前位置结尾的子数组的最小乘积（用于处理负数）
  let minProd = nums[0];
  // result：全局最大乘积
  let result = nums[0];

  // 从第二个元素开始遍历
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];

    // 关键技巧：如果当前数是负数，交换 maxProd 和 minProd
    // 因为负数会使大的变小、小的变大
    // 交换后，原来的 minProd（最小负数）乘以负数会变成最大正数
    if (num < 0) {
      [maxProd, minProd] = [minProd, maxProd];
    }

    // 状态转移：
    // 要么从当前位置重新开始（num 本身）
    // 要么接在前面的子数组后面（maxProd/minProd * num）
    maxProd = Math.max(num, maxProd * num);
    minProd = Math.min(num, minProd * num);

    // 更新全局最大值
    result = Math.max(result, maxProd);
  }

  return result;
}`,
        explanation: `## 动态规划法

### 核心思想

\`\`\`
乘积与求和的关键区别：负负得正！

例如：nums = [-2, 3, -4]
- 如果只维护最大乘积：
  位置 0: max = -2
  位置 1: max = max(-2*3, 3) = 3
  位置 2: max = max(3*-4, -4) = -4  ❌ 错误！

- 同时维护最大和最小乘积：
  位置 0: max = -2, min = -2
  位置 1: max = 3,  min = -6
  位置 2: 遇到负数，交换 → max = -6, min = 3
         max = max(-6*-4, -4) = 24  ✓ 正确！
\`\`\`

### 为什么需要最小乘积？

\`\`\`
三种情况可能产生最大乘积：

1. 正数 × 正数 → 需要之前的最大乘积
2. 负数 × 负数 → 需要之前的最小乘积（可能是负数）
3. 当前数本身（重新开始）

所以必须同时维护 max 和 min！
\`\`\`

### 交换技巧

\`\`\`
当 nums[i] < 0 时：
- maxProd * nums[i] 会变成很小的数（负数）
- minProd * nums[i] 会变成很大的数（正数）

所以在计算前先交换，让逻辑更清晰：
if (num < 0) swap(maxProd, minProd)
\`\`\`

### 执行过程

\`\`\`
nums = [2, 3, -2, 4]

初始：maxProd = 2, minProd = 2, result = 2

i=1, num=3 (正数，不交换)：
  maxProd = max(3, 2*3) = 6
  minProd = min(3, 2*3) = 3
  result = max(2, 6) = 6

i=2, num=-2 (负数，交换)：
  交换后：maxProd = 3, minProd = 6
  maxProd = max(-2, 3*-2) = -2
  minProd = min(-2, 6*-2) = -12
  result = max(6, -2) = 6

i=3, num=4 (正数，不交换)：
  maxProd = max(4, -2*4) = 4
  minProd = min(4, -12*4) = -48
  result = max(6, 4) = 6

答案：6（子数组 [2, 3]）
\`\`\`

### 处理零的情况

\`\`\`
nums = [-2, 0, -1]

i=0: max = -2, min = -2, result = -2
i=1, num=0:
  max = max(0, -2*0) = 0
  min = min(0, -2*0) = 0
  result = max(-2, 0) = 0
i=2, num=-1:
  交换后：max = 0, min = 0
  max = max(-1, 0*-1) = 0
  min = min(-1, 0*-1) = -1
  result = max(0, 0) = 0

零会"切断"乘积链，相当于重新开始！
\`\`\`

### 复杂度分析

- 时间：O(n) - 单次遍历
- 空间：O(1) - 常数变量`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 8. 分割等和子集 (416)
  {
    id: "partition-equal-subset-sum",
    leetcodeId: 416,
    title: "分割等和子集",
    titleEn: "Partition Equal Subset Sum",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["数组", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "分割等和子集",
    description: `给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,5,11,5]
输出：true
解释：数组可以分割成 [1, 5, 5] 和 [11]。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1,2,3,5]
输出：false
解释：数组不能分割成两个元素和相等的子集。
\`\`\``,
    constraints: `- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\``,
    initialCode: `function canPartition(nums) {
  // 在此处编写代码
}`,
    solution: `function canPartition(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);

  // 和为奇数，无法等分
  if (sum % 2 !== 0) return false;

  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    // 从后往前遍历，避免重复使用同一个数
    for (let j = target; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}`,
    testCases: [
      { id: "1", name: "可分割", input: [[1,5,11,5]], expected: true },
      { id: "2", name: "不可分割", input: [[1,2,3,5]], expected: false },
    ],
    hints: [
      "问题转化为：能否选出若干数，使和为 sum/2",
      "这是 0-1 背包问题",
      "从后往前遍历避免重复使用",
    ],
    explanation: `## 解题思路

### 问题转化

如果能分成两个和相等的子集，说明：
- 总和必须是偶数
- 存在一个子集，其和为 sum/2

### 0-1 背包

这是经典的 0-1 背包问题：
- 背包容量：sum/2
- 物品重量：nums[i]
- 目标：能否恰好装满背包

### 状态定义

dp[j] = 能否选出若干数使得和为 j

### 状态转移

\`\`\`
dp[j] = dp[j] || dp[j - num]
\`\`\`

### 为什么从后往前？

避免同一个数被重复使用（0-1 背包特性）

### 复杂度分析
- 时间复杂度：O(n × target)
- 空间复杂度：O(target)`,
    timeComplexity: "O(n × target)",
    spaceComplexity: "O(target)",
    relatedProblems: ["target-sum"],
    solutions: [
      {
        name: "一维 DP（推荐）",
        code: `/**
 * 分割等和子集 - 一维 DP（0-1 背包空间优化）
 *
 * 核心思想：
 * 问题转化：能否将数组分成两个和相等的子集？
 * → 等价于：能否从数组中选出若干元素，使其和 = 总和 / 2？
 * → 这是经典的 0-1 背包问题！
 *
 * 0-1 背包类比：
 * - 背包容量 = sum / 2
 * - 物品重量 = nums[i]
 * - 目标：能否恰好装满背包？
 *
 * 状态定义：dp[j] = 能否选出若干元素使得和为 j
 * 状态转移：dp[j] = dp[j] || dp[j - num]
 *           （不选当前元素）||（选当前元素）
 *
 * 关键：从后往前遍历 j，避免同一元素被重复使用（0-1 背包特性）
 *
 * 时间复杂度：O(n × target) - n 个元素，每个元素遍历 target 次
 * 空间复杂度：O(target) - 一维 dp 数组
 */
function canPartition(nums) {
  // 计算数组总和
  const sum = nums.reduce((a, b) => a + b, 0);

  // 如果总和是奇数，不可能分成两个相等的子集
  if (sum % 2 !== 0) return false;

  // 目标值：总和的一半
  const target = sum / 2;

  // dp[j] 表示能否选出若干元素使得和为 j
  // 初始化为 false
  const dp = new Array(target + 1).fill(false);
  // 基础情况：和为 0 总是可达的（不选任何元素）
  dp[0] = true;

  // 遍历每个元素（相当于遍历每个物品）
  for (const num of nums) {
    // 从后往前遍历！这是 0-1 背包的关键
    // 如果从前往后，同一个 num 可能被重复使用
    for (let j = target; j >= num; j--) {
      // dp[j] = dp[j] || dp[j - num]
      // 不选 num：dp[j] 保持不变
      // 选 num：如果 dp[j - num] 为 true，则 dp[j] 也为 true
      dp[j] = dp[j] || dp[j - num];
    }
  }

  // 返回能否恰好凑出 target
  return dp[target];
}`,
        explanation: `## 一维 DP（0-1 背包空间优化）

### 问题转化

\`\`\`
原问题：能否将数组分成两个和相等的子集？

转化分析：
- 如果能分成两个和相等的子集
- 那么每个子集的和 = 总和 / 2
- 所以问题变成：能否选出若干元素使和 = sum/2？

这就是经典的 0-1 背包问题！
\`\`\`

### 0-1 背包类比

\`\`\`
背包问题           本题
────────          ────────
背包容量           sum / 2
物品重量           nums[i]
能否恰好装满？     能否选出元素和 = target？
\`\`\`

### 为什么从后往前遍历？

\`\`\`
从前往后的问题：同一元素被重复使用

例：nums = [1, 5], target = 2
dp = [true, false, false]

从前往后处理 num=1：
  j=1: dp[1] = dp[1] || dp[0] = true
  j=2: dp[2] = dp[2] || dp[1] = true  ← 错误！1 被用了两次

从后往前处理 num=1：
  j=2: dp[2] = dp[2] || dp[1] = false
  j=1: dp[1] = dp[1] || dp[0] = true  ← 正确！
\`\`\`

### 执行过程

\`\`\`
nums = [1, 5, 11, 5], sum = 22, target = 11

初始 dp = [T, F, F, F, F, F, F, F, F, F, F, F]
          0  1  2  3  4  5  6  7  8  9  10 11

处理 num=1（从后往前）：
  j=1: dp[1] = dp[1] || dp[0] = T
  dp = [T, T, F, F, F, F, F, F, F, F, F, F]

处理 num=5（从后往前）：
  j=6: dp[6] = dp[6] || dp[1] = T
  j=5: dp[5] = dp[5] || dp[0] = T
  dp = [T, T, F, F, F, T, T, F, F, F, F, F]

处理 num=11（从后往前）：
  j=11: dp[11] = dp[11] || dp[0] = T  ← 找到！
  ...
  dp = [T, T, F, F, F, T, T, F, F, F, F, T]

dp[11] = true，可以分割！
\`\`\`

### 复杂度分析

- 时间：O(n × target)
- 空间：O(target) - 比二维优化很多！`,
        timeComplexity: "O(n × target)",
        spaceComplexity: "O(target)",
      },
      {
        name: "二维 DP（易理解）",
        code: `/**
 * 分割等和子集 - 二维 DP（标准 0-1 背包）
 *
 * 核心思想：
 * 用二维数组表示状态，更容易理解 0-1 背包的本质。
 * dp[i][j] = 前 i 个数能否选出若干数使和为 j
 *
 * 状态转移：
 * - 不选第 i 个数：dp[i][j] = dp[i-1][j]
 * - 选第 i 个数：dp[i][j] = dp[i-1][j-num]（前提：j >= num）
 * - 综合：dp[i][j] = dp[i-1][j] || dp[i-1][j-num]
 *
 * 时间复杂度：O(n × target)
 * 空间复杂度：O(n × target) - 二维 dp 数组
 */
function canPartition(nums) {
  // 计算总和
  const sum = nums.reduce((a, b) => a + b, 0);

  // 奇数无法等分
  if (sum % 2 !== 0) return false;

  const n = nums.length;
  const target = sum / 2;

  // dp[i][j] = 前 i 个数能否选出若干数使和为 j
  // 创建 (n+1) × (target+1) 的二维数组
  const dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(false));

  // 基础情况：和为 0 总是可达（不选任何数）
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  // 遍历每个数（物品）
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];  // 当前数（注意索引偏移）

    // 遍历每个目标和（背包容量）
    for (let j = 1; j <= target; j++) {
      if (j < num) {
        // 当前数太大，无法选择，只能不选
        dp[i][j] = dp[i - 1][j];
      } else {
        // 可以选或不选
        // 不选：dp[i-1][j]
        // 选：dp[i-1][j-num]（前 i-1 个数凑出 j-num，再加上 num）
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      }
    }
  }

  // 前 n 个数能否凑出 target
  return dp[n][target];
}`,
        explanation: `## 二维 DP（标准 0-1 背包）

### 状态定义

\`\`\`
dp[i][j] = 前 i 个数能否选出若干数使和为 j

例：dp[3][5] = true 表示前 3 个数能选出若干数凑出和为 5
\`\`\`

### 状态转移

\`\`\`
对于第 i 个数 nums[i-1]，有两种选择：

1. 不选它：dp[i][j] = dp[i-1][j]
   （不用这个数，看前 i-1 个数能否凑出 j）

2. 选它（前提 j >= num）：dp[i][j] = dp[i-1][j-num]
   （用这个数，看前 i-1 个数能否凑出 j-num）

综合：dp[i][j] = dp[i-1][j] || dp[i-1][j-num]
\`\`\`

### DP 表格示例

\`\`\`
nums = [1, 5, 11, 5], target = 11

     j:  0   1   2   3   4   5   6   7   8   9  10  11
i=0:    [T] [F] [F] [F] [F] [F] [F] [F] [F] [F] [F] [F]
i=1(1): [T] [T] [F] [F] [F] [F] [F] [F] [F] [F] [F] [F]
i=2(5): [T] [T] [F] [F] [F] [T] [T] [F] [F] [F] [F] [F]
i=3(11):[T] [T] [F] [F] [F] [T] [T] [F] [F] [F] [F] [T]
i=4(5): [T] [T] [F] [F] [F] [T] [T] [F] [F] [F] [T] [T]

dp[4][11] = T，可以分割！
子集：[1, 5, 5] 和 [11]
\`\`\`

### 与一维 DP 对比

\`\`\`
二维 DP：更容易理解，空间 O(n × target)
一维 DP：空间优化后，只需 O(target)

一维是二维的滚动优化，每一行只依赖上一行
\`\`\`

### 复杂度分析

- 时间：O(n × target)
- 空间：O(n × target)`,
        timeComplexity: "O(n × target)",
        spaceComplexity: "O(n × target)",
      },
    ],
  },

  // 9. 最大子数组和 (53)
  {
    id: "maximum-subarray",
    leetcodeId: 53,
    title: "最大子数组和",
    titleEn: "Maximum Subarray",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["数组", "动态规划", "分治"],
    frontendRelevance: "high",
    frontendNote: "Kadane算法，经典",
    description: `给你一个整数数组 \`nums\`，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**子数组** 是数组中的一个连续部分。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1]
输出：1
\`\`\`

**示例 3：**
\`\`\`
输入：nums = [5,4,-1,7,8]
输出：23
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`

**进阶：** 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 **分治法** 求解。`,
    initialCode: `function maxSubArray(nums) {
  // 在此处编写你的代码

}`,
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 要么加入当前子数组，要么从当前位置重新开始
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 },
      { id: "2", name: "单元素", input: [[1]], expected: 1 },
      { id: "3", name: "全正数", input: [[5,4,-1,7,8]], expected: 23 },
      { id: "4", name: "全负数", input: [[-1,-2,-3]], expected: -1 },
    ],
    hints: [
      "使用 Kadane 算法",
      "dp[i] 表示以 nums[i] 结尾的最大子数组和",
      "状态转移：dp[i] = max(nums[i], dp[i-1] + nums[i])",
    ],
    explanation: `## 解题思路

### Kadane 算法（动态规划）

1. dp[i] 表示以 nums[i] 结尾的最大子数组和
2. 对于每个位置，有两个选择：
   - 加入前面的子数组：dp[i-1] + nums[i]
   - 从当前位置重新开始：nums[i]
3. 取两者的较大值

### 空间优化
由于 dp[i] 只依赖 dp[i-1]，可以只用一个变量记录。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["best-time-to-buy-and-sell-stock", "maximum-product-subarray"],
    solutions: [
      {
        name: "Kadane 算法（推荐）",
        code: `/**
 * 最大子数组和 - Kadane 算法（空间优化的 DP）
 *
 * 核心思想：
 * Kadane 算法是动态规划的空间优化版本，只用两个变量：
 * - currentSum：以当前元素结尾的最大子数组和
 * - maxSum：全局最大子数组和
 *
 * 对于每个位置 i，有两个选择：
 * 1. 加入前面的子数组：currentSum + nums[i]
 * 2. 从当前位置重新开始：nums[i]
 *
 * 选择较大的那个作为新的 currentSum。
 *
 * 直觉理解：
 * 如果前面的累加和是负数，还不如直接丢弃，从当前位置重新开始！
 *
 * 时间复杂度：O(n) - 单次遍历
 * 空间复杂度：O(1) - 只用常数变量
 */
function maxSubArray(nums) {
  // maxSum：记录全局最大子数组和
  let maxSum = nums[0];
  // currentSum：记录以当前元素结尾的最大子数组和
  let currentSum = nums[0];

  // 从第二个元素开始遍历
  for (let i = 1; i < nums.length; i++) {
    // 核心决策：要么加入前面的子数组，要么从当前位置重新开始
    // 如果 currentSum < 0，还不如直接从 nums[i] 重新开始
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    // 更新全局最大值
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
        explanation: `## Kadane 算法（空间优化的 DP）

### 核心思想

\`\`\`
关键洞察：如果前面的累加和是负数，还不如丢弃！

例如：nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

遍历到 4 时，前面的累加和是 -2 + 1 - 3 = -4
-4 + 4 = 0 < 4
所以从 4 重新开始更好！
\`\`\`

### 算法本质

\`\`\`
Kadane 算法本质是 DP 的空间优化：

原始 DP：dp[i] = max(nums[i], dp[i-1] + nums[i])
优化后：currentSum = max(nums[i], currentSum + nums[i])

因为 dp[i] 只依赖 dp[i-1]，所以只需一个变量！
\`\`\`

### 执行过程

\`\`\`
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

i=0: currentSum = -2, maxSum = -2
i=1: currentSum = max(1, -2+1) = max(1, -1) = 1, maxSum = 1
i=2: currentSum = max(-3, 1-3) = max(-3, -2) = -2, maxSum = 1
i=3: currentSum = max(4, -2+4) = max(4, 2) = 4, maxSum = 4
i=4: currentSum = max(-1, 4-1) = max(-1, 3) = 3, maxSum = 4
i=5: currentSum = max(2, 3+2) = max(2, 5) = 5, maxSum = 5
i=6: currentSum = max(1, 5+1) = max(1, 6) = 6, maxSum = 6
i=7: currentSum = max(-5, 6-5) = max(-5, 1) = 1, maxSum = 6
i=8: currentSum = max(4, 1+4) = max(4, 5) = 5, maxSum = 6

答案：6（子数组 [4, -1, 2, 1]）
\`\`\`

### 处理全负数数组

\`\`\`
nums = [-3, -1, -2]

i=0: currentSum = -3, maxSum = -3
i=1: currentSum = max(-1, -3-1) = max(-1, -4) = -1, maxSum = -1
i=2: currentSum = max(-2, -1-2) = max(-2, -3) = -2, maxSum = -1

答案：-1（选最大的那个负数）
\`\`\`

### 复杂度分析

- 时间：O(n) - 只需一次遍历
- 空间：O(1) - 只用两个变量`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划（标准写法）",
        code: `/**
 * 最大子数组和 - 动态规划（标准写法）
 *
 * 核心思想：
 * 定义 dp[i] 为以 nums[i] 结尾的最大子数组和。
 * 注意：必须以 nums[i] 结尾！这是关键。
 *
 * 状态转移：
 * dp[i] = max(nums[i], dp[i-1] + nums[i])
 *
 * 两种选择：
 * - nums[i]：从当前位置重新开始（放弃前面的子数组）
 * - dp[i-1] + nums[i]：接在前面的子数组后面
 *
 * 答案：max(dp[i]) for all i
 * 注意：答案不是 dp[n-1]！因为最大子数组不一定以最后一个元素结尾。
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) - dp 数组
 */
function maxSubArray(nums) {
  const n = nums.length;
  // dp[i] = 以 nums[i] 结尾的最大子数组和
  const dp = new Array(n);
  // 基础情况：第一个元素自成一个子数组
  dp[0] = nums[0];
  // 记录全局最大值
  let maxSum = dp[0];

  // 从第二个元素开始
  for (let i = 1; i < n; i++) {
    // 状态转移：要么从当前位置开始，要么接在前面后面
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    // 更新全局最大值
    maxSum = Math.max(maxSum, dp[i]);
  }

  return maxSum;
}`,
        explanation: `## 动态规划（标准写法）

### 状态定义

\`\`\`
dp[i] = 以 nums[i] 结尾的最大子数组和

关键：必须以 nums[i] 结尾！

这样定义的好处：
- 保证子数组是连续的
- 状态转移只需考虑是否连接前一个状态
\`\`\`

### DP 五要素

\`\`\`
1. 状态：dp[i] = 以 nums[i] 结尾的最大和
2. 转移：dp[i] = max(nums[i], dp[i-1] + nums[i])
3. 初始：dp[0] = nums[0]
4. 方向：从左到右
5. 答案：max(dp[i])（不是 dp[n-1]！）
\`\`\`

### 为什么答案是 max(dp) 而不是 dp[n-1]？

\`\`\`
例：nums = [2, 1, -5, 4, -2]

dp[0] = 2
dp[1] = max(1, 2+1) = 3  ← 最大！
dp[2] = max(-5, 3-5) = -2
dp[3] = max(4, -2+4) = 4
dp[4] = max(-2, 4-2) = 2

最大子数组和 = max(dp) = 3，不是 dp[4] = 2
最大子数组是 [2, 1]，不以最后一个元素结尾！
\`\`\`

### 执行过程可视化

\`\`\`
nums =  [-2, 1, -3, 4, -1, 2, 1, -5, 4]
dp =    [-2, 1, -2, 4,  3, 5, 6,  1, 5]
                      ↑           ↑
                    max          max
                  子数组       子数组
                  [4]      [4,-1,2,1]

最终答案 = max(dp) = 6
\`\`\`

### 复杂度分析

- 时间：O(n)
- 空间：O(n) - 可优化为 O(1)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "分治法",
        code: `/**
 * 最大子数组和 - 分治法
 *
 * 核心思想：
 * 将数组分成左右两半，最大子数组只有三种可能：
 * 1. 完全在左半部分
 * 2. 完全在右半部分
 * 3. 跨越中点（左右都有一部分）
 *
 * 递归求解左右两半，再计算跨越中点的最大和，取三者最大值。
 *
 * 跨越中点的计算：
 * - 从中点向左找最大和（必须包含 mid）
 * - 从中点向右找最大和（必须包含 mid+1）
 * - 两者相加
 *
 * 时间复杂度：O(n log n) - T(n) = 2T(n/2) + O(n)
 * 空间复杂度：O(log n) - 递归栈深度
 */
function maxSubArray(nums) {
  // 调用辅助函数，传入数组和边界
  return maxSubArrayHelper(nums, 0, nums.length - 1);
}

/**
 * 递归辅助函数
 * @param {number[]} nums - 原数组
 * @param {number} left - 左边界
 * @param {number} right - 右边界
 * @returns {number} - [left, right] 范围内的最大子数组和
 */
function maxSubArrayHelper(nums, left, right) {
  // 基础情况：只有一个元素
  if (left === right) {
    return nums[left];
  }

  // 找中点
  const mid = Math.floor((left + right) / 2);

  // 递归求解左半部分的最大子数组和
  const leftMax = maxSubArrayHelper(nums, left, mid);
  // 递归求解右半部分的最大子数组和
  const rightMax = maxSubArrayHelper(nums, mid + 1, right);
  // 计算跨越中点的最大子数组和
  const crossMax = maxCrossingSum(nums, left, mid, right);

  // 返回三者中的最大值
  return Math.max(leftMax, rightMax, crossMax);
}

/**
 * 计算跨越中点的最大子数组和
 * @param {number[]} nums - 原数组
 * @param {number} left - 左边界
 * @param {number} mid - 中点
 * @param {number} right - 右边界
 * @returns {number} - 跨越中点的最大和
 */
function maxCrossingSum(nums, left, mid, right) {
  // 从中点向左扩展，找到左半部分的最大和
  // 必须包含 nums[mid]
  let leftSum = -Infinity;
  let sum = 0;
  for (let i = mid; i >= left; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }

  // 从中点向右扩展，找到右半部分的最大和
  // 必须包含 nums[mid + 1]
  let rightSum = -Infinity;
  sum = 0;
  for (let i = mid + 1; i <= right; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }

  // 返回跨越中点的总和
  return leftSum + rightSum;
}`,
        explanation: `## 分治法

### 核心思想

\`\`\`
将问题分解为三个子问题：

最大子数组在哪里？
1. 完全在左半部分 → 递归求解
2. 完全在右半部分 → 递归求解
3. 跨越中点 → 单独计算
\`\`\`

### 分治示意图

\`\`\`
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]

             [-2, 1, -3, 4, -1, 2, 1, -5, 4]
                        /    \\
           [-2, 1, -3, 4]    [-1, 2, 1, -5, 4]
              /    \\              /    \\
          [-2, 1] [-3, 4]    [-1, 2] [1, -5, 4]
            ...     ...        ...     ...

三种情况：
- 左半部分最大：在 [-2, 1, -3, 4] 中
- 右半部分最大：在 [-1, 2, 1, -5, 4] 中
- 跨越中点：... 4, -1 ... 必须包含 4 和 -1
\`\`\`

### 跨越中点的计算

\`\`\`
mid = 3 (元素 4)

向左扩展（必须包含 nums[3]=4）：
  i=3: sum=4, leftSum=4
  i=2: sum=4-3=1, leftSum=4
  i=1: sum=1+1=2, leftSum=4
  i=0: sum=2-2=0, leftSum=4
  → leftSum = 4

向右扩展（必须包含 nums[4]=-1）：
  i=4: sum=-1, rightSum=-1
  i=5: sum=-1+2=1, rightSum=1
  i=6: sum=1+1=2, rightSum=2
  i=7: sum=2-5=-3, rightSum=2
  i=8: sum=-3+4=1, rightSum=2
  → rightSum = 2

跨越中点的最大和 = 4 + 2 = 6
\`\`\`

### 时间复杂度分析

\`\`\`
递推关系：T(n) = 2T(n/2) + O(n)

根据主定理（Master Theorem）：
- a = 2, b = 2, d = 1
- a = b^d
- T(n) = O(n log n)

不如 Kadane 算法的 O(n)，但展示了分治思想！
\`\`\`

### 复杂度分析

- 时间：O(n log n)
- 空间：O(log n) - 递归栈深度`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
    ],
  },

  // 10. 完全平方数 (279)
  {
    id: "perfect-squares",
    leetcodeId: 279,
    title: "完全平方数",
    titleEn: "Perfect Squares",
    difficulty: "medium",
    category: "dp-1d",
    tags: ["动态规划", "数学", "BFS"],
    frontendRelevance: "low",
    frontendNote: "完全平方数",
    description: `给你一个整数 \`n\`，返回 **和为 \`n\` 的完全平方数的最少数量**。

**完全平方数** 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，\`1\`、\`4\`、\`9\` 和 \`16\` 都是完全平方数，而 \`3\` 和 \`11\` 不是。`,
    examples: `**示例 1：**
\`\`\`
输入：n = 12
输出：3
解释：12 = 4 + 4 + 4
\`\`\`

**示例 2：**
\`\`\`
输入：n = 13
输出：2
解释：13 = 4 + 9
\`\`\``,
    constraints: `- \`1 <= n <= 10^4\``,
    initialCode: `function numSquares(n) {
  // 在此处编写你的代码

}`,
    solution: `function numSquares(n) {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}`,
    testCases: [
      { id: "1", name: "示例1", input: [12], expected: 3 },
      { id: "2", name: "示例2", input: [13], expected: 2 },
      { id: "3", name: "完全平方数", input: [16], expected: 1 },
      { id: "4", name: "小数", input: [1], expected: 1 },
    ],
    hints: [
      "类似于完全背包问题",
      "dp[i] 表示和为 i 的完全平方数的最少数量",
      "遍历所有可能的完全平方数 j*j",
    ],
    explanation: `## 解题思路

### 动态规划（完全背包）

1. dp[i] 表示和为 i 的完全平方数的最少数量
2. 对于每个 i，遍历所有 j*j <= i 的完全平方数
3. 状态转移：dp[i] = min(dp[i], dp[i - j*j] + 1)

### 边界条件
- dp[0] = 0，和为 0 不需要任何数

### 复杂度分析
- 时间复杂度：O(n × √n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n × √n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["coin-change", "climbing-stairs"],
    solutions: [
      {
        name: "动态规划（推荐）",
        code: `/**
 * 完全平方数 - 动态规划（完全背包）
 *
 * 核心思想：
 * 将问题看作完全背包问题：
 * - 背包容量 = n
 * - 物品 = 所有完全平方数 (1, 4, 9, 16, ...)
 * - 每个物品可以使用无限次（完全背包）
 * - 目标：恰好装满背包所需的最少物品数
 *
 * 状态定义：dp[i] = 和为 i 的完全平方数的最少数量
 * 状态转移：dp[i] = min(dp[i - j*j] + 1) for all j*j <= i
 *
 * 时间复杂度：O(n × √n) - 外层 n，内层 √n 个完全平方数
 * 空间复杂度：O(n) - dp 数组
 */
function numSquares(n) {
  // dp[i] = 和为 i 的完全平方数的最少数量
  // 初始化为 Infinity，表示还未计算
  const dp = new Array(n + 1).fill(Infinity);
  // 基础情况：和为 0 不需要任何完全平方数
  dp[0] = 0;

  // 遍历每个目标和 i
  for (let i = 1; i <= n; i++) {
    // 尝试每个可能的完全平方数 j*j
    // j 从 1 开始，直到 j*j <= i
    for (let j = 1; j * j <= i; j++) {
      // 选择 j*j 这个完全平方数
      // dp[i - j*j] + 1：先凑出 i - j*j，再加一个 j*j
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}`,
        explanation: `## 动态规划（完全背包）

### 问题转化

\`\`\`
原问题：n 最少能拆成几个完全平方数之和？

转化为完全背包：
- 背包容量：n
- 物品：1, 4, 9, 16, 25, ... (完全平方数)
- 每个物品可用无限次
- 目标：恰好装满背包的最少物品数
\`\`\`

### DP 五要素

\`\`\`
1. 状态：dp[i] = 和为 i 的完全平方数的最少数量
2. 转移：dp[i] = min(dp[i - j²] + 1) for j² ≤ i
3. 初始：dp[0] = 0，其他为 Infinity
4. 方向：从小到大
5. 答案：dp[n]
\`\`\`

### 状态转移解释

\`\`\`
dp[12] 怎么算？

可以由以下状态转移而来：
- dp[12 - 1] + 1 = dp[11] + 1  (选 1)
- dp[12 - 4] + 1 = dp[8] + 1   (选 4)
- dp[12 - 9] + 1 = dp[3] + 1   (选 9)

取最小值！
\`\`\`

### 执行过程

\`\`\`
n = 12

dp[0] = 0
dp[1] = dp[0] + 1 = 1       (1 = 1)
dp[2] = dp[1] + 1 = 2       (2 = 1+1)
dp[3] = dp[2] + 1 = 3       (3 = 1+1+1)
dp[4] = min(dp[3]+1, dp[0]+1) = 1  (4 = 4)
dp[5] = min(dp[4]+1, dp[1]+1) = 2  (5 = 4+1)
dp[6] = min(dp[5]+1, dp[2]+1) = 3  (6 = 4+1+1)
dp[7] = min(dp[6]+1, dp[3]+1) = 4  (7 = 4+1+1+1)
dp[8] = min(dp[7]+1, dp[4]+1) = 2  (8 = 4+4)
dp[9] = min(dp[8]+1, dp[5]+1, dp[0]+1) = 1  (9 = 9)
dp[10] = min(dp[9]+1, dp[6]+1, dp[1]+1) = 2  (10 = 9+1)
dp[11] = min(dp[10]+1, dp[7]+1, dp[2]+1) = 3  (11 = 9+1+1)
dp[12] = min(dp[11]+1, dp[8]+1, dp[3]+1) = 3  (12 = 4+4+4)

答案：3
\`\`\`

### 与零钱兑换对比

\`\`\`
零钱兑换：coins = [1, 2, 5], amount = 11
完全平方数：coins = [1, 4, 9, 16, ...], amount = n

本质是同一类问题！
\`\`\`

### 复杂度分析

- 时间：O(n × √n) - 完全平方数个数是 √n
- 空间：O(n)`,
        timeComplexity: "O(n × √n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "BFS",
        code: `/**
 * 完全平方数 - BFS 广度优先搜索
 *
 * 核心思想：
 * 将问题转化为图的最短路径问题：
 * - 节点：0 到 n 的所有整数
 * - 边：如果 i - j² >= 0，则 i 到 i - j² 有边（权重为 1）
 * - 目标：从 n 到 0 的最短路径长度
 *
 * BFS 的特点：第一次到达目标节点时，路径长度一定是最短的。
 *
 * 时间复杂度：O(n × √n) - 每个节点最多入队一次，每个节点有 √n 条边
 * 空间复杂度：O(n) - visited 集合 + 队列
 */
function numSquares(n) {
  // 预计算所有可能用到的完全平方数
  const squares = [];
  for (let i = 1; i * i <= n; i++) {
    squares.push(i * i);
  }

  // BFS 初始化
  const queue = [n];        // 从 n 开始
  const visited = new Set([n]);  // 记录已访问的节点
  let level = 0;            // 当前层数（即使用的完全平方数个数）

  while (queue.length > 0) {
    level++;  // 进入下一层
    const size = queue.length;

    // 遍历当前层的所有节点
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      // 尝试减去每个完全平方数
      for (const sq of squares) {
        const next = curr - sq;

        // 如果恰好减到 0，找到答案！
        if (next === 0) return level;
        // 如果 next < 0，后面的完全平方数更大，都不用尝试了
        if (next < 0) break;

        // 如果未访问过，加入队列
        if (!visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }

  return level;
}`,
        explanation: `## BFS 广度优先搜索

### 问题建模

\`\`\`
将问题看作图的最短路径：

节点：0, 1, 2, ..., n
边：如果 i - j² >= 0，则 i → i - j² 有边

例：n = 12
12 → 11 (减 1)
12 → 8  (减 4)
12 → 3  (减 9)

目标：找 n → 0 的最短路径
\`\`\`

### 为什么用 BFS？

\`\`\`
BFS 的核心特性：
每条边权重相同时，BFS 第一次到达目标就是最短路径！

因为 BFS 是"层序遍历"：
- 第 1 层：减去 1 个完全平方数能到达的所有数
- 第 2 层：减去 2 个完全平方数能到达的所有数
- ...

第一次到达 0 时，所在的层数就是答案！
\`\`\`

### 执行过程

\`\`\`
n = 12, squares = [1, 4, 9]

level=1: queue=[12]
  12-1=11, 12-4=8, 12-9=3
  queue=[11, 8, 3]

level=2: queue=[11, 8, 3]
  11→[10,7,2], 8→[7,4], 3→[2]
  queue=[10, 7, 2, 4]  (去重)

level=3: queue=[10, 7, 2, 4]
  10→[9,6,1], 7→[6,3], 2→[1], 4→[3,0]
                                    ↑
                              找到 0！

答案：3
\`\`\`

### 与 DP 对比

\`\`\`
DP：必须计算所有 dp[0] 到 dp[n]
BFS：可能提前找到答案（如果运气好）

但最坏情况下，两者复杂度相同。
\`\`\`

### 复杂度分析

- 时间：O(n × √n)
- 空间：O(n)`,
        timeComplexity: "O(n × √n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "数学方法（四平方和定理）",
        code: `/**
 * 完全平方数 - 数学方法（四平方和定理）
 *
 * 核心思想：
 * 利用数学定理直接判断答案：
 *
 * 拉格朗日四平方和定理：
 * 任何正整数都可以表示为最多 4 个完全平方数之和。
 *
 * 勒让德三平方和定理：
 * 一个正整数 n 可以表示为 3 个完全平方数之和，当且仅当
 * n 不是 4^a(8b+7) 的形式。
 *
 * 判断逻辑：
 * 1. 如果 n 是完全平方数 → 返回 1
 * 2. 如果 n = a² + b² → 返回 2
 * 3. 如果 n = 4^a(8b+7) → 返回 4
 * 4. 否则 → 返回 3
 *
 * 时间复杂度：O(√n) - 检查两数之和
 * 空间复杂度：O(1)
 */
function numSquares(n) {
  // 检查是否是完全平方数
  if (isSquare(n)) return 1;

  // 检查是否能表示为两个完全平方数之和
  // 枚举第一个完全平方数 i*i
  for (let i = 1; i * i <= n; i++) {
    // 如果 n - i*i 也是完全平方数，则 n = i² + (√(n-i²))²
    if (isSquare(n - i * i)) return 2;
  }

  // 检查是否满足 4^a(8b+7) 的形式
  // 根据勒让德三平方和定理，此形式只能用 4 个完全平方数表示
  let temp = n;
  // 不断除以 4，去掉 4^a 因子
  while (temp % 4 === 0) {
    temp /= 4;
  }
  // 检查剩余部分是否是 8b+7 的形式（即模 8 余 7）
  if (temp % 8 === 7) return 4;

  // 否则是 3 个
  return 3;
}

/**
 * 检查 n 是否是完全平方数
 * @param {number} n - 待检查的数
 * @returns {boolean} - 是否是完全平方数
 */
function isSquare(n) {
  // 计算平方根并取整
  const sqrt = Math.floor(Math.sqrt(n));
  // 检查平方根的平方是否等于 n
  return sqrt * sqrt === n;
}`,
        explanation: `## 数学方法（四平方和定理）

### 数学定理

\`\`\`
拉格朗日四平方和定理（1770年）：
任何正整数都可以表示为最多 4 个完全平方数之和。

即：对于任意正整数 n，存在 a, b, c, d 使得
n = a² + b² + c² + d²

例：7 = 1² + 1² + 1² + 2² = 1 + 1 + 1 + 4
\`\`\`

### 勒让德三平方和定理

\`\`\`
一个正整数 n 可以表示为 3 个完全平方数之和，当且仅当
n 不是 4^a(8b+7) 的形式。

换言之，如果 n = 4^a(8b+7)，则 n 需要 4 个完全平方数。

例：7 = 4⁰(8×0+7) = 8×0+7
7 mod 8 = 7，所以 7 需要 4 个完全平方数
验证：7 = 1+1+1+4 = 1²+1²+1²+2² ✓
\`\`\`

### 判断逻辑

\`\`\`
优先级从高到低：

1. n 是完全平方数？ → 返回 1
   例：16 = 4² → 返回 1

2. n = a² + b²？ → 返回 2
   例：13 = 4 + 9 = 2² + 3² → 返回 2

3. n = 4^a(8b+7)？ → 返回 4
   例：7 mod 8 = 7 → 返回 4

4. 否则 → 返回 3
   例：12 → 返回 3 (12 = 4+4+4)
\`\`\`

### 执行示例

\`\`\`
n = 12:
1. 12 是完全平方数？√12 ≈ 3.46，不是
2. 12 = a² + b²？
   - 12 - 1 = 11，不是完全平方数
   - 12 - 4 = 8，不是完全平方数
   - 12 - 9 = 3，不是完全平方数
   不满足
3. 12 = 4^a(8b+7)？
   - 12 % 4 = 0，除以 4 → 3
   - 3 % 8 = 3 ≠ 7
   不满足
4. 返回 3

n = 7:
1. 7 不是完全平方数
2. 7 = a² + b²？都不满足
3. 7 % 8 = 7，满足！
4. 返回 4
\`\`\`

### 复杂度分析

- 时间：O(√n) - 只需检查两数之和
- 空间：O(1) - 常数空间

这是最优解法！`,
        timeComplexity: "O(√n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
