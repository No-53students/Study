// node ./48-sqrt-x.mjs
/**
 * 69. x 的平方根 (Sqrt(x))
 * 难度: easy
 *
 * 给你一个非负整数 x，计算并返回 x 的 算术平方根。
 * 
 * 由于返回类型是整数，结果只保留 整数部分，小数部分将被 舍去。
 * 
 * 注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5。
 *
 * 示例 1：
 * 输入：x = 4
 * 输出：2
 * 
 * 示例 2：
 * 输入：x = 8
 * 输出：2
 * 解释：8 的算术平方根是 2.82842...，由于返回类型是整数，小数部分将被舍去。
 *
 * 约束条件:
 * - 0 <= x <= 2^31 - 1
 *
 * 提示:
 *   1. 使用二分查找
 *   2. 在 [1, x/2] 范围内查找
 *   3. 注意整数溢出问题
 */

export function mySqrt(x) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 69. x 的平方根 (Sqrt(x))");
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

test("完全平方数", () => {
  assert.deepStrictEqual(mySqrt(4), 2);
});

test("非完全平方数", () => {
  assert.deepStrictEqual(mySqrt(8), 2);
});
