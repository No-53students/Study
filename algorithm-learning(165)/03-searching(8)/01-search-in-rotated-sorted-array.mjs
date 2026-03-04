/**
 * 33. 搜索旋转排序数组 (Search in Rotated Sorted Array)
 * 难度: medium
 *
 * 整数数组 nums 按升序排列，数组中的值 互不相同。
 * 
 * 在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。例如，[0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2]。
 * 
 * 给你 旋转后 的数组 nums 和一个整数 target，如果 nums 中存在这个目标值 target，则返回它的下标，否则返回 -1。
 * 
 * 你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [4,5,6,7,0,1,2], target = 0
 * 输出：4
 * 
 * 示例 2：
 * 输入：nums = [4,5,6,7,0,1,2], target = 3
 * 输出：-1
 * 
 * 示例 3：
 * 输入：nums = [1], target = 0
 * 输出：-1
 *
 * 约束条件:
 * - 1 <= nums.length <= 5000
 * - -10^4 <= nums[i] <= 10^4
 * - nums 中的每个值都 独一无二
 * - 题目数据保证 nums 在预先未知的某个下标上进行了旋转
 * - -10^4 <= target <= 10^4
 *
 * 提示:
 *   1. 二分查找，但需要判断哪一半是有序的
 *   2. 根据有序的那一半判断 target 在哪边
 *   3. 注意边界条件的处理
 */

export function search(nums, target) {
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
  assert.deepStrictEqual(search([4,5,6,7,0,1,2], 0), 4);
});

test("目标不存在", () => {
  assert.deepStrictEqual(search([4,5,6,7,0,1,2], 3), -1);
});

test("单元素", () => {
  assert.deepStrictEqual(search([1], 0), -1);
});
