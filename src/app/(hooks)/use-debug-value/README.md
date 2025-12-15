# useDebugValue Hook 详解

## 什么是 useDebugValue？

`useDebugValue` 是 React 的调试 Hook，用于在 React DevTools 中为**自定义 Hook 添加标签**。它不会影响应用的行为，纯粹是为了提升开发体验。

```tsx
useDebugValue(value);
useDebugValue(value, format);
```

## 为什么需要 useDebugValue？

### 问题场景

在 React DevTools 中查看自定义 Hook 时，很难理解内部状态的含义：

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  // ...
  return isOnline;
}

// DevTools 显示：
// hooks
//   ▸ OnlineStatus: true  ← 不够清晰
```

### useDebugValue 解决方案

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useDebugValue(isOnline ? '🟢 在线' : '🔴 离线');

  return isOnline;
}

// DevTools 显示：
// hooks
//   ▸ OnlineStatus: "🟢 在线"  ← 更清晰！
```

## 基本语法

```tsx
// 基本用法
useDebugValue(value);

// 带格式化函数（延迟格式化）
useDebugValue(value, (value) => formatFunction(value));
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `value` | `any` | 要在 DevTools 中显示的值 |
| `format` | `(value) => any` | 可选的格式化函数 |

## 使用场景

### 场景 1：状态描述

```tsx
function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useDebugValue(
    loading ? '加载中...' :
    user ? `已登录: ${user.name}` :
    '未登录'
  );

  // ...
  return { user, loading, login, logout };
}
```

### 场景 2：复杂对象格式化

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  // 使用格式化函数延迟计算
  useDebugValue(value, (v) => ({
    key,
    value: v,
    type: typeof v,
  }));

  // ...
  return [value, setValue] as const;
}
```

### 场景 3：日期格式化

```tsx
function useDatePicker(initialDate: Date) {
  const [date, setDate] = useState(initialDate);

  useDebugValue(date, (d) =>
    d.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    })
  );

  return { date, setDate };
}

// DevTools 显示：
// hooks
//   ▸ DatePicker: "2024年1月15日 星期一"
```

### 场景 4：多值状态

```tsx
function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  useDebugValue({
    fields: Object.keys(values).length,
    errors: Object.keys(errors).length,
    touched: Object.values(touched).filter(Boolean).length,
  });

  // ...
  return { values, errors, touched, handleChange, handleBlur };
}

// DevTools 显示：
// hooks
//   ▸ Form: {fields: 5, errors: 2, touched: 3}
```

## 延迟格式化

格式化函数只在 DevTools 打开时才会执行，避免不必要的性能开销：

```tsx
function useExpensiveHook(data: LargeData) {
  const processedData = useMemo(() => processData(data), [data]);

  // ❌ 每次渲染都会执行格式化
  useDebugValue(`处理了 ${countItems(processedData)} 个项目`);

  // ✅ 只有 DevTools 打开时才格式化
  useDebugValue(processedData, (d) => `处理了 ${countItems(d)} 个项目`);

  return processedData;
}
```

## 最佳实践

### 1. 只用于自定义 Hook

```tsx
// ❌ 不要在组件中使用
function MyComponent() {
  useDebugValue('组件值'); // 没有意义
  return <div>...</div>;
}

// ✅ 在自定义 Hook 中使用
function useCustomHook() {
  const [state, setState] = useState(0);
  useDebugValue(state);
  return [state, setState];
}
```

### 2. 用于共享的 Hook 库

```tsx
// 当你创建可复用的 Hook 库时，useDebugValue 非常有用

// ✅ 库代码
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useDebugValue(`${size.width} x ${size.height}`);

  return size;
}
```

### 3. 提供有意义的描述

```tsx
// ❌ 不够有意义
useDebugValue(count);

// ✅ 更有意义
useDebugValue(`计数: ${count} (${count > 10 ? '较大' : '较小'})`);
```

### 4. 不要过度使用

```tsx
// ❌ 过度使用
function useSimpleState() {
  const [value, setValue] = useState(0);
  useDebugValue(value); // 对于简单 Hook 没必要
  return [value, setValue];
}

// ✅ 用于复杂或难以理解的状态
function useComplexState() {
  const [state, dispatch] = useReducer(complexReducer, initialState);
  useDebugValue(summarizeState(state)); // 有帮助
  return [state, dispatch];
}
```

## 实际应用示例

### 示例 1：useOnlineStatus

```tsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useDebugValue(isOnline ? '在线' : '离线');

  return isOnline;
}
```

### 示例 2：useFetch

```tsx
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ data: null, loading: false, error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  useDebugValue(state, (s) => {
    if (s.loading) return '⏳ 加载中...';
    if (s.error) return `❌ 错误: ${s.error.message}`;
    return `✅ 成功: ${JSON.stringify(s.data).slice(0, 50)}...`;
  });

  return state;
}
```

### 示例 3：useMediaQuery

```tsx
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handler);

    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);

  useDebugValue({ query, matches }, ({ query, matches }) =>
    `${query}: ${matches ? '✅ 匹配' : '❌ 不匹配'}`
  );

  return matches;
}
```

## 注意事项

1. **只在开发模式有效**：生产环境中 useDebugValue 不会产生任何影响

2. **不要用于业务逻辑**：它纯粹是调试工具，不应该影响应用行为

3. **DevTools 依赖**：需要 React DevTools 扩展才能看到效果

4. **不是必需的**：如果 Hook 的状态已经很清晰，不需要强行添加

## 总结

| 适用场景 | 不适用场景 |
|----------|------------|
| 自定义 Hook | 组件内 |
| 共享的 Hook 库 | 简单状态 |
| 复杂状态描述 | 业务逻辑 |
| 调试困难的 Hook | 生产环境优化 |

`useDebugValue` 是一个简单但有用的调试工具，它可以显著提升使用自定义 Hook 时的开发体验，特别是在团队协作或开发公共库时。
