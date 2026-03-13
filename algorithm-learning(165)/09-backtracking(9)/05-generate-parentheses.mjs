// node ./05-generate-parentheses.mjs
/**
 * 22. 括号生成 (Generate Parentheses)
 * 难度: medium
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 * 示例 1：
 * 输入：n = 3
 * 输出：["((()))","(()())","(())()","()(())","()()()"]
 * 
 * 示例 2：
 * 输入：n = 1
 * 输出：["()"]
 *
 * 约束条件:
 * - 1 <= n <= 8
 *
 * 提示:
 *   1. 左括号数量不能超过 n
 *   2. 右括号数量不能超过左括号数量
 *   3. 当字符串长度为 2n 时，记录结果
 */

export function generateParenthesis(n) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 22. 括号生成 (Generate Parentheses)");
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

test("三对括号", () => {
  assert.deepStrictEqual(generateParenthesis(3), ["((()))","(()())","(())()","()(())","()()()"]);
});

test("一对括号", () => {
  assert.deepStrictEqual(generateParenthesis(1), ["()"]);
});
