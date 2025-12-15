# useActionState Hook 详解

> **本示例中使用的其他 Hook/API：**
> - 使用了自定义的 `useActionState` 实现（位于 `@/hooks/useActionState`）
> - 自定义实现内部使用了：`useState`、`useCallback`、`useRef`、`useTransition`

## 什么是 useActionState？

`useActionState` 是 React 19 新增的 Hook，用于**管理基于 action 的状态更新**。它特别适合处理表单提交、异步操作等场景，能够自动跟踪 pending 状态。

```tsx
const [state, formAction, isPending] = useActionState(action, initialState);
```

## 为什么需要 useActionState？

### 传统方式的痛点

在 React 18 及之前，处理表单提交通常需要这样写：

```tsx
function LoginForm() {
  const [state, setState] = useState({ error: null, success: false });
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.target);
      const result = await loginAPI(formData);
      setState({ error: null, success: true });
    } catch (error) {
      setState({ error: error.message, success: false });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单内容 */}
      <button disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
```

### useActionState 的优势

```tsx
function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      try {
        await loginAPI(formData);
        return { error: null, success: true };
      } catch (error) {
        return { error: error.message, success: false };
      }
    },
    { error: null, success: false }
  );

  return (
    <form action={formAction}>
      {/* 表单内容 */}
      <button disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
```

优势：
1. **更简洁**：不需要手动管理 pending 状态
2. **更安全**：状态更新是原子的
3. **支持渐进增强**：配合 Server Actions 可在无 JS 时工作
4. **自动处理并发**：多次提交时自动处理

## 基本语法

```tsx
const [state, action, isPending] = useActionState(actionFn, initialState, permalink?);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `actionFn` | `(prevState, payload) => newState` | action 函数，接收上一个状态和载荷，返回新状态 |
| `initialState` | `any` | 初始状态值 |
| `permalink` | `string` (可选) | 用于渐进增强的 URL |

### 返回值

| 返回值 | 说明 |
|--------|------|
| `state` | 当前状态 |
| `action` | 传递给表单或调用的 action 函数 |
| `isPending` | 是否正在执行中 |

## 使用场景

### 场景 1：表单提交

```tsx
async function submitForm(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  // 验证
  if (!email || !password) {
    return { error: '请填写所有字段', success: false };
  }

  // 调用 API
  try {
    await api.login({ email, password });
    return { error: null, success: true };
  } catch (e) {
    return { error: e.message, success: false };
  }
}

function LoginForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    error: null,
    success: false
  });

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />

      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">登录成功！</p>}

      <button disabled={isPending}>
        {isPending ? '登录中...' : '登录'}
      </button>
    </form>
  );
}
```

### 场景 2：非表单场景

`useActionState` 不仅限于表单，也可以用于任何需要 action + 状态的场景：

```tsx
async function counterAction(prevState, delta) {
  // 模拟异步操作
  await new Promise(resolve => setTimeout(resolve, 500));
  return { count: prevState.count + delta };
}

function Counter() {
  const [state, dispatch, isPending] = useActionState(counterAction, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch(1)} disabled={isPending}>+1</button>
      <button onClick={() => dispatch(-1)} disabled={isPending}>-1</button>
      {isPending && <span>更新中...</span>}
    </div>
  );
}
```

### 场景 3：配合 Server Actions

```tsx
// app/actions.ts
'use server'

export async function createPost(prevState, formData) {
  const title = formData.get('title');
  const content = formData.get('content');

  try {
    await db.posts.create({ title, content });
    revalidatePath('/posts');
    return { error: null, success: true };
  } catch (e) {
    return { error: '创建失败', success: false };
  }
}

// app/new-post/page.tsx
'use client'

import { createPost } from './actions';

function NewPostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {
    error: null,
    success: false
  });

  return (
    <form action={formAction}>
      <input name="title" placeholder="标题" />
      <textarea name="content" placeholder="内容" />
      <button disabled={isPending}>发布</button>
    </form>
  );
}
```

## action 函数详解

### 函数签名

```tsx
async function action(
  prevState: State,    // 上一次的状态
  payload: Payload     // 载荷（FormData 或自定义数据）
): Promise<State> {    // 返回新状态
  // ...
}
```

### 表单场景

当用于 `<form action={formAction}>` 时，payload 自动是 `FormData`：

```tsx
async function action(prevState, formData: FormData) {
  const name = formData.get('name');
  // ...
}
```

### 非表单场景

直接调用时，可以传递任意载荷：

```tsx
async function action(prevState, payload: { type: string; value: number }) {
  switch (payload.type) {
    case 'increment':
      return { count: prevState.count + payload.value };
    case 'decrement':
      return { count: prevState.count - payload.value };
  }
}

// 使用
dispatch({ type: 'increment', value: 5 });
```

## 与其他 Hook 的对比

### useActionState vs useState + 手动管理

| 特性 | useState + 手动管理 | useActionState |
|------|---------------------|----------------|
| 代码量 | 较多 | 较少 |
| pending 状态 | 需手动管理 | 自动提供 |
| 错误处理 | 需手动 try/catch | 集成在 action 中 |
| 渐进增强 | 不支持 | 支持 |
| 并发处理 | 需手动处理 | 自动处理 |

### useActionState vs useReducer

| 特性 | useReducer | useActionState |
|------|------------|----------------|
| 设计目的 | 同步状态管理 | 异步 action 处理 |
| 异步支持 | 不直接支持 | 原生支持 |
| pending 状态 | 无 | 自动提供 |
| 适用场景 | 复杂同步逻辑 | 表单/API 调用 |

### useActionState vs useTransition

| 特性 | useTransition | useActionState |
|------|---------------|----------------|
| 返回值 | `[isPending, startTransition]` | `[state, action, isPending]` |
| 状态管理 | 不管理状态 | 管理状态 |
| 主要用途 | 标记非紧急更新 | action + 状态 |

## 最佳实践

### 1. 状态设计

将状态设计得既包含数据，也包含错误信息：

```tsx
interface FormState {
  data: User | null;
  error: string | null;
  success: boolean;
}

const initialState: FormState = {
  data: null,
  error: null,
  success: false
};
```

### 2. 错误处理

在 action 中统一处理错误，返回错误状态而不是抛出异常：

```tsx
async function action(prevState, formData) {
  try {
    const result = await api.submit(formData);
    return { data: result, error: null, success: true };
  } catch (e) {
    // 返回错误状态，而不是抛出
    return { ...prevState, error: e.message, success: false };
  }
}
```

### 3. 表单重置

成功后重置表单：

```tsx
function Form() {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return <form ref={formRef} action={formAction}>...</form>;
}
```

### 4. 乐观更新

配合 `useOptimistic` 实现乐观更新：

```tsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const [, formAction] = useActionState(async (prevState, formData) => {
    const text = formData.get('text');
    addOptimistic({ id: Date.now(), text, pending: true });

    const newTodo = await api.createTodo(text);
    setTodos(prev => [...prev, newTodo]);
  }, null);

  return (
    <form action={formAction}>
      <input name="text" />
      <button>添加</button>
      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
}
```

## 常见问题

### Q: action 可以是同步函数吗？

可以，但通常用于异步场景。同步场景用 `useReducer` 更合适。

### Q: 如何在 action 外部访问 formData？

可以通过闭包或在组件中预处理：

```tsx
function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      // 在这里访问 formData
      console.log(formData.get('name'));
      return { /* ... */ };
    },
    initialState
  );
}
```

### Q: 支持取消请求吗？

目前不直接支持。如需取消，可结合 AbortController：

```tsx
function Form() {
  const abortRef = useRef<AbortController>();

  const [state, formAction] = useActionState(async (prevState, formData) => {
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const result = await fetch('/api', {
        signal: abortRef.current.signal
      });
      return { success: true };
    } catch (e) {
      if (e.name === 'AbortError') return prevState;
      return { error: e.message };
    }
  }, initialState);
}
```

## 总结

`useActionState` 是 React 19 中处理表单和异步操作的首选方案：

| 特性 | 说明 |
|------|------|
| 自动 pending | 无需手动管理加载状态 |
| 状态一体化 | action、状态、pending 统一管理 |
| 类型安全 | 完整的 TypeScript 支持 |
| 渐进增强 | 支持无 JS 降级 |
| Server Actions | 完美配合 Next.js Server Actions |

---

## 附录：自定义实现中使用的 Hook 详解

本示例使用了自定义的 `useActionState` 实现，其内部使用了以下 Hook：

### useState

`useState` 用于存储 action 的状态结果。

```tsx
const [state, setState] = useState<State>(initialState);
```

**在自定义实现中的作用：**
- 存储 action 执行后返回的状态
- 当 action 完成时，通过 `setState(result)` 更新状态

### useCallback

`useCallback` 用于缓存 `dispatch` 函数。

```tsx
const dispatch = useCallback((payload: Payload) => {
  startTransition(async () => {
    const result = await actionRef.current(state, payload);
    setState(result);
  });
}, [state]);
```

**在自定义实现中的作用：**
- 避免每次渲染都创建新的 dispatch 函数
- 确保 dispatch 函数引用稳定，可安全传递给子组件

### useRef

`useRef` 用于存储最新的 action 函数引用。

```tsx
const actionRef = useRef(action);
actionRef.current = action;
```

**在自定义实现中的作用：**
- 避免闭包陷阱，始终使用最新的 action 函数
- 支持 action 函数在组件重渲染时更新
- 不触发重新渲染

### useTransition

`useTransition` 用于管理异步操作的 pending 状态。

```tsx
const [isPending, startTransition] = useTransition();
```

**在自定义实现中的作用：**
- `isPending` - 指示 action 是否正在执行
- `startTransition` - 将状态更新标记为"过渡"优先级，不阻塞用户交互

**useTransition 的特点：**
```tsx
// 使用 startTransition 包裹异步操作
startTransition(async () => {
  // 这里的更新是低优先级的
  // 不会阻塞用户的输入操作
  const result = await fetchData();
  setState(result);
});
```

### 完整的自定义实现结构

```tsx
export function useActionState<State, Payload = FormData>(
  action: ActionFunction<State, Payload>,
  initialState: State
): [State, (payload: Payload) => void, boolean] {
  // 1. 状态存储
  const [state, setState] = useState<State>(initialState);

  // 2. pending 状态管理
  const [isPending, startTransition] = useTransition();

  // 3. action 引用（避免闭包陷阱）
  const actionRef = useRef(action);
  actionRef.current = action;

  // 4. dispatch 函数
  const dispatch = useCallback((payload: Payload) => {
    startTransition(async () => {
      const result = await actionRef.current(state, payload);
      setState(result);
    });
  }, [state]);

  return [state, dispatch, isPending];
}
```

这个实现展示了如何组合多个 React Hook 来构建更复杂的自定义 Hook。
