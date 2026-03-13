// node ./16-copy-list-with-random-pointer.mjs
/**
 * 138. 随机链表的复制 (Copy List with Random Pointer)
 * 难度: medium
 *
 * 给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。
 * 
 * 构造这个链表的 深拷贝。深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点。
 * 
 * 返回复制链表的头节点。
 *
 * 示例 1：
 * 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
 * 解释：深拷贝整个链表
 * 
 * 示例 2：
 * 输入：head = [[1,1],[2,1]]
 * 输出：[[1,1],[2,1]]
 * 解释：两个节点互相指向
 *
 * 约束条件:
 * - 0 <= n <= 1000
 * - -10^4 <= Node.val <= 10^4
 * - Node.random 为 null 或指向链表中的节点
 *
 * 提示:
 *   1. 使用哈希表建立原节点到新节点的映射
 *   2. 或者在原链表中穿插新节点
 *   3. 两次遍历：第一次创建节点，第二次连接指针
 */

export function copyRandomList(head) {
  // 在此处编写代码
}

// ---- 测试用例 ----
console.log("\n📝 题目: 138. 随机链表的复制 (Copy List with Random Pointer)");
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
  assert.deepStrictEqual(copyRandomList([[7,null],[13,0],[11,4],[10,2],[1,0]]), [[7,null],[13,0],[11,4],[10,2],[1,0]]);
});

test("示例2", () => {
  assert.deepStrictEqual(copyRandomList([[1,1],[2,1]]), [[1,1],[2,1]]);
});
