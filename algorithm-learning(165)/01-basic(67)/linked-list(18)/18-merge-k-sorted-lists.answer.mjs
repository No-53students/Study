/**
 * 23. 合并 K 个升序链表 (Merge k Sorted Lists) - 参考答案
 */

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;

  // 分治合并
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("多个链表", () => {
  assert.deepStrictEqual(mergeKLists([[1,4,5],[1,3,4],[2,6]]), [1,1,2,3,4,4,5,6]);
});

test("空数组", () => {
  assert.deepStrictEqual(mergeKLists([]), []);
});

test("包含空链表", () => {
  assert.deepStrictEqual(mergeKLists([[]]), []);
});
