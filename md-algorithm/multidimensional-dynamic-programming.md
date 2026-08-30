## 不同路径

**题目描述：https://leetcode.cn/problems/unique-paths/description/**

::: tip 解题思路
- 思路一：动态规格。创建一个动态的二维数组，因为每次只能向下或向右移动，所以第一列和第一行的路径为1，其他位置的路径为：`f(i,j)=f(i−1,j)+f(i,j−1)`
    - 时间复杂度：O(mn)
    - 空间复杂度：O(mn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
    // 动态二维数组
    const dp = new Array(m).fill(0).map(() => new Array(n).fill(0))
    // 因为只能向下或向右移动，所以第一行、第一列的路径都为1
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
    return dp[m - 1][n - 1]
};
```

```python [Python3]
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        # 二维数组存储路径条数
        dp = [[0] * n] * m
        # 第一行和第一列的位置都只有一条路径
        for i in range(m):
            dp[i][0] = 1
        for j in range(n):
            dp[0][j] = 1

        for i in range(1, m):
            for j in range(1, n):
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        return dp[m - 1][n - 1]
```

:::


## 最小路径和

**题目描述：https://leetcode.cn/problems/minimum-path-sum/description/**

::: tip 解题思路
- 思路一：动态规划。利用原数组grid存储最小路径和。因为只能向下或向右移动，所以第一行和第一列路径和逐步累加，而`grid[i][j]路径和`：取`grid[i-1][j]和grid[i][j-1]的最小值`与其相加
    - 时间复杂度：O(mn)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
    if (!grid?.length || !grid[0]?.length) return 0

    const m = grid.length
    const n = grid[0].length
    // 第一行和第一列路径和逐渐累加
    for (let i = 1; i < m; i++) {
        grid[i][0] += grid[i - 1][0]
    }
    for (let j = 1; j < n; j++) {
        grid[0][j] += grid[0][j - 1]
    }
    // grid[i][j] += min(grid[i-1][j], grid[i][j-1])
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
        }
    }
    return grid[m - 1][n - 1]
};
```

```python [Python3]
class Solution:
    def minPathSum(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0
        # 改变原数组grid，存储每个位置的最小路径和
        m = len(grid)
        n = len(grid[0])
        # 第一行和第一列路径和逐步累加
        for i in range(1, m):
            grid[i][0] += grid[i - 1][0]
        for j in range(1, n):
            grid[0][j] += grid[0][j - 1]

        #  grid[i][j]路径和：取grid[i-1][j]和grid[i][j-1]的最小值与其相加
        for i in range(1, m):
            for j in range(1, n):
                grid[i][j] += min(grid[i - 1][j], grid[i][j - 1])
        return grid[m - 1][n - 1]
```

:::


## 最长回文子串

**题目描述：https://leetcode.cn/problems/longest-palindromic-substring/description/**

::: tip 解题思路
- 思路一：中心扩展算法。回文子串长度可能是奇数或偶数，遍历字符串以当前位置为中心，向两边扩散，找出最大长度的回文子串。
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    const sLen = s.length
    if (sLen < 2) return s
    // 定义最大回文子串起始下标和最大长度
    let maxLen = 0
    let start = 0

    for (let i = 0; i < sLen; i++) {
        // 奇数回文
        expandAroundCenter(s, i, i)
        // 偶数回文
        expandAroundCenter(s, i, i + 1)
    }

    // 中心扩展函数，选择任意位置为回文中心，然后往两端扩展
    function expandAroundCenter(s, left, right) {
        // 扩展条件
        while (left >= 0 && right < sLen && s[left] == s[right]) {
            left--
            right++
        }

        // 注意：跳出循环后，left和right多走了一步，实际范围为[left+1,right-1]
        const curLen = right - left + 1 - 2
        if (curLen > maxLen) {
            maxLen = curLen
            start = left + 1
        }
    }
    return s.slice(start, start + maxLen)
};
```

```python [Python3]
class Solution:
    def longestPalindrome(self, s: str) -> str:
        sLen = len(s)
        if sLen < 2:
            return s
        # 回文长度和起始下标
        maxLen = 0
        start = 0

        # 中心扩散函数
        def expandAroundCenter(s, left, right):
            # 扩散条件和边界条件
            while left >= 0 and right < sLen and s[left] == s[right]:
                left -= 1
                right += 1
            # 跳出循环后，left和right都多走了一步，实际范围为[left+1, right-1]
            curLen = right - left - 1
            # 需要改变外部变量
            nonlocal maxLen, start
            if curLen > maxLen:
                maxLen = curLen
                start = left + 1

        for i in range(sLen):
            # 奇数回文
            expandAroundCenter(s, i, i)
            # 偶数回文
            expandAroundCenter(s, i, i + 1)

        return s[start : start + maxLen]
```

:::


## 最长公共子序列

**题目描述：https://leetcode.cn/problems/longest-common-subsequence/description/**

::: tip 解题思路
- 思路一：动态规划。创建一个二维数组，空间以两个字符串的长度为基准。存储前i个text1的字符与前j个text2的字符最长公共子序列的长度，空间额外扩充一列一行，作为边界。`dp[i][j] = dp[i - 1][j - 1] + 1`
    - 时间复杂度：O(mn)
    - 空间复杂度：O(mn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function (text1, text2) {
    const [m, n] = [text1.length, text2.length]
    // 在mxn的基础上，增加一列一行边界，前0个字符是空状态
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // i处对应字符为text[i-1]
            if (text1[i - 1] == text2[j - 1]) {
                // 想象把两个字符串二维数组化，如果当前位置字符相等，总长度为左上角长度+1
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    return dp[m][n]
};
```

```python [Python3]
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        # 创建二维数组，为了边界和理解，二维数组基于两个字符串长度多扩展一列一行
        # 此时dp[i][j]就表示存储text1前i个字符与text2前j个字符的公共子序列的最长长度
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if text1[i-1] == text2[j-1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[m][n]
```

:::


## 编辑距离

**题目描述：https://leetcode.cn/problems/edit-distance/description/**

::: tip 解题思路
- 思路一：动态规划。给word增加一个前置哨兵字符，创建一个动态二维数组，存储word1前i个字符变成word2前j个字符所需的步骤。
    - 时间复杂度：O(mn)
    - 空间复杂度：O(mn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
    const [m, n] = [word1.length, word2.length]
    // 存储word1的前i个字符转化为word2前j字符所需步骤
    // 增加前置哨兵字符，防止出界
    const dp = new Array(m + 1).fill(0).map(() => new Array(n + 1).fill(0))
    // 边界初始化，第一行、第一列
    for (let i = 0; i <= m; i++) {
        dp[i][0] = i
    }
    for (let j = 0; j <= n; j++) {
        dp[0][j] = j
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // 如果字符相同则不需要处理
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]
            } else {
                // 取插入、删除、替换的最小值+1
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
            }
        }
    }
    return dp[m][n]
};
```

```python [Python3]
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]

        for i in range(m + 1):
            dp[i][0] = i
        for j in range(n + 1):
            dp[0][j] = j

        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if word1[i - 1] == word2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
        return dp[m][n]
```

:::