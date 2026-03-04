/**
 * 142. 环形链表 II (Linked List Cycle II) - 参考答案
 */

export function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 第一阶段：找到相遇点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 第二阶段：找到入环点
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }

  return null;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有环", () => {
  assert.deepStrictEqual(ListNode([3,2,0,-4], 1), 1);
});

test("有环2", () => {
  assert.deepStrictEqual(ListNode([1,2], 0), 0);
});

test("无环", () => {
  assert.deepStrictEqual(ListNode([1], -1), null);
});
