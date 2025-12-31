# 动态规划 (Dynamic Programming)

## 概念介绍

**动态规划**（简称 DP）是一种将复杂问题分解为更小子问题的算法技术。它通过记录子问题的解，避免重复计算，从而提高效率。

### 核心思想

1. **最优子结构**：问题的最优解包含子问题的最优解
2. **重叠子问题**：相同的子问题会被重复计算
3. **状态转移**：通过子问题的解推导出原问题的解

### DP vs 分治 vs 贪心

| 方法 | 子问题关系 | 求解方向 | 保证最优 |
|------|-----------|---------|---------|
| 动态规划 | 重叠 | 自底向上/自顶向下 | 是 |
| 分治 | 独立 | 自顶向下 | 是 |
| 贪心 | 局部最优 | 单向 | 不一定 |

## 解题五步法

### 1. 确定状态

状态就是描述问题局面的变量。通常是 `dp[i]`、`dp[i][j]` 这样的数组。

**问自己**：需要多少个变量才能描述这个问题？

### 2. 确定转移方程

转移方程描述状态之间的关系，是 DP 的核心。

**问自己**：当前状态如何由之前的状态推导出来？

### 3. 确定初始条件

最小的子问题的答案。

**问自己**：哪些状态可以直接得出答案？

### 4. 确定计算顺序

确保计算当前状态时，所依赖的状态已经计算完成。

### 5. 优化空间（可选）

如果只依赖前一个状态，可以用滚动数组优化。

## 一维 DP

### 典型例题：爬楼梯 (LeetCode 70)

```javascript
/**
 * 爬楼梯：每次可以爬 1 或 2 级台阶，爬到第 n 级有多少种方法
 *
 * 状态：dp[i] = 爬到第 i 级台阶的方法数
 * 转移：dp[i] = dp[i-1] + dp[i-2]
 *       （从第 i-1 级爬 1 步，或从第 i-2 级爬 2 步）
 * 初始：dp[1] = 1, dp[2] = 2
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n) → 可优化到 O(1)
 */
function climbStairs(n) {
  if (n <= 2) return n;

  const dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

// 空间优化版本
function climbStairsOptimized(n) {
  if (n <= 2) return n;

  let prev2 = 1;  // dp[i-2]
  let prev1 = 2;  // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

### 典型例题：打家劫舍 (LeetCode 198)

```javascript
/**
 * 打家劫舍：不能偷相邻的房屋，求能偷到的最大金额
 *
 * 状态：dp[i] = 偷到第 i 个房屋时的最大金额
 * 转移：dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 *       （不偷当前房屋，或偷当前房屋）
 * 初始：dp[0] = nums[0], dp[1] = max(nums[0], nums[1])
 */
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp = new Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
  }

  return dp[nums.length - 1];
}

// 空间优化版本
function robOptimized(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}
```

### 典型例题：最大子数组和 (LeetCode 53)

```javascript
/**
 * 最大子数组和
 *
 * 状态：dp[i] = 以 nums[i] 结尾的最大子数组和
 * 转移：dp[i] = max(nums[i], dp[i-1] + nums[i])
 *       （重新开始，或接上前面的）
 * 初始：dp[0] = nums[0]
 */
function maxSubArray(nums) {
  let dp = nums[0];
  let maxSum = dp;

  for (let i = 1; i < nums.length; i++) {
    dp = Math.max(nums[i], dp + nums[i]);
    maxSum = Math.max(maxSum, dp);
  }

  return maxSum;
}
```

### 典型例题：零钱兑换 (LeetCode 322)

```javascript
/**
 * 零钱兑换：用最少的硬币凑出目标金额
 *
 * 状态：dp[i] = 凑出金额 i 需要的最少硬币数
 * 转移：dp[i] = min(dp[i - coin] + 1) for coin in coins
 * 初始：dp[0] = 0
 */
function coinChange(coins, amount) {
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
}
```

## 二维 DP

### 典型例题：不同路径 (LeetCode 62)

```javascript
/**
 * 不同路径：从左上到右下的路径数，只能向右或向下
 *
 * 状态：dp[i][j] = 到达 (i, j) 的路径数
 * 转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 初始：dp[0][j] = 1, dp[i][0] = 1
 */
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

// 空间优化：只需要一行
function uniquePathsOptimized(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}
```

### 典型例题：最长公共子序列 (LeetCode 1143)

```javascript
/**
 * 最长公共子序列
 *
 * 状态：dp[i][j] = text1[0..i-1] 和 text2[0..j-1] 的 LCS 长度
 * 转移：
 *   - 如果 text1[i-1] === text2[j-1]：dp[i][j] = dp[i-1][j-1] + 1
 *   - 否则：dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 * 初始：dp[0][j] = 0, dp[i][0] = 0
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
```

### 典型例题：编辑距离 (LeetCode 72)

```javascript
/**
 * 编辑距离：将 word1 转换成 word2 的最少操作数
 *
 * 状态：dp[i][j] = word1[0..i-1] 转换为 word2[0..j-1] 的最少操作数
 * 转移：
 *   - 如果 word1[i-1] === word2[j-1]：dp[i][j] = dp[i-1][j-1]
 *   - 否则：dp[i][j] = min(
 *       dp[i-1][j] + 1,    // 删除
 *       dp[i][j-1] + 1,    // 插入
 *       dp[i-1][j-1] + 1   // 替换
 *     )
 * 初始：dp[0][j] = j, dp[i][0] = i
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 初始化
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,      // 删除
          dp[i][j - 1] + 1,      // 插入
          dp[i - 1][j - 1] + 1   // 替换
        );
      }
    }
  }

  return dp[m][n];
}
```

## 背包问题

### 0-1 背包

每个物品只能选一次。

```javascript
/**
 * 0-1 背包问题
 *
 * 状态：dp[i][j] = 前 i 个物品，背包容量为 j 时的最大价值
 * 转移：dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])
 */
function knapsack01(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= capacity; j++) {
      if (weights[i - 1] <= j) {
        dp[i][j] = Math.max(
          dp[i - 1][j],
          dp[i - 1][j - weights[i - 1]] + values[i - 1]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][capacity];
}

// 空间优化（逆序遍历）
function knapsack01Optimized(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // 必须逆序，避免同一物品被重复使用
    for (let j = capacity; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}
```

### 完全背包

每个物品可以选无限次。

```javascript
/**
 * 完全背包问题
 *
 * 与0-1背包的区别：正序遍历容量
 */
function knapsackComplete(weights, values, capacity) {
  const dp = new Array(capacity + 1).fill(0);

  for (let i = 0; i < weights.length; i++) {
    // 正序遍历，允许同一物品被多次使用
    for (let j = weights[i]; j <= capacity; j++) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i]);
    }
  }

  return dp[capacity];
}
```

### 典型例题：零钱兑换 II (LeetCode 518)

```javascript
/**
 * 零钱兑换 II：凑出目标金额的组合数
 *
 * 完全背包变体：求方案数
 */
function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let j = coin; j <= amount; j++) {
      dp[j] += dp[j - coin];
    }
  }

  return dp[amount];
}
```

## 区间 DP

### 典型例题：最长回文子串 (LeetCode 5)

```javascript
/**
 * 最长回文子串
 *
 * 状态：dp[i][j] = s[i..j] 是否是回文
 * 转移：dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]
 * 初始：dp[i][i] = true
 */
function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  let start = 0;
  let maxLen = 1;

  // 所有单个字符都是回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // 枚举子串长度
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len - 1 < n; i++) {
      const j = i + len - 1;

      if (s[i] === s[j]) {
        if (len === 2) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      if (dp[i][j] && len > maxLen) {
        start = i;
        maxLen = len;
      }
    }
  }

  return s.substring(start, start + maxLen);
}
```

## 状态压缩 DP

用二进制表示状态集合。

```javascript
/**
 * 旅行商问题 (TSP) 简化版
 *
 * 状态：dp[mask][i] = 访问了 mask 表示的城市集合，当前在城市 i 的最小距离
 */
function tsp(dist) {
  const n = dist.length;
  const INF = Infinity;
  const dp = Array.from(
    { length: 1 << n },
    () => new Array(n).fill(INF)
  );

  dp[1][0] = 0;  // 从城市0出发

  for (let mask = 1; mask < (1 << n); mask++) {
    for (let i = 0; i < n; i++) {
      if (!(mask & (1 << i))) continue;  // i 不在集合中
      if (dp[mask][i] === INF) continue;

      for (let j = 0; j < n; j++) {
        if (mask & (1 << j)) continue;  // j 已访问
        const newMask = mask | (1 << j);
        dp[newMask][j] = Math.min(dp[newMask][j], dp[mask][i] + dist[i][j]);
      }
    }
  }

  // 返回访问所有城市后回到起点的最小距离
  const fullMask = (1 << n) - 1;
  let result = INF;
  for (let i = 1; i < n; i++) {
    result = Math.min(result, dp[fullMask][i] + dist[i][0]);
  }
  return result;
}
```

## 记忆化搜索

自顶向下的 DP，用递归 + 缓存实现。

```javascript
/**
 * 记忆化搜索模板
 */
function solveMemo(params) {
  const memo = new Map();

  function dp(state) {
    // 基本情况
    if (isBaseCase(state)) {
      return baseValue;
    }

    // 检查缓存
    const key = stateToKey(state);
    if (memo.has(key)) {
      return memo.get(key);
    }

    // 递归计算
    let result = /* 根据子问题计算 */;

    // 存入缓存
    memo.set(key, result);
    return result;
  }

  return dp(initialState);
}

// 示例：斐波那契
function fibMemo(n) {
  const memo = new Map();

  function fib(n) {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n);

    const result = fib(n - 1) + fib(n - 2);
    memo.set(n, result);
    return result;
  }

  return fib(n);
}
```

## 前端应用场景

### 1. 文本 Diff 算法

编辑距离是 Git diff、代码比较工具的基础。

```javascript
/**
 * 简化的 diff：找出两个文本的最长公共子序列
 */
function diff(oldText, newText) {
  const lcs = longestCommonSubsequence(oldText, newText);
  // 基于 LCS 生成 diff 结果
  // ...
}
```

### 2. 富文本编辑器的撤销栈

```javascript
/**
 * 使用 DP 思想优化撤销操作的存储
 * 只存储增量变化而不是完整状态
 */
class UndoStack {
  constructor() {
    this.states = [];
    this.diffs = [];
  }

  push(newState) {
    if (this.states.length > 0) {
      const lastState = this.states[this.states.length - 1];
      this.diffs.push(this.computeDiff(lastState, newState));
    }
    this.states.push(newState);
  }

  computeDiff(old, new_) {
    // 使用编辑距离算法计算差异
    return { /* diff 信息 */ };
  }
}
```

### 3. 路由匹配最优路径

```javascript
/**
 * 找到从当前页面到目标页面的最短路由路径
 */
function findShortestPath(currentRoute, targetRoute, routeGraph) {
  // 使用 DP/BFS 找最短路径
  const dp = new Map();
  // ...
}
```

## 常见 DP 模式总结

| 问题类型 | 状态定义 | 典型例题 |
|----------|---------|---------|
| 线性 DP | dp[i] | 爬楼梯、打家劫舍 |
| 区间 DP | dp[i][j] | 最长回文子串 |
| 背包 DP | dp[i][j] | 零钱兑换 |
| 序列 DP | dp[i][j] | LCS、编辑距离 |
| 状态压缩 | dp[mask] | TSP、子集问题 |
| 树形 DP | 递归 | 二叉树最大路径和 |

## 复杂度分析

| 方法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 暴力递归 | O(2^n) | O(n) 栈 |
| 记忆化搜索 | O(状态数 × 转移代价) | O(状态数) |
| 自底向上 DP | O(状态数 × 转移代价) | O(状态数) |
| 空间优化 DP | O(状态数 × 转移代价) | O(降维后的空间) |

## 总结

动态规划的核心：

1. **找状态**：用什么变量描述问题
2. **找转移**：状态之间如何转换
3. **找初始**：最小子问题的答案
4. **找顺序**：确保依赖关系正确
5. **找优化**：能否降低空间复杂度

DP 问题的识别特征：
- 求最优解（最大/最小）
- 求方案数
- 问能否达成
- 有明显的选择和决策
