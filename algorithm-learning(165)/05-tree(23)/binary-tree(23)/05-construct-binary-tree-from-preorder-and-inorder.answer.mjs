/**
 * 105. 从前序与中序遍历序列构造二叉树 (Construct Binary Tree from Preorder and Inorder Traversal) - 参考答案
 */

export function buildTree(preorder, inorder) {
  // 用哈希表存储中序遍历的值到索引的映射
  const indexMap = new Map();
  inorder.forEach((val, idx) => indexMap.set(val, idx));

  let preIndex = 0;

  const build = (inLeft, inRight) => {
    if (inLeft > inRight) return null;

    // 前序遍历的第一个节点是根节点
    const rootVal = preorder[preIndex++];
    const root = { val: rootVal, left: null, right: null };

    // 在中序遍历中找到根节点的位置
    const inIndex = indexMap.get(rootVal);

    // 递归构建左右子树
    root.left = build(inLeft, inIndex - 1);
    root.right = build(inIndex + 1, inRight);

    return root;
  };

  return build(0, inorder.length - 1);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(buildTree([3,9,20,15,7], [9,3,15,20,7]), [3,9,20,null,null,15,7]);
});

test("单节点", () => {
  assert.deepStrictEqual(buildTree([-1], [-1]), [-1]);
});

test("左斜树", () => {
  assert.deepStrictEqual(buildTree([1,2,3], [3,2,1]), [1,2,null,3]);
});
