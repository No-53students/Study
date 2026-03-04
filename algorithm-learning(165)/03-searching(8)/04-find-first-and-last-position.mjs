/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置 (Find First and Last Position of Element in Sorted Array)
 * 难度: medium
 *
 * 给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。
 * 
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 
 * 你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [5,7,7,8,8,10], target = 8
 * 输出：[3,4]
 * 
 * 示例 2：
 * 输入：nums = [5,7,7,8,8,10], target = 6
 * 输出：[-1,-1]
 * 
 * 示例 3：
 * 输入：nums = [], target = 0
 * 输出：[-1,-1]
 *
 * 约束条件:
 * - 0 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 * - nums 是一个非递减数组
 * - -10^9 <= target <= 10^9
 *
 * 提示:
 *   1. 使用两次二分查找
 *   2. 第一次找最左边的 target
 *   3. 第二次找最右边的 target
 */

export function searchRange(nums, target) {
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

test("找到范围", () => {
  assert.deepStrictEqual(searchRange([5,7,7,8,8,10], 8), [3,4]);
});

test("目标不存在", () => {
  assert.deepStrictEqual(searchRange([5,7,7,8,8,10], 6), [-1,-1]);
});

test("空数组", () => {
  assert.deepStrictEqual(searchRange([], 0), [-1,-1]);
});
