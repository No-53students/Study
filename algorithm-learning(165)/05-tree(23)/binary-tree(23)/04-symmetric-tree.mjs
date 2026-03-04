/**
 * 101. 对称二叉树 (Symmetric Tree)
 * 难度: easy
 *
 * 给你一个二叉树的根节点 root，检查它是否轴对称。
 *
 * 示例 1：
 * 输入：root = [1,2,2,3,4,4,3]
 * 输出：true
 * 
 * 示例 2：
 * 输入：root = [1,2,2,null,3,null,3]
 * 输出：false
 *
 * 约束条件:
 * - 树中节点数目在范围 [1, 1000] 内
 * - -100 <= Node.val <= 100
 * 
 * 进阶： 你可以运用递归和迭代两种方法解决这个问题吗？
 *
 * 提示:
 *   1. 对称的定义：左子树的左节点 = 右子树的右节点，左子树的右节点 = 右子树的左节点
 *   2. 可以用递归或迭代（队列）实现
 *   3. 递归时同时检查镜像位置的节点
 */

export function isSymmetric(root) {
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

test("对称树", () => {
  assert.deepStrictEqual(isSymmetric([1,2,2,3,4,4,3]), true);
});

test("非对称树", () => {
  assert.deepStrictEqual(isSymmetric([1,2,2,null,3,null,3]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(isSymmetric([1]), true);
});
