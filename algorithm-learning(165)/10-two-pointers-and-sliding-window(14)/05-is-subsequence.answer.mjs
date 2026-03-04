/**
 * 392. 判断子序列 (Is Subsequence) - 参考答案
 */

export function isSubsequence(s, t) {
  let i = 0; // s 的指针
  let j = 0; // t 的指针

  while (i < s.length && j < t.length) {
    if (s[i] === t[j]) {
      i++;
    }
    j++;
  }

  // 如果 i 到达 s 的末尾，说明 s 是 t 的子序列
  return i === s.length;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(isSubsequence("abc", "ahbgdc"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isSubsequence("axc", "ahbgdc"), false);
});

test("空字符串", () => {
  assert.deepStrictEqual(isSubsequence("", "ahbgdc"), true);
});

test("相同字符串", () => {
  assert.deepStrictEqual(isSubsequence("abc", "abc"), true);
});

test("s更长", () => {
  assert.deepStrictEqual(isSubsequence("abcd", "abc"), false);
});
