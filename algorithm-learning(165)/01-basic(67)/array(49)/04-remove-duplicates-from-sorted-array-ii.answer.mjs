/**
 * 80. 删除有序数组中的重复项 II (Remove Duplicates from Sorted Array II) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  if (nums.length <= 2) return nums.length;

  // 通用解法：允许最多 k 个重复
  const k = 2;
  let slow = k;  // 前 k 个元素直接保留

  for (let fast = k; fast < nums.length; fast++) {
    // 与 slow - k 位置比较，判断是否超过 k 个
    if (nums[fast] !== nums[slow - k]) {
      nums[slow] = nums[fast];
      slow++;
    }
  }

  return slow;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,1,1,2,2,3]), 5);
});

test("多种重复", () => {
  assert.deepStrictEqual(solution([0,0,1,1,1,1,2,3,3]), 7);
});

test("无需删除", () => {
  assert.deepStrictEqual(solution([1,1,2,2,3,3]), 6);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([1,1]), 2);
});
