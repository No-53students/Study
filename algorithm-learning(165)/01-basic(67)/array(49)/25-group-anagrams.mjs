// node ./25-group-anagrams.mjs
/**
 * 49. 字母异位词分组 (Group Anagrams)
 * 难度: medium
 *
 * 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
 *
 * 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
 *
 * 示例 1：
 * 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
 * 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * 示例 2：
 * 输入: strs = [""]
 * 输出: [[""]]
 *
 * 示例 3：
 * 输入: strs = ["a"]
 * 输出: [["a"]]
 *
 * 约束条件:
 * - 1 <= strs.length <= 10^4
 * - 0 <= strs[i].length <= 100
 * - strs[i] 仅包含小写字母
 *
 * 提示:
 *   1. 字母异位词排序后的结果相同
 *   2. 使用排序后的字符串作为哈希表的 key
 *   3. 也可以用字符计数作为 key
 */

export function groupAnagrams(strs) {
  // 先搞一个排序的函数，使所有的组合排序后作为key,
  function nextMin(val) {
    // console.log("需要排序的数组", val);
    const str = [...val];
    for (let i = 0; i < str.length; i++) {
      let start = i;
      let end = str.length - 1;
      // console.log("对比", str[start], str[end], str[start] > str[end]);
      while (start < end) {
        if (str[start] > str[end]) {
          [str[start], str[end]] = [str[end], str[start]];
        }
        end--;
      }
    }
    // ⚠️ join 注意事项：
    //   str.join()   → 默认逗号分隔，结果如 "a,e,t"（含逗号，语义不对）
    //   str.join("") → 无分隔符，结果如 "aet"（正确做法）
    return str.join("");
  }
  const map1 = new Map();
  for (let i = 0; i < strs.length; i++) {
    const resStr = nextMin(strs[i]);
    const val = map1.get(resStr);
    if (val) {
      // ⚠️ push 注意事项：
      //   val.push(x)        → 修改原数组，返回值是新长度（number），不是数组！
      //   map1.set(key, val.push(x)) → ❌ 会把数字存入 map，后续报错
      //   直接 val.push(x)   → ✅ map 里存的是数组引用，自动更新，无需再 set
      val.push(strs[i]);
    } else {
      map1.set(resStr, [strs[i]]);
    }
  }
  const res = [];
  // for...of 遍历 Map 的三种写法：
  //   for (let [key, value] of map)   → 同时拿 key 和 value（解构）
  //   for (let value of map.values()) → 只拿 value
  //   for (let key of map.keys())     → 只拿 key
  // ⚠️ 不能写 for (let key of map) 再用 map.get(key)
  //    因为此时 key 是 [key, value] 数组，不是字符串
  for (let value of map1.values()) {
    res.push(value);
  }
  return res;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 49. 字母异位词分组 (Group Anagrams)");
function test(name, fn) {
  console.log(`\n--- ${name} ---`);
  fn();
}
const assert = {
  deepStrictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(
      `结果: ${JSON.stringify(actual) === JSON.stringify(expected) ? "✅ 通过" : "❌ 不通过"}`,
    );
  },
  strictEqual(actual, expected) {
    console.log(`输出: ${JSON.stringify(actual)}`);
    console.log(`期望: ${JSON.stringify(expected)}`);
    console.log(`结果: ${actual === expected ? "✅ 通过" : "❌ 不通过"}`);
  },
};

test("示例1", () => {
  assert.deepStrictEqual(
    groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]),
    [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]],
  );
});

test("空字符串", () => {
  assert.deepStrictEqual(groupAnagrams([""]), [[""]]);
});

test("单字符", () => {
  assert.deepStrictEqual(groupAnagrams(["a"]), [["a"]]);
});
