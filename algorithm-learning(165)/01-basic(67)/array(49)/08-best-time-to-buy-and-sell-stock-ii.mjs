/**
 * 122. 买卖股票的最佳时机 II (Best Time to Buy and Sell Stock II)
 * 难度: medium
 *
 * 给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
 * 
 * 在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
 * 
 * 返回 你能获得的 最大 利润 。
 *
 * 示例 1：
 * 输入：prices = [7,1,5,3,6,4]
 * 输出：7
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
 * 随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6 - 3 = 3。
 * 最大总利润为 4 + 3 = 7 。
 * 
 * 示例 2：
 * 输入：prices = [1,2,3,4,5]
 * 输出：4
 * 解释：在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5 - 1 = 4。
 * 
 * 示例 3：
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 交易无法获得正利润，所以不参与交易可以获得最大利润，最大利润为 0。
 *
 * 约束条件:
 * - 1 <= prices.length <= 3 * 10^4
 * - 0 <= prices[i] <= 10^4
 *
 * 提示:
 *   1. 可以进行多次交易
 *   2. 贪心思想：所有上涨的差价都累加
 *   3. 把一次大的上涨拆分成多次小的上涨，利润不变
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
export function solution(prices) {
  // 在这里编写你的代码

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
