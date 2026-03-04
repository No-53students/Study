/**
 * 173. 二叉搜索树迭代器 (Binary Search Tree Iterator) - 参考答案
 */

export class BSTIterator {
  constructor(root) {
    this.stack = [];
    this._pushLeft(root);
  }

  _pushLeft(node) {
    while (node !== null) {
      this.stack.push(node);
      node = node.left;
    }
  }

  next() {
    const node = this.stack.pop();
    this._pushLeft(node.right);
    return node.val;
  }

  hasNext() {
    return this.stack.length > 0;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(solution([7,3,15,null,null,9,20]), [3,7,9,15,20]);
});
