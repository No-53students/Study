// node ./02-simplify-path.mjs
/**
 * 71. 简化路径 (Simplify Path)
 * 难度: medium
 *
 * 给你一个字符串 path，表示指向某一文件或目录的 Unix 风格 绝对路径（以 '/' 开头），请你将其转化为 更加简洁的规范路径。
 * 
 * 在 Unix 风格的文件系统中规则如下：
 * - 一个点 '.' 表示当前目录本身。
 * - 两个点 '..' 表示将目录切换到上一级（指向父目录）。
 * - 多个斜杠（如 '//' 或 '///'）被视为单个斜杠 '/'。
 * - 任何其他格式的点（如 '...' 或 '....'）被视为有效的文件/目录名称。
 * 
 * 返回的 简化后的路径 必须遵循下述格式：
 * - 始终以斜杠 '/' 开头。
 * - 两个目录名之间必须只有一个斜杠 '/'。
 * - 路径末尾不得有斜杠 '/'，除非这是根目录。
 * - 路径不得包含任何 '.' 或 '..'。
 *
 * 示例 1：
 * 输入：path = "/home/"
 * 输出："/home"
 * 解释：注意，最后一个目录名后面没有斜杠。
 * 
 * 示例 2：
 * 输入：path = "/home//foo/"
 * 输出："/home/foo"
 * 解释：多个连续的斜杠被单个斜杠替换。
 * 
 * 示例 3：
 * 输入：path = "/home/user/Documents/../Pictures"
 * 输出："/home/user/Pictures"
 * 解释：两个点 ".." 表示上一级目录。
 * 
 * 示例 4：
 * 输入：path = "/../"
 * 输出："/"
 * 解释：根目录的上一级还是根目录。
 *
 * 约束条件:
 * - 1 <= path.length <= 3000
 * - path 由英文字母、数字、句点 '.'、斜杠 '/' 或 '_' 组成
 * - path 是一个有效的 Unix 风格绝对路径
 *
 * 提示:
 *   1. 使用栈存储有效的目录名
 *   2. 按 '/' 分割路径
 *   3. '.' 跳过，'..' 出栈，其他入栈
 */

export function simplifyPath(path) {
  // 在此处编写你的代码

}

// ---- 测试用例 ----
console.log("\n📝 题目: 71. 简化路径 (Simplify Path)");
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
  assert.deepStrictEqual(simplifyPath("/home/"), "/home");
});

test("多斜杠", () => {
  assert.deepStrictEqual(simplifyPath("/home//foo/"), "/home/foo");
});

test("上级目录", () => {
  assert.deepStrictEqual(simplifyPath("/home/user/Documents/../Pictures"), "/home/user/Pictures");
});

test("根目录", () => {
  assert.deepStrictEqual(simplifyPath("/../"), "/");
});

test("复杂路径", () => {
  assert.deepStrictEqual(simplifyPath("/a/./b/../../c/"), "/c");
});
