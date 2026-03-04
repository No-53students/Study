/**
 * 26. 删除有序数组中的重复项 (Remove Duplicates from Sorted Array) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  if (nums.length === 0) return 0;

  // 快慢双指针
  let slow = 0;  // 慢指针：指向已处理的最后一个不重复元素

  for (let fast = 1; fast < nums.length; fast++) {
    // 发现新的不重复元素
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }

  return slow + 1;  // 返回不重复元素的个数
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,1,2]), 2);
});

test("多重复元素", () => {
  assert.deepStrictEqual(solution([0,0,1,1,1,2,2,3,3,4]), 5);
});

test("无重复", () => {
  assert.deepStrictEqual(solution([1,2,3]), 3);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("全部相同", () => {
  assert.deepStrictEqual(solution([2,2,2,2]), 1);
});
