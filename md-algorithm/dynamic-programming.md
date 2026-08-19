## 爬楼梯

**题目描述：https://leetcode.cn/problems/climbing-stairs/description/**

::: tip 解题思路
- 思路一：动态规划。台阶走法为1, 2, 3, 5, 8... 这是斐波那契数列。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
    // 台阶走法为1, 2, 3, 5, 8... 这是斐波那契数列。dp[i]=dp[i-2]+dp[i-1]
    if (n <= 2) return n
    // 相对于i，i-2处有pre2走法，i-1处有pre1走法。初始默认i=3
    let pre2 = 1, pre1 = 2
    for (let i = 3; i <= n; i++) {
        // 当前i处走法
        const cur = pre2 + pre1
        // 更新pre1、pre2,向后移一位
        pre2 = pre1
        pre1 = cur
    }
    return pre1
};
```

```python [Python3]
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        # i处前两位走法
        dp = [1, 2]
        for i in range(3, n + 1):
            cur = dp[0] + dp[1]
            dp[0] = dp[1]
            dp[1] = cur
        return dp[1]
```

:::


## 杨辉三角

**题目描述：https://leetcode.cn/problems/pascals-triangle/description/**

::: tip 解题思路
- 思路一：动态规划。当前位置index=上一层index-1 + 上一层index，注意边界是否存在。
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    // 初始numRows==1 的状态
    const answer = [[1]]

    for (let i = 2; i <= numRows; i++) {
        const cur = []
        const pre = answer[i - 1 - 1]

        let index = 0
        while (index < i) {
            const left = index - 1 < 0 ? 0 : pre[index - 1]
            const right = index > pre.length - 1 ? 0 : pre[index]
            cur.push(left + right)
            index++
        }
        answer.push(cur)
    }
    return answer
};
```

```python [Python3]
class Solution:
    def generate(self, numRows: int) -> List[List[int]]:
        answer = [[1]]
        for i in range(2, numRows + 1):
            # 上一层数据
            pre = answer[i - 1 - 1]
            cur = []
            index = 0
            while index < i:
                # 注意边界处理
                left = 0 if index - 1 < 0 else pre[index - 1]
                right = 0 if index > len(pre) - 1 else pre[index]
                cur.append(left + right)
                index += 1
            answer.append(cur)
        return answer
```

:::


## 打家劫舍

**题目描述：https://leetcode.cn/problems/house-robber/description/**

::: tip 解题思路
- 思路一：动态规划。两种选择的结果：当前房间i偷=当前房间金额+d[i-2]最优解，当前房价i不偷=d[i-1]最优解。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)\O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
    // i处的房间：偷=i处金额+【i-2】最优解，不偷=【i-1】处最优解
    // i-2最优解为pre2，i-1最优解为pre1
    let pre2 = pre1 = 0
    for (const num of nums) {
        const cur = Math.max(pre1, pre2 + num)
        pre2 = pre1
        pre1 = cur
    }
    return pre1
};
```

```python [Python3]
class Solution:
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 1:  # 一个房间
            return nums[0]
        elif len(nums) == 2:  # 两个房间偷最大金额
            return max(nums[0], nums[1])
        # 超过两个房间，第i间：偷=房间金额+dp[i-2]最优解，不偷=dp[i-1]最优解
        dp = [0] * len(nums)  # dp存储每个房间的最优解
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])
        # 3-n间房间
        for i in range(2, len(nums)):
            # 当前房间最优解
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
        return dp[len(nums) - 1]
```

:::


## 完全平方数

**题目描述：https://leetcode.cn/problems/perfect-squares/description/**

::: tip 解题思路
- 思路一：动态规划。初始化一个dp数组，默认值填充最大值n（最多需要n个1）。再尝试减去每个完全平方数，取最小值更新dp。
    - 时间复杂度：O(n√n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    const dp = Array.from({ length: n + 1 }, (_, i) => i)
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
        }
    }
    return dp[n]
};
```

```python [Python3]
class Solution:
    def numSquares(self, n: int) -> int:
        # 初始化，默认需要最多的完全平方数，n个1
        dp = [i for i in range(n + 1)]

        # 尝试减去每个完全平方数，取需要最少的，更新dq
        j = 1
        while j * j <= n:
            # 小于n的完全平方时
            square = j * j
            for i in range(square, n + 1):
                dp[i] = min(dp[i], dp[i - square] + 1)
            j += 1
        return dp[n]
```

:::


## 零钱兑换

**题目描述：https://leetcode.cn/problems/coin-change/description/**

::: tip 解题思路
- 思路一：动态规划。创建一个`amount+1`长度的动态数组dp，默认初始值为`amount+1`【最可能最大值+1】，遍历更新dp。如果dp[amount]还是初始值，则表示没找到答案，否则该值为答案。
    - 时间复杂度：O(n * amount)
    - 空间复杂度：O(amount+1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
    const n = coins.length
    // 用 amount + 1 初始化（比任何可能答案都大）
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0
    for (let i = 0; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1)
            }
        }
    }
    // 如果 dp[amount] 还是初始值，说明无法凑成
    return dp[amount] == amount + 1 ? -1 : dp[amount]
};
```

```python [Python3]
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # 初始化：每项都比最大值还多1，0时为0
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0

        for i in range(amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)
        # 如果还为默认值，则说明答案不存在
        return -1 if dp[amount] == amount + 1 else dp[amount]
```

:::


## 单词拆分

**题目描述：https://leetcode.cn/problems/word-break/description/**

::: tip 解题思路
- 思路一：动态规划。动态数组里面初始值为false，遍历字符串，如果当前位置dp[start]=true，并且s.slice(start, end)在字典里面，则dp[end]=true
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    const wordSet = new Set(wordDict)
    // 第i处是否可以分割字符
    const dp = new Array(s.length + 1).fill(false)
    dp[0] = true
    // 分割结束位置
    for (let end = 0; end <= s.length; end++) {
        // 分割开始位置
        for (let start = 0; start < end; start++) {
            // 开始位置可以
            if (dp[start] && wordSet.has(s.slice(start, end))) {
                dp[end] = true
                break
            }
        }
    }
    return dp[s.length]
};
```

```python [Python3]
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        # 创建一个动态数组，表示字符串s的第i处之前是否可以分割
        dp = [False] * (len(s) + 1)
        # 下标0之前不存在，默认可以分割
        dp[0] = True

        for end in range(len(s) + 1):
            for start in range(end):
                # start处之前可以分割，start处及其之后在字典中，则表示end处可以分割
                if dp[start] and s[start:end] in wordDict:
                    dp[end] = True
                    break

        return dp[len(s)]
```

:::


## 最长递增子序列

**题目描述：https://leetcode.cn/problems/longest-increasing-subsequence/description/**

::: tip 解题思路
- 思路一：动态规划。创建一个动态数组，存储以i结尾的最长递增子序列的长度。遍历更新动态数组，里面的最大值为答案。
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    let dp = new Array(nums.length).fill(1)
    let answer = 1
    for (let end = 0; end < nums.length; end++) {
        for (let start = 0; start < end; start++) {
            if (nums[end] > nums[start]) {
                dp[end] = Math.max(dp[end], dp[start] + 1)
            }
        }
        answer = Math.max(answer, dp[end])
    }
    return answer
};
```

```python [Python3]
class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        # 创建动态数组，记录以i处为结尾的递增子序列的长度，默认为1
        dp = [1] * len(nums)

        for end in range(len(nums)):
            for start in range(end):
                if nums[end] > nums[start]:
                    dp[end] = max(dp[end], dp[start] + 1)

        return max(dp)
```

:::


## 乘积最大子数组

**题目描述：https://leetcode.cn/problems/maximum-product-subarray/description/**

::: tip 解题思路
- 思路一：动态规划。维护一个动态的以i结尾的连续乘积的最大值和最小值，每次比较【当前值、当前值与最大值的乘积、当前值与最小值的乘积】的最大值和最小值，并更新变量。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
    // 以i结尾的连续乘积的最大值和最小值
    let dpMax = dpMin = answer = nums[0]

    for (let i = 1; i < nums.length; i++) {
        const num = nums[i]

        // num可能为负数或非负数
        const tempMax = Math.max(num, num * dpMax, num * dpMin)
        const tempMin = Math.min(num, num * dpMax, num * dpMin)

        dpMax = tempMax
        dpMin = tempMin
        answer = Math.max(answer, dpMax)
    }
    return answer
};
```

```python [Python3]
class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        if not nums:
            return 0
        # i结尾的动态乘积
        dpMax = dpMin = answer = nums[0]

        for i in range(1, len(nums)):
            num = nums[i]
            # i结尾的乘积最大值为自身、自身*最大值 或 自身*最小值
            tempMax = max(num, num * dpMax, num * dpMin)
            tempMin = min(num, num * dpMax, num * dpMin)

            dpMax, dpMin = tempMax, tempMin
            answer = max(answer, dpMax)

        return answer
```

:::


## 分割等和子集

**题目描述：https://leetcode.cn/problems/partition-equal-subset-sum/description/**

::: tip 解题思路
- 思路一：动态规划。0-1背包问题，总和为偶数时才能分割，以总和的一半为目标target，只要子集和为target，即说明可以分割。创建动态数组dp，长度[target+1]，存储当前值能否由数组nums的子集组成。dp[0]默认可组成为`true`，当dp[target]也可由子集组成时，即找到答案。
    - 时间复杂度：O(n*target)
    - 空间复杂度：O(target)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    if (nums.length < 2) return false
    let total = 0
    for (const num of nums) {
        total += num
    }
    // 总和为奇数不可能使两个子集和相等
    if (total % 2) return false
    // 一个子集和的值为总和的一半
    const target = total / 2

    // 目标值是否能被子集组成
    const dp = new Array(target + 1).fill(false)
    dp[0] = true
    for (const num of nums) {
        // 从高到低组合，确保每个数字只用一次
        for (let i = target; i >= num; i--) {
            // 选或不选当前数字
            dp[i] = dp[i] || dp[i - num]
        }
        if (dp[target]) return true
    }
    return dp[target]
};
```

```python [Python3]
class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        if len(nums) < 2:
            return False
        # 总和
        total = 0
        for num in nums:
            total += num
        # 奇数时，不可能分割两个子集
        if total % 2:
            return False

        target = total // 2
        dp = [False] * (target + 1)
        dp[0] = True

        for num in nums:
            for i in range(target, num - 1, -1):
                # 当前可用 或 当前和其他子集组成可用
                dp[i] = dp[i] if dp[i] else dp[i - num]
            if dp[target]:
                return True
        return dp[target]
```

:::


## 最长有效括号

**题目描述：https://leetcode.cn/problems/longest-valid-parentheses/description/**

::: tip 解题思路
- 思路一：栈。栈里面记录下标，stack初始值为[-1]方便计算连续长度。字符为`(`时下标入栈；字符为`)`时下标出栈，当栈为空时需要更新长度计算起始下标，当栈长度为1时，说明字符串有效更新最大长度。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
    // 栈起始值为-1，方便计算字符串长度
    const stack = [-1]
    let answer = 0
    for (let i = 0; i < s.length; i++) {
        const str = s[i]
        if (str === '(') {
            // 入栈
            stack.push(i)
        } else {
            // str===')' 出栈
            stack.pop()
            if (!stack.length) {
                // 如果栈为空，更新起始值
                stack.push(i)
            } else {
                // 如果栈不为空，有效字符串长度：i-stack[-1]
                answer = Math.max(answer, i - stack[stack.length - 1])
            }
        }
    }
    return answer
};
```

```python [Python3]
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        stack = [-1]
        maxLen = 0

        for i, ch in enumerate(s):
            if ch == "(":
                stack.append(i)
            else:
                stack.pop()
                if not stack:
                    stack.append(i)
                else:
                    maxLen = max(maxLen, i - stack[-1])
        return maxLen
```

:::