// node ./16-roman-to-integer.mjs
/**
 * 13. 罗马数字转整数 (Roman to Integer)
 * 难度: easy
 *
 * 罗马数字包含以下七种字符: I， V， X， L，C，D 和 M。
 *
 * 字符          数值
 * I             1
 * V             5
 * X             10
 * L             50
 * C             100
 * D             500
 * M             1000
 *
 * 例如， 罗马数字 2 写做 II ，即为两个并列的 1 。12 写做 XII ，即为 X + II 。 27 写做 XXVII, 即为 XX + V + II 。
 *
 * 通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 IIII，而是 IV。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 IX。这个特殊的规则只适用于以下六种情况：
 *
 * - I 可以放在 V (5) 和 X (10) 的左边，来表示 4 和 9。
 * - X 可以放在 L (50) 和 C (100) 的左边，来表示 40 和 90。
 * - C 可以放在 D (500) 和 M (1000) 的左边，来表示 400 和 900。
 *
 * 给定一个罗马数字，将其转换成整数。
 *
 * 示例 1：
 * 输入：s = "III"
 * 输出：3
 *
 * 示例 2：
 * 输入：s = "IV"
 * 输出：4
 *
 * 示例 3：
 * 输入：s = "IX"
 * 输出：9
 *
 * 示例 4：
 * 输入：s = "LVIII"
 * 输出：58
 * 解释：L = 50, V= 5, III = 3.
 *
 * 示例 5：
 * 输入：s = "MCMXCIV"
 * 输出：1994
 * 解释：M = 1000, CM = 900, XC = 90, IV = 4.
 *
 * 约束条件:
 * - 1 <= s.length <= 15
 * - s 仅含字符 ('I', 'V', 'X', 'L', 'C', 'D', 'M')
 * - 题目数据保证 s 是一个有效的罗马数字，且表示整数在范围 [1, 3999] 内
 *
 * 提示:
 *   1. 使用哈希表存储每个罗马字符对应的数值
 *   2. 如果当前字符比下一个字符小，则减去当前值
 *   3. 否则加上当前值
 */

/**
 * @param {string} s
 * @return {number}
 */
export function solution(s) {
  console.log("s", s);
  let res = 0;
  // 在这里编写你的代码
  const ob1 = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  for (let i = 0; i < s.length; i++){
    console.log(i, s[i], ob1[s[i]], ob1[s[i + 1]]);
    if (ob1[s[i]] >= (ob1[s[i + 1]] || 0)) {
      res += ob1[s[i]];
    } else {
      res -= ob1[s[i]];
    }
  }

  return res
}

// ---- 测试用例 ----
console.log("\n📝 题目: 13. 罗马数字转整数 (Roman to Integer)");
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

test("简单加法", () => {
  assert.deepStrictEqual(solution("III"), 3);
});

test("减法IV", () => {
  assert.deepStrictEqual(solution("IV"), 4);
});

test("减法IX", () => {
  assert.deepStrictEqual(solution("IX"), 9);
});

test("混合", () => {
  assert.deepStrictEqual(solution("LVIII"), 58);
});

test("复杂", () => {
  assert.deepStrictEqual(solution("MCMXCIV"), 1994);
});
