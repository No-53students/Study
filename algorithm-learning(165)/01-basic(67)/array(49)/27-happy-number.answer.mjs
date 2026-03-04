/**
 * 202. 快乐数 (Happy Number) - 参考答案
 */

export function isHappy(n) {
  const seen = new Set();

  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }

  return n === 1;
}

function getNext(n) {
  let sum = 0;
  while (n > 0) {
    const digit = n % 10;
    sum += digit * digit;
    n = Math.floor(n / 10);
  }
  return sum;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(isHappy(19), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isHappy(2), false);
});

test("1", () => {
  assert.deepStrictEqual(isHappy(1), true);
});

test("7", () => {
  assert.deepStrictEqual(isHappy(7), true);
});
