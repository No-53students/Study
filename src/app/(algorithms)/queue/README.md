# 队列 (Queue)

## 概念介绍

**队列**是一种遵循**先进先出(FIFO - First In First Out)**原则的线性数据结构。想象排队买票，先来的人先买到票先离开。

### 核心特点

- **先进先出**: 最先添加的元素最先被移除
- **双端操作**: 在队尾添加，在队首移除
- **时间复杂度**: enqueue 和 dequeue 操作都是 O(1)

### 栈 vs 队列

| 特性 | 栈 (Stack) | 队列 (Queue) |
|------|-----------|-------------|
| 原则 | 后进先出 (LIFO) | 先进先出 (FIFO) |
| 添加 | 栈顶 push | 队尾 enqueue |
| 移除 | 栈顶 pop | 队首 dequeue |
| 应用 | 函数调用、撤销操作 | 任务调度、消息传递 |

## 基本操作

| 操作 | 描述 | 时间复杂度 |
|------|------|-----------|
| enqueue(item) | 将元素添加到队尾 | O(1) |
| dequeue() | 移除并返回队首元素 | O(1)* |
| front() | 返回队首元素但不移除 | O(1) |
| isEmpty() | 检查队列是否为空 | O(1) |
| size() | 返回队列中元素数量 | O(1) |

> *注：使用数组的 shift() 实际是 O(n)，但可以通过链表或循环队列实现真正的 O(1)

## JavaScript/TypeScript 实现

### 基本实现（数组）

```typescript
class Queue<T> {
  private items: T[] = [];

  // 入队 - 在队尾添加元素
  enqueue(item: T): void {
    this.items.push(item);
  }

  // 出队 - 移除并返回队首元素
  dequeue(): T | undefined {
    return this.items.shift(); // 注意：O(n) 复杂度
  }

  // 查看队首元素
  front(): T | undefined {
    return this.items[0];
  }

  // 判断队列是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取队列大小
  size(): number {
    return this.items.length;
  }
}
```

### 优化实现（对象模拟）

```typescript
class OptimizedQueue<T> {
  private items: Record<number, T> = {};
  private head = 0;
  private tail = 0;

  enqueue(item: T): void {
    this.items[this.tail] = item;
    this.tail++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items[this.head];
    delete this.items[this.head];
    this.head++;
    return item;
  }

  front(): T | undefined {
    return this.items[this.head];
  }

  isEmpty(): boolean {
    return this.tail === this.head;
  }

  size(): number {
    return this.tail - this.head;
  }
}
```

## 循环队列

循环队列通过取模运算复用数组空间，是面试常考题目。

### LeetCode 622 - 设计循环队列

```javascript
class MyCircularQueue {
  constructor(k) {
    this.size = k;
    this.queue = new Array(k);
    this.front = -1;
    this.rear = -1;
  }

  enQueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) {
      this.front = 0;
    }
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = value;
    return true;
  }

  deQueue() {
    if (this.isEmpty()) return false;
    if (this.front === this.rear) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return true;
  }

  Front() {
    return this.isEmpty() ? -1 : this.queue[this.front];
  }

  Rear() {
    return this.isEmpty() ? -1 : this.queue[this.rear];
  }

  isEmpty() {
    return this.front === -1;
  }

  isFull() {
    return (this.rear + 1) % this.size === this.front;
  }
}
```

## JavaScript 事件循环

队列在 JavaScript 事件循环中扮演核心角色：

### 宏任务队列 (Macrotask Queue)

- setTimeout / setInterval
- setImmediate (Node.js)
- I/O 操作
- UI 渲染

### 微任务队列 (Microtask Queue)

- Promise.then / catch / finally
- queueMicrotask
- MutationObserver
- process.nextTick (Node.js)

### 执行顺序

```javascript
console.log('1'); // 同步

setTimeout(() => console.log('2'), 0); // 宏任务

Promise.resolve().then(() => console.log('3')); // 微任务

console.log('4'); // 同步

// 输出顺序: 1 -> 4 -> 3 -> 2
```

### 执行流程

1. **执行同步代码**（调用栈）
2. **执行所有微任务**（微任务队列清空）
3. **执行一个宏任务**
4. **回到步骤 2**

## 前端应用场景

### 1. 请求限流队列

```javascript
class RequestQueue {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.currentCount = 0;
    this.queue = [];
  }

  add(requestFn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ requestFn, resolve, reject });
      this.processQueue();
    });
  }

  async processQueue() {
    if (this.currentCount >= this.maxConcurrent ||
        this.queue.length === 0) {
      return;
    }

    this.currentCount++;
    const { requestFn, resolve, reject } = this.queue.shift();

    try {
      const result = await requestFn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.currentCount--;
      this.processQueue();
    }
  }
}

// 使用
const queue = new RequestQueue(3);
urls.forEach(url => {
  queue.add(() => fetch(url));
});
```

### 2. 消息队列

```javascript
class MessageQueue {
  constructor() {
    this.queue = [];
    this.handlers = new Map();
  }

  // 订阅消息
  subscribe(type, handler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type).push(handler);
  }

  // 发布消息
  publish(type, data) {
    this.queue.push({ type, data });
    this.process();
  }

  // 处理消息
  process() {
    while (this.queue.length > 0) {
      const { type, data } = this.queue.shift();
      const handlers = this.handlers.get(type) || [];
      handlers.forEach(handler => handler(data));
    }
  }
}
```

### 3. 动画帧队列

```javascript
class AnimationQueue {
  constructor() {
    this.queue = [];
    this.isRunning = false;
  }

  add(animation) {
    this.queue.push(animation);
    if (!this.isRunning) {
      this.run();
    }
  }

  run() {
    if (this.queue.length === 0) {
      this.isRunning = false;
      return;
    }

    this.isRunning = true;
    const animation = this.queue.shift();

    requestAnimationFrame(() => {
      animation();
      this.run();
    });
  }
}
```

## 面试高频题

### 1. 用队列实现栈 (LeetCode 225)

```javascript
class MyStack {
  constructor() {
    this.queue = [];
  }

  push(x) {
    this.queue.push(x);
    // 将队列前面的元素移到后面
    for (let i = 0; i < this.queue.length - 1; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}
```

### 2. 滑动窗口最大值 (LeetCode 239)

```javascript
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // 存储索引，保持对应值递减

  for (let i = 0; i < nums.length; i++) {
    // 移除超出窗口的元素
    while (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // 保持队列递减
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // 窗口形成后记录最大值
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}
```

### 3. 最近的请求次数 (LeetCode 933)

```javascript
class RecentCounter {
  constructor() {
    this.queue = [];
  }

  ping(t) {
    this.queue.push(t);
    // 移除 3000ms 之前的请求
    while (this.queue[0] < t - 3000) {
      this.queue.shift();
    }
    return this.queue.length;
  }
}
```

## 复杂度分析

| 操作 | 数组实现 | 链表实现 | 循环队列 |
|------|---------|---------|---------|
| enqueue | O(1) | O(1) | O(1) |
| dequeue | O(n)* | O(1) | O(1) |
| front | O(1) | O(1) | O(1) |
| 空间 | O(n) | O(n) | O(k) |

> *使用 shift() 是 O(n)，但可以用其他方式优化

## 总结

队列是前端开发中不可或缺的数据结构：

1. **理解事件循环**: 宏任务队列和微任务队列是 JS 异步的核心
2. **任务调度**: 请求限流、动画队列等场景
3. **BFS 算法**: 广度优先搜索的基础结构
4. **面试必考**: 循环队列、滑动窗口等经典问题
