/**
 * 322. 零钱兑换 (Coin Change) - 参考答案
 */

export function coinChange(coins, amount) {
  // dp[i] 表示凑成金额 i 所需的最少硬币数
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(coinChange([1,2,5], 11), 3);
});

test("无解", () => {
  assert.deepStrictEqual(coinChange([2], 3), -1);
});

test("金额为0", () => {
  assert.deepStrictEqual(coinChange([1], 0), 0);
});
