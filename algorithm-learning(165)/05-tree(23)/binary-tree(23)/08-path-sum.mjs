// node ./08-path-sum.mjs
/**
 * 112. 路径总和 (Path Sum)
 * 难度: easy
 *
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum。判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum。如果存在，返回 true；否则，返回 false。
 * 
 * 叶子节点 是指没有子节点的节点。
 *
 * 示例 1：
 * 输入：root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
 * 输出：true
 * 解释：等于目标和的根节点到叶节点路径如上图所示。
 * 
 * 示例 2：
 * 输入：root = [1,2,3], targetSum = 5
 * 输出：false
 * 解释：树中存在两条根节点到叶子节点的路径：
 * (1 --> 2): 和为 3
 * (1 --> 3): 和为 4
 * 不存在 sum = 5 的根节点到叶子节点的路径。
 * 
 * 示例 3：
 * 输入：root = [], targetSum = 0
 * 输出：false
 * 解释：由于树是空的，所以不存在根节点到叶子节点的路径。
 *
 * 约束条件:
 * - 树中节点的数目在范围 [0, 5000] 内
 * - -1000 <= Node.val <= 1000
 * - -1000 <= targetSum <= 1000
 *
 * 提示:
 *   1. 使用递归，每次减去当前节点值
 *   2. 到达叶子节点时，检查剩余值是否为0
 *   3. 注意空树的边界情况
 */

export function hasPathSum(root, targetSum) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 112. 路径总和 (Path Sum)");
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

test("存在路径", () => {
  assert.deepStrictEqual(hasPathSum([5,4,8,11,null,13,4,7,2,null,null,null,1], 22), true);
});

test("不存在路径", () => {
  assert.deepStrictEqual(hasPathSum([1,2,3], 5), false);
});

test("空树", () => {
  assert.deepStrictEqual(hasPathSum(null, 0), false);
});
