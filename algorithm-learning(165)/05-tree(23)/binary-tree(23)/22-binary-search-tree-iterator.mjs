/**
 * 173. 二叉搜索树迭代器 (Binary Search Tree Iterator)
 * 难度: medium
 *
 * 实现一个二叉搜索树迭代器类 BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：
 * 
 * - BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
 * - boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
 * - int next() 将指针向右移动，然后返回指针处的数字。
 * 
 * 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。
 * 
 * 你可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。
 *
 * 示例：
 * 输入：
 * ["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
 * [[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
 * 输出：
 * [null, 3, 7, true, 9, true, 15, true, 20, false]
 * 解释：按中序遍历顺序返回节点值
 *
 * 约束条件:
 * - 树中节点的数目在范围 [1, 10^5] 内
 * - 0 <= Node.val <= 10^6
 * - 最多调用 10^5 次 hasNext 和 next 操作
 *
 * 提示:
 *   1. 使用栈来模拟中序遍历
 *   2. 只需要存储从根到当前节点的路径
 *   3. 每次 next() 后，将右子树的左链入栈
 */

export class BSTIterator {
  constructor(root) {
    // 在此处编写代码
  }

  next() {
    // 在此处编写代码
  }

  hasNext() {
    // 在此处编写代码
  }
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
  assert.deepStrictEqual(solution([7,3,15,null,null,9,20]), [3,7,9,15,20]);
});
