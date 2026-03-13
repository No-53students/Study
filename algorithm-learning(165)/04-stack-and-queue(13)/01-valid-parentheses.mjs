// node ./01-valid-parentheses.mjs
/**
 * 20. 有效的括号 (Valid Parentheses)
 * 难度: easy
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 * 1. 左括号必须用相同类型的右括号闭合。
 * 2. 左括号必须以正确的顺序闭合。
 * 3. 每个右括号都有一个对应的相同类型的左括号。
 *
 * 示例 1：
 * 输入：s = "()"
 * 输出：true
 * 
 * 示例 2：
 * 输入：s = "()[]{}"
 * 输出：true
 * 
 * 示例 3：
 * 输入：s = "(]"
 * 输出：false
 * 
 * 示例 4：
 * 输入：s = "([])"
 * 输出：true
 *
 * 约束条件:
 * - 1 <= s.length <= 10^4
 * - s 仅由括号 '()[]{}' 组成
 *
 * 提示:
 *   1. 使用栈来匹配括号
 *   2. 遇到左括号入栈
 *   3. 遇到右括号，检查栈顶是否是对应的左括号
 */

export function isValid(s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 20. 有效的括号 (Valid Parentheses)");
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
