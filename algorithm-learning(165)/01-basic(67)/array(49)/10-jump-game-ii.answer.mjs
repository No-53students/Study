/**
 * 45. 跳跃游戏 II (Jump Game II) - 参考答案
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([2,3,1,1,4]), 2);
});

test("有0的情况", () => {
  assert.deepStrictEqual(solution([2,3,0,1,4]), 2);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), 0);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([1,2]), 1);
});

test("一步到位", () => {
  assert.deepStrictEqual(solution([5,1,1,1,1]), 1);
});
