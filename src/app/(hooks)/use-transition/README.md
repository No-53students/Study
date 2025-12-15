# useTransition Hook 详解

## 什么是 useTransition？

`useTransition` 是 React 18 引入的并发特性 Hook，用于将某些状态更新标记为**非紧急的过渡更新**，从而保持 UI 的响应性。

```tsx
const [isPending, startTransition] = useTransition();
```

## 为什么需要 useTransition？

### 问题场景

当进行耗时的状态更新时，UI 可能会卡顿：

```tsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    // ❌ 如果过滤操作很耗时，输入框会卡顿
    setResults(filterLargeDataset(e.target.value));
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultList results={results} />
    </div>
  );
}
```

### useTransition 解决方案

```tsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setQuery(e.target.value); // 紧急更新：立即响应输入

    startTransition(() => {
      // ✅ 非紧急更新：可以被中断，不会阻塞输入
      setResults(filterLargeDataset(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultList results={results} />
    </div>
  );
}
```

## 基本语法

```tsx
const [isPending, startTransition] = useTransition();
```

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `isPending` | `boolean` | 是否有待处理的过渡更新 |
| `startTransition` | `(callback: () => void) => void` | 将更新标记为过渡 |

## 工作原理

### 更新优先级

React 18 引入了更新优先级的概念：

1. **紧急更新**（Urgent updates）：用户直接交互（输入、点击）
2. **过渡更新**（Transition updates）：UI 从一个视图过渡到另一个视图

```tsx
// 紧急更新：用户期望立即响应
setInputValue(e.target.value);

// 过渡更新：可以稍后完成
startTransition(() => {
  setSearchResults(results);
});
```

### 可中断渲染

过渡更新可以被紧急更新中断：

```
用户输入 "a" → 开始过渡渲染
用户输入 "ab" → 中断之前的渲染，开始新的过渡渲染
用户输入 "abc" → 中断之前的渲染，开始新的过渡渲染
用户停止输入 → 完成最后的过渡渲染
```

## 使用场景

### 场景 1：搜索过滤

```tsx
function FilterableList({ items }) {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    });
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        placeholder="搜索..."
      />
      {isPending && <div className="loading">加载中...</div>}
      <ul style={{ opacity: isPending ? 0.7 : 1 }}>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 场景 2：标签页切换

```tsx
function TabContainer() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div>
      <TabButtons
        activeTab={tab}
        onTabChange={handleTabChange}
        isPending={isPending}
      />
      <div style={{ opacity: isPending ? 0.5 : 1 }}>
        {tab === 'home' && <HomeTab />}
        {tab === 'posts' && <PostsTab />}  {/* 假设这个组件很重 */}
        {tab === 'contact' && <ContactTab />}
      </div>
    </div>
  );
}
```

### 场景 3：分页

```tsx
function PaginatedList({ fetchPage }) {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isPending, startTransition] = useTransition();

  const goToPage = async (newPage) => {
    const newData = await fetchPage(newPage);

    startTransition(() => {
      setPage(newPage);
      setData(newData);
    });
  };

  return (
    <div>
      <div className={isPending ? 'loading' : ''}>
        <DataList data={data} />
      </div>
      <Pagination
        currentPage={page}
        onPageChange={goToPage}
        disabled={isPending}
      />
    </div>
  );
}
```

### 场景 4：大量数据渲染

```tsx
function LargeListRenderer() {
  const [count, setCount] = useState(100);
  const [isPending, startTransition] = useTransition();

  const handleSliderChange = (e) => {
    startTransition(() => {
      setCount(Number(e.target.value));
    });
  };

  return (
    <div>
      <input
        type="range"
        min="100"
        max="10000"
        onChange={handleSliderChange}
      />
      <p>显示 {count} 个项目</p>
      {isPending && <p>更新中...</p>}
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i}>Item {i + 1}</div>
        ))}
      </div>
    </div>
  );
}
```

## useTransition vs useDeferredValue

| 特性 | useTransition | useDeferredValue |
|------|---------------|------------------|
| 控制对象 | 状态更新函数 | 值本身 |
| 使用方式 | 包裹 setState | 包裹 value |
| 适用场景 | 控制更新时机 | 延迟某个值的更新 |
| isPending | ✅ 提供 | ❌ 不提供 |

```tsx
// useTransition：控制更新
const [isPending, startTransition] = useTransition();
startTransition(() => setQuery(value));

// useDeferredValue：延迟值
const deferredQuery = useDeferredValue(query);
```

## 最佳实践

### 1. 只包裹非紧急更新

```tsx
const handleChange = (e) => {
  // ✅ 紧急：输入框需要立即响应
  setInputValue(e.target.value);

  // ✅ 非紧急：搜索结果可以稍后更新
  startTransition(() => {
    setSearchResults(search(e.target.value));
  });
};
```

### 2. 使用 isPending 提供反馈

```tsx
return (
  <div>
    <input value={query} onChange={handleChange} />
    {isPending ? (
      <Spinner />
    ) : (
      <Results data={results} />
    )}
  </div>
);

// 或者使用透明度
<Results
  data={results}
  style={{ opacity: isPending ? 0.7 : 1 }}
/>
```

### 3. 不要在 startTransition 中执行副作用

```tsx
// ❌ 错误：不要在 startTransition 中执行副作用
startTransition(() => {
  fetch('/api/data'); // 副作用
  setData(newData);
});

// ✅ 正确：只包含状态更新
const data = await fetch('/api/data');
startTransition(() => {
  setData(data);
});
```

### 4. 配合 Suspense 使用

```tsx
function App() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <TabBar
        tab={tab}
        onTabChange={(t) => startTransition(() => setTab(t))}
      />
      <Suspense fallback={<Spinner />}>
        <TabContent tab={tab} />
      </Suspense>
    </div>
  );
}
```

## 常见错误

### 错误 1：将紧急更新放入 transition

```tsx
// ❌ 错误：输入值应该立即更新
startTransition(() => {
  setInputValue(e.target.value); // 输入会感觉迟钝
});

// ✅ 正确
setInputValue(e.target.value);
startTransition(() => {
  setSearchResults(search(e.target.value));
});
```

### 错误 2：期望 transition 让异步操作变快

```tsx
// ❌ 误解：transition 不会让 fetch 变快
startTransition(() => {
  fetch('/api/slow-endpoint'); // 仍然需要等待网络
});

// useTransition 是关于渲染优先级，不是关于网络请求
```

### 错误 3：忽略 isPending 状态

```tsx
// ❌ 用户不知道在加载
const handleClick = () => {
  startTransition(() => setTab(newTab));
};

// ✅ 提供视觉反馈
<button disabled={isPending} onClick={handleClick}>
  {isPending ? '加载中...' : '切换'}
</button>
```

## 总结

| 使用场景 | 是否使用 useTransition |
|----------|----------------------|
| 搜索/过滤大量数据 | ✅ 使用 |
| 标签页切换 | ✅ 使用 |
| 渲染大量组件 | ✅ 使用 |
| 用户输入响应 | ❌ 不使用（紧急更新） |
| 表单提交 | ❌ 不使用 |
| 网络请求本身 | ❌ 不使用 |

`useTransition` 是 React 并发特性的核心 Hook，正确使用可以显著提升应用的响应性和用户体验。
