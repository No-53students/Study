/**
 * 234. 回文链表 (Palindrome Linked List) - 参考答案
 */

export function isPalindrome(head) {
  if (!head || !head.next) return true;

  // 1. 找到中点
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. 反转后半部分
  let secondHalf = reverseList(slow.next);

  // 3. 比较前后两半
  let p1 = head;
  let p2 = secondHalf;
  let result = true;
  while (p2) {
    if (p1.val !== p2.val) {
      result = false;
      break;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // 4. 恢复链表（可选）
  slow.next = reverseList(secondHalf);

  return result;
}

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("回文", () => {
  assert.deepStrictEqual(ListNode([1,2,2,1]), true);
});

test("非回文", () => {
  assert.deepStrictEqual(ListNode([1,2]), false);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1]), true);
});

test("奇数回文", () => {
  assert.deepStrictEqual(ListNode([1,2,1]), true);
});
