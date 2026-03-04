/**
 * 208. 实现 Trie (前缀树) (Implement Trie (Prefix Tree)) - 参考答案
 */

export class Trie {
  constructor() {
    this.root = {};
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        node[char] = {};
      }
      node = node[char];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return node.isEnd === true;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node[char]) {
        return false;
      }
      node = node[char];
    }
    return true;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本操作", () => {
  assert.deepStrictEqual(solution(["Trie","insert","search","search","startsWith","insert","search"], [[],["apple"],["apple"],["app"],["app"],["app"],["app"]]), [null,null,true,false,true,null,true]);
});
