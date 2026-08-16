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
- 思路一：左右指针算法，比较左右指针的高度，高度低的指针移动，高度相同则左右指针任意一个移动
    - 时间复杂度：O(n * amount)
    - 空间复杂度：O(n)
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


## 三数之和

**题目描述：https://leetcode.cn/problems/3sum/description/**

::: tip 解题思路
- 思路一：左右指针算法，比较左右指针的高度，高度低的指针移动，高度相同则左右指针任意一个移动
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]

```

```python [Python3]

```

:::