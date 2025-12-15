# useReducer Hook 详解

> **难度等级：** ⭐⭐ 进阶
>
> **本示例中使用的其他 Hook/API：**
> - `useState` - 用于对比演示

## 什么是 useReducer？

`useReducer` 是 `useState` 的替代方案，用于管理**复杂的状态逻辑**。它借鉴了 Redux 的设计理念，通过 reducer 函数来更新状态。

```tsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## 为什么需要 useReducer？

### 当 useState 变得复杂时

```tsx
// ❌ useState 管理复杂状态变得混乱
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // 状态更新逻辑分散在各处...
}
```

### useReducer 集中管理状态逻辑

```tsx
// ✅ useReducer 将所有状态逻辑集中在 reducer 中
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.text, completed: false }]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.id ? { ...t, completed: !t.completed } : t
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.id)
      };
    default:
      return state;
  }
}

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // 触发状态更新
  dispatch({ type: 'ADD_TODO', text: '学习 React' });
}
```

## 基本语法

```tsx
const [state, dispatch] = useReducer(reducer, initialArg, init?);
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `reducer` | `(state, action) => newState` 纯函数 |
| `initialArg` | 初始状态或惰性初始化的参数 |
| `init` | 可选的初始化函数 |

### 返回值

| 返回值 | 说明 |
|--------|------|
| `state` | 当前状态 |
| `dispatch` | 触发 action 的函数 |

## Reducer 函数

Reducer 是一个**纯函数**，接收当前状态和 action，返回新状态：

```tsx
function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'SET':
      return { count: action.value };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}
```

### Reducer 的规则

1. **纯函数**：相同输入必须返回相同输出
2. **不修改原状态**：必须返回新对象
3. **不执行副作用**：不能调用 API、修改外部变量等

```tsx
// ❌ 错误：直接修改状态
function reducer(state, action) {
  state.count++; // 直接修改
  return state;
}

// ✅ 正确：返回新对象
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

## Action 的设计

Action 是描述"发生了什么"的对象：

```tsx
// 简单 action
dispatch({ type: 'INCREMENT' });

// 带数据的 action
dispatch({ type: 'SET', value: 10 });
dispatch({ type: 'ADD_TODO', text: '学习 React' });

// 复杂 action
dispatch({
  type: 'UPDATE_USER',
  payload: {
    id: 1,
    name: 'John',
    email: 'john@example.com'
  }
});
```

### Action 类型定义（TypeScript）

```tsx
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; value: number }
  | { type: 'RESET' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'SET':
      return { count: action.value }; // TypeScript 知道这里有 value
    // ...
  }
}
```

## 惰性初始化

当初始状态需要计算时，可以使用第三个参数：

```tsx
function init(initialCount) {
  return { count: initialCount };
}

function Counter({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  // ...
}
```

这样可以：
1. 将初始化逻辑提取到 reducer 外部
2. 方便实现重置功能
3. 避免每次渲染都计算初始值

## 使用场景

### 场景 1: 复杂状态对象

```tsx
interface FormState {
  values: { name: string; email: string; password: string };
  errors: { name?: string; email?: string; password?: string };
  isSubmitting: boolean;
  isValid: boolean;
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; error: string }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: undefined }
      };
    case 'SUBMIT_START':
      return { ...state, isSubmitting: true };
    // ...
  }
}
```

### 场景 2: 状态机

```tsx
type FetchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: Data }
  | { status: 'error'; error: string };

function fetchReducer(state: FetchState, action: Action): FetchState {
  switch (action.type) {
    case 'FETCH_START':
      return { status: 'loading' };
    case 'FETCH_SUCCESS':
      return { status: 'success', data: action.data };
    case 'FETCH_ERROR':
      return { status: 'error', error: action.error };
    default:
      return state;
  }
}
```

### 场景 3: 撤销/重做

```tsx
interface HistoryState {
  past: State[];
  present: State;
  future: State[];
}

function undoReducer(state: HistoryState, action: Action): HistoryState {
  switch (action.type) {
    case 'UNDO':
      if (state.past.length === 0) return state;
      return {
        past: state.past.slice(0, -1),
        present: state.past[state.past.length - 1],
        future: [state.present, ...state.future]
      };
    case 'REDO':
      if (state.future.length === 0) return state;
      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1)
      };
    default:
      return {
        past: [...state.past, state.present],
        present: innerReducer(state.present, action),
        future: []
      };
  }
}
```

## useState vs useReducer

| 场景 | 推荐 |
|------|------|
| 简单状态（数字、字符串、布尔） | useState |
| 对象/数组状态 | 都可以 |
| 多个相关状态 | useReducer |
| 状态更新依赖其他状态 | useReducer |
| 复杂更新逻辑 | useReducer |
| 状态机 | useReducer |
| 需要传递更新函数给子组件 | useReducer |

### 转换示例

```tsx
// useState 版本
const [count, setCount] = useState(0);
const increment = () => setCount(c => c + 1);
const decrement = () => setCount(c => c - 1);
const reset = () => setCount(0);

// useReducer 版本
const [state, dispatch] = useReducer(reducer, { count: 0 });
const increment = () => dispatch({ type: 'INCREMENT' });
const decrement = () => dispatch({ type: 'DECREMENT' });
const reset = () => dispatch({ type: 'RESET' });
```

## 配合 Context 使用

将 dispatch 通过 Context 传递，可以实现全局状态管理：

```tsx
const StateContext = createContext(null);
const DispatchContext = createContext(null);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// 使用
function Component() {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
}
```

## 最佳实践

### 1. 为 action type 使用常量

```tsx
const ACTIONS = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT',
  RESET: 'RESET'
} as const;

dispatch({ type: ACTIONS.INCREMENT });
```

### 2. 创建 action creator

```tsx
const addTodo = (text: string) => ({ type: 'ADD_TODO' as const, text });
const toggleTodo = (id: number) => ({ type: 'TOGGLE_TODO' as const, id });

dispatch(addTodo('学习 React'));
```

### 3. 使用 Immer 简化不可变更新

```tsx
import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_TODO':
        draft.todos.push({ id: Date.now(), text: action.text });
        break;
      case 'TOGGLE_TODO':
        const todo = draft.todos.find(t => t.id === action.id);
        if (todo) todo.completed = !todo.completed;
        break;
    }
  });
}
```

## 总结

| 特性 | 说明 |
|------|------|
| 用途 | 管理复杂状态逻辑 |
| 语法 | `const [state, dispatch] = useReducer(reducer, initialState)` |
| Reducer | 纯函数 `(state, action) => newState` |
| Action | 描述事件的对象 `{ type: 'ACTION_TYPE', ...data }` |
| Dispatch | 触发状态更新 `dispatch({ type: 'ACTION_TYPE' })` |
