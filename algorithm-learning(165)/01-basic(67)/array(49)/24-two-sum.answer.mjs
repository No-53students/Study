/**
 * 1. 两数之和 (Two Sum) - 参考答案
 */

export function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return []; // 题目保证有解，不会执行到这里
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(twoSum([2,7,11,15], 9), [0,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(twoSum([3,2,4], 6), [1,2]);
});

test("相同元素", () => {
  assert.deepStrictEqual(twoSum([3,3], 6), [0,1]);
});

test("负数", () => {
  assert.deepStrictEqual(twoSum([-1,-2,-3,-4,-5], -8), [2,4]);
});
