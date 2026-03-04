/**
 * 198. 打家劫舍 (House Robber)
 * 难度: medium
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * 
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,1]
 * 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1)，然后偷窃 3 号房屋 (金额 = 3)。
 *      偷窃到的最高金额 = 1 + 3 = 4。
 * 
 * 示例 2：
 * 输入：nums = [2,7,9,3,1]
 * 输出：12
 * 解释：偷窃 1 号房屋 (金额 = 2)，偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 *      偷窃到的最高金额 = 2 + 9 + 1 = 12。
 *
 * 约束条件:
 * - 1 <= nums.length <= 100
 * - 0 <= nums[i] <= 400
 *
 * 提示:
 *   1. 对于第 i 个房屋，要么偷（加上 i-2 的最大值），要么不偷（取 i-1 的最大值）
 *   2. dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 *   3. 可以用滚动变量优化空间
 */

export function rob(nums) {
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
  assert.deepStrictEqual(rob([[1,2,3,1]]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(rob([[2,7,9,3,1]]), 12);
});
