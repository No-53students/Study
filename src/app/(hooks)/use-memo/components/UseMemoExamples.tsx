"use client";
"use no memo"; // 禁用 React Compiler 优化，以便观察 useMemo 的效果

import { useState, useMemo, memo, useEffect, useRef } from "react";

// ============================================
// 示例 1: 复杂计算的缓存
// ============================================

function isPrime(num: number): boolean {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function findPrimes(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    if (isPrime(i)) primes.push(i);
  }
  return primes;
}

export function ExpensiveCalculationExample() {
  const [limit, setLimit] = useState(10000);
  const [darkMode, setDarkMode] = useState(false);
  const [withMemo, setWithMemo] = useState(true);
  const [calcTime, setCalcTime] = useState(0);

  // 使用 useMemo 缓存计算结果
  const memoizedPrimes = useMemo(() => {
    const start = performance.now();
    const result = findPrimes(limit);
    const end = performance.now();
    setCalcTime(end - start);
    return result;
  }, [limit]);

  // 不使用 useMemo（每次渲染都重新计算）
  const regularStart = performance.now();
  const regularPrimes = withMemo ? [] : findPrimes(limit);
  const regularEnd = performance.now();
  const regularTime = withMemo ? 0 : regularEnd - regularStart;

  const primes = withMemo ? memoizedPrimes : regularPrimes;
  const displayTime = withMemo ? calcTime : regularTime;

  return (
    <div className={`rounded-lg border p-6 ${darkMode ? "border-zinc-600 bg-zinc-800" : "border-zinc-200"}`}>
      <h3 className="mb-4 text-lg font-semibold">示例 1: 复杂计算的缓存</h3>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">计算范围上限</label>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-zinc-500">当前: {limit.toLocaleString()}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={withMemo}
              onChange={(e) => setWithMemo(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span className="text-sm">使用 useMemo</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="h-4 w-4 rounded"
            />
            <span className="text-sm">暗色模式（触发重渲染）</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-700">
          <p className="text-sm text-zinc-500">找到的质数数量</p>
          <p className="text-3xl font-bold">{primes.length.toLocaleString()}</p>
        </div>
        <div className="rounded-md bg-zinc-100 p-4 dark:bg-zinc-700">
          <p className="text-sm text-zinc-500">计算耗时</p>
          <p className="text-3xl font-bold">{displayTime.toFixed(2)} ms</p>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>测试方法：</strong>
        <ol className="mt-2 list-inside list-decimal">
          <li>先启用 useMemo，切换暗色模式，观察计算时间（应该很短或为 0）</li>
          <li>禁用 useMemo，切换暗色模式，观察计算时间（每次都需要重新计算）</li>
        </ol>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 过滤和排序列表
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { id: 1, name: "iPhone 15", price: 7999, category: "手机" },
  { id: 2, name: "MacBook Pro", price: 14999, category: "电脑" },
  { id: 3, name: "iPad Air", price: 4799, category: "平板" },
  { id: 4, name: "AirPods Pro", price: 1899, category: "配件" },
  { id: 5, name: "Apple Watch", price: 2999, category: "配件" },
  { id: 6, name: "Samsung S24", price: 6999, category: "手机" },
  { id: 7, name: "ThinkPad X1", price: 12999, category: "电脑" },
  { id: 8, name: "Huawei Mate 60", price: 5999, category: "手机" },
  { id: 9, name: "小米平板", price: 2499, category: "平板" },
  { id: 10, name: "索尼耳机", price: 2599, category: "配件" },
];

type SortBy = "name" | "price-asc" | "price-desc";

export function FilterSortExample() {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [renderCount, setRenderCount] = useState(0);
  const calcCountRef = useRef(0);

  // 使用 useMemo 缓存过滤和排序结果
  const filteredProducts = useMemo(() => {
    calcCountRef.current += 1;
    console.log(`过滤计算执行了 ${calcCountRef.current} 次`);

    let result = [...products];

    // 过滤
    if (searchText) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // 排序
    result.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return result;
  }, [searchText, category, sortBy]);

  // 强制重渲染（不改变过滤条件）
  const forceRender = () => {
    setRenderCount((c) => c + 1);
  };

  const categories = ["all", ...new Set(products.map((p) => p.category))];

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 列表过滤与排序</h3>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">搜索</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="输入产品名..."
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">分类</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "全部" : cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">排序</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          >
            <option value="name">按名称</option>
            <option value="price-asc">价格从低到高</option>
            <option value="price-desc">价格从高到低</option>
          </select>
        </div>
      </div>

      <div className="mb-4 space-y-2">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
          >
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-zinc-500">{product.category}</p>
            </div>
            <p className="font-bold">¥{product.price.toLocaleString()}</p>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className="py-4 text-center text-zinc-500">没有找到匹配的产品</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800">
        <div className="text-sm">
          <p>组件渲染次数: <span className="font-bold">{renderCount + 1}</span></p>
          <p>过滤计算次数: <span className="font-bold">{calcCountRef.current}</span></p>
        </div>
        <button
          onClick={forceRender}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          强制重渲染
        </button>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>观察：</strong> 点击&ldquo;强制重渲染&rdquo;，渲染次数增加，但过滤计算次数不变（因为依赖项没变）
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 避免子组件重渲染
// ============================================

interface ListProps {
  items: { id: number; name: string }[];
  onRender: () => void;
}

const MemoizedList = memo(function MemoizedList({ items, onRender }: ListProps) {
  useEffect(() => {
    onRender();
  }, [onRender]);

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div key={item.id} className="rounded bg-green-100 p-2 text-sm dark:bg-green-900/30">
          {item.name}
        </div>
      ))}
    </div>
  );
});

export function ChildRerenderExample() {
  const [count, setCount] = useState(0);
  const [renderCount, setRenderCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // ✅ 使用 useMemo 缓存对象
  const memoizedItems = useMemo(
    () => [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
      { id: 3, name: "Item 3" },
    ],
    []
  );

  // ❌ 不使用 useMemo（每次渲染都是新对象）
  const regularItems = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  const items = useMemoEnabled ? memoizedItems : regularItems;

  const handleRender = useMemo(() => {
    return () => setRenderCount((c) => c + 1);
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 避免子组件重渲染</h3>

      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-500">父组件状态: {count}</p>
          <p className="text-sm text-zinc-500">
            子组件渲染次数: <span className="font-bold text-green-600">{renderCount}</span>
          </p>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useMemoEnabled}
            onChange={(e) => {
              setUseMemoEnabled(e.target.checked);
              setRenderCount(0);
            }}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">使用 useMemo</span>
        </label>
      </div>

      <div className="mb-4">
        <MemoizedList items={items} onRender={handleRender} />
      </div>

      <button
        onClick={() => setCount((c) => c + 1)}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        更新父组件状态 (+1)
      </button>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">原理：</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>子组件用 memo 包裹，props 不变时不重渲染</li>
          <li>不用 useMemo：每次父组件渲染都创建新数组（引用不同）</li>
          <li>用 useMemo：数组引用保持稳定，子组件不重渲染</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 派生状态计算
// ============================================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export function DerivedStateExample() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 1, name: "商品 A", price: 99, quantity: 2 },
    { id: 2, name: "商品 B", price: 199, quantity: 1 },
    { id: 3, name: "商品 C", price: 49, quantity: 3 },
  ]);

  // 派生状态：总价
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  // 派生状态：商品总数
  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // 派生状态：是否达到包邮条件
  const freeShipping = useMemo(() => total >= 200, [total]);

  // 派生状态：折扣
  const discount = useMemo(() => {
    if (total >= 500) return 0.15;
    if (total >= 300) return 0.1;
    if (total >= 200) return 0.05;
    return 0;
  }, [total]);

  const finalTotal = useMemo(
    () => total * (1 - discount),
    [total, discount]
  );

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 派生状态计算</h3>

      <div className="mb-4 space-y-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-zinc-500">¥{item.price} x {item.quantity}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="h-8 w-8 rounded bg-zinc-300 text-lg hover:bg-zinc-400 dark:bg-zinc-600"
              >
                -
              </button>
              <span className="w-8 text-center font-bold">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="h-8 w-8 rounded bg-zinc-300 text-lg hover:bg-zinc-400 dark:bg-zinc-600"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 派生状态展示 */}
      <div className="space-y-2 rounded-md bg-zinc-100 p-4 dark:bg-zinc-800">
        <div className="flex justify-between">
          <span>商品数量:</span>
          <span className="font-bold">{itemCount} 件</span>
        </div>
        <div className="flex justify-between">
          <span>商品总价:</span>
          <span className="font-bold">¥{total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>包邮:</span>
          <span className={`font-bold ${freeShipping ? "text-green-600" : "text-red-600"}`}>
            {freeShipping ? "已包邮" : `还差 ¥${(200 - total).toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span>折扣:</span>
          <span className="font-bold text-orange-600">
            {discount > 0 ? `-${(discount * 100).toFixed(0)}%` : "无"}
          </span>
        </div>
        <div className="flex justify-between border-t border-zinc-300 pt-2 dark:border-zinc-600">
          <span className="font-bold">应付:</span>
          <span className="text-xl font-bold text-green-600">¥{finalTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>派生状态链：</strong> cart → total → freeShipping/discount → finalTotal
        <p className="mt-1 text-xs">每个派生状态只在其依赖变化时重新计算</p>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseMemoExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useMemo Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useMemo 用于缓存计算结果，只有当依赖项变化时才重新计算。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const memoizedValue = useMemo(
  () => expensiveComputation(a, b),
  [a, b] // 依赖项数组
);`}
          </pre>
        </div>
      </div>

      <ExpensiveCalculationExample />
      <FilterSortExample />
      <ChildRerenderExample />
      <DerivedStateExample />

      {/* 总结 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          useMemo 使用指南
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">✅ 适合使用</p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>复杂计算（O(n²) 或更高）</li>
              <li>大型数据过滤/排序</li>
              <li>对象/数组传给 memo 子组件</li>
              <li>计算派生状态</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">❌ 不需要使用</p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>简单计算（字符串拼接等）</li>
              <li>原始值（数字、字符串）</li>
              <li>无性能问题时过早优化</li>
              <li>已使用 React Compiler</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
