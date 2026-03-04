/**
 * 17. 电话号码的字母组合 (Letter Combinations of a Phone Number)
 * 难度: medium
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * 
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 * 
 * 2 -> abc
 * 3 -> def
 * 4 -> ghi
 * 5 -> jkl
 * 6 -> mno
 * 7 -> pqrs
 * 8 -> tuv
 * 9 -> wxyz
 *
 * 示例 1：
 * 输入：digits = "23"
 * 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]
 * 
 * 示例 2：
 * 输入：digits = ""
 * 输出：[]
 * 
 * 示例 3：
 * 输入：digits = "2"
 * 输出：["a","b","c"]
 *
 * 约束条件:
 * - 0 <= digits.length <= 4
 * - digits[i] 是范围 ['2', '9'] 的一个数字
 *
 * 提示:
 *   1. 使用哈希表存储数字到字母的映射
 *   2. 回溯遍历每个数字对应的所有字母
 *   3. 当路径长度等于输入长度时，记录结果
 */

export function letterCombinations(digits) {
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

test("两数字", () => {
  assert.deepStrictEqual(letterCombinations("23"), ["ad","ae","af","bd","be","bf","cd","ce","cf"]);
});

test("空输入", () => {
  assert.deepStrictEqual(letterCombinations(""), []);
});

test("单数字", () => {
  assert.deepStrictEqual(letterCombinations("2"), ["a","b","c"]);
});
