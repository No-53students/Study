/**
 * 24. 两两交换链表中的节点 (Swap Nodes in Pairs) - 参考答案
 */

export function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;

    // 交换
    first.next = second.next;
    second.next = first;
    prev.next = second;

    prev = first;
  }

  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("标准情况", () => {
  assert.deepStrictEqual(swapPairs([1,2,3,4]), [2,1,4,3]);
});

test("空链表", () => {
  assert.deepStrictEqual(swapPairs([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(swapPairs([1]), [1]);
});
