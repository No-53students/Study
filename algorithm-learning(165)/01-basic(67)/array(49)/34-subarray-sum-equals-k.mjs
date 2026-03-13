// node ./34-subarray-sum-equals-k.mjs
/**
 * 560. 和为 K 的子数组 (Subarray Sum Equals K)
 * 难度: medium
 *
 * 给你一个整数数组 nums 和一个整数 k，请你统计并返回 该数组中和为 k 的子数组的个数。
 * 
 * 子数组是数组中元素的连续非空序列。
 *
 * 示例 1：
 * 输入：nums = [1,1,1], k = 2
 * 输出：2
 * 
 * 示例 2：
 * 输入：nums = [1,2,3], k = 3
 * 输出：2
 *
 * 约束条件:
 * - 1 <= nums.length <= 2 * 10^4
 * - -1000 <= nums[i] <= 1000
 * - -10^7 <= k <= 10^7
 *
 * 提示:
 *   1. 使用前缀和
 *   2. prefixSum[j] - prefixSum[i] = k 表示子数组 [i+1, j] 的和为 k
 *   3. 用哈希表记录每个前缀和出现的次数
 */

export function subarraySum(nums, k) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 560. 和为 K 的子数组 (Subarray Sum Equals K)");
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
  assert.deepStrictEqual(subarraySum([1,1,1], 2), 2);
});

test("示例2", () => {
  assert.deepStrictEqual(subarraySum([1,2,3], 3), 2);
});

test("负数", () => {
  assert.deepStrictEqual(subarraySum([1,-1,0], 0), 3);
});

test("单元素", () => {
  assert.deepStrictEqual(subarraySum([1], 1), 1);
});
