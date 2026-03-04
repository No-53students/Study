/**
 * 106. 从中序与后序遍历序列构造二叉树 (Construct Binary Tree from Inorder and Postorder Traversal) - 参考答案
 */

export function buildTree(inorder, postorder) {
  const map = new Map();
  inorder.forEach((val, idx) => map.set(val, idx));

  let postIdx = postorder.length - 1;

  const build = (inLeft, inRight) => {
    if (inLeft > inRight) return null;

    const rootVal = postorder[postIdx--];
    const root = new TreeNode(rootVal);

    const inIdx = map.get(rootVal);

    // 先构建右子树，因为后序遍历中右子树在根节点之前
    root.right = build(inIdx + 1, inRight);
    root.left = build(inLeft, inIdx - 1);

    return root;
  };

  return build(0, inorder.length - 1);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(buildTree([9,3,15,20,7], [9,15,7,20,3]), [3,9,20,null,null,15,7]);
});

test("示例2", () => {
  assert.deepStrictEqual(buildTree([-1], [-1]), [-1]);
});

test("完全二叉树", () => {
  assert.deepStrictEqual(buildTree([4,2,5,1,6,3,7], [4,5,2,6,7,3,1]), [1,2,3,4,5,6,7]);
});
