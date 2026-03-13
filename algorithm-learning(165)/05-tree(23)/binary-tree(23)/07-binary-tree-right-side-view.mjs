// node ./07-binary-tree-right-side-view.mjs
/**
 * 199. 二叉树的右视图 (Binary Tree Right Side View)
 * 难度: medium
 *
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 * 示例 1：
 * 输入：root = [1,2,3,null,5,null,4]
 * 输出：[1,3,4]
 * 
 * 示例 2：
 * 输入：root = [1,null,3]
 * 输出：[1,3]
 * 
 * 示例 3：
 * 输入：root = []
 * 输出：[]
 *
 * 约束条件:
 * - 二叉树的节点个数的范围是 [0, 100]
 * - -100 <= Node.val <= 100
 *
 * 提示:
 *   1. 使用BFS层序遍历
 *   2. 每层的最后一个节点就是右视图能看到的节点
 *   3. 也可以用DFS，优先访问右子树
 */

export function rightSideView(root) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 199. 二叉树的右视图 (Binary Tree Right Side View)");
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
  assert.deepStrictEqual(rightSideView([1,2,3,null,5,null,4]), [1,3,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(rightSideView([1,null,3]), [1,3]);
});

test("空树", () => {
  assert.deepStrictEqual(rightSideView(null), []);
});
