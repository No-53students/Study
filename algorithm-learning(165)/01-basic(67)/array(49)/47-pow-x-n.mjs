/**
 * 50. Pow(x, n) (Pow(x, n))
 * 难度: medium
 *
 * 实现 pow(x, n)，即计算 x 的整数 n 次幂函数（即，x^n）。
 *
 * 示例 1：
 * 输入：x = 2.00000, n = 10
 * 输出：1024.00000
 * 
 * 示例 2：
 * 输入：x = 2.10000, n = 3
 * 输出：9.26100
 * 
 * 示例 3：
 * 输入：x = 2.00000, n = -2
 * 输出：0.25000
 * 解释：2^-2 = 1/2^2 = 1/4 = 0.25
 *
 * 约束条件:
 * - -100.0 < x < 100.0
 * - -2^31 <= n <= 2^31 - 1
 * - n 是一个整数
 * - -10^4 <= x^n <= 10^4
 *
 * 提示:
 *   1. 使用快速幂算法
 *   2. x^n = x^(n/2) * x^(n/2)（n 为偶数）
 *   3. x^n = x^(n/2) * x^(n/2) * x（n 为奇数）
 */

export function myPow(x, n) {
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

test("正指数", () => {
  assert.deepStrictEqual(myPow(2, 10), 1024);
});

test("小数底数", () => {
  assert.deepStrictEqual(myPow(2.1, 3), 9.261);
});

test("负指数", () => {
  assert.deepStrictEqual(myPow(2, -2), 0.25);
});
