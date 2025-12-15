# useLayoutEffect Hook 详解

## 什么是 useLayoutEffect？

`useLayoutEffect` 的签名与 `useEffect` 完全相同，但它在**浏览器绑制之前同步执行**。用于需要同步读取或修改 DOM 布局的场景。

```tsx
useLayoutEffect(() => {
  // 在浏览器绑制之前同步执行
  return () => {
    // 清理函数
  };
}, [dependencies]);
```

## useEffect vs useLayoutEffect

### 执行时机对比

```
组件渲染
    ↓
虚拟 DOM 更新
    ↓
真实 DOM 更新
    ↓
useLayoutEffect 执行 ← 同步，阻塞绑制
    ↓
浏览器绘制屏幕
    ↓
useEffect 执行 ← 异步，不阻塞绘制
```

### 关键区别

| 特性 | useEffect | useLayoutEffect |
|------|-----------|-----------------|
| 执行时机 | 绘制后异步执行 | 绘制前同步执行 |
| 阻塞绘制 | 不阻塞 | 阻塞 |
| 适用场景 | 大多数副作用 | DOM 测量和同步更新 |
| 性能影响 | 更好 | 可能导致卡顿 |
| SSR 兼容 | 兼容 | 需要特殊处理 |

## 为什么需要 useLayoutEffect？

### 问题场景：闪烁

使用 `useEffect` 时可能出现视觉闪烁：

```tsx
function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ❌ useEffect：用户可能看到 tooltip 先出现在错误位置，然后跳转
  useEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left });
  }, [targetRef]);

  return (
    <div style={{ top: position.top, left: position.left }}>
      Tooltip
    </div>
  );
}
```

### useLayoutEffect 解决方案

```tsx
function Tooltip({ targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // ✅ useLayoutEffect：在绘制前计算位置，用户看不到闪烁
  useLayoutEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom, left: rect.left });
  }, [targetRef]);

  return (
    <div style={{ top: position.top, left: position.left }}>
      Tooltip
    </div>
  );
}
```

## 使用场景

### 场景 1：测量 DOM 元素

```tsx
function MeasuredComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  return (
    <div ref={ref}>
      <p>宽度: {dimensions.width}px</p>
      <p>高度: {dimensions.height}px</p>
    </div>
  );
}
```

### 场景 2：Tooltip 定位

```tsx
function Tooltip({ children, content, targetRef }) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useLayoutEffect(() => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // 计算最佳位置
    let x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
    let y = targetRect.bottom + 8;

    // 边界检测
    if (x < 0) x = 0;
    if (x + tooltipRect.width > window.innerWidth) {
      x = window.innerWidth - tooltipRect.width;
    }

    setCoords({ x, y });
  }, [targetRef]);

  return (
    <div
      ref={tooltipRef}
      style={{
        position: 'fixed',
        left: coords.x,
        top: coords.y,
      }}
    >
      {content}
    </div>
  );
}
```

### 场景 3：动画初始状态

```tsx
function AnimatedList({ items }) {
  const listRef = useRef<HTMLUListElement>(null);

  useLayoutEffect(() => {
    if (!listRef.current) return;

    // 在绘制前获取每个元素的初始位置
    const children = listRef.current.children;
    Array.from(children).forEach((child, index) => {
      const el = child as HTMLElement;
      el.style.opacity = '0';
      el.style.transform = `translateY(${20 * index}px)`;
    });

    // 强制重排后开始动画
    listRef.current.offsetHeight; // 触发重排

    Array.from(children).forEach((child, index) => {
      const el = child as HTMLElement;
      el.style.transition = `all 0.3s ease ${index * 0.1}s`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, [items]);

  return (
    <ul ref={listRef}>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### 场景 4：滚动位置恢复

```tsx
function ChatMessages({ messages }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessagesLength = useRef(messages.length);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // 只有在新消息到来时才滚动到底部
    if (messages.length > prevMessagesLength.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    prevMessagesLength.current = messages.length;
  }, [messages]);

  return (
    <div ref={containerRef} style={{ overflowY: 'auto', height: 300 }}>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

### 场景 5：同步更新 DOM

```tsx
function AutoResizeTextarea({ value, onChange }) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // 重置高度以获取正确的 scrollHeight
    textarea.style.height = 'auto';
    // 设置为内容高度
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      style={{ overflow: 'hidden', resize: 'none' }}
    />
  );
}
```

## 服务端渲染 (SSR) 注意事项

`useLayoutEffect` 在服务端不会执行，可能会产生警告：

```tsx
// ⚠️ 警告：useLayoutEffect does nothing on the server
useLayoutEffect(() => {
  // ...
}, []);
```

### 解决方案 1：使用 useEffect 作为降级

```tsx
import { useEffect, useLayoutEffect } from 'react';

// 在服务端使用 useEffect，客户端使用 useLayoutEffect
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function Component() {
  useIsomorphicLayoutEffect(() => {
    // 在客户端同步执行
  }, []);
}
```

### 解决方案 2：条件渲染

```tsx
function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务端不渲染需要 useLayoutEffect 的部分
  if (!mounted) return null;

  return <ComponentWithLayoutEffect />;
}
```

## 最佳实践

### 1. 优先使用 useEffect

```tsx
// ✅ 大多数情况使用 useEffect
useEffect(() => {
  fetchData();
  subscribeToEvents();
}, []);

// 只在必要时使用 useLayoutEffect
useLayoutEffect(() => {
  measureElement();
  preventFlicker();
}, []);
```

### 2. 保持轻量

```tsx
// ❌ 在 useLayoutEffect 中执行耗时操作
useLayoutEffect(() => {
  // 这会阻塞渲染！
  heavyComputation();
  fetchData(); // 不应该在这里做网络请求
}, []);

// ✅ 只做必要的同步 DOM 操作
useLayoutEffect(() => {
  const rect = ref.current.getBoundingClientRect();
  setPosition({ x: rect.left, y: rect.top });
}, []);
```

### 3. 及时清理

```tsx
useLayoutEffect(() => {
  const observer = new ResizeObserver((entries) => {
    // 处理大小变化
  });

  observer.observe(ref.current);

  // 清理
  return () => observer.disconnect();
}, []);
```

## 常见错误

### 错误 1：不必要地使用 useLayoutEffect

```tsx
// ❌ 不需要 useLayoutEffect
useLayoutEffect(() => {
  document.title = `Count: ${count}`; // 不涉及布局测量
}, [count]);

// ✅ 使用 useEffect 即可
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

### 错误 2：在 useLayoutEffect 中做异步操作

```tsx
// ❌ 错误：异步操作失去了同步的意义
useLayoutEffect(() => {
  setTimeout(() => {
    // 这时候已经绘制了
  }, 0);
}, []);

// ❌ 错误：网络请求
useLayoutEffect(() => {
  fetch('/api/data').then(/* ... */);
}, []);
```

### 错误 3：忽略性能影响

```tsx
// ❌ 警告：这会阻塞渲染
useLayoutEffect(() => {
  // 大量 DOM 操作
  for (let i = 0; i < 1000; i++) {
    document.createElement('div');
  }
}, []);
```

## 总结

| 使用场景 | 推荐 Hook |
|----------|-----------|
| 数据获取 | useEffect |
| 事件订阅 | useEffect |
| DOM 测量 | useLayoutEffect |
| 同步 DOM 更新 | useLayoutEffect |
| 防止闪烁 | useLayoutEffect |
| 动画初始化 | useLayoutEffect |
| 修改 document.title | useEffect |
| 日志记录 | useEffect |

**记住**：`useLayoutEffect` 是同步的，会阻塞浏览器绘制。只在确实需要在绘制前同步操作 DOM 时使用，其他情况请使用 `useEffect`。
