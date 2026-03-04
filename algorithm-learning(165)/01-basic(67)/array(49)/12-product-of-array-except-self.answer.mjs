/**
 * 238. 除自身以外数组的乘积 (Product of Array Except Self) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {number[]}
 */
export function solution(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);

  // 计算左侧乘积
  let left = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = left;
    left *= nums[i];
  }

  // 计算右侧乘积并合并
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= right;
    right *= nums[i];
  }

  return answer;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,2,3,4]), [24,12,8,6]);
});

test("含0", () => {
  assert.deepStrictEqual(solution([-1,1,0,-3,3]), [0,0,9,0,0]);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([2,3]), [3,2]);
});

test("含负数", () => {
  assert.deepStrictEqual(solution([-1,-2,-3]), [6,3,2]);
});

test("多个0", () => {
  assert.deepStrictEqual(solution([0,0,1]), [0,0,0]);
});
