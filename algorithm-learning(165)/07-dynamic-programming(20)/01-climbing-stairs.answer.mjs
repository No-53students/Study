/**
 * 70. 爬楼梯 (Climbing Stairs) - 参考答案
 */

export function climbStairs(n) {
  if (n <= 2) return n;

  let prev2 = 1;
  let prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("2阶楼梯", () => {
  assert.deepStrictEqual(climbStairs(2), 2);
});

test("3阶楼梯", () => {
  assert.deepStrictEqual(climbStairs(3), 3);
});
