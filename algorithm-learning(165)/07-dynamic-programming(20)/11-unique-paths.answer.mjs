/**
 * 62. 不同路径 (Unique Paths) - 参考答案
 */

export function uniquePaths(m, n) {
  // dp[j] 表示到达第 i 行第 j 列的路径数
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1];
    }
  }

  return dp[n - 1];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("3x7网格", () => {
  assert.deepStrictEqual(uniquePaths(3, 7), 28);
});

test("3x2网格", () => {
  assert.deepStrictEqual(uniquePaths(3, 2), 3);
});

test("7x3网格", () => {
  assert.deepStrictEqual(uniquePaths(7, 3), 28);
});
