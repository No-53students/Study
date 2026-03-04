/**
 * 135. 分发糖果 (Candy) - 参考答案
 */

/**
 * @param {number[]} ratings
 * @return {number}
 */
export function solution(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // 从左到右：右边比左边高，右边+1
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // 从右到左：左边比右边高，取较大值
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  return candies.reduce((a, b) => a + b, 0);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,0,2]), 5);
});

test("相邻相等", () => {
  assert.deepStrictEqual(solution([1,2,2]), 4);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("递增", () => {
  assert.deepStrictEqual(solution([1,2,3]), 6);
});

test("递减", () => {
  assert.deepStrictEqual(solution([3,2,1]), 6);
});
