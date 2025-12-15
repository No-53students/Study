# Error Boundary

## 简介

Error Boundary（错误边界）是 React 组件，可以捕获子组件树中的 JavaScript 错误，记录错误，并显示备用 UI，而不是让整个组件树崩溃。

## 重要限制

Error Boundary **无法捕获**以下错误：
- 事件处理器中的错误
- 异步代码（如 setTimeout、requestAnimationFrame）
- 服务端渲染
- Error Boundary 自身抛出的错误

## 类组件实现

Error Boundary 必须使用类组件实现（截至 React 19，函数组件仍不支持）：

```tsx
class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught:', error, errorInfo);
    // 发送到错误监控服务
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

## 使用 react-error-boundary

推荐使用 `react-error-boundary` 库，它提供了更现代的 API：

```bash
npm install react-error-boundary
```

### 基本用法

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>出错了：</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <MyComponent />
    </ErrorBoundary>
  );
}
```

### 重置错误状态

```tsx
function App() {
  const [key, setKey] = useState(0);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // 重置应用状态
        setKey(k => k + 1);
      }}
      resetKeys={[key]}
    >
      <MyComponent key={key} />
    </ErrorBoundary>
  );
}
```

## 错误边界的位置

### 顶层错误边界

捕获整个应用的错误：

```tsx
function App() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Router>
        <Routes />
      </Router>
    </ErrorBoundary>
  );
}
```

### 功能级错误边界

为特定功能提供降级体验：

```tsx
function Dashboard() {
  return (
    <div>
      <Header />
      <ErrorBoundary fallback={<ChartError />}>
        <Chart />
      </ErrorBoundary>
      <ErrorBoundary fallback={<TableError />}>
        <DataTable />
      </ErrorBoundary>
    </div>
  );
}
```

### 路由级错误边界

```tsx
<Routes>
  <Route
    path="/dashboard"
    element={
      <ErrorBoundary fallback={<DashboardError />}>
        <Dashboard />
      </ErrorBoundary>
    }
  />
</Routes>
```

## 处理异步错误

Error Boundary 不能直接捕获异步错误，但可以通过状态更新触发：

```tsx
function useAsyncError() {
  const [, setError] = useState();

  return useCallback((error: Error) => {
    setError(() => {
      throw error;
    });
  }, []);
}

function MyComponent() {
  const throwError = useAsyncError();

  useEffect(() => {
    fetchData().catch(throwError);
  }, [throwError]);

  return <div>...</div>;
}
```

## 处理事件处理器中的错误

事件处理器中的错误需要使用 try-catch：

```tsx
function Button() {
  const handleClick = () => {
    try {
      doSomethingRisky();
    } catch (error) {
      // 处理错误
      showErrorToast(error.message);
    }
  };

  return <button onClick={handleClick}>点击</button>;
}
```

## 错误恢复策略

### 1. 重试策略

```tsx
function RetryableComponent() {
  const { reset } = useErrorBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      FallbackComponent={({ resetErrorBoundary }) => (
        <button onClick={resetErrorBoundary}>重试</button>
      )}
    >
      <RiskyComponent />
    </ErrorBoundary>
  );
}
```

### 2. 降级 UI

```tsx
<ErrorBoundary
  fallbackRender={({ error }) => (
    <div>
      <p>图表加载失败</p>
      <StaticFallbackChart />
    </div>
  )}
>
  <InteractiveChart />
</ErrorBoundary>
```

### 3. 错误报告

```tsx
<ErrorBoundary
  onError={(error, errorInfo) => {
    // 发送到错误监控服务
    Sentry.captureException(error, {
      extra: { componentStack: errorInfo.componentStack }
    });
  }}
>
  <App />
</ErrorBoundary>
```

## TypeScript 类型定义

```tsx
interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  // ...
}
```

## 最佳实践

1. **粒度适中**：不要为每个组件都包裹 Error Boundary
2. **有意义的 Fallback**：提供有用的错误信息和恢复选项
3. **错误日志**：在生产环境记录错误到监控服务
4. **用户体验**：考虑部分降级而非整体崩溃
5. **测试**：为 Error Boundary 编写测试

## 常见问题

### 为什么函数组件不能实现 Error Boundary？

因为 Error Boundary 依赖 `getDerivedStateFromError` 和 `componentDidCatch` 这两个类组件生命周期方法，React 团队尚未为函数组件提供等效的 Hook。

### 开发环境下错误会显示两次？

React 的开发模式会显示错误覆盖层，这是正常的。在生产环境只会显示你的 Fallback UI。

### 如何测试 Error Boundary？

```tsx
test('displays fallback when child throws', () => {
  const ThrowError = () => {
    throw new Error('Test error');
  };

  render(
    <ErrorBoundary fallback={<div>Error occurred</div>}>
      <ThrowError />
    </ErrorBoundary>
  );

  expect(screen.getByText('Error occurred')).toBeInTheDocument();
});
```

## 总结

| 错误类型 | 能否被 Error Boundary 捕获 | 解决方案 |
|---------|--------------------------|---------|
| 渲染错误 | ✅ 是 | Error Boundary |
| 生命周期错误 | ✅ 是 | Error Boundary |
| 事件处理器 | ❌ 否 | try-catch |
| 异步代码 | ❌ 否 | useAsyncError Hook |
| 服务端渲染 | ❌ 否 | 服务端错误处理 |
