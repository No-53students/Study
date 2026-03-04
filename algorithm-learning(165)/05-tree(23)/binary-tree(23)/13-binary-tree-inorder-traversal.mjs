/**
 * 94. 二叉树的中序遍历 (Binary Tree Inorder Traversal)
 * 难度: easy
 *
 * 给定一个二叉树的根节点 root，返回它的 中序 遍历。
 *
 * 示例 1：
 * 输入：root = [1,null,2,3]
 * 输出：[1,3,2]
 * 
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：root = [1]
 * 输出：[1]
 *
 * 约束条件:
 * - 树中节点数目在范围 [0, 100] 内
 * - -100 <= Node.val <= 100
 * 
 * 进阶： 递归算法很简单，你可以通过迭代算法完成吗？
 *
 * 提示:
 *   1. 中序遍历顺序：左子树 → 根节点 → 右子树
 *   2. 递归实现非常简单
 *   3. 迭代实现可以使用栈
 */

export function inorderTraversal(root) {
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
  assert.deepStrictEqual(inorderTraversal([1,null,2,3]), [1,3,2]);
});

test("空树", () => {
  assert.deepStrictEqual(inorderTraversal(null), []);
});

test("单节点", () => {
  assert.deepStrictEqual(inorderTraversal([1]), [1]);
});
