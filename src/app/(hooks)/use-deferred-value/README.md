# useDeferredValue Hook 详解

## 什么是 useDeferredValue？

`useDeferredValue` 是 React 18 引入的并发特性 Hook，用于**延迟更新某个值**。它返回一个"滞后"的值版本，在紧急更新期间会显示旧值。

```tsx
const deferredValue = useDeferredValue(value);
```

## 为什么需要 useDeferredValue？

### 问题场景

当一个值变化时触发耗时渲染，会导致 UI 卡顿：

```tsx
function SearchResults({ query }) {
  // ❌ query 每次变化都会立即触发耗时的过滤渲染
  const results = filterLargeDataset(query);

  return <ResultList results={results} />;
}
```

### useDeferredValue 解决方案

```tsx
function SearchResults({ query }) {
  // ✅ deferredQuery 会滞后于 query，给 React 时间先完成紧急更新
  const deferredQuery = useDeferredValue(query);
  const results = filterLargeDataset(deferredQuery);

  // 可以显示是否正在使用旧值
  const isStale = query !== deferredQuery;

  return (
    <div style={{ opacity: isStale ? 0.7 : 1 }}>
      <ResultList results={results} />
    </div>
  );
}
```

## 基本语法

```tsx
const deferredValue = useDeferredValue(value);
```

### 参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `value` | `T` | 要延迟的值 |

### 返回值

返回值的"延迟版本"，在并发渲染期间可能会滞后于原始值。

## 工作原理

```
用户输入 "a"
  → query = "a"
  → deferredQuery 仍为 ""（先完成紧急更新）
  → 然后 deferredQuery 变为 "a"（在后台低优先级更新）

用户快速输入 "ab"
  → query = "ab"
  → deferredQuery 可能仍为 "a"（中间状态被跳过）
  → 然后 deferredQuery 变为 "ab"
```

## 使用场景

### 场景 1：搜索结果过滤

```tsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索..."
      />
      {/* 使用延迟值渲染结果 */}
      <SearchResults query={deferredQuery} />
    </div>
  );
}

function SearchResults({ query }) {
  // 这个组件可能渲染很慢
  const results = useMemo(() => {
    return filterLargeDataset(query);
  }, [query]);

  return <ResultList results={results} />;
}
```

### 场景 2：图表/可视化更新

```tsx
function Dashboard({ data }) {
  const deferredData = useDeferredValue(data);
  const isStale = data !== deferredData;

  return (
    <div>
      <DataSummary data={data} /> {/* 轻量组件，使用最新数据 */}

      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        <ExpensiveChart data={deferredData} /> {/* 重量组件，使用延迟数据 */}
      </div>
    </div>
  );
}
```

### 场景 3：列表虚拟化配合

```tsx
function VirtualizedList({ items, filter }) {
  const deferredFilter = useDeferredValue(filter);

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.includes(deferredFilter)
    );
  }, [items, deferredFilter]);

  const isFiltering = filter !== deferredFilter;

  return (
    <div>
      {isFiltering && <LoadingOverlay />}
      <VirtualList
        items={filteredItems}
        style={{ opacity: isFiltering ? 0.7 : 1 }}
      />
    </div>
  );
}
```

### 场景 4：实时预览

```tsx
function MarkdownEditor() {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入 Markdown..."
      />
      {/* 预览使用延迟值，编辑器保持流畅 */}
      <MarkdownPreview content={deferredText} />
    </div>
  );
}
```

## useDeferredValue vs useTransition

| 特性 | useDeferredValue | useTransition |
|------|------------------|---------------|
| 控制对象 | 值 | 状态更新函数 |
| 使用方式 | 包裹 value | 包裹 setState |
| isPending | ❌ 需要手动计算 | ✅ 自动提供 |
| 适用场景 | 无法控制更新来源 | 可以控制更新来源 |
| 代码侵入性 | 低 | 稍高 |

### 选择指南

```tsx
// 场景 1：你控制状态更新 → useTransition
function Parent() {
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    startTransition(() => {
      setQuery(e.target.value);
    });
  };

  return <Child query={query} isPending={isPending} />;
}

// 场景 2：你只接收 props → useDeferredValue
function Child({ query }) {
  // 你无法控制 query 何时更新，但可以延迟使用它
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return <Results query={deferredQuery} isStale={isStale} />;
}
```

## 配合 memo 使用

`useDeferredValue` 通常与 `memo` 配合，跳过不必要的重渲染：

```tsx
// 重型子组件用 memo 包裹
const ExpensiveComponent = memo(function ExpensiveComponent({ value }) {
  // 耗时渲染...
  return <div>{/* ... */}</div>;
});

function Parent() {
  const [value, setValue] = useState('');
  const deferredValue = useDeferredValue(value);

  return (
    <div>
      <input value={value} onChange={e => setValue(e.target.value)} />
      {/*
        由于使用了 memo，只有 deferredValue 变化时才会重渲染
        在用户快速输入时，ExpensiveComponent 的重渲染会被推迟
      */}
      <ExpensiveComponent value={deferredValue} />
    </div>
  );
}
```

## React 19 新特性：初始值

React 19 为 `useDeferredValue` 添加了第二个参数：

```tsx
// React 19+
const deferredValue = useDeferredValue(value, initialValue);
```

这在服务端渲染时特别有用：

```tsx
function Search({ query }) {
  // 首次渲染使用空字符串，避免 hydration 不匹配
  const deferredQuery = useDeferredValue(query, '');

  return <SearchResults query={deferredQuery} />;
}
```

## 最佳实践

### 1. 传递原始值或 memoized 值

```tsx
// ✅ 原始值
const deferredQuery = useDeferredValue(query);

// ✅ memoized 对象
const options = useMemo(() => ({ page, limit }), [page, limit]);
const deferredOptions = useDeferredValue(options);

// ❌ 避免：每次渲染创建新对象
const deferredOptions = useDeferredValue({ page, limit }); // 效果不好
```

### 2. 显示过渡状态

```tsx
function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  return (
    <div
      style={{
        opacity: isStale ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}
    >
      {isStale && <Spinner />}
      <Results query={deferredQuery} />
    </div>
  );
}
```

### 3. 配合 Suspense 使用

```tsx
function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <Suspense fallback={<Loading />}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </div>
  );
}
```

## 常见错误

### 错误 1：在循环/条件中使用

```tsx
// ❌ 错误：Hook 不能在循环中使用
items.map(item => {
  const deferred = useDeferredValue(item.value);
});

// ✅ 正确：在组件级别使用
function Item({ value }) {
  const deferredValue = useDeferredValue(value);
  return <div>{deferredValue}</div>;
}
```

### 错误 2：期望立即看到差异

```tsx
// useDeferredValue 在以下情况不会产生明显效果：
// 1. 更新本身不耗时
// 2. 没有并发渲染
// 3. 设备性能很好
```

### 错误 3：不使用 memo

```tsx
// ❌ 没有 memo，即使值相同也会重渲染
function ExpensiveChild({ value }) {
  // 即使 deferredValue 没变，父组件重渲染时这里也会重渲染
}

// ✅ 使用 memo 才能发挥 useDeferredValue 的优势
const ExpensiveChild = memo(function ExpensiveChild({ value }) {
  // 只有 value 真正变化时才重渲染
});
```

## 总结

| 场景 | 推荐方案 |
|------|----------|
| 你控制状态更新 | useTransition |
| 你只接收 props | useDeferredValue |
| 搜索框 + 结果列表 | useDeferredValue |
| 编辑器 + 预览 | useDeferredValue |
| 标签页切换 | useTransition |
| 路由切换 | useTransition |

`useDeferredValue` 是一个简单但强大的并发特性，特别适合当你无法控制值的更新来源，但又需要优化渲染性能的场景。
