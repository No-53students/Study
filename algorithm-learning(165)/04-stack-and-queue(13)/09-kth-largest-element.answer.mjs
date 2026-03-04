/**
 * 215. 数组中的第K个最大元素 (Kth Largest Element in an Array) - 参考答案
 */

export function findKthLargest(nums, k) {
  // 快速选择算法
  const quickSelect = (left, right, kSmallest) => {
    if (left === right) return nums[left];

    // 随机选择 pivot
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIndex];

    // 将 pivot 移到最右边
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }

    // 将 pivot 放到正确位置
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

    if (storeIndex === kSmallest) {
      return nums[storeIndex];
    } else if (storeIndex < kSmallest) {
      return quickSelect(storeIndex + 1, right, kSmallest);
    } else {
      return quickSelect(left, storeIndex - 1, kSmallest);
    }
  };

  // 第 k 大 = 第 n - k 小
  return quickSelect(0, nums.length - 1, nums.length - k);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
});

test("示例2", () => {
  assert.deepStrictEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
});
