/**
 * 242. 有效的字母异位词 (Valid Anagram)
 * 难度: easy
 *
 * 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 注意： 若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 *
 * 示例 1：
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 示例 2：
 * 输入: s = "rat", t = "car"
 * 输出: false
 *
 * 约束条件:
 * - 1 <= s.length, t.length <= 5 * 10^4
 * - s 和 t 仅包含小写字母
 * 
 * 进阶： 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 *
 * 提示:
 *   1. 如果两个字符串长度不同，肯定不是异位词
 *   2. 可以用数组统计每个字符出现的次数
 *   3. s 中的字符加一，t 中的字符减一，最后检查是否全为0
 */

export function isAnagram(s, t) {
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
  assert.deepStrictEqual(isAnagram("anagram", "nagaram"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isAnagram("rat", "car"), false);
});

test("相同字符串", () => {
  assert.deepStrictEqual(isAnagram("abc", "abc"), true);
});

test("长度不同", () => {
  assert.deepStrictEqual(isAnagram("ab", "abc"), false);
});
