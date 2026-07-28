
## 买卖股票的最佳时机

**题目描述：https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/**

::: tip 解题思路
- 思路一：一次遍历。获取最低的价格，出售价格-购买价格=利润，比较利润取最大。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let buy = -1
    let profit = 0
    for (const p of prices) {
        if (buy < 0 || p < buy) buy = p
        profit = Math.max(profit, p - buy)
    }
    return profit
};
```

```python [Python3]
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        buy = -1
        profit = 0
        for price in prices:
            if buy < 0 or price < buy:
                buy = price
            if (price - buy) > profit:
                profit = price - buy
        return profit
```

:::


## 跳跃游戏

**题目描述：https://leetcode.cn/problems/jump-game/description/**

::: tip 解题思路
- 思路一：贪心算法。跳跃的距离为：[0, 跳跃的最大长度]。下一次的跳跃选择最远距离，如果能跳到最后一个位置则找到答案。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
    const n = nums.length
    // 跳跃的位置，初始为0
    let rightmost = 0
    for (let i = 0; i < n; i++) {
        // 跳跃的范围
        if (i <= rightmost) {
            // 下一次可跳跃的范围
            rightmost = Math.max(rightmost, i + nums[i])
            // 如果能跳到最后一个位置
            if (rightmost >= n - 1) return true
        }
    }
    return false
};
```

```python [Python3]
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        n, rightmost = len(nums), 0
        for i in range(n):
            if i <= rightmost:  # 下次跳跃的长度
                # 选取下一次最大长度跳跃
                rightmost = max(rightmost, i + nums[i])

                if rightmost >= n - 1:  # 如果能跳到最后位置，则找到答案
                    return True
        return False
```

:::


## 跳跃游戏 II

**题目描述：https://leetcode.cn/problems/jump-game-ii/description/**

::: tip 解题思路
- 思路一：贪心算法。选择下一次跳跃的位置，再次跳跃为最大长度。注意：`题目保证可以到达 n - 1`
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
var jump = function (nums) {
    let n = nums.length
    let endPosition = 0
    let maxPosition = 0
    let steps = 0
    // 测试用例保证可以到达 n - 1
    for (let i = 0; i < n - 1; i++) {
        // 获取每个位置的最大跳跃长度
        maxPosition = Math.max(maxPosition, i + nums[i])

        // 当达到可能跳跃最大范围时，重置下一次跳跃的结束位置
        if (i == endPosition) {
            endPosition = maxPosition
            steps++
        }
    }
    return steps
};
```

```python [Python3]
class Solution:
    def jump(self, nums: List[int]) -> int:
        n, endPosition, maxPosition, steps = len(nums), 0, 0, 0
        for i in range(n - 1):
            maxPosition = max(maxPosition, i + nums[i])
            # 走到下一步最后位置
            if i == endPosition:
                endPosition = maxPosition
                steps += 1
        return steps
```

:::


## 划分字母区间

**题目描述：https://leetcode.cn/problems/partition-labels/description/**

::: tip 解题思路
- 思路一：遍历、哈希表。使用两个哈希表，一个存储字母计数，一个存储当前段字符串字母。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：贪心算法。利用小写字母的code，来创建一个长度为26的数组，存储字母在字符串中最后的位置。
    - 时间复杂度：O(n)
    - 空间复杂度：O(26)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
    // 存储字母计数
    const countMap = new Map()
    for (const key of s) {
        let count = 1
        if (countMap.has(key)) count += countMap.get(key)
        countMap.set(key, count)
    }
    // 存储当前段字符串字母
    const charSet = new Set()
    const answer = []
    let str = ''
    for (const key of s) {
        str += key
        charSet.add(key)
        countMap.set(key, countMap.get(key) - 1)
        if (countMap.get(key) == 0) {
            charSet.delete(key)
        }
        if (charSet.size == 0) {
            answer.push(str)
            str = ''
        }
    }
    return answer.map((v) => v.length)
};
```

```js [JavaScript 思路二]
/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
    // 存储字母在字符串中的最后位置
    const lastPosition = new Array(26)
    const n = s.length
    const aCode = 'a'.codePointAt(0)
    for (let i = 0; i < n; i++) {
        const charSub = s.codePointAt(i) - aCode
        lastPosition[charSub] = i
    }

    const answer = []
    let start = 0, end = 0
    for (let i = 0; i < n; i++) {
        const charSub = s.codePointAt(i) - aCode
        // end不断往右移动
        end = Math.max(end, lastPosition[charSub])
        // 移动到当前字符串中字母最后的位置
        if (i == end) {
            answer.push(end - start + 1)
            start = end + 1
        }
    }
    return answer
};
```

```python [Python3 思路二]
class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        lastPosition = [0] * 26
        for i, ch in enumerate(s):
            lastPosition[ord(ch) - ord("a")] = i

        answer = []
        start = end = 0
        for i, ch in enumerate(s):
            end = max(end, lastPosition[ord(ch) - ord("a")])
            if i == end:
                answer.append(end - start + 1)
                start = end + 1
        return answer
```

:::