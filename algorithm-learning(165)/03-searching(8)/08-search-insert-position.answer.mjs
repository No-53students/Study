/**
 * 35. 搜索插入位置 (Search Insert Position) - 参考答案
 */

export function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("找到目标", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 5), 2);
});

test("插入中间", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 2), 1);
});

test("插入末尾", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 7), 4);
});

test("插入开头", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 0), 0);
});
