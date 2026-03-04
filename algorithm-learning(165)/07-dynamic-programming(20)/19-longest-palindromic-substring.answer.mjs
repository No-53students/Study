/**
 * 5. 最长回文子串 (Longest Palindromic Substring) - 参考答案
 */

export function longestPalindrome(s) {
  const n = s.length;
  if (n < 2) return s;

  let start = 0;
  let maxLen = 1;

  // 中心扩展
  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  };

  for (let i = 0; i < n; i++) {
    const len1 = expandAroundCenter(i, i);     // 奇数长度
    const len2 = expandAroundCenter(i, i + 1); // 偶数长度
    const len = Math.max(len1, len2);

    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLen);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(longestPalindrome("babad"), "bab");
});

test("示例2", () => {
  assert.deepStrictEqual(longestPalindrome("cbbd"), "bb");
});
