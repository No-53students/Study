/**
 * 124. 二叉树中的最大路径和 (Binary Tree Maximum Path Sum)
 * 难度: hard
 *
 * 二叉树中的 路径 被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在一条路径序列中 至多出现一次。该路径 至少包含一个 节点，且不一定经过根节点。
 * 
 * 路径和 是路径中各节点值的总和。
 * 
 * 给你一个二叉树的根节点 root，返回其 最大路径和。
 *
 * 示例 1：
 * 输入：root = [1,2,3]
 * 输出：6
 * 解释：最优路径是 2 -> 1 -> 3 ，路径和为 2 + 1 + 3 = 6
 * 
 * 示例 2：
 * 输入：root = [-10,9,20,null,null,15,7]
 * 输出：42
 * 解释：最优路径是 15 -> 20 -> 7 ，路径和为 15 + 20 + 7 = 42
 *
 * 约束条件:
 * - 树中节点数目范围是 [1, 3 * 10^4]
 * - -1000 <= Node.val <= 1000
 *
 * 提示:
 *   1. 对于每个节点，计算经过它的最大路径和
 *   2. 节点的贡献值 = 节点值 + max(左子树贡献, 右子树贡献)
 *   3. 负数贡献可以不选（贡献为0）
 *   4. 全局维护最大路径和
 */

export function maxPathSum(root) {
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
  assert.deepStrictEqual(maxPathSum([1,2,3]), 6);
});

test("示例2", () => {
  assert.deepStrictEqual(maxPathSum([-10,9,20,null,null,15,7]), 42);
});

test("单节点负数", () => {
  assert.deepStrictEqual(maxPathSum([-3]), -3);
});
