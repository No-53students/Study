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
        code: `function climbStairs(n) {
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
        explanation: `## 动态规划 - 空间优化

### 思路
1. 到达第 n 阶的方法 = 到达第 n-1 阶的方法 + 到达第 n-2 阶的方法
2. 这就是斐波那契数列
3. 只需要保存前两个状态，用滚动变量优化空间

### 要点
- dp[i] = dp[i-1] + dp[i-2]
- 使用两个变量代替数组`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 数组",
        code: `function climbStairs(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}`,
        explanation: `## 动态规划 - 数组

### 思路
1. dp[i] 表示爬到第 i 阶的方法数
2. dp[i] = dp[i-1] + dp[i-2]
3. 基础情况：dp[1] = 1, dp[2] = 2

### 特点
- 代码直观易懂
- 空间复杂度 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `function climbStairs(n) {
  const memo = new Map();

  const climb = (n) => {
    if (n <= 2) return n;
    if (memo.has(n)) return memo.get(n);

    const result = climb(n - 1) + climb(n - 2);
    memo.set(n, result);
    return result;
  };

  return climb(n);
}`,
        explanation: `## 递归 + 记忆化

### 思路
1. 自顶向下的递归
2. 用 Map 缓存已计算的结果
3. 避免重复计算

### 特点
- 思路自然，从问题本身出发
- 需要额外的递归栈空间`,
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
        code: `function rob(nums) {
  if (nums.length === 1) return nums[0];

  let prev2 = 0;  // dp[i-2]
  let prev1 = 0;  // dp[i-1]

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 对于每个房屋，要么偷要么不偷
2. 偷：当前金额 + dp[i-2]（不能偷相邻的）
3. 不偷：dp[i-1]
4. 取两者最大值

### 状态转移
- dp[i] = max(dp[i-1], dp[i-2] + nums[i])
- 只需要保存前两个状态`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 数组",
        code: `function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];

  const dp = new Array(n);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[n - 1];
}`,
        explanation: `## 动态规划 - 数组

### 思路
1. dp[i] 表示偷到第 i 个房屋时的最大金额
2. dp[0] = nums[0]
3. dp[1] = max(nums[0], nums[1])
4. dp[i] = max(dp[i-1], dp[i-2] + nums[i])

### 特点
- 更直观地展示状态转移
- 适合理解和调试`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `function rob(nums) {
  const n = nums.length;
  const memo = new Array(n).fill(-1);

  const dp = (i) => {
    if (i < 0) return 0;
    if (memo[i] !== -1) return memo[i];

    memo[i] = Math.max(dp(i - 1), dp(i - 2) + nums[i]);
    return memo[i];
  };

  return dp(n - 1);
}`,
        explanation: `## 递归 + 记忆化

### 思路
1. 自顶向下思考：从最后一个房屋开始
2. 对于第 i 个房屋，选择偷或不偷
3. 用数组缓存已计算的结果

### 特点
- 递归思路更自然
- 适合理解问题结构`,
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
        code: `function coinChange(coins, amount) {
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
        explanation: `## 动态规划 - 自底向上

### 思路
1. dp[i] 表示凑成金额 i 所需的最少硬币数
2. 对于每个金额，尝试使用每种硬币
3. dp[i] = min(dp[i - coin] + 1) for all coins

### 要点
- 初始化为 Infinity 表示无法凑成
- dp[0] = 0 表示金额为 0 需要 0 个硬币`,
        timeComplexity: "O(amount × n)",
        spaceComplexity: "O(amount)",
      },
      {
        name: "递归 + 记忆化",
        code: `function coinChange(coins, amount) {
  const memo = new Map();

  const dp = (remain) => {
    if (remain < 0) return -1;
    if (remain === 0) return 0;
    if (memo.has(remain)) return memo.get(remain);

    let minCoins = Infinity;
    for (const coin of coins) {
      const res = dp(remain - coin);
      if (res >= 0) {
        minCoins = Math.min(minCoins, res + 1);
      }
    }

    const result = minCoins === Infinity ? -1 : minCoins;
    memo.set(remain, result);
    return result;
  };

  return dp(amount);
}`,
        explanation: `## 递归 + 记忆化

### 思路
1. 自顶向下：从目标金额开始递归
2. 对于每个金额，尝试使用每种硬币
3. 取所有可能的最小值

### 特点
- 思路更自然
- 只计算需要的状态`,
        timeComplexity: "O(amount × n)",
        spaceComplexity: "O(amount)",
      },
      {
        name: "BFS 广度优先搜索",
        code: `function coinChange(coins, amount) {
  if (amount === 0) return 0;

  const visited = new Set([0]);
  const queue = [0];
  let steps = 0;

  while (queue.length > 0) {
    steps++;
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      for (const coin of coins) {
        const next = curr + coin;
        if (next === amount) return steps;
        if (next < amount && !visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }
  }

  return -1;
}`,
        explanation: `## BFS 广度优先搜索

### 思路
1. 将问题转化为图的最短路径问题
2. 每个金额是一个节点
3. 每次可以加上一个硬币面值到达新节点
4. BFS 找到目标金额的最短路径

### 特点
- 不同的思考角度
- 找到的一定是最短路径`,
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
        code: `function lengthOfLIS(nums) {
  // tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素
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
        explanation: `## 贪心 + 二分查找

### 思路
1. 维护 tails 数组，tails[i] 表示长度为 i+1 的递增子序列的最小末尾元素
2. 对于每个元素，用二分查找确定位置
3. 如果大于所有元素，追加到末尾；否则替换第一个 >= 它的元素

### 贪心策略
- 保持每个长度的子序列末尾尽可能小
- 这样更容易扩展`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - O(n²)",
        code: `function lengthOfLIS(nums) {
  const n = nums.length;
  // dp[i] 表示以 nums[i] 结尾的最长递增子序列长度
  const dp = new Array(n).fill(1);

  let maxLen = 1;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}`,
        explanation: `## 动态规划 - O(n²)

### 思路
1. dp[i] 表示以 nums[i] 结尾的最长递增子序列长度
2. 对于每个 i，遍历之前的所有 j
3. 如果 nums[j] < nums[i]，则可以接在后面

### 状态转移
- dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `function lengthOfLIS(nums) {
  const n = nums.length;
  const memo = new Array(n).fill(-1);

  // 返回以 nums[i] 结尾的最长递增子序列长度
  const dp = (i) => {
    if (memo[i] !== -1) return memo[i];

    let maxLen = 1;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        maxLen = Math.max(maxLen, dp(j) + 1);
      }
    }

    memo[i] = maxLen;
    return maxLen;
  };

  let result = 1;
  for (let i = 0; i < n; i++) {
    result = Math.max(result, dp(i));
  }

  return result;
}`,
        explanation: `## 递归 + 记忆化

### 思路
1. dp(i) 返回以 nums[i] 结尾的最长递增子序列长度
2. 对每个位置调用 dp，取最大值
3. 用 memo 数组缓存结果

### 特点
- 自顶向下的思考方式
- 代码结构清晰`,
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
        code: `function wordBreak(s, wordDict) {
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
        explanation: `## 动态规划

### 思路
1. dp[i] 表示 s[0...i-1] 是否可以被拆分
2. 对于每个位置 i，检查所有 j < i
3. 如果 dp[j] 为 true 且 s[j...i-1] 在字典中，则 dp[i] = true

### 优化
- 用 Set 加速单词查找
- 找到一个可行方案就 break`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map();

  const canBreak = (start) => {
    if (start === s.length) return true;
    if (memo.has(start)) return memo.get(start);

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      if (wordSet.has(word) && canBreak(end)) {
        memo.set(start, true);
        return true;
      }
    }

    memo.set(start, false);
    return false;
  };

  return canBreak(0);
}`,
        explanation: `## 递归 + 记忆化

### 思路
1. 从位置 start 开始，尝试匹配每个可能的前缀
2. 如果前缀在字典中，递归检查剩余部分
3. 用 memo 缓存每个起始位置的结果

### 特点
- 自顶向下的思考方式
- 代码更直观`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "BFS 广度优先搜索",
        code: `function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const visited = new Set([0]);
  const queue = [0];

  while (queue.length > 0) {
    const start = queue.shift();

    for (let end = start + 1; end <= n; end++) {
      if (visited.has(end)) continue;

      const word = s.slice(start, end);
      if (wordSet.has(word)) {
        if (end === n) return true;
        queue.push(end);
        visited.add(end);
      }
    }
  }

  return false;
}`,
        explanation: `## BFS 广度优先搜索

### 思路
1. 将问题转化为图的搜索问题
2. 每个位置是一个节点
3. 如果 s[i...j] 在字典中，则 i 和 j 之间有一条边
4. BFS 搜索能否到达位置 n

### 特点
- 不同的思考角度
- 用 visited 避免重复访问`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
    ],
  },
];
