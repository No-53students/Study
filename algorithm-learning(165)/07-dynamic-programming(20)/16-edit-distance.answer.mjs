/**
 * 72. 编辑距离 (Edit Distance) - 参考答案
 */

export function minDistance(word1, word2) {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] 表示 word1[0...i-1] 转换为 word2[0...j-1] 的最少操作数
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // 边界条件
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1,     // 插入
          dp[i - 1][j - 1] + 1  // 替换
        );
      }
    }
  }

  return dp[m][n];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minDistance("horse", "ros"), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(minDistance("intention", "execution"), 5);
});
