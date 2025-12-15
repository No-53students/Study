# Portal

## 简介

Portal 提供了一种将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点的方法。这对于需要在视觉上"突破"父容器的组件非常有用。

```tsx
import { createPortal } from 'react-dom';

createPortal(children, domNode, key?)
```

## 为什么需要 Portal？

有些 UI 元素需要在 DOM 层面脱离父组件，但在 React 组件树中仍保持父子关系：

- **模态框（Modal）**：需要覆盖整个页面
- **工具提示（Tooltip）**：避免被父元素的 `overflow: hidden` 裁剪
- **下拉菜单**：需要在 `z-index` 层面覆盖其他元素
- **通知消息**：固定在页面特定位置

## 基本用法

```tsx
import { createPortal } from 'react-dom';

function Modal({ children, isOpen }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

## 客户端渲染注意事项

在 Next.js 或 SSR 环境中，需要确保 `document` 存在：

```tsx
'use client';

import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';

function Modal({ children, isOpen }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="modal">
      {children}
    </div>,
    document.body
  );
}
```

## 使用场景

### 1. 模态框

```tsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div className="relative mx-auto mt-20 max-w-md bg-white p-6 rounded-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### 2. 工具提示

```tsx
function Tooltip({ children, content, targetRef }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2,
      });
    }
  }, [targetRef]);

  return createPortal(
    <div
      className="fixed bg-gray-800 text-white px-2 py-1 rounded text-sm"
      style={{ top: position.top, left: position.left, transform: 'translateX(-50%)' }}
    >
      {content}
    </div>,
    document.body
  );
}
```

### 3. 通知系统

```tsx
function NotificationContainer({ notifications }) {
  return createPortal(
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {notifications.map(notification => (
        <div key={notification.id} className="bg-white shadow-lg p-4 rounded">
          {notification.message}
        </div>
      ))}
    </div>,
    document.body
  );
}
```

## 事件冒泡

**重要**：Portal 中的事件会沿着 React 组件树冒泡，而非 DOM 树：

```tsx
function Parent() {
  const handleClick = () => {
    console.log('Parent clicked');
  };

  return (
    <div onClick={handleClick}>
      <Child />
    </div>
  );
}

function Child() {
  return createPortal(
    // 点击这个按钮也会触发 Parent 的 handleClick
    <button>Click me</button>,
    document.body
  );
}
```

## 自定义 Portal 容器

可以创建专门的 Portal 容器：

```tsx
// 在 HTML 中
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
  <div id="tooltip-root"></div>
</body>

// 使用特定容器
function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root')!
  );
}
```

## 可复用的 Portal 组件

```tsx
interface PortalProps {
  children: React.ReactNode;
  container?: Element | null;
}

function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    children,
    container || document.body
  );
}

// 使用
<Portal>
  <Modal>内容</Modal>
</Portal>
```

## 无障碍访问（a11y）

使用 Portal 创建模态框时，需要注意无障碍访问：

```tsx
function AccessibleModal({ isOpen, onClose, title, children }) {
  // 焦点管理
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
      tabIndex={-1}
    >
      <h2 id="modal-title">{title}</h2>
      {children}
    </div>,
    document.body
  );
}
```

## 最佳实践

1. **始终检查客户端环境**：使用 `useEffect` 确保 `document` 可用
2. **管理 z-index**：为 Portal 内容设置合适的层级
3. **清理事件监听器**：在组件卸载时移除全局事件
4. **锁定背景滚动**：模态框打开时禁止背景滚动
5. **焦点陷阱**：模态框中保持焦点不外泄
6. **支持 ESC 关闭**：提供键盘关闭支持

## 与 z-index 的关系

```css
/* 建议的 z-index 层级管理 */
:root {
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-tooltip: 500;
  --z-notification: 600;
}
```

## 常见问题

### Portal 会影响 CSS 继承吗？

是的，Portal 渲染的内容会继承目标 DOM 节点的 CSS，而非 React 父组件的 CSS。需要在 Portal 内容中显式设置样式。

### 何时使用 Portal vs 常规渲染？

| 场景 | 建议 |
|------|------|
| 模态框/对话框 | ✅ Portal |
| 工具提示 | ✅ Portal |
| 下拉菜单 | ✅ Portal（如果可能被裁剪）|
| 普通弹出层 | ❌ 常规渲染通常足够 |
| 嵌入式组件 | ❌ 常规渲染 |

## 总结

Portal 是处理"视觉层级突破"的最佳方案：

- 保持 React 组件树的逻辑关系
- 突破 DOM 层级限制
- 事件仍按 React 树冒泡
- 需要注意 SSR 兼容性
