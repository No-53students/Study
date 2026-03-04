/**
 * 25. K 个一组翻转链表 (Reverse Nodes in k-Group) - 参考答案
 */

export function reverseKGroup(head, k) {
  const dummy = { next: head };
  let prevGroupEnd = dummy;

  while (true) {
    // 检查是否有 k 个节点
    let kth = prevGroupEnd;
    for (let i = 0; i < k; i++) {
      kth = kth.next;
      if (!kth) return dummy.next;
    }

    const groupStart = prevGroupEnd.next;
    const nextGroupStart = kth.next;

    // 翻转 k 个节点
    let prev = nextGroupStart;
    let curr = groupStart;
    while (curr !== nextGroupStart) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    prevGroupEnd.next = kth;
    prevGroupEnd = groupStart;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("k=2", () => {
  assert.deepStrictEqual(reverseKGroup([1,2,3,4,5], 2), [2,1,4,3,5]);
});

test("k=3", () => {
  assert.deepStrictEqual(reverseKGroup([1,2,3,4,5], 3), [3,2,1,4,5]);
});
