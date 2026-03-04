/**
 * 58. 最后一个单词的长度 (Length of Last Word) - 参考答案
 */

/**
 * @param {string} s
 * @return {number}
 */
export function solution(s) {
  let end = s.length - 1;

  // 跳过末尾空格
  while (end >= 0 && s[end] === ' ') {
    end--;
  }

  // 计算单词长度
  let length = 0;
  while (end >= 0 && s[end] !== ' ') {
    length++;
    end--;
  }

  return length;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution("Hello World"), 5);
});

test("末尾有空格", () => {
  assert.deepStrictEqual(solution("   fly me   to   the moon  "), 4);
});

test("无多余空格", () => {
  assert.deepStrictEqual(solution("luffy is still joyboy"), 6);
});

test("单个单词", () => {
  assert.deepStrictEqual(solution("a"), 1);
});

test("单个单词带空格", () => {
  assert.deepStrictEqual(solution("  hello  "), 5);
});
