/**
 * 63. 不同路径 II (Unique Paths II) - 参考答案
 */

export function uniquePathsWithObstacles(obstacleGrid) {
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
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有障碍物", () => {
  assert.deepStrictEqual(uniquePathsWithObstacles([[[0,0,0],[0,1,0],[0,0,0]]]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(uniquePathsWithObstacles([[[0,1],[0,0]]]), 1);
});
