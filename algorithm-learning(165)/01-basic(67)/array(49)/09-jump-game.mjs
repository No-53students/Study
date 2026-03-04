/**
 * 55. 跳跃游戏 (Jump Game)
 * 难度: medium
 *
 * 给你一个非负整数数组 nums ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 
 * 判断你是否能够到达最后一个下标，如果可以，返回 true ；否则，返回 false 。
 *
 * 示例 1：
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 
 * 示例 2：
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - 0 <= nums[i] <= 10^5
 *
 * 提示:
 *   1. 贪心思想：维护能到达的最远位置
 *   2. 遍历时检查当前位置是否可达
 *   3. 如果最远位置 >= 数组长度-1，就能到达终点
 */

/**
 * @param {number[]} nums
 * @return {boolean}
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

test("可以到达", () => {
  assert.deepStrictEqual(solution([2,3,1,1,4]), true);
});

test("无法到达", () => {
  assert.deepStrictEqual(solution([3,2,1,0,4]), false);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([0]), true);
});

test("直接跳到", () => {
  assert.deepStrictEqual(solution([5,0,0,0,0]), true);
});

test("每步只能跳1", () => {
  assert.deepStrictEqual(solution([1,1,1,1]), true);
});
