/**
 * 200. 岛屿数量 (Number of Islands) - 参考答案
 */

export function numIslands(grid) {
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
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1-单岛", () => {
  assert.deepStrictEqual(numIslands([[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]]), 1);
});

test("示例2-多岛", () => {
  assert.deepStrictEqual(numIslands([[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]]), 3);
});
