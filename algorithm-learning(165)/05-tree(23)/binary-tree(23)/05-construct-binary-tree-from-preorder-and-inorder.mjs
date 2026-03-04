/**
 * 105. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal)
 * 难度: medium
 *
 * 给定两个整数数组 preorder 和 inorder，其中 preorder 是二叉树的先序遍历，inorder 是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 *
 * 示例 1：
 * 输入：preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
 * 输出：[3,9,20,null,null,15,7]
 * 
 * 示例 2：
 * 输入：preorder = [-1], inorder = [-1]
 * 输出：[-1]
 *
 * 约束条件:
 * - 1 <= preorder.length <= 3000
 * - inorder.length == preorder.length
 * - -3000 <= preorder[i], inorder[i] <= 3000
 * - preorder 和 inorder 均 无重复 元素
 * - inorder 均出现在 preorder
 * - preorder 保证 为二叉树的前序遍历序列
 * - inorder 保证 为二叉树的中序遍历序列
 *
 * 提示:
 *   1. 前序遍历的第一个元素是根节点
 *   2. 在中序遍历中找到根节点，左边是左子树，右边是右子树
 *   3. 用哈希表存储中序遍历的索引，加速查找
 */

export function buildTree(preorder, inorder) {
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
  assert.deepStrictEqual(buildTree([3,9,20,15,7], [9,3,15,20,7]), [3,9,20,null,null,15,7]);
});

test("单节点", () => {
  assert.deepStrictEqual(buildTree([-1], [-1]), [-1]);
});

test("左斜树", () => {
  assert.deepStrictEqual(buildTree([1,2,3], [3,2,1]), [1,2,null,3]);
});
