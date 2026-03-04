/**
 * 148. 排序链表 (Sort List) - 参考答案
 */

export function sortList(head) {
  if (!head || !head.next) return head;

  // 快慢指针找中点
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  const mid = slow.next;
  slow.next = null;

  // 递归排序两半
  const left = sortList(head);
  const right = sortList(mid);

  // 合并
  return merge(left, right);
}

function merge(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
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

test("示例1", () => {
  assert.deepStrictEqual(sortList([4,2,1,3]), [1,2,3,4]);
});

test("示例2", () => {
  assert.deepStrictEqual(sortList([-1,5,3,4,0]), [-1,0,3,4,5]);
});
