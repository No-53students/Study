# useOptimistic Hook 详解

## 什么是 useOptimistic？

`useOptimistic` 是 React 19 引入的新 Hook，用于实现**乐观更新**。它允许在异步操作（如网络请求）完成之前，立即在 UI 上显示预期的结果。

```tsx
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn);
```

## 为什么需要 useOptimistic？

### 问题场景：等待服务器响应

传统方式需要等待服务器确认后才更新 UI：

```tsx
// ❌ 传统方式：用户体验差
async function handleLike() {
  setLoading(true);
  await fetch('/api/like', { method: 'POST' });
  setLikes(likes + 1); // 等待完成才更新
  setLoading(false);
}
```

### useOptimistic 解决方案

```tsx
// ✅ 乐观更新：立即响应
const [optimisticLikes, addOptimisticLike] = useOptimistic(
  likes,
  (currentLikes, newLike) => currentLikes + 1
);

async function handleLike() {
  addOptimisticLike(1); // 立即更新 UI
  await fetch('/api/like', { method: 'POST' }); // 后台请求
  // 如果失败，会自动回滚到原始状态
}
```

## 基本语法

```tsx
const [optimisticState, addOptimistic] = useOptimistic(
  state,           // 当前真实状态
  updateFn         // (currentState, optimisticValue) => newState
);
```

### 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| `state` | `T` | 当前的真实状态 |
| `updateFn` | `(current: T, optimistic: V) => T` | 计算乐观状态的函数 |

### 返回值

| 返回值 | 类型 | 说明 |
|--------|------|------|
| `optimisticState` | `T` | 当前显示的状态（可能是乐观值） |
| `addOptimistic` | `(value: V) => void` | 触发乐观更新的函数 |

## 工作原理

```
用户点击"点赞"
    ↓
addOptimistic(1) → UI 立即显示 likes + 1
    ↓
发送网络请求 POST /api/like
    ↓
请求成功 → 服务器返回新数据 → 状态更新 → 乐观值被替换
请求失败 → 自动回滚到原始状态
```

## 使用场景

### 场景 1：点赞/收藏

```tsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, change: number) => current + change
  );

  async function handleLike() {
    addOptimisticLike(1);
    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST'
      });
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      // 失败时自动回滚
      console.error('点赞失败');
    }
  }

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

### 场景 2：待办事项

```tsx
function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function addTodo(text: string) {
    const newTodo = { id: Date.now(), text, completed: false, pending: true };
    addOptimisticTodo(newTodo);

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text })
      });
      const savedTodo = await response.json();
      setTodos([...todos, savedTodo]);
    } catch (error) {
      // 自动回滚
    }
  }

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### 场景 3：消息发送

```tsx
function Chat({ messages: serverMessages }) {
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    serverMessages,
    (state, newMessage: Message) => [
      ...state,
      { ...newMessage, sending: true }
    ]
  );

  async function sendMessage(formData: FormData) {
    const text = formData.get('message') as string;
    const tempMessage = {
      id: `temp-${Date.now()}`,
      text,
      sender: 'me',
      sending: true
    };

    addOptimisticMessage(tempMessage);

    await fetch('/api/messages', {
      method: 'POST',
      body: formData
    });
  }

  return (
    <div>
      {optimisticMessages.map(msg => (
        <div
          key={msg.id}
          style={{ opacity: msg.sending ? 0.7 : 1 }}
        >
          {msg.text}
          {msg.sending && ' ⏳'}
        </div>
      ))}
      <form action={sendMessage}>
        <input name="message" />
        <button type="submit">发送</button>
      </form>
    </div>
  );
}
```

### 场景 4：表单提交

```tsx
function ProfileForm({ profile }) {
  const [optimisticProfile, updateOptimisticProfile] = useOptimistic(
    profile,
    (current, updates: Partial<Profile>) => ({ ...current, ...updates })
  );

  async function handleSubmit(formData: FormData) {
    const updates = {
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
    };

    updateOptimisticProfile(updates);

    await fetch('/api/profile', {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  return (
    <form action={handleSubmit}>
      <input name="name" defaultValue={optimisticProfile.name} />
      <textarea name="bio" defaultValue={optimisticProfile.bio} />
      <button type="submit">保存</button>
    </form>
  );
}
```

## 配合 Server Actions 使用

`useOptimistic` 在 Next.js 的 Server Actions 中特别有用：

```tsx
'use client';

import { useOptimistic } from 'react';
import { addComment } from './actions';

function CommentSection({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  async function handleAddComment(formData: FormData) {
    const text = formData.get('text') as string;
    const optimisticComment = {
      id: `temp-${Date.now()}`,
      text,
      author: 'You',
      pending: true
    };

    addOptimisticComment(optimisticComment);
    await addComment(formData); // Server Action
  }

  return (
    <div>
      <ul>
        {optimisticComments.map(comment => (
          <li key={comment.id} className={comment.pending ? 'opacity-50' : ''}>
            <strong>{comment.author}:</strong> {comment.text}
          </li>
        ))}
      </ul>
      <form action={handleAddComment}>
        <input name="text" placeholder="添加评论..." />
        <button type="submit">发送</button>
      </form>
    </div>
  );
}
```

## 最佳实践

### 1. 标记乐观状态

```tsx
const [optimisticItems, addOptimisticItem] = useOptimistic(
  items,
  (state, newItem) => [
    ...state,
    { ...newItem, isPending: true } // 标记为待处理
  ]
);

// 渲染时显示不同样式
{optimisticItems.map(item => (
  <div style={{ opacity: item.isPending ? 0.5 : 1 }}>
    {item.name}
  </div>
))}
```

### 2. 处理错误

```tsx
async function handleAction() {
  addOptimistic(newValue);

  try {
    const result = await serverAction();
    // 成功：状态会被服务器返回的数据替换
  } catch (error) {
    // 失败：自动回滚
    // 可以显示错误提示
    toast.error('操作失败，请重试');
  }
}
```

### 3. 避免过度使用

```tsx
// ✅ 适合乐观更新
- 点赞/收藏
- 评论/留言
- 待办事项
- 即时消息

// ❌ 不适合乐观更新
- 支付操作
- 删除重要数据
- 需要严格验证的操作
```

## 常见错误

### 错误 1：忘记更新真实状态

```tsx
// ❌ 只有乐观更新，没有更新真实状态
async function handleLike() {
  addOptimisticLike(1);
  await fetch('/api/like');
  // 忘记 setLikes()
}

// ✅ 请求成功后更新真实状态
async function handleLike() {
  addOptimisticLike(1);
  const result = await fetch('/api/like');
  const data = await result.json();
  setLikes(data.likes); // 更新真实状态
}
```

### 错误 2：乐观值与服务器不一致

```tsx
// ❌ 本地计算可能与服务器不一致
addOptimisticLike(likes + 1); // 可能已过期

// ✅ 服务器作为数据源
const result = await fetch('/api/like');
setLikes(result.likes); // 使用服务器返回值
```

## 总结

| 适用场景 | 不适用场景 |
|----------|------------|
| 社交互动（点赞、评论） | 支付交易 |
| 即时消息 | 敏感数据修改 |
| 待办事项 | 需要严格验证的操作 |
| 表单提交 | 不可逆操作 |

`useOptimistic` 是提升用户体验的强大工具，但应该谨慎使用，确保在操作失败时有适当的回滚机制和错误处理。
