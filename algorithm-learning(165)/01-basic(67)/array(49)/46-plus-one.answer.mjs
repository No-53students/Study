/**
 * 66. 加一 (Plus One) - 参考答案
 */

export function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  // 所有位都是 9 的情况
  return [1, ...digits];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(plusOne([[1,2,3]]), [1,2,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(plusOne([[4,3,2,1]]), [4,3,2,2]);
});

test("进位", () => {
  assert.deepStrictEqual(plusOne([[9]]), [1,0]);
});
