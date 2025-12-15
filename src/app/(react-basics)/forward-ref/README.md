# forwardRef

## 简介

`forwardRef` 允许组件将 ref 转发给子组件的 DOM 节点。这在创建可复用组件库时非常有用，让父组件能够访问子组件内部的 DOM 元素。

## 基本语法

```tsx
import { forwardRef } from 'react';

const MyInput = forwardRef<HTMLInputElement, InputProps>(
  function MyInput(props, ref) {
    return <input ref={ref} {...props} />;
  }
);
```

## 为什么需要 forwardRef？

默认情况下，ref 不会作为 props 传递给函数组件：

```tsx
// ❌ 这样不起作用
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// ✅ 使用 forwardRef
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} {...props} />;
});
```

## 使用场景

### 1. 自定义输入组件

```tsx
const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput({ label, ...props }, ref) {
    return (
      <div className="input-wrapper">
        <label>{label}</label>
        <input ref={ref} {...props} />
      </div>
    );
  }
);

// 使用
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <CustomInput ref={inputRef} label="用户名" />
      <button onClick={focusInput}>聚焦输入框</button>
    </>
  );
}
```

### 2. 组件库中的包装组件

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = 'primary', children, ...props }, ref) {
    return (
      <button
        ref={ref}
        className={`btn btn-${variant}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
```

### 3. 高阶组件 (HOC)

```tsx
function withLogging<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return forwardRef<HTMLElement, T>(function WithLogging(props, ref) {
    useEffect(() => {
      console.log('Component mounted');
    }, []);

    return <WrappedComponent {...props} ref={ref} />;
  });
}
```

## 结合 useImperativeHandle

`forwardRef` 常与 `useImperativeHandle` 配合，暴露自定义的方法：

```tsx
interface InputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const CustomInput = forwardRef<InputHandle, InputProps>(
  function CustomInput(props, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
      getValue() {
        return inputRef.current?.value ?? '';
      }
    }));

    return <input ref={inputRef} {...props} />;
  }
);
```

## TypeScript 类型定义

### 基本类型定义

```tsx
// 定义组件 props
interface MyComponentProps {
  label: string;
  disabled?: boolean;
}

// 使用泛型定义 ref 和 props 类型
const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  function MyComponent({ label, disabled }, ref) {
    return (
      <div ref={ref} aria-disabled={disabled}>
        {label}
      </div>
    );
  }
);
```

### 自定义 ref 类型

```tsx
interface CustomHandle {
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

const ScrollContainer = forwardRef<CustomHandle, ScrollContainerProps>(
  function ScrollContainer({ children }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      scrollToTop() {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      },
      scrollToBottom() {
        const el = containerRef.current;
        el?.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
      }
    }));

    return <div ref={containerRef}>{children}</div>;
  }
);
```

## 注意事项

### 1. 不要过度使用

只在真正需要访问 DOM 的场景使用 ref：
- 管理焦点
- 触发动画
- 集成第三方 DOM 库

### 2. 避免暴露过多实现细节

```tsx
// ❌ 暴露整个 DOM 节点
const Input = forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

// ✅ 只暴露需要的方法
const Input = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  return <input ref={inputRef} {...props} />;
});
```

### 3. 组件显示名称

为了更好的调试体验，设置组件的 displayName：

```tsx
const MyInput = forwardRef<HTMLInputElement, Props>(
  function MyInput(props, ref) {
    return <input ref={ref} {...props} />;
  }
);

// 或者使用 displayName
MyInput.displayName = 'MyInput';
```

## React 19 中的变化

在 React 19 中，ref 可以作为普通 prop 传递给函数组件，不再需要 forwardRef：

```tsx
// React 19+
function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// 使用方式相同
<MyInput ref={inputRef} />
```

但 forwardRef 仍然被支持，以保持向后兼容性。

## 最佳实践

1. **命名函数组件**：使用命名函数而非箭头函数，便于调试
2. **类型安全**：使用 TypeScript 泛型确保类型安全
3. **限制暴露**：结合 useImperativeHandle 只暴露必要的方法
4. **文档化**：为暴露的 ref 接口编写清晰的文档

## 总结

| 场景 | 是否使用 forwardRef |
|------|-------------------|
| 自定义表单控件 | ✅ 推荐 |
| 组件库开发 | ✅ 必要 |
| 需要访问子组件 DOM | ✅ 适用 |
| 普通业务组件 | ❌ 通常不需要 |
| 状态管理 | ❌ 使用 props/context |
