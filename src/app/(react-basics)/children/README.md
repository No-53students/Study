# Children 子元素

## 什么是 Children？

`children` 是一个特殊的 prop，用于接收组件标签之间的内容。它让组件可以像 HTML 标签一样包裹其他内容。

```tsx
// children 就是标签之间的内容
<Card>
  <h1>标题</h1>
  <p>这些都是 children</p>
</Card>
```

## 基本用法

### 接收 children

```tsx
interface CardProps {
  children: React.ReactNode;
}

function Card({ children }: CardProps) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

// 使用
<Card>
  <h1>Hello</h1>
  <p>World</p>
</Card>
```

### children 的类型

```tsx
// React.ReactNode - 最通用，接受任何可渲染内容
children: React.ReactNode;

// React.ReactElement - 只接受 React 元素
children: React.ReactElement;

// string - 只接受字符串
children: string;

// 函数（Render Props 模式）
children: (data: T) => React.ReactNode;
```

## Children 可以是什么？

### 1. JSX 元素

```tsx
<Container>
  <Header />
  <Content />
</Container>
```

### 2. 字符串或数字

```tsx
<Text>Hello World</Text>
<Count>{42}</Count>
```

### 3. 数组

```tsx
<List>
  {items.map(item => <Item key={item.id} />)}
</List>
```

### 4. 混合内容

```tsx
<Card>
  <h1>标题</h1>
  纯文本内容
  {variable}
  {condition && <span>条件内容</span>}
</Card>
```

### 5. null/undefined/boolean（不渲染）

```tsx
<Container>
  {null}
  {undefined}
  {false}
  {true}
</Container>
// 以上内容都不会渲染
```

## 常见模式

### 1. 布局组件

```tsx
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

// 使用
<PageLayout>
  <h1>页面内容</h1>
  <p>这里是正文</p>
</PageLayout>
```

### 2. 插槽模式（具名 children）

```tsx
interface DialogProps {
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

function Dialog({ title, children, footer }: DialogProps) {
  return (
    <div className="dialog">
      <div className="dialog-header">{title}</div>
      <div className="dialog-body">{children}</div>
      {footer && <div className="dialog-footer">{footer}</div>}
    </div>
  );
}

// 使用
<Dialog
  title={<h2>确认删除</h2>}
  footer={<Button>确定</Button>}
>
  <p>确定要删除这条记录吗？</p>
</Dialog>
```

### 3. 容器组件

```tsx
function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </div>
  );
}
```

### 4. 条件渲染 children

```tsx
function ShowIf({ condition, children }: { condition: boolean; children: React.ReactNode }) {
  return condition ? <>{children}</> : null;
}

// 使用
<ShowIf condition={isLoggedIn}>
  <Dashboard />
</ShowIf>
```

## React.Children 工具函数

React 提供了 `React.Children` 工具来操作 children：

### Children.map

```tsx
import { Children } from 'react';

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul>
      {Children.map(children, (child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}
```

### Children.count

```tsx
function Parent({ children }: { children: React.ReactNode }) {
  const count = Children.count(children);
  return <div>共有 {count} 个子元素</div>;
}
```

### Children.only

```tsx
function SingleChild({ children }: { children: React.ReactElement }) {
  // 确保只有一个子元素，否则抛出错误
  const child = Children.only(children);
  return <div>{child}</div>;
}
```

### Children.toArray

```tsx
function Reverse({ children }: { children: React.ReactNode }) {
  const childArray = Children.toArray(children);
  return <>{childArray.reverse()}</>;
}
```

## 克隆和修改 Children

使用 `cloneElement` 可以克隆并修改 children：

```tsx
import { Children, cloneElement, isValidElement } from 'react';

function HighlightChildren({ children }: { children: React.ReactNode }) {
  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, {
            className: `${child.props.className || ''} highlighted`,
          });
        }
        return child;
      })}
    </>
  );
}
```

## 函数作为 Children（Render Props）

```tsx
interface DataFetcherProps {
  url: string;
  children: (data: unknown, loading: boolean) => React.ReactNode;
}

function DataFetcher({ url, children }: DataFetcherProps) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return <>{children(data, loading)}</>;
}

// 使用
<DataFetcher url="/api/users">
  {(data, loading) => (
    loading ? <Spinner /> : <UserList users={data} />
  )}
</DataFetcher>
```

## TypeScript 类型

### React.ReactNode

最常用，接受几乎所有可渲染内容：

```tsx
type ReactNode =
  | ReactElement
  | string
  | number
  | boolean
  | null
  | undefined
  | Iterable<ReactNode>;
```

### React.ReactElement

只接受 React 元素：

```tsx
interface Props {
  children: React.ReactElement;  // 必须是 React 元素
}
```

### 特定元素类型

```tsx
interface Props {
  children: React.ReactElement<ButtonProps>;  // 必须是 Button 元素
}
```

### 函数类型

```tsx
interface Props {
  children: (value: string) => React.ReactNode;
}
```

## 最佳实践

### 1. 使用 React.ReactNode

```tsx
// ✅ 推荐：最灵活
interface Props {
  children: React.ReactNode;
}

// 可以传递任何内容
<Component>
  <div>JSX</div>
  文本
  {null}
  {42}
</Component>
```

### 2. 明确 children 是必需还是可选

```tsx
// 必需
interface RequiredProps {
  children: React.ReactNode;
}

// 可选
interface OptionalProps {
  children?: React.ReactNode;
}
```

### 3. 使用具名插槽代替复杂 children

```tsx
// ❌ 复杂的 children 结构难以维护
<Modal>
  <div className="header">...</div>
  <div className="body">...</div>
  <div className="footer">...</div>
</Modal>

// ✅ 使用具名 props
<Modal
  header={<ModalHeader />}
  footer={<ModalFooter />}
>
  <ModalBody />
</Modal>
```

### 4. 避免过度使用 cloneElement

```tsx
// ❌ 难以追踪 props 来源
{Children.map(children, child =>
  cloneElement(child, { extraProp: value })
)}

// ✅ 使用 Context 或明确的 props
<Context.Provider value={value}>
  {children}
</Context.Provider>
```

## 总结

| 概念 | 说明 |
|------|------|
| children | 组件标签之间的内容 |
| ReactNode | 最通用的 children 类型 |
| 插槽模式 | 使用多个 props 传递不同位置的内容 |
| Children API | map, count, only, toArray |
| cloneElement | 克隆并修改子元素 |
| Render Props | 函数作为 children |
