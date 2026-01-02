"use client";
"use no memo";

import { useState, useDeferredValue, useMemo, memo } from "react";

// ============================================
// 示例 1: 搜索过滤
// ============================================

const generateProducts = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `产品 ${i + 1}`,
    price: Math.floor(Math.random() * 1000) + 100,
    category: ["电子", "服装", "食品", "家居"][i % 4],
  }));

const products = generateProducts(5000);

// 使用 memo 包裹，配合 useDeferredValue 使用
const ProductList = memo(function ProductList({ query }: { query: string }) {
  const filteredProducts = useMemo(() => {
    if (!query) return products.slice(0, 50);
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 50);
  }, [query]);

  return (
    <div className="space-y-2">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-md bg-white p-3 dark:bg-zinc-700"
        >
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-zinc-500">{product.category}</p>
          </div>
          <p className="font-bold text-green-600">¥{product.price}</p>
        </div>
      ))}
    </div>
  );
});

export function SearchExample() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 搜索过滤</h3>

      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索产品（5000 条数据）..."
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
        />
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span className="text-zinc-500">输入值: &ldquo;{query}&rdquo;</span>
          <span className="text-zinc-500">|</span>
          <span className="text-zinc-500">
            延迟值: &ldquo;{deferredQuery}&rdquo;
          </span>
          {isStale && (
            <span className="rounded bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
              ⏳ 过渡中
            </span>
          )}
        </div>
      </div>

      <div
        className="h-64 overflow-y-auto rounded-md bg-zinc-100 p-3 transition-opacity dark:bg-zinc-800"
        style={{ opacity: isStale ? 0.6 : 1 }}
      >
        <ProductList query={deferredQuery} />
      </div>

      <div className="mt-4 rounded-md bg-blue-50 p-3 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
        <strong>说明：</strong> 快速输入时，输入框保持流畅响应，
        列表使用延迟值更新，显示透明度变化表示正在过渡。
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 实时预览
// ============================================

const MarkdownPreview = memo(function MarkdownPreview({
  content,
}: {
  content: string;
}) {
  // 模拟耗时的 Markdown 解析
  const html = useMemo(() => {
    // 简单的 Markdown 转换
    let result = content
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/`(.*)`/gim, "<code>$1</code>")
      .replace(/\n/gim, "<br />");

    // 模拟耗时操作
    const start = performance.now();
    while (performance.now() - start < 10) {
      // 模拟 10ms 延迟
    }

    return result;
  }, [content]);

  return (
    <div
      className="prose prose-sm dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export function MarkdownEditorExample() {
  const [text, setText] = useState(`# 标题

这是一段 **粗体** 和 *斜体* 文字。

## 副标题

这里有一些 \`代码\` 示例。

### 三级标题

继续输入查看实时预览效果...`);
  const deferredText = useDeferredValue(text);
  const isStale = text !== deferredText;

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: Markdown 实时预览</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* 编辑器 */}
        <div>
          <h4 className="mb-2 text-sm font-medium">编辑器</h4>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="h-64 w-full resize-none rounded-md border border-zinc-300 p-3 font-mono text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>

        {/* 预览 */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium">
            预览
            {isStale && (
              <span className="text-xs text-amber-600">⏳ 更新中...</span>
            )}
          </h4>
          <div
            className="h-64 overflow-y-auto rounded-md border border-zinc-300 bg-white p-3 transition-opacity dark:border-zinc-600 dark:bg-zinc-800"
            style={{ opacity: isStale ? 0.7 : 1 }}
          >
            <MarkdownPreview content={deferredText} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-green-50 p-3 text-sm text-green-800 dark:bg-green-900/30 dark:text-green-200">
        <strong>效果：</strong> 编辑器输入保持流畅，预览使用延迟值渲染，
        避免了因预览渲染耗时导致的输入卡顿。
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 对比演示
// ============================================

const SlowList = memo(function SlowList({ text }: { text: string }) {
  const items = useMemo(() => {
    const result = [];
    for (let i = 0; i < 200; i++) {
      result.push(
        <div key={i} className="rounded bg-zinc-200 p-1 text-xs dark:bg-zinc-700">
          {text ? `匹配: ${text} - ${i}` : `项目 ${i}`}
        </div>
      );
    }
    return result;
  }, [text]);

  return <div className="grid grid-cols-4 gap-1">{items}</div>;
});

export function ComparisonExample() {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);
  const isStale = text !== deferredText;

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 有无延迟对比</h3>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="快速输入..."
        className="mb-4 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {/* 使用即时值 */}
        <div>
          <h4 className="mb-2 text-sm font-medium text-red-700 dark:text-red-300">
            即时值（可能卡顿）
          </h4>
          <div className="h-48 overflow-y-auto rounded-md bg-red-50 p-2 dark:bg-red-900/20">
            <SlowList text={text} />
          </div>
        </div>

        {/* 使用延迟值 */}
        <div>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-300">
            延迟值（保持流畅）
            {isStale && <span className="text-xs">⏳</span>}
          </h4>
          <div
            className="h-48 overflow-y-auto rounded-md bg-green-50 p-2 transition-opacity dark:bg-green-900/20"
            style={{ opacity: isStale ? 0.6 : 1 }}
          >
            <SlowList text={deferredText} />
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
        <strong>测试方法：</strong> 快速连续输入字符，观察两侧列表的更新行为。
        右侧使用 useDeferredValue，会跳过中间状态直接显示最终结果。
      </div>
    </div>
  );
}

// ============================================
// 示例 4: 滑块控制
// ============================================

const ColorGrid = memo(function ColorGrid({ count }: { count: number }) {
  const cells = useMemo(() => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="h-4 w-4 rounded-sm"
        style={{
          backgroundColor: `hsl(${(i * 360) / count}, 70%, 50%)`,
        }}
      />
    ));
  }, [count]);

  return <div className="flex flex-wrap gap-1">{cells}</div>;
});

export function SliderExample() {
  const [count, setCount] = useState(500);
  const deferredCount = useDeferredValue(count);
  const isStale = count !== deferredCount;

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: 滑块控制</h3>

      <div className="mb-4">
        <label className="mb-2 flex items-center justify-between text-sm font-medium">
          <span>元素数量: {count}</span>
          {isStale && (
            <span className="text-amber-600">
              渲染中: {deferredCount} → {count}
            </span>
          )}
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div
        className="h-48 overflow-y-auto rounded-md bg-zinc-100 p-3 transition-opacity dark:bg-zinc-800"
        style={{ opacity: isStale ? 0.5 : 1 }}
      >
        <ColorGrid count={deferredCount} />
      </div>

      <div className="mt-4 rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-800">
        <p className="font-medium">原理：</p>
        <ul className="mt-2 list-inside list-disc text-zinc-600 dark:text-zinc-400">
          <li>滑块值立即更新（紧急更新）</li>
          <li>渲染使用延迟值（低优先级）</li>
          <li>ColorGrid 用 memo 包裹，只在 deferredCount 变化时重渲染</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function UseDeferredValueExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">useDeferredValue Hook 详解</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          useDeferredValue 用于延迟更新某个值，在并发渲染中保持 UI 响应性。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 dark:bg-zinc-950 p-4 text-sm">
          <p className="mb-2 text-zinc-600 dark:text-zinc-400">// 基本语法</p>
          <pre className="text-green-400">
{`const deferredValue = useDeferredValue(value);

// 检测是否正在过渡
const isStale = value !== deferredValue;

// 使用延迟值渲染
return (
  <div style={{ opacity: isStale ? 0.7 : 1 }}>
    <ExpensiveComponent value={deferredValue} />
  </div>
);`}
          </pre>
        </div>
      </div>

      <SearchExample />
      <MarkdownEditorExample />
      <ComparisonExample />
      <SliderExample />

      {/* 对比指南 */}
      <div className="rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200">
          useDeferredValue vs useTransition
        </h4>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blue-200 dark:border-blue-800">
                <th className="py-2 text-left">特性</th>
                <th className="py-2 text-left">useDeferredValue</th>
                <th className="py-2 text-left">useTransition</th>
              </tr>
            </thead>
            <tbody className="text-blue-700 dark:text-blue-300">
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">控制对象</td>
                <td>值</td>
                <td>状态更新函数</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">isPending</td>
                <td>需手动计算</td>
                <td>自动提供</td>
              </tr>
              <tr className="border-b border-blue-100 dark:border-blue-900">
                <td className="py-2">适用场景</td>
                <td>接收 props</td>
                <td>控制 setState</td>
              </tr>
              <tr>
                <td className="py-2">代码侵入性</td>
                <td>低</td>
                <td>稍高</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
