"use client";

import { useState } from "react";

// ============================================
// 示例 1: 哈希表基本操作可视化
// ============================================

function HashTableVisualization() {
  const [map, setMap] = useState<Map<string, string>>(new Map([
    ["name", "张三"],
    ["age", "25"],
    ["city", "北京"],
  ]));
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [message, setMessage] = useState("");

  const set = () => {
    if (!key.trim()) {
      setMessage("请输入键名");
      return;
    }
    const newMap = new Map(map);
    newMap.set(key, value);
    setMap(newMap);
    setMessage(`设置: ${key} = ${value}`);
    setKey("");
    setValue("");
  };

  const get = () => {
    if (!searchKey.trim()) {
      setMessage("请输入要查找的键");
      return;
    }
    const result = map.get(searchKey);
    if (result !== undefined) {
      setMessage(`查找结果: ${searchKey} = ${result}`);
    } else {
      setMessage(`未找到键: ${searchKey}`);
    }
  };

  const deleteKey = (keyToDelete: string) => {
    const newMap = new Map(map);
    newMap.delete(keyToDelete);
    setMap(newMap);
    setMessage(`删除: ${keyToDelete}`);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 1: 哈希表基本操作</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="键"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="值"
          className="w-24 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={set}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Set 设置
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder="查找键"
          className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={get}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Get 查找
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-md bg-zinc-100 p-2 text-sm dark:bg-zinc-800">
          {message}
        </div>
      )}

      {/* 哈希表可视化 */}
      <div className="rounded-lg border border-zinc-300 dark:border-zinc-600">
        <div className="grid grid-cols-3 border-b border-zinc-300 bg-zinc-100 text-sm font-medium dark:border-zinc-600 dark:bg-zinc-800">
          <div className="border-r border-zinc-300 p-2 dark:border-zinc-600">键 (Key)</div>
          <div className="border-r border-zinc-300 p-2 dark:border-zinc-600">值 (Value)</div>
          <div className="p-2">操作</div>
        </div>
        {Array.from(map.entries()).map(([k, v], index) => (
          <div
            key={k}
            className={`grid grid-cols-3 text-sm ${
              index < map.size - 1 ? "border-b border-zinc-200 dark:border-zinc-700" : ""
            }`}
          >
            <div className="border-r border-zinc-200 p-2 font-mono dark:border-zinc-700">
              {k}
            </div>
            <div className="border-r border-zinc-200 p-2 dark:border-zinc-700">{v}</div>
            <div className="p-2">
              <button
                onClick={() => deleteKey(k)}
                className="text-red-600 hover:text-red-800"
              >
                删除
              </button>
            </div>
          </div>
        ))}
        {map.size === 0 && (
          <div className="p-4 text-center text-sm text-zinc-400">空哈希表</div>
        )}
      </div>

      <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>大小: {map.size}</p>
      </div>
    </div>
  );
}

// ============================================
// 示例 2: 两数之和（经典算法题）
// ============================================

function TwoSumExample() {
  const [nums, setNums] = useState([2, 7, 11, 15]);
  const [target, setTarget] = useState(9);
  const [steps, setSteps] = useState<{ index: number; num: number; complement: number; found: boolean; map: [number, number][] }[]>([]);
  const [result, setResult] = useState<number[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const solve = async () => {
    setIsRunning(true);
    setSteps([]);
    setResult(null);

    const allSteps: typeof steps = [];
    const map: Map<number, number> = new Map();

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i];
      const found = map.has(complement);

      allSteps.push({
        index: i,
        num: nums[i],
        complement,
        found,
        map: Array.from(map.entries()),
      });
      setSteps([...allSteps]);

      await delay(800);

      if (found) {
        setResult([map.get(complement)!, i]);
        setIsRunning(false);
        return;
      }

      map.set(nums[i], i);
    }

    setResult(null);
    setIsRunning(false);
  };

  const reset = () => {
    setSteps([]);
    setResult(null);
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 2: 两数之和（LeetCode 1）</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        给定数组和目标值，找出数组中和为目标值的两个数的索引。
        使用哈希表可以将时间复杂度从 O(n²) 降到 O(n)。
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm">数组:</span>
          <span className="font-mono">[{nums.join(", ")}]</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">目标:</span>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(parseInt(e.target.value) || 0)}
            className="w-20 rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
          />
        </div>
        <button
          onClick={solve}
          disabled={isRunning}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? "执行中..." : "开始查找"}
        </button>
        <button
          onClick={reset}
          disabled={isRunning}
          className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700"
        >
          重置
        </button>
      </div>

      {/* 数组可视化 */}
      <div className="mb-4">
        <div className="mb-2 text-sm font-medium">数组:</div>
        <div className="flex gap-2">
          {nums.map((num, index) => {
            const currentStep = steps[steps.length - 1];
            const isCurrentIndex = currentStep?.index === index;
            const isResult = result?.includes(index);

            return (
              <div
                key={index}
                className={`flex h-12 w-12 flex-col items-center justify-center rounded ${
                  isResult
                    ? "bg-green-500 text-white"
                    : isCurrentIndex
                    ? "bg-blue-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              >
                <span className="font-mono font-bold">{num}</span>
                <span className="text-xs opacity-70">[{index}]</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 步骤展示 */}
      {steps.length > 0 && (
        <div className="mb-4">
          <div className="mb-2 text-sm font-medium">执行步骤:</div>
          <div className="max-h-[200px] overflow-y-auto rounded bg-zinc-100 p-3 dark:bg-zinc-800">
            {steps.map((step, i) => (
              <div key={i} className="mb-2 text-sm">
                <div>
                  步骤 {i + 1}: nums[{step.index}] = {step.num}
                </div>
                <div className="ml-4 text-zinc-600 dark:text-zinc-400">
                  complement = {target} - {step.num} = {step.complement}
                </div>
                <div className="ml-4">
                  {step.found ? (
                    <span className="text-green-600">
                      ✓ 在 Map 中找到 {step.complement}！
                    </span>
                  ) : (
                    <span className="text-zinc-500">
                      Map 中没有 {step.complement}，将 {step.num} 存入 Map
                    </span>
                  )}
                </div>
                <div className="ml-4 text-xs text-zinc-500">
                  Map: {"{"}
                  {step.map.map(([k, v]) => `${k}: ${v}`).join(", ")}
                  {"}"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result && (
        <div className="rounded-md bg-green-50 p-3 text-green-800 dark:bg-green-900/30 dark:text-green-200">
          找到答案: [{result.join(", ")}]，nums[{result[0]}] + nums[{result[1]}] = {nums[result[0]]} + {nums[result[1]]} = {target}
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 3: 字符频率统计
// ============================================

function CharFrequencyExample() {
  const [text, setText] = useState("hello world");
  const [frequency, setFrequency] = useState<Map<string, number>>(new Map());

  const analyze = () => {
    const freq = new Map<string, number>();
    for (const char of text.toLowerCase()) {
      if (char !== " ") {
        freq.set(char, (freq.get(char) || 0) + 1);
      }
    }
    setFrequency(freq);
  };

  const sortedEntries = Array.from(frequency.entries()).sort((a, b) => b[1] - a[1]);
  const maxCount = sortedEntries.length > 0 ? sortedEntries[0][1] : 0;

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 3: 字符频率统计</h3>

      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        使用哈希表统计字符串中每个字符出现的次数。
      </p>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="输入文本"
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
        />
        <button
          onClick={analyze}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          分析
        </button>
      </div>

      {frequency.size > 0 && (
        <div>
          <div className="mb-2 text-sm font-medium">频率分布:</div>
          <div className="space-y-2">
            {sortedEntries.map(([char, count]) => (
              <div key={char} className="flex items-center gap-2">
                <span className="w-8 font-mono text-center">'{char}'</span>
                <div className="flex-1 h-6 bg-zinc-200 dark:bg-zinc-700 rounded overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
        <pre className="text-green-400 overflow-x-auto">
{`function charFrequency(str) {
  const freq = new Map();

  for (const char of str) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  return freq;
}`}
        </pre>
      </div>
    </div>
  );
}

// ============================================
// 示例 4: Map 和 Set 对比
// ============================================

function MapSetComparison() {
  const [setItems, setSetItems] = useState<Set<number>>(new Set([1, 2, 3]));
  const [mapItems, setMapItems] = useState<Map<string, number>>(new Map([["a", 1], ["b", 2]]));
  const [setInput, setSetInput] = useState("");
  const [mapKey, setMapKey] = useState("");
  const [mapValue, setMapValue] = useState("");

  const addToSet = () => {
    const num = parseInt(setInput);
    if (!isNaN(num)) {
      const newSet = new Set(setItems);
      newSet.add(num);
      setSetItems(newSet);
      setSetInput("");
    }
  };

  const addToMap = () => {
    if (mapKey) {
      const newMap = new Map(mapItems);
      newMap.set(mapKey, parseInt(mapValue) || 0);
      setMapItems(newMap);
      setMapKey("");
      setMapValue("");
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
      <h3 className="mb-4 text-lg font-semibold">示例 4: Map 和 Set 对比</h3>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Set */}
        <div className="rounded-lg border border-zinc-300 p-4 dark:border-zinc-600">
          <h4 className="mb-3 font-medium text-purple-600 dark:text-purple-400">
            Set（集合）
          </h4>
          <p className="mb-3 text-xs text-zinc-500">存储唯一值的集合</p>

          <div className="mb-3 flex gap-2">
            <input
              type="number"
              value={setInput}
              onChange={(e) => setSetInput(e.target.value)}
              placeholder="值"
              className="w-20 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
            <button
              onClick={addToSet}
              className="rounded bg-purple-600 px-3 py-1 text-sm text-white hover:bg-purple-700"
            >
              添加
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from(setItems).map((item) => (
              <span
                key={item}
                className="cursor-pointer rounded bg-purple-100 px-2 py-1 text-sm dark:bg-purple-900/30"
                onClick={() => {
                  const newSet = new Set(setItems);
                  newSet.delete(item);
                  setSetItems(newSet);
                }}
              >
                {item} ×
              </span>
            ))}
          </div>

          <div className="mt-3 text-xs text-zinc-500">
            <p>大小: {setItems.size}</p>
            <p>has(2): {setItems.has(2) ? "true" : "false"}</p>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-lg border border-zinc-300 p-4 dark:border-zinc-600">
          <h4 className="mb-3 font-medium text-blue-600 dark:text-blue-400">
            Map（映射）
          </h4>
          <p className="mb-3 text-xs text-zinc-500">存储键值对的集合</p>

          <div className="mb-3 flex gap-2">
            <input
              type="text"
              value={mapKey}
              onChange={(e) => setMapKey(e.target.value)}
              placeholder="键"
              className="w-16 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
            <input
              type="number"
              value={mapValue}
              onChange={(e) => setMapValue(e.target.value)}
              placeholder="值"
              className="w-16 rounded border px-2 py-1 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
            <button
              onClick={addToMap}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            >
              添加
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.from(mapItems.entries()).map(([k, v]) => (
              <span
                key={k}
                className="cursor-pointer rounded bg-blue-100 px-2 py-1 text-sm dark:bg-blue-900/30"
                onClick={() => {
                  const newMap = new Map(mapItems);
                  newMap.delete(k);
                  setMapItems(newMap);
                }}
              >
                {k}: {v} ×
              </span>
            ))}
          </div>

          <div className="mt-3 text-xs text-zinc-500">
            <p>大小: {mapItems.size}</p>
            <p>get("a"): {mapItems.get("a") ?? "undefined"}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 text-sm">
        <div className="rounded bg-purple-50 p-3 dark:bg-purple-900/30">
          <h5 className="font-medium">Set 用途:</h5>
          <ul className="mt-1 list-inside list-disc text-xs">
            <li>数组去重</li>
            <li>判断元素是否存在</li>
            <li>集合运算（交集、并集）</li>
          </ul>
        </div>
        <div className="rounded bg-blue-50 p-3 dark:bg-blue-900/30">
          <h5 className="font-medium">Map 用途:</h5>
          <ul className="mt-1 list-inside list-disc text-xs">
            <li>缓存数据</li>
            <li>计数统计</li>
            <li>任意类型作为键</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 综合示例导出
// ============================================

export default function HashTableExamples() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold">哈希表 (Hash Table)</h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          哈希表是一种通过哈希函数将键映射到值的数据结构，提供近乎 O(1) 的查找、插入和删除操作。
        </p>

        <div className="mt-4 rounded-md bg-zinc-900 p-4 text-sm">
          <p className="mb-2 text-zinc-400">// JavaScript 中的哈希表实现</p>
          <pre className="text-green-400">
{`// ES6 Map - 任意类型作为键
const map = new Map();
map.set('key', 'value');
map.get('key');    // 'value'
map.has('key');    // true
map.delete('key');

// ES6 Set - 存储唯一值
const set = new Set([1, 2, 2, 3]);
// Set { 1, 2, 3 }

// 普通对象（字符串键）
const obj = { key: 'value' };`}
          </pre>
        </div>

        <div className="mt-4 rounded-md bg-blue-50 p-4 dark:bg-blue-900/30">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200">时间复杂度:</h4>
          <ul className="mt-2 list-inside list-disc text-sm text-blue-700 dark:text-blue-300">
            <li>查找 (get): 平均 O(1)，最坏 O(n)</li>
            <li>插入 (set): 平均 O(1)，最坏 O(n)</li>
            <li>删除 (delete): 平均 O(1)，最坏 O(n)</li>
          </ul>
        </div>
      </div>

      <HashTableVisualization />
      <TwoSumExample />
      <CharFrequencyExample />
      <MapSetComparison />
    </div>
  );
}
