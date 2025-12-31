import { Problem } from "../types";
import { LinkedListStep, TwoPointersStep } from "../components/animations";

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
    frontendRelevance: "high",
    frontendNote: "快慢指针检测环",
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
        code: `/**
 * 环形链表 - 快慢指针法（Floyd 判圈算法）
 *
 * 核心思想：
 * 使用两个速度不同的指针遍历链表：
 * - 慢指针：每次走 1 步
 * - 快指针：每次走 2 步
 *
 * 如果存在环，快指针最终会追上慢指针（在环中相遇）
 * 如果不存在环，快指针会先到达链表末尾
 *
 * 为什么快慢指针能检测环？
 * 假设有环：
 * 1. 当慢指针进入环时，快指针已经在环中某处
 * 2. 设此时快指针领先慢指针 k 步
 * 3. 每次迭代，快指针追近 1 步（2-1=1）
 * 4. 经过 k 次迭代后，两指针必定相遇
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)，只使用两个指针
 */
function hasCycle(head) {
  // 边界情况：空链表或只有一个节点
  if (!head || !head.next) return false;

  let slow = head;  // 慢指针，每次走1步
  let fast = head;  // 快指针，每次走2步

  // 快指针能走就继续
  while (fast && fast.next) {
    slow = slow.next;       // 慢指针走1步
    fast = fast.next.next;  // 快指针走2步

    // 如果相遇，说明有环
    if (slow === fast) {
      return true;
    }
  }

  // 快指针到达末尾，说明无环
  return false;
}`,
        animation: {
          type: "linked-list" as const,
          title: "环形链表 - 快慢指针演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "0" },
                { value: 2, id: "1" },
                { value: 0, id: "2" },
                { value: -4, id: "3" },
              ],
              pointers: { "0": ["slow", "fast"] },
              description: "初始化：slow 和 fast 都指向 head（节点3）",
            },
            {
              nodes: [
                { value: 3, id: "0" },
                { value: 2, id: "1" },
                { value: 0, id: "2" },
                { value: -4, id: "3" },
              ],
              pointers: { "1": ["slow"], "2": ["fast"] },
              description: "第1步：slow 走1步到节点2，fast 走2步到节点0",
            },
            {
              nodes: [
                { value: 3, id: "0" },
                { value: 2, id: "1" },
                { value: 0, id: "2" },
                { value: -4, id: "3" },
              ],
              pointers: { "2": ["slow"], "1": ["fast"] },
              highlights: [{ nodeIds: ["1"], color: "yellow" as const, label: "环内" }],
              description: "第2步：slow 到节点0，fast 在环中到节点2（-4→2）",
            },
            {
              nodes: [
                { value: 3, id: "0" },
                { value: 2, id: "1" },
                { value: 0, id: "2" },
                { value: -4, id: "3" },
              ],
              pointers: { "3": ["slow", "fast"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const, label: "相遇!" }],
              description: "第3步：slow 和 fast 都在节点-4，相遇！存在环，返回 true",
            },
          ] as LinkedListStep[],
        },
        explanation: `## 快慢指针（Floyd 判圈算法）

### 核心思想
使用两个速度不同的指针，如果有环必定相遇

### 执行示例
链表：3 → 2 → 0 → -4 → 2（回到节点2形成环）

| 步骤 | slow 位置 | fast 位置 | 说明 |
|------|-----------|-----------|------|
| 0    | 3         | 3         | 初始 |
| 1    | 2         | 0         | slow+1, fast+2 |
| 2    | 0         | 2(环内)   | 继续移动 |
| 3    | -4        | -4        | 相遇！有环 |

### 为什么快慢指针能检测环？
\`\`\`
快指针每次比慢指针多走1步
假设慢指针进入环时，快指针领先 k 步
每次迭代后，距离减少 1
k 次后距离为 0，即相遇
\`\`\`

### 为什么快指针走2步？
- 走2步是最优选择，保证一定能相遇
- 走更多步可能"跳过"慢指针`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        animation: {
          type: "two-pointers" as const,
          title: "哈希表检测环演示",
          steps: [
            {
              array: ["1", "2", "3", "→2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "当前" }],
              description: "链表: 1→2→3→2(环)。seen={}，访问节点1",
            },
            {
              array: ["1", "2", "3", "→2"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已访问" },
                { indices: [1], color: "green" as const, label: "当前" },
              ],
              description: "seen={1}，访问节点2",
            },
            {
              array: ["1", "2", "3", "→2"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0, 1], color: "gray" as const, label: "已访问" },
                { indices: [2], color: "green" as const, label: "当前" },
              ],
              description: "seen={1,2}，访问节点3",
            },
            {
              array: ["1", "2", "3", "→2"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "已访问" },
                { indices: [3], color: "red" as const, label: "重复!" },
              ],
              description: "seen={1,2,3}，节点2已在集合中！返回true",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 环形链表 - 哈希表法
 *
 * 核心思想：
 * 遍历链表，记录访问过的节点
 * - 如果当前节点已被访问过，说明存在环
 * - 如果遍历完毕都没有重复，说明无环
 *
 * 优点：思路简单直接
 * 缺点：需要额外 O(n) 空间
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)，存储所有访问过的节点
 */
function hasCycle(head) {
  const seen = new Set();  // 存储访问过的节点

  while (head) {
    // 如果当前节点已访问过，说明有环
    if (seen.has(head)) {
      return true;
    }
    // 记录当前节点
    seen.add(head);
    // 移动到下一个节点
    head = head.next;
  }

  // 遍历完毕，无环
  return false;
}`,
        explanation: `## 哈希表

### 核心思想
记录访问过的节点，如果再次遇到说明有环

### 执行过程
\`\`\`
链表：1 → 2 → 3 → 2（回到节点2）

遍历节点1：seen = {1}
遍历节点2：seen = {1, 2}
遍历节点3：seen = {1, 2, 3}
遍历节点2：已在 seen 中！返回 true
\`\`\`

### 优点
- 思路简单直接，容易理解

### 缺点
- 空间复杂度 O(n)
- 不满足进阶要求（O(1) 空间）`,
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
    frontendRelevance: "high",
    frontendNote: "快慢指针找环入口",
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
        code: `/**
 * 环形链表 II - 快慢指针 + 数学推导法（Floyd 判圈算法扩展）
 *
 * 核心思想：
 * 分两个阶段找到环的入口节点：
 * 1. 第一阶段：使用快慢指针找到相遇点（证明环的存在）
 * 2. 第二阶段：利用数学推导，从头和相遇点同时出发找入口
 *
 * 数学原理：
 * 设 a = 头到入环点距离，b = 入环点到相遇点距离，c = 相遇点到入环点距离
 * 相遇时：慢指针走了 a + b，快指针走了 a + b + n(b + c)
 * 由于快指针速度是慢指针的 2 倍：
 *   2(a + b) = a + b + n(b + c)
 *   a = (n-1)(b + c) + c
 *
 * 这说明从头走 a 步等于从相遇点走 c 步 + 绕 n-1 圈
 *
 * 时间复杂度：O(n) - 最多遍历两次链表
 * 空间复杂度：O(1) - 只使用常数个指针
 */
function detectCycle(head) {
  // 边界情况：空链表或单节点无法形成环
  if (!head || !head.next) return null;

  // 初始化快慢指针，都从头节点开始
  let slow = head;  // 慢指针，每次走 1 步
  let fast = head;  // 快指针，每次走 2 步

  // ========== 第一阶段：检测环并找到相遇点 ==========
  while (fast && fast.next) {
    slow = slow.next;       // 慢指针走 1 步
    fast = fast.next.next;  // 快指针走 2 步

    // 快慢指针相遇，说明存在环
    if (slow === fast) {
      // ========== 第二阶段：找到入环点 ==========
      // 根据数学推导，从头节点和相遇点同时出发
      // 每次各走 1 步，相遇点即为入环点
      let ptr = head;  // 新指针从头开始

      // 两个指针同速前进，直到相遇
      while (ptr !== slow) {
        ptr = ptr.next;   // 从头出发的指针
        slow = slow.next; // 从相遇点出发的指针
      }

      // 相遇点即为环的入口节点
      return ptr;
    }
  }

  // 快指针到达末尾，说明无环
  return null;
}`,
        explanation: `## 快慢指针 + 数学推导

### 算法原理

本算法是 Floyd 判圈算法的扩展，分两个阶段：

**第一阶段：检测环**
- 快指针每次走 2 步，慢指针每次走 1 步
- 如果存在环，两指针必定相遇

**第二阶段：找入环点（数学推导）**

设链表结构如下：
\`\`\`
头 ——(a步)—→ 入环点 ——(b步)—→ 相遇点
                ↑                  ↓
                ←——— (c步) ———←
\`\`\`

相遇时的路程：
- 慢指针：a + b
- 快指针：a + b + n(b + c)，其中 n ≥ 1 是快指针在环中绕的圈数

由于快指针速度是慢指针的 2 倍：
\`\`\`
2(a + b) = a + b + n(b + c)
a + b = n(b + c)
a = n(b + c) - b = (n-1)(b + c) + c
\`\`\`

**关键结论**：a = (n-1)(b + c) + c

这意味着：
- 从头走 a 步
- 等于从相遇点走 c 步再绕 (n-1) 圈

所以从头和从相遇点同时出发，每次走一步，一定会在入环点相遇！

### 执行示例

链表：3 → 2 → 0 → -4 → (回到 2)

\`\`\`
位置标记：
节点:  3    2    0   -4
索引:  0    1    2    3
       ↑         ↓
       入环点    -4.next → 2
\`\`\`

| 步骤 | 慢指针 | 快指针 | 说明 |
|------|--------|--------|------|
| 初始 | 3 | 3 | 两指针都在头节点 |
| 1 | 2 | 0 | slow+1, fast+2 |
| 2 | 0 | 2 | fast 已在环中 |
| 3 | -4 | -4 | 相遇！a=1, b=2, c=1 |

第二阶段：ptr 从头出发，slow 从相遇点出发
| 步骤 | ptr | slow | 说明 |
|------|-----|------|------|
| 初始 | 3 | -4 | |
| 1 | 2 | 2 | 相遇！返回节点 2 |`,
        animation: {
          type: "linked-list" as const,
          title: "环形链表 II 演示",
          steps: [
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n0: ["slow", "fast"] },
              highlights: [{ nodeIds: ["n1"], color: "yellow" as const }],
              description: "链表: 3→2→0→-4→(回到2)。黄色节点是入环点。快慢指针都从头开始",
            },
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n1: ["slow"], n2: ["fast"] },
              highlights: [{ nodeIds: ["n1"], color: "yellow" as const }],
              description: "第1步：slow 走1步到节点2，fast 走2步到节点0",
            },
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n2: ["slow"], n1: ["fast"] },
              highlights: [{ nodeIds: ["n1"], color: "yellow" as const }],
              description: "第2步：slow 到节点0，fast 走2步经过-4回到节点2（fast在环中绕）",
            },
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n3: ["slow", "fast"] },
              highlights: [
                { nodeIds: ["n1"], color: "yellow" as const },
                { nodeIds: ["n3"], color: "red" as const },
              ],
              description: "第3步：slow 到-4，fast 也到-4。相遇！证明有环。现在进入第二阶段",
            },
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n0: ["ptr"], n3: ["slow"] },
              highlights: [{ nodeIds: ["n1"], color: "yellow" as const }],
              description: "第二阶段：ptr从头开始，slow在相遇点。两者同时每次走1步",
            },
            {
              nodes: [
                { value: 3, id: "n0" },
                { value: 2, id: "n1" },
                { value: 0, id: "n2" },
                { value: -4, id: "n3" },
              ],
              pointers: { n1: ["ptr", "slow"] },
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              description: "ptr走1步到2，slow走1步到2。相遇！节点2就是入环点。数学原理: a = c + (n-1)圈",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        animation: {
          type: "two-pointers" as const,
          title: "哈希表找入环点演示",
          steps: [
            {
              array: ["3", "2", "0", "-4", "→2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "当前" }],
              description: "链表: 3→2→0→-4→2(环)。seen={}",
            },
            {
              array: ["3", "2", "0", "-4", "→2"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "已访问" },
                { indices: [1], color: "green" as const, label: "当前" },
              ],
              description: "seen={3}，访问节点2",
            },
            {
              array: ["3", "2", "0", "-4", "→2"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0, 1, 2, 3], color: "gray" as const, label: "已访问" },
              ],
              description: "seen={3,2,0,-4}，继续遍历",
            },
            {
              array: ["3", "2", "0", "-4", "→2"],
              left: 1,
              right: 4,
              highlights: [
                { indices: [1], color: "red" as const, label: "入环点!" },
                { indices: [4], color: "yellow" as const, label: "回到2" },
              ],
              description: "回到节点2，已在seen中！返回节点2",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 环形链表 II - 哈希表法
 *
 * 核心思想：
 * 利用哈希表（Set）记录访问过的节点：
 * 1. 遍历链表，将每个节点的引用存入 Set
 * 2. 如果遇到已存在于 Set 中的节点，该节点就是环的入口
 * 3. 如果遍历到 null，说明链表无环
 *
 * 为什么第一个重复节点就是入环点？
 * 因为我们是从头顺序遍历的，入环点是第一个会被访问两次的节点：
 * - 第一次：从头走到这里
 * - 第二次：从环的末尾绕回来
 *
 * 时间复杂度：O(n) - 最多遍历 n 个节点
 * 空间复杂度：O(n) - 哈希表存储所有节点
 */
function detectCycle(head) {
  // 创建 Set 用于存储已访问的节点引用
  const seen = new Set();

  // 遍历链表
  while (head) {
    // 检查当前节点是否已经访问过
    if (seen.has(head)) {
      // 找到了！第一个重复访问的节点就是入环点
      return head;
    }

    // 将当前节点加入已访问集合
    seen.add(head);

    // 移动到下一个节点
    head = head.next;
  }

  // 遍历结束，没有找到重复节点，说明无环
  return null;
}`,
        explanation: `## 哈希表法

### 算法原理

使用 Set 数据结构记录所有访问过的节点引用：

1. **遍历链表**：从头节点开始，逐个访问
2. **检查重复**：每访问一个节点，检查是否已在 Set 中
3. **找到入口**：第一个已存在的节点就是环的入口
4. **无环情况**：遍历到 null 说明无环

### 为什么有效？

\`\`\`
头 → A → B → C → D → E
              ↑       ↓
              ←———←—←
\`\`\`

访问顺序：头 → A → B → C → D → E → C（重复！）

第一个重复的节点 C 就是入环点，因为：
- 从头到 C 是第一次访问
- 从 E 绕回 C 是第二次访问

### 执行示例

链表：3 → 2 → 0 → -4 → (回到 2)

| 步骤 | 当前节点 | Set 内容 | 操作 |
|------|----------|----------|------|
| 1 | 3 | {} | 添加 3 |
| 2 | 2 | {3} | 添加 2 |
| 3 | 0 | {3,2} | 添加 0 |
| 4 | -4 | {3,2,0} | 添加 -4 |
| 5 | 2 | {3,2,0,-4} | 2 已存在，返回！|

### 优缺点对比

**优点**：
- 思路直观，容易理解和实现
- 代码简洁

**缺点**：
- 需要 O(n) 额外空间
- 面试时通常会要求 O(1) 空间的解法`,
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
    frontendRelevance: "high",
    frontendNote: "链表反转，必会",
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
        animation: {
          type: "linked-list" as const,
          title: "反转链表 - 迭代法演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["curr"] },
              description: "初始化：prev = null, curr 指向头节点 1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["prev"], "2": ["curr"] },
              brokenConnections: [{ from: "1", to: "2" }],
              highlights: [{ nodeIds: ["1"], color: "green" as const, label: "已反转" }],
              description: "第1步：next=2, 1.next=null(断开), prev=1, curr=2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "2": ["prev"], "3": ["curr"] },
              brokenConnections: [{ from: "1", to: "2" }, { from: "2", to: "3" }],
              highlights: [{ nodeIds: ["1", "2"], color: "green" as const, label: "已反转" }],
              description: "第2步：next=3, 2.next=1(反转), prev=2, curr=3",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "3": ["prev"], "4": ["curr"] },
              brokenConnections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }],
              highlights: [{ nodeIds: ["1", "2", "3"], color: "green" as const, label: "已反转" }],
              description: "第3步：next=4, 3.next=2(反转), prev=3, curr=4",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "4": ["prev"], "5": ["curr"] },
              brokenConnections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }, { from: "4", to: "5" }],
              highlights: [{ nodeIds: ["1", "2", "3", "4"], color: "green" as const, label: "已反转" }],
              description: "第4步：next=5, 4.next=3(反转), prev=4, curr=5",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "5": ["prev/新头"] },
              brokenConnections: [{ from: "1", to: "2" }, { from: "2", to: "3" }, { from: "3", to: "4" }, { from: "4", to: "5" }],
              highlights: [{ nodeIds: ["1", "2", "3", "4", "5"], color: "green" as const, label: "完成" }],
              description: "完成！curr=null，返回 prev=5。链表已反转：5→4→3→2→1",
            },
          ] as LinkedListStep[],
        },
        code: `/**
 * 反转链表 - 迭代法（双指针）
 *
 * 核心思想：
 * 使用三个指针遍历链表，逐个反转每个节点的指向：
 * - prev：指向已反转部分的头节点（初始为 null）
 * - curr：当前正在处理的节点
 * - next：暂存下一个待处理的节点（防止断链）
 *
 * 每次迭代执行四步：
 * 1. 保存 next = curr.next（防止断链）
 * 2. 反转：curr.next = prev（当前节点指向前一个）
 * 3. 移动 prev = curr（prev 前进一步）
 * 4. 移动 curr = next（curr 前进一步）
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用三个指针变量
 */
function reverseList(head) {
  // prev 指向已反转部分的头，初始为 null（反转后的尾部）
  let prev = null;
  // curr 指向当前待处理的节点，初始为原链表头
  let curr = head;

  // 遍历整个链表
  while (curr) {
    // 步骤1：暂存下一个节点，防止反转后丢失后续链表
    const next = curr.next;

    // 步骤2：反转当前节点的指针，指向前一个节点
    curr.next = prev;

    // 步骤3：prev 前进，指向当前节点（它现在是已反转部分的新头）
    prev = curr;

    // 步骤4：curr 前进，处理下一个节点
    curr = next;
  }

  // 循环结束时，prev 指向新链表的头节点
  return prev;
}`,
        explanation: `## 迭代法（双指针）

### 算法原理

通过原地修改指针方向来反转链表，不需要额外空间。

### 核心操作

每次迭代的四个步骤：
\`\`\`javascript
const next = curr.next;  // 1. 保存后继节点
curr.next = prev;        // 2. 反转指针
prev = curr;             // 3. prev 前进
curr = next;             // 4. curr 前进
\`\`\`

### 执行示例

原链表：1 → 2 → 3 → null

| 步骤 | prev | curr | next | 操作后链表状态 |
|------|------|------|------|----------------|
| 初始 | null | 1 | - | 1 → 2 → 3 → null |
| 1 | 1 | 2 | 2 | null ← 1  2 → 3 → null |
| 2 | 2 | 3 | 3 | null ← 1 ← 2  3 → null |
| 3 | 3 | null | - | null ← 1 ← 2 ← 3 |

返回 prev = 3，即新链表头

### 图解

\`\`\`
原链表：1 → 2 → 3 → null

第一次迭代后：
null ← 1    2 → 3 → null
      prev  curr

第二次迭代后：
null ← 1 ← 2    3 → null
          prev  curr

第三次迭代后：
null ← 1 ← 2 ← 3
              prev  curr=null

返回 prev (节点 3)
\`\`\`

### 为什么推荐迭代法？

1. **空间效率**：O(1) 常数空间
2. **无栈溢出风险**：长链表也能处理
3. **易于调试**：可以逐步观察指针变化`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归法",
        animation: {
          type: "two-pointers" as const,
          title: "递归反转链表演示",
          steps: [
            {
              array: ["1", "2", "3", "null"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "递归深入" }],
              description: "链表1→2→3。递归到底部，找到新头节点3",
            },
            {
              array: ["1", "2", "←3"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "yellow" as const, label: "当前" },
                { indices: [2], color: "green" as const, label: "新头" },
              ],
              description: "回溯：3.next=2, 2.next=null。得到2←3",
            },
            {
              array: ["1", "←2", "←3"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "yellow" as const, label: "当前" },
                { indices: [2], color: "green" as const, label: "新头" },
              ],
              description: "回溯：2.next=1, 1.next=null。得到1←2←3",
            },
            {
              array: ["null←1", "←2", "←3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "green" as const, label: "返回新头3" }],
              description: "完成！返回新头节点3，链表变为3→2→1→null",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 反转链表 - 递归法
 *
 * 核心思想：
 * 利用递归的特性，先递归到链表末尾，然后从后往前反转指针。
 *
 * 递归的三个要素：
 * 1. 终止条件：空节点或只有一个节点
 * 2. 递归操作：先递归反转后面的链表
 * 3. 回溯操作：反转当前节点与下一节点的指向
 *
 * 关键操作：
 * - head.next.next = head：让下一个节点指向当前节点（反转）
 * - head.next = null：断开当前节点的原指向（防止成环）
 *
 * 时间复杂度：O(n) - 递归遍历每个节点
 * 空间复杂度：O(n) - 递归调用栈深度
 */
function reverseList(head) {
  // 终止条件：空链表或到达最后一个节点
  // 最后一个节点就是反转后的新头节点
  if (!head || !head.next) return head;

  // 递归反转后面的链表，newHead 是反转后的新头
  // 注意：newHead 会一直是原链表的最后一个节点
  const newHead = reverseList(head.next);

  // 回溯时反转指针
  // head.next 是当前节点的下一个节点
  // head.next.next = head 让下一个节点指向当前节点
  head.next.next = head;

  // 断开当前节点的原指向，防止形成环
  // 对于原链表头节点，这会使其 next 指向 null（成为新尾部）
  head.next = null;

  // 返回新的头节点（原链表的最后一个节点）
  return newHead;
}`,
        explanation: `## 递归法

### 算法原理

递归的本质是将问题分解为子问题：
- 反转 [1,2,3,4,5] = 反转 [2,3,4,5] + 处理节点 1
- 反转 [2,3,4,5] = 反转 [3,4,5] + 处理节点 2
- ... 直到只剩一个节点（终止条件）

### 递归过程图解

原链表：1 → 2 → 3 → null

**递归阶段（深入）**：
\`\`\`
reverseList(1)
  └─ reverseList(2)
       └─ reverseList(3)
            └─ 返回 3（终止条件：只有一个节点）
\`\`\`

**回溯阶段（返回）**：
\`\`\`
reverseList(3) 返回 3
reverseList(2):
  - 2.next.next = 2  →  3 → 2
  - 2.next = null    →  3 → 2 → null
  - 返回 3

reverseList(1):
  - 1.next.next = 1  →  3 → 2 → 1
  - 1.next = null    →  3 → 2 → 1 → null
  - 返回 3
\`\`\`

### 关键代码解析

\`\`\`javascript
head.next.next = head;  // 让下一个节点指向自己（反转）
head.next = null;       // 断开原来的指向（防止成环）
\`\`\`

以节点 2 为例（此时 head = 2）：
\`\`\`
操作前：1 → 2 → 3 → null
            ↑
           head

head.next = 3
head.next.next = head  →  3.next = 2

操作后：1 → 2 ← 3
            ↓
          null
\`\`\`

### 注意事项

1. **空间复杂度 O(n)**：递归调用栈
2. **栈溢出风险**：链表过长时可能栈溢出
3. **理解难度**：比迭代法更抽象`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "头插法",
        animation: {
          type: "two-pointers" as const,
          title: "头插法反转链表演示",
          steps: [
            {
              array: ["dummy", "1", "2", "3"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "gray" as const, label: "哨兵" },
                { indices: [1], color: "green" as const, label: "curr" },
              ],
              description: "创建哨兵节点。curr=1，准备头插",
            },
            {
              array: ["dummy", "1", "2", "3"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1], color: "green" as const, label: "插入1" },
              ],
              description: "将1插入dummy后。dummy→1",
            },
            {
              array: ["dummy", "2", "1", "3"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0, 1, 2], color: "green" as const, label: "插入2" },
              ],
              description: "将2插入dummy后。dummy→2→1",
            },
            {
              array: ["dummy", "3", "2", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [1, 2, 3], color: "green" as const, label: "完成" }],
              description: "将3插入dummy后。dummy→3→2→1。返回3",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 反转链表 - 头插法
 *
 * 核心思想：
 * 使用哨兵节点（dummy node），每次将当前节点"插入"到哨兵节点之后。
 * 由于每次都插入到头部，后插入的节点会在前面，从而实现反转。
 *
 * 本质上与迭代法相同，但使用哨兵节点使代码更统一。
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用哨兵节点
 */
function reverseList(head) {
  // 创建哨兵节点，其 next 将指向反转后的链表头
  const dummy = { next: null };

  // 遍历原链表
  while (head) {
    // 保存下一个节点
    const next = head.next;

    // 将当前节点插入到 dummy 之后
    // 相当于：当前节点 → 原来的第一个节点
    head.next = dummy.next;

    // dummy 指向当前节点（当前节点成为新的第一个节点）
    dummy.next = head;

    // 移动到原链表的下一个节点
    head = next;
  }

  // dummy.next 即为反转后的链表头
  return dummy.next;
}`,
        explanation: `## 头插法

### 算法原理

类似于构建新链表，每次将节点插入到头部：
- 使用哨兵节点 dummy 作为新链表的起点
- 每次将原链表的节点"摘下"并插入到 dummy 之后
- 后插入的节点在前面，自然形成反转效果

### 执行示例

原链表：1 → 2 → 3 → null

| 步骤 | head | dummy.next | 新链表状态 |
|------|------|------------|------------|
| 初始 | 1 | null | (空) |
| 1 | 2 | 1 | 1 → null |
| 2 | 3 | 2 | 2 → 1 → null |
| 3 | null | 3 | 3 → 2 → 1 → null |

### 图解

\`\`\`
初始：dummy → null
      head → 1 → 2 → 3 → null

步骤1：dummy → 1 → null
       head → 2 → 3 → null

步骤2：dummy → 2 → 1 → null
       head → 3 → null

步骤3：dummy → 3 → 2 → 1 → null
       head → null

返回 dummy.next = 3
\`\`\`

### 与迭代法的对比

| 特点 | 迭代法 | 头插法 |
|------|--------|--------|
| 核心操作 | 原地反转指针 | 插入到头部 |
| 额外空间 | 3个指针 | 1个哨兵节点 |
| 代码风格 | 更直接 | 更统一 |`,
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
    frontendRelevance: "high",
    frontendNote: "链表合并，递归思维",
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
        animation: {
          type: "linked-list" as const,
          title: "合并两个有序链表 - 迭代法演示",
          steps: [
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "2₁", id: "l1-2" },
                { value: "4₁", id: "l1-4" },
              ],
              pointers: { "l1-1": ["list1"] },
              description: "list1: 1→2→4, list2: 1→3→4。创建哨兵节点 dummy",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "2₁", id: "l1-2" },
                { value: "4₁", id: "l1-4" },
              ],
              pointers: { "l1-1": ["选中"] },
              highlights: [{ nodeIds: ["l1-1"], color: "green" as const, label: "1≤1" }],
              description: "比较 1₁ vs 1₂：相等，选 list1 的 1。结果：dummy→1₁",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "1₂", id: "l2-1" },
                { value: "2₁", id: "l1-2" },
                { value: "4₁", id: "l1-4" },
              ],
              pointers: { "l2-1": ["选中"] },
              highlights: [{ nodeIds: ["l1-1"], color: "green" as const }, { nodeIds: ["l2-1"], color: "yellow" as const, label: "1<2" }],
              description: "比较 2₁ vs 1₂：1₂更小。结果：dummy→1₁→1₂",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "1₂", id: "l2-1" },
                { value: "2₁", id: "l1-2" },
                { value: "4₁", id: "l1-4" },
              ],
              pointers: { "l1-2": ["选中"] },
              highlights: [{ nodeIds: ["l1-1", "l2-1"], color: "green" as const }, { nodeIds: ["l1-2"], color: "yellow" as const, label: "2<3" }],
              description: "比较 2₁ vs 3₂：2₁更小。结果：dummy→1₁→1₂→2₁",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "1₂", id: "l2-1" },
                { value: "2₁", id: "l1-2" },
                { value: "3₂", id: "l2-3" },
                { value: "4₁", id: "l1-4" },
              ],
              pointers: { "l2-3": ["选中"] },
              highlights: [{ nodeIds: ["l1-1", "l2-1", "l1-2"], color: "green" as const }, { nodeIds: ["l2-3"], color: "yellow" as const, label: "3<4" }],
              description: "比较 4₁ vs 3₂：3₂更小。结果：...→2₁→3₂",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "1₂", id: "l2-1" },
                { value: "2₁", id: "l1-2" },
                { value: "3₂", id: "l2-3" },
                { value: "4₁", id: "l1-4" },
                { value: "4₂", id: "l2-4" },
              ],
              pointers: { "l1-4": ["选中"] },
              highlights: [{ nodeIds: ["l1-1", "l2-1", "l1-2", "l2-3"], color: "green" as const }, { nodeIds: ["l1-4"], color: "yellow" as const, label: "4≤4" }],
              description: "比较 4₁ vs 4₂：相等选 list1。结果：...→3₂→4₁",
            },
            {
              nodes: [
                { value: "1₁", id: "l1-1" },
                { value: "1₂", id: "l2-1" },
                { value: "2₁", id: "l1-2" },
                { value: "3₂", id: "l2-3" },
                { value: "4₁", id: "l1-4" },
                { value: "4₂", id: "l2-4" },
              ],
              highlights: [{ nodeIds: ["l1-1", "l2-1", "l1-2", "l2-3", "l1-4", "l2-4"], color: "green" as const, label: "完成" }],
              description: "list1 遍历完，连接 list2 剩余：4₂。最终：1→1→2→3→4→4",
            },
          ] as LinkedListStep[],
        },
        code: `/**
 * 合并两个有序链表 - 迭代法
 *
 * 核心思想：
 * 使用哨兵节点 + 双指针，逐个比较两个链表的当前节点，
 * 将较小的节点连接到结果链表末尾。
 *
 * 关键技巧：
 * 1. 哨兵节点（dummy）：避免处理头节点的特殊情况
 * 2. 尾指针（curr）：始终指向结果链表的最后一个节点
 * 3. 剩余链接：循环结束后直接连接非空链表的剩余部分
 *
 * 时间复杂度：O(m + n) - m、n 分别是两个链表的长度
 * 空间复杂度：O(1) - 只使用常数额外空间
 */
function mergeTwoLists(list1, list2) {
  // 创建哨兵节点，简化头节点的处理
  const dummy = { next: null };
  // curr 指向结果链表的当前末尾
  let curr = dummy;

  // 当两个链表都非空时，逐个比较
  while (list1 && list2) {
    // 比较当前节点，选择较小的连接到结果链表
    if (list1.val <= list2.val) {
      curr.next = list1;     // 将 list1 当前节点接入
      list1 = list1.next;    // list1 指针前进
    } else {
      curr.next = list2;     // 将 list2 当前节点接入
      list2 = list2.next;    // list2 指针前进
    }
    // 结果链表指针前进
    curr = curr.next;
  }

  // 连接剩余部分（只有一个链表可能还有剩余）
  // 直接连接，因为剩余部分已经是有序的
  curr.next = list1 || list2;

  // 返回合并后的链表（跳过哨兵节点）
  return dummy.next;
}`,
        explanation: `## 迭代法（双指针）

### 算法原理

类似于合并两个有序数组，使用双指针分别遍历两个链表：
1. 比较两个指针指向的节点值
2. 将较小的节点连接到结果链表
3. 移动被选中链表的指针
4. 重复直到一个链表遍历完毕
5. 将另一个链表的剩余部分直接连接

### 执行示例

list1: 1 → 2 → 4
list2: 1 → 3 → 4

| 步骤 | list1 | list2 | curr | 选择 | 结果链表 |
|------|-------|-------|------|------|----------|
| 初始 | 1 | 1 | dummy | - | dummy |
| 1 | 2 | 1 | 1 | list1(1≤1) | dummy→1 |
| 2 | 2 | 3 | 1 | list2(1<2) | dummy→1→1 |
| 3 | 4 | 3 | 2 | list1(2<3) | dummy→1→1→2 |
| 4 | 4 | 4 | 3 | list2(3<4) | dummy→1→1→2→3 |
| 5 | null | 4 | 4 | list1(4≤4) | dummy→1→1→2→3→4 |
| 连接剩余 | - | - | 4 | - | dummy→1→1→2→3→4→4 |

### 为什么使用哨兵节点？

没有哨兵节点的代码需要特殊处理头节点：
\`\`\`javascript
// 不使用哨兵节点（代码更复杂）
let head = null;
if (list1.val <= list2.val) {
  head = list1;
  list1 = list1.next;
} else {
  head = list2;
  list2 = list2.next;
}
// ... 后续代码
\`\`\`

使用哨兵节点，代码更统一简洁！`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归法",
        animation: {
          type: "two-pointers" as const,
          title: "递归合并链表演示",
          steps: [
            {
              array: ["1→2→4", "1→3→4"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "list1" },
                { indices: [1], color: "green" as const, label: "list2" },
              ],
              description: "list1=[1,2,4], list2=[1,3,4]。比较1和1",
            },
            {
              array: ["1", "→", "merge([2,4],[1,3,4])"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "选1" }],
              description: "1≤1，选list1的1。递归合并剩余",
            },
            {
              array: ["1→1", "→", "merge([2,4],[3,4])"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "选list2的1" }],
              description: "2>1，选list2的1。继续递归",
            },
            {
              array: ["1→1→2→3→4→4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "递归完成，返回合并后的链表",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 合并两个有序链表 - 递归法
 *
 * 核心思想：
 * 将问题分解为子问题：
 * - 合并 list1 和 list2 = 较小头节点 + 合并(剩余部分)
 *
 * 递归定义：
 * - 如果 list1 为空，返回 list2
 * - 如果 list2 为空，返回 list1
 * - 如果 list1.val ≤ list2.val：
 *   - list1.next = merge(list1.next, list2)
 *   - 返回 list1
 * - 否则：
 *   - list2.next = merge(list1, list2.next)
 *   - 返回 list2
 *
 * 时间复杂度：O(m + n) - 每个节点被访问一次
 * 空间复杂度：O(m + n) - 递归调用栈深度
 */
function mergeTwoLists(list1, list2) {
  // 基础情况：如果一个链表为空，直接返回另一个
  if (!list1) return list2;
  if (!list2) return list1;

  // 比较两个头节点，选择较小的作为合并后的头
  if (list1.val <= list2.val) {
    // list1 的头较小，将其 next 指向剩余部分的合并结果
    list1.next = mergeTwoLists(list1.next, list2);
    // 返回 list1 作为这一层的头节点
    return list1;
  } else {
    // list2 的头较小，将其 next 指向剩余部分的合并结果
    list2.next = mergeTwoLists(list1, list2.next);
    // 返回 list2 作为这一层的头节点
    return list2;
  }
}`,
        explanation: `## 递归法

### 算法原理

递归思想：将大问题分解为相同结构的子问题

合并 [1,2,4] 和 [1,3,4]：
1. 比较头节点 1 和 1，选 list1 的 1
2. list1.next = 合并([2,4], [1,3,4])
3. 继续递归...

### 递归过程图解

\`\`\`
merge([1,2,4], [1,3,4])
  │ 1 ≤ 1，选 list1
  │ list1.next = merge([2,4], [1,3,4])
  │
  └─ merge([2,4], [1,3,4])
       │ 2 > 1，选 list2
       │ list2.next = merge([2,4], [3,4])
       │
       └─ merge([2,4], [3,4])
            │ 2 < 3，选 list1
            │ list1.next = merge([4], [3,4])
            │
            └─ merge([4], [3,4])
                 │ 4 > 3，选 list2
                 │ list2.next = merge([4], [4])
                 │
                 └─ merge([4], [4])
                      │ 4 ≤ 4，选 list1
                      │ list1.next = merge([], [4])
                      │
                      └─ merge([], [4])
                           └─ 返回 [4]（list1 为空）

回溯组装：1 → 1 → 2 → 3 → 4 → 4
\`\`\`

### 与迭代法对比

| 特点 | 迭代法 | 递归法 |
|------|--------|--------|
| 空间复杂度 | O(1) | O(m+n) |
| 代码风格 | 过程式 | 函数式 |
| 理解难度 | 较易 | 需要递归思维 |
| 栈溢出风险 | 无 | 链表过长时有 |`,
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
    frontendRelevance: "low",
    frontendNote: "大数加法，前端少用",
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
        animation: {
          type: "linked-list" as const,
          title: "两数相加 - 模拟加法演示",
          steps: [
            {
              nodes: [
                { value: 2, id: "l1-2" },
                { value: 4, id: "l1-4" },
                { value: 3, id: "l1-3" },
              ],
              pointers: { "l1-2": ["l1"], "l1-4": ["l2"] },
              description: "l1=[2,4,3] 表示 342，l2=[5,6,4] 表示 465。从个位开始相加",
            },
            {
              nodes: [
                { value: 2, id: "l1-2" },
                { value: 5, id: "l2-5" },
                { value: 7, id: "r-7" },
              ],
              pointers: { "l1-2": ["2"], "l2-5": ["5"] },
              highlights: [{ nodeIds: ["r-7"], color: "green" as const, label: "2+5=7" }],
              description: "个位：2 + 5 = 7，无进位。结果：7",
            },
            {
              nodes: [
                { value: 7, id: "r-7" },
                { value: 4, id: "l1-4" },
                { value: 6, id: "l2-6" },
                { value: 0, id: "r-0" },
              ],
              pointers: { "l1-4": ["4"], "l2-6": ["6"] },
              highlights: [{ nodeIds: ["r-7"], color: "green" as const }, { nodeIds: ["r-0"], color: "yellow" as const, label: "4+6=10" }],
              description: "十位：4 + 6 = 10，进位1，保留0。结果：7→0",
            },
            {
              nodes: [
                { value: 7, id: "r-7" },
                { value: 0, id: "r-0" },
                { value: 3, id: "l1-3" },
                { value: 4, id: "l2-4" },
                { value: 8, id: "r-8" },
              ],
              pointers: { "l1-3": ["3"], "l2-4": ["4"] },
              highlights: [{ nodeIds: ["r-7", "r-0"], color: "green" as const }, { nodeIds: ["r-8"], color: "yellow" as const, label: "3+4+1=8" }],
              description: "百位：3 + 4 + 1(进位) = 8。结果：7→0→8",
            },
            {
              nodes: [
                { value: 7, id: "r-7" },
                { value: 0, id: "r-0" },
                { value: 8, id: "r-8" },
              ],
              highlights: [{ nodeIds: ["r-7", "r-0", "r-8"], color: "green" as const, label: "完成" }],
              description: "计算完成！342 + 465 = 807，链表表示：7→0→8",
            },
          ] as LinkedListStep[],
        },
        code: `/**
 * 两数相加 - 模拟加法
 *
 * 核心思想：
 * 模拟我们手算加法的过程：
 * 1. 从最低位（个位）开始，逐位相加
 * 2. 处理进位
 * 3. 将结果存入新链表
 *
 * 关键点：
 * - 链表是逆序存储数字，所以从头遍历正好是从低位到高位
 * - 两个链表长度可能不同，短的用 0 补齐
 * - 最后可能有额外进位，需要创建新节点
 *
 * 时间复杂度：O(max(m, n)) - 遍历较长链表一次
 * 空间复杂度：O(max(m, n)) - 结果链表的长度
 */
function addTwoNumbers(l1, l2) {
  // 哨兵节点，简化链表操作
  const dummy = { next: null };
  let curr = dummy;  // 结果链表的当前节点
  let carry = 0;     // 进位，初始为 0

  // 循环条件：任一链表非空 或 还有进位
  while (l1 || l2 || carry) {
    // 获取当前位的值，空节点视为 0
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;

    // 计算当前位的和（包含进位）
    const sum = val1 + val2 + carry;

    // 计算新的进位：sum >= 10 则进位为 1
    carry = Math.floor(sum / 10);

    // 创建新节点，存储当前位的结果（取个位）
    curr.next = { val: sum % 10, next: null };
    curr = curr.next;

    // 移动到下一位（如果存在）
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // 返回结果链表（跳过哨兵节点）
  return dummy.next;
}`,
        explanation: `## 模拟加法

### 算法原理

模拟小学数学中的竖式加法：

\`\`\`
    3 4 2  (l1: 2→4→3，逆序表示 342)
+   4 6 5  (l2: 5→6→4，逆序表示 465)
---------
    8 0 7  (结果: 7→0→8，逆序表示 807)
\`\`\`

由于链表已经是逆序的，我们从头遍历正好是从低位到高位，方便进位处理！

### 执行示例

l1: 2 → 4 → 3 (342)
l2: 5 → 6 → 4 (465)

| 步骤 | l1.val | l2.val | carry | sum | 结果位 | 新carry |
|------|--------|--------|-------|-----|--------|---------|
| 1 | 2 | 5 | 0 | 7 | 7 | 0 |
| 2 | 4 | 6 | 0 | 10 | 0 | 1 |
| 3 | 3 | 4 | 1 | 8 | 8 | 0 |

结果链表：7 → 0 → 8 (807)

### 边界情况处理

**链表长度不同**：
\`\`\`
l1: 9 → 9 → 9 → 9 → 9 → 9 → 9 (9999999)
l2: 9 → 9 → 9 → 9             (9999)
相加后：8 → 9 → 9 → 9 → 0 → 0 → 0 → 1 (10009998)
\`\`\`

**最后有进位**：
循环条件 \`l1 || l2 || carry\` 确保最后的进位也被处理`,
        timeComplexity: "O(max(m, n))",
        spaceComplexity: "O(max(m, n))",
      },
      {
        name: "递归法",
        animation: {
          type: "two-pointers" as const,
          title: "递归两数相加演示",
          steps: [
            {
              array: ["2→4→3", "5→6→4"],
              left: 0,
              right: 1,
              highlights: [
                { indices: [0], color: "blue" as const, label: "l1=342" },
                { indices: [1], color: "green" as const, label: "l2=465" },
              ],
              description: "342+465。递归处理每一位",
            },
            {
              array: ["2+5=7", "carry=0"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "个位" }],
              description: "个位：2+5+0=7，进位0。递归处理下一位",
            },
            {
              array: ["4+6=10", "carry=1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "十位" }],
              description: "十位：4+6+0=10，保留0，进位1",
            },
            {
              array: ["7→0→8"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "百位：3+4+1=8。结果：7→0→8 (807)",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 两数相加 - 递归法
 *
 * 核心思想：
 * 将链表加法分解为递归子问题：
 * - 当前位的结果 = (l1.val + l2.val + carry) % 10
 * - 下一位 = 递归处理(l1.next, l2.next, 新进位)
 *
 * 递归三要素：
 * 1. 终止条件：两个链表都为空且无进位
 * 2. 递归操作：处理当前位，递归处理下一位
 * 3. 返回值：当前位的节点（其 next 指向递归结果）
 *
 * 时间复杂度：O(max(m, n)) - 每位计算一次
 * 空间复杂度：O(max(m, n)) - 递归调用栈 + 结果链表
 */
function addTwoNumbers(l1, l2, carry = 0) {
  // 终止条件：两链表都为空且无进位，加法完成
  if (!l1 && !l2 && !carry) return null;

  // 获取当前位的值（空节点视为 0）
  const val1 = l1 ? l1.val : 0;
  const val2 = l2 ? l2.val : 0;

  // 计算当前位的和
  const sum = val1 + val2 + carry;

  // 创建当前位的结果节点
  const node = { val: sum % 10, next: null };

  // 递归处理下一位
  // 传入：两个链表的下一个节点，新的进位
  node.next = addTwoNumbers(
    l1 ? l1.next : null,  // l1 的下一位
    l2 ? l2.next : null,  // l2 的下一位
    Math.floor(sum / 10)  // 新进位
  );

  return node;
}`,
        explanation: `## 递归法

### 算法原理

将加法问题分解为递归子问题：
- 处理当前位：计算 sum，创建节点
- 递归处理剩余位：将下一位的计算委托给递归调用

### 递归过程图解

l1: 2 → 4 → 3
l2: 5 → 6 → 4

\`\`\`
addTwoNumbers(2, 5, 0)
  │ sum = 7, node = {val: 7}
  │ node.next = addTwoNumbers(4, 6, 0)
  │
  └─ addTwoNumbers(4, 6, 0)
       │ sum = 10, node = {val: 0}
       │ node.next = addTwoNumbers(3, 4, 1)
       │
       └─ addTwoNumbers(3, 4, 1)
            │ sum = 8, node = {val: 8}
            │ node.next = addTwoNumbers(null, null, 0)
            │
            └─ addTwoNumbers(null, null, 0)
                 └─ 返回 null（终止条件）

回溯组装：7 → 0 → 8
\`\`\`

### 默认参数的妙用

\`\`\`javascript
function addTwoNumbers(l1, l2, carry = 0)
\`\`\`

使用默认参数 \`carry = 0\`：
- 首次调用不需要传入进位
- 递归调用时传入计算出的新进位

### 与迭代法对比

| 特点 | 迭代法 | 递归法 |
|------|--------|--------|
| 代码风格 | 命令式 | 声明式 |
| 空间 | O(1) 额外 | O(n) 栈 |
| 理解难度 | 较易 | 需要递归思维 |`,
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
    frontendRelevance: "medium",
    frontendNote: "快慢指针删除",
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
        animation: {
          type: "linked-list" as const,
          title: "删除倒数第N个节点 - 快慢指针演示",
          steps: [
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "dummy": ["slow", "fast"] },
              description: "n=2。创建哨兵节点dummy，slow和fast都指向dummy",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "dummy": ["slow"], "3": ["fast"] },
              highlights: [{ nodeIds: ["1", "2", "3"], color: "yellow" as const, label: "fast先走n+1步" }],
              description: "fast先走n+1=3步，此时fast指向节点3",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["slow"], "4": ["fast"] },
              description: "同步移动：slow→1，fast→4",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "2": ["slow"], "5": ["fast"] },
              description: "同步移动：slow→2，fast→5",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "3": ["slow"] },
              highlights: [{ nodeIds: ["4"], color: "red" as const, label: "删除" }],
              description: "fast到null停止。slow→3，删除slow.next(节点4)",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "5"], color: "green" as const, label: "完成" }],
              description: "完成！结果：1→2→3→5（节点4已删除）",
            },
          ] as LinkedListStep[],
        },
        code: `/**
 * 删除链表的倒数第 N 个结点 - 快慢指针法（一趟扫描）
 *
 * 核心思想：
 * 使用快慢指针保持固定间距，当快指针到达末尾时，
 * 慢指针正好指向要删除节点的前一个节点。
 *
 * 关键步骤：
 * 1. 快指针先走 n+1 步（为什么是 n+1？见下方解释）
 * 2. 快慢指针同时前进，直到快指针到达 null
 * 3. 此时慢指针指向要删除节点的前一个节点
 * 4. 执行删除：slow.next = slow.next.next
 *
 * 为什么是 n+1 步？
 * - 我们要找倒数第 n 个节点的"前一个节点"
 * - 倒数第 n 个节点距离 null 是 n 步
 * - 前一个节点距离 null 是 n+1 步
 *
 * 时间复杂度：O(L) - L 是链表长度，只遍历一次
 * 空间复杂度：O(1) - 只使用常数个指针
 */
function removeNthFromEnd(head, n) {
  // 使用哨兵节点处理删除头节点的特殊情况
  const dummy = { next: head };

  // 快慢指针都从哨兵节点开始
  let fast = dummy;
  let slow = dummy;

  // 快指针先走 n+1 步
  // 这样快慢指针之间相隔 n+1 个节点
  for (let i = 0; i <= n; i++) {
    fast = fast.next;
  }

  // 快慢指针同时前进，直到快指针到达末尾（null）
  while (fast) {
    fast = fast.next;
    slow = slow.next;
  }

  // 此时 slow 指向要删除节点的前一个节点
  // 执行删除操作：跳过下一个节点
  slow.next = slow.next.next;

  // 返回新的头节点（跳过哨兵节点）
  return dummy.next;
}`,
        explanation: `## 快慢指针（一趟扫描）

### 算法原理

利用快慢指针的固定间距特性：
- 让快指针先走 n+1 步
- 然后快慢同步前进
- 快指针到 null 时，慢指针正好在目标位置

### 执行示例

链表：1 → 2 → 3 → 4 → 5，n = 2

**第一步：快指针先走 n+1 = 3 步**
\`\`\`
dummy → 1 → 2 → 3 → 4 → 5 → null
slow          fast
\`\`\`

**第二步：同步前进**
\`\`\`
dummy → 1 → 2 → 3 → 4 → 5 → null
        slow          fast

dummy → 1 → 2 → 3 → 4 → 5 → null
             slow          fast (null)
\`\`\`

**第三步：删除**
slow.next = slow.next.next  →  跳过节点 4

结果：1 → 2 → 3 → 5

### 为什么需要哨兵节点？

考虑删除头节点的情况：链表 [1]，n = 1
- 要删除的是节点 1（头节点）
- 没有"前一个节点"
- 使用哨兵节点后，dummy 就是头节点的"前一个节点"`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "两次遍历",
        animation: {
          type: "two-pointers" as const,
          title: "两次遍历删除倒数第N个节点",
          steps: [
            {
              array: ["1", "2", "3", "4", "5"],
              left: 0,
              right: 4,
              highlights: [],
              description: "链表[1,2,3,4,5]，删除倒数第2个(4)",
            },
            {
              array: ["1", "2", "3", "4", "5"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "计数" }],
              description: "第一次遍历：计算长度L=5",
            },
            {
              array: ["d", "1", "2", "3", "4", "5"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "yellow" as const, label: "L-n=3" }],
              description: "从dummy走L-n=3步，找到节点3(要删除节点的前一个)",
            },
            {
              array: ["1", "2", "3", "5"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "完成" }],
              description: "删除节点4，3.next=5。结果[1,2,3,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 删除链表的倒数第 N 个结点 - 两次遍历法
 *
 * 核心思想：
 * 将"倒数第 n 个"转换为"正数第 (L-n+1) 个"：
 * 1. 第一次遍历：计算链表总长度 L
 * 2. 第二次遍历：找到第 (L-n) 个节点（即要删除节点的前一个）
 * 3. 执行删除操作
 *
 * 时间复杂度：O(L) - 需要遍历两次
 * 空间复杂度：O(1) - 只使用常数额外空间
 */
function removeNthFromEnd(head, n) {
  // 哨兵节点，处理删除头节点的情况
  const dummy = { next: head };

  // ========== 第一次遍历：计算链表长度 ==========
  let len = 0;
  let curr = head;
  while (curr) {
    len++;
    curr = curr.next;
  }

  // ========== 第二次遍历：找到要删除节点的前一个 ==========
  // 要删除的是倒数第 n 个，即正数第 (len - n + 1) 个
  // 前一个节点是正数第 (len - n) 个
  // 从 dummy 开始走 (len - n) 步即可到达
  curr = dummy;
  for (let i = 0; i < len - n; i++) {
    curr = curr.next;
  }

  // 删除节点：跳过下一个节点
  curr.next = curr.next.next;

  return dummy.next;
}`,
        explanation: `## 两次遍历法

### 算法原理

将倒数问题转换为正数问题：
- 链表长度为 L
- 倒数第 n 个 = 正数第 (L - n + 1) 个
- 要删除它，需要找到前一个节点，即正数第 (L - n) 个

### 执行示例

链表：1 → 2 → 3 → 4 → 5，n = 2

**第一次遍历**：计算长度 L = 5

**计算目标位置**：
- 倒数第 2 个 = 正数第 (5 - 2 + 1) = 4 个，即节点 4
- 前一个节点 = 正数第 (5 - 2) = 3 个，即节点 3

**第二次遍历**：从 dummy 走 3 步到达节点 3
\`\`\`
dummy → 1 → 2 → 3 → 4 → 5
                ↑
               curr
\`\`\`

**删除**：curr.next = curr.next.next

结果：1 → 2 → 3 → 5

### 与快慢指针对比

| 方法 | 遍历次数 | 思路复杂度 |
|------|----------|------------|
| 两次遍历 | 2 次 | 简单直观 |
| 快慢指针 | 1 次 | 需要理解间距原理 |`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "栈",
        animation: {
          type: "two-pointers" as const,
          title: "栈方法删除倒数第N个节点",
          steps: [
            {
              array: ["d", "1", "2", "3", "4", "5"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "blue" as const, label: "入栈" }],
              description: "所有节点入栈：[d,1,2,3,4,5]",
            },
            {
              array: ["d", "1", "2", "3", "4", "5"],
              left: 0,
              right: 5,
              highlights: [{ indices: [4, 5], color: "red" as const, label: "弹出" }],
              description: "n=2，弹出2个：弹出5，弹出4",
            },
            {
              array: ["d", "1", "2", "3"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "yellow" as const, label: "栈顶" }],
              description: "栈顶3是要删除节点的前一个",
            },
            {
              array: ["1", "2", "3", "5"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "完成" }],
              description: "删除4，3.next=5。结果[1,2,3,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 删除链表的倒数第 N 个结点 - 栈方法
 *
 * 核心思想：
 * 利用栈的"后进先出"特性，将倒数问题转换为正数问题：
 * 1. 将所有节点入栈
 * 2. 弹出 n 个节点，此时栈顶就是要删除节点的前一个
 * 3. 执行删除操作
 *
 * 时间复杂度：O(L) - 遍历链表一次入栈，弹出 n 次
 * 空间复杂度：O(L) - 栈存储所有节点
 */
function removeNthFromEnd(head, n) {
  // 哨兵节点，统一处理删除头节点的情况
  const dummy = { next: head };
  const stack = [];

  // ========== 所有节点入栈 ==========
  // 包括哨兵节点，这样即使删除头节点也有"前一个节点"
  let curr = dummy;
  while (curr) {
    stack.push(curr);
    curr = curr.next;
  }

  // ========== 弹出 n 个节点 ==========
  // 弹出后，栈顶就是要删除节点的前一个节点
  for (let i = 0; i < n; i++) {
    stack.pop();
  }

  // 获取要删除节点的前一个节点
  const prev = stack[stack.length - 1];

  // 删除节点：跳过下一个节点
  prev.next = prev.next.next;

  return dummy.next;
}`,
        explanation: `## 栈方法

### 算法原理

栈的特性是"后进先出"，正好可以用来处理"倒数"问题：
- 入栈顺序：正数第 1 个 → 第 2 个 → ... → 第 L 个
- 出栈顺序：倒数第 1 个 → 第 2 个 → ...
- 弹出 n 个后，栈顶就是倒数第 n+1 个，即要删除节点的前一个

### 执行示例

链表：1 → 2 → 3 → 4 → 5，n = 2

**入栈**：
\`\`\`
栈（底→顶）：[dummy, 1, 2, 3, 4, 5]
\`\`\`

**弹出 2 次**：
\`\`\`
弹出 5（倒数第 1）
弹出 4（倒数第 2，即要删除的节点）
栈：[dummy, 1, 2, 3]
栈顶 3 就是要删除节点 4 的前一个
\`\`\`

**删除**：
\`\`\`
3.next = 3.next.next  →  3.next = 5
\`\`\`

### 优缺点

**优点**：
- 思路直观，利用栈处理倒数问题

**缺点**：
- 空间复杂度 O(L)，需要存储所有节点
- 相比快慢指针，空间效率较低

### 为什么要包含哨兵节点？

如果不包含哨兵节点，删除头节点时栈会为空，无法获取"前一个节点"。`,
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
    frontendRelevance: "high",
    frontendNote: "链表相交，双指针技巧",
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
        code: `/**
 * 相交链表 - 双指针法
 *
 * 核心思想：
 * 消除两个链表的长度差！
 *
 * 设链表 A 长度为 a，链表 B 长度为 b，公共部分长度为 c
 * - A 的独有部分长度：a - c
 * - B 的独有部分长度：b - c
 *
 * 让两个指针分别从 A 和 B 出发：
 * - pA 走完 A 后从 B 头开始：总路程 = a + (b - c)
 * - pB 走完 B 后从 A 头开始：总路程 = b + (a - c)
 *
 * 两者路程相等！所以会在交点相遇（如果有的话）
 *
 * 时间复杂度：O(m + n) - m、n 是两个链表的长度
 * 空间复杂度：O(1) - 只使用两个指针
 */
function getIntersectionNode(headA, headB) {
  // 边界情况：任一链表为空，不可能相交
  if (!headA || !headB) return null;

  // 初始化两个指针
  let pA = headA;
  let pB = headB;

  // 循环直到两指针相遇（交点或同时为 null）
  while (pA !== pB) {
    // pA 走完 A 后从 B 头开始；如果已在 B 中，继续走
    pA = pA ? pA.next : headB;

    // pB 走完 B 后从 A 头开始；如果已在 A 中，继续走
    pB = pB ? pB.next : headA;
  }

  // 返回交点（或 null，表示没有交点）
  return pA;
}`,
        animation: {
          type: "linked-list" as const,
          title: "相交链表 - 双指针法演示",
          steps: [
            {
              nodes: [
                { value: "A1", id: "a1" },
                { value: "A2", id: "a2" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { a1: ["pA"] },
              highlights: [{ nodeIds: ["c1", "c2", "c3"], color: "purple" as const }],
              description: "链表 A: A1→A2→8→4→5。链表 B: B1→B2→B3→8→4→5。两链表在节点 8 处相交（紫色为公共部分）。pA 从 A 头开始",
            },
            {
              nodes: [
                { value: "B1", id: "b1" },
                { value: "B2", id: "b2" },
                { value: "B3", id: "b3" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { b1: ["pB"] },
              highlights: [{ nodeIds: ["c1", "c2", "c3"], color: "purple" as const }],
              description: "链表 B 视角: B1→B2→B3→8→4→5。pB 从 B 头开始。核心思想：pA 走 A+B 路程，pB 走 B+A 路程，总长相等！",
            },
            {
              nodes: [
                { value: "A1", id: "a1" },
                { value: "A2", id: "a2" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { c1: ["pA"] },
              highlights: [{ nodeIds: ["c1"], color: "blue" as const }],
              description: "pA 遍历链表 A：A1→A2→8（到达交点）→4→5→null。然后跳转到链表 B 头继续",
            },
            {
              nodes: [
                { value: "B1", id: "b1" },
                { value: "B2", id: "b2" },
                { value: "B3", id: "b3" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { b1: ["pA"] },
              highlights: [{ nodeIds: ["b1"], color: "yellow" as const }],
              description: "pA 走完 A 后跳转到 B 头！现在 pA 在 B1 位置。此时 pA 已走过：A1→A2→8→4→5（5步）",
            },
            {
              nodes: [
                { value: "B1", id: "b1" },
                { value: "B2", id: "b2" },
                { value: "B3", id: "b3" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { c1: ["pB"] },
              highlights: [{ nodeIds: ["c1"], color: "blue" as const }],
              description: "同时 pB 遍历链表 B：B1→B2→B3→8（到达交点）→4→5→null。然后跳转到链表 A 头继续",
            },
            {
              nodes: [
                { value: "A1", id: "a1" },
                { value: "A2", id: "a2" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { a1: ["pB"] },
              highlights: [{ nodeIds: ["a1"], color: "yellow" as const }],
              description: "pB 走完 B 后跳转到 A 头！现在 pB 在 A1 位置。此时 pB 已走过：B1→B2→B3→8→4→5（6步）",
            },
            {
              nodes: [
                { value: "A1", id: "a1" },
                { value: "A2", id: "a2" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { c1: ["pA", "pB"] },
              highlights: [{ nodeIds: ["c1"], color: "green" as const }],
              description: "关键时刻！pA 从 B 头走 B1→B2→B3→8，pB 从 A 头走 A1→A2→8。两者同时到达交点 8！",
            },
            {
              nodes: [
                { value: "A1", id: "a1" },
                { value: "A2", id: "a2" },
                { value: "→8", id: "c1" },
                { value: 4, id: "c2" },
                { value: 5, id: "c3" },
              ],
              pointers: { c1: ["pA=pB"] },
              highlights: [{ nodeIds: ["c1"], color: "green" as const }],
              description: "相遇！pA 总路程=5+3=8步，pB 总路程=6+2=8步。路程相等所以必在交点相遇！返回节点 8",
            },
          ] as LinkedListStep[],
        },
        explanation: `## 双指针法（浪漫的相遇）

### 算法原理

**核心思想**：让两个指针走过相同的路程长度

设两个链表：
- 链表 A 长度为 a，链表 B 长度为 b
- 公共部分（从交点到末尾）长度为 c

指针的路径：
- pA：走完 A (a 步) → 跳到 B 头 → 走到交点 (b - c 步)
- pB：走完 B (b 步) → 跳到 A 头 → 走到交点 (a - c 步)

**关键发现**：
\`\`\`
pA 总路程 = a + (b - c) = a + b - c
pB 总路程 = b + (a - c) = a + b - c
\`\`\`

两者相等！所以一定会在交点相遇！

### 执行示例

\`\`\`
链表 A: a1 → a2 → c1 → c2 → c3 (长度 5，公共部分 3)
                   ↑
链表 B: b1 → b2 → b3 (长度 6，在 c1 处相交)
\`\`\`

| 步骤 | pA 位置 | pB 位置 |
|------|---------|---------|
| 1 | a1 | b1 |
| 2 | a2 | b2 |
| 3 | c1 | b3 |
| 4 | c2 | c1 |
| 5 | c3 | c2 |
| 6 | null→b1 | c3 |
| 7 | b2 | null→a1 |
| 8 | b3 | a2 |
| 9 | **c1** | **c1** ← 相遇！ |

### 为什么没有交点时也能正常结束？

如果没有交点（c = 0）：
- pA 走 a + b 步到达 null
- pB 走 b + a 步到达 null
- pA === pB === null，循环结束

### 算法之美

这个算法被称为"浪漫的相遇"：
> 你走过我走过的路，我走过你走过的路，我们就会相遇`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希表",
        animation: {
          type: "two-pointers" as const,
          title: "哈希表找交点演示",
          steps: [
            {
              array: ["A:4→1", "→8→4→5", "B:5→6→1"],
              left: 0,
              right: 2,
              highlights: [{ indices: [1], color: "yellow" as const, label: "交点8" }],
              description: "A和B在节点8相交。先遍历A存入Set",
            },
            {
              array: ["4", "1", "8", "4", "5"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "存入Set" }],
              description: "seen={4,1,8,4,5}(节点引用)",
            },
            {
              array: ["5", "6", "1", "8", "4", "5"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "找到!" }],
              description: "遍历B，节点8在Set中！返回8",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 相交链表 - 哈希表法
 *
 * 核心思想：
 * 使用 Set 记录链表 A 的所有节点，然后遍历链表 B，
 * 找到第一个在 Set 中存在的节点，即为交点。
 *
 * 步骤：
 * 1. 遍历链表 A，将所有节点引用存入 Set
 * 2. 遍历链表 B，检查每个节点是否在 Set 中
 * 3. 第一个在 Set 中的节点就是交点
 *
 * 时间复杂度：O(m + n) - 分别遍历两个链表
 * 空间复杂度：O(m) - 存储链表 A 的所有节点
 */
function getIntersectionNode(headA, headB) {
  // 使用 Set 存储链表 A 的所有节点引用
  const seen = new Set();

  // 第一步：遍历链表 A，记录所有节点
  let curr = headA;
  while (curr) {
    seen.add(curr);      // 存储节点引用（不是值）
    curr = curr.next;
  }

  // 第二步：遍历链表 B，找第一个已存在于 Set 中的节点
  curr = headB;
  while (curr) {
    if (seen.has(curr)) {
      // 找到了！这是第一个公共节点
      return curr;
    }
    curr = curr.next;
  }

  // 没有找到公共节点
  return null;
}`,
        explanation: `## 哈希表法

### 算法原理

利用 Set 的 O(1) 查找特性：
1. 先记录链表 A 的所有节点
2. 然后在链表 B 中查找第一个已记录的节点

### 执行示例

\`\`\`
链表 A: a1 → a2 → c1 → c2
                   ↑
链表 B:      b1 → b2 → c1 → c2
\`\`\`

**第一步：遍历 A，存入 Set**
\`\`\`
Set = {a1, a2, c1, c2}
\`\`\`

**第二步：遍历 B，查找**
- b1：不在 Set 中，继续
- b2：不在 Set 中，继续
- c1：在 Set 中！返回 c1

### 为什么存储节点引用而不是值？

如果两个链表有相同值但不同位置的节点：
\`\`\`
A: 1 → 2 → 3
B: 4 → 2 → 5
\`\`\`

这两个链表不相交！A 中的 2 和 B 中的 2 是不同的节点对象。

所以我们存储节点引用（对象），而不是节点值。

### 优缺点

**优点**：
- 思路简单直观
- 代码易于理解

**缺点**：
- 需要 O(m) 额外空间
- 面试时可能被要求优化到 O(1) 空间`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(m)",
      },
      {
        name: "计算长度差",
        animation: {
          type: "two-pointers" as const,
          title: "计算长度差找交点演示",
          steps: [
            {
              array: ["A:5节点", "B:6节点"],
              left: 0,
              right: 1,
              highlights: [],
              description: "A长5，B长6。长度差=1",
            },
            {
              array: ["B1", "B2", "B3", "B4", "B5", "B6"],
              left: 1,
              right: 5,
              highlights: [{ indices: [0], color: "gray" as const, label: "跳过" }],
              description: "B先走1步，两链表对齐",
            },
            {
              array: ["A", "→", "→", "交点"],
              left: 0,
              right: 0,
              highlights: [],
              description: "两指针同步前进",
            },
            {
              array: ["A", "B", "→", "8"],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "相遇!" }],
              description: "两指针在交点8相遇！返回8",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 相交链表 - 计算长度差法
 *
 * 核心思想：
 * 如果两个链表相交，从交点到末尾的长度相同。
 * 所以让较长链表的指针先走"长度差"步，然后两指针同步走，
 * 相遇点即为交点。
 *
 * 步骤：
 * 1. 计算两个链表的长度
 * 2. 让较长链表的指针先走 |lenA - lenB| 步
 * 3. 两个指针同步前进，直到相遇
 *
 * 时间复杂度：O(m + n) - 需要遍历计算长度 + 同步遍历
 * 空间复杂度：O(1) - 只使用几个变量
 */
function getIntersectionNode(headA, headB) {
  // 辅助函数：计算链表长度
  const getLength = (head) => {
    let len = 0;
    while (head) {
      len++;
      head = head.next;
    }
    return len;
  };

  // 计算两个链表的长度
  let lenA = getLength(headA);
  let lenB = getLength(headB);

  // 让较长的链表先走差值步，使两个指针距离末尾的距离相等
  while (lenA > lenB) {
    headA = headA.next;
    lenA--;
  }
  while (lenB > lenA) {
    headB = headB.next;
    lenB--;
  }

  // 现在两个指针距离末尾的距离相等
  // 同时前进，相遇点即为交点
  while (headA !== headB) {
    headA = headA.next;
    headB = headB.next;
  }

  // 返回交点（或 null）
  return headA;
}`,
        explanation: `## 计算长度差法

### 算法原理

如果两个链表相交，它们的公共部分长度相同。
设：
- 链表 A 长度为 a = 独有部分 + 公共部分
- 链表 B 长度为 b = 独有部分 + 公共部分

长度差 = |a - b| = |A的独有部分 - B的独有部分|

让较长链表的指针先走这个差值，两指针就会同时到达交点！

### 执行示例

\`\`\`
链表 A: a1 → a2 → c1 → c2 → c3  (长度 5)
                   ↑
链表 B:      b1 → b2 → c1 → c2 → c3  (长度 5)
\`\`\`

假设 A 和 B 长度不同：
\`\`\`
链表 A: a1 → a2 → a3 → c1 → c2  (长度 5)
                        ↑
链表 B:           b1 → b2 → c1 → c2  (长度 4)
\`\`\`

**第一步**：计算长度 lenA = 5, lenB = 4

**第二步**：A 较长，先走 1 步
\`\`\`
headA: a2 → a3 → c1 → c2
headB: b1 → b2 → c1 → c2
\`\`\`

**第三步**：同步前进
| 步骤 | headA | headB |
|------|-------|-------|
| 1 | a3 | b2 |
| 2 | **c1** | **c1** ← 相遇！ |

### 与双指针法对比

| 方法 | 遍历次数 | 代码复杂度 |
|------|----------|------------|
| 双指针 | 最多 2 轮 | 简洁 |
| 计算长度差 | 3 轮 | 直观但较长 |

两种方法时间复杂度相同，双指针法代码更简洁。`,
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
    frontendRelevance: "high",
    frontendNote: "链表回文判断",
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
        code: `/**
 * 回文链表 - 快慢指针 + 反转链表法
 *
 * 核心思想：
 * 回文的特点是：前半部分 = 后半部分的逆序
 * 所以：
 * 1. 找到链表中点，将链表分为前后两部分
 * 2. 反转后半部分
 * 3. 比较前半部分和反转后的后半部分
 *
 * 步骤：
 * 1. 使用快慢指针找到中点
 * 2. 反转后半部分链表
 * 3. 逐个比较前后两半的值
 * 4. （可选）恢复链表原状
 *
 * 时间复杂度：O(n) - 找中点 O(n/2) + 反转 O(n/2) + 比较 O(n/2)
 * 空间复杂度：O(1) - 只使用常数个指针
 */
function isPalindrome(head) {
  // 边界情况：空链表或单节点链表都是回文
  if (!head || !head.next) return true;

  // ========== 第一步：使用快慢指针找到中点 ==========
  // 快指针每次走2步，慢指针每次走1步
  // 当快指针到达末尾时，慢指针正好在中点
  let slow = head;
  let fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 此时 slow 指向前半部分的最后一个节点

  // ========== 第二步：反转后半部分链表 ==========
  let secondHalf = reverseList(slow.next);

  // ========== 第三步：比较前后两半 ==========
  let p1 = head;         // 指向前半部分的头
  let p2 = secondHalf;   // 指向反转后的后半部分的头
  let result = true;

  // 以后半部分为准（后半部分长度 ≤ 前半部分）
  while (p2) {
    if (p1.val !== p2.val) {
      result = false;
      break;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // ========== 第四步：恢复链表（可选，保持良好习惯）==========
  slow.next = reverseList(secondHalf);

  return result;
}

/**
 * 反转链表辅助函数
 */
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
        explanation: `## 快慢指针 + 反转链表（O(1) 空间）

### 算法原理

回文的定义：正读反读都一样
链表回文：前半部分 = 后半部分的逆序

**核心步骤**：
1. 找中点 → 分成前后两部分
2. 反转后半部分 → 变成正序
3. 比较两部分 → 判断是否相同

### 执行示例

链表：1 → 2 → 2 → 1

**第一步：找中点**
\`\`\`
1 → 2 → 2 → 1
    ↑       ↑
   slow    fast
slow 停在第一个 2
\`\`\`

**第二步：反转后半部分**
\`\`\`
前半部分：1 → 2
后半部分（反转前）：2 → 1
后半部分（反转后）：1 → 2
\`\`\`

**第三步：比较**
| p1 | p2 | 相等？ |
|----|----| ------ |
| 1 | 1 | ✓ |
| 2 | 2 | ✓ |

返回 true

### 奇数长度的情况

链表：1 → 2 → 3 → 2 → 1

\`\`\`
slow 停在 3（中间节点）
前半部分：1 → 2 → 3
后半部分：2 → 1
反转后：1 → 2

比较时，后半部分较短，以后半部分为准
\`\`\`

### 为什么要恢复链表？

虽然题目没有要求，但恢复链表是良好的编程习惯：
- 不破坏原始数据结构
- 在实际项目中可能有其他代码依赖这个链表`,
        animation: {
          type: "linked-list" as const,
          title: "回文链表 - 快慢指针 + 反转演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "3" },
                { value: 1, id: "4" },
              ],
              pointers: { "1": ["slow", "fast"] },
              description: "初始化：slow 和 fast 都指向头节点，链表 [1,2,2,1]",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "3" },
                { value: 1, id: "4" },
              ],
              pointers: { "2": ["slow"], "3": ["fast"] },
              description: "第1步找中点：slow 走1步到节点2，fast 走2步到节点2(第二个)",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "3" },
                { value: 1, id: "4" },
              ],
              pointers: { "2": ["slow/中点"] },
              highlights: [
                { nodeIds: ["1", "2"], color: "blue" as const, label: "前半部分" },
                { nodeIds: ["3", "4"], color: "yellow" as const, label: "后半部分" },
              ],
              description: "找到中点：slow 在第2个节点，slow.next 开始是后半部分",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 1, id: "4" },
                { value: 2, id: "3" },
              ],
              pointers: { "4": ["p2"] },
              brokenConnections: [{ from: "3", to: "4" }],
              highlights: [
                { nodeIds: ["1", "2"], color: "blue" as const, label: "前半" },
                { nodeIds: ["4", "3"], color: "purple" as const, label: "反转后" },
              ],
              description: "反转后半部分：[2,1] 变成 [1,2]，p2 指向反转后的头节点",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 1, id: "4" },
                { value: 2, id: "3" },
              ],
              pointers: { "1": ["p1"], "4": ["p2"] },
              highlights: [{ nodeIds: ["1", "4"], color: "green" as const, label: "比较 1==1" }],
              description: "比较：p1.val(1) === p2.val(1) ✓ 相等，继续",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 1, id: "4" },
                { value: 2, id: "3" },
              ],
              pointers: { "2": ["p1"], "3": ["p2"] },
              highlights: [{ nodeIds: ["2", "3"], color: "green" as const, label: "比较 2==2" }],
              description: "比较：p1.val(2) === p2.val(2) ✓ 相等，继续",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "3" },
                { value: 1, id: "4" },
              ],
              highlights: [{ nodeIds: ["1", "2", "3", "4"], color: "green" as const, label: "回文!" }],
              description: "结果：p2 到达 null，所有比较都相等，返回 true - 是回文链表！",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "数组 + 双指针",
        animation: {
          type: "two-pointers" as const,
          title: "数组+双指针判断回文",
          steps: [
            {
              array: ["1", "2", "2", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "转数组" }],
              description: "链表1→2→2→1转为数组[1,2,2,1]",
            },
            {
              array: ["1", "2", "2", "1"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "green" as const, label: "L" },
                { indices: [3], color: "green" as const, label: "R" },
              ],
              description: "vals[0]=1 == vals[3]=1 ✓",
            },
            {
              array: ["1", "2", "2", "1"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "L" },
                { indices: [2], color: "green" as const, label: "R" },
              ],
              description: "vals[1]=2 == vals[2]=2 ✓ 是回文!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 回文链表 - 数组 + 双指针法
 *
 * 核心思想：
 * 链表不支持随机访问，但数组支持！
 * 所以：
 * 1. 将链表的值复制到数组中
 * 2. 在数组上使用双指针判断回文
 *
 * 时间复杂度：O(n) - 遍历链表 + 双指针检查
 * 空间复杂度：O(n) - 存储链表值的数组
 */
function isPalindrome(head) {
  // 将链表值存入数组
  const vals = [];
  while (head) {
    vals.push(head.val);
    head = head.next;
  }

  // 使用双指针从两端向中间检查
  let left = 0;
  let right = vals.length - 1;

  while (left < right) {
    // 如果两端的值不相等，不是回文
    if (vals[left] !== vals[right]) {
      return false;
    }
    // 向中间移动
    left++;
    right--;
  }

  // 所有对应位置都相等，是回文
  return true;
}`,
        explanation: `## 数组 + 双指针法

### 算法原理

将链表问题转换为数组问题：
- 链表：只能顺序访问，不能从后往前
- 数组：可以随机访问，双指针很方便

### 执行示例

链表：1 → 2 → 2 → 1

**第一步：转换为数组**
\`\`\`
vals = [1, 2, 2, 1]
\`\`\`

**第二步：双指针检查**
| left | right | vals[left] | vals[right] | 相等？ |
|------|-------|------------|-------------|--------|
| 0 | 3 | 1 | 1 | ✓ |
| 1 | 2 | 2 | 2 | ✓ |
| 2 | 1 | - | - | left ≥ right，结束 |

返回 true

### 优缺点

**优点**：
- 思路简单，代码直观
- 不修改原链表
- 容易理解和实现

**缺点**：
- 需要 O(n) 额外空间
- 面试时可能被要求优化到 O(1) 空间

### 适用场景

当空间不是瓶颈时，这种方法是最直观的选择。`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "递归",
        animation: {
          type: "two-pointers" as const,
          title: "递归判断回文链表演示",
          steps: [
            {
              array: ["1", "2", "2", "1"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "blue" as const, label: "递归深入" }],
              description: "递归到链表末尾，front指向头",
            },
            {
              array: ["1", "2", "2", "1"],
              left: 0,
              right: 3,
              highlights: [
                { indices: [0], color: "green" as const, label: "front" },
                { indices: [3], color: "green" as const, label: "node" },
              ],
              description: "回溯：node=1, front=1 ✓ front前进",
            },
            {
              array: ["1", "2", "2", "1"],
              left: 1,
              right: 2,
              highlights: [
                { indices: [1], color: "green" as const, label: "front" },
                { indices: [2], color: "green" as const, label: "node" },
              ],
              description: "回溯：node=2, front=2 ✓ 是回文!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 回文链表 - 递归法
 *
 * 核心思想：
 * 利用递归的调用栈，实现"从后往前"遍历链表：
 * - 递归深入到链表末尾
 * - 回溯时，从后往前访问节点
 * - 同时用一个外部指针从前往后访问
 * - 比较两个方向的值是否相等
 *
 * 本质上是利用递归栈实现了一个"逆序遍历"
 *
 * 时间复杂度：O(n) - 每个节点访问一次
 * 空间复杂度：O(n) - 递归调用栈深度
 */
function isPalindrome(head) {
  // 外部指针，从头向后移动
  let front = head;

  // 内部递归函数
  function check(node) {
    // 递归终止条件：到达链表末尾
    if (!node) return true;

    // 先递归到末尾（深入）
    // 如果后面的检查失败，直接返回 false
    if (!check(node.next)) return false;

    // 回溯时执行比较：
    // node 是从后往前访问的当前节点
    // front 是从前往后访问的当前节点
    if (node.val !== front.val) return false;

    // front 向后移动一步，准备下一次比较
    front = front.next;

    return true;
  }

  return check(head);
}`,
        explanation: `## 递归法

### 算法原理

利用递归的特性实现"双向遍历"：
- **递归深入（正向）**：从头到尾
- **递归回溯（逆向）**：从尾到头

配合一个外部指针 front（始终正向），就能实现两端同时比较。

### 执行过程图解

链表：1 → 2 → 2 → 1

\`\`\`
check(1) - front=1
  └─ check(2) - front=1
       └─ check(2) - front=1
            └─ check(1) - front=1
                 └─ check(null) - front=1
                      └─ 返回 true（终止条件）
                 回溯：node=1, front=1 → 相等！front→2
                 返回 true
            回溯：node=2, front=2 → 相等！front→2
            返回 true
       回溯：node=2, front=2 → 相等！front→1
       返回 true
  回溯：node=1, front=1 → 相等！
  返回 true

最终结果：true
\`\`\`

### 关键点

1. **为什么 front 要定义在外部？**
   - 递归函数每次调用都会创建新的局部变量
   - front 需要在整个递归过程中保持状态
   - 所以用闭包或外部变量来保存

2. **比较发生在回溯阶段**
   - 递归深入时不做任何比较
   - 到达末尾后开始回溯
   - 回溯时 node 从后往前，front 从前往后

### 优缺点

**优点**：
- 思路巧妙，体现递归的妙用
- 不需要显式反转链表

**缺点**：
- 空间复杂度 O(n)（递归调用栈）
- 理解难度较高`,
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
    frontendRelevance: "low",
    frontendNote: "删除排序链表重复",
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
        code: `/**
 * 删除排序链表中的重复元素 - 一次遍历法
 *
 * 核心思想：
 * 由于链表已排序，重复元素一定相邻。
 * 只需比较相邻节点，发现重复就跳过即可。
 *
 * 关键点：
 * - 不需要哨兵节点，因为头节点不会被删除（我们保留重复元素中的一个）
 * - 发现重复时不移动 curr，因为可能有多个连续重复
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用一个指针
 */
function deleteDuplicates(head) {
  // 空链表直接返回
  if (!head) return null;

  // curr 指向当前检查的节点
  let curr = head;

  // 遍历链表（检查 curr 和 curr.next）
  while (curr.next) {
    if (curr.val === curr.next.val) {
      // 发现重复：跳过下一个节点
      // 注意：不移动 curr，因为可能还有更多重复
      curr.next = curr.next.next;
    } else {
      // 不重复：移动到下一个节点
      curr = curr.next;
    }
  }

  // 返回原头节点（头节点不会被删除）
  return head;
}`,
        explanation: `## 一次遍历法

### 算法原理

链表已排序 → 重复元素一定相邻 → 只需比较相邻节点

### 执行示例

链表：1 → 1 → 2 → 3 → 3

| 步骤 | curr | curr.next | 相等？ | 操作 |
|------|------|-----------|--------|------|
| 1 | 1 | 1 | ✓ | 删除，curr 不动 |
| 2 | 1 | 2 | ✗ | curr 前进 |
| 3 | 2 | 3 | ✗ | curr 前进 |
| 4 | 3 | 3 | ✓ | 删除，curr 不动 |
| 5 | 3 | null | - | 结束 |

结果：1 → 2 → 3

### 为什么不需要哨兵节点？

本题是"保留重复元素中的一个"，头节点永远不会被删除。
第 82 题是"删除所有重复元素"，头节点可能被删除，所以需要哨兵节点。

### 为什么发现重复时不移动 curr？

考虑连续多个重复：1 → 1 → 1 → 2
- 第一次：删除第二个 1，变成 1 → 1 → 2
- 第二次：删除第二个 1，变成 1 → 2
- 如果每次都移动 curr，会漏掉重复元素`,
        animation: {
          type: "linked-list" as const,
          title: "删除排序链表重复元素演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 1, id: "n2" },
                { value: 1, id: "n3" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n1: ["curr"] },
              description: "初始链表: 1→1→1→2→3→3。curr 指向头节点。由于已排序，重复元素一定相邻",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 1, id: "n2" },
                { value: 1, id: "n3" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n1: ["curr"] },
              highlights: [{ nodeIds: ["n1", "n2"], color: "yellow" as const }],
              description: "比较 curr.val (1) 和 curr.next.val (1)：相等！发现重复",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 1, id: "n3" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n1: ["curr"] },
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              brokenConnections: [{ from: "n1", to: "n2" }],
              description: "删除重复节点：curr.next = curr.next.next。注意 curr 不移动，因为可能还有连续重复",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 1, id: "n3" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n1: ["curr"] },
              highlights: [{ nodeIds: ["n1", "n3"], color: "yellow" as const }],
              description: "继续比较：curr.val (1) 和 curr.next.val (1)：还是相等！继续删除",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n1: ["curr"] },
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              description: "再次删除重复节点。现在 curr.val (1) ≠ curr.next.val (2)，不相等",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n4: ["curr"] },
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              description: "不相等时 curr 前进：curr = curr.next。现在检查节点 2",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n4: ["curr"] },
              highlights: [{ nodeIds: ["n4", "n5"], color: "blue" as const }],
              description: "比较 curr.val (2) 和 curr.next.val (3)：不相等，curr 继续前进",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
                { value: 3, id: "n6" },
              ],
              pointers: { n5: ["curr"] },
              highlights: [{ nodeIds: ["n5", "n6"], color: "yellow" as const }],
              description: "比较 curr.val (3) 和 curr.next.val (3)：相等！发现重复",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
              ],
              pointers: { n5: ["curr"] },
              highlights: [{ nodeIds: ["n5"], color: "green" as const }],
              description: "删除重复节点。curr.next 变为 null，遍历结束",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n4" },
                { value: 3, id: "n5" },
              ],
              highlights: [{ nodeIds: ["n1", "n4", "n5"], color: "green" as const }],
              description: "完成！结果链表: 1→2→3。每个元素只出现一次",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归",
        animation: {
          type: "two-pointers" as const,
          title: "递归删除重复元素演示",
          steps: [
            {
              array: ["1", "1", "2", "3", "3"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "blue" as const, label: "递归深入" }],
              description: "递归到链表末尾",
            },
            {
              array: ["1", "1", "2", "3"],
              left: 3,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "去重" }],
              description: "回溯：3==3，跳过重复",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "结果" }],
              description: "回溯：1==1，跳过重复。结果[1,2,3]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 删除排序链表中的重复元素 - 递归法
 *
 * 核心思想：
 * 将问题分解为子问题：
 * - 先递归处理后面的链表（假设已经去重）
 * - 然后处理当前节点：如果和下一个节点值相同，跳过当前节点
 *
 * 递归定义：
 * deleteDuplicates(head) =
 *   head.val == head.next.val ? head.next : head（附带递归处理后续）
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n) - 递归调用栈深度
 */
function deleteDuplicates(head) {
  // 终止条件：空链表或单节点链表，无需去重
  if (!head || !head.next) return head;

  // 递归处理后面的链表
  // 假设 head.next 开始的链表已经去重完成
  head.next = deleteDuplicates(head.next);

  // 处理当前节点：
  // 如果当前值等于下一个值，跳过当前节点（返回 next）
  // 否则保留当前节点（返回 head）
  return head.val === head.next.val ? head.next : head;
}`,
        explanation: `## 递归法

### 算法原理

递归的本质是"假设后面的已经处理好了"：
1. 先递归处理 head.next 开始的链表
2. 然后只需要比较 head 和 head.next

### 递归过程图解

链表：1 → 1 → 2

\`\`\`
deleteDuplicates(1)
  │ head.next = deleteDuplicates(1)
  │
  └─ deleteDuplicates(1)
       │ head.next = deleteDuplicates(2)
       │
       └─ deleteDuplicates(2)
            │ head.next = deleteDuplicates(null)
            │
            └─ deleteDuplicates(null)
                 └─ 返回 null（终止条件）
            回溯：head=2, head.next=null
            返回 2（无 next，返回 head）
       回溯：head=1, head.next=2
       1 != 2，返回 head=1
  回溯：head=1, head.next=1（刚返回的）
  1 == 1，返回 head.next=1

最终：1 → 2
\`\`\`

### 代码简洁性

递归版本只有 3 行核心代码：
\`\`\`javascript
if (!head || !head.next) return head;
head.next = deleteDuplicates(head.next);
return head.val === head.next.val ? head.next : head;
\`\`\`

### 优缺点

**优点**：代码简洁优雅
**缺点**：O(n) 递归栈空间，链表过长可能栈溢出`,
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
    frontendRelevance: "low",
    frontendNote: "删除排序链表重复II",
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
        code: `/**
 * 删除排序链表中的重复元素 II - 哨兵节点 + 一次遍历
 *
 * 核心思想：
 * 与第 83 题不同，本题要求删除所有重复的元素，不保留任何一个。
 * 使用哨兵节点处理头节点可能被删除的情况，维护 prev 指针
 * 指向已确定保留的最后一个节点。
 *
 * 关键区别：
 * - 83 题：1→1→2 变成 1→2（保留一个重复元素）
 * - 82 题：1→1→2 变成 2（删除所有重复元素）
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function deleteDuplicates(head) {
  // 哨兵节点：因为头节点可能被删除，需要一个虚拟头节点
  // 例如：1→1→2，头节点 1 会被删除，需要 dummy 来返回正确结果
  const dummy = { next: head };

  // prev 指向已确定保留的最后一个节点
  // 初始时指向 dummy，因为还没有任何节点被确定保留
  let prev = dummy;

  // head 作为遍历指针，检查当前节点是否重复
  while (head) {
    // 检查当前节点是否是重复序列的开始
    if (head.next && head.val === head.next.val) {
      // 发现重复！跳过所有相同值的节点
      // 例如：对于 1→1→1→2，跳过所有的 1
      while (head.next && head.val === head.next.val) {
        head = head.next;
      }
      // 此时 head 指向重复序列的最后一个节点
      // prev.next 直接指向 head.next，跳过整个重复序列
      // 注意：此时不移动 prev，因为 head.next 可能也是重复的
      prev.next = head.next;
    } else {
      // 当前节点不重复，确定保留
      // 移动 prev 到当前节点
      prev = prev.next;
    }
    // 移动 head 到下一个节点继续检查
    head = head.next;
  }

  // 返回哨兵节点的下一个节点，即新链表的头
  return dummy.next;
}`,
        explanation: `## 哨兵节点 + 一次遍历

### 与第 83 题的区别

| 题目 | 输入 | 输出 | 说明 |
|------|------|------|------|
| 83 题 | 1→1→2 | 1→2 | 保留重复元素中的一个 |
| 82 题 | 1→1→2 | 2 | 删除所有重复元素 |

### 算法步骤

1. **创建哨兵节点**：头节点可能被删除，需要虚拟头节点
2. **维护 prev 指针**：指向已确定保留的最后一个节点
3. **遍历检查**：
   - 发现重复：跳过所有相同值节点，prev.next 指向重复序列之后
   - 不重复：移动 prev

### 执行过程示例

链表：1 → 2 → 3 → 3 → 4 → 4 → 5

| 步骤 | head | prev.next | 操作 | 链表状态 |
|------|------|-----------|------|----------|
| 初始 | 1 | 1 | - | dummy→1→2→3→3→4→4→5 |
| 1 | 1 | 2 | 1≠2，保留，prev 移动 | dummy→1→2→3→3→4→4→5 |
| 2 | 2 | 3 | 2≠3，保留，prev 移动 | dummy→1→2→3→3→4→4→5 |
| 3 | 3 | 4 | 3==3，跳过所有3，删除 | dummy→1→2→4→4→5 |
| 4 | 4 | 5 | 4==4，跳过所有4，删除 | dummy→1→2→5 |
| 5 | 5 | null | 5≠null，保留 | dummy→1→2→5 |

### 为什么发现重复时不移动 prev？

因为 prev.next（即 head.next）可能也是重复序列的开始：

\`\`\`
原链表：1 → 1 → 2 → 2 → 3
删除 1 后：dummy → 2 → 2 → 3
此时 prev 仍在 dummy，需要继续检查 2 是否重复
\`\`\`

### 关键点

- **哨兵节点必须**：头节点可能被删除
- **prev 只在确定保留时移动**：避免跳过连续的重复序列
- **跳过整个重复序列**：不是只删一个，而是全删`,
        animation: {
          type: "linked-list" as const,
          title: "删除重复元素 II 演示",
          steps: [
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 3, id: "n3a" },
                { value: 3, id: "n3b" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { dummy: ["prev"], n1: ["head"] },
              description: "链表: 1→2→3→3→4→4→5。用哨兵节点 dummy，prev 指向已确认保留的最后节点",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 3, id: "n3a" },
                { value: 3, id: "n3b" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { n1: ["prev"], n2: ["head"] },
              highlights: [{ nodeIds: ["n1"], color: "green" as const }],
              description: "节点 1 不重复（1≠2），保留！prev 移动到 1",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 3, id: "n3a" },
                { value: 3, id: "n3b" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { n2: ["prev"], n3a: ["head"] },
              highlights: [{ nodeIds: ["n1", "n2"], color: "green" as const }],
              description: "节点 2 不重复（2≠3），保留！prev 移动到 2",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 3, id: "n3a" },
                { value: 3, id: "n3b" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { n2: ["prev"], n3a: ["head"] },
              highlights: [
                { nodeIds: ["n1", "n2"], color: "green" as const },
                { nodeIds: ["n3a", "n3b"], color: "red" as const },
              ],
              description: "节点 3 重复！（3==3）。需要跳过所有值为 3 的节点",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { n2: ["prev"], n4a: ["head"] },
              highlights: [{ nodeIds: ["n1", "n2"], color: "green" as const }],
              brokenConnections: [{ from: "n2", to: "n3a" }],
              description: "删除所有 3：prev.next = head.next。prev 不移动（不确定下一个是否重复）",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 4, id: "n4a" },
                { value: 4, id: "n4b" },
                { value: 5, id: "n5" },
              ],
              pointers: { n2: ["prev"], n4a: ["head"] },
              highlights: [
                { nodeIds: ["n1", "n2"], color: "green" as const },
                { nodeIds: ["n4a", "n4b"], color: "red" as const },
              ],
              description: "节点 4 重复！（4==4）。需要跳过所有值为 4 的节点",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 5, id: "n5" },
              ],
              pointers: { n2: ["prev"], n5: ["head"] },
              highlights: [{ nodeIds: ["n1", "n2"], color: "green" as const }],
              description: "删除所有 4：prev.next = head.next",
            },
            {
              nodes: [
                { value: "D", id: "dummy" },
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 5, id: "n5" },
              ],
              pointers: { n5: ["prev", "head"] },
              highlights: [{ nodeIds: ["n1", "n2", "n5"], color: "green" as const }],
              description: "节点 5 不重复（5.next=null），保留！prev 移动到 5",
            },
            {
              nodes: [
                { value: 1, id: "n1" },
                { value: 2, id: "n2" },
                { value: 5, id: "n5" },
              ],
              highlights: [{ nodeIds: ["n1", "n2", "n5"], color: "green" as const }],
              description: "完成！返回 dummy.next 即 1→2→5。所有重复元素已删除",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归",
        animation: {
          type: "two-pointers" as const,
          title: "递归删除重复元素II演示",
          steps: [
            {
              array: ["1", "1", "2", "3", "3"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1], color: "red" as const, label: "重复" }],
              description: "1==1，跳过所有1，递归处理后续",
            },
            {
              array: ["2", "3", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "保留" }],
              description: "2!=3，不重复，保留2",
            },
            {
              array: ["3", "3"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "red" as const, label: "重复" }],
              description: "3==3，跳过所有3",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果" }],
              description: "结果：只保留2",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 删除排序链表中的重复元素 II - 递归法
 *
 * 核心思想：
 * 将问题分解为子问题：
 * 1. 如果当前节点与下一个节点值相同（重复）：
 *    - 跳过所有相同值的节点
 *    - 递归处理剩余部分（当前节点也不保留）
 * 2. 如果当前节点不重复：
 *    - 保留当前节点
 *    - 递归处理后续链表并连接
 *
 * 时间复杂度：O(n) - 每个节点最多处理一次
 * 空间复杂度：O(n) - 递归调用栈深度
 */
function deleteDuplicates(head) {
  // 递归终止条件：空链表或单节点链表，无重复可删
  if (!head || !head.next) return head;

  // 情况1：当前节点与下一个节点值相同（发现重复）
  if (head.val === head.next.val) {
    // 跳过所有相同值的节点
    // 例如：对于 1→1→1→2，需要跳过所有的 1
    while (head.next && head.val === head.next.val) {
      head = head.next;
    }
    // 此时 head 指向重复序列的最后一个节点
    // 返回 head.next 开始的递归结果（跳过当前重复节点）
    // 因为要删除"所有"重复元素，当前 head 也不保留
    return deleteDuplicates(head.next);
  } else {
    // 情况2：当前节点不重复，保留它
    // 递归处理后续链表，并将结果连接到当前节点
    head.next = deleteDuplicates(head.next);
    return head;
  }
}`,
        explanation: `## 递归法

### 递归思路

递归的核心是：**假设后面的链表已经处理好了**

- 如果当前节点重复：跳过所有重复节点，递归处理剩余
- 如果当前节点不重复：保留当前节点，递归处理后续并连接

### 递归过程图解

链表：1 → 1 → 2 → 3 → 3

\`\`\`
deleteDuplicates(1→1→2→3→3)
├─ 1 == 1，重复！跳过所有 1
├─ 调用 deleteDuplicates(2→3→3)
│  ├─ 2 != 3，不重复，保留 2
│  ├─ 2.next = deleteDuplicates(3→3)
│  │  ├─ 3 == 3，重复！跳过所有 3
│  │  ├─ 调用 deleteDuplicates(null)
│  │  │  └─ 返回 null（终止条件）
│  │  └─ 返回 null
│  └─ 返回 2→null（即 2）
└─ 返回 2

最终结果：2
\`\`\`

### 与 83 题递归的区别

| 对比项 | 83 题（保留一个） | 82 题（全删） |
|--------|------------------|---------------|
| 发现重复时 | 返回 head.next | 跳过所有重复后递归 |
| 当前节点 | 可能保留 | 一定不保留 |

### 代码对比

\`\`\`javascript
// 83 题：保留一个
if (head.val === head.next.val) {
  return head.next;  // 只跳过当前一个
}

// 82 题：全删
if (head.val === head.next.val) {
  while (head.next && head.val === head.next.val) {
    head = head.next;  // 跳过所有相同的
  }
  return deleteDuplicates(head.next);  // 当前也不保留
}
\`\`\`

### 优缺点

| 优点 | 缺点 |
|------|------|
| 代码逻辑清晰 | O(n) 递归栈空间 |
| 递归思想易理解 | 链表过长可能栈溢出 |`,
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
    frontendRelevance: "low",
    frontendNote: "旋转链表",
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
        code: `/**
 * 旋转链表 - 计算长度 + 重新连接
 *
 * 核心思想：
 * 向右旋转 k 位，本质上是：
 * - 把链表后 k 个节点移到前面
 * - 或者说，在第 (n-k) 个节点处断开，后半部分接到前面
 *
 * 算法步骤：
 * 1. 计算链表长度 n，同时找到尾节点
 * 2. k = k % n（处理 k >= n 的情况）
 * 3. 找到新尾节点（第 n-k 个节点）
 * 4. 断开并重新连接
 *
 * 时间复杂度：O(n) - 需要遍历链表两次（计算长度+找断点）
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function rotateRight(head, k) {
  // 边界情况：空链表、单节点、不旋转
  if (!head || !head.next || k === 0) return head;

  // 第一步：计算链表长度，并记录尾节点
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }
  // 此时 tail 指向最后一个节点，len 为链表长度

  // 第二步：计算实际需要旋转的次数
  // k 可能大于链表长度，旋转 n 次等于没旋转
  // 例如：长度为 5 的链表，旋转 7 次 = 旋转 2 次
  k = k % len;
  // 如果 k 为 0，不需要旋转，直接返回
  if (k === 0) return head;

  // 第三步：找到新的尾节点（从头数第 n-k 个节点）
  // 也是"倒数第 k+1 个节点"
  // 例如：1→2→3→4→5, k=2，新尾是第 3 个节点（值为3）
  let newTail = head;
  for (let i = 0; i < len - k - 1; i++) {
    newTail = newTail.next;
  }

  // 第四步：重新连接
  // newHead 是新的头节点（新尾节点的下一个）
  const newHead = newTail.next;
  // 断开：新尾节点的 next 设为 null
  newTail.next = null;
  // 连接：原尾节点接到原头节点
  tail.next = head;

  // 返回新的头节点
  return newHead;
}`,
        explanation: `## 计算长度 + 重新连接

### 核心洞察

向右旋转 k 位的本质是：**在正确的位置断开链表，然后首尾交换连接**

\`\`\`
原链表：1 → 2 → 3 → 4 → 5, k = 2

后 2 个节点 (4,5) 移到前面：
4 → 5 → 1 → 2 → 3
\`\`\`

### 执行过程示例

链表：1 → 2 → 3 → 4 → 5, k = 2, n = 5

| 步骤 | 操作 | 结果 |
|------|------|------|
| 1 | 计算长度，找尾节点 | len=5, tail=5 |
| 2 | k = 2 % 5 = 2 | k=2 |
| 3 | 找新尾：移动 5-2-1=2 步 | newTail=3 |
| 4a | newHead = newTail.next | newHead=4 |
| 4b | newTail.next = null | 3→null |
| 4c | tail.next = head | 5→1 |

最终：4 → 5 → 1 → 2 → 3

### 关键点：为什么要取模？

- 旋转 n 次 = 旋转 0 次（回到原位）
- 旋转 n+2 次 = 旋转 2 次
- 所以只需要旋转 k % n 次

### 为什么移动 n-k-1 步？

- 新尾节点是**第 n-k 个节点**
- 从 head（第 1 个）到第 n-k 个，需要移动 n-k-1 步
- 例如：n=5, k=2，新尾是第 3 个，从第 1 个移动 2 步

### 图示

\`\`\`
原链表：1 → 2 → 3 → 4 → 5
              ↑         ↑
           newTail    tail

断开重连：
        ┌───────────────┐
        ↓               │
        4 → 5 → 1 → 2 → 3 → null
        ↑
      newHead
\`\`\``,
        animation: {
          type: "linked-list" as const,
          title: "旋转链表演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"] },
              description: "初始链表: 1→2→3→4→5，k = 2（向右旋转 2 位）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "5": ["tail"] },
              highlights: [{ nodeIds: ["5"], color: "blue" as const }],
              description: "第一步：遍历链表计算长度 len = 5，同时找到尾节点 tail",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "5": ["tail"] },
              description: "第二步：计算实际旋转次数 k = k % len = 2 % 5 = 2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head", "newTail"], "5": ["tail"] },
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "第三步：找新尾节点，newTail 从 head 开始，需要移动 len - k - 1 = 2 步",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "2": ["newTail"], "5": ["tail"] },
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              description: "newTail 移动一步到节点 2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "3": ["newTail"], "5": ["tail"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const }],
              description: "newTail 再移动一步到节点 3，这就是新的尾节点",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "3": ["newTail"], "4": ["newHead"], "5": ["tail"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const }, { nodeIds: ["4"], color: "blue" as const }],
              description: "第四步：newHead = newTail.next = 节点 4（这是新的头节点）",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"], "3": ["newTail"], "4": ["newHead"], "5": ["tail"] },
              highlights: [{ nodeIds: ["3"], color: "red" as const }],
              brokenConnections: [{ from: "3", to: "4" }],
              description: "断开连接：newTail.next = null（节点 3 不再指向节点 4）",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 5, id: "5" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
              ],
              pointers: { "4": ["newHead"] },
              highlights: [{ nodeIds: ["4", "5"], color: "green" as const }],
              newConnections: [{ from: "5", to: "1" }],
              description: "重新连接：tail.next = head（节点 5 指向节点 1）。完成旋转！结果：4→5→1→2→3",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "成环再断开",
        animation: {
          type: "two-pointers" as const,
          title: "成环再断开旋转链表",
          steps: [
            {
              array: ["1", "2", "3", "4", "5"],
              left: 0,
              right: 4,
              highlights: [],
              description: "链表[1,2,3,4,5]，右旋k=2位",
            },
            {
              array: ["1", "2", "3", "4", "5→1"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "yellow" as const, label: "成环" }],
              description: "尾连头形成环。新尾=走len-k=3步",
            },
            {
              array: ["1", "2", "3", "|", "4", "5"],
              left: 2,
              right: 3,
              highlights: [{ indices: [2], color: "red" as const, label: "断开" }],
              description: "在节点3处断开环",
            },
            {
              array: ["4", "5", "1", "2", "3"],
              left: 0,
              right: 4,
              highlights: [{ indices: [0, 1, 2, 3, 4], color: "green" as const, label: "结果" }],
              description: "新头=4。结果[4,5,1,2,3]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 旋转链表 - 成环再断开
 *
 * 核心思想：
 * 先把链表首尾相连成环，然后在正确的位置断开。
 * 这种方法的逻辑更统一，不需要分别处理 tail 和 head 的连接。
 *
 * 算法步骤：
 * 1. 计算链表长度，同时将链表首尾相连成环
 * 2. 计算新尾节点的位置（从原尾移动 n-k 步）
 * 3. 在新尾节点处断开环
 *
 * 时间复杂度：O(n) - 遍历链表
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function rotateRight(head, k) {
  // 边界情况：空链表、单节点、不旋转
  if (!head || !head.next || k === 0) return head;

  // 第一步：计算长度并成环
  let len = 1;
  let tail = head;
  while (tail.next) {
    len++;
    tail = tail.next;
  }
  // 关键：将尾节点连接到头节点，形成环
  tail.next = head;
  // 此时链表已成环：... → tail → head → ...

  // 第二步：计算新尾节点的位置
  // k 取模，处理 k >= n 的情况
  k = k % len;
  // 从原 tail 出发，需要移动 n-k 步到达新尾节点
  // 为什么是 n-k？因为新尾是"倒数第 k+1 个"
  // 从尾部顺时针走 n-k 步就能到达
  let steps = len - k;
  let newTail = tail;
  for (let i = 0; i < steps; i++) {
    newTail = newTail.next;
  }

  // 第三步：断开环
  // 新头是新尾的下一个节点
  const newHead = newTail.next;
  // 断开：将新尾的 next 设为 null
  newTail.next = null;

  return newHead;
}`,
        explanation: `## 成环再断开

### 核心思想

把链表变成一个环，然后在正确的位置"剪断"：

\`\`\`
原链表：1 → 2 → 3 → 4 → 5

成环：
    ┌─────────────────┐
    ↓                 │
    1 → 2 → 3 → 4 → 5─┘

剪断（k=2，在 3 和 4 之间剪）：
    4 → 5 → 1 → 2 → 3 → null
\`\`\`

### 与方法一的对比

| 方法 | 步骤 | 特点 |
|------|------|------|
| 计算长度+重连 | 找新尾→断开→连tail和head | 需要分别处理两个连接 |
| 成环再断开 | 先成环→找新尾→断开 | 逻辑更统一，只需断开 |

### 执行过程示例

链表：1 → 2 → 3 → 4 → 5, k = 2, n = 5

| 步骤 | 操作 | 状态 |
|------|------|------|
| 1a | 计算长度 | len=5, tail=5 |
| 1b | tail.next = head | 成环 |
| 2a | k = 2 % 5 = 2 | steps = 5-2 = 3 |
| 2b | 从 tail 移动 3 步 | 5→1→2→3, newTail=3 |
| 3a | newHead = newTail.next | newHead=4 |
| 3b | newTail.next = null | 断开 |

### 为什么从 tail 移动 n-k 步？

成环后，从任意位置出发走 n 步会回到原点：

\`\`\`
位置：tail(5) → 1 → 2 → 3 → 4 → 5(tail)
步数：  0       1    2    3    4    5

新尾 = 3 = 从 tail 走 3 步 = n-k = 5-2 = 3 ✓
\`\`\`

### 优点

- 逻辑更直观：成环 → 找位置 → 断开
- 代码更统一：不需要分别处理 tail.next = head 和 newTail.next = null`,
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
    frontendRelevance: "low",
    frontendNote: "分隔链表",
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
        code: `/**
 * 分隔链表 - 双链表法
 *
 * 核心思想：
 * 将原链表拆分成两个独立的链表：
 * - small 链表：存放所有小于 x 的节点
 * - large 链表：存放所有大于或等于 x 的节点
 * 最后将两个链表连接起来。
 *
 * 关键点：
 * - 使用哨兵节点简化链表操作
 * - 必须断开 large 链表的尾部，避免形成环
 * - 保持节点的原始相对顺序
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用常数指针（复用原节点）
 */
function partition(head, x) {
  // 创建两个哨兵节点，分别作为 small 和 large 链表的虚拟头
  // 哨兵节点的好处：不需要特殊处理第一个节点
  const smallDummy = { next: null };
  const largeDummy = { next: null };

  // small 和 large 分别是两个链表的尾指针
  // 用于在尾部添加新节点
  let small = smallDummy;
  let large = largeDummy;

  // 遍历原链表，将节点分配到对应的链表
  while (head) {
    if (head.val < x) {
      // 当前节点值小于 x，加入 small 链表
      small.next = head;
      small = small.next;
    } else {
      // 当前节点值大于等于 x，加入 large 链表
      large.next = head;
      large = large.next;
    }
    // 移动到下一个节点
    head = head.next;
  }

  // 【关键】断开 large 链表的尾部！
  // 原因：large 链表最后一个节点的 next 可能指向一个 < x 的节点
  // 如果不断开，会形成环或保留错误的连接
  large.next = null;

  // 连接两个链表：small 链表的尾部接上 large 链表的头部
  small.next = largeDummy.next;

  // 返回 small 链表的头（跳过哨兵节点）
  return smallDummy.next;
}`,
        explanation: `## 双链表法

### 核心思想

把原链表**拆分**成两个链表，最后**拼接**：

\`\`\`
原链表：1 → 4 → 3 → 2 → 5 → 2, x = 3

拆分：
small: 1 → 2 → 2        (< 3)
large: 4 → 3 → 5        (>= 3)

拼接：
1 → 2 → 2 → 4 → 3 → 5
\`\`\`

### 执行过程示例

| 节点 | 值 vs x | 操作 | small 链表 | large 链表 |
|------|---------|------|------------|------------|
| 1 | 1 < 3 | 加入 small | 1 | - |
| 4 | 4 >= 3 | 加入 large | 1 | 4 |
| 3 | 3 >= 3 | 加入 large | 1 | 4→3 |
| 2 | 2 < 3 | 加入 small | 1→2 | 4→3 |
| 5 | 5 >= 3 | 加入 large | 1→2 | 4→3→5 |
| 2 | 2 < 3 | 加入 small | 1→2→2 | 4→3→5 |

### 为什么必须断开 large.next？

\`\`\`
原链表：1 → 4 → 3 → 2 → 5 → 2
                          ↑
                    large 指向这里

large.next 仍然指向最后一个 2！
如果不断开，会形成：4 → 3 → 5 → 2 → ?（错误连接）
\`\`\`

### 图示

\`\`\`
遍历前：
smallDummy → null        largeDummy → null
     ↑                        ↑
   small                    large

遍历后：
smallDummy → 1 → 2 → 2   largeDummy → 4 → 3 → 5 → (2)
                   ↑                           ↑
                 small                       large

断开并连接：
smallDummy → 1 → 2 → 2 → 4 → 3 → 5 → null
\`\`\`

### 为什么使用哨兵节点？

- 不需要单独处理空链表或第一个节点
- small.next = head 对任何情况都适用
- 最后返回 smallDummy.next 即可`,
        animation: {
          type: "linked-list" as const,
          title: "分隔链表演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "1": ["head"] },
              description: "初始链表: 1→4→3→2→5→2，x = 3，将小于 3 的节点放到前面",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: "L", id: "ld" },
                { value: 1, id: "1" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "sd": ["smallDummy"], "ld": ["largeDummy"], "1": ["head"] },
              highlights: [{ nodeIds: ["sd"], color: "green" as const }, { nodeIds: ["ld"], color: "red" as const }],
              description: "创建两个哨兵节点：smallDummy（绿色，存放 <3）和 largeDummy（红色，存放 ≥3）",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "1": ["small"], "4": ["head"] },
              highlights: [{ nodeIds: ["1"], color: "green" as const }],
              description: "节点 1 < 3，加入 small 链表",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "1": ["small"], "4": ["large"], "3": ["head"] },
              highlights: [{ nodeIds: ["4"], color: "red" as const }],
              description: "节点 4 ≥ 3，加入 large 链表",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 2, id: "2" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "1": ["small"], "3": ["large"], "2": ["head"] },
              highlights: [{ nodeIds: ["3"], color: "red" as const }],
              description: "节点 3 ≥ 3，加入 large 链表",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "2": ["small"], "3": ["large"], "5": ["head"] },
              highlights: [{ nodeIds: ["2"], color: "green" as const }],
              description: "节点 2 < 3，加入 small 链表",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
                { value: 2, id: "2b" },
              ],
              pointers: { "2": ["small"], "5": ["large"], "2b": ["head"] },
              highlights: [{ nodeIds: ["5"], color: "red" as const }],
              description: "节点 5 ≥ 3，加入 large 链表",
            },
            {
              nodes: [
                { value: "S", id: "sd" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "2b" },
                { value: "L", id: "ld" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              pointers: { "2b": ["small"], "5": ["large"] },
              highlights: [{ nodeIds: ["2b"], color: "green" as const }],
              description: "节点 2 < 3，加入 small 链表。遍历完成！",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 2, id: "2b" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["result"] },
              highlights: [
                { nodeIds: ["1", "2", "2b"], color: "green" as const },
                { nodeIds: ["4", "3", "5"], color: "blue" as const },
              ],
              newConnections: [{ from: "2b", to: "4" }],
              description: "连接两链表：small.next = largeDummy.next。结果：1→2→2→4→3→5",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "单链表原地操作",
        animation: {
          type: "two-pointers" as const,
          title: "单链表原地分隔演示",
          steps: [
            {
              array: ["1", "4", "3", "2", "5", "2"],
              left: 0,
              right: 5,
              highlights: [],
              description: "链表[1,4,3,2,5,2]，x=3。找第一个>=3的位置",
            },
            {
              array: ["1", "4", "3", "2", "5", "2"],
              left: 1,
              right: 5,
              highlights: [{ indices: [1], color: "yellow" as const, label: "插入点" }],
              description: "4>=3是插入点。遍历后续找<3的节点",
            },
            {
              array: ["1", "2", "4", "3", "5", "2"],
              left: 1,
              right: 5,
              highlights: [{ indices: [1], color: "green" as const, label: "插入2" }],
              description: "找到2<3，插入到4前面",
            },
            {
              array: ["1", "2", "2", "4", "3", "5"],
              left: 0,
              right: 5,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5], color: "green" as const, label: "完成" }],
              description: "再插入最后的2。结果[1,2,2,4,3,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 分隔链表 - 单链表原地操作
 *
 * 核心思想：
 * 不创建新的链表，而是在原链表上进行操作：
 * 1. 找到第一个 >= x 的节点位置作为"插入点"
 * 2. 遍历后续节点，遇到 < x 的节点就"拔出来"插入到插入点
 *
 * 这种方法逻辑稍复杂，但不需要额外的哨兵节点来分组。
 *
 * 时间复杂度：O(n) - 遍历链表
 * 空间复杂度：O(1) - 原地操作
 */
function partition(head, x) {
  // 哨兵节点，处理头节点被移动的情况
  const dummy = { next: head };
  let prev = dummy;

  // 第一步：找到第一个 >= x 的节点的前驱
  // 这些节点已经在正确的位置，不需要移动
  while (prev.next && prev.next.val < x) {
    prev = prev.next;
  }
  // 此时 prev.next 是第一个 >= x 的节点（或 null）

  // insertPos：待插入位置的前一个节点
  // 新的 < x 节点会插入到 insertPos 之后
  let insertPos = prev;
  // curr：用于遍历后续节点
  let curr = prev;

  // 第二步：遍历剩余节点
  while (curr.next) {
    if (curr.next.val < x) {
      // 发现一个 < x 的节点，需要移动到 insertPos 之后

      // 1. 把这个节点"拔出来"
      const node = curr.next;
      curr.next = node.next;  // 跳过被拔出的节点

      // 2. 插入到 insertPos 之后
      node.next = insertPos.next;
      insertPos.next = node;

      // 3. 更新 insertPos（指向刚插入的节点）
      insertPos = node;

      // 注意：curr 不动，因为 curr.next 已经是新节点了
    } else {
      // 节点 >= x，不需要移动，继续遍历
      curr = curr.next;
    }
  }

  return dummy.next;
}`,
        explanation: `## 单链表原地操作

### 核心思想

不创建新链表，而是把"错位"的节点**拔出来**再**插入**到正确位置：

\`\`\`
原链表：1 → 4 → 3 → 2 → 5 → 2, x = 3
        ↑   ↑
       ok  第一个>=x（插入点）

发现 2 < 3，拔出来插入到 1 后面：
1 → 2 → 4 → 3 → 5 → 2
        ↑
       插入点后移

发现 2 < 3，拔出来插入到 2 后面：
1 → 2 → 2 → 4 → 3 → 5
\`\`\`

### 执行过程示例

链表：1 → 4 → 3 → 2 → 5 → 2, x = 3

| 步骤 | curr.next | 操作 | 链表状态 | insertPos |
|------|-----------|------|----------|-----------|
| 初始 | 4 | 找到第一个>=x | 1→4→3→2→5→2 | 1 |
| 1 | 4 | 4>=3，跳过 | 1→4→3→2→5→2 | 1 |
| 2 | 3 | 3>=3，跳过 | 1→4→3→2→5→2 | 1 |
| 3 | 2 | 2<3，移动 | 1→2→4→3→5→2 | 2 |
| 4 | 5 | 5>=3，跳过 | 1→2→4→3→5→2 | 2 |
| 5 | 2 | 2<3，移动 | 1→2→2→4→3→5 | 2(新) |

### 图示：节点移动过程

\`\`\`
移动节点 2 的过程：

原状态：
1 → 4 → 3 → 2 → 5 → 2
↑       ↑   ↑
insert  curr node

步骤1：拔出 node
1 → 4 → 3 → 5 → 2
↑       ↑
insert  curr（next 已更新）

步骤2：插入到 insert 后
1 → 2 → 4 → 3 → 5 → 2
    ↑
  insert（更新为 node）
\`\`\`

### 与双链表法对比

| 对比项 | 双链表法 | 原地操作 |
|--------|----------|----------|
| 额外空间 | 2个哨兵节点 | 1个哨兵节点 |
| 代码复杂度 | 简单 | 较复杂 |
| 思路直观性 | 分组→合并 | 拔出→插入 |
| 推荐度 | ⭐⭐⭐ | ⭐⭐ |`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 13. LRU 缓存 (146)
  {
    id: "lru-cache",
    leetcodeId: 146,
    title: "LRU 缓存",
    titleEn: "LRU Cache",
    difficulty: "medium",
    category: "linked-list",
    tags: ["设计", "哈希表", "链表", "双向链表"],
    frontendRelevance: "medium",
    frontendNote: "LRU缓存，前端缓存相关",
    description: `请你设计并实现一个满足 LRU (最近最少使用) 缓存 约束的数据结构。

实现 LRUCache 类：
- LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1
- void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value；如果不存在，则向缓存中插入该组 key-value。如果插入操作导致关键字数量超过 capacity，则应该 逐出 最久未使用的关键字。

函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。`,
    examples: `**示例：**
\`\`\`
输入：
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出：
[null, null, null, 1, null, -1, null, -1, 3, 4]
解释：LRU 缓存容量为 2，按操作顺序执行
\`\`\``,
    constraints: `- \`1 <= capacity <= 3000\`
- \`0 <= key <= 10^4\`
- \`0 <= value <= 10^5\`
- 最多调用 \`2 * 10^5\` 次 \`get\` 和 \`put\``,
    initialCode: `class LRUCache {
  constructor(capacity) {
    // 在此处编写代码
  }

  get(key) {
    // 在此处编写代码
  }

  put(key, value) {
    // 在此处编写代码
  }
}`,
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [2],
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4]
      }
    ],
    hints: [
      "使用哈希表 + 双向链表",
      "哈希表提供 O(1) 查找",
      "双向链表维护访问顺序",
      "JavaScript 的 Map 本身维护插入顺序"
    ],
    explanation: `## 解题思路

### 哈希表 + 双向链表

要实现 O(1) 的 get 和 put：
- 哈希表：O(1) 查找键值
- 双向链表：O(1) 移动节点到头部

### JavaScript Map 技巧

ES6 的 Map 保持插入顺序，可以直接利用：
- 访问后删除再插入，使其成为最新
- Map.keys().next().value 获取最旧的键`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    relatedProblems: ["lfu-cache"],
    solutions: [
      {
        name: "Map 技巧（推荐）",
        code: `/**
 * LRU 缓存 - 利用 ES6 Map 的插入顺序特性
 *
 * 核心思想：
 * ES6 的 Map 会按照键的插入顺序来迭代，这个特性完美契合 LRU 的需求：
 * - Map.keys().next().value 获取最早插入的键（最旧）
 * - 删除后重新 set 会把键移到最后（最新）
 *
 * LRU (Least Recently Used) 原理：
 * - 访问某个键：把它变成"最新使用"
 * - 容量满时：淘汰"最久未使用"的键
 *
 * 时间复杂度：O(1) - Map 的 get/set/delete 都是 O(1)
 * 空间复杂度：O(capacity) - 最多存储 capacity 个键值对
 */
class LRUCache {
  /**
   * 初始化 LRU 缓存
   * @param {number} capacity - 缓存容量
   */
  constructor(capacity) {
    this.capacity = capacity;  // 缓存容量上限
    this.cache = new Map();    // 使用 Map 存储，自动维护插入顺序
  }

  /**
   * 获取缓存中的值
   * 如果 key 存在，返回值并将其标记为"最近使用"
   * @param {number} key - 要获取的键
   * @return {number} - 键对应的值，不存在返回 -1
   */
  get(key) {
    // key 不存在，返回 -1
    if (!this.cache.has(key)) return -1;

    // key 存在，需要更新为"最近使用"
    // 技巧：删除后重新插入，key 就会移到 Map 的最后位置
    const value = this.cache.get(key);
    this.cache.delete(key);    // 先删除
    this.cache.set(key, value); // 再插入（现在是最新的了）
    return value;
  }

  /**
   * 添加或更新缓存
   * @param {number} key - 键
   * @param {number} value - 值
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // key 已存在：删除旧的，稍后会重新插入
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // key 不存在且容量已满：需要淘汰最久未使用的
      // Map.keys().next().value 返回第一个键（最早插入的，即最旧的）
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    // 插入新的键值对（无论是新增还是更新，都会成为最新的）
    this.cache.set(key, value);
  }
}`,
        explanation: `## Map 技巧（利用 ES6 Map 特性）

### 核心洞察

ES6 Map 的一个重要特性：**迭代顺序 = 插入顺序**

\`\`\`javascript
const map = new Map();
map.set('a', 1);
map.set('b', 2);
map.set('c', 3);

// 迭代顺序：a → b → c（插入顺序）
// map.keys().next().value === 'a'（第一个插入的）
\`\`\`

### 如何利用这个特性实现 LRU？

| 操作 | 实现 | 说明 |
|------|------|------|
| 标记为最新 | delete + set | 删除后重新插入，移到最后 |
| 获取最旧 | keys().next().value | 第一个键就是最旧的 |

### 执行过程示例

容量 = 2

| 操作 | Map 状态 | 说明 |
|------|----------|------|
| put(1,1) | {1:1} | 插入 |
| put(2,2) | {1:1, 2:2} | 插入 |
| get(1) | {2:2, 1:1} | 访问 1，移到最后 |
| put(3,3) | {1:1, 3:3} | 容量满，淘汰最旧的 2 |
| get(2) | {1:1, 3:3} → -1 | 2 已被淘汰 |
| put(4,4) | {3:3, 4:4} | 淘汰 1，插入 4 |

### 为什么 delete + set 能实现"移到最后"？

\`\`\`javascript
const map = new Map([['a',1], ['b',2], ['c',3]]);
// 顺序：a → b → c

map.delete('a');
map.set('a', 1);
// 顺序：b → c → a（a 移到最后了！）
\`\`\`

### 优点

- 代码极简，只需要 Map 的基本操作
- 不需要自己实现双向链表
- JavaScript/TypeScript 专属技巧`,
        animation: {
          type: "linked-list" as const,
          title: "LRU 缓存演示",
          steps: [
            {
              nodes: [],
              pointers: {},
              description: "初始化 LRU 缓存，容量 = 2。Map 为空",
            },
            {
              nodes: [
                { value: "(1,1)", id: "1" },
              ],
              pointers: { "1": ["最新"] },
              highlights: [{ nodeIds: ["1"], color: "green" as const }],
              description: "put(1, 1)：插入键值对 (1,1)。Map: {1:1}",
            },
            {
              nodes: [
                { value: "(1,1)", id: "1" },
                { value: "(2,2)", id: "2" },
              ],
              pointers: { "1": ["最旧"], "2": ["最新"] },
              highlights: [{ nodeIds: ["2"], color: "green" as const }],
              description: "put(2, 2)：插入键值对 (2,2)。Map: {1:1, 2:2}",
            },
            {
              nodes: [
                { value: "(2,2)", id: "2" },
                { value: "(1,1)", id: "1" },
              ],
              pointers: { "2": ["最旧"], "1": ["最新", "访问"] },
              highlights: [{ nodeIds: ["1"], color: "blue" as const }],
              description: "get(1)：访问键 1，返回 1。删除后重新插入，1 变为最新。Map: {2:2, 1:1}",
            },
            {
              nodes: [
                { value: "(1,1)", id: "1" },
                { value: "(3,3)", id: "3" },
              ],
              pointers: { "1": ["最旧"], "3": ["最新"] },
              highlights: [{ nodeIds: ["3"], color: "green" as const }],
              description: "put(3, 3)：容量已满！淘汰最旧的键 2，插入 (3,3)。Map: {1:1, 3:3}",
            },
            {
              nodes: [
                { value: "(1,1)", id: "1" },
                { value: "(3,3)", id: "3" },
              ],
              pointers: { "1": ["最旧"], "3": ["最新"] },
              highlights: [{ nodeIds: ["1", "3"], color: "yellow" as const }],
              description: "get(2)：键 2 不存在（已被淘汰），返回 -1",
            },
            {
              nodes: [
                { value: "(3,3)", id: "3" },
                { value: "(4,4)", id: "4" },
              ],
              pointers: { "3": ["最旧"], "4": ["最新"] },
              highlights: [{ nodeIds: ["4"], color: "green" as const }],
              description: "put(4, 4)：容量已满！淘汰最旧的键 1，插入 (4,4)。Map: {3:3, 4:4}",
            },
            {
              nodes: [
                { value: "(3,3)", id: "3" },
                { value: "(4,4)", id: "4" },
              ],
              pointers: { "3": ["最旧"], "4": ["最新"] },
              description: "get(1)：键 1 不存在（已被淘汰），返回 -1",
            },
            {
              nodes: [
                { value: "(4,4)", id: "4" },
                { value: "(3,3)", id: "3" },
              ],
              pointers: { "4": ["最旧"], "3": ["最新", "访问"] },
              highlights: [{ nodeIds: ["3"], color: "blue" as const }],
              description: "get(3)：访问键 3，返回 3。3 变为最新。Map: {4:4, 3:3}",
            },
            {
              nodes: [
                { value: "(4,4)", id: "4" },
                { value: "(3,3)", id: "3" },
              ],
              pointers: { "4": ["访问"], "3": ["最新"] },
              highlights: [{ nodeIds: ["4"], color: "blue" as const }],
              description: "get(4)：访问键 4，返回 4。最终输出: [null,null,null,1,null,-1,null,-1,3,4]",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(1)",
        spaceComplexity: "O(capacity)",
      },
      {
        name: "双向链表 + 哈希表",
        code: `/**
 * 双向链表节点
 * 存储 key 是为了在删除节点时能从 Map 中删除对应条目
 */
class DLinkedNode {
  constructor(key = 0, value = 0) {
    this.key = key;      // 存储 key，用于从 Map 中删除
    this.value = value;  // 存储值
    this.prev = null;    // 前驱指针
    this.next = null;    // 后继指针
  }
}

/**
 * LRU 缓存 - 双向链表 + 哈希表
 *
 * 核心思想：
 * - 哈希表：O(1) 时间查找 key 对应的链表节点
 * - 双向链表：O(1) 时间移动节点位置
 *   - 头部（head.next）：最近使用的
 *   - 尾部（tail.prev）：最久未使用的
 *
 * 为什么要用双向链表？
 * - 单向链表删除节点需要找前驱，O(n)
 * - 双向链表可以直接通过 prev 指针删除，O(1)
 *
 * 时间复杂度：O(1) - 所有操作都是 O(1)
 * 空间复杂度：O(capacity) - 存储 capacity 个节点
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;  // 缓存容量
    this.size = 0;             // 当前缓存大小
    this.cache = new Map();    // key -> DLinkedNode

    // 使用虚拟头尾节点，简化边界处理
    // 结构：head <-> 真实节点 <-> ... <-> tail
    this.head = new DLinkedNode();
    this.tail = new DLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * 获取缓存值
   */
  get(key) {
    if (!this.cache.has(key)) return -1;

    // 找到节点，移到头部（标记为最近使用）
    const node = this.cache.get(key);
    this.moveToHead(node);
    return node.value;
  }

  /**
   * 添加或更新缓存
   */
  put(key, value) {
    if (this.cache.has(key)) {
      // key 存在：更新值，移到头部
      const node = this.cache.get(key);
      node.value = value;
      this.moveToHead(node);
    } else {
      // key 不存在：创建新节点
      const node = new DLinkedNode(key, value);
      this.cache.set(key, node);
      this.addToHead(node);
      this.size++;

      // 超出容量：删除尾部节点（最久未使用）
      if (this.size > this.capacity) {
        const removed = this.removeTail();
        this.cache.delete(removed.key); // 从 Map 中也删除
        this.size--;
      }
    }
  }

  /**
   * 在头部添加节点（最新使用的位置）
   */
  addToHead(node) {
    // 插入到 head 和 head.next 之间
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /**
   * 删除节点（从链表中移除）
   */
  removeNode(node) {
    // 双向链表删除：让前后节点互相连接
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  /**
   * 移动节点到头部
   */
  moveToHead(node) {
    this.removeNode(node);  // 先从原位置删除
    this.addToHead(node);   // 再添加到头部
  }

  /**
   * 删除尾部节点（最久未使用的）
   */
  removeTail() {
    const node = this.tail.prev; // 虚拟尾节点的前一个才是真正的尾
    this.removeNode(node);
    return node; // 返回被删除的节点，用于从 Map 中删除
  }
}`,
        explanation: `## 双向链表 + 哈希表（经典实现）

### 数据结构设计

\`\`\`
哈希表 (Map)          双向链表
┌─────────────┐      head ↔ [最新] ↔ [..] ↔ [最旧] ↔ tail
│ key → node  │           ↑                    ↑
│ 1   → Node1 │────────────                    │
│ 2   → Node2 │─────────────────────────────────
└─────────────┘
\`\`\`

### 为什么需要双向链表？

| 操作 | 单向链表 | 双向链表 |
|------|----------|----------|
| 删除节点 | O(n) 需要找前驱 | O(1) 直接用 prev |
| 移到头部 | O(n) | O(1) |

### 为什么节点要存 key？

当容量满需要删除尾节点时，要同时从 Map 中删除对应条目：

\`\`\`javascript
const removed = this.removeTail();
this.cache.delete(removed.key); // 需要知道 key 是什么！
\`\`\`

### 虚拟头尾节点的好处

\`\`\`
无虚拟节点：需要处理边界
if (head === null) { head = node; }
else { ... }

有虚拟节点：统一操作
head.next = node; // 总是有效
\`\`\`

### 执行过程图示

容量 = 2，操作序列：put(1,1), put(2,2), get(1), put(3,3)

\`\`\`
put(1,1): head ↔ [1] ↔ tail
put(2,2): head ↔ [2] ↔ [1] ↔ tail
get(1):   head ↔ [1] ↔ [2] ↔ tail  （1 移到头部）
put(3,3): head ↔ [3] ↔ [1] ↔ tail  （淘汰 2）
\`\`\`

### 各操作的实现

| 操作 | 步骤 |
|------|------|
| get | Map查找 → 移到头部 |
| put(已存在) | 更新值 → 移到头部 |
| put(新增) | 创建节点 → 加到头部 → 超容量则删尾 |`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(capacity)",
      },
    ],
  },

  // 14. K 个一组翻转链表 (25)
  {
    id: "reverse-nodes-in-k-group",
    leetcodeId: 25,
    title: "K 个一组翻转链表",
    titleEn: "Reverse Nodes in k-Group",
    difficulty: "hard",
    category: "linked-list",
    tags: ["链表", "递归"],
    frontendRelevance: "low",
    frontendNote: "K组翻转，较复杂",
    description: `给你链表的头节点 head ，每 k 个节点一组进行翻转，请你返回修改后的链表。

k 是一个正整数，它的值小于或等于链表的长度。如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。

你不能只是单纯的改变节点内部的值，而是需要实际进行节点交换。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]
解释：每 2 个一组翻转
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2,3,4,5], k = 3
输出：[3,2,1,4,5]
解释：每 3 个一组翻转，最后 2 个不足 k 个保持原样
\`\`\``,
    constraints: `- 链表中的节点数目为 \`n\`
- \`1 <= k <= n <= 5000\`
- \`0 <= Node.val <= 1000\``,
    initialCode: `function reverseKGroup(head, k) {
  // 在此处编写代码
}`,
    solution: `function reverseKGroup(head, k) {
  const dummy = { next: head };
  let prevGroupEnd = dummy;

  while (true) {
    // 检查是否有 k 个节点
    let kth = prevGroupEnd;
    for (let i = 0; i < k; i++) {
      kth = kth.next;
      if (!kth) return dummy.next;
    }

    const groupStart = prevGroupEnd.next;
    const nextGroupStart = kth.next;

    // 翻转 k 个节点
    let prev = nextGroupStart;
    let curr = groupStart;
    while (curr !== nextGroupStart) {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    prevGroupEnd.next = kth;
    prevGroupEnd = groupStart;
  }
}`,
    testCases: [
      {
        id: "1",
        name: "k=2",
        input: [[1,2,3,4,5], 2],
        expected: [2,1,4,3,5]
      },
      {
        id: "2",
        name: "k=3",
        input: [[1,2,3,4,5], 3],
        expected: [3,2,1,4,5]
      }
    ],
    hints: [
      "先检查是否有 k 个节点",
      "翻转 k 个节点后，连接前后部分",
      "使用虚拟头节点简化操作"
    ],
    explanation: `## 解题思路

### 迭代法

1. 使用虚拟头节点
2. 每次检查是否有 k 个节点
3. 翻转这 k 个节点
4. 连接前后部分
5. 移动到下一组

### 关键点
- 记录每组的起点、终点、下一组起点
- 翻转后，原起点变终点，原终点变起点`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["reverse-linked-list", "swap-nodes-in-pairs"],
    solutions: [
      {
        name: "迭代（推荐）",
        code: `/**
 * K 个一组翻转链表 - 迭代法
 *
 * 核心思想：
 * 将链表分成若干组，每组 k 个节点，分别翻转每组：
 * 1. 找到当前组的第 k 个节点（检查是否够 k 个）
 * 2. 翻转当前组的 k 个节点
 * 3. 连接翻转后的组与前后部分
 * 4. 移动到下一组重复操作
 *
 * 需要记录的关键节点：
 * - prevGroupEnd：上一组的结尾（用于连接）
 * - groupStart：当前组的开始
 * - kth：当前组的第 k 个节点（翻转后变成头）
 * - nextGroupStart：下一组的开始
 *
 * 时间复杂度：O(n) - 每个节点最多访问 2 次
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function reverseKGroup(head, k) {
  // 虚拟头节点，简化第一组的处理
  const dummy = { next: head };

  // prevGroupEnd 记录上一组翻转后的尾节点
  // 初始时指向 dummy
  let prevGroupEnd = dummy;

  while (true) {
    // 第一步：检查是否还有 k 个节点
    // 从 prevGroupEnd 开始向后数 k 个
    let kth = prevGroupEnd;
    for (let i = 0; i < k; i++) {
      kth = kth.next;
      // 不足 k 个节点，直接返回（剩余节点保持原样）
      if (!kth) return dummy.next;
    }
    // 此时 kth 指向当前组的第 k 个节点

    // 记录关键节点
    const groupStart = prevGroupEnd.next;  // 当前组的第一个节点
    const nextGroupStart = kth.next;       // 下一组的第一个节点

    // 第二步：翻转当前组的 k 个节点
    // 使用标准的链表翻转，但 prev 初始值是 nextGroupStart
    // 这样翻转后自动连接到下一组
    let prev = nextGroupStart;
    let curr = groupStart;
    while (curr !== nextGroupStart) {
      const next = curr.next;
      curr.next = prev;  // 反转指向
      prev = curr;
      curr = next;
    }
    // 翻转后，prev 指向新的组头（原来的 kth）

    // 第三步：连接翻转后的组
    // prevGroupEnd.next 应该指向新的组头（kth）
    prevGroupEnd.next = kth;
    // 更新 prevGroupEnd 为当前组的尾（原来的 groupStart）
    prevGroupEnd = groupStart;
  }
}`,
        explanation: `## 迭代法

### 核心思路

把链表分成多个"组"，每组 k 个节点，逐组翻转：

\`\`\`
原链表：1 → 2 → 3 → 4 → 5, k = 2

第一组：[1,2] → 翻转 → [2,1]
第二组：[3,4] → 翻转 → [4,3]
第三组：[5] → 不足 k 个，保持

结果：2 → 1 → 4 → 3 → 5
\`\`\`

### 关键节点示意图

\`\`\`
处理第一组前：
dummy → 1 → 2 → 3 → 4 → 5
  ↑     ↑   ↑   ↑
prevGE  GS  kth nextGS

处理第一组后：
dummy → 2 → 1 → 3 → 4 → 5
              ↑
            prevGE（移动到这里）

处理第二组后：
dummy → 2 → 1 → 4 → 3 → 5
                      ↑
                    prevGE
\`\`\`

### 翻转单组的过程

翻转 [1,2]，prev 初始为 3（nextGroupStart）：

| 步骤 | curr | prev | 操作 |
|------|------|------|------|
| 1 | 1 | 3 | 1.next = 3, prev = 1 |
| 2 | 2 | 1 | 2.next = 1, prev = 2 |
| 结束 | 3 | 2 | curr == nextGS |

结果：2 → 1 → 3

### 为什么 prev 初始化为 nextGroupStart？

\`\`\`
如果 prev 初始为 null：
翻转后：2 → 1 → null（断开了！）

如果 prev 初始为 nextGroupStart：
翻转后：2 → 1 → 3（自动连接下一组）
\`\`\`

### 为什么要用虚拟头节点？

第一组翻转后，新的头节点会变化：
- 原来：head = 1
- 翻转后：新 head = 2

使用 dummy 可以通过 dummy.next 获取正确的头`,
        animation: {
          type: "linked-list" as const,
          title: "K 个一组翻转链表演示",
          steps: [
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["head"] },
              description: "初始链表: 1→2→3→4→5，k = 2（每 2 个一组翻转）",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "d": ["prevGE"], "1": ["GS"], "2": ["kth"], "3": ["nextGS"] },
              highlights: [{ nodeIds: ["1", "2"], color: "yellow" as const, label: "第一组" }],
              description: "找到第一组的 k=2 个节点。GS=1, kth=2, nextGS=3",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "3": ["prev"], "1": ["curr"] },
              highlights: [{ nodeIds: ["1", "2"], color: "blue" as const }],
              description: "开始翻转第一组：prev = nextGS(3)，curr = GS(1)",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "d": ["prevGE"], "1": ["prevGE更新"] },
              highlights: [{ nodeIds: ["2", "1"], color: "green" as const, label: "已翻转" }],
              description: "第一组翻转完成！2→1→3。prevGE.next = kth(2)，prevGE = GS(1)",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
                { value: 5, id: "5" },
              ],
              pointers: { "1": ["prevGE"], "3": ["GS"], "4": ["kth"], "5": ["nextGS"] },
              highlights: [{ nodeIds: ["3", "4"], color: "yellow" as const, label: "第二组" }],
              description: "找到第二组的 k=2 个节点。GS=3, kth=4, nextGS=5",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              pointers: { "3": ["prevGE更新"] },
              highlights: [{ nodeIds: ["4", "3"], color: "green" as const, label: "已翻转" }],
              description: "第二组翻转完成！4→3→5。prevGE.next = kth(4)，prevGE = GS(3)",
            },
            {
              nodes: [
                { value: "D", id: "d" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              pointers: { "3": ["prevGE"], "5": ["检查"] },
              highlights: [{ nodeIds: ["5"], color: "red" as const }],
              description: "第三组只有 1 个节点 (5)，不足 k=2 个，保持原样",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
                { value: 5, id: "5" },
              ],
              pointers: { "2": ["head"] },
              highlights: [
                { nodeIds: ["2", "1"], color: "green" as const },
                { nodeIds: ["4", "3"], color: "green" as const },
              ],
              description: "完成！结果: 2→1→4→3→5",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归",
        code: `/**
 * K 个一组翻转链表 - 递归法
 *
 * 核心思想：
 * 递归地处理每组 k 个节点：
 * 1. 检查当前是否还有 k 个节点
 * 2. 如果有，翻转前 k 个节点
 * 3. 递归处理剩余部分
 * 4. 连接翻转后的部分和递归结果
 *
 * 递归定义：
 * reverseKGroup(head, k) = 翻转后的前 k 个 + reverseKGroup(第k+1个开始, k)
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n/k) - 递归调用栈深度
 */
function reverseKGroup(head, k) {
  // 第一步：检查是否有 k 个节点
  let curr = head;
  for (let i = 0; i < k; i++) {
    // 不足 k 个节点，不翻转，直接返回
    if (!curr) return head;
    curr = curr.next;
  }
  // 此时 curr 指向第 k+1 个节点（下一组的开始）

  // 第二步：翻转前 k 个节点
  // 使用标准的链表翻转
  let prev = null;
  curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;  // 反转指向
    prev = curr;
    curr = next;
  }
  // 翻转后：
  // - prev 指向新的头（原来的第 k 个节点）
  // - head 指向新的尾（原来的第 1 个节点）
  // - curr 指向第 k+1 个节点

  // 第三步：递归处理剩余部分，并连接
  // head 现在是翻转后的尾，它的 next 应该指向递归结果
  head.next = reverseKGroup(curr, k);

  // 返回新的头（prev）
  return prev;
}`,
        explanation: `## 递归法

### 递归思路

把问题分解为：**翻转前 k 个** + **递归处理剩余**

\`\`\`
reverseKGroup([1,2,3,4,5], 2)
= 翻转[1,2] + reverseKGroup([3,4,5], 2)
= [2,1] + 翻转[3,4] + reverseKGroup([5], 2)
= [2,1] + [4,3] + [5]（不足 k 个不翻转）
= [2,1,4,3,5]
\`\`\`

### 递归过程图解

链表：1 → 2 → 3 → 4 → 5, k = 2

\`\`\`
reverseKGroup(1→2→3→4→5, 2)
├─ 检查：有 2 个节点 ✓
├─ 翻转 [1,2]：得到 2→1
├─ 递归：reverseKGroup(3→4→5, 2)
│  ├─ 检查：有 2 个节点 ✓
│  ├─ 翻转 [3,4]：得到 4→3
│  ├─ 递归：reverseKGroup(5, 2)
│  │  ├─ 检查：只有 1 个节点 ✗
│  │  └─ 返回 5
│  ├─ 连接：3.next = 5
│  └─ 返回 4→3→5
├─ 连接：1.next = 4→3→5
└─ 返回 2→1→4→3→5
\`\`\`

### 关键点

1. **检查够不够 k 个**：不够就直接返回，不翻转
2. **翻转后 head 变成尾**：需要把它连接到递归结果
3. **prev 是新的头**：翻转后的第一个节点

### 代码简化版

\`\`\`javascript
function reverseKGroup(head, k) {
  // 检查
  let curr = head;
  for (let i = 0; i < k && curr; i++) curr = curr.next;
  if (!curr) return head; // 这里有 bug，应该在循环中检查

  // 翻转
  // ...

  // 递归连接
  head.next = reverseKGroup(curr, k);
  return prev;
}
\`\`\`

### 与迭代法的对比

| 对比项 | 迭代法 | 递归法 |
|--------|--------|--------|
| 空间 | O(1) | O(n/k) |
| 代码 | 稍长 | 简洁 |
| 理解 | 需要跟踪多个指针 | 分治思想清晰 |`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n/k)",
      },
    ],
  },

  // 15. 排序链表 (148)
  {
    id: "sort-list",
    leetcodeId: 148,
    title: "排序链表",
    titleEn: "Sort List",
    difficulty: "medium",
    category: "linked-list",
    tags: ["链表", "双指针", "分治", "排序", "归并排序"],
    frontendRelevance: "medium",
    frontendNote: "链表排序",
    description: `给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [4,2,1,3]
输出：[1,2,3,4]
解释：排序后的链表
\`\`\`

**示例 2：**
\`\`\`
输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
解释：排序后的链表
\`\`\`

**示例 3：**
\`\`\`
输入：head = []
输出：[]
解释：空链表
\`\`\``,
    constraints: `- 链表中节点的数目在范围 \`[0, 5 * 10^4]\` 内
- \`-10^5 <= Node.val <= 10^5\``,
    initialCode: `function sortList(head) {
  // 在此处编写代码
}`,
    solution: `function sortList(head) {
  if (!head || !head.next) return head;

  // 快慢指针找中点
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  const mid = slow.next;
  slow.next = null;

  // 递归排序两半
  const left = sortList(head);
  const right = sortList(mid);

  // 合并
  return merge(left, right);
}

function merge(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[4,2,1,3]],
        expected: [1,2,3,4]
      },
      {
        id: "2",
        name: "示例2",
        input: [[-1,5,3,4,0]],
        expected: [-1,0,3,4,5]
      }
    ],
    hints: [
      "使用归并排序",
      "快慢指针找中点",
      "递归排序后合并"
    ],
    explanation: `## 解题思路

### 归并排序

1. 用快慢指针找到链表中点
2. 断开链表，递归排序两半
3. 合并两个有序链表

### 为什么用归并排序？
- 链表不支持随机访问，快速排序不方便
- 归并排序天然适合链表，合并操作 O(1) 空间`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["merge-two-sorted-lists", "sort-colors"],
    solutions: [
      {
        name: "归并排序（推荐）",
        code: `/**
 * 排序链表 - 归并排序（自顶向下）
 *
 * 核心思想：
 * 使用归并排序的分治策略：
 * 1. 分：用快慢指针找到链表中点，将链表分成两半
 * 2. 治：递归对两半分别排序
 * 3. 合：合并两个有序链表
 *
 * 为什么链表适合归并排序？
 * - 链表不支持随机访问，快排的 partition 操作不方便
 * - 归并排序的合并操作只需要调整指针，不需要额外数组空间
 *
 * 时间复杂度：O(n log n) - 标准归并排序
 * 空间复杂度：O(log n) - 递归调用栈深度
 */
function sortList(head) {
  // 递归终止条件：空链表或单节点链表已经有序
  if (!head || !head.next) return head;

  // 第一步：快慢指针找中点
  // 注意：fast 从 head.next 开始，这样对于偶数长度链表
  // slow 会停在前半部分的最后一个节点
  // 例如：1→2→3→4，slow 停在 2，方便断开
  let slow = head, fast = head.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // slow 现在是前半部分的最后一个节点

  // 第二步：断开链表
  const mid = slow.next;  // 后半部分的头
  slow.next = null;       // 断开！前半部分以 null 结尾

  // 第三步：递归排序两半
  const left = sortList(head);   // 排序前半部分
  const right = sortList(mid);   // 排序后半部分

  // 第四步：合并两个有序链表
  return merge(left, right);
}

/**
 * 合并两个有序链表
 * 这是经典的"合并两个有序链表"问题（LeetCode 21）
 */
function merge(l1, l2) {
  // 虚拟头节点，简化边界处理
  const dummy = { next: null };
  let curr = dummy;

  // 比较两个链表的当前节点，较小的接入结果链表
  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // 将剩余的部分接入（必有一个为 null）
  curr.next = l1 || l2;

  return dummy.next;
}`,
        explanation: `## 归并排序（自顶向下）

### 分治策略

\`\`\`
原链表：4 → 2 → 1 → 3

分：找中点，断开
     [4→2]    [1→3]

治：递归排序
     [2→4]    [1→3]

合：合并有序链表
     1 → 2 → 3 → 4
\`\`\`

### 执行过程图解

\`\`\`
sortList(4→2→1→3)
├─ 找中点：slow=2, mid=1
├─ 断开：[4→2] [1→3]
├─ sortList(4→2)
│  ├─ 找中点：slow=4, mid=2
│  ├─ 断开：[4] [2]
│  ├─ sortList(4) → 4
│  ├─ sortList(2) → 2
│  └─ merge(4, 2) → 2→4
├─ sortList(1→3)
│  ├─ 找中点：slow=1, mid=3
│  ├─ 断开：[1] [3]
│  ├─ sortList(1) → 1
│  ├─ sortList(3) → 3
│  └─ merge(1, 3) → 1→3
└─ merge(2→4, 1→3) → 1→2→3→4
\`\`\`

### 为什么 fast 从 head.next 开始？

\`\`\`
如果 fast 从 head 开始：
链表 1→2，slow 会停在 2
断开后：[1→2] 和 []，无限递归！

如果 fast 从 head.next 开始：
链表 1→2，slow 会停在 1
断开后：[1] 和 [2]，正确！
\`\`\`

### 时间复杂度分析

- 每层递归处理 O(n) 个节点（合并操作）
- 递归深度 O(log n)（每次减半）
- 总时间：O(n log n)

### 空间复杂度

- 递归调用栈深度：O(log n)
- 合并操作只调整指针，不需要额外数组`,
        animation: {
          type: "linked-list" as const,
          title: "归并排序链表演示",
          steps: [
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: { "4": ["head"] },
              description: "初始链表: 4→2→1→3，使用归并排序",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: { "4": ["slow"], "2": ["slow"], "1": ["fast"] },
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              description: "快慢指针找中点：slow=2, fast=3→null，slow 停在 2",
            },
            {
              nodes: [
                { value: 4, id: "4" },
                { value: 2, id: "2" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: {},
              highlights: [
                { nodeIds: ["4", "2"], color: "blue" as const, label: "左半" },
                { nodeIds: ["1", "3"], color: "green" as const, label: "右半" },
              ],
              brokenConnections: [{ from: "2", to: "1" }],
              description: "断开链表：左半 [4→2]，右半 [1→3]",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 4, id: "4" },
              ],
              pointers: {},
              highlights: [{ nodeIds: ["2", "4"], color: "blue" as const, label: "左半排序" }],
              description: "递归排序左半：4→2 变为 2→4",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: {},
              highlights: [{ nodeIds: ["1", "3"], color: "green" as const, label: "右半排序" }],
              description: "递归排序右半：1→3 已有序，保持不变",
            },
            {
              nodes: [
                { value: 2, id: "2" },
                { value: 4, id: "4" },
                { value: 1, id: "1" },
                { value: 3, id: "3" },
              ],
              pointers: { "2": ["l1"], "1": ["l2"] },
              highlights: [{ nodeIds: ["1"], color: "yellow" as const }],
              description: "合并：比较 2 和 1，1 < 2，选择 1",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 4, id: "4" },
                { value: 3, id: "3" },
              ],
              pointers: { "2": ["l1"], "3": ["l2"] },
              highlights: [{ nodeIds: ["2"], color: "yellow" as const }],
              description: "合并：比较 2 和 3，2 < 3，选择 2",
            },
            {
              nodes: [
                { value: 1, id: "1" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4" },
              ],
              pointers: { "1": ["head"] },
              highlights: [{ nodeIds: ["1", "2", "3", "4"], color: "green" as const }],
              description: "合并完成！结果: 1→2→3→4",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "自底向上归并（O(1) 空间）",
        code: `/**
 * 排序链表 - 自底向上归并排序
 *
 * 核心思想：
 * 不使用递归，改用迭代方式：
 * - 从 size=1 开始，每次将相邻的两个 size 长度的子链表合并
 * - 每轮合并后 size 翻倍，直到 size >= 链表长度
 *
 * 优点：
 * - 空间复杂度 O(1)，不需要递归栈
 * - 适合链表长度很大的情况
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function sortList(head) {
  if (!head || !head.next) return head;

  // 第一步：计算链表长度
  let length = 0;
  let node = head;
  while (node) {
    length++;
    node = node.next;
  }

  // 虚拟头节点
  const dummy = { next: head };

  // 第二步：从 size=1 开始，每次翻倍
  // size 表示每个待合并子链表的长度
  for (let size = 1; size < length; size *= 2) {
    let curr = dummy.next;  // 当前处理的位置
    let tail = dummy;       // 已排序部分的尾部

    // 每轮处理整个链表
    while (curr) {
      // 分离出左半部分（size 个节点）
      const left = curr;
      // split 返回右半部分的头，并断开左半部分
      const right = split(left, size);
      // 分离出右半部分，curr 移动到下一对的开始
      curr = split(right, size);

      // 合并 left 和 right，返回合并后的链表和尾节点
      const [merged, newTail] = mergeWithTail(left, right);

      // 接入已排序部分
      tail.next = merged;
      tail = newTail;
    }
  }

  return dummy.next;
}

/**
 * 从 head 开始分离出 size 个节点，返回剩余部分的头
 */
function split(head, size) {
  // 移动 size-1 步到达要断开的位置
  for (let i = 1; head && i < size; i++) {
    head = head.next;
  }
  // head 为 null 或者不足 size 个
  if (!head) return null;

  // 记录下一部分的头，断开连接
  const next = head.next;
  head.next = null;
  return next;
}

/**
 * 合并两个有序链表，返回 [合并后的头, 尾节点]
 */
function mergeWithTail(l1, l2) {
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // 接上剩余部分
  curr.next = l1 || l2;

  // 找到尾节点
  while (curr.next) curr = curr.next;

  // 返回头和尾
  return [dummy.next, curr];
}`,
        explanation: `## 自底向上归并排序

### 核心思想

不用递归，改用迭代：从小的子链表开始合并，逐渐扩大。

\`\`\`
原链表：4 → 2 → 1 → 3

size=1: 合并相邻的 1 个节点
  [4] + [2] → [2,4]
  [1] + [3] → [1,3]
  结果：2 → 4 → 1 → 3

size=2: 合并相邻的 2 个节点
  [2,4] + [1,3] → [1,2,3,4]
  结果：1 → 2 → 3 → 4
\`\`\`

### 执行过程详解

| 轮次 | size | 合并操作 | 结果 |
|------|------|----------|------|
| 1 | 1 | (4,2) (1,3) | 2→4→1→3 |
| 2 | 2 | (2→4, 1→3) | 1→2→3→4 |

### split 函数图解

\`\`\`
split(2→4→1→3, 2)

移动 1 步：停在 4
断开：2→4 | 1→3
返回：1（右半部分的头）
\`\`\`

### 为什么需要返回尾节点？

因为每次合并后，需要将新合并的链表接到已排序部分的尾部：

\`\`\`
tail.next = merged;  // 接入
tail = newTail;      // 更新尾指针
\`\`\`

### 与递归版本对比

| 对比项 | 自顶向下（递归） | 自底向上（迭代） |
|--------|------------------|------------------|
| 空间 | O(log n) | O(1) |
| 实现 | 简洁 | 较复杂 |
| 思路 | 分治 | 模拟合并过程 |

### 适用场景

- 链表非常长，担心递归栈溢出
- 对空间复杂度有严格要求`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 16. 随机链表的复制 (138)
  {
    id: "copy-list-with-random-pointer",
    leetcodeId: 138,
    title: "随机链表的复制",
    titleEn: "Copy List with Random Pointer",
    difficulty: "medium",
    category: "linked-list",
    tags: ["哈希表", "链表"],
    frontendRelevance: "medium",
    frontendNote: "复杂链表复制",
    description: `给你一个长度为 n 的链表，每个节点包含一个额外增加的随机指针 random ，该指针可以指向链表中的任何节点或空节点。

构造这个链表的 深拷贝。深拷贝应该正好由 n 个 全新 节点组成，其中每个新节点的值都设为其对应的原节点的值。新节点的 next 指针和 random 指针也都应指向复制链表中的新节点，并使原链表和复制链表中的这些指针能够表示相同的链表状态。复制链表中的指针都不应指向原链表中的节点。

返回复制链表的头节点。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
解释：深拷贝整个链表
\`\`\`

**示例 2：**
\`\`\`
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
解释：两个节点互相指向
\`\`\``,
    constraints: `- \`0 <= n <= 1000\`
- \`-10^4 <= Node.val <= 10^4\`
- \`Node.random\` 为 \`null\` 或指向链表中的节点`,
    initialCode: `function copyRandomList(head) {
  // 在此处编写代码
}`,
    solution: `function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();

  // 第一遍：创建所有节点
  let curr = head;
  while (curr) {
    map.set(curr, new Node(curr.val, null, null));
    curr = curr.next;
  }

  // 第二遍：连接 next 和 random
  curr = head;
  while (curr) {
    const copy = map.get(curr);
    copy.next = map.get(curr.next) || null;
    copy.random = map.get(curr.random) || null;
    curr = curr.next;
  }

  return map.get(head);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[7,null],[13,0],[11,4],[10,2],[1,0]]],
        expected: [[7,null],[13,0],[11,4],[10,2],[1,0]]
      },
      {
        id: "2",
        name: "示例2",
        input: [[[1,1],[2,1]]],
        expected: [[1,1],[2,1]]
      }
    ],
    hints: [
      "使用哈希表建立原节点到新节点的映射",
      "或者在原链表中穿插新节点",
      "两次遍历：第一次创建节点，第二次连接指针"
    ],
    explanation: `## 解题思路

### 哈希表法

1. 第一次遍历：创建所有新节点，用哈希表映射 原节点 -> 新节点
2. 第二次遍历：根据映射连接 next 和 random 指针

### O(1) 空间法

1. 在每个原节点后插入复制节点
2. 根据原节点的 random 设置复制节点的 random
3. 分离原链表和复制链表`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["clone-graph"],
    solutions: [
      {
        name: "哈希表（推荐）",
        code: `/**
 * 随机链表的复制 - 哈希表法
 *
 * 核心思想：
 * 使用哈希表建立原节点到新节点的映射关系：
 * 1. 第一次遍历：为每个原节点创建对应的新节点，存入哈希表
 * 2. 第二次遍历：根据映射关系设置新节点的 next 和 random 指针
 *
 * 难点分析：
 * - 普通链表复制只需要处理 next 指针，一次遍历即可
 * - 带 random 指针的链表，random 可能指向后面还未创建的节点
 * - 解决方案：先创建所有节点，再统一设置指针
 *
 * 时间复杂度：O(n) - 两次遍历
 * 空间复杂度：O(n) - 哈希表存储 n 个映射
 */
function copyRandomList(head) {
  // 空链表直接返回
  if (!head) return null;

  // 哈希表：原节点 -> 新节点
  const map = new Map();

  // 第一遍遍历：创建所有新节点
  // 此时只创建节点，不设置任何指针
  let curr = head;
  while (curr) {
    // 创建新节点，值相同，next 和 random 暂时为 null
    map.set(curr, new Node(curr.val, null, null));
    curr = curr.next;
  }

  // 第二遍遍历：设置 next 和 random 指针
  curr = head;
  while (curr) {
    // 获取当前原节点对应的新节点
    const copy = map.get(curr);

    // 设置 next：原节点的 next 对应的新节点
    // 如果 curr.next 为 null，map.get 返回 undefined，用 || null 处理
    copy.next = map.get(curr.next) || null;

    // 设置 random：原节点的 random 对应的新节点
    copy.random = map.get(curr.random) || null;

    curr = curr.next;
  }

  // 返回新链表的头节点
  return map.get(head);
}`,
        explanation: `## 哈希表法

### 核心思想

用哈希表解决"random 可能指向未创建节点"的问题：

\`\`\`
原链表：A -> B -> C
        ↓    ↓    ↓
random: C    A    B

哈希表：
A -> A'
B -> B'
C -> C'

设置指针：
A'.random = map.get(A.random) = map.get(C) = C'
\`\`\`

### 执行过程示例

原链表：[7,null] -> [13,0] -> [11,4]

**第一遍：创建节点**

| 原节点 | 新节点 | Map 状态 |
|--------|--------|----------|
| 7 | 7' | {7→7'} |
| 13 | 13' | {7→7', 13→13'} |
| 11 | 11' | {7→7', 13→13', 11→11'} |

**第二遍：设置指针**

| curr | copy.next | copy.random |
|------|-----------|-------------|
| 7 | map.get(13) = 13' | map.get(null) = null |
| 13 | map.get(11) = 11' | map.get(7) = 7' |
| 11 | map.get(null) = null | ... |

### 为什么需要两遍遍历？

\`\`\`
如果只遍历一遍：
处理节点 A 时，A.random 可能指向节点 C
但此时 C 对应的新节点还没创建！

所以必须：
1. 第一遍：创建所有节点
2. 第二遍：设置所有指针
\`\`\`

### 空间复杂度分析

- 哈希表存储 n 个键值对：O(n)
- 新链表本身也需要 O(n) 空间，但这是输出，不算额外空间`,
        animation: {
          type: "linked-list" as const,
          title: "随机链表复制演示",
          steps: [
            {
              nodes: [
                { value: 7, id: "7" },
                { value: 13, id: "13" },
                { value: 11, id: "11" },
              ],
              pointers: { "7": ["head"] },
              description: "原链表: 7→13→11，每个节点有 random 指针",
            },
            {
              nodes: [
                { value: 7, id: "7" },
                { value: 13, id: "13" },
                { value: 11, id: "11" },
                { value: "7'", id: "7c" },
              ],
              pointers: { "7": ["curr"], "7c": ["新建"] },
              highlights: [{ nodeIds: ["7", "7c"], color: "blue" as const }],
              description: "第一遍：遍历原链表，为每个节点创建对应的新节点。Map: {7→7'}",
            },
            {
              nodes: [
                { value: 7, id: "7" },
                { value: 13, id: "13" },
                { value: 11, id: "11" },
                { value: "7'", id: "7c" },
                { value: "13'", id: "13c" },
              ],
              pointers: { "13": ["curr"], "13c": ["新建"] },
              highlights: [{ nodeIds: ["13", "13c"], color: "blue" as const }],
              description: "继续创建节点。Map: {7→7', 13→13'}",
            },
            {
              nodes: [
                { value: 7, id: "7" },
                { value: 13, id: "13" },
                { value: 11, id: "11" },
                { value: "7'", id: "7c" },
                { value: "13'", id: "13c" },
                { value: "11'", id: "11c" },
              ],
              pointers: { "11": ["curr"], "11c": ["新建"] },
              highlights: [{ nodeIds: ["11", "11c"], color: "blue" as const }],
              description: "创建完成。Map: {7→7', 13→13', 11→11'}",
            },
            {
              nodes: [
                { value: "7'", id: "7c" },
                { value: "13'", id: "13c" },
                { value: "11'", id: "11c" },
              ],
              pointers: { "7c": ["设置next"] },
              highlights: [{ nodeIds: ["7c", "13c"], color: "yellow" as const }],
              description: "第二遍：设置 next 指针。7'.next = map.get(13) = 13'",
            },
            {
              nodes: [
                { value: "7'", id: "7c" },
                { value: "13'", id: "13c" },
                { value: "11'", id: "11c" },
              ],
              pointers: { "7c": ["head'"] },
              highlights: [{ nodeIds: ["7c", "13c", "11c"], color: "green" as const }],
              description: "完成！新链表 7'→13'→11'，random 指针也正确设置",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "O(1) 空间（穿插法）",
        code: `/**
 * 随机链表的复制 - 穿插法（O(1) 空间）
 *
 * 核心思想：
 * 不使用哈希表，而是将新节点直接插入到原节点后面：
 * A -> B -> C  变成  A -> A' -> B -> B' -> C -> C'
 *
 * 这样，原节点的 random 指向的节点的下一个就是对应的新节点！
 * 即：A'.random = A.random.next
 *
 * 三步走：
 * 1. 在每个原节点后插入复制节点
 * 2. 设置复制节点的 random 指针
 * 3. 分离原链表和复制链表
 *
 * 时间复杂度：O(n) - 三次遍历
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function copyRandomList(head) {
  if (!head) return null;

  // 第一步：在每个原节点后插入复制节点
  // A -> B -> C 变成 A -> A' -> B -> B' -> C -> C'
  let curr = head;
  while (curr) {
    // 创建复制节点，next 指向原节点的 next
    const copy = new Node(curr.val, curr.next, null);
    // 原节点的 next 指向复制节点
    curr.next = copy;
    // 移动到下一个原节点（即 copy.next）
    curr = copy.next;
  }

  // 第二步：设置复制节点的 random 指针
  // 关键：如果 A.random = C，那么 A'.random = C'
  // 而 C' = C.next，所以 A'.random = A.random.next
  curr = head;
  while (curr) {
    // curr.next 是复制节点
    if (curr.random) {
      // curr.random.next 是 curr.random 对应的复制节点
      curr.next.random = curr.random.next;
    }
    // 移动到下一个原节点（跳过复制节点）
    curr = curr.next.next;
  }

  // 第三步：分离原链表和复制链表
  // 需要同时恢复原链表和构建复制链表
  const dummy = new Node(0);
  let copyTail = dummy;
  curr = head;
  while (curr) {
    // 将复制节点接入复制链表
    copyTail.next = curr.next;
    copyTail = copyTail.next;

    // 恢复原链表的 next
    curr.next = curr.next.next;
    curr = curr.next;
  }

  return dummy.next;
}`,
        explanation: `## 穿插法（O(1) 空间）

### 核心思想

利用链表结构本身来存储映射关系：将新节点插入到原节点后面。

\`\`\`
原链表：A -> B -> C

步骤1：穿插
A -> A' -> B -> B' -> C -> C'

关键洞察：
A' = A.next
B' = B.next
如果 A.random = C，那么 A'.random = C' = C.next = A.random.next
\`\`\`

### 三步走详解

**步骤1：穿插新节点**

\`\`\`
原：7 -> 13 -> 11

穿插后：7 -> 7' -> 13 -> 13' -> 11 -> 11'
\`\`\`

**步骤2：设置 random**

\`\`\`
假设 13.random = 7

则 13'.random = 13.random.next = 7.next = 7'

代码：curr.next.random = curr.random.next
\`\`\`

**步骤3：分离**

\`\`\`
穿插：7 -> 7' -> 13 -> 13' -> 11 -> 11'

分离：
原：7 -> 13 -> 11
新：7' -> 13' -> 11'
\`\`\`

### 图示

\`\`\`
步骤1后：
┌──────────────────────────┐
↓                          │
7 -> 7' -> 13 -> 13' -> 11 -> 11'
          ↑     │
          └─────┘ (random)

步骤2：设置 random
7'.random = 7.random?.next
13'.random = 13.random.next = 7.next = 7'

步骤3：分离
原：7 ────→ 13 ────→ 11
新：7' ───→ 13' ───→ 11'
\`\`\`

### 为什么是 O(1) 空间？

- 不需要哈希表
- 只使用了几个指针变量
- 新链表是输出，不算额外空间

### 注意事项

- 步骤3 必须同时恢复原链表
- 如果不恢复，原链表会被破坏`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  // 11. 两两交换链表中的节点 (24)
  {
    id: "swap-nodes-in-pairs",
    leetcodeId: 24,
    title: "两两交换链表中的节点",
    titleEn: "Swap Nodes in Pairs",
    difficulty: "medium" as const,
    category: "linked-list",
    tags: ["Linked List", "Recursion"],
    frontendRelevance: "medium",
    frontendNote: "链表节点交换",
    description: `给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。`,
    examples: `**示例 1：**
\`\`\`
输入：head = [1,2,3,4]
输出：[2,1,4,3]
\`\`\`

**示例 2：**
\`\`\`
输入：head = []
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：head = [1]
输出：[1]
\`\`\``,
    constraints: `- 链表中节点的数目在范围 [0, 100] 内
- 0 <= Node.val <= 100`,
    initialCode: `function swapPairs(head: ListNode | null): ListNode | null {
  // 在这里写你的代码
}`,
    solution: `function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;

    // 交换
    first.next = second.next;
    second.next = first;
    prev.next = second;

    prev = first;
  }

  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "标准情况", input: [[1, 2, 3, 4]], expected: [2, 1, 4, 3] },
      { id: "2", name: "空链表", input: [[]], expected: [] },
      { id: "3", name: "单节点", input: [[1]], expected: [1] },
    ],
    hints: [
      "使用虚拟头节点简化边界处理",
      "每次交换需要操作三个指针",
      "也可以使用递归解法",
    ],
    explanation: `## 解题思路

### 迭代法
使用虚拟头节点，每次处理两个节点的交换。

### 交换过程
对于 prev -> first -> second -> next：
1. first.next = next
2. second.next = first
3. prev.next = second

结果：prev -> second -> first -> next`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "迭代法",
        animation: {
          type: "two-pointers" as const,
          title: "迭代两两交换节点演示",
          steps: [
            {
              array: ["d", "1", "2", "3", "4"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "gray" as const, label: "prev" },
                { indices: [1, 2], color: "yellow" as const, label: "交换" },
              ],
              description: "prev=dummy，first=1，second=2",
            },
            {
              array: ["d", "2", "1", "3", "4"],
              left: 2,
              right: 4,
              highlights: [
                { indices: [1, 2], color: "green" as const, label: "已交换" },
                { indices: [3, 4], color: "yellow" as const, label: "交换" },
              ],
              description: "1和2交换完成，继续处理3和4",
            },
            {
              array: ["2", "1", "4", "3"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "完成" }],
              description: "结果：2→1→4→3",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 两两交换链表中的节点 - 迭代法
 *
 * 核心思想：
 * 使用虚拟头节点，每次处理相邻的两个节点进行交换。
 * 需要维护三个指针：prev（前驱）、first（第一个待交换）、second（第二个待交换）
 *
 * 交换过程（对于 prev -> first -> second -> next）：
 * 1. first.next = next（first 指向 second 后面）
 * 2. second.next = first（second 指向 first）
 * 3. prev.next = second（prev 指向 second）
 * 结果：prev -> second -> first -> next
 *
 * 时间复杂度：O(n) - 遍历链表一次
 * 空间复杂度：O(1) - 只使用常数指针变量
 */
function swapPairs(head: ListNode | null): ListNode | null {
  // 虚拟头节点：简化头节点的处理
  const dummy = new ListNode(0, head);
  // prev 指向待交换的两个节点的前一个
  let prev = dummy;

  // 只要还有至少两个节点可以交换
  while (prev.next && prev.next.next) {
    // 定位待交换的两个节点
    const first = prev.next;        // 第一个节点
    const second = prev.next.next;  // 第二个节点

    // 执行交换（三步操作）
    // 步骤1：first 的 next 指向 second 后面的节点
    first.next = second.next;
    // 步骤2：second 的 next 指向 first（二者交换位置）
    second.next = first;
    // 步骤3：prev 指向 second（second 成为新的第一个）
    prev.next = second;

    // 移动到下一对：prev 移到 first（交换后 first 在后面）
    prev = first;
  }

  // 返回虚拟头节点的 next
  return dummy.next;
}`,
        explanation: `## 迭代法

### 核心思路

每次找到相邻的两个节点，执行交换，然后移动到下一对。

\`\`\`
原链表：1 -> 2 -> 3 -> 4

第一对：交换 1,2
dummy -> 2 -> 1 -> 3 -> 4

第二对：交换 3,4
dummy -> 2 -> 1 -> 4 -> 3

结果：2 -> 1 -> 4 -> 3
\`\`\`

### 交换过程图解

\`\`\`
交换前：
prev -> first -> second -> next

步骤1：first.next = next
prev -> first ──┐
       second -> next
               ↓
             first

步骤2：second.next = first
prev -> first
       second -> first -> next

步骤3：prev.next = second
prev -> second -> first -> next

交换完成！
\`\`\`

### 执行过程示例

链表：1 -> 2 -> 3 -> 4

| 轮次 | prev | first | second | 操作 | 链表状态 |
|------|------|-------|--------|------|----------|
| 初始 | dummy | 1 | 2 | - | dummy→1→2→3→4 |
| 1 | dummy | 1 | 2 | 交换 | dummy→2→1→3→4 |
| 2 | 1 | 3 | 4 | 交换 | dummy→2→1→4→3 |
| 结束 | 3 | null | - | 停止 | 2→1→4→3 |

### 为什么需要虚拟头节点？

如果没有 dummy，第一对交换后需要更新 head：
- 原来：head = 1
- 交换后：head = 2

使用 dummy 后，直接返回 dummy.next 即可`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "递归法",
        animation: {
          type: "two-pointers" as const,
          title: "递归两两交换节点演示",
          steps: [
            {
              array: ["1", "2", "3", "4"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "交换" }],
              description: "交换1和2，递归处理[3,4]",
            },
            {
              array: ["2", "1", "→", "swap([3,4])"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "已交换" }],
              description: "1和2交换完成，递归处理后续",
            },
            {
              array: ["2", "1", "4", "3"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0, 1, 2, 3], color: "green" as const, label: "完成" }],
              description: "结果：2→1→4→3",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 两两交换链表中的节点 - 递归法
 *
 * 核心思想：
 * 递归的本质是将问题分解为子问题：
 * - 交换前两个节点
 * - 递归处理剩余节点
 * - 连接结果
 *
 * 递归定义：
 * swapPairs([1,2,3,4]) = 交换(1,2) + swapPairs([3,4])
 *                      = [2,1] + [4,3]
 *                      = [2,1,4,3]
 *
 * 时间复杂度：O(n) - 每个节点处理一次
 * 空间复杂度：O(n) - 递归调用栈深度（n/2 层）
 */
function swapPairs(head: ListNode | null): ListNode | null {
  // 递归终止条件：没有节点或只有一个节点，无法交换
  if (!head || !head.next) {
    return head;
  }

  // newHead 将成为交换后的头节点（原来的第二个节点）
  const newHead = head.next;

  // 递归处理剩余节点（从第三个节点开始）
  // head.next 指向递归结果，完成连接
  head.next = swapPairs(newHead.next);

  // 完成交换：newHead 的 next 指向 head
  newHead.next = head;

  // 返回新的头节点
  return newHead;
}`,
        explanation: `## 递归法

### 递归思路

将问题分解：**交换前两个** + **递归处理剩余**

\`\`\`
swapPairs(1→2→3→4)
= 交换(1,2) 连接 swapPairs(3→4)
= 2→1 连接 (交换(3,4) 连接 swapPairs(null))
= 2→1 连接 4→3
= 2→1→4→3
\`\`\`

### 递归过程图解

\`\`\`
swapPairs(1→2→3→4)
├─ newHead = 2
├─ head.next = swapPairs(3→4)
│  ├─ newHead = 4
│  ├─ head.next = swapPairs(null)
│  │  └─ 返回 null
│  ├─ 3.next = null
│  ├─ 4.next = 3
│  └─ 返回 4→3
├─ 1.next = 4→3
├─ 2.next = 1
└─ 返回 2→1→4→3
\`\`\`

### 代码解读

\`\`\`javascript
// 假设处理 1→2→3→4
const newHead = head.next;        // newHead = 2
head.next = swapPairs(newHead.next); // 1.next = swapPairs(3) = 4→3
newHead.next = head;              // 2.next = 1
return newHead;                   // 返回 2
// 结果：2→1→4→3
\`\`\`

### 与迭代法对比

| 对比项 | 迭代法 | 递归法 |
|--------|--------|--------|
| 空间 | O(1) | O(n) |
| 代码 | 稍长 | 简洁 |
| 思路 | 循环处理每对 | 分治思想 |

### 注意事项

- 递归深度是 n/2（每次处理 2 个节点）
- 链表很长时可能栈溢出`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },
  // 12. 合并 K 个升序链表 (23)
  {
    id: "merge-k-sorted-lists",
    leetcodeId: 23,
    title: "合并 K 个升序链表",
    titleEn: "Merge k Sorted Lists",
    difficulty: "hard" as const,
    category: "linked-list",
    tags: ["Linked List", "Divide and Conquer", "Heap", "Merge Sort"],
    frontendRelevance: "low",
    frontendNote: "合并K链表，堆/分治",
    description: `给你一个链表数组，每个链表都已经按升序排列。

请你将所有链表合并到一个升序链表中，返回合并后的链表。`,
    examples: `**示例 1：**
\`\`\`
输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到：
1->1->2->3->4->4->5->6
\`\`\`

**示例 2：**
\`\`\`
输入：lists = []
输出：[]
\`\`\`

**示例 3：**
\`\`\`
输入：lists = [[]]
输出：[]
\`\`\``,
    constraints: `- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] 按升序排列
- lists[i].length 的总和不超过 10^4`,
    initialCode: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 在这里写你的代码
}`,
    solution: `function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null;

  // 分治合并
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}

function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}`,
    testCases: [
      { id: "1", name: "多个链表", input: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
      { id: "2", name: "空数组", input: [[]], expected: [] },
      { id: "3", name: "包含空链表", input: [[[]]],  expected: [] },
    ],
    hints: [
      "可以使用分治法，两两合并链表",
      "也可以使用最小堆维护 k 个链表的头节点",
      "先实现合并两个链表的函数",
    ],
    explanation: `## 解题思路

### 分治法
将 k 个链表两两配对合并，重复此过程直到只剩一个链表。

### 时间复杂度分析
- 每轮合并：O(N)，N 是所有节点总数
- 合并轮数：O(log k)
- 总时间：O(N log k)`,
    timeComplexity: "O(N log k)",
    spaceComplexity: "O(log k)",
    solutions: [
      {
        name: "分治合并",
        code: `/**
 * 合并 K 个升序链表 - 分治合并法
 *
 * 核心思想：
 * 借鉴归并排序的分治思想，将 k 个链表两两配对合并：
 * - 第一轮：将 k 个链表两两合并成 k/2 个
 * - 第二轮：将 k/2 个链表两两合并成 k/4 个
 * - 依此类推，直到合并成一个链表
 *
 * 为什么分治比顺序合并快？
 * - 顺序合并：每次合并长度递增，第 i 次合并处理 i*avg 长度，总共 O(N*k)
 * - 分治合并：每轮所有元素只被处理一次，共 log k 轮，总共 O(N*log k)
 *
 * 时间复杂度：O(N log k) - N 是所有节点总数，log k 轮合并
 * 空间复杂度：O(log k) - 存储中间合并结果，最多 log k 层
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 边界情况：空数组直接返回 null
  if (lists.length === 0) return null;

  // 两两合并，直到只剩一个链表
  // 使用迭代方式实现分治，避免递归栈开销
  while (lists.length > 1) {
    const merged: Array<ListNode | null> = [];  // 存储本轮合并结果

    // 两两配对合并
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];                                      // 第一个链表
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;   // 第二个链表（可能不存在）
      merged.push(mergeTwoLists(l1, l2));                       // 合并两个链表
    }

    lists = merged;  // 用合并结果替换原数组，进入下一轮
  }

  return lists[0];  // 最终只剩一个链表
}

/**
 * 辅助函数：合并两个有序链表
 * 使用哨兵节点简化边界处理
 */
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);  // 哨兵节点，简化头节点处理
  let curr = dummy;               // 当前节点指针

  // 同时遍历两个链表，取较小值连接到结果链表
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;   // l1 较小，连接 l1
      l1 = l1.next;     // l1 后移
    } else {
      curr.next = l2;   // l2 较小，连接 l2
      l2 = l2.next;     // l2 后移
    }
    curr = curr.next;   // 结果指针后移
  }

  // 连接剩余部分（l1 或 l2 中非空的那个）
  curr.next = l1 || l2;

  return dummy.next;  // 返回哨兵节点的下一个节点
}`,
        explanation: `## 分治合并

### 思路
借鉴归并排序的分治思想，将 k 个链表两两配对合并：

\`\`\`
初始: [L1, L2, L3, L4, L5, L6, L7, L8]
           ↓ 两两合并
第一轮: [L12, L34, L56, L78]
           ↓ 两两合并
第二轮: [L1234, L5678]
           ↓ 两两合并
第三轮: [L12345678]
\`\`\`

### 为什么分治更高效？

| 方法 | 每次合并 | 合并次数 | 总时间 |
|------|---------|---------|--------|
| 顺序合并 | 长度递增 | k-1 次 | O(N×k) |
| 分治合并 | 长度相近 | log k 轮 | O(N×log k) |

关键区别：顺序合并时，前面的节点会被重复处理很多次；分治合并时，每轮每个节点只处理一次。

### 执行示例
合并 [1→4→5], [1→3→4], [2→6]：

\`\`\`
第一轮:
  合并 [1→4→5] 和 [1→3→4] → [1→1→3→4→4→5]
  合并 [2→6] 和 null → [2→6]
  结果: [[1→1→3→4→4→5], [2→6]]

第二轮:
  合并 [[1→1→3→4→4→5], [2→6]] → [1→1→2→3→4→4→5→6]
\`\`\`

### 复杂度分析
- **时间复杂度**：O(N log k)
  - 共 log k 轮合并
  - 每轮处理所有 N 个节点
- **空间复杂度**：O(log k)
  - 每轮需要存储中间结果数组`,
        animation: {
          type: "linked-list" as const,
          title: "合并 K 个升序链表演示",
          steps: [
            {
              nodes: [
                { value: "1→4→5", id: "l1" },
                { value: "1→3→4", id: "l2" },
                { value: "2→6", id: "l3" },
              ],
              pointers: {},
              highlights: [
                { nodeIds: ["l1"], color: "blue" as const },
                { nodeIds: ["l2"], color: "green" as const },
                { nodeIds: ["l3"], color: "yellow" as const },
              ],
              description: "初始：3 个有序链表 [1→4→5], [1→3→4], [2→6]",
            },
            {
              nodes: [
                { value: "1→4→5", id: "l1" },
                { value: "1→3→4", id: "l2" },
              ],
              pointers: {},
              highlights: [
                { nodeIds: ["l1", "l2"], color: "yellow" as const, label: "第一对" },
              ],
              description: "第一轮：两两配对。合并 [1→4→5] 和 [1→3→4]",
            },
            {
              nodes: [
                { value: 1, id: "1a" },
                { value: 1, id: "1b" },
                { value: 3, id: "3" },
                { value: 4, id: "4a" },
                { value: 4, id: "4b" },
                { value: 5, id: "5" },
              ],
              pointers: {},
              highlights: [{ nodeIds: ["1a", "1b", "3", "4a", "4b", "5"], color: "blue" as const }],
              description: "合并结果：1→1→3→4→4→5",
            },
            {
              nodes: [
                { value: "1→1→3→4→4→5", id: "m1" },
                { value: "2→6", id: "l3" },
              ],
              pointers: {},
              highlights: [
                { nodeIds: ["m1", "l3"], color: "yellow" as const, label: "第二对" },
              ],
              description: "第二轮：合并 [1→1→3→4→4→5] 和 [2→6]",
            },
            {
              nodes: [
                { value: 1, id: "1a" },
                { value: 1, id: "1b" },
                { value: 2, id: "2" },
                { value: 3, id: "3" },
                { value: 4, id: "4a" },
                { value: 4, id: "4b" },
                { value: 5, id: "5" },
                { value: 6, id: "6" },
              ],
              pointers: { "1a": ["head"] },
              highlights: [{ nodeIds: ["1a", "1b", "2", "3", "4a", "4b", "5", "6"], color: "green" as const }],
              description: "完成！结果: 1→1→2→3→4→4→5→6",
            },
          ] as LinkedListStep[],
        },
        timeComplexity: "O(N log k)",
        spaceComplexity: "O(log k)",
      },
      {
        name: "最小堆",
        animation: {
          type: "two-pointers" as const,
          title: "最小堆合并K个链表演示",
          steps: [
            {
              array: ["1→4→5", "1→3→4", "2→6"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "3个链表" }],
              description: "将3个链表头[1,1,2]加入最小堆",
            },
            {
              array: ["堆:[1,1,2]", "→取出1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "堆" }],
              description: "取出最小1，加入结果，将其next(4)入堆",
            },
            {
              array: ["堆:[1,2,4]", "结果:1→1→..."],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "结果" }],
              description: "重复取出最小元素...",
            },
            {
              array: ["1→1→2→3→4→4→5→6"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "堆空，合并完成！",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 合并 K 个升序链表 - 最小堆法
 *
 * 核心思想：
 * 使用最小堆维护 k 个链表当前的最小元素候选：
 * 1. 将所有链表的头节点放入最小堆
 * 2. 每次从堆中取出最小元素，加入结果链表
 * 3. 如果取出的节点有下一个节点，将其放入堆中
 * 4. 重复直到堆为空
 *
 * 最小堆的优势：
 * - 始终能在 O(log k) 时间内找到 k 个候选中的最小值
 * - 比顺序扫描 k 个链表头部的 O(k) 更高效
 *
 * 时间复杂度：O(N log k) - 每个节点入堆出堆各一次，每次 O(log k)
 * 空间复杂度：O(k) - 堆中最多 k 个元素
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 使用数组模拟最小堆
  // 堆的性质：父节点的值 <= 子节点的值
  const heap: ListNode[] = [];

  // 初始化堆：将所有非空链表的头节点加入堆
  for (const list of lists) {
    if (list) heap.push(list);
  }

  // 建堆：从最后一个非叶子节点开始，自底向上调整
  // 最后一个非叶子节点的索引 = Math.floor(heap.length / 2) - 1
  for (let i = Math.floor(heap.length / 2) - 1; i >= 0; i--) {
    heapifyDown(heap, i);
  }

  const dummy = new ListNode(0);  // 哨兵节点
  let curr = dummy;               // 结果链表的尾指针

  // 不断取出最小元素，直到堆为空
  while (heap.length > 0) {
    // 取出堆顶元素（最小值）
    const min = heap[0];
    curr.next = min;    // 将最小节点加入结果链表
    curr = curr.next;   // 移动尾指针

    if (min.next) {
      // 如果取出的节点还有下一个，将下一个节点放到堆顶并下沉调整
      heap[0] = min.next;
      heapifyDown(heap, 0);
    } else {
      // 如果没有下一个节点，需要从堆中移除
      // 技巧：用堆尾元素替换堆顶，然后下沉调整
      heap[0] = heap[heap.length - 1];
      heap.pop();
      if (heap.length > 0) heapifyDown(heap, 0);
    }
  }

  return dummy.next;
}

/**
 * 堆的下沉操作（heapify down）
 * 将位置 i 的元素下沉到正确位置，维护最小堆性质
 *
 * @param heap - 堆数组
 * @param i - 需要下沉的元素索引
 */
function heapifyDown(heap: ListNode[], i: number): void {
  const n = heap.length;

  while (true) {
    let smallest = i;            // 假设当前节点最小
    const left = 2 * i + 1;      // 左子节点索引
    const right = 2 * i + 2;     // 右子节点索引

    // 如果左子节点存在且更小，更新 smallest
    if (left < n && heap[left].val < heap[smallest].val) {
      smallest = left;
    }
    // 如果右子节点存在且更小，更新 smallest
    if (right < n && heap[right].val < heap[smallest].val) {
      smallest = right;
    }

    // 如果当前节点已经是最小的，停止下沉
    if (smallest === i) break;

    // 交换当前节点和最小子节点
    [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
    i = smallest;  // 继续下沉
  }
}`,
        explanation: `## 最小堆法

### 思路
使用最小堆维护 k 个链表当前的最小候选元素：

\`\`\`
k 个链表:
  [1] → 4 → 5
  [1] → 3 → 4
  [2] → 6

最小堆（只存头节点）: [1, 1, 2]

每次取出最小元素，并将其 next 加入堆
\`\`\`

### 堆的操作

1. **建堆**：O(k) 时间将 k 个头节点组织成堆
2. **取最小**：O(1) 时间获取堆顶
3. **调整堆**：O(log k) 时间维护堆性质

### 执行示例

\`\`\`
初始堆: [1(L1), 1(L2), 2(L3)]  结果: []

Step 1: 取出 1(L1)，加入 4(L1.next)
  堆: [1(L2), 4(L1), 2(L3)]    结果: [1]

Step 2: 取出 1(L2)，加入 3(L2.next)
  堆: [2(L3), 4(L1), 3(L2)]    结果: [1→1]

Step 3: 取出 2(L3)，加入 6(L3.next)
  堆: [3(L2), 4(L1), 6(L3)]    结果: [1→1→2]

Step 4: 取出 3(L2)，加入 4(L2.next)
  堆: [4(L1), 4(L2), 6(L3)]    结果: [1→1→2→3]

...继续直到堆为空
最终结果: [1→1→2→3→4→4→5→6]
\`\`\`

### 堆数组索引关系

\`\`\`
       0 (根)
      / \\
     1   2
    / \\
   3   4

父节点 i 的子节点: 左=2i+1, 右=2i+2
子节点 i 的父节点: Math.floor((i-1)/2)
\`\`\`

### 复杂度分析
- **时间复杂度**：O(N log k)
  - 建堆 O(k)
  - 每个节点出堆入堆各一次，每次 O(log k)
  - 总共 N 个节点
- **空间复杂度**：O(k)
  - 堆中最多同时存在 k 个元素`,
        timeComplexity: "O(N log k)",
        spaceComplexity: "O(k)",
      },
      {
        name: "顺序合并",
        animation: {
          type: "two-pointers" as const,
          title: "顺序合并K个链表演示",
          steps: [
            {
              array: ["1→4→5", "1→3→4", "2→6"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "3个链表" }],
              description: "依次合并：result=[], 遍历链表",
            },
            {
              array: ["1→1→3→4→4→5", "2→6"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "green" as const, label: "合并后" }],
              description: "合并list1和list2得到新链表",
            },
            {
              array: ["1→1→2→3→4→4→5→6"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "再合并list3，完成！",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 合并 K 个升序链表 - 顺序合并法
 *
 * 核心思想：
 * 最直观的方法 - 依次将链表合并到结果中：
 * 1. 用第一个链表作为初始结果
 * 2. 依次将第 2、3、4...k 个链表合并到结果中
 *
 * 缺点分析：
 * 设每个链表平均长度为 n，共 k 个链表
 * - 第 1 次合并：处理 2n 个节点
 * - 第 2 次合并：处理 3n 个节点
 * - 第 k-1 次合并：处理 kn 个节点
 * - 总计：n(2+3+...+k) = O(n*k²) = O(N*k)
 *
 * 时间复杂度：O(N × k) - N 是总节点数，最坏情况下效率较低
 * 空间复杂度：O(1) - 只使用常数额外空间
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  // 边界情况：空数组
  if (lists.length === 0) return null;

  // 用第一个链表初始化结果
  let result = lists[0];

  // 依次将后续链表合并到结果中
  for (let i = 1; i < lists.length; i++) {
    result = mergeTwoLists(result, lists[i]);
  }

  return result;
}

/**
 * 辅助函数：合并两个有序链表
 * 使用哨兵节点简化边界处理
 */
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);  // 哨兵节点
  let curr = dummy;               // 当前指针

  // 同时遍历两个链表
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;   // 取 l1 的节点
      l1 = l1.next;
    } else {
      curr.next = l2;   // 取 l2 的节点
      l2 = l2.next;
    }
    curr = curr.next;
  }

  // 连接剩余部分
  curr.next = l1 || l2;

  return dummy.next;
}`,
        explanation: `## 顺序合并

### 思路
最简单直观的方法：依次将链表合并到结果中。

\`\`\`
lists = [L1, L2, L3, L4]

result = L1
result = merge(result, L2)  // 合并 L1+L2
result = merge(result, L3)  // 合并 L1+L2+L3
result = merge(result, L4)  // 合并 L1+L2+L3+L4
\`\`\`

### 为什么效率不如分治？

设每个链表平均长度 n，共 k 个链表：

| 合并次数 | 处理节点数 |
|---------|-----------|
| 第 1 次 | n + n = 2n |
| 第 2 次 | 2n + n = 3n |
| 第 3 次 | 3n + n = 4n |
| ... | ... |
| 第 k-1 次 | (k-1)n + n = kn |

**总节点处理数**: n × (2+3+...+k) = n × k(k+1)/2 - n = O(n×k²)

由于 N = n×k，所以时间复杂度为 O(N×k)

### 对比三种方法

| 方法 | 时间复杂度 | 空间复杂度 | 适用场景 |
|------|-----------|-----------|---------|
| 顺序合并 | O(N×k) | O(1) | k 很小时 |
| 分治合并 | O(N log k) | O(log k) | 通用 |
| 最小堆 | O(N log k) | O(k) | 通用 |

### 执行示例

\`\`\`
合并 [1→4], [2→5], [3→6]

第1步: result = [1→4]
第2步: merge([1→4], [2→5]) = [1→2→4→5]
第3步: merge([1→2→4→5], [3→6]) = [1→2→3→4→5→6]
\`\`\`

### 复杂度分析
- **时间复杂度**：O(N × k)
  - 最坏情况下，第 i 次合并需要处理 O(i×n) 个节点
  - 累加得 O(k² × n) = O(N × k)
- **空间复杂度**：O(1)
  - 只使用常数额外空间
  - 这是本方法唯一的优势`,
        timeComplexity: "O(N × k)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
