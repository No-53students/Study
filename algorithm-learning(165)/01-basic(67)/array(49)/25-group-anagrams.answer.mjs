/**
 * 49. 字母异位词分组 (Group Anagrams) - 参考答案
 */

export function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 将字符串排序作为 key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return Array.from(map.values());
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(groupAnagrams(["eat","tea","tan","ate","nat","bat"]), [["eat","tea","ate"],["tan","nat"],["bat"]]);
});

test("空字符串", () => {
  assert.deepStrictEqual(groupAnagrams([""]), [[""]]);
});

test("单字符", () => {
  assert.deepStrictEqual(groupAnagrams(["a"]), [["a"]]);
});
