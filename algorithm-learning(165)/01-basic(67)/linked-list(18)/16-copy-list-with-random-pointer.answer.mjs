/**
 * 138. 随机链表的复制 (Copy List with Random Pointer) - 参考答案
 */

export function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();

  // 第一遍：创建所有节点
  let curr = head;
  while (curr) {
    map.set(curr, new Node(curr.val, null, null));
    curr = curr.next;
  }

  // 第二遍：连接 next 和 random
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    copy.next = map.get(curr.next) || null;
    copy.random = map.get(curr.random) || null;
    curr = curr.next;
  }

  return map.get(head);
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(copyRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]]), [[7,null],[13,0],[11,4],[10,2],[1,0]]);
});

test("示例2", () => {
  assert.deepStrictEqual(copyRandomList([[1,1],[2,1]]), [[1,1],[2,1]]);
});
