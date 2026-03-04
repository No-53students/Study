/**
 * 219. 存在重复元素 II (Contains Duplicate II) - 参考答案
 */

export function containsNearbyDuplicate(nums, k) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) {
      return true;
    }
    map.set(nums[i], i);
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,3,1], 3), true);
});

test("示例2", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,0,1,1], 1), true);
});

test("示例3", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,3,1,2,3], 2), false);
});

test("k=0", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,1], 0), false);
});
