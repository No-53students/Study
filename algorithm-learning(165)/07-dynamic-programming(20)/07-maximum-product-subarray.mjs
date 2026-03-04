/**
 * 152. 乘积最大子数组 (Maximum Product Subarray)
 * 难度: medium
 *
 * 给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
 * 
 * 测试用例的答案是一个 32 位整数。
 *
 * 示例 1：
 * 输入：nums = [2,3,-2,4]
 * 输出：6
 * 解释：子数组 [2,3] 有最大乘积 6。
 * 
 * 示例 2：
 * 输入：nums = [-2,0,-1]
 * 输出：0
 * 解释：结果不能为 2, 因为 [-2,-1] 不是子数组。
 *
 * 约束条件:
 * - 1 <= nums.length <= 2 * 10^4
 * - -10 <= nums[i] <= 10
 * - nums 的任何子数组的乘积都 保证 是一个 32 位整数
 *
 * 提示:
 *   1. 负数乘负数会变成正数
 *   2. 需要同时维护最大值和最小值
 *   3. 遇到负数时，最大最小值互换
 */

export function maxProduct(nums) {
  // 在此处编写代码
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
  assert.deepStrictEqual(maxProduct([2,3,-2,4]), 6);
});

test("示例2", () => {
  assert.deepStrictEqual(maxProduct([-2,0,-1]), 0);
});

test("单个负数", () => {
  assert.deepStrictEqual(maxProduct([-2]), -2);
});
