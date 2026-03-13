// node ./06-rotate-array3.mjs
/**
 * 189. 轮转数组 (Rotate Array)
 * 难度: medium
 *
 * 给定一个整数数组 nums，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。
 *
 * 示例 1：
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
 * 输出: [5,6,7,1,2,3,4]
 * 解释:
 * 向右轮转 1 步: [7,1,2,3,4,5,6]
 * 向右轮转 2 步: [6,7,1,2,3,4,5]
 * 向右轮转 3 步: [5,6,7,1,2,3,4]
 * 
 * 示例 2：
 * 输入：nums = [-1,-100,3,99], k = 2
 * 输出：[3,99,-1,-100]
 * 解释:
 * 向右轮转 1 步: [99,-1,-100,3]
 * 向右轮转 2 步: [3,99,-1,-100]
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^5
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - 0 <= k <= 10^5
 * 
 * 进阶：
 * 
 * - 尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
 * - 你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
 *
 * 提示:
 *   1. 可以使用额外数组存储结果
 *   2. 原地算法：考虑数组反转的性质
 *   3. 先整体反转，再分别反转前 k 个和后 n-k 个
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
// splice + 展开运算符：时间 O(n)，空间 O(n)
// 空间 O(n) 原因：splice 返回新数组占 O(k)，展开又创建新数组占 O(n)
// 最佳解法是三次反转法：时间 O(n)，空间 O(1)，只在原数组上交换元素
export function solution(nums, k) {
  k = k % nums.length;
  function reverse(start, end) {
    while (start < end) {
      let transItem = nums[start];
      // nums[start] = nums[end];
      // nums[end] = transItem;
      [ nums[start], nums[end] ] = [ nums[end], nums[start] ];
      start++;
      end--;
    }
  }
  reverse(0, nums.length - 1);
  reverse(0, k - 1);
  reverse(k, nums.length - 1);
  return nums;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 189. 轮转数组 (Rotate Array)");
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
  assert.deepStrictEqual(solution([1,2,3,4,5,6,7], 3), [5,6,7,1,2,3,4]);
});

test("k=2", () => {
  assert.deepStrictEqual(solution([-1,-100,3,99], 2), [3,99,-1,-100]);
});

test("k=0", () => {
  assert.deepStrictEqual(solution([1,2,3], 0), [1,2,3]);
});

test("k>n", () => {
  assert.deepStrictEqual(solution([1,2], 3), [2,1]);
});

test("单元素", () => {
  assert.deepStrictEqual(solution([1], 5), [1]);
});
