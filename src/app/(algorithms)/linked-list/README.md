# 链表 (Linked List)

## 概念介绍

**链表**是一种线性数据结构，由一系列**节点**组成，每个节点包含**数据域**和**指针域**。与数组不同，链表元素在内存中不必连续存储。

### 链表类型

| 类型 | 描述 | 特点 |
|------|------|------|
| 单向链表 | 每个节点只有 next 指针 | 只能向后遍历 |
| 双向链表 | 每个节点有 prev 和 next 指针 | 可双向遍历 |
| 循环链表 | 尾节点指向头节点 | 形成环形结构 |

### 数组 vs 链表

| 操作 | 数组 | 链表 |
|------|------|------|
| 随机访问 | O(1) | O(n) |
| 头部插入 | O(n) | O(1) |
| 尾部插入 | O(1)* | O(n) / O(1)** |
| 中间插入 | O(n) | O(1)*** |
| 内存分配 | 连续 | 分散 |

> *动态数组摊销复杂度
> **如果维护尾指针则为 O(1)
> ***已知插入位置时

## JavaScript 实现

### 节点定义

```typescript
class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}
```

### 单向链表

```typescript
class LinkedList<T> {
  head: ListNode<T> | null = null;
  size: number = 0;

  // 在末尾添加
  append(value: T): void {
    const node = new ListNode(value);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  // 在开头添加
  prepend(value: T): void {
    const node = new ListNode(value);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // 在指定位置插入
  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }
    if (index === 0) {
      this.prepend(value);
      return;
    }

    const node = new ListNode(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current!.next;
    }
    node.next = current!.next;
    current!.next = node;
    this.size++;
  }

  // 删除指定位置
  removeAt(index: number): T | null {
    if (index < 0 || index >= this.size) {
      return null;
    }

    let removed: ListNode<T>;
    if (index === 0) {
      removed = this.head!;
      this.head = this.head!.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }
      removed = current!.next!;
      current!.next = removed.next;
    }
    this.size--;
    return removed.value;
  }

  // 查找
  find(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // 转为数组
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}
```

### 双向链表

```typescript
class DoublyListNode<T> {
  value: T;
  prev: DoublyListNode<T> | null = null;
  next: DoublyListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class DoublyLinkedList<T> {
  head: DoublyListNode<T> | null = null;
  tail: DoublyListNode<T> | null = null;
  size: number = 0;

  append(value: T): void {
    const node = new DoublyListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail!.next = node;
      this.tail = node;
    }
    this.size++;
  }

  prepend(value: T): void {
    const node = new DoublyListNode(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  removeFromEnd(): T | null {
    if (!this.tail) return null;
    const value = this.tail.value;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = this.tail.prev;
      this.tail!.next = null;
    }
    this.size--;
    return value;
  }
}
```

## 面试高频题

### 1. 反转链表 (LeetCode 206)

```javascript
// 迭代法
function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next; // 保存下一个
    current.next = prev;       // 反转指针
    prev = current;            // prev 前进
    current = next;            // current 前进
  }

  return prev;
}

// 递归法
function reverseListRecursive(head) {
  if (!head || !head.next) {
    return head;
  }

  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}
```

### 2. 环形链表 (LeetCode 141)

```javascript
// Floyd 判圈算法（快慢指针）
function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;       // 慢指针走一步
    fast = fast.next.next;  // 快指针走两步

    if (slow === fast) {
      return true; // 相遇说明有环
    }
  }

  return false;
}
```

### 3. 环形链表 II - 找入环点 (LeetCode 142)

```javascript
function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 第一阶段：找到相遇点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null;

  // 第二阶段：找入环点
  // 从头和相遇点同时出发，相遇点即为入环点
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
}
```

### 4. 合并两个有序链表 (LeetCode 21)

```javascript
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2;
  return dummy.next;
}
```

### 5. 删除链表倒数第 N 个节点 (LeetCode 19)

```javascript
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let fast = dummy;
  let slow = dummy;

  // 快指针先走 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // 同时移动，直到快指针到达末尾
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // 删除节点
  slow.next = slow.next.next;

  return dummy.next;
}
```

### 6. 链表的中间节点 (LeetCode 876)

```javascript
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

### 7. 相交链表 (LeetCode 160)

```javascript
function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  // 当 pA 和 pB 相遇时，即为交点
  // 如果没有交点，两者都会变成 null
  while (pA !== pB) {
    pA = pA ? pA.next : headB;
    pB = pB ? pB.next : headA;
  }

  return pA;
}
```

### 8. 回文链表 (LeetCode 234)

```javascript
function isPalindrome(head) {
  if (!head || !head.next) return true;

  // 1. 找到中点
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 2. 反转后半部分
  let secondHalf = reverseList(slow.next);

  // 3. 比较
  let p1 = head;
  let p2 = secondHalf;
  let result = true;

  while (p2) {
    if (p1.val !== p2.val) {
      result = false;
      break;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // 4. 恢复链表（可选）
  slow.next = reverseList(secondHalf);

  return result;
}
```

## 常用技巧

### 1. 虚拟头节点 (Dummy Node)

```javascript
const dummy = new ListNode(0);
dummy.next = head;
// 操作后返回 dummy.next
```

**适用场景**：头节点可能被删除或修改的情况

### 2. 快慢指针

```javascript
let slow = head;
let fast = head;

while (fast && fast.next) {
  slow = slow.next;
  fast = fast.next.next;
}
```

**适用场景**：找中点、检测环、找倒数第 N 个节点

### 3. 递归思想

链表天然适合递归处理，每次处理一个节点，剩余部分递归处理。

## 前端应用

虽然前端很少直接使用链表，但理解链表有助于：

1. **理解 React Fiber**: React 的 Fiber 架构使用链表结构
2. **撤销/重做**: 可以用双向链表实现
3. **LRU 缓存**: 结合哈希表和双向链表实现
4. **理解底层**: 很多数据结构底层使用链表

## 复杂度总结

| 操作 | 单向链表 | 双向链表 |
|------|---------|---------|
| 头部插入 | O(1) | O(1) |
| 尾部插入 | O(n) | O(1) |
| 头部删除 | O(1) | O(1) |
| 尾部删除 | O(n) | O(1) |
| 按值查找 | O(n) | O(n) |
| 按索引访问 | O(n) | O(n) |
| 空间复杂度 | O(n) | O(n) |
