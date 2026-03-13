// node ./20-longest-valid-parentheses.mjs
/**
 * 32. 最长有效括号 (Longest Valid Parentheses)
 * 难度: hard
 *
 * 给你一个只包含 '(' 和 ')' 的字符串，找出最长有效（格式正确且连续）括号子串的长度。
 *
 * 示例 1：
 * 输入：s = "(()"
 * 输出：2
 * 解释：最长有效括号子串是 "()"
 * 
 * 示例 2：
 * 输入：s = ")()())"
 * 输出：4
 * 解释：最长有效括号子串是 "()()"
 * 
 * 示例 3：
 * 输入：s = ""
 * 输出：0
 *
 * 约束条件:
 * - 0 <= s.length <= 3 * 10^4
 * - s[i] 为 '(' 或 ')'
 *
 * 提示:
 *   1. dp[i] 表示以 s[i] 结尾的最长有效括号长度
 *   2. 考虑两种情况：...() 和 ...))
 *   3. 也可以使用栈来解决
 */

export function longestValidParentheses(s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 32. 最长有效括号 (Longest Valid Parentheses)");
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
  assert.deepStrictEqual(longestValidParentheses("(()"), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(longestValidParentheses(")()())"), 4);
});

test("空字符串", () => {
  assert.deepStrictEqual(longestValidParentheses(""), 0);
});
