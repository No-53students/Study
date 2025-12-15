# 条件渲染

## 什么是条件渲染？

条件渲染是指根据条件决定渲染哪些内容。在 React 中，你可以使用 JavaScript 的条件语句来实现。

```tsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>欢迎回来!</h1>;
  }
  return <h1>请登录</h1>;
}
```

## 条件渲染的方式

### 1. if/else 语句

```tsx
function Message({ type }) {
  if (type === 'success') {
    return <div className="success">成功!</div>;
  } else if (type === 'error') {
    return <div className="error">错误!</div>;
  } else {
    return <div className="info">信息</div>;
  }
}
```

### 2. 三元运算符 (? :)

```tsx
function Status({ isOnline }) {
  return (
    <span className={isOnline ? 'online' : 'offline'}>
      {isOnline ? '在线' : '离线'}
    </span>
  );
}
```

### 3. 逻辑与 (&&)

```tsx
function Notification({ count }) {
  return (
    <div>
      {count > 0 && <span className="badge">{count}</span>}
    </div>
  );
}
```

### 4. 逻辑或 (||) 和空值合并 (??)

```tsx
function UserName({ name }) {
  return <span>{name || '匿名用户'}</span>;
}

function DisplayValue({ value }) {
  return <span>{value ?? '未设置'}</span>;
}
```

### 5. 提前返回

```tsx
function UserProfile({ user }) {
  if (!user) {
    return <div>用户不存在</div>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

## 各方式对比

| 方式 | 适用场景 | 示例 |
|------|----------|------|
| if/else | 复杂条件，多个分支 | 多种状态显示 |
| 三元运算符 | 二选一 | 在线/离线状态 |
| && | 有/无 | 显示/隐藏徽章 |
| \|\| | 提供默认值 | 用户名 \|\| '匿名' |
| ?? | 处理 null/undefined | value ?? '默认' |
| 提前返回 | 边界条件检查 | 空数据处理 |

## && 运算符的陷阱

### 问题：0 会被渲染

```tsx
// ❌ 当 count 为 0 时，会渲染 "0"
function BadExample({ count }) {
  return <div>{count && <span>{count} 条消息</span>}</div>;
}

// ✅ 显式转换为布尔值
function GoodExample({ count }) {
  return <div>{count > 0 && <span>{count} 条消息</span>}</div>;
}

// ✅ 或使用三元运算符
function AlsoGood({ count }) {
  return <div>{count ? <span>{count} 条消息</span> : null}</div>;
}
```

### 原因

JavaScript 中 `&&` 返回第一个假值或最后一个值：
- `0 && 'hello'` → `0`（0 是假值）
- `1 && 'hello'` → `'hello'`
- `'' && 'hello'` → `''`（空字符串是假值）

## 条件渲染组件

### 显示/隐藏组件

```tsx
function Modal({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">{children}</div>
    </div>
  );
}
```

### 条件样式

```tsx
function Button({ isActive, children }) {
  return (
    <button className={isActive ? 'btn-active' : 'btn-inactive'}>
      {children}
    </button>
  );
}

// 使用 clsx 库（推荐）
import clsx from 'clsx';

function Button({ isActive, isDisabled, children }) {
  return (
    <button
      className={clsx('btn', {
        'btn-active': isActive,
        'btn-disabled': isDisabled,
      })}
    >
      {children}
    </button>
  );
}
```

### 条件属性

```tsx
function Input({ error, ...props }) {
  return (
    <input
      {...props}
      aria-invalid={error ? true : undefined}
      className={error ? 'input-error' : 'input'}
    />
  );
}
```

## 列表中的条件渲染

```tsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.completed ? (
            <s>{todo.text}</s>
          ) : (
            <span>{todo.text}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
```

## 封装条件组件

### Show 组件

```tsx
function Show({ when, fallback = null, children }) {
  return when ? children : fallback;
}

// 使用
<Show when={isLoggedIn} fallback={<LoginButton />}>
  <Dashboard />
</Show>
```

### Switch 组件

```tsx
function Switch({ value, cases }) {
  return cases[value] || cases.default || null;
}

// 使用
<Switch
  value={status}
  cases={{
    loading: <Spinner />,
    error: <Error />,
    success: <Success />,
    default: <Empty />
  }}
/>
```

## 最佳实践

### 1. 选择合适的方式

```tsx
// ✅ 简单二选一用三元
{isLoggedIn ? <Logout /> : <Login />}

// ✅ 有或无用 &&
{hasError && <ErrorMessage />}

// ✅ 复杂逻辑用 if/else
function ComplexComponent({ status }) {
  if (status === 'loading') return <Loading />;
  if (status === 'error') return <Error />;
  return <Content />;
}
```

### 2. 避免嵌套三元

```tsx
// ❌ 难以阅读
{a ? <A /> : b ? <B /> : c ? <C /> : <D />}

// ✅ 使用 if/else 或提取函数
function renderContent(a, b, c) {
  if (a) return <A />;
  if (b) return <B />;
  if (c) return <C />;
  return <D />;
}
```

### 3. 提前返回处理边界情况

```tsx
function UserProfile({ user, loading, error }) {
  if (loading) return <Skeleton />;
  if (error) return <Error message={error} />;
  if (!user) return <NotFound />;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.bio}</p>
    </div>
  );
}
```

### 4. 避免不必要的重复

```tsx
// ❌ 重复代码
{isAdmin ? (
  <Layout>
    <AdminPanel />
  </Layout>
) : (
  <Layout>
    <UserPanel />
  </Layout>
)}

// ✅ 只有不同的部分条件渲染
<Layout>
  {isAdmin ? <AdminPanel /> : <UserPanel />}
</Layout>
```

## 总结

| 方式 | 语法 | 使用场景 |
|------|------|----------|
| if/else | `if (a) return <A />` | 复杂条件 |
| 三元运算符 | `a ? <A /> : <B />` | 二选一 |
| && | `a && <A />` | 有或无 |
| \|\|/??| `a \|\| <Default />` | 默认值 |
| 提前返回 | `if (!a) return null` | 边界处理 |
