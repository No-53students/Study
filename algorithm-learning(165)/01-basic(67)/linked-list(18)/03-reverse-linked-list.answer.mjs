/**
 * 206. 反转链表 (Reverse Linked List) - 参考答案
 */

export // 迭代法
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // 保存下一个节点
    curr.next = prev;       // 反转指针
    prev = curr;            // prev 前进
    curr = next;            // curr 前进
  }

  return prev;
}

// 递归法
function reverseListRecursive(head) {
  if (!head || !head.next) return head;

  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,2,3,4,5]), [5,4,3,2,1]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([1,2]), [2,1]);
});

test("空链表", () => {
  assert.deepStrictEqual(ListNode([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1]), [1]);
});
