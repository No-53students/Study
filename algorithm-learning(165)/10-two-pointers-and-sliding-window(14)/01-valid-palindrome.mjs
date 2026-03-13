// node ./01-valid-palindrome.mjs
/**
 * 125. 验证回文串 (Valid Palindrome)
 * 难度: easy
 *
 * 如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串。
 * 
 * 字母和数字都属于字母数字字符。
 * 
 * 给你一个字符串 s，如果它是 回文串，返回 true；否则，返回 false。
 *
 * 示例 1：
 * 输入: s = "A man, a plan, a canal: Panama"
 * 输出：true
 * 解释："amanaplanacanalpanama" 是回文串。
 * 
 * 示例 2：
 * 输入：s = "race a car"
 * 输出：false
 * 解释："raceacar" 不是回文串。
 * 
 * 示例 3：
 * 输入：s = " "
 * 输出：true
 * 解释：在移除非字母数字字符之后，s 是一个空字符串 "" 。
 * 由于空字符串正着反着读都一样，所以是回文串。
 *
 * 约束条件:
 * - 1 <= s.length <= 2 * 10^5
 * - s 仅由可打印的 ASCII 字符组成
 *
 * 提示:
 *   1. 使用双指针，一个从头开始，一个从尾开始
 *   2. 遇到非字母数字字符时跳过
 *   3. 比较时注意忽略大小写
 */

export function isPalindrome(s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 125. 验证回文串 (Valid Palindrome)");
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
  assert.deepStrictEqual(isPalindrome("A man, a plan, a canal: Panama"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isPalindrome("race a car"), false);
});

test("空格", () => {
  assert.deepStrictEqual(isPalindrome(" "), true);
});

test("单字符", () => {
  assert.deepStrictEqual(isPalindrome("a"), true);
});
