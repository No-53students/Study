/**
 * 61. 旋转链表 (Rotate List) - 参考答案
 */

export function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // 1. 计算链表长度，并找到尾节点
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }

  // 2. 计算实际需要旋转的次数
  k = k % len;
  if (k === 0) return head;

  // 3. 找到新的尾节点（倒数第 k+1 个节点）
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) {
    newTail = newTail.next;
  }

  // 4. 重新连接
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,2,3,4,5], 2), [4,5,1,2,3]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([0,1,2], 4), [2,0,1]);
});

test("k为0", () => {
  assert.deepStrictEqual(ListNode([1,2], 0), [1,2]);
});

test("单节点", () => {
  assert.deepStrictEqual(ListNode([1], 99), [1]);
});
