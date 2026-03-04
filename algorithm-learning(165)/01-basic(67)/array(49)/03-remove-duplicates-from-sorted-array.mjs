/**
 * 26. 删除有序数组中的重复项 (Remove Duplicates from Sorted Array)
 * 难度: easy
 *
 * 给你一个 非严格递增排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。
 * 
 * 考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：
 * 
 * - 更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
 * - 返回 k 。
 *
 * 示例 1：
 * 输入：nums = [1,1,2]
 * 输出：2, nums = [1,2,_]
 * 解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2 。不需要考虑数组中超出新长度后面的元素。
 * 
 * 示例 2：
 * 输入：nums = [0,0,1,1,1,2,2,3,3,4]
 * 输出：5, nums = [0,1,2,3,4,_,_,_,_,_]
 * 解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 。不需要考虑数组中超出新长度后面的元素。
 *
 * 约束条件:
 * - 1 <= nums.length <= 3 * 10^4
 * - -100 <= nums[i] <= 100
 * - nums 已按 非严格递增 排列
 *
 * 提示:
 *   1. 数组是有序的，相同的元素一定相邻
 *   2. 使用快慢双指针，慢指针指向最后一个不重复元素
 *   3. 当快指针发现新元素时，移动慢指针并覆盖
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
export function solution(nums) {
  // 在这里编写你的代码

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

test("基本测试", () => {
  assert.deepStrictEqual(solution([1,1,2]), 2);
});

test("多重复元素", () => {
  assert.deepStrictEqual(solution([0,0,1,1,1,2,2,3,3,4]), 5);
});

test("无重复", () => {
  assert.deepStrictEqual(solution([1,2,3]), 3);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1]), 1);
});

test("全部相同", () => {
  assert.deepStrictEqual(solution([2,2,2,2]), 1);
});
