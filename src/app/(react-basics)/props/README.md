# Props 详解

## 什么是 Props？

Props（Properties 的缩写）是 React 组件之间**传递数据**的方式。它们是从父组件传递给子组件的**只读数据**。

```tsx
// 父组件传递 props
<Greeting name="Alice" age={25} />

// 子组件接收 props
function Greeting({ name, age }) {
  return <p>{name} is {age} years old</p>;
}
```

## Props 的特点

### 1. 只读（Immutable）

```tsx
// ❌ 错误：不能修改 props
function BadComponent({ count }) {
  count = count + 1;  // 这是错误的！
  return <div>{count}</div>;
}

// ✅ 正确：使用 state 来管理可变数据
function GoodComponent({ initialCount }) {
  const [count, setCount] = useState(initialCount);
  return <div>{count}</div>;
}
```

### 2. 单向数据流

数据只能从父组件流向子组件，不能反向传递：

```
父组件 → props → 子组件
```

### 3. 任意类型

Props 可以是任何 JavaScript 值：

```tsx
<Component
  string="hello"           // 字符串
  number={42}              // 数字
  boolean={true}           // 布尔值
  array={[1, 2, 3]}        // 数组
  object={{ a: 1 }}        // 对象
  func={() => {}}          // 函数
  node={<div>JSX</div>}    // React 元素
/>
```

## 基本用法

### 传递 Props

```tsx
// 单个属性
<Avatar name="Alice" />

// 多个属性
<UserCard name="Alice" age={25} role="admin" />

// 展开对象
const user = { name: "Alice", age: 25 };
<UserCard {...user} />
```

### 接收 Props

```tsx
// 方式 1：解构（推荐）
function Avatar({ name, size = 40 }) {
  return <img alt={name} width={size} />;
}

// 方式 2：props 对象
function Avatar(props) {
  return <img alt={props.name} width={props.size} />;
}
```

## TypeScript 类型定义

### 基本类型

```tsx
interface ButtonProps {
  // 必需属性
  label: string;
  onClick: () => void;

  // 可选属性（?）
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
}

function Button({ label, onClick, disabled = false, size = 'medium' }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled} className={size}>
      {label}
    </button>
  );
}
```

### 常见类型

```tsx
interface ExampleProps {
  // 基础类型
  name: string;
  age: number;
  isActive: boolean;

  // 数组
  items: string[];
  users: User[];

  // 对象
  config: { theme: string; lang: string };

  // 函数
  onClick: () => void;
  onChange: (value: string) => void;
  onSubmit: (data: FormData) => Promise<void>;

  // React 相关
  children: React.ReactNode;
  element: React.ReactElement;
  style: React.CSSProperties;
  className: string;

  // 联合类型
  status: 'loading' | 'success' | 'error';

  // 泛型
  data: T;
}
```

## 默认值

### 使用解构默认值（推荐）

```tsx
interface Props {
  name: string;
  size?: number;
  color?: string;
}

function Avatar({ name, size = 40, color = 'blue' }: Props) {
  return (
    <div style={{ width: size, height: size, backgroundColor: color }}>
      {name}
    </div>
  );
}

// 使用
<Avatar name="Alice" />  // size=40, color='blue'
<Avatar name="Bob" size={60} />  // size=60, color='blue'
```

### 使用 defaultProps（不推荐）

```tsx
// 旧方式，TypeScript 支持不好
function Avatar({ name, size, color }) {
  return <div>{name}</div>;
}

Avatar.defaultProps = {
  size: 40,
  color: 'blue'
};
```

## 特殊 Props

### children

`children` 是一个特殊的 prop，表示组件的子元素：

```tsx
// 定义接收 children 的组件
function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">{children}</div>
    </div>
  );
}

// 使用
<Card title="Hello">
  <p>This is the content</p>
  <button>Click me</button>
</Card>
```

### key

`key` 是 React 用于列表渲染的特殊属性，不会传递给组件：

```tsx
// key 不会作为 props 传递
{items.map(item => (
  <Item key={item.id} data={item} />
))}

// 在 Item 组件中无法访问 key
function Item({ data }) {
  // props.key 是 undefined
  return <div>{data.name}</div>;
}
```

### ref

`ref` 也是特殊属性，需要使用 `forwardRef` 转发：

```tsx
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

## Props 传递模式

### 1. 透传 Props

```tsx
// 将所有 props 透传给子元素
function Button({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}

// 使用时可以传递任意 button 属性
<Button onClick={handleClick} disabled className="primary">
  Click me
</Button>
```

### 2. 选择性传递

```tsx
function CustomInput({ label, error, ...inputProps }: CustomInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 3. 回调函数传递

```tsx
// 父组件
function Parent() {
  const handleChange = (value: string) => {
    console.log('Value changed:', value);
  };

  return <Child onChange={handleChange} />;
}

// 子组件
function Child({ onChange }: { onChange: (value: string) => void }) {
  return (
    <input onChange={(e) => onChange(e.target.value)} />
  );
}
```

## 验证 Props

### 使用 TypeScript（推荐）

TypeScript 在编译时就能检查类型错误：

```tsx
interface UserProps {
  name: string;
  age: number;
}

function User({ name, age }: UserProps) {
  return <div>{name}: {age}</div>;
}

// ❌ 编译错误：age 应该是 number
<User name="Alice" age="25" />
```

### 使用 PropTypes（JavaScript）

```tsx
import PropTypes from 'prop-types';

function User({ name, age }) {
  return <div>{name}: {age}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
};
```

## 最佳实践

### 1. 保持 Props 简洁

```tsx
// ❌ 过多 props
<UserCard
  firstName="Alice"
  lastName="Smith"
  email="alice@example.com"
  avatar="..."
  role="admin"
  department="Engineering"
  joinDate="2024-01-01"
/>

// ✅ 使用对象
<UserCard user={userData} />
```

### 2. 使用解构和默认值

```tsx
// ✅ 清晰的 props 定义
function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
}: ButtonProps) {
  // ...
}
```

### 3. 类型定义清晰

```tsx
// ✅ 清晰的接口定义
interface CardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片内容 */
  children: React.ReactNode;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 点击事件 */
  onClick?: () => void;
}
```

### 4. 避免 props 钻取

当 props 需要经过多层组件传递时，考虑使用 Context：

```tsx
// ❌ Props 钻取
<App user={user}>
  <Layout user={user}>
    <Sidebar user={user}>
      <UserInfo user={user} />
    </Sidebar>
  </Layout>
</App>

// ✅ 使用 Context
<UserContext.Provider value={user}>
  <App>
    <Layout>
      <Sidebar>
        <UserInfo />  {/* 直接从 Context 获取 user */}
      </Sidebar>
    </Layout>
  </App>
</UserContext.Provider>
```

## 总结

| 概念 | 说明 |
|------|------|
| Props | 组件间传递数据的方式 |
| 只读性 | Props 不能被修改 |
| 单向流动 | 只能从父到子 |
| 默认值 | 使用解构默认值 |
| children | 特殊 prop，表示子元素 |
| TypeScript | 推荐使用类型定义 |
| 透传 | 使用 `...rest` 传递剩余属性 |
