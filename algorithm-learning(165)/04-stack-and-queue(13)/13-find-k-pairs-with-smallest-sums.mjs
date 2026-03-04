/**
 * 373. 查找和最小的 K 对数字 (Find K Pairs with Smallest Sums)
 * 难度: medium
 *
 * 给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。
 * 
 * 定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。
 * 
 * 请找到和最小的 k 个数对 (u1,v1), (u2,v2) ... (uk,vk) 。
 *
 * 示例 1：
 * 输入：nums1 = [1,7,11], nums2 = [2,4,6], k = 3
 * 输出：[[1,2],[1,4],[1,6]]
 * 解释：返回序列中的前 3 对数：
 * [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
 * 
 * 示例 2：
 * 输入：nums1 = [1,1,2], nums2 = [1,2,3], k = 2
 * 输出：[[1,1],[1,1]]
 * 解释：返回序列中的前 2 对数：
 * [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
 * 
 * 示例 3：
 * 输入：nums1 = [1,2], nums2 = [3], k = 3
 * 输出：[[1,3],[2,3]]
 * 解释：也可能序列中所有的数对都被返回:[1,3],[2,3]
 *
 * 约束条件:
 * - 1 <= nums1.length, nums2.length <= 10^5
 * - -10^9 <= nums1[i], nums2[i] <= 10^9
 * - nums1 和 nums2 均为 升序排列
 * - 1 <= k <= 10^4
 * - k <= nums1.length * nums2.length
 *
 * 提示:
 *   1. 使用最小堆维护候选数对
 *   2. 初始时将 (nums1[i], nums2[0]) 加入堆
 *   3. 每次弹出最小的，将 (i, j+1) 加入堆
 */

export function kSmallestPairs(nums1, nums2, k) {
  // 在此处编写代码
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
  assert.deepStrictEqual(kSmallestPairs([1,7,11], [2,4,6], 3), [[1,2],[1,4],[1,6]]);
});

test("示例2", () => {
  assert.deepStrictEqual(kSmallestPairs([1,1,2], [1,2,3], 2), [[1,1],[1,1]]);
});

test("示例3", () => {
  assert.deepStrictEqual(kSmallestPairs([1,2], [3], 3), [[1,3],[2,3]]);
});
