/**
 * 78. 子集 (Subsets)
 * 难度: medium
 *
 * 给你一个整数数组 nums，数组中的元素 互不相同。返回该数组所有可能的子集（幂集）。
 * 
 * 解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。
 *
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
 * 
 * 示例 2：
 * 输入：nums = [0]
 * 输出：[[],[0]]
 *
 * 约束条件:
 * - 1 <= nums.length <= 10
 * - -10 <= nums[i] <= 10
 * - nums 中的所有元素 互不相同
 *
 * 提示:
 *   1. 使用回溯法，每个元素都有选或不选两种情况
 *   2. 用 start 参数避免重复选择前面的元素
 *   3. 每次递归都将当前 path 加入结果
 */

export function subsets(nums) {
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

test("三元素", () => {
  assert.deepStrictEqual(subsets([[1,2,3]]), [[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]);
});

test("单元素", () => {
  assert.deepStrictEqual(subsets([[0]]), [[],[0]]);
});
