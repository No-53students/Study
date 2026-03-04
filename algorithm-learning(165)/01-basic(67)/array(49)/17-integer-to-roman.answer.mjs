/**
 * 12. 整数转罗马数字 (Integer to Roman) - 参考答案
 */

/**
 * @param {number} num
 * @return {string}
 */
export function solution(num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];

  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (num >= values[i]) {
      result += symbols[i];
      num -= values[i];
    }
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("大数", () => {
  assert.deepStrictEqual(solution(3749), "MMMDCCXLIX");
});

test("中等", () => {
  assert.deepStrictEqual(solution(58), "LVIII");
});

test("特殊值", () => {
  assert.deepStrictEqual(solution(1994), "MCMXCIV");
});

test("最小值", () => {
  assert.deepStrictEqual(solution(1), "I");
});

test("9", () => {
  assert.deepStrictEqual(solution(9), "IX");
});
