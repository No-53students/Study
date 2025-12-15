# Context

## 简介

Context 提供了一种在组件树中共享数据的方式，而无需通过 props 逐层传递。它适用于"全局"数据，如当前用户、主题或语言设置。

## 核心 API

```tsx
import { createContext, useContext } from 'react';

// 1. 创建 Context
const ThemeContext = createContext<Theme>('light');

// 2. 提供 Context
<ThemeContext.Provider value={theme}>
  <App />
</ThemeContext.Provider>

// 3. 消费 Context
const theme = useContext(ThemeContext);
```

## 为什么需要 Context？

解决 **Prop Drilling**（属性透传）问题：

```tsx
// ❌ Prop Drilling - 中间组件不需要 theme 但必须传递
function App() {
  const theme = 'dark';
  return <Layout theme={theme} />;
}

function Layout({ theme }) {
  return <Sidebar theme={theme} />;
}

function Sidebar({ theme }) {
  return <Button theme={theme} />;
}

// ✅ 使用 Context - 直接访问
function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>...</button>;
}
```

## 基本用法

### 1. 创建 Context

```tsx
import { createContext } from 'react';

interface User {
  name: string;
  email: string;
}

// 提供默认值
const UserContext = createContext<User | null>(null);
```

### 2. 提供 Context

```tsx
function App() {
  const [user, setUser] = useState<User>({
    name: '张三',
    email: 'zhang@example.com'
  });

  return (
    <UserContext.Provider value={user}>
      <MainContent />
    </UserContext.Provider>
  );
}
```

### 3. 消费 Context

```tsx
function UserProfile() {
  const user = useContext(UserContext);

  if (!user) {
    return <div>请登录</div>;
  }

  return (
    <div>
      <p>{user.name}</p>
      <p>{user.email}</p>
    </div>
  );
}
```

## 完整示例：主题切换

```tsx
// ThemeContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

## 多个 Context 组合

```tsx
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LocaleProvider>
          <Router />
        </LocaleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

// 组件中使用多个 Context
function Dashboard() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { locale } = useLocale();

  return <div>...</div>;
}
```

## Context 与 Reducer 结合

```tsx
// 适合复杂状态管理
interface State {
  count: number;
  step: number;
}

type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'setStep'; payload: number };

const CounterContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function counterReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

function CounterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, step: 1 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
}
```

## 性能优化

### 1. 拆分 Context

```tsx
// ❌ 单一大 Context - 任何变化都触发所有消费者重渲染
const AppContext = createContext({ user, theme, locale, ... });

// ✅ 拆分为多个 Context
const UserContext = createContext(user);
const ThemeContext = createContext(theme);
const LocaleContext = createContext(locale);
```

### 2. 使用 useMemo 优化 value

```tsx
function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');

  // ✅ 记忆化 value 对象
  const value = useMemo(
    () => ({ user, setUser, theme, setTheme }),
    [user, theme]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
```

### 3. 拆分状态和调度

```tsx
// 状态和调度函数分开，避免不必要的重渲染
const StateContext = createContext<State>(initialState);
const DispatchContext = createContext<Dispatch<Action>>(() => {});

// 只需要调度的组件不会因状态变化而重渲染
function AddButton() {
  const dispatch = useContext(DispatchContext);
  return <button onClick={() => dispatch({ type: 'add' })}>添加</button>;
}
```

## 默认值的作用

```tsx
// 默认值在没有 Provider 包裹时使用
const ThemeContext = createContext<Theme>('light');

// 这个组件即使没有 Provider 也能工作
function Button() {
  const theme = useContext(ThemeContext); // 'light'
  return <button className={theme}>...</button>;
}
```

## 与 React 19 use() 配合

```tsx
// React 19 中可以使用 use() 在条件语句中读取 Context
function Component() {
  const [show, setShow] = useState(false);

  if (show) {
    const theme = use(ThemeContext); // React 19+
    return <div className={theme}>...</div>;
  }

  return <button onClick={() => setShow(true)}>显示</button>;
}
```

## 最佳实践

1. **创建自定义 Hook**：封装 useContext，提供更好的错误处理
2. **提供有意义的默认值**：或在没有 Provider 时抛出错误
3. **按职责拆分 Context**：避免单一大 Context
4. **就近原则**：Provider 放在需要的最近公共祖先
5. **考虑性能影响**：Context 变化会导致所有消费者重渲染

## 何时使用 Context vs Props

| 场景 | 建议 |
|------|------|
| 全局主题/语言 | ✅ Context |
| 用户认证状态 | ✅ Context |
| 1-2 层组件传递 | ❌ Props 更简单 |
| 复杂状态管理 | 考虑 Redux/Zustand |
| 频繁更新的数据 | ⚠️ 注意性能 |

## 常见问题

### Context 值变化时所有消费者都重渲染？

是的，这是 Context 的特性。解决方案：
- 拆分 Context
- 使用 useMemo/useCallback
- 考虑状态管理库

### 可以动态创建 Context 吗？

技术上可以，但不推荐。Context 应该在模块作用域创建，保持稳定引用。

## 总结

Context 是 React 内置的状态共享方案：

- 解决 Prop Drilling 问题
- 适合低频更新的全局数据
- 需要注意性能优化
- 可与 useReducer 结合处理复杂状态
