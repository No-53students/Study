/**
 * 287. 寻找重复数 (Find the Duplicate Number)
 * 难度: medium
 *
 * 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
 * 
 * 假设 nums 只有一个重复的整数 ，返回这个重复的数 。
 * 
 * 你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。
 *
 * 示例 1：
 * 输入：nums = [1,3,4,2,2]
 * 输出：2
 * 
 * 示例 2：
 * 输入：nums = [3,1,3,4,2]
 * 输出：3
 * 
 * 示例 3：
 * 输入：nums = [3,3,3,3,3]
 * 输出：3
 *
 * 约束条件:
 * - 1 <= n <= 10^5
 * - nums.length == n + 1
 * - 1 <= nums[i] <= n
 * - nums 中只有一个整数出现两次或多次，其余整数均只出现一次
 *
 * 提示:
 *   1. 将数组看作链表，nums[i] 指向下一个节点
 *   2. 问题转化为找链表环的入口
 *   3. 使用快慢指针（Floyd判圈算法）
 */

export function findDuplicate(nums: number[]): number {
  // 在这里写你的代码
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

test("标准情况", () => {
  assert.deepStrictEqual(findDuplicate([1,3,4,2,2]), 2);
});

test("中间重复", () => {
  assert.deepStrictEqual(findDuplicate([3,1,3,4,2]), 3);
});

test("全部重复", () => {
  assert.deepStrictEqual(findDuplicate([3,3,3,3,3]), 3);
});
