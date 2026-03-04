/**
 * 416. 分割等和子集 (Partition Equal Subset Sum)
 * 难度: medium
 *
 * 给你一个 只包含正整数 的 非空 数组 nums 。请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 * 示例 1：
 * 输入：nums = [1,5,11,5]
 * 输出：true
 * 解释：数组可以分割成 [1, 5, 5] 和 [11]。
 * 
 * 示例 2：
 * 输入：nums = [1,2,3,5]
 * 输出：false
 * 解释：数组不能分割成两个元素和相等的子集。
 *
 * 约束条件:
 * - 1 <= nums.length <= 200
 * - 1 <= nums[i] <= 100
 *
 * 提示:
 *   1. 问题转化为：能否选出若干数，使和为 sum/2
 *   2. 这是 0-1 背包问题
 *   3. 从后往前遍历避免重复使用
 */

export function canPartition(nums) {
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

test("可分割", () => {
  assert.deepStrictEqual(canPartition([1,5,11,5]), true);
});

test("不可分割", () => {
  assert.deepStrictEqual(canPartition([1,2,3,5]), false);
});
