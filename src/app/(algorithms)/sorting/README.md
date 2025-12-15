# 排序算法

## 概述

排序算法是将一组数据按照特定顺序进行排列的算法。它是计算机科学中最基础、最重要的算法之一。

### 分类

| 类别 | 算法 | 特点 |
|------|------|------|
| 比较排序 | 冒泡、选择、插入、快速、归并、堆 | 通过比较元素大小决定顺序 |
| 非比较排序 | 计数、桶、基数 | 不通过比较，利用元素特性 |

### 稳定性

**稳定排序**：相等元素的相对顺序在排序后保持不变。

```
原数组: [(3, 'a'), (1, 'b'), (3, 'c')]
稳定:   [(1, 'b'), (3, 'a'), (3, 'c')]  // (3, 'a') 仍在 (3, 'c') 前面
不稳定: [(1, 'b'), (3, 'c'), (3, 'a')]  // 可能交换位置
```

## 冒泡排序 (Bubble Sort)

反复比较相邻元素，如果顺序错误就交换。

```javascript
function bubbleSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // 优化：如果没有交换，说明已排序
    if (!swapped) break;
  }

  return arr;
}
```

**复杂度**：时间 O(n²)，空间 O(1)，稳定

## 选择排序 (Selection Sort)

每次选择最小（大）的元素放到已排序序列末尾。

```javascript
function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
```

**复杂度**：时间 O(n²)，空间 O(1)，不稳定

## 插入排序 (Insertion Sort)

将元素插入到已排序部分的正确位置。

```javascript
function insertionSort(arr) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const current = arr[i];
    let j = i - 1;

    // 将大于 current 的元素向后移动
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }

  return arr;
}
```

**复杂度**：时间 O(n²)，最好 O(n)，空间 O(1)，稳定

**特点**：小数据量时效率高，常作为其他排序的优化

## 快速排序 (Quick Sort)

分治思想：选择基准元素，将数组分为两部分，递归排序。

```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
```

**复杂度**：平均 O(n log n)，最坏 O(n²)，空间 O(log n)，不稳定

### 优化技巧

```javascript
// 1. 三数取中法选择 pivot
function medianOfThree(arr, low, high) {
  const mid = Math.floor((low + high) / 2);
  if (arr[low] > arr[mid]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[low] > arr[high]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] > arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
  return mid;
}

// 2. 小数组使用插入排序
function quickSortOptimized(arr, low, high) {
  if (high - low < 10) {
    insertionSort(arr, low, high);
    return;
  }
  // ... 正常快速排序
}
```

## 归并排序 (Merge Sort)

分治思想：将数组分成两半，分别排序后合并。

```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}
```

**复杂度**：时间 O(n log n) 总是，空间 O(n)，稳定

### 原地归并（空间优化）

```javascript
function mergeSortInPlace(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  mergeSortInPlace(arr, left, mid);
  mergeSortInPlace(arr, mid + 1, right);
  mergeInPlace(arr, left, mid, right);
}

function mergeInPlace(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
  }

  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}
```

## 堆排序 (Heap Sort)

利用堆数据结构进行排序。

```javascript
function heapSort(arr) {
  const n = arr.length;

  // 构建最大堆
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // 逐个取出堆顶元素
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
```

**复杂度**：时间 O(n log n)，空间 O(1)，不稳定

## 计数排序 (Counting Sort)

非比较排序，适用于已知范围的整数。

```javascript
function countingSort(arr) {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // 计数
  for (const num of arr) {
    count[num - min]++;
  }

  // 累加
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // 构建输出数组（从后向前保证稳定性）
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}
```

**复杂度**：时间 O(n + k)，空间 O(n + k)，稳定

## JavaScript 内置排序

```javascript
// Array.prototype.sort()

// ⚠️ 默认按字符串排序
[10, 2, 1].sort();  // [1, 10, 2] - 不是你想要的！

// ✅ 数字升序
[10, 2, 1].sort((a, b) => a - b);  // [1, 2, 10]

// ✅ 数字降序
[10, 2, 1].sort((a, b) => b - a);  // [10, 2, 1]

// ✅ 对象排序
const users = [
  { name: 'Bob', age: 30 },
  { name: 'Alice', age: 25 }
];
users.sort((a, b) => a.age - b.age);

// ✅ 字符串排序（区分大小写）
['Banana', 'apple'].sort();  // ['Banana', 'apple']

// ✅ 字符串排序（不区分大小写）
['Banana', 'apple'].sort((a, b) =>
  a.toLowerCase().localeCompare(b.toLowerCase())
);
```

### V8 引擎实现

- 小数组（<= 10）：插入排序
- 大数组：TimSort（归并排序 + 插入排序的混合）
- 稳定排序（ES2019 规范要求）

## 算法比较

| 算法 | 平均 | 最好 | 最坏 | 空间 | 稳定 |
|------|------|------|------|------|------|
| 冒泡 | O(n²) | O(n) | O(n²) | O(1) | ✓ |
| 选择 | O(n²) | O(n²) | O(n²) | O(1) | ✗ |
| 插入 | O(n²) | O(n) | O(n²) | O(1) | ✓ |
| 快速 | O(n log n) | O(n log n) | O(n²) | O(log n) | ✗ |
| 归并 | O(n log n) | O(n log n) | O(n log n) | O(n) | ✓ |
| 堆 | O(n log n) | O(n log n) | O(n log n) | O(1) | ✗ |
| 计数 | O(n+k) | O(n+k) | O(n+k) | O(n+k) | ✓ |

## 面试技巧

1. **手写快排/归并**：最常考的两种排序
2. **理解稳定性**：何时需要稳定排序
3. **时间空间权衡**：归并稳定但需要额外空间
4. **优化技巧**：三数取中、小数组插入排序
5. **实际应用**：了解 JS 内置排序的行为
