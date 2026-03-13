// node ./10-perfect-squares.mjs
/**
 * 279. 完全平方数 (Perfect Squares)
 * 难度: medium
 *
 * 给你一个整数 n，返回 和为 n 的完全平方数的最少数量。
 * 
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。
 *
 * 示例 1：
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 * 
 * 示例 2：
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
 *
 * 约束条件:
 * - 1 <= n <= 10^4
 *
 * 提示:
 *   1. 类似于完全背包问题
 *   2. dp[i] 表示和为 i 的完全平方数的最少数量
 *   3. 遍历所有可能的完全平方数 j*j
 */

export function numSquares(n) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 279. 完全平方数 (Perfect Squares)");
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
  assert.deepStrictEqual(numSquares(12), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(numSquares(13), 2);
});

test("完全平方数", () => {
  assert.deepStrictEqual(numSquares(16), 1);
});

test("小数", () => {
  assert.deepStrictEqual(numSquares(1), 1);
});
