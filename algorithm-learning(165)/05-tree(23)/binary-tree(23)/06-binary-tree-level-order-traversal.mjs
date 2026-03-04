/**
 * 102. 二叉树的层序遍历 (Binary Tree Level Order Traversal)
 * 难度: medium
 *
 * 给你二叉树的根节点 root，返回其节点值的 层序遍历。（即逐层地，从左到右访问所有节点）。
 *
 * 示例 1：
 * 输入：root = [3,9,20,null,null,15,7]
 * 输出：[[3],[9,20],[15,7]]
 * 
 * 示例 2：
 * 输入：root = [1]
 * 输出：[[1]]
 * 
 * 示例 3：
 * 输入：root = []
 * 输出：[]
 *
 * 约束条件:
 * - 树中节点数目在范围 [0, 2000] 内
 * - -1000 <= Node.val <= 1000
 *
 * 提示:
 *   1. 使用队列进行BFS
 *   2. 每次处理一层：记录当前队列大小，处理该数量的节点
 *   3. 处理节点时将其子节点加入队列
 */

export function levelOrder(root) {
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
  assert.deepStrictEqual(levelOrder([3,9,20,null,null,15,7]), [[3],[9,20],[15,7]]);
});

test("单节点", () => {
  assert.deepStrictEqual(levelOrder([1]), [[1]]);
});

test("空树", () => {
  assert.deepStrictEqual(levelOrder(null), []);
});
