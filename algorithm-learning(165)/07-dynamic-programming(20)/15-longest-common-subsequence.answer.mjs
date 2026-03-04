/**
 * 1143. 最长公共子序列 (Longest Common Subsequence) - 参考答案
 */

export function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] 表示 text1[0...i-1] 和 text2[0...j-1] 的 LCS 长度
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(longestCommonSubsequence("abcde", "ace"), 3);
});

test("相同字符串", () => {
  assert.deepStrictEqual(longestCommonSubsequence("abc", "abc"), 3);
});

test("无公共子序列", () => {
  assert.deepStrictEqual(longestCommonSubsequence("abc", "def"), 0);
});
