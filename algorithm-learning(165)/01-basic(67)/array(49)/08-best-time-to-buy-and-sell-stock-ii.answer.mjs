/**
 * 122. 买卖股票的最佳时机 II (Best Time to Buy and Sell Stock II) - 参考答案
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
export function solution(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1];
    }
  }

  return profit;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("多次交易", () => {
  assert.deepStrictEqual(solution([7,1,5,3,6,4]), 7);
});

test("持续上涨", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5]), 4);
});

test("持续下跌", () => {
  assert.deepStrictEqual(solution([7,6,4,3,1]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 0);
});

test("波动", () => {
  assert.deepStrictEqual(solution([1,2,1,2,1,2]), 3);
});
