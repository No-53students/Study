import { Problem } from "../types";

// 链表分类题目
export const linkedListProblems: Problem[] = [
  // 1. 环形链表 (141)
  {
    id: "linked-list-cycle",
    leetcodeId: 141,
    title: "环形链表",
    titleEn: "Linked List Cycle",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表", "双指针", "哈希表"],
    description: `给你一个链表的头节点 \`head\`，判断链表中是否有环。

如果链表中有某个节点，可以通过连续跟踪 \`next\` 指针再次到达，则链表中存在环。为了表示给定链表中的环，评测系统内部使用整数 \`pos\` 来表示链表尾连接到链表中的位置（索引从 0 开始）。**注意：\`pos\` 不作为参数进行传递**。仅仅是为了标识链表的实际情况。

如果链表中存在环，则返回 \`true\`。否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。
\`\`\`

**示例 3：**
\`\`\`
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
\`\`\``,
    constraints: `- 链表中节点的数目范围是 \`[0, 10^4]\`
- \`-10^5 <= Node.val <= 10^5\`
- \`pos\` 为 \`-1\` 或者链表中的一个 **有效索引**

**进阶：** 你能用 O(1)（即，常量）内存解决此问题吗？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function hasCycle(head) {
  // 在此处编写你的代码

}`,
    solution: `function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}`,
    testCases: [
      { id: "1", name: "有环", input: [[3, 2, 0, -4], 1], expected: true },
      { id: "2", name: "有环2", input: [[1, 2], 0], expected: true },
      { id: "3", name: "无环", input: [[1], -1], expected: false },
    ],
    hints: [
      "使用快慢指针",
      "慢指针每次走一步，快指针每次走两步",
      "如果有环，快慢指针一定会相遇",
    ],
    explanation: `## 解题思路

### 快慢指针（Floyd 判圈算法）

1. 初始化快慢指针都指向 head
2. 慢指针每次走一步，快指针每次走两步
3. 如果有环，快指针最终会追上慢指针
4. 如果无环，快指针会到达链表末尾

### 为什么快慢指针能检测环？

假设有环：
- 当慢指针进入环时，快指针已经在环中
- 设快指针领先慢指针 k 步
- 每次迭代，快指针追近 1 步
- 经过 k 次迭代后，两指针相遇

### 方法二：哈希表

- 遍历链表，将每个节点加入 Set
- 如果当前节点已在 Set 中，说明有环
- 空间复杂度 O(n)

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["linked-list-cycle-ii", "merge-two-sorted-lists"],
    solutions: [
      {
        name: "快慢指针（推荐）",
        code: `function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
}`,
        explanation: `## 快慢指针（Floyd 判圈算法）

### 思路
1. 初始化快慢指针都指向 head
2. 慢指针每次走一步，快指针每次走两步
3. 如果有环，快指针最终会追上慢指针
4. 如果无环，快指针会到达链表末尾

### 为什么快慢指针能检测环？
假设有环：
- 当慢指针进入环时，快指针已经在环中
- 每次迭代，快指针追近 1 步
- 最终两指针一定会相遇`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        code: `function hasCycle(head) {
  const seen = new Set();

  while (head) {
    if (seen.has(head)) {
      return true;
    }
    seen.add(head);
    head = head.next;
  }

  return false;
}`,
        explanation: `## 哈希表

### 思路
1. 遍历链表，将每个节点加入 Set
2. 如果当前节点已在 Set 中，说明有环
3. 如果遍历完毕都没有重复，说明无环

### 优点
- 思路简单直接

### 缺点
- 空间复杂度 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 2. 环形链表 II (142)
  {
    id: "linked-list-cycle-ii",
    leetcodeId: 142,
    title: "环形链表 II",
    titleEn: "Linked List Cycle II",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针", "哈希表"],
    description: `给定一个链表的头节点 \`head\`，返回链表开始入环的第一个节点。如果链表无环，则返回 \`null\`。

如果链表中有某个节点，可以通过连续跟踪 \`next\` 指针再次到达，则链表中存在环。为了表示给定链表中的环，评测系统内部使用整数 \`pos\` 来表示链表尾连接到链表中的位置（**索引从 0 开始**）。如果 \`pos\` 是 \`-1\`，则在该链表中没有环。**注意：\`pos\` 不作为参数进行传递**，仅仅是为了标识链表的实际情况。

**不允许修改** 链表。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
\`\`\`

**示例 3：**
\`\`\`
输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
\`\`\``,
    constraints: `- 链表中节点的数目范围在范围 \`[0, 10^4]\` 内
- \`-10^5 <= Node.val <= 10^5\`
- \`pos\` 的值为 \`-1\` 或者链表中的一个有效索引

**进阶：** 你是否可以使用 O(1) 空间解决此题？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function detectCycle(head) {
  // 在此处编写你的代码

}`,
    solution: `function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 第一阶段：找到相遇点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 第二阶段：找到入环点
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }

  return null;
}`,
    testCases: [
      { id: "1", name: "有环", input: [[3, 2, 0, -4], 1], expected: 1 },
      { id: "2", name: "有环2", input: [[1, 2], 0], expected: 0 },
      { id: "3", name: "无环", input: [[1], -1], expected: null },
    ],
    hints: [
      "先用快慢指针判断是否有环",
      "如果有环，将一个指针放回头部",
      "两个指针同时每次走一步，相遇点即为入环点",
    ],
    explanation: `## 解题思路

### 快慢指针 + 数学推导

**第一阶段：检测环**
- 快慢指针，相遇说明有环

**第二阶段：找入环点**
设：
- 头到入环点距离为 a
- 入环点到相遇点距离为 b
- 相遇点到入环点距离为 c（环长 = b + c）

相遇时：
- 慢指针走了 a + b
- 快指针走了 a + b + n(b + c)，其中 n >= 1

因为快指针速度是慢指针的 2 倍：
- 2(a + b) = a + b + n(b + c)
- a + b = n(b + c)
- a = (n-1)(b + c) + c

这意味着：从头走 a 步，等于从相遇点走 c 步再绕 (n-1) 圈。
所以从头和从相遇点同时出发，每次走一步，一定会在入环点相遇。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["linked-list-cycle", "reverse-linked-list"],
    solutions: [
      {
        name: "快慢指针 + 数学推导（推荐）",
        code: `function detectCycle(head) {
  if (!head || !head.next) return null;

  let slow = head;
  let fast = head;

  // 第一阶段：找到相遇点
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      // 第二阶段：找到入环点
      let ptr = head;
      while (ptr !== slow) {
        ptr = ptr.next;
        slow = slow.next;
      }
      return ptr;
    }
  }

  return null;
}`,
        explanation: `## 快慢指针 + 数学推导

### 第一阶段：检测环
快慢指针相遇说明有环。

### 第二阶段：找入环点
设：
- 头到入环点距离为 a
- 入环点到相遇点距离为 b
- 环长 = b + c

相遇时：
- 慢指针走了 a + b
- 快指针走了 a + b + n(b + c)

由 2(a + b) = a + b + n(b + c)，得：
- a = (n-1)(b + c) + c

所以从头和从相遇点同时出发，一定在入环点相遇。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        code: `function detectCycle(head) {
  const seen = new Set();

  while (head) {
    if (seen.has(head)) {
      return head; // 第一个重复的节点就是入环点
    }
    seen.add(head);
    head = head.next;
  }

  return null;
}`,
        explanation: `## 哈希表

### 思路
1. 遍历链表，将每个节点加入 Set
2. 第一个已存在于 Set 中的节点就是入环点
3. 如果遍历完毕都没有重复，说明无环

### 优点
- 思路简单，实现容易

### 缺点
- 空间复杂度 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. 反转链表 (206)
  {
    id: "reverse-linked-list",
    leetcodeId: 206,
    title: "反转链表",
    titleEn: "Reverse Linked List",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表", "递归"],
    description: `给你单链表的头节点 \`head\`，请你反转链表，并返回反转后的链表。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2]
输出：[2,1]
\`\`\`

**示例 3：**
\`\`\`
输入：head = []
输出：[]
\`\`\``,
    constraints: `- 链表中节点的数目范围是 \`[0, 5000]\`
- \`-5000 <= Node.val <= 5000\`

**进阶：** 链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function reverseList(head) {
  // 在此处编写你的代码

}`,
    solution: `// 迭代法
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // 保存下一个节点
    curr.next = prev;       // 反转指针
    prev = curr;            // prev 前进
    curr = next;            // curr 前进
  }

  return prev;
}

// 递归法
function reverseListRecursive(head) {
  if (!head || !head.next) return head;

  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;

  return newHead;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
      { id: "2", name: "示例2", input: [[1, 2]], expected: [2, 1] },
      { id: "3", name: "空链表", input: [[]], expected: [] },
      { id: "4", name: "单节点", input: [[1]], expected: [1] },
    ],
    hints: [
      "迭代法：使用三个指针 prev, curr, next",
      "递归法：先反转后面的链表，再处理当前节点",
      "注意边界条件：空链表和单节点链表",
    ],
    explanation: `## 解题思路

### 方法一：迭代法

使用三个指针：
- prev：指向已反转部分的头
- curr：当前正在处理的节点
- next：暂存下一个节点

步骤：
1. 保存 next = curr.next
2. 反转：curr.next = prev
3. 移动：prev = curr, curr = next
4. 重复直到 curr 为 null

### 方法二：递归法

1. 递归到链表末尾
2. 反转指针：head.next.next = head
3. 断开原链接：head.next = null
4. 返回新头节点

### 图示

\`\`\`
原链表：1 -> 2 -> 3 -> null

迭代过程：
null <- 1    2 -> 3 -> null  (prev=null, curr=1)
null <- 1 <- 2    3 -> null  (prev=1, curr=2)
null <- 1 <- 2 <- 3          (prev=2, curr=3)
返回 prev (3)
\`\`\`

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：迭代 O(1)，递归 O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["linked-list-cycle-ii", "merge-two-sorted-lists"],
    solutions: [
      {
        name: "迭代法（推荐）",
        code: `function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // 保存下一个节点
    curr.next = prev;       // 反转指针
    prev = curr;            // prev 前进
    curr = next;            // curr 前进
  }

  return prev;
}`,
        explanation: `## 迭代法

### 思路
使用三个指针：
- prev：指向已反转部分的头
- curr：当前正在处理的节点
- next：暂存下一个节点

### 步骤
1. 保存 next = curr.next
2. 反转：curr.next = prev
3. 移动：prev = curr, curr = next
4. 重复直到 curr 为 null

### 优点
- 空间复杂度 O(1)
- 迭代更容易理解和调试`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归法",
        code: `function reverseList(head) {
  // 基础情况
  if (!head || !head.next) return head;

  // 递归反转后面的链表
  const newHead = reverseList(head.next);

  // 反转当前节点
  head.next.next = head;
  head.next = null;

  return newHead;
}`,
        explanation: `## 递归法

### 思路
1. 递归到链表末尾
2. 从后往前反转指针
3. 返回新的头节点

### 关键步骤
- head.next.next = head：让下一个节点指向当前节点
- head.next = null：断开当前节点的原指向

### 缺点
- 递归调用栈空间 O(n)
- 链表太长可能栈溢出`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "头插法",
        code: `function reverseList(head) {
  const dummy = { next: null };

  while (head) {
    const next = head.next;
    head.next = dummy.next;
    dummy.next = head;
    head = next;
  }

  return dummy.next;
}`,
        explanation: `## 头插法

### 思路
使用哨兵节点，每次将当前节点插入到哨兵节点之后。

### 步骤
1. 创建哨兵节点 dummy
2. 遍历原链表，每个节点插入到 dummy 之后
3. 返回 dummy.next

### 特点
- 本质上和迭代法一样
- 使用哨兵节点使代码更统一`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 4. 合并两个有序链表 (21)
  {
    id: "merge-two-sorted-lists",
    leetcodeId: 21,
    title: "合并两个有序链表",
    titleEn: "Merge Two Sorted Lists",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表", "递归"],
    description: `将两个升序链表合并为一个新的 **升序** 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。`,
    examples: `**示例 1：**
\`\`\`
输入：l1 = [1,2,4], l2 = [1,3,4]
输出：[1,1,2,3,4,4]
\`\`\`

**示例 2：**
\`\`\`
输入：l1 = [], l2 = []
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：l1 = [], l2 = [0]
输出：[0]
\`\`\``,
    constraints: `- 两个链表的节点数目范围是 \`[0, 50]\`
- \`-100 <= Node.val <= 100\`
- \`l1\` 和 \`l2\` 均按 **非递减顺序** 排列`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function mergeTwoLists(list1, list2) {
  // 在此处编写你的代码

}`,
    solution: `function mergeTwoLists(list1, list2) {
  // 使用哨兵节点简化代码
  const dummy = { next: null };
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  // 连接剩余部分
  curr.next = list1 || list2;

  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
      { id: "2", name: "两个空", input: [[], []], expected: [] },
      { id: "3", name: "一个空", input: [[], [0]], expected: [0] },
    ],
    hints: [
      "使用哨兵节点（dummy node）简化边界处理",
      "比较两个链表的当前节点，选择较小的连接到结果链表",
      "最后将非空的链表直接连接到结果后面",
    ],
    explanation: `## 解题思路

### 迭代法

1. 创建哨兵节点 dummy，简化边界处理
2. 使用 curr 指针指向结果链表的末尾
3. 比较两个链表的当前节点：
   - 选择较小的节点连接到 curr.next
   - 移动被选中链表的指针
   - 移动 curr
4. 循环结束后，将非空的链表连接到末尾

### 递归法

\`\`\`javascript
function mergeTwoLists(l1, l2) {
  if (!l1) return l2;
  if (!l2) return l1;

  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
}
\`\`\`

### 复杂度分析
- 时间复杂度：O(m + n)
- 空间复杂度：迭代 O(1)，递归 O(m + n)`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["reverse-linked-list", "add-two-numbers"],
    solutions: [
      {
        name: "迭代法（推荐）",
        code: `function mergeTwoLists(list1, list2) {
  // 使用哨兵节点简化代码
  const dummy = { next: null };
  let curr = dummy;

  while (list1 && list2) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }

  // 连接剩余部分
  curr.next = list1 || list2;

  return dummy.next;
}`,
        explanation: `## 迭代法

### 思路
1. 创建哨兵节点 dummy，简化边界处理
2. 使用 curr 指针指向结果链表的末尾
3. 比较两个链表的当前节点：
   - 选择较小的节点连接到 curr.next
   - 移动被选中链表的指针
4. 循环结束后，将非空的链表连接到末尾

### 优点
- 空间复杂度 O(1)
- 逻辑清晰`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归法",
        code: `function mergeTwoLists(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;

  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`,
        explanation: `## 递归法

### 思路
1. 基础情况：如果一个链表为空，返回另一个
2. 比较两个头节点，选择较小的
3. 递归合并剩余部分
4. 返回较小的头节点

### 优点
- 代码简洁优雅

### 缺点
- 递归调用栈空间 O(m + n)`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m + n)",
      },
    ],
  },

  // 5. 两数相加 (2)
  {
    id: "add-two-numbers",
    leetcodeId: 2,
    title: "两数相加",
    titleEn: "Add Two Numbers",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "数学", "递归"],
    description: `给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。`,
    examples: `**示例 1：**
\`\`\`
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807
\`\`\`

**示例 2：**
\`\`\`
输入：l1 = [0], l2 = [0]
输出：[0]
\`\`\`

**示例 3：**
\`\`\`
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
\`\`\``,
    constraints: `- 每个链表中的节点数在范围 \`[1, 100]\` 内
- \`0 <= Node.val <= 9\`
- 题目数据保证列表表示的数字不含前导零`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function addTwoNumbers(l1, l2) {
  // 在此处编写你的代码

}`,
    solution: `function addTwoNumbers(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    curr.next = { val: sum % 10, next: null };
    curr = curr.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
      { id: "2", name: "两个0", input: [[0], [0]], expected: [0] },
      { id: "3", name: "进位", input: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
    ],
    hints: [
      "使用哨兵节点简化操作",
      "同时遍历两个链表，逐位相加",
      "注意处理进位，包括最后的进位",
    ],
    explanation: `## 解题思路

### 模拟加法

1. 创建哨兵节点 dummy
2. 同时遍历两个链表
3. 对应位相加，加上进位
4. 计算新的进位和当前位的值
5. 创建新节点存储结果
6. 循环直到两个链表都遍历完且无进位

### 关键点

- 链表长度可能不同，需要处理 null
- 最后可能还有进位，需要额外创建节点
- 数字是逆序存储，正好方便从低位开始加

### 复杂度分析
- 时间复杂度：O(max(m, n))
- 空间复杂度：O(max(m, n))`,
    timeComplexity: "O(max(m, n))",
    spaceComplexity: "O(max(m, n))",
    relatedProblems: ["merge-two-sorted-lists", "reverse-linked-list"],
    solutions: [
      {
        name: "模拟加法（推荐）",
        code: `function addTwoNumbers(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;
  let carry = 0;

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;

    carry = Math.floor(sum / 10);
    curr.next = { val: sum % 10, next: null };
    curr = curr.next;

    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  return dummy.next;
}`,
        explanation: `## 模拟加法

### 思路
1. 创建哨兵节点 dummy
2. 同时遍历两个链表
3. 对应位相加，加上进位
4. 计算新的进位和当前位的值
5. 创建新节点存储结果

### 关键点
- 链表长度可能不同，需要处理 null
- 最后可能还有进位，需要额外创建节点
- 数字是逆序存储，正好方便从低位开始加`,
        timeComplexity: "O(max(m, n))",
        spaceComplexity: "O(max(m, n))",
      },
      {
        name: "递归法",
        code: `function addTwoNumbers(l1, l2, carry = 0) {
  if (!l1 && !l2 && !carry) return null;

  const val1 = l1 ? l1.val : 0;
  const val2 = l2 ? l2.val : 0;
  const sum = val1 + val2 + carry;

  const node = { val: sum % 10, next: null };
  node.next = addTwoNumbers(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10)
  );

  return node;
}`,
        explanation: `## 递归法

### 思路
1. 基础情况：两个链表都为空且无进位，返回 null
2. 计算当前位的和
3. 创建当前节点
4. 递归处理下一位

### 优点
- 代码简洁

### 缺点
- 递归调用栈空间 O(max(m, n))`,
        timeComplexity: "O(max(m, n))",
        spaceComplexity: "O(max(m, n))",
      },
    ],
  },

  // 6. 删除链表的倒数第 N 个结点 (19)
  {
    id: "remove-nth-node-from-end",
    leetcodeId: 19,
    title: "删除链表的倒数第 N 个结点",
    titleEn: "Remove Nth Node From End of List",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针"],
    description: `给你一个链表，删除链表的倒数第 \`n\` 个结点，并且返回链表的头结点。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1], n = 1
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：head = [1,2], n = 1
输出：[1]
\`\`\``,
    constraints: `- 链表中结点的数目为 \`sz\`
- \`1 <= sz <= 30\`
- \`0 <= Node.val <= 100\`
- \`1 <= n <= sz\`

**进阶：** 你能尝试使用一趟扫描实现吗？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function removeNthFromEnd(head, n) {
  // 在此处编写你的代码

}`,
    solution: `function removeNthFromEnd(head, n) {
  // 使用哨兵节点处理删除头节点的情况
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  // fast 先走 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // fast 和 slow 同时走，直到 fast 到达末尾
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // 此时 slow 指向要删除节点的前一个节点
  slow.next = slow.next.next;

  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
      { id: "2", name: "单节点", input: [[1], 1], expected: [] },
      { id: "3", name: "删除最后", input: [[1, 2], 1], expected: [1] },
      { id: "4", name: "删除第一个", input: [[1, 2], 2], expected: [2] },
    ],
    hints: [
      "使用哨兵节点处理删除头节点的边界情况",
      "使用快慢指针，让快指针先走 n+1 步",
      "然后快慢指针同时走，快指针到末尾时，慢指针正好在要删除节点的前一个",
    ],
    explanation: `## 解题思路

### 快慢指针（一趟扫描）

1. 创建哨兵节点 dummy，指向 head
2. 快指针先走 n+1 步
3. 快慢指针同时走，直到快指针到达 null
4. 此时慢指针指向要删除节点的前一个节点
5. 执行删除：slow.next = slow.next.next

### 为什么是 n+1 步？

- 我们需要找到倒数第 n 个节点的**前一个节点**
- 倒数第 n 个节点距离末尾 n 步
- 前一个节点距离末尾 n+1 步
- 所以快指针先走 n+1 步

### 为什么需要哨兵节点？

- 如果要删除的是头节点，没有"前一个节点"
- 使用哨兵节点，头节点也有了前一个节点

### 复杂度分析
- 时间复杂度：O(n)，一趟扫描
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["reverse-linked-list", "merge-two-sorted-lists"],
    solutions: [
      {
        name: "快慢指针（推荐）",
        code: `function removeNthFromEnd(head, n) {
  // 使用哨兵节点处理删除头节点的情况
  const dummy = { next: head };
  let fast = dummy;
  let slow = dummy;

  // fast 先走 n+1 步
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // fast 和 slow 同时走，直到 fast 到达末尾
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // 此时 slow 指向要删除节点的前一个节点
  slow.next = slow.next.next;

  return dummy.next;
}`,
        explanation: `## 快慢指针（一趟扫描）

### 思路
1. 快指针先走 n+1 步
2. 快慢指针同时走
3. 快指针到末尾时，慢指针正好在要删除节点的前一个

### 为什么是 n+1 步？
- 我们需要找到倒数第 n 个节点的前一个节点
- 倒数第 n 个节点距离末尾 n 步
- 前一个节点距离末尾 n+1 步

### 为什么需要哨兵节点？
如果要删除的是头节点，没有"前一个节点"，使用哨兵节点统一处理。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "两次遍历",
        code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };

  // 第一次遍历：计算链表长度
  let len = 0;
  let curr = head;
  while (curr) {
    len++;
    curr = curr.next;
  }

  // 第二次遍历：找到要删除节点的前一个
  curr = dummy;
  for (let i = 0; i < len - n; i++) {
    curr = curr.next;
  }

  // 删除节点
  curr.next = curr.next.next;

  return dummy.next;
}`,
        explanation: `## 两次遍历

### 思路
1. 第一次遍历计算链表长度 L
2. 倒数第 n 个 = 正数第 (L - n + 1) 个
3. 第二次遍历找到第 (L - n) 个节点
4. 删除下一个节点

### 缺点
- 需要遍历两次`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "栈",
        code: `function removeNthFromEnd(head, n) {
  const dummy = { next: head };
  const stack = [];

  // 所有节点入栈
  let curr = dummy;
  while (curr) {
    stack.push(curr);
    curr = curr.next;
  }

  // 弹出 n 个节点，栈顶就是要删除节点的前一个
  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  const prev = stack[stack.length - 1];
  prev.next = prev.next.next;

  return dummy.next;
}`,
        explanation: `## 栈

### 思路
1. 将所有节点入栈
2. 弹出 n 个节点
3. 栈顶就是要删除节点的前一个节点

### 优点
- 思路直观

### 缺点
- 空间复杂度 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 7. 相交链表 (160)
  {
    id: "intersection-of-two-linked-lists",
    leetcodeId: 160,
    title: "相交链表",
    titleEn: "Intersection of Two Linked Lists",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表", "双指针", "哈希表"],
    description: `给你两个单链表的头节点 \`headA\` 和 \`headB\`，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 \`null\`。

图示两个链表在节点 \`c1\` 开始相交：

题目数据 **保证** 整个链式结构中不存在环。

**注意**，函数返回结果后，链表必须 **保持其原始结构**。`,
    examples: `**示例 1：**
\`\`\`
输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
输出：Intersected at '8'
解释：相交节点的值为 8（注意，如果两个链表相交则不能为 0）。
从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。
\`\`\`

**示例 2：**
\`\`\`
输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
输出：Intersected at '2'
\`\`\`

**示例 3：**
\`\`\`
输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
输出：null
解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
这两个链表不相交，因此返回 null。
\`\`\``,
    constraints: `- \`listA\` 中节点数目为 \`m\`
- \`listB\` 中节点数目为 \`n\`
- \`1 <= m, n <= 3 * 10^4\`
- \`1 <= Node.val <= 10^5\`
- \`0 <= skipA < m\`
- \`0 <= skipB < n\`
- 如果 \`listA\` 和 \`listB\` 没有交点，\`intersectVal\` 为 \`0\`
- 如果 \`listA\` 和 \`listB\` 有交点，\`intersectVal == listA[skipA] == listB[skipB]\`

**进阶：** 你能否设计一个时间复杂度 O(m + n)、仅用 O(1) 内存的解决方案？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function getIntersectionNode(headA, headB) {
  // 在此处编写你的代码

}`,
    solution: `function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  // 当 pA 和 pB 相遇时，要么是交点，要么都是 null
  while (pA !== pB) {
    // pA 走完 A 链表后，从 B 链表头开始
    pA = pA ? pA.next : headB;
    // pB 走完 B 链表后，从 A 链表头开始
    pB = pB ? pB.next : headA;
  }

  return pA;
}`,
    testCases: [
      { id: "1", name: "有交点", input: [[4, 1, 8, 4, 5], [5, 6, 1, 8, 4, 5], 2, 3], expected: 8 },
      { id: "2", name: "有交点2", input: [[1, 9, 1, 2, 4], [3, 2, 4], 3, 1], expected: 2 },
      { id: "3", name: "无交点", input: [[2, 6, 4], [1, 5], 3, 2], expected: null },
    ],
    hints: [
      "使用双指针，两个指针分别从两个链表头开始",
      "当一个指针到达末尾时，从另一个链表头继续",
      "如果有交点，两指针会在交点相遇；如果没有，会同时到达 null",
    ],
    explanation: `## 解题思路

### 双指针法

**核心思想：** 消除两个链表的长度差

设链表 A 长度为 a，链表 B 长度为 b，公共部分长度为 c。

- 指针 pA 走的路径：a + (b - c) = a + b - c
- 指针 pB 走的路径：b + (a - c) = a + b - c

两个指针走的总距离相同！

### 为什么会在交点相遇？

1. 如果有交点：
   - pA 走完 A 后走 B，pB 走完 B 后走 A
   - 走到交点时，两者走的距离相等
   - 所以一定在交点相遇

2. 如果没有交点：
   - 两者最终都会走到 null
   - 此时 pA === pB === null，循环结束

### 图示

\`\`\`
A:     a1 -> a2 -> c1 -> c2 -> c3
                   ↑
B: b1 -> b2 -> b3 ─┘

pA: a1 -> a2 -> c1 -> c2 -> c3 -> b1 -> b2 -> b3 -> [c1]
pB: b1 -> b2 -> b3 -> c1 -> c2 -> c3 -> a1 -> a2 -> [c1]
                                                     ↑
                                                   相遇！
\`\`\`

### 复杂度分析
- 时间复杂度：O(m + n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["linked-list-cycle", "linked-list-cycle-ii"],
    solutions: [
      {
        name: "双指针（推荐）",
        code: `function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;

  let pA = headA;
  let pB = headB;

  // 当 pA 和 pB 相遇时，要么是交点，要么都是 null
  while (pA !== pB) {
    // pA 走完 A 链表后，从 B 链表头开始
    pA = pA ? pA.next : headB;
    // pB 走完 B 链表后，从 A 链表头开始
    pB = pB ? pB.next : headA;
  }

  return pA;
}`,
        explanation: `## 双指针

### 核心思想
消除两个链表的长度差。

设链表 A 长度为 a，链表 B 长度为 b，公共部分长度为 c。

- 指针 pA 走的路径：a + (b - c) = a + b - c
- 指针 pB 走的路径：b + (a - c) = a + b - c

两个指针走的总距离相同！

### 为什么会在交点相遇？
1. 如果有交点：走到交点时距离相等，一定相遇
2. 如果没有交点：最终都会走到 null，循环结束`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        code: `function getIntersectionNode(headA, headB) {
  const seen = new Set();

  // 先遍历链表 A，记录所有节点
  let curr = headA;
  while (curr) {
    seen.add(curr);
    curr = curr.next;
  }

  // 遍历链表 B，找第一个在 Set 中的节点
  curr = headB;
  while (curr) {
    if (seen.has(curr)) {
      return curr;
    }
    curr = curr.next;
  }

  return null;
}`,
        explanation: `## 哈希表

### 思路
1. 遍历链表 A，将所有节点存入 Set
2. 遍历链表 B，找到第一个已在 Set 中的节点
3. 如果没找到，返回 null

### 优点
- 思路简单直接

### 缺点
- 空间复杂度 O(m)`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m)",
      },
      {
        name: "计算长度差",
        code: `function getIntersectionNode(headA, headB) {
  // 计算两个链表的长度
  const getLength = (head) => {
    let len = 0;
    while (head) {
      len++;
      head = head.next;
    }
    return len;
  };

  let lenA = getLength(headA);
  let lenB = getLength(headB);

  // 让较长的链表先走差值步
  while (lenA > lenB) {
    headA = headA.next;
    lenA--;
  }
  while (lenB > lenA) {
    headB = headB.next;
    lenB--;
  }

  // 同时走，找相交点
  while (headA !== headB) {
    headA = headA.next;
    headB = headB.next;
  }

  return headA;
}`,
        explanation: `## 计算长度差

### 思路
1. 分别计算两个链表的长度
2. 让较长的链表先走差值步
3. 两个指针同时走，第一个相同的节点就是交点

### 特点
- 需要遍历三次
- 空间复杂度 O(1)`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 8. 回文链表 (234)
  {
    id: "palindrome-linked-list",
    leetcodeId: 234,
    title: "回文链表",
    titleEn: "Palindrome Linked List",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表", "双指针", "栈", "递归"],
    description: `给你一个单链表的头节点 \`head\`，请你判断该链表是否为回文链表。如果是，返回 \`true\`；否则，返回 \`false\`。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,2,1]
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2]
输出：false
\`\`\``,
    constraints: `- 链表中节点数目在范围 \`[1, 10^5]\` 内
- \`0 <= Node.val <= 9\`

**进阶：** 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function isPalindrome(head) {
  // 在此处编写你的代码

}`,
    solution: `function isPalindrome(head) {
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

  // 3. 比较前后两半
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

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    testCases: [
      { id: "1", name: "回文", input: [[1, 2, 2, 1]], expected: true },
      { id: "2", name: "非回文", input: [[1, 2]], expected: false },
      { id: "3", name: "单节点", input: [[1]], expected: true },
      { id: "4", name: "奇数回文", input: [[1, 2, 1]], expected: true },
    ],
    hints: [
      "使用快慢指针找到链表中点",
      "反转后半部分链表",
      "比较前半部分和反转后的后半部分",
    ],
    explanation: `## 解题思路

### 方法：快慢指针 + 反转链表

**步骤：**
1. 使用快慢指针找到中点
2. 反转后半部分链表
3. 比较前半部分和后半部分
4. （可选）恢复链表

### 找中点

- 快指针每次走 2 步，慢指针每次走 1 步
- 快指针到末尾时，慢指针在中点

对于偶数长度：1->2->2->1
- slow 停在第一个 2

对于奇数长度：1->2->3->2->1
- slow 停在 3

### 为什么这样能检测回文？

回文链表：前半部分 = 后半部分的逆序

所以：
1. 找到后半部分
2. 反转后半部分
3. 逐个比较

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["reverse-linked-list", "linked-list-cycle"],
    solutions: [
      {
        name: "快慢指针 + 反转（推荐）",
        code: `function isPalindrome(head) {
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

  // 3. 比较前后两半
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

function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
        explanation: `## 快慢指针 + 反转链表

### 步骤
1. 使用快慢指针找到中点
2. 反转后半部分链表
3. 比较前半部分和后半部分
4. （可选）恢复链表

### 找中点
- 快指针每次走 2 步，慢指针每次走 1 步
- 快指针到末尾时，慢指针在中点

### 优点
- 空间复杂度 O(1)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "数组 + 双指针",
        code: `function isPalindrome(head) {
  const vals = [];

  // 将链表值存入数组
  while (head) {
    vals.push(head.val);
    head = head.next;
  }

  // 双指针检查回文
  let left = 0;
  let right = vals.length - 1;
  while (left < right) {
    if (vals[left] !== vals[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}`,
        explanation: `## 数组 + 双指针

### 思路
1. 将链表值存入数组
2. 使用双指针检查数组是否回文

### 优点
- 实现简单
- 不修改原链表

### 缺点
- 空间复杂度 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归",
        code: `function isPalindrome(head) {
  let front = head;

  function check(node) {
    if (!node) return true;

    // 递归到末尾
    if (!check(node.next)) return false;

    // 比较
    if (node.val !== front.val) return false;

    // 移动 front
    front = front.next;
    return true;
  }

  return check(head);
}`,
        explanation: `## 递归

### 思路
1. 递归到链表末尾
2. 回溯时，从末尾向前比较
3. 同时用一个全局指针从头向后比较

### 优点
- 不需要显式反转链表

### 缺点
- 递归调用栈空间 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 9. 删除排序链表中的重复元素 (83)
  {
    id: "remove-duplicates-from-sorted-list",
    leetcodeId: 83,
    title: "删除排序链表中的重复元素",
    titleEn: "Remove Duplicates from Sorted List",
    difficulty: "easy",
    category: "linked-list",
    tags: ["链表"],
    description: `给定一个已排序的链表的头 \`head\`，删除所有重复的元素，使每个元素只出现一次。返回已排序的链表。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,1,2]
输出：[1,2]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,1,2,3,3]
输出：[1,2,3]
\`\`\``,
    constraints: `- 链表中节点数目在范围 \`[0, 300]\` 内
- \`-100 <= Node.val <= 100\`
- 题目数据保证链表已经按升序排列`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function deleteDuplicates(head) {
  // 在此处编写你的代码

}`,
    solution: `function deleteDuplicates(head) {
  if (!head) return null;

  let curr = head;
  while (curr.next) {
    if (curr.val === curr.next.val) {
      // 跳过重复节点
      curr.next = curr.next.next;
    } else {
      // 移动到下一个节点
      curr = curr.next;
    }
  }

  return head;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 1, 2]], expected: [1, 2] },
      { id: "2", name: "示例2", input: [[1, 1, 2, 3, 3]], expected: [1, 2, 3] },
      { id: "3", name: "空链表", input: [[]], expected: [] },
      { id: "4", name: "无重复", input: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    hints: [
      "链表已排序，重复元素一定相邻",
      "比较当前节点和下一个节点的值",
      "如果相同，跳过下一个节点",
    ],
    explanation: `## 解题思路

### 一次遍历

由于链表已排序，重复元素一定相邻。

**算法：**
1. 从头节点开始遍历
2. 如果当前节点值等于下一个节点值，跳过下一个节点
3. 否则，移动到下一个节点
4. 重复直到链表结束

### 关键点

- 不需要哨兵节点，因为头节点不会被删除
- 当发现重复时，不移动 curr，因为可能有多个连续重复

### 图示

\`\`\`
1 -> 1 -> 1 -> 2 -> 3 -> 3
^
curr

1.val == 1.val (next)，删除：
1 -> 1 -> 2 -> 3 -> 3
^
curr

1.val == 1.val (next)，删除：
1 -> 2 -> 3 -> 3
^
curr

1.val != 2.val，移动：
1 -> 2 -> 3 -> 3
     ^
     curr

以此类推...
\`\`\`

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["remove-duplicates-from-sorted-list-ii", "reverse-linked-list"],
    solutions: [
      {
        name: "一次遍历（推荐）",
        code: `function deleteDuplicates(head) {
  if (!head) return null;

  let curr = head;
  while (curr.next) {
    if (curr.val === curr.next.val) {
      // 跳过重复节点
      curr.next = curr.next.next;
    } else {
      // 移动到下一个节点
      curr = curr.next;
    }
  }

  return head;
}`,
        explanation: `## 一次遍历

### 思路
由于链表已排序，重复元素一定相邻。

### 算法
1. 从头节点开始遍历
2. 如果当前节点值等于下一个节点值，跳过下一个节点
3. 否则，移动到下一个节点
4. 重复直到链表结束

### 关键点
- 不需要哨兵节点，因为头节点不会被删除
- 当发现重复时，不移动 curr，因为可能有多个连续重复`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归",
        code: `function deleteDuplicates(head) {
  if (!head || !head.next) return head;

  head.next = deleteDuplicates(head.next);

  return head.val === head.next.val ? head.next : head;
}`,
        explanation: `## 递归

### 思路
1. 递归处理后面的链表
2. 如果当前节点值等于下一个节点值，跳过当前节点
3. 否则返回当前节点

### 优点
- 代码简洁

### 缺点
- 递归调用栈空间 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 10. 删除排序链表中的重复元素 II (82)
  {
    id: "remove-duplicates-from-sorted-list-ii",
    leetcodeId: 82,
    title: "删除排序链表中的重复元素 II",
    titleEn: "Remove Duplicates from Sorted List II",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针"],
    description: `给定一个已排序的链表的头 \`head\`，删除原始链表中所有重复数字的节点，只留下不同的数字。返回已排序的链表。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,3,4,4,5]
输出：[1,2,5]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,1,1,2,3]
输出：[2,3]
\`\`\``,
    constraints: `- 链表中节点数目在范围 \`[0, 300]\` 内
- \`-100 <= Node.val <= 100\`
- 题目数据保证链表已经按升序排列`,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function deleteDuplicates(head) {
  // 在此处编写你的代码

}`,
    solution: `function deleteDuplicates(head) {
  // 哨兵节点，处理头节点被删除的情况
  const dummy = { next: head };
  let prev = dummy;

  while (head) {
    // 如果是重复节点
    if (head.next && head.val === head.next.val) {
      // 跳过所有重复值
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      // 删除所有重复节点
      prev.next = head.next;
    } else {
      // 不是重复节点，移动 prev
      prev = prev.next;
    }
    head = head.next;
  }

  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 3, 4, 4, 5]], expected: [1, 2, 5] },
      { id: "2", name: "示例2", input: [[1, 1, 1, 2, 3]], expected: [2, 3] },
      { id: "3", name: "全重复", input: [[1, 1, 1]], expected: [] },
      { id: "4", name: "无重复", input: [[1, 2, 3]], expected: [1, 2, 3] },
    ],
    hints: [
      "使用哨兵节点处理头节点被删除的情况",
      "维护 prev 指针指向确定保留的最后一个节点",
      "发现重复时，跳过所有重复值",
    ],
    explanation: `## 解题思路

### 与第 83 题的区别

- 83 题：保留重复元素中的一个
- 82 题：删除所有重复元素

### 算法

1. 使用哨兵节点（头节点可能被删除）
2. prev 指向已确定保留的最后一个节点
3. 遍历链表：
   - 如果发现重复，跳过所有重复节点
   - 如果不重复，移动 prev

### 关键点

- 必须使用哨兵节点，因为头节点可能被删除
- prev 只在节点确定保留时才移动
- 发现重复后，要跳过所有相同值的节点

### 图示

\`\`\`
dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
^        ^
prev     head

head.val != head.next.val，移动 prev：
dummy -> 1 -> 2 -> 3 -> 3 -> 4 -> 4 -> 5
         ^   ^
         prev head

继续...发现 3 == 3：
跳过所有 3，prev.next = 4：
dummy -> 1 -> 2 -> 4 -> 4 -> 5
         ^        ^
         prev     head

发现 4 == 4：
跳过所有 4，prev.next = 5：
dummy -> 1 -> 2 -> 5
         ^        ^
         prev     head
\`\`\`

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["remove-duplicates-from-sorted-list", "reverse-linked-list"],
    solutions: [
      {
        name: "哨兵节点 + 一次遍历（推荐）",
        code: `function deleteDuplicates(head) {
  // 哨兵节点，处理头节点被删除的情况
  const dummy = { next: head };
  let prev = dummy;

  while (head) {
    // 如果是重复节点
    if (head.next && head.val === head.next.val) {
      // 跳过所有重复值
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      // 删除所有重复节点
      prev.next = head.next;
    } else {
      // 不是重复节点，移动 prev
      prev = prev.next;
    }
    head = head.next;
  }

  return dummy.next;
}`,
        explanation: `## 哨兵节点 + 一次遍历

### 与第 83 题的区别
- 83 题：保留重复元素中的一个
- 82 题：删除所有重复元素

### 算法
1. 使用哨兵节点（头节点可能被删除）
2. prev 指向已确定保留的最后一个节点
3. 发现重复，跳过所有重复节点
4. 不是重复，移动 prev

### 关键点
- 必须使用哨兵节点
- prev 只在节点确定保留时才移动`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归",
        code: `function deleteDuplicates(head) {
  if (!head || !head.next) return head;

  if (head.val === head.next.val) {
    // 跳过所有重复值
    while (head.next && head.val === head.next.val) {
      head = head.next;
    }
    // 继续处理剩余部分，当前节点也要删除
    return deleteDuplicates(head.next);
  } else {
    // 当前节点不重复，保留
    head.next = deleteDuplicates(head.next);
    return head;
  }
}`,
        explanation: `## 递归

### 思路
1. 如果当前节点与下一个节点重复：
   - 跳过所有相同值的节点
   - 递归处理剩余部分（当前节点也删除）
2. 如果当前节点不重复：
   - 保留当前节点
   - 递归处理后续节点

### 缺点
- 递归调用栈空间 O(n)`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 11. 旋转链表 (61)
  {
    id: "rotate-list",
    leetcodeId: 61,
    title: "旋转链表",
    titleEn: "Rotate List",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针"],
    description: `给你一个链表的头节点 \`head\`，旋转链表，将链表每个节点向右移动 \`k\` 个位置。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,4,5], k = 2
输出：[4,5,1,2,3]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [0,1,2], k = 4
输出：[2,0,1]
\`\`\``,
    constraints: `- 链表中节点的数目在范围 \`[0, 500]\` 内
- \`-100 <= Node.val <= 100\`
- \`0 <= k <= 2 * 10^9\``,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function rotateRight(head, k) {
  // 在此处编写你的代码

}`,
    solution: `function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // 1. 计算链表长度，并找到尾节点
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }

  // 2. 计算实际需要旋转的次数
  k = k % len;
  if (k === 0) return head;

  // 3. 找到新的尾节点（倒数第 k+1 个节点）
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) {
    newTail = newTail.next;
  }

  // 4. 重新连接
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 2, 3, 4, 5], 2], expected: [4, 5, 1, 2, 3] },
      { id: "2", name: "示例2", input: [[0, 1, 2], 4], expected: [2, 0, 1] },
      { id: "3", name: "k为0", input: [[1, 2], 0], expected: [1, 2] },
      { id: "4", name: "单节点", input: [[1], 99], expected: [1] },
    ],
    hints: [
      "先计算链表长度",
      "k 可能大于链表长度，需要取模",
      "找到新的尾节点，断开并重新连接",
    ],
    explanation: `## 解题思路

### 分析

向右旋转 k 位，实际上是：
- 把后 k 个节点移到前面
- 或者说，把前 n-k 个节点移到后面

### 算法

1. 计算链表长度 n，找到尾节点
2. k = k % n（处理 k > n 的情况）
3. 如果 k = 0，不需要旋转
4. 找到新尾节点（第 n-k 个节点）
5. 重新连接：
   - 新头 = 新尾.next
   - 新尾.next = null
   - 原尾.next = 原头

### 图示

\`\`\`
原链表：1 -> 2 -> 3 -> 4 -> 5, k = 2

长度 n = 5
新尾节点位置：5 - 2 = 3（第 3 个节点，值为 3）

1 -> 2 -> 3 -> 4 -> 5
          ^    ^
       newTail newHead

断开并重新连接：
4 -> 5 -> 1 -> 2 -> 3 -> null
\`\`\`

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["reverse-linked-list", "remove-nth-node-from-end"],
    solutions: [
      {
        name: "计算长度 + 重新连接（推荐）",
        code: `function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // 1. 计算链表长度，并找到尾节点
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }

  // 2. 计算实际需要旋转的次数
  k = k % len;
  if (k === 0) return head;

  // 3. 找到新的尾节点（倒数第 k+1 个节点）
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) {
    newTail = newTail.next;
  }

  // 4. 重新连接
  const newHead = newTail.next;
  newTail.next = null;
  tail.next = head;

  return newHead;
}`,
        explanation: `## 计算长度 + 重新连接

### 分析
向右旋转 k 位，实际上是把后 k 个节点移到前面。

### 算法
1. 计算链表长度 n，找到尾节点
2. k = k % n（处理 k > n 的情况）
3. 找到新尾节点（第 n-k 个节点）
4. 重新连接

### 关键点
- k 可能大于链表长度，需要取模
- 找到正确的断开位置`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "成环再断开",
        code: `function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;

  // 1. 计算长度，成环
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }
  tail.next = head; // 成环

  // 2. 找到断开位置
  k = k % len;
  let steps = len - k;
  let newTail = tail;
  for (let i = 0; i < steps; i++) {
    newTail = newTail.next;
  }

  // 3. 断开
  const newHead = newTail.next;
  newTail.next = null;

  return newHead;
}`,
        explanation: `## 成环再断开

### 思路
1. 先将链表首尾相连成环
2. 找到断开位置
3. 断开环

### 优点
- 逻辑更统一
- 不需要单独处理 tail.next = head`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 12. 分隔链表 (86)
  {
    id: "partition-list",
    leetcodeId: 86,
    title: "分隔链表",
    titleEn: "Partition List",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针"],
    description: `给你一个链表的头节点 \`head\` 和一个特定值 \`x\`，请你对链表进行分隔，使得所有 **小于** \`x\` 的节点都出现在 **大于或等于** \`x\` 的节点之前。

你应当 **保留** 两个分区中每个节点的初始相对位置。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,4,3,2,5,2], x = 3
输出：[1,2,2,4,3,5]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [2,1], x = 2
输出：[1,2]
\`\`\``,
    constraints: `- 链表中节点的数目在范围 \`[0, 200]\` 内
- \`-100 <= Node.val <= 100\`
- \`-200 <= x <= 200\``,
    initialCode: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function partition(head, x) {
  // 在此处编写你的代码

}`,
    solution: `function partition(head, x) {
  // 创建两个哨兵节点
  const smallDummy = { next: null };
  const largeDummy = { next: null };

  let small = smallDummy;
  let large = largeDummy;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }

  // 连接两个链表
  large.next = null;  // 断开大链表的尾部
  small.next = largeDummy.next;

  return smallDummy.next;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1, 4, 3, 2, 5, 2], 3], expected: [1, 2, 2, 4, 3, 5] },
      { id: "2", name: "示例2", input: [[2, 1], 2], expected: [1, 2] },
      { id: "3", name: "空链表", input: [[], 0], expected: [] },
      { id: "4", name: "全小于", input: [[1, 2, 3], 5], expected: [1, 2, 3] },
    ],
    hints: [
      "创建两个链表：一个存放小于 x 的节点，一个存放大于等于 x 的节点",
      "遍历原链表，将节点分配到对应链表",
      "最后连接两个链表",
    ],
    explanation: `## 解题思路

### 双链表法

**思路：** 把原链表拆成两个链表，最后合并。

1. 创建两个哨兵节点：small 和 large
2. 遍历原链表：
   - 小于 x 的节点加入 small 链表
   - 大于等于 x 的节点加入 large 链表
3. 连接两个链表

### 关键点

- 使用哨兵节点简化操作
- **重要**：large.next = null，断开可能存在的环
- 保持原有顺序

### 图示

\`\`\`
原链表：1 -> 4 -> 3 -> 2 -> 5 -> 2, x = 3

遍历过程：
1 < 3: small: 1
4 >= 3: large: 4
3 >= 3: large: 4 -> 3
2 < 3: small: 1 -> 2
5 >= 3: large: 4 -> 3 -> 5
2 < 3: small: 1 -> 2 -> 2

连接：
1 -> 2 -> 2 -> 4 -> 3 -> 5
\`\`\`

### 为什么要断开 large.next？

原链表中最后一个大于等于 x 的节点，它的 next 可能指向一个小于 x 的节点。
如果不断开，会形成环或保留不该有的连接。

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["merge-two-sorted-lists", "reverse-linked-list"],
    solutions: [
      {
        name: "双链表法（推荐）",
        code: `function partition(head, x) {
  // 创建两个哨兵节点
  const smallDummy = { next: null };
  const largeDummy = { next: null };

  let small = smallDummy;
  let large = largeDummy;

  while (head) {
    if (head.val < x) {
      small.next = head;
      small = small.next;
    } else {
      large.next = head;
      large = large.next;
    }
    head = head.next;
  }

  // 连接两个链表
  large.next = null;  // 断开大链表的尾部
  small.next = largeDummy.next;

  return smallDummy.next;
}`,
        explanation: `## 双链表法

### 思路
把原链表拆成两个链表，最后合并。

### 算法
1. 创建两个哨兵节点：small 和 large
2. 遍历原链表：
   - 小于 x 的节点加入 small 链表
   - 大于等于 x 的节点加入 large 链表
3. 连接两个链表

### 关键点
- 使用哨兵节点简化操作
- **重要**：large.next = null，断开可能存在的环
- 保持原有顺序`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "单链表原地操作",
        code: `function partition(head, x) {
  const dummy = { next: head };
  let prev = dummy;

  // 找到第一个 >= x 的节点的前驱
  while (prev.next && prev.next.val < x) {
    prev = prev.next;
  }

  // insertPos 指向待插入位置的前一个节点
  let insertPos = prev;
  let curr = prev;

  while (curr.next) {
    if (curr.next.val < x) {
      // 将节点移动到 insertPos 之后
      const node = curr.next;
      curr.next = node.next;

      node.next = insertPos.next;
      insertPos.next = node;
      insertPos = node;
    } else {
      curr = curr.next;
    }
  }

  return dummy.next;
}`,
        explanation: `## 单链表原地操作

### 思路
找到第一个 >= x 的位置作为插入点，后面遇到 < x 的节点就插入到这个位置。

### 算法
1. 找到第一个 >= x 的节点的前驱
2. 遍历后续节点
3. 遇到 < x 的节点，移动到插入点之后

### 特点
- 不创建新节点
- 逻辑稍复杂`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
