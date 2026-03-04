/**
 * 162. 寻找峰值 (Find Peak Element) - 参考答案
 */

export function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      // 峰值在左边（包含 mid）
      right = mid;
    } else {
      // 峰值在右边
      left = mid + 1;
    }
  }

  return left;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("单峰", () => {
  assert.deepStrictEqual(findPeakElement([[1,2,3,1]]), 2);
});

test("多峰", () => {
  assert.deepStrictEqual(findPeakElement([[1,2,1,3,5,6,4]]), 5);
});
