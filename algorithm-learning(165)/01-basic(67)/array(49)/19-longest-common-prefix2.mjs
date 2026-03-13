// node ./19-longest-common-prefix.mjs
/**
 * 14. 最长公共前缀 (Longest Common Prefix)
 * 难度: easy
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1：
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 * 示例 2：
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 * 约束条件:
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] 仅由小写英文字母组成
 *
 * 提示:
 *   1. 可以纵向扫描，逐个字符比较
 *   2. 也可以横向扫描，逐个字符串比较
 *   3. 取第一个字符串作为初始前缀，逐步缩短
 */

/**
 * @param {string[]} strs
 * @return {string}
 */
export function solution(strs) {
  if (strs.length === 0) return "";
  let preStr = strs[0];
  for (let i = 0; i < strs.length; i++){
    while (strs[i].indexOf(preStr) !== 0) {
      preStr = preStr.slice(0, -1);
      if (preStr) { return "" };
    }
  }
  return preStr;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 14. 最长公共前缀 (Longest Common Prefix)");
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

test("有公共前缀", () => {
  assert.deepStrictEqual(solution(["flower", "flow", "flight"]), "fl");
});

test("无公共前缀", () => {
  assert.deepStrictEqual(solution(["dog", "racecar", "car"]), "");
});

test("单字符串", () => {
  assert.deepStrictEqual(solution(["a"]), "a");
});

test("相同字符串", () => {
  assert.deepStrictEqual(solution(["aa", "aa", "aa"]), "aa");
});

test("空字符串", () => {
  assert.deepStrictEqual(solution(["", ""]), "");
});
