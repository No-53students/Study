# Fragment

## 简介

`Fragment` 允许你在不添加额外 DOM 节点的情况下对元素进行分组。这对于保持 DOM 结构简洁非常有用。

```tsx
import { Fragment } from 'react';

// 或使用简写语法
<>...</>
```

## 为什么需要 Fragment？

React 组件必须返回单个根元素，但有时我们不想添加额外的 DOM 节点：

```tsx
// ❌ 这样会报错 - 返回了多个元素
function Invalid() {
  return (
    <h1>标题</h1>
    <p>段落</p>
  );
}

// ❌ 使用 div 包装 - 会产生多余的 DOM 节点
function WithDiv() {
  return (
    <div>
      <h1>标题</h1>
      <p>段落</p>
    </div>
  );
}

// ✅ 使用 Fragment - 不产生额外 DOM
function WithFragment() {
  return (
    <Fragment>
      <h1>标题</h1>
      <p>段落</p>
    </Fragment>
  );
}
```

## 两种语法

### 显式语法

```tsx
import { Fragment } from 'react';

function List() {
  return (
    <Fragment>
      <dt>术语</dt>
      <dd>定义</dd>
    </Fragment>
  );
}
```

### 简写语法

```tsx
function List() {
  return (
    <>
      <dt>术语</dt>
      <dd>定义</dd>
    </>
  );
}
```

## 使用场景

### 1. 返回多个元素

```tsx
function Glossary() {
  return (
    <dl>
      <GlossaryItem term="HTML" definition="超文本标记语言" />
      <GlossaryItem term="CSS" definition="层叠样式表" />
    </dl>
  );
}

function GlossaryItem({ term, definition }) {
  return (
    <>
      <dt>{term}</dt>
      <dd>{definition}</dd>
    </>
  );
}
```

### 2. 表格行组件

```tsx
function TableRow({ data }) {
  return (
    <>
      <td>{data.name}</td>
      <td>{data.age}</td>
      <td>{data.email}</td>
    </>
  );
}

// 使用
<table>
  <tbody>
    <tr><TableRow data={user1} /></tr>
    <tr><TableRow data={user2} /></tr>
  </tbody>
</table>
```

### 3. 条件渲染

```tsx
function UserInfo({ user, showDetails }) {
  return (
    <>
      <h2>{user.name}</h2>
      {showDetails && (
        <>
          <p>邮箱：{user.email}</p>
          <p>电话：{user.phone}</p>
        </>
      )}
    </>
  );
}
```

### 4. 列表渲染

```tsx
function NumberList({ items }) {
  return (
    <>
      {items.map(item => (
        <Fragment key={item.id}>
          <span>{item.label}</span>
          <span>{item.value}</span>
        </Fragment>
      ))}
    </>
  );
}
```

## 带 key 的 Fragment

当在列表中使用 Fragment 时，需要提供 key。这时**必须使用显式语法**：

```tsx
// ✅ 正确 - 使用显式 Fragment 语法
function Items({ items }) {
  return (
    <dl>
      {items.map(item => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </Fragment>
      ))}
    </dl>
  );
}

// ❌ 错误 - 简写语法不支持 key
function Items({ items }) {
  return (
    <dl>
      {items.map(item => (
        <key={item.id}>  // 语法错误！
          <dt>{item.term}</dt>
          <dd>{item.definition}</dd>
        </>
      ))}
    </dl>
  );
}
```

## 保持 DOM 结构

Fragment 对于保持正确的 DOM 结构很重要：

### Flex 布局

```tsx
// ❌ 额外的 div 会破坏 flex 布局
function FlexItems() {
  return (
    <div style={{ display: 'flex' }}>
      <div>  {/* 这个 div 成为 flex item，而不是内部元素 */}
        <span>Item 1</span>
        <span>Item 2</span>
      </div>
    </div>
  );
}

// ✅ Fragment 不会影响 flex 布局
function FlexItems() {
  return (
    <div style={{ display: 'flex' }}>
      <>
        <span>Item 1</span>
        <span>Item 2</span>
      </>
    </div>
  );
}
```

### Grid 布局

```tsx
function GridContent() {
  return (
    <div className="grid grid-cols-3">
      <GridItems />
    </div>
  );
}

function GridItems() {
  return (
    <>
      <div>Grid Item 1</div>
      <div>Grid Item 2</div>
      <div>Grid Item 3</div>
    </>
  );
}
```

## Fragment vs div

| 特性 | Fragment | div |
|------|----------|-----|
| 产生 DOM 节点 | ❌ 否 | ✅ 是 |
| 可以添加样式 | ❌ 否 | ✅ 是 |
| 可以添加事件 | ❌ 否 | ✅ 是 |
| 影响布局 | ❌ 否 | ✅ 是 |
| 支持 key | ✅ 是（显式语法）| ✅ 是 |

## 最佳实践

1. **优先使用简写语法**：`<>...</>` 更简洁
2. **需要 key 时用显式语法**：`<Fragment key={id}>...</Fragment>`
3. **保持语义化 HTML**：使用 Fragment 而非多余的 div
4. **考虑布局影响**：在 Flex/Grid 中使用 Fragment 避免破坏布局

## 常见问题

### 简写语法不生效？

确保你的构建工具支持 JSX 转换。Babel 7.9+ 和 TypeScript 4.1+ 都支持。

### 什么时候用 div？

当你需要：
- 添加样式（className、style）
- 绑定事件（onClick 等）
- 作为布局容器
- 需要一个实际的 DOM 引用

### Fragment 和数组有什么区别？

```tsx
// 返回数组也可以，但需要 key 且可读性差
function WithArray() {
  return [
    <h1 key="h1">标题</h1>,
    <p key="p">段落</p>,
  ];
}

// Fragment 更清晰
function WithFragment() {
  return (
    <>
      <h1>标题</h1>
      <p>段落</p>
    </>
  );
}
```

## 总结

Fragment 是 React 中一个简单但重要的特性：

- 分组元素而不产生额外 DOM
- 两种语法：显式 `<Fragment>` 和简写 `<></>`
- 需要 key 时必须使用显式语法
- 有助于保持清晰的 DOM 结构和正确的布局
