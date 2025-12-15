# 表单处理

## React 表单基础

React 中处理表单有两种主要方式：**受控组件**和**非受控组件**。

```tsx
// 受控组件：React 控制表单值
const [value, setValue] = useState('');
<input value={value} onChange={e => setValue(e.target.value)} />

// 非受控组件：DOM 控制表单值
const inputRef = useRef<HTMLInputElement>(null);
<input ref={inputRef} defaultValue="初始值" />
```

## 受控组件

受控组件的值由 React state 控制，每次输入都会触发状态更新。

### 基本用法

```tsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### 多个输入字段

```tsx
function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      <input name="username" value={formData.username} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
```

## 非受控组件

非受控组件使用 ref 直接访问 DOM 元素的值。

```tsx
function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    console.log(inputRef.current?.value);
  };

  return (
    <>
      <input ref={inputRef} defaultValue="初始值" />
      <button onClick={handleSubmit}>提交</button>
    </>
  );
}
```

## 受控 vs 非受控

| 特性 | 受控组件 | 非受控组件 |
|------|----------|------------|
| 值存储 | React state | DOM |
| 获取值 | 直接使用 state | 通过 ref |
| 即时验证 | ✅ 容易 | ❌ 困难 |
| 条件禁用 | ✅ 容易 | ❌ 困难 |
| 动态输入 | ✅ 容易 | ❌ 困难 |
| 性能 | 每次输入都渲染 | 不触发渲染 |
| 初始值 | value + useState | defaultValue |

## 各类表单元素

### 文本输入

```tsx
<input
  type="text"
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

### 文本域

```tsx
<textarea
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
```

### 选择框

```tsx
<select value={selected} onChange={(e) => setSelected(e.target.value)}>
  <option value="a">选项 A</option>
  <option value="b">选项 B</option>
</select>
```

### 复选框

```tsx
<input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
/>
```

### 单选按钮

```tsx
<input
  type="radio"
  name="option"
  value="a"
  checked={selected === 'a'}
  onChange={(e) => setSelected(e.target.value)}
/>
<input
  type="radio"
  name="option"
  value="b"
  checked={selected === 'b'}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### 多选框

```tsx
<select
  multiple
  value={selectedItems}
  onChange={(e) => {
    const values = Array.from(e.target.selectedOptions, opt => opt.value);
    setSelectedItems(values);
  }}
>
  <option value="a">A</option>
  <option value="b">B</option>
  <option value="c">C</option>
</select>
```

## 表单验证

### 即时验证

```tsx
function ValidatedInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.includes('@')) {
      setError('请输入有效的邮箱地址');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input value={email} onChange={handleChange} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 提交时验证

```tsx
function Form() {
  const [data, setData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!data.email) {
      newErrors.email = '邮箱不能为空';
    } else if (!data.email.includes('@')) {
      newErrors.email = '邮箱格式不正确';
    }

    if (!data.password) {
      newErrors.password = '密码不能为空';
    } else if (data.password.length < 6) {
      newErrors.password = '密码至少 6 位';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // 提交表单
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 表单字段 */}
    </form>
  );
}
```

## React 19 表单 Actions

React 19 引入了新的表单处理方式：

### useActionState

```tsx
import { useActionState } from 'react';

function Form() {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const email = formData.get('email');
      // 处理提交
      return { success: true };
    },
    { success: false }
  );

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <button disabled={isPending}>
        {isPending ? '提交中...' : '提交'}
      </button>
    </form>
  );
}
```

### useFormStatus

```tsx
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending}>
      {pending ? '提交中...' : '提交'}
    </button>
  );
}
```

## 表单库推荐

对于复杂表单，推荐使用表单库：

### React Hook Form

```tsx
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: '邮箱必填' })} />
      {errors.email && <span>{errors.email.message}</span>}
      <button type="submit">提交</button>
    </form>
  );
}
```

## 最佳实践

### 1. 优先使用受控组件

```tsx
// ✅ 推荐：受控组件更可预测
const [value, setValue] = useState('');
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### 2. 统一处理多字段

```tsx
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value
  }));
};
```

### 3. 禁用提交按钮

```tsx
<button
  type="submit"
  disabled={!isValid || isSubmitting}
>
  {isSubmitting ? '提交中...' : '提交'}
</button>
```

### 4. 阻止重复提交

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};
```

## 总结

| 概念 | 说明 |
|------|------|
| 受控组件 | value + onChange，React 控制 |
| 非受控组件 | ref + defaultValue，DOM 控制 |
| 表单验证 | 即时验证或提交时验证 |
| useActionState | React 19 表单 action |
| useFormStatus | 获取表单提交状态 |
| 表单库 | 复杂表单使用 React Hook Form |
