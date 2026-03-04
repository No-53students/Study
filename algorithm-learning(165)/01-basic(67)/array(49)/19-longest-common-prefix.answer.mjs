/**
 * 14. 最长公共前缀 (Longest Common Prefix) - 参考答案
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
export function solution(strs) {
  if (strs.length === 0) return "";

  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有公共前缀", () => {
  assert.deepStrictEqual(solution(["flower","flow","flight"]), "fl");
});

test("无公共前缀", () => {
  assert.deepStrictEqual(solution(["dog","racecar","car"]), "");
});

test("单字符串", () => {
  assert.deepStrictEqual(solution(["a"]), "a");
});

test("相同字符串", () => {
  assert.deepStrictEqual(solution(["aa","aa","aa"]), "aa");
});

test("空字符串", () => {
  assert.deepStrictEqual(solution(["",""]), "");
});
