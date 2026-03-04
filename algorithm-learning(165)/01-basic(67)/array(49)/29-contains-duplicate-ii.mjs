/**
 * 219. 存在重复元素 II (Contains Duplicate II)
 * 难度: easy
 *
 * 给你一个整数数组 nums 和一个整数 k，判断数组中是否存在两个 不同的索引 i 和 j，满足 nums[i] == nums[j] 且 abs(i - j) <= k。如果存在，返回 true；否则，返回 false。
 *
 * 示例 1：
 * 输入：nums = [1,2,3,1], k = 3
 * 输出：true
 * 
 * 示例 2：
 * 输入：nums = [1,0,1,1], k = 1
 * 输出：true
 * 
 * 示例 3：
 * 输入：nums = [1,2,3,1,2,3], k = 2
 * 输出：false
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 * - 0 <= k <= 10^5
 *
 * 提示:
 *   1. 使用哈希表记录每个数最后出现的位置
 *   2. 如果当前数已在哈希表中，检查距离是否 <= k
 *   3. 更新哈希表中的位置为当前位置
 */

export function containsNearbyDuplicate(nums, k) {
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
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,3,1], 3), true);
});

test("示例2", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,0,1,1], 1), true);
});

test("示例3", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,3,1,2,3], 2), false);
});

test("k=0", () => {
  assert.deepStrictEqual(containsNearbyDuplicate([1,2,1], 0), false);
});
