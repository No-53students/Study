/**
 * 71. 简化路径 (Simplify Path) - 参考答案
 */

export function simplifyPath(path) {
  const stack = [];
  const parts = path.split('/');

  for (const part of parts) {
    if (part === '' || part === '.') {
      // 空字符串或当前目录，跳过
      continue;
    } else if (part === '..') {
      // 上级目录，出栈
      if (stack.length > 0) {
        stack.pop();
      }
    } else {
      // 有效目录名，入栈
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(simplifyPath("/home/"), "/home");
});

test("多斜杠", () => {
  assert.deepStrictEqual(simplifyPath("/home//foo/"), "/home/foo");
});

test("上级目录", () => {
  assert.deepStrictEqual(simplifyPath("/home/user/Documents/../Pictures"), "/home/user/Pictures");
});

test("根目录", () => {
  assert.deepStrictEqual(simplifyPath("/../"), "/");
});

test("复杂路径", () => {
  assert.deepStrictEqual(simplifyPath("/a/./b/../../c/"), "/c");
});
