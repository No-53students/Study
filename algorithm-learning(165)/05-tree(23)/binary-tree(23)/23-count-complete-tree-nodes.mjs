/**
 * 222. 完全二叉树的节点个数 (Count Complete Tree Nodes)
 * 难度: easy
 *
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
 * 
 * 完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第 h 层，则该层包含 1 ~ 2^h 个节点。
 *
 * 示例 1：
 * 输入：root = [1,2,3,4,5,6]
 * 输出：6
 * 解释：完全二叉树有 6 个节点
 * 
 * 示例 2：
 * 输入：root = []
 * 输出：0
 * 解释：空树
 * 
 * 示例 3：
 * 输入：root = [1]
 * 输出：1
 * 解释：单节点
 *
 * 约束条件:
 * - 树中节点的数目范围是 [0, 5 * 10^4]
 * - 0 <= Node.val <= 5 * 10^4
 * - 题目数据保证输入的树是 完全二叉树
 *
 * 提示:
 *   1. 完全二叉树的特殊性质可以优化计算
 *   2. 如果左右子树高度相等，左子树是满二叉树
 *   3. 可以用二分查找最后一层的节点数
 */

export function countNodes(root) {
  // 在此处编写代码
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
  assert.deepStrictEqual(countNodes([1,2,3,4,5,6]), 6);
});

test("空树", () => {
  assert.deepStrictEqual(countNodes([]), 0);
});

test("单节点", () => {
  assert.deepStrictEqual(countNodes([1]), 1);
});
