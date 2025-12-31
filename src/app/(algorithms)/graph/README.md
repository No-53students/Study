# 图 (Graph)

## 概念介绍

**图**是由顶点（节点）和边组成的数据结构，用于表示对象之间的关系。

### 图的类型

| 类型 | 描述 | 示例 |
|------|------|------|
| 有向图 | 边有方向 | 关注关系、依赖关系 |
| 无向图 | 边无方向 | 朋友关系、道路 |
| 加权图 | 边有权重 | 距离、费用 |
| 无权图 | 边无权重 | 连通性 |

### 基本术语

- **顶点/节点 (Vertex/Node)**：图中的点
- **边 (Edge)**：连接两个顶点的线
- **度 (Degree)**：与顶点相连的边数
- **入度/出度**：有向图中，指向该顶点/从该顶点出发的边数
- **路径 (Path)**：从一个顶点到另一个顶点的边序列
- **环 (Cycle)**：起点和终点相同的路径
- **连通**：两个顶点之间存在路径

## 图的表示

### 1. 邻接矩阵

```javascript
/**
 * 邻接矩阵：二维数组表示
 * 适合：稠密图、需要快速查询两点是否相连
 * 空间：O(V²)
 */
class GraphMatrix {
  constructor(numVertices) {
    this.numVertices = numVertices;
    this.matrix = Array.from(
      { length: numVertices },
      () => new Array(numVertices).fill(0)
    );
  }

  // 添加边
  addEdge(v1, v2, weight = 1) {
    this.matrix[v1][v2] = weight;
    // 无向图需要双向添加
    // this.matrix[v2][v1] = weight;
  }

  // 移除边
  removeEdge(v1, v2) {
    this.matrix[v1][v2] = 0;
  }

  // 检查是否有边
  hasEdge(v1, v2) {
    return this.matrix[v1][v2] !== 0;
  }

  // 获取邻居
  getNeighbors(v) {
    const neighbors = [];
    for (let i = 0; i < this.numVertices; i++) {
      if (this.matrix[v][i] !== 0) {
        neighbors.push(i);
      }
    }
    return neighbors;
  }
}
```

### 2. 邻接表

```javascript
/**
 * 邻接表：使用 Map 或对象存储
 * 适合：稀疏图、需要遍历邻居
 * 空间：O(V + E)
 */
class GraphList {
  constructor() {
    this.adjacencyList = new Map();
  }

  // 添加顶点
  addVertex(v) {
    if (!this.adjacencyList.has(v)) {
      this.adjacencyList.set(v, []);
    }
  }

  // 添加边
  addEdge(v1, v2, weight = 1) {
    this.addVertex(v1);
    this.addVertex(v2);
    this.adjacencyList.get(v1).push({ node: v2, weight });
    // 无向图需要双向添加
    // this.adjacencyList.get(v2).push({ node: v1, weight });
  }

  // 获取邻居
  getNeighbors(v) {
    return this.adjacencyList.get(v) || [];
  }

  // 检查是否有边
  hasEdge(v1, v2) {
    const neighbors = this.adjacencyList.get(v1);
    return neighbors && neighbors.some(n => n.node === v2);
  }
}
```

## 图的遍历

### 深度优先搜索 (DFS)

```javascript
/**
 * DFS 递归版
 */
function dfsRecursive(graph, start) {
  const visited = new Set();
  const result = [];

  function dfs(node) {
    if (visited.has(node)) return;

    visited.add(node);
    result.push(node);

    for (const neighbor of graph.getNeighbors(node)) {
      dfs(neighbor.node || neighbor);
    }
  }

  dfs(start);
  return result;
}

/**
 * DFS 迭代版（使用栈）
 */
function dfsIterative(graph, start) {
  const visited = new Set();
  const result = [];
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();

    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);

    // 逆序入栈以保持顺序
    const neighbors = graph.getNeighbors(node);
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const neighbor = neighbors[i].node || neighbors[i];
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}
```

### 广度优先搜索 (BFS)

```javascript
/**
 * BFS（使用队列）
 */
function bfs(graph, start) {
  const visited = new Set();
  const result = [];
  const queue = [start];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const neighbor of graph.getNeighbors(node)) {
      const nextNode = neighbor.node || neighbor;
      if (!visited.has(nextNode)) {
        visited.add(nextNode);
        queue.push(nextNode);
      }
    }
  }

  return result;
}
```

## 典型例题

### 岛屿数量 (LeetCode 200)

```javascript
/**
 * 计算岛屿数量：统计连通的 '1' 区域个数
 *
 * 思路：遍历网格，每发现一个 '1'，用 DFS/BFS 标记整个岛屿
 */
function numIslands(grid) {
  if (!grid || !grid.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(i, j) {
    // 边界检查和水域检查
    if (i < 0 || i >= rows || j < 0 || j >= cols || grid[i][j] === '0') {
      return;
    }

    // 标记为已访问
    grid[i][j] = '0';

    // 四个方向搜索
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}
```

### 课程表 (LeetCode 207) - 拓扑排序

```javascript
/**
 * 判断是否能完成所有课程（检测有向图是否有环）
 *
 * 方法1：DFS 检测环
 */
function canFinish(numCourses, prerequisites) {
  // 构建邻接表
  const graph = new Array(numCourses).fill(null).map(() => []);
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  // 状态：0=未访问，1=访问中，2=已完成
  const status = new Array(numCourses).fill(0);

  function hasCycle(node) {
    if (status[node] === 1) return true;   // 在当前路径中遇到，有环
    if (status[node] === 2) return false;  // 已经处理过，无环

    status[node] = 1;  // 标记为访问中

    for (const next of graph[node]) {
      if (hasCycle(next)) return true;
    }

    status[node] = 2;  // 标记为已完成
    return false;
  }

  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }

  return true;
}

/**
 * 方法2：BFS + 入度表（Kahn算法）
 */
function canFinishBFS(numCourses, prerequisites) {
  const graph = new Array(numCourses).fill(null).map(() => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // 将入度为0的节点加入队列
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;

    for (const next of graph[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return count === numCourses;
}
```

### 课程表 II (LeetCode 210) - 拓扑排序输出顺序

```javascript
/**
 * 返回完成所有课程的顺序（拓扑排序）
 */
function findOrder(numCourses, prerequisites) {
  const graph = new Array(numCourses).fill(null).map(() => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (const next of graph[node]) {
      inDegree[next]--;
      if (inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  return result.length === numCourses ? result : [];
}
```

### 克隆图 (LeetCode 133)

```javascript
/**
 * 深拷贝图
 */
function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map();  // 原节点 -> 克隆节点

  function dfs(node) {
    if (visited.has(node)) {
      return visited.get(node);
    }

    // 创建克隆节点
    const clone = new Node(node.val);
    visited.set(node, clone);

    // 克隆邻居
    for (const neighbor of node.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}
```

### 单词接龙 (LeetCode 127) - 最短路径

```javascript
/**
 * 从 beginWord 变换到 endWord 的最短变换序列长度
 * 每次只能变一个字母，中间词必须在字典中
 */
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, level] = queue.shift();

    if (word === endWord) return level;

    // 尝试改变每个位置的字母
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {  // a-z
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }

  return 0;
}

/**
 * 优化：双向 BFS
 */
function ladderLengthBidirectional(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  let beginSet = new Set([beginWord]);
  let endSet = new Set([endWord]);
  let level = 1;

  while (beginSet.size > 0 && endSet.size > 0) {
    // 从较小的集合开始搜索
    if (beginSet.size > endSet.size) {
      [beginSet, endSet] = [endSet, beginSet];
    }

    const nextSet = new Set();

    for (const word of beginSet) {
      for (let i = 0; i < word.length; i++) {
        for (let c = 97; c <= 122; c++) {
          const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

          if (endSet.has(newWord)) {
            return level + 1;
          }

          if (wordSet.has(newWord)) {
            nextSet.add(newWord);
            wordSet.delete(newWord);
          }
        }
      }
    }

    beginSet = nextSet;
    level++;
  }

  return 0;
}
```

### 被围绕的区域 (LeetCode 130)

```javascript
/**
 * 将被 'X' 围绕的 'O' 替换为 'X'
 *
 * 思路：从边界的 'O' 开始 DFS，标记不被围绕的 'O'
 */
function solve(board) {
  if (!board || !board.length) return;

  const rows = board.length;
  const cols = board[0].length;

  // 标记与边界相连的 'O'
  function dfs(i, j) {
    if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] !== 'O') {
      return;
    }

    board[i][j] = '#';  // 临时标记

    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }

  // 从四条边界开始搜索
  for (let i = 0; i < rows; i++) {
    dfs(i, 0);
    dfs(i, cols - 1);
  }
  for (let j = 0; j < cols; j++) {
    dfs(0, j);
    dfs(rows - 1, j);
  }

  // 恢复和替换
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';  // 被围绕的
      } else if (board[i][j] === '#') {
        board[i][j] = 'O';  // 与边界相连的
      }
    }
  }
}
```

## 最短路径算法

### Dijkstra 算法（单源最短路径，非负权重）

```javascript
/**
 * Dijkstra 算法
 *
 * 时间复杂度：O((V + E) log V)（使用优先队列）
 */
function dijkstra(graph, start) {
  const distances = new Map();
  const pq = new PriorityQueue((a, b) => a.dist - b.dist);

  // 初始化距离
  for (const vertex of graph.adjacencyList.keys()) {
    distances.set(vertex, Infinity);
  }
  distances.set(start, 0);

  pq.push({ node: start, dist: 0 });

  while (!pq.isEmpty()) {
    const { node, dist } = pq.pop();

    // 如果已经找到更短路径，跳过
    if (dist > distances.get(node)) continue;

    for (const { node: neighbor, weight } of graph.getNeighbors(node)) {
      const newDist = dist + weight;

      if (newDist < distances.get(neighbor)) {
        distances.set(neighbor, newDist);
        pq.push({ node: neighbor, dist: newDist });
      }
    }
  }

  return distances;
}
```

### Bellman-Ford 算法（可处理负权重）

```javascript
/**
 * Bellman-Ford 算法
 *
 * 时间复杂度：O(V × E)
 */
function bellmanFord(graph, start, numVertices) {
  const distances = new Array(numVertices).fill(Infinity);
  distances[start] = 0;

  // 松弛 V-1 次
  for (let i = 0; i < numVertices - 1; i++) {
    for (const [u, neighbors] of graph.adjacencyList) {
      for (const { node: v, weight } of neighbors) {
        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
        }
      }
    }
  }

  // 检测负环
  for (const [u, neighbors] of graph.adjacencyList) {
    for (const { node: v, weight } of neighbors) {
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        return null;  // 存在负环
      }
    }
  }

  return distances;
}
```

## 并查集 (Union-Find)

```javascript
/**
 * 并查集：用于处理不相交集合的合并和查询
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.count = n;  // 连通分量数
  }

  // 查找根节点（带路径压缩）
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  // 合并两个集合（按秩合并）
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.count--;
    return true;
  }

  // 检查是否连通
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// 使用示例：冗余连接 (LeetCode 684)
function findRedundantConnection(edges) {
  const uf = new UnionFind(edges.length + 1);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) {
      return [u, v];  // 添加这条边会形成环
    }
  }

  return [];
}
```

## 前端应用场景

### 1. 页面路由依赖分析

```javascript
/**
 * 分析页面间的导航依赖
 */
class RouteGraph {
  constructor() {
    this.routes = new Map();
  }

  addRoute(from, to) {
    if (!this.routes.has(from)) {
      this.routes.set(from, []);
    }
    this.routes.get(from).push(to);
  }

  // 检测循环重定向
  hasCircularRedirect() {
    const visited = new Set();
    const recursionStack = new Set();

    const dfs = (route) => {
      if (recursionStack.has(route)) return true;
      if (visited.has(route)) return false;

      visited.add(route);
      recursionStack.add(route);

      for (const next of this.routes.get(route) || []) {
        if (dfs(next)) return true;
      }

      recursionStack.delete(route);
      return false;
    };

    for (const route of this.routes.keys()) {
      if (dfs(route)) return true;
    }

    return false;
  }
}
```

### 2. 组件依赖分析

```javascript
/**
 * 分析组件间的依赖关系，确定加载顺序
 */
function getComponentLoadOrder(dependencies) {
  // dependencies: { componentA: ['componentB', 'componentC'], ... }
  const graph = new Map();
  const inDegree = new Map();

  // 构建图
  for (const [component, deps] of Object.entries(dependencies)) {
    if (!inDegree.has(component)) inDegree.set(component, 0);

    for (const dep of deps) {
      if (!graph.has(dep)) graph.set(dep, []);
      graph.get(dep).push(component);

      inDegree.set(component, (inDegree.get(component) || 0) + 1);
      if (!inDegree.has(dep)) inDegree.set(dep, 0);
    }
  }

  // 拓扑排序
  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const next of graph.get(node) || []) {
      inDegree.set(next, inDegree.get(next) - 1);
      if (inDegree.get(next) === 0) {
        queue.push(next);
      }
    }
  }

  return order;
}
```

### 3. 社交关系网络

```javascript
/**
 * 好友推荐：找出共同好友数量最多的非好友用户
 */
function recommendFriends(userId, friendships) {
  const friends = new Map();

  // 构建好友关系图
  for (const [a, b] of friendships) {
    if (!friends.has(a)) friends.set(a, new Set());
    if (!friends.has(b)) friends.set(b, new Set());
    friends.get(a).add(b);
    friends.get(b).add(a);
  }

  const myFriends = friends.get(userId) || new Set();
  const mutualCount = new Map();

  // 统计共同好友
  for (const friend of myFriends) {
    for (const friendOfFriend of friends.get(friend) || []) {
      if (friendOfFriend !== userId && !myFriends.has(friendOfFriend)) {
        mutualCount.set(friendOfFriend, (mutualCount.get(friendOfFriend) || 0) + 1);
      }
    }
  }

  // 按共同好友数排序
  return [...mutualCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([user, count]) => ({ user, mutualFriends: count }));
}
```

## 复杂度总结

| 算法 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|---------|
| DFS | O(V + E) | O(V) | 路径搜索、连通性 |
| BFS | O(V + E) | O(V) | 最短路径（无权） |
| Dijkstra | O((V+E)logV) | O(V) | 最短路径（非负权） |
| Bellman-Ford | O(VE) | O(V) | 最短路径（可负权） |
| 拓扑排序 | O(V + E) | O(V) | 依赖关系 |
| 并查集 | O(α(n)) ≈ O(1) | O(V) | 连通分量 |

## 总结

图算法的核心：

1. **遍历**：DFS（深度优先）和 BFS（广度优先）
2. **最短路径**：Dijkstra（非负权）、Bellman-Ford（可负权）
3. **拓扑排序**：处理依赖关系、检测环
4. **并查集**：处理连通性问题

选择建议：
- 求连通性 → DFS/并查集
- 无权最短路径 → BFS
- 有权最短路径 → Dijkstra
- 检测环 → DFS（有向图）/ 并查集（无向图）
- 依赖排序 → 拓扑排序
