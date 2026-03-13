// node ./04-implement-trie.mjs
/**
 * 208. 实现 Trie (前缀树) (Implement Trie (Prefix Tree))
 * 难度: medium
 *
 * Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。
 * 
 * 请你实现 Trie 类：
 * 
 * - Trie() 初始化前缀树对象。
 * - void insert(String word) 向前缀树中插入字符串 word。
 * - boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false。
 * - boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix，返回 true；否则，返回 false。
 *
 * 示例：
 * 输入
 * ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
 * [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
 * 输出
 * [null, null, true, false, true, null, true]
 * 
 * 解释
 * Trie trie = new Trie();
 * trie.insert("apple");
 * trie.search("apple");   // 返回 True
 * trie.search("app");     // 返回 False
 * trie.startsWith("app"); // 返回 True
 * trie.insert("app");
 * trie.search("app");     // 返回 True
 *
 * 约束条件:
 * - 1 <= word.length, prefix.length <= 2000
 * - word 和 prefix 仅由小写英文字母组成
 * - insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次
 *
 * 提示:
 *   1. 使用嵌套对象或Map作为树节点
 *   2. 每个节点存储指向子节点的引用
 *   3. 用特殊标记表示单词结尾
 */

export class Trie {
  constructor() {
    // 在此处初始化
  }

  insert(word) {
    // 插入单词
  }

  search(word) {
    // 搜索单词
  }

  startsWith(prefix) {
    // 检查前缀
  }
}

// ---- 测试用例 ----
console.log("\n📝 题目: 208. 实现 Trie (前缀树) (Implement Trie (Prefix Tree))");
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

test("基本操作", () => {
  assert.deepStrictEqual(solution(["Trie","insert","search","search","startsWith","insert","search"], [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]), [null,null,true,false,true,null,true]);
});
