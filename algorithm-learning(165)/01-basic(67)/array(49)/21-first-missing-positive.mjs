/**
 * 41. 缺失的第一个正数 (First Missing Positive)
 * 难度: hard
 *
 * 给你一个未排序的整数数组 nums，请你找出其中没有出现的最小的正整数。
 * 
 * 请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。
 *
 * 示例 1：
 * 输入：nums = [1,2,0]
 * 输出：3
 * 
 * 示例 2：
 * 输入：nums = [3,4,-1,1]
 * 输出：2
 * 
 * 示例 3：
 * 输入：nums = [7,8,9,11,12]
 * 输出：1
 *
 * 约束条件:
 * - 1 <= nums.length <= 5 * 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 *
 * 提示:
 *   1. 答案一定在 [1, n+1] 范围内
 *   2. 把数组当作哈希表使用
 *   3. 将每个正整数 x 放到索引 x-1 的位置
 */

export function firstMissingPositive(nums) {
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
  assert.deepStrictEqual(firstMissingPositive([1,2,0]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(firstMissingPositive([3,4,-1,1]), 2);
});

test("示例3", () => {
  assert.deepStrictEqual(firstMissingPositive([7,8,9,11,12]), 1);
});

test("连续", () => {
  assert.deepStrictEqual(firstMissingPositive([1,2,3]), 4);
});
