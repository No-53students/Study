/**
 * 55. 跳跃游戏 (Jump Game) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
export function solution(nums) {
  let maxReach = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }

  return true;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("可以到达", () => {
  assert.deepStrictEqual(solution([2,3,1,1,4]), true);
});

test("无法到达", () => {
  assert.deepStrictEqual(solution([3,2,1,0,4]), false);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), true);
});

test("直接跳到", () => {
  assert.deepStrictEqual(solution([5,0,0,0,0]), true);
});

test("每步只能跳1", () => {
  assert.deepStrictEqual(solution([1,1,1,1]), true);
});
