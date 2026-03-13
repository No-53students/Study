// node ./07-median-of-two-sorted-arrays.mjs
/**
 * 4. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)
 * 难度: hard
 *
 * 给定两个大小分别为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。请你找出并返回这两个正序数组的 中位数。
 * 
 * 算法的时间复杂度应该为 O(log (m+n))。
 *
 * 示例 1：
 * 输入：nums1 = [1,3], nums2 = [2]
 * 输出：2.00000
 * 解释：合并数组 = [1,2,3]，中位数 2
 * 
 * 示例 2：
 * 输入：nums1 = [1,2], nums2 = [3,4]
 * 输出：2.50000
 * 解释：合并数组 = [1,2,3,4]，中位数 (2 + 3) / 2 = 2.5
 *
 * 约束条件:
 * - nums1.length == m
 * - nums2.length == n
 * - 0 <= m <= 1000
 * - 0 <= n <= 1000
 * - 1 <= m + n <= 2000
 * - -10^6 <= nums1[i], nums2[i] <= 10^6
 *
 * 提示:
 *   1. 在较短的数组上二分查找分割点
 *   2. 确保左半部分最大值 <= 右半部分最小值
 *   3. 处理边界情况时使用 ±Infinity
 */

export function findMedianSortedArrays(nums1, nums2) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 4. 寻找两个正序数组的中位数 (Median of Two Sorted Arrays)");
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

test("奇数个元素", () => {
  assert.deepStrictEqual(findMedianSortedArrays([1,3], [2]), 2);
});

test("偶数个元素", () => {
  assert.deepStrictEqual(findMedianSortedArrays([1,2], [3,4]), 2.5);
});
