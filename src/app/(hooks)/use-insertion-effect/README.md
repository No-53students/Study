# useInsertionEffect Hook 详解

## 什么是 useInsertionEffect？

`useInsertionEffect` 是 React 18 引入的专用 Hook，用于 **CSS-in-JS 库在 DOM 变更之前注入样式**。它是三个 Effect Hook 中执行最早的。

```tsx
useInsertionEffect(() => {
  // 在 DOM 变更之前，注入 <style> 标签
}, [dependencies]);
```

## 执行时机

三个 Effect Hook 的执行顺序：

```
组件渲染
    ↓
useInsertionEffect 执行 ← 最早：DOM 变更之前
    ↓
DOM 变更（更新到页面）
    ↓
useLayoutEffect 执行 ← 中间：DOM 变更之后，绘制之前
    ↓
浏览器绘制
    ↓
useEffect 执行 ← 最晚：绘制之后
```

## 为什么需要 useInsertionEffect？

### 问题场景：CSS-in-JS 的样式闪烁

使用 `useLayoutEffect` 注入样式时，可能出现问题：

```tsx
// ❌ 使用 useLayoutEffect 可能导致问题
function BadStyled({ className, children }) {
  useLayoutEffect(() => {
    // 此时 DOM 已经更新，但样式还没注入
    // 可能导致短暂的无样式闪烁
    const style = document.createElement('style');
    style.textContent = `.${className} { color: red; }`;
    document.head.appendChild(style);
  }, [className]);

  return <div className={className}>{children}</div>;
}
```

### useInsertionEffect 解决方案

```tsx
// ✅ 使用 useInsertionEffect 在 DOM 变更前注入样式
function GoodStyled({ className, children }) {
  useInsertionEffect(() => {
    // 在 DOM 变更之前注入样式
    // 确保元素渲染时样式已经存在
    const style = document.createElement('style');
    style.textContent = `.${className} { color: red; }`;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [className]);

  return <div className={className}>{children}</div>;
}
```

## 基本语法

```tsx
useInsertionEffect(() => {
  // 注入样式
  return () => {
    // 清理
  };
}, [dependencies]);
```

### 限制

⚠️ **重要限制**：

1. 不能在 `useInsertionEffect` 中访问 refs
2. 不能在其中调度状态更新
3. 只能用于注入样式

```tsx
// ❌ 错误用法
useInsertionEffect(() => {
  ref.current.style.color = 'red'; // 不能访问 ref
  setState(value); // 不能更新状态
}, []);

// ✅ 正确用法
useInsertionEffect(() => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  return () => document.head.removeChild(style);
}, [css]);
```

## 使用场景

### 场景 1：CSS-in-JS 库实现

```tsx
// 简化的 CSS-in-JS 实现示例
let styleCache = new Map<string, HTMLStyleElement>();

function useStyles(css: string) {
  useInsertionEffect(() => {
    // 检查缓存
    if (styleCache.has(css)) {
      return;
    }

    // 创建样式标签
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    styleCache.set(css, style);

    // 清理函数
    return () => {
      styleCache.delete(css);
      document.head.removeChild(style);
    };
  }, [css]);
}

// 使用
function StyledButton({ children }) {
  useStyles(`
    .my-button {
      background: blue;
      color: white;
      padding: 10px 20px;
    }
  `);

  return <button className="my-button">{children}</button>;
}
```

### 场景 2：动态主题注入

```tsx
function useTheme(theme: 'light' | 'dark') {
  useInsertionEffect(() => {
    const css = theme === 'dark'
      ? `:root { --bg: #1a1a1a; --text: #fff; }`
      : `:root { --bg: #fff; --text: #1a1a1a; }`;

    const style = document.createElement('style');
    style.id = 'theme-vars';
    style.textContent = css;

    // 移除旧的主题样式
    const existing = document.getElementById('theme-vars');
    if (existing) {
      document.head.removeChild(existing);
    }

    document.head.appendChild(style);

    return () => {
      const el = document.getElementById('theme-vars');
      if (el) document.head.removeChild(el);
    };
  }, [theme]);
}
```

### 场景 3：字体加载

```tsx
function useFontFace(fontFamily: string, src: string) {
  useInsertionEffect(() => {
    const css = `
      @font-face {
        font-family: '${fontFamily}';
        src: url('${src}');
        font-display: swap;
      }
    `;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [fontFamily, src]);
}
```

## 与 styled-components / Emotion 的关系

主流 CSS-in-JS 库如 styled-components 和 Emotion 在内部使用 `useInsertionEffect`：

```tsx
// styled-components 内部简化示意
function styled(Component) {
  return function StyledComponent(props) {
    const className = generateClassName(props);
    const css = generateCSS(props);

    useInsertionEffect(() => {
      injectStyles(className, css);
    }, [className, css]);

    return <Component {...props} className={className} />;
  };
}
```

## 最佳实践

### 1. 仅用于 CSS-in-JS 库

```tsx
// ✅ 库作者使用
function useCSS(css: string) {
  useInsertionEffect(() => {
    // 注入样式
  }, [css]);
}

// ❌ 普通应用开发者不应直接使用
function MyComponent() {
  useInsertionEffect(() => {
    // 通常不需要这样做
  });
}
```

### 2. 确保样式的唯一性

```tsx
function useStyles(id: string, css: string) {
  useInsertionEffect(() => {
    // 避免重复注入
    if (document.getElementById(id)) return;

    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById(id);
      if (el) document.head.removeChild(el);
    };
  }, [id, css]);
}
```

### 3. 正确清理

```tsx
useInsertionEffect(() => {
  const style = document.createElement('style');
  document.head.appendChild(style);

  // 必须清理，避免内存泄漏
  return () => {
    document.head.removeChild(style);
  };
}, []);
```

## 常见错误

### 错误 1：访问 DOM 元素

```tsx
// ❌ 错误：不能访问 refs
const ref = useRef();
useInsertionEffect(() => {
  ref.current.style.color = 'red'; // ref.current 是 null
}, []);
```

### 错误 2：更新状态

```tsx
// ❌ 错误：不能更新状态
useInsertionEffect(() => {
  setCount(1); // 不允许
}, []);
```

### 错误 3：用于非样式用途

```tsx
// ❌ 错误：不应用于非样式场景
useInsertionEffect(() => {
  document.title = 'New Title'; // 应该用 useEffect
}, []);
```

## 三个 Effect Hook 对比

| 特性 | useEffect | useLayoutEffect | useInsertionEffect |
|------|-----------|-----------------|-------------------|
| 执行时机 | 绘制后 | DOM 变更后，绘制前 | DOM 变更前 |
| 可访问 refs | ✅ | ✅ | ❌ |
| 可更新状态 | ✅ | ✅ | ❌ |
| 用途 | 副作用 | DOM 测量 | 样式注入 |
| 使用者 | 应用开发者 | 应用开发者 | 库作者 |

## 总结

| 适用场景 | 不适用场景 |
|----------|------------|
| CSS-in-JS 库开发 | 普通应用开发 |
| 动态样式注入 | DOM 操作 |
| 样式库内部实现 | 状态管理 |
| 字体加载 | 数据获取 |

`useInsertionEffect` 是一个非常专用的 Hook，主要面向 CSS-in-JS 库作者。普通应用开发者几乎不需要直接使用它，而是使用基于它构建的样式库。
