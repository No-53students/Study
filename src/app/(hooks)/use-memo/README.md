# useMemo Hook 详解

## 什么是 useMemo？

`useMemo` 是 React 的性能优化 Hook，用于**缓存计算结果**。只有当依赖项发生变化时，才会重新计算。

```tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

## 为什么需要 useMemo？

### 问题场景

每次组件重新渲染时，所有代码都会重新执行：

```tsx
function ProductList({ products, filterText }) {
  // ❌ 每次渲染都会重新过滤，即使 products 和 filterText 没变
  const filteredProducts = products.filter(p =>
    p.name.includes(filterText)
  );

  return <List items={filteredProducts} />;
}
```

### useMemo 解决方案

```tsx
function ProductList({ products, filterText }) {
  // ✅ 只有 products 或 filterText 变化时才重新过滤
  const filteredProducts = useMemo(
    () => products.filter(p => p.name.includes(filterText)),
    [products, filterText]
  );

  return <List items={filteredProducts} />;
}
```

## 基本语法

```tsx
const memoizedValue = useMemo(
  () => computeValue(),  // 计算函数
  [dep1, dep2]           // 依赖项数组
);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| 计算函数 | `() => T` | 返回需要缓存的值 |
| 依赖数组 | `any[]` | 依赖项变化时重新计算 |

### 返回值

返回计算函数的返回值，在依赖项不变时返回缓存的值。

## 使用场景

### 场景 1：缓存复杂计算

```tsx
function PrimeNumbers({ limit }) {
  // 计算质数是 O(n√n) 的复杂操作
  const primes = useMemo(() => {
    console.log('计算质数...');
    const result = [];
    for (let i = 2; i <= limit; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) result.push(i);
    }
    return result;
  }, [limit]); // 只有 limit 变化时才重新计算

  return (
    <div>
      <p>2 到 {limit} 之间有 {primes.length} 个质数</p>
    </div>
  );
}
```

### 场景 2：避免传递新对象给子组件

```tsx
function Parent({ items }) {
  const [count, setCount] = useState(0);

  // ❌ 每次渲染都创建新对象，导致 Child 重新渲染
  const config = { theme: 'dark', showHeader: true };

  // ✅ 缓存对象，引用保持稳定
  const memoizedConfig = useMemo(
    () => ({ theme: 'dark', showHeader: true }),
    [] // 没有依赖，永不重新创建
  );

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      <Child config={memoizedConfig} />
    </div>
  );
}
```

### 场景 3：过滤和排序列表

```tsx
function UserList({ users, sortBy, filterText }) {
  const filteredAndSortedUsers = useMemo(() => {
    console.log('过滤和排序用户列表');

    // 先过滤
    let result = users.filter(user =>
      user.name.toLowerCase().includes(filterText.toLowerCase())
    );

    // 再排序
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'age') return a.age - b.age;
      return 0;
    });

    return result;
  }, [users, sortBy, filterText]);

  return (
    <ul>
      {filteredAndSortedUsers.map(user => (
        <li key={user.id}>{user.name} ({user.age})</li>
      ))}
    </ul>
  );
}
```

### 场景 4：派生状态计算

```tsx
function ShoppingCart({ items }) {
  // 计算总价
  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  // 计算商品数量
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  // 计算是否有折扣资格
  const hasDiscount = useMemo(
    () => total >= 100,
    [total]
  );

  return (
    <div>
      <p>商品数量: {itemCount}</p>
      <p>总价: ¥{total.toFixed(2)}</p>
      {hasDiscount && <p>已满100，享受优惠！</p>}
    </div>
  );
}
```

## useMemo vs useCallback

| 特性 | useMemo | useCallback |
|------|---------|-------------|
| 缓存内容 | 任意值（计算结果） | 函数 |
| 返回值 | 计算函数的返回值 | 函数本身 |
| 等价写法 | - | `useMemo(() => fn, [deps])` |
| 典型场景 | 复杂计算、对象创建 | 事件处理器、传递给子组件的函数 |

```tsx
// 这两个是等价的
const memoizedFn = useCallback(() => doSomething(a, b), [a, b]);
const memoizedFn = useMemo(() => () => doSomething(a, b), [a, b]);
```

## 什么时候使用 useMemo

### ✅ 应该使用的场景

1. **复杂计算**：O(n²) 或更高复杂度的操作
2. **大数据处理**：处理大型数组、对象
3. **避免子组件重渲染**：配合 `React.memo` 使用
4. **依赖稳定的引用**：作为其他 Hook 的依赖项

### ❌ 不应该使用的场景

1. **简单计算**：简单的数学运算、字符串拼接
2. **原始值**：数字、字符串、布尔值（已经是稳定的）
3. **没有性能问题**：过早优化
4. **计算本身很便宜**：缓存开销可能大于重新计算

```tsx
// ❌ 不必要的 useMemo
const fullName = useMemo(
  () => `${firstName} ${lastName}`,
  [firstName, lastName]
);

// ✅ 直接计算即可
const fullName = `${firstName} ${lastName}`;
```

## 常见错误

### 错误 1：缺少依赖项

```tsx
// ❌ 错误：缺少 multiplier 依赖
const result = useMemo(
  () => items.map(item => item.value * multiplier),
  [items] // 缺少 multiplier！
);

// ✅ 正确：包含所有依赖
const result = useMemo(
  () => items.map(item => item.value * multiplier),
  [items, multiplier]
);
```

### 错误 2：依赖项不稳定

```tsx
// ❌ 错误：每次渲染 options 都是新对象
function Component({ items }) {
  const options = { sortBy: 'name' }; // 每次新对象

  const sorted = useMemo(
    () => sortItems(items, options),
    [items, options] // options 每次都变！
  );
}

// ✅ 正确：稳定化依赖
function Component({ items }) {
  const options = useMemo(() => ({ sortBy: 'name' }), []);

  const sorted = useMemo(
    () => sortItems(items, options),
    [items, options]
  );
}
```

### 错误 3：在 useMemo 中产生副作用

```tsx
// ❌ 错误：在 useMemo 中发请求
const data = useMemo(() => {
  fetch('/api/data'); // 副作用！
  return processData();
}, []);

// ✅ 正确：副作用应该在 useEffect 中
useEffect(() => {
  fetch('/api/data');
}, []);
```

## 与 React.memo 配合

`useMemo` 常与 `React.memo` 配合使用，避免子组件不必要的重渲染：

```tsx
// 子组件使用 memo 包裹
const ExpensiveList = memo(function ExpensiveList({ items, config }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
});

// 父组件
function Parent({ rawItems }) {
  const [count, setCount] = useState(0);

  // 缓存处理后的数据
  const items = useMemo(
    () => rawItems.map(item => ({ ...item, processed: true })),
    [rawItems]
  );

  // 缓存配置对象
  const config = useMemo(
    () => ({ theme: 'dark' }),
    []
  );

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>
        Count: {count}
      </button>
      {/* items 和 config 引用稳定，ExpensiveList 不会重渲染 */}
      <ExpensiveList items={items} config={config} />
    </div>
  );
}
```

## React Compiler 的影响

React 19 的 React Compiler 可以自动添加 memoization：

```tsx
// 编写时
function Component({ items }) {
  const sorted = items.sort((a, b) => a.name.localeCompare(b.name));
  return <List items={sorted} />;
}

// React Compiler 自动优化为类似
function Component({ items }) {
  const sorted = useMemo(
    () => items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  );
  return <List items={sorted} />;
}
```

**建议**：在使用 React Compiler 的项目中，优先让编译器处理优化，只在必要时手动使用 `useMemo`。

## 最佳实践

### 1. 先测量，再优化

```tsx
// 在添加 useMemo 之前，先测量是否真的有性能问题
console.time('calculation');
const result = expensiveCalculation(data);
console.timeEnd('calculation');
```

### 2. 使用正确的粒度

```tsx
// ❌ 过于粗粒度：任何一项变化都会重新计算全部
const processedData = useMemo(() => ({
  users: processUsers(users),
  orders: processOrders(orders),
  stats: calculateStats(users, orders),
}), [users, orders]);

// ✅ 适当粒度：只重新计算变化的部分
const processedUsers = useMemo(() => processUsers(users), [users]);
const processedOrders = useMemo(() => processOrders(orders), [orders]);
const stats = useMemo(
  () => calculateStats(processedUsers, processedOrders),
  [processedUsers, processedOrders]
);
```

### 3. 考虑替代方案

有时候不需要 `useMemo`，而是应该重构组件：

```tsx
// ❌ 使用 useMemo 避免重渲染
function Parent() {
  const [count, setCount] = useState(0);
  const items = useMemo(() => getItems(), []);

  return (
    <div>
      <Counter count={count} setCount={setCount} />
      <ItemList items={items} />
    </div>
  );
}

// ✅ 更好的方案：分离组件
function Parent() {
  return (
    <div>
      <CounterContainer />
      <ItemListContainer />
    </div>
  );
}
```

## 总结

| 使用场景 | 推荐做法 |
|---------|---------|
| 复杂计算 | 使用 useMemo |
| 大型列表过滤/排序 | 使用 useMemo |
| 对象/数组作为 props | 配合 memo 使用 useMemo |
| 简单计算 | 不需要 useMemo |
| 使用 React Compiler | 让编译器自动优化 |

`useMemo` 是强大的优化工具，但应该在确认存在性能问题后再使用，避免过早优化。
