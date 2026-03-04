/**
 * 739. 每日温度 (Daily Temperatures) - 参考答案
 */

export function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // 存储索引

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }

  return result;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(dailyTemperatures([73,74,75,71,69,72,76,73]), [1,1,4,2,1,1,0,0]);
});

test("递增", () => {
  assert.deepStrictEqual(dailyTemperatures([30,40,50,60]), [1,1,1,0]);
});

test("简单", () => {
  assert.deepStrictEqual(dailyTemperatures([30,60,90]), [1,1,0]);
});
