/**
 * 139. 单词拆分 (Word Break)
 * 难度: medium
 *
 * 给你一个字符串 s 和一个字符串列表 wordDict 作为字典。如果可以利用字典中出现的一个或多个单词拼接出 s 则返回 true。
 * 
 * 注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
 *
 * 示例 1：
 * 输入：s = "leetcode", wordDict = ["leet","code"]
 * 输出：true
 * 解释：返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。
 * 
 * 示例 2：
 * 输入：s = "applepenapple", wordDict = ["apple","pen"]
 * 输出：true
 * 解释：返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
 *      注意，你可以重复使用字典中的单词。
 * 
 * 示例 3：
 * 输入：s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
 * 输出：false
 *
 * 约束条件:
 * - 1 <= s.length <= 300
 * - 1 <= wordDict.length <= 1000
 * - 1 <= wordDict[i].length <= 20
 * - s 和 wordDict[i] 仅由小写英文字母组成
 * - wordDict 中的所有字符串 互不相同
 *
 * 提示:
 *   1. dp[i] 表示 s[0...i-1] 是否可以被拆分
 *   2. dp[i] = dp[j] && wordDict.contains(s[j...i-1])
 *   3. 用 Set 加速单词查找
 */

export function wordBreak(s, wordDict) {
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

test("可拆分", () => {
  assert.deepStrictEqual(wordBreak("leetcode", ["leet","code"]), true);
});

test("重复使用", () => {
  assert.deepStrictEqual(wordBreak("applepenapple", ["apple","pen"]), true);
});

test("不可拆分", () => {
  assert.deepStrictEqual(wordBreak("catsandog", ["cats","dog","sand","and","cat"]), false);
});
