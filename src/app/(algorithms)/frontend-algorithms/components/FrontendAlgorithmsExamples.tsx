"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ============================================
// 示例 1: 防抖 (Debounce)
// ============================================

function DebounceDemo() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [callCount, setCallCount] = useState(0);
  const [debouncedCallCount, setDebouncedCallCount] = useState(0);

  // 防抖函数
  const debounce = useCallback(<T extends (...args: Parameters<T>) => void>(fn: T, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }, []);

  // 使用 useRef 保持防抖函数引用
  const debouncedSetValue = useRef(
    debounce((value: string) => {
      setDebouncedValue(value);
      setDebouncedCallCount((c) => c + 1);
    }, 500)
  ).current;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setCallCount((c) => c + 1);
    debouncedSetValue(value);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">防抖 (Debounce)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。
        常用于搜索输入、窗口 resize 等场景。
      </p>

      <div className="mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="输入内容（停止输入 500ms 后触发）"
          className="w-full rounded-md border border-zinc-300 px-4 py-2 dark:border-zinc-600 dark:bg-zinc-800"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded bg-zinc-100 p-3 dark:bg-zinc-800">
          <div className="text-sm font-medium">实时输入值</div>
          <div className="mt-1 font-mono">{inputValue || "-"}</div>
          <div className="mt-2 text-xs text-zinc-500">触发次数: {callCount}</div>
        </div>
        <div className="rounded bg-blue-100 p-3 dark:bg-blue-900/30">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">防抖后的值</div>
          <div className="mt-1 font-mono text-blue-800 dark:text-blue-200">{debouncedValue || "-"}</div>
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-300">实际执行次数: {debouncedCallCount}</div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`function debounce(fn, delay) {
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

// 使用示例
const debouncedSearch = debounce((query) => {
  fetch(\`/api/search?q=\${query}\`);
}, 500);

input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 节流 (Throttle)
// ============================================

function ThrottleDemo() {
  const [scrollCount, setScrollCount] = useState(0);
  const [throttledCount, setThrottledCount] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 节流函数
  const throttle = useCallback(<T extends (...args: Parameters<T>) => void>(fn: T, limit: number) => {
    let inThrottle = false;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        fn(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }, []);

  const throttledHandler = useRef(
    throttle((top: number) => {
      setScrollTop(top);
      setThrottledCount((c) => c + 1);
    }, 200)
  ).current;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollCount((c) => c + 1);
    throttledHandler(e.currentTarget.scrollTop);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">节流 (Throttle)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次，只有一次生效。
        常用于滚动事件、按钮点击防重复等场景。
      </p>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="mb-4 h-40 overflow-y-auto rounded border border-zinc-300 dark:border-zinc-600"
      >
        <div className="h-[800px] bg-gradient-to-b from-blue-100 to-purple-100 p-4 dark:from-blue-900/30 dark:to-purple-900/30">
          <p className="sticky top-0 rounded bg-white/80 p-2 text-sm dark:bg-zinc-800/80">
            向下滚动查看效果（每 200ms 最多触发一次）
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded bg-zinc-100 p-3 dark:bg-zinc-800">
          <div className="text-sm font-medium">原始触发次数</div>
          <div className="mt-1 text-2xl font-bold">{scrollCount}</div>
        </div>
        <div className="rounded bg-green-100 p-3 dark:bg-green-900/30">
          <div className="text-sm font-medium text-green-800 dark:text-green-200">节流后触发次数</div>
          <div className="mt-1 text-2xl font-bold text-green-800 dark:text-green-200">{throttledCount}</div>
        </div>
        <div className="rounded bg-blue-100 p-3 dark:bg-blue-900/30">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-200">滚动位置</div>
          <div className="mt-1 text-2xl font-bold text-blue-800 dark:text-blue-200">{Math.round(scrollTop)}px</div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`// 时间戳版本
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

// 定时器版本
function throttle(fn, limit) {
  let inThrottle = false;

  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: LRU 缓存
// ============================================

function LRUCacheDemo() {
  const [capacity] = useState(3);
  const [cache, setCache] = useState<Map<string, string>>(new Map());
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [getKey, setGetKey] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-4), msg]);
  };

  const put = () => {
    if (!key) return;

    const newCache = new Map(cache);

    // 如果 key 已存在，先删除（为了更新顺序）
    if (newCache.has(key)) {
      newCache.delete(key);
      addLog(`更新 key "${key}"`);
    } else if (newCache.size >= capacity) {
      // 删除最久未使用的（第一个）
      const firstKey = newCache.keys().next().value as string;
      newCache.delete(firstKey);
      addLog(`缓存已满，删除最久未使用的 "${firstKey}"`);
    }

    newCache.set(key, value);
    setCache(newCache);
    addLog(`put("${key}", "${value}")`);
    setKey("");
    setValue("");
  };

  const get = () => {
    if (!getKey) return;

    if (cache.has(getKey)) {
      const val = cache.get(getKey)!;
      // 更新顺序：删除后重新插入
      const newCache = new Map(cache);
      newCache.delete(getKey);
      newCache.set(getKey, val);
      setCache(newCache);
      setResult(val);
      addLog(`get("${getKey}") = "${val}" [更新为最近使用]`);
    } else {
      setResult(null);
      addLog(`get("${getKey}") = -1 [未找到]`);
    }
    setGetKey("");
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">LRU 缓存（LeetCode 146）</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        LRU (Least Recently Used) 最近最少使用缓存。当缓存满时，删除最久未使用的数据。
        使用 Map 可以保持插入顺序，实现 O(1) 的 get 和 put。
      </p>

      <div className="mb-4 grid gap-4 md:grid-cols-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Key"
            className="w-20 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Value"
            className="w-20 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          <button
            onClick={put}
            className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
          >
            Put
          </button>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={getKey}
            onChange={(e) => setGetKey(e.target.value)}
            placeholder="Key"
            className="w-20 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
          <button
            onClick={get}
            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Get
          </button>
          {result !== null && (
            <span className="flex items-center text-sm">
              结果: <span className="ml-1 font-mono font-bold">{result}</span>
            </span>
          )}
        </div>
      </div>

      {/* 缓存可视化 */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium">
          缓存状态 (容量: {capacity}, 当前: {cache.size})
        </div>
        <div className="flex gap-2">
          {Array.from(cache.entries()).map(([k, v], idx) => (
            <div
              key={k}
              className={`rounded p-2 text-center ${
                idx === 0
                  ? "bg-red-100 dark:bg-red-900/30"
                  : idx === cache.size - 1
                  ? "bg-green-100 dark:bg-green-900/30"
                  : "bg-zinc-100 dark:bg-zinc-800"
              }`}
            >
              <div className="font-mono text-sm font-bold">{k}</div>
              <div className="text-xs">{v}</div>
              <div className="text-xs text-zinc-500">
                {idx === 0 ? "最旧" : idx === cache.size - 1 ? "最新" : ""}
              </div>
            </div>
          ))}
          {cache.size === 0 && <span className="text-sm text-zinc-400">空缓存</span>}
        </div>
      </div>

      {/* 操作日志 */}
      {logs.length > 0 && (
        <div className="mb-4 rounded bg-zinc-100 p-2 dark:bg-zinc-800">
          {logs.map((log, i) => (
            <div key={i} className="text-xs font-mono">{log}</div>
          ))}
        </div>
      )}

      <div className="rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

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
      // 删除最久未使用的（Map 第一个）
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 深拷贝
// ============================================

function DeepCloneDemo() {
  const [original] = useState({
    name: "张三",
    age: 25,
    hobbies: ["读书", "游戏"],
    address: {
      city: "北京",
      district: "朝阳区",
    },
    date: new Date().toISOString(),
  });

  const [cloned, setCloned] = useState<typeof original | null>(null);
  const [method, setMethod] = useState<"json" | "recursive">("recursive");

  // JSON 方法
  const jsonClone = (obj: object) => JSON.parse(JSON.stringify(obj));

  // 递归方法
  const deepClone = (obj: unknown, hash = new WeakMap()): unknown => {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (hash.has(obj as object)) return hash.get(obj as object);

    const clone = Array.isArray(obj) ? [] : {};
    hash.set(obj as object, clone);

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (clone as Record<string, unknown>)[key] = deepClone(
          (obj as Record<string, unknown>)[key],
          hash
        );
      }
    }

    return clone;
  };

  const handleClone = () => {
    if (method === "json") {
      setCloned(jsonClone(original));
    } else {
      setCloned(deepClone(original) as typeof original);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">深拷贝 (Deep Clone)</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        深拷贝会复制对象的所有层级，修改副本不会影响原对象。这是开发中常见的需求。
      </p>

      <div className="mb-4 flex gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as "json" | "recursive")}
          className="rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        >
          <option value="recursive">递归实现</option>
          <option value="json">JSON 方法</option>
        </select>
        <button
          onClick={handleClone}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          执行深拷贝
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 text-sm font-medium">原对象</div>
          <pre className="rounded bg-zinc-100 p-3 text-xs dark:bg-zinc-800 overflow-x-auto">
            {JSON.stringify(original, null, 2)}
          </pre>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">克隆对象</div>
          <pre className="rounded bg-green-100 p-3 text-xs dark:bg-green-900/30 overflow-x-auto">
            {cloned ? JSON.stringify(cloned, null, 2) : "点击按钮执行深拷贝"}
          </pre>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-amber-50 p-3 dark:bg-amber-900/30 text-sm">
          <div className="font-medium">JSON 方法局限</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>无法处理 undefined、Symbol、函数</li>
            <li>无法处理循环引用</li>
            <li>Date 会变成字符串</li>
            <li>RegExp 会变成空对象</li>
          </ul>
        </div>
        <div className="rounded-md bg-green-50 p-3 dark:bg-green-900/30 text-sm">
          <div className="font-medium">递归实现优点</div>
          <ul className="mt-2 text-xs list-inside list-disc">
            <li>可以处理特殊类型</li>
            <li>可以处理循环引用（WeakMap）</li>
            <li>可以自定义处理逻辑</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`function deepClone(obj, hash = new WeakMap()) {
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
      clone[key] = deepClone(obj[key], hash);
    }
  }

  return clone;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 5: 数组扁平化
// ============================================

function FlattenDemo() {
  const [nested] = useState([1, [2, [3, [4, 5]]], 6, [7, 8]]);
  const [depth, setDepth] = useState(Infinity);
  const [result, setResult] = useState<number[]>([]);
  const [method, setMethod] = useState<"recursive" | "reduce" | "flat">("recursive");

  // 递归实现
  const flattenRecursive = (arr: unknown[], depth = Infinity): unknown[] => {
    if (depth === 0) return arr.slice();
    return arr.reduce<unknown[]>((acc, val) => {
      if (Array.isArray(val)) {
        acc.push(...flattenRecursive(val, depth - 1));
      } else {
        acc.push(val);
      }
      return acc;
    }, []);
  };

  // reduce 实现
  const flattenReduce = (arr: unknown[]): unknown[] => {
    return arr.reduce<unknown[]>((acc, val) => {
      return acc.concat(Array.isArray(val) ? flattenReduce(val) : val);
    }, []);
  };

  const handleFlatten = () => {
    let res: unknown[];
    switch (method) {
      case "recursive":
        res = flattenRecursive(nested, depth);
        break;
      case "reduce":
        res = flattenReduce(nested);
        break;
      case "flat":
        res = nested.flat(depth);
        break;
      default:
        res = [];
    }
    setResult(res as number[]);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">数组扁平化 (Flatten)</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as typeof method)}
          className="rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        >
          <option value="recursive">递归实现</option>
          <option value="reduce">reduce 实现</option>
          <option value="flat">Array.flat()</option>
        </select>
        <div className="flex items-center gap-1">
          <span className="text-sm">深度:</span>
          <input
            type="number"
            value={depth === Infinity ? "" : depth}
            onChange={(e) => setDepth(e.target.value ? parseInt(e.target.value) : Infinity)}
            placeholder="Infinity"
            className="w-20 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <button
          onClick={handleFlatten}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          扁平化
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 text-sm font-medium">原数组</div>
          <pre className="rounded bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
            {JSON.stringify(nested)}
          </pre>
        </div>
        <div>
          <div className="mb-2 text-sm font-medium">扁平化结果</div>
          <pre className="rounded bg-green-100 p-3 text-sm dark:bg-green-900/30">
            {result.length > 0 ? JSON.stringify(result) : "点击按钮执行"}
          </pre>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 text-xs overflow-x-auto">
{`// 递归实现
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

// ES6 原生方法
arr.flat(depth);  // depth 默认为 1
arr.flat(Infinity);  // 完全扁平化`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function FrontendAlgorithmsExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">前端常用算法</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          这些是前端开发中最常遇到的实用算法，掌握它们对日常开发很有帮助。
        </p>
      </div>

      <DebounceDemo />
      <ThrottleDemo />
      <LRUCacheDemo />
      <DeepCloneDemo />
      <FlattenDemo />
    </div>
  );
}
