/**
 * 153. 寻找旋转排序数组中的最小值 (Find Minimum in Rotated Sorted Array) - 参考答案
 */

export function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      // 最小值在右半部分
      left = mid + 1;
    } else {
      // 最小值在左半部分（包含 mid）
      right = mid;
    }
  }

  return nums[left];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("旋转3次", () => {
  assert.deepStrictEqual(findMin([[3,4,5,1,2]]), 1);
});

test("旋转4次", () => {
  assert.deepStrictEqual(findMin([[4,5,6,7,0,1,2]]), 0);
});

test("完整旋转", () => {
  assert.deepStrictEqual(findMin([[11,13,15,17]]), 11);
});
