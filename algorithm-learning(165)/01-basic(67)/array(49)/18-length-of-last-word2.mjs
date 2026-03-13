// node ./18-length-of-last-word.mjs
/**
 * 58. 最后一个单词的长度 (Length of Last Word)
 * 难度: easy
 *
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。
 * 
 * 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 *
 * 示例 1：
 * 输入：s = "Hello World"
 * 输出：5
 * 解释：最后一个单词是"World"，长度为5。
 * 
 * 示例 2：
 * 输入：s = "   fly me   to   the moon  "
 * 输出：4
 * 解释：最后一个单词是"moon"，长度为4。
 * 
 * 示例 3：
 * 输入：s = "luffy is still joyboy"
 * 输出：6
 * 解释：最后一个单词是长度为6的"joyboy"。
 *
 * 约束条件:
 * - 1 <= s.length <= 10^4
 * - s 仅有英文字母和空格 ' ' 组成
 * - s 中至少存在一个单词
 *
 * 提示:
 *   1. 从后往前遍历
 *   2. 先跳过末尾的空格
 *   3. 再计算单词的长度
 */

/**
 * @param {string} s
 * @return {number}
 */
export function solution(s) {
  let res = 0
  s = [...s];
  // 从末尾向前遍历，将末尾的空格替换为 '_'（哨兵值）
  // i = -1 用于退出循环（等价于 break，但不够直观，推荐用 break）
  // 注意：原字符串只含字母和空格，'_' 不会与原字符冲突
  for (let i = s.length - 1; i >= 0; i --){
    if (s[i] === ' ') {
      s[i] = '_'
    } else {
      i = -1;
    }
  }
  // '_' 只会出现在数组末尾（因为只替换了末尾的空格）
  // forEach 中 return 相当于 continue，不会停止循环
  // 但因为 '_' 在末尾，跳过它们时 res 已是正确答案，不影响结果
  s.forEach(item => {
    if (item == '_') {
      return; // continue，跳过末尾哨兵，不是 break
    }
    if (item === " ") {
      res = 0  // 遇到空格，重置计数
    } else {
      res++;   // 遇到字母，累加
    }
  })
  return res;
}

// ---- 测试用例 ----
console.log("\n📝 题目: 58. 最后一个单词的长度 (Length of Last Word)");
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

test("基本测试", () => {
  assert.deepStrictEqual(solution("Hello World"), 5);
});

test("末尾有空格", () => {
  assert.deepStrictEqual(solution("   fly me   to   the moon  "), 4);
});

test("无多余空格", () => {
  assert.deepStrictEqual(solution("luffy is still joyboy"), 6);
});

test("单个单词", () => {
  assert.deepStrictEqual(solution("a"), 1);
});

test("单个单词带空格", () => {
  assert.deepStrictEqual(solution("  hello  "), 5);
});
