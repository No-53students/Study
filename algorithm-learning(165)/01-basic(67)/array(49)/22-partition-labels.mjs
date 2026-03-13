// node ./22-partition-labels.mjs
/**
 * 763. 划分字母区间 (Partition Labels)
 * 难度: medium
 *
 * 给你一个字符串 s。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。
 *
 * 注意，划分结果需要满足：将所有划分结果按顺序连接，得到的字符串仍然是 s。
 *
 * 返回一个表示每个字符串片段的长度的列表。
 *
 * 示例 1：
 * 输入：s = "ababcbacadefegdehijhklij"
 * 输出：[9,7,8]
 * 解释：
 * 划分结果为 "ababcbaca"、"defegde"、"hijhklij"。
 * 每个字母最多出现在一个片段中。
 * 像 "ababcbacadefegde", "hijhklij" 这样的划分是错误的，因为划分的片段数较少。
 *
 * 示例 2：
 * 输入：s = "eccbbbbdec"
 * 输出：[10]
 *
 * 约束条件:
 * - 1 <= s.length <= 500
 * - s 仅由小写英文字母组成
 *
 * 提示:
 *   1. 首先记录每个字母最后出现的位置
 *   2. 遍历字符串，维护当前片段的结束位置
 *   3. 当遍历到结束位置时，完成一个片段的划分
 */

export function partitionLabels(s) {
  const obj = {};
  const arr = [];
  const numArr = [];
  let str = "";
  let end = 0;
  // 在此处编写你的代码
  for (let i = 0; i < s.length; i++) {
    obj[s[i]] = i;
  }
  // 查询断点
  for (let i = 0; i < s.length; i++) {
    str += s[i];
    end = Math.max(end, obj[s[i]]);

    // 如果当前字符大于边界，则可以断开
    if (i >= end) {
      arr.push(str);
      numArr.push(str.length);
      // 重置数据
      str = "";
    }
  }
  return numArr;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 763. 划分字母区间 (Partition Labels)");
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

test("示例1", () => {
  assert.deepStrictEqual(
    partitionLabels("ababcbacadefegdehijhklij"),
    [9, 7, 8],
  );
});

test("示例2", () => {
  assert.deepStrictEqual(partitionLabels("eccbbbbdec"), [10]);
});

test("每字母一段", () => {
  assert.deepStrictEqual(partitionLabels("abc"), [1,1,1]);
});
