# useEffect Hook 详解

> **难度等级：** ⭐ 入门
>
> **本示例中使用的其他 Hook/API：**
> - `useState` - 存储状态

## 什么是 useEffect？

`useEffect` 用于在函数组件中执行**副作用**（Side Effects），如数据获取、订阅、手动 DOM 操作等。

```tsx
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数（可选）
  };
}, [dependencies]);
```

## 什么是副作用？

副作用是指那些不能在渲染期间完成的操作：

| 副作用类型 | 示例 |
|-----------|------|
| 数据获取 | 调用 API、读取数据库 |
| 订阅 | WebSocket、事件监听 |
| DOM 操作 | 修改标题、操作焦点 |
| 定时器 | setTimeout、setInterval |
| 日志记录 | 打印日志、发送分析数据 |

## 基本语法

```tsx
useEffect(setup, dependencies?)
```

### 参数说明

| 参数 | 说明 |
|------|------|
| `setup` | 包含副作用逻辑的函数，可选返回清理函数 |
| `dependencies` | 依赖项数组，决定何时重新执行 |

## 依赖项详解

### 1. 无依赖项 - 每次渲染后执行

```tsx
useEffect(() => {
  console.log('每次渲染后都会执行');
});
```

### 2. 空数组 - 仅在挂载时执行一次

```tsx
useEffect(() => {
  console.log('只在组件挂载时执行一次');

  return () => {
    console.log('组件卸载时执行清理');
  };
}, []);
```

### 3. 有依赖项 - 依赖变化时执行

```tsx
useEffect(() => {
  console.log(`count 变化了: ${count}`);
}, [count]); // 只有 count 变化时才执行
```

## 使用场景

### 场景 1: 数据获取

```tsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]); // userId 变化时重新获取

  if (loading) return <div>加载中...</div>;
  return <div>{user.name}</div>;
}
```

### 场景 2: 事件监听

```tsx
function WindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // 清理函数：移除事件监听
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 空数组：只在挂载/卸载时执行

  return <div>{size.width} x {size.height}</div>;
}
```

### 场景 3: 定时器

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // 清理函数：清除定时器
    return () => clearInterval(interval);
  }, []);

  return <div>已运行 {seconds} 秒</div>;
}
```

### 场景 4: 修改文档标题

```tsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;

    // 可选：恢复原标题
    return () => {
      document.title = 'React App';
    };
  }, [title]);

  return <h1>{title}</h1>;
}
```

### 场景 5: localStorage 同步

```tsx
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## 清理函数

清理函数用于在以下时机执行清理工作：
1. 组件卸载时
2. 下次 effect 执行前（当依赖项变化时）

```tsx
useEffect(() => {
  const subscription = api.subscribe(id);

  return () => {
    // 这个函数会在：
    // 1. 组件卸载时执行
    // 2. id 变化时，在新的 effect 执行前执行
    subscription.unsubscribe();
  };
}, [id]);
```

### 清理函数的执行时机

```tsx
// 假设 id 从 1 变为 2：
// 1. 组件渲染（id = 2）
// 2. 执行旧 effect 的清理函数（清理 id = 1 的订阅）
// 3. 执行新 effect（订阅 id = 2）
```

## 常见错误

### 错误 1: 遗漏依赖项

```tsx
// ❌ 错误：使用了 count 但没有加入依赖
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // 永远是初始值
  }, 1000);
  return () => clearInterval(interval);
}, []); // 应该加入 [count]

// ✅ 正确：使用函数式更新避免依赖
useEffect(() => {
  const interval = setInterval(() => {
    setCount(c => c + 1); // 不需要依赖 count
  }, 1000);
  return () => clearInterval(interval);
}, []);
```

### 错误 2: 无限循环

```tsx
// ❌ 错误：在 effect 中更新依赖项
useEffect(() => {
  setCount(count + 1); // 触发重渲染 -> 又触发 effect -> 无限循环
}, [count]);

// ❌ 错误：对象/数组作为依赖项
useEffect(() => {
  // ...
}, [{ id: 1 }]); // 每次渲染都是新对象，导致无限执行
```

### 错误 3: 忘记清理

```tsx
// ❌ 错误：没有清理订阅，导致内存泄漏
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ 正确：添加清理函数
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

## useEffect vs 事件处理器

| 场景 | 使用 |
|------|------|
| 用户点击按钮 | 事件处理器 |
| 组件显示时获取数据 | useEffect |
| 状态变化时同步外部系统 | useEffect |
| 用户提交表单 | 事件处理器 |

```tsx
// 事件处理器：用户主动触发
const handleClick = () => {
  sendAnalytics('button_clicked');
};

// useEffect：状态变化时自动触发
useEffect(() => {
  sendAnalytics('page_viewed');
}, [pageId]);
```

## 异步操作

useEffect 的回调不能是 async 函数，但可以在内部使用：

```tsx
// ❌ 错误
useEffect(async () => {
  const data = await fetchData();
}, []);

// ✅ 正确：内部定义 async 函数
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/data');
    const data = await response.json();
    setData(data);
  };

  fetchData();
}, []);

// ✅ 正确：使用 IIFE
useEffect(() => {
  (async () => {
    const data = await fetchData();
    setData(data);
  })();
}, []);
```

## Strict Mode 下的双重执行

在开发模式的 Strict Mode 下，React 会故意双重调用 effect：

```tsx
useEffect(() => {
  console.log('连接服务器');
  return () => console.log('断开连接');
}, []);

// Strict Mode 下会输出：
// 连接服务器
// 断开连接
// 连接服务器
```

这是为了帮助你发现清理函数的问题。确保你的 effect 可以被安全地执行多次。

## useEffect vs useLayoutEffect

| Hook | 执行时机 | 用途 |
|------|---------|------|
| useEffect | 浏览器绑制后异步执行 | 大多数副作用 |
| useLayoutEffect | DOM 更新后同步执行 | 需要测量 DOM |

## 最佳实践

1. **每个 effect 做一件事**：多个独立的副作用应该分开写
2. **正确设置依赖项**：使用 ESLint 插件检查
3. **始终添加清理函数**：订阅、定时器、事件监听等
4. **避免在 effect 中更新状态**：可能导致无限循环
5. **考虑是否真的需要 effect**：有时事件处理器更合适

## 总结

| 依赖项 | 执行时机 |
|--------|---------|
| 无 | 每次渲染后 |
| `[]` | 仅挂载时 |
| `[a, b]` | a 或 b 变化时 |

```tsx
useEffect(() => {
  // 副作用逻辑
  return () => {
    // 清理函数
  };
}, [dependencies]);
```
