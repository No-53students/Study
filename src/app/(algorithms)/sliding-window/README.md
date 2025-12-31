# 滑动窗口 (Sliding Window)

## 概念介绍

**滑动窗口**是一种基于双指针的算法技巧，通过维护一个可变或固定大小的"窗口"在数组/字符串上滑动，高效解决子数组/子串问题。

### 核心思想

用左右指针定义一个窗口，通过移动右指针扩大窗口，移动左指针收缩窗口，在滑动过程中维护所需信息。

### 两种类型

| 类型 | 描述 | 典型场景 |
|------|------|---------|
| 固定窗口 | 窗口大小不变 | 最大/平均值、固定长度子串 |
| 可变窗口 | 窗口大小动态变化 | 满足条件的最长/最短子数组 |

## 固定窗口

窗口大小保持不变，每次右移一格。

### 模板

```javascript
function fixedWindow(arr, k) {
  // 初始化第一个窗口
  let windowSum = 0;
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  let result = windowSum;

  // 滑动窗口
  for (let i = k; i < arr.length; i++) {
    // 加入新元素，移除旧元素
    windowSum += arr[i] - arr[i - k];
    result = Math.max(result, windowSum);
  }

  return result;
}
```

### 典型例题：子数组最大平均数 (LeetCode 643)

```javascript
/**
 * 找出长度为 k 的子数组的最大平均数
 *
 * 思路：维护固定大小窗口的和，滑动时一进一出
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function findMaxAverage(nums, k) {
  // 计算第一个窗口的和
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let maxSum = sum;

  // 滑动窗口：每次移动一格
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];  // 加入新元素，移除旧元素
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k;
}

// 示例
findMaxAverage([1, 12, -5, -6, 50, 3], 4);  // 12.75
```

### 典型例题：存在重复元素 II (LeetCode 219)

```javascript
/**
 * 检查是否存在两个下标 i 和 j，使得 nums[i] == nums[j] 且 |i - j| <= k
 *
 * 思路：维护大小为 k 的滑动窗口（使用 Set）
 */
function containsNearbyDuplicate(nums, k) {
  const window = new Set();

  for (let i = 0; i < nums.length; i++) {
    // 如果窗口中已存在当前元素，找到答案
    if (window.has(nums[i])) {
      return true;
    }

    // 将当前元素加入窗口
    window.add(nums[i]);

    // 保持窗口大小为 k
    if (window.size > k) {
      window.delete(nums[i - k]);
    }
  }

  return false;
}
```

## 可变窗口

窗口大小根据条件动态调整。

### 模板

```javascript
/**
 * 可变窗口通用模板
 *
 * 求满足条件的最长子数组/子串
 */
function slidingWindow(s) {
  const window = new Map();  // 窗口内元素计数
  let left = 0;
  let right = 0;
  let result = 0;

  while (right < s.length) {
    // 1. 扩展窗口：加入右边元素
    const c = s[right];
    right++;
    // 更新窗口内数据...

    // 2. 收缩窗口：当窗口不满足条件时
    while (需要收缩窗口) {
      const d = s[left];
      left++;
      // 更新窗口内数据...
    }

    // 3. 更新结果
    result = Math.max(result, right - left);
  }

  return result;
}
```

### 典型例题：无重复字符的最长子串 (LeetCode 3)

```javascript
/**
 * 无重复字符的最长子串
 *
 * 思路：
 * - 用 Set 记录窗口内的字符
 * - 遇到重复字符时，收缩左边界直到没有重复
 *
 * 时间复杂度：O(n)，每个字符最多被访问两次
 * 空间复杂度：O(min(n, m))，m 是字符集大小
 */
function lengthOfLongestSubstring(s) {
  const charSet = new Set();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    // 如果字符已存在，收缩窗口
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    // 加入新字符
    charSet.add(s[right]);

    // 更新最大长度
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}

// 使用 Map 记录位置的优化版本（直接跳转）
function lengthOfLongestSubstringOptimized(s) {
  const charIndex = new Map();
  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (charIndex.has(s[right]) && charIndex.get(s[right]) >= left) {
      // 直接跳到重复字符的下一个位置
      left = charIndex.get(s[right]) + 1;
    }

    charIndex.set(s[right], right);
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

### 典型例题：长度最小的子数组 (LeetCode 209)

```javascript
/**
 * 找出总和 >= target 的长度最小的子数组
 *
 * 思路：
 * - 右指针扩展窗口，累加元素
 * - 当和 >= target 时，尝试收缩左边界以找更短的答案
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // 扩展窗口
    sum += nums[right];

    // 收缩窗口
    while (sum >= target) {
      minLen = Math.min(minLen, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
```

### 典型例题：最小覆盖子串 (LeetCode 76)

```javascript
/**
 * 找出 s 中涵盖 t 所有字符的最小子串
 *
 * 思路：
 * - 用 Map 记录 t 中每个字符需要的数量
 * - 扩展窗口直到覆盖所有字符
 * - 收缩窗口以找最小
 *
 * 时间复杂度：O(m + n)
 * 空间复杂度：O(m)，m 是字符集大小
 */
function minWindow(s, t) {
  // 记录 t 中每个字符需要的数量
  const need = new Map();
  for (const c of t) {
    need.set(c, (need.get(c) || 0) + 1);
  }

  // 窗口中的字符计数
  const window = new Map();
  let left = 0;
  let valid = 0;  // 满足条件的字符数

  let start = 0;  // 最小子串起始位置
  let minLen = Infinity;

  for (let right = 0; right < s.length; right++) {
    const c = s[right];

    // 扩展窗口
    if (need.has(c)) {
      window.set(c, (window.get(c) || 0) + 1);
      if (window.get(c) === need.get(c)) {
        valid++;
      }
    }

    // 收缩窗口
    while (valid === need.size) {
      // 更新最小子串
      if (right - left + 1 < minLen) {
        start = left;
        minLen = right - left + 1;
      }

      const d = s[left];
      left++;

      if (need.has(d)) {
        if (window.get(d) === need.get(d)) {
          valid--;
        }
        window.set(d, window.get(d) - 1);
      }
    }
  }

  return minLen === Infinity ? "" : s.substring(start, start + minLen);
}
```

### 典型例题：找到字符串中所有字母异位词 (LeetCode 438)

```javascript
/**
 * 找出 s 中所有 p 的异位词的起始索引
 *
 * 思路：固定窗口大小为 p.length，检查窗口内是否是 p 的异位词
 */
function findAnagrams(s, p) {
  const result = [];
  if (s.length < p.length) return result;

  // 记录 p 中每个字符的数量
  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  for (const c of p) {
    need[c.charCodeAt(0) - 97]++;
  }

  const pLen = p.length;

  for (let i = 0; i < s.length; i++) {
    // 加入新字符
    window[s.charCodeAt(i) - 97]++;

    // 移除旧字符（窗口大小超过 p.length 时）
    if (i >= pLen) {
      window[s.charCodeAt(i - pLen) - 97]--;
    }

    // 检查是否是异位词
    if (i >= pLen - 1 && arraysEqual(window, need)) {
      result.push(i - pLen + 1);
    }
  }

  return result;
}

function arraysEqual(a, b) {
  for (let i = 0; i < 26; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
```

## 滑动窗口 vs 双指针

| 特点 | 滑动窗口 | 双指针 |
|------|---------|--------|
| 窗口概念 | 维护连续的窗口区间 | 可能不连续 |
| 典型问题 | 子数组/子串问题 | 配对、交换问题 |
| 信息维护 | 需要维护窗口内的统计信息 | 通常不需要 |

滑动窗口本质上是同向双指针的一种应用，但更强调**窗口**这个概念。

## 前端应用场景

### 1. 虚拟滚动中的数据窗口

```javascript
/**
 * 虚拟列表：只渲染可见区域的数据
 */
function getVisibleItems(items, scrollTop, containerHeight, itemHeight) {
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  return {
    visibleItems: items.slice(startIndex, endIndex),
    startIndex,
    endIndex
  };
}
```

### 2. 请求限流（滑动窗口限流）

```javascript
/**
 * 滑动窗口限流：限制在时间窗口内的请求数量
 */
class SlidingWindowRateLimiter {
  constructor(windowMs, maxRequests) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.requests = [];
  }

  isAllowed() {
    const now = Date.now();
    // 移除窗口外的旧请求
    this.requests = this.requests.filter(time => now - time < this.windowMs);

    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}

// 使用示例：每分钟最多100次请求
const limiter = new SlidingWindowRateLimiter(60000, 100);
if (limiter.isAllowed()) {
  // 发送请求
}
```

### 3. 实时数据统计（移动平均）

```javascript
/**
 * 计算最近 N 个数据点的移动平均
 */
class MovingAverage {
  constructor(size) {
    this.size = size;
    this.queue = [];
    this.sum = 0;
  }

  next(val) {
    this.queue.push(val);
    this.sum += val;

    if (this.queue.length > this.size) {
      this.sum -= this.queue.shift();
    }

    return this.sum / this.queue.length;
  }
}

// 使用示例：计算最近5个股票价格的移动平均
const ma = new MovingAverage(5);
ma.next(100);  // 100
ma.next(110);  // 105
ma.next(105);  // 105
```

### 4. 输入防抖中的时间窗口

```javascript
/**
 * 带窗口的防抖：窗口期内的最后一次调用生效
 */
function debounceWithWindow(fn, windowMs) {
  let timer = null;
  let lastCallTime = 0;

  return function(...args) {
    const now = Date.now();

    // 如果距离上次调用超过窗口时间，立即执行
    if (now - lastCallTime > windowMs) {
      lastCallTime = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastCallTime = Date.now();
        fn.apply(this, args);
      }, windowMs);
    }
  };
}
```

## 何时使用滑动窗口

满足以下条件时考虑使用滑动窗口：

1. **连续子数组/子串问题**
2. **需要维护窗口内的某种统计信息**（和、最大值、元素计数等）
3. **窗口具有单调性**：扩大窗口某个量增加，缩小窗口某个量减少

不适用滑动窗口的情况：
- 需要找的是非连续的子序列
- 元素可以是负数（无法判断收缩/扩展对结果的影响）

## 复杂度分析

| 算法 | 时间复杂度 | 空间复杂度 |
|------|-----------|-----------|
| 暴力枚举子数组 | O(n²) | O(1) |
| 滑动窗口 | O(n) | O(1) 或 O(k) |

滑动窗口的关键优势：每个元素最多被访问两次（进入窗口一次，离开窗口一次），因此是 O(n)。

## 总结

滑动窗口的要点：

1. **识别问题类型**：是固定窗口还是可变窗口
2. **明确窗口的含义**：窗口内需要维护什么信息
3. **确定收缩条件**：什么时候需要移动左指针
4. **更新结果的时机**：在扩展后还是收缩后更新

常见题型：
- 最长/最短子数组（满足条件）
- 定长子数组的最大/最小值
- 子串包含/异位词问题
