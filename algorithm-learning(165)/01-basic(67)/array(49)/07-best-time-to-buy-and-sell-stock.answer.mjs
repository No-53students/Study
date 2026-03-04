/**
 * 121. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock) - 参考答案
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
export function solution(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;

  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }

  return maxProfit;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本测试", () => {
  assert.deepStrictEqual(solution([7,1,5,3,6,4]), 5);
});

test("持续下跌", () => {
  assert.deepStrictEqual(solution([7,6,4,3,1]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 0);
});

test("两元素上涨", () => {
  assert.deepStrictEqual(solution([1,2]), 1);
});

test("持续上涨", () => {
  assert.deepStrictEqual(solution([1,2,3,4,5]), 4);
});
