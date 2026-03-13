// node ./06-move-zeroes.mjs
/**
 * 283. 移动零 (Move Zeroes)
 * 难度: easy
 *
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 
 * 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
 *
 * 示例 1：
 * 输入：nums = [0,1,0,3,12]
 * 输出：[1,3,12,0,0]
 * 
 * 示例 2：
 * 输入：nums = [0]
 * 输出：[0]
 *
 * 约束条件:
 * - 1 <= nums.length <= 10^4
 * - -2^31 <= nums[i] <= 2^31 - 1
 *
 * 提示:
 *   1. 使用双指针
 *   2. 慢指针指向下一个非零元素应该放置的位置
 *   3. 快指针遍历数组找非零元素
 */

export function moveZeroes(nums) {
  // 在此处编写代码，原地修改数组
}

// ---- 测试用例 ----
console.log("\n📝 题目: 283. 移动零 (Move Zeroes)");
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
  assert.deepStrictEqual(moveZeroes([0,1,0,3,12]), [1,3,12,0,0]);
});

test("单个零", () => {
  assert.deepStrictEqual(moveZeroes([0]), [0]);
});

test("无零", () => {
  assert.deepStrictEqual(moveZeroes([1,2,3]), [1,2,3]);
});
