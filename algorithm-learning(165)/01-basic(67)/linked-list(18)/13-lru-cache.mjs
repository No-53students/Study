/**
 * 146. LRU 缓存 (LRU Cache)
 * 难度: medium
 *
 * 请你设计并实现一个满足 LRU (最近最少使用) 缓存 约束的数据结构。
 * 
 * 实现 LRUCache 类：
 * - LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
 * - int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
 * - void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，则应该 逐出 最久未使用的关键字。
 * 
 * 函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。
 *
 * 示例：
 * 输入：
 * ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
 * [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
 * 输出：
 * [null, null, null, 1, null, -1, null, -1, 3, 4]
 * 解释：LRU 缓存容量为 2，按操作顺序执行
 *
 * 约束条件:
 * - 1 <= capacity <= 3000
 * - 0 <= key <= 10^4
 * - 0 <= value <= 10^5
 * - 最多调用 2 * 10^5 次 get 和 put
 *
 * 提示:
 *   1. 使用哈希表 + 双向链表
 *   2. 哈希表提供 O(1) 查找
 *   3. 双向链表维护访问顺序
 *   4. JavaScript 的 Map 本身维护插入顺序
 */

export class LRUCache {
  constructor(capacity) {
    // 在此处编写代码
  }

  get(key) {
    // 在此处编写代码
  }

  put(key, value) {
    // 在此处编写代码
  }
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
  assert.deepStrictEqual(solution(2), [null,null,null,1,null,-1,null,-1,3,4]);
});
