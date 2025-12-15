# 事件处理

## 什么是事件处理？

事件处理是响应用户交互（如点击、输入、提交等）的方式。在 React 中，事件处理与原生 DOM 事件类似，但有一些语法差异。

```tsx
// React 事件处理
<button onClick={handleClick}>点击</button>

// 原生 DOM 事件
<button onclick="handleClick()">点击</button>
```

## React 事件 vs 原生事件

| 特性 | React 事件 | 原生 DOM 事件 |
|------|------------|---------------|
| 命名 | camelCase (onClick) | 小写 (onclick) |
| 处理函数 | 函数引用 | 字符串 |
| 阻止默认行为 | e.preventDefault() | return false 也可以 |
| 事件对象 | SyntheticEvent | 原生 Event |

## 基本用法

### 绑定事件处理函数

```tsx
function Button() {
  const handleClick = () => {
    console.log('按钮被点击了');
  };

  return <button onClick={handleClick}>点击我</button>;
}
```

### 内联事件处理

```tsx
function Button() {
  return (
    <button onClick={() => console.log('点击了')}>
      点击
    </button>
  );
}
```

### 传递参数

```tsx
function ItemList({ items }) {
  const handleDelete = (id: number) => {
    console.log('删除项目:', id);
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button onClick={() => handleDelete(item.id)}>删除</button>
        </li>
      ))}
    </ul>
  );
}
```

## 事件对象

### 获取事件对象

```tsx
function Input() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('输入值:', e.target.value);
  };

  return <input onChange={handleChange} />;
}
```

### 常用事件类型

```tsx
// 鼠标事件
onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
onDoubleClick: (e: React.MouseEvent) => void
onMouseEnter: (e: React.MouseEvent) => void
onMouseLeave: (e: React.MouseEvent) => void

// 键盘事件
onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
onKeyUp: (e: React.KeyboardEvent) => void
onKeyPress: (e: React.KeyboardEvent) => void  // 已废弃

// 表单事件
onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
onBlur: (e: React.FocusEvent) => void

// 其他事件
onScroll: (e: React.UIEvent<HTMLDivElement>) => void
onCopy: (e: React.ClipboardEvent) => void
onDrag: (e: React.DragEvent) => void
```

## 阻止默认行为和冒泡

### 阻止默认行为

```tsx
function Form() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();  // 阻止表单提交刷新页面
    console.log('表单提交');
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">提交</button>
    </form>
  );
}
```

### 阻止事件冒泡

```tsx
function NestedButtons() {
  return (
    <div onClick={() => console.log('外层点击')}>
      <button
        onClick={(e) => {
          e.stopPropagation();  // 阻止冒泡
          console.log('内层点击');
        }}
      >
        点击
      </button>
    </div>
  );
}
```

## 事件处理最佳实践

### 1. 使用命名函数

```tsx
// ✅ 推荐：使用命名函数
function Button() {
  const handleClick = () => {
    // 处理逻辑
  };

  return <button onClick={handleClick}>点击</button>;
}

// ❌ 避免：复杂的内联函数
function Button() {
  return (
    <button onClick={() => {
      // 很多逻辑...
      // 难以阅读...
    }}>
      点击
    </button>
  );
}
```

### 2. 命名规范

```tsx
// 事件处理函数命名：handle + 事件名
const handleClick = () => {};
const handleSubmit = () => {};
const handleInputChange = () => {};
const handleUserDelete = () => {};

// Props 中的回调命名：on + 事件名
interface Props {
  onClick: () => void;
  onSubmit: (data: FormData) => void;
  onUserDelete: (id: number) => void;
}
```

### 3. 类型安全

```tsx
interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function Button({ onClick }: ButtonProps) {
  return <button onClick={onClick}>点击</button>;
}
```

### 4. 避免在渲染中创建函数（性能敏感场景）

```tsx
// 可能影响性能的场景
function List({ items, onItemClick }) {
  return (
    <ul>
      {items.map(item => (
        // 每次渲染都创建新函数
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// 优化方案：使用 useCallback 或提取组件
function ListItem({ item, onClick }) {
  return (
    <li onClick={() => onClick(item.id)}>
      {item.name}
    </li>
  );
}
```

## 合成事件 (SyntheticEvent)

React 的事件是合成事件，它包装了原生事件，提供跨浏览器一致性。

```tsx
function handleClick(e: React.MouseEvent) {
  // e 是 SyntheticEvent
  console.log(e.type);           // 'click'
  console.log(e.target);         // 事件目标
  console.log(e.currentTarget);  // 绑定事件的元素
  console.log(e.nativeEvent);    // 原生事件对象
}
```

### 事件池（React 17 之前）

```tsx
// React 17 之前，事件对象会被重用
function handleClick(e) {
  // ❌ 异步访问事件对象会有问题
  setTimeout(() => {
    console.log(e.target);  // 可能是 null
  }, 100);

  // ✅ 需要先保存需要的值
  const target = e.target;
  setTimeout(() => {
    console.log(target);  // 正常
  }, 100);
}

// React 17+ 不再有这个问题
```

## 常见事件处理场景

### 表单输入

```tsx
function SearchInput() {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      console.log('搜索:', query);
    }
  };

  return (
    <input
      value={query}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder="搜索..."
    />
  );
}
```

### 按钮防抖

```tsx
function SubmitButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await submitData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? '提交中...' : '提交'}
    </button>
  );
}
```

### 拖拽事件

```tsx
function DraggableItem() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={isDragging ? 'dragging' : ''}
    >
      拖拽我
    </div>
  );
}
```

## 总结

| 概念 | 说明 |
|------|------|
| 事件命名 | camelCase (onClick) |
| 处理函数 | 传递函数引用，不是字符串 |
| 事件对象 | SyntheticEvent 包装 |
| 阻止默认 | e.preventDefault() |
| 阻止冒泡 | e.stopPropagation() |
| TypeScript | 使用 React.XXXEvent 类型 |
| 命名规范 | handle + 事件名 |
