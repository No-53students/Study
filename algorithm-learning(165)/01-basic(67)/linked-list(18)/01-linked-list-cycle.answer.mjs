/**
 * 141. 环形链表 (Linked List Cycle) - 参考答案
 */

export function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有环", () => {
  assert.deepStrictEqual(ListNode([3,2,0,-4], 1), true);
});

test("有环2", () => {
  assert.deepStrictEqual(ListNode([1,2], 0), true);
});

test("无环", () => {
  assert.deepStrictEqual(ListNode([1], -1), false);
});
