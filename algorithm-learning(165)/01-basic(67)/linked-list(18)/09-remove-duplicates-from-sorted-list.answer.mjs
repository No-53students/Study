/**
 * 83. 删除排序链表中的重复元素 (Remove Duplicates from Sorted List) - 参考答案
 */

export function deleteDuplicates(head) {
  if (!head) return null;

  let curr = head;
  while (curr.next) {
    if (curr.val === curr.next.val) {
      // 跳过重复节点
      curr.next = curr.next.next;
    } else {
      // 移动到下一个节点
      curr = curr.next;
    }
  }

  return head;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,1,2]), [1,2]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([1,1,2,3,3]), [1,2,3]);
});

test("空链表", () => {
  assert.deepStrictEqual(ListNode([]), []);
});

test("无重复", () => {
  assert.deepStrictEqual(ListNode([1,2,3]), [1,2,3]);
});
