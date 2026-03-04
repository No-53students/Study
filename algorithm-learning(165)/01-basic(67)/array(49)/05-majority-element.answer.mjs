/**
 * 169. 多数元素 (Majority Element) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  // Boyer-Moore 投票算法
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      candidate = nums[i];
      count = 1;
    } else if (nums[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }

  return candidate;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([3,2,3]), 3);
});

test("多元素", () => {
  assert.deepStrictEqual(solution([2,2,1,1,1,2,2]), 2);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("全部相同", () => {
  assert.deepStrictEqual(solution([5,5,5,5]), 5);
});

test("两种元素", () => {
  assert.deepStrictEqual(solution([1,2,1,2,1]), 1);
});
