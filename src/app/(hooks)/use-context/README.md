# useContext Hook 详解

> **难度等级：** ⭐ 入门
>
> **本示例中使用的其他 Hook/API：**
> - `useState` - 管理状态
> - `createContext` - 创建上下文
> - `useContext` - 消费上下文

## 什么是 useContext？

`useContext` 用于读取和订阅组件中的 **Context**（上下文），实现跨组件的数据共享，避免 props 层层传递。

```tsx
const value = useContext(SomeContext);
```

## 为什么需要 useContext？

### 问题：Props Drilling（属性穿透）

```tsx
// ❌ 层层传递 props 很繁琐
function App() {
  const [theme, setTheme] = useState('light');
  return <Layout theme={theme} />;
}

function Layout({ theme }) {
  return <Sidebar theme={theme} />;
}

function Sidebar({ theme }) {
  return <Button theme={theme} />;
}

function Button({ theme }) {
  return <button className={theme}>Click</button>;
}
```

### 解决方案：Context

```tsx
// ✅ 使用 Context 直接访问
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={theme}>
      <Layout />
    </ThemeContext.Provider>
  );
}

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

## 基本用法

### 步骤 1：创建 Context

```tsx
import { createContext } from 'react';

// 创建 Context，提供默认值
const ThemeContext = createContext('light');
```

### 步骤 2：提供 Context

```tsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

### 步骤 3：消费 Context

```tsx
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>按钮</button>;
}
```

## 完整示例

### 主题切换

```tsx
// 1. 创建 Context
const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {}
});

// 2. 创建 Provider 组件
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. 自定义 Hook（推荐）
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. 使用
function App() {
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      当前主题：{theme}
    </button>
  );
}
```

## 多个 Context

可以嵌套多个 Provider：

```tsx
function App() {
  return (
    <ThemeContext.Provider value={theme}>
      <UserContext.Provider value={user}>
        <LanguageContext.Provider value={language}>
          <Page />
        </LanguageContext.Provider>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function Component() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  const language = useContext(LanguageContext);
  // ...
}
```

## Context 的更新

当 Provider 的 `value` 变化时，所有消费该 Context 的组件都会重新渲染：

```tsx
function App() {
  const [user, setUser] = useState(null);

  // ⚠️ 每次 App 渲染都会创建新对象，导致所有消费者重渲染
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Page />
    </UserContext.Provider>
  );
}

// ✅ 优化：使用 useMemo 缓存 value
function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      <Page />
    </UserContext.Provider>
  );
}
```

## 最佳实践

### 1. 创建自定义 Hook

```tsx
// contexts/ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }) {
  // ...
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### 2. 分离状态和派发函数

```tsx
const StateContext = createContext(null);
const DispatchContext = createContext(null);

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 只需要状态的组件不会因为 dispatch 变化而重渲染
function DisplayComponent() {
  const state = useContext(StateContext);
  // ...
}
```

### 3. 合理拆分 Context

```tsx
// ❌ 一个大的 Context
const AppContext = createContext({
  user: null,
  theme: 'light',
  language: 'zh',
  notifications: [],
  // ...
});

// ✅ 拆分成多个 Context
const UserContext = createContext(null);
const ThemeContext = createContext('light');
const LanguageContext = createContext('zh');
```

## useContext vs Props

| 场景 | 推荐方式 |
|------|---------|
| 1-2 层传递 | Props |
| 深层组件需要数据 | Context |
| 全局主题/语言/用户 | Context |
| 组件特定数据 | Props |

## useContext vs 状态管理库

| 场景 | 推荐方式 |
|------|---------|
| 简单的全局状态 | Context |
| 复杂的状态逻辑 | Redux/Zustand |
| 服务端状态 | React Query/SWR |
| 表单状态 | React Hook Form |

## 常见错误

### 错误 1：忘记 Provider

```tsx
// ❌ 没有 Provider，只能获取默认值
function App() {
  return <Button />; // theme 是 createContext 的默认值
}
```

### 错误 2：每次渲染创建新对象

```tsx
// ❌ 每次渲染 value 都是新对象
<Context.Provider value={{ user, setUser }}>

// ✅ 使用 useMemo
const value = useMemo(() => ({ user, setUser }), [user]);
<Context.Provider value={value}>
```

## TypeScript 类型

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

## 总结

| 特性 | 说明 |
|------|------|
| 用途 | 跨组件共享数据 |
| 创建 | `createContext(defaultValue)` |
| 提供 | `<Context.Provider value={...}>` |
| 消费 | `useContext(Context)` |
| 更新 | Provider value 变化时触发 |
