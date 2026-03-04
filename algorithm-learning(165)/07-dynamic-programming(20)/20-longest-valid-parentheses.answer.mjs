/**
 * 32. 最长有效括号 (Longest Valid Parentheses) - 参考答案
 */

export function longestValidParentheses(s) {
  const n = s.length;
  if (n < 2) return 0;

  // dp[i] 表示以 s[i] 结尾的最长有效括号长度
  const dp = new Array(n).fill(0);
  let maxLen = 0;

  for (let i = 1; i < n; i++) {
    if (s[i] === ')') {
      if (s[i - 1] === '(') {
        // ...() 形式
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] - 1 >= 0 && s[i - dp[i - 1] - 1] === '(') {
        // ...)) 形式，需要找到匹配的 (
        dp[i] = dp[i - 1] + 2 + (i - dp[i - 1] - 2 >= 0 ? dp[i - dp[i - 1] - 2] : 0);
      }
    }
    maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(longestValidParentheses("(()"), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(longestValidParentheses(")()())"), 4);
});

test("空字符串", () => {
  assert.deepStrictEqual(longestValidParentheses(""), 0);
});
