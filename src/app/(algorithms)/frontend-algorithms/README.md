# 前端常用算法

## 概述

这些算法在前端日常开发和面试中经常出现，是每个前端工程师都应该掌握的基础知识。

## 防抖 (Debounce)

在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

### 应用场景

- 搜索框输入（用户停止输入后再发请求）
- 窗口 resize 事件
- 表单验证
- 按钮提交防重复点击

### 实现

```javascript
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 带立即执行选项
function debounce(fn, delay, immediate = false) {
  let timer = null;

  return function (...args) {
    const callNow = immediate && !timer;

    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) {
        fn.apply(this, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(this, args);
    }
  };
}
```

### 使用示例

```javascript
// 搜索框
const debouncedSearch = debounce((query) => {
  fetch(`/api/search?q=${query}`);
}, 500);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// React Hook 版本
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
```

## 节流 (Throttle)

规定在一个单位时间内，只能触发一次函数。

### 应用场景

- 滚动事件
- 鼠标移动
- 游戏中的按键响应
- DOM 元素拖拽

### 实现

```javascript
// 时间戳版本（第一次立即执行）
function throttle(fn, limit) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= limit) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}

// 定时器版本（最后一次会执行）
function throttle(fn, limit) {
  let timer = null;

  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, limit);
    }
  };
}

// 结合版本（首次执行 + 最后一次执行）
function throttle(fn, limit) {
  let lastTime = 0;
  let timer = null;

  return function (...args) {
    const now = Date.now();
    const remaining = limit - (now - lastTime);

    clearTimeout(timer);

    if (remaining <= 0) {
      fn.apply(this, args);
      lastTime = now;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        lastTime = Date.now();
      }, remaining);
    }
  };
}
```

## 防抖 vs 节流

| 特性 | 防抖 (Debounce) | 节流 (Throttle) |
|------|-----------------|-----------------|
| 执行时机 | 停止触发后执行 | 固定间隔执行 |
| 执行次数 | 可能只执行 1 次 | 多次，但有间隔 |
| 适用场景 | 搜索、表单验证 | 滚动、拖拽 |

## LRU 缓存 (LeetCode 146)

LRU (Least Recently Used) 最近最少使用缓存。

### 实现

```javascript
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
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Map 的第一个元素是最久未使用的
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}
```

### 为什么用 Map？

ES6 的 Map 保持插入顺序，第一个元素就是最早插入的（最久未使用）。

## 深拷贝 (Deep Clone)

### JSON 方法（简单但有局限）

```javascript
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
```

**局限**：
- 无法处理 `undefined`、`Symbol`、函数
- 无法处理循环引用
- `Date` 变成字符串
- `RegExp` 变成空对象

### 递归实现

```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 特殊对象
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  // 处理循环引用
  if (hash.has(obj)) return hash.get(obj);

  // 创建新对象
  const clone = Array.isArray(obj) ? [] : {};
  hash.set(obj, clone);

  // 递归复制
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}
```

### 使用 structuredClone（现代浏览器）

```javascript
const clone = structuredClone(original);
```

## 数组扁平化 (Flatten)

### 递归实现

```javascript
function flatten(arr, depth = Infinity) {
  if (depth === 0) return arr.slice();

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      acc.push(...flatten(val, depth - 1));
    } else {
      acc.push(val);
    }
    return acc;
  }, []);
}
```

### 迭代实现

```javascript
function flatten(arr) {
  const result = [];
  const stack = [...arr];

  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }

  return result;
}
```

### ES6 原生方法

```javascript
arr.flat(depth);      // depth 默认为 1
arr.flat(Infinity);   // 完全扁平化
```

## 数组去重

```javascript
// Set
const unique = [...new Set(arr)];

// filter + indexOf
const unique = arr.filter((item, index) => arr.indexOf(item) === index);

// reduce
const unique = arr.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);

// Map（保持顺序）
function uniqueBy(arr, key) {
  const map = new Map();
  arr.forEach(item => {
    if (!map.has(item[key])) {
      map.set(item[key], item);
    }
  });
  return [...map.values()];
}
```

## 实现 Promise.all

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });

    if (promises.length === 0) {
      resolve([]);
    }
  });
}
```

## 实现 Promise.race

```javascript
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach(promise => {
      Promise.resolve(promise).then(resolve).catch(reject);
    });
  });
}
```

## 柯里化 (Curry)

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function (...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

// 使用
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);     // 6
curriedAdd(1, 2)(3);     // 6
curriedAdd(1)(2, 3);     // 6
```

## 实现 new 操作符

```javascript
function myNew(Constructor, ...args) {
  // 1. 创建新对象，原型指向构造函数的 prototype
  const obj = Object.create(Constructor.prototype);

  // 2. 执行构造函数，绑定 this
  const result = Constructor.apply(obj, args);

  // 3. 如果构造函数返回对象，则返回该对象
  return result instanceof Object ? result : obj;
}
```

## 实现 call/apply/bind

```javascript
// call
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// apply
Function.prototype.myApply = function (context, args = []) {
  context = context || window;
  const fn = Symbol();
  context[fn] = this;
  const result = context[fn](...args);
  delete context[fn];
  return result;
};

// bind
Function.prototype.myBind = function (context, ...args) {
  const fn = this;
  return function (...newArgs) {
    return fn.apply(context, args.concat(newArgs));
  };
};
```

## 实现 instanceof

```javascript
function myInstanceof(obj, Constructor) {
  let proto = Object.getPrototypeOf(obj);

  while (proto) {
    if (proto === Constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}
```

## 面试小结

这些算法/函数在面试中出现频率极高：

1. **防抖节流**: 必须掌握，理解应用场景
2. **深拷贝**: 理解局限性，处理特殊情况
3. **LRU 缓存**: 理解 Map 的特性
4. **Promise 相关**: 手写 Promise.all/race
5. **this 相关**: call/apply/bind 实现
6. **原型链**: instanceof 实现
