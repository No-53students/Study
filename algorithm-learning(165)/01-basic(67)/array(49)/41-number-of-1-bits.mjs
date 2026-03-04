/**
 * 191. 位1的个数 (Number of 1 Bits)
 * 难度: easy
 *
 * 编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
 *
 * 示例 1：
 * 输入：n = 00000000000000000000000000001011
 * 输出：3
 * 解释：输入的二进制串 00000000000000000000000000001011 中，共有三位为 '1'。
 * 
 * 示例 2：
 * 输入：n = 00000000000000000000000010000000
 * 输出：1
 * 解释：输入的二进制串 00000000000000000000000010000000 中，共有一位为 '1'。
 * 
 * 示例 3：
 * 输入：n = 11111111111111111111111111111101
 * 输出：31
 * 解释：输入的二进制串 11111111111111111111111111111101 中，共有三十一位为 '1'。
 *
 * 约束条件:
 * - 输入必须是长度为 32 的 二进制串
 *
 * 提示:
 *   1. n & (n-1) 可以消除 n 最低位的 1
 *   2. 循环直到 n 变为 0
 *   3. 也可以逐位检查
 */

export function hammingWeight(n) {
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

test("三个1", () => {
  assert.deepStrictEqual(hammingWeight(11), 3);
});

test("一个1", () => {
  assert.deepStrictEqual(hammingWeight(128), 1);
});
