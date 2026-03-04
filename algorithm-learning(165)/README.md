# Algorithm Learning

164 道 LeetCode 算法题，从项目题库自动提取，可直接在 VSCode 中刷题。

## 快速开始

### 1. 打开题目文件，阅读题意

```
algorithm-learning/07-dynamic-programming/01-climbing-stairs.mjs
```

文件顶部注释包含：题目描述、示例、约束条件、提示。

### 2. 在函数体内编写你的解法

```js
export function climbStairs(n) {
  // 在此处编写你的代码  ← 写在这里
}
```

### 3. 运行测试验证

```bash
cd my-app
node --test algorithm-learning/07-dynamic-programming/01-climbing-stairs.mjs
```

输出示例：
```
# Subtest: 2阶楼梯
ok 1 - 2阶楼梯
# Subtest: 3阶楼梯
ok 2 - 3阶楼梯
# pass 2, fail 0
```

### 4. 卡住了？查看参考答案

同目录下的 `.answer.mjs` 文件包含参考解法：

```
01-climbing-stairs.mjs          ← 题目（你写代码的地方）
01-climbing-stairs.answer.mjs   ← 参考答案
```

## 文件结构

```
algorithm-learning/
├── 01-basic/                          # 基础 (66 题)
│   ├── array/                         #   数组/字符串/哈希表/位运算/数学 (48 题)
│   └── linked-list/                   #   链表 (18 题)
├── 02-sorting/                        # 排序
│   └── advanced/                      #   区间合并等 (4 题)
├── 03-searching/                      # 二分查找 (8 题)
├── 04-stack-and-queue/                # 栈/队列/堆 (13 题)
├── 05-tree/                           # 树
│   └── binary-tree/                   #   二叉树 (23 题)
├── 06-graph/                          # 图 (7 题)
├── 07-dynamic-programming/            # 动态规划 (20 题)
├── 09-backtracking/                   # 回溯 (9 题)
└── 10-two-pointers-and-sliding-window/ # 双指针/滑动窗口 (14 题)
```

## 每道题的文件格式

**题目文件** (`XX-题目名.mjs`)：
```js
/**
 * 70. 爬楼梯 (Climbing Stairs)
 * 难度: easy
 *
 * 题目描述...
 * 示例...
 * 约束条件...
 * 提示...
 */

export function climbStairs(n) {
  // 在此处编写你的代码    ← 你的解法写在这里
}

// ---- 测试用例 ----
test("2阶楼梯", () => { ... });
test("3阶楼梯", () => { ... });
```

**答案文件** (`XX-题目名.answer.mjs`)：
```js
/**
 * 70. 爬楼梯 (Climbing Stairs) - 参考答案
 */
export function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}

// ---- 测试用例 ----  (同题目文件，可直接运行验证)
```

## 推荐学习顺序

| 阶段 | 专题 | 建议 |
|------|------|------|
| 入门 | `01-basic/array` | 从 easy 题开始，熟悉数组操作 |
| 入门 | `01-basic/linked-list` | 掌握链表指针操作 |
| 基础 | `04-stack-and-queue` | 栈的应用场景 |
| 基础 | `03-searching` | 二分查找模板 |
| 基础 | `10-two-pointers-and-sliding-window` | 双指针和滑动窗口套路 |
| 进阶 | `05-tree` | 递归思维训练 |
| 进阶 | `07-dynamic-programming` | 状态转移方程 |
| 进阶 | `09-backtracking` | 回溯模板 |
| 进阶 | `06-graph` | BFS/DFS |

## 批量运行测试

```bash
# 运行某个分类下的所有答案测试
for f in algorithm-learning/07-dynamic-programming/*.answer.mjs; do
  echo "--- $(basename $f) ---"
  node --test "$f"
done

# 运行所有答案测试
for f in $(find algorithm-learning -name '*.answer.mjs'); do
  node --test "$f" 2>/dev/null && echo "PASS: $f" || echo "FAIL: $f"
done
```

## 重新生成题目

如果项目题库有更新，可以重新提取：

```bash
node scripts/extract-problems.mjs
```

此脚本从 `src/app/(algorithms)/problems/data/*.ts` 读取题目数据并生成文件。
