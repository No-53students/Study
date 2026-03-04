/**
 * 35. 搜索插入位置 (Search Insert Position)
 * 难度: easy
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * 
 * 请必须使用时间复杂度为 O(log n) 的算法。
 *
 * 示例 1：
 * 输入：nums = [1,3,5,6], target = 5
 * 输出：2
 * 
 * 示例 2：
 * 输入：nums = [1,3,5,6], target = 2
 * 输出：1
 * 
 * 示例 3：
 * 输入：nums = [1,3,5,6], target = 7
 * 输出：4
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - -10^4 <= nums[i] <= 10^4
 * - nums 为 无重复元素 的 升序 排列数组
 * - -10^4 <= target <= 10^4
 *
 * 提示:
 *   1. 标准的二分查找
 *   2. 找不到时返回 left，即第一个大于 target 的位置
 *   3. 注意边界情况
 */

export function searchInsert(nums, target) {
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

test("找到目标", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 5), 2);
});

test("插入中间", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 2), 1);
});

test("插入末尾", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 7), 4);
});

test("插入开头", () => {
  assert.deepStrictEqual(searchInsert([1,3,5,6], 0), 0);
});
