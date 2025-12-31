# 回溯算法 (Backtracking)

## 概念介绍

**回溯算法**是一种通过穷举所有可能的候选解来找出所有解的算法。当发现当前候选解不能成为有效解时，就"回溯"返回上一步，尝试其他选择。

### 核心思想

回溯 = DFS + 剪枝

1. **选择**：做出一个选择
2. **探索**：递归探索这个选择的后续
3. **撤销**：回溯时撤销这个选择，尝试其他选择

### 适用场景

- 排列、组合、子集问题
- 棋盘问题（N皇后、数独）
- 路径搜索问题
- 分割问题

## 回溯模板

```javascript
/**
 * 回溯通用模板
 */
function backtrack(路径, 选择列表) {
  if (满足结束条件) {
    result.push(路径的拷贝);
    return;
  }

  for (const 选择 of 选择列表) {
    // 剪枝：跳过不合法的选择
    if (不满足约束条件) continue;

    // 做选择
    路径.push(选择);
    标记选择为已使用;

    // 递归
    backtrack(路径, 选择列表);

    // 撤销选择
    路径.pop();
    标记选择为未使用;
  }
}
```

## 排列问题

### 全排列 (LeetCode 46)

```javascript
/**
 * 全排列：返回所有可能的排列
 *
 * 思路：
 * - 每个位置可以选择任意未使用的数字
 * - 使用 used 数组标记已使用的数字
 *
 * 时间复杂度：O(n × n!)
 * 空间复杂度：O(n)
 */
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  function backtrack(path) {
    // 结束条件：路径长度等于数组长度
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      // 跳过已使用的数字
      if (used[i]) continue;

      // 做选择
      path.push(nums[i]);
      used[i] = true;

      // 递归
      backtrack(path);

      // 撤销选择
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

// 示例
permute([1, 2, 3]);
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

### 全排列 II (LeetCode 47) - 含重复元素

```javascript
/**
 * 全排列 II：包含重复数字的全排列，结果不能重复
 *
 * 关键：相同元素只在第一次出现时选择
 * 剪枝条件：nums[i] === nums[i-1] && !used[i-1]
 */
function permuteUnique(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);

  // 排序使相同元素相邻
  nums.sort((a, b) => a - b);

  function backtrack(path) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;

      // 剪枝：跳过重复元素
      // 当前元素与前一个相同，且前一个未使用（说明是在同一层）
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      used[i] = true;

      backtrack(path);

      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}
```

## 组合问题

### 组合 (LeetCode 77)

```javascript
/**
 * 组合：从 n 个数中选 k 个数的所有组合
 *
 * 与排列的区别：组合不考虑顺序
 * 关键：通过 start 参数避免重复选择
 */
function combine(n, k) {
  const result = [];

  function backtrack(start, path) {
    // 结束条件
    if (path.length === k) {
      result.push([...path]);
      return;
    }

    // 剪枝：剩余元素不够时提前结束
    // 还需要 k - path.length 个元素
    // 最多只能从 start 选到 n
    for (let i = start; i <= n - (k - path.length) + 1; i++) {
      path.push(i);
      backtrack(i + 1, path);  // 从 i+1 开始，避免重复
      path.pop();
    }
  }

  backtrack(1, []);
  return result;
}

// 示例
combine(4, 2);  // [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]
```

### 组合总和 (LeetCode 39)

```javascript
/**
 * 组合总和：找出所有使数字和为 target 的组合，每个数字可以重复使用
 */
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, path, sum) {
    // 找到有效组合
    if (sum === target) {
      result.push([...path]);
      return;
    }

    // 超过目标，剪枝
    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      path.push(candidates[i]);
      // 可以重复使用，所以从 i 开始而不是 i+1
      backtrack(i, path, sum + candidates[i]);
      path.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}
```

### 组合总和 II (LeetCode 40) - 元素只能用一次

```javascript
/**
 * 组合总和 II：每个数字只能使用一次，不能有重复组合
 */
function combinationSum2(candidates, target) {
  const result = [];
  candidates.sort((a, b) => a - b);

  function backtrack(start, path, sum) {
    if (sum === target) {
      result.push([...path]);
      return;
    }

    if (sum > target) return;

    for (let i = start; i < candidates.length; i++) {
      // 剪枝：跳过同层重复元素
      if (i > start && candidates[i] === candidates[i - 1]) {
        continue;
      }

      path.push(candidates[i]);
      backtrack(i + 1, path, sum + candidates[i]);  // i+1 表示不能重复使用
      path.pop();
    }
  }

  backtrack(0, [], 0);
  return result;
}
```

## 子集问题

### 子集 (LeetCode 78)

```javascript
/**
 * 子集：返回所有可能的子集
 *
 * 思路1：回溯，每个元素可选可不选
 */
function subsets(nums) {
  const result = [];

  function backtrack(start, path) {
    // 每个路径都是一个有效子集
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}

/**
 * 思路2：迭代，依次加入每个元素
 */
function subsetsIterative(nums) {
  const result = [[]];

  for (const num of nums) {
    const len = result.length;
    for (let i = 0; i < len; i++) {
      result.push([...result[i], num]);
    }
  }

  return result;
}

/**
 * 思路3：位运算
 */
function subsetsBit(nums) {
  const result = [];
  const n = nums.length;

  for (let mask = 0; mask < (1 << n); mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        subset.push(nums[i]);
      }
    }
    result.push(subset);
  }

  return result;
}
```

### 子集 II (LeetCode 90) - 含重复元素

```javascript
/**
 * 子集 II：包含重复元素，结果不能有重复子集
 */
function subsetsWithDup(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  function backtrack(start, path) {
    result.push([...path]);

    for (let i = start; i < nums.length; i++) {
      // 跳过同层重复
      if (i > start && nums[i] === nums[i - 1]) {
        continue;
      }

      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}
```

## 分割问题

### 分割回文串 (LeetCode 131)

```javascript
/**
 * 分割回文串：返回所有可能的分割方案，使每个子串都是回文
 */
function partition(s) {
  const result = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  function backtrack(start, path) {
    // 遍历到末尾，找到一个有效分割
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      // 当前子串是回文才继续
      if (isPalindrome(s, start, end)) {
        path.push(s.substring(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}
```

### 复原 IP 地址 (LeetCode 93)

```javascript
/**
 * 复原 IP 地址：将字符串分割成有效的 IP 地址
 */
function restoreIpAddresses(s) {
  const result = [];

  function isValid(segment) {
    if (segment.length > 3) return false;
    if (segment.length > 1 && segment[0] === '0') return false;  // 前导零
    const num = parseInt(segment);
    return num >= 0 && num <= 255;
  }

  function backtrack(start, path) {
    // 已经有4段，且正好用完所有字符
    if (path.length === 4 && start === s.length) {
      result.push(path.join('.'));
      return;
    }

    // 已经4段但还有剩余，或不够4段
    if (path.length === 4 || start === s.length) {
      return;
    }

    // 每段最多3个字符
    for (let len = 1; len <= 3 && start + len <= s.length; len++) {
      const segment = s.substring(start, start + len);
      if (isValid(segment)) {
        path.push(segment);
        backtrack(start + len, path);
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return result;
}
```

## 棋盘问题

### N皇后 (LeetCode 51)

```javascript
/**
 * N皇后：在 n×n 棋盘上放置 n 个皇后，使它们互不攻击
 *
 * 皇后可以攻击同行、同列、同对角线的棋子
 */
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => new Array(n).fill('.'));

  // 检查是否可以在 (row, col) 放置皇后
  function isValid(row, col) {
    // 检查列
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }

    // 检查左上对角线
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }

    // 检查右上对角线
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }

    return true;
  }

  function backtrack(row) {
    // 放置完所有行
    if (row === n) {
      result.push(board.map(row => row.join('')));
      return;
    }

    for (let col = 0; col < n; col++) {
      if (!isValid(row, col)) continue;

      board[row][col] = 'Q';
      backtrack(row + 1);
      board[row][col] = '.';
    }
  }

  backtrack(0);
  return result;
}
```

### 解数独 (LeetCode 37)

```javascript
/**
 * 解数独
 */
function solveSudoku(board) {
  function isValid(row, col, num) {
    // 检查行
    for (let j = 0; j < 9; j++) {
      if (board[row][j] === num) return false;
    }

    // 检查列
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }

    // 检查 3×3 宫格
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }

    return true;
  }

  function solve() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] !== '.') continue;

        for (let num = 1; num <= 9; num++) {
          const char = num.toString();
          if (isValid(i, j, char)) {
            board[i][j] = char;

            if (solve()) return true;

            board[i][j] = '.';
          }
        }

        return false;  // 没有有效数字
      }
    }

    return true;  // 所有格子都填完
  }

  solve();
}
```

## 单词搜索

### 单词搜索 (LeetCode 79)

```javascript
/**
 * 单词搜索：在网格中搜索单词
 */
function exist(board, word) {
  const m = board.length;
  const n = board[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  function backtrack(i, j, k) {
    // 找到完整单词
    if (k === word.length) return true;

    // 边界检查或字符不匹配
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) {
      return false;
    }

    // 标记已访问
    const temp = board[i][j];
    board[i][j] = '#';

    // 四个方向搜索
    for (const [di, dj] of directions) {
      if (backtrack(i + di, j + dj, k + 1)) {
        return true;
      }
    }

    // 恢复
    board[i][j] = temp;
    return false;
  }

  // 从每个位置开始搜索
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (backtrack(i, j, 0)) return true;
    }
  }

  return false;
}
```

## 前端应用场景

### 1. 表单字段的所有组合

```javascript
/**
 * 生成表单筛选条件的所有组合
 */
function generateFilterCombinations(filters) {
  const result = [];

  function backtrack(index, current) {
    result.push({ ...current });

    for (let i = index; i < filters.length; i++) {
      const { field, values } = filters[i];
      for (const value of values) {
        current[field] = value;
        backtrack(i + 1, current);
      }
      delete current[field];
    }
  }

  backtrack(0, {});
  return result;
}

// 使用示例
const filters = [
  { field: 'color', values: ['red', 'blue'] },
  { field: 'size', values: ['S', 'M', 'L'] }
];
generateFilterCombinations(filters);
```

### 2. 路径查找

```javascript
/**
 * 查找从源节点到目标节点的所有路径
 */
function findAllPaths(graph, source, target) {
  const result = [];

  function backtrack(node, path, visited) {
    if (node === target) {
      result.push([...path]);
      return;
    }

    for (const neighbor of graph[node] || []) {
      if (visited.has(neighbor)) continue;

      path.push(neighbor);
      visited.add(neighbor);

      backtrack(neighbor, path, visited);

      path.pop();
      visited.delete(neighbor);
    }
  }

  backtrack(source, [source], new Set([source]));
  return result;
}
```

### 3. 权限组合检查

```javascript
/**
 * 找出满足权限要求的最小角色组合
 */
function findMinRoleCombination(roles, requiredPermissions) {
  let minResult = null;

  function backtrack(index, selectedRoles, currentPermissions) {
    // 满足所有权限
    if (requiredPermissions.every(p => currentPermissions.has(p))) {
      if (!minResult || selectedRoles.length < minResult.length) {
        minResult = [...selectedRoles];
      }
      return;
    }

    // 剪枝：已经超过当前最优解
    if (minResult && selectedRoles.length >= minResult.length) {
      return;
    }

    for (let i = index; i < roles.length; i++) {
      const role = roles[i];
      selectedRoles.push(role.name);
      role.permissions.forEach(p => currentPermissions.add(p));

      backtrack(i + 1, selectedRoles, currentPermissions);

      selectedRoles.pop();
      // 注意：这里简化了权限的移除逻辑
    }
  }

  backtrack(0, [], new Set());
  return minResult;
}
```

## 剪枝技巧

| 剪枝类型 | 描述 | 示例 |
|---------|------|------|
| 可行性剪枝 | 提前判断当前路径不可能产生解 | 组合总和超过目标 |
| 最优性剪枝 | 当前路径不可能比已有解更优 | 已有更短的路径 |
| 排序剪枝 | 通过排序避免重复 | 子集/组合去重 |
| 记忆化剪枝 | 记录已访问状态 | 避免重复搜索 |

## 复杂度分析

| 问题类型 | 时间复杂度 | 空间复杂度 |
|---------|-----------|-----------|
| 全排列 | O(n × n!) | O(n) |
| 组合 | O(C(n,k) × k) | O(k) |
| 子集 | O(n × 2^n) | O(n) |
| N皇后 | O(n!) | O(n) |

## 总结

回溯算法的要点：

1. **确定选择列表**：每一步可以做什么选择
2. **确定结束条件**：什么时候得到一个完整解
3. **做选择和撤销选择**：前进和回溯
4. **剪枝优化**：减少不必要的搜索

回溯 vs DP：
- 回溯：穷举所有可能，找所有解
- DP：找最优解，利用子问题重叠性
