# 前端编程挑战

## 概述

本页面收录了前端开发中常见的算法题目，每道题都可以在线编辑代码并运行测试。通过动手实践，加深对算法的理解。

## 题目分类

### 数组操作
- **数组去重**: 多种实现方式（Set、filter、reduce）
- **数组扁平化**: 递归展开嵌套数组
- **两数之和**: 使用 Map 优化查找

### 函数相关
- **防抖 (Debounce)**: 延迟执行，重复触发重新计时
- **节流 (Throttle)**: 限制执行频率
- **函数柯里化**: 将多参数函数转换为单参数函数链

### 对象操作
- **深拷贝**: 完整复制对象及其嵌套结构

### 异步编程
- **Promise.all**: 并行执行多个 Promise

### 原型链
- **实现 call**: 改变函数 this 指向
- **实现 apply**: 改变函数 this 指向（数组参数）
- **实现 bind**: 返回绑定 this 的新函数
- **实现 instanceof**: 检查原型链
- **实现 new**: 创建对象实例

### 栈相关
- **有效括号**: 使用栈匹配括号对

### 链表
- **反转链表**: 迭代反转链表节点

### 数据结构
- **LRU 缓存**: 最近最少使用缓存淘汰策略

### 设计模式
- **发布订阅**: 事件驱动的消息传递模式

## 解题技巧

### 1. 数组去重
```javascript
// 方法一：Set（最简洁）
const unique = arr => [...new Set(arr)];

// 方法二：filter + indexOf
const unique = arr => arr.filter((item, index) => arr.indexOf(item) === index);

// 方法三：reduce
const unique = arr => arr.reduce((acc, cur) =>
  acc.includes(cur) ? acc : [...acc, cur], []);
```

### 2. 防抖与节流

**防抖 (Debounce)**：
- 适用场景：搜索框输入、窗口 resize
- 原理：延迟执行，重复触发会重新计时

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

**节流 (Throttle)**：
- 适用场景：滚动事件、按钮点击
- 原理：固定时间内只执行一次

```javascript
function throttle(fn, delay) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```

### 3. 深拷贝

```javascript
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (map.has(obj)) return map.get(obj);

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }
  return clone;
}
```

### 4. 实现 call/apply/bind

```javascript
// call
Function.prototype.myCall = function(context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// apply
Function.prototype.myApply = function(context, args = []) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// bind
Function.prototype.myBind = function(context, ...args) {
  const self = this;
  return function(...newArgs) {
    return self.apply(context, [...args, ...newArgs]);
  };
};
```

### 5. LRU 缓存

```javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}
```

## 常见考点

| 题目 | 难度 | 考察点 |
|------|------|--------|
| 数组去重 | 简单 | Set、数组方法 |
| 防抖节流 | 中等 | 闭包、定时器、this |
| 深拷贝 | 中等 | 递归、类型判断、循环引用 |
| Promise.all | 中等 | Promise、异步编程 |
| call/apply/bind | 中等 | this、原型链 |
| instanceof | 简单 | 原型链 |
| new | 中等 | 原型链、构造函数 |
| 有效括号 | 简单 | 栈 |
| 反转链表 | 简单 | 指针操作 |
| LRU 缓存 | 中等 | Map、数据结构设计 |
| 发布订阅 | 中等 | 设计模式、Map |

## 实践建议

1. **先理解原理**：在写代码之前，先理解算法的核心思想
2. **手写实现**：不要复制粘贴，尝试自己实现
3. **测试验证**：使用测试用例验证你的实现
4. **优化思考**：思考时间和空间复杂度，是否有更优解
5. **总结归纳**：把相似的题目放在一起，找出共同点

## 参考资源

- [LeetCode](https://leetcode.cn/) - 算法刷题平台
- [JavaScript 算法与数据结构](https://github.com/trekhleb/javascript-algorithms)
