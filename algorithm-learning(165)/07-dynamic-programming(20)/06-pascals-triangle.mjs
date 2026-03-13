// node ./06-pascals-triangle.mjs
/**
 * 118. 杨辉三角 (Pascal's Triangle)
 * 难度: easy
 *
 * 给定一个非负整数 numRows，生成「杨辉三角」的前 numRows 行。
 * 
 * 在「杨辉三角」中，每个数是它左上方和右上方的数的和。
 *
 * 示例 1：
 * 输入：numRows = 5
 * 输出：[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
 * 
 * 示例 2：
 * 输入：numRows = 1
 * 输出：[[1]]
 *
 * 约束条件:
 * - 1 <= numRows <= 30
 *
 * 提示:
 *   1. 每一行的首尾都是 1
 *   2. 中间的数等于上一行相邻两数之和
 *   3. 第 i 行有 i+1 个数
 */

export function generate(numRows) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 118. 杨辉三角 (Pascal's Triangle)");
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

test("5行", () => {
  assert.deepStrictEqual(generate(5), [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]);
});

test("1行", () => {
  assert.deepStrictEqual(generate(1), [[1]]);
});
