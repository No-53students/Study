/**
 * 205. 同构字符串 (Isomorphic Strings)
 * 难度: easy
 *
 * 给定两个字符串 s 和 t，判断它们是否是同构的。
 * 
 * 如果 s 中的字符可以按某种映射关系替换得到 t，那么这两个字符串是同构的。
 * 
 * 每个出现的字符都应当映射到另一个字符，同时不改变字符的顺序。不同字符不能映射到同一个字符上，相同字符只能映射到同一个字符上，字符可以映射到自己本身。
 *
 * 示例 1：
 * 输入：s = "egg", t = "add"
 * 输出：true
 * 
 * 示例 2：
 * 输入：s = "foo", t = "bar"
 * 输出：false
 * 
 * 示例 3：
 * 输入：s = "paper", t = "title"
 * 输出：true
 *
 * 约束条件:
 * - 1 <= s.length <= 5 * 10^4
 * - t.length == s.length
 * - s 和 t 由任意有效的 ASCII 字符组成
 *
 * 提示:
 *   1. 需要建立双向映射：s 到 t 和 t 到 s
 *   2. 使用两个哈希表分别记录映射关系
 *   3. 遍历时检查映射是否一致
 */

export function isIsomorphic(s, t) {
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
  assert.deepStrictEqual(isIsomorphic("egg", "add"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isIsomorphic("foo", "bar"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(isIsomorphic("paper", "title"), true);
});

test("单字符", () => {
  assert.deepStrictEqual(isIsomorphic("a", "b"), true);
});
