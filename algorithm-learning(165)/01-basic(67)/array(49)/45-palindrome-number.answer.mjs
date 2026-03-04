/**
 * 9. 回文数 (Palindrome Number) - 参考答案
 */

export function isPalindrome(x) {
  // 负数和以 0 结尾的非零数不是回文
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let reversed = 0;
  while (x > reversed) {
    reversed = reversed * 10 + x % 10;
    x = Math.floor(x / 10);
  }

  // 偶数位数：x === reversed
  // 奇数位数：x === Math.floor(reversed / 10)
  return x === reversed || x === Math.floor(reversed / 10);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("回文数", () => {
  assert.deepStrictEqual(isPalindrome(121), true);
});

test("负数", () => {
  assert.deepStrictEqual(isPalindrome(-121), false);
});

test("以0结尾", () => {
  assert.deepStrictEqual(isPalindrome(10), false);
});
