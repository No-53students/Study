/**
 * 21. 合并两个有序链表 (Merge Two Sorted Lists) - 参考答案
 */

export function mergeTwoLists(list1, list2) {
  // 使用哨兵节点简化代码
  const dummy = { next: null };
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  // 连接剩余部分
  curr.next = list1 || list2;

  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,2,4], [1,3,4]), [1,1,2,3,4,4]);
});

test("两个空", () => {
  assert.deepStrictEqual(ListNode([], []), []);
});

test("一个空", () => {
  assert.deepStrictEqual(ListNode([], [0]), [0]);
});
