# 组件组合

## 什么是组件组合？

组件组合是 React 的核心设计理念，通过将小组件组合成大组件来构建复杂 UI，而不是使用继承。

```tsx
// 组合优于继承
function App() {
  return (
    <Layout>
      <Header />
      <Sidebar />
      <Content>
        <Article />
      </Content>
      <Footer />
    </Layout>
  );
}
```

## 为什么使用组合？

### 继承的问题

```tsx
// ❌ 继承方式：难以扩展
class SpecialButton extends Button { ... }
class IconButton extends Button { ... }
class SpecialIconButton extends ??? { ... }  // 多重继承问题
```

### 组合的优势

```tsx
// ✅ 组合方式：灵活
<Button>普通按钮</Button>
<Button icon={<Icon />}>图标按钮</Button>
<Button icon={<Icon />} special>特殊图标按钮</Button>
```

## 组合模式

### 1. 容器/内容模式

```tsx
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">{children}</div>
    </div>
  );
}

// 使用
<Card title="用户信息">
  <Avatar />
  <UserDetails />
</Card>
```

### 2. 特化组件

通过 props 配置创建特化版本：

```tsx
// 通用对话框
function Dialog({ title, message, children }) {
  return (
    <div className="dialog">
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
}

// 特化：警告对话框
function WarningDialog({ message, onConfirm }) {
  return (
    <Dialog title="警告" message={message}>
      <button onClick={onConfirm}>确认</button>
    </Dialog>
  );
}

// 特化：确认对话框
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <Dialog title="确认" message={message}>
      <button onClick={onCancel}>取消</button>
      <button onClick={onConfirm}>确认</button>
    </Dialog>
  );
}
```

### 3. 插槽模式

```tsx
function Layout({ header, sidebar, children, footer }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <div className="main">
        <aside>{sidebar}</aside>
        <main>{children}</main>
      </div>
      <footer>{footer}</footer>
    </div>
  );
}

// 使用
<Layout
  header={<Navigation />}
  sidebar={<Menu />}
  footer={<Copyright />}
>
  <PageContent />
</Layout>
```

### 4. 复合组件

```tsx
// 复合组件：Tab
const TabContext = createContext({ activeTab: '', setActiveTab: () => {} });

function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabContext.Provider>
  );
}

function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabContext);

  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabContext);

  if (activeTab !== value) return null;
  return <div className="tab-panel">{children}</div>;
}

// 使用
<Tabs defaultTab="tab1">
  <TabList>
    <Tab value="tab1">标签1</Tab>
    <Tab value="tab2">标签2</Tab>
  </TabList>
  <TabPanel value="tab1">内容1</TabPanel>
  <TabPanel value="tab2">内容2</TabPanel>
</Tabs>
```

### 5. Render Props

```tsx
function Mouse({ children }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMove}>
      {children(position)}
    </div>
  );
}

// 使用
<Mouse>
  {({ x, y }) => <p>鼠标位置: ({x}, {y})</p>}
</Mouse>
```

## 组合技巧

### 透传 Props

```tsx
function Button({ children, ...rest }) {
  return <button {...rest}>{children}</button>;
}

// 所有原生 button 属性都可用
<Button onClick={handleClick} disabled className="custom">
  点击
</Button>
```

### 组件即 Props

```tsx
function Page({ header: Header, content: Content }) {
  return (
    <div>
      <Header />
      <Content />
    </div>
  );
}

// 使用
<Page
  header={() => <h1>标题</h1>}
  content={() => <p>内容</p>}
/>
```

### 组合工厂

```tsx
function createButton(baseStyles) {
  return function Button({ children, className, ...props }) {
    return (
      <button className={`${baseStyles} ${className}`} {...props}>
        {children}
      </button>
    );
  };
}

const PrimaryButton = createButton('bg-blue-500 text-white');
const DangerButton = createButton('bg-red-500 text-white');
```

## 组合 vs 继承

| 方面 | 组合 | 继承 |
|------|------|------|
| 灵活性 | 高 | 低 |
| 代码复用 | 通过 props 和 children | 通过父类 |
| 耦合度 | 松耦合 | 紧耦合 |
| 可测试性 | 容易 | 困难 |
| React 推荐 | ✅ | ❌ |

## 最佳实践

### 1. 优先使用组合

```tsx
// ✅ 组合
function IconButton({ icon, children }) {
  return (
    <Button>
      {icon}
      {children}
    </Button>
  );
}

// ❌ 继承（React 不推荐）
class IconButton extends Button { ... }
```

### 2. 保持组件单一职责

```tsx
// ✅ 单一职责
function UserAvatar({ user }) { ... }
function UserName({ user }) { ... }
function UserCard({ user }) {
  return (
    <div>
      <UserAvatar user={user} />
      <UserName user={user} />
    </div>
  );
}

// ❌ 职责过多
function UserCard({ user }) {
  // 头像逻辑
  // 名字逻辑
  // 按钮逻辑
  // ...太多了
}
```

### 3. 使用 children 保持灵活

```tsx
// ✅ 灵活
function Modal({ children }) {
  return <div className="modal">{children}</div>;
}

// 可以放任何内容
<Modal>
  <Form />
</Modal>

<Modal>
  <Image />
</Modal>
```

## 总结

| 模式 | 用途 | 示例 |
|------|------|------|
| 容器/内容 | 通用包装器 | Card, Modal |
| 特化组件 | 预配置版本 | WarningDialog |
| 插槽模式 | 多内容区域 | Layout |
| 复合组件 | 相关组件组 | Tabs, Menu |
| Render Props | 共享逻辑 | Mouse tracker |
