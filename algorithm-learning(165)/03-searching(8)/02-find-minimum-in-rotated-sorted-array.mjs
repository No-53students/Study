/**
 * 153. 寻找旋转排序数组中的最小值 (Find Minimum in Rotated Sorted Array)
 * 难度: medium
 *
 * 已知一个长度为 n 的数组，预先按照升序排列，经由 1 到 n 次 旋转 后，得到输入数组。例如，原数组 nums = [0,1,2,4,5,6,7] 在变化后可能得到：
 * - 若旋转 4 次，则可以得到 [4,5,6,7,0,1,2]
 * - 若旋转 7 次，则可以得到 [0,1,2,4,5,6,7]
 * 
 * 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]]。
 * 
 * 给你一个元素值 互不相同 的数组 nums，它原来是一个升序排列的数组，并按上述情形进行了多次旋转。请你找出并返回数组中的 最小元素。
 * 
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [3,4,5,1,2]
 * 输出：1
 * 解释：原数组为 [1,2,3,4,5]，旋转 3 次得到输入数组。
 * 
 * 示例 2：
 * 输入：nums = [4,5,6,7,0,1,2]
 * 输出：0
 * 解释：原数组为 [0,1,2,4,5,6,7]，旋转 3 次得到输入数组。
 * 
 * 示例 3：
 * 输入：nums = [11,13,15,17]
 * 输出：11
 * 解释：原数组为 [11,13,15,17]，旋转 4 次得到输入数组。
 *
 * 约束条件:
 * - n == nums.length
 * - 1 <= n <= 5000
 * - -5000 <= nums[i] <= 5000
 * - nums 中的所有整数 互不相同
 * - nums 原来是一个升序排序的数组，并进行了 1 至 n 次旋转
 *
 * 提示:
 *   1. 最小值是唯一一个比前一个元素小的元素
 *   2. 比较 mid 和 right，判断最小值在哪一半
 *   3. 注意边界条件
 */

export function findMin(nums) {
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

test("旋转3次", () => {
  assert.deepStrictEqual(findMin([[3,4,5,1,2]]), 1);
});

test("旋转4次", () => {
  assert.deepStrictEqual(findMin([[4,5,6,7,0,1,2]]), 0);
});

test("完整旋转", () => {
  assert.deepStrictEqual(findMin([[11,13,15,17]]), 11);
});
