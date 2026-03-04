/**
 * 242. 有效的字母异位词 (Valid Anagram) - 参考答案
 */

export function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(isAnagram("anagram", "nagaram"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isAnagram("rat", "car"), false);
});

test("相同字符串", () => {
  assert.deepStrictEqual(isAnagram("abc", "abc"), true);
});

test("长度不同", () => {
  assert.deepStrictEqual(isAnagram("ab", "abc"), false);
});
