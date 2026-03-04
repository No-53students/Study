/**
 * 24. 两两交换链表中的节点 (Swap Nodes in Pairs)
 * 难度: medium
 *
 * 给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。
 *
 * 示例 1：
 * 输入：head = [1,2,3,4]
 * 输出：[2,1,4,3]
 * 
 * 示例 2：
 * 输入：head = []
 * 输出：[]
 * 
 * 示例 3：
 * 输入：head = [1]
 * 输出：[1]
 *
 * 约束条件:
 * - 链表中节点的数目在范围 [0, 100] 内
 * - 0 <= Node.val <= 100
 *
 * 提示:
 *   1. 使用虚拟头节点简化边界处理
 *   2. 每次交换需要操作三个指针
 *   3. 也可以使用递归解法
 */

export function swapPairs(head: ListNode | null): ListNode | null {
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

test("标准情况", () => {
  assert.deepStrictEqual(swapPairs([1,2,3,4]), [2,1,4,3]);
});

test("空链表", () => {
  assert.deepStrictEqual(swapPairs([]), []);
});

test("单节点", () => {
  assert.deepStrictEqual(swapPairs([1]), [1]);
});
