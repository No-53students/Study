// node ./19-longest-palindromic-substring.mjs
/**
 * 5. 最长回文子串 (Longest Palindromic Substring)
 * 难度: medium
 *
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 *
 * 示例 1：
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 
 * 示例 2：
 * 输入：s = "cbbd"
 * 输出："bb"
 *
 * 约束条件:
 * - 1 <= s.length <= 1000
 * - s 仅由数字和英文字母组成
 *
 * 提示:
 *   1. 可以使用中心扩展法
 *   2. 也可以使用动态规划
 *   3. 注意奇数和偶数长度的回文串
 */

export function longestPalindrome(s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 5. 最长回文子串 (Longest Palindromic Substring)");
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
  assert.deepStrictEqual(longestPalindrome("babad"), "bab");
});

test("示例2", () => {
  assert.deepStrictEqual(longestPalindrome("cbbd"), "bb");
});
