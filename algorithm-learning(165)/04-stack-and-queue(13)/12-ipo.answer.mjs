/**
 * 502. IPO (IPO) - 参考答案
 */

export function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  // 创建项目数组并按资本排序
  const projects = [];
  for (let i = 0; i < n; i++) {
    projects.push({ capital: capital[i], profit: profits[i] });
  }
  projects.sort((a, b) => a.capital - b.capital);

  // 最大堆存储可启动项目的利润
  const maxHeap = [];

  const pushHeap = (val) => {
    maxHeap.push(val);
    let i = maxHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (maxHeap[parent] >= maxHeap[i]) break;
      [maxHeap[parent], maxHeap[i]] = [maxHeap[i], maxHeap[parent]];
      i = parent;
    }
  };

  const popHeap = () => {
    const max = maxHeap[0];
    const last = maxHeap.pop();
    if (maxHeap.length > 0) {
      maxHeap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) largest = left;
        if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) largest = right;
        if (largest === i) break;
        [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
        i = largest;
      }
    }
    return max;
  };

  let idx = 0;
  for (let i = 0; i < k; i++) {
    // 将所有可启动的项目加入堆
    while (idx < n && projects[idx].capital <= w) {
      pushHeap(projects[idx].profit);
      idx++;
    }

    // 如果没有可启动的项目，结束
    if (maxHeap.length === 0) break;

    // 选择利润最大的项目
    w += popHeap();
  }

  return w;
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("示例1", () => {
  assert.deepStrictEqual(findMaximizedCapital(2, 0, [1,2,3], [0,1,1]), 4);
});

test("示例2", () => {
  assert.deepStrictEqual(findMaximizedCapital(3, 0, [1,2,3], [0,1,2]), 6);
});
