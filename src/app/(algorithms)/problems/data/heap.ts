import { Problem } from "../types";

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
        code: `function findKthLargest(nums, k) {
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
        code: `function findKthLargest(nums, k) {
  // 手动实现最小堆
  const minHeap = [];

  const push = (val) => {
    minHeap.push(val);
    let i = minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent] <= minHeap[i]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  };

  const pop = () => {
    const min = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length > 0) {
      minHeap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        if (left < minHeap.length && minHeap[left] < minHeap[smallest]) smallest = left;
        if (right < minHeap.length && minHeap[right] < minHeap[smallest]) smallest = right;
        if (smallest === i) break;
        [minHeap[i], minHeap[smallest]] = [minHeap[smallest], minHeap[i]];
        i = smallest;
      }
    }
    return min;
  };

  for (const num of nums) {
    push(num);
    if (minHeap.length > k) {
      pop();
    }
  }

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
        code: `function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
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
        code: `function topKFrequent(nums, k) {
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
        code: `function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 最小堆：按频率排序，保持大小为 k
  const minHeap = [];

  const push = (item) => {
    minHeap.push(item);
    let i = minHeap.length - 1;
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (minHeap[parent][1] <= minHeap[i][1]) break;
      [minHeap[parent], minHeap[i]] = [minHeap[i], minHeap[parent]];
      i = parent;
    }
  };

  const pop = () => {
    const min = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length > 0) {
      minHeap[0] = last;
      let i = 0;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1, right = 2 * i + 2;
        if (left < minHeap.length && minHeap[left][1] < minHeap[smallest][1]) smallest = left;
        if (right < minHeap.length && minHeap[right][1] < minHeap[smallest][1]) smallest = right;
        if (smallest === i) break;
        [minHeap[i], minHeap[smallest]] = [minHeap[smallest], minHeap[i]];
        i = smallest;
      }
    }
    return min;
  };

  for (const [num, freq] of freqMap) {
    push([num, freq]);
    if (minHeap.length > k) pop();
  }

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
        code: `function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const entries = [...freqMap.entries()];

  // 快速选择找到第 k 大的频率位置
  const quickSelect = (left, right, kLargest) => {
    if (left === right) return;

    const pivotIdx = left + Math.floor(Math.random() * (right - left + 1));
    const pivotFreq = entries[pivotIdx][1];

    [entries[pivotIdx], entries[right]] = [entries[right], entries[pivotIdx]];

    let storeIdx = left;
    for (let i = left; i < right; i++) {
      if (entries[i][1] > pivotFreq) {
        [entries[storeIdx], entries[i]] = [entries[i], entries[storeIdx]];
        storeIdx++;
      }
    }

    [entries[storeIdx], entries[right]] = [entries[right], entries[storeIdx]];

    if (storeIdx === kLargest - 1) return;
    if (storeIdx < kLargest - 1) {
      quickSelect(storeIdx + 1, right, kLargest);
    } else {
      quickSelect(left, storeIdx - 1, kLargest);
    }
  };

  quickSelect(0, entries.length - 1, k);
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
        code: `class MedianFinder {
  constructor() {
    // 最大堆存储较小的一半
    this.maxHeap = [];
    // 最小堆存储较大的一半
    this.minHeap = [];
  }

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
        code: `class MedianFinder {
  constructor() {
    this.data = [];
  }

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
    // 在正确位置插入
    this.data.splice(left, 0, num);
  }

  findMedian() {
    const n = this.data.length;
    if (n % 2 === 1) {
      return this.data[Math.floor(n / 2)];
    }
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
        code: `class MedianFinder {
  constructor() {
    this.data = [];
  }

  addNum(num) {
    this.data.push(num);
  }

  findMedian() {
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
        code: `function findMaximizedCapital(k, w, profits, capital) {
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
        code: `function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;

  // 特殊情况：如果所有项目都可以启动
  if (w >= Math.max(...capital)) {
    // 直接排序取前 k 大
    profits.sort((a, b) => b - a);
    let result = w;
    for (let i = 0; i < Math.min(k, n); i++) {
      result += profits[i];
    }
    return result;
  }

  // 一般情况使用堆
  const projects = capital.map((c, i) => ({ capital: c, profit: profits[i] }));
  projects.sort((a, b) => a.capital - b.capital);

  const maxHeap = [];
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
        code: `function findMaximizedCapital(k, w, profits, capital) {
  const n = profits.length;
  const used = new Array(n).fill(false);

  for (let i = 0; i < k; i++) {
    let maxProfit = -1;
    let maxIdx = -1;

    // 找到当前资本可启动的最大利润项目
    for (let j = 0; j < n; j++) {
      if (!used[j] && capital[j] <= w && profits[j] > maxProfit) {
        maxProfit = profits[j];
        maxIdx = j;
      }
    }

    // 没有可启动的项目
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
];
