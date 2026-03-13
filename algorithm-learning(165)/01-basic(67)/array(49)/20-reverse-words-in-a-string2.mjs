// node ./20-reverse-words-in-a-string.mjs
/**
 * 151. 反转字符串中的单词 (Reverse Words in a String)
 * 难度: medium
 *
 * 给你一个字符串 s ，请你反转字符串中 单词 的顺序。
 *
 * 单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。
 *
 * 返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。
 *
 * 注意：输入字符串 s 中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。
 *
 * 示例 1：
 * 输入：s = "the sky is blue"
 * 输出："blue is sky the"
 *
 * 示例 2：
 * 输入：s = "  hello world  "
 * 输出："world hello"
 * 解释：反转后的字符串中不能存在前导空格和尾随空格。
 *
 * 示例 3：
 * 输入：s = "a good   example"
 * 输出："example good a"
 * 解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。
 *
 * 约束条件:
 * - 1 <= s.length <= 10^4
 * - s 包含英文大小写字母、数字和空格 ' '
 * - s 中 至少存在一个 单词
 *
 * 进阶：如果字符串在你使用的编程语言中是一种可变数据类型，请尝试使用 O(1) 额外空间复杂度的 原地 解法。
 *
 * 提示:
 *   1. 可以使用语言内置的字符串分割和反转功能
 *   2. 原地解法：先整体反转，再逐个单词反转
 *   3. 注意处理多余空格
 */

/**
 * @param {string} s
 * @return {string}
 */
export function solution(s) {
  // 链式调用各方法是否改变原数组：
  //   .trim()            → 字符串方法，返回新字符串，不改变原始 s
  //   .split(" ")        → 字符串方法，返回新数组，不改变原始 s
  //                        注意：split(" ") 遇到连续空格会产生空字符串 ""
  //                        例："a  b".split(" ") → ["a", "", "b"]
  //   .filter(item!=="") → 过滤掉空字符串，返回新数组，不改变原数组
  //                        ⚠️ 易错：filter 条件应为 item !== ""（空字符串）
  //                              而非 item !== " "（空格），因为 split 产生的是空字符串
  //   .reverse()         → ⚠️ 唯一会改变原数组的方法！原地反转
  //                        但此处调用在 filter 产生的新数组上，不影响原始 s
  //                        如需不改变原数组：用 [...arr].reverse() 或 arr.toReversed()（ES2023）
  //   .join(" ")         → 返回新字符串，不改变数组
  return s
    .trim()
    .split(" ")
    .filter((item) => item !== "")
    .reverse()
    .join(" ");
}

// ---- 测试用例 ----
console.log("\n📝 题目: 151. 反转字符串中的单词 (Reverse Words in a String)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("基本测试", () => {
  assert.deepStrictEqual(solution("the sky is blue"), "blue is sky the");
});

test("首尾空格", () => {
  assert.deepStrictEqual(solution("  hello world  "), "world hello");
});

test("多余空格", () => {
  assert.deepStrictEqual(solution("a good   example"), "example good a");
});

test("单词", () => {
  assert.deepStrictEqual(solution("hello"), "hello");
});

test("两单词", () => {
  assert.deepStrictEqual(solution("  a  b  "), "b a");
});
