/**
 * 27. 移除元素 (Remove Element) - 参考答案
 */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
export function solution(nums, val) {
  // 快慢双指针
  let slow = 0;  // 慢指针：指向下一个要放置的位置

  for (let fast = 0; fast < nums.length; fast++) {
    // 如果当前元素不等于 val，放到慢指针位置
    if (nums[fast] !== val) {
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
  assert.deepStrictEqual(solution([3,2,2,3], 3), 2);
});

test("多个目标值", () => {
  assert.deepStrictEqual(solution([0,1,2,2,3,0,4,2], 2), 5);
});

test("空数组", () => {
  assert.deepStrictEqual(solution([], 1), 0);
});

test("无匹配", () => {
  assert.deepStrictEqual(solution([1,2,3], 4), 3);
});

test("全部匹配", () => {
  assert.deepStrictEqual(solution([2,2,2], 2), 0);
});
