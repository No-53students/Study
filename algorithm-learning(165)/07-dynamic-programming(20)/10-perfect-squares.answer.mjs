/**
 * 279. 完全平方数 (Perfect Squares) - 参考答案
 */

export function numSquares(n) {
  const dp = new Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
    }
  }

  return dp[n];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(numSquares(12), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(numSquares(13), 2);
});

test("完全平方数", () => {
  assert.deepStrictEqual(numSquares(16), 1);
});

test("小数", () => {
  assert.deepStrictEqual(numSquares(1), 1);
});
