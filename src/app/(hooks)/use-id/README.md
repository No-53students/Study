# useId Hook 详解

## 什么是 useId？

`useId` 是 React 18 引入的 Hook，用于**生成唯一且稳定的 ID**。这些 ID 在服务端和客户端渲染之间保持一致，避免 hydration 不匹配问题。

```tsx
const id = useId();
```

## 为什么需要 useId？

### 问题场景 1：手动生成 ID 导致 hydration 不匹配

```tsx
// ❌ 使用随机 ID 会导致 hydration 不匹配
function FormField() {
  const id = Math.random().toString(36).slice(2); // 服务端和客户端生成的不一样！

  return (
    <div>
      <label htmlFor={id}>名称</label>
      <input id={id} />
    </div>
  );
}
```

### 问题场景 2：全局计数器在 SSR 中不可靠

```tsx
// ❌ 全局计数器在多次请求间可能冲突
let counter = 0;
function FormField() {
  const id = `field-${counter++}`; // 多个请求共享，ID 可能重复

  return (
    <div>
      <label htmlFor={id}>名称</label>
      <input id={id} />
    </div>
  );
}
```

### useId 解决方案

```tsx
// ✅ useId 在服务端和客户端生成相同的 ID
function FormField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>名称</label>
      <input id={id} />
    </div>
  );
}
```

## 基本语法

```tsx
const id = useId();
```

### 返回值

返回一个唯一的字符串 ID，格式类似 `:r0:`、`:r1:`、`:r2:` 等。

## 使用场景

### 场景 1：表单元素的 label 关联

```tsx
function NameInput() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>姓名</label>
      <input id={id} type="text" />
    </div>
  );
}
```

### 场景 2：多个相关元素使用同一前缀

```tsx
function LoginForm() {
  const id = useId();

  return (
    <form>
      <div>
        <label htmlFor={`${id}-email`}>邮箱</label>
        <input id={`${id}-email`} type="email" />
      </div>
      <div>
        <label htmlFor={`${id}-password`}>密码</label>
        <input id={`${id}-password`} type="password" />
      </div>
    </form>
  );
}
```

### 场景 3：ARIA 属性关联

```tsx
function Tooltip({ content, children }) {
  const id = useId();

  return (
    <div>
      <button aria-describedby={id}>{children}</button>
      <div id={id} role="tooltip">
        {content}
      </div>
    </div>
  );
}
```

### 场景 4：复杂表单组件

```tsx
function FormInput({ label, error, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : descriptionId}
        {...props}
      />
      {error ? (
        <p id={errorId} className="error">{error}</p>
      ) : (
        <p id={descriptionId} className="description">
          请输入有效的值
        </p>
      )}
    </div>
  );
}
```

### 场景 5：无障碍性 (Accessibility)

```tsx
function Accordion({ title, children }) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
```

### 场景 6：列表中的唯一元素

```tsx
function CheckboxList({ items, onChange }) {
  const id = useId();

  return (
    <fieldset>
      {items.map((item, index) => (
        <div key={item.id}>
          <input
            type="checkbox"
            id={`${id}-${index}`}
            checked={item.checked}
            onChange={() => onChange(item.id)}
          />
          <label htmlFor={`${id}-${index}`}>{item.label}</label>
        </div>
      ))}
    </fieldset>
  );
}
```

## ID 格式自定义

在某些环境下（如 iframe），可以通过 `identifierPrefix` 自定义 ID 前缀：

```tsx
// 在 createRoot 时设置
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'), {
  identifierPrefix: 'my-app-'
});

// 生成的 ID 将是: my-app-:r0:, my-app-:r1: 等
```

在 SSR 中：

```tsx
import { renderToString } from 'react-dom/server';

const html = renderToString(<App />, {
  identifierPrefix: 'my-app-'
});
```

## 最佳实践

### 1. 使用前缀区分不同用途

```tsx
function UserForm() {
  const id = useId();

  return (
    <form>
      <input id={`${id}-name`} />      {/* :r0:-name */}
      <input id={`${id}-email`} />     {/* :r0:-email */}
      <input id={`${id}-phone`} />     {/* :r0:-phone */}
    </form>
  );
}
```

### 2. 不要用于 key

```tsx
// ❌ 错误：不要用 useId 作为列表的 key
function List({ items }) {
  return items.map(item => {
    const id = useId(); // Hook 不能在循环中调用！
    return <li key={id}>{item.name}</li>;
  });
}

// ✅ 正确：使用数据中的唯一标识
function List({ items }) {
  return items.map(item => (
    <li key={item.id}>{item.name}</li>
  ));
}
```

### 3. 不要用于 CSS 选择器

```tsx
// ❌ 不推荐：ID 包含冒号，CSS 选择器需要转义
const id = useId(); // :r0:
const style = `#${id} { color: red; }`; // 无法正常工作

// ✅ 如需 CSS 选择器，使用 data 属性
function Component() {
  const id = useId();
  return (
    <>
      <style>{`[data-id="${id}"] { color: red; }`}</style>
      <div data-id={id}>内容</div>
    </>
  );
}
```

### 4. 组件层级使用

```tsx
// 每个组件实例获得唯一 ID
function TextInput({ label }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  );
}

function Form() {
  return (
    <form>
      <TextInput label="名字" />  {/* id: :r0: */}
      <TextInput label="邮箱" />  {/* id: :r1: */}
      <TextInput label="电话" />  {/* id: :r2: */}
    </form>
  );
}
```

## 常见错误

### 错误 1：在循环中使用

```tsx
// ❌ Hook 规则：不能在循环中使用
function BadList({ items }) {
  return items.map(item => {
    const id = useId(); // 错误！
    return <Item key={id} id={id} />;
  });
}

// ✅ 正确：在组件内使用
function Item({ item }) {
  const id = useId();
  return <div id={id}>{item.name}</div>;
}

function GoodList({ items }) {
  return items.map(item => (
    <Item key={item.id} item={item} />
  ));
}
```

### 错误 2：期望可预测的 ID

```tsx
// ❌ 不要依赖 ID 的具体值
const id = useId();
if (id === ':r0:') { // 不要这样做
  // ...
}
```

### 错误 3：用于数据标识

```tsx
// ❌ 错误：useId 不是用于生成数据库 ID
function createUser() {
  const id = useId(); // 不要用于数据！
  return { id, name: 'John' };
}

// ✅ 正确：使用专门的 ID 生成方案
import { v4 as uuid } from 'uuid';
function createUser() {
  return { id: uuid(), name: 'John' };
}
```

## 与其他方案对比

| 方案 | SSR 安全 | 唯一性 | 稳定性 |
|------|----------|--------|--------|
| `useId()` | ✅ | ✅ | ✅ |
| `Math.random()` | ❌ | ✅ | ❌ |
| 全局计数器 | ❌ | ⚠️ | ⚠️ |
| `uuid()` | ❌ | ✅ | ❌ |
| 手动写死 | ✅ | ❌ | ✅ |

## 总结

| 适用场景 | 不适用场景 |
|----------|------------|
| label + input 关联 | 列表的 key |
| ARIA 属性关联 | CSS 选择器 |
| 表单字段 ID | 数据库 ID |
| 无障碍性需求 | 可预测的 ID |

`useId` 是一个简单但重要的 Hook，主要用于生成 DOM 元素的唯一标识符，特别是在需要 SSR 支持的场景中。
