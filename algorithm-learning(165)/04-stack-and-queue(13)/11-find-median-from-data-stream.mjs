// node ./11-find-median-from-data-stream.mjs
/**
 * 295. 数据流的中位数 (Find Median from Data Stream)
 * 难度: hard
 *
 * 中位数是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。
 * 
 * - 例如 arr = [2,3,4] 的中位数是 3
 * - 例如 arr = [2,3] 的中位数是 (2 + 3) / 2 = 2.5
 * 
 * 实现 MedianFinder 类:
 * 
 * - MedianFinder() 初始化 MedianFinder 对象。
 * - void addNum(int num) 将数据流中的整数 num 添加到数据结构中。
 * - double findMedian() 返回到目前为止所有元素的中位数。与实际答案相差 10^-5 以内的答案将被接受。
 *
 * 示例：
 * 输入
 * ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
 * [[], [1], [2], [], [3], []]
 * 输出
 * [null, null, null, 1.5, null, 2.0]
 * 
 * 解释
 * MedianFinder medianFinder = new MedianFinder();
 * medianFinder.addNum(1);    // arr = [1]
 * medianFinder.addNum(2);    // arr = [1, 2]
 * medianFinder.findMedian(); // 返回 1.5 ((1 + 2) / 2)
 * medianFinder.addNum(3);    // arr = [1, 2, 3]
 * medianFinder.findMedian(); // 返回 2.0
 *
 * 约束条件:
 * - -10^5 <= num <= 10^5
 * - 在调用 findMedian 之前，数据结构中至少有一个元素
 * - 最多调用 5 * 10^4 次 addNum 和 findMedian
 *
 * 提示:
 *   1. 使用两个堆：最大堆存较小的一半，最小堆存较大的一半
 *   2. 保持两个堆的大小平衡
 *   3. 中位数可以从堆顶获取
 */

export class MedianFinder {
  constructor() {
    // 初始化
  }

  addNum(num) {
    // 添加数字
  }

  findMedian() {
    // 返回中位数
  }
}

// ---- 测试用例 ----
console.log("\n📝 题目: 295. 数据流的中位数 (Find Median from Data Stream)");
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

test("基本操作", () => {
  assert.deepStrictEqual(solution(["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], [[],[1],[2],[],[3],[]]), [null,null,null,1.5,null,2]);
});
