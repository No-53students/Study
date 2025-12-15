# Suspense 与 lazy

## 简介

`Suspense` 和 `lazy` 是 React 的代码分割和异步加载解决方案。它们可以让你延迟加载组件，优化应用的初始加载性能。

## React.lazy

`lazy` 允许你定义一个动态加载的组件。它接受一个返回 Promise 的函数，该 Promise 需要 resolve 一个默认导出的 React 组件。

```tsx
import { lazy } from 'react';

// 动态导入组件
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

## Suspense

`Suspense` 允许你声明在等待子组件加载时显示的 fallback 内容。

```tsx
import { Suspense } from 'react';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## 基本用法

### 路由级代码分割

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageSkeleton />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 组件级代码分割

```tsx
import { lazy, Suspense, useState } from 'react';

// 只在需要时加载重型组件
const ChartComponent = lazy(() => import('./ChartComponent'));
const EditorComponent = lazy(() => import('./EditorComponent'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>
        显示图表
      </button>

      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <ChartComponent />
        </Suspense>
      )}
    </div>
  );
}
```

## 嵌套 Suspense

你可以嵌套多个 Suspense 边界，实现更细粒度的加载状态控制：

```tsx
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<ContentSkeleton />}>
        <MainContent />
      </Suspense>
    </Suspense>
  );
}
```

## 预加载组件

通过提前触发 import 来预加载组件：

```tsx
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 预加载函数
function preloadHeavyComponent() {
  import('./HeavyComponent');
}

function App() {
  return (
    <div>
      {/* 鼠标悬停时预加载 */}
      <button
        onMouseEnter={preloadHeavyComponent}
        onClick={() => setShowComponent(true)}
      >
        显示组件
      </button>
    </div>
  );
}
```

## 错误处理

使用 Error Boundary 处理加载失败：

```tsx
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## 命名导出的处理

`lazy` 只支持默认导出。对于命名导出，需要创建中间模块：

```tsx
// 方法 1：创建中间模块
// MyComponent.lazy.ts
export { MyComponent as default } from './MyComponents';

// 使用
const MyComponent = lazy(() => import('./MyComponent.lazy'));

// 方法 2：在 import 中转换
const MyComponent = lazy(() =>
  import('./MyComponents').then(module => ({
    default: module.MyComponent
  }))
);
```

## React 19 中的 Suspense

### 与 use() Hook 配合

```tsx
import { use, Suspense } from 'react';

async function fetchUser(id: number) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

function UserProfile({ userPromise }) {
  const user = use(userPromise);
  return <div>{user.name}</div>;
}

function App() {
  const userPromise = fetchUser(1);

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

### Server Components 中的 Suspense

```tsx
// Server Component
async function AsyncComponent() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// 在 Server Component 中使用 Suspense
function Page() {
  return (
    <Suspense fallback={<Skeleton />}>
      <AsyncComponent />
    </Suspense>
  );
}
```

## 最佳实践

### 1. 合理放置 Suspense 边界

```tsx
// ❌ 过于细粒度
function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SmallComponent1 />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <SmallComponent2 />
      </Suspense>
    </div>
  );
}

// ✅ 适当的粒度
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <SmallComponent1 />
      <SmallComponent2 />
    </Suspense>
  );
}
```

### 2. 使用有意义的 fallback

```tsx
// ❌ 简单的加载文字
<Suspense fallback={<div>Loading...</div>}>

// ✅ 骨架屏或 shimmer 效果
<Suspense fallback={<CardSkeleton />}>
```

### 3. 避免瀑布式加载

```tsx
// ❌ 瀑布式加载
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Parent>
        <Suspense fallback={<Loading />}>
          <Child />
        </Suspense>
      </Parent>
    </Suspense>
  );
}

// ✅ 并行加载
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Parent />
      <Child />
    </Suspense>
  );
}
```

## 注意事项

1. **lazy 必须在组件外部调用**
   ```tsx
   // ❌ 错误
   function App() {
     const Component = lazy(() => import('./Component'));
     return <Component />;
   }

   // ✅ 正确
   const Component = lazy(() => import('./Component'));
   function App() {
     return <Component />;
   }
   ```

2. **Suspense 不能捕获事件处理器中的错误**

3. **SSR 环境需要额外处理**

4. **在 Next.js 中使用 `next/dynamic`** 获得更好的 SSR 支持

## 性能优化效果

| 场景 | 无代码分割 | 使用 lazy |
|------|-----------|----------|
| 初始 JS 包大小 | 大 | 小 |
| 首屏加载时间 | 慢 | 快 |
| 按需加载 | 否 | 是 |
| 用户体验 | 白屏等待 | 渐进式加载 |

## 总结

`Suspense` 和 `lazy` 是优化 React 应用性能的重要工具：

- **lazy**: 延迟加载组件代码
- **Suspense**: 优雅处理加载状态
- **结合使用**: 实现代码分割和渐进式加载
- **React 19**: 与 `use()` Hook 配合处理异步数据
