// node ./43-single-number-ii.mjs
/**
 * 137. 只出现一次的数字 II (Single Number II)
 * 难度: medium
 *
 * 给你一个整数数组 nums，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次。请你找出并返回那个只出现了一次的元素。
 * 
 * 你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。
 *
 * 示例 1：
 * 输入：nums = [2,2,3,2]
 * 输出：3
 * 
 * 示例 2：
 * 输入：nums = [0,1,0,1,0,1,99]
 * 输出：99
 *
 * 约束条件:
 * - 1 <= nums.length <= 3 * 10^4
 * - -2^31 <= nums[i] <= 2^31 - 1
 * - nums 中，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次
 *
 * 提示:
 *   1. 使用两个变量 ones 和 twos 来记录位的出现次数
 *   2. ones 记录出现 1 次的位，twos 记录出现 2 次的位
 *   3. 出现 3 次时清零
 */

export function singleNumber(nums) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 137. 只出现一次的数字 II (Single Number II)");
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
  assert.deepStrictEqual(singleNumber([[2,2,3,2]]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(singleNumber([[0,1,0,1,0,1,99]]), 99);
});
