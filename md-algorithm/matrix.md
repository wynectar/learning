## 矩阵置零

**题目描述：https://leetcode.cn/problems/set-matrix-zeroes/description/**

::: tip 解题思路
- 思路一：标记数组。先遍历每行含0的，当前行全为0，并记录0所在的列数；再遍历数组给0所在的列数赋值为0.
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n)
- 思路二：原地算法，即空间复杂度等于O(1)。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    const nZero = []
    // 如果当前一行存在0，则把当前行都变为0，并记录0所在的列数
    for (let m = 0; m < matrix.length; m++) {
        let isZero = false
        for (let n = 0; n < matrix[m].length; n++) {
            if (matrix[m][n] === 0) {
                nZero.push(n)
                isZero = true
            }
        }
        if (isZero) matrix[m] = new Array(matrix[m].length).fill(0)
    }

    // 存在0的列都变为0
    for (const n of nZero) {
        for (let m = 0; m < matrix.length; m++) {
            matrix[m][n] = 0
        }
    }
};
```

```js [JavaScript 思路二]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
    // m行 x n列 的数组
    const mLength = matrix.length
    const nLength = matrix[0].length

    // 标记第一行或第一列数据需不需要更改
    let mUpdate = false
    let nUpdate = false

    // 把数据为0的行列坐标分别标记到第一行和第一列
    for (let m = 0; m < mLength; m++) {
        for (let n = 0; n < nLength; n++) {
            if (matrix[m][n] === 0) {
                matrix[0][n] = 0 // 第一行存储数据为0的列坐标
                matrix[m][0] = 0 // 第一列存储数据为0的行坐标

                if (m === 0) mUpdate = true
                if (n === 0) nUpdate = true
            }
        }
    }

    // 先第二行第二列的数据开始更改，因为需要第一行第一列的数据作为参考。 数组的第一行或第一列数据为0时，后续的行或列的数据都更改为0。
    for (let m = 1; m < mLength; m++) {
        // 每行是否需要都更新为0
        const mFlag = matrix[m][0] === 0
        for (let n = 1; n < nLength; n++) {
            // 每列是否都需要更新为0
            const nFlag = matrix[0][n] === 0
            if (mFlag || nFlag) {
                matrix[m][n] = 0
            }
        }
    }

    // 再更新第一行或第一列的数据
    if (mUpdate) {
        for (let n = 0; n < nLength; n++) {
            matrix[0][n] = 0
        }
    }
    if (nUpdate) {
        for (let m = 0; m < mLength; m++) {
            matrix[m][0] = 0
        }
    }
};
```

```python [Python3 思路二]
class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # m行 x n列的数据
        ml = len(matrix)
        nl = len(matrix[0])

        # 标记第一行或第一列数据需不需要更新
        mupdate = False
        nupdate = False

        # 以数据的第一行和第一列记录该行或该列存不存在0
        for m in range(ml):
            for n in range(nl):
                if matrix[m][n] == 0:
                    matrix[0][n] = 0
                    matrix[m][0] = 0

                    if m == 0:
                        mupdate = True
                    if n == 0:
                        nupdate = True

        # 更新从第二行第二列开始的数据，因为第一行和第一列的数据需要作为参照物
        for m in range(1, ml):
            mflg = matrix[m][0] == 0  # 每行数据是否需要更新为0
            for n in range(1, nl):
                nflag = matrix[0][n] == 0  # 每列数据是否需要更新为0
                if mflg or nflag:
                    matrix[m][n] = 0

        # 更新第一行或第一列数据
        if mupdate:
            for n in range(nl):
                matrix[0][n] = 0
        if nupdate:
            for m in range(ml):
                matrix[m][0] = 0
```

:::


## 螺旋矩阵

**题目描述：https://leetcode.cn/problems/spiral-matrix/description/**

::: tip 解题思路
- 思路一：回字型移动，一圈一圈的push数据，注意收缩范围
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
    if (!matrix.length || !matrix[0].length) return []

    // m x n 的矩阵
    const mLength = matrix.length
    const nLength = matrix[0].length
    // 行坐标可移动范围
    let top = 0
    let bottom = mLength - 1
    // 列坐标可移动范围
    let left = 0
    let right = nLength - 1
    const answer = []

    // 回字形逐渐push到数组中
    while (left <= right && top <= bottom) {
        // 上左角->上右角，列n移动；必走
        for (let n = left; n <= right; n++) {
            answer.push(matrix[top][n])
        }

        // 右上角->右下角，行m移动；有可能不走
        for (let m = top + 1; m <= bottom; m++) {
            answer.push(matrix[m][right])
        }

        // 下右角->下左角，列n移动；需保证top<bottom，有剩余行才能往回走
        if (top < bottom) {
            for (let n = right - 1; n >= left; n--) {
                answer.push(matrix[bottom][n])
            }
        }

        // 左下角->左上角，行m移动；需保证left<right，有剩余行才能往回走
        if (left < right) {
            for (let m = bottom - 1; m > top; m--) {
                answer.push(matrix[m][left])
            }
        }

        // 收缩范围
        [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]
    }
    return answer
};
```

```python [Python3]
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        if not matrix or not matrix[0]:
            return []
        # m x n 的矩阵
        mLength = len(matrix)
        nLength = len(matrix[0])

        # 考虑矩阵每项可以认为是双指针坐标移动，移动范围如下
        # 行移动
        top, bottom = 0, mLength - 1
        # 列移动
        left, right = 0, nLength - 1

        answer = []
        while left <= right and top <= bottom:
            # top:left->right n移动；必移动
            for n in range(left, right + 1):
                answer.append(matrix[top][n])

            # right:top->bottom m移动，有可能不移动
            for m in range(top + 1, bottom + 1):
                answer.append(matrix[m][right])

            # bottom:right->left n移动；有剩余行数时才能回移
            if top < bottom:
                for n in reversed(range(left, right)):
                    answer.append(matrix[bottom][n])

            # left:bottom->top m移动；有剩余列数时才能回移
            if left < right:
                for m in reversed(range(top + 1, bottom)):
                    answer.append(matrix[m][left])

            # push一圈后，收缩范围
            left, right, top, bottom = left + 1, right - 1, top + 1, bottom - 1

        return answer
```

:::


## 旋转图像

**题目描述：https://leetcode.cn/problems/rotate-image/description/**

::: tip 解题思路
- 思路一：辅助数组，深拷贝原数组，利用复制数组更新原数组。注意到旋转90deg后，第一行在倒数第一列，第二行在倒数第二列，......，依此类推
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n²)
- 思路二：镜像对折、翻转。‌`主对角线‌`：矩阵或行列式中`从‌左上至右下`‌的连线；`副对角线`‌：矩阵或行列式中`从‌左下至右上‌`的连线。注意到矩阵旋转90、180、270deg可以通过上下翻转、左右翻转、主副对角线翻转组合实现。例如：旋转90deg可以先左右翻转，再副对角线翻转；旋转180deg可以先左右翻转，再上下翻转；旋转270deg可以先左右翻转，在主对角线翻转。`同一种旋转角度，可以通过不同的组合实现`。
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    // 注意到，n x n 矩阵旋转90deg后：第一行数据转移到最后一列，第二行转移到倒数第二列，依此类推
    const n = matrix.length

    // 复制数组
    const copyMatrix = new Array(n).fill(0).map(() => new Array(n).fill(0))
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            copyMatrix[i][j] = matrix[i][j]
        }
    }

    // 开始旋转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[j][n - i - 1] = copyMatrix[i][j]
        }
    }
};
```

```js [JavaScript 思路二]
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
    // 注意到，n x n 矩阵旋转90deg 等于 先左右翻转，再副对角线翻转
    const n = matrix.length

    // 先左右翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < Math.floor(n / 2); j++) {
            [matrix[i][j], matrix[i][n - j - 1]] = [matrix[i][n - j - 1], matrix[i][j]]
        }
    }

    // 再副对角线翻转
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i; j++) {
            [matrix[i][j], matrix[n - j - 1][n - i - 1]] = [matrix[n - j - 1][n - i - 1], matrix[i][j]]
        }
    }
};
```

```python [Python3 思路二]
class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # 注意到旋转90deg 相当于 先左右翻转，再副对角线翻转
        n = len(matrix)

        # 先左右翻转
        for i in range(n):
            for j in range(n // 2):
                matrix[i][j], matrix[i][n - j - 1] = matrix[i][n - j - 1], matrix[i][j]

        # 再副对角线翻转
        for i in range(n):
            for j in range(n - i):
                matrix[i][j], matrix[n - j - 1][n - i - 1] = (
                    matrix[n - j - 1][n - i - 1],
                    matrix[i][j],
                )
```

:::

## 搜索二维矩阵 II

**题目描述：https://leetcode.cn/problems/search-a-2d-matrix-ii/description/**

::: tip 解题思路
- 思路一：二分查找。矩阵每行进行二分查找，找到目标值
    - 时间复杂度：O(mlogn)
    - 空间复杂度：O(1)
- 思路二：贪心算法，二叉树搜索。从副对角线开始查找，双指针移动，直到找到目标。
    - 时间复杂度：O(mn)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    // 二分查找
    const binarySearch = (nums, target) => {
        let left = 0
        let right = nums.length - 1
        while (left <= right) {
            const mid = Math.floor((right - left) / 2) + left
            const num = nums[mid]
            if (target < num) {
                right = mid - 1
            } else if (target > num) {
                left = mid + 1
            } else {
                return true
            }
        }
        return false
    }

    // 矩阵逐行查找
    for (const nums of matrix) {
        const search = binarySearch(nums, target)
        if (search) return true
    }
    return false
};
```

```js [JavaScript 思路二]
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    const ml = matrix.length - 1
    const nl = matrix[0].length - 1
    // 行列指针，起始位置右上角
    let m = 0
    let n = nl
    while (m <= ml && n >= 0) {
        const num = matrix[m][n]
        if (target < num) {
            n--
        } else if (target > num) {
            m++
        } else {
            return true
        }
    }
    return false
};
```

```python [Python3 思路二]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # 双指针移动，从副对角线顶点位置开始进行二叉树搜索
        m, n = 0, len(matrix[0]) - 1

        while m < len(matrix) and n >= 0:
            num = matrix[m][n]
            if target < num:
                n -= 1
            elif target > num:
                m += 1
            else:
                return True

        return False
```

:::