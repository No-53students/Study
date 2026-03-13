// node ./05-is-subsequence.mjs
/**
 * 392. 判断子序列 (Is Subsequence)
 * 难度: easy
 *
 * 给定字符串 s 和 t，判断 s 是否为 t 的子序列。
 * 
 * 字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace" 是 "abcde" 的一个子序列，而 "aec" 不是）。
 * 
 * 进阶：
 * 如果有大量输入的 S，称作 S1, S2, ... , Sk 其中 k >= 10亿，你需要依次检查它们是否为 T 的子序列。在这种情况下，你会怎样改变代码？
 *
 * 示例 1：
 * 输入：s = "abc", t = "ahbgdc"
 * 输出：true
 * 
 * 示例 2：
 * 输入：s = "axc", t = "ahbgdc"
 * 输出：false
 *
 * 约束条件:
 * - 0 <= s.length <= 100
 * - 0 <= t.length <= 10^4
 * - 两个字符串都只由小写字符组成
 *
 * 提示:
 *   1. 使用双指针，分别指向 s 和 t
 *   2. 遍历 t，如果当前字符与 s 的当前字符匹配，s 的指针右移
 *   3. 最后检查 s 的指针是否到达末尾
 */

export function isSubsequence(s, t) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 392. 判断子序列 (Is Subsequence)");
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
  assert.deepStrictEqual(isSubsequence("abc", "ahbgdc"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isSubsequence("axc", "ahbgdc"), false);
});

test("空字符串", () => {
  assert.deepStrictEqual(isSubsequence("", "ahbgdc"), true);
});

test("相同字符串", () => {
  assert.deepStrictEqual(isSubsequence("abc", "abc"), true);
});

test("s更长", () => {
  assert.deepStrictEqual(isSubsequence("abcd", "abc"), false);
});
