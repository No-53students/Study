// node ./16-flatten-binary-tree-to-linked-list.mjs
/**
 * 114. 二叉树展开为链表 (Flatten Binary Tree to Linked List)
 * 难度: medium
 *
 * 给你二叉树的根结点 root ，请你将它展开为一个单链表：
 * 
 * - 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
 * - 展开后的单链表应该与二叉树 先序遍历 顺序相同。
 *
 * 示例 1：
 * 输入：root = [1,2,5,3,4,null,6]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6]
 * 解释：按先序遍历展开为链表
 * 
 * 示例 2：
 * 输入：root = []
 * 输出：[]
 * 解释：空树
 * 
 * 示例 3：
 * 输入：root = [0]
 * 输出：[0]
 * 解释：单节点
 *
 * 约束条件:
 * - 树中结点数在范围 [0, 2000] 内
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 先序遍历的顺序是：根 → 左 → 右
 *   2. 可以用递归或迭代，也可以用 Morris 遍历的思想
 *   3. 关键是找到左子树的最右节点，将右子树接上去
 */

export function flatten(root) {
  // 在此处编写代码，原地修改树
}

// ---- 测试用例 ----
console.log("\n📝 题目: 114. 二叉树展开为链表 (Flatten Binary Tree to Linked List)");
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
  assert.deepStrictEqual(flatten([1,2,5,3,4,null,6]), [1,null,2,null,3,null,4,null,5,null,6]);
});

test("空树", () => {
  assert.deepStrictEqual(flatten([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(flatten([0]), [0]);
});
