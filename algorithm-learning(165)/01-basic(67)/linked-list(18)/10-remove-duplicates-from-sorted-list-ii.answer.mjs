/**
 * 82. 删除排序链表中的重复元素 II (Remove Duplicates from Sorted List II) - 参考答案
 */

export function deleteDuplicates(head) {
  // 哨兵节点，处理头节点被删除的情况
  const dummy = { next: head };
  let prev = dummy;

  while (head) {
    // 如果是重复节点
    if (head.next && head.val === head.next.val) {
      // 跳过所有重复值
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      // 删除所有重复节点
      prev.next = head.next;
    } else {
      // 不是重复节点，移动 prev
      prev = prev.next;
    }
    head = head.next;
  }

  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,2,3,3,4,4,5]), [1,2,5]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([1,1,1,2,3]), [2,3]);
});

test("全重复", () => {
  assert.deepStrictEqual(ListNode([1,1,1]), []);
});

test("无重复", () => {
  assert.deepStrictEqual(ListNode([1,2,3]), [1,2,3]);
});
