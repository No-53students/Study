# useRef Hook 详解

## 什么是 useRef？

`useRef` 是 React 的一个基础 Hook，用于**创建一个可变的引用对象**，该对象在组件的整个生命周期内保持不变。

```tsx
const ref = useRef(initialValue);
```

## useRef 的两大用途

### 用途 1：访问 DOM 元素

```tsx
function TextInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>聚焦输入框</button>
    </>
  );
}
```

### 用途 2：存储可变值（不触发重新渲染）

```tsx
function Timer() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
    console.log(`点击了 ${countRef.current} 次`);
    // 注意：UI 不会更新！
  };

  return <button onClick={handleClick}>点击</button>;
}
```

## 基本语法

```tsx
const ref = useRef<T>(initialValue);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `initialValue` | `T` | 初始值，只在首次渲染时使用 |

### 返回值

返回一个 `MutableRefObject`：

```tsx
{
  current: T  // 可读写的值
}
```

## useRef vs useState

| 特性 | useRef | useState |
|------|--------|----------|
| 更新时重新渲染 | ❌ 不会 | ✅ 会 |
| 值保持最新 | ✅ 立即更新 | ❌ 下次渲染 |
| 适用场景 | DOM 引用、定时器 ID | UI 状态 |
| 在渲染中读取 | ⚠️ 不推荐 | ✅ 推荐 |

## 使用场景

### 场景 1：访问 DOM 元素

```tsx
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = () => videoRef.current?.play();
  const pause = () => videoRef.current?.pause();

  return (
    <div>
      <video ref={videoRef} src="/video.mp4" />
      <button onClick={play}>播放</button>
      <button onClick={pause}>暂停</button>
    </div>
  );
}
```

### 场景 2：存储定时器 ID

```tsx
function Stopwatch() {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime(t => t + 1);
    }, 1000);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const reset = () => {
    stop();
    setTime(0);
  };

  // 清理
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <p>{time} 秒</p>
      <button onClick={start}>开始</button>
      <button onClick={stop}>停止</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}
```

### 场景 3：保存上一次的值

```tsx
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>当前: {count}，之前: {prevCount}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

### 场景 4：跟踪组件是否已挂载

```tsx
function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
}

function AsyncComponent() {
  const isMounted = useIsMounted();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(result => {
      // 只有组件还挂载时才更新状态
      if (isMounted.current) {
        setData(result);
      }
    });
  }, []);

  return <div>{data}</div>;
}
```

### 场景 5：避免闭包陷阱

```tsx
function Chat() {
  const [message, setMessage] = useState('');
  const messageRef = useRef(message);

  // 保持 ref 与 state 同步
  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  const sendDelayedMessage = () => {
    setTimeout(() => {
      // 使用 ref 获取最新值，而不是闭包中的旧值
      alert(`发送消息: ${messageRef.current}`);
    }, 3000);
  };

  return (
    <div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendDelayedMessage}>
        3秒后发送
      </button>
    </div>
  );
}
```

## 转发 ref（forwardRef）

当需要让父组件访问子组件的 DOM 时：

```tsx
// 子组件
const FancyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return <input ref={ref} className="fancy" {...props} />;
});

// 父组件
function Parent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        聚焦
      </button>
    </div>
  );
}
```

## 常见错误

### 错误 1：在渲染期间读写 ref

```tsx
// ❌ 错误：在渲染期间修改 ref
function Counter() {
  const countRef = useRef(0);
  countRef.current += 1; // 不要这样做！

  return <div>{countRef.current}</div>;
}

// ✅ 正确：在事件处理或 useEffect 中修改
function Counter() {
  const countRef = useRef(0);

  const handleClick = () => {
    countRef.current += 1;
  };

  return <button onClick={handleClick}>点击</button>;
}
```

### 错误 2：期望 ref 变化触发渲染

```tsx
// ❌ 错误：期望 UI 更新
function Counter() {
  const countRef = useRef(0);

  return (
    <div>
      <p>{countRef.current}</p> {/* 不会更新！ */}
      <button onClick={() => countRef.current++}>+1</button>
    </div>
  );
}

// ✅ 正确：需要 UI 更新时使用 useState
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}
```

### 错误 3：忘记 null 检查

```tsx
// ❌ 可能出错
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current.focus(); // TypeScript 报错
  };
}

// ✅ 正确：使用可选链
function Form() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current?.focus();
  };
}
```

## 与 useImperativeHandle 配合

自定义暴露给父组件的实例值：

```tsx
interface InputHandle {
  focus: () => void;
  clear: () => void;
}

const CustomInput = forwardRef<InputHandle, Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }));

  return <input ref={inputRef} {...props} />;
});

// 父组件
function Parent() {
  const inputRef = useRef<InputHandle>(null);

  return (
    <div>
      <CustomInput ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>聚焦</button>
      <button onClick={() => inputRef.current?.clear()}>清空</button>
    </div>
  );
}
```

## 最佳实践

### 1. 选择正确的工具

```tsx
// 需要触发渲染？用 useState
const [count, setCount] = useState(0);

// 只需要存储值？用 useRef
const countRef = useRef(0);
```

### 2. 类型安全

```tsx
// DOM 元素初始化为 null
const divRef = useRef<HTMLDivElement>(null);

// 普通值提供类型
const countRef = useRef<number>(0);

// 可能为 undefined 的值
const valueRef = useRef<string | undefined>(undefined);
```

### 3. 清理定时器

```tsx
function Timer() {
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      // ...
    }, 1000);

    // 清理函数
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
}
```

## 总结

| 场景 | 使用 |
|------|------|
| 访问 DOM 元素 | `useRef<HTMLElement>(null)` |
| 存储定时器 ID | `useRef<NodeJS.Timeout>()` |
| 保存上一次的值 | `useRef<T>()` |
| 避免闭包陷阱 | `useRef` 配合 `useEffect` |
| 存储不触发渲染的值 | `useRef<T>(initialValue)` |

`useRef` 是 React 中非常基础但强大的 Hook，正确使用它可以解决很多与 DOM 操作和值持久化相关的问题。
