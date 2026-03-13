// node ./01-permutations.mjs
/**
 * 46. 全排列 (Permutations)
 * 难度: medium
 *
 * 给定一个不含重复数字的数组 nums，返回其 所有可能的全排列。你可以 按任意顺序 返回答案。
 *
 * 示例 1：
 * 输入：nums = [1,2,3]
 * 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 
 * 示例 2：
 * 输入：nums = [0,1]
 * 输出：[[0,1],[1,0]]
 * 
 * 示例 3：
 * 输入：nums = [1]
 * 输出：[[1]]
 *
 * 约束条件:
 * - 1 <= nums.length <= 6
 * - -10 <= nums[i] <= 10
 * - nums 中的所有整数 互不相同
 *
 * 提示:
 *   1. 使用回溯法，维护一个used数组标记已使用的元素
 *   2. 每次选择一个未使用的元素加入路径
 *   3. 当路径长度等于数组长度时，记录结果
 */

export function permute(nums) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 46. 全排列 (Permutations)");
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
  assert.deepStrictEqual(permute([[1,2,3]]), [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]);
});

test("两元素", () => {
  assert.deepStrictEqual(permute([[0,1]]), [[0,1],[1,0]]);
});

test("单元素", () => {
  assert.deepStrictEqual(permute([[1]]), [[1]]);
});
