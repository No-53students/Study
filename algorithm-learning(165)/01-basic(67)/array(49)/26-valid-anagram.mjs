// node ./26-valid-anagram.mjs
/**
 * 242. 有效的字母异位词 (Valid Anagram)
 * 难度: easy
 *
 * 给定两个字符串 s 和 t，编写一个函数来判断 t 是否是 s 的字母异位词。
 * 
 * 注意： 若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 *
 * 示例 1：
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 * 
 * 示例 2：
 * 输入: s = "rat", t = "car"
 * 输出: false
 *
 * 约束条件:
 * - 1 <= s.length, t.length <= 5 * 10^4
 * - s 和 t 仅包含小写字母
 * 
 * 进阶： 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？
 *
 * 提示:
 *   1. 如果两个字符串长度不同，肯定不是异位词
 *   2. 可以用数组统计每个字符出现的次数
 *   3. s 中的字符加一，t 中的字符减一，最后检查是否全为0
 */

export function isAnagram(s, t) {
  // 当前方案：字符计数 + 删除匹配项，时间 O(n)，空间 O(k)（k为字符种类数）
  //
  // 核心思路：
  //   1. 统计 s 和 t 各自的字符频次 → obs / obt
  //   2. 遍历 obs，把两者 key 相同且 count 相同的都删掉
  //   3. 最终两个对象都为 {} → 是异位词
  //
  // ⚠️ 为什么要先删除再用 JSON.stringify 比较，而不能直接比较？
  //   数组/对象不能用 == 比较内容，因为比的是引用地址（内存地址），不是内容：
  //     [] == []                → false（不同地址）
  //     {} == {}                → false
  //   JSON.stringify 能比较内容，但 key 顺序不同会判错：
  //     JSON.stringify({a:1,b:1}) !== JSON.stringify({b:1,a:1})  ← 字符顺序不同时出错！
  //   删除匹配项后，两个对象都变成 {}，JSON.stringify({}) == JSON.stringify({}) 永远正确。
  //
  // ⚠️ for...in 用于遍历对象（不是 for...of）：
  //   for (let key in obj)   → 遍历对象的 key（字符串）
  //   for (let item of arr)  → 遍历数组/Map/Set 等可迭代对象的 value
  //   对象不能直接用 for...of，需要 Object.keys/values/entries() 转换后再用
  //
  // ⚠️ delete 删除对象属性：
  //   delete obj.key     → 点语法
  //   delete obj["key"]  → 方括号语法（key 是变量时用这个）
  function findsum(arr) {
    const ob = {};
    for (let i = 0; i < arr.length; i++) {
      if (ob[arr[i]]) {
        ob[arr[i]] = ob[arr[i]] + 1;
      } else {
        ob[arr[i]] = 1
      }
    }
    return ob
  }
  const obs = findsum(s);
  const obt = findsum(t);
  for (let key in obs) {
    if (obt[key] && obt[key] == obs[key]) {
      delete obs[key];
      delete obt[key];
    }
  }
  return JSON.stringify(obs) == JSON.stringify(obt);
}

// ⚡ 更简洁的写法：排序后比较字符串，时间 O(n log n)
//   function isAnagram(s, t) {
//     return s.split("").sort().join("") === t.split("").sort().join("");
//   }
//   原理：异位词排序后的字符串完全相同
//   字符串可以直接用 === 比较（基本类型，按值比较）

// ---- 测试用例 ----
console.log("\n📝 题目: 242. 有效的字母异位词 (Valid Anagram)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? '✅ 通过' : '❌ 不通过'}`);
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? '✅ 通过' : '❌ 不通过'}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(isAnagram("anagram", "nagaram"), true);
});

test("示例2", () => {
  assert.deepStrictEqual(isAnagram("rat", "car"), false);
});

test("相同字符串", () => {
  assert.deepStrictEqual(isAnagram("abc", "abc"), true);
});

test("长度不同", () => {
  assert.deepStrictEqual(isAnagram("ab", "abc"), false);
});
