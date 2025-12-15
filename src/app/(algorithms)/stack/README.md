# 栈 (Stack)

## 概念介绍

**栈**是一种遵循**后进先出(LIFO - Last In First Out)**原则的线性数据结构。想象一摞盘子，你只能从最上面取或放盘子。

### 核心特点

- **后进先出**: 最后添加的元素最先被移除
- **单端操作**: 只能在栈顶进行插入和删除
- **时间复杂度**: push 和 pop 操作都是 O(1)

## 基本操作

| 操作 | 描述 | 时间复杂度 |
|------|------|-----------|
| push(item) | 将元素添加到栈顶 | O(1) |
| pop() | 移除并返回栈顶元素 | O(1) |
| peek() | 返回栈顶元素但不移除 | O(1) |
| isEmpty() | 检查栈是否为空 | O(1) |
| size() | 返回栈中元素数量 | O(1) |

## JavaScript/TypeScript 实现

```typescript
class Stack<T> {
  private items: T[] = [];

  // 入栈 - 将元素添加到栈顶
  push(item: T): void {
    this.items.push(item);
  }

  // 出栈 - 移除并返回栈顶元素
  pop(): T | undefined {
    return this.items.pop();
  }

  // 查看栈顶元素
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 判断栈是否为空
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // 获取栈的大小
  size(): number {
    return this.items.length;
  }

  // 清空栈
  clear(): void {
    this.items = [];
  }
}
```

## 前端应用场景

### 1. 浏览器历史记录

```javascript
// 后退栈：记录访问过的页面
const backStack = [];
// 前进栈：记录后退后可以前进的页面
const forwardStack = [];

function visit(page) {
  backStack.push(currentPage);
  currentPage = page;
  forwardStack.length = 0; // 清空前进栈
}

function goBack() {
  if (backStack.length === 0) return;
  forwardStack.push(currentPage);
  currentPage = backStack.pop();
}

function goForward() {
  if (forwardStack.length === 0) return;
  backStack.push(currentPage);
  currentPage = forwardStack.pop();
}
```

### 2. 撤销/重做功能

```javascript
const undoStack = [];
const redoStack = [];

function doAction(action) {
  undoStack.push(action);
  redoStack.length = 0;
  executeAction(action);
}

function undo() {
  if (undoStack.length === 0) return;
  const action = undoStack.pop();
  redoStack.push(action);
  reverseAction(action);
}

function redo() {
  if (redoStack.length === 0) return;
  const action = redoStack.pop();
  undoStack.push(action);
  executeAction(action);
}
```

### 3. 括号匹配（LeetCode 20）

```javascript
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (')]}'.includes(char)) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

// 测试
isValid("()");      // true
isValid("()[]{}");  // true
isValid("(]");      // false
isValid("([)]");    // false
isValid("{[]}");    // true
```

### 4. 表达式求值

```javascript
// 逆波兰表达式求值 (LeetCode 150)
function evalRPN(tokens) {
  const stack = [];
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (token in operators) {
      const b = stack.pop();
      const a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop();
}
```

## 面试高频题

### 1. 最小栈 (LeetCode 155)

设计一个支持 push, pop, top 操作，并能在常数时间内检索到最小元素的栈。

```javascript
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // 辅助栈，存储最小值
  }

  push(val) {
    this.stack.push(val);
    // 如果辅助栈为空或当前值更小，入辅助栈
    if (this.minStack.length === 0 ||
        val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }

  pop() {
    const val = this.stack.pop();
    // 如果弹出的是最小值，辅助栈也要弹出
    if (val === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
    return val;
  }

  top() {
    return this.stack[this.stack.length - 1];
  }

  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

### 2. 用栈实现队列 (LeetCode 232)

```javascript
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}
```

### 3. 每日温度 (LeetCode 739)

```javascript
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // 存储索引

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 &&
           temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }
  return result;
}
```

## 与函数调用栈

JavaScript 引擎使用调用栈来管理函数执行：

```javascript
function main() {
  console.log('main start');
  foo();
  console.log('main end');
}

function foo() {
  console.log('foo start');
  bar();
  console.log('foo end');
}

function bar() {
  console.log('bar');
}

main();
// 输出顺序：
// main start
// foo start
// bar
// foo end
// main end
```

**调用栈变化：**
1. `main()` 入栈
2. `foo()` 入栈
3. `bar()` 入栈
4. `bar()` 执行完毕，出栈
5. `foo()` 执行完毕，出栈
6. `main()` 执行完毕，出栈

## 复杂度分析

| 操作 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| push | O(1) | O(1) |
| pop | O(1) | O(1) |
| peek | O(1) | O(1) |
| isEmpty | O(1) | O(1) |
| 整体空间 | - | O(n) |

## 总结

栈是前端开发中非常重要的数据结构：

1. **简单高效**: 操作简单，时间复杂度低
2. **应用广泛**: 函数调用、历史记录、撤销重做
3. **面试必考**: 括号匹配、表达式求值等经典问题
4. **理解 JS 运行机制**: 调用栈是理解 JavaScript 执行的基础
