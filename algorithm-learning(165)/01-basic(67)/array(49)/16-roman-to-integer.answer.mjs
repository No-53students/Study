/**
 * 13. 罗马数字转整数 (Roman to Integer) - 参考答案
 */

/**
 * @param {string} s
 * @return {number}
 */
export function solution(s) {
  const map = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50,
    'C': 100, 'D': 500, 'M': 1000
  };

  let result = 0;
  for (let i = 0; i < s.length; i++) {
    if (i < s.length - 1 && map[s[i]] < map[s[i + 1]]) {
      result -= map[s[i]];
    } else {
      result += map[s[i]];
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("简单加法", () => {
  assert.deepStrictEqual(solution("III"), 3);
});

test("减法IV", () => {
  assert.deepStrictEqual(solution("IV"), 4);
});

test("减法IX", () => {
  assert.deepStrictEqual(solution("IX"), 9);
});

test("混合", () => {
  assert.deepStrictEqual(solution("LVIII"), 58);
});

test("复杂", () => {
  assert.deepStrictEqual(solution("MCMXCIV"), 1994);
});
