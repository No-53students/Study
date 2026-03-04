/**
 * 76. 最小覆盖子串 (Minimum Window Substring) - 参考答案
 */

export function minWindow(s, t) {
  if (s.length < t.length) return "";

  // 统计 t 中每个字符的数量
  const need = new Map();
  for (const char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }

  const window = new Map();
  let left = 0;
  let valid = 0; // 窗口中满足 need 条件的字符个数
  let start = 0;
  let minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // 扩展窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 收缩窗口
    while (valid === need.size) {
      // 更新最小覆盖子串
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(minWindow("ADOBECODEBANC", "ABC"), "BANC");
});

test("示例2", () => {
  assert.deepStrictEqual(minWindow("a", "a"), "a");
});

test("无解", () => {
  assert.deepStrictEqual(minWindow("a", "aa"), "");
});

test("相同字符串", () => {
  assert.deepStrictEqual(minWindow("abc", "abc"), "abc");
});
