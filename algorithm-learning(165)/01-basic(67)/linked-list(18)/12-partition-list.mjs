/**
 * 86. 分隔链表 (Partition List)
 * 难度: medium
 *
 * 给你一个链表的头节点 head 和一个特定值 x，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。
 * 
 * 你应当 保留 两个分区中每个节点的初始相对位置。
 *
 * 示例 1：
 * 输入：head = [1,4,3,2,5,2], x = 3
 * 输出：[1,2,2,4,3,5]
 * 
 * 示例 2：
 * 输入：head = [2,1], x = 2
 * 输出：[1,2]
 *
 * 约束条件:
 * - 链表中节点的数目在范围 [0, 200] 内
 * - -100 <= Node.val <= 100
 * - -200 <= x <= 200
 *
 * 提示:
 *   1. 创建两个链表：一个存放小于 x 的节点，一个存放大于等于 x 的节点
 *   2. 遍历原链表，将节点分配到对应链表
 *   3. 最后连接两个链表
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function partition(head, x) {
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
