/**
 * 394. 字符串解码 (Decode String)
 * 难度: medium
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 * 
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 * 
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 * 
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 * 示例 1：
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 * 
 * 示例 2：
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 * 
 * 示例 3：
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 * 约束条件:
 * - 1 <= s.length <= 30
 * - s 由小写英文字母、数字和方括号 '[]' 组成
 * - s 保证是一个 有效 的输入
 * - s 中所有整数的取值范围为 [1, 300]
 *
 * 提示:
 *   1. 使用两个栈，一个存储数字，一个存储字符串
 *   2. 遇到 '[' 时，将当前数字和字符串入栈
 *   3. 遇到 ']' 时，弹出栈顶进行组合
 */

export function decodeString(s) {
  // 在此处编写代码
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

test("示例1", () => {
  assert.deepStrictEqual(decodeString("3[a]2[bc]"), "aaabcbc");
});

test("嵌套", () => {
  assert.deepStrictEqual(decodeString("3[a2[c]]"), "accaccacc");
});

test("混合", () => {
  assert.deepStrictEqual(decodeString("2[abc]3[cd]ef"), "abcabccdcdcdef");
});
