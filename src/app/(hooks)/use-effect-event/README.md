# useEffectEvent Hook 详解

## 什么是 useEffectEvent？

`useEffectEvent` 是 React 19.2 引入的 Hook，用于从 Effect 中提取**非响应式逻辑**。它允许你创建一个"事件函数"，该函数始终能访问到最新的 props 和 state，但不会触发 Effect 的重新执行。

```tsx
const onSomething = useEffectEvent((param) => {
  // 总是能访问最新的 props/state
  // 不会成为 Effect 的依赖
});
```

## 为什么需要 useEffectEvent？

### 问题场景：Effect 依赖困境

```tsx
// ❌ 问题：每次 onMessage 变化都会重新连接
function ChatRoom({ roomId, onMessage }) {
  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', (msg) => {
      onMessage(msg); // onMessage 是依赖项
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, onMessage]); // onMessage 变化导致重连
}
```

### useEffectEvent 解决方案

```tsx
// ✅ useEffectEvent 不会成为依赖
function ChatRoom({ roomId, onMessage }) {
  const onReceiveMessage = useEffectEvent((msg) => {
    onMessage(msg); // 总是使用最新的 onMessage
  });

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('message', onReceiveMessage);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // 只依赖 roomId，不再包含 onMessage
}
```

## 基本语法

```tsx
import { useEffectEvent } from 'react';

const eventHandler = useEffectEvent((arg) => {
  // 可以访问最新的 props/state
  // 不需要添加到依赖数组
});
```

## 工作原理

`useEffectEvent` 创建的函数：
1. **不是响应式的**：不会触发 Effect 重新执行
2. **总是最新的**：每次调用都能访问最新的 props/state
3. **不能作为依赖**：ESLint 规则会阻止将其加入依赖数组

```
普通函数在 Effect 中：
  props 变化 → 函数引用变化 → Effect 重新执行

useEffectEvent 函数：
  props 变化 → 函数内容更新 → Effect 不重新执行
```

## 使用场景

### 场景 1：事件回调与 Effect 分离

```tsx
function ShoppingCart({ items, onCheckout }) {
  // 将事件逻辑提取出来
  const handleCheckout = useEffectEvent(() => {
    onCheckout(items); // 使用最新的 items
  });

  useEffect(() => {
    // 当购物车满足条件时自动触发
    if (items.length >= 10) {
      showDiscount();
      // 调用 handleCheckout 不会导致 Effect 重新运行
    }
  }, [items.length]); // 只依赖 items.length

  return (
    <button onClick={handleCheckout}>
      结账 ({items.length} 件)
    </button>
  );
}
```

### 场景 2：日志记录

```tsx
function Page({ url, analyticsConfig }) {
  // 日志记录逻辑不应该触发 Effect 重新执行
  const logVisit = useEffectEvent(() => {
    sendAnalytics(url, analyticsConfig);
  });

  useEffect(() => {
    logVisit(); // 页面访问时记录
  }, [url]); // 只有 url 变化时才重新执行
}
```

### 场景 3：WebSocket 消息处理

```tsx
function Chat({ roomId, showNotification, playSound }) {
  // 消息通知逻辑
  const onMessage = useEffectEvent((message) => {
    if (showNotification) {
      notify(message);
    }
    if (playSound) {
      playMessageSound();
    }
  });

  useEffect(() => {
    const socket = new WebSocket(`/ws/${roomId}`);
    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      onMessage(message); // 不会导致重连
    };
    return () => socket.close();
  }, [roomId]); // 只依赖 roomId
}
```

### 场景 4：定时器回调

```tsx
function Timer({ duration, onComplete }) {
  const [remaining, setRemaining] = useState(duration);

  // 完成回调不应触发重新设置定时器
  const handleComplete = useEffectEvent(() => {
    onComplete(duration);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          handleComplete();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [duration]); // 不包含 onComplete

  return <div>{remaining}s</div>;
}
```

### 场景 5：动画结束处理

```tsx
function AnimatedComponent({ targetPosition, onAnimationEnd }) {
  const ref = useRef(null);

  // 动画结束回调
  const handleAnimationEnd = useEffectEvent(() => {
    onAnimationEnd(targetPosition);
  });

  useEffect(() => {
    const element = ref.current;

    // 动画到新位置
    animate(element, { x: targetPosition });

    const onEnd = () => handleAnimationEnd();
    element.addEventListener('animationend', onEnd);

    return () => {
      element.removeEventListener('animationend', onEnd);
    };
  }, [targetPosition]); // 不依赖 onAnimationEnd

  return <div ref={ref}>Moving...</div>;
}
```

## 与 useCallback 的区别

| 特性 | useEffectEvent | useCallback |
|------|----------------|-------------|
| 依赖数组 | 无 | 有 |
| 是否响应式 | 否 | 是 |
| 可作为 Effect 依赖 | 否 | 是 |
| 适用场景 | Effect 中的事件 | 普通回调 |
| 触发重新执行 | 不会 | 依赖变化时会 |

```tsx
// useCallback: 依赖变化时创建新函数
const handleClick = useCallback(() => {
  console.log(count);
}, [count]); // count 变化时更新

// useEffectEvent: 永远是最新的，但不触发更新
const logCount = useEffectEvent(() => {
  console.log(count); // 总是最新的 count
});
```

## 最佳实践

### 1. 只用于 Effect 中的"事件"

```tsx
// ✅ 适合：Effect 触发的事件处理
const onTick = useEffectEvent(() => {
  onProgress(progress);
});

// ❌ 不适合：用户点击事件
const onClick = useEffectEvent(() => { // 不需要
  doSomething();
});
```

### 2. 不要用来消除 ESLint 警告

```tsx
// ❌ 错误：只是为了消除警告
const doSomething = useEffectEvent(() => {
  // 这里应该是响应式逻辑
});

// ✅ 正确：真正的非响应式事件
const logEvent = useEffectEvent(() => {
  analytics.log(eventData);
});
```

### 3. 保持函数聚焦

```tsx
// ✅ 好：单一职责
const onTrack = useEffectEvent(() => {
  sendAnalytics(page, user);
});

// ❌ 不好：混合逻辑
const doEverything = useEffectEvent(() => {
  sendAnalytics(page, user);
  updateState(); // 这应该在别处
  navigate(); // 这也是
});
```

## 注意事项

### 1. 仍在实验阶段

```tsx
// React 19.2 中可用，但 API 可能变化
import { useEffectEvent } from 'react';
// 或者从 experimental
import { experimental_useEffectEvent as useEffectEvent } from 'react';
```

### 2. 不能在 Effect 外调用

```tsx
const handler = useEffectEvent(() => {});

// ❌ 不推荐：在渲染中调用
return <div>{handler()}</div>;

// ✅ 推荐：在 Effect 中调用
useEffect(() => {
  handler();
}, []);
```

### 3. 不能传递给子组件

```tsx
const handler = useEffectEvent(() => {});

// ❌ 不推荐
return <Child onEvent={handler} />;

// ✅ 使用 useCallback
const callback = useCallback(() => {
  handler();
}, []);
return <Child onEvent={callback} />;
```

## 常见错误

### 错误 1：将其加入依赖数组

```tsx
// ❌ ESLint 会警告
const handler = useEffectEvent(() => {});
useEffect(() => {
  handler();
}, [handler]); // 不应该包含

// ✅ 正确
useEffect(() => {
  handler();
}, []); // 不包含 handler
```

### 错误 2：用于所有回调

```tsx
// ❌ 过度使用
const onClick = useEffectEvent(() => {}); // 不需要
const onChange = useEffectEvent(() => {}); // 不需要

// ✅ 只用于 Effect 中的事件
const onEffectEvent = useEffectEvent(() => {});
```

## 总结

| 使用场景 | 是否使用 useEffectEvent |
|----------|------------------------|
| Effect 中的日志/分析 | ✅ |
| 订阅回调（WebSocket等） | ✅ |
| 定时器完成回调 | ✅ |
| 用户点击事件 | ❌ 用 useCallback |
| 普通事件处理 | ❌ 不需要 |
| 只是消除 ESLint 警告 | ❌ 重新思考设计 |

`useEffectEvent` 是解决 Effect 依赖困境的优雅方案，让你能够在 Effect 中使用"事件函数"，这些函数总是能访问最新的 props/state，但不会触发 Effect 的重新执行。
