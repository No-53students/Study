// node ./07-palindrome-partitioning.mjs
/**
 * 131. 分割回文串 (Palindrome Partitioning)
 * 难度: medium
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串。返回 s 所有可能的分割方案。
 *
 * 示例 1：
 * 输入：s = "aab"
 * 输出：[["a","a","b"],["aa","b"]]
 * 
 * 示例 2：
 * 输入：s = "a"
 * 输出：[["a"]]
 *
 * 约束条件:
 * - 1 <= s.length <= 16
 * - s 仅由小写英文字母组成
 *
 * 提示:
 *   1. 回溯法，尝试所有可能的分割点
 *   2. 只有当前子串是回文串时，才继续递归
 *   3. 可以预处理回文判断，优化时间复杂度
 */

export function partition(s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 131. 分割回文串 (Palindrome Partitioning)");
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

test("示例aab", () => {
  assert.deepStrictEqual(partition("aab"), [["a","a","b"],["aa","b"]]);
});

test("单字符", () => {
  assert.deepStrictEqual(partition("a"), [["a"]]);
});
