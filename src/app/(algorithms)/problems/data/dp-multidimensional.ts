import { Problem } from "../types";

export const dpMultidimensionalProblems: Problem[] = [
  // 1. 不同路径 (62)
  {
    id: "unique-paths",
    leetcodeId: 62,
    title: "不同路径",
    titleEn: "Unique Paths",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["数学", "动态规划", "组合数学"],
    frontendRelevance: "medium",
    frontendNote: "路径DP",
    description: `一个机器人位于一个 \`m x n\` 网格的左上角（起始点在下图中标记为 "Start"）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。

问总共有多少条不同的路径？`,
    examples: `**示例 1：**
\`\`\`
输入：m = 3, n = 7
输出：28
\`\`\`

**示例 2：**
\`\`\`
输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
\`\`\`

**示例 3：**
\`\`\`
输入：m = 7, n = 3
输出：28
\`\`\``,
    constraints: `- \`1 <= m, n <= 100\``,
    initialCode: `function uniquePaths(m, n) {
  // 在此处编写你的代码

}`,
    solution: `function uniquePaths(m, n) {
  // dp[j] 表示到达第 i 行第 j 列的路径数
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}`,
    testCases: [
      {
        id: "1",
        name: "3x7网格",
        input: [3, 7],
        expected: 28
      },
      {
        id: "2",
        name: "3x2网格",
        input: [3, 2],
        expected: 3
      },
      {
        id: "3",
        name: "7x3网格",
        input: [7, 3],
        expected: 28
      }
    ],
    hints: [
      "dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "第一行和第一列都只有一种到达方式",
      "可以用一维数组优化空间"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i][j] 表示到达位置 (i, j) 的不同路径数

状态转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]
- 只能从上方或左方到达当前位置

边界条件：
- 第一行 dp[0][j] = 1
- 第一列 dp[i][0] = 1

### 空间优化

使用一维数组，dp[j] += dp[j-1]

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["minimum-path-sum", "unique-paths-ii"],
    solutions: [
      {
        name: "动态规划 - 空间优化（推荐）",
        code: `/**
 * 不同路径 - 动态规划空间优化解法
 *
 * 核心思想：
 * 利用滚动数组技巧，将二维 DP 压缩为一维
 * 由于每个位置只依赖于上方和左方的值，可以逐行更新
 *
 * 状态定义：dp[j] = 到达当前行第 j 列的路径数
 * 状态转移：dp[j] = dp[j](上方) + dp[j-1](左方)
 *
 * 时间复杂度：O(m × n) - 遍历整个网格
 * 空间复杂度：O(n) - 只需要一行的空间
 */
function uniquePaths(m, n) {
  // 初始化 dp 数组，第一行所有位置都只有 1 条路径
  // 因为只能从左边一直走到右边
  const dp = new Array(n).fill(1);

  // 从第二行开始逐行更新
  for (let i = 1; i < m; i++) {
    // 从左到右更新每个位置
    // j=0 时 dp[0] 保持为 1（只能从上方来）
    for (let j = 1; j < n; j++) {
      // dp[j] = dp[j](上方，更新前的值) + dp[j-1](左方，刚更新的值)
      // 这里利用了更新顺序：从左到右，所以 dp[j-1] 已经是当前行的值
      dp[j] += dp[j - 1];
    }
  }

  // 返回右下角的路径数
  return dp[n - 1];
}

/**
 * 执行过程示例（m=3, n=3）：
 *
 * 初始化：dp = [1, 1, 1]（第一行）
 *
 * i=1（第二行）：
 *   j=1: dp[1] = dp[1] + dp[0] = 1 + 1 = 2
 *   j=2: dp[2] = dp[2] + dp[1] = 1 + 2 = 3
 *   dp = [1, 2, 3]
 *
 * i=2（第三行）：
 *   j=1: dp[1] = dp[1] + dp[0] = 2 + 1 = 3
 *   j=2: dp[2] = dp[2] + dp[1] = 3 + 3 = 6
 *   dp = [1, 3, 6]
 *
 * 对应网格：
 * 1  1  1
 * 1  2  3
 * 1  3  6 ← 右下角答案
 */`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 只需要一维数组，逐行更新
2. dp[j] = dp[j] + dp[j-1]（上方 + 左方）
3. 第一行初始化为全1

### 要点
- 空间复杂度从 O(m×n) 优化到 O(n)`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - 二维数组",
        code: `/**
 * 不同路径 - 动态规划二维数组解法
 *
 * 核心思想：
 * 经典的路径 DP 问题，每个位置的路径数等于上方和左方路径数之和
 *
 * 状态定义：dp[i][j] = 到达位置 (i, j) 的不同路径数
 * 状态转移：dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * 边界条件：第一行和第一列都为 1（只有一种走法）
 *
 * 时间复杂度：O(m × n) - 遍历整个网格
 * 空间复杂度：O(m × n) - 需要存储整个 DP 表
 */
function uniquePaths(m, n) {
  // 创建二维 DP 数组，初始化为 1
  // 第一行和第一列都只有一种路径
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  // 从 (1,1) 开始填表
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 当前位置 = 从上方来的路径数 + 从左方来的路径数
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  // 返回右下角的路径数
  return dp[m - 1][n - 1];
}

/**
 * DP 表填充过程（m=3, n=4）：
 *
 * 初始化（边界全为1）：
 * 1  1  1  1
 * 1  ?  ?  ?
 * 1  ?  ?  ?
 *
 * 填表后：
 * 1  1  1  1
 * 1  2  3  4
 * 1  3  6  10 ← 右下角答案
 */`,
        explanation: `## 动态规划 - 二维数组

### 思路
1. dp[i][j] 表示到达 (i,j) 的路径数
2. 第一行和第一列都是 1
3. dp[i][j] = dp[i-1][j] + dp[i][j-1]

### 特点
- 代码更直观
- 适合理解和调试`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "数学组合公式",
        code: `/**
 * 不同路径 - 数学组合公式解法
 *
 * 核心思想：
 * 从左上角到右下角，总共需要走 (m-1) 步向下 + (n-1) 步向右
 * 问题转化为：在 (m+n-2) 步中选择 (m-1) 步向下的方案数
 * 即组合数 C(m+n-2, m-1) = (m+n-2)! / ((m-1)! × (n-1)!)
 *
 * 计算技巧：
 * C(m+n-2, m-1) = [(n)(n+1)(n+2)...(m+n-2)] / [(1)(2)(3)...(m-1)]
 * 使用逐步乘除避免大数溢出
 *
 * 时间复杂度：O(min(m, n)) - 只需计算较小的阶乘部分
 * 空间复杂度：O(1) - 只用几个变量
 */
function uniquePaths(m, n) {
  // 总共需要走 m-1 步向下和 n-1 步向右
  // 路径数 = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
  let result = 1;

  // 逐步计算组合数，避免大数溢出
  // C(m+n-2, m-1) = ∏(i=1 to m-1) (n-1+i) / i
  for (let i = 1; i < m; i++) {
    // 分子：(n-1+1), (n-1+2), ..., (n-1+m-1) = n, n+1, ..., m+n-2
    // 分母：1, 2, ..., m-1
    result = result * (n - 1 + i) / i;
  }

  // 使用 Math.round 处理浮点数精度问题
  return Math.round(result);
}

/**
 * 数学推导示例（m=3, n=7）：
 *
 * 需要走：向下 2 步，向右 6 步，共 8 步
 * 路径数 = C(8, 2) = 8! / (2! × 6!)
 *        = (8 × 7) / (2 × 1)
 *        = 56 / 2
 *        = 28
 *
 * 计算过程：
 * i=1: result = 1 × (6+1) / 1 = 7
 * i=2: result = 7 × (6+2) / 2 = 56 / 2 = 28
 */`,
        explanation: `## 数学组合公式

### 思路
1. 从左上到右下，需要走 m-1 步向下和 n-1 步向右
2. 问题变成：在 m+n-2 步中选择 m-1 步向下
3. 路径数 = C(m+n-2, m-1)

### 特点
- 时间复杂度 O(min(m,n))
- 需要注意浮点数精度`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 2. 最小路径和 (64)
  {
    id: "minimum-path-sum",
    leetcodeId: 64,
    title: "最小路径和",
    titleEn: "Minimum Path Sum",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["数组", "动态规划", "矩阵"],
    frontendRelevance: "medium",
    frontendNote: "最小路径和",
    description: `给定一个包含非负整数的 \`m x n\` 网格 \`grid\`，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明**：每次只能向下或者向右移动一步。`,
    examples: `**示例 1：**
\`\`\`
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
\`\`\`

**示例 2：**
\`\`\`
输入：grid = [[1,2,3],[4,5,6]]
输出：12
\`\`\``,
    constraints: `- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 200\`
- \`0 <= grid[i][j] <= 200\``,
    initialCode: `function minPathSum(grid) {
  // 在此处编写你的代码

}`,
    solution: `function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  // 使用一维数组优化空间
  const dp = new Array(n).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        dp[j] = grid[0][0];
      } else if (i === 0) {
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (j === 0) {
        dp[j] = dp[j] + grid[i][j];
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
      }
    }
  }

  return dp[n - 1];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[[1,3,1],[1,5,1],[4,2,1]]]],
        expected: 7
      },
      {
        id: "2",
        name: "示例2",
        input: [[[[1,2,3],[4,5,6]]]],
        expected: 12
      }
    ],
    hints: [
      "dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]",
      "注意处理边界情况（第一行和第一列）",
      "可以用一维数组优化空间"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i][j] 表示从左上角到位置 (i, j) 的最小路径和

状态转移：dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]

边界条件：
- dp[0][0] = grid[0][0]
- 第一行：dp[0][j] = dp[0][j-1] + grid[0][j]
- 第一列：dp[i][0] = dp[i-1][0] + grid[i][0]

### 空间优化

可以使用一维数组优化空间复杂度。

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["unique-paths", "unique-paths-ii"],
    solutions: [
      {
        name: "动态规划 - 空间优化（推荐）",
        code: `/**
 * 最小路径和 - 动态规划空间优化解法
 *
 * 核心思想：
 * 使用一维数组逐行更新，每个位置的最小路径和等于
 * min(上方, 左方) + 当前格子值
 *
 * 状态定义：dp[j] = 到达当前行第 j 列的最小路径和
 * 状态转移：dp[j] = min(dp[j](上方), dp[j-1](左方)) + grid[i][j]
 *
 * 时间复杂度：O(m × n) - 遍历整个网格
 * 空间复杂度：O(n) - 只需要一行的空间
 */
function minPathSum(grid) {
  const m = grid.length;      // 行数
  const n = grid[0].length;   // 列数

  // 一维 DP 数组
  const dp = new Array(n).fill(0);

  // 遍历每个格子
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) {
        // 起点：路径和就是起点的值
        dp[j] = grid[0][0];
      } else if (i === 0) {
        // 第一行：只能从左边来
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (j === 0) {
        // 第一列：只能从上边来
        // dp[j] 此时还是上一行的值
        dp[j] = dp[j] + grid[i][j];
      } else {
        // 一般情况：取上方和左方的最小值
        // dp[j] = 上方值（更新前），dp[j-1] = 左方值（刚更新）
        dp[j] = Math.min(dp[j], dp[j - 1]) + grid[i][j];
      }
    }
  }

  return dp[n - 1];
}

/**
 * 执行过程示例：
 * grid = [[1,3,1],
 *         [1,5,1],
 *         [4,2,1]]
 *
 * i=0: dp = [1, 4, 5]（第一行累加）
 * i=1:
 *   j=0: dp[0] = 1+1 = 2
 *   j=1: dp[1] = min(4,2)+5 = 7
 *   j=2: dp[2] = min(5,7)+1 = 6
 *   dp = [2, 7, 6]
 * i=2:
 *   j=0: dp[0] = 2+4 = 6
 *   j=1: dp[1] = min(7,6)+2 = 8
 *   j=2: dp[2] = min(6,8)+1 = 7 ← 答案
 *
 * 最优路径：1→3→1→1→1 = 7
 */`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 使用一维数组逐行更新
2. dp[j] = min(上方, 左方) + grid[i][j]
3. 注意处理边界情况

### 要点
- 空间复杂度从 O(m×n) 优化到 O(n)`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - 二维数组",
        code: `/**
 * 最小路径和 - 动态规划二维数组解法
 *
 * 核心思想：
 * 使用二维 DP 数组存储每个位置的最小路径和
 * 每个位置只能从上方或左方到达
 *
 * 状态定义：dp[i][j] = 从左上角到 (i, j) 的最小路径和
 * 状态转移：dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
 *
 * 时间复杂度：O(m × n) - 遍历整个网格
 * 空间复杂度：O(m × n) - 需要存储整个 DP 表
 */
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  // 创建二维 DP 数组
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // 初始化起点
  dp[0][0] = grid[0][0];

  // 初始化第一行：只能从左边来
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  // 初始化第一列：只能从上边来
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 填充其余位置
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // 取上方和左方的最小值，加上当前格子的值
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}

/**
 * DP 表填充过程：
 * grid = [[1,3,1],      dp = [[1,4,5],
 *         [1,5,1],   →        [2,7,6],
 *         [4,2,1]]            [6,8,7]]
 *
 * 从右下角读取答案：7
 */`,
        explanation: `## 动态规划 - 二维数组

### 思路
1. dp[i][j] 表示从左上角到 (i,j) 的最小路径和
2. 第一行只能从左边来
3. 第一列只能从上边来
4. 其余位置取上方和左方的最小值

### 特点
- 代码结构清晰
- 适合理解和调试`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "原地修改（不推荐）",
        code: `/**
 * 最小路径和 - 原地修改解法
 *
 * 核心思想：
 * 直接在原数组上修改，避免额外空间开销
 * 将 grid[i][j] 更新为从左上角到该位置的最小路径和
 *
 * 注意：此方法会修改原数组，实际项目中可能不推荐
 *
 * 时间复杂度：O(m × n) - 遍历整个网格
 * 空间复杂度：O(1) - 不使用额外空间
 */
function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  // 修改第一行：累加前缀和
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1];
  }

  // 修改第一列：累加前缀和
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }

  // 填充其余位置：原地修改
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // grid[i][j] 变成到达该位置的最小路径和
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }

  // 右下角即为答案
  return grid[m - 1][n - 1];
}

/**
 * 原地修改过程：
 * 原始: [[1,3,1],     修改后: [[1,4,5],
 *        [1,5,1],   →          [2,7,6],
 *        [4,2,1]]              [6,8,7]]
 *
 * 注意：原数组已被修改！
 */`,
        explanation: `## 原地修改

### 思路
1. 直接在原数组上修改
2. grid[i][j] += min(上方, 左方)

### 注意
- 会修改原数组，实际使用中可能不推荐
- 空间复杂度 O(1)`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 3. 不同路径 II (63)
  {
    id: "unique-paths-ii",
    leetcodeId: 63,
    title: "不同路径 II",
    titleEn: "Unique Paths II",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["数组", "动态规划", "矩阵"],
    frontendRelevance: "low",
    frontendNote: "障碍物路径",
    description: `一个机器人位于一个 \`m x n\` 网格的左上角（起始点在下图中标记为 "Start"）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 "Finish"）。

现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？

网格中的障碍物和空位置分别用 \`1\` 和 \`0\` 来表示。`,
    examples: `**示例 1：**
\`\`\`
输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
输出：2
解释：3x3 网格的正中间有一个障碍物。
从左上角到右下角一共有 2 条不同的路径：
1. 向右 -> 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右 -> 向右
\`\`\`

**示例 2：**
\`\`\`
输入：obstacleGrid = [[0,1],[0,0]]
输出：1
\`\`\``,
    constraints: `- \`m == obstacleGrid.length\`
- \`n == obstacleGrid[i].length\`
- \`1 <= m, n <= 100\`
- \`obstacleGrid[i][j]\` 为 \`0\` 或 \`1\``,
    initialCode: `function uniquePathsWithObstacles(obstacleGrid) {
  // 在此处编写你的代码

}`,
    solution: `function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  // 起点或终点有障碍物
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) {
    return 0;
  }

  const dp = new Array(n).fill(0);
  dp[0] = 1;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0;
      } else if (j > 0) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[n - 1];
}`,
    testCases: [
      {
        id: "1",
        name: "有障碍物",
        input: [[[[0,0,0],[0,1,0],[0,0,0]]]],
        expected: 2
      },
      {
        id: "2",
        name: "示例2",
        input: [[[[0,1],[0,0]]]],
        expected: 1
      }
    ],
    hints: [
      "遇到障碍物时，该位置的路径数为0",
      "起点或终点有障碍物直接返回0",
      "可以用一维数组优化空间"
    ],
    explanation: `## 解题思路

### 动态规划

在不同路径I的基础上增加障碍物处理：
- 如果 obstacleGrid[i][j] === 1，则 dp[i][j] = 0
- 否则 dp[i][j] = dp[i-1][j] + dp[i][j-1]

边界条件：
- 起点或终点有障碍物，直接返回0
- 第一行/第一列遇到障碍物后，后续位置都无法到达

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["unique-paths", "minimum-path-sum"],
    solutions: [
      {
        name: "动态规划 - 空间优化（推荐）",
        code: `/**
 * 不同路径 II（带障碍物）- 动态规划空间优化解法
 *
 * 核心思想：
 * 在"不同路径"基础上增加障碍物处理
 * 遇到障碍物时，该位置路径数设为 0（无法通过）
 *
 * 状态定义：dp[j] = 到达当前行第 j 列的路径数
 * 状态转移：
 *   - 如果有障碍物：dp[j] = 0
 *   - 否则：dp[j] = dp[j](上方) + dp[j-1](左方)
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(n)
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  // 特判：起点或终点有障碍物，直接返回 0
  if (obstacleGrid[0][0] === 1 || obstacleGrid[m-1][n-1] === 1) {
    return 0;
  }

  // 一维 DP 数组
  const dp = new Array(n).fill(0);
  // 起点初始化为 1
  dp[0] = 1;

  // 逐行更新
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        // 障碍物位置：路径数为 0
        dp[j] = 0;
      } else if (j > 0) {
        // 非障碍物位置：上方 + 左方
        // j=0 时，dp[0] 保持原值（只从上方来）
        dp[j] += dp[j - 1];
      }
      // j=0 且无障碍物时，dp[0] 保持为 1（第一列）
    }
  }

  return dp[n - 1];
}

/**
 * 执行过程示例：
 * obstacleGrid = [[0,0,0],
 *                 [0,1,0],
 *                 [0,0,0]]
 *
 * i=0: dp = [1,1,1]
 * i=1:
 *   j=0: 无障碍，dp[0]=1
 *   j=1: 有障碍，dp[1]=0
 *   j=2: 无障碍，dp[2]=0+1=1
 *   dp = [1,0,1]
 * i=2:
 *   j=0: dp[0]=1
 *   j=1: dp[1]=0+1=1
 *   j=2: dp[2]=1+1=2 ← 答案
 *
 * 两条路径：右→右→下→下，下→下→右→右
 */`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 使用一维数组逐行更新
2. 遇到障碍物时，该位置路径数设为 0
3. 非障碍物位置：dp[j] = dp[j] + dp[j-1]

### 要点
- 先检查起点和终点是否有障碍物`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - 二维数组",
        code: `/**
 * 不同路径 II（带障碍物）- 动态规划二维数组解法
 *
 * 核心思想：
 * 使用二维 DP 数组，清晰地处理边界和障碍物
 *
 * 关键点：
 * 1. 起点有障碍物直接返回 0
 * 2. 第一行/第一列遇到障碍物后，后续位置都无法到达
 * 3. 障碍物位置路径数为 0
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  // 起点有障碍物，无解
  if (obstacleGrid[0][0] === 1) return 0;

  // 创建二维 DP 数组
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  // 起点初始化
  dp[0][0] = 1;

  // 初始化第一行：遇到障碍物后，后续都是 0
  for (let j = 1; j < n; j++) {
    // 当前无障碍且左边可达，才能到达
    dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j - 1];
  }

  // 初始化第一列：遇到障碍物后，后续都是 0
  for (let i = 1; i < m; i++) {
    // 当前无障碍且上边可达，才能到达
    dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i - 1][0];
  }

  // 填充其余位置
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        // 障碍物位置
        dp[i][j] = 0;
      } else {
        // 上方 + 左方
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
}

/**
 * 边界处理示例：
 * obstacleGrid = [[0,0,1,0],
 *                 [0,0,0,0]]
 *
 * 第一行初始化：
 * dp[0] = [1, 1, 0, 0]  (j=2有障碍，j=3继承j=2的0)
 *
 * 注意：第一行的障碍物会"截断"后续路径
 */`,
        explanation: `## 动态规划 - 二维数组

### 思路
1. dp[i][j] 表示到达 (i,j) 的路径数
2. 障碍物位置路径数为 0
3. 第一行/第一列遇到障碍物后，后续位置都无法到达

### 特点
- 代码结构清晰
- 边界处理更直观`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 4. 三角形最小路径和 (120)
  {
    id: "triangle",
    leetcodeId: 120,
    title: "三角形最小路径和",
    titleEn: "Triangle",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["数组", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "三角形路径",
    description: `给定一个三角形 \`triangle\`，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。**相邻的结点** 在这里指的是 **下标** 与 **上一层结点下标** 相同或者等于 **上一层结点下标 + 1** 的两个结点。也就是说，如果正位于当前行的下标 \`i\`，那么下一步可以移动到下一行的下标 \`i\` 或 \`i + 1\`。`,
    examples: `**示例 1：**
\`\`\`
输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
输出：11
解释：如下面简图所示：
   2
  3 4
 6 5 7
4 1 8 3
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
\`\`\`

**示例 2：**
\`\`\`
输入：triangle = [[-10]]
输出：-10
\`\`\``,
    constraints: `- \`1 <= triangle.length <= 200\`
- \`triangle[0].length == 1\`
- \`triangle[i].length == triangle[i - 1].length + 1\`
- \`-10^4 <= triangle[i][j] <= 10^4\``,
    initialCode: `function minimumTotal(triangle) {
  // 在此处编写你的代码

}`,
    solution: `function minimumTotal(triangle) {
  const n = triangle.length;
  // 从底部开始，dp[j] 表示从底部到当前位置的最小路径和
  const dp = [...triangle[n - 1]];

  // 从倒数第二行开始向上遍历
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }

  return dp[0];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[[2],[3,4],[6,5,7],[4,1,8,3]]]],
        expected: 11
      },
      {
        id: "2",
        name: "单元素",
        input: [[[[-10]]]],
        expected: -10
      }
    ],
    hints: [
      "从底向上计算更简单，不需要处理边界",
      "dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]",
      "可以直接复用最后一行作为 dp 数组"
    ],
    explanation: `## 解题思路

### 动态规划（自底向上）

自底向上计算，避免边界判断：
- dp[j] 表示从底部到位置 (i, j) 的最小路径和
- dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]

从最后一行开始，向上逐行计算，最终 dp[0] 就是答案。

### 复杂度分析
- 时间复杂度：O(n²)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(n)",
    relatedProblems: ["minimum-path-sum", "unique-paths"],
    solutions: [
      {
        name: "动态规划 - 自底向上（推荐）",
        code: `/**
 * 三角形最小路径和 - 自底向上 DP 解法
 *
 * 核心思想：
 * 从三角形底部向上计算，避免复杂的边界处理
 * dp[j] 表示从底部到当前行第 j 个位置的最小路径和
 *
 * 为什么自底向上更好：
 * 1. 自顶向下：需要判断左右边界，最后还要取最后一行的最小值
 * 2. 自底向上：每个位置都有两个子节点，最后答案就在 dp[0]
 *
 * 状态转移：dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]
 *
 * 时间复杂度：O(n²) - n 为三角形行数
 * 空间复杂度：O(n)
 */
function minimumTotal(triangle) {
  const n = triangle.length;

  // 初始化为最后一行（直接复制）
  const dp = [...triangle[n - 1]];

  // 从倒数第二行开始向上遍历
  for (let i = n - 2; i >= 0; i--) {
    // 遍历当前行的每个位置
    for (let j = 0; j <= i; j++) {
      // 当前位置的最小路径和 =
      // min(下方左子节点, 下方右子节点) + 当前值
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }

  // 最终答案在 dp[0]（顶点的最小路径和）
  return dp[0];
}

/**
 * 执行过程示例：
 * triangle = [[2],
 *             [3,4],
 *             [6,5,7],
 *             [4,1,8,3]]
 *
 * 初始化：dp = [4,1,8,3]（最后一行）
 *
 * i=2（第三行 [6,5,7]）：
 *   j=0: dp[0] = min(4,1) + 6 = 7
 *   j=1: dp[1] = min(1,8) + 5 = 6
 *   j=2: dp[2] = min(8,3) + 7 = 10
 *   dp = [7,6,10,3]
 *
 * i=1（第二行 [3,4]）：
 *   j=0: dp[0] = min(7,6) + 3 = 9
 *   j=1: dp[1] = min(6,10) + 4 = 10
 *   dp = [9,10,10,3]
 *
 * i=0（第一行 [2]）：
 *   j=0: dp[0] = min(9,10) + 2 = 11 ← 答案
 *
 * 最优路径：2→3→5→1 = 11
 */`,
        explanation: `## 动态规划 - 自底向上

### 思路
1. 从最后一行开始，向上计算
2. dp[j] = min(dp[j], dp[j+1]) + triangle[i][j]
3. 最终 dp[0] 就是答案

### 优点
- 不需要处理边界情况
- 代码更简洁`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n)",
      },
      {
        name: "动态规划 - 自顶向下",
        code: `/**
 * 三角形最小路径和 - 自顶向下 DP 解法
 *
 * 核心思想：
 * 从顶部向下计算，dp[i][j] 表示从顶部到 (i,j) 的最小路径和
 *
 * 需要注意的边界：
 * 1. 每行第一个元素只能从上一行第一个元素来
 * 2. 每行最后一个元素只能从上一行最后一个元素来
 * 3. 最后需要遍历最后一行找最小值
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n²)
 */
function minimumTotal(triangle) {
  const n = triangle.length;

  // 创建二维 DP 数组，每行长度递增
  const dp = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(Infinity));

  // 初始化顶点
  dp[0][0] = triangle[0][0];

  // 从第二行开始向下填表
  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        // 左边界：只能从正上方来
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      } else if (j === i) {
        // 右边界：只能从左上方来
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else {
        // 中间位置：取左上和正上的最小值
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
      }
    }
  }

  // 返回最后一行的最小值
  return Math.min(...dp[n - 1]);
}

/**
 * 自顶向下 vs 自底向上对比：
 *
 * 自顶向下：
 * - 需要处理边界（左边界只从上方来，右边界只从左上来）
 * - 最后需要遍历最后一行找最小值
 *
 * 自底向上：
 * - 每个位置都可以选择下方两个子节点中的较小者
 * - 最终答案直接在 dp[0]
 */`,
        explanation: `## 动态规划 - 自顶向下

### 思路
1. dp[i][j] 表示从顶部到 (i,j) 的最小路径和
2. 从上往下逐层计算
3. 最后取最后一行的最小值

### 注意
- 需要处理左右边界
- 最后需要遍历最后一行找最小值`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 三角形最小路径和 - 递归 + 记忆化解法
 *
 * 核心思想：
 * 使用递归的方式，从顶部向下探索
 * 用 memo 数组缓存已计算的结果，避免重复计算
 *
 * 递归定义：
 * dfs(i, j) = 从位置 (i, j) 到底部的最小路径和
 *           = triangle[i][j] + min(dfs(i+1, j), dfs(i+1, j+1))
 *
 * 时间复杂度：O(n²) - 每个位置最多计算一次
 * 空间复杂度：O(n²) - 记忆化数组 + 递归栈
 */
function minimumTotal(triangle) {
  const n = triangle.length;

  // 记忆化数组，memo[i][j] = -1 表示未计算
  const memo = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(-1));

  // 递归函数：返回从 (i, j) 到底部的最小路径和
  const dfs = (i, j) => {
    // 到达最后一行，返回该位置的值
    if (i === n - 1) return triangle[i][j];

    // 如果已经计算过，直接返回缓存结果
    if (memo[i][j] !== -1) return memo[i][j];

    // 递归计算：当前值 + min(向下, 向右下)
    memo[i][j] = triangle[i][j] + Math.min(dfs(i + 1, j), dfs(i + 1, j + 1));

    return memo[i][j];
  };

  // 从顶点开始递归
  return dfs(0, 0);
}

/**
 * 递归树示例（无记忆化时会重复计算）：
 *
 *                 dfs(0,0)
 *                /        \\
 *          dfs(1,0)      dfs(1,1)
 *          /    \\        /    \\
 *     dfs(2,0) dfs(2,1) dfs(2,1) dfs(2,2)
 *                  ↑ 重复计算！
 *
 * 使用记忆化后，dfs(2,1) 只计算一次
 */`,
        explanation: `## 递归 + 记忆化

### 思路
1. dfs(i, j) 返回从 (i,j) 到底部的最小路径和
2. 选择下一行的 j 或 j+1 中较小的
3. 用 memo 缓存计算结果

### 特点
- 自顶向下的思考方式
- 代码逻辑清晰`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
      },
    ],
  },

  // 5. 最长公共子序列 (1143)
  {
    id: "longest-common-subsequence",
    leetcodeId: 1143,
    title: "最长公共子序列",
    titleEn: "Longest Common Subsequence",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["字符串", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "最长公共子序列",
    description: `给定两个字符串 \`text1\` 和 \`text2\`，返回这两个字符串的最长 **公共子序列** 的长度。如果不存在 **公共子序列**，返回 \`0\`。

一个字符串的 **子序列** 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，\`"ace"\` 是 \`"abcde"\` 的子序列，但 \`"aec"\` 不是 \`"abcde"\` 的子序列。

两个字符串的 **公共子序列** 是这两个字符串所共同拥有的子序列。`,
    examples: `**示例 1：**
\`\`\`
输入：text1 = "abcde", text2 = "ace"
输出：3
解释：最长公共子序列是 "ace"，它的长度为 3。
\`\`\`

**示例 2：**
\`\`\`
输入：text1 = "abc", text2 = "abc"
输出：3
解释：最长公共子序列是 "abc"，它的长度为 3。
\`\`\`

**示例 3：**
\`\`\`
输入：text1 = "abc", text2 = "def"
输出：0
解释：两个字符串没有公共子序列，返回 0。
\`\`\``,
    constraints: `- \`1 <= text1.length, text2.length <= 1000\`
- \`text1\` 和 \`text2\` 仅由小写英文字符组成`,
    initialCode: `function longestCommonSubsequence(text1, text2) {
  // 在此处编写你的代码

}`,
    solution: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] 表示 text1[0...i-1] 和 text2[0...j-1] 的 LCS 长度
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
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: ["abcde", "ace"],
        expected: 3
      },
      {
        id: "2",
        name: "相同字符串",
        input: ["abc", "abc"],
        expected: 3
      },
      {
        id: "3",
        name: "无公共子序列",
        input: ["abc", "def"],
        expected: 0
      }
    ],
    hints: [
      "如果 text1[i] == text2[j]，则 dp[i][j] = dp[i-1][j-1] + 1",
      "否则 dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
      "注意下标的对应关系"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i][j] 表示 text1[0...i-1] 和 text2[0...j-1] 的最长公共子序列长度

状态转移：
- 如果 text1[i-1] === text2[j-1]：dp[i][j] = dp[i-1][j-1] + 1
- 否则：dp[i][j] = max(dp[i-1][j], dp[i][j-1])

边界条件：dp[0][j] = dp[i][0] = 0

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)，可优化到 O(n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    relatedProblems: ["edit-distance", "longest-increasing-subsequence"],
    solutions: [
      {
        name: "动态规划 - 二维数组（推荐）",
        code: `/**
 * 最长公共子序列 (LCS) - 动态规划二维数组解法
 *
 * 核心思想：
 * dp[i][j] 表示 text1[0...i-1] 和 text2[0...j-1] 的 LCS 长度
 *
 * 状态转移：
 * 1. 如果 text1[i-1] === text2[j-1]：
 *    当前字符匹配，LCS 长度 +1
 *    dp[i][j] = dp[i-1][j-1] + 1
 *
 * 2. 否则：
 *    当前字符不匹配，取两种选择的最大值：
 *    - 不用 text1[i-1]：dp[i-1][j]
 *    - 不用 text2[j-1]：dp[i][j-1]
 *    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] 表示 text1 前 i 个字符和 text2 前 j 个字符的 LCS 长度
  // 使用 (m+1) × (n+1) 的数组，方便处理边界
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 填表：从 1 开始，因为 dp[0][*] 和 dp[*][0] 都是 0
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 注意：dp 下标从 1 开始，字符串下标从 0 开始
      if (text1[i - 1] === text2[j - 1]) {
        // 当前字符匹配，LCS 长度 +1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 当前字符不匹配，取两种选择的最大值
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

/**
 * 执行过程示例：
 * text1 = "abcde", text2 = "ace"
 *
 * DP 表（行：text1，列：text2）：
 *       ""  a  c  e
 *    ""  0  0  0  0
 *    a   0  1  1  1
 *    b   0  1  1  1
 *    c   0  1  2  2
 *    d   0  1  2  2
 *    e   0  1  2  3 ← 答案
 *
 * LCS = "ace"，长度 = 3
 *
 * 填表过程说明：
 * dp[1][1]: 'a' === 'a' → dp[0][0] + 1 = 1
 * dp[3][2]: 'c' === 'c' → dp[2][1] + 1 = 2
 * dp[5][3]: 'e' === 'e' → dp[4][2] + 1 = 3
 */`,
        explanation: `## 动态规划 - 二维数组

### 思路
1. dp[i][j] 表示 text1 前 i 个字符和 text2 前 j 个字符的 LCS 长度
2. 如果字符相同，dp[i][j] = dp[i-1][j-1] + 1
3. 否则取左边或上边的最大值

### 要点
- 注意下标的对应关系（偏移1）`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "动态规划 - 空间优化",
        code: `/**
 * 最长公共子序列 - 滚动数组空间优化解法
 *
 * 核心思想：
 * 由于 dp[i][j] 只依赖于 dp[i-1][j-1]、dp[i-1][j]、dp[i][j-1]
 * 即只依赖上一行的数据，可以使用两行交替滚动
 *
 * 技巧：使用两个一维数组 prev 和 curr 交替更新
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(n) - 只需要两行的空间
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 使用两行滚动数组
  let prev = new Array(n + 1).fill(0);  // 上一行
  let curr = new Array(n + 1).fill(0);  // 当前行

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // 字符匹配：左上角值 + 1
        curr[j] = prev[j - 1] + 1;
      } else {
        // 字符不匹配：取上方和左方的最大值
        // prev[j] = 上方值，curr[j-1] = 左方值
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    // 交换数组引用（而不是复制内容）
    [prev, curr] = [curr, prev];
  }

  // 注意：最后交换了一次，答案在 prev 中
  return prev[n];
}

/**
 * 滚动数组示意：
 *
 * 计算 i=1 时：
 * prev = [0, 0, 0, 0]  (i=0 的结果)
 * curr = [0, 1, 1, 1]  (计算中)
 *
 * 交换后：
 * prev = [0, 1, 1, 1]
 * curr = [0, 0, 0, 0]  (将被覆盖)
 *
 * 计算 i=2 时：
 * prev = [0, 1, 1, 1]  (i=1 的结果)
 * curr = [0, 1, 1, 1]  (计算中)
 * ...
 */`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 每次只需要上一行的数据
2. 使用两个一维数组交替滚动
3. 空间从 O(m×n) 优化到 O(n)

### 要点
- 交换数组而不是复制`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 最长公共子序列 - 递归 + 记忆化解法
 *
 * 核心思想：
 * 使用递归自顶向下思考，用 memo 数组缓存结果
 *
 * 递归定义：
 * lcs(i, j) = text1[0...i] 和 text2[0...j] 的 LCS 长度
 *
 * 递归关系：
 * - 如果 text1[i] === text2[j]：lcs(i, j) = lcs(i-1, j-1) + 1
 * - 否则：lcs(i, j) = max(lcs(i-1, j), lcs(i, j-1))
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n) - 记忆化数组 + 递归栈
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 记忆化数组，-1 表示未计算
  const memo = Array.from({ length: m }, () => new Array(n).fill(-1));

  // 递归函数：返回 text1[0...i] 和 text2[0...j] 的 LCS 长度
  const lcs = (i, j) => {
    // 边界：任一字符串为空，LCS 长度为 0
    if (i < 0 || j < 0) return 0;

    // 检查缓存
    if (memo[i][j] !== -1) return memo[i][j];

    // 递归计算
    if (text1[i] === text2[j]) {
      // 末尾字符匹配
      memo[i][j] = lcs(i - 1, j - 1) + 1;
    } else {
      // 末尾字符不匹配，尝试两种选择
      memo[i][j] = Math.max(lcs(i - 1, j), lcs(i, j - 1));
    }

    return memo[i][j];
  };

  // 从两个字符串的末尾开始
  return lcs(m - 1, n - 1);
}

/**
 * 递归调用示例：
 * text1 = "abc", text2 = "ac"
 *
 * lcs(2, 1)
 * └── 'c' === 'c' → lcs(1, 0) + 1
 *     └── 'b' !== 'a' → max(lcs(0,0), lcs(1,-1))
 *         ├── lcs(0, 0): 'a' === 'a' → lcs(-1,-1) + 1 = 1
 *         └── lcs(1, -1) = 0
 *     → max(1, 0) = 1
 * → 1 + 1 = 2
 *
 * 答案：2（LCS = "ac"）
 */`,
        explanation: `## 递归 + 记忆化

### 思路
1. lcs(i, j) 返回 text1[0...i] 和 text2[0...j] 的 LCS 长度
2. 如果末尾字符相同，LCS + 1
3. 否则取两种选择的最大值

### 特点
- 自顶向下的思考方式
- 代码更直观`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 6. 编辑距离 (72)
  {
    id: "edit-distance",
    leetcodeId: 72,
    title: "编辑距离",
    titleEn: "Edit Distance",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["字符串", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "编辑距离，复杂DP",
    description: `给你两个单词 \`word1\` 和 \`word2\`，请返回将 \`word1\` 转换成 \`word2\` 所使用的最少操作数。

你可以对一个单词进行如下三种操作：
- 插入一个字符
- 删除一个字符
- 替换一个字符`,
    examples: `**示例 1：**
\`\`\`
输入：word1 = "horse", word2 = "ros"
输出：3
解释：
horse -> rorse (将 'h' 替换为 'r')
rorse -> rose (删除 'r')
rose -> ros (删除 'e')
\`\`\`

**示例 2：**
\`\`\`
输入：word1 = "intention", word2 = "execution"
输出：5
解释：
intention -> inention (删除 't')
inention -> enention (将 'i' 替换为 'e')
enention -> exention (将 'n' 替换为 'x')
exention -> exection (将 'n' 替换为 'c')
exection -> execution (插入 'u')
\`\`\``,
    constraints: `- \`0 <= word1.length, word2.length <= 500\`
- \`word1\` 和 \`word2\` 由小写英文字母组成`,
    initialCode: `function minDistance(word1, word2) {
  // 在此处编写你的代码

}`,
    solution: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] 表示 word1[0...i-1] 转换为 word2[0...j-1] 的最少操作数
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 边界条件
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1,     // 插入
          dp[i - 1][j - 1] + 1  // 替换
        );
      }
    }
  }

  return dp[m][n];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: ["horse", "ros"],
        expected: 3
      },
      {
        id: "2",
        name: "示例2",
        input: ["intention", "execution"],
        expected: 5
      }
    ],
    hints: [
      "dp[i][j] 表示 word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数",
      "如果字符相同，dp[i][j] = dp[i-1][j-1]",
      "否则取 删除、插入、替换 三种操作的最小值 + 1"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i][j] 表示 word1[0...i-1] 转换为 word2[0...j-1] 的最少操作数

状态转移：
- 如果 word1[i-1] === word2[j-1]：dp[i][j] = dp[i-1][j-1]
- 否则：dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1
  - dp[i-1][j] + 1：删除 word1[i-1]
  - dp[i][j-1] + 1：插入 word2[j-1]
  - dp[i-1][j-1] + 1：替换

边界条件：
- dp[i][0] = i（删除 i 个字符）
- dp[0][j] = j（插入 j 个字符）

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    relatedProblems: ["longest-common-subsequence", "word-break"],
    solutions: [
      {
        name: "动态规划 - 二维数组（推荐）",
        code: `/**
 * 编辑距离 (Levenshtein Distance) - 动态规划解法
 *
 * 核心思想：
 * dp[i][j] = 将 word1[0...i-1] 转换为 word2[0...j-1] 的最少操作数
 *
 * 三种操作：
 * 1. 插入：在 word1 中插入一个字符 → dp[i][j-1] + 1
 * 2. 删除：从 word1 中删除一个字符 → dp[i-1][j] + 1
 * 3. 替换：将 word1 的一个字符替换 → dp[i-1][j-1] + 1
 *
 * 状态转移：
 * - 如果 word1[i-1] === word2[j-1]：dp[i][j] = dp[i-1][j-1]（无需操作）
 * - 否则：dp[i][j] = min(删除, 插入, 替换) + 1
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] = word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 边界条件：空字符串的情况
  // word1[0...i-1] 转换为空字符串，需要删除 i 个字符
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  // 空字符串转换为 word2[0...j-1]，需要插入 j 个字符
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // 填表
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 字符相同，不需要操作
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 字符不同，取三种操作的最小值
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // 删除 word1[i-1]
          dp[i][j - 1] + 1,     // 在 word1 中插入 word2[j-1]
          dp[i - 1][j - 1] + 1  // 将 word1[i-1] 替换为 word2[j-1]
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * 执行过程示例：
 * word1 = "horse", word2 = "ros"
 *
 * DP 表：
 *       ""  r  o  s
 *    ""  0  1  2  3
 *    h   1  1  2  3
 *    o   2  2  1  2
 *    r   3  2  2  2
 *    s   4  3  3  2
 *    e   5  4  4  3 ← 答案
 *
 * 转换过程：
 * horse → rorse (h→r 替换)
 * rorse → rose  (删除 r)
 * rose  → ros   (删除 e)
 */`,
        explanation: `## 动态规划 - 二维数组

### 思路
1. dp[i][j] 表示 word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数
2. 如果字符相同，不需要操作
3. 否则取 删除、插入、替换 三种操作的最小值 + 1

### 边界条件
- dp[i][0] = i（删除 i 个字符）
- dp[0][j] = j（插入 j 个字符）`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "动态规划 - 空间优化",
        code: `/**
 * 编辑距离 - 滚动数组空间优化解法
 *
 * 核心思想：
 * dp[i][j] 只依赖 dp[i-1][j]、dp[i][j-1]、dp[i-1][j-1]
 * 可以使用两行滚动数组优化空间
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(n)
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // prev: 上一行，curr: 当前行
  // 初始化 prev 为 [0, 1, 2, ..., n]（空字符串到 word2 的距离）
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    // 当前行第一列：word1 前 i 个字符到空字符串的距离
    curr[0] = i;

    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 字符相同，继承左上角
        curr[j] = prev[j - 1];
      } else {
        // 字符不同，取三种操作最小值
        curr[j] = Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
        // prev[j] = 删除（上方）
        // curr[j-1] = 插入（左方）
        // prev[j-1] = 替换（左上角）
      }
    }
    // 交换数组
    [prev, curr] = [curr, prev];
  }

  // 答案在 prev 中（最后交换了一次）
  return prev[n];
}

/**
 * 空间优化要点：
 *
 * 原始 DP 表：        滚动数组：
 * dp[i-1][j-1] dp[i-1][j]    prev[j-1]  prev[j]
 * dp[i][j-1]   dp[i][j]      curr[j-1]  curr[j]
 *
 * 计算 curr[j] 时需要：
 * - prev[j-1]: 左上角（上一行上一列）
 * - prev[j]: 上方（上一行当前列）
 * - curr[j-1]: 左方（当前行上一列）
 */`,
        explanation: `## 动态规划 - 空间优化

### 思路
1. 每次只需要上一行的数据
2. 使用两个一维数组滚动
3. 空间从 O(m×n) 优化到 O(n)

### 要点
- 需要记录左上角的值（prev[j-1]）`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归 + 记忆化",
        code: `/**
 * 编辑距离 - 递归 + 记忆化解法
 *
 * 核心思想：
 * 自顶向下递归思考问题
 * dp(i, j) = word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数
 *
 * 基础情况：
 * - dp(0, j) = j（需要插入 j 个字符）
 * - dp(i, 0) = i（需要删除 i 个字符）
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // 记忆化数组，初始化为 -1
  const memo = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  // 递归函数
  const dp = (i, j) => {
    // 基础情况：word1 为空
    if (i === 0) return j;  // 需要插入 j 个字符
    // 基础情况：word2 为空
    if (j === 0) return i;  // 需要删除 i 个字符

    // 检查缓存
    if (memo[i][j] !== -1) return memo[i][j];

    // 递归计算
    if (word1[i - 1] === word2[j - 1]) {
      // 字符相同，不需要操作
      memo[i][j] = dp(i - 1, j - 1);
    } else {
      // 字符不同，尝试三种操作
      memo[i][j] = Math.min(
        dp(i - 1, j),     // 删除 word1[i-1]
        dp(i, j - 1),     // 在 word1 插入 word2[j-1]
        dp(i - 1, j - 1)  // 替换
      ) + 1;
    }

    return memo[i][j];
  };

  return dp(m, n);
}

/**
 * 递归思考方式：
 *
 * 考虑 word1 和 word2 的最后一个字符：
 *
 * 1. 如果相同：不需要操作，dp(i,j) = dp(i-1,j-1)
 *
 * 2. 如果不同：
 *    - 删除 word1 最后一个字符：dp(i-1,j) + 1
 *    - 在 word1 末尾插入 word2 最后一个字符：dp(i,j-1) + 1
 *    - 替换 word1 最后一个字符为 word2 最后一个：dp(i-1,j-1) + 1
 */`,
        explanation: `## 递归 + 记忆化

### 思路
1. dp(i, j) 返回 word1 前 i 个字符转换为 word2 前 j 个字符的最少操作数
2. 基础情况：一个为空时，返回另一个的长度
3. 递归尝试三种操作

### 特点
- 自顶向下的思考方式
- 更容易理解问题结构`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 7. 买卖股票的最佳时机 III (123)
  {
    id: "best-time-to-buy-and-sell-stock-iii",
    leetcodeId: 123,
    title: "买卖股票的最佳时机 III",
    titleEn: "Best Time to Buy and Sell Stock III",
    difficulty: "hard",
    category: "dp-multi",
    tags: ["数组", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "股票III，复杂DP",
    description: `给定一个数组，它的第 \`i\` 个元素是一支给定的股票在第 \`i\` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 **两笔** 交易。

**注意**：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。`,
    examples: `**示例 1：**
\`\`\`
输入：prices = [3,3,5,0,0,3,1,4]
输出：6
解释：在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3。
     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3。
\`\`\`

**示例 2：**
\`\`\`
输入：prices = [1,2,3,4,5]
输出：4
解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出，这笔交易所能获得利润 = 5-1 = 4。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
\`\`\`

**示例 3：**
\`\`\`
输入：prices = [7,6,4,3,1]
输出：0
解释：在这个情况下，没有交易完成，所以最大利润为 0。
\`\`\``,
    constraints: `- \`1 <= prices.length <= 10^5\`
- \`0 <= prices[i] <= 10^5\``,
    initialCode: `function maxProfit(prices) {
  // 在此处编写你的代码

}`,
    solution: `function maxProfit(prices) {
  // 状态：第一次买入、第一次卖出、第二次买入、第二次卖出
  let buy1 = -prices[0];
  let sell1 = 0;
  let buy2 = -prices[0];
  let sell2 = 0;

  for (let i = 1; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }

  return sell2;
}`,
    testCases: [
      {
        id: "1",
        name: "两次交易",
        input: [[[3,3,5,0,0,3,1,4]]],
        expected: 6
      },
      {
        id: "2",
        name: "一次交易最优",
        input: [[[1,2,3,4,5]]],
        expected: 4
      },
      {
        id: "3",
        name: "无利润",
        input: [[[7,6,4,3,1]]],
        expected: 0
      }
    ],
    hints: [
      "使用状态机思想，定义4个状态",
      "buy1: 第一次买入后的最大收益",
      "sell1: 第一次卖出后的最大收益",
      "buy2: 第二次买入后的最大收益",
      "sell2: 第二次卖出后的最大收益"
    ],
    explanation: `## 解题思路

### 状态机动态规划

定义4个状态：
- buy1: 第一次买入后的最大收益（持有股票）
- sell1: 第一次卖出后的最大收益
- buy2: 第二次买入后的最大收益（持有股票）
- sell2: 第二次卖出后的最大收益

状态转移：
- buy1 = max(buy1, -prices[i])
- sell1 = max(sell1, buy1 + prices[i])
- buy2 = max(buy2, sell1 - prices[i])
- sell2 = max(sell2, buy2 + prices[i])

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["best-time-to-buy-and-sell-stock-iv", "house-robber"],
    solutions: [
      {
        name: "状态机 - 空间优化（推荐）",
        code: `/**
 * 买卖股票的最佳时机 III - 状态机 DP 解法
 *
 * 核心思想：
 * 定义 4 个状态变量，表示不同阶段的最大收益：
 * - buy1: 第一次买入后的最大收益（持有股票）
 * - sell1: 第一次卖出后的最大收益（不持有股票）
 * - buy2: 第二次买入后的最大收益（持有股票）
 * - sell2: 第二次卖出后的最大收益（不持有股票）
 *
 * 状态转移：
 * buy1 = max(buy1, -prices[i])         // 第一次买入
 * sell1 = max(sell1, buy1 + prices[i]) // 第一次卖出
 * buy2 = max(buy2, sell1 - prices[i])  // 第二次买入（基于第一次卖出）
 * sell2 = max(sell2, buy2 + prices[i]) // 第二次卖出
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function maxProfit(prices) {
  // 初始化状态
  // buy1, buy2 初始为 -prices[0]（第一天买入）
  let buy1 = -prices[0];   // 第一次买入后的最大收益
  let sell1 = 0;           // 第一次卖出后的最大收益
  let buy2 = -prices[0];   // 第二次买入后的最大收益
  let sell2 = 0;           // 第二次卖出后的最大收益

  // 从第二天开始遍历
  for (let i = 1; i < prices.length; i++) {
    // 第一次买入：要么保持之前买入状态，要么今天买入
    buy1 = Math.max(buy1, -prices[i]);
    // 第一次卖出：要么保持之前卖出状态，要么今天卖出
    sell1 = Math.max(sell1, buy1 + prices[i]);
    // 第二次买入：要么保持之前买入状态，要么今天买入（基于第一次卖出的收益）
    buy2 = Math.max(buy2, sell1 - prices[i]);
    // 第二次卖出：要么保持之前卖出状态，要么今天卖出
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }

  // 返回完成最多两次交易后的最大收益
  return sell2;
}

/**
 * 状态转移示意图：
 *
 *        买入        卖出        买入        卖出
 * 初始 ────→ buy1 ────→ sell1 ────→ buy2 ────→ sell2
 *        ↑   ↓          ↑   ↓          ↑   ↓          ↑   ↓
 *        └───┘          └───┘          └───┘          └───┘
 *        保持           保持           保持           保持
 *
 * 执行示例：prices = [3,3,5,0,0,3,1,4]
 *
 * i=0: buy1=-3, sell1=0, buy2=-3, sell2=0
 * i=3: buy1=0, sell1=5, buy2=5, sell2=5
 *      (第一次在0买入，sell1保持5，buy2=5-0=5)
 * i=7: sell2 = max(5, buy2+4) = 6
 *
 * 最优策略：
 * - 第一次：第4天买入(0)，第6天卖出(3)，利润3
 * - 第二次：第7天买入(1)，第8天卖出(4)，利润3
 * - 总利润：6
 */`,
        explanation: `## 状态机 - 空间优化

### 思路
定义 4 个状态：
- buy1: 第一次买入后的最大收益
- sell1: 第一次卖出后的最大收益
- buy2: 第二次买入后的最大收益
- sell2: 第二次卖出后的最大收益

### 状态转移
- buy1 = max(buy1, -prices[i])
- sell1 = max(sell1, buy1 + prices[i])
- buy2 = max(buy2, sell1 - prices[i])
- sell2 = max(sell2, buy2 + prices[i])`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划 - 三维数组",
        code: `/**
 * 买卖股票 III - 三维 DP 解法
 *
 * 核心思想：
 * dp[i][k][hold] = 第 i 天，完成了 k 次交易，是否持有股票的最大收益
 * hold = 0 表示不持有，hold = 1 表示持有
 *
 * 状态转移：
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 *               保持不持有        或     今天卖出
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 *               保持持有          或     今天买入（完成第k次交易）
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function maxProfit(prices) {
  const n = prices.length;
  if (n < 2) return 0;

  // dp[i][k][0/1] = 第i天，完成了k次交易，当前不持有/持有股票的最大收益
  // k 的范围是 0, 1, 2（最多2次交易）
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: 3 }, () => [0, -Infinity])
  );

  // 初始化：第0天
  dp[0][0][0] = 0;          // 第0天，0次交易，不持有
  dp[0][1][1] = -prices[0]; // 第0天，进行第1次交易，持有（买入）

  for (let i = 1; i < n; i++) {
    for (let k = 0; k <= 2; k++) {
      // 不持有股票：保持或卖出
      dp[i][k][0] = Math.max(
        dp[i - 1][k][0],                              // 保持不持有
        k > 0 ? dp[i - 1][k][1] + prices[i] : -Infinity  // 今天卖出（完成第k次）
      );
      // 持有股票：保持或买入
      if (k < 2) {
        dp[i][k + 1][1] = Math.max(
          dp[i - 1][k + 1][1],                        // 保持持有
          dp[i - 1][k][0] - prices[i]                 // 今天买入（开始第k+1次）
        );
      }
    }
  }

  // 返回最后一天，完成0/1/2次交易，不持有股票的最大值
  return Math.max(dp[n - 1][0][0], dp[n - 1][1][0], dp[n - 1][2][0]);
}

/**
 * 三维状态解释：
 *
 * dp[i][k][0/1] 中：
 * - i: 第几天
 * - k: 已完成的交易次数（卖出才算完成）
 * - 0/1: 是否持有股票
 *
 * 此解法是股票问题的通用框架，可以扩展到 k 次交易
 */`,
        explanation: `## 动态规划 - 三维数组

### 思路
1. dp[i][k][0] = 第 i 天，完成 k 次交易，不持有股票的最大收益
2. dp[i][k][1] = 第 i 天，完成 k 次交易，持有股票的最大收益
3. 卖出时算一次完整交易

### 特点
- 更通用的框架，可以扩展到 k 次交易`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "分治法",
        code: `/**
 * 买卖股票 III - 分治法
 *
 * 核心思想：
 * 将问题分解为两个子问题：
 * - left[i] = 从第 0 天到第 i 天，进行一次交易的最大利润
 * - right[i] = 从第 i 天到最后一天，进行一次交易的最大利润
 *
 * 然后枚举分割点 i，两次交易的最大总利润 = max(left[i] + right[i])
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function maxProfit(prices) {
  const n = prices.length;
  if (n < 2) return 0;

  // left[i] = 从第 0 天到第 i 天的最大利润（一次交易）
  const left = new Array(n).fill(0);
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    // 维护历史最低价
    minPrice = Math.min(minPrice, prices[i]);
    // 最大利润 = 当前价格 - 历史最低价
    left[i] = Math.max(left[i - 1], prices[i] - minPrice);
  }

  // right[i] = 从第 i 天到最后一天的最大利润（一次交易）
  const right = new Array(n).fill(0);
  let maxPrice = prices[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    // 维护未来最高价
    maxPrice = Math.max(maxPrice, prices[i]);
    // 最大利润 = 未来最高价 - 当前价格
    right[i] = Math.max(right[i + 1], maxPrice - prices[i]);
  }

  // 枚举分割点，计算两次交易的最大总利润
  let maxProfit = 0;
  for (let i = 0; i < n; i++) {
    // 第一次交易在 [0, i]，第二次交易在 [i, n-1]
    maxProfit = Math.max(maxProfit, left[i] + right[i]);
  }

  return maxProfit;
}

/**
 * 分治思想示意：
 *
 * prices = [3,3,5,0,0,3,1,4]
 *
 * left 数组（从左到右看，维护最低价）：
 * [0, 0, 2, 2, 2, 3, 3, 4]
 *
 * right 数组（从右到左看，维护最高价）：
 * [4, 4, 4, 4, 4, 3, 3, 0]
 *
 * 枚举分割点 i：
 * i=4: left[4] + right[4] = 2 + 4 = 6 ← 最大值
 *
 * 实际交易：
 * - 第一次：0买入，5卖出 或 0买入，3卖出
 * - 第二次：1买入，4卖出
 */`,
        explanation: `## 分治法

### 思路
1. left[i] = 从第 0 天到第 i 天的最大利润
2. right[i] = 从第 i 天到最后一天的最大利润
3. 枚举分割点，取 left[i] + right[i] 的最大值

### 特点
- 将问题分解为两个单次交易问题
- 枚举所有可能的分割点`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 8. 买卖股票的最佳时机 IV (188)
  {
    id: "best-time-to-buy-and-sell-stock-iv",
    leetcodeId: 188,
    title: "买卖股票的最佳时机 IV",
    titleEn: "Best Time to Buy and Sell Stock IV",
    difficulty: "hard",
    category: "dp-multi",
    tags: ["数组", "动态规划"],
    frontendRelevance: "low",
    frontendNote: "股票IV，复杂DP",
    description: `给你一个整数数组 \`prices\` 和一个整数 \`k\`，其中 \`prices[i]\` 是某支给定的股票在第 \`i\` 天的价格。

设计一个算法来计算你所能获取的最大利润。你最多可以完成 \`k\` 笔交易。也就是说，你最多可以买 \`k\` 次，卖 \`k\` 次。

**注意**：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。`,
    examples: `**示例 1：**
\`\`\`
输入：k = 2, prices = [2,4,1]
输出：2
解释：在第 1 天（股票价格 = 2）的时候买入，在第 2 天（股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-2 = 2。
\`\`\`

**示例 2：**
\`\`\`
输入：k = 2, prices = [3,2,6,5,0,3]
输出：7
解释：在第 2 天（股票价格 = 2）的时候买入，在第 3 天（股票价格 = 6）的时候卖出，这笔交易所能获得利润 = 6-2 = 4。
     随后，在第 5 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3。
\`\`\``,
    constraints: `- \`1 <= k <= 100\`
- \`1 <= prices.length <= 1000\`
- \`0 <= prices[i] <= 1000\``,
    initialCode: `function maxProfit(k, prices) {
  // 在此处编写你的代码

}`,
    solution: `function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  // 如果 k >= n/2，相当于无限次交易
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }

  // buy[j]: 第 j 次买入后的最大收益
  // sell[j]: 第 j 次卖出后的最大收益
  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }

  return sell[k];
}`,
    testCases: [
      {
        id: "1",
        name: "k=2",
        input: [2, [2,4,1]],
        expected: 2
      },
      {
        id: "2",
        name: "两次交易",
        input: [2, [3,2,6,5,0,3]],
        expected: 7
      }
    ],
    hints: [
      "这是股票问题III的通用版本",
      "buy[j] 表示第 j 次买入后的最大收益",
      "sell[j] 表示第 j 次卖出后的最大收益",
      "当 k >= n/2 时，等价于无限次交易"
    ],
    explanation: `## 解题思路

### 状态机动态规划

状态定义：
- buy[j]: 完成第 j 次买入后的最大收益
- sell[j]: 完成第 j 次卖出后的最大收益

状态转移：
- buy[j] = max(buy[j], sell[j-1] - prices[i])
- sell[j] = max(sell[j], buy[j] + prices[i])

优化：当 k >= n/2 时，相当于可以无限次交易，直接贪心即可。

### 复杂度分析
- 时间复杂度：O(n × k)
- 空间复杂度：O(k)`,
    timeComplexity: "O(n × k)",
    spaceComplexity: "O(k)",
    relatedProblems: ["best-time-to-buy-and-sell-stock-iii", "house-robber"],
    solutions: [
      {
        name: "状态机动态规划（推荐）",
        code: `/**
 * 买卖股票的最佳时机 IV - 状态机 DP 解法
 *
 * 核心思想：
 * 将股票问题 III 扩展到 k 次交易
 * buy[j] = 完成第 j 次买入后的最大收益
 * sell[j] = 完成第 j 次卖出后的最大收益
 *
 * 优化：当 k >= n/2 时，相当于无限次交易，直接贪心即可
 * 因为最多 n/2 次有效交易（每次交易至少需要2天）
 *
 * 时间复杂度：O(n × k)
 * 空间复杂度：O(k)
 */
function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  // 优化：如果 k 足够大，等价于无限次交易
  // 此时用贪心：只要有利润就交易
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      // 只要今天比昨天贵，就累加利润
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }

  // buy[j]: 完成第 j 次买入后的最大收益
  // sell[j]: 完成第 j 次卖出后的最大收益
  const buy = new Array(k + 1).fill(-Infinity);  // 买入后是负收益
  const sell = new Array(k + 1).fill(0);          // 还没交易，收益为0

  // 遍历每一天
  for (let i = 0; i < n; i++) {
    // 遍历每次交易
    for (let j = 1; j <= k; j++) {
      // 第 j 次买入：保持买入状态 或 今天买入（基于上一次卖出）
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
      // 第 j 次卖出：保持卖出状态 或 今天卖出（基于当前买入）
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }

  // 返回完成 k 次交易后的最大收益
  return sell[k];
}

/**
 * 状态转移图：
 *
 * sell[0] ─买入→ buy[1] ─卖出→ sell[1] ─买入→ buy[2] ─卖出→ sell[2] ...
 *    ↑                    ↑                    ↑
 *   初始0               第1次交易            第2次交易
 *
 * 为什么 k >= n/2 时可以贪心？
 * - 每次交易需要至少2天（买入和卖出）
 * - n 天最多进行 n/2 次交易
 * - 当 k >= n/2 时，交易次数不再是限制因素
 */`,
        explanation: `## 状态机动态规划

### 思路
1. buy[j] = 第 j 次买入后的最大收益
2. sell[j] = 第 j 次卖出后的最大收益
3. 状态转移和股票III类似，但扩展到 k 次

### 优化
- 当 k >= n/2 时，等价于无限次交易，直接贪心`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(k)",
      },
      {
        name: "动态规划 - 三维数组",
        code: `/**
 * 买卖股票 IV - 三维 DP 解法
 *
 * 核心思想：
 * dp[i][j][hold] = 第 i 天，完成了 j 次交易，是否持有股票的最大收益
 * 这是股票问题的通用框架
 *
 * 时间复杂度：O(n × k)
 * 空间复杂度：O(n × k)
 */
function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  // 优化：k >= n/2 时等价于无限次交易
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }

  // dp[i][j][0/1] = 第i天，完成j次交易，不持有/持有股票的最大收益
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: k + 1 }, () => [-Infinity, -Infinity])
  );

  // 初始化：第0天
  dp[0][0][0] = 0;          // 0次交易，不持有
  dp[0][0][1] = -prices[0]; // 0次交易，持有（已买入但未卖出）

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= k; j++) {
      // 不持有股票：保持不持有 或 今天卖出（完成第j次交易）
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);

      // 持有股票：保持持有 或 今天买入
      if (j > 0) {
        // 买入时使用上一次卖出的收益（j-1次交易后）
        dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
      } else {
        // j=0 时，还没有完成过交易，只能是第一次买入
        dp[i][j][1] = Math.max(dp[i - 1][j][1], -prices[i]);
      }
    }
  }

  // 找出完成任意次数交易后的最大收益
  let maxProfit = 0;
  for (let j = 0; j <= k; j++) {
    maxProfit = Math.max(maxProfit, dp[n - 1][j][0]);
  }

  return maxProfit;
}

/**
 * 状态含义说明：
 *
 * dp[i][j][0]: 第i天结束时，已完成j次完整交易，手上没有股票
 * dp[i][j][1]: 第i天结束时，已完成j次完整交易，手上有股票（等待卖出）
 *
 * "完成交易"的定义：一次买入 + 一次卖出 = 一次完整交易
 */`,
        explanation: `## 动态规划 - 三维数组

### 思路
1. dp[i][j][0] = 第 i 天，完成 j 次交易，不持有股票
2. dp[i][j][1] = 第 i 天，完成 j 次交易，持有股票
3. 买入时增加交易次数

### 特点
- 状态更清晰
- 空间复杂度较高`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(n × k)",
      },
      {
        name: "贪心 + 合并区间",
        code: `/**
 * 买卖股票 IV - 贪心 + 合并区间解法
 *
 * 核心思想：
 * 1. 先找出所有上升区间（每个区间代表一次潜在的交易利润）
 * 2. 如果区间数 <= k，直接返回所有利润之和
 * 3. 否则使用状态机 DP
 *
 * 优化点：对于 k 较大的情况可以快速返回
 *
 * 时间复杂度：O(n × k)，但对于 k 大的情况更快
 * 空间复杂度：O(k)
 */
function maxProfit(k, prices) {
  const n = prices.length;
  if (n < 2 || k === 0) return 0;

  // 步骤1：找出所有上升区间
  const profits = [];
  let i = 0;
  while (i < n - 1) {
    // 找谷底（价格下降时跳过）
    while (i < n - 1 && prices[i] >= prices[i + 1]) i++;
    const valley = prices[i];

    // 找山顶（价格上升时跳过）
    while (i < n - 1 && prices[i] <= prices[i + 1]) i++;
    const peak = prices[i];

    // 记录这个上升区间的利润
    if (peak > valley) {
      profits.push(peak - valley);
    }
  }

  // 步骤2：如果交易次数足够，直接返回所有利润之和
  if (profits.length <= k) {
    return profits.reduce((sum, p) => sum + p, 0);
  }

  // 步骤3：否则使用状态机 DP
  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }

  return sell[k];
}

/**
 * 上升区间示例：
 * prices = [3,2,6,5,0,3]
 *
 * 找谷底和山顶：
 * - 谷底2，山顶6 → 利润4
 * - 谷底0，山顶3 → 利润3
 *
 * profits = [4, 3]
 *
 * 如果 k >= 2：直接返回 4 + 3 = 7
 * 如果 k = 1：需要用 DP 选择一个最大的
 */`,
        explanation: `## 贪心 + 合并区间

### 思路
1. 先找出所有上升区间的利润
2. 如果区间数 <= k，直接返回总利润
3. 否则使用状态机DP

### 优化
- 对于 k 较大的情况可以快速返回
- 减少不必要的计算`,
        timeComplexity: "O(n × k)",
        spaceComplexity: "O(k)",
      },
    ],
  },

  // 9. 最长回文子串 (5)
  {
    id: "longest-palindromic-substring",
    leetcodeId: 5,
    title: "最长回文子串",
    titleEn: "Longest Palindromic Substring",
    difficulty: "medium",
    category: "dp-multi",
    tags: ["字符串", "动态规划"],
    frontendRelevance: "medium",
    frontendNote: "回文串DP/中心扩展",
    description: `给你一个字符串 \`s\`，找到 \`s\` 中最长的回文子串。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。
\`\`\`

**示例 2：**
\`\`\`
输入：s = "cbbd"
输出："bb"
\`\`\``,
    constraints: `- \`1 <= s.length <= 1000\`
- \`s\` 仅由数字和英文字母组成`,
    initialCode: `function longestPalindrome(s) {
  // 在此处编写你的代码

}`,
    solution: `function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  let start = 0;
  let maxLen = 1;

  // 中心扩展
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  };

  for (let i = 0; i < n; i++) {
    const len1 = expandAroundCenter(i, i);     // 奇数长度
    const len2 = expandAroundCenter(i, i + 1); // 偶数长度
    const len = Math.max(len1, len2);

    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLen);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: ["babad"],
        expected: "bab"
      },
      {
        id: "2",
        name: "示例2",
        input: ["cbbd"],
        expected: "bb"
      }
    ],
    hints: [
      "可以使用中心扩展法",
      "也可以使用动态规划",
      "注意奇数和偶数长度的回文串"
    ],
    explanation: `## 解题思路

### 中心扩展法

1. 遍历每个位置作为回文中心
2. 分别考虑奇数长度和偶数长度
3. 从中心向两边扩展，找到最长回文

### 复杂度分析
- 时间复杂度：O(n²)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    relatedProblems: ["longest-common-subsequence", "edit-distance"],
    solutions: [
      {
        name: "中心扩展法（推荐）",
        code: `/**
 * 最长回文子串 - 中心扩展法
 *
 * 核心思想：
 * 回文串一定有一个对称中心
 * 遍历每个可能的中心，向两边扩展找最长回文
 *
 * 两种情况：
 * 1. 奇数长度回文：中心是一个字符，如 "aba"
 * 2. 偶数长度回文：中心是两个字符之间，如 "abba"
 *
 * 时间复杂度：O(n²) - 每个中心最多扩展 n 次
 * 空间复杂度：O(1) - 只用几个变量
 */
function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  let start = 0;    // 最长回文的起始位置
  let maxLen = 1;   // 最长回文的长度

  // 从中心向两边扩展，返回回文长度
  const expandAroundCenter = (left, right) => {
    // 当两端字符相等时，继续向外扩展
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
    }
    // 返回回文长度（注意：跳出循环时 left 和 right 已经越界）
    return right - left - 1;
  };

  // 遍历每个可能的中心
  for (let i = 0; i < n; i++) {
    // 以 s[i] 为中心的奇数长度回文
    const len1 = expandAroundCenter(i, i);
    // 以 s[i] 和 s[i+1] 为中心的偶数长度回文
    const len2 = expandAroundCenter(i, i + 1);
    // 取较长的那个
    const len = Math.max(len1, len2);

    // 更新最长回文
    if (len > maxLen) {
      maxLen = len;
      // 计算起始位置：中心位置 - (长度-1)/2
      start = i - Math.floor((len - 1) / 2);
    }
  }

  // 返回最长回文子串
  return s.substring(start, start + maxLen);
}

/**
 * 执行示例：s = "babad"
 *
 * i=0: 以'b'为中心，len1=1，len2=0 → maxLen=1
 * i=1: 以'a'为中心，len1=3("bab")，len2=0 → maxLen=3，start=0
 * i=2: 以'b'为中心，len1=3("aba")，len2=0 → maxLen=3（相同，不更新）
 * i=3: 以'a'为中心，len1=1，len2=0
 * i=4: 以'd'为中心，len1=1，len2=0
 *
 * 结果："bab"（或"aba"都正确）
 *
 * 中心扩展示意：
 *     b a b a d
 *     ↑ ↑ ↑
 *     L C R
 *   从中心C向两边扩展，直到字符不匹配
 */`,
        explanation: `## 中心扩展法

### 思路
1. 遍历每个位置作为回文中心
2. 奇数长度：以 i 为中心
3. 偶数长度：以 i 和 i+1 为中心
4. 从中心向两边扩展

### 要点
- 时间复杂度 O(n²)，空间 O(1)
- 比动态规划更节省空间`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
      {
        name: "动态规划",
        code: `/**
 * 最长回文子串 - 动态规划解法
 *
 * 核心思想：
 * dp[i][j] = true 表示 s[i...j] 是回文串
 *
 * 状态转移：
 * dp[i][j] = (s[i] === s[j]) && dp[i+1][j-1]
 * 即：两端字符相同，且中间部分是回文
 *
 * 边界条件：
 * - 单个字符是回文：dp[i][i] = true
 * - 两个相同字符是回文：dp[i][i+1] = (s[i] === s[i+1])
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n²)
 */
function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  // dp[i][j] 表示 s[i...j] 是否为回文
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  let start = 0;    // 最长回文起始位置
  let maxLen = 1;   // 最长回文长度

  // 初始化：单个字符都是回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // 按长度递增顺序填表（关键！）
  // 因为 dp[i][j] 依赖 dp[i+1][j-1]，需要先算短的
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;  // 子串结束位置

      // 检查两端字符是否相同
      if (s[i] === s[j]) {
        if (len === 2) {
          // 长度为2，两个字符相同就是回文
          dp[i][j] = true;
        } else {
          // 长度>2，还需要检查中间部分
          dp[i][j] = dp[i + 1][j - 1];
        }
      }
      // s[i] !== s[j] 时，dp[i][j] 保持 false

      // 更新最长回文
      if (dp[i][j] && len > maxLen) {
        maxLen = len;
        start = i;
      }
    }
  }

  return s.substring(start, start + maxLen);
}

/**
 * DP 表填充顺序（按长度递增）：
 *
 * s = "babad"
 *
 * len=1: dp[0][0]=T, dp[1][1]=T, dp[2][2]=T, dp[3][3]=T, dp[4][4]=T
 *
 * len=2: dp[0][1]=F(b≠a), dp[1][2]=F(a≠b), dp[2][3]=F(b≠a), dp[3][4]=F(a≠d)
 *
 * len=3: dp[0][2]=T(b=b, dp[1][1]=T, "bab")
 *        dp[1][3]=T(a=a, dp[2][2]=T, "aba")
 *        dp[2][4]=F(b≠d)
 *
 * 结果：maxLen=3, start=0, 返回"bab"
 */`,
        explanation: `## 动态规划

### 思路
1. dp[i][j] 表示 s[i...j] 是否为回文
2. 转移：s[i] === s[j] && dp[i+1][j-1]
3. 按长度递增顺序填表

### 要点
- 需要按长度从小到大填表
- 空间复杂度 O(n²)`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(n²)",
      },
      {
        name: "Manacher 算法",
        code: `/**
 * 最长回文子串 - Manacher 算法 (O(n) 最优解)
 *
 * 核心思想：
 * 1. 预处理：在每个字符间插入 #，统一奇偶长度处理
 *    "babad" → "#b#a#b#a#d#"
 *
 * 2. 利用回文的对称性，减少重复计算
 *    如果已知一个大回文的信息，其内部的小回文可以利用对称性推断
 *
 * 3. 维护一个"右边界最远的回文"的中心和右边界
 *    用它来加速计算新位置的回文半径
 *
 * 时间复杂度：O(n) - 每个位置最多被访问常数次
 * 空间复杂度：O(n)
 */
function longestPalindrome(s) {
  // 步骤1：预处理，插入分隔符 #
  let t = '#';
  for (const c of s) {
    t += c + '#';
  }
  // "abc" → "#a#b#c#"

  const n = t.length;
  const p = new Array(n).fill(0);  // p[i] = 以 i 为中心的回文半径

  let center = 0;  // 当前右边界最远的回文中心
  let right = 0;   // 当前最远的右边界

  for (let i = 0; i < n; i++) {
    // 利用对称性：如果 i 在 right 范围内，可以利用镜像位置的信息
    if (i < right) {
      const mirror = 2 * center - i;  // i 关于 center 的镜像
      // p[i] 至少是 min(right - i, p[mirror])
      p[i] = Math.min(right - i, p[mirror]);
    }

    // 尝试向外扩展
    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n &&
           t[i - p[i] - 1] === t[i + p[i] + 1]) {
      p[i]++;
    }

    // 如果扩展后超过了 right，更新 center 和 right
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  // 找到最长回文的中心和半径
  let maxLen = 0, maxCenter = 0;
  for (let i = 0; i < n; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      maxCenter = i;
    }
  }

  // 转换回原字符串的位置
  // 在扩展串中，位置 maxCenter，半径 maxLen
  // 原串起始位置 = (maxCenter - maxLen) / 2
  const start = (maxCenter - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

/**
 * Manacher 算法示意：
 *
 * 原串: "abcba"
 * 扩展串: "#a#b#c#b#a#"
 *        0 1 2 3 4 5 6 7 8 9 10
 *
 * p 数组: [0,1,0,1,0,5,0,1,0,1,0]
 *                   ↑ 中心是 #c#，半径5
 *
 * 对称性利用：
 * - center=5, right=10
 * - 计算 i=7 时，mirror=3，p[3]=1
 * - 所以 p[7] 至少是 min(10-7, 1) = 1
 *
 * 最终：maxLen=5, maxCenter=5
 * 原串位置: start = (5-5)/2 = 0
 * 结果: "abcba"
 */`,
        explanation: `## Manacher 算法

### 思路
1. 预处理：在每个字符间插入 #，统一奇偶处理
2. 利用回文的对称性，减少重复计算
3. 维护右边界最远的回文中心

### 特点
- 时间复杂度 O(n)，最优解法
- 实现较复杂`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 10. 最长有效括号 (32)
  {
    id: "longest-valid-parentheses",
    leetcodeId: 32,
    title: "最长有效括号",
    titleEn: "Longest Valid Parentheses",
    difficulty: "hard",
    category: "dp-multi",
    tags: ["字符串", "动态规划", "栈"],
    frontendRelevance: "low",
    frontendNote: "Hard DP",
    description: `给你一个只包含 \`'('\` 和 \`')'\` 的字符串，找出最长有效（格式正确且连续）括号子串的长度。`,
    examples: `**示例 1：**
\`\`\`
输入：s = "(()"
输出：2
解释：最长有效括号子串是 "()"
\`\`\`

**示例 2：**
\`\`\`
输入：s = ")()())"
输出：4
解释：最长有效括号子串是 "()()"
\`\`\`

**示例 3：**
\`\`\`
输入：s = ""
输出：0
\`\`\``,
    constraints: `- \`0 <= s.length <= 3 * 10^4\`
- \`s[i]\` 为 \`'('\` 或 \`')'\``,
    initialCode: `function longestValidParentheses(s) {
  // 在此处编写你的代码

}`,
    solution: `function longestValidParentheses(s) {
  const n = s.length;
  if (n < 2) return 0;

  // dp[i] 表示以 s[i] 结尾的最长有效括号长度
  const dp = new Array(n).fill(0);
  let maxLen = 0;

  for (let i = 1; i < n; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        // ...() 形式
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
        // ...)) 形式，需要找到匹配的 (
        dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: ["(()"],
        expected: 2
      },
      {
        id: "2",
        name: "示例2",
        input: [")()())"],
        expected: 4
      },
      {
        id: "3",
        name: "空字符串",
        input: [""],
        expected: 0
      }
    ],
    hints: [
      "dp[i] 表示以 s[i] 结尾的最长有效括号长度",
      "考虑两种情况：...() 和 ...))",
      "也可以使用栈来解决"
    ],
    explanation: `## 解题思路

### 动态规划

状态定义：dp[i] 表示以 s[i] 结尾的最长有效括号长度

状态转移（当 s[i] === ')' 时）：
1. 如果 s[i-1] === '('：dp[i] = dp[i-2] + 2
2. 如果 s[i-1] === ')' 且 s[i-dp[i-1]-1] === '('：
   dp[i] = dp[i-1] + 2 + dp[i-dp[i-1]-2]

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["valid-parentheses", "generate-parentheses"],
    solutions: [
      {
        name: "动态规划（推荐）",
        code: `/**
 * 最长有效括号 - 动态规划解法
 *
 * 核心思想：
 * dp[i] = 以 s[i] 结尾的最长有效括号子串的长度
 *
 * 关键洞察：
 * - 以 '(' 结尾的不可能是有效括号，所以 dp[i] = 0
 * - 只有以 ')' 结尾时，才可能形成有效括号
 *
 * 状态转移（当 s[i] === ')' 时）：
 * 1. 如果 s[i-1] === '('：形成 ...() 模式
 *    dp[i] = dp[i-2] + 2
 *
 * 2. 如果 s[i-1] === ')'：形成 ...)) 模式
 *    需要跳过 dp[i-1] 长度找到可能匹配的 '('
 *    如果 s[i - dp[i-1] - 1] === '('：
 *    dp[i] = dp[i-1] + 2 + dp[i - dp[i-1] - 2]
 *
 * 时间复杂度：O(n) - 单次遍历
 * 空间复杂度：O(n) - dp 数组
 */
function longestValidParentheses(s) {
  const n = s.length;
  // 边界：长度小于2不可能有有效括号
  if (n < 2) return 0;

  // dp[i] 表示以 s[i] 结尾的最长有效括号长度
  const dp = new Array(n).fill(0);
  let maxLen = 0;  // 记录全局最大长度

  // 从位置1开始（位置0不可能形成有效括号对）
  for (let i = 1; i < n; i++) {
    // 只有遇到 ')' 时才可能形成有效括号
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        // 情况1: ...() 形式，直接匹配
        // 长度 = 前面的有效长度 + 2
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
        // 情况2: ...)) 形式
        // 当前的 ) 需要跳过内部有效部分 dp[i-1]，找到对应的 (
        // 位置 i - dp[i-1] - 1 是可能匹配的 ( 位置
        dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
        //       内部有效  + 当前() + 更前面的有效部分
      }
    }
    // 更新全局最大值
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}

/**
 * 执行示例：s = ")()())"
 *
 * 索引:  0  1  2  3  4  5
 * 字符:  )  (  )  (  )  )
 * dp:   [0, 0, 2, 0, 4, 0]
 *
 * i=0: ')' 无法匹配，dp[0]=0
 * i=1: '(' 不是 ')'，dp[1]=0
 * i=2: ')' 且 s[1]='('，形成 ()，dp[2]=dp[0]+2=2
 * i=3: '(' 不是 ')'，dp[3]=0
 * i=4: ')' 且 s[3]='('，形成 ()，dp[4]=dp[2]+2=4
 * i=5: ')' 且 s[4]=')'，检查 s[5-4-1]=s[0]=')'，不匹配，dp[5]=0
 *
 * 结果：maxLen = 4
 *
 * 情况2详解：s = "(())"
 *
 * 索引:  0  1  2  3
 * 字符:  (  (  )  )
 * dp:   [0, 0, 2, 4]
 *
 * i=3: ')' 且 s[2]=')'
 *      跳过内部：i - dp[i-1] - 1 = 3 - 2 - 1 = 0
 *      s[0] = '(' ✓ 匹配！
 *      dp[3] = dp[2] + 2 + dp[-1] = 2 + 2 + 0 = 4
 *
 * 状态转移示意图：
 *
 * ...() 模式:      ...)) 模式:
 *    前面  ( )        前面  (  ...内部...  )  )
 *    ↓    ↑ ↑        ↓    ↑               ↑  ↑
 * dp[i-2] i-1 i   dp[前] 匹配位置      dp[i-1] i
 */`,
        explanation: `## 动态规划

### 思路
1. dp[i] = 以 s[i] 结尾的最长有效括号长度
2. 只有 s[i] === ')' 时才可能形成有效括号
3. 两种情况：
   - ...()：dp[i] = dp[i-2] + 2
   - ...))：需要找前面的 (

### 要点
- 注意边界条件检查`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "使用栈",
        code: `/**
 * 最长有效括号 - 使用栈解法
 *
 * 核心思想：
 * 使用栈存储"可能的边界位置"，通过计算索引差得到有效长度
 *
 * 关键洞察：
 * - 栈底始终保存"上一个未匹配的右括号位置"（或初始的-1）
 * - 其他位置存储左括号的索引
 * - 当遇到匹配时，有效长度 = 当前位置 - 栈顶位置
 *
 * 算法流程：
 * 1. 初始化栈为 [-1]（作为边界）
 * 2. 遇到 '('：将索引入栈
 * 3. 遇到 ')'：先出栈
 *    - 如果栈空：当前位置作为新边界入栈
 *    - 否则：计算有效长度 = i - 栈顶
 *
 * 时间复杂度：O(n) - 每个字符最多入栈出栈各一次
 * 空间复杂度：O(n) - 最坏情况栈存储所有字符
 */
function longestValidParentheses(s) {
  let maxLen = 0;
  // 初始化栈，-1 作为"上一个未匹配位置"的初始值
  const stack = [-1];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      // 遇到左括号：将索引入栈，等待匹配
      stack.push(i);
    } else {
      // 遇到右括号：先出栈（尝试匹配）
      stack.pop();

      if (stack.length === 0) {
        // 栈空：没有可匹配的左括号
        // 当前右括号成为新的边界
        stack.push(i);
      } else {
        // 栈不空：成功匹配
        // 有效长度 = 当前位置 - 栈顶位置
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}

/**
 * 执行示例：s = ")()())"
 *
 * 初始：stack = [-1]
 *
 * i=0: ')' → pop得-1，栈空 → push(0)
 *      stack = [0]
 *
 * i=1: '(' → push(1)
 *      stack = [0, 1]
 *
 * i=2: ')' → pop得1，栈不空
 *      maxLen = 2 - 0 = 2
 *      stack = [0]
 *
 * i=3: '(' → push(3)
 *      stack = [0, 3]
 *
 * i=4: ')' → pop得3，栈不空
 *      maxLen = max(2, 4-0) = 4
 *      stack = [0]
 *
 * i=5: ')' → pop得0，栈空 → push(5)
 *      stack = [5]
 *
 * 结果：maxLen = 4
 *
 * 栈的作用示意：
 *
 * s = "(()())"
 *      012345
 *
 * 栈变化：
 * [-1] → [−1,0] → [−1,0,1] → [−1,0]    → [−1,0,3] → [−1,0]    → [−1]
 *  初始    (0)       (1)       匹配)2     (3)        匹配)4     匹配)5
 *                              len=2-0=2              len=4-0=4  len=5-(-1)=6
 */`,
        explanation: `## 使用栈

### 思路
1. 栈底存放"上一个未匹配的位置"
2. 遇到 (：入栈
3. 遇到 )：出栈
   - 如果栈空，说明没有匹配，把当前位置入栈作为新边界
   - 否则，计算有效长度 = 当前位置 - 栈顶

### 要点
- 初始时栈底为 -1
- 栈中存储的是索引`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "双向扫描（空间优化）",
        code: `/**
 * 最长有效括号 - 双向扫描（空间最优）
 *
 * 核心思想：
 * 使用两个计数器分别计数左右括号，当相等时找到有效括号
 *
 * 为什么需要双向扫描？
 * - 从左到右：当 right > left 时重置（处理多余的 )）
 * - 从右到左：当 left > right 时重置（处理多余的 (）
 * - 单向扫描会漏掉某些情况，如 "(()" 只从左到右无法正确计算
 *
 * 算法流程：
 * 1. 从左到右扫描：
 *    - left++: 遇到 (
 *    - right++: 遇到 )
 *    - left === right: 找到有效括号，长度 = 2 * right
 *    - right > left: 重置计数器
 *
 * 2. 从右到左扫描：
 *    - 逻辑相反，处理多余 ( 的情况
 *
 * 时间复杂度：O(n) - 两次遍历
 * 空间复杂度：O(1) - 只用两个计数变量
 */
function longestValidParentheses(s) {
  let left = 0, right = 0;  // 左右括号计数器
  let maxLen = 0;

  // ========== 第一次扫描：从左到右 ==========
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      left++;   // 遇到左括号，计数+1
    } else {
      right++;  // 遇到右括号，计数+1
    }

    if (left === right) {
      // 左右括号数量相等，找到有效括号
      // 有效长度 = 2 * right（左右括号各占一半）
      maxLen = Math.max(maxLen, 2 * right);
    } else if (right > left) {
      // 右括号多于左括号，无法匹配
      // 重置计数器，重新开始计数
      left = right = 0;
    }
    // left > right 时继续，可能后面还有 ) 来匹配
  }

  // 重置计数器，准备反向扫描
  left = right = 0;

  // ========== 第二次扫描：从右到左 ==========
  // 处理类似 "(()" 的情况（左括号多余）
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '(') {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      // 左右相等，找到有效括号
      maxLen = Math.max(maxLen, 2 * left);
    } else if (left > right) {
      // 从右往左看，左括号多了，无法匹配
      left = right = 0;
    }
  }

  return maxLen;
}

/**
 * 为什么需要两次扫描？
 *
 * 示例1：s = "(()"
 * 从左到右：
 *   i=0: '(' → left=1, right=0
 *   i=1: '(' → left=2, right=0
 *   i=2: ')' → left=2, right=1
 *   结束时 left > right，从未触发 left===right！
 *   maxLen = 0（错误！应该是2）
 *
 * 从右到左：
 *   i=2: ')' → right=1, left=0
 *   i=1: '(' → right=1, left=1 → left===right → maxLen=2 ✓
 *   i=0: '(' → right=1, left=2 → left > right → 重置
 *   maxLen = 2 ✓
 *
 * 示例2：s = "())"
 * 从左到右：
 *   i=0: '(' → left=1
 *   i=1: ')' → right=1 → left===right → maxLen=2 ✓
 *   i=2: ')' → right=2 → right > left → 重置
 *
 * 从右到左会得到同样的结果，所以取 max
 *
 * 执行示例：s = ")()())"
 *
 * 从左到右：
 * i=0: ')' → L=0, R=1 → R>L → 重置
 * i=1: '(' → L=1, R=0
 * i=2: ')' → L=1, R=1 → maxLen=2
 * i=3: '(' → L=2, R=1
 * i=4: ')' → L=2, R=2 → maxLen=4
 * i=5: ')' → L=2, R=3 → R>L → 重置
 *
 * 结果：maxLen = 4
 */`,
        explanation: `## 双向扫描

### 思路
1. 从左到右扫描，计数左右括号
2. 当 left === right 时，找到有效括号
3. 当 right > left 时，重置计数
4. 从右到左再扫描一次，处理 left > right 的情况

### 特点
- 空间复杂度 O(1)
- 需要两次扫描`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
