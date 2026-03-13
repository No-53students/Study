// node ./15-construct-binary-tree-from-inorder-and-postorder-traversal.mjs
/**
 * 106. 从中序与后序遍历序列构造二叉树 (Construct Binary Tree from Inorder and Postorder Traversal)
 * 难度: medium
 *
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗 二叉树 。
 *
 * 示例 1：
 * 输入：inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
 * 输出：[3,9,20,null,null,15,7]
 * 解释：根据中序和后序遍历构造出二叉树
 * 
 * 示例 2：
 * 输入：inorder = [-1], postorder = [-1]
 * 输出：[-1]
 * 解释：单节点树
 *
 * 约束条件:
 * - 1 <= inorder.length <= 3000
 * - postorder.length == inorder.length
 * - -3000 <= inorder[i], postorder[i] <= 3000
 * - inorder 和 postorder 都由不同的值组成
 * - postorder 中每一个值都在 inorder 中
 * - inorder 保证是树的中序遍历
 * - postorder 保证是树的后序遍历
 *
 * 提示:
 *   1. 后序遍历的最后一个元素是根节点
 *   2. 使用哈希表快速定位根节点在中序遍历中的位置
 *   3. 注意：要先构建右子树，再构建左子树
 */

export function buildTree(inorder, postorder) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 106. 从中序与后序遍历序列构造二叉树 (Construct Binary Tree from Inorder and Postorder Traversal)");
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
  assert.deepStrictEqual(buildTree([9,3,15,20,7], [9,15,7,20,3]), [3,9,20,null,null,15,7]);
});

test("示例2", () => {
  assert.deepStrictEqual(buildTree([-1], [-1]), [-1]);
});

test("完全二叉树", () => {
  assert.deepStrictEqual(buildTree([4,2,5,1,6,3,7], [4,5,2,6,7,3,1]), [1,2,3,4,5,6,7]);
});
