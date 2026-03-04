/**
 * 53. 最大子数组和 (Maximum Subarray) - 参考答案
 */

export function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 要么加入当前子数组，要么从当前位置重新开始
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);
});

test("单元素", () => {
  assert.deepStrictEqual(maxSubArray([1]), 1);
});

test("全正数", () => {
  assert.deepStrictEqual(maxSubArray([5,4,-1,7,8]), 23);
});

test("全负数", () => {
  assert.deepStrictEqual(maxSubArray([-1,-2,-3]), -1);
});
