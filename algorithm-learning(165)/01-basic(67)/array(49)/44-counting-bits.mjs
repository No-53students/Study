// node ./44-counting-bits.mjs
/**
 * 338. 比特位计数 (Counting Bits)
 * 难度: easy
 *
 * 给你一个整数 n，对于 0 <= i <= n 中的每个 i，计算其二进制表示中 1 的个数，返回一个长度为 n + 1 的数组 ans 作为答案。
 *
 * 示例 1：
 * 输入：n = 2
 * 输出：[0,1,1]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 
 * 示例 2：
 * 输入：n = 5
 * 输出：[0,1,1,2,1,2]
 * 解释：
 * 0 --> 0
 * 1 --> 1
 * 2 --> 10
 * 3 --> 11
 * 4 --> 100
 * 5 --> 101
 *
 * 约束条件:
 * - 0 <= n <= 10^5
 *
 * 提示:
 *   1. 利用 i & (i-1) 消除最低位 1 的性质
 *   2. ans[i] = ans[i & (i-1)] + 1
 *   3. 这是一个动态规划问题
 */

export function countBits(n) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 338. 比特位计数 (Counting Bits)");
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

test("n=2", () => {
  assert.deepStrictEqual(countBits(2), [0,1,1]);
});

test("n=5", () => {
  assert.deepStrictEqual(countBits(5), [0,1,1,2,1,2]);
});
