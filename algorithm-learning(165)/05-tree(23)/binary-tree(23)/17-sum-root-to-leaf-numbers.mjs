/**
 * 129. 求根节点到叶节点数字之和 (Sum Root to Leaf Numbers)
 * 难度: medium
 *
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 
 * 每条从根节点到叶节点的路径都代表一个数字：
 * - 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 
 * 计算从根节点到叶节点生成的 所有数字之和 。
 * 
 * 叶节点 是指没有子节点的节点。
 *
 * 示例 1：
 * 输入：root = [1,2,3]
 * 输出：25
 * 解释：从根到叶子节点路径 1->2 代表数字 12
 * 从根到叶子节点路径 1->3 代表数字 13
 * 因此，数字总和 = 12 + 13 = 25
 * 
 * 示例 2：
 * 输入：root = [4,9,0,5,1]
 * 输出：1026
 * 解释：从根到叶子节点路径 4->9->5 代表数字 495
 * 从根到叶子节点路径 4->9->1 代表数字 491
 * 从根到叶子节点路径 4->0 代表数字 40
 * 因此，数字总和 = 495 + 491 + 40 = 1026
 *
 * 约束条件:
 * - 树中节点的数目在范围 [1, 1000] 内
 * - 0 <= Node.val <= 9
 * - 树的深度不超过 10
 *
 * 提示:
 *   1. 使用 DFS 遍历所有路径
 *   2. 传递当前路径形成的数字作为参数
 *   3. 到达叶子节点时返回当前数字
 */

export function sumNumbers(root) {
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
  assert.deepStrictEqual(sumNumbers([1,2,3]), 25);
});

test("示例2", () => {
  assert.deepStrictEqual(sumNumbers([4,9,0,5,1]), 1026);
});

test("单节点", () => {
  assert.deepStrictEqual(sumNumbers([5]), 5);
});
