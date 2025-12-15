# React 组件基础

## 什么是组件？

组件是 React 应用的**核心构建块**。它们是独立、可复用的代码片段，用于描述 UI 的一部分。

```tsx
// 组件就是一个返回 JSX 的函数
function Welcome() {
  return <h1>Hello, React!</h1>;
}
```

## 组件的本质

在 React 中，组件本质上是一个**函数**，它：
1. 接收输入（props）
2. 返回 React 元素（描述 UI 的对象）

```tsx
// 组件 = 函数
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// 使用组件
<Greeting name="Alice" />

// 渲染结果
<h1>Hello, Alice!</h1>
```

## 函数组件 vs 类组件

### 函数组件（推荐）

```tsx
// 现代 React 的主流写法
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// 箭头函数写法
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};
```

### 类组件（已过时）

```tsx
// 旧版写法，了解即可
class Welcome extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 为什么推荐函数组件？

| 特性 | 函数组件 | 类组件 |
|------|----------|--------|
| 代码量 | 少 | 多 |
| 学习曲线 | 平缓 | 陡峭 |
| 使用 Hooks | ✅ | ❌ |
| this 绑定问题 | 无 | 有 |
| 性能优化 | 更容易 | 复杂 |
| 未来发展 | 主流 | 维护模式 |

## 组件命名规则

### 1. 必须大写开头

```tsx
// ✅ 正确：大写开头
function MyButton() { ... }
function UserProfile() { ... }

// ❌ 错误：小写开头会被当作 HTML 标签
function myButton() { ... }  // 会被解析为 <mybutton>
```

### 2. 使用 PascalCase

```tsx
// ✅ 推荐
function UserProfileCard() { ... }
function NavigationMenu() { ... }

// ❌ 不推荐
function User_Profile_Card() { ... }
function navigation_menu() { ... }
```

### 3. 组件名与文件名一致

```
components/
  UserProfile.tsx    → export function UserProfile()
  NavigationMenu.tsx → export function NavigationMenu()
```

## 组件的返回值

### 返回单个元素

```tsx
function Single() {
  return <div>Hello</div>;
}
```

### 返回多个元素（需要包裹）

```tsx
// ✅ 使用 Fragment
function Multiple() {
  return (
    <>
      <h1>Title</h1>
      <p>Content</p>
    </>
  );
}

// ✅ 使用 div 包裹
function Multiple() {
  return (
    <div>
      <h1>Title</h1>
      <p>Content</p>
    </div>
  );
}

// ❌ 错误：返回多个根元素
function Multiple() {
  return (
    <h1>Title</h1>
    <p>Content</p>  // 语法错误！
  );
}
```

### 返回 null（不渲染）

```tsx
function MaybeShow({ show }: { show: boolean }) {
  if (!show) {
    return null;  // 不渲染任何内容
  }
  return <div>Visible!</div>;
}
```

## 组件的组合

组件可以像积木一样组合使用：

```tsx
function Header() {
  return <header>Header</header>;
}

function Content() {
  return <main>Content</main>;
}

function Footer() {
  return <footer>Footer</footer>;
}

// 组合成完整页面
function Page() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
```

## 组件的拆分原则

### 何时拆分组件？

1. **重复代码** - 相同结构出现多次
2. **复杂逻辑** - 单个组件超过 100 行
3. **独立功能** - 可以独立测试和复用
4. **清晰职责** - 每个组件只做一件事

### 拆分示例

```tsx
// ❌ 过于庞大的组件
function UserPage() {
  return (
    <div>
      <div className="avatar">
        <img src={user.avatar} />
        <span>{user.name}</span>
      </div>
      <div className="posts">
        {posts.map(post => (
          <div className="post">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ✅ 拆分后
function Avatar({ user }) {
  return (
    <div className="avatar">
      <img src={user.avatar} />
      <span>{user.name}</span>
    </div>
  );
}

function Post({ post }) {
  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
}

function PostList({ posts }) {
  return (
    <div className="posts">
      {posts.map(post => <Post key={post.id} post={post} />)}
    </div>
  );
}

function UserPage({ user, posts }) {
  return (
    <div>
      <Avatar user={user} />
      <PostList posts={posts} />
    </div>
  );
}
```

## 纯组件概念

React 组件应该像**纯函数**一样工作：

```tsx
// ✅ 纯组件：相同输入，相同输出
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {name}!</h1>;
}

// ❌ 不纯：依赖外部变量
let count = 0;
function Counter() {
  count++;  // 副作用！
  return <div>{count}</div>;
}

// ❌ 不纯：修改 props
function BadComponent({ items }) {
  items.push('new item');  // 修改了 props！
  return <ul>{items.map(i => <li>{i}</li>)}</ul>;
}
```

### 纯组件的好处

1. **可预测** - 相同输入总是相同输出
2. **可测试** - 容易编写单元测试
3. **可缓存** - React 可以跳过不必要的渲染
4. **并发安全** - 支持 React 的并发特性

## 客户端组件 vs 服务端组件

### 服务端组件（默认）

```tsx
// app/page.tsx - 默认是服务端组件
async function Page() {
  const data = await fetchData();  // 可以直接用 async/await
  return <div>{data}</div>;
}
```

### 客户端组件

```tsx
'use client';  // 必须声明

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);  // 可以用 Hooks
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### 何时使用客户端组件？

| 需求 | 组件类型 |
|------|----------|
| 使用 useState, useEffect 等 Hooks | 客户端 |
| 使用浏览器 API（window, document） | 客户端 |
| 添加事件监听器（onClick 等） | 客户端 |
| 数据获取（无交互） | 服务端 |
| 访问后端资源 | 服务端 |
| 保护敏感信息 | 服务端 |

## 最佳实践

### 1. 保持组件小而专注

```tsx
// ✅ 单一职责
function SubmitButton({ loading }) {
  return (
    <button disabled={loading}>
      {loading ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

### 2. 使用描述性命名

```tsx
// ✅ 清晰的命名
function UserProfileHeader() { ... }
function ProductPriceDisplay() { ... }
function NavigationMenuLink() { ... }

// ❌ 模糊的命名
function Component1() { ... }
function Stuff() { ... }
function Thing() { ... }
```

### 3. Props 解构

```tsx
// ✅ 在参数中解构
function User({ name, email, avatar }: UserProps) {
  return (
    <div>
      <img src={avatar} />
      <span>{name}</span>
      <span>{email}</span>
    </div>
  );
}

// ❌ 频繁使用 props.xxx
function User(props: UserProps) {
  return (
    <div>
      <img src={props.avatar} />
      <span>{props.name}</span>
      <span>{props.email}</span>
    </div>
  );
}
```

### 4. 类型定义

```tsx
// ✅ 明确的类型定义
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={variant}
    >
      {label}
    </button>
  );
}
```

## 总结

| 概念 | 说明 |
|------|------|
| 组件 | 返回 JSX 的函数 |
| 命名 | PascalCase，大写开头 |
| 返回值 | 单个根元素或 Fragment |
| 纯组件 | 相同输入，相同输出 |
| 客户端组件 | 需要交互时使用 'use client' |
| 拆分原则 | 单一职责，可复用，可测试 |

组件是 React 的基础，掌握好组件的概念和最佳实践，是成为 React 开发者的第一步！
