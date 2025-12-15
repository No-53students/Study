# useFormStatus Hook 详解

## 什么是 useFormStatus？

`useFormStatus` 是 React 19 (react-dom) 引入的 Hook，用于**获取父级表单的提交状态**。它让子组件能够知道表单是否正在提交。

```tsx
import { useFormStatus } from 'react-dom';

const { pending, data, method, action } = useFormStatus();
```

## 为什么需要 useFormStatus？

### 问题场景：表单状态传递

传统方式需要通过 props 层层传递表单状态：

```tsx
// ❌ 需要通过 props 传递状态
function SubmitButton({ isSubmitting }) {
  return (
    <button disabled={isSubmitting}>
      {isSubmitting ? '提交中...' : '提交'}
    </button>
  );
}

function Form() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form>
      {/* 需要传递 isSubmitting */}
      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
```

### useFormStatus 解决方案

```tsx
// ✅ 子组件自动获取表单状态
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}

function Form() {
  return (
    <form action={submitAction}>
      <SubmitButton /> {/* 无需传递 props */}
    </form>
  );
}
```

## 基本语法

```tsx
import { useFormStatus } from 'react-dom';

const status = useFormStatus();
```

### 返回值

| 属性 | 类型 | 说明 |
|------|------|------|
| `pending` | `boolean` | 表单是否正在提交 |
| `data` | `FormData \| null` | 提交的表单数据 |
| `method` | `string` | 表单的 HTTP 方法 |
| `action` | `function` | 表单的 action 函数 |

## 重要规则

⚠️ **必须在 `<form>` 的子组件中使用**

```tsx
// ❌ 错误：在同一组件中使用
function Form() {
  const { pending } = useFormStatus(); // 不会工作！

  return (
    <form action={action}>
      <button disabled={pending}>提交</button>
    </form>
  );
}

// ✅ 正确：在子组件中使用
function SubmitButton() {
  const { pending } = useFormStatus(); // 正确！
  return <button disabled={pending}>提交</button>;
}

function Form() {
  return (
    <form action={action}>
      <SubmitButton />
    </form>
  );
}
```

## 使用场景

### 场景 1：提交按钮

```tsx
function SubmitButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? 'opacity-50' : ''}
    >
      {pending ? (
        <>
          <Spinner /> 提交中...
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

### 场景 2：禁用表单输入

```tsx
function FormInput({ name, label, ...props }) {
  const { pending } = useFormStatus();

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        disabled={pending}
        {...props}
      />
    </div>
  );
}
```

### 场景 3：显示提交数据

```tsx
function SubmitPreview() {
  const { pending, data } = useFormStatus();

  if (!pending || !data) return null;

  return (
    <div className="preview">
      <p>正在提交以下数据：</p>
      <ul>
        {Array.from(data.entries()).map(([key, value]) => (
          <li key={key}>{key}: {String(value)}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 场景 4：进度指示器

```tsx
function FormProgress() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="progress-overlay">
      <div className="spinner" />
      <p>正在处理您的请求...</p>
    </div>
  );
}
```

### 场景 5：配合 Server Actions

```tsx
// actions.ts
'use server';

export async function submitForm(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');

  // 模拟服务器处理
  await new Promise(resolve => setTimeout(resolve, 2000));

  // 处理数据...
  return { success: true };
}

// Form.tsx
'use client';

import { submitForm } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}

export function ContactForm() {
  return (
    <form action={submitForm}>
      <input name="name" placeholder="姓名" />
      <input name="email" placeholder="邮箱" />
      <SubmitButton />
    </form>
  );
}
```

## 完整表单示例

```tsx
'use client';

import { useFormStatus } from 'react-dom';

// 提交按钮组件
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="submit-button"
    >
      {pending ? '处理中...' : '注册'}
    </button>
  );
}

// 输入框组件
function FormField({ name, label, type = 'text' }) {
  const { pending } = useFormStatus();

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        disabled={pending}
        required
      />
    </div>
  );
}

// 加载提示
function LoadingOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="loading-overlay">
      <div className="spinner" />
      <p>正在处理您的注册...</p>
    </div>
  );
}

// 主表单
export function RegistrationForm() {
  async function handleSubmit(formData: FormData) {
    await fetch('/api/register', {
      method: 'POST',
      body: formData,
    });
  }

  return (
    <form action={handleSubmit} className="registration-form">
      <LoadingOverlay />

      <FormField name="username" label="用户名" />
      <FormField name="email" label="邮箱" type="email" />
      <FormField name="password" label="密码" type="password" />

      <SubmitButton />
    </form>
  );
}
```

## 与 useActionState 配合

`useFormStatus` 通常与 `useActionState` (原 useFormState) 配合使用：

```tsx
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? '...' : '提交'}</button>;
}

export function Form() {
  const [state, action] = useActionState(serverAction, null);

  return (
    <form action={action}>
      <input name="email" />
      {state?.error && <p className="error">{state.error}</p>}
      <SubmitButton />
    </form>
  );
}
```

## 最佳实践

### 1. 抽取可复用的表单组件

```tsx
// 可复用的提交按钮
export function FormSubmitButton({
  children,
  pendingText = '提交中...'
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? pendingText : children}
    </button>
  );
}

// 可复用的输入框
export function FormInput(props) {
  const { pending } = useFormStatus();
  return <input {...props} disabled={pending || props.disabled} />;
}
```

### 2. 提供视觉反馈

```tsx
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`
        transition-all duration-200
        ${pending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}
      `}
    >
      {pending && <Spinner className="mr-2" />}
      {pending ? '处理中...' : '提交'}
    </button>
  );
}
```

## 常见错误

### 错误 1：在表单同级使用

```tsx
// ❌ 错误：必须在 form 的子组件中
function Page() {
  const { pending } = useFormStatus(); // 永远是 false

  return (
    <form action={action}>
      <button disabled={pending}>提交</button>
    </form>
  );
}
```

### 错误 2：没有使用 action

```tsx
// ❌ 错误：onSubmit 不会触发 pending
<form onSubmit={handleSubmit}>
  <SubmitButton /> {/* pending 永远是 false */}
</form>

// ✅ 正确：使用 action
<form action={handleSubmit}>
  <SubmitButton /> {/* pending 正常工作 */}
</form>
```

## 总结

| 使用场景 | 实现方式 |
|----------|----------|
| 禁用提交按钮 | `disabled={pending}` |
| 显示加载状态 | `{pending && <Spinner />}` |
| 禁用表单输入 | `disabled={pending}` |
| 显示提交数据 | 使用 `data` 属性 |

`useFormStatus` 是构建用户友好表单的重要工具，配合 React 19 的 form action 模式，可以轻松实现优雅的表单交互。
