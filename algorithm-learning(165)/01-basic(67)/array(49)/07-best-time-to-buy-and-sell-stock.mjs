// node ./07-best-time-to-buy-and-sell-stock.mjs
/**
 * 121. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock)
 * 难度: easy
 *
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 *
 * 示例 1：
 * 输入：[7,1,5,3,6,4]
 * 输出：5
 * 解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
 *      注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
 * 
 * 示例 2：
 * 输入：prices = [7,6,4,3,1]
 * 输出：0
 * 解释：在这种情况下, 没有交易完成, 所以最大利润为 0。
 *
 * 约束条件:
 * - 1 <= prices.length <= 10^5
 * - 0 <= prices[i] <= 10^4
 *
 * 提示:
 *   1. 遍历时记录历史最低价格
 *   2. 计算当前价格与历史最低价格的差值
 *   3. 维护最大利润
 */

/**
 * @param {number[]} prices
 * @return {number}
 */
export function solution(prices) {
  // 在这里编写你的代码
  let countNum = 0;
  let minNum = Infinity;

  prices.forEach((item, index) => {
    if (item < minNum) {
      minNum = item;
    }
    // 获取到最小值的时候肯定不会走到这里
    if (item-minNum > countNum) {
      countNum = item - minNum;
    }
  })
  return countNum;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 121. 买卖股票的最佳时机 (Best Time to Buy and Sell Stock)");
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

test("基本测试", () => {
  assert.deepStrictEqual(solution([7,3,8,1,5,4]), 5);
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
