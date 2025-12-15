# 搜索算法

## 概述

搜索算法用于在数据结构中查找特定元素或遍历所有元素。主要包括：

- **线性搜索**: O(n)，适用于无序数据
- **二分搜索**: O(log n)，要求数据有序
- **DFS**: 深度优先搜索
- **BFS**: 广度优先搜索

## 二分查找 (Binary Search)

### 基本实现

```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

### 查找左边界

```javascript
// 找第一个 >= target 的位置
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left;
}
```

### 查找右边界

```javascript
// 找最后一个 <= target 的位置
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left - 1;
}
```

### 面试题: 在排序数组中查找元素的第一个和最后一个位置

```javascript
// LeetCode 34
function searchRange(nums, target) {
  const left = lowerBound(nums, target);

  if (left === nums.length || nums[left] !== target) {
    return [-1, -1];
  }

  const right = upperBound(nums, target);
  return [left, right];
}
```

### 旋转排序数组

```javascript
// LeetCode 33
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // 判断哪边是有序的
    if (nums[left] <= nums[mid]) {
      // 左边有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右边有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
```

## DFS 深度优先搜索

### 递归实现

```javascript
function dfs(node, visited = new Set()) {
  if (!node || visited.has(node)) return;

  visited.add(node);
  console.log(node.val);

  for (const neighbor of node.neighbors) {
    dfs(neighbor, visited);
  }
}
```

### 迭代实现（栈）

```javascript
function dfsIterative(root) {
  if (!root) return;

  const stack = [root];
  const visited = new Set();

  while (stack.length) {
    const node = stack.pop();

    if (visited.has(node)) continue;
    visited.add(node);

    console.log(node.val);

    // 注意：先右后左入栈，保证左边先处理
    for (let i = node.neighbors.length - 1; i >= 0; i--) {
      stack.push(node.neighbors[i]);
    }
  }
}
```

### 回溯模板

```javascript
function backtrack(path, choices) {
  // 终止条件
  if (满足条件) {
    result.push([...path]);
    return;
  }

  for (const choice of choices) {
    // 做选择
    path.push(choice);

    // 递归
    backtrack(path, 新的choices);

    // 撤销选择
    path.pop();
  }
}
```

### 面试题: 全排列

```javascript
// LeetCode 46
function permute(nums) {
  const result = [];

  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      path.push(nums[i]);
      used[i] = true;

      backtrack(path, used);

      path.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}
```

### 面试题: 岛屿数量

```javascript
// LeetCode 200
function numIslands(grid) {
  if (!grid.length) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') {
      return;
    }

    grid[r][c] = '0'; // 标记已访问

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
```

## BFS 广度优先搜索

### 基本实现

```javascript
function bfs(root) {
  if (!root) return;

  const queue = [root];
  const visited = new Set([root]);

  while (queue.length) {
    const node = queue.shift();
    console.log(node.val);

    for (const neighbor of node.neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

### 层序遍历

```javascript
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length) {
    const level = [];
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

### 面试题: 二叉树的最小深度

```javascript
// LeetCode 111
function minDepth(root) {
  if (!root) return 0;

  const queue = [[root, 1]];

  while (queue.length) {
    const [node, depth] = queue.shift();

    // 找到叶子节点
    if (!node.left && !node.right) {
      return depth;
    }

    if (node.left) queue.push([node.left, depth + 1]);
    if (node.right) queue.push([node.right, depth + 1]);
  }
}
```

### 面试题: 单词接龙

```javascript
// LeetCode 127
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);

  while (queue.length) {
    const [word, level] = queue.shift();

    if (word === endWord) return level;

    // 尝试改变每个位置的字母
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
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
```

## DFS vs BFS

| 特性 | DFS | BFS |
|------|-----|-----|
| 数据结构 | 栈/递归 | 队列 |
| 空间复杂度 | O(h) 树高 | O(w) 最大宽度 |
| 最短路径 | 否 | 是（无权图） |
| 适用场景 | 路径存在性、回溯 | 最短路径、层级问题 |

### 选择建议

**使用 DFS**:
- 需要遍历所有路径
- 回溯问题（排列、组合）
- 空间受限（树很宽）
- 拓扑排序
- 检测环

**使用 BFS**:
- 找最短路径
- 层级遍历
- 找最近的节点
- 空间受限（树很深）

## 复杂度总结

| 算法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 线性搜索 | O(n) | O(1) |
| 二分搜索 | O(log n) | O(1) |
| DFS | O(V + E) | O(V) |
| BFS | O(V + E) | O(V) |

> V = 顶点数，E = 边数

## 面试技巧

1. **二分查找**：注意边界条件，`left <= right` vs `left < right`
2. **DFS**：熟练掌握递归和迭代两种写法
3. **BFS**：记住层序遍历模板
4. **回溯**：理解"做选择-递归-撤销选择"的模式
5. **图搜索**：记得用 visited 防止重复访问
