# useCallback Hook 详解

> **本示例中使用的其他 Hook/API：**
> - `useState` - 管理组件状态
> - `useEffect` - 监听渲染次数变化
> - `memo` - 高阶组件，用于缓存组件避免不必要的重新渲染

## 什么是 useCallback？

`useCallback` 是 React 提供的一个性能优化 Hook，用于**缓存函数定义**，避免在组件重新渲染时不必要地重新创建函数。

```tsx
const memoizedFn = useCallback(fn, dependencies)
```

## 为什么需要 useCallback？

### 问题背景

在 React 中，每次组件重新渲染时，组件内部定义的函数都会被**重新创建**：

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  // 每次 Parent 渲染，handleClick 都是一个新函数
  const handleClick = () => {
    console.log('clicked');
  };

  return <Child onClick={handleClick} />;
}
```

### 这会带来什么问题？

1. **破坏 memo 优化**：如果子组件用 `memo` 包裹，新的函数引用会导致子组件不必要地重新渲染
2. **破坏 useEffect 依赖**：如果函数作为 `useEffect` 的依赖项，会导致 effect 不必要地重新执行
3. **破坏其他 Hook 依赖**：同理影响 `useMemo`、`useCallback` 等的依赖项

## 基本语法

```tsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b]  // 依赖项数组
);
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `fn` | 要缓存的函数 |
| `dependencies` | 依赖项数组，当数组中的值变化时，才会返回新的函数 |

### 返回值

返回缓存的函数。只有当依赖项变化时，才会返回新的函数引用。

## 使用场景

### 场景 1：配合 memo 优化子组件

```tsx
import { memo, useCallback, useState } from 'react';

// 使用 memo 包裹的子组件
const ExpensiveChild = memo(function ExpensiveChild({ onClick }) {
  console.log('ExpensiveChild 渲染了');
  return <button onClick={onClick}>点击</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // ✅ 使用 useCallback，函数引用稳定
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <p>Count: {count}</p>
      {/* name 变化时，ExpensiveChild 不会重新渲染 */}
      <ExpensiveChild onClick={handleClick} />
    </div>
  );
}
```

### 场景 2：作为 useEffect 的依赖项

```tsx
function SearchComponent({ query }) {
  const [results, setResults] = useState([]);

  // ✅ 缓存搜索函数
  const fetchResults = useCallback(async () => {
    const data = await searchAPI(query);
    setResults(data);
  }, [query]); // 只有 query 变化时才更新函数

  useEffect(() => {
    fetchResults();
  }, [fetchResults]); // 安全地作为依赖项

  return <ResultList results={results} />;
}
```

### 场景 3：传递给自定义 Hook

```tsx
function useEventListener(eventName, handler) {
  useEffect(() => {
    window.addEventListener(eventName, handler);
    return () => window.removeEventListener(eventName, handler);
  }, [eventName, handler]); // handler 需要稳定
}

function MyComponent() {
  // ✅ 使用 useCallback 保持 handler 稳定
  const handleResize = useCallback(() => {
    console.log(window.innerWidth);
  }, []);

  useEventListener('resize', handleResize);
}
```

## 依赖项详解

### 空依赖数组 `[]`

函数永远不会重新创建：

```tsx
const handleClick = useCallback(() => {
  console.log('永远是同一个函数');
}, []);
```

### 有依赖项

当依赖项变化时，函数才会重新创建：

```tsx
const handleSubmit = useCallback(() => {
  submitForm(userId, formData);
}, [userId, formData]); // userId 或 formData 变化时更新
```

### 使用函数式更新避免依赖

```tsx
// ❌ 依赖 count，count 变化就会重新创建
const increment = useCallback(() => {
  setCount(count + 1);
}, [count]);

// ✅ 使用函数式更新，无需依赖 count
const increment = useCallback(() => {
  setCount(c => c + 1);
}, []);
```

## 什么时候不需要 useCallback？

### 1. 函数没有传递给子组件

```tsx
function MyComponent() {
  // ❌ 不必要，函数只在当前组件使用
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // ✅ 直接用普通函数
  const handleClick = () => {
    console.log('clicked');
  };

  return <button onClick={handleClick}>Click</button>;
}
```

### 2. 子组件没有使用 memo

```tsx
// 子组件没有用 memo，无论如何都会重新渲染
function Child({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}

function Parent() {
  // ❌ 不必要，Child 没有用 memo
  const handleClick = useCallback(() => {}, []);

  return <Child onClick={handleClick} />;
}
```

### 3. 使用了 React Compiler

React 19 引入的 React Compiler 会自动进行记忆化优化，很多情况下不再需要手动使用 `useCallback`。

## useCallback vs useMemo

| Hook | 缓存对象 | 返回值 |
|------|---------|--------|
| `useCallback(fn, deps)` | 函数本身 | 缓存的函数 |
| `useMemo(() => fn, deps)` | 函数执行结果 | 缓存的值 |

```tsx
// 这两个等价
useCallback(fn, deps)
useMemo(() => fn, deps)
```

## 常见错误

### 错误 1：遗漏依赖项

```tsx
// ❌ 错误：使用了 query 但没有加入依赖
const search = useCallback(() => {
  fetchData(query);
}, []); // 应该是 [query]
```

### 错误 2：过度使用

```tsx
// ❌ 不必要的 useCallback
function MyComponent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  // 原生 DOM 元素不需要 useCallback
  return <button onClick={handleClick}>Click</button>;
}
```

### 错误 3：依赖项中包含对象/数组字面量

```tsx
// ❌ 每次渲染 options 都是新对象，useCallback 失效
const fetchData = useCallback(() => {
  api.fetch(options);
}, [{ page: 1 }]); // 对象字面量每次都不同

// ✅ 使用 useMemo 或提取到组件外部
const options = useMemo(() => ({ page: 1 }), []);
const fetchData = useCallback(() => {
  api.fetch(options);
}, [options]);
```

## 性能考虑

`useCallback` 本身也有开销：
- 需要创建依赖数组
- 需要比较依赖项
- 需要存储缓存的函数

因此，只在**确实需要**的场景使用：
1. 传递给 memo 子组件
2. 作为其他 Hook 的依赖项
3. 函数创建成本很高

## 总结

| 场景 | 是否使用 useCallback |
|------|---------------------|
| 传递给 memo 子组件 | ✅ 推荐 |
| 作为 useEffect 依赖 | ✅ 推荐 |
| 原生 DOM 事件处理 | ❌ 不需要 |
| 组件内部使用 | ❌ 不需要 |
| 使用 React Compiler | ❌ 自动优化 |

---

## 附录：本示例中使用的其他 Hook 详解

### useState

`useState` 是 React 最基础的状态管理 Hook。

```tsx
const [state, setState] = useState(initialValue);
```

**参数：**
- `initialValue` - 状态的初始值

**返回值：**
- `state` - 当前状态值
- `setState` - 更新状态的函数

**在本示例中的使用：**
```tsx
// 追踪父组件渲染次数
const [parentRenderCount, setParentRenderCount] = useState(0);

// 追踪子组件渲染次数
const [renderCountWithout, setRenderCountWithout] = useState(0);
```

### useEffect

`useEffect` 用于处理副作用，如 DOM 操作、订阅、数据获取等。

```tsx
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数（可选）
  };
}, [dependencies]);
```

**参数：**
- 第一个参数：副作用函数
- 第二个参数：依赖项数组

**在本示例中的使用：**
```tsx
// 子组件渲染时通知父组件
useEffect(() => {
  onRender(); // 每次渲染时调用
}, [onRender]);
```

### memo

`memo` 是一个高阶组件（HOC），用于缓存组件的渲染结果。

```tsx
const MemoizedComponent = memo(function MyComponent(props) {
  // 组件逻辑
});
```

**工作原理：**
- 对比前后 props 是否相同（浅比较）
- 如果 props 没变，跳过重新渲染，复用上次的结果
- 如果 props 变了，重新渲染组件

**在本示例中的使用：**
```tsx
// 使用 memo 包裹子组件
const ChildWithCallback = memo(function ChildWithCallback({
  onClick,
  onRender,
}) {
  // 只有当 onClick 或 onRender 引用变化时才会重新渲染
  // ...
});
```

**memo 与 useCallback 的配合：**

```tsx
// 父组件
function Parent() {
  // ❌ 没有 useCallback：每次渲染都是新函数，memo 失效
  const handleClick = () => {};

  // ✅ 使用 useCallback：函数引用稳定，memo 生效
  const handleClickMemoized = useCallback(() => {}, []);

  return <MemoizedChild onClick={handleClickMemoized} />;
}
```

这就是为什么 `useCallback` 通常需要配合 `memo` 使用——只有子组件被 `memo` 包裹时，稳定的函数引用才能发挥作用。
