/**
 * 543. 二叉树的直径 (Diameter of Binary Tree)
 * 难度: easy
 *
 * 给你一棵二叉树的根节点，返回该树的 直径。
 * 
 * 二叉树的 直径 是指树中任意两个节点之间最长路径的 长度。这条路径可能经过也可能不经过根节点 root。
 * 
 * 两节点之间路径的 长度 由它们之间边数表示。
 *
 * 示例 1：
 * 输入：root = [1,2,3,4,5]
 * 输出：3
 * 解释：3 ，取路径 [4,2,1,3] 或 [5,2,1,3] 的长度。
 * 
 * 示例 2：
 * 输入：root = [1,2]
 * 输出：1
 *
 * 约束条件:
 * - 树中节点数目在范围 [1, 10^4] 内
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 直径 = 左子树深度 + 右子树深度
 *   2. 在计算深度的同时更新最大直径
 *   3. 路径不一定经过根节点
 */

export function diameterOfBinaryTree(root) {
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
  assert.deepStrictEqual(diameterOfBinaryTree([1,2,3,4,5]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(diameterOfBinaryTree([1,2]), 1);
});

test("单节点", () => {
  assert.deepStrictEqual(diameterOfBinaryTree([1]), 0);
});
