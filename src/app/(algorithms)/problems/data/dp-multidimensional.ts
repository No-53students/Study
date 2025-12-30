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
        code: `function uniquePaths(m, n) {
  // dp[j] 表示到达第 i 行第 j 列的路径数
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}`,
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
        code: `function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}`,
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
        code: `function uniquePaths(m, n) {
  // 总共需要走 m-1 步向下和 n-1 步向右
  // 路径数 = C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
  let result = 1;
  for (let i = 1; i < m; i++) {
    result = result * (n - 1 + i) / i;
  }
  return Math.round(result);
}`,
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
        code: `function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

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
        code: `function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = grid[0][0];

  // 初始化第一行
  for (let j = 1; j < n; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  // 初始化第一列
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 填充其余位置
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[m - 1][n - 1];
}`,
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
        code: `function minPathSum(grid) {
  const m = grid.length;
  const n = grid[0].length;

  // 修改第一行
  for (let j = 1; j < n; j++) {
    grid[0][j] += grid[0][j - 1];
  }

  // 修改第一列
  for (let i = 1; i < m; i++) {
    grid[i][0] += grid[i - 1][0];
  }

  // 填充其余位置
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }

  return grid[m - 1][n - 1];
}`,
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
        code: `function uniquePathsWithObstacles(obstacleGrid) {
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
        code: `function uniquePathsWithObstacles(obstacleGrid) {
  const m = obstacleGrid.length;
  const n = obstacleGrid[0].length;

  if (obstacleGrid[0][0] === 1) return 0;

  const dp = Array.from({ length: m }, () => new Array(n).fill(0));
  dp[0][0] = 1;

  // 初始化第一行
  for (let j = 1; j < n; j++) {
    dp[0][j] = obstacleGrid[0][j] === 1 ? 0 : dp[0][j - 1];
  }

  // 初始化第一列
  for (let i = 1; i < m; i++) {
    dp[i][0] = obstacleGrid[i][0] === 1 ? 0 : dp[i - 1][0];
  }

  // 填充其余位置
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
}`,
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
        code: `function minimumTotal(triangle) {
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
        code: `function minimumTotal(triangle) {
  const n = triangle.length;
  const dp = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(Infinity));
  dp[0][0] = triangle[0][0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (j === 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      } else if (j === i) {
        dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j]) + triangle[i][j];
      }
    }
  }

  return Math.min(...dp[n - 1]);
}`,
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
        code: `function minimumTotal(triangle) {
  const n = triangle.length;
  const memo = Array.from({ length: n }, (_, i) => new Array(i + 1).fill(-1));

  const dfs = (i, j) => {
    if (i === n - 1) return triangle[i][j];
    if (memo[i][j] !== -1) return memo[i][j];

    memo[i][j] = triangle[i][j] + Math.min(dfs(i + 1, j), dfs(i + 1, j + 1));
    return memo[i][j];
  };

  return dfs(0, 0);
}`,
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
        code: `function longestCommonSubsequence(text1, text2) {
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
        code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // 使用两行滚动数组
  let prev = new Array(n + 1).fill(0);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        curr[j] = prev[j - 1] + 1;
      } else {
        curr[j] = Math.max(prev[j], curr[j - 1]);
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}`,
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
        code: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const memo = Array.from({ length: m }, () => new Array(n).fill(-1));

  const lcs = (i, j) => {
    if (i < 0 || j < 0) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    if (text1[i] === text2[j]) {
      memo[i][j] = lcs(i - 1, j - 1) + 1;
    } else {
      memo[i][j] = Math.max(lcs(i - 1, j), lcs(i, j - 1));
    }

    return memo[i][j];
  };

  return lcs(m - 1, n - 1);
}`,
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
        code: `function minDistance(word1, word2) {
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
        code: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  let curr = new Array(n + 1).fill(0);

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        curr[j] = prev[j - 1];
      } else {
        curr[j] = Math.min(prev[j], curr[j - 1], prev[j - 1]) + 1;
      }
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}`,
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
        code: `function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const memo = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  const dp = (i, j) => {
    if (i === 0) return j;
    if (j === 0) return i;
    if (memo[i][j] !== -1) return memo[i][j];

    if (word1[i - 1] === word2[j - 1]) {
      memo[i][j] = dp(i - 1, j - 1);
    } else {
      memo[i][j] = Math.min(
        dp(i - 1, j),     // 删除
        dp(i, j - 1),     // 插入
        dp(i - 1, j - 1)  // 替换
      ) + 1;
    }

    return memo[i][j];
  };

  return dp(m, n);
}`,
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
        code: `function maxProfit(prices) {
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
        code: `function maxProfit(prices) {
  const n = prices.length;
  if (n < 2) return 0;

  // dp[i][k][0/1] = 第i天，完成了k次交易，当前不持有/持有股票的最大收益
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: 3 }, () => [0, -Infinity])
  );

  dp[0][0][0] = 0;
  dp[0][1][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    for (let k = 0; k <= 2; k++) {
      // 不持有股票
      dp[i][k][0] = Math.max(
        dp[i - 1][k][0],
        k > 0 ? dp[i - 1][k][1] + prices[i] : -Infinity
      );
      // 持有股票
      if (k < 2) {
        dp[i][k + 1][1] = Math.max(
          dp[i - 1][k + 1][1],
          dp[i - 1][k][0] - prices[i]
        );
      }
    }
  }

  return Math.max(dp[n - 1][0][0], dp[n - 1][1][0], dp[n - 1][2][0]);
}`,
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
        code: `function maxProfit(prices) {
  const n = prices.length;
  if (n < 2) return 0;

  // left[i] = 从第 0 天到第 i 天的最大利润（一次交易）
  const left = new Array(n).fill(0);
  let minPrice = prices[0];
  for (let i = 1; i < n; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    left[i] = Math.max(left[i - 1], prices[i] - minPrice);
  }

  // right[i] = 从第 i 天到最后一天的最大利润（一次交易）
  const right = new Array(n).fill(0);
  let maxPrice = prices[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    maxPrice = Math.max(maxPrice, prices[i]);
    right[i] = Math.max(right[i + 1], maxPrice - prices[i]);
  }

  // 枚举分割点
  let maxProfit = 0;
  for (let i = 0; i < n; i++) {
    maxProfit = Math.max(maxProfit, left[i] + right[i]);
  }

  return maxProfit;
}`,
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
        code: `function maxProfit(k, prices) {
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
        code: `function maxProfit(k, prices) {
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

  dp[0][0][0] = 0;
  dp[0][0][1] = -prices[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= k; j++) {
      // 不持有股票：保持或卖出
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
      // 持有股票：保持或买入
      if (j > 0) {
        dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
      } else {
        dp[i][j][1] = Math.max(dp[i - 1][j][1], -prices[i]);
      }
    }
  }

  let maxProfit = 0;
  for (let j = 0; j <= k; j++) {
    maxProfit = Math.max(maxProfit, dp[n - 1][j][0]);
  }

  return maxProfit;
}`,
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
        code: `function maxProfit(k, prices) {
  const n = prices.length;
  if (n < 2 || k === 0) return 0;

  // 找出所有上升区间
  const profits = [];
  let i = 0;
  while (i < n - 1) {
    // 找谷底
    while (i < n - 1 && prices[i] >= prices[i + 1]) i++;
    const valley = prices[i];
    // 找山顶
    while (i < n - 1 && prices[i] <= prices[i + 1]) i++;
    const peak = prices[i];
    if (peak > valley) {
      profits.push(peak - valley);
    }
  }

  // 如果交易次数足够，直接返回所有利润之和
  if (profits.length <= k) {
    return profits.reduce((sum, p) => sum + p, 0);
  }

  // 否则使用状态机DP
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
        code: `function longestPalindrome(s) {
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
        code: `function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  // dp[i][j] 表示 s[i...j] 是否为回文
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  let start = 0;
  let maxLen = 1;

  // 单个字符都是回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // 按长度递增顺序填表
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;

      if (s[i] === s[j]) {
        if (len === 2) {
          dp[i][j] = true;
        } else {
          dp[i][j] = dp[i + 1][j - 1];
        }
      }

      if (dp[i][j] && len > maxLen) {
        maxLen = len;
        start = i;
      }
    }
  }

  return s.substring(start, start + maxLen);
}`,
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
        code: `function longestPalindrome(s) {
  // 预处理：插入分隔符
  let t = '#';
  for (const c of s) {
    t += c + '#';
  }

  const n = t.length;
  const p = new Array(n).fill(0); // p[i] = 以 i 为中心的回文半径
  let center = 0, right = 0;

  for (let i = 0; i < n; i++) {
    // 利用对称性
    if (i < right) {
      const mirror = 2 * center - i;
      p[i] = Math.min(right - i, p[mirror]);
    }

    // 尝试扩展
    while (i - p[i] - 1 >= 0 && i + p[i] + 1 < n &&
           t[i - p[i] - 1] === t[i + p[i] + 1]) {
      p[i]++;
    }

    // 更新中心和右边界
    if (i + p[i] > right) {
      center = i;
      right = i + p[i];
    }
  }

  // 找最长回文
  let maxLen = 0, maxCenter = 0;
  for (let i = 0; i < n; i++) {
    if (p[i] > maxLen) {
      maxLen = p[i];
      maxCenter = i;
    }
  }

  // 转换回原字符串的位置
  const start = (maxCenter - maxLen) / 2;
  return s.substring(start, start + maxLen);
}`,
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
        code: `function longestValidParentheses(s) {
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
        code: `function longestValidParentheses(s) {
  let maxLen = 0;
  const stack = [-1]; // 栈底存放上一个未匹配的位置

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        // 没有可以匹配的左括号，更新栈底
        stack.push(i);
      } else {
        // 当前有效括号长度 = 当前位置 - 栈顶位置
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }

  return maxLen;
}`,
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
        code: `function longestValidParentheses(s) {
  let left = 0, right = 0;
  let maxLen = 0;

  // 从左到右扫描
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      maxLen = Math.max(maxLen, 2 * right);
    } else if (right > left) {
      left = right = 0;
    }
  }

  left = right = 0;

  // 从右到左扫描
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '(') {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      maxLen = Math.max(maxLen, 2 * left);
    } else if (left > right) {
      left = right = 0;
    }
  }

  return maxLen;
}`,
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
