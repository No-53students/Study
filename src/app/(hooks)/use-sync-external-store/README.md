# useSyncExternalStore Hook 详解

## 什么是 useSyncExternalStore？

`useSyncExternalStore` 是 React 18 引入的 Hook，用于**订阅外部数据源**。它是为库作者设计的底层 API，确保在并发渲染中外部存储的数据保持一致。

```tsx
const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

## 为什么需要 useSyncExternalStore？

### 问题场景：并发渲染中的数据撕裂 (Tearing)

在 React 18 的并发模式下，一次渲染可能被中断：

```tsx
// ❌ 传统方式可能导致数据撕裂
function BadComponent() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const unsubscribe = externalStore.subscribe(() => {
      forceUpdate({}); // 触发重渲染
    });
    return unsubscribe;
  }, []);

  // 问题：渲染期间外部数据可能变化，导致 UI 不一致
  return <div>{externalStore.getState().value}</div>;
}
```

### useSyncExternalStore 解决方案

```tsx
// ✅ 安全订阅外部存储
function GoodComponent() {
  const state = useSyncExternalStore(
    externalStore.subscribe,
    externalStore.getState
  );

  return <div>{state.value}</div>;
}
```

## 基本语法

```tsx
const snapshot = useSyncExternalStore(
  subscribe,         // 订阅函数
  getSnapshot,       // 获取当前快照
  getServerSnapshot? // 服务端渲染时获取快照（可选）
);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `subscribe` | `(callback: () => void) => () => void` | 订阅函数，返回取消订阅函数 |
| `getSnapshot` | `() => T` | 返回当前数据快照 |
| `getServerSnapshot` | `() => T` | SSR 时使用的快照（可选） |

### 返回值

返回存储的当前快照值。

## 使用场景

### 场景 1：订阅浏览器 API

```tsx
// 订阅网络状态
function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    // subscribe
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot
    () => navigator.onLine,
    // getServerSnapshot (SSR)
    () => true
  );

  return isOnline;
}
```

### 场景 2：订阅外部状态管理库

```tsx
// 简单的外部存储示例
function createStore<T>(initialState: T) {
  let state = initialState;
  const listeners = new Set<() => void>();

  return {
    getState: () => state,
    setState: (newState: T) => {
      state = newState;
      listeners.forEach(listener => listener());
    },
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const store = createStore({ count: 0 });

function Counter() {
  const { count } = useSyncExternalStore(
    store.subscribe,
    store.getState
  );

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => store.setState({ count: count + 1 })}>
        +1
      </button>
    </div>
  );
}
```

### 场景 3：订阅 localStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const subscribe = (callback: () => void) => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key) callback();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  };

  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialValue // SSR
  );

  const setValue = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    window.dispatchEvent(new StorageEvent('storage', { key }));
  };

  return [value, setValue] as const;
}
```

### 场景 4：订阅窗口尺寸

```tsx
function useWindowSize() {
  const getSnapshot = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const subscribe = (callback: () => void) => {
    window.addEventListener('resize', callback);
    return () => window.removeEventListener('resize', callback);
  };

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => ({ width: 0, height: 0 }) // SSR 默认值
  );
}
```

### 场景 5：订阅媒体查询

```tsx
function useMediaQuery(query: string) {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', callback);
    return () => mediaQuery.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false // SSR 默认值
  );
}
```

## 重要规则

### 1. getSnapshot 必须返回不可变数据

```tsx
// ❌ 错误：每次返回新对象
const getSnapshot = () => ({
  count: store.count,
  name: store.name,
});

// ✅ 正确：返回缓存的快照或不可变数据
const getSnapshot = () => store.getState(); // 返回同一个引用
```

### 2. subscribe 函数必须稳定

```tsx
// ❌ 错误：每次渲染创建新函数
function Component() {
  useSyncExternalStore(
    (callback) => store.subscribe(callback), // 每次新函数
    store.getSnapshot
  );
}

// ✅ 正确：使用稳定的引用
const subscribe = store.subscribe; // 组件外或 useMemo

function Component() {
  useSyncExternalStore(
    subscribe,
    store.getSnapshot
  );
}
```

### 3. 提供 getServerSnapshot 用于 SSR

```tsx
const state = useSyncExternalStore(
  subscribe,
  getSnapshot,
  () => defaultValue // SSR 时没有 window/localStorage
);
```

## 与 useState + useEffect 对比

```tsx
// ❌ 传统方式（可能数据撕裂）
function BadCounter() {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setCount(store.getState().count);
    });
    return unsubscribe;
  }, []);

  return <div>{count}</div>;
}

// ✅ useSyncExternalStore（安全）
function GoodCounter() {
  const count = useSyncExternalStore(
    store.subscribe,
    () => store.getState().count
  );

  return <div>{count}</div>;
}
```

## 选择器模式

可以使用选择器只订阅部分数据：

```tsx
function useStoreSelector<T, S>(
  store: Store<T>,
  selector: (state: T) => S
): S {
  return useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getInitialState())
  );
}

// 使用
function UserName() {
  const name = useStoreSelector(store, state => state.user.name);
  return <div>{name}</div>;
}
```

## 最佳实践

### 1. 为库作者设计

```tsx
// 这个 Hook 主要给库作者使用
// 普通应用开发者通常使用封装好的库（如 Zustand、Redux）

// Zustand 内部使用 useSyncExternalStore
import { create } from 'zustand';
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### 2. 缓存 getSnapshot 结果

```tsx
// 避免不必要的重渲染
let cachedSnapshot = null;

const getSnapshot = () => {
  const newSnapshot = computeSnapshot();
  if (shallowEqual(cachedSnapshot, newSnapshot)) {
    return cachedSnapshot;
  }
  cachedSnapshot = newSnapshot;
  return newSnapshot;
};
```

### 3. 处理 SSR

```tsx
function useData() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    // SSR 必须提供，否则会报错
    getServerSnapshot
  );
}
```

## 常见错误

### 错误 1：getSnapshot 返回新对象

```tsx
// ❌ 每次返回新对象导致无限循环
useSyncExternalStore(
  subscribe,
  () => ({ value: store.value }) // 新对象！
);

// ✅ 返回存储的原始引用
useSyncExternalStore(
  subscribe,
  () => store.getState()
);
```

### 错误 2：在 getSnapshot 中有副作用

```tsx
// ❌ 错误
const getSnapshot = () => {
  console.log('Getting snapshot'); // 副作用
  return store.getState();
};

// ✅ 纯函数
const getSnapshot = () => store.getState();
```

## 总结

| 适用场景 | 不适用场景 |
|----------|------------|
| 外部状态管理库 | React 内部状态 |
| 浏览器 API 订阅 | 简单的 props/state |
| 第三方数据源 | 组件内部逻辑 |
| 需要并发安全的订阅 | 已封装好的库 |

`useSyncExternalStore` 是一个底层 API，主要面向库作者。普通应用开发者很少直接使用它，而是使用基于它构建的状态管理库。
