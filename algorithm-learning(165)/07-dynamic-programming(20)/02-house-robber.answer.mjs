/**
 * 198. 打家劫舍 (House Robber) - 参考答案
 */

export function rob(nums) {
  if (nums.length === 1) return nums[0];

  let prev2 = 0;
  let prev1 = 0;

  for (const num of nums) {
    const curr = Math.max(prev1, prev2 + num);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(rob([[1,2,3,1]]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(rob([[2,7,9,3,1]]), 12);
});
