/**
 * 41. 缺失的第一个正数 (First Missing Positive) - 参考答案
 */

export function firstMissingPositive(nums) {
  const n = nums.length;

  // 将每个数放到正确的位置：nums[i] 应该等于 i + 1
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      // 交换 nums[i] 和 nums[nums[i] - 1]
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  // 找第一个不在正确位置的数
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return n + 1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(firstMissingPositive([1,2,0]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(firstMissingPositive([3,4,-1,1]), 2);
});

test("示例3", () => {
  assert.deepStrictEqual(firstMissingPositive([7,8,9,11,12]), 1);
});

test("连续", () => {
  assert.deepStrictEqual(firstMissingPositive([1,2,3]), 4);
});
