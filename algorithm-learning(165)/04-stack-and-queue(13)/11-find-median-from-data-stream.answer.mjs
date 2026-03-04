/**
 * 295. 数据流的中位数 (Find Median from Data Stream) - 参考答案
 */

export class MedianFinder {
  constructor() {
    // 最大堆存储较小的一半
    this.maxHeap = [];
    // 最小堆存储较大的一半
    this.minHeap = [];
  }

  // 简易堆操作
  pushMax(val) {
    this.maxHeap.push(val);
    this.bubbleUpMax(this.maxHeap.length - 1);
  }

  pushMin(val) {
    this.minHeap.push(val);
    this.bubbleUpMin(this.minHeap.length - 1);
  }

  popMax() {
    const max = this.maxHeap[0];
    const last = this.maxHeap.pop();
    if (this.maxHeap.length > 0) {
      this.maxHeap[0] = last;
      this.bubbleDownMax(0);
    }
    return max;
  }

  popMin() {
    const min = this.minHeap[0];
    const last = this.minHeap.pop();
    if (this.minHeap.length > 0) {
      this.minHeap[0] = last;
      this.bubbleDownMin(0);
    }
    return min;
  }

  bubbleUpMax(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.maxHeap[parent] >= this.maxHeap[i]) break;
      [this.maxHeap[parent], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[parent]];
      i = parent;
    }
  }

  bubbleUpMin(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.minHeap[parent] <= this.minHeap[i]) break;
      [this.minHeap[parent], this.minHeap[i]] = [this.minHeap[i], this.minHeap[parent]];
      i = parent;
    }
  }

  bubbleDownMax(i) {
    const n = this.maxHeap.length;
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.maxHeap[left] > this.maxHeap[largest]) largest = left;
      if (right < n && this.maxHeap[right] > this.maxHeap[largest]) largest = right;
      if (largest === i) break;
      [this.maxHeap[i], this.maxHeap[largest]] = [this.maxHeap[largest], this.maxHeap[i]];
      i = largest;
    }
  }

  bubbleDownMin(i) {
    const n = this.minHeap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.minHeap[left] < this.minHeap[smallest]) smallest = left;
      if (right < n && this.minHeap[right] < this.minHeap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.minHeap[i], this.minHeap[smallest]] = [this.minHeap[smallest], this.minHeap[i]];
      i = smallest;
    }
  }

  addNum(num) {
    // 先加入最大堆
    this.pushMax(num);
    // 将最大堆堆顶移到最小堆
    this.pushMin(this.popMax());
    // 保持平衡
    if (this.minHeap.length > this.maxHeap.length) {
      this.pushMax(this.popMin());
    }
  }

  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}

// ---- 测试用例 ----
import { test } from "node:test";
import assert from "node:assert/strict";

test("基本操作", () => {
  assert.deepStrictEqual(solution(["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], [[],[1],[2],[],[3],[]]), [null,null,null,1.5,null,2]);
});
