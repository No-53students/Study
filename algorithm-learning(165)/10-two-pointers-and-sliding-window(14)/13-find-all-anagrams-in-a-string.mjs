// node ./13-find-all-anagrams-in-a-string.mjs
/**
 * 438. 找到字符串中所有字母异位词 (Find All Anagrams in a String)
 * 难度: medium
 *
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。
 * 
 * 异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 *
 * 示例 1:
 * 输入: s = "cbaebabacd", p = "abc"
 * 输出: [0,6]
 * 解释:
 * 起始索引等于 0 的子串是 "cba", 它是 "abc" 的异位词。
 * 起始索引等于 6 的子串是 "bac", 它是 "abc" 的异位词。
 * 
 * 示例 2:
 * 输入: s = "abab", p = "ab"
 * 输出: [0,1,2]
 * 解释:
 * 起始索引等于 0 的子串是 "ab", 它是 "ab" 的异位词。
 * 起始索引等于 1 的子串是 "ba", 它是 "ab" 的异位词。
 * 起始索引等于 2 的子串是 "ab", 它是 "ab" 的异位词。
 *
 * 约束条件:
 * - 1 <= s.length, p.length <= 3 * 10^4
 * - s 和 p 仅包含小写字母
 *
 * 提示:
 *   1. 使用滑动窗口，窗口大小固定为 p 的长度
 *   2. 维护窗口内字符频率与 p 的字符频率的差异
 *   3. 当差异为 0 时，说明找到了一个异位词
 */

export function findAnagrams(s, p) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 438. 找到字符串中所有字母异位词 (Find All Anagrams in a String)");
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
  assert.deepStrictEqual(findAnagrams("cbaebabacd", "abc"), [0,6]);
});

test("示例2", () => {
  assert.deepStrictEqual(findAnagrams("abab", "ab"), [0,1,2]);
});

test("无匹配", () => {
  assert.deepStrictEqual(findAnagrams("hello", "xyz"), []);
});

test("完全匹配", () => {
  assert.deepStrictEqual(findAnagrams("abc", "abc"), [0]);
});
