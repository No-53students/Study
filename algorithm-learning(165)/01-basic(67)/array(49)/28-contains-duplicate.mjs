/**
 * 217. 存在重复元素 (Contains Duplicate)
 * 难度: easy
 *
 * 给你一个整数数组 nums。如果任一值在数组中出现 至少两次，返回 true；如果数组中每个元素互不相同，返回 false。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,1]
 * 输出：true
 * 解释：元素 1 在下标 0 和 3 出现了两次。
 * 
 * 示例 2：
 * 输入：nums = [1,2,3,4]
 * 输出：false
 * 解释：所有元素都不同。
 * 
 * 示例 3：
 * 输入：nums = [1,1,1,3,3,4,3,2,4,2]
 * 输出：true
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 *
 * 提示:
 *   1. 使用 Set 存储已遍历的元素
 *   2. 如果当前元素已在 Set 中，说明有重复
 *   3. 也可以比较 Set 的大小和数组长度
 */

export function containsDuplicate(nums) {
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
  assert.deepStrictEqual(containsDuplicate([1,2,3,1]), true);
});

test("示例2", () => {
  assert.deepStrictEqual(containsDuplicate([1,2,3,4]), false);
});

test("多重复", () => {
  assert.deepStrictEqual(containsDuplicate([1,1,1,3,3,4,3,2,4,2]), true);
});

test("单元素", () => {
  assert.deepStrictEqual(containsDuplicate([1]), false);
});
