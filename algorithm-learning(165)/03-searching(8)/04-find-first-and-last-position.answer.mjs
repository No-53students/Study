/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置 (Find First and Last Position of Element in Sorted Array) - 参考答案
 */

export function searchRange(nums, target) {
  const findFirst = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        right = mid - 1; // 继续向左搜索
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  const findLast = () => {
    let left = 0;
    let right = nums.length - 1;
    let result = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] === target) {
        result = mid;
        left = mid + 1; // 继续向右搜索
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return result;
  };

  return [findFirst(), findLast()];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("找到范围", () => {
  assert.deepStrictEqual(searchRange([5,7,7,8,8,10], 8), [3,4]);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchRange([5,7,7,8,8,10], 6), [-1,-1]);
});

test("空数组", () => {
  assert.deepStrictEqual(searchRange([], 0), [-1,-1]);
});
