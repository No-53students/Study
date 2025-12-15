# 哈希表 (Hash Table / HashMap)

## 概念介绍

**哈希表**是一种通过**哈希函数**将键(Key)映射到值(Value)的数据结构。它提供近乎 O(1) 时间复杂度的查找、插入和删除操作。

### 核心概念

- **哈希函数**: 将任意大小的数据映射到固定大小的值
- **哈希冲突**: 不同的键映射到相同的位置
- **负载因子**: 已存储元素数量 / 哈希表大小

### 冲突解决方法

| 方法 | 描述 | 优点 | 缺点 |
|------|------|------|------|
| 链地址法 | 每个槽位存储链表 | 实现简单 | 空间开销 |
| 开放寻址法 | 冲突时寻找下一个空槽 | 缓存友好 | 聚集问题 |
| 再哈希法 | 使用多个哈希函数 | 分布均匀 | 计算开销 |

## JavaScript 中的哈希表

### Map

```javascript
// 创建 Map
const map = new Map();

// 或使用数组初始化
const map2 = new Map([
  ['key1', 'value1'],
  ['key2', 'value2']
]);

// 基本操作
map.set('name', '张三');     // 设置
map.get('name');             // 获取 -> '张三'
map.has('name');             // 检查 -> true
map.delete('name');          // 删除 -> true
map.clear();                 // 清空
map.size;                    // 大小

// 遍历
map.forEach((value, key) => console.log(key, value));
for (const [key, value] of map) { }
for (const key of map.keys()) { }
for (const value of map.values()) { }
```

### Set

```javascript
// 创建 Set
const set = new Set([1, 2, 2, 3]); // Set { 1, 2, 3 }

// 基本操作
set.add(4);         // 添加
set.has(2);         // 检查 -> true
set.delete(2);      // 删除
set.clear();        // 清空
set.size;           // 大小

// 数组去重
const unique = [...new Set(array)];

// 集合运算
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// 并集
const union = new Set([...a, ...b]); // {1, 2, 3, 4}

// 交集
const intersection = new Set([...a].filter(x => b.has(x))); // {2, 3}

// 差集
const difference = new Set([...a].filter(x => !b.has(x))); // {1}
```

### Object vs Map

| 特性 | Object | Map |
|------|--------|-----|
| 键类型 | 字符串/Symbol | 任意类型 |
| 键顺序 | 不保证 | 插入顺序 |
| 大小 | 手动计算 | .size 属性 |
| 迭代 | 需转换 | 直接迭代 |
| 性能 | 频繁增删较慢 | 频繁增删较快 |
| JSON | 直接支持 | 需转换 |

## 面试高频题

### 1. 两数之和 (LeetCode 1)

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

// 示例
twoSum([2, 7, 11, 15], 9); // [0, 1]
```

### 2. 有效的字母异位词 (LeetCode 242)

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const count = new Map();

  for (const char of s) {
    count.set(char, (count.get(char) || 0) + 1);
  }

  for (const char of t) {
    const c = count.get(char);
    if (!c) return false;
    count.set(char, c - 1);
  }

  return true;
}

// 或使用数组（针对小写字母）
function isAnagramArray(s, t) {
  if (s.length !== t.length) return false;

  const count = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }

  return count.every(c => c === 0);
}
```

### 3. 字母异位词分组 (LeetCode 49)

```javascript
function groupAnagrams(strs) {
  const map = new Map();

  for (const str of strs) {
    // 将字符串排序作为 key
    const key = str.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(str);
  }

  return [...map.values()];
}

// 示例
groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
// [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

### 4. 存在重复元素 (LeetCode 217)

```javascript
function containsDuplicate(nums) {
  return new Set(nums).size !== nums.length;
}

// 或使用 Map/Set 检查
function containsDuplicate2(nums) {
  const seen = new Set();

  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }

  return false;
}
```

### 5. 无重复字符的最长子串 (LeetCode 3)

```javascript
function lengthOfLongestSubstring(s) {
  const map = new Map(); // 字符 -> 最后出现的索引
  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < s.length; end++) {
    const char = s[end];

    if (map.has(char) && map.get(char) >= start) {
      start = map.get(char) + 1;
    }

    map.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }

  return maxLength;
}

// 示例
lengthOfLongestSubstring("abcabcbb"); // 3 ("abc")
```

### 6. 前 K 个高频元素 (LeetCode 347)

```javascript
function topKFrequent(nums, k) {
  // 统计频率
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // 桶排序
  const buckets = [];
  for (const [num, freq] of freqMap) {
    if (!buckets[freq]) {
      buckets[freq] = [];
    }
    buckets[freq].push(num);
  }

  // 从高频到低频收集结果
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i]) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
}
```

### 7. 同构字符串 (LeetCode 205)

```javascript
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map();
  const tToS = new Map();

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    if (sToT.has(charS) && sToT.get(charS) !== charT) {
      return false;
    }
    if (tToS.has(charT) && tToS.get(charT) !== charS) {
      return false;
    }

    sToT.set(charS, charT);
    tToS.set(charT, charS);
  }

  return true;
}
```

## 前端应用场景

### 1. 缓存/记忆化

```javascript
function memoize(fn) {
  const cache = new Map();

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// 使用
const expensiveCalc = memoize((n) => {
  console.log('Computing...');
  return n * n;
});

expensiveCalc(5); // Computing... 25
expensiveCalc(5); // 25 (从缓存获取)
```

### 2. 对象/数组去重

```javascript
// 数组去重
const uniqueArray = [...new Set(array)];

// 对象数组按字段去重
function uniqueBy(arr, key) {
  const seen = new Map();
  return arr.filter(item => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.set(k, true);
    return true;
  });
}

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice Copy' }
];

uniqueBy(users, 'id'); // 只保留第一个 id=1 的对象
```

### 3. 频率统计

```javascript
function countFrequency(arr) {
  return arr.reduce((map, item) => {
    map.set(item, (map.get(item) || 0) + 1);
    return map;
  }, new Map());
}

// 找出出现次数最多的元素
function mostFrequent(arr) {
  const freq = countFrequency(arr);
  let maxItem = null;
  let maxCount = 0;

  for (const [item, count] of freq) {
    if (count > maxCount) {
      maxCount = count;
      maxItem = item;
    }
  }

  return maxItem;
}
```

### 4. 分组

```javascript
function groupBy(arr, keyFn) {
  return arr.reduce((map, item) => {
    const key = keyFn(item);
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key).push(item);
    return map;
  }, new Map());
}

// 使用
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 25 }
];

groupBy(users, user => user.age);
// Map { 25 => [{...}, {...}], 30 => [{...}] }
```

## 复杂度分析

| 操作 | 平均 | 最坏 |
|------|------|------|
| 查找 | O(1) | O(n) |
| 插入 | O(1) | O(n) |
| 删除 | O(1) | O(n) |
| 空间 | O(n) | O(n) |

> 最坏情况发生在所有键都哈希到同一个槽位时（极端情况）

## 总结

哈希表是前端开发中最重要的数据结构之一：

1. **O(1) 查找**: 快速的键值对操作
2. **Map 优于 Object**: 现代 JS 推荐使用 Map
3. **Set 去重**: 简洁高效的去重方案
4. **面试必考**: 两数之和、字母异位词等经典题目
