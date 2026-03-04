/**
 * 322. 零钱兑换 (Coin Change)
 * 难度: medium
 *
 * 给你一个整数数组 coins，表示不同面额的硬币；以及一个整数 amount，表示总金额。
 * 
 * 计算并返回可以凑成总金额所需的 最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 
 * 你可以认为每种硬币的数量是无限的。
 *
 * 示例 1：
 * 输入：coins = [1,2,5], amount = 11
 * 输出：3
 * 解释：11 = 5 + 5 + 1
 * 
 * 示例 2：
 * 输入：coins = [2], amount = 3
 * 输出：-1
 * 
 * 示例 3：
 * 输入：coins = [1], amount = 0
 * 输出：0
 *
 * 约束条件:
 * - 1 <= coins.length <= 12
 * - 1 <= coins[i] <= 2^31 - 1
 * - 0 <= amount <= 10^4
 *
 * 提示:
 *   1. dp[i] = min(dp[i-coin] + 1) for all coins
 *   2. 初始化为 Infinity，dp[0] = 0
 *   3. 完全背包问题的变种
 */

export function coinChange(coins, amount) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(coinChange([1,2,5], 11), 3);
});

test("无解", () => {
  assert.deepStrictEqual(coinChange([2], 3), -1);
});

test("金额为0", () => {
  assert.deepStrictEqual(coinChange([1], 0), 0);
});
