"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/CodeEditor";

// 编程题目数据
const interviewQuestions = [
  {
    id: 1,
    title: "数组去重",
    difficulty: "简单",
    category: "数组",
    description: "实现一个函数，对数组进行去重，返回去重后的新数组。",
    initialCode: `// 实现数组去重
function solution(arr) {
  // 方法1: Set
  // return [...new Set(arr)];

  // 方法2: filter + indexOf
  // return arr.filter((item, index) => arr.indexOf(item) === index);

  // 方法3: reduce
  return arr.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

// 测试
console.log(solution([1, 2, 2, 3, 3, 3, 4]));`,
    testCases: [
      { input: "[[1, 2, 2, 3, 3, 3, 4]]", expected: "[1,2,3,4]" },
      { input: '[[1, "1", 1, "1"]]', expected: '[1,"1"]' },
      { input: "[[]]", expected: "[]" },
    ],
  },
  {
    id: 2,
    title: "数组扁平化",
    difficulty: "中等",
    category: "数组",
    description: "实现一个 flatten 函数，将多维数组扁平化为一维数组。",
    initialCode: `// 实现数组扁平化
function solution(arr, depth = Infinity) {
  // 方法1: 递归
  if (depth === 0) return arr.slice();

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...solution(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);

  // 方法2: 使用 flat (ES2019)
  // return arr.flat(depth);
}

// 测试
console.log(solution([1, [2, [3, [4, 5]]]]));`,
    testCases: [
      { input: "[[[1, [2, [3, [4, 5]]]]]]", expected: "[1,2,3,4,5]" },
      { input: "[[[1, 2], [3, 4]]]", expected: "[1,2,3,4]" },
      { input: "[[[1, [2]], 1]]", expected: "[1,2,1]" },
    ],
  },
  {
    id: 3,
    title: "防抖函数",
    difficulty: "中等",
    category: "函数",
    description: "实现一个防抖函数 debounce，在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。",
    initialCode: `// 实现防抖函数
function solution(fn, delay) {
  let timer = null;

  return function (...args) {
    // 清除之前的定时器
    clearTimeout(timer);

    // 设置新的定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 测试
let count = 0;
const increment = () => { count++; console.log('count:', count); };
const debouncedIncrement = solution(increment, 100);

// 快速调用多次
debouncedIncrement();
debouncedIncrement();
debouncedIncrement();

// 等待执行
setTimeout(() => {
  console.log('最终 count:', count); // 应该是 1
}, 200);`,
    testCases: [],
  },
  {
    id: 4,
    title: "节流函数",
    difficulty: "中等",
    category: "函数",
    description: "实现一个节流函数 throttle，规定在一个单位时间内，只能触发一次函数。",
    initialCode: `// 实现节流函数（时间戳版本）
function solution(fn, limit) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= limit) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 测试
let count = 0;
const increment = () => { count++; console.log('count:', count); };
const throttledIncrement = solution(increment, 100);

// 模拟快速调用
throttledIncrement(); // 执行
throttledIncrement(); // 不执行（在节流时间内）
throttledIncrement(); // 不执行

console.log('count:', count); // 应该是 1`,
    testCases: [],
  },
  {
    id: 5,
    title: "深拷贝",
    difficulty: "中等",
    category: "对象",
    description: "实现一个深拷贝函数，能够处理对象、数组、Date、RegExp 等类型，并能处理循环引用。",
    initialCode: `// 实现深拷贝
function solution(obj, hash = new WeakMap()) {
  // 基本类型直接返回
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 处理特殊对象
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 处理循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 创建新对象/数组
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  // 递归复制属性
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = solution(obj[key], hash);
    }
  }

  return clone;
}

// 测试
const original = {
  name: '张三',
  age: 25,
  hobbies: ['读书', '游戏'],
  address: { city: '北京' }
};
const cloned = solution(original);
cloned.address.city = '上海';

console.log('原对象:', original.address.city); // 北京
console.log('克隆对象:', cloned.address.city); // 上海`,
    testCases: [],
  },
  {
    id: 6,
    title: "实现 Promise.all",
    difficulty: "困难",
    category: "异步",
    description: "手动实现 Promise.all 方法，接收一个 Promise 数组，当所有 Promise 都成功时返回结果数组，任一失败则返回失败原因。",
    initialCode: `// 实现 Promise.all
function solution(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }

    const results = [];
    let completed = 0;
    const total = promises.length;

    if (total === 0) {
      return resolve([]);
    }

    promises.forEach((promise, index) => {
      // 用 Promise.resolve 包装，处理非 Promise 值
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;

          if (completed === total) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// 测试
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

solution([p1, p2, p3]).then(results => {
  console.log('结果:', results); // [1, 2, 3]
});

// 测试失败情况
const p4 = Promise.reject('error');
solution([p1, p4]).catch(err => {
  console.log('错误:', err); // error
});`,
    testCases: [],
  },
  {
    id: 7,
    title: "实现 call/apply/bind",
    difficulty: "困难",
    category: "函数",
    description: "手动实现 Function.prototype.call、apply、bind 方法。",
    initialCode: `// 实现 call
Function.prototype.myCall = function(context, ...args) {
  context = context || globalThis;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// 实现 apply
Function.prototype.myApply = function(context, args = []) {
  context = context || globalThis;
  const fn = Symbol('fn');
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// 实现 bind
Function.prototype.myBind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.apply(context, args.concat(newArgs));
  };
};

// 测试
function greet(greeting, punctuation) {
  return greeting + ', ' + this.name + punctuation;
}

const person = { name: '张三' };

console.log(greet.myCall(person, 'Hello', '!'));
console.log(greet.myApply(person, ['Hi', '?']));
console.log(greet.myBind(person, 'Hey')('~'));`,
    testCases: [],
  },
  {
    id: 8,
    title: "实现 instanceof",
    difficulty: "中等",
    category: "原型链",
    description: "手动实现 instanceof 操作符，判断对象是否是构造函数的实例。",
    initialCode: `// 实现 instanceof
function solution(obj, Constructor) {
  // 基本类型直接返回 false
  if (obj === null || typeof obj !== 'object') {
    return false;
  }

  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);

  // 遍历原型链
  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

// 测试
class Animal {}
class Dog extends Animal {}

const dog = new Dog();

console.log(solution(dog, Dog));     // true
console.log(solution(dog, Animal));  // true
console.log(solution(dog, Object));  // true
console.log(solution(dog, Array));   // false
console.log(solution([], Array));    // true`,
    testCases: [],
  },
  {
    id: 9,
    title: "实现 new 操作符",
    difficulty: "中等",
    category: "原型链",
    description: "手动实现 new 操作符的功能。",
    initialCode: `// 实现 new 操作符
function solution(Constructor, ...args) {
  // 1. 创建一个新对象，原型指向构造函数的 prototype
  const obj = Object.create(Constructor.prototype);

  // 2. 执行构造函数，绑定 this
  const result = Constructor.apply(obj, args);

  // 3. 如果构造函数返回对象，则返回该对象；否则返回新创建的对象
  return result instanceof Object ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHi = function() {
  return 'Hi, I am ' + this.name;
};

const person = solution(Person, '张三', 25);
console.log(person.name);     // 张三
console.log(person.age);      // 25
console.log(person.sayHi());  // Hi, I am 张三
console.log(person instanceof Person); // true`,
    testCases: [],
  },
  {
    id: 10,
    title: "两数之和",
    difficulty: "简单",
    category: "数组",
    description: "给定一个整数数组 nums 和一个目标值 target，找出数组中和为目标值的两个数的索引。",
    initialCode: `// 两数之和 (LeetCode 1)
function solution(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

// 测试
console.log(solution([2, 7, 11, 15], 9));  // [0, 1]
console.log(solution([3, 2, 4], 6));       // [1, 2]`,
    testCases: [
      { input: "[[2, 7, 11, 15], 9]", expected: "[0,1]" },
      { input: "[[3, 2, 4], 6]", expected: "[1,2]" },
      { input: "[[3, 3], 6]", expected: "[0,1]" },
    ],
  },
  {
    id: 11,
    title: "有效的括号",
    difficulty: "简单",
    category: "栈",
    description: "给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。",
    initialCode: `// 有效的括号 (LeetCode 20)
function solution(s) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

// 测试
console.log(solution("()"));      // true
console.log(solution("()[]{}"));  // true
console.log(solution("(]"));      // false
console.log(solution("([)]"));    // false
console.log(solution("{[]}"));    // true`,
    testCases: [
      { input: '["()"]', expected: "true" },
      { input: '["()[]{}"]', expected: "true" },
      { input: '["(]"]', expected: "false" },
      { input: '["([)]"]', expected: "false" },
      { input: '["{[]}"]', expected: "true" },
    ],
  },
  {
    id: 12,
    title: "反转链表",
    difficulty: "简单",
    category: "链表",
    description: "反转一个单链表。",
    initialCode: `// 反转链表 (LeetCode 206)
// 链表节点定义
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function solution(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;  // 保存下一个节点
    current.next = prev;        // 反转指针
    prev = current;             // prev 前进
    current = next;             // current 前进
  }

  return prev;
}

// 辅助函数：数组转链表
function arrayToList(arr) {
  if (!arr.length) return null;
  const head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 辅助函数：链表转数组
function listToArray(head) {
  const result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// 测试
const list = arrayToList([1, 2, 3, 4, 5]);
const reversed = solution(list);
console.log(listToArray(reversed)); // [5, 4, 3, 2, 1]`,
    testCases: [],
  },
  {
    id: 13,
    title: "柯里化函数",
    difficulty: "中等",
    category: "函数",
    description: "实现一个柯里化函数，将接受多个参数的函数转换为一系列接受单个参数的函数。",
    initialCode: `// 实现柯里化
function solution(fn) {
  return function curried(...args) {
    // 如果参数足够，执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // 否则返回新函数，继续收集参数
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 测试
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = solution(add);

console.log(curriedAdd(1)(2)(3));     // 6
console.log(curriedAdd(1, 2)(3));     // 6
console.log(curriedAdd(1)(2, 3));     // 6
console.log(curriedAdd(1, 2, 3));     // 6`,
    testCases: [],
  },
  {
    id: 14,
    title: "LRU 缓存",
    difficulty: "困难",
    category: "数据结构",
    description: "设计和实现一个 LRU (最近最少使用) 缓存机制。",
    initialCode: `// LRU 缓存 (LeetCode 146)
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // 更新为最近使用
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 删除最久未使用的（Map 的第一个元素）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}

// 测试
const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));    // 1

cache.put(3, 3);              // 淘汰 key 2
console.log(cache.get(2));    // -1 (已被淘汰)

cache.put(4, 4);              // 淘汰 key 1
console.log(cache.get(1));    // -1 (已被淘汰)
console.log(cache.get(3));    // 3
console.log(cache.get(4));    // 4`,
    testCases: [],
  },
  {
    id: 15,
    title: "发布订阅模式",
    difficulty: "中等",
    category: "设计模式",
    description: "实现一个发布订阅模式的 EventEmitter 类。",
    initialCode: `// 发布订阅模式
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // 订阅事件
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    return this;
  }

  // 取消订阅
  off(event, callback) {
    if (!this.events.has(event)) return this;

    if (!callback) {
      this.events.delete(event);
    } else {
      const callbacks = this.events.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
    return this;
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events.has(event)) return this;

    this.events.get(event).forEach(callback => {
      callback.apply(this, args);
    });
    return this;
  }

  // 只订阅一次
  once(event, callback) {
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

// 测试
const emitter = new EventEmitter();

emitter.on('message', (msg) => {
  console.log('收到消息:', msg);
});

emitter.once('login', (user) => {
  console.log('用户登录:', user);
});

emitter.emit('message', 'Hello!');
emitter.emit('login', '张三');
emitter.emit('login', '李四'); // 不会触发，因为用了 once`,
    testCases: [],
  },
  {
    id: 16,
    title: "快速排序",
    difficulty: "中等",
    category: "排序",
    description: "实现快速排序算法，对数组进行原地排序。",
    initialCode: `// 快速排序
function solution(arr) {
  if (arr.length <= 1) return arr;

  function quickSort(arr, left, right) {
    if (left >= right) return;

    // 选择基准值（取中间元素）
    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];

    // 分区
    let i = left;
    let j = right;

    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;

      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }

    // 递归排序左右分区
    if (left < j) quickSort(arr, left, j);
    if (i < right) quickSort(arr, i, right);
  }

  const result = [...arr];
  quickSort(result, 0, result.length - 1);
  return result;
}

// 测试
console.log(solution([3, 6, 8, 10, 1, 2, 1]));
console.log(solution([5, 4, 3, 2, 1]));
console.log(solution([1]));`,
    testCases: [
      { input: "[[3, 6, 8, 10, 1, 2, 1]]", expected: "[1,1,2,3,6,8,10]" },
      { input: "[[5, 4, 3, 2, 1]]", expected: "[1,2,3,4,5]" },
      { input: "[[1]]", expected: "[1]" },
    ],
  },
  {
    id: 17,
    title: "归并排序",
    difficulty: "中等",
    category: "排序",
    description: "实现归并排序算法，使用分治思想进行排序。",
    initialCode: `// 归并排序
function solution(arr) {
  if (arr.length <= 1) return arr;

  // 分割
  const mid = Math.floor(arr.length / 2);
  const left = solution(arr.slice(0, mid));
  const right = solution(arr.slice(mid));

  // 合并
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // 添加剩余元素
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// 测试
console.log(solution([38, 27, 43, 3, 9, 82, 10]));
console.log(solution([5, 2, 4, 6, 1, 3]));`,
    testCases: [
      { input: "[[38, 27, 43, 3, 9, 82, 10]]", expected: "[3,9,10,27,38,43,82]" },
      { input: "[[5, 2, 4, 6, 1, 3]]", expected: "[1,2,3,4,5,6]" },
    ],
  },
  {
    id: 18,
    title: "二分查找",
    difficulty: "简单",
    category: "搜索",
    description: "实现二分查找算法，在有序数组中查找目标值的索引，不存在返回 -1。",
    initialCode: `// 二分查找
function solution(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}

// 测试
console.log(solution([-1, 0, 3, 5, 9, 12], 9));  // 4
console.log(solution([-1, 0, 3, 5, 9, 12], 2));  // -1
console.log(solution([5], 5));                   // 0`,
    testCases: [
      { input: "[[-1, 0, 3, 5, 9, 12], 9]", expected: "4" },
      { input: "[[-1, 0, 3, 5, 9, 12], 2]", expected: "-1" },
      { input: "[[5], 5]", expected: "0" },
    ],
  },
  {
    id: 19,
    title: "斐波那契数列",
    difficulty: "简单",
    category: "动态规划",
    description: "计算斐波那契数列的第 n 项（从 0 开始）。",
    initialCode: `// 斐波那契数列
function solution(n) {
  // 方法1: 动态规划（迭代）
  if (n <= 1) return n;

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;

  // 方法2: 递归 + 记忆化
  // const memo = new Map();
  // function fib(n) {
  //   if (n <= 1) return n;
  //   if (memo.has(n)) return memo.get(n);
  //   const result = fib(n - 1) + fib(n - 2);
  //   memo.set(n, result);
  //   return result;
  // }
  // return fib(n);
}

// 测试
console.log(solution(0));   // 0
console.log(solution(1));   // 1
console.log(solution(10));  // 55
console.log(solution(20));  // 6765`,
    testCases: [
      { input: "[0]", expected: "0" },
      { input: "[1]", expected: "1" },
      { input: "[10]", expected: "55" },
      { input: "[20]", expected: "6765" },
    ],
  },
  {
    id: 20,
    title: "爬楼梯",
    difficulty: "简单",
    category: "动态规划",
    description: "假设你正在爬楼梯，需要 n 阶才能到达楼顶。每次可以爬 1 或 2 个台阶，有多少种不同的方法可以爬到楼顶？",
    initialCode: `// 爬楼梯 (LeetCode 70)
function solution(n) {
  if (n <= 2) return n;

  // dp[i] 表示到达第 i 阶的方法数
  // dp[i] = dp[i-1] + dp[i-2]
  let prev1 = 1; // dp[i-2]
  let prev2 = 2; // dp[i-1]

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev1 = prev2;
    prev2 = curr;
  }

  return prev2;
}

// 测试
console.log(solution(2));  // 2 种方法: 1+1, 2
console.log(solution(3));  // 3 种方法: 1+1+1, 1+2, 2+1
console.log(solution(4));  // 5 种方法
console.log(solution(10)); // 89 种方法`,
    testCases: [
      { input: "[2]", expected: "2" },
      { input: "[3]", expected: "3" },
      { input: "[4]", expected: "5" },
      { input: "[10]", expected: "89" },
    ],
  },
  {
    id: 21,
    title: "最大子数组和",
    difficulty: "中等",
    category: "动态规划",
    description: "给定一个整数数组 nums，找到一个具有最大和的连续子数组，返回其最大和。",
    initialCode: `// 最大子数组和 (LeetCode 53)
function solution(nums) {
  // Kadane 算法
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 要么加入当前子数组，要么从当前位置重新开始
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

// 测试
console.log(solution([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 (子数组 [4,-1,2,1])
console.log(solution([1]));                             // 1
console.log(solution([5, 4, -1, 7, 8]));               // 23`,
    testCases: [
      { input: "[[-2, 1, -3, 4, -1, 2, 1, -5, 4]]", expected: "6" },
      { input: "[[1]]", expected: "1" },
      { input: "[[5, 4, -1, 7, 8]]", expected: "23" },
    ],
  },
  {
    id: 22,
    title: "合并两个有序数组",
    difficulty: "简单",
    category: "数组",
    description: "将两个有序数组合并为一个有序数组。",
    initialCode: `// 合并两个有序数组
function solution(nums1, nums2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) {
      result.push(nums1[i]);
      i++;
    } else {
      result.push(nums2[j]);
      j++;
    }
  }

  // 添加剩余元素
  while (i < nums1.length) {
    result.push(nums1[i]);
    i++;
  }
  while (j < nums2.length) {
    result.push(nums2[j]);
    j++;
  }

  return result;
}

// 测试
console.log(solution([1, 2, 3], [2, 5, 6]));  // [1, 2, 2, 3, 5, 6]
console.log(solution([1], [2]));              // [1, 2]
console.log(solution([], [1]));               // [1]`,
    testCases: [
      { input: "[[1, 2, 3], [2, 5, 6]]", expected: "[1,2,2,3,5,6]" },
      { input: "[[1], [2]]", expected: "[1,2]" },
      { input: "[[], [1]]", expected: "[1]" },
    ],
  },
  {
    id: 23,
    title: "字符串反转",
    difficulty: "简单",
    category: "字符串",
    description: "反转字符串中的单词顺序。",
    initialCode: `// 反转字符串中的单词
function solution(s) {
  // 1. 去除首尾空格，分割单词
  // 2. 过滤空字符串
  // 3. 反转数组
  // 4. 拼接
  return s
    .trim()
    .split(/\\s+/)
    .reverse()
    .join(' ');
}

// 测试
console.log(solution("the sky is blue"));        // "blue is sky the"
console.log(solution("  hello world  "));        // "world hello"
console.log(solution("a good   example"));       // "example good a"`,
    testCases: [
      { input: '["the sky is blue"]', expected: '"blue is sky the"' },
      { input: '["  hello world  "]', expected: '"world hello"' },
      { input: '["a good   example"]', expected: '"example good a"' },
    ],
  },
  {
    id: 24,
    title: "回文字符串判断",
    difficulty: "简单",
    category: "字符串",
    description: "判断一个字符串是否是回文串（只考虑字母和数字，忽略大小写）。",
    initialCode: `// 回文字符串判断 (LeetCode 125)
function solution(s) {
  // 只保留字母和数字，转小写
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 双指针比较
  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}

// 测试
console.log(solution("A man, a plan, a canal: Panama")); // true
console.log(solution("race a car"));                      // false
console.log(solution(" "));                               // true`,
    testCases: [
      { input: '["A man, a plan, a canal: Panama"]', expected: "true" },
      { input: '["race a car"]', expected: "false" },
      { input: '[" "]', expected: "true" },
    ],
  },
  {
    id: 25,
    title: "数组中的第 K 大元素",
    difficulty: "中等",
    category: "数组",
    description: "在未排序的数组中找到第 k 个最大的元素。",
    initialCode: `// 数组中的第K大元素 (LeetCode 215)
function solution(nums, k) {
  // 方法1: 排序（简单但效率不是最优）
  // return nums.sort((a, b) => b - a)[k - 1];

  // 方法2: 快速选择算法（平均 O(n)）
  function quickSelect(arr, left, right, k) {
    if (left === right) return arr[left];

    // 分区
    const pivotIndex = partition(arr, left, right);

    if (k === pivotIndex) {
      return arr[k];
    } else if (k < pivotIndex) {
      return quickSelect(arr, left, pivotIndex - 1, k);
    } else {
      return quickSelect(arr, pivotIndex + 1, right, k);
    }
  }

  function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left;

    for (let j = left; j < right; j++) {
      if (arr[j] > pivot) {  // 降序排列
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  }

  return quickSelect(nums, 0, nums.length - 1, k - 1);
}

// 测试
console.log(solution([3, 2, 1, 5, 6, 4], 2));     // 5
console.log(solution([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4`,
    testCases: [
      { input: "[[3, 2, 1, 5, 6, 4], 2]", expected: "5" },
      { input: "[[3, 2, 3, 1, 2, 4, 5, 5, 6], 4]", expected: "4" },
    ],
  },
  {
    id: 26,
    title: "对象扁平化",
    difficulty: "中等",
    category: "对象",
    description: "将嵌套对象扁平化为一层对象，键名用点号连接。",
    initialCode: `// 对象扁平化
function solution(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue;

    const newKey = prefix ? \`\${prefix}.\${key}\` : key;
    const value = obj[key];

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // 递归处理嵌套对象
      solution(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

// 测试
const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  },
  f: [1, 2, 3]
};

console.log(solution(obj));
// { 'a': 1, 'b.c': 2, 'b.d.e': 3, 'f': [1, 2, 3] }`,
    testCases: [],
  },
  {
    id: 27,
    title: "数组转树结构",
    difficulty: "困难",
    category: "数据结构",
    description: "将扁平数组转换为树形结构。每个元素都有 id 和 parentId 属性。",
    initialCode: `// 数组转树结构
function solution(arr) {
  const map = new Map();
  const result = [];

  // 第一遍：创建所有节点的映射
  arr.forEach(item => {
    map.set(item.id, { ...item, children: [] });
  });

  // 第二遍：建立父子关系
  arr.forEach(item => {
    const node = map.get(item.id);
    if (item.parentId === null || item.parentId === undefined) {
      // 根节点
      result.push(node);
    } else {
      // 找到父节点，添加到其 children
      const parent = map.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });

  return result;
}

// 测试数据
const arr = [
  { id: 1, name: '部门A', parentId: null },
  { id: 2, name: '部门B', parentId: 1 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 2 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
];

console.log(JSON.stringify(solution(arr), null, 2));`,
    testCases: [],
  },
  {
    id: 28,
    title: "实现 JSON.stringify",
    difficulty: "困难",
    category: "对象",
    description: "手动实现 JSON.stringify 函数，处理基本类型、数组和对象。",
    initialCode: `// 实现 JSON.stringify
function solution(value) {
  // 处理 null
  if (value === null) {
    return 'null';
  }

  // 处理基本类型
  const type = typeof value;

  if (type === 'undefined' || type === 'function' || type === 'symbol') {
    return undefined;
  }

  if (type === 'boolean') {
    return value.toString();
  }

  if (type === 'number') {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
      return 'null';
    }
    return value.toString();
  }

  if (type === 'string') {
    return '"' + value.replace(/"/g, '\\\\"') + '"';
  }

  // 处理数组
  if (Array.isArray(value)) {
    const items = value.map(item => {
      const result = solution(item);
      return result === undefined ? 'null' : result;
    });
    return '[' + items.join(',') + ']';
  }

  // 处理对象
  if (type === 'object') {
    const pairs = [];
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        const result = solution(value[key]);
        if (result !== undefined) {
          pairs.push('"' + key + '":' + result);
        }
      }
    }
    return '{' + pairs.join(',') + '}';
  }

  return undefined;
}

// 测试
console.log(solution({ a: 1, b: 'hello', c: true }));
console.log(solution([1, 'hello', null, true]));
console.log(solution(null));
console.log(solution(123));
console.log(solution('hello'));`,
    testCases: [],
  },
  {
    id: 29,
    title: "实现 Promise",
    difficulty: "困难",
    category: "异步",
    description: "手动实现一个简化版的 Promise，支持 then 和 catch。",
    initialCode: `// 简化版 Promise 实现
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e; };

    return new MyPromise((resolve, reject) => {
      const handleFulfilled = () => {
        setTimeout(() => {
          try {
            const result = onFulfilled(this.value);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleRejected = () => {
        setTimeout(() => {
          try {
            const result = onRejected(this.reason);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        });
      };

      if (this.state === 'fulfilled') {
        handleFulfilled();
      } else if (this.state === 'rejected') {
        handleRejected();
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// 测试
new MyPromise((resolve) => {
  setTimeout(() => resolve('成功'), 100);
})
.then(value => {
  console.log('第一个 then:', value);
  return value + '!';
})
.then(value => {
  console.log('第二个 then:', value);
});

new MyPromise((resolve, reject) => {
  reject('失败');
})
.catch(err => {
  console.log('捕获错误:', err);
});`,
    testCases: [],
  },
  {
    id: 30,
    title: "版本号比较",
    difficulty: "中等",
    category: "字符串",
    description: "比较两个版本号 version1 和 version2。如果 version1 > version2 返回 1，如果 version1 < version2 返回 -1，相等返回 0。",
    initialCode: `// 版本号比较 (LeetCode 165)
function solution(version1, version2) {
  const v1 = version1.split('.').map(Number);
  const v2 = version2.split('.').map(Number);

  const maxLen = Math.max(v1.length, v2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = v1[i] || 0;  // 不存在的部分视为 0
    const num2 = v2[i] || 0;

    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }

  return 0;
}

// 测试
console.log(solution("1.01", "1.001"));     // 0
console.log(solution("1.0", "1.0.0"));      // 0
console.log(solution("0.1", "1.1"));        // -1
console.log(solution("1.0.1", "1"));        // 1
console.log(solution("7.5.2.4", "7.5.3")); // -1`,
    testCases: [
      { input: '["1.01", "1.001"]', expected: "0" },
      { input: '["1.0", "1.0.0"]', expected: "0" },
      { input: '["0.1", "1.1"]', expected: "-1" },
      { input: '["1.0.1", "1"]', expected: "1" },
    ],
  },
];

// 难度颜色
const difficultyColors: Record<string, string> = {
  简单: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  中等: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  困难: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

// 分类颜色
const categoryColors: Record<string, string> = {
  数组: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  函数: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  对象: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  异步: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  原型链: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  栈: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  链表: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  数据结构: "bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300",
  设计模式: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  排序: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  搜索: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  动态规划: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300",
  字符串: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
};

export default function InterviewQuestionsExamples() {
  const [selectedQuestion, setSelectedQuestion] = useState(interviewQuestions[0]);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...new Set(interviewQuestions.map(q => q.category))];
  const filteredQuestions = filter === "all"
    ? interviewQuestions
    : interviewQuestions.filter(q => q.category === filter);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">前端编程挑战</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          精选前端高频算法题，可以在线编辑代码并运行测试。
        </p>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-3 py-1 text-sm transition-colors ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
            }`}
          >
            {cat === "all" ? "全部" : cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* 题目列表 */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            <div className="bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
              <span className="text-sm font-medium">题目列表 ({filteredQuestions.length})</span>
            </div>
            <div className="max-h-[600px] overflow-y-auto">
              {filteredQuestions.map(q => (
                <div
                  key={q.id}
                  onClick={() => setSelectedQuestion(q)}
                  className={`cursor-pointer border-b border-zinc-200 p-3 transition-colors dark:border-zinc-700 ${
                    selectedQuestion.id === q.id
                      ? "bg-blue-50 dark:bg-blue-900/20"
                      : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{q.id}. {q.title}</span>
                    <span className={`rounded px-1.5 py-0.5 text-xs ${difficultyColors[q.difficulty]}`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className={`rounded px-1.5 py-0.5 text-xs ${categoryColors[q.category] || "bg-zinc-200"}`}>
                      {q.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 代码编辑区 */}
        <div className="lg:col-span-2">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">{selectedQuestion.id}. {selectedQuestion.title}</h3>
            <div className="mt-2 flex gap-2">
              <span className={`rounded px-2 py-0.5 text-xs ${difficultyColors[selectedQuestion.difficulty]}`}>
                {selectedQuestion.difficulty}
              </span>
              <span className={`rounded px-2 py-0.5 text-xs ${categoryColors[selectedQuestion.category] || "bg-zinc-200"}`}>
                {selectedQuestion.category}
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {selectedQuestion.description}
            </p>
          </div>

          <CodeEditor
            key={selectedQuestion.id}
            initialCode={selectedQuestion.initialCode}
            testCases={selectedQuestion.testCases}
          />
        </div>
      </div>
    </div>
  );
}
