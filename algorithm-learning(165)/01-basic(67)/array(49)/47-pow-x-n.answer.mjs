/**
 * 50. Pow(x, n) (Pow(x, n)) - 参考答案
 */

export function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;
  while (n > 0) {
    if (n & 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("正指数", () => {
  assert.deepStrictEqual(myPow(2, 10), 1024);
});

test("小数底数", () => {
  assert.deepStrictEqual(myPow(2.1, 3), 9.261);
});

test("负指数", () => {
  assert.deepStrictEqual(myPow(2, -2), 0.25);
});
