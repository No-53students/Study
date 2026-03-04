/**
 * 160. 相交链表 (Intersection of Two Linked Lists) - 参考答案
 */

export function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  // 当 pA 和 pB 相遇时，要么是交点，要么都是 null
  while (pA !== pB) {
    // pA 走完 A 链表后，从 B 链表头开始
    pA = pA ? pA.next : headB;
    // pB 走完 B 链表后，从 A 链表头开始
    pB = pB ? pB.next : headA;
  }

  return pA;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("有交点", () => {
  assert.deepStrictEqual(ListNode([4,1,8,4,5], [5,6,1,8,4,5], 2, 3), 8);
});

test("有交点2", () => {
  assert.deepStrictEqual(ListNode([1,9,1,2,4], [3,2,4], 3, 1), 2);
});

test("无交点", () => {
  assert.deepStrictEqual(ListNode([2,6,4], [1,5], 3, 2), null);
});
