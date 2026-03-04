/**
 * 49. 字母异位词分组 (Group Anagrams)
 * 难度: medium
 *
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 * 
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 *
 * 示例 1：
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * 示例 2：
 * 输入: strs = [""]
 * 输出: [[""]]
 * 
 * 示例 3：
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 *
 * 约束条件:
 * - 1 <= strs.length <= 10^4
 * - 0 <= strs[i].length <= 100
 * - strs[i] 仅包含小写字母
 *
 * 提示:
 *   1. 字母异位词排序后的结果相同
 *   2. 使用排序后的字符串作为哈希表的 key
 *   3. 也可以用字符计数作为 key
 */

export function groupAnagrams(strs) {
  // 在此处编写你的代码

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
  assert.deepStrictEqual(groupAnagrams(["eat","tea","tan","ate","nat","bat"]), [["eat","tea","ate"],["tan","nat"],["bat"]]);
});

test("空字符串", () => {
  assert.deepStrictEqual(groupAnagrams([""]), [[""]]);
});

test("单字符", () => {
  assert.deepStrictEqual(groupAnagrams(["a"]), [["a"]]);
});
