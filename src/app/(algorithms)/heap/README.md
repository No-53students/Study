# 堆 (Heap) / 优先队列 (Priority Queue)

## 概念介绍

**堆**是一种特殊的完全二叉树，分为最大堆和最小堆。**优先队列**是一种抽象数据类型，通常用堆来实现。

### 堆的性质

- **最大堆**：每个节点的值都大于或等于其子节点的值，根节点最大
- **最小堆**：每个节点的值都小于或等于其子节点的值，根节点最小
- **完全二叉树**：除最后一层外都是满的，最后一层从左到右填充

### 为什么用堆？

| 操作 | 堆 | 有序数组 | 无序数组 |
|------|---|---------|---------|
| 插入 | O(log n) | O(n) | O(1) |
| 删除最值 | O(log n) | O(1) | O(n) |
| 获取最值 | O(1) | O(1) | O(n) |

堆在需要频繁获取最值时非常高效。

## 堆的实现

### 数组表示

完全二叉树可以用数组高效存储（假设从索引 0 开始）：

```
       0
      / \
     1   2
    / \ / \
   3  4 5  6

父节点索引：Math.floor((i - 1) / 2)
左子节点索引：2 * i + 1
右子节点索引：2 * i + 2
```

### 最小堆实现

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // 获取父节点索引
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  // 获取左子节点索引
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  // 获取右子节点索引
  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  // 交换两个元素
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // 获取堆顶元素（最小值）
  peek() {
    return this.heap[0];
  }

  // 获取堆大小
  size() {
    return this.heap.length;
  }

  // 插入元素
  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  // 上浮操作
  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  // 删除并返回堆顶元素
  pop() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  // 下沉操作
  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }
      if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      this.swap(index, smallest);
      index = smallest;
    }
  }
}
```

### 最大堆实现

只需修改比较逻辑：

```javascript
class MaxHeap {
  // ... 其他代码相同

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[parentIndex] >= this.heap[index]) break;  // 改为 >=
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let largest = index;  // 改为 largest
      const leftChild = this.getLeftChildIndex(index);
      const rightChild = this.getRightChildIndex(index);

      if (leftChild < length && this.heap[leftChild] > this.heap[largest]) {
        largest = leftChild;  // 改为 >
      }
      if (rightChild < length && this.heap[rightChild] > this.heap[largest]) {
        largest = rightChild;  // 改为 >
      }

      if (largest === index) break;

      this.swap(index, largest);
      index = largest;
    }
  }
}
```

### 通用优先队列

```javascript
/**
 * 通用优先队列，支持自定义比较函数
 */
class PriorityQueue {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.comparator = comparator;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.isEmpty()) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return top;
  }

  bubbleUp(index) {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[parentIndex], this.heap[index]) <= 0) break;
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;

    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < length && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// 使用示例
const minPQ = new PriorityQueue((a, b) => a - b);  // 最小堆
const maxPQ = new PriorityQueue((a, b) => b - a);  // 最大堆

// 按对象属性排序
const taskPQ = new PriorityQueue((a, b) => a.priority - b.priority);
taskPQ.push({ task: 'A', priority: 3 });
taskPQ.push({ task: 'B', priority: 1 });
taskPQ.pop();  // { task: 'B', priority: 1 }
```

## 典型例题

### 数组中的第K个最大元素 (LeetCode 215)

```javascript
/**
 * 方法1：使用最小堆，维护大小为 k 的堆
 *
 * 时间复杂度：O(n log k)
 * 空间复杂度：O(k)
 */
function findKthLargest(nums, k) {
  const minHeap = new MinHeap();

  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop();  // 弹出最小的，保留 k 个最大的
    }
  }

  return minHeap.peek();  // 堆顶就是第 k 大
}

/**
 * 方法2：快速选择（平均 O(n)）
 */
function findKthLargestQuickSelect(nums, k) {
  const targetIndex = nums.length - k;  // 第 k 大 = 第 (n-k+1) 小

  function partition(left, right) {
    const pivot = nums[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (nums[j] < pivot) {
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
      }
    }

    [nums[i], nums[right]] = [nums[right], nums[i]];
    return i;
  }

  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) {
      return nums[pivotIndex];
    } else if (pivotIndex < targetIndex) {
      left = pivotIndex + 1;
    } else {
      right = pivotIndex - 1;
    }
  }

  return -1;
}
```

### 前 K 个高频元素 (LeetCode 347)

```javascript
/**
 * 找出出现频率最高的 k 个元素
 */
function topKFrequent(nums, k) {
  // 1. 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 2. 使用最小堆，按频率排序
  const minHeap = new PriorityQueue((a, b) => a[1] - b[1]);

  for (const [num, freq] of freqMap) {
    minHeap.push([num, freq]);
    if (minHeap.size() > k) {
      minHeap.pop();
    }
  }

  // 3. 提取结果
  const result = [];
  while (!minHeap.isEmpty()) {
    result.push(minHeap.pop()[0]);
  }

  return result;
}

/**
 * 方法2：桶排序（O(n)）
 */
function topKFrequentBucket(nums, k) {
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 桶：索引是频率，值是具有该频率的数字列表
  const buckets = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // 从高频到低频收集
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
```

### 合并K个升序链表 (LeetCode 23)

```javascript
/**
 * 合并 k 个有序链表
 *
 * 使用最小堆维护每个链表的当前节点
 */
function mergeKLists(lists) {
  const minHeap = new PriorityQueue((a, b) => a.val - b.val);

  // 将每个链表的头节点加入堆
  for (const head of lists) {
    if (head) minHeap.push(head);
  }

  const dummy = new ListNode(0);
  let current = dummy;

  while (!minHeap.isEmpty()) {
    const node = minHeap.pop();
    current.next = node;
    current = current.next;

    // 如果该链表还有节点，加入堆
    if (node.next) {
      minHeap.push(node.next);
    }
  }

  return dummy.next;
}
```

### 数据流的中位数 (LeetCode 295)

```javascript
/**
 * 使用两个堆维护数据流的中位数：
 * - 最大堆存储较小的一半
 * - 最小堆存储较大的一半
 */
class MedianFinder {
  constructor() {
    this.maxHeap = new PriorityQueue((a, b) => b - a);  // 较小一半
    this.minHeap = new PriorityQueue((a, b) => a - b);  // 较大一半
  }

  addNum(num) {
    // 先加入最大堆
    this.maxHeap.push(num);

    // 将最大堆的最大值移到最小堆
    this.minHeap.push(this.maxHeap.pop());

    // 保持平衡：最大堆的大小 >= 最小堆
    if (this.maxHeap.size() < this.minHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
  }
}

// 使用示例
const finder = new MedianFinder();
finder.addNum(1);
finder.findMedian();  // 1
finder.addNum(2);
finder.findMedian();  // 1.5
finder.addNum(3);
finder.findMedian();  // 2
```

### 最小K个数 (LeetCode 面试题17.14)

```javascript
/**
 * 找出数组中最小的 k 个数
 */
function smallestK(arr, k) {
  if (k === 0) return [];

  // 使用最大堆，维护 k 个最小值
  const maxHeap = new PriorityQueue((a, b) => b - a);

  for (const num of arr) {
    if (maxHeap.size() < k) {
      maxHeap.push(num);
    } else if (num < maxHeap.peek()) {
      maxHeap.pop();
      maxHeap.push(num);
    }
  }

  const result = [];
  while (!maxHeap.isEmpty()) {
    result.push(maxHeap.pop());
  }

  return result;
}
```

### 滑动窗口最大值 (LeetCode 239)

```javascript
/**
 * 返回每个滑动窗口的最大值
 *
 * 使用单调递减队列更优，但这里展示堆的解法
 */
function maxSlidingWindow(nums, k) {
  // 最大堆存储 [值, 索引]
  const maxHeap = new PriorityQueue((a, b) => b[0] - a[0]);
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    maxHeap.push([nums[i], i]);

    // 移除窗口外的元素
    while (maxHeap.peek()[1] <= i - k) {
      maxHeap.pop();
    }

    // 窗口形成后开始记录
    if (i >= k - 1) {
      result.push(maxHeap.peek()[0]);
    }
  }

  return result;
}

/**
 * 更优解法：单调递减队列
 */
function maxSlidingWindowDeque(nums, k) {
  const deque = [];  // 存储索引
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // 移除队列中比当前元素小的
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 移除窗口外的元素
    if (deque[0] <= i - k) {
      deque.shift();
    }

    // 记录窗口最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

## 前端应用场景

### 1. 任务调度器

```javascript
/**
 * 按优先级执行任务
 */
class TaskScheduler {
  constructor() {
    this.taskQueue = new PriorityQueue((a, b) => a.priority - b.priority);
    this.isRunning = false;
  }

  addTask(task, priority) {
    this.taskQueue.push({ task, priority });
    this.run();
  }

  async run() {
    if (this.isRunning) return;
    this.isRunning = true;

    while (!this.taskQueue.isEmpty()) {
      const { task } = this.taskQueue.pop();
      await task();
    }

    this.isRunning = false;
  }
}

// 使用示例
const scheduler = new TaskScheduler();
scheduler.addTask(async () => console.log('Low'), 10);
scheduler.addTask(async () => console.log('High'), 1);
scheduler.addTask(async () => console.log('Medium'), 5);
// 输出：High, Medium, Low
```

### 2. 实时排行榜

```javascript
/**
 * 实时维护 Top K 排行榜
 */
class Leaderboard {
  constructor(k) {
    this.k = k;
    this.scores = new Map();  // playerId -> score
    this.minHeap = new PriorityQueue((a, b) => a.score - b.score);
  }

  addScore(playerId, score) {
    const currentScore = (this.scores.get(playerId) || 0) + score;
    this.scores.set(playerId, currentScore);
    this.updateTopK(playerId, currentScore);
  }

  updateTopK(playerId, score) {
    // 简化版：重建 Top K
    this.minHeap = new PriorityQueue((a, b) => a.score - b.score);

    for (const [id, s] of this.scores) {
      if (this.minHeap.size() < this.k) {
        this.minHeap.push({ id, score: s });
      } else if (s > this.minHeap.peek().score) {
        this.minHeap.pop();
        this.minHeap.push({ id, score: s });
      }
    }
  }

  getTopK() {
    const result = [];
    const tempHeap = new PriorityQueue((a, b) => b.score - a.score);

    while (!this.minHeap.isEmpty()) {
      const item = this.minHeap.pop();
      tempHeap.push(item);
    }

    while (!tempHeap.isEmpty()) {
      const item = tempHeap.pop();
      result.push(item);
      this.minHeap.push(item);
    }

    return result;
  }
}
```

### 3. 请求限流（令牌桶）

```javascript
/**
 * 使用堆管理定时任务
 */
class TimerManager {
  constructor() {
    this.timers = new PriorityQueue((a, b) => a.executeTime - b.executeTime);
    this.running = false;
  }

  schedule(callback, delay) {
    const executeTime = Date.now() + delay;
    this.timers.push({ callback, executeTime });
    this.checkAndRun();
  }

  checkAndRun() {
    if (this.running) return;
    this.running = true;

    const run = () => {
      if (this.timers.isEmpty()) {
        this.running = false;
        return;
      }

      const now = Date.now();
      const next = this.timers.peek();

      if (next.executeTime <= now) {
        this.timers.pop();
        next.callback();
        setImmediate(run);
      } else {
        setTimeout(run, next.executeTime - now);
      }
    };

    run();
  }
}
```

### 4. 合并多个有序数据流

```javascript
/**
 * 合并多个有序数据流（如日志合并）
 */
function* mergeStreams(streams) {
  const heap = new PriorityQueue((a, b) => a.value.timestamp - b.value.timestamp);

  // 初始化：从每个流取第一个元素
  for (let i = 0; i < streams.length; i++) {
    const value = streams[i].next();
    if (!value.done) {
      heap.push({ value: value.value, streamIndex: i });
    }
  }

  // 不断取出最小的，并从对应流补充新元素
  while (!heap.isEmpty()) {
    const { value, streamIndex } = heap.pop();
    yield value;

    const next = streams[streamIndex].next();
    if (!next.done) {
      heap.push({ value: next.value, streamIndex });
    }
  }
}
```

## 堆排序

```javascript
/**
 * 堆排序：利用堆的性质进行排序
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(1)（原地排序）
 */
function heapSort(arr) {
  const n = arr.length;

  // 建堆：从最后一个非叶节点开始
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 逐个取出最大值放到末尾
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];  // 交换堆顶和末尾
    heapify(arr, i, 0);  // 重新堆化
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
```

## 复杂度分析

| 操作 | 时间复杂度 |
|------|-----------|
| 插入 | O(log n) |
| 删除最值 | O(log n) |
| 获取最值 | O(1) |
| 建堆 | O(n) |
| 堆排序 | O(n log n) |

## 总结

堆/优先队列的使用场景：

1. **Top K 问题**：维护大小为 K 的堆
2. **第 K 大/小**：堆的大小为 K
3. **合并有序序列**：多路归并
4. **中位数/动态数据**：双堆
5. **任务调度**：按优先级执行

选择堆的类型：
- 找最大的 K 个：用**最小堆**，维护 K 个最大值
- 找最小的 K 个：用**最大堆**，维护 K 个最小值
