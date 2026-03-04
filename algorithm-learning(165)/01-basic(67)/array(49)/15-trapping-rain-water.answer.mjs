/**
 * 42. 接雨水 (Trapping Rain Water) - 参考答案
 */

/**
 * @param {number[]} height
 * @return {number}
 */
export function solution(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([0,1,0,2,1,0,1,3,2,1,2,1]), 6);
});

test("简单情况", () => {
  assert.deepStrictEqual(solution([4,2,0,3,2,5]), 9);
});

test("无法接水", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5]), 0);
});

test("两柱子", () => {
  assert.deepStrictEqual(solution([2,0,2]), 2);
});

test("空数组", () => {
  assert.deepStrictEqual(solution([]), 0);
});
