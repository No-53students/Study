/**
 * 9. 回文数 (Palindrome Number)
 * 难度: easy
 *
 * 给你一个整数 x，如果 x 是一个回文整数，返回 true；否则，返回 false。
 * 
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * 例如，121 是回文，而 123 不是。
 *
 * 示例 1：
 * 输入：x = 121
 * 输出：true
 * 
 * 示例 2：
 * 输入：x = -121
 * 输出：false
 * 解释：从左向右读，为 -121。从右向左读，为 121-。因此它不是一个回文数。
 * 
 * 示例 3：
 * 输入：x = 10
 * 输出：false
 * 解释：从右向左读，为 01。因此它不是一个回文数。
 *
 * 约束条件:
 * - -2^31 <= x <= 2^31 - 1
 *
 * 提示:
 *   1. 负数不是回文数
 *   2. 只需要反转一半的数字进行比较
 *   3. 注意处理奇数位数和偶数位数的情况
 */

export function isPalindrome(x) {
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

test("回文数", () => {
  assert.deepStrictEqual(isPalindrome(121), true);
});

test("负数", () => {
  assert.deepStrictEqual(isPalindrome(-121), false);
});

test("以0结尾", () => {
  assert.deepStrictEqual(isPalindrome(10), false);
});
