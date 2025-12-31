import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const graphProblems: Problem[] = [
  // 1. 岛屿数量 (200)
  {
    id: "number-of-islands",
    leetcodeId: 200,
    title: "岛屿数量",
    titleEn: "Number of Islands",
    difficulty: "medium",
    category: "graph",
    tags: ["深度优先搜索", "广度优先搜索", "并查集", "数组", "矩阵"],
    frontendRelevance: "medium",
    frontendNote: "DFS/BFS入门",
    description: `给你一个由 \`'1'\`（陆地）和 \`'0'\`（水）组成的的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。`,
    examples: `**示例 1：**
\`\`\`
输入：grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
输出：1
\`\`\`

**示例 2：**
\`\`\`
输入：grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
输出：3
\`\`\``,
    constraints: `- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` 的值为 \`'0'\` 或 \`'1'\``,
    initialCode: `function numIslands(grid) {
  // 在此处编写你的代码

}`,
    solution: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  const dfs = (i, j) => {
    // 边界检查和水域检查
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
      return;
    }

    // 标记为已访问（沉没岛屿）
    grid[i][j] = '0';

    // 访问四个方向
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j); // 沉没整个岛屿
      }
    }
  }

  return count;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1-单岛",
        input: [[[
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]
        ]]],
        expected: 1
      },
      {
        id: "2",
        name: "示例2-多岛",
        input: [[[
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ]]],
        expected: 3
      }
    ],
    hints: [
      "遍历网格，找到陆地时开始DFS/BFS",
      "将访问过的陆地标记为水，避免重复计数",
      "也可以使用并查集解决"
    ],
    explanation: `## 解题思路

### DFS 沉岛法

1. 遍历网格，遇到陆地 '1' 时计数器 +1
2. 从该陆地开始 DFS，将整个岛屿沉没（标记为 '0'）
3. 继续遍历，直到检查完所有格子

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)，最坏情况下递归栈深度`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    relatedProblems: ["surrounded-regions", "course-schedule"],
    solutions: [
      {
        name: "DFS 沉岛法（推荐）",
        code: `/**
 * 岛屿数量 - DFS 沉岛法
 *
 * 核心思想：遍历网格，每遇到一块陆地就计数 +1，然后用 DFS 将整个岛屿"沉没"（标记为水）
 *
 * 为什么叫"沉岛"？
 * - 把访问过的陆地 '1' 改成水 '0'
 * - 就像把岛屿沉入水中，避免重复计数
 *
 * 算法步骤：
 * 1. 遍历网格，找到陆地 '1'
 * 2. 计数器 +1
 * 3. DFS 将该陆地及其相连的所有陆地沉没
 * 4. 继续遍历，直到检查完所有格子
 *
 * 示例：
 * 输入：              DFS 后：
 * ["1","1","0"]      ["0","0","0"]
 * ["1","0","0"]  →   ["0","0","0"]
 * ["0","0","1"]      ["0","0","0"]
 *
 * 遇到 (0,0) 的 '1'：计数 1，沉没整个左上角岛屿
 * 遇到 (2,2) 的 '1'：计数 2，沉没右下角岛屿
 *
 * 时间复杂度：O(m × n) - 每个格子最多访问一次
 * 空间复杂度：O(m × n) - 最坏情况下递归栈深度
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  let count = 0;

  /**
   * DFS 沉没岛屿
   *
   * 从当前陆地出发，将所有相连的陆地标记为 '0'
   *
   * 四个方向：上、下、左、右
   */
  const dfs = (i, j) => {
    // 边界检查：越界或遇到水域，返回
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === '0') {
      return;
    }

    // 标记为已访问（沉没岛屿）
    grid[i][j] = '0';

    // 递归访问四个方向
    dfs(i + 1, j); // 下
    dfs(i - 1, j); // 上
    dfs(i, j + 1); // 右
    dfs(i, j - 1); // 左
  };

  /**
   * 遍历整个网格
   *
   * 每遇到一个 '1'，就是一个新岛屿的起点
   * 计数后沉没整个岛屿
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;       // 发现新岛屿
        dfs(i, j);     // 沉没整个岛屿
      }
    }
  }

  return count;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "DFS沉岛法演示",
          steps: [
            {
              array: ["1", "1", "0", "1", "1", "0", "0", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 3, 4], color: "green" as const, label: "岛1" }, { indices: [8], color: "blue" as const, label: "岛2" }],
              description: "3x3网格。找岛屿数量。1=陆地，0=水",
            },
            {
              array: ["1", "1", "0", "1", "1", "0", "0", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0], color: "red" as const, label: "发现!" }],
              description: "遍历找到[0,0]=1，发现新岛屿！count=1。开始DFS沉没",
            },
            {
              array: ["0", "0", "0", "0", "0", "0", "0", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 3, 4], color: "gray" as const, label: "沉没" }],
              description: "DFS将整个岛屿沉没(标记为0)。继续遍历",
            },
            {
              array: ["0", "0", "0", "0", "0", "0", "0", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [8], color: "red" as const, label: "发现!" }],
              description: "找到[2,2]=1，发现新岛屿！count=2。DFS沉没",
            },
            {
              array: ["0", "0", "0", "0", "0", "0", "0", "0", "0"],
              left: 0,
              right: 8,
              highlights: [{ indices: [8], color: "gray" as const, label: "沉没" }],
              description: "遍历完成。共发现2个岛屿。时间O(m×n)",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## DFS 沉岛法

### 思路
1. 遍历网格，遇到陆地 '1' 时计数器 +1
2. 从该陆地开始 DFS，将整个岛屿沉没（标记为 '0'）
3. 继续遍历，直到检查完所有格子

### 关键
- 访问过的陆地标记为 '0'，避免重复计数
- 四个方向递归访问`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "BFS",
        animation: {
          type: "two-pointers" as const,
          title: "BFS沉岛法演示",
          steps: [
            {
              array: ["1", "1", "0", "0", "0"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "blue" as const, label: "陆地" },
                { indices: [2, 3, 4], color: "gray" as const, label: "水" },
              ],
              description: "网格第一行。找到(0,0)是陆地，开始BFS",
            },
            {
              array: ["1", "1", "0", "0", "0"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "yellow" as const, label: "队列" },
                { indices: [1], color: "blue" as const, label: "待处理" },
              ],
              description: "(0,0)入队并标记为'0'，探索四个方向",
            },
            {
              array: ["0", "0", "0", "0", "0"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "已沉没" },
              ],
              description: "BFS完成，整个岛屿被沉没。count=1",
            },
            {
              array: ["1", "0", "1", "0", "1"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 2, 4], color: "blue" as const, label: "独立岛" },
              ],
              description: "如果有多个独立岛屿，每个都会触发一次BFS。count=岛屿数",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 岛屿数量 - BFS 法
 *
 * 核心思想：用队列替代递归栈，层序访问岛屿的每个格子
 *
 * 与 DFS 的区别：
 * - DFS：深度优先，一条路走到底再回溯
 * - BFS：广度优先，先访问所有相邻格子，再向外扩展
 *
 * BFS 优点：
 * - 避免递归深度过大导致栈溢出
 * - 对于大型网格更安全
 *
 * 关键技巧：入队时就标记为已访问
 * - 避免同一格子被多次加入队列
 * - 否则会导致重复处理
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(min(m, n)) - 队列最大长度
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  let count = 0;
  // 四个方向的偏移量
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  /**
   * BFS 沉没岛屿
   *
   * 从起点开始，逐层向外扩展
   * 将所有相连的陆地标记为 '0'
   */
  const bfs = (startI, startJ) => {
    const queue = [[startI, startJ]];
    // 入队时就标记！关键优化
    grid[startI][startJ] = '0';

    while (queue.length > 0) {
      const [i, j] = queue.shift();

      // 遍历四个方向
      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        // 检查边界和是否为陆地
        if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === '1') {
          grid[ni][nj] = '0'; // 入队时就标记！避免重复入队
          queue.push([ni, nj]);
        }
      }
    }
  };

  /**
   * 遍历网格，找到每个岛屿的起点
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        count++;
        bfs(i, j);
      }
    }
  }

  return count;
}`,
        explanation: `## BFS

### 思路
用队列替代递归栈，层序访问岛屿的每个格子。

### 关键
- 入队时就标记为已访问，避免重复入队
- 四个方向遍历

### 优点
- 避免递归深度过大导致栈溢出`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(min(m, n))",
      },
      {
        name: "并查集",
        animation: {
          type: "two-pointers" as const,
          title: "并查集演示",
          steps: [
            {
              array: ["1", "1", "0", "1", "1"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1, 3, 4], color: "blue" as const, label: "陆地" },
                { indices: [2], color: "gray" as const, label: "水" },
              ],
              description: "初始化：每个陆地格子是独立集合。初始集合数=4",
            },
            {
              array: ["1", "1", "0", "1", "1"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "合并" },
              ],
              description: "(0,0)和(0,1)相邻且都是陆地，union合并。集合数=3",
            },
            {
              array: ["1", "1", "0", "1", "1"],
              left: 3,
              right: 4,
              highlights: [
                { indices: [3, 4], color: "green" as const, label: "合并" },
              ],
              description: "(0,3)和(0,4)相邻且都是陆地，union合并。集合数=2",
            },
            {
              array: ["1", "1", "0", "1", "1"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "岛1" },
                { indices: [3, 4], color: "yellow" as const, label: "岛2" },
              ],
              description: "遍历完成，统计不同根的数量。岛屿数=2",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 岛屿数量 - 并查集法
 *
 * 核心思想：将每个格子看作一个节点，相邻的陆地合并到同一集合，最后统计集合数量
 *
 * 并查集（Union-Find）是什么？
 * - 一种数据结构，用于处理不相交集合的合并和查询
 * - 支持两个操作：
 *   - find(x)：找到 x 所属集合的代表元素（根）
 *   - union(x, y)：合并 x 和 y 所属的集合
 *
 * 优化技巧：
 * 1. 路径压缩：find 时将节点直接连接到根
 * 2. 按秩合并：将小树合并到大树，保持树的平衡
 *
 * 坐标转换：二维坐标 (i, j) → 一维索引 i * n + j
 *
 * 时间复杂度：O(m × n × α(m × n))，α 是反阿克曼函数，近似常数
 * 空间复杂度：O(m × n)
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;

  /**
   * 并查集数据结构
   *
   * parent[i]：节点 i 的父节点
   * rank[i]：以节点 i 为根的树的秩（高度的上界）
   */
  const parent = new Array(m * n).fill(0).map((_, i) => i);
  const rank = new Array(m * n).fill(0);

  /**
   * 查找操作 + 路径压缩
   *
   * 找到 x 所属集合的根节点
   * 同时将路径上的所有节点直接连接到根（路径压缩）
   *
   * 示例：
   * 原始：1 → 2 → 3 → 4（根）
   * 压缩后：1, 2, 3 都直接指向 4
   */
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
  };

  /**
   * 合并操作 + 按秩合并
   *
   * 将 x 和 y 所属的集合合并
   * 按秩合并：将秩小的树接到秩大的树上
   */
  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      // 按秩合并
      if (rank[rootX] < rank[rootY]) {
        parent[rootX] = rootY;
      } else if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
    }
  };

  /**
   * 遍历网格，合并相邻陆地
   *
   * 只需要检查右边和下边（避免重复合并）
   * 因为遍历顺序是从左到右、从上到下
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        const idx = i * n + j;
        // 检查右边
        if (j + 1 < n && grid[i][j + 1] === '1') {
          union(idx, idx + 1);
        }
        // 检查下边
        if (i + 1 < m && grid[i + 1][j] === '1') {
          union(idx, idx + n);
        }
      }
    }
  }

  /**
   * 统计不同的根（即不同的岛屿）
   *
   * 只统计陆地格子的根
   * 使用 Set 去重
   */
  const roots = new Set();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        roots.add(find(i * n + j));
      }
    }
  }

  return roots.size;
}`,
        explanation: `## 并查集

### 思路
1. 将每个格子看作一个节点
2. 遍历网格，将相邻的陆地合并到同一集合
3. 最后统计不同集合（根节点）的数量

### 优化
- 路径压缩：查找时将节点直接连接到根
- 按秩合并：将小树合并到大树

### 适用场景
- 需要动态维护连通性
- 查询两点是否连通`,
        timeComplexity: "O(m × n × α(m × n))",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 2. 被围绕的区域 (130)
  {
    id: "surrounded-regions",
    leetcodeId: 130,
    title: "被围绕的区域",
    titleEn: "Surrounded Regions",
    difficulty: "medium",
    category: "graph",
    tags: ["深度优先搜索", "广度优先搜索", "并查集", "数组", "矩阵"],
    frontendRelevance: "low",
    frontendNote: "被围绕区域",
    description: `给你一个 \`m x n\` 的矩阵 \`board\`，由若干字符 \`'X'\` 和 \`'O'\` 组成，**捕获** 所有 **被围绕的区域**：

- **连接**：一个单元格与水平或垂直方向上相邻的单元格连接。
- **区域**：连接所有 \`'O'\` 的单元格来形成一个区域。
- **围绕**：如果您可以用 \`'X'\` 单元格 **连接这个区域**，并且区域中没有任何单元格位于 \`board\` 边缘，则该区域被 \`'X'\` 单元格围绕。

通过将输入矩阵 \`board\` 中的所有 \`'O'\` 替换为 \`'X'\` 来 **捕获被围绕的区域**。`,
    examples: `**示例 1：**
\`\`\`
输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
解释：被围绕的区域应该被填充为 'X'，边界上的 'O' 不会被填充。
\`\`\`

**示例 2：**
\`\`\`
输入：board = [["X"]]
输出：[["X"]]
\`\`\``,
    constraints: `- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 200\`
- \`board[i][j]\` 为 \`'X'\` 或 \`'O'\``,
    initialCode: `function solve(board) {
  // 在此处编写你的代码

}`,
    solution: `function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;

  // 从边界的 O 开始 DFS，标记为 #
  const dfs = (i, j) => {
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
      return;
    }

    board[i][j] = '#'; // 标记为不可捕获

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  // 处理边界上的 O
  for (let i = 0; i < m; i++) {
    dfs(i, 0);
    dfs(i, n - 1);
  }
  for (let j = 0; j < n; j++) {
    dfs(0, j);
    dfs(m - 1, j);
  }

  // 遍历整个矩阵：O -> X，# -> O
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      } else if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]]],
        expected: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
      },
      {
        id: "2",
        name: "单元素",
        input: [[[["X"]]]],
        expected: [["X"]]
      }
    ],
    hints: [
      "边界上的 O 不会被围绕",
      "从边界的 O 开始 DFS，标记所有与边界相连的 O",
      "最后把未标记的 O 变成 X，标记的恢复为 O"
    ],
    explanation: `## 解题思路

### 逆向思维 + DFS

与其找被围绕的 O，不如找不会被围绕的 O（与边界相连的）。

1. 从四条边界开始 DFS，标记所有与边界相连的 O 为 #
2. 遍历矩阵：
   - O → X（被围绕）
   - # → O（不被围绕，恢复）

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)，递归栈`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    relatedProblems: ["number-of-islands", "course-schedule"],
    solutions: [
      {
        name: "边界 DFS（推荐）",
        code: `/**
 * 被围绕的区域 - 边界 DFS 法（逆向思维）
 *
 * 核心思想：与其找被围绕的 O，不如找不会被围绕的 O（与边界相连的）
 *
 * 逆向思维：
 * - 被围绕的 O → 需要变成 X
 * - 不被围绕的 O → 与边界相连
 * - 先标记不被围绕的，剩下的就是被围绕的
 *
 * 算法步骤：
 * 1. 从四条边界的 O 开始 DFS
 * 2. 将所有与边界相连的 O 标记为 '#'
 * 3. 遍历矩阵：
 *    - O → X（被围绕的 O）
 *    - # → O（恢复不被围绕的 O）
 *
 * 示例：
 * 输入：           标记后：          最终：
 * X X X X         X X X X         X X X X
 * X O O X    →    X O O X    →    X X X X
 * X X O X         X X O X         X X X X
 * X O X X         X # X X         X O X X
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n) - 递归栈
 */
function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;

  /**
   * DFS 标记与边界相连的 O
   *
   * 将 'O' 改为 '#' 表示"不可捕获"
   */
  const dfs = (i, j) => {
    // 越界或不是 O，返回
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== 'O') {
      return;
    }

    board[i][j] = '#'; // 标记为不可捕获

    // 四个方向递归
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  };

  /**
   * 从四条边界开始 DFS
   *
   * 左右两列
   */
  for (let i = 0; i < m; i++) {
    dfs(i, 0);     // 左边界
    dfs(i, n - 1); // 右边界
  }
  /**
   * 上下两行
   */
  for (let j = 0; j < n; j++) {
    dfs(0, j);     // 上边界
    dfs(m - 1, j); // 下边界
  }

  /**
   * 遍历整个矩阵进行最终处理
   *
   * O → X：被围绕的 O，捕获
   * # → O：不被围绕的 O，恢复
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X'; // 被围绕，捕获
      } else if (board[i][j] === '#') {
        board[i][j] = 'O'; // 不被围绕，恢复
      }
    }
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "边界DFS演示",
          steps: [
            {
              array: ["X", "X", "X", "X", "X", "O", "O", "X", "X", "X", "O", "X", "X", "O", "X", "X"],
              left: 0,
              right: 15,
              highlights: [{ indices: [5, 6, 10], color: "blue" as const, label: "被围O" }, { indices: [13], color: "green" as const, label: "边界O" }],
              description: "4x4矩阵。O在[1,1],[1,2],[2,2]被围绕，[3,1]在边界不被围绕",
            },
            {
              array: ["X", "X", "X", "X", "X", "O", "O", "X", "X", "X", "O", "X", "X", "#", "X", "X"],
              left: 0,
              right: 15,
              highlights: [{ indices: [13], color: "green" as const, label: "#" }],
              description: "从边界O开始DFS，标记[3,1]为#（不可捕获）",
            },
            {
              array: ["X", "X", "X", "X", "X", "O", "O", "X", "X", "X", "O", "X", "X", "#", "X", "X"],
              left: 0,
              right: 15,
              highlights: [{ indices: [5, 6, 10], color: "red" as const, label: "O→X" }],
              description: "遍历矩阵：未标记的O被围绕，变为X",
            },
            {
              array: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "#", "X", "X"],
              left: 0,
              right: 15,
              highlights: [{ indices: [13], color: "green" as const, label: "#→O" }],
              description: "#恢复为O（不被围绕）",
            },
            {
              array: ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "O", "X", "X"],
              left: 0,
              right: 15,
              highlights: [{ indices: [13], color: "green" as const, label: "保留" }],
              description: "完成！只有边界相连的O保留，其余被捕获",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 边界 DFS（逆向思维）

### 思路
与其找被围绕的 O，不如找不会被围绕的 O（与边界相连的）。

### 步骤
1. 从四条边界开始 DFS，标记所有与边界相连的 O 为 #
2. 遍历矩阵：
   - O → X（被围绕）
   - # → O（不被围绕，恢复）

### 关键
边界上的 O 及其连通区域永远不会被围绕。`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "BFS",
        animation: {
          type: "two-pointers" as const,
          title: "BFS边界标记演示",
          steps: [
            {
              array: ["X", "O", "X", "O", "X"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [1, 3], color: "blue" as const, label: "O" },
                { indices: [0, 2, 4], color: "gray" as const, label: "X" },
              ],
              description: "收集边界上的O入队。边界O不会被围绕",
            },
            {
              array: ["X", "#", "X", "#", "X"],
              left: 1,
              right: 3,
              highlights: [
                { indices: [1, 3], color: "yellow" as const, label: "#安全" },
              ],
              description: "BFS标记边界O及其连通区域为'#'",
            },
            {
              array: ["X", "O", "X", "O", "X"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [1, 3], color: "green" as const, label: "恢复O" },
              ],
              description: "最后：未标记的O变X，#恢复为O",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 被围绕的区域 - BFS 法
 *
 * 核心思想：与 DFS 相同的逆向思维，但用 BFS 实现
 *
 * 算法步骤：
 * 1. 收集边界上所有的 O 入队
 * 2. BFS 标记所有与边界相连的 O 为 '#'
 * 3. 遍历矩阵：O → X，# → O
 *
 * BFS vs DFS：
 * - 两者结果相同
 * - BFS 避免递归深度过大导致栈溢出
 * - 对于大型矩阵，BFS 更安全
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  /**
   * 收集边界上所有的 O
   *
   * 边界 = 第一行、最后一行、第一列、最后一列
   */
  const queue = [];

  // 收集左右边界的 O
  for (let i = 0; i < m; i++) {
    if (board[i][0] === 'O') queue.push([i, 0]);
    if (board[i][n - 1] === 'O') queue.push([i, n - 1]);
  }
  // 收集上下边界的 O（避免重复收集四个角）
  for (let j = 1; j < n - 1; j++) {
    if (board[0][j] === 'O') queue.push([0, j]);
    if (board[m - 1][j] === 'O') queue.push([m - 1, j]);
  }

  /**
   * BFS 标记所有与边界相连的 O
   */
  while (queue.length > 0) {
    const [i, j] = queue.shift();
    // 跳过已处理的格子
    if (board[i][j] !== 'O') continue;

    board[i][j] = '#'; // 标记为不可捕获

    // 四个方向扩展
    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] === 'O') {
        queue.push([ni, nj]);
      }
    }
  }

  /**
   * 最终处理：恢复和捕获
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X';      // 捕获
      else if (board[i][j] === '#') board[i][j] = 'O'; // 恢复
    }
  }
}`,
        explanation: `## BFS

### 思路
与 DFS 相同的逆向思维，但用 BFS 实现。

### 优点
- 避免递归深度过大`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "并查集",
        animation: {
          type: "two-pointers" as const,
          title: "并查集+虚拟节点演示",
          steps: [
            {
              array: ["X", "O", "O", "X"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1, 2], color: "blue" as const, label: "O" },
              ],
              description: "创建虚拟节点dummy，代表'与边界连通'",
            },
            {
              array: ["X", "O", "O", "X"],
              left: 1,
              right: 1,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "边界O" },
              ],
              description: "边界上的O与dummy合并：union(O, dummy)",
            },
            {
              array: ["X", "O", "O", "X"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1, 2], color: "green" as const, label: "连通" },
              ],
              description: "相邻的O互相合并。检查：find(O)==find(dummy)?",
            },
            {
              array: ["X", "O", "X", "X"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [1], color: "green" as const, label: "安全" },
                { indices: [2], color: "red" as const, label: "被围绕" },
              ],
              description: "不与dummy连通的O被围绕，变为X",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 被围绕的区域 - 并查集法
 *
 * 核心思想：
 * - 创建一个虚拟节点 dummy，代表"与边界连通"
 * - 将边界上的 O 与 dummy 合并
 * - 将相邻的 O 合并
 * - 最后，不与 dummy 连通的 O 就是被围绕的
 *
 * 为什么需要虚拟节点？
 * - 边界上可能有多个不连通的 O 区域
 * - 用 dummy 统一表示"安全区域"
 * - 判断任意 O 是否安全，只需看它是否与 dummy 连通
 *
 * 并查集优势：
 * - 不需要标记和恢复（DFS/BFS 需要 O → # → O）
 * - 直接通过连通性判断
 *
 * 坐标转换：二维 (i, j) → 一维 i * n + j
 * dummy 节点：使用 m * n（超出网格范围的索引）
 *
 * 示例：4x4 网格
 * 索引分布：
 * 0  1  2  3
 * 4  5  6  7
 * 8  9  10 11
 * 12 13 14 15
 * dummy = 16
 *
 * 时间复杂度：O(m × n × α(m × n))，α 是反阿克曼函数，近似常数
 * 空间复杂度：O(m × n)
 */
function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;
  // 虚拟节点，索引为 m*n，代表"与边界连通"
  const dummy = m * n;

  // 初始化并查集：每个节点的父节点是自己
  // 额外 +1 是为 dummy 节点留位置
  const parent = new Array(m * n + 1).fill(0).map((_, i) => i);

  /**
   * 查找操作 + 路径压缩
   *
   * 找到 x 所属集合的根节点
   * 同时将路径上的节点直接连接到根
   */
  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
  };

  /**
   * 合并操作
   *
   * 将 x 的根指向 y 的根
   * 注意：这里总是把 x 的根接到 y 的根上
   */
  const union = (x, y) => {
    parent[find(x)] = find(y);
  };

  /**
   * 遍历网格，建立连通关系
   *
   * 1. 边界上的 O 与 dummy 合并
   * 2. 相邻的 O 互相合并
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        const idx = i * n + j; // 二维坐标转一维索引

        // 边界上的 O 与 dummy 合并（标记为安全）
        if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
          union(idx, dummy);
        }

        // 与右边的 O 合并（避免重复，只看右和下）
        if (j + 1 < n && board[i][j + 1] === 'O') {
          union(idx, idx + 1);
        }
        // 与下边的 O 合并
        if (i + 1 < m && board[i + 1][j] === 'O') {
          union(idx, idx + n);
        }
      }
    }
  }

  /**
   * 最终判断：捕获被围绕的 O
   *
   * 不与 dummy 连通的 O → 被围绕 → 变为 X
   * 与 dummy 连通的 O → 安全 → 保持不变
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O' && find(i * n + j) !== find(dummy)) {
        board[i][j] = 'X'; // 不与边界连通，被围绕
      }
    }
  }
}`,
        explanation: `## 并查集

### 思路
1. 创建虚拟节点 dummy，代表"与边界连通"
2. 将边界上的 O 与 dummy 合并
3. 将相邻的 O 合并
4. 最后，不与 dummy 连通的 O 就是被围绕的

### 特点
- 不需要标记和恢复
- 直接判断连通性`,
        timeComplexity: "O(m × n × α(m × n))",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 3. 课程表 (207)
  {
    id: "course-schedule",
    leetcodeId: 207,
    title: "课程表",
    titleEn: "Course Schedule",
    difficulty: "medium",
    category: "graph",
    tags: ["深度优先搜索", "广度优先搜索", "图", "拓扑排序"],
    frontendRelevance: "medium",
    frontendNote: "拓扑排序",
    description: `你这个学期必须选修 \`numCourses\` 门课程，记为 \`0\` 到 \`numCourses - 1\`。

在选修某些课程之前需要一些先修课程。先修课程按数组 \`prerequisites\` 给出，其中 \`prerequisites[i] = [ai, bi]\`，表示如果要学习课程 \`ai\` 则 **必须** 先学习课程 \`bi\`。

例如，先修课程对 \`[0, 1]\` 表示：想要学习课程 \`0\`，你需要先完成课程 \`1\`。

请你判断是否可能完成所有课程的学习？如果可以，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。这是可能的。
\`\`\`

**示例 2：**
\`\`\`
输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成课程 0；并且学习课程 0 之前，你还应先完成课程 1。这是不可能的。
\`\`\``,
    constraints: `- \`1 <= numCourses <= 2000\`
- \`0 <= prerequisites.length <= 5000\`
- \`prerequisites[i].length == 2\`
- \`0 <= ai, bi < numCourses\`
- \`prerequisites[i]\` 中的所有课程对 **互不相同**`,
    initialCode: `function canFinish(numCourses, prerequisites) {
  // 在此处编写你的代码

}`,
    solution: `function canFinish(numCourses, prerequisites) {
  // 构建邻接表和入度数组
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // BFS（Kahn算法）
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  let count = 0;
  while (queue.length > 0) {
    const course = queue.shift();
    count++;

    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
}`,
    testCases: [
      {
        id: "1",
        name: "可以完成",
        input: [2, [[1,0]]],
        expected: true
      },
      {
        id: "2",
        name: "存在循环",
        input: [2, [[1,0],[0,1]]],
        expected: false
      },
      {
        id: "3",
        name: "无依赖",
        input: [3, []],
        expected: true
      }
    ],
    hints: [
      "本质是检测有向图中是否存在环",
      "可以使用拓扑排序（BFS/DFS）",
      "BFS：从入度为0的节点开始，逐层删除"
    ],
    explanation: `## 解题思路

### 拓扑排序（Kahn算法）

1. 构建邻接表和入度数组
2. 将所有入度为 0 的节点入队
3. BFS：每次取出一个节点，将其邻居的入度减 1
4. 如果邻居入度变为 0，入队
5. 最后检查处理的节点数是否等于总课程数

如果存在环，环中的节点入度永远不会变为 0。

### 复杂度分析
- 时间复杂度：O(V + E)
- 空间复杂度：O(V + E)`,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    relatedProblems: ["number-of-islands", "course-schedule-ii"],
    solutions: [
      {
        name: "BFS 拓扑排序（Kahn算法，推荐）",
        code: `/**
 * 课程表 - BFS 拓扑排序（Kahn 算法）
 *
 * 核心思想：
 * - 课程依赖关系构成有向图
 * - 能否完成所有课程 = 图中是否存在环
 * - 使用拓扑排序：从没有依赖的课程开始，逐步"学完"所有课程
 *
 * 什么是拓扑排序？
 * - 对有向无环图（DAG）的节点进行排序
 * - 使得对于每条边 u → v，u 都在 v 之前
 * - 如果图有环，则无法进行拓扑排序
 *
 * Kahn 算法步骤：
 * 1. 计算每个节点的入度（有多少条边指向它）
 * 2. 将入度为 0 的节点入队（没有先修课程）
 * 3. 取出队首节点，将其后继节点的入度 -1
 * 4. 如果后继节点入度变为 0，入队
 * 5. 重复直到队列为空
 *
 * 关键洞察：
 * - 入度为 0 = 没有前置依赖，可以直接学习
 * - 如果存在环，环中节点入度永远不会变为 0
 *
 * 示例：
 * 课程：0, 1, 2, 3
 * 依赖：[1,0], [2,0], [3,1], [3,2]
 * 图：0 → 1 → 3
 *     ↓       ↑
 *     2 ─────┘
 * 入度：[0, 1, 1, 2]
 * 排序：0 → 1,2 → 3
 *
 * 时间复杂度：O(V + E)，V 是课程数，E 是依赖数
 * 空间复杂度：O(V + E)
 */
function canFinish(numCourses, prerequisites) {
  // 构建邻接表：graph[i] 存储课程 i 的后续课程
  const graph = Array.from({ length: numCourses }, () => []);
  // 入度数组：inDegree[i] 表示课程 i 有多少门先修课
  const inDegree = new Array(numCourses).fill(0);

  // 构建图和入度数组
  // [course, prereq] 表示学 course 之前必须学 prereq
  // 即 prereq → course 的边
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course); // prereq 指向 course
    inDegree[course]++;         // course 的入度 +1
  }

  // 将所有入度为 0 的课程入队（可以直接学的课程）
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // 已学习的课程数量
  let count = 0;

  // BFS：模拟学习过程
  while (queue.length > 0) {
    const course = queue.shift(); // 取出一门可以学的课程
    count++;                       // 学完一门

    // 遍历该课程的后续课程
    for (const next of graph[course]) {
      inDegree[next]--; // 后续课程的依赖 -1（因为 course 已学完）
      if (inDegree[next] === 0) {
        queue.push(next); // 如果没有其他依赖了，可以学了
      }
    }
  }

  // 如果学完的课程数等于总数，说明可以完成
  // 否则说明有环，部分课程无法学习
  return count === numCourses;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "拓扑排序演示",
          steps: [
            {
              array: ["0:入度0", "1:入度1", "2:入度1", "3:入度2"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "green" as const, label: "入度0" }],
              description: "4门课程，依赖：0→1, 0→2, 1→3, 2→3。课程0入度为0，入队",
            },
            {
              array: ["0:已学", "1:入度0", "2:入度0", "3:入度2"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "gray" as const, label: "已学" }, { indices: [1, 2], color: "green" as const, label: "入度0" }],
              description: "学完课程0，更新后续课程入度：课程1和2入度变为0，入队",
            },
            {
              array: ["0:已学", "1:已学", "2:已学", "3:入度0"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2], color: "gray" as const, label: "已学" }, { indices: [3], color: "green" as const, label: "入度0" }],
              description: "学完课程1和2，课程3入度变为0，入队",
            },
            {
              array: ["0:已学", "1:已学", "2:已学", "3:已学"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "完成" }],
              description: "学完课程3，共学习4门=总课程数，可以完成所有课程！",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## BFS 拓扑排序（Kahn算法）

### 思路
1. 构建邻接表和入度数组
2. 将所有入度为 0 的节点入队
3. BFS：每次取出一个节点，将其邻居的入度减 1
4. 如果邻居入度变为 0，入队
5. 最后检查处理的节点数是否等于总课程数

### 关键
如果存在环，环中的节点入度永远不会变为 0，无法全部处理。`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
      },
      {
        name: "DFS 检测环",
        animation: {
          type: "two-pointers" as const,
          title: "DFS三色标记演示",
          steps: [
            {
              array: ["0:白", "1:白", "2:白"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "未访问" },
              ],
              description: "三色标记：白=未访问，灰=访问中，黑=已完成",
            },
            {
              array: ["0:灰", "1:白", "2:白"],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "yellow" as const, label: "访问中" },
              ],
              description: "DFS(0)：标记为灰色，表示正在当前路径上",
            },
            {
              array: ["0:灰", "1:灰", "2:白"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "yellow" as const, label: "DFS路径" },
              ],
              description: "DFS(1)：0→1。如果再遇到灰色节点=有环！",
            },
            {
              array: ["0:黑", "1:黑", "2:黑"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "完成" },
              ],
              description: "所有节点都变成黑色，无环。可以完成所有课程",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 课程表 - DFS 检测环
 *
 * 核心思想：
 * - 如果课程依赖图中存在环，则无法完成所有课程
 * - 使用 DFS 遍历图，检测是否存在环
 *
 * 如何检测环？使用三种状态：
 * - 0 (WHITE)：未访问
 * - 1 (GRAY)：正在访问中（当前 DFS 路径上）
 * - 2 (BLACK)：已完成访问
 *
 * 关键洞察：
 * - 如果 DFS 过程中遇到 GRAY 节点，说明形成了环
 * - GRAY 表示"我还没处理完，你怎么又回来了？"
 *
 * 示例（存在环）：
 * 课程：0, 1
 * 依赖：[1,0], [0,1]（互相依赖）
 *
 * DFS(0): state[0] = GRAY
 *   → DFS(1): state[1] = GRAY
 *     → DFS(0): state[0] == GRAY！发现环！
 *
 * 示例（无环）：
 * 课程：0, 1, 2
 * 依赖：[1,0], [2,1]
 *
 * DFS(0): GRAY → DFS(1): GRAY → DFS(2): GRAY → BLACK
 *                       ← BLACK
 *         ← BLACK
 * 所有节点最终都变成 BLACK，无环
 *
 * 时间复杂度：O(V + E)
 * 空间复杂度：O(V + E)
 */
function canFinish(numCourses, prerequisites) {
  // 构建邻接表
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  // 状态数组：0-未访问，1-访问中，2-已完成
  const state = new Array(numCourses).fill(0);

  /**
   * DFS 检测从 node 出发是否存在环
   *
   * @returns true 如果存在环，false 如果无环
   */
  const hasCycle = (node) => {
    // 遇到正在访问的节点 → 形成环（回边）
    if (state[node] === 1) return true;
    // 遇到已完成的节点 → 无需再访问
    if (state[node] === 2) return false;

    // 标记为"正在访问"
    state[node] = 1;

    // 访问所有后继节点
    for (const next of graph[node]) {
      if (hasCycle(next)) return true; // 发现环，立即返回
    }

    // 标记为"已完成"
    state[node] = 2;
    return false;
  };

  // 检查每个节点（处理非连通图）
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false; // 存在环，无法完成
  }

  // 无环，可以完成所有课程
  return true;
}`,
        explanation: `## DFS 检测环

### 思路
使用三种状态标记节点：
- 0：未访问
- 1：访问中（当前 DFS 路径上）
- 2：已完成

### 检测环
在 DFS 过程中，如果遇到状态为 1 的节点，说明存在环。

### 关键
- 状态 1 表示"正在当前路径上"
- 遇到状态 1 说明形成了回边，即有环`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
      },
    ],
  },

  // 4. 实现 Trie (前缀树) (208)
  {
    id: "implement-trie",
    leetcodeId: 208,
    title: "实现 Trie (前缀树)",
    titleEn: "Implement Trie (Prefix Tree)",
    difficulty: "medium",
    category: "graph",
    tags: ["设计", "字典树", "哈希表", "字符串"],
    frontendRelevance: "low",
    frontendNote: "字典树实现",
    description: `**Trie**（发音类似 "try"）或者说 **前缀树** 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

- \`Trie()\` 初始化前缀树对象。
- \`void insert(String word)\` 向前缀树中插入字符串 \`word\`。
- \`boolean search(String word)\` 如果字符串 \`word\` 在前缀树中，返回 \`true\`（即，在检索之前已经插入）；否则，返回 \`false\`。
- \`boolean startsWith(String prefix)\` 如果之前已经插入的字符串 \`word\` 的前缀之一为 \`prefix\`，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例：**
\`\`\`
输入
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
输出
[null, null, true, false, true, null, true]

解释
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // 返回 True
trie.search("app");     // 返回 False
trie.startsWith("app"); // 返回 True
trie.insert("app");
trie.search("app");     // 返回 True
\`\`\``,
    constraints: `- \`1 <= word.length, prefix.length <= 2000\`
- \`word\` 和 \`prefix\` 仅由小写英文字母组成
- \`insert\`、\`search\` 和 \`startsWith\` 调用次数 **总计** 不超过 \`3 * 10^4\` 次`,
    initialCode: `class Trie {
  constructor() {
    // 在此处初始化
  }

  insert(word) {
    // 插入单词
  }

  search(word) {
    // 搜索单词
  }

  startsWith(prefix) {
    // 检查前缀
  }
}`,
    solution: `class Trie {
  constructor() {
    this.root = {};
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return node.isEnd === true;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return true;
  }
}`,
    testCases: [
      {
        id: "1",
        name: "基本操作",
        input: [["Trie", "insert", "search", "search", "startsWith", "insert", "search"], [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]],
        expected: [null, null, true, false, true, null, true]
      }
    ],
    hints: [
      "使用嵌套对象或Map作为树节点",
      "每个节点存储指向子节点的引用",
      "用特殊标记表示单词结尾"
    ],
    explanation: `## 解题思路

### 字典树结构

每个节点是一个对象，键是字符，值是子节点。用 \`isEnd\` 标记单词结尾。

**插入**：遍历字符，逐层创建节点，最后标记 isEnd。

**搜索**：遍历字符，如果路径存在且最后节点有 isEnd，返回 true。

**前缀检查**：遍历字符，只要路径存在就返回 true。

### 复杂度分析
- 时间复杂度：O(m)，m 是单词长度
- 空间复杂度：O(字符集大小 × 单词平均长度 × 单词数)`,
    timeComplexity: "O(m)",
    spaceComplexity: "O(n × m)",
    relatedProblems: ["course-schedule", "number-of-islands"],
    solutions: [
      {
        name: "对象嵌套（推荐）",
        code: `/**
 * 实现 Trie (前缀树) - 对象嵌套法
 *
 * 什么是 Trie（字典树/前缀树）？
 * - 一种树形数据结构，用于高效存储和检索字符串
 * - 每个节点代表一个字符
 * - 从根到某节点的路径组成一个前缀
 * - 常用于：自动补全、拼写检查、IP 路由
 *
 * 数据结构设计：
 * - 使用嵌套对象表示树结构
 * - 每个对象的键是字符，值是子节点
 * - 用 isEnd 标记单词结尾
 *
 * 示例：插入 "apple", "app"
 *
 * root
 *  └─ a
 *      └─ p
 *          └─ p (isEnd: true)  ← "app" 结束
 *              └─ l
 *                  └─ e (isEnd: true)  ← "apple" 结束
 *
 * 时间复杂度：O(m)，m 是单词长度
 * 空间复杂度：O(n × m)，n 是单词数
 */
class Trie {
  constructor() {
    // 根节点是一个空对象
    // 结构：{ 'a': { 'p': { ... }, isEnd: false }, ... }
    this.root = {};
  }

  /**
   * 插入单词
   *
   * 遍历单词的每个字符：
   * - 如果字符不存在，创建新节点
   * - 移动到子节点
   * - 最后标记 isEnd = true
   *
   * @param {string} word - 要插入的单词
   */
  insert(word) {
    let node = this.root;
    // 逐字符遍历
    for (const char of word) {
      // 如果该字符的子节点不存在，创建之
      if (!node[char]) {
        node[char] = {};
      }
      // 移动到子节点
      node = node[char];
    }
    // 标记单词结尾
    node.isEnd = true;
  }

  /**
   * 搜索完整单词
   *
   * 遍历单词的每个字符：
   * - 如果路径断开，返回 false
   * - 最后检查 isEnd 标记
   *
   * @param {string} word - 要搜索的单词
   * @returns {boolean} - 单词是否存在
   */
  search(word) {
    let node = this.root;
    for (const char of word) {
      // 路径断开，单词不存在
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    // 必须是完整单词（有 isEnd 标记）
    return node.isEnd === true;
  }

  /**
   * 检查是否存在以 prefix 开头的单词
   *
   * 与 search 类似，但不需要检查 isEnd
   *
   * @param {string} prefix - 要检查的前缀
   * @returns {boolean} - 是否存在以该前缀开头的单词
   */
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    // 只要路径存在就行，不需要 isEnd
    return true;
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "Trie插入与搜索演示",
          steps: [
            {
              array: ["root", "→", "a", "→", "p", "→", "p", "→", "l", "→", "e"],
              left: 0,
              right: 10,
              highlights: [{ indices: [0], color: "blue" as const, label: "根" }],
              description: "空Trie，准备插入单词 'apple'",
            },
            {
              array: ["root", "→", "a", "→", "p", "→", "p", "→", "l", "→", "e✓"],
              left: 0,
              right: 10,
              highlights: [{ indices: [2, 4, 6, 8, 10], color: "green" as const, label: "新建" }],
              description: "插入'apple'：依次创建节点 a→p→p→l→e，标记e为单词结尾",
            },
            {
              array: ["root", "→", "a", "→", "p", "→", "p✓", "→", "l", "→", "e✓"],
              left: 0,
              right: 10,
              highlights: [{ indices: [6], color: "blue" as const, label: "新结尾" }, { indices: [10], color: "green" as const, label: "原结尾" }],
              description: "插入'app'：复用 a→p→p 路径，在第二个p标记单词结尾",
            },
            {
              array: ["搜索app", "a✓", "→", "p✓", "→", "p✓(isEnd)", "结果:true"],
              left: 0,
              right: 6,
              highlights: [{ indices: [1, 3, 5], color: "green" as const, label: "匹配" }],
              description: "搜索'app'：路径存在且p有isEnd标记，返回true",
            },
            {
              array: ["前缀ap", "a✓", "→", "p✓", "路径存在", "结果:true"],
              left: 0,
              right: 5,
              highlights: [{ indices: [1, 3], color: "green" as const, label: "前缀" }],
              description: "检查前缀'ap'：路径存在即返回true，无需isEnd",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 对象嵌套实现

### 数据结构
每个节点是一个对象，键是字符，值是子节点。用 \`isEnd\` 标记单词结尾。

### 操作
- **插入**：遍历字符，逐层创建节点，最后标记 isEnd
- **搜索**：遍历字符，路径存在且最后节点有 isEnd 返回 true
- **前缀检查**：遍历字符，只要路径存在就返回 true

### 优点
- 实现简单
- 利用 JavaScript 对象的动态性`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(n × m)",
      },
      {
        name: "Map 实现",
        animation: {
          type: "two-pointers" as const,
          title: "Trie Map实现演示",
          steps: [
            {
              array: ["root", "", "", "", ""],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "blue" as const, label: "根节点" },
              ],
              description: "初始化：根节点children为空Map",
            },
            {
              array: ["root", "a", "p", "p", "l", "e"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [1, 2, 3, 4, 5], color: "green" as const, label: "插入apple" },
              ],
              description: "insert('apple')：逐字符创建节点链",
            },
            {
              array: ["root", "a", "p", "p*", "", ""],
              left: 0,
              right: 3,
              highlights: [
                { indices: [3], color: "yellow" as const, label: "isEnd" },
              ],
              description: "insert('app')：复用已有节点，标记isEnd=true",
            },
            {
              array: ["a", "p", "p", "l", "e"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3, 4], color: "green" as const, label: "找到" },
              ],
              description: "search('apple')：沿路径查找，最后节点isEnd=true则返回true",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * Trie 节点类
 *
 * 使用 Map 存储子节点，结构更清晰
 */
class TrieNode {
  constructor() {
    // 使用 Map 存储子节点
    // key: 字符, value: TrieNode
    this.children = new Map();
    // 是否是单词结尾
    this.isEnd = false;
  }
}

/**
 * 实现 Trie (前缀树) - Map 实现
 *
 * 与对象嵌套法的区别：
 * - 使用显式的 TrieNode 类
 * - children 用 Map 存储
 * - 结构更清晰，更易扩展
 *
 * Map vs 对象：
 * - Map 可以用任意类型作为键（不只是字符串）
 * - Map 有 size 属性，方便获取子节点数量
 * - Map 的遍历顺序是插入顺序
 *
 * 优化：抽取 _searchPrefix 公共方法
 * - search 和 startsWith 都需要遍历前缀
 * - 复用代码，减少重复
 *
 * 时间复杂度：O(m)
 * 空间复杂度：O(n × m)
 */
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * 插入单词
   *
   * @param {string} word - 要插入的单词
   */
  insert(word) {
    let node = this.root;
    for (const char of word) {
      // 如果子节点不存在，创建新节点
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      // 移动到子节点
      node = node.children.get(char);
    }
    // 标记单词结尾
    node.isEnd = true;
  }

  /**
   * 搜索完整单词
   *
   * @param {string} word - 要搜索的单词
   * @returns {boolean} - 单词是否存在
   */
  search(word) {
    const node = this._searchPrefix(word);
    // 路径存在 且 是完整单词
    return node !== null && node.isEnd;
  }

  /**
   * 检查是否存在以 prefix 开头的单词
   *
   * @param {string} prefix - 要检查的前缀
   * @returns {boolean} - 是否存在
   */
  startsWith(prefix) {
    // 只要路径存在就行
    return this._searchPrefix(prefix) !== null;
  }

  /**
   * 【私有方法】搜索前缀，返回终点节点
   *
   * 被 search 和 startsWith 共用
   *
   * @param {string} prefix - 要搜索的前缀
   * @returns {TrieNode|null} - 前缀的终点节点，不存在返回 null
   */
  _searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      // 路径断开
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char);
    }
    return node;
  }
}`,
        explanation: `## Map 实现

### 数据结构
使用显式的 TrieNode 类，children 用 Map 存储。

### 优点
- 结构更清晰
- 可以方便地扩展节点属性

### 抽取公共方法
_searchPrefix 方法被 search 和 startsWith 共用。`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(n × m)",
      },
      {
        name: "数组实现（固定字符集）",
        animation: {
          type: "two-pointers" as const,
          title: "Trie数组实现演示",
          steps: [
            {
              array: ["[26]", "null", "...", "null"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "blue" as const, label: "children[26]" },
              ],
              description: "每个节点有26个槽位，对应a-z。索引=char-'a'",
            },
            {
              array: ["a:0", "p:15", "p:15", "l:11", "e:4"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3, 4], color: "green" as const, label: "插入apple" },
              ],
              description: "insert('apple')：children['a'-'a']=children[0]创建节点",
            },
            {
              array: ["[0]", "[15]", "[15]", "[11]", "[4]*"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [4], color: "yellow" as const, label: "isEnd" },
              ],
              description: "数组索引访问O(1)，比Map/对象更快",
            },
            {
              array: ["a", "p", "p", "l", "e"],
              left: 0,
              right: 4,
              highlights: [
                { indices: [0, 1, 2, 3, 4], color: "green" as const, label: "找到" },
              ],
              description: "search：沿数组索引查找，空间换时间",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * Trie 节点类 - 数组实现
 *
 * 用长度为 26 的数组存储子节点（假设只有小写字母）
 */
class TrieNode {
  constructor() {
    // 26 个位置对应 a-z
    // children[0] = 'a' 的子节点
    // children[25] = 'z' 的子节点
    this.children = new Array(26).fill(null);
    this.isEnd = false;
  }
}

/**
 * 实现 Trie (前缀树) - 数组实现
 *
 * 核心思想：
 * - 已知字符集只有 a-z 共 26 个字符
 * - 用数组索引表示字符：'a' → 0, 'b' → 1, ..., 'z' → 25
 * - 访问速度最快（数组索引 O(1) vs 哈希查找）
 *
 * 字符转索引：char.charCodeAt(0) - 'a'.charCodeAt(0)
 * - 'a'.charCodeAt(0) = 97
 * - 'b'.charCodeAt(0) = 98
 * - 所以 'b' 的索引 = 98 - 97 = 1
 *
 * 优缺点：
 * ✓ 访问速度最快
 * ✗ 空间可能浪费（如果实际使用的字符很少）
 * ✗ 字符集必须固定且已知
 *
 * 适用场景：
 * - 字符集固定且较小（如只有小写字母）
 * - 对性能要求极高
 *
 * 时间复杂度：O(m)
 * 空间复杂度：O(26 × n × m)
 */
class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * 字符转数组索引
   *
   * @param {string} char - 字符
   * @returns {number} - 索引 (0-25)
   */
  _charToIndex(char) {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  /**
   * 插入单词
   *
   * @param {string} word - 要插入的单词
   */
  insert(word) {
    let node = this.root;
    for (const char of word) {
      const idx = this._charToIndex(char);
      // 如果该索引位置没有节点，创建之
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  /**
   * 搜索完整单词
   *
   * @param {string} word - 要搜索的单词
   * @returns {boolean} - 单词是否存在
   */
  search(word) {
    let node = this.root;
    for (const char of word) {
      const idx = this._charToIndex(char);
      // 路径断开
      if (!node.children[idx]) {
        return false;
      }
      node = node.children[idx];
    }
    // 必须是完整单词
    return node.isEnd;
  }

  /**
   * 检查是否存在以 prefix 开头的单词
   *
   * @param {string} prefix - 要检查的前缀
   * @returns {boolean} - 是否存在
   */
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      const idx = this._charToIndex(char);
      if (!node.children[idx]) {
        return false;
      }
      node = node.children[idx];
    }
    // 路径存在即可
    return true;
  }
}`,
        explanation: `## 数组实现

### 数据结构
用长度为 26 的数组存储子节点（假设只有小写字母）。

### 特点
- 访问速度最快（数组索引 vs 哈希查找）
- 空间可能浪费（稀疏数组）

### 适用场景
- 字符集固定且较小
- 对性能要求极高`,
        timeComplexity: "O(m)",
        spaceComplexity: "O(26 × n × m)",
      },
    ],
  },

  // 5. 克隆图 (133)
  {
    id: "clone-graph",
    leetcodeId: 133,
    title: "克隆图",
    titleEn: "Clone Graph",
    difficulty: "medium",
    category: "graph",
    tags: ["深度优先搜索", "广度优先搜索", "图", "哈希表"],
    frontendRelevance: "low",
    frontendNote: "深拷贝图结构，前端少用",
    description: `给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。

图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。

class Node {
    public int val;
    public List<Node> neighbors;
}`,
    examples: `**示例 1：**
\`\`\`
输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
输出：[[2,4],[1,3],[2,4],[1,3]]
解释：图中有 4 个节点，克隆后返回相同结构的新图
\`\`\`

**示例 2：**
\`\`\`
输入：adjList = [[]]
输出：[[]]
解释：只有一个节点，没有邻居
\`\`\``,
    constraints: `- 节点数不超过 100
- \`1 <= Node.val <= 100\`
- \`Node.val\` 是唯一的
- 没有重复的边和自环
- 图是连通图`,
    initialCode: `function cloneGraph(node) {
  // 在此处编写代码
}`,
    solution: `function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map();

  const dfs = (node) => {
    if (visited.has(node)) {
      return visited.get(node);
    }

    const clone = new Node(node.val);
    visited.set(node, clone);

    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  };

  return dfs(node);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[2,4],[1,3],[2,4],[1,3]]],
        expected: [[2,4],[1,3],[2,4],[1,3]]
      },
      {
        id: "2",
        name: "单节点",
        input: [[[]]],
        expected: [[]]
      }
    ],
    hints: [
      "使用哈希表记录已克隆的节点",
      "DFS 或 BFS 遍历图",
      "先创建克隆节点，再处理邻居"
    ],
    explanation: `## 解题思路

### DFS + 哈希表

1. 用哈希表存储 原节点 → 克隆节点 的映射
2. 遇到新节点：创建克隆，递归处理邻居
3. 遇到已访问节点：直接返回其克隆

### 关键点
- 哈希表同时起到记录已访问和存储映射的作用
- 先创建克隆节点再递归，避免循环引用问题

### 复杂度分析
- 时间复杂度：O(N + E)
- 空间复杂度：O(N)`,
    timeComplexity: "O(N + E)",
    spaceComplexity: "O(N)",
    relatedProblems: ["copy-list-with-random-pointer"],
    solutions: [
      {
        name: "DFS（推荐）",
        code: `/**
 * 克隆图 - DFS 深度优先搜索
 *
 * 问题：给定一个无向图的节点引用，返回该图的深拷贝
 *
 * 核心思想：
 * - 遍历原图的每个节点
 * - 为每个节点创建对应的克隆节点
 * - 用哈希表记录 原节点 → 克隆节点 的映射
 * - 递归处理邻居节点
 *
 * 为什么需要哈希表？
 * - 图可能有环，会重复访问同一节点
 * - 哈希表记录已克隆的节点，避免无限循环
 * - 同时提供 原节点 → 克隆节点 的快速查找
 *
 * 算法步骤：
 * 1. 如果节点为空，返回 null
 * 2. 如果节点已克隆（在哈希表中），直接返回克隆节点
 * 3. 创建克隆节点，存入哈希表
 * 4. 递归克隆所有邻居，加入克隆节点的邻居列表
 * 5. 返回克隆节点
 *
 * 示例：
 * 原图：1 -- 2
 *       |    |
 *       4 -- 3
 *
 * DFS 过程：
 * 克隆 1 → 克隆 2 → 克隆 3 → 克隆 4
 *                          ↓
 *                    遇到 1（已克隆）→ 返回 clone[1]
 *
 * 时间复杂度：O(N + E)，N 是节点数，E 是边数
 * 空间复杂度：O(N)，哈希表 + 递归栈
 */
function cloneGraph(node) {
  // 空图
  if (!node) return null;

  // 哈希表：原节点 → 克隆节点
  const visited = new Map();

  /**
   * DFS 递归克隆节点
   *
   * @param {Node} node - 原节点
   * @returns {Node} - 克隆节点
   */
  const dfs = (node) => {
    // 如果已经克隆过，直接返回克隆节点
    // 这是避免循环引用的关键！
    if (visited.has(node)) {
      return visited.get(node);
    }

    // 创建克隆节点（只有 val，neighbors 待填充）
    const clone = new Node(node.val);
    // 先存入哈希表，再处理邻居
    // 这样后续遇到这个节点时，可以直接返回
    visited.set(node, clone);

    // 递归克隆所有邻居
    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  };

  return dfs(node);
}`,
        animation: {
          type: "two-pointers" as const,
          title: "DFS克隆图演示",
          steps: [
            {
              array: ["1", "—", "2", "|", " ", "|", "4", "—", "3"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0], color: "blue" as const, label: "起始" }],
              description: "原图：1-2, 1-4, 2-3, 3-4 形成正方形。从节点1开始DFS克隆",
            },
            {
              array: ["1'", "→", "2", "→", "3", "→", "4", "→", "1(已克隆)"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0], color: "green" as const, label: "克隆1" }],
              description: "克隆节点1，存入Map。递归克隆邻居2",
            },
            {
              array: ["1'", "→", "2'", "→", "3'", "→", "4'"],
              left: 0,
              right: 6,
              highlights: [{ indices: [0, 2, 4, 6], color: "green" as const, label: "已克隆" }],
              description: "DFS路径：1→2→3→4，依次克隆每个节点",
            },
            {
              array: ["4'邻居:", "1'(Map中)", "3'(Map中)"],
              left: 0,
              right: 2,
              highlights: [{ indices: [1, 2], color: "blue" as const, label: "复用" }],
              description: "克隆4的邻居时，1和3已在Map中，直接复用克隆节点",
            },
            {
              array: ["1'—2'", "|   |", "4'—3'"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "完成" }],
              description: "克隆完成！新图与原图结构相同，但是完全独立的新对象",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## DFS 法

### 步骤
1. 检查节点是否已克隆
2. 创建克隆节点，存入哈希表
3. 递归克隆所有邻居
4. 返回克隆节点`,
        timeComplexity: "O(N + E)",
        spaceComplexity: "O(N)",
      },
      {
        name: "BFS",
        animation: {
          type: "two-pointers" as const,
          title: "BFS克隆图演示",
          steps: [
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "blue" as const, label: "原图节点" },
              ],
              description: "图：1-2-3-4形成环。BFS用队列遍历",
            },
            {
              array: ["1'", "", "", ""],
              left: 0,
              right: 0,
              highlights: [
                { indices: [0], color: "green" as const, label: "克隆1" },
              ],
              description: "克隆节点1，存入Map，入队",
            },
            {
              array: ["1'", "2'", "4'", ""],
              left: 0,
              right: 2,
              highlights: [
                { indices: [1, 2], color: "yellow" as const, label: "入队" },
              ],
              description: "处理1的邻居：克隆2和4，入队",
            },
            {
              array: ["1'", "2'", "3'", "4'"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "完成" },
              ],
              description: "BFS完成，所有节点都已克隆并正确连接",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 克隆图 - BFS 广度优先搜索
 *
 * 核心思想：
 * - 用队列代替递归栈
 * - 层序遍历原图的节点
 * - 同样用哈希表记录映射关系
 *
 * 与 DFS 的区别：
 * - DFS：一条路走到底，再回溯
 * - BFS：先处理所有直接邻居，再处理邻居的邻居
 *
 * BFS 优点：
 * - 避免递归深度过大导致栈溢出
 * - 对于有大量节点的图更安全
 *
 * 算法步骤：
 * 1. 克隆起始节点，存入哈希表，入队
 * 2. 取出队首节点
 * 3. 遍历其所有邻居：
 *    - 如果邻居未克隆，克隆并入队
 *    - 将邻居的克隆节点加入当前节点的邻居列表
 * 4. 重复直到队列为空
 *
 * 时间复杂度：O(N + E)
 * 空间复杂度：O(N)
 */
function cloneGraph(node) {
  // 空图
  if (!node) return null;

  // 哈希表：原节点 → 克隆节点
  const visited = new Map();
  // BFS 队列
  const queue = [node];

  // 先克隆起始节点
  visited.set(node, new Node(node.val));

  // BFS 遍历
  while (queue.length > 0) {
    const curr = queue.shift(); // 取出当前节点

    // 遍历当前节点的所有邻居
    for (const neighbor of curr.neighbors) {
      // 如果邻居还没有被克隆
      if (!visited.has(neighbor)) {
        // 克隆邻居节点
        visited.set(neighbor, new Node(neighbor.val));
        // 邻居入队，后续处理它的邻居
        queue.push(neighbor);
      }
      // 将邻居的克隆节点加入当前节点克隆的邻居列表
      // 注意：这一步在 if 外面，因为无论是否新克隆，都要建立邻居关系
      visited.get(curr).neighbors.push(visited.get(neighbor));
    }
  }

  // 返回起始节点的克隆
  return visited.get(node);
}`,
        explanation: `## BFS 法

### 步骤
1. 先克隆起始节点
2. BFS 遍历，遇到新节点就克隆
3. 处理邻居关系`,
        timeComplexity: "O(N + E)",
        spaceComplexity: "O(N)",
      },
    ],
  },

  // 6. 腐烂的橘子 (994)
  {
    id: "rotting-oranges",
    leetcodeId: 994,
    title: "腐烂的橘子",
    titleEn: "Rotting Oranges",
    difficulty: "medium",
    category: "graph",
    tags: ["广度优先搜索", "数组", "矩阵"],
    frontendRelevance: "medium",
    frontendNote: "BFS层次遍历",
    description: `在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：

- 值 0 代表空单元格；
- 值 1 代表新鲜橘子；
- 值 2 代表腐烂的橘子。

每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。

返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。`,
    examples: `**示例 1：**
\`\`\`
输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
输出：4
解释：需要 4 分钟使所有橘子腐烂
\`\`\`

**示例 2：**
\`\`\`
输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
输出：-1
解释：左下角的橘子永远不会腐烂
\`\`\`

**示例 3：**
\`\`\`
输入：grid = [[0,2]]
输出：0
解释：没有新鲜橘子
\`\`\``,
    constraints: `- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 10\`
- \`grid[i][j]\` 仅为 0、1 或 2`,
    initialCode: `function orangesRotting(grid) {
  // 在此处编写代码
}`,
    solution: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let fresh = 0;

  // 初始化：找到所有腐烂橘子和新鲜橘子数量
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]);
      } else if (grid[i][j] === 1) {
        fresh++;
      }
    }
  }

  if (fresh === 0) return 0;

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let minutes = 0;

  while (queue.length > 0 && fresh > 0) {
    minutes++;
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;

        if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
          grid[nx][ny] = 2;
          fresh--;
          queue.push([nx, ny]);
        }
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[2,1,1],[1,1,0],[0,1,1]]],
        expected: 4
      },
      {
        id: "2",
        name: "无法全部腐烂",
        input: [[[2,1,1],[0,1,1],[1,0,1]]],
        expected: -1
      },
      {
        id: "3",
        name: "没有新鲜橘子",
        input: [[[0,2]]],
        expected: 0
      }
    ],
    hints: [
      "多源 BFS：从所有腐烂橘子同时开始",
      "统计新鲜橘子数量",
      "每轮 BFS 代表一分钟"
    ],
    explanation: `## 解题思路

### 多源 BFS

1. 找到所有腐烂橘子作为 BFS 起点
2. 统计新鲜橘子数量
3. BFS 层序遍历，每层代表一分钟
4. 最后检查是否还有新鲜橘子

### 关键点
- 多个起点同时开始扩散
- 用 fresh 计数判断是否全部腐烂
- 注意边界情况：没有新鲜橘子时返回 0

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(m × n)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(m × n)",
    relatedProblems: ["walls-and-gates", "shortest-path-in-binary-matrix"],
    solutions: [
      {
        name: "多源 BFS（推荐）",
        code: `/**
 * 腐烂的橘子 - 多源 BFS
 *
 * 问题：腐烂的橘子每分钟会让相邻的新鲜橘子腐烂，求所有橘子腐烂的最短时间
 *
 * 核心思想：
 * - 所有腐烂橘子同时开始扩散
 * - 每一轮 BFS 代表一分钟
 * - 这是"多源最短路径"问题的经典应用
 *
 * 什么是多源 BFS？
 * - 普通 BFS：从一个起点出发
 * - 多源 BFS：从多个起点同时出发
 * - 技巧：将所有起点一起加入队列，视为"第 0 层"
 *
 * 为什么用 BFS 而不是 DFS？
 * - BFS 天然按"距离"遍历（层序）
 * - 每一层代表距离 +1
 * - 多源 BFS 可以同时计算多个起点的最短距离
 *
 * 算法步骤：
 * 1. 遍历网格，收集所有腐烂橘子（入队），统计新鲜橘子数量
 * 2. BFS 层序遍历：
 *    - 每层代表一分钟
 *    - 将相邻的新鲜橘子腐烂，入队
 * 3. 如果还有新鲜橘子，返回 -1
 * 4. 否则返回分钟数
 *
 * 示例：
 * [2,1,1]    0分钟    1分钟    2分钟    3分钟    4分钟
 * [1,1,0] →  [2,1,1]  [2,2,1]  [2,2,2]  [2,2,2]  [2,2,2]
 * [0,1,1]    [1,1,0]  [2,1,0]  [2,2,0]  [2,2,0]  [2,2,0]
 *            [0,1,1]  [0,1,1]  [0,2,1]  [0,2,2]  [0,2,2]
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)
 */
function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];      // BFS 队列
  let fresh = 0;         // 新鲜橘子数量

  /**
   * 第一步：遍历网格，初始化
   *
   * - 腐烂橘子 (2)：入队（作为 BFS 起点）
   * - 新鲜橘子 (1)：计数
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        queue.push([i, j]); // 腐烂橘子入队
      } else if (grid[i][j] === 1) {
        fresh++;            // 统计新鲜橘子
      }
    }
  }

  // 边界情况：没有新鲜橘子，不需要时间
  if (fresh === 0) return 0;

  // 四个方向：右、左、下、上
  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let minutes = 0; // 经过的分钟数

  /**
   * 第二步：BFS 层序遍历
   *
   * 条件：队列不为空 且 还有新鲜橘子
   * 每一层代表一分钟
   */
  while (queue.length > 0 && fresh > 0) {
    minutes++; // 开始新的一分钟

    // 处理当前层（当前分钟所有能腐烂的橘子）
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [x, y] = queue.shift();

      // 尝试四个方向
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy;

        // 检查边界 且 是新鲜橘子
        if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 1) {
          grid[nx][ny] = 2; // 腐烂
          fresh--;          // 新鲜橘子 -1
          queue.push([nx, ny]); // 入队，下一分钟继续扩散
        }
      }
    }
  }

  // 检查是否全部腐烂
  // fresh === 0：全部腐烂，返回分钟数
  // fresh > 0：有无法触及的新鲜橘子，返回 -1
  return fresh === 0 ? minutes : -1;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "多源BFS腐烂扩散演示",
          steps: [
            {
              array: ["2", "1", "1", "|", "1", "1", "0", "|", "0", "1", "1"],
              left: 0,
              right: 10,
              highlights: [{ indices: [0], color: "red" as const, label: "腐烂" }, { indices: [1, 2, 4, 5, 9, 10], color: "green" as const, label: "新鲜6" }],
              description: "初始：1个腐烂橘子(2)，6个新鲜橘子(1)，0是空格",
            },
            {
              array: ["2", "2", "1", "|", "2", "1", "0", "|", "0", "1", "1"],
              left: 0,
              right: 10,
              highlights: [{ indices: [0, 1, 4], color: "red" as const, label: "腐烂" }, { indices: [2, 5, 9, 10], color: "green" as const, label: "新鲜4" }],
              description: "第1分钟：位置[0,1]和[1,0]的橘子被传染，剩余4个新鲜",
            },
            {
              array: ["2", "2", "2", "|", "2", "2", "0", "|", "0", "1", "1"],
              left: 0,
              right: 10,
              highlights: [{ indices: [0, 1, 2, 4, 5], color: "red" as const, label: "腐烂" }, { indices: [9, 10], color: "green" as const, label: "新鲜2" }],
              description: "第2分钟：位置[0,2]和[1,1]被传染，剩余2个新鲜",
            },
            {
              array: ["2", "2", "2", "|", "2", "2", "0", "|", "0", "2", "1"],
              left: 0,
              right: 10,
              highlights: [{ indices: [9], color: "red" as const, label: "新腐烂" }, { indices: [10], color: "green" as const, label: "新鲜1" }],
              description: "第3分钟：位置[2,1]被传染，剩余1个新鲜",
            },
            {
              array: ["2", "2", "2", "|", "2", "2", "0", "|", "0", "2", "2"],
              left: 0,
              right: 10,
              highlights: [{ indices: [0, 1, 2, 4, 5, 9, 10], color: "green" as const, label: "全部腐烂" }],
              description: "第4分钟：最后一个橘子[2,2]腐烂，全部完成！返回4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 多源 BFS

### 关键思想
所有腐烂橘子同时开始扩散，等价于从一个"超级源点"出发。

### 步骤
1. 收集所有腐烂橘子入队
2. 统计新鲜橘子数量
3. BFS 按层遍历，每层 +1 分钟
4. 新鲜橘子变腐烂后入队`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
    ],
  },

  // 7. 课程表 II (210)
  {
    id: "course-schedule-ii",
    leetcodeId: 210,
    title: "课程表 II",
    titleEn: "Course Schedule II",
    difficulty: "medium",
    category: "graph",
    tags: ["深度优先搜索", "广度优先搜索", "图", "拓扑排序"],
    frontendRelevance: "low",
    frontendNote: "课程表II",
    description: `现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。

例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。

返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。`,
    examples: `**示例 1：**
\`\`\`
输入：numCourses = 2, prerequisites = [[1,0]]
输出：[0,1]
解释：先修课程 0，再修课程 1
\`\`\`

**示例 2：**
\`\`\`
输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
输出：[0,1,2,3] 或 [0,2,1,3]
解释：有多种合法顺序
\`\`\`

**示例 3：**
\`\`\`
输入：numCourses = 1, prerequisites = []
输出：[0]
解释：只有一门课
\`\`\``,
    constraints: `- \`1 <= numCourses <= 2000\`
- \`0 <= prerequisites.length <= numCourses * (numCourses - 1)\`
- \`prerequisites[i].length == 2\`
- \`0 <= ai, bi < numCourses\`
- \`ai != bi\`
- 所有 \`[ai, bi]\` 互不相同`,
    initialCode: `function findOrder(numCourses, prerequisites) {
  // 在此处编写代码
}`,
    solution: `function findOrder(numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  const result = [];

  while (queue.length > 0) {
    const course = queue.shift();
    result.push(course);

    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.length === numCourses ? result : [];
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [2, [[1,0]]],
        expected: [0,1]
      },
      {
        id: "2",
        name: "示例2",
        input: [4, [[1,0],[2,0],[3,1],[3,2]]],
        expected: [0,1,2,3]
      },
      {
        id: "3",
        name: "无先修课",
        input: [1, []],
        expected: [0]
      }
    ],
    hints: [
      "拓扑排序：BFS（Kahn 算法）或 DFS",
      "记录入度为 0 的节点",
      "输出拓扑序列"
    ],
    explanation: `## 解题思路

### 拓扑排序（Kahn 算法）

1. 构建邻接表和入度数组
2. 将入度为 0 的节点入队
3. BFS：取出节点，减少后继节点入度，入度变 0 则入队
4. 记录遍历顺序即为拓扑序列

### 关键点
- 如果最终结果长度不等于课程数，说明有环
- 入度为 0 表示没有前置依赖

### 复杂度分析
- 时间复杂度：O(V + E)
- 空间复杂度：O(V + E)`,
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    relatedProblems: ["course-schedule", "alien-dictionary"],
    solutions: [
      {
        name: "BFS（Kahn 算法，推荐）",
        code: `/**
 * 课程表 II - BFS 拓扑排序（Kahn 算法）
 *
 * 问题：返回学习课程的顺序（拓扑排序结果）
 * 与课程表 I 的区别：不仅要判断能否完成，还要输出一个合法顺序
 *
 * 核心思想：
 * - 拓扑排序：对有向无环图的节点排序
 * - 使得对于每条边 u → v，u 都在 v 之前
 *
 * Kahn 算法（BFS 实现）：
 * 1. 计算每个节点的入度
 * 2. 将入度为 0 的节点入队
 * 3. 取出队首，加入结果，更新后继节点入度
 * 4. 入度变为 0 的节点入队
 * 5. 重复直到队列为空
 *
 * 为什么入度为 0 可以先学？
 * - 入度 = 有多少门先修课
 * - 入度为 0 = 没有先修课要求，可以直接学
 *
 * 示例：
 * 课程：0, 1, 2, 3
 * 依赖：[1,0], [2,0], [3,1], [3,2]
 *
 * 初始入度：[0, 1, 1, 2]
 * 队列：[0]
 *
 * 取出 0：结果 [0]，更新入度 [0, 0, 0, 2]，入队 [1, 2]
 * 取出 1：结果 [0, 1]，更新入度 [0, 0, 0, 1]
 * 取出 2：结果 [0, 1, 2]，更新入度 [0, 0, 0, 0]，入队 [3]
 * 取出 3：结果 [0, 1, 2, 3]
 *
 * 时间复杂度：O(V + E)
 * 空间复杂度：O(V + E)
 */
function findOrder(numCourses, prerequisites) {
  // 入度数组
  const inDegree = new Array(numCourses).fill(0);
  // 邻接表：graph[i] = i 的后续课程列表
  const graph = Array.from({ length: numCourses }, () => []);

  // 构建图和入度数组
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course); // prereq → course
    inDegree[course]++;         // course 的入度 +1
  }

  // 将入度为 0 的课程入队
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
    }
  }

  // 结果数组（拓扑顺序）
  const result = [];

  // BFS
  while (queue.length > 0) {
    const course = queue.shift(); // 取出一门可以学的课
    result.push(course);          // 加入学习顺序

    // 更新后续课程的入度
    for (const next of graph[course]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next); // 可以学了
      }
    }
  }

  // 如果结果长度不等于课程数，说明有环
  return result.length === numCourses ? result : [];
}`,
        animation: {
          type: "two-pointers" as const,
          title: "拓扑排序输出顺序演示",
          steps: [
            {
              array: ["0:入度0", "1:入度1", "2:入度1", "3:入度2"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "green" as const, label: "可学" }],
              description: "4门课程，依赖：0→1, 0→2, 1→3, 2→3。课程0入度为0，可以先学",
            },
            {
              array: ["结果:[0]", "1:入度0", "2:入度0", "3:入度2"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "gray" as const, label: "已学" }, { indices: [1, 2], color: "green" as const, label: "可学" }],
              description: "学完0，加入结果。更新1和2入度变为0，都可以学了",
            },
            {
              array: ["结果:[0,1]", "结果:[0,1,2]", "3:入度0"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1], color: "gray" as const, label: "已学" }, { indices: [2], color: "green" as const, label: "可学" }],
              description: "学完1和2，课程3入度变为0",
            },
            {
              array: ["结果:[0,1,2,3]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "学完3，输出拓扑顺序 [0,1,2,3]（或 [0,2,1,3]也是合法的）",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## Kahn 算法

### 步骤
1. 构建图和入度数组
2. 入度为 0 的节点入队
3. 取出节点加入结果，更新后继节点入度
4. 检查结果长度`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
      },
      {
        name: "DFS（后序遍历）",
        animation: {
          type: "two-pointers" as const,
          title: "DFS后序遍历演示",
          steps: [
            {
              array: ["0", "1", "2", "3"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "blue" as const, label: "课程" },
              ],
              description: "依赖：0→1,2；1,2→3。DFS后序遍历的逆序=拓扑排序",
            },
            {
              array: ["0", "1", "3", ""],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1, 2], color: "yellow" as const, label: "DFS路径" },
              ],
              description: "DFS(0)→DFS(1)→DFS(3)，3无后继，加入栈",
            },
            {
              array: ["3", "1", "2", "0"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "后序" },
              ],
              description: "后序结果栈：[3,1,2,0]，逆序得：[0,2,1,3]",
            },
            {
              array: ["0", "2", "1", "3"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "green" as const, label: "拓扑序" },
              ],
              description: "拓扑排序结果：先学0，再学1或2，最后学3",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 课程表 II - DFS 后序遍历
 *
 * 核心思想：
 * - DFS 后序遍历的逆序就是拓扑排序
 * - 后序遍历：先处理子节点，再处理当前节点
 * - 逆序后：先处理当前节点，再处理子节点（符合依赖关系）
 *
 * 为什么后序遍历的逆序是拓扑排序？
 * - 后序遍历：叶子节点（没有后续依赖）先加入结果
 * - 逆序后：根节点（被依赖最多的）排在前面
 *
 * 使用三种状态检测环：
 * - 0 (WHITE)：未访问
 * - 1 (GRAY)：正在访问中（在当前 DFS 路径上）
 * - 2 (BLACK)：已完成
 *
 * 如果遇到 GRAY 节点，说明形成了环
 *
 * 示例：
 * 课程：0, 1, 2, 3
 * 依赖：[1,0], [2,0], [3,1], [3,2]
 *
 * DFS(0) → DFS(1) → DFS(3) → result.push(3)
 *                 ← result.push(1)
 *        → DFS(2) → DFS(3) 已完成，跳过
 *                 ← result.push(2)
 *        ← result.push(0)
 *
 * result = [3, 1, 2, 0]
 * 逆序后 = [0, 2, 1, 3]
 *
 * 时间复杂度：O(V + E)
 * 空间复杂度：O(V + E)
 */
function findOrder(numCourses, prerequisites) {
  // 构建邻接表
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  // 状态数组：0-未访问, 1-访问中, 2-已完成
  const visited = new Array(numCourses).fill(0);
  // 结果数组（后序遍历顺序）
  const result = [];

  /**
   * DFS 遍历
   *
   * @param {number} node - 当前节点
   * @returns {boolean} - false 表示存在环
   */
  const dfs = (node) => {
    // 遇到正在访问的节点 → 存在环
    if (visited[node] === 1) return false;
    // 遇到已完成的节点 → 无需再访问
    if (visited[node] === 2) return true;

    // 标记为正在访问
    visited[node] = 1;

    // 访问所有后继节点
    for (const next of graph[node]) {
      if (!dfs(next)) return false; // 发现环
    }

    // 标记为已完成
    visited[node] = 2;
    // 后序位置：所有子节点都已处理完
    result.push(node);
    return true;
  };

  // 遍历所有节点（处理非连通图）
  for (let i = 0; i < numCourses; i++) {
    if (!dfs(i)) return []; // 存在环
  }

  // 后序遍历的逆序就是拓扑排序
  return result.reverse();
}`,
        explanation: `## DFS 法

### 思路
后序遍历的逆序就是拓扑序列。

### 三种状态
- 0: 未访问
- 1: 访问中（检测环）
- 2: 已完成

### 注意
最后需要反转结果`,
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V + E)",
      },
    ],
  },
];
