import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const heapProblems: Problem[] = [
  // 1. 数组中的第K个最大元素 (215)
  {
    id: "kth-largest-element",
    leetcodeId: 215,
    title: "数组中的第K个最大元素",
    titleEn: "Kth Largest Element in an Array",
    difficulty: "medium",
    category: "heap",
    tags: ["数组", "分治", "快速选择", "排序", "堆"],
    frontendRelevance: "medium",
    frontendNote: "快速选择/堆",
    description: `给定整数数组 \`nums\` 和整数 \`k\`，请返回数组中第 \`k\` 个最大的元素。

请注意，你需要找的是数组排序后的第 \`k\` 个最大的元素，而不是第 \`k\` 个不同的元素。

你必须设计并实现时间复杂度为 \`O(n)\` 的算法解决此问题。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [3,2,1,5,6,4], k = 2
输出：5
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,3,1,2,4,5,5,6], k = 4
输出：4
\`\`\``,
    constraints: `- \`1 <= k <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\``,
    initialCode: `function findKthLargest(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function findKthLargest(nums, k) {
  // 快速选择算法
  const quickSelect = (left, right, kSmallest) => {
    if (left === right) return nums[left];

    // 随机选择 pivot
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIndex];

    // 将 pivot 移到最右边
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }

    // 将 pivot 放到正确位置
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

    if (storeIndex === kSmallest) {
      return nums[storeIndex];
    } else if (storeIndex < kSmallest) {
      return quickSelect(storeIndex + 1, right, kSmallest);
    } else {
      return quickSelect(left, storeIndex - 1, kSmallest);
    }
  };

  // 第 k 大 = 第 n - k 小
  return quickSelect(0, nums.length - 1, nums.length - k);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[3,2,1,5,6,4], 2],
        expected: 5
      },
      {
        id: "2",
        name: "示例2",
        input: [[3,2,3,1,2,4,5,5,6], 4],
        expected: 4
      }
    ],
    hints: [
      "可以使用快速选择算法，时间复杂度 O(n)",
      "也可以使用最小堆，维护 k 个最大元素",
      "第 k 大等于第 n-k+1 小"
    ],
    explanation: `## 解题思路

### 快速选择算法

1. 类似快速排序，但只递归一边
2. 第 k 大等价于第 n-k 小（0-indexed）
3. 随机选择 pivot 避免最坏情况
4. 根据 pivot 位置决定在哪边继续搜索

### 复杂度分析
- 时间复杂度：平均 O(n)，最坏 O(n²)
- 空间复杂度：O(log n)，递归栈`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(log n)",
    relatedProblems: ["top-k-frequent-elements", "find-median-from-data-stream"],
    solutions: [
      {
        name: "快速选择（推荐）",
        code: `/**
 * 数组中的第K个最大元素 - 快速选择算法
 *
 * 核心思想：基于快速排序的分区思想，只递归一边
 * 第k大 = 第(n-k)小（0-indexed）
 *
 * 算法流程：
 * 1. 随机选择pivot，将数组分为两部分
 * 2. 小于pivot的在左边，大于等于pivot的在右边
 * 3. 根据pivot位置决定在哪边继续搜索
 *
 * 时间复杂度：平均O(n)，最坏O(n²)
 * 空间复杂度：O(log n)递归栈
 */
function findKthLargest(nums, k) {
  /**
   * 快速选择核心函数
   * @param left 搜索区间左边界
   * @param right 搜索区间右边界
   * @param kSmallest 要找的第k小的位置（0-indexed）
   */
  const quickSelect = (left, right, kSmallest) => {
    // 递归终止：区间只有一个元素
    if (left === right) return nums[left];

    /**
     * 随机选择pivot（避免最坏情况）
     *
     * 示例：nums = [3,2,1,5,6,4], 找第2大（即第4小，kSmallest=4）
     */
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    const pivot = nums[pivotIndex];

    // 将pivot移到最右边，方便分区
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    /**
     * 分区过程（Lomuto分区法）
     * storeIndex：指向下一个要放置小于pivot元素的位置
     *
     * 执行示例：假设pivot=4，数组=[3,2,1,5,6,4]
     * 初始：storeIndex=0
     * i=0: 3<4，交换nums[0]和nums[0]，storeIndex=1
     * i=1: 2<4，交换nums[1]和nums[1]，storeIndex=2
     * i=2: 1<4，交换nums[2]和nums[2]，storeIndex=3
     * i=3: 5>=4，不交换
     * i=4: 6>=4，不交换
     * 最后：[3,2,1,5,6,4] → [3,2,1,4,6,5]（pivot放回storeIndex位置）
     */
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];
        storeIndex++;
      }
    }

    // 将pivot放到正确位置
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

    /**
     * 根据pivot位置决定搜索方向
     *
     * storeIndex就是pivot在排序数组中的最终位置
     * - 如果等于kSmallest，找到了
     * - 如果小于kSmallest，在右边找
     * - 如果大于kSmallest，在左边找
     */
    if (storeIndex === kSmallest) {
      return nums[storeIndex];
    } else if (storeIndex < kSmallest) {
      return quickSelect(storeIndex + 1, right, kSmallest);
    } else {
      return quickSelect(left, storeIndex - 1, kSmallest);
    }
  };

  // 第k大 = 第(n-k)小（0-indexed）
  // 例如：第2大 = 第(6-2)=4小（在6个元素中）
  return quickSelect(0, nums.length - 1, nums.length - k);
}`,
        animation: {
          type: "two-pointers" as const,
          title: "第K个最大元素-快速选择演示",
          steps: [
            {
              array: ["3", "2", "1", "5", "6", "4"],
              left: 0,
              right: 5,
              highlights: [],
              description: "nums=[3,2,1,5,6,4], k=2。找第2大=第4小(0-indexed)。选pivot",
            },
            {
              array: ["3", "2", "1", "5", "6", "4"],
              left: 0,
              right: 5,
              highlights: [{ indices: [5], color: "blue" as const, label: "pivot=4" }],
              description: "选择pivot=4。将小于4的放左边，大于等于4的放右边",
            },
            {
              array: ["3", "2", "1", "4", "6", "5"],
              left: 0,
              right: 5,
              highlights: [
                { indices: [0, 1, 2], color: "gray" as const, label: "<4" },
                { indices: [3], color: "green" as const, label: "pivot" },
                { indices: [4, 5], color: "blue" as const, label: ">=4" },
              ],
              description: "分区后：[3,2,1] < 4 <= [6,5]。pivot在位置3，需要找位置4",
            },
            {
              array: ["3", "2", "1", "4", "5", "6"],
              left: 4,
              right: 5,
              highlights: [{ indices: [4], color: "blue" as const, label: "pivot=5" }],
              description: "在右半部分[6,5]继续。选pivot=5，分区后5在位置4",
            },
            {
              array: ["3", "2", "1", "4", "5", "6"],
              left: 4,
              right: 4,
              highlights: [{ indices: [4], color: "green" as const, label: "找到" }],
              description: "位置4正是我们要找的！第2大元素是5",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 快速选择算法

### 思路
1. 类似快速排序，但只递归一边
2. 第 k 大等价于第 n-k 小（0-indexed）
3. 随机选择 pivot 避免最坏情况
4. 根据 pivot 位置决定在哪边继续搜索

### 要点
- 平均 O(n) 时间复杂度
- 随机化避免最坏情况`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(log n)",
      },
      {
        name: "最小堆（大小为 k）",
        code: `/**
 * 数组中的第K个最大元素 - 最小堆法
 *
 * 核心思想：维护一个大小为k的最小堆，堆顶就是第k大元素
 *
 * 原理：
 * - 遍历数组，将元素加入最小堆
 * - 当堆大小超过k时，弹出最小元素
 * - 最终堆中保留k个最大元素，堆顶是其中最小的，即第k大
 *
 * 堆的结构（完全二叉树，用数组表示）：
 * - 父节点索引：Math.floor((i-1)/2)
 * - 左子节点索引：2*i + 1
 * - 右子节点索引：2*i + 2
 *
 * 时间复杂度：O(n log k)
 * 空间复杂度：O(k)
 */
function findKthLargest(nums, k) {
  // 手动实现最小堆
  const minHeap = [];

  /**
   * 向堆中添加元素（上浮操作）
   *
   * 执行过程示例：堆=[2,4,5]，插入3
   * 1. 添加到末尾：[2,4,5,3]
   * 2. 上浮：3和父节点4比较，3<4，交换 → [2,3,5,4]
   * 3. 继续：3和父节点2比较，3>2，停止
   * 最终：[2,3,5,4]
   */
  const push = (val) => {
    minHeap.push(val);
    let i = minHeap.length - 1;
    // 上浮：如果当前节点比父节点小，交换
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent] <= minHeap[i]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  };

  /**
   * 弹出堆顶元素（下沉操作）
   *
   * 执行过程示例：堆=[2,3,5,4]，弹出2
   * 1. 保存堆顶：min=2
   * 2. 将末尾元素放到堆顶：[4,3,5]
   * 3. 下沉：4和子节点(3,5)比较，3最小，4和3交换 → [3,4,5]
   * 最终：[3,4,5]，返回2
   */
  const pop = () => {
    const min = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length > 0) {
      minHeap[0] = last;
      // 下沉操作
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        // 找到当前节点和两个子节点中最小的
        if (left < minHeap.length && minHeap[left] < minHeap[smallest]) {
          smallest = left;
        }
        if (right < minHeap.length && minHeap[right] < minHeap[smallest]) {
          smallest = right;
        }
        if (smallest === i) break;
        [minHeap[i], minHeap[smallest]] = [minHeap[smallest], minHeap[i]];
        i = smallest;
      }
    }
    return min;
  };

  /**
   * 遍历数组，维护大小为k的最小堆
   *
   * 示例：nums=[3,2,1,5,6,4], k=2
   *
   * num=3: push(3), heap=[3], size=1<=2, 不弹出
   * num=2: push(2), heap=[2,3], size=2<=2, 不弹出
   * num=1: push(1), heap=[1,3,2], size=3>2, pop() → heap=[2,3]
   * num=5: push(5), heap=[2,3,5], size=3>2, pop() → heap=[3,5]
   * num=6: push(6), heap=[3,5,6], size=3>2, pop() → heap=[5,6]
   * num=4: push(4), heap=[4,5,6], size=3>2, pop() → heap=[5,6]
   *
   * 最终堆顶=5，即第2大元素
   */
  for (const num of nums) {
    push(num);
    if (minHeap.length > k) {
      pop();
    }
  }

  // 堆顶就是第k大元素
  return minHeap[0];
}`,
        explanation: `## 最小堆（大小为 k）

### 思路
1. 维护一个大小为 k 的最小堆
2. 堆中保存当前最大的 k 个元素
3. 堆顶就是第 k 大的元素

### 要点
- 当堆大小超过 k 时，弹出最小元素
- 最终堆顶即为答案`,
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(k)",
      },
      {
        name: "排序法",
        code: `/**
 * 数组中的第K个最大元素 - 排序法
 *
 * 核心思想：直接排序，取第k个元素
 *
 * 步骤：
 * 1. 将数组降序排序
 * 2. 返回第k-1个元素（0-indexed）
 *
 * 时间复杂度：O(n log n)，排序的时间复杂度
 * 空间复杂度：O(log n)，排序的空间复杂度
 */
function findKthLargest(nums, k) {
  /**
   * 降序排序
   *
   * 示例：nums = [3,2,1,5,6,4], k = 2
   *
   * 排序后：[6,5,4,3,2,1]
   * 第2大 = nums[1] = 5
   */
  nums.sort((a, b) => b - a);

  // 返回第k大元素（索引为k-1）
  return nums[k - 1];
}`,
        explanation: `## 排序法

### 思路
1. 将数组降序排序
2. 返回第 k-1 个元素（0-indexed）

### 特点
- 实现最简单
- 时间复杂度 O(n log n)，不满足 O(n) 要求但可通过`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
      },
    ],
  },

  // 2. 前K个高频元素 (347)
  {
    id: "top-k-frequent-elements",
    leetcodeId: 347,
    title: "前K个高频元素",
    titleEn: "Top K Frequent Elements",
    difficulty: "medium",
    category: "heap",
    tags: ["数组", "哈希表", "分治", "桶排序", "计数", "快速选择", "排序", "堆"],
    frontendRelevance: "medium",
    frontendNote: "前K高频元素",
    description: `给你一个整数数组 \`nums\` 和一个整数 \`k\`，请你返回其中出现频率前 \`k\` 高的元素。你可以按 **任意顺序** 返回答案。`,
    examples: `**示例 1：**
\`\`\`
输入：nums = [1,1,1,2,2,3], k = 2
输出：[1,2]
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [1], k = 1
输出：[1]
\`\`\``,
    constraints: `- \`1 <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`k\` 的取值范围是 \`[1, 数组中不相同的元素的个数]\`
- 题目数据保证答案唯一，换句话说，数组中前 \`k\` 个高频元素的集合是唯一的`,
    initialCode: `function topKFrequent(nums, k) {
  // 在此处编写你的代码

}`,
    solution: `function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 桶排序：索引是频率，值是该频率的元素列表
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // 从高频到低频收集结果
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[1,1,1,2,2,3], 2],
        expected: [1,2]
      },
      {
        id: "2",
        name: "单元素",
        input: [[1], 1],
        expected: [1]
      }
    ],
    hints: [
      "先用哈希表统计频率",
      "可以使用堆、快速选择或桶排序",
      "桶排序：以频率为索引"
    ],
    explanation: `## 解题思路

### 桶排序

1. 用哈希表统计每个元素的频率
2. 创建桶数组，索引表示频率
3. 将元素放入对应频率的桶中
4. 从高频到低频收集 k 个元素

### 复杂度分析
- 时间复杂度：O(n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["kth-largest-element", "find-median-from-data-stream"],
    solutions: [
      {
        name: "桶排序（推荐）",
        code: `/**
 * 前K个高频元素 - 桶排序法
 *
 * 核心思想：以频率为索引建立桶，从高频到低频收集元素
 *
 * 步骤：
 * 1. 用哈希表统计每个元素的频率
 * 2. 创建桶数组，索引表示频率，值是该频率的元素列表
 * 3. 从后向前遍历桶，收集前k个元素
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */
function topKFrequent(nums, k) {
  // 第一步：统计每个元素的频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  /**
   * 第二步：创建频率桶
   *
   * 桶索引表示频率，桶内存放该频率的所有元素
   * 桶的大小为 n+1，因为频率范围是 [0, n]
   *
   * 示例：nums = [1,1,1,2,2,3], k = 2
   * freqMap = {1: 3, 2: 2, 3: 1}
   *
   * 桶：
   * 索引 0: []
   * 索引 1: [3]    (频率为1的元素)
   * 索引 2: [2]    (频率为2的元素)
   * 索引 3: [1]    (频率为3的元素)
   * 索引 4-6: []
   */
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  /**
   * 第三步：从高频到低频收集结果
   *
   * 从后向前遍历桶，收集k个元素
   *
   * 执行过程：
   * i=6: buckets[6]=[], 跳过
   * i=5: buckets[5]=[], 跳过
   * i=4: buckets[4]=[], 跳过
   * i=3: buckets[3]=[1], result=[1]
   * i=2: buckets[2]=[2], result=[1,2], 达到k=2，停止
   *
   * 结果：[1,2]
   */
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  // 截取前k个（防止最后一个桶有多个元素）
  return result.slice(0, k);
}`,
        animation: {
          type: "two-pointers" as const,
          title: "前K个高频元素-桶排序演示",
          steps: [
            {
              array: ["1", "1", "1", "2", "2", "3"],
              left: 0,
              right: 5,
              highlights: [],
              description: "nums=[1,1,1,2,2,3], k=2。先统计频率",
            },
            {
              array: ["1:3", "2:2", "3:1"],
              left: 0,
              right: 2,
              highlights: [
                { indices: [0], color: "green" as const, label: "freq=3" },
                { indices: [1], color: "blue" as const, label: "freq=2" },
                { indices: [2], color: "gray" as const, label: "freq=1" },
              ],
              description: "频率统计：1出现3次，2出现2次，3出现1次",
            },
            {
              array: ["[]", "[3]", "[2]", "[1]"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "green" as const, label: "桶3" }],
              description: "创建桶。桶索引=频率。从高频桶开始收集",
            },
            {
              array: ["1"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "高频" }],
              description: "从桶3取出元素1。result=[1]",
            },
            {
              array: ["1", "2"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "green" as const, label: "结果" }],
              description: "从桶2取出元素2。result=[1,2]。达到k=2，完成",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 桶排序

### 思路
1. 用哈希表统计每个元素的频率
2. 创建桶数组，索引表示频率
3. 将元素放入对应频率的桶中
4. 从高频到低频收集 k 个元素

### 优点
- O(n) 时间复杂度
- 不需要堆结构`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "最小堆",
        code: `/**
 * 前K个高频元素 - 最小堆法
 *
 * 核心思想：维护大小为k的最小堆，按频率排序，堆中保留频率最高的k个元素
 *
 * 步骤：
 * 1. 统计频率
 * 2. 用最小堆维护频率最高的k个元素
 * 3. 当堆大小超过k时，弹出频率最小的
 *
 * 时间复杂度：O(n log k)
 * 空间复杂度：O(n)
 */
function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  /**
   * 最小堆：按频率排序
   * 堆元素格式：[num, freq]
   * 比较依据：freq（频率）
   */
  const minHeap = [];

  /**
   * 上浮操作
   * 按频率比较，频率小的在上面
   */
  const push = (item) => {
    minHeap.push(item);
    let i = minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      // 比较频率
      if (minHeap[parent][1] <= minHeap[i][1]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  };

  /**
   * 下沉操作
   */
  const pop = () => {
    const min = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length > 0) {
      minHeap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        // 比较频率
        if (left < minHeap.length && minHeap[left][1] < minHeap[smallest][1]) {
          smallest = left;
        }
        if (right < minHeap.length && minHeap[right][1] < minHeap[smallest][1]) {
          smallest = right;
        }
        if (smallest === i) break;
        [minHeap[i], minHeap[smallest]] = [minHeap[smallest], minHeap[i]];
        i = smallest;
      }
    }
    return min;
  };

  /**
   * 遍历频率表，维护大小为k的最小堆
   *
   * 示例：freqMap = {1: 3, 2: 2, 3: 1}, k = 2
   *
   * [1,3]: push([1,3]), heap=[[1,3]]
   * [2,2]: push([2,2]), heap=[[2,2],[1,3]]
   * [3,1]: push([3,1]), heap=[[3,1],[1,3],[2,2]], size=3>2
   *        pop() → 弹出[3,1]（频率最小）
   *        heap=[[2,2],[1,3]]
   *
   * 最终堆中：[[2,2],[1,3]]，即频率最高的2个元素
   */
  for (const [num, freq] of freqMap) {
    push([num, freq]);
    if (minHeap.length > k) pop();
  }

  // 返回堆中所有元素的num部分
  return minHeap.map(item => item[0]);
}`,
        explanation: `## 最小堆

### 思路
1. 统计频率
2. 维护大小为 k 的最小堆（按频率）
3. 遍历完成后，堆中就是频率最高的 k 个元素

### 特点
- 适合 k 较小的情况
- 时间复杂度 O(n log k)`,
        timeComplexity: "O(n log k)",
        spaceComplexity: "O(n)",
      },
      {
        name: "快速选择",
        code: `/**
 * 前K个高频元素 - 快速选择法
 *
 * 核心思想：使用快速选择算法按频率找到第k大的分界点
 *
 * 步骤：
 * 1. 统计频率，转换为数组
 * 2. 使用快速选择找到频率第k大的位置
 * 3. 返回前k个元素
 *
 * 时间复杂度：平均O(n)
 * 空间复杂度：O(n)
 */
function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 转换为数组：[[num, freq], ...]
  const entries = [...freqMap.entries()];

  /**
   * 快速选择：按频率降序排列，找到前k个
   *
   * 与找第k大元素类似，这里是按频率找
   */
  const quickSelect = (left, right, kLargest) => {
    if (left === right) return;

    // 随机选择pivot
    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pivotFreq = entries[pivotIdx][1];

    // 将pivot移到最右边
    [entries[pivotIdx], entries[right]] = [entries[right], entries[pivotIdx]];

    /**
     * 分区：频率大于pivot的放左边
     *
     * 示例：entries = [[1,3], [2,2], [3,1]], k = 2
     * 假设pivot是[2,2]，频率=2
     *
     * 遍历：
     * [1,3]: freq=3 > 2，交换到左边
     * [3,1]: freq=1 < 2，不移动
     *
     * 结果：[[1,3], [2,2], [3,1]]
     * storeIdx=1，pivot在位置1
     */
    let storeIdx = left;
    for (let i = left; i < right; i++) {
      // 频率大于pivot的放左边（降序）
      if (entries[i][1] > pivotFreq) {
        [entries[storeIdx], entries[i]] = [entries[i], entries[storeIdx]];
        storeIdx++;
      }
    }

    // 将pivot放到正确位置
    [entries[storeIdx], entries[right]] = [entries[right], entries[storeIdx]];

    // 根据pivot位置决定搜索方向
    if (storeIdx === kLargest - 1) return;
    if (storeIdx < kLargest - 1) {
      quickSelect(storeIdx + 1, right, kLargest);
    } else {
      quickSelect(left, storeIdx - 1, kLargest);
    }
  };

  // 快速选择找到前k个高频元素
  quickSelect(0, entries.length - 1, k);

  // 返回前k个元素的num部分
  return entries.slice(0, k).map(e => e[0]);
}`,
        explanation: `## 快速选择

### 思路
1. 统计频率，转换为数组
2. 使用快速选择找到频率第 k 大的分界点
3. 返回前 k 个元素

### 优点
- 平均 O(n) 时间复杂度
- 适合大数据量`,
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 3. 数据流的中位数 (295)
  {
    id: "find-median-from-data-stream",
    leetcodeId: 295,
    title: "数据流的中位数",
    titleEn: "Find Median from Data Stream",
    difficulty: "hard",
    category: "heap",
    tags: ["设计", "双指针", "数据流", "排序", "堆"],
    frontendRelevance: "low",
    frontendNote: "数据流中位数Hard",
    description: `**中位数**是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

- 例如 \`arr = [2,3,4]\` 的中位数是 \`3\`
- 例如 \`arr = [2,3]\` 的中位数是 \`(2 + 3) / 2 = 2.5\`

实现 MedianFinder 类:

- \`MedianFinder()\` 初始化 \`MedianFinder\` 对象。
- \`void addNum(int num)\` 将数据流中的整数 \`num\` 添加到数据结构中。
- \`double findMedian()\` 返回到目前为止所有元素的中位数。与实际答案相差 \`10^-5\` 以内的答案将被接受。`,
    examples: `**示例：**
\`\`\`
输入
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
输出
[null, null, null, 1.5, null, 2.0]

解释
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
medianFinder.addNum(3);    // arr = [1, 2, 3]
medianFinder.findMedian(); // 返回 2.0
\`\`\``,
    constraints: `- \`-10^5 <= num <= 10^5\`
- 在调用 \`findMedian\` 之前，数据结构中至少有一个元素
- 最多调用 \`5 * 10^4\` 次 \`addNum\` 和 \`findMedian\``,
    initialCode: `class MedianFinder {
  constructor() {
    // 初始化
  }

  addNum(num) {
    // 添加数字
  }

  findMedian() {
    // 返回中位数
  }
}`,
    solution: `class MedianFinder {
  constructor() {
    // 最大堆存储较小的一半
    this.maxHeap = [];
    // 最小堆存储较大的一半
    this.minHeap = [];
  }

  // 简易堆操作
  pushMax(val) {
    this.maxHeap.push(val);
    this.bubbleUpMax(this.maxHeap.length - 1);
  }

  pushMin(val) {
    this.minHeap.push(val);
    this.bubbleUpMin(this.minHeap.length - 1);
  }

  popMax() {
    const max = this.maxHeap[0];
    const last = this.maxHeap.pop();
    if (this.maxHeap.length > 0) {
      this.maxHeap[0] = last;
      this.bubbleDownMax(0);
    }
    return max;
  }

  popMin() {
    const min = this.minHeap[0];
    const last = this.minHeap.pop();
    if (this.minHeap.length > 0) {
      this.minHeap[0] = last;
      this.bubbleDownMin(0);
    }
    return min;
  }

  bubbleUpMax(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.maxHeap[parent] >= this.maxHeap[i]) break;
      [this.maxHeap[parent], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[parent]];
      i = parent;
    }
  }

  bubbleUpMin(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.minHeap[parent] <= this.minHeap[i]) break;
      [this.minHeap[parent], this.minHeap[i]] = [this.minHeap[i], this.minHeap[parent]];
      i = parent;
    }
  }

  bubbleDownMax(i) {
    const n = this.maxHeap.length;
    while (true) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.maxHeap[left] > this.maxHeap[largest]) largest = left;
      if (right < n && this.maxHeap[right] > this.maxHeap[largest]) largest = right;
      if (largest === i) break;
      [this.maxHeap[i], this.maxHeap[largest]] = [this.maxHeap[largest], this.maxHeap[i]];
      i = largest;
    }
  }

  bubbleDownMin(i) {
    const n = this.minHeap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.minHeap[left] < this.minHeap[smallest]) smallest = left;
      if (right < n && this.minHeap[right] < this.minHeap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.minHeap[i], this.minHeap[smallest]] = [this.minHeap[smallest], this.minHeap[i]];
      i = smallest;
    }
  }

  addNum(num) {
    // 先加入最大堆
    this.pushMax(num);
    // 将最大堆堆顶移到最小堆
    this.pushMin(this.popMax());
    // 保持平衡
    if (this.minHeap.length > this.maxHeap.length) {
      this.pushMax(this.popMin());
    }
  }

  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}`,
    testCases: [
      {
        id: "1",
        name: "基本操作",
        input: [["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"], [[], [1], [2], [], [3], []]],
        expected: [null, null, null, 1.5, null, 2.0]
      }
    ],
    hints: [
      "使用两个堆：最大堆存较小的一半，最小堆存较大的一半",
      "保持两个堆的大小平衡",
      "中位数可以从堆顶获取"
    ],
    explanation: `## 解题思路

### 双堆法

1. 用最大堆存储较小的一半元素
2. 用最小堆存储较大的一半元素
3. 保持两个堆的大小差不超过 1
4. 中位数来自堆顶

### 添加元素流程
1. 先加入最大堆
2. 将最大堆堆顶移到最小堆
3. 如果最小堆更大，将其堆顶移回最大堆

### 复杂度分析
- 添加：O(log n)
- 查找中位数：O(1)
- 空间复杂度：O(n)`,
    timeComplexity: "O(log n) / O(1)",
    spaceComplexity: "O(n)",
    relatedProblems: ["kth-largest-element", "top-k-frequent-elements"],
    solutions: [
      {
        name: "双堆法（推荐）",
        code: `/**
 * 数据流的中位数 - 双堆法
 *
 * 核心思想：用两个堆将数据分成两半
 * - 最大堆存储较小的一半（堆顶是这一半的最大值）
 * - 最小堆存储较大的一半（堆顶是这一半的最小值）
 *
 * 中位数获取：
 * - 如果两堆大小相等，中位数 = (maxHeap堆顶 + minHeap堆顶) / 2
 * - 如果maxHeap多一个元素，中位数 = maxHeap堆顶
 *
 * 数据结构示意：
 * maxHeap（较小一半）: [1,2,3] → 堆顶=3
 * minHeap（较大一半）: [4,5,6] → 堆顶=4
 * 中位数 = (3 + 4) / 2 = 3.5
 *
 * 时间复杂度：addNum O(log n), findMedian O(1)
 * 空间复杂度：O(n)
 */
class MedianFinder {
  constructor() {
    // 最大堆：存储较小的一半，堆顶是这一半的最大值
    this.maxHeap = [];
    // 最小堆：存储较大的一半，堆顶是这一半的最小值
    this.minHeap = [];
  }

  /**
   * 最大堆：push操作（上浮）
   * 比父节点大则交换
   */
  pushMax(val) {
    this.maxHeap.push(val);
    let i = this.maxHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.maxHeap[parent] >= this.maxHeap[i]) break;
      [this.maxHeap[parent], this.maxHeap[i]] = [this.maxHeap[i], this.maxHeap[parent]];
      i = parent;
    }
  }

  /**
   * 最小堆：push操作（上浮）
   * 比父节点小则交换
   */
  pushMin(val) {
    this.minHeap.push(val);
    let i = this.minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.minHeap[parent] <= this.minHeap[i]) break;
      [this.minHeap[parent], this.minHeap[i]] = [this.minHeap[i], this.minHeap[parent]];
      i = parent;
    }
  }

  /**
   * 最大堆：pop操作（下沉）
   * 找子节点中较大的交换
   */
  popMax() {
    const max = this.maxHeap[0];
    const last = this.maxHeap.pop();
    if (this.maxHeap.length > 0) {
      this.maxHeap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        if (left < this.maxHeap.length && this.maxHeap[left] > this.maxHeap[largest]) largest = left;
        if (right < this.maxHeap.length && this.maxHeap[right] > this.maxHeap[largest]) largest = right;
        if (largest === i) break;
        [this.maxHeap[i], this.maxHeap[largest]] = [this.maxHeap[largest], this.maxHeap[i]];
        i = largest;
      }
    }
    return max;
  }

  /**
   * 最小堆：pop操作（下沉）
   * 找子节点中较小的交换
   */
  popMin() {
    const min = this.minHeap[0];
    const last = this.minHeap.pop();
    if (this.minHeap.length > 0) {
      this.minHeap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        if (left < this.minHeap.length && this.minHeap[left] < this.minHeap[smallest]) smallest = left;
        if (right < this.minHeap.length && this.minHeap[right] < this.minHeap[smallest]) smallest = right;
        if (smallest === i) break;
        [this.minHeap[i], this.minHeap[smallest]] = [this.minHeap[smallest], this.minHeap[i]];
        i = smallest;
      }
    }
    return min;
  }

  /**
   * 添加数字
   *
   * 流程：
   * 1. 先加入maxHeap
   * 2. 将maxHeap堆顶移到minHeap（保证maxHeap的最大值<=minHeap的最小值）
   * 3. 如果minHeap更大，将其堆顶移回maxHeap（保持平衡）
   *
   * 示例：依次添加 [1, 2, 3]
   *
   * 添加1：
   *   maxHeap=[1], minHeap=[]
   *   移动：maxHeap=[], minHeap=[1]
   *   平衡：maxHeap=[1], minHeap=[]
   *   结果：max=[1], min=[]
   *
   * 添加2：
   *   maxHeap=[2,1], minHeap=[]
   *   移动：maxHeap=[1], minHeap=[2]
   *   平衡：大小相等，不需要
   *   结果：max=[1], min=[2]
   *
   * 添加3：
   *   maxHeap=[3,1], minHeap=[2]
   *   移动：maxHeap=[1], minHeap=[2,3]
   *   平衡：minHeap多，移回
   *   结果：max=[2,1], min=[3]
   */
  addNum(num) {
    // 先加入最大堆
    this.pushMax(num);
    // 将最大堆堆顶移到最小堆（保证有序性）
    this.pushMin(this.popMax());
    // 保持平衡：maxHeap.length >= minHeap.length
    if (this.minHeap.length > this.maxHeap.length) {
      this.pushMax(this.popMin());
    }
  }

  /**
   * 获取中位数
   *
   * - 如果maxHeap多一个元素，中位数是maxHeap堆顶
   * - 如果两堆大小相等，中位数是两个堆顶的平均值
   */
  findMedian() {
    if (this.maxHeap.length > this.minHeap.length) {
      return this.maxHeap[0];
    }
    return (this.maxHeap[0] + this.minHeap[0]) / 2;
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "数据流中位数-双堆演示",
          steps: [
            {
              array: ["maxHeap:[]", "minHeap:[]"],
              left: 0,
              right: 1,
              highlights: [],
              description: "初始化两个堆。maxHeap存较小一半，minHeap存较大一半",
            },
            {
              array: ["max:[1]", "min:[]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "加1" }],
              description: "addNum(1)：加入后maxHeap=[1]。中位数=1",
            },
            {
              array: ["max:[1]", "min:[2]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "加2" }],
              description: "addNum(2)：平衡后max=[1],min=[2]。中位数=(1+2)/2=1.5",
            },
            {
              array: ["max:[2,1]", "min:[3]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "green" as const, label: "加3" }],
              description: "addNum(3)：平衡后max=[2,1],min=[3]。中位数=max堆顶=2",
            },
            {
              array: ["2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "中位数" }],
              description: "findMedian()：maxHeap比minHeap多1个，返回maxHeap堆顶=2",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 双堆法

### 思路
1. 用最大堆存储较小的一半元素
2. 用最小堆存储较大的一半元素
3. 保持两个堆的大小差不超过 1
4. 中位数来自堆顶

### 添加元素流程
1. 先加入最大堆
2. 将最大堆堆顶移到最小堆
3. 如果最小堆更大，将其堆顶移回最大堆

### 优点
- 添加和查找都是最优时间复杂度`,
        timeComplexity: "O(log n) addNum / O(1) findMedian",
        spaceComplexity: "O(n)",
      },
      {
        name: "有序数组 + 二分插入",
        code: `/**
 * 数据流的中位数 - 有序数组法
 *
 * 核心思想：维护一个有序数组，用二分查找确定插入位置
 *
 * 优点：实现简单直观
 * 缺点：插入时需要移动元素，addNum是O(n)
 *
 * 时间复杂度：addNum O(n), findMedian O(1)
 * 空间复杂度：O(n)
 */
class MedianFinder {
  constructor() {
    // 维护有序数组
    this.data = [];
  }

  /**
   * 添加数字：二分查找 + 插入
   *
   * 示例：data = [1, 3, 5], 添加4
   *
   * 二分查找：
   * left=0, right=3, mid=1
   * data[1]=3 < 4, left=2
   * left=2, right=3, mid=2
   * data[2]=5 >= 4, right=2
   * left=2, right=2, 退出
   *
   * 插入位置=2，splice(2, 0, 4)
   * 结果：[1, 3, 4, 5]
   */
  addNum(num) {
    // 二分查找插入位置
    let left = 0, right = this.data.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (this.data[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    // 在正确位置插入（splice是O(n)操作）
    this.data.splice(left, 0, num);
  }

  /**
   * 获取中位数
   *
   * 直接通过索引获取：
   * - 奇数个元素：中间那个
   * - 偶数个元素：中间两个的平均值
   */
  findMedian() {
    const n = this.data.length;
    if (n % 2 === 1) {
      // 奇数个，返回中间元素
      return this.data[Math.floor(n / 2)];
    }
    // 偶数个，返回中间两个的平均值
    return (this.data[n / 2 - 1] + this.data[n / 2]) / 2;
  }
}`,
        explanation: `## 有序数组 + 二分插入

### 思路
1. 维护一个有序数组
2. 每次插入时用二分查找找到正确位置
3. 查找中位数直接通过索引获取

### 特点
- 实现简单直观
- 插入操作需要移动元素
- 适合数据量不大的情况`,
        timeComplexity: "O(n) addNum / O(1) findMedian",
        spaceComplexity: "O(n)",
      },
      {
        name: "暴力排序法",
        code: `/**
 * 数据流的中位数 - 暴力排序法
 *
 * 核心思想：每次查找中位数时排序数组
 *
 * 特点：
 * - addNum是O(1)，直接追加到末尾
 * - findMedian是O(n log n)，需要排序
 *
 * 适用场景：添加频繁，查找不频繁
 *
 * 时间复杂度：addNum O(1), findMedian O(n log n)
 * 空间复杂度：O(n)
 */
class MedianFinder {
  constructor() {
    // 存储所有数字（无序）
    this.data = [];
  }

  /**
   * 添加数字
   * 直接追加到末尾，O(1)操作
   */
  addNum(num) {
    this.data.push(num);
  }

  /**
   * 获取中位数
   *
   * 步骤：
   * 1. 对数组排序
   * 2. 根据长度奇偶返回中位数
   *
   * 示例：data = [3, 1, 2, 5, 4]
   *
   * 排序后：[1, 2, 3, 4, 5]
   * n = 5（奇数）
   * 中位数 = data[2] = 3
   */
  findMedian() {
    // 每次查找都排序
    this.data.sort((a, b) => a - b);
    const n = this.data.length;
    if (n % 2 === 1) {
      return this.data[Math.floor(n / 2)];
    }
    return (this.data[n / 2 - 1] + this.data[n / 2]) / 2;
  }
}`,
        explanation: `## 暴力排序法

### 思路
1. 直接将元素添加到数组末尾
2. 查找中位数时先排序再取中间值

### 特点
- 实现最简单
- 添加 O(1)，查找 O(n log n)
- 适合添加多、查找少的场景`,
        timeComplexity: "O(1) addNum / O(n log n) findMedian",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 4. IPO (502)
  {
    id: "ipo",
    leetcodeId: 502,
    title: "IPO",
    titleEn: "IPO",
    difficulty: "hard",
    category: "heap",
    tags: ["贪心", "数组", "排序", "堆"],
    frontendRelevance: "low",
    frontendNote: "IPO",
    description: `假设 力扣（LeetCode）即将开始 **IPO** 。为了以更高的价格将股票卖给风险投资公司，力扣希望在 IPO 之前开展一些项目以增加其资本。

由于资源有限，它只能在 IPO 之前完成最多 \`k\` 个不同的项目。帮助 力扣 设计完成最多 \`k\` 个不同项目后得到最大总资本的方式。

给你 \`n\` 个项目。对于每个项目 \`i\`，它都有一个纯利润 \`profits[i]\`，和启动该项目需要的最小资本 \`capital[i]\`。

最初，你的资本为 \`w\`。当你完成一个项目时，你将获得纯利润，且利润将被添加到你的总资本中。

总而言之，从给定项目中选择 **最多** \`k\` 个不同项目的列表，以 **最大化最终资本**，并输出最终可获得的最多资本。`,
    examples: `**示例 1：**
\`\`\`
输入：k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
输出：4
解释：
由于你的初始资本为 0，你只可以从 0 号项目开始。
在完成后，你将获得 1 的利润，你的总资本将变为 1。
此时你可以选择开始 1 号或 2 号项目。
由于你最多可以选择两个项目，所以你需要完成 2 号项目以获得最大的资本。
因此，输出最后最大化的资本，为 0 + 1 + 3 = 4。
\`\`\`

**示例 2：**
\`\`\`
输入：k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
输出：6
\`\`\``,
    constraints: `- \`1 <= k <= 10^5\`
- \`0 <= w <= 10^9\`
- \`n == profits.length\`
- \`n == capital.length\`
- \`1 <= n <= 10^5\`
- \`0 <= profits[i] <= 10^4\`
- \`0 <= capital[i] <= 10^9\``,
    initialCode: `function findMaximizedCapital(k, w, profits, capital) {
  // 在此处编写你的代码

}`,
    solution: `function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  // 创建项目数组并按资本排序
  const projects = [];
  for (let i = 0; i < n; i++) {
    projects.push({ capital: capital[i], profit: profits[i] });
  }
  projects.sort((a, b) => a.capital - b.capital);

  // 最大堆存储可启动项目的利润
  const maxHeap = [];

  const pushHeap = (val) => {
    maxHeap.push(val);
    let i = maxHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (maxHeap[parent] >= maxHeap[i]) break;
      [maxHeap[parent], maxHeap[i]] = [maxHeap[i], maxHeap[parent]];
      i = parent;
    }
  };

  const popHeap = () => {
    const max = maxHeap[0];
    const last = maxHeap.pop();
    if (maxHeap.length > 0) {
      maxHeap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) largest = left;
        if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) largest = right;
        if (largest === i) break;
        [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
        i = largest;
      }
    }
    return max;
  };

  let idx = 0;
  for (let i = 0; i < k; i++) {
    // 将所有可启动的项目加入堆
    while (idx < n && projects[idx].capital <= w) {
      pushHeap(projects[idx].profit);
      idx++;
    }

    // 如果没有可启动的项目，结束
    if (maxHeap.length === 0) break;

    // 选择利润最大的项目
    w += popHeap();
  }

  return w;
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [2, 0, [1,2,3], [0,1,1]],
        expected: 4
      },
      {
        id: "2",
        name: "示例2",
        input: [3, 0, [1,2,3], [0,1,2]],
        expected: 6
      }
    ],
    hints: [
      "贪心：每次选择当前能启动的最大利润项目",
      "按资本排序，用最大堆维护可启动项目",
      "每次从堆中取出利润最大的项目"
    ],
    explanation: `## 解题思路

### 贪心 + 最大堆

1. 将项目按启动资本排序
2. 遍历 k 次，每次：
   - 将当前资本可启动的项目加入最大堆
   - 从堆中取出利润最大的项目执行
   - 更新当前资本
3. 返回最终资本

### 复杂度分析
- 时间复杂度：O(n log n)
- 空间复杂度：O(n)`,
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    relatedProblems: ["kth-largest-element", "top-k-frequent-elements"],
    solutions: [
      {
        name: "贪心 + 最大堆（推荐）",
        code: `/**
 * IPO - 贪心 + 最大堆
 *
 * 核心思想：每次从可启动的项目中选择利润最大的
 *
 * 贪心策略：
 * - 当前资本能启动哪些项目？加入候选池
 * - 从候选池中选利润最大的执行
 * - 执行后资本增加，解锁更多项目
 *
 * 数据结构：
 * - 按资本排序的项目数组
 * - 最大堆存储可启动项目的利润
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(n)
 */
function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  // 将项目按启动资本升序排序
  const projects = [];
  for (let i = 0; i < n; i++) {
    projects.push({ capital: capital[i], profit: profits[i] });
  }
  projects.sort((a, b) => a.capital - b.capital);

  // 最大堆：存储当前可启动项目的利润
  const maxHeap = [];

  /**
   * 最大堆：push操作
   */
  const pushHeap = (val) => {
    maxHeap.push(val);
    let i = maxHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (maxHeap[parent] >= maxHeap[i]) break;
      [maxHeap[parent], maxHeap[i]] = [maxHeap[i], maxHeap[parent]];
      i = parent;
    }
  };

  /**
   * 最大堆：pop操作
   */
  const popHeap = () => {
    const max = maxHeap[0];
    const last = maxHeap.pop();
    if (maxHeap.length > 0) {
      maxHeap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        if (left < maxHeap.length && maxHeap[left] > maxHeap[largest]) largest = left;
        if (right < maxHeap.length && maxHeap[right] > maxHeap[largest]) largest = right;
        if (largest === i) break;
        [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
        i = largest;
      }
    }
    return max;
  };

  /**
   * 执行k轮项目选择
   *
   * 示例：k=2, w=0, profits=[1,2,3], capital=[0,1,1]
   * 项目排序后：[{c:0,p:1}, {c:1,p:2}, {c:1,p:3}]
   *
   * 第1轮 (i=0)：
   *   w=0，可启动项目：{c:0,p:1}
   *   堆=[1]，选择利润=1
   *   w = 0 + 1 = 1
   *
   * 第2轮 (i=1)：
   *   w=1，新增可启动：{c:1,p:2}, {c:1,p:3}
   *   堆=[3,2]，选择利润=3
   *   w = 1 + 3 = 4
   *
   * 最终资本：4
   */
  let idx = 0;
  for (let i = 0; i < k; i++) {
    // 将所有当前资本可启动的项目加入堆
    while (idx < n && projects[idx].capital <= w) {
      pushHeap(projects[idx].profit);
      idx++;
    }

    // 如果没有可启动的项目，提前结束
    if (maxHeap.length === 0) break;

    // 选择利润最大的项目执行
    w += popHeap();
  }

  return w;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "IPO贪心+最大堆演示",
          steps: [
            {
              array: ["P0:1", "P1:2", "P2:3"],
              left: 0,
              right: 2,
              highlights: [],
              description: "k=2, w=0。项目：P0需资本0利润1，P1需资本1利润2，P2需资本1利润3",
            },
            {
              array: ["[P0]", "P1", "P2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "可启动" }],
              description: "w=0，只有P0可启动。堆=[1]",
            },
            {
              array: ["选P0", "P1", "P2"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "执行" }],
              description: "执行P0，获利1。w=0+1=1",
            },
            {
              array: ["✓", "[P1,P2]", "heap"],
              left: 1,
              right: 2,
              highlights: [{ indices: [1, 2], color: "green" as const, label: "可启动" }],
              description: "w=1，P1和P2都可启动。堆=[3,2]（按利润排）",
            },
            {
              array: ["✓", "选P2", "✓"],
              left: 2,
              right: 2,
              highlights: [{ indices: [1], color: "blue" as const, label: "执行" }],
              description: "执行利润最大的P2，获利3。w=1+3=4",
            },
            {
              array: ["4"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "最终资本" }],
              description: "k=2轮完成。最终资本=4",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 贪心 + 最大堆

### 思路
1. 将项目按启动资本排序
2. 遍历 k 次，每次：
   - 将当前资本可启动的项目加入最大堆
   - 从堆中取出利润最大的项目执行
   - 更新当前资本
3. 返回最终资本

### 贪心策略
- 每次都选择当前可启动的、利润最大的项目
- 这样可以尽快增加资本，解锁更多项目`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "排序 + 贪心（特殊优化）",
        code: `/**
 * IPO - 特殊情况优化版
 *
 * 核心思想：检测特殊情况，如果初始资本已足够启动所有项目，
 * 直接对利润排序取前k大即可，避免堆操作
 *
 * 优化条件：w >= max(capital)
 * 此时所有项目都可以启动，直接贪心选k个利润最大的
 *
 * 时间复杂度：O(n log n)
 * 空间复杂度：O(n)
 */
function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  /**
   * 特殊情况优化：
   * 如果初始资本已经足够启动所有项目
   * 直接排序取前k大利润
   *
   * 示例：k=2, w=100, profits=[1,2,3], capital=[0,1,2]
   * 所有capital都 <= w，直接选利润最大的2个
   * 排序后：[3,2,1]，取前2个：3+2=5
   * 结果：100 + 3 + 2 = 105
   */
  if (w >= Math.max(...capital)) {
    // 直接排序取前 k 大
    profits.sort((a, b) => b - a);
    let result = w;
    for (let i = 0; i < Math.min(k, n); i++) {
      result += profits[i];
    }
    return result;
  }

  // 一般情况：使用标准的贪心 + 堆方法
  const projects = capital.map((c, i) => ({ capital: c, profit: profits[i] }));
  projects.sort((a, b) => a.capital - b.capital);

  const maxHeap = [];

  // 最大堆操作
  const push = (val) => {
    maxHeap.push(val);
    let i = maxHeap.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (maxHeap[p] >= maxHeap[i]) break;
      [maxHeap[p], maxHeap[i]] = [maxHeap[i], maxHeap[p]];
      i = p;
    }
  };

  const pop = () => {
    const max = maxHeap[0];
    const last = maxHeap.pop();
    if (maxHeap.length > 0) {
      maxHeap[0] = last;
      let i = 0;
      while (true) {
        let largest = i;
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < maxHeap.length && maxHeap[l] > maxHeap[largest]) largest = l;
        if (r < maxHeap.length && maxHeap[r] > maxHeap[largest]) largest = r;
        if (largest === i) break;
        [maxHeap[i], maxHeap[largest]] = [maxHeap[largest], maxHeap[i]];
        i = largest;
      }
    }
    return max;
  };

  let idx = 0;
  for (let i = 0; i < k; i++) {
    while (idx < n && projects[idx].capital <= w) {
      push(projects[idx].profit);
      idx++;
    }
    if (maxHeap.length === 0) break;
    w += pop();
  }

  return w;
}`,
        explanation: `## 排序 + 贪心（特殊优化）

### 思路
1. 特殊情况优化：如果初始资本已经足够启动所有项目
   - 直接对利润排序，取前 k 大
   - 避免了堆操作的开销
2. 一般情况使用标准的贪心 + 堆方法

### 优化点
- 当 w >= max(capital) 时，复杂度降为 O(n log n)
- 减少了不必要的堆操作`,
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
      },
      {
        name: "暴力法（小数据）",
        code: `/**
 * IPO - 暴力法
 *
 * 核心思想：每轮遍历所有未执行的项目，找当前可启动的最大利润项目
 *
 * 适用场景：数据量小或k很小的情况
 *
 * 时间复杂度：O(k * n)
 * 空间复杂度：O(n)
 */
function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;
  // 标记已执行的项目
  const used = new Array(n).fill(false);

  /**
   * 执行k轮选择
   *
   * 示例：k=2, w=0, profits=[1,2,3], capital=[0,1,1]
   *
   * 第1轮：
   *   遍历所有项目找 capital <= 0 且利润最大的
   *   j=0: capital[0]=0 <= 0, profit=1, maxProfit=1, maxIdx=0
   *   j=1: capital[1]=1 > 0, 跳过
   *   j=2: capital[2]=1 > 0, 跳过
   *   选择项目0，w = 0 + 1 = 1
   *
   * 第2轮：
   *   遍历所有项目找 capital <= 1 且利润最大的
   *   j=0: 已使用，跳过
   *   j=1: capital[1]=1 <= 1, profit=2
   *   j=2: capital[2]=1 <= 1, profit=3 > 2, maxProfit=3, maxIdx=2
   *   选择项目2，w = 1 + 3 = 4
   *
   * 最终资本：4
   */
  for (let i = 0; i < k; i++) {
    let maxProfit = -1;
    let maxIdx = -1;

    // 找到当前资本可启动的最大利润项目
    for (let j = 0; j < n; j++) {
      // 跳过已执行的项目
      if (used[j]) continue;
      // 检查是否可以启动
      if (capital[j] <= w && profits[j] > maxProfit) {
        maxProfit = profits[j];
        maxIdx = j;
      }
    }

    // 没有可启动的项目，提前结束
    if (maxIdx === -1) break;

    // 执行项目
    used[maxIdx] = true;
    w += maxProfit;
  }

  return w;
}`,
        explanation: `## 暴力法

### 思路
1. 每轮遍历所有项目
2. 找到当前资本可启动的最大利润项目
3. 标记已使用，更新资本

### 特点
- 实现简单
- 时间复杂度 O(k * n)
- 适合小数据量或 k 很小的情况`,
        timeComplexity: "O(k * n)",
        spaceComplexity: "O(n)",
      },
    ],
  },

  // 5. 查找和最小的 K 对数字 (373)
  {
    id: "find-k-pairs-with-smallest-sums",
    leetcodeId: 373,
    title: "查找和最小的 K 对数字",
    titleEn: "Find K Pairs with Smallest Sums",
    difficulty: "medium",
    category: "heap",
    tags: ["数组", "堆（优先队列）"],
    frontendRelevance: "low",
    frontendNote: "最小和对",
    description: `给定两个以 非递减顺序排列 的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

请找到和最小的 k 个数对 (u1,v1), (u2,v2) ... (uk,vk) 。`,
    examples: `**示例 1：**
\`\`\`
输入：nums1 = [1,7,11], nums2 = [2,4,6], k = 3
输出：[[1,2],[1,4],[1,6]]
解释：返回序列中的前 3 对数：
[1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
\`\`\`

**示例 2：**
\`\`\`
输入：nums1 = [1,1,2], nums2 = [1,2,3], k = 2
输出：[[1,1],[1,1]]
解释：返回序列中的前 2 对数：
[1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
\`\`\`

**示例 3：**
\`\`\`
输入：nums1 = [1,2], nums2 = [3], k = 3
输出：[[1,3],[2,3]]
解释：也可能序列中所有的数对都被返回:[1,3],[2,3]
\`\`\``,
    constraints: `- \`1 <= nums1.length, nums2.length <= 10^5\`
- \`-10^9 <= nums1[i], nums2[i] <= 10^9\`
- \`nums1\` 和 \`nums2\` 均为 升序排列
- \`1 <= k <= 10^4\`
- \`k <= nums1.length * nums2.length\``,
    initialCode: `function kSmallestPairs(nums1, nums2, k) {
  // 在此处编写代码
}`,
    solution: `function kSmallestPairs(nums1, nums2, k) {
  const result = [];
  if (nums1.length === 0 || nums2.length === 0) return result;

  // 最小堆：[sum, i, j]
  const heap = [];

  // 初始化：将 nums1 的每个元素与 nums2[0] 配对
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  // 堆化
  const heapify = () => {
    heap.sort((a, b) => a[0] - b[0]);
  };
  heapify();

  while (result.length < k && heap.length > 0) {
    const [sum, i, j] = heap.shift();
    result.push([nums1[i], nums2[j]]);

    // 将 (i, j+1) 加入堆
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
      heapify();
    }
  }

  return result;
}`,
    testCases: [
      { id: "1", name: "示例1", input: [[1,7,11], [2,4,6], 3], expected: [[1,2],[1,4],[1,6]] },
      { id: "2", name: "示例2", input: [[1,1,2], [1,2,3], 2], expected: [[1,1],[1,1]] },
      { id: "3", name: "示例3", input: [[1,2], [3], 3], expected: [[1,3],[2,3]] },
    ],
    hints: [
      "使用最小堆维护候选数对",
      "初始时将 (nums1[i], nums2[0]) 加入堆",
      "每次弹出最小的，将 (i, j+1) 加入堆",
    ],
    explanation: `## 解题思路

### 最小堆

由于两个数组都是升序的，最小和一定从 (0, 0) 开始。

### 算法流程

1. 初始化：将所有 (nums1[i], nums2[0]) 加入最小堆
2. 每次弹出堆顶（最小和）
3. 将 (i, j+1) 加入堆（如果存在）
4. 重复直到找到 k 个

### 为什么这样有效？

对于每个 nums1[i]，我们按顺序考虑 nums2[0], nums2[1], ...
堆确保我们总是选择当前最小的和。

### 复杂度分析
- 时间复杂度：O(k log k)
- 空间复杂度：O(k)`,
    timeComplexity: "O(k log k)",
    spaceComplexity: "O(k)",
    relatedProblems: ["kth-smallest-element-in-a-sorted-matrix"],
    solutions: [
      {
        name: "最小堆（推荐）",
        code: `/**
 * 查找和最小的K对数字 - 最小堆法
 *
 * 核心思想：使用最小堆维护候选数对，每次取出和最小的
 *
 * 关键观察：
 * - 两个数组都是升序的
 * - 最小和一定包含 nums1[0]（从nums1的第一个元素开始）
 * - 对于每个 nums1[i]，我们按顺序考虑 nums2[0], nums2[1], ...
 *
 * 算法：
 * 1. 初始化：将所有 (nums1[i], nums2[0]) 加入最小堆
 * 2. 每次弹出堆顶（最小和）
 * 3. 将 (i, j+1) 加入堆（如果存在）
 * 4. 重复直到找到k个
 *
 * 时间复杂度：O(k log k)
 * 空间复杂度：O(k)
 */
function kSmallestPairs(nums1, nums2, k) {
  const result = [];
  if (nums1.length === 0 || nums2.length === 0) return result;

  /**
   * 最小堆：存储 [sum, i, j]
   * - sum: nums1[i] + nums2[j]
   * - i: nums1 的索引
   * - j: nums2 的索引
   */
  const heap = [];

  /**
   * 初始化：将 nums1 的每个元素与 nums2[0] 配对
   *
   * 示例：nums1 = [1,7,11], nums2 = [2,4,6], k = 3
   *
   * 初始堆：
   * [1+2, 0, 0] = [3, 0, 0]
   * [7+2, 1, 0] = [9, 1, 0]
   * [11+2, 2, 0] = [13, 2, 0]
   *
   * 只需要初始化 min(nums1.length, k) 个
   * 因为最多只需要k个结果
   */
  for (let i = 0; i < Math.min(nums1.length, k); i++) {
    heap.push([nums1[i] + nums2[0], i, 0]);
  }

  // 堆化（使用简单排序实现）
  const heapify = () => {
    heap.sort((a, b) => a[0] - b[0]);
  };
  heapify();

  /**
   * 提取k个最小和的数对
   *
   * 执行过程：
   *
   * 第1次：
   *   弹出 [3, 0, 0]，结果加入 [1, 2]
   *   加入 [1+4, 0, 1] = [5, 0, 1]
   *   堆：[[5,0,1], [9,1,0], [13,2,0]]
   *
   * 第2次：
   *   弹出 [5, 0, 1]，结果加入 [1, 4]
   *   加入 [1+6, 0, 2] = [7, 0, 2]
   *   堆：[[7,0,2], [9,1,0], [13,2,0]]
   *
   * 第3次：
   *   弹出 [7, 0, 2]，结果加入 [1, 6]
   *   j+1=3 >= nums2.length，不加入新元素
   *
   * 结果：[[1,2], [1,4], [1,6]]
   */
  while (result.length < k && heap.length > 0) {
    const [sum, i, j] = heap.shift();
    result.push([nums1[i], nums2[j]]);

    // 将 (i, j+1) 加入堆（沿着nums2方向扩展）
    if (j + 1 < nums2.length) {
      heap.push([nums1[i] + nums2[j + 1], i, j + 1]);
      heapify();
    }
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "查找和最小的K对数字演示",
          steps: [
            {
              array: ["(1,2)=3", "(7,2)=9", "(11,2)=13"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "最小" }],
              description: "nums1=[1,7,11], nums2=[2,4,6], k=3。初始堆：每个nums1元素配nums2[0]",
            },
            {
              array: ["[1,2]"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "结果1" }],
              description: "弹出最小(1,2)=3。结果=[[1,2]]。加入(1,4)=5到堆",
            },
            {
              array: ["(1,4)=5", "(7,2)=9", "(11,2)=13"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "最小" }],
              description: "堆排序后。弹出最小(1,4)=5",
            },
            {
              array: ["[1,2]", "[1,4]"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "结果2" }],
              description: "结果=[[1,2],[1,4]]。加入(1,6)=7到堆",
            },
            {
              array: ["(1,6)=7", "(7,2)=9", "(11,2)=13"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0], color: "green" as const, label: "最小" }],
              description: "弹出最小(1,6)=7",
            },
            {
              array: ["[1,2]", "[1,4]", "[1,6]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "k=3" }],
              description: "结果=[[1,2],[1,4],[1,6]]。达到k=3，完成",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 最小堆法

### 核心思想
维护一个最小堆，每次取出和最小的数对。

### 避免重复
只沿着 nums2 方向扩展，避免重复考虑同一对。

### 优化
只需将 min(nums1.length, k) 个初始对加入堆。`,
        timeComplexity: "O(k log k)",
        spaceComplexity: "O(k)",
      },
      {
        name: "暴力排序（用于理解）",
        code: `/**
 * 查找和最小的K对数字 - 暴力法
 *
 * 核心思想：生成所有可能的数对，排序后取前k个
 *
 * 步骤：
 * 1. 生成所有 m*n 个数对
 * 2. 按和排序
 * 3. 取前k个
 *
 * 时间复杂度：O(mn log(mn))
 * 空间复杂度：O(mn)
 *
 * 注意：数据量大时会超时，仅用于理解问题
 */
function kSmallestPairs(nums1, nums2, k) {
  const pairs = [];

  /**
   * 生成所有可能的数对
   *
   * 示例：nums1 = [1,7,11], nums2 = [2,4,6]
   *
   * 生成：
   * [1,2], [1,4], [1,6]
   * [7,2], [7,4], [7,6]
   * [11,2], [11,4], [11,6]
   *
   * 共 3*3 = 9 个数对
   */
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      pairs.push([nums1[i], nums2[j]]);
    }
  }

  /**
   * 按和排序
   *
   * 排序后：
   * [1,2]=3, [1,4]=5, [1,6]=7, [7,2]=9, [7,4]=11, ...
   */
  pairs.sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));

  // 取前k个
  return pairs.slice(0, k);
}`,
        explanation: `## 暴力法

### 思路
1. 生成所有可能的数对
2. 按和排序
3. 取前 k 个

### 缺点
- 时间复杂度 O(mn log(mn))
- 空间复杂度 O(mn)
- 数据量大时会超时`,
        timeComplexity: "O(mn log(mn))",
        spaceComplexity: "O(mn)",
      },
    ],
  },
];
