/**
 * 82. 删除排序链表中的重复元素 II (Remove Duplicates from Sorted List II)
 * 难度: medium
 *
 * 给定一个已排序的链表的头 head，删除原始链表中所有重复数字的节点，只留下不同的数字。返回已排序的链表。
 *
 * 示例 1：
 * 输入：head = [1,2,3,3,4,4,5]
 * 输出：[1,2,5]
 * 
 * 示例 2：
 * 输入：head = [1,1,1,2,3]
 * 输出：[2,3]
 *
 * 约束条件:
 * - 链表中节点数目在范围 [0, 300] 内
 * - -100 <= Node.val <= 100
 * - 题目数据保证链表已经按升序排列
 *
 * 提示:
 *   1. 使用哨兵节点处理头节点被删除的情况
 *   2. 维护 prev 指针指向确定保留的最后一个节点
 *   3. 发现重复时，跳过所有重复值
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
export function deleteDuplicates(head) {
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
