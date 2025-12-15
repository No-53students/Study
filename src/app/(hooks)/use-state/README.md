# useState Hook 详解

> **难度等级：** ⭐ 入门
>
> **本示例中使用的其他 Hook/API：** 无，这是最基础的 Hook

## 什么是 useState？

`useState` 是 React 最基础、最常用的 Hook，用于在函数组件中添加**状态**（state）。

```tsx
const [state, setState] = useState(initialValue);
```

## 为什么需要 useState？

在函数组件中，普通变量在每次渲染时都会重置：

```tsx
function Counter() {
  let count = 0; // ❌ 每次渲染都会重置为 0

  return (
    <button onClick={() => count++}>
      Count: {count} {/* 永远显示 0 */}
    </button>
  );
}
```

`useState` 让 React 能够在渲染之间"记住"值：

```tsx
function Counter() {
  const [count, setCount] = useState(0); // ✅ React 会记住这个值

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count} {/* 正确更新 */}
    </button>
  );
}
```

## 基本语法

```tsx
const [state, setState] = useState(initialValue);
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `initialValue` | 状态的初始值，可以是任何类型 |

### 返回值

| 返回值 | 说明 |
|--------|------|
| `state` | 当前状态值 |
| `setState` | 更新状态的函数 |

## 使用方式

### 1. 基本用法

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### 2. 多个状态

```tsx
function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [isStudent, setIsStudent] = useState(false);

  return (
    <form>
      <input value={name} onChange={e => setName(e.target.value)} />
      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />
      <input type="checkbox" checked={isStudent} onChange={e => setIsStudent(e.target.checked)} />
    </form>
  );
}
```

### 3. 对象状态

```tsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: 0
  });

  // ⚠️ 更新对象时必须展开旧值
  const updateName = (name: string) => {
    setUser({ ...user, name }); // ✅ 保留其他字段
    // setUser({ name }); // ❌ 会丢失 email 和 age
  };

  return (
    <input
      value={user.name}
      onChange={e => updateName(e.target.value)}
    />
  );
}
```

### 4. 数组状态

```tsx
function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, text]); // 添加
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index)); // 删除
  };

  const updateTodo = (index: number, text: string) => {
    setTodos(todos.map((t, i) => i === index ? text : t)); // 更新
  };

  return (/* ... */);
}
```

## 函数式更新

当新状态依赖于旧状态时，应使用函数式更新：

```tsx
function Counter() {
  const [count, setCount] = useState(0);

  // ❌ 可能出错（闭包陷阱）
  const incrementThreeTimes = () => {
    setCount(count + 1); // count 是旧值
    setCount(count + 1); // count 还是同一个旧值
    setCount(count + 1); // count 仍然是旧值
    // 结果：只增加 1
  };

  // ✅ 正确写法
  const incrementThreeTimesCorrect = () => {
    setCount(c => c + 1); // c 是最新值
    setCount(c => c + 1); // c 是上一次更新后的值
    setCount(c => c + 1); // c 是最新的值
    // 结果：增加 3
  };
}
```

### 何时使用函数式更新？

| 场景 | 推荐方式 |
|------|---------|
| 基于旧值计算新值 | `setState(prev => prev + 1)` |
| 在 setTimeout/setInterval 中 | `setState(prev => ...)` |
| 在事件处理器中连续调用 | `setState(prev => ...)` |
| 设置固定值 | `setState(newValue)` |

## 惰性初始化

如果初始值需要复杂计算，可以传入函数：

```tsx
// ❌ 每次渲染都会执行 expensiveComputation
const [state, setState] = useState(expensiveComputation());

// ✅ 只在首次渲染时执行
const [state, setState] = useState(() => expensiveComputation());
```

### 示例

```tsx
function Editor() {
  // 只在首次渲染时从 localStorage 读取
  const [draft, setDraft] = useState(() => {
    const saved = localStorage.getItem('draft');
    return saved ? JSON.parse(saved) : '';
  });

  return <textarea value={draft} onChange={e => setDraft(e.target.value)} />;
}
```

## 状态更新的特点

### 1. 异步批处理

React 会将多个状态更新合并为一次重渲染：

```tsx
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  setName('React');
  // React 只会重渲染一次，而不是三次
}
```

### 2. 状态是不可变的

不要直接修改状态：

```tsx
// ❌ 错误：直接修改
user.name = 'New Name';
setUser(user);

// ✅ 正确：创建新对象
setUser({ ...user, name: 'New Name' });

// ❌ 错误：直接修改数组
todos.push('New Todo');
setTodos(todos);

// ✅ 正确：创建新数组
setTodos([...todos, 'New Todo']);
```

### 3. 状态更新会触发重渲染

每次调用 `setState` 都会让组件重新渲染（除非新旧值相同）：

```tsx
const [count, setCount] = useState(0);

setCount(0); // 不会触发重渲染（值相同）
setCount(1); // 会触发重渲染
```

## 常见错误

### 错误 1：直接修改状态

```tsx
// ❌ 错误
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // 直接修改了数组
setItems(items); // React 可能不会检测到变化

// ✅ 正确
setItems([...items, 4]);
```

### 错误 2：在条件语句中使用 Hook

```tsx
// ❌ 错误：Hook 必须在顶层调用
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ 正确：始终在顶层调用
const [state, setState] = useState(0);
if (condition) {
  // 使用 state
}
```

### 错误 3：忘记展开对象

```tsx
// ❌ 错误：丢失了其他属性
setUser({ name: 'New Name' });

// ✅ 正确：保留其他属性
setUser(prev => ({ ...prev, name: 'New Name' }));
```

## TypeScript 类型

### 基本类型推断

```tsx
const [count, setCount] = useState(0); // number
const [name, setName] = useState(''); // string
const [active, setActive] = useState(false); // boolean
```

### 显式类型

```tsx
// 联合类型
const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

// 复杂对象
interface User {
  id: number;
  name: string;
  email: string;
}
const [user, setUser] = useState<User | null>(null);

// 数组
const [items, setItems] = useState<string[]>([]);
```

## useState vs 其他状态管理

| 方案 | 适用场景 |
|------|---------|
| `useState` | 简单的组件内部状态 |
| `useReducer` | 复杂的状态逻辑 |
| `useContext` | 跨组件共享状态 |
| Redux/Zustand | 全局应用状态 |

## 最佳实践

1. **状态最小化**：只存储必要的数据，可以计算的值不要存储
2. **状态扁平化**：避免深层嵌套的对象结构
3. **状态就近**：状态应该放在最近的共同父组件中
4. **函数式更新**：依赖旧值时使用函数式更新
5. **惰性初始化**：复杂初始值使用函数形式

## 总结

`useState` 是 React 函数组件状态管理的基础：

| 特性 | 说明 |
|------|------|
| 语法简单 | `const [state, setState] = useState(initial)` |
| 类型任意 | 支持基本类型、对象、数组等 |
| 不可变更新 | 必须创建新值，不能直接修改 |
| 函数式更新 | 依赖旧值时使用 `setState(prev => ...)` |
| 惰性初始化 | 复杂初始值使用 `useState(() => ...)` |
