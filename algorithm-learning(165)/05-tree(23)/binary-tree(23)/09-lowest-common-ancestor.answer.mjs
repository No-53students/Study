/**
 * 236. 二叉树的最近公共祖先 (Lowest Common Ancestor of a Binary Tree) - 参考答案
 */

export function lowestCommonAncestor(root, p, q) {
  // 递归终止条件：空节点或找到目标节点
  if (root === null || root === p || root === q) {
    return root;
  }

  // 在左右子树中查找
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  // 如果左右都找到了，说明当前节点是LCA
  if (left !== null && right !== null) {
    return root;
  }

  // 否则返回非空的那个
  return left !== null ? left : right;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(lowestCommonAncestor([3,5,1,6,2,0,8,null,null,7,4], 5, 1), 3);
});

test("示例2-自身祖先", () => {
  assert.deepStrictEqual(lowestCommonAncestor([3,5,1,6,2,0,8,null,null,7,4], 5, 4), 5);
});

test("示例3", () => {
  assert.deepStrictEqual(lowestCommonAncestor([1,2], 1, 2), 1);
});
