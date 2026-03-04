/**
 * 120. 三角形最小路径和 (Triangle) - 参考答案
 */

export function minimumTotal(triangle) {
  const n = triangle.length;
  // 从底部开始，dp[j] 表示从底部到当前位置的最小路径和
  const dp = [...triangle[n - 1]];

  // 从倒数第二行开始向上遍历
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j <= i; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
    }
  }

  return dp[0];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minimumTotal([[[2],[3,4],[6,5,7],[4,1,8,3]]]), 11);
});

test("单元素", () => {
  assert.deepStrictEqual(minimumTotal([[[-10]]]), -10);
});
