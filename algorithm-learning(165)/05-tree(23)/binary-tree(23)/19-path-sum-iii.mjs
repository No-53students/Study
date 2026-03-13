// node ./19-path-sum-iii.mjs
/**
 * 437. 路径总和 III (Path Sum III)
 * 难度: medium
 *
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 * 
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 * 示例 1：
 * 输入：root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
 * 输出：3
 * 解释：和等于 8 的路径有 3 条：
 * 5 -> 3
 * 5 -> 2 -> 1
 * -3 -> 11
 * 
 * 示例 2：
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
 * 输出：3
 * 解释：和等于 22 的路径有 3 条
 *
 * 约束条件:
 * - 二叉树的节点个数的范围是 [0,1000]
 * - -10^9 <= Node.val <= 10^9
 * - -1000 <= targetSum <= 1000
 *
 * 提示:
 *   1. 使用前缀和可以将问题转化为：找有多少个前缀和差值等于 targetSum
 *   2. 用哈希表存储前缀和出现的次数
 *   3. 注意回溯时要恢复哈希表的状态
 */

export function pathSum(root, targetSum) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 437. 路径总和 III (Path Sum III)");
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
  assert.deepStrictEqual(pathSum([10,5,-3,3,2,null,11,3,-2,null,1], 8), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(pathSum([5,4,8,11,null,13,4,7,2,null,null,5,1], 22), 3);
});

test("空树", () => {
  assert.deepStrictEqual(pathSum([], 0), 0);
});
