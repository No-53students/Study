/**
 * 86. 分隔链表 (Partition List) - 参考答案
 */

export function partition(head, x) {
  // 创建两个哨兵节点
  const smallDummy = { next: null };
  const largeDummy = { next: null };

  let small = smallDummy;
  let large = largeDummy;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }

  // 连接两个链表
  large.next = null;  // 断开大链表的尾部
  small.next = largeDummy.next;

  return smallDummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([1,4,3,2,5,2], 3), [1,2,2,4,3,5]);
});

test("示例2", () => {
  assert.deepStrictEqual(ListNode([2,1], 2), [1,2]);
});

test("空链表", () => {
  assert.deepStrictEqual(ListNode([], 0), []);
});

test("全小于", () => {
  assert.deepStrictEqual(ListNode([1,2,3], 5), [1,2,3]);
});
