// node ./03-three-sum.mjs
/**
 * 15. 三数之和 (3Sum)
 * 难度: medium
 *
 * 给你一个整数数组 nums，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k，同时还满足 nums[i] + nums[j] + nums[k] == 0。请你返回所有和为 0 且不重复的三元组。
 * 
 * 注意： 答案中不可以包含重复的三元组。
 *
 * 示例 1：
 * 输入：nums = [-1,0,1,2,-1,-4]
 * 输出：[[-1,-1,2],[-1,0,1]]
 * 解释：
 * nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
 * nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
 * nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
 * 不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
 * 注意，输出的顺序和三元组的顺序并不重要。
 * 
 * 示例 2：
 * 输入：nums = [0,1,1]
 * 输出：[]
 * 解释：唯一可能的三元组和不为 0 。
 * 
 * 示例 3：
 * 输入：nums = [0,0,0]
 * 输出：[[0,0,0]]
 * 解释：唯一可能的三元组和为 0 。
 *
 * 约束条件:
 * - 3 <= nums.length <= 3000
 * - -10^5 <= nums[i] <= 10^5
 *
 * 提示:
 *   1. 先对数组排序，方便去重和使用双指针
 *   2. 固定第一个数，对剩余部分使用双指针
 *   3. 注意跳过重复元素以避免重复三元组
 */

export function threeSum(nums) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 15. 三数之和 (3Sum)");
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
  assert.deepStrictEqual(threeSum([-1,0,1,2,-1,-4]), [[-1,-1,2],[-1,0,1]]);
});

test("无解", () => {
  assert.deepStrictEqual(threeSum([0,1,1]), []);
});

test("全零", () => {
  assert.deepStrictEqual(threeSum([0,0,0]), [[0,0,0]]);
});

test("多个解", () => {
  assert.deepStrictEqual(threeSum([-2,0,1,1,2]), [[-2,0,2],[-2,1,1]]);
});
