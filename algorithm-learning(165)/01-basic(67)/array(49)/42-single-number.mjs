/**
 * 136. 只出现一次的数字 (Single Number)
 * 难度: easy
 *
 * 给你一个 非空 整数数组 nums，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
 * 
 * 你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。
 *
 * 示例 1：
 * 输入：nums = [2,2,1]
 * 输出：1
 * 
 * 示例 2：
 * 输入：nums = [4,1,2,1,2]
 * 输出：4
 * 
 * 示例 3：
 * 输入：nums = [1]
 * 输出：1
 *
 * 约束条件:
 * - 1 <= nums.length <= 3 * 10^4
 * - -3 * 10^4 <= nums[i] <= 3 * 10^4
 * - 除了某个元素只出现一次以外，其余每个元素均出现两次
 *
 * 提示:
 *   1. 利用异或运算的性质：a ^ a = 0，a ^ 0 = a
 *   2. 所有数字异或后，出现两次的数字都被抵消
 *   3. 剩下的就是只出现一次的数字
 */

export function singleNumber(nums) {
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
  assert.deepStrictEqual(singleNumber([[2,2,1]]), 1);
});

test("示例2", () => {
  assert.deepStrictEqual(singleNumber([[4,1,2,1,2]]), 4);
});

test("单元素", () => {
  assert.deepStrictEqual(singleNumber([[1]]), 1);
});
