/**
 * 226. 翻转二叉树 (Invert Binary Tree)
 * 难度: easy
 *
 * 给你一棵二叉树的根节点 root，翻转这棵二叉树，并返回其根节点。
 *
 * 示例 1：
 * 输入：root = [4,2,7,1,3,6,9]
 * 输出：[4,7,2,9,6,3,1]
 * 
 * 示例 2：
 * 输入：root = [2,1,3]
 * 输出：[2,3,1]
 * 
 * 示例 3：
 * 输入：root = []
 * 输出：[]
 *
 * 约束条件:
 * - 树中节点数目范围在 [0, 100] 内
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 递归：先交换当前节点的左右子节点，再递归翻转子树
 *   2. 也可以使用BFS层序遍历来翻转
 *   3. 注意处理空节点
 */

export function invertTree(root) {
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
  assert.deepStrictEqual(invertTree([4,2,7,1,3,6,9]), [4,7,2,9,6,3,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(invertTree([2,1,3]), [2,3,1]);
});

test("空树", () => {
  assert.deepStrictEqual(invertTree(null), null);
});

test("单节点", () => {
  assert.deepStrictEqual(invertTree([1]), [1]);
});
