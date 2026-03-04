/**
 * 2. 两数相加 (Add Two Numbers) - 参考答案
 */

export function addTwoNumbers(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    curr.next = { val: sum % 10, next: null };
    curr = curr.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(ListNode([2,4,3], [5,6,4]), [7,0,8]);
});

test("两个0", () => {
  assert.deepStrictEqual(ListNode([0], [0]), [0]);
});

test("进位", () => {
  assert.deepStrictEqual(ListNode([9,9,9,9,9,9,9], [9,9,9,9]), [8,9,9,9,0,0,0,1]);
});
