# React.memo

## 什么是 React.memo？

`React.memo` 是一个高阶组件，用于对函数组件进行性能优化。它会**记忆**组件的渲染结果，当 props 没有变化时，跳过重新渲染。

```tsx
const MemoizedComponent = memo(function MyComponent({ name }) {
  return <div>{name}</div>;
});
```

## 为什么需要 memo？

### 问题：不必要的重渲染

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {/* ExpensiveChild 每次都会重渲染，即使它不依赖 count */}
      <ExpensiveChild data={staticData} />
    </div>
  );
}
```

### 解决方案：使用 memo

```tsx
const MemoizedChild = memo(function ExpensiveChild({ data }) {
  // 只有当 data 变化时才重渲染
  return <div>{/* 复杂渲染 */}</div>;
});
```

## 基本用法

### 默认浅比较

```tsx
import { memo } from 'react';

const UserCard = memo(function UserCard({ user }) {
  console.log('UserCard 渲染');
  return (
    <div>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
});
```

### 自定义比较函数

```tsx
const UserCard = memo(
  function UserCard({ user }) {
    return <div>{user.name}</div>;
  },
  (prevProps, nextProps) => {
    // 返回 true 表示相等（不重渲染）
    // 返回 false 表示不相等（重渲染）
    return prevProps.user.id === nextProps.user.id;
  }
);
```

## memo 的工作原理

```
渲染触发
    ↓
检查 props 是否变化（浅比较）
    ↓
├─ 相同 → 跳过渲染，返回缓存结果
└─ 不同 → 重新渲染组件
```

### 浅比较规则

```tsx
// 基础类型：值比较
'hello' === 'hello'  // true
42 === 42            // true

// 引用类型：引用比较
{} === {}            // false（不同引用）
[] === []            // false

const obj = { a: 1 };
obj === obj          // true（同一引用）
```

## 常见陷阱

### 1. 对象/数组字面量

```tsx
// ❌ 每次渲染都创建新对象，memo 失效
function Parent() {
  return <MemoChild style={{ color: 'red' }} />;
}

// ✅ 使用 useMemo 缓存对象
function Parent() {
  const style = useMemo(() => ({ color: 'red' }), []);
  return <MemoChild style={style} />;
}

// ✅ 或提取到组件外部
const style = { color: 'red' };
function Parent() {
  return <MemoChild style={style} />;
}
```

### 2. 内联函数

```tsx
// ❌ 每次渲染都创建新函数
function Parent() {
  return <MemoChild onClick={() => console.log('click')} />;
}

// ✅ 使用 useCallback
function Parent() {
  const handleClick = useCallback(() => {
    console.log('click');
  }, []);

  return <MemoChild onClick={handleClick} />;
}
```

### 3. children prop

```tsx
// ❌ children 是 JSX，每次都是新引用
function Parent() {
  return (
    <MemoChild>
      <span>内容</span>
    </MemoChild>
  );
}

// ✅ 如果 children 是静态的，可以提取
const content = <span>内容</span>;
function Parent() {
  return <MemoChild>{content}</MemoChild>;
}
```

## 何时使用 memo？

### ✅ 适合使用

1. **纯展示组件** - 只依赖 props 渲染
2. **渲染开销大** - 复杂计算或大量 DOM
3. **频繁重渲染** - 父组件经常更新
4. **相同 props** - props 很少变化

### ❌ 不需要使用

1. **简单组件** - 渲染开销很小
2. **props 经常变化** - memo 检查成本 > 收益
3. **所有 props 都是原始类型** - 变化时本来就需要渲染
4. **过早优化** - 先测量，再优化

## memo vs useMemo vs useCallback

| API | 作用 | 缓存内容 |
|-----|------|----------|
| memo | 缓存组件 | 组件渲染结果 |
| useMemo | 缓存计算 | 计算结果（任意值） |
| useCallback | 缓存函数 | 函数引用 |

```tsx
// memo: 缓存组件
const MemoComponent = memo(Component);

// useMemo: 缓存值
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

// useCallback: 缓存函数
const memoizedCallback = useCallback(() => doSomething(a), [a]);
```

## 配合 useCallback 使用

```tsx
function Parent() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 避免每次创建新函数
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {/* handleClick 引用稳定，MemoChild 不会重渲染 */}
      <MemoChild onClick={handleClick} />
    </div>
  );
}

const MemoChild = memo(function Child({ onClick }) {
  console.log('Child 渲染');
  return <button onClick={onClick}>Click me</button>;
});
```

## 调试技巧

### 使用 React DevTools

1. 打开 React DevTools
2. 点击设置图标
3. 勾选 "Highlight updates when components render"
4. 观察哪些组件在闪烁（重渲染）

### 添加日志

```tsx
const MemoChild = memo(function Child({ data }) {
  console.log('Child 渲染', data);
  return <div>{data.name}</div>;
});
```

## 最佳实践

### 1. 先测量后优化

```tsx
// 使用 Profiler 测量
<Profiler id="MyComponent" onRender={onRenderCallback}>
  <MyComponent />
</Profiler>

function onRenderCallback(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log(`${id} 渲染耗时: ${actualDuration}ms`);
}
```

### 2. 合理拆分组件

```tsx
// 将频繁更新的部分和不变的部分分离
function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <ExpensiveStatic />  {/* 自然不会因为 count 变化而重渲染 */}
    </div>
  );
}
```

### 3. 状态下沉

```tsx
// ❌ 状态放在顶层，导致整个树重渲染
function App() {
  const [inputValue, setInputValue] = useState('');
  return (
    <div>
      <input value={inputValue} onChange={e => setInputValue(e.target.value)} />
      <ExpensiveList />  {/* 每次输入都重渲染 */}
    </div>
  );
}

// ✅ 状态下沉到需要的组件
function App() {
  return (
    <div>
      <SearchInput />  {/* 状态在这里 */}
      <ExpensiveList />  {/* 不受影响 */}
    </div>
  );
}
```

## 总结

| 概念 | 说明 |
|------|------|
| memo | 缓存组件渲染结果 |
| 浅比较 | 默认比较 props 引用 |
| 自定义比较 | 第二个参数传入比较函数 |
| 配合 useCallback | 避免函数引用变化 |
| 配合 useMemo | 避免对象/数组引用变化 |
| 使用时机 | 先测量，渲染开销大时使用 |
