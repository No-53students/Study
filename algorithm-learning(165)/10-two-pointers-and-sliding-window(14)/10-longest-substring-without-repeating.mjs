/**
 * 3. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)
 * 难度: medium
 *
 * 给定一个字符串 s，请你找出其中不含有重复字符的 最长子串 的长度。
 *
 * 示例 1：
 * 输入: s = "abcabcbb"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 示例 2：
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
 * 
 * 示例 3：
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 *      请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
 *
 * 约束条件:
 * - 0 <= s.length <= 5 * 10^4
 * - s 由英文字母、数字、符号和空格组成
 *
 * 提示:
 *   1. 使用滑动窗口，维护一个无重复字符的窗口
 *   2. 使用哈希表记录每个字符最后出现的位置
 *   3. 遇到重复字符时，将左指针移动到重复字符的下一个位置
 */

export function lengthOfLongestSubstring(s) {
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
  assert.deepStrictEqual(lengthOfLongestSubstring("abcabcbb"), 3);
});

test("全相同", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("bbbbb"), 1);
});

test("示例3", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("pwwkew"), 3);
});

test("空字符串", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring(""), 0);
});

test("单字符", () => {
  assert.deepStrictEqual(lengthOfLongestSubstring("a"), 1);
});
