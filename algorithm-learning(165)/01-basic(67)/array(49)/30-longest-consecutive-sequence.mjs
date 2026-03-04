/**
 * 128. 最长连续序列 (Longest Consecutive Sequence)
 * 难度: medium
 *
 * 给定一个未排序的整数数组 nums，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
 * 
 * 请你设计并实现时间复杂度为 O(n) 的算法解决此问题。
 *
 * 示例 1：
 * 输入：nums = [100,4,200,1,3,2]
 * 输出：4
 * 解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。
 * 
 * 示例 2：
 * 输入：nums = [0,3,7,2,5,8,4,6,0,1]
 * 输出：9
 *
 * 约束条件:
 * - 0 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 *
 * 提示:
 *   1. 使用 Set 存储所有数字，O(1) 查找
 *   2. 只从序列的起点开始计数，避免重复
 *   3. 如果 num-1 不在 Set 中，说明 num 是序列起点
 */

export function longestConsecutive(nums) {
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
  assert.deepStrictEqual(longestConsecutive([100,4,200,1,3,2]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(longestConsecutive([0,3,7,2,5,8,4,6,0,1]), 9);
});

test("空数组", () => {
  assert.deepStrictEqual(longestConsecutive([]), 0);
});

test("单元素", () => {
  assert.deepStrictEqual(longestConsecutive([1]), 1);
});
