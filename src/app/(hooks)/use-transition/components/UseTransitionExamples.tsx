"use client";
"use no memo";

import { useState, useTransition, memo, useMemo } from "react";

// ============================================
// 示例 1: 搜索过滤（基础用法）
// ============================================

// 生成大量测试数据
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `项目 ${i + 1}`,
    description: `这是第 ${i + 1} 个项目的描述信息`,
  }));

const largeDataset = generateItems(10000);

export function SearchFilterExample() {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(largeDataset.slice(0, 100));
  const [isPending, startTransition] = useTransition();

  const handleSearchWithTransition = (value: string) => {
    setQuery(value);

    startTransition(() => {
      const filtered = largeDataset
        .filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase()) ||
          item.description.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 100);
      setFilteredItems(filtered);
    });
  };

  const handleSearchWithoutTransition = (value: string) => {
    setQuery(value);
    const filtered = largeDataset
      .filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.description.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 100);
    setFilteredItems(filtered);
  };

  const [useTransitionEnabled, setUseTransitionEnabled] = useState(true);

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 搜索过滤</h3>

      <div className="mb-4 flex items-center gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useTransitionEnabled}
            onChange={(e) => setUseTransitionEnabled(e.target.checked)}
            className="h-4 w-4 rounded"
          />
          <span className="text-sm">使用 useTransition</span>
        </label>
        {isPending && (
          <span className="text-sm text-amber-600">⏳ 更新中...</span>
        )}
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) =>
          useTransitionEnabled
            ? handleSearchWithTransition(e.target.value)
            : handleSearchWithoutTransition(e.target.value)
        }
        placeholder="搜索 10000 个项目..."
        className="mb-4 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
      />

      <div
        className="h-64 space-y-2 overflow-y-auto rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
        style={{ opacity: isPending ? 0.6 : 1 }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="rounded bg-white p-2 dark:bg-zinc-700"
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-xs text-zinc-500">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>测试方法：</strong> 快速输入文字，观察输入框的响应性。
        启用 useTransition 时，输入框始终保持流畅；禁用时可能会卡顿。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 标签页切换
// ============================================

// 模拟耗时渲染的组件
const SlowTab = memo(function SlowTab({ label }: { label: string }) {
  const items = useMemo(() => {
    // 模拟复杂计算
    const result = [];
    for (let i = 0; i < 500; i++) {
      result.push(
        <div key={i} className="rounded bg-zinc-200 p-2 text-sm dark:bg-zinc-700">
          {label} - 项目 {i + 1}
        </div>
      );
    }
    return result;
  }, [label]);

  return <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{items}</div>;
});

const tabs = [
  { id: "home", label: "首页", color: "blue" },
  { id: "posts", label: "文章", color: "green" },
  { id: "about", label: "关于", color: "purple" },
];

export function TabSwitchExample() {
  const [activeTab, setActiveTab] = useState("home");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 标签页切换</h3>

      <div className="mb-4 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            disabled={isPending && activeTab !== tab.id}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? `bg-${tab.color}-600 text-white`
                : "bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700"
            } ${isPending ? "opacity-70" : ""}`}
            style={{
              backgroundColor:
                activeTab === tab.id
                  ? tab.color === "blue"
                    ? "#2563eb"
                    : tab.color === "green"
                    ? "#16a34a"
                    : "#9333ea"
                  : undefined,
              color: activeTab === tab.id ? "white" : undefined,
            }}
          >
            {tab.label}
            {isPending && activeTab !== tab.id && " ⏳"}
          </button>
        ))}
      </div>

      <div
        className="h-64 overflow-y-auto rounded-md bg-zinc-100 p-3 dark:bg-zinc-800"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <SlowTab label={tabs.find((t) => t.id === activeTab)?.label || ""} />
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>说明：</strong> 每个标签页渲染 500 个项目。使用 useTransition 后，
        切换标签时 UI 保持响应，不会冻结。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 实时渲染大量元素
// ============================================

export function LargeRenderExample() {
  const [count, setCount] = useState(1000);
  const [displayCount, setDisplayCount] = useState(1000);
  const [isPending, startTransition] = useTransition();

  const handleCountChange = (value: number) => {
    setCount(value);
    startTransition(() => {
      setDisplayCount(value);
    });
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 大量元素渲染</h3>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium">
          元素数量: {count.toLocaleString()}
          {isPending && <span className="ml-2 text-amber-600">⏳ 渲染中...</span>}
        </label>
        <input
          type="range"
          min="100"
          max="5000"
          step="100"
          value={count}
          onChange={(e) => handleCountChange(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div
        className="h-64 overflow-y-auto rounded-md bg-zinc-100 p-2 dark:bg-zinc-800"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <div className="grid grid-cols-10 gap-1">
          {Array.from({ length: displayCount }, (_, i) => (
            <div
              key={i}
              className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-xs text-white"
              style={{
                backgroundColor: `hsl(${(i * 360) / displayCount}, 70%, 50%)`,
              }}
            >
              {(i % 100) + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p>
          <strong>当前显示:</strong> {displayCount.toLocaleString()} 个元素
        </p>
        <p className="mt-1 text-zinc-500">
          拖动滑块时，滑块本身保持流畅响应，元素渲染作为过渡更新在后台进行。
        </p>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 对比演示
// ============================================

export function ComparisonExample() {
  const [inputValue, setInputValue] = useState("");
  const [withTransition, setWithTransition] = useState<string[]>([]);
  const [withoutTransition, setWithoutTransition] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  // 模拟耗时计算
  const heavyComputation = (text: string) => {
    const results: string[] = [];
    for (let i = 0; i < 5000; i++) {
      if (`item-${i}`.includes(text) || text === "") {
        results.push(`结果 ${i + 1}: 匹配 "${text}"`);
      }
    }
    return results.slice(0, 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // 使用 transition
    startTransition(() => {
      setWithTransition(heavyComputation(value));
    });

    // 不使用 transition（同步）
    setWithoutTransition(heavyComputation(value));
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 有无 Transition 对比</h3>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="输入搜索词..."
        className="mb-4 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* 使用 Transition */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-green-700 dark:text-green-300">
            ✅ 使用 useTransition
            {isPending && <span className="ml-2">⏳</span>}
          </h4>
          <div
            className="h-48 overflow-y-auto rounded-md bg-green-50 p-2 text-xs dark:bg-green-900/20"
            style={{ opacity: isPending ? 0.5 : 1 }}
          >
            {withTransition.slice(0, 20).map((item, i) => (
              <div key={i} className="py-1">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* 不使用 Transition */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-red-700 dark:text-red-300">
            ❌ 不使用 useTransition
          </h4>
          <div className="h-48 overflow-y-auto rounded-md bg-red-50 p-2 text-xs dark:bg-red-900/20">
            {withoutTransition.slice(0, 20).map((item, i) => (
              <div key={i} className="py-1">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>观察：</strong> 快速输入时，左侧（使用 transition）的列表更新会稍微延迟，
        但输入框保持流畅；两侧都会收到相同的最终结果。
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseTransitionExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useTransition Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useTransition 用于将状态更新标记为非紧急的过渡更新，保持 UI 响应性。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const [isPending, startTransition] = useTransition();

const handleClick = () => {
  // 紧急更新：立即响应
  setInputValue(value);

  // 过渡更新：可被中断
  startTransition(() => {
    setSearchResults(search(value));
  });
};`}
          </pre>
        </div>
      </div>

      <SearchFilterExample />
      <TabSwitchExample />
      <LargeRenderExample />
      <ComparisonExample />

      {/* 使用指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          使用指南
        </h4>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="font-medium text-green-700 dark:text-green-300">
              ✅ 适合使用 useTransition
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-green-600 dark:text-green-400">
              <li>搜索/过滤大量数据</li>
              <li>标签页/路由切换</li>
              <li>渲染大量 DOM 元素</li>
              <li>复杂 UI 状态更新</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-red-700 dark:text-red-300">
              ❌ 不适合使用
            </p>
            <ul className="mt-2 list-inside list-disc text-sm text-red-600 dark:text-red-400">
              <li>用户输入值（需立即响应）</li>
              <li>表单验证状态</li>
              <li>网络请求本身</li>
              <li>受控组件的值</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
