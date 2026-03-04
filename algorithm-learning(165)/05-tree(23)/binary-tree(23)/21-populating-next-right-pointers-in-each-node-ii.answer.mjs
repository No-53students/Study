/**
 * 117. 填充每个节点的下一个右侧节点指针 II (Populating Next Right Pointers in Each Node II) - 参考答案
 */

export function connect(root) {
  if (root === null) return null;

  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (i < size - 1) {
        node.next = queue[0];
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return root;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(connect([1,2,3,4,5,null,7]), [1,null,2,3,null,4,5,7,null]);
});

test("空树", () => {
  assert.deepStrictEqual(connect([]), []);
});
