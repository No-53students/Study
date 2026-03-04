/**
 * 3. 无重复字符的最长子串 (Longest Substring Without Repeating Characters) - 参考答案
 */

export function lengthOfLongestSubstring(s) {
  const charIndex = new Map(); // 记录字符最后出现的位置
  let maxLen = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果字符已存在且在窗口内，移动左指针
    if (charIndex.has(char) && charIndex.get(char) >= left) {
      left = charIndex.get(char) + 1;
    }

    // 更新字符位置
    charIndex.set(char, right);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("abcabcbb"), 3);
});

test("全相同", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("bbbbb"), 1);
});

test("示例3", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("pwwkew"), 3);
});

test("空字符串", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring(""), 0);
});

test("单字符", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("a"), 1);
});
