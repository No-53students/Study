/**
 * 61. 旋转链表 (Rotate List)
 * 难度: medium
 *
 * 给你一个链表的头节点 head，旋转链表，将链表每个节点向右移动 k 个位置。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4,5], k = 2
 * 输出：[4,5,1,2,3]
 * 
 * 示例 2：
 * 输入：head = [0,1,2], k = 4
 * 输出：[2,0,1]
 *
 * 约束条件:
 * - 链表中节点的数目在范围 [0, 500] 内
 * - -100 <= Node.val <= 100
 * - 0 <= k <= 2 * 10^9
 *
 * 提示:
 *   1. 先计算链表长度
 *   2. k 可能大于链表长度，需要取模
 *   3. 找到新的尾节点，断开并重新连接
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function rotateRight(head, k) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

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
