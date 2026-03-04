/**
 * 64. 最小路径和 (Minimum Path Sum) - 参考答案
 */

export function minPathSum(grid) {
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
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minPathSum([[[1,3,1],[1,5,1],[4,2,1]]]), 7);
});

test("示例2", () => {
  assert.deepStrictEqual(minPathSum([[[1,2,3],[4,5,6]]]), 12);
});
