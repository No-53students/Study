/**
 * 217. 存在重复元素 (Contains Duplicate) - 参考答案
 */

export function containsDuplicate(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }
    set.add(num);
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(containsDuplicate([1,2,3,1]), true);
});

test("示例2", () => {
  assert.deepStrictEqual(containsDuplicate([1,2,3,4]), false);
});

test("多重复", () => {
  assert.deepStrictEqual(containsDuplicate([1,1,1,3,3,4,3,2,4,2]), true);
});

test("单元素", () => {
  assert.deepStrictEqual(containsDuplicate([1]), false);
});
