/**
 * 151. 反转字符串中的单词 (Reverse Words in a String) - 参考答案
 */

/**
 * @param {string} s
 * @return {string}
 */
export function solution(s) {
  return s.trim().split(/\\s+/).reverse().join(' ');
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution("the sky is blue"), "blue is sky the");
});

test("首尾空格", () => {
  assert.deepStrictEqual(solution("  hello world  "), "world hello");
});

test("多余空格", () => {
  assert.deepStrictEqual(solution("a good   example"), "example good a");
});

test("单词", () => {
  assert.deepStrictEqual(solution("hello"), "hello");
});

test("两单词", () => {
  assert.deepStrictEqual(solution("  a  b  "), "b a");
});
