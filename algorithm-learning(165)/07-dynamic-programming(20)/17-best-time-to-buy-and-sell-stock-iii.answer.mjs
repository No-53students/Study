/**
 * 123. 买卖股票的最佳时机 III (Best Time to Buy and Sell Stock III) - 参考答案
 */

export function maxProfit(prices) {
  // 状态：第一次买入、第一次卖出、第二次买入、第二次卖出
  let buy1 = -prices[0];
  let sell1 = 0;
  let buy2 = -prices[0];
  let sell2 = 0;

  for (let i = 1; i < prices.length; i++) {
    buy1 = Math.max(buy1, -prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell2 = Math.max(sell2, buy2 + prices[i]);
  }

  return sell2;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("两次交易", () => {
  assert.deepStrictEqual(maxProfit([[3,3,5,0,0,3,1,4]]), 6);
});

test("一次交易最优", () => {
  assert.deepStrictEqual(maxProfit([[1,2,3,4,5]]), 4);
});

test("无利润", () => {
  assert.deepStrictEqual(maxProfit([[7,6,4,3,1]]), 0);
});
