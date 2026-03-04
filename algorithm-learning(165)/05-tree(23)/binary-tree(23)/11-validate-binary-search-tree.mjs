/**
 * 98. 验证二叉搜索树 (Validate Binary Search Tree)
 * 难度: medium
 *
 * 给你一个二叉树的根节点 root，判断其是否是一个有效的二叉搜索树。
 * 
 * 有效 二叉搜索树定义如下：
 * 
 * - 节点的左子树只包含 小于 当前节点的数。
 * - 节点的右子树只包含 大于 当前节点的数。
 * - 所有左子树和右子树自身必须也是二叉搜索树。
 *
 * 示例 1：
 * 输入：root = [2,1,3]
 * 输出：true
 * 
 * 示例 2：
 * 输入：root = [5,1,4,null,null,3,6]
 * 输出：false
 * 解释：根节点的值是 5 ，但是右子节点的值是 4 。
 *
 * 约束条件:
 * - 树中节点数目范围在 [1, 10^4] 内
 * - -2^31 <= Node.val <= 2^31 - 1
 *
 * 提示:
 *   1. 不能只比较父子节点，需要维护整个子树的取值范围
 *   2. 左子树所有节点 < 根节点 < 右子树所有节点
 *   3. 递归时传递允许的最小值和最大值
 */

export function isValidBST(root) {
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

test("有效BST", () => {
  assert.deepStrictEqual(isValidBST([2,1,3]), true);
});

test("无效BST", () => {
  assert.deepStrictEqual(isValidBST([5,1,4,null,null,3,6]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(isValidBST([1]), true);
});
