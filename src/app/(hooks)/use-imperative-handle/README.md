# useImperativeHandle Hook 详解

## 什么是 useImperativeHandle？

`useImperativeHandle` 是 React 的高级 Hook，用于**自定义暴露给父组件的实例值**。它让你可以控制通过 `ref` 暴露的内容，而不是直接暴露整个 DOM 节点。

```tsx
useImperativeHandle(ref, createHandle, [dependencies]);
```

## 为什么需要 useImperativeHandle？

### 问题场景

当使用 `forwardRef` 时，默认暴露的是整个 DOM 节点：

```tsx
// 子组件暴露整个 input 元素
const TextInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// 父组件可以访问所有 DOM 属性和方法
function Parent() {
  const inputRef = useRef();

  // 可以调用任何 DOM 方法，包括不想暴露的
  inputRef.current.value = "直接修改";
  inputRef.current.style.color = "red";
  inputRef.current.remove(); // 危险操作！
}
```

### useImperativeHandle 解决方案

```tsx
// 只暴露需要的方法
const TextInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 父组件只能调用暴露的方法
function Parent() {
  const inputRef = useRef();

  inputRef.current.focus(); // ✅ 可以
  inputRef.current.clear(); // ✅ 可以
  inputRef.current.remove(); // ❌ undefined
}
```

## 基本语法

```tsx
useImperativeHandle(
  ref,           // 从 forwardRef 接收的 ref
  () => ({       // 创建要暴露的对象
    method1: () => {},
    method2: () => {},
  }),
  [deps]         // 可选的依赖数组
);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `ref` | `Ref` | 从 `forwardRef` 接收的 ref 对象 |
| `createHandle` | `() => object` | 返回要暴露给父组件的对象 |
| `dependencies` | `any[]` | 可选，依赖项变化时重新创建 handle |

## 与 forwardRef 配合使用

`useImperativeHandle` 必须与 `forwardRef` 一起使用：

```tsx
interface InputHandle {
  focus: () => void;
  blur: () => void;
  getValue: () => string;
  setValue: (value: string) => void;
}

const CustomInput = forwardRef<InputHandle, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
    getValue: () => inputRef.current?.value ?? "",
    setValue: (value: string) => {
      if (inputRef.current) {
        inputRef.current.value = value;
      }
    }
  }));

  return <input ref={inputRef} {...props} />;
});
```

## 使用场景

### 场景 1：自定义表单控件

```tsx
interface FormInputHandle {
  focus: () => void;
  clear: () => void;
  validate: () => boolean;
  getValue: () => string;
}

const FormInput = forwardRef<FormInputHandle, FormInputProps>(
  ({ label, pattern, required }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),

      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
          setError(null);
        }
      },

      validate: () => {
        const value = inputRef.current?.value ?? "";

        if (required && !value) {
          setError("此字段为必填");
          return false;
        }

        if (pattern && !pattern.test(value)) {
          setError("格式不正确");
          return false;
        }

        setError(null);
        return true;
      },

      getValue: () => inputRef.current?.value ?? ""
    }));

    return (
      <div>
        <label>{label}</label>
        <input ref={inputRef} />
        {error && <span className="error">{error}</span>}
      </div>
    );
  }
);

// 父组件使用
function Form() {
  const emailRef = useRef<FormInputHandle>(null);
  const phoneRef = useRef<FormInputHandle>(null);

  const handleSubmit = () => {
    const isEmailValid = emailRef.current?.validate();
    const isPhoneValid = phoneRef.current?.validate();

    if (isEmailValid && isPhoneValid) {
      console.log({
        email: emailRef.current?.getValue(),
        phone: phoneRef.current?.getValue()
      });
    }
  };

  return (
    <form>
      <FormInput
        ref={emailRef}
        label="邮箱"
        required
        pattern={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
      />
      <FormInput
        ref={phoneRef}
        label="电话"
        pattern={/^\d{11}$/}
      />
      <button onClick={handleSubmit}>提交</button>
    </form>
  );
}
```

### 场景 2：复杂组件控制

```tsx
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoProps>(
  ({ src, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime ?? 0,
      getDuration: () => videoRef.current?.duration ?? 0
    }));

    return (
      <video
        ref={videoRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
      />
    );
  }
);
```

### 场景 3：模态框控制

```tsx
interface ModalHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ children, title }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen(prev => !prev)
    }));

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{title}</h2>
          {children}
          <button onClick={() => setIsOpen(false)}>关闭</button>
        </div>
      </div>
    );
  }
);

// 使用
function App() {
  const modalRef = useRef<ModalHandle>(null);

  return (
    <div>
      <button onClick={() => modalRef.current?.open()}>
        打开模态框
      </button>
      <Modal ref={modalRef} title="提示">
        <p>这是模态框内容</p>
      </Modal>
    </div>
  );
}
```

## 依赖项的使用

当 handle 方法需要访问组件的 state 或 props 时，需要添加依赖项：

```tsx
const Counter = forwardRef<CounterHandle, CounterProps>(
  ({ step = 1 }, ref) => {
    const [count, setCount] = useState(0);

    useImperativeHandle(
      ref,
      () => ({
        increment: () => setCount(c => c + step),
        decrement: () => setCount(c => c - step),
        getCount: () => count,
        reset: () => setCount(0)
      }),
      [step, count] // 依赖 step 和 count
    );

    return <div>Count: {count}</div>;
  }
);
```

## 最佳实践

### 1. 最小化暴露的 API

```tsx
// ❌ 暴露太多方法
useImperativeHandle(ref, () => ({
  focus, blur, select, click, scrollIntoView,
  getValue, setValue, clearValue,
  validate, setError, clearError,
  enable, disable, setReadOnly,
  // ... 太多了
}));

// ✅ 只暴露必要的方法
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  getValue: () => inputRef.current?.value ?? "",
  validate: () => { /* ... */ }
}));
```

### 2. 使用 TypeScript 定义接口

```tsx
// 定义明确的接口
interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
}

// 使用泛型确保类型安全
const CustomInput = forwardRef<CustomInputHandle, Props>((props, ref) => {
  // ...
});

// 父组件也能获得类型提示
const inputRef = useRef<CustomInputHandle>(null);
inputRef.current?.focus(); // 有自动补全
```

### 3. 避免暴露内部状态的直接引用

```tsx
// ❌ 暴露可变引用
useImperativeHandle(ref, () => ({
  getInputRef: () => inputRef.current // 危险
}));

// ✅ 只暴露操作方法
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  getValue: () => inputRef.current?.value ?? ""
}));
```

### 4. 考虑是否真的需要

很多时候可以用其他方式替代：

```tsx
// 方案 1：使用 ref（需要 useImperativeHandle）
const modalRef = useRef();
modalRef.current?.open();

// 方案 2：使用 state + props（更推荐）
const [isOpen, setIsOpen] = useState(false);
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
```

## 常见错误

### 错误 1：忘记使用 forwardRef

```tsx
// ❌ 错误：没有 forwardRef
function CustomInput({ ref }) {
  useImperativeHandle(ref, () => ({})); // ref 不会工作
}

// ✅ 正确：使用 forwardRef
const CustomInput = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({}));
});
```

### 错误 2：返回 undefined

```tsx
// ❌ 错误：忘记 return
useImperativeHandle(ref, () => {
  focus: () => {} // 这是语法错误
});

// ✅ 正确：返回对象
useImperativeHandle(ref, () => ({
  focus: () => {}
}));
```

### 错误 3：依赖项不完整

```tsx
// ❌ 错误：依赖项不完整
useImperativeHandle(ref, () => ({
  getTotal: () => price * quantity // 使用了 price 和 quantity
}), []); // 缺少依赖！

// ✅ 正确：包含所有依赖
useImperativeHandle(ref, () => ({
  getTotal: () => price * quantity
}), [price, quantity]);
```

## 总结

| 场景 | 是否使用 useImperativeHandle |
|------|------------------------------|
| 暴露自定义方法给父组件 | ✅ 使用 |
| 隐藏内部实现细节 | ✅ 使用 |
| 简单的 DOM 操作 | ❌ 直接用 ref |
| 控制组件的打开/关闭 | ⚠️ 考虑用 state + props |
| 复杂的命令式 API | ✅ 使用 |

`useImperativeHandle` 是一个强大但应该谨慎使用的 Hook。在大多数情况下，声明式的 props 传递是更好的选择。只在确实需要命令式 API 时才使用它。
