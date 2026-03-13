// node ./32-word-pattern.mjs
/**
 * 290. 单词规律 (Word Pattern)
 * 难度: easy
 *
 * 给定一种规律 pattern 和一个字符串 s，判断 s 是否遵循相同的规律。
 * 
 * 这里的 遵循 指完全匹配，例如，pattern 里的每个字母和字符串 s 中的每个非空单词之间存在着双向连接的对应规律。
 *
 * 示例 1：
 * 输入：pattern = "abba", s = "dog cat cat dog"
 * 输出：true
 * 
 * 示例 2：
 * 输入：pattern = "abba", s = "dog cat cat fish"
 * 输出：false
 * 
 * 示例 3：
 * 输入：pattern = "aaaa", s = "dog cat cat dog"
 * 输出：false
 *
 * 约束条件:
 * - 1 <= pattern.length <= 300
 * - pattern 只包含小写英文字母
 * - 1 <= s.length <= 3000
 * - s 只包含小写英文字母和 ' '
 * - s 不包含 任何前导或尾随对空格
 * - s 中每个单词都被 单个空格 分隔
 *
 * 提示:
 *   1. 需要建立双向映射：字符到单词，单词到字符
 *   2. 先检查 pattern 和单词数量是否相同
 *   3. 遍历时检查映射是否一致
 */

export function wordPattern(pattern, s) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 290. 单词规律 (Word Pattern)");
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
  assert.deepStrictEqual(wordPattern("abba", "dog cat cat dog"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(wordPattern("abba", "dog cat cat fish"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(wordPattern("aaaa", "dog cat cat dog"), false);
});

test("长度不同", () => {
  assert.deepStrictEqual(wordPattern("abc", "dog cat"), false);
});
