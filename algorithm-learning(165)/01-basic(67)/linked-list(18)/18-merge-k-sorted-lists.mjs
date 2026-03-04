/**
 * 23. 合并 K 个升序链表 (Merge k Sorted Lists)
 * 难度: hard
 *
 * 给你一个链表数组，每个链表都已经按升序排列。
 * 
 * 请你将所有链表合并到一个升序链表中，返回合并后的链表。
 *
 * 示例 1：
 * 输入：lists = [[1,4,5],[1,3,4],[2,6]]
 * 输出：[1,1,2,3,4,4,5,6]
 * 解释：链表数组如下：
 * [
 *   1->4->5,
 *   1->3->4,
 *   2->6
 * ]
 * 将它们合并到一个有序链表中得到：
 * 1->1->2->3->4->4->5->6
 * 
 * 示例 2：
 * 输入：lists = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：lists = [[]]
 * 输出：[]
 *
 * 约束条件:
 * - k == lists.length
 * - 0 <= k <= 10^4
 * - 0 <= lists[i].length <= 500
 * - -10^4 <= lists[i][j] <= 10^4
 * - lists[i] 按升序排列
 * - lists[i].length 的总和不超过 10^4
 *
 * 提示:
 *   1. 可以使用分治法，两两合并链表
 *   2. 也可以使用最小堆维护 k 个链表的头节点
 *   3. 先实现合并两个链表的函数
 */

export function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 在这里写你的代码
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

test("多个链表", () => {
  assert.deepStrictEqual(mergeKLists([[1,4,5],[1,3,4],[2,6]]), [1,1,2,3,4,4,5,6]);
});

test("空数组", () => {
  assert.deepStrictEqual(mergeKLists([]), []);
});

test("包含空链表", () => {
  assert.deepStrictEqual(mergeKLists([[]]), []);
});
