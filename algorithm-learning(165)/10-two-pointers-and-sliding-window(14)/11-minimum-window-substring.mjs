/**
 * 76. 最小覆盖子串 (Minimum Window Substring)
 * 难度: hard
 *
 * 给你一个字符串 s 、一个字符串 t。返回 s 中涵盖 t 所有字符的最小子串。如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""。
 * 
 * 注意：
 * - 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。
 * - 如果 s 中存在这样的子串，我们保证它是唯一的答案。
 *
 * 示例 1：
 * 输入：s = "ADOBECODEBANC", t = "ABC"
 * 输出："BANC"
 * 解释：最小覆盖子串 "BANC" 包含来自字符串 t 的 'A'、'B' 和 'C'。
 * 
 * 示例 2：
 * 输入：s = "a", t = "a"
 * 输出："a"
 * 解释：整个字符串 s 是最小覆盖子串。
 * 
 * 示例 3：
 * 输入: s = "a", t = "aa"
 * 输出: ""
 * 解释: t 中两个字符 'a' 均应包含在 s 的子串中，
 * 因此没有符合条件的子字符串，返回空字符串。
 *
 * 约束条件:
 * - m == s.length
 * - n == t.length
 * - 1 <= m, n <= 10^5
 * - s 和 t 由英文字母组成
 * 
 * 进阶： 你能设计一个在 O(m + n) 时间内解决此问题的算法吗？
 *
 * 提示:
 *   1. 使用滑动窗口，维护一个包含 t 所有字符的窗口
 *   2. 使用两个哈希表，一个记录需要的字符，一个记录窗口中的字符
 *   3. 当窗口满足条件时，尝试收缩窗口并更新最小长度
 */

export function minWindow(s, t) {
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
  assert.deepStrictEqual(minWindow("ADOBECODEBANC", "ABC"), "BANC");
});

test("示例2", () => {
  assert.deepStrictEqual(minWindow("a", "a"), "a");
});

test("无解", () => {
  assert.deepStrictEqual(minWindow("a", "aa"), "");
});

test("相同字符串", () => {
  assert.deepStrictEqual(minWindow("abc", "abc"), "abc");
});
