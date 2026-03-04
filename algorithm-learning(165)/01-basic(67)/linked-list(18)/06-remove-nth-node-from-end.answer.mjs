/**
 * 19. 删除链表的倒数第 N 个结点 (Remove Nth Node From End of List) - 参考答案
 */

export function removeNthFromEnd(head, n) {
  // 使用哨兵节点处理删除头节点的情况
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  // fast 先走 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // fast 和 slow 同时走，直到 fast 到达末尾
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // 此时 slow 指向要删除节点的前一个节点
  slow.next = slow.next.next;

  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,2,3,4,5], 2), [1,2,3,5]);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1], 1), []);
});

test("删除最后", () => {
  assert.deepStrictEqual(ListNode([1,2], 1), [1]);
});

test("删除第一个", () => {
  assert.deepStrictEqual(ListNode([1,2], 2), [2]);
});
