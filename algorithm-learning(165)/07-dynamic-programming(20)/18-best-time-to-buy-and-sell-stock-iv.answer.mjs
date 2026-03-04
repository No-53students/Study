/**
 * 188. 买卖股票的最佳时机 IV (Best Time to Buy and Sell Stock IV) - 参考答案
 */

export function maxProfit(k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  // 如果 k >= n/2，相当于无限次交易
  if (k >= Math.floor(n / 2)) {
    let profit = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        profit += prices[i] - prices[i - 1];
      }
    }
    return profit;
  }

  // buy[j]: 第 j 次买入后的最大收益
  // sell[j]: 第 j 次卖出后的最大收益
  const buy = new Array(k + 1).fill(-Infinity);
  const sell = new Array(k + 1).fill(0);

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]);
      sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }

  return sell[k];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("k=2", () => {
  assert.deepStrictEqual(maxProfit(2, [2,4,1]), 2);
});

test("两次交易", () => {
  assert.deepStrictEqual(maxProfit(2, [3,2,6,5,0,3]), 7);
});
