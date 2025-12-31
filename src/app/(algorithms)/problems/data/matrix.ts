import { Problem } from "../types";
import { TwoPointersStep } from "../components/animations";

export const matrixProblems: Problem[] = [
  // 1. 有效的数独 (36)
  {
    id: "valid-sudoku",
    leetcodeId: 36,
    title: "有效的数独",
    titleEn: "Valid Sudoku",
    difficulty: "medium",
    category: "matrix",
    tags: ["数组", "哈希表", "矩阵"],
    frontendRelevance: "low",
    frontendNote: "有效数独",
    description: `请你判断一个 \`9 x 9\` 的数独是否有效。只需要 **根据以下规则**，验证已经填入的数字是否有效即可。

1. 数字 \`1-9\` 在每一行只能出现一次。
2. 数字 \`1-9\` 在每一列只能出现一次。
3. 数字 \`1-9\` 在每一个以粗实线分隔的 \`3x3\` 宫内只能出现一次。（请参考示例图）

**注意：**
- 一个有效的数独（部分已被填充）不一定是可解的。
- 只需要根据以上规则，验证已经填入的数字是否有效即可。
- 空白格用 \`'.'\` 表示。`,
    examples: `**示例 1：**
\`\`\`
输入：board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
输出：false
解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
\`\`\``,
    constraints: `- \`board.length == 9\`
- \`board[i].length == 9\`
- \`board[i][j]\` 是一位数字（\`1-9\`）或者 \`'.'\``,
    initialCode: `function isValidSudoku(board) {
  // 在此处编写你的代码

}`,
    solution: `function isValidSudoku(board) {
  // 使用哈希集合记录每行、每列、每个3x3宫格中出现的数字
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === '.') continue;

      // 计算当前格子属于哪个3x3宫格
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // 检查是否重复
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }

      // 记录数字
      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
}`,
    testCases: [
      {
        id: "1",
        name: "有效数独",
        input: [[
          ["5","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ]],
        expected: true
      },
      {
        id: "2",
        name: "无效数独-重复8",
        input: [[
          ["8","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ]],
        expected: false
      }
    ],
    hints: [
      "使用三个数组分别记录每行、每列、每个3x3宫格中出现的数字",
      "3x3宫格的索引可以通过 Math.floor(i/3)*3 + Math.floor(j/3) 计算",
      "遍历一次即可完成验证"
    ],
    explanation: `## 解题思路

### 哈希表记录

使用三组哈希集合分别记录：
1. 每一行出现的数字
2. 每一列出现的数字
3. 每个3x3宫格出现的数字

遍历数独的每个格子，检查当前数字是否在对应的行、列、宫格中已经出现过。

### 关键点
- 3x3宫格索引计算：\`boxIndex = Math.floor(i/3) * 3 + Math.floor(j/3)\`
- 跳过空格 \`'.'\`

### 复杂度分析
- 时间复杂度：O(1)，固定遍历81个格子
- 空间复杂度：O(1)，固定使用27个集合`,
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    relatedProblems: ["spiral-matrix", "rotate-image"],
    solutions: [
      {
        name: "哈希集合（推荐）",
        code: `/**
 * 有效的数独 - 哈希集合法
 *
 * 核心思想：使用三组集合分别记录每行、每列、每个 3×3 宫格中出现的数字
 *
 * 数独有效条件：
 * 1. 数字 1-9 在每一行只能出现一次
 * 2. 数字 1-9 在每一列只能出现一次
 * 3. 数字 1-9 在每个 3×3 宫格只能出现一次
 *
 * 3×3 宫格索引计算：
 * boxIndex = Math.floor(i/3) * 3 + Math.floor(j/3)
 *
 * 宫格布局：
 * | 0 | 1 | 2 |
 * | 3 | 4 | 5 |
 * | 6 | 7 | 8 |
 *
 * 时间复杂度：O(1)，固定遍历 81 个格子
 * 空间复杂度：O(1)，固定使用 27 个集合
 */
function isValidSudoku(board) {
  // 初始化 9 个行集合、9 个列集合、9 个宫格集合
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());

  /**
   * 遍历数独棋盘
   *
   * 示例：检查 board[1][4] = '9'
   *
   * i=1, j=4, num='9'
   * boxIndex = floor(1/3)*3 + floor(4/3) = 0*3 + 1 = 1
   *
   * 检查：
   * - rows[1].has('9')? → 第 1 行是否已有 9
   * - cols[4].has('9')? → 第 4 列是否已有 9
   * - boxes[1].has('9')? → 第 1 个宫格是否已有 9
   *
   * 如果都没有，则记录：
   * - rows[1].add('9')
   * - cols[4].add('9')
   * - boxes[1].add('9')
   */
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      // 跳过空格
      if (num === '.') continue;

      // 计算当前格子属于哪个 3×3 宫格（0-8）
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // 检查是否重复
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }

      // 记录数字
      rows[i].add(num);
      cols[j].add(num);
      boxes[boxIndex].add(num);
    }
  }

  return true;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "有效数独验证演示",
          steps: [
            {
              array: ["5", "3", ".", "6", ".", ".", ".", "9", "8"],
              left: 0,
              right: 8,
              highlights: [],
              description: "检验9x9数独。用三组Set记录：rows[9], cols[9], boxes[9]",
            },
            {
              array: ["5", "3", ".", "6", ".", ".", ".", "9", "8"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0], color: "green" as const, label: "[0,0]=5" }],
              description: "board[0][0]='5'。boxIndex=0。rows[0]={5}, cols[0]={5}, boxes[0]={5}",
            },
            {
              array: ["5", "3", ".", "6", ".", ".", ".", "9", "8"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1], color: "green" as const, label: "[0,1]=3" }],
              description: "board[0][1]='3'。boxIndex=0。无冲突，添加到对应集合",
            },
            {
              array: ["8", ".", ".", "8", ".", ".", ".", ".", "."],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 3], color: "red" as const, label: "冲突!" }],
              description: "无效例：board[0][0]='8', board[3][0]='8'。cols[0]已有8，冲突！",
            },
            {
              array: ["✓", "有", "效"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "通过" }],
              description: "遍历完所有格子无冲突，数独有效。返回true",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 哈希集合

### 思路
使用三组哈希集合分别记录：
1. 每一行出现的数字
2. 每一列出现的数字
3. 每个3x3宫格出现的数字

### 关键点
- 3x3宫格索引：boxIndex = Math.floor(i/3) * 3 + Math.floor(j/3)
- 跳过空格 '.'`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      {
        name: "位运算优化",
        animation: {
          type: "two-pointers" as const,
          title: "位运算验证数独演示",
          steps: [
            {
              array: ["rows[0]=0", "遇到5"],
              left: 0,
              right: 1,
              highlights: [],
              description: "用整数的9个bit表示1-9是否出现。初始rows[0]=0",
            },
            {
              array: ["bit=10000", "rows|=bit"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "yellow" as const, label: "1<<4" }],
              description: "数字5: bit=1<<4=16(10000)。rows[0]|=16=16",
            },
            {
              array: ["rows=10000", "遇到3"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "检查" }],
              description: "数字3: bit=1<<2=4(100)。rows&4=0，不存在",
            },
            {
              array: ["rows=10100", "再遇5"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "red" as const, label: "冲突" }],
              description: "再遇5: rows&16=16≠0，已存在！返回false",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 有效的数独 - 位运算优化法
 *
 * 核心思想：用一个整数的 9 个比特位表示 1-9 是否出现过
 *
 * 位运算表示：
 * - 数字 1 → 第 0 位（bit = 1 << 0 = 1）
 * - 数字 2 → 第 1 位（bit = 1 << 1 = 2）
 * - ...
 * - 数字 9 → 第 8 位（bit = 1 << 8 = 256）
 *
 * 操作：
 * - 检查是否存在：rows[i] & bit
 * - 标记为存在：rows[i] |= bit
 *
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 */
function isValidSudoku(board) {
  // 使用整数代替集合，每个整数的低 9 位表示 1-9
  const rows = new Array(9).fill(0);
  const cols = new Array(9).fill(0);
  const boxes = new Array(9).fill(0);

  /**
   * 位运算示例
   *
   * 假设第 0 行已经有数字 1 和 5
   * rows[0] = 0b000010001 = 17
   *
   * 现在遇到 board[0][3] = '3'
   * num = '3'.charCodeAt(0) - '1'.charCodeAt(0) = 2
   * bit = 1 << 2 = 4 = 0b100
   *
   * 检查：rows[0] & bit = 17 & 4 = 0（不存在）
   * 记录：rows[0] |= bit → rows[0] = 17 | 4 = 21 = 0b000010101
   *
   * 如果再遇到 '5'：
   * num = 4, bit = 1 << 4 = 16 = 0b10000
   * rows[0] & bit = 21 & 16 = 16 ≠ 0（已存在！）
   */
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') continue;

      // 将字符 '1'-'9' 转为数字 0-8
      const num = board[i][j].charCodeAt(0) - '1'.charCodeAt(0);
      // 计算对应的比特位
      const bit = 1 << num;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // 检查是否已存在（位与运算）
      if ((rows[i] & bit) || (cols[j] & bit) || (boxes[boxIndex] & bit)) {
        return false;
      }

      // 标记为存在（位或运算）
      rows[i] |= bit;
      cols[j] |= bit;
      boxes[boxIndex] |= bit;
    }
  }

  return true;
}`,
        explanation: `## 位运算优化

### 思路
用一个整数的9个比特位来表示1-9是否出现过。

### 优点
- 空间效率更高
- 比较操作更快（位运算）

### 实现
- bit = 1 << num：数字 num 对应的比特位
- rows[i] & bit：检查是否已存在
- rows[i] |= bit：标记为已存在`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
      {
        name: "数组计数",
        animation: {
          type: "two-pointers" as const,
          title: "数组计数验证数独演示",
          steps: [
            {
              array: ["rows[9][9]", "cols[9][9]", "boxes[9][9]"],
              left: 0,
              right: 2,
              highlights: [],
              description: "用布尔数组代替Set。rows[i][k]=第i行是否有k+1",
            },
            {
              array: ["[2,5]='7'"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "blue" as const, label: "处理" }],
              description: "board[2][5]='7'。num=6, boxIndex=1",
            },
            {
              array: ["rows[2][6]", "cols[5][6]", "boxes[1][6]"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "yellow" as const, label: "检查" }],
              description: "检查rows[2][6]?cols[5][6]?boxes[1][6]? 都是false",
            },
            {
              array: ["true", "true", "true"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "标记" }],
              description: "全部标记为true。继续遍历其他格子",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 有效的数独 - 数组计数法
 *
 * 核心思想：使用布尔数组代替哈希集合，索引直接对应数字
 *
 * 数组结构：
 * - rows[i][k] 表示第 i 行是否有数字 k+1
 * - cols[j][k] 表示第 j 列是否有数字 k+1
 * - boxes[b][k] 表示第 b 个宫格是否有数字 k+1
 *
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 */
function isValidSudoku(board) {
  // 使用布尔数组，rows[i][k] 表示第 i 行是否有数字 k+1
  const rows = Array.from({ length: 9 }, () => new Array(9).fill(false));
  const cols = Array.from({ length: 9 }, () => new Array(9).fill(false));
  const boxes = Array.from({ length: 9 }, () => new Array(9).fill(false));

  /**
   * 示例：board[2][5] = '7'
   *
   * i=2, j=5
   * num = parseInt('7') - 1 = 6（用作数组索引）
   * boxIndex = floor(2/3)*3 + floor(5/3) = 0*3 + 1 = 1
   *
   * 检查：
   * - rows[2][6]? → 第 2 行是否已有 7
   * - cols[5][6]? → 第 5 列是否已有 7
   * - boxes[1][6]? → 第 1 个宫格是否已有 7
   *
   * 记录：
   * - rows[2][6] = true
   * - cols[5][6] = true
   * - boxes[1][6] = true
   */
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === '.') continue;

      // 将 '1'-'9' 转为索引 0-8
      const num = parseInt(board[i][j]) - 1;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      // 检查是否重复
      if (rows[i][num] || cols[j][num] || boxes[boxIndex][num]) {
        return false;
      }

      // 标记
      rows[i][num] = true;
      cols[j][num] = true;
      boxes[boxIndex][num] = true;
    }
  }

  return true;
}`,
        explanation: `## 数组计数

### 思路
使用布尔数组代替哈希集合，索引直接对应数字。

### 特点
- 访问速度可能比 Set 更快
- 内存布局更紧凑`,
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 2. 螺旋矩阵 (54)
  {
    id: "spiral-matrix",
    leetcodeId: 54,
    title: "螺旋矩阵",
    titleEn: "Spiral Matrix",
    difficulty: "medium",
    category: "matrix",
    tags: ["数组", "矩阵", "模拟"],
    frontendRelevance: "medium",
    frontendNote: "螺旋矩阵",
    description: `给你一个 \`m\` 行 \`n\` 列的矩阵 \`matrix\`，请按照 **顺时针螺旋顺序**，返回矩阵中的所有元素。`,
    examples: `**示例 1：**
\`\`\`
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
\`\`\`

**示例 2：**
\`\`\`
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
\`\`\``,
    constraints: `- \`m == matrix.length\`
- \`n == matrix[i].length\`
- \`1 <= m, n <= 10\`
- \`-100 <= matrix[i][j] <= 100\``,
    initialCode: `function spiralOrder(matrix) {
  // 在此处编写你的代码

}`,
    solution: `function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // 从左到右
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // 从上到下
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // 从右到左
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // 从下到上
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}`,
    testCases: [
      {
        id: "1",
        name: "3x3矩阵",
        input: [[[1,2,3],[4,5,6],[7,8,9]]],
        expected: [1,2,3,6,9,8,7,4,5]
      },
      {
        id: "2",
        name: "3x4矩阵",
        input: [[[1,2,3,4],[5,6,7,8],[9,10,11,12]]],
        expected: [1,2,3,4,8,12,11,10,9,5,6,7]
      },
      {
        id: "3",
        name: "单行",
        input: [[[1,2,3]]],
        expected: [1,2,3]
      },
      {
        id: "4",
        name: "单列",
        input: [[[1],[2],[3]]],
        expected: [1,2,3]
      }
    ],
    hints: [
      "使用四个边界变量：top, bottom, left, right",
      "每完成一个方向的遍历，收缩对应的边界",
      "注意检查边界条件，避免重复遍历"
    ],
    explanation: `## 解题思路

### 模拟螺旋遍历

使用四个边界变量控制遍历范围：
1. **从左到右**：遍历上边界，然后 top++
2. **从上到下**：遍历右边界，然后 right--
3. **从右到左**：遍历下边界（需检查 top <= bottom），然后 bottom--
4. **从下到上**：遍历左边界（需检查 left <= right），然后 left++

### 复杂度分析
- 时间复杂度：O(m × n)，遍历所有元素
- 空间复杂度：O(1)，不计输出数组`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["valid-sudoku", "rotate-image"],
    solutions: [
      {
        name: "边界收缩（推荐）",
        code: `/**
 * 螺旋矩阵 - 边界收缩法
 *
 * 核心思想：使用四个边界变量控制遍历范围，每完成一个方向就收缩对应边界
 *
 * 边界变量：
 * - top：上边界（初始为 0）
 * - bottom：下边界（初始为 m-1）
 * - left：左边界（初始为 0）
 * - right：右边界（初始为 n-1）
 *
 * 遍历顺序（顺时针）：
 * 1. 从左到右（遍历上边界，然后 top++）
 * 2. 从上到下（遍历右边界，然后 right--）
 * 3. 从右到左（遍历下边界，然后 bottom--）
 * 4. 从下到上（遍历左边界，然后 left++）
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(1)，不计输出
 */
function spiralOrder(matrix) {
  const result = [];
  if (matrix.length === 0) return result;

  // 初始化四个边界
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;

  /**
   * 螺旋遍历示例
   *
   * matrix = [[1,2,3],
   *           [4,5,6],
   *           [7,8,9]]
   *
   * 第一圈：
   * 1. 从左到右：1,2,3 (top=0 行)，然后 top=1
   * 2. 从上到下：6,9 (right=2 列)，然后 right=1
   * 3. 从右到左：8,7 (bottom=2 行)，然后 bottom=1
   * 4. 从下到上：4 (left=0 列)，然后 left=1
   *
   * 第二圈：
   * 1. 从左到右：5 (top=1 行)，然后 top=2
   * 2. top(2) > bottom(1)，退出
   *
   * 结果：[1,2,3,6,9,8,7,4,5]
   */
  while (top <= bottom && left <= right) {
    // 从左到右：遍历上边界
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // 从上到下：遍历右边界
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // 从右到左：遍历下边界（需检查 top <= bottom）
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // 从下到上：遍历左边界（需检查 left <= right）
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
}`,
        animation: {
          type: "two-pointers" as const,
          title: "螺旋矩阵遍历演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [],
              description: "3x3矩阵。top=0,bottom=2,left=0,right=2。顺时针螺旋遍历",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "→" }],
              description: "从左到右：遍历top=0行，得到1,2,3。top++变为1",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [5, 8], color: "blue" as const, label: "↓" }],
              description: "从上到下：遍历right=2列，得到6,9。right--变为1",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [7, 6], color: "red" as const, label: "←" }],
              description: "从右到左：遍历bottom=2行，得到8,7。bottom--变为1",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [3], color: "gray" as const, label: "↑" }],
              description: "从下到上：遍历left=0列，得到4。left++变为1。继续下一圈",
            },
            {
              array: ["1", "2", "3", "6", "9", "8", "7", "4", "5"],
              left: 0,
              right: 8,
              highlights: [{ indices: [8], color: "green" as const, label: "中心" }],
              description: "第二圈只剩中心元素5。结果=[1,2,3,6,9,8,7,4,5]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 边界收缩

### 思路
使用四个边界变量控制遍历范围：
1. 从左到右：遍历上边界，然后 top++
2. 从上到下：遍历右边界，然后 right--
3. 从右到左：遍历下边界，然后 bottom--
4. 从下到上：遍历左边界，然后 left++

### 注意
- 第3、4步需要检查边界，避免重复遍历`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "方向数组",
        animation: {
          type: "two-pointers" as const,
          title: "方向数组螺旋遍历演示",
          steps: [
            {
              array: ["→", "↓", "←", "↑"],
              left: 0,
              right: 3,
              highlights: [{ indices: [0], color: "blue" as const, label: "dir=0" }],
              description: "四方向：右下左上。dirs=[[0,1],[1,0],[0,-1],[-1,0]]",
            },
            {
              array: ["1", "2", "3"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "→" }],
              description: "(0,0)→(0,2)向右。遇到边界，dir=(0+1)%4=1转向下",
            },
            {
              array: ["6", "9"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "yellow" as const, label: "↓" }],
              description: "(1,2)→(2,2)向下。遇到边界，dir=2转向左",
            },
            {
              array: ["1→2→3↓6↓9←8←7↑4→5"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "green" as const, label: "完成" }],
              description: "继续转向遍历。结果=[1,2,3,6,9,8,7,4,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 螺旋矩阵 - 方向数组法
 *
 * 核心思想：定义四个方向，遇到边界或已访问则转向
 *
 * 方向顺序：右 → 下 → 左 → 上 → 右...（循环）
 *
 * 转向条件：
 * - 越界
 * - 遇到已访问的格子
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n)，需要 visited 数组
 */
function spiralOrder(matrix) {
  if (!matrix.length) return [];

  const m = matrix.length, n = matrix[0].length;
  const result = [];
  // 标记已访问的格子
  const visited = Array.from({ length: m }, () => new Array(n).fill(false));

  // 四个方向：右、下、左、上
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let dir = 0; // 当前方向索引
  let row = 0, col = 0; // 当前位置

  /**
   * 遍历过程
   *
   * 从 (0,0) 开始，初始方向为右
   *
   * 每次移动：
   * 1. 记录当前位置的值
   * 2. 标记为已访问
   * 3. 计算下一个位置
   * 4. 如果下一个位置无效（越界或已访问），则转向
   * 5. 移动到下一个位置
   */
  for (let i = 0; i < m * n; i++) {
    // 记录当前值
    result.push(matrix[row][col]);
    visited[row][col] = true;

    // 计算下一个位置
    const nextRow = row + dirs[dir][0];
    const nextCol = col + dirs[dir][1];

    // 检查是否需要转向
    if (nextRow < 0 || nextRow >= m || nextCol < 0 || nextCol >= n || visited[nextRow][nextCol]) {
      // 顺时针转向：(dir + 1) % 4
      dir = (dir + 1) % 4;
    }

    // 移动到下一个位置
    row += dirs[dir][0];
    col += dirs[dir][1];
  }

  return result;
}`,
        explanation: `## 方向数组

### 思路
1. 定义四个方向：右、下、左、上
2. 用 visited 数组标记已访问
3. 遇到边界或已访问，就转向

### 特点
- 逻辑更通用，易于扩展
- 需要额外的访问标记数组`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "逐层遍历",
        animation: {
          type: "two-pointers" as const,
          title: "逐层遍历螺旋矩阵演示",
          steps: [
            {
              array: ["层0", "层1"],
              left: 0,
              right: 1,
              highlights: [],
              description: "3×3矩阵=2层。层数=ceil(min(3,3)/2)=2",
            },
            {
              array: ["1", "2", "3", "6", "9", "8", "7", "4"],
              left: 0,
              right: 7,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7], color: "blue" as const, label: "层0" }],
              description: "第0层(外圈): top=0,bottom=2,left=0,right=2",
            },
            {
              array: ["5"],
              left: 0,
              right: 0,
              highlights: [{ indices: [0], color: "yellow" as const, label: "层1" }],
              description: "第1层(中心): top=1,bottom=1,left=1,right=1",
            },
            {
              array: ["1", "2", "3", "6", "9", "8", "7", "4", "5"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "完成" }],
              description: "遍历完所有层。结果=[1,2,3,6,9,8,7,4,5]",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 螺旋矩阵 - 逐层遍历法
 *
 * 核心思想：把矩阵看作一层一层的"洋葱"，从外到内逐层剥离
 *
 * 层数计算：layers = ceil(min(m, n) / 2)
 *
 * 每层的边界：
 * - 第 k 层（从 0 开始）
 * - top = k, bottom = m - 1 - k
 * - left = k, right = n - 1 - k
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(1)
 */
function spiralOrder(matrix) {
  const result = [];
  if (!matrix.length) return result;

  const m = matrix.length, n = matrix[0].length;
  // 计算层数
  let layers = Math.ceil(Math.min(m, n) / 2);

  /**
   * 逐层处理
   *
   * 3×3 矩阵只有 2 层：
   * 第 0 层：外圈 [1,2,3,6,9,8,7,4]
   * 第 1 层：中心 [5]
   *
   * 3×4 矩阵只有 2 层：
   * 第 0 层：外圈
   * 第 1 层：中间一行
   */
  for (let layer = 0; layer < layers; layer++) {
    const top = layer, bottom = m - 1 - layer;
    const left = layer, right = n - 1 - layer;

    // 上边：从左到右
    for (let j = left; j <= right; j++) {
      result.push(matrix[top][j]);
    }

    // 右边：从上到下（跳过右上角，已在上边处理）
    for (let i = top + 1; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }

    // 下边：从右到左（需要有下边，即 top < bottom）
    if (top < bottom) {
      for (let j = right - 1; j >= left; j--) {
        result.push(matrix[bottom][j]);
      }
    }

    // 左边：从下到上（需要有左边，即 left < right）
    if (left < right) {
      for (let i = bottom - 1; i > top; i--) {
        result.push(matrix[i][left]);
      }
    }
  }

  return result;
}`,
        explanation: `## 逐层遍历

### 思路
把螺旋遍历看作一层一层的圆环，从外到内逐层处理。

### 层数计算
layers = Math.ceil(Math.min(m, n) / 2)

### 特点
- 思路更清晰
- 不需要额外空间`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 3. 旋转图像 (48)
  {
    id: "rotate-image",
    leetcodeId: 48,
    title: "旋转图像",
    titleEn: "Rotate Image",
    difficulty: "medium",
    category: "matrix",
    tags: ["数组", "矩阵", "数学"],
    frontendRelevance: "medium",
    frontendNote: "矩阵旋转",
    description: `给定一个 \`n × n\` 的二维矩阵 \`matrix\` 表示一个图像。请你将图像顺时针旋转 90 度。

你必须在 **原地** 旋转图像，这意味着你需要直接修改输入的二维矩阵。**请不要** 使用另一个矩阵来旋转图像。`,
    examples: `**示例 1：**
\`\`\`
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[[7,4,1],[8,5,2],[9,6,3]]
\`\`\`

**示例 2：**
\`\`\`
输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
\`\`\``,
    constraints: `- \`n == matrix.length == matrix[i].length\`
- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\``,
    initialCode: `function rotate(matrix) {
  // 在此处编写你的代码

}`,
    solution: `function rotate(matrix) {
  const n = matrix.length;

  // 先转置矩阵
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  // 再左右翻转每一行
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`,
    testCases: [
      {
        id: "1",
        name: "3x3矩阵",
        input: [[[1,2,3],[4,5,6],[7,8,9]]],
        expected: [[7,4,1],[8,5,2],[9,6,3]]
      },
      {
        id: "2",
        name: "4x4矩阵",
        input: [[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]],
        expected: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
      },
      {
        id: "3",
        name: "1x1矩阵",
        input: [[[1]]],
        expected: [[1]]
      },
      {
        id: "4",
        name: "2x2矩阵",
        input: [[[1,2],[3,4]]],
        expected: [[3,1],[4,2]]
      }
    ],
    hints: [
      "顺时针旋转90度 = 先转置 + 再左右翻转",
      "转置：交换 matrix[i][j] 和 matrix[j][i]",
      "也可以逆时针旋转90度 = 先转置 + 再上下翻转"
    ],
    explanation: `## 解题思路

### 转置 + 翻转

顺时针旋转90度可以分解为两步：
1. **转置矩阵**：行变列，列变行
2. **水平翻转**：每一行左右翻转

### 数学关系
- 原位置 (i, j) → 旋转后位置 (j, n-1-i)
- 转置后：(i, j) → (j, i)
- 翻转后：(j, i) → (j, n-1-i)

### 复杂度分析
- 时间复杂度：O(n²)
- 空间复杂度：O(1)，原地修改`,
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    relatedProblems: ["spiral-matrix", "set-matrix-zeroes"],
    solutions: [
      {
        name: "转置 + 翻转（推荐）",
        code: `/**
 * 旋转图像 - 转置 + 翻转法
 *
 * 核心思想：将顺时针旋转 90° 分解为两个简单操作
 * 1. 转置矩阵：沿主对角线翻转（行列互换）
 * 2. 水平翻转：每行左右翻转
 *
 * 数学推导：
 * - 原位置 (i, j) → 顺时针旋转 90° → 新位置 (j, n-1-i)
 * - 转置后：(i, j) → (j, i)
 * - 水平翻转后：(j, i) → (j, n-1-i) ✓
 *
 * 示例：3×3 矩阵
 * 原矩阵:     转置后:      水平翻转后:
 * 1 2 3      1 4 7       7 4 1
 * 4 5 6  →   2 5 8   →   8 5 2
 * 7 8 9      3 6 9       9 6 3
 *
 * 时间复杂度：O(n²) - 转置 O(n²) + 翻转 O(n²)
 * 空间复杂度：O(1) - 原地修改
 */
function rotate(matrix) {
  const n = matrix.length;

  /**
   * 第一步：转置矩阵
   *
   * 转置 = 沿主对角线翻转，交换 (i,j) 和 (j,i)
   * 只需遍历上三角（j > i），避免交换两次
   *
   * 示例：
   * 1 2 3      1 4 7
   * 4 5 6  →   2 5 8
   * 7 8 9      3 6 9
   *
   * 交换：(0,1)↔(1,0), (0,2)↔(2,0), (1,2)↔(2,1)
   */
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      // 解构赋值交换
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  /**
   * 第二步：水平翻转每一行
   *
   * 示例：
   * 1 4 7      7 4 1
   * 2 5 8  →   8 5 2
   * 3 6 9      9 6 3
   */
  for (let i = 0; i < n; i++) {
    matrix[i].reverse();
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "旋转图像演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [],
              description: "3x3矩阵。顺时针旋转90°=先转置+再水平翻转",
            },
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3], color: "blue" as const, label: "交换" }],
              description: "转置：交换(0,1)↔(1,0)。2↔4",
            },
            {
              array: ["1", "4", "3", "2", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [2, 6], color: "blue" as const, label: "交换" }, { indices: [5, 7], color: "green" as const, label: "交换" }],
              description: "转置：交换(0,2)↔(2,0), (1,2)↔(2,1)。3↔7, 6↔8",
            },
            {
              array: ["1", "4", "7", "2", "5", "8", "3", "6", "9"],
              left: 0,
              right: 8,
              highlights: [],
              description: "转置完成。现在水平翻转每一行",
            },
            {
              array: ["7", "4", "1", "8", "5", "2", "9", "6", "3"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2], color: "green" as const, label: "行1翻转" }, { indices: [3, 4, 5], color: "blue" as const, label: "行2翻转" }, { indices: [6, 7, 8], color: "gray" as const, label: "行3翻转" }],
              description: "水平翻转完成。结果=[[7,4,1],[8,5,2],[9,6,3]]",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 转置 + 翻转

### 思路
顺时针旋转90度可以分解为两个简单操作：
1. **转置矩阵**：沿主对角线翻转，即交换 matrix[i][j] 和 matrix[j][i]
2. **水平翻转**：将每一行左右翻转

### 数学推导
- 原位置 (i, j) → 顺时针旋转90度后 → (j, n-1-i)
- 转置后：(i, j) → (j, i)
- 再水平翻转：(j, i) → (j, n-1-i)

这两步操作的组合正好等于顺时针旋转90度！

### 为什么这个方法更简单？
- 转置和翻转都是简单的两两交换
- 代码清晰易懂，不容易出错
- 不需要考虑复杂的坐标变换`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
      {
        name: "四角轮换",
        animation: {
          type: "two-pointers" as const,
          title: "四角轮换旋转演示",
          steps: [
            {
              array: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 2, 6, 8], color: "blue" as const, label: "四角" }],
              description: "3x3矩阵。每次4个位置循环轮换",
            },
            {
              array: ["①", "↗", "③"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 2], color: "yellow" as const, label: "轮换" }],
              description: "(0,0)→(0,2)→(2,2)→(2,0)→(0,0)。1→3→9→7→1",
            },
            {
              array: ["7", "2", "1", "4", "5", "6", "9", "8", "3"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 2, 6, 8], color: "green" as const, label: "完成" }],
              description: "四角轮换后：1→右上,3→右下,9→左下,7→左上",
            },
            {
              array: ["7", "4", "1", "8", "5", "2", "9", "6", "3"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3, 5, 7], color: "green" as const, label: "边轮换" }],
              description: "(0,1)四角轮换：2→6→8→4→2。旋转完成!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 旋转图像 - 四角轮换法
 *
 * 核心思想：每次旋转涉及 4 个位置的元素循环交换
 *
 * 四角对应关系（顺时针旋转 90°）：
 * - 左上角 (i, j) → 右上角 (j, n-1-i)
 * - 右上角 (j, n-1-i) → 右下角 (n-1-i, n-1-j)
 * - 右下角 (n-1-i, n-1-j) → 左下角 (n-1-j, i)
 * - 左下角 (n-1-j, i) → 左上角 (i, j)
 *
 * 示例：4×4 矩阵，处理位置 (0,1)
 *
 *    0   1   2   3
 * 0 [ 5] [1] [ 9] [11]     1 → 11 → 16 → 14 → 1
 * 1 [ 2] [ 4] [ 8] [10]
 * 2 [13] [ 3] [ 6] [ 7]    四个位置循环轮换：
 * 3 [15] [14] [12] [16]    (0,1)→(1,3)→(3,2)→(2,0)→(0,1)
 *
 * 遍历范围：只需处理矩阵的 1/4
 * - i: [0, n/2)
 * - j: [i, n-1-i)
 *
 * 时间复杂度：O(n²) - 每个元素恰好被访问一次
 * 空间复杂度：O(1) - 只用一个临时变量
 */
function rotate(matrix) {
  const n = matrix.length;

  /**
   * 遍历左上角 1/4 区域
   *
   * n=4 时：
   * - 第 0 层：i=0, j=[0,2] 即 (0,0),(0,1),(0,2)
   * - 第 1 层：i=1, j=[1,1] 即 (1,1) - 只有一个
   *
   * 每个位置带动 4 个角落的元素进行轮换
   */
  for (let i = 0; i < Math.floor(n / 2); i++) {
    for (let j = i; j < n - 1 - i; j++) {
      /**
       * 四角轮换示例：(i=0, j=1)，n=4
       *
       * 位置对应：
       * - 左上 (0, 1) = 1
       * - 右上 (1, 3) = 10
       * - 右下 (3, 2) = 12
       * - 左下 (2, 0) = 13
       *
       * 轮换：1 → 右上，10 → 右下，12 → 左下，13 → 左上
       */
      // 保存左上角的值
      const temp = matrix[i][j];

      // 左下 → 左上：matrix[n-1-j][i] → matrix[i][j]
      matrix[i][j] = matrix[n - 1 - j][i];

      // 右下 → 左下：matrix[n-1-i][n-1-j] → matrix[n-1-j][i]
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];

      // 右上 → 右下：matrix[j][n-1-i] → matrix[n-1-i][n-1-j]
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];

      // 左上（temp）→ 右上
      matrix[j][n - 1 - i] = temp;
    }
  }
}`,
        explanation: `## 四角轮换

### 思路
每次旋转涉及4个位置的元素循环交换：
- 左上角 → 右上角
- 右上角 → 右下角
- 右下角 → 左下角
- 左下角 → 左上角

### 坐标对应关系
对于位置 (i, j)，顺时针旋转90度涉及的四个点：
- (i, j) → (j, n-1-i) → (n-1-i, n-1-j) → (n-1-j, i) → (i, j)

### 遍历范围
- 外层循环 i: [0, n/2)
- 内层循环 j: [i, n-1-i)
- 只遍历 1/4 的矩阵，每次处理4个元素

### 优点
- 直接一步到位，只需一次遍历
- 每个元素恰好被访问一次`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
      {
        name: "逐层旋转",
        animation: {
          type: "two-pointers" as const,
          title: "逐层旋转演示",
          steps: [
            {
              array: ["外层", "内层"],
              left: 0,
              right: 1,
              highlights: [],
              description: "把矩阵看作洋葱，从外向内逐层处理",
            },
            {
              array: ["1", "2", "3", "4", ".", "6", "7", "8", "9"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 5, 6, 7, 8], color: "blue" as const, label: "层0" }],
              description: "3x3矩阵。第0层(外层)：top=0,bottom=2",
            },
            {
              array: ["7", "4", "1", "8", "5", "2", "9", "6", "3"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 5, 6, 7, 8], color: "green" as const, label: "旋转完成" }],
              description: "外层旋转完成。中心元素5不变。结果正确!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 旋转图像 - 逐层旋转法
 *
 * 核心思想：将矩阵看作一层层的"洋葱"，从外层向内层逐层处理
 *
 * 层次结构：
 * - 第 0 层（最外层）：边界 [0, n-1]
 * - 第 1 层（次外层）：边界 [1, n-2]
 * - ...依此类推
 *
 * 层数计算：
 * - n 为偶数时：n/2 层
 * - n 为奇数时：(n-1)/2 层（中心元素不需移动）
 *
 * 示例：4×4 矩阵
 * 第 0 层（外圈）：     第 1 层（内圈）：
 * [5] [1] [9] [11]      [ ] [ ] [ ] [ ]
 * [2]          [10]     [ ] [4] [8] [ ]
 * [13]         [7]      [ ] [3] [6] [ ]
 * [15][14][12] [16]     [ ] [ ] [ ] [ ]
 *
 * 时间复杂度：O(n²) - 每个元素处理一次
 * 空间复杂度：O(1) - 只用一个临时变量
 */
function rotate(matrix) {
  const n = matrix.length;
  // top 和 bottom 标识当前处理的层
  let top = 0;
  let bottom = n - 1;

  /**
   * 逐层处理
   *
   * 每层处理 (bottom - top) 个元素的四角轮换
   *
   * 示例：n=4，第 0 层
   * top=0, bottom=3
   * i 从 0 到 2（共 3 次轮换）
   */
  while (top < bottom) {
    for (let i = 0; i < bottom - top; i++) {
      const left = top;
      const right = bottom;

      /**
       * 四角轮换
       *
       * 假设 top=0, bottom=3, i=1（第 0 层的第 2 个位置）
       *
       * 四个位置：
       * - 左上：matrix[top][left + i] = matrix[0][1]
       * - 右上：matrix[top + i][right] = matrix[1][3]
       * - 右下：matrix[bottom][right - i] = matrix[3][2]
       * - 左下：matrix[bottom - i][left] = matrix[2][0]
       */
      // 保存左上角
      const topLeft = matrix[top][left + i];

      // 左下 → 左上
      matrix[top][left + i] = matrix[bottom - i][left];

      // 右下 → 左下
      matrix[bottom - i][left] = matrix[bottom][right - i];

      // 右上 → 右下
      matrix[bottom][right - i] = matrix[top + i][right];

      // 左上 → 右上
      matrix[top + i][right] = topLeft;
    }

    // 向内收缩一层
    top++;
    bottom--;
  }
}`,
        explanation: `## 逐层旋转

### 思路
将矩阵看作一层层的"洋葱"，从外层向内层逐层处理：
1. 最外层：边界 [0, n-1]
2. 次外层：边界 [1, n-2]
3. 依此类推...

### 每层处理
对于每一层，从左上角开始，依次处理该层上边的每个元素。
每个元素带动四个角落的元素进行循环轮换。

### 层数
- n 为偶数时：n/2 层
- n 为奇数时：(n-1)/2 层（中心元素不需要移动）

### 特点
- 清晰的层次结构
- 便于理解和可视化`,
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 4. 矩阵置零 (73)
  {
    id: "set-matrix-zeroes",
    leetcodeId: 73,
    title: "矩阵置零",
    titleEn: "Set Matrix Zeroes",
    difficulty: "medium",
    category: "matrix",
    tags: ["数组", "哈希表", "矩阵"],
    frontendRelevance: "medium",
    frontendNote: "矩阵置零",
    description: `给定一个 \`m x n\` 的矩阵，如果一个元素为 **0**，则将其所在行和列的所有元素都设为 **0**。请使用 **原地** 算法。`,
    examples: `**示例 1：**
\`\`\`
输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
输出：[[1,0,1],[0,0,0],[1,0,1]]
\`\`\`

**示例 2：**
\`\`\`
输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
\`\`\``,
    constraints: `- \`m == matrix.length\`
- \`n == matrix[0].length\`
- \`1 <= m, n <= 200\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\`

**进阶：**
- 一个直观的解决方案是使用 O(mn) 的额外空间，但这并不是一个好的解决方案。
- 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
- 你能想出一个仅使用常量空间的解决方案吗？`,
    initialCode: `function setZeroes(matrix) {
  // 在此处编写你的代码

}`,
    solution: `function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  // 用第一行和第一列作为标记
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // 检查第一行是否有0
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // 检查第一列是否有0
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // 用第一行和第一列记录需要置零的行和列
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0;
        matrix[0][j] = 0;
      }
    }
  }

  // 根据标记置零（除第一行第一列外）
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  // 处理第一行
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  // 处理第一列
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[1,1,1],[1,0,1],[1,1,1]]],
        expected: [[1,0,1],[0,0,0],[1,0,1]]
      },
      {
        id: "2",
        name: "示例2",
        input: [[[0,1,2,0],[3,4,5,2],[1,3,1,5]]],
        expected: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
      },
      {
        id: "3",
        name: "无零",
        input: [[[1,2],[3,4]]],
        expected: [[1,2],[3,4]]
      }
    ],
    hints: [
      "可以用第一行和第一列作为标记数组",
      "需要额外变量记录第一行和第一列本身是否需要置零",
      "处理顺序很重要：先标记，再置零，最后处理第一行第一列"
    ],
    explanation: `## 解题思路

### O(1) 空间解法

利用矩阵的第一行和第一列作为标记：

1. **记录第一行/列状态**：先检查第一行和第一列是否有0
2. **标记**：遍历矩阵，若 matrix[i][j] = 0，则标记 matrix[i][0] = 0, matrix[0][j] = 0
3. **置零**：根据标记置零（跳过第一行第一列）
4. **处理边界**：最后根据记录处理第一行和第一列

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["rotate-image", "game-of-life"],
    solutions: [
      {
        name: "原地标记 O(1) 空间（推荐）",
        code: `/**
 * 矩阵置零 - 原地标记法
 *
 * 核心思想：利用矩阵的第一行和第一列作为标记数组
 *
 * 为什么可以这样做？
 * - 如果某行需要置零，那么该行第一个元素最终也会变成 0
 * - 如果某列需要置零，那么该列第一个元素最终也会变成 0
 * - 所以可以提前用它们来存储标记信息
 *
 * 处理顺序（很重要！）：
 * 1. 先记录第一行、第一列本身是否有 0
 * 2. 用第一行、第一列记录其他位置的 0
 * 3. 根据标记置零（跳过第一行、第一列）
 * 4. 最后处理第一行和第一列
 *
 * 示例：
 * 原矩阵:        标记后:        置零后:
 * [0,1,2,0]     [0,0,2,0]     [0,0,0,0]
 * [3,4,5,2]     [0,4,5,2]     [0,4,5,0]
 * [1,3,1,5]     [0,3,1,5]     [0,3,1,0]
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(1)
 */
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;

  /**
   * 第一步：记录第一行、第一列本身是否有 0
   *
   * 必须先做这一步！因为后面会用第一行、第一列存储标记
   * 如果不先记录，就无法区分是原本的 0 还是标记的 0
   */
  let firstRowHasZero = false;
  let firstColHasZero = false;

  // 检查第一行是否有 0
  for (let j = 0; j < n; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // 检查第一列是否有 0
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  /**
   * 第二步：遍历矩阵，用第一行、第一列记录需要置零的行和列
   *
   * 示例：matrix[1][3] = 0
   * → 标记 matrix[1][0] = 0（第 1 行需要置零）
   * → 标记 matrix[0][3] = 0（第 3 列需要置零）
   */
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // 标记第 i 行
        matrix[0][j] = 0; // 标记第 j 列
      }
    }
  }

  /**
   * 第三步：根据标记置零（除第一行、第一列外）
   *
   * 如果 matrix[i][0] = 0 或 matrix[0][j] = 0
   * 则 matrix[i][j] = 0
   */
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
  }

  /**
   * 第四步：处理第一行
   * 如果原本第一行有 0，则整行置零
   */
  if (firstRowHasZero) {
    for (let j = 0; j < n; j++) {
      matrix[0][j] = 0;
    }
  }

  /**
   * 第五步：处理第一列
   * 如果原本第一列有 0，则整列置零
   */
  if (firstColHasZero) {
    for (let i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "矩阵置零演示",
          steps: [
            {
              array: ["1", "1", "1", "1", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [4], color: "red" as const, label: "0" }],
              description: "3x3矩阵，中间位置[1][1]=0。用第一行第一列作为标记",
            },
            {
              array: ["1", "1", "1", "1", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [3], color: "blue" as const, label: "标记行" }, { indices: [1], color: "green" as const, label: "标记列" }],
              description: "发现[1][1]=0。标记matrix[1][0]=0，matrix[0][1]=0",
            },
            {
              array: ["1", "0", "1", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3], color: "gray" as const, label: "标记" }],
              description: "标记完成。第一行[0,1]=0表示第1列置零，第一列[1,0]=0表示第1行置零",
            },
            {
              array: ["1", "0", "1", "0", "0", "0", "1", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [3, 4, 5, 7], color: "red" as const, label: "置0" }],
              description: "根据标记置零：第1行和第1列的所有元素置0",
            },
            {
              array: ["1", "0", "1", "0", "0", "0", "1", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "完成" }],
              description: "结果=[[1,0,1],[0,0,0],[1,0,1]]。O(1)额外空间",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 原地标记 O(1) 空间

### 思路
利用矩阵的第一行和第一列作为标记数组，记录哪些行和列需要置零。

### 详细步骤
1. **记录第一行/列状态**：先检查第一行和第一列本身是否有 0
2. **标记**：遍历矩阵，若 matrix[i][j] = 0，则标记 matrix[i][0] = 0, matrix[0][j] = 0
3. **置零**：根据标记将对应行列置零（跳过第一行第一列）
4. **处理边界**：最后根据步骤 1 的记录处理第一行和第一列

### 关键点
- 必须先记录第一行/列是否有 0，因为后续标记会修改它们
- 置零时要从后往前处理，避免覆盖标记信息
- 或者先处理内部，最后处理第一行/列`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "哈希集合 O(m+n) 空间",
        animation: {
          type: "two-pointers" as const,
          title: "哈希集合矩阵置零演示",
          steps: [
            {
              array: ["1", "1", "1", "1", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [4], color: "red" as const, label: "[1][1]=0" }],
              description: "3x3矩阵。用Set记录需要置零的行和列",
            },
            {
              array: ["zeroRows", "zeroCol"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0, 1], color: "blue" as const, label: "记录" }],
              description: "找到[1][1]=0。zeroRows={1}, zeroCols={1}",
            },
            {
              array: ["1", "0", "1", "0", "0", "0", "1", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3, 4, 5, 7], color: "red" as const, label: "置0" }],
              description: "第二遍：如果i在zeroRows或j在zeroCols，置0",
            },
            {
              array: ["1", "0", "1", "0", "0", "0", "1", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "完成" }],
              description: "结果=[[1,0,1],[0,0,0],[1,0,1]]。空间O(m+n)",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 矩阵置零 - 哈希集合法
 *
 * 核心思想：用两个集合分别记录需要置零的行和列
 *
 * 步骤：
 * 1. 第一遍遍历：找出所有 0 的位置，记录行号和列号
 * 2. 第二遍遍历：如果当前位置的行或列在集合中，则置零
 *
 * 示例：
 * 原矩阵:        集合记录:           置零后:
 * [1,1,1]       zeroRows = {1}     [1,0,1]
 * [1,0,1]       zeroCols = {1}     [0,0,0]
 * [1,1,1]                          [1,0,1]
 *
 * 时间复杂度：O(m × n) - 两次遍历
 * 空间复杂度：O(m + n) - 存储行和列索引
 */
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 记录需要置零的行
  const zeroRows = new Set();
  // 记录需要置零的列
  const zeroCols = new Set();

  /**
   * 第一遍：找出所有包含 0 的行和列
   *
   * 遍历整个矩阵，记录所有 0 的位置
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        zeroRows.add(i); // 记录行号
        zeroCols.add(j); // 记录列号
      }
    }
  }

  /**
   * 第二遍：根据记录置零
   *
   * 如果当前位置的行号在 zeroRows 中
   * 或者列号在 zeroCols 中
   * 则置零
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (zeroRows.has(i) || zeroCols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
}`,
        explanation: `## 哈希集合法

### 思路
用两个集合分别记录需要置零的行和列：
1. 第一遍遍历：找出所有 0 的位置，记录其行号和列号
2. 第二遍遍历：如果当前位置的行或列在集合中，则置零

### 优点
- 代码简洁直观
- 逻辑清晰，不容易出错

### 缺点
- 需要 O(m+n) 的额外空间`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m + n)",
      },
      {
        name: "暴力标记",
        animation: {
          type: "two-pointers" as const,
          title: "暴力标记矩阵置零演示",
          steps: [
            {
              array: ["1", "1", "1", "1", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [4], color: "red" as const, label: "[1][1]=0" }],
              description: "用特殊标记MARKER=-1000001标记待置零位置",
            },
            {
              array: ["1", "M", "1", "M", "0", "M", "1", "M", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3, 5, 7], color: "yellow" as const, label: "标记M" }],
              description: "发现[1][1]=0，标记同行同列非0元素为M",
            },
            {
              array: ["1", "0", "1", "0", "0", "0", "1", "0", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 3, 5, 7], color: "green" as const, label: "M→0" }],
              description: "第二遍：所有M改为0。完成!",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 矩阵置零 - 暴力标记法
 *
 * 核心思想：用一个特殊标记值来标记需要置零的位置
 *
 * 关键技巧：
 * - 使用题目约束范围外的值作为标记
 * - 本题约束 -2^31 ≤ matrix[i][j] ≤ 2^31-1
 * - 使用 -1000001 作为标记（超出常见范围）
 *
 * 步骤：
 * 1. 遇到原始的 0 时，将同行同列的非 0 元素标记为特殊值
 * 2. 最后将所有特殊值改为 0
 *
 * 注意：不能把原始的 0 改成特殊值，否则会丢失信息
 *
 * 示例：MARKER = -1000001
 * 原矩阵:        标记后:           置零后:
 * [1,1,1]       [1,-1000001,1]    [1,0,1]
 * [1,0,1]       [-1000001,0,-1000001]  [0,0,0]
 * [1,1,1]       [1,-1000001,1]    [1,0,1]
 *
 * 时间复杂度：O(m × n × (m + n)) - 每个 0 都要标记整行整列
 * 空间复杂度：O(1)
 */
function setZeroes(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 题目约束外的特殊值（必须确保不会与矩阵中的值冲突）
  const MARKER = -1000001;

  /**
   * 第一遍：找到 0，将同行同列非 0 元素标记
   *
   * 关键：只标记非 0 的元素
   * 如果把 0 也标记成 MARKER，后续就无法识别原始的 0 了
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 只处理原始的 0（不处理标记值）
      if (matrix[i][j] === 0) {
        // 标记整行（跳过 0 本身）
        for (let k = 0; k < n; k++) {
          if (matrix[i][k] !== 0) {
            matrix[i][k] = MARKER;
          }
        }
        // 标记整列（跳过 0 本身）
        for (let k = 0; k < m; k++) {
          if (matrix[k][j] !== 0) {
            matrix[k][j] = MARKER;
          }
        }
      }
    }
  }

  /**
   * 第二遍：将标记转为 0
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === MARKER) {
        matrix[i][j] = 0;
      }
    }
  }
}`,
        explanation: `## 暴力标记法

### 思路
使用一个特殊标记值（题目约束范围外）来标记需要置零的位置：
1. 遇到原始的 0 时，将同行同列的非 0 元素标记为特殊值
2. 最后将所有特殊值改为 0

### 注意事项
- 标记时不能把原始的 0 改成特殊值，否则会丢失信息
- 特殊值必须在题目约束范围外（本题 -10^9 到 10^9，可用更小或更大的值）

### 缺点
- 如果值域没有限制，这种方法不可用
- 时间复杂度较高 O(m × n × (m + n))`,
        timeComplexity: "O(m × n × (m + n))",
        spaceComplexity: "O(1)",
      },
    ],
  },

  // 5. 生命游戏 (289)
  {
    id: "game-of-life",
    leetcodeId: 289,
    title: "生命游戏",
    titleEn: "Game of Life",
    difficulty: "medium",
    category: "matrix",
    tags: ["数组", "矩阵", "模拟"],
    frontendRelevance: "low",
    frontendNote: "生命游戏",
    description: `根据 百度百科 ， **生命游戏**，简称为 **生命**，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。

给定一个包含 \`m × n\` 个格子的面板，每个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： **1** 即为 **活细胞（live）**，或 **0** 即为 **死细胞（dead）**。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

1. 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
2. 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
3. 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
4. 如果死细胞周围正好有三个活细胞，则该位置死细胞复活。

下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是 **同时** 发生的。给你 \`m x n\` 网格面板 \`board\` 的当前状态，返回下一个状态。`,
    examples: `**示例 1：**
\`\`\`
输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
\`\`\`

**示例 2：**
\`\`\`
输入：board = [[1,1],[1,0]]
输出：[[1,1],[1,1]]
\`\`\``,
    constraints: `- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 25\`
- \`board[i][j]\` 为 \`0\` 或 \`1\`

**进阶：**
- 你可以使用原地算法解决本题吗？请注意，面板上所有格子需要同时被更新：你不能先更新某些格子，然后使用它们的更新后的值再更新其他格子。`,
    initialCode: `function gameOfLife(board) {
  // 在此处编写你的代码

}`,
    solution: `function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];

  // 计算相邻活细胞数
  const countLiveNeighbors = (row, col) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < m && c >= 0 && c < n) {
        // 使用 & 1 获取原始状态（处理状态2的情况）
        if ((board[r][c] & 1) === 1) {
          count++;
        }
      }
    }
    return count;
  };

  // 第一遍：标记状态变化
  // 使用状态编码：
  // 0: 死 -> 死
  // 1: 活 -> 活
  // 2: 活 -> 死（用二进制 10 表示，原状态为活）
  // 3: 死 -> 活（用二进制 11 表示，新状态为活）
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const liveNeighbors = countLiveNeighbors(i, j);

      if (board[i][j] === 1) {
        // 活细胞
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 2; // 活 -> 死
        }
      } else {
        // 死细胞
        if (liveNeighbors === 3) {
          board[i][j] = 3; // 死 -> 活
        }
      }
    }
  }

  // 第二遍：更新为最终状态
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 0;
      } else if (board[i][j] === 3) {
        board[i][j] = 1;
      }
    }
  }
}`,
    testCases: [
      {
        id: "1",
        name: "示例1",
        input: [[[0,1,0],[0,0,1],[1,1,1],[0,0,0]]],
        expected: [[0,0,0],[1,0,1],[0,1,1],[0,1,0]]
      },
      {
        id: "2",
        name: "示例2",
        input: [[[1,1],[1,0]]],
        expected: [[1,1],[1,1]]
      },
      {
        id: "3",
        name: "全死",
        input: [[[0,0],[0,0]]],
        expected: [[0,0],[0,0]]
      }
    ],
    hints: [
      "关键是如何原地更新，同时保留原始状态信息",
      "可以用额外的状态值来编码状态转换",
      "例如：2 表示活→死，3 表示死→活",
      "最后统一更新为最终状态"
    ],
    explanation: `## 解题思路

### 原地算法 - 状态编码

由于需要同时更新所有格子，我们用额外状态编码变化：
- **0**：死 → 死
- **1**：活 → 活
- **2**：活 → 死（原状态活，二进制最低位为0）
- **3**：死 → 活（新状态活）

第一遍遍历时，用 \`board[r][c] & 1\` 获取原始状态（判断最低位）。
第二遍将 2 改为 0，3 改为 1。

### 规则总结
- 活细胞：邻居 < 2 或 > 3 则死亡
- 死细胞：邻居 = 3 则复活

### 复杂度分析
- 时间复杂度：O(m × n)
- 空间复杂度：O(1)`,
    timeComplexity: "O(m × n)",
    spaceComplexity: "O(1)",
    relatedProblems: ["set-matrix-zeroes", "spiral-matrix"],
    solutions: [
      {
        name: "状态编码 O(1) 空间（推荐）",
        code: `/**
 * 生命游戏 - 状态编码法
 *
 * 核心思想：用额外的状态值来同时记录当前状态和下一状态
 *
 * 生命游戏规则：
 * 1. 活细胞周围活细胞 < 2：死亡（孤独）
 * 2. 活细胞周围活细胞 = 2 或 3：存活
 * 3. 活细胞周围活细胞 > 3：死亡（拥挤）
 * 4. 死细胞周围活细胞 = 3：复活
 *
 * 状态编码：
 * - 0：死 → 死（无变化）
 * - 1：活 → 活（无变化）
 * - 2：活 → 死（原来是活的，将要死）
 * - 3：死 → 活（原来是死的，将要活）
 *
 * 关键技巧：用 & 1 获取原始状态
 * - 0 & 1 = 0（死）
 * - 1 & 1 = 1（活）
 * - 2 & 1 = 0（但原来是活的！）
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(1)
 */
function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;
  // 八个方向：上、下、左、右、四个对角
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];

  /**
   * 计算相邻活细胞数
   *
   * 关键：使用 & 1 获取原始状态
   * 因为状态 2（活→死）的原始状态是活
   * 所以在计数时应该算作活细胞
   *
   * 示例：neighbor = 2（活→死）
   * 2 & 1 = 0...但原来是活的！
   *
   * 修正：状态 2 的最低位是 0，但原来确实是活的
   * 所以判断条件是：board[r][c] & 1 === 1 或 board[r][c] === 2
   * 简化为：Math.abs(board[r][c]) === 1 或用更复杂的判断
   *
   * 实际上更好的理解：
   * 原状态 = board[r][c] % 2（对于 0,1,2,3 都适用）
   * 但这里用 & 1 只对 0,1 正确，对 2 不正确
   *
   * 最佳方案：在标记前计算邻居，这样邻居值还没被修改
   */
  const countLiveNeighbors = (row, col) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < m && c >= 0 && c < n) {
        // 状态 1 和 2 都代表原来是活的
        // 1 & 1 = 1（活→活），2 & 1 = 0（但原来是活）
        // 所以这里判断 board[r][c] === 1 或 === 2
        if ((board[r][c] & 1) === 1) {
          count++;
        }
      }
    }
    return count;
  };

  /**
   * 第一遍：标记状态变化
   *
   * 遍历顺序保证：
   * 当处理 (i,j) 时，它的邻居可能是：
   * - 未处理的（原值 0 或 1）
   * - 已处理的（可能变成 2 或 3）
   *
   * 对于已处理的邻居：
   * - 状态 2（活→死）：& 1 = 0，但原来是活的
   *   → 需要额外检查！
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const liveNeighbors = countLiveNeighbors(i, j);

      if (board[i][j] === 1) {
        // 活细胞：邻居 < 2 或 > 3 则死亡
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 2; // 活 → 死
        }
        // 否则保持 1（活 → 活）
      } else {
        // 死细胞：邻居 = 3 则复活
        if (liveNeighbors === 3) {
          board[i][j] = 3; // 死 → 活
        }
        // 否则保持 0（死 → 死）
      }
    }
  }

  /**
   * 第二遍：更新为最终状态
   *
   * 状态转换：
   * - 0 → 0（死→死）
   * - 1 → 1（活→活）
   * - 2 → 0（活→死）
   * - 3 → 1（死→活）
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 2) {
        board[i][j] = 0;
      } else if (board[i][j] === 3) {
        board[i][j] = 1;
      }
    }
  }
}`,
        animation: {
          type: "two-pointers" as const,
          title: "生命游戏演示",
          steps: [
            {
              array: ["0", "1", "0", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1, 5, 6, 7, 8], color: "green" as const, label: "活" }],
              description: "3x3棋盘。1=活,0=死。规则：活细胞邻居<2或>3则死，死细胞邻居=3则活",
            },
            {
              array: ["0", "1", "0", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1], color: "blue" as const, label: "检查" }],
              description: "[0,1]活细胞，邻居数=1。<2孤独死亡，标记为2(活→死)",
            },
            {
              array: ["0", "2", "0", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [4], color: "blue" as const, label: "检查" }],
              description: "[1,1]死细胞，邻居数=5。≠3，保持死亡(0)",
            },
            {
              array: ["0", "2", "0", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [6, 8], color: "red" as const, label: "2→0" }],
              description: "第一遍完成。状态2=活→死，状态3=死→活。将2改0，3改1",
            },
            {
              array: ["0", "0", "0", "1", "0", "1", "0", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [3, 5, 7, 8], color: "green" as const, label: "活" }],
              description: "下一代：[[0,0,0],[1,0,1],[0,1,1]]。O(1)空间完成",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## 状态编码 O(1) 空间

### 思路
由于需要同时更新所有格子，我们用额外状态编码变化：
- **0**：死 → 死（二进制 00）
- **1**：活 → 活（二进制 01）
- **2**：活 → 死（二进制 10，最低位 0 表示原状态为活）
- **3**：死 → 活（二进制 11，最低位 1 表示新状态为活）

### 关键技巧
使用 \`board[r][c] & 1\` 获取原始状态：
- 0 & 1 = 0（原来是死）
- 1 & 1 = 1（原来是活）
- 2 & 1 = 0（原来是活，但二进制 10 的最低位是 0...这里需要特别注意！）

实际上更准确的理解：
- 状态 2 表示"原来是活，将要死"，用 & 1 得到 0，但这是因为 2 的二进制是 10
- 所以在统计邻居时，状态 2 应该算作活细胞（因为原来是活的）

### 生命游戏规则
1. 活细胞周围活细胞 < 2：死亡（孤独）
2. 活细胞周围活细胞 = 2 或 3：存活
3. 活细胞周围活细胞 > 3：死亡（拥挤）
4. 死细胞周围活细胞 = 3：复活`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "额外数组",
        animation: {
          type: "two-pointers" as const,
          title: "额外数组生命游戏演示",
          steps: [
            {
              array: ["原数组", "→", "副本"],
              left: 0,
              right: 2,
              highlights: [],
              description: "复制原数组。从副本读取原始状态，更新原数组",
            },
            {
              array: ["0", "1", "0", "0", "0", "1", "1", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [1], color: "blue" as const, label: "检查" }],
              description: "检查副本[0][1]，邻居数=1<2，该活细胞死亡",
            },
            {
              array: ["0", "0", "0", "1", "0", "1", "0", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: "更新完成" }],
              description: "根据副本状态更新原数组。空间O(m×n)",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 生命游戏 - 额外数组法
 *
 * 核心思想：复制一份原数组，从副本读取原始状态，直接更新原数组
 *
 * 为什么需要副本？
 * - 所有细胞的状态需要同时更新
 * - 如果直接修改原数组，后续细胞读取的就是已修改的值
 * - 用副本保留原始状态，避免相互干扰
 *
 * 生命游戏规则：
 * 1. 活细胞：邻居 < 2 → 死（孤独）
 * 2. 活细胞：邻居 = 2 或 3 → 活（存续）
 * 3. 活细胞：邻居 > 3 → 死（拥挤）
 * 4. 死细胞：邻居 = 3 → 活（繁殖）
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(m × n) - 复制数组
 */
function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;
  // 八个方向
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0], [1, 1]
  ];

  /**
   * 深拷贝原数组
   *
   * copy[i][j] 保存原始状态
   * board[i][j] 将被直接修改为新状态
   */
  const copy = board.map(row => [...row]);

  /**
   * 计算相邻活细胞数（从副本中读取）
   *
   * 从 copy 读取保证获取的是原始状态
   * 不受 board 修改的影响
   */
  const countLiveNeighbors = (row, col) => {
    let count = 0;
    for (const [dr, dc] of directions) {
      const r = row + dr;
      const c = col + dc;
      if (r >= 0 && r < m && c >= 0 && c < n && copy[r][c] === 1) {
        count++;
      }
    }
    return count;
  };

  /**
   * 根据规则更新
   *
   * 示例：
   * copy:            board（更新后）:
   * [0,1,0]          [0,0,0]
   * [0,0,1]   →      [1,0,1]
   * [1,1,1]          [0,1,1]
   * [0,0,0]          [0,1,0]
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const liveNeighbors = countLiveNeighbors(i, j);

      if (copy[i][j] === 1) {
        // 活细胞
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          board[i][j] = 0; // 死亡
        }
        // 否则保持活（不需要修改）
      } else {
        // 死细胞
        if (liveNeighbors === 3) {
          board[i][j] = 1; // 复活
        }
        // 否则保持死（不需要修改）
      }
    }
  }
}`,
        explanation: `## 额外数组法

### 思路
最直观的方法：复制一份原数组，从副本读取原始状态，直接更新原数组。

### 步骤
1. 深拷贝原数组
2. 遍历每个格子，根据副本中的邻居状态计算活邻居数
3. 根据生命游戏规则直接更新原数组

### 优点
- 逻辑简单清晰
- 不需要考虑状态编码

### 缺点
- 需要 O(m × n) 的额外空间`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(m × n)",
      },
      {
        name: "位运算优化",
        animation: {
          type: "two-pointers" as const,
          title: "位运算生命游戏演示",
          steps: [
            {
              array: ["bit0=当前", "bit1=下一"],
              left: 0,
              right: 1,
              highlights: [],
              description: "用二进制位存储状态。第0位=当前，第1位=下一代",
            },
            {
              array: ["01=活→死", "10=死→活", "11=活→活"],
              left: 0,
              right: 2,
              highlights: [{ indices: [0, 1, 2], color: "blue" as const, label: "编码" }],
              description: "状态编码：&1取当前状态，|=2设置下一代为活",
            },
            {
              array: ["1", "01", "0", "01", "0", "01", "11", "11", "11"],
              left: 0,
              right: 8,
              highlights: [{ indices: [6, 7, 8], color: "yellow" as const, label: "|=2" }],
              description: "第一遍：将活→活的设置高位。如邻居=3则|=2",
            },
            {
              array: ["0", "0", "0", "1", "0", "1", "0", "1", "1"],
              left: 0,
              right: 8,
              highlights: [{ indices: [0, 1, 2, 3, 4, 5, 6, 7, 8], color: "green" as const, label: ">>=1" }],
              description: "第二遍：全部>>=1，用下一代替换当前。O(1)空间",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 生命游戏 - 位运算优化法
 *
 * 核心思想：利用整数的二进制位同时存储当前状态和下一状态
 *
 * 位存储结构：
 * - 第 0 位（最低位）：当前状态
 * - 第 1 位：下一状态
 *
 * 位运算操作：
 * - board[i][j] & 1：获取当前状态（取最低位）
 * - board[i][j] |= 2：设置下一状态为存活（设置第 1 位为 1）
 * - board[i][j] >>= 1：右移，用下一状态替换当前状态
 *
 * 状态转换表：
 * | 二进制 | 值 | 当前 | 下一 | 含义 |
 * |--------|-----|------|------|------|
 * | 00     | 0   | 死   | 死   | 死→死 |
 * | 01     | 1   | 活   | 死   | 活→死 |
 * | 10     | 2   | 死   | 活   | 死→活 |
 * | 11     | 3   | 活   | 活   | 活→活 |
 *
 * 时间复杂度：O(m × n)
 * 空间复杂度：O(1)
 */
function gameOfLife(board) {
  const m = board.length;
  const n = board[0].length;

  /**
   * 第一遍：计算下一状态并存入高位
   *
   * 初始状态只有 0 或 1（第 0 位）
   * 下一状态存入第 1 位（|= 2）
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let liveNeighbors = 0;

      /**
       * 统计 8 个方向的活邻居
       *
       * 使用 & 1 获取当前状态（第 0 位）
       * 因为邻居可能已经被处理过，第 1 位可能已设置
       * 但当前状态始终在第 0 位
       */
      for (let di = -1; di <= 1; di++) {
        for (let dj = -1; dj <= 1; dj++) {
          if (di === 0 && dj === 0) continue; // 跳过自己
          const ni = i + di;
          const nj = j + dj;
          if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
            liveNeighbors += board[ni][nj] & 1; // 获取当前状态
          }
        }
      }

      /**
       * 计算下一状态，存入高位
       *
       * 示例：当前活（board[i][j] & 1 = 1），邻居 = 3
       * → 存活，设置第 1 位：board[i][j] |= 2
       * → 二进制变为 11（值为 3）
       */
      const current = board[i][j] & 1;
      if (current === 1) {
        // 活细胞：2 或 3 个邻居则存活
        if (liveNeighbors === 2 || liveNeighbors === 3) {
          board[i][j] |= 2; // 设置高位为 1（下一状态：活）
        }
        // 否则下一状态为死（高位保持 0）
      } else {
        // 死细胞：3 个邻居则复活
        if (liveNeighbors === 3) {
          board[i][j] |= 2; // 设置高位为 1（下一状态：活）
        }
        // 否则下一状态为死（高位保持 0）
      }
    }
  }

  /**
   * 第二遍：右移一位，高位变低位
   *
   * 示例：
   * - 00 >>= 1 → 0（死→死）
   * - 01 >>= 1 → 0（活→死）
   * - 10 >>= 1 → 1（死→活）
   * - 11 >>= 1 → 1（活→活）
   */
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      board[i][j] >>= 1;
    }
  }
}`,
        explanation: `## 位运算优化

### 思路
利用整数的二进制位来同时存储当前状态和下一状态：
- 第 0 位（最低位）：当前状态
- 第 1 位：下一状态

### 操作
- \`board[i][j] & 1\`：获取当前状态
- \`board[i][j] |= 2\`：设置下一状态为存活（或上 10）
- \`board[i][j] >>= 1\`：右移，用下一状态替换当前状态

### 状态转换表
| 当前状态 | 下一状态 | 二进制 | 值 |
|---------|---------|-------|-----|
| 死(0)   | 死(0)   | 00    | 0   |
| 死(0)   | 活(1)   | 10    | 2   |
| 活(1)   | 死(0)   | 01    | 1   |
| 活(1)   | 活(1)   | 11    | 3   |

### 优点
- 只需要用已有的整数位，真正的 O(1) 空间
- 位运算效率高`,
        timeComplexity: "O(m × n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
  // 8. 搜索二维矩阵 II (240)
  {
    id: "search-a-2d-matrix-ii",
    leetcodeId: 240,
    title: "搜索二维矩阵 II",
    titleEn: "Search a 2D Matrix II",
    difficulty: "medium" as const,
    category: "matrix",
    tags: ["Binary Search", "Divide and Conquer", "Matrix"],
    frontendRelevance: "low",
    frontendNote: "搜索二维矩阵II",
    description: `编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：

- 每行的元素从左到右升序排列。
- 每列的元素从上到下升序排列。`,
    examples: `**示例 1：**
\`\`\`
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
输出：false
\`\`\``,
    constraints: `- m == matrix.length
- n == matrix[i].length
- 1 <= n, m <= 300
- -10^9 <= matrix[i][j] <= 10^9
- 每行的所有元素从左到右升序排列
- 每列的所有元素从上到下升序排列
- -10^9 <= target <= 10^9`,
    initialCode: `function searchMatrix(matrix: number[][], target: number): boolean {
  // 在这里写你的代码
}`,
    solution: `function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let row = 0, col = n - 1;

  while (row < m && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      col--;
    } else {
      row++;
    }
  }

  return false;
}`,
    testCases: [
      {
        id: "1",
        name: "找到目标",
        input: [[[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 5],
        expected: true,
      },
      {
        id: "2",
        name: "目标不存在",
        input: [[[1, 4, 7, 11, 15], [2, 5, 8, 12, 19], [3, 6, 9, 16, 22], [10, 13, 14, 17, 24], [18, 21, 23, 26, 30]], 20],
        expected: false,
      },
    ],
    hints: [
      "从矩阵的右上角或左下角开始搜索",
      "右上角元素是该行最大值，该列最小值",
      "可以根据比较结果排除一行或一列",
    ],
    explanation: `## 解题思路

### Z字形查找（最优解）
从右上角开始搜索：
- 当前元素等于 target，找到
- 当前元素大于 target，排除当前列（向左移动）
- 当前元素小于 target，排除当前行（向下移动）

### 为什么选择右上角？
右上角元素是这一行的最大值，这一列的最小值：
- 如果 target 更小，它不可能在当前列
- 如果 target 更大，它不可能在当前行

### 时间复杂度
最多移动 m + n 次，所以是 O(m + n)。`,
    timeComplexity: "O(m + n)",
    spaceComplexity: "O(1)",
    solutions: [
      {
        name: "Z字形查找",
        code: `/**
 * 搜索二维矩阵 II - Z字形查找法
 *
 * 核心思想：从右上角开始搜索，利用矩阵的有序性每次排除一行或一列
 *
 * 矩阵特性：
 * - 每行从左到右升序
 * - 每列从上到下升序
 *
 * 为什么选择右上角？
 * - 右上角元素是该行的最大值
 * - 右上角元素是该列的最小值
 *
 * 搜索策略：
 * - 当前元素 = target：找到！
 * - 当前元素 > target：target 不可能在当前列（当前元素是列最小值）
 *                      → 向左移动（col--）
 * - 当前元素 < target：target 不可能在当前行（当前元素是行最大值）
 *                      → 向下移动（row++）
 *
 * 搜索路径形似字母 Z：
 *
 *     1   4   7  11 [15] ← 起点
 *     2   5   8  12  19
 *     3   6   9  16  22
 *    10  13  14  17  24
 *    18  21  23  26  30
 *
 * 查找 target=5 的路径：
 * 15 → 11 → 7 → 4 → 5 ✓
 *
 * 时间复杂度：O(m + n) - 最多移动 m + n 步
 * 空间复杂度：O(1)
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  // 从右上角开始
  let row = 0, col = n - 1;

  /**
   * 搜索循环
   *
   * 终止条件：
   * - row >= m：已经超出下边界
   * - col < 0：已经超出左边界
   */
  while (row < m && col >= 0) {
    if (matrix[row][col] === target) {
      return true; // 找到目标
    } else if (matrix[row][col] > target) {
      // 当前值太大，排除这一列（向左移动）
      col--;
    } else {
      // 当前值太小，排除这一行（向下移动）
      row++;
    }
  }

  return false; // 遍历完毕，未找到
}`,
        animation: {
          type: "two-pointers" as const,
          title: "Z字形查找演示",
          steps: [
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 4,
              highlights: [{ indices: [4], color: "blue" as const, label: "起点" }],
              description: "target=5。从右上角[0,4]=15开始。15>5，向左移动",
            },
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 3,
              highlights: [{ indices: [3], color: "blue" as const, label: "11" }],
              description: "[0,3]=11>5，向左移动",
            },
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 2,
              highlights: [{ indices: [2], color: "blue" as const, label: "7" }],
              description: "[0,2]=7>5，向左移动",
            },
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "blue" as const, label: "4" }],
              description: "[0,1]=4<5，向下移动到[1,1]",
            },
            {
              array: ["2", "5", "8", "12", "19"],
              left: 0,
              right: 1,
              highlights: [{ indices: [1], color: "green" as const, label: "找到!" }],
              description: "[1,1]=5=target，找到！时间O(m+n)",
            },
          ] as TwoPointersStep[],
        },
        explanation: `## Z字形查找

### 核心思想
从右上角开始，利用矩阵的有序性：
- 右上角元素是该行最大、该列最小
- 每次比较可以排除一行或一列

### 搜索路径
路径形似字母 Z，故名 Z 字形查找。

### 时间复杂度
O(m + n) - 最多走 m + n 步`,
        timeComplexity: "O(m + n)",
        spaceComplexity: "O(1)",
      },
      {
        name: "二分查找（每行）",
        animation: {
          type: "two-pointers" as const,
          title: "二分查找搜索矩阵演示",
          steps: [
            {
              array: ["row0", "row1", "row2", "row3", "row4"],
              left: 0,
              right: 4,
              highlights: [],
              description: "对每行进行二分查找。target=5",
            },
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 4,
              highlights: [{ indices: [2], color: "blue" as const, label: "mid=7" }],
              description: "第0行二分：mid=7>5，right=1",
            },
            {
              array: ["1", "4", "7", "11", "15"],
              left: 0,
              right: 1,
              highlights: [{ indices: [0], color: "blue" as const, label: "mid=1" }],
              description: "mid=1<5, left=1。mid=4<5, left=2。l>r，第0行没找到",
            },
            {
              array: ["2", "5", "8", "12", "19"],
              left: 0,
              right: 4,
              highlights: [{ indices: [1], color: "green" as const, label: "mid=5" }],
              description: "第1行二分：mid=5=target，找到!时间O(m×logn)",
            },
          ] as TwoPointersStep[],
        },
        code: `/**
 * 搜索二维矩阵 II - 二分查找法
 *
 * 核心思想：利用每行有序的特性，对每行进行二分查找
 *
 * 矩阵特性：
 * - 每行从左到右升序 → 可以对每行二分查找
 *
 * 算法步骤：
 * 1. 遍历每一行
 * 2. 对每行进行二分查找
 * 3. 找到返回 true，否则继续下一行
 *
 * 优化空间（本实现未使用）：
 * - 可以先排除不可能包含 target 的行
 *   （行首元素 > target 或 行尾元素 < target）
 *
 * 时间复杂度：O(m × log n) - m 行，每行二分 log n
 * 空间复杂度：O(1)
 */
function searchMatrix(matrix: number[][], target: number): boolean {
  /**
   * 遍历每一行，对每行进行二分查找
   *
   * 示例矩阵：
   * [1,  4,  7, 11, 15]  → 二分查找
   * [2,  5,  8, 12, 19]  → 二分查找
   * [3,  6,  9, 16, 22]  → 二分查找
   * [10, 13, 14, 17, 24] → 二分查找
   * [18, 21, 23, 26, 30] → 二分查找
   */
  for (const row of matrix) {
    /**
     * 对当前行进行二分查找
     *
     * 标准二分查找模板：
     * - left 和 right 指向搜索范围的两端
     * - mid 是中间位置
     * - 根据 mid 值与 target 的比较缩小范围
     */
    let left = 0, right = row.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (row[mid] === target) {
        return true; // 找到目标
      } else if (row[mid] < target) {
        left = mid + 1; // 目标在右半部分
      } else {
        right = mid - 1; // 目标在左半部分
      }
    }
  }
  return false; // 所有行都没找到
}`,
        explanation: `## 二分查找

### 思路
对每一行进行二分查找。

### 时间复杂度
O(m log n) - m 行，每行二分 log n`,
        timeComplexity: "O(m log n)",
        spaceComplexity: "O(1)",
      },
    ],
  },
];
