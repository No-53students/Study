/**
 * 238. 除自身以外数组的乘积 (Product of Array Except Self)
 * 难度: medium
 *
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 
 * 题目数据 保证 数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内。
 * 
 * 请 不要使用除法，且在 O(n) 时间复杂度内完成此题。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,4]
 * 输出：[24,12,8,6]
 * 
 * 示例 2：
 * 输入：nums = [-1,1,0,-3,3]
 * 输出：[0,0,9,0,0]
 *
 * 约束条件:
 * - 2 <= nums.length <= 10^5
 * - -30 <= nums[i] <= 30
 * - 保证 数组 nums 之中任意元素的全部前缀元素和后缀的乘积都在 32 位 整数范围内
 * 
 * 进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（出于对空间复杂度分析的目的，输出数组 不被视为 额外空间）
 *
 * 提示:
 *   1. answer[i] = 左侧所有数的乘积 × 右侧所有数的乘积
 *   2. 先从左到右计算左侧乘积
 *   3. 再从右到左计算右侧乘积并合并
 */

/**
 * @param {number[]} nums
 * @return {number[]}
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
  assert.deepStrictEqual(solution([1,2,3,4]), [24,12,8,6]);
});

test("含0", () => {
  assert.deepStrictEqual(solution([-1,1,0,-3,3]), [0,0,9,0,0]);
});

test("两元素", () => {
  assert.deepStrictEqual(solution([2,3]), [3,2]);
});

test("含负数", () => {
  assert.deepStrictEqual(solution([-1,-2,-3]), [6,3,2]);
});

test("多个0", () => {
  assert.deepStrictEqual(solution([0,0,1]), [0,0,0]);
});
