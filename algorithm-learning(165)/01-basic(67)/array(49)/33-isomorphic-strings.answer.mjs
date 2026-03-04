/**
 * 205. 同构字符串 (Isomorphic Strings) - 参考答案
 */

export function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // 检查双向映射
    if (sToT.has(charS) && sToT.get(charS) !== charT) {
      return false;
    }
    if (tToS.has(charT) && tToS.get(charT) !== charS) {
      return false;
    }

    sToT.set(charS, charT);
    tToS.set(charT, charS);
  }

  return true;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(isIsomorphic("egg", "add"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isIsomorphic("foo", "bar"), false);
});

test("示例3", () => {
  assert.deepStrictEqual(isIsomorphic("paper", "title"), true);
});

test("单字符", () => {
  assert.deepStrictEqual(isIsomorphic("a", "b"), true);
});
