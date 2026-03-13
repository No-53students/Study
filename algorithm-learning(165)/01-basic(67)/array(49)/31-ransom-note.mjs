// node ./31-ransom-note.mjs
/**
 * 383. 赎金信 (Ransom Note)
 * 难度: easy
 *
 * 给你两个字符串：ransomNote 和 magazine，判断 ransomNote 能不能由 magazine 里面的字符构成。
 * 
 * 如果可以，返回 true；否则返回 false。
 * 
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 *
 * 示例 1：
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 * 
 * 示例 2：
 * 输入：ransomNote = "aa", magazine = "ab"
 * 输出：false
 * 
 * 示例 3：
 * 输入：ransomNote = "aa", magazine = "aab"
 * 输出：true
 *
 * 约束条件:
 * - 1 <= ransomNote.length, magazine.length <= 10^5
 * - ransomNote 和 magazine 由小写英文字母组成
 *
 * 提示:
 *   1. 统计 magazine 中每个字符的数量
 *   2. 遍历 ransomNote，检查每个字符是否足够
 *   3. 可以使用数组或 Map 来统计
 */

export function canConstruct(ransomNote, magazine) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 383. 赎金信 (Ransom Note)");
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
  assert.deepStrictEqual(canConstruct("a", "b"), false);
});

test("示例2", () => {
  assert.deepStrictEqual(canConstruct("aa", "ab"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(canConstruct("aa", "aab"), true);
});

test("相同字符串", () => {
  assert.deepStrictEqual(canConstruct("abc", "abc"), true);
});
