// node ./01-maximum-depth-of-binary-tree.mjs
/**
 * 104. 二叉树的最大深度 (Maximum Depth of Binary Tree)
 * 难度: easy
 *
 * 给定一个二叉树 root，返回其最大深度。
 * 
 * 二叉树的 最大深度 是指从根节点到最远叶子节点的最长路径上的节点数。
 *
 * 示例 1：
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：3
 * 
 * 示例 2：
 * 输入：root = [1,null,2]
 * 输出：2
 *
 * 约束条件:
 * - 树中节点的数量在 [0, 10^4] 区间内。
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 使用递归：树的最大深度 = max(左子树深度, 右子树深度) + 1
 *   2. 递归终止条件：空节点返回0
 *   3. 也可以使用BFS层序遍历计算层数
 */

export function maxDepth(root) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 104. 二叉树的最大深度 (Maximum Depth of Binary Tree)");
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
  assert.deepStrictEqual(maxDepth([3,9,20,null,null,15,7]), 3);
});

test("示例2", () => {
  assert.deepStrictEqual(maxDepth([1,null,2]), 2);
});

test("空树", () => {
  assert.deepStrictEqual(maxDepth(null), 0);
});

test("单节点", () => {
  assert.deepStrictEqual(maxDepth([1]), 1);
});
