/**
 * 69. x 的平方根 (Sqrt(x)) - 参考答案
 */

export function mySqrt(x) {
  if (x < 2) return x;

  let left = 1;
  let right = Math.floor(x / 2);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const square = mid * mid;

    if (square === x) {
      return mid;
    } else if (square < x) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return right;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("完全平方数", () => {
  assert.deepStrictEqual(mySqrt(4), 2);
});

test("非完全平方数", () => {
  assert.deepStrictEqual(mySqrt(8), 2);
});
