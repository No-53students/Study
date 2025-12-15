# 列表渲染

## 什么是列表渲染？

列表渲染是将数组数据转换为 React 元素列表的过程。使用 JavaScript 的 `map()` 方法来实现。

```tsx
const items = ['React', 'Vue', 'Angular'];

function List() {
  return (
    <ul>
      {items.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}
```

## Key 的重要性

### 为什么需要 key？

Key 帮助 React 识别哪些元素发生了变化、被添加或被删除。

```tsx
// ✅ 正确：使用唯一且稳定的 key
{items.map(item => (
  <li key={item.id}>{item.name}</li>
))}

// ❌ 错误：使用索引作为 key（除非列表不会重排）
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}
```

### Key 的规则

1. **唯一性**：在兄弟元素中必须唯一
2. **稳定性**：不应该随时间变化
3. **不可使用 Math.random()**：每次渲染都会生成新 key

```tsx
// ✅ 好的 key
<Item key={item.id} />        // 数据库 ID
<Item key={item.email} />     // 唯一标识符
<Item key={item.slug} />      // URL slug

// ❌ 不好的 key
<Item key={Math.random()} />  // 每次都不同
<Item key={index} />          // 列表会重排时有问题
<Item key={item.name} />      // 可能重复
```

### 不使用 key 会怎样？

```tsx
// 没有 key，React 会报警告
// 而且可能导致：
// 1. 组件状态混乱
// 2. 性能下降
// 3. 动画异常
```

## 基本用法

### 渲染简单列表

```tsx
function SimpleList({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### 渲染对象数组

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### 渲染到自定义组件

```tsx
function TodoList({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => toggleTodo(todo.id)}
        />
      ))}
    </ul>
  );
}
```

## 高级技巧

### 过滤列表

```tsx
function FilteredList({ items, filter }: { items: Item[]; filter: string }) {
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 排序列表

```tsx
function SortedList({ items, sortBy }: { items: Item[]; sortBy: 'name' | 'date' }) {
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <ul>
      {sortedItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 分组列表

```tsx
function GroupedList({ items }: { items: Item[] }) {
  const grouped = items.reduce((acc, item) => {
    const group = item.category;
    if (!acc[group]) acc[group] = [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, Item[]>);

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category}>
          <h2>{category}</h2>
          <ul>
            {items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```

### 嵌套列表

```tsx
interface Category {
  id: number;
  name: string;
  items: Item[];
}

function NestedList({ categories }: { categories: Category[] }) {
  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h2>{category.name}</h2>
          <ul>
            {category.items.map(item => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

## 空列表处理

```tsx
function List({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p>暂无数据</p>;
  }

  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Fragment 包裹

当需要返回多个元素但不想添加额外 DOM 节点时：

```tsx
function Glossary({ terms }: { terms: Term[] }) {
  return (
    <dl>
      {terms.map(term => (
        <Fragment key={term.id}>
          <dt>{term.title}</dt>
          <dd>{term.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

## 索引作为 Key

### 何时可以使用索引？

1. 列表是静态的，不会改变
2. 列表不会被重新排序
3. 列表不会被过滤
4. 列表项没有唯一 ID

```tsx
// ✅ 静态列表，可以使用索引
const menuItems = ['首页', '关于', '联系'];

function Menu() {
  return (
    <nav>
      {menuItems.map((item, index) => (
        <a key={index}>{item}</a>
      ))}
    </nav>
  );
}
```

### 何时不应使用索引？

```tsx
// ❌ 会重排的列表，不要用索引
function SortableList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        // 当排序变化时，组件状态会混乱
        <EditableItem key={index} item={item} />
      ))}
    </ul>
  );
}
```

## 性能优化

### 使用 React.memo

```tsx
const ListItem = memo(function ListItem({ item }: { item: Item }) {
  return <li>{item.name}</li>;
});

function List({ items }: { items: Item[] }) {
  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
```

### 虚拟列表

对于长列表，使用虚拟化库如 `react-window` 或 `@tanstack/react-virtual`：

```tsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: virtualRow.start,
              height: virtualRow.size,
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 常见错误

### 1. 在 map 外返回 null

```tsx
// ❌ 错误
{items.map(item => {
  if (item.hidden) return;  // 应该返回 null
  return <Item key={item.id} item={item} />;
})}

// ✅ 正确
{items.map(item => {
  if (item.hidden) return null;
  return <Item key={item.id} item={item} />;
})}

// ✅ 更好：先过滤
{items
  .filter(item => !item.hidden)
  .map(item => <Item key={item.id} item={item} />)}
```

### 2. Key 放错位置

```tsx
// ❌ key 放在子元素上
{items.map(item => (
  <div>
    <Item key={item.id} item={item} />
  </div>
))}

// ✅ key 放在最外层元素上
{items.map(item => (
  <div key={item.id}>
    <Item item={item} />
  </div>
))}
```

## 总结

| 概念 | 说明 |
|------|------|
| map() | 将数组转换为元素列表 |
| key | 唯一标识每个列表项 |
| 过滤/排序 | 先处理数据再渲染 |
| Fragment | 多元素无额外 DOM |
| 虚拟列表 | 长列表性能优化 |
| 空列表 | 显示占位内容 |
