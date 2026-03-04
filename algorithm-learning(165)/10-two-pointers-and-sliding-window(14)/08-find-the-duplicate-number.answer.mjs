/**
 * 287. 寻找重复数 (Find the Duplicate Number) - 参考答案
 */

export function findDuplicate(nums: number[]): number {
  // 快慢指针找环
  let slow = nums[0];
  let fast = nums[0];

  // 第一次相遇
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // 找环入口
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("标准情况", () => {
  assert.deepStrictEqual(findDuplicate([1,3,4,2,2]), 2);
});

test("中间重复", () => {
  assert.deepStrictEqual(findDuplicate([3,1,3,4,2]), 3);
});

test("全部重复", () => {
  assert.deepStrictEqual(findDuplicate([3,3,3,3,3]), 3);
});
