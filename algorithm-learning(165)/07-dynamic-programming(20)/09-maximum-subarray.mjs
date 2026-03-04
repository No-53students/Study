/**
 * 53. 最大子数组和 (Maximum Subarray)
 * 难度: medium
 *
 * 给你一个整数数组 nums，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 
 * 子数组 是数组中的一个连续部分。
 *
 * 示例 1：
 * 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
 * 输出：6
 * 解释：连续子数组 [4,-1,2,1] 的和最大，为 6。
 * 
 * 示例 2：
 * 输入：nums = [1]
 * 输出：1
 * 
 * 示例 3：
 * 输入：nums = [5,4,-1,7,8]
 * 输出：23
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 * 
 * 进阶： 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的 分治法 求解。
 *
 * 提示:
 *   1. 使用 Kadane 算法
 *   2. dp[i] 表示以 nums[i] 结尾的最大子数组和
 *   3. 状态转移：dp[i] = max(nums[i], dp[i-1] + nums[i])
 */

export function maxSubArray(nums) {
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
  assert.deepStrictEqual(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]), 6);
});

test("单元素", () => {
  assert.deepStrictEqual(maxSubArray([1]), 1);
});

test("全正数", () => {
  assert.deepStrictEqual(maxSubArray([5,4,-1,7,8]), 23);
});

test("全负数", () => {
  assert.deepStrictEqual(maxSubArray([-1,-2,-3]), -1);
});
