/**
 * 33. 搜索旋转排序数组 (Search in Rotated Sorted Array) - 参考答案
 */

export function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    // 判断哪一半是有序的
    if (nums[left] <= nums[mid]) {
      // 左半部分有序
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // 右半部分有序
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("找到目标", () => {
  assert.deepStrictEqual(search([4,5,6,7,0,1,2], 0), 4);
});

test("目标不存在", () => {
  assert.deepStrictEqual(search([4,5,6,7,0,1,2], 3), -1);
});

test("单元素", () => {
  assert.deepStrictEqual(search([1], 0), -1);
});
