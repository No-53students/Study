/**
 * 215. 数组中的第K个最大元素 (Kth Largest Element in an Array)
 * 难度: medium
 *
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * 
 * 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [3,2,1,5,6,4], k = 2
 * 输出：5
 * 
 * 示例 2：
 * 输入：nums = [3,2,3,1,2,4,5,5,6], k = 4
 * 输出：4
 *
 * 约束条件:
 * - 1 <= k <= nums.length <= 10^5
 * - -10^4 <= nums[i] <= 10^4
 *
 * 提示:
 *   1. 可以使用快速选择算法，时间复杂度 O(n)
 *   2. 也可以使用最小堆，维护 k 个最大元素
 *   3. 第 k 大等于第 n-k+1 小
 */

export function findKthLargest(nums, k) {
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
  assert.deepStrictEqual(findKthLargest([3,2,1,5,6,4], 2), 5);
});

test("示例2", () => {
  assert.deepStrictEqual(findKthLargest([3,2,3,1,2,4,5,5,6], 4), 4);
});
