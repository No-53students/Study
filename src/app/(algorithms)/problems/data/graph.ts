import { Problem } from "../types";

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
        code: `function numIslands(grid) {
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
        code: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;
  let count = 0;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  const bfs = (startI, startJ) => {
    const queue = [[startI, startJ]];
    grid[startI][startJ] = '0';

    while (queue.length > 0) {
      const [i, j] = queue.shift();

      for (const [di, dj] of directions) {
        const ni = i + di;
        const nj = j + dj;

        if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === '1') {
          grid[ni][nj] = '0'; // 入队时就标记
          queue.push([ni, nj]);
        }
      }
    }
  };

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
        code: `function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const m = grid.length;
  const n = grid[0].length;

  // 并查集
  const parent = new Array(m * n).fill(0).map((_, i) => i);
  const rank = new Array(m * n).fill(0);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]); // 路径压缩
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
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

  // 遍历网格，合并相邻陆地
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === '1') {
        const idx = i * n + j;
        // 只需要检查右边和下边（避免重复合并）
        if (j + 1 < n && grid[i][j + 1] === '1') {
          union(idx, idx + 1);
        }
        if (i + 1 < m && grid[i + 1][j] === '1') {
          union(idx, idx + n);
        }
      }
    }
  }

  // 统计不同的根
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
        code: `function solve(board) {
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
        code: `function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;
  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  // 从边界的 O 开始 BFS
  const queue = [];

  // 收集边界上的 O
  for (let i = 0; i < m; i++) {
    if (board[i][0] === 'O') queue.push([i, 0]);
    if (board[i][n - 1] === 'O') queue.push([i, n - 1]);
  }
  for (let j = 1; j < n - 1; j++) {
    if (board[0][j] === 'O') queue.push([0, j]);
    if (board[m - 1][j] === 'O') queue.push([m - 1, j]);
  }

  // BFS 标记
  while (queue.length > 0) {
    const [i, j] = queue.shift();
    if (board[i][j] !== 'O') continue;

    board[i][j] = '#';

    for (const [di, dj] of directions) {
      const ni = i + di;
      const nj = j + dj;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && board[ni][nj] === 'O') {
        queue.push([ni, nj]);
      }
    }
  }

  // 恢复
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') board[i][j] = 'X';
      else if (board[i][j] === '#') board[i][j] = 'O';
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
        code: `function solve(board) {
  if (!board || board.length === 0) return;

  const m = board.length;
  const n = board[0].length;
  const dummy = m * n; // 虚拟节点，代表边界连通

  const parent = new Array(m * n + 1).fill(0).map((_, i) => i);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    parent[find(x)] = find(y);
  };

  // 遍历网格
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O') {
        const idx = i * n + j;

        // 边界的 O 与 dummy 合并
        if (i === 0 || i === m - 1 || j === 0 || j === n - 1) {
          union(idx, dummy);
        }

        // 与右边和下边的 O 合并
        if (j + 1 < n && board[i][j + 1] === 'O') {
          union(idx, idx + 1);
        }
        if (i + 1 < m && board[i + 1][j] === 'O') {
          union(idx, idx + n);
        }
      }
    }
  }

  // 不与 dummy 连通的 O 变为 X
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'O' && find(i * n + j) !== find(dummy)) {
        board[i][j] = 'X';
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
        code: `function canFinish(numCourses, prerequisites) {
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
        code: `function canFinish(numCourses, prerequisites) {
  // 构建邻接表
  const graph = Array.from({ length: numCourses }, () => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  // 状态：0-未访问，1-访问中，2-已完成
  const state = new Array(numCourses).fill(0);

  const hasCycle = (node) => {
    if (state[node] === 1) return true;  // 发现环
    if (state[node] === 2) return false; // 已处理

    state[node] = 1; // 标记为访问中

    for (const next of graph[node]) {
      if (hasCycle(next)) return true;
    }

    state[node] = 2; // 标记为已完成
    return false;
  };

  // 检查每个节点
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }

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
        code: `class Trie {
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
        code: `class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  search(word) {
    const node = this._searchPrefix(word);
    return node !== null && node.isEnd;
  }

  startsWith(prefix) {
    return this._searchPrefix(prefix) !== null;
  }

  _searchPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
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
        code: `class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  _charToIndex(char) {
    return char.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      const idx = this._charToIndex(char);
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      const idx = this._charToIndex(char);
      if (!node.children[idx]) {
        return false;
      }
      node = node.children[idx];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      const idx = this._charToIndex(char);
      if (!node.children[idx]) {
        return false;
      }
      node = node.children[idx];
    }
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
];
