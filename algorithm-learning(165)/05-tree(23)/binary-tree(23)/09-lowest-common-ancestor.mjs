// node ./09-lowest-common-ancestor.mjs
/**
 * 236. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree)
 * 难度: medium
 *
 * 给定一个二叉树，找到该树中两个指定节点的最近公共祖先。
 * 
 * 百度百科中最近公共祖先的定义为："对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。"
 *
 * 示例 1：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出：3
 * 解释：节点 5 和节点 1 的最近公共祖先是节点 3。
 * 
 * 示例 2：
 * 输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出：5
 * 解释：节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 * 
 * 示例 3：
 * 输入：root = [1,2], p = 1, q = 2
 * 输出：1
 *
 * 约束条件:
 * - 树中节点数目在范围 [2, 10^5] 内。
 * - -10^9 <= Node.val <= 10^9
 * - 所有 Node.val 互不相同。
 * - p != q
 * - p 和 q 均存在于给定的二叉树中。
 *
 * 提示:
 *   1. 递归在左右子树中查找p和q
 *   2. 如果左右子树都找到了，当前节点就是LCA
 *   3. 如果只有一边找到，LCA在那一边
 */

export function lowestCommonAncestor(root, p, q) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 236. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree)");
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
  assert.deepStrictEqual(lowestCommonAncestor([3,5,1,6,2,0,8,null,null,7,4], 5, 1), 3);
});

test("示例2-自身祖先", () => {
  assert.deepStrictEqual(lowestCommonAncestor([3,5,1,6,2,0,8,null,null,7,4], 5, 4), 5);
});

test("示例3", () => {
  assert.deepStrictEqual(lowestCommonAncestor([1,2], 1, 2), 1);
});
