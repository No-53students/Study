/**
 * 209. 长度最小的子数组 (Minimum Size Subarray Sum)
 * 难度: medium
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 target。
 * 
 * 找出该数组中满足其总和大于等于 target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr]，并返回其长度。如果不存在符合条件的子数组，返回 0。
 *
 * 示例 1：
 * 输入：target = 7, nums = [2,3,1,2,4,3]
 * 输出：2
 * 解释：子数组 [4,3] 是该条件下的长度最小的子数组。
 * 
 * 示例 2：
 * 输入：target = 4, nums = [1,4,4]
 * 输出：1
 * 
 * 示例 3：
 * 输入：target = 11, nums = [1,1,1,1,1,1,1,1]
 * 输出：0
 *
 * 约束条件:
 * - 1 <= target <= 10^9
 * - 1 <= nums.length <= 10^5
 * - 1 <= nums[i] <= 10^4
 * 
 * 进阶： 如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。
 *
 * 提示:
 *   1. 使用滑动窗口，维护一个和大于等于 target 的窗口
 *   2. 右指针负责扩展窗口，左指针负责收缩窗口
 *   3. 当窗口和 >= target 时，尝试收缩窗口并更新最小长度
 */

export function minSubArrayLen(target, nums) {
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
  assert.deepStrictEqual(minSubArrayLen(7, [2,3,1,2,4,3]), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(minSubArrayLen(4, [1,4,4]), 1);
});

test("无解", () => {
  assert.deepStrictEqual(minSubArrayLen(11, [1,1,1,1,1,1,1,1]), 0);
});

test("整个数组", () => {
  assert.deepStrictEqual(minSubArrayLen(15, [1,2,3,4,5]), 5);
});
