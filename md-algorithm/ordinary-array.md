## 最大子数组和

**题目描述：https://leetcode.cn/problems/maximum-subarray/description/**

::: tip 解题思路
- 思路一：双指针移动、滑动窗口。累积和的过程中不断与最大值比较，直到累积和小于零，此时需要初始化累积和，累积和等于当前值。
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
var maxSubArray = function (nums) {
    let max = total = nums[0]
    let right = 1
    while (right < nums.length) {
        if (total < 0) {
            // 找到断点，初始化total
            total = nums[right]
        } else {
            // 否则一直累加
            total += nums[right]
        }
        if (total > max) {
            max = total
        }
        right++
    }
    return max
};
```

```python [Python3]
class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        # 定义最大值、累积和
        maxCount = totalCount = nums[0]
        right = 1

        while right < len(nums):
            if totalCount < 0:  # 累积和小于零，数组需要重新计数
                totalCount = nums[right]
            else:
                totalCount += nums[right]
            maxCount = max(maxCount, totalCount)

            right += 1
        return maxCount
```

:::


## 合并区间

**题目描述：https://leetcode.cn/problems/merge-intervals/description/**

::: tip 解题思路
- 思路一：先排序，再比较是否有重合区间
    - 时间复杂度：O(nlogn)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
    // 先按左区间升序排序
    intervals.sort((a, b) => a[0] - b[0])
    const merge = []
    let singleMerge = []
    let right = 0
    while (right < intervals.length) {
        const cm = intervals[right]
        if (right !== 0 && cm[0] <= singleMerge[1]) {
            // 合并 singleMerge
            singleMerge[1] = Math.max(singleMerge[1], cm[1])
        } else {
            // 初始化 singleMerge
            singleMerge = cm
        }

        // 添加到merge
        if (!intervals[right + 1] || intervals[right + 1][0] > singleMerge[1]) {
            merge.push(singleMerge)
        }
        right++
    }
    return merge
};
```

```python [Python3]
class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        l = len(intervals)
        intervals.sort(key=lambda a: a[0])  # 先排序
        merge = []  # 合并后的区间
        singleMerge = []  # 单个合并区间
        right = 0

        while right < l:
            cm = intervals[right]
            if right != 0 and cm[0] <= singleMerge[1]:  # 合并 singleMerge
                singleMerge[1] = max(singleMerge[1], cm[1])
            else:  # 初始化 singleMerge
                singleMerge = cm

            # 合并到 merge
            if right + 1 == l or singleMerge[1] < intervals[right + 1][0]:
                merge.append(singleMerge)

            right += 1

        return merge
```

:::


## 轮转数组

**题目描述：https://leetcode.cn/problems/rotate-array/description/**

::: tip 解题思路
- 思路一：翻转卡牌。先整体翻转，再以k为分界点局部翻转。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var rotate = function (nums, k) {
    // 定义一个反转函数，例如[1,2,3]反转为[3,2,1]
    const reverse = (nums, start, end) => {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]]
            start++
            end--
        }
    }

    // 先反转整体，再反转局部 得到答案
    const l = nums.length
    const sk = k % l
    reverse(nums, 0, l - 1)
    reverse(nums, 0, sk - 1)
    reverse(nums, sk, l - 1)
    return nums
};
```

```python [Python3]
class Solution:
    def rotate(self, nums: List[int], k: int) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """

        # 定义一个翻转卡牌函数
        def reverse(nums: List[int], start: int, end: int):
            while start < end:
                nums[start], nums[end] = nums[end], nums[start]
                start += 1
                end -= 1

        l = len(nums)
        k %= l
        reverse(nums, 0, l - 1)
        reverse(nums, 0, k - 1)
        reverse(nums, k, l - 1)
        return nums
```

:::


## 除了自身以外数组的乘积

**题目描述：https://leetcode.cn/problems/product-of-array-except-self/description/**

::: tip 解题思路
- 思路一：左右乘积列表，i处的左侧乘积 * i处的右侧乘积 = i处以外数组的乘积
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const l = nums.length
    const answer = new Array(l)

    // answer 先存储左侧列表乘积
    for (let i = 0; i < l; i++) {
        if (i === 0) {
            // 索引为0时，左侧没有元素，所以值为1
            answer[i] = 1
        } else {
            answer[i] = answer[i - 1] * nums[i - 1]
        }
    }

    // answer 再乘右侧乘积，最右的索引右侧没有元素，乘积为1
    let right = 1
    for (let i = l - 1; i >= 0; i--) {
        answer[i] *= right
        right *= nums[i] // 下一个右侧乘积
    }

    return answer
};
```

```python [Python3]
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        l = len(nums)
        answer = [1] * l

        # 先算i处左侧乘积
        for i in range(l):
            if i == 0:  # 索引0处左侧无元素，所以乘积为1
                answer[i] = 1
            else:  # i处的左侧乘积=i-1的左侧乘积 * nums[i-1]
                answer[i] = answer[i - 1] * nums[i - 1]

        # 再与i处的右侧乘积相乘，最后元素的右侧无元素，所以默认乘积为1
        right = 1
        for i in reversed(range(l)):
            answer[i] *= right
            right *= nums[i]  # 更新右侧乘积

        return answer
```

:::


## 缺失的第一个正数

**题目描述：https://leetcode.cn/problems/first-missing-positive/description/**

::: tip 解题思路
- 思路一：哈希表查找。数组nums长度为N，其未出现的最小正整数为[N+1]或在[1,N]内。如果数组正好是[1,2,...,N]，则未出现的最小正整数为 N+1，如果数组里面包含负数、零、大于N的数、重复的数，则未出现的最小整数在[1,N]内。直接把数组映射哈希表，从1累加，根据哈希表查询，不在表中的则为最小正整数。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：利用数组下标标记：1. 先把非正数标记为超出N的数字，如N+1；2. i处数字为x，那么就把nums的第x项变为负数，即nums[x-1]为负。【x<=N，因为>N的下标不在nums长度范围内】；3. 如果i为负，则表明数组中存在[i处下标+1]的正数，否则不存在
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    const hashSet = new Set(nums)
    let min = 1
    for (let i = 0; i < nums.length; i++) {
        if (hashSet.has(min)) {
            min++
        } else {
            break
        }
    }
    return min
};
```

```js [JavaScript 思路二]
/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
    /**
        数组nums长度为N，其未出现的最小正整数为[N+1]或在[1,N]内
        - 如果数组正好是[1,2,...,N]，则未出现的最小正整数为 N+1
        - 如果数组里面包含负数、零、大于N的数、重复的数，则未出现的最小整数在[1,N]内

        解法：利用数组下标标记
            1. 先把非正数标记为超出N的数字，如N+1；
            2. i处数字为x，那么就把nums的第x项变为负数，即nums[x-1]为负。【x<=6，因为>6的下标不在nums长度范围内】；
            3. 如果i为负，则表明数组中存在[i处下标+1]的正数，否则不存在
    */
    const l = nums.length
    // 第一步：非正数标记为 l+1
    for (let i = 0; i < l; i++) {
        if (nums[i] <= 0) nums[i] = l + 1
    }

    // 第二步：正数对应nums的项标负数
    for (let i = 0; i < l; i++) {
        // 保证数组标记为负数之前的值
        const index = Math.abs(nums[i])
        if (index <= l && nums[index - 1] > 0) nums[index - 1] *= -1
    }

    // 第三步：找缺失的第一个正数
    for (let i = 0; i < l; i++) {
        if (nums[i] > 0) return i + 1
    }

    // 如果[1,N]中不存在，则为N+1
    return l + 1
};
```

```python [Python3 思路二]
class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        # 先把非正数标记为N+1，遍历完成后整个数组都是正数
        for i in range(n):
            if nums[i] <= 0:
                nums[i] = n + 1

        # 再把nums的第【i处正数】项标记为负数。注意：超过n的数值不在nums的下标范围内，所以不标记；同一个处可以会被标记多次需要保证一直都是负数；要保证数组遍历时都是正数，后边的数据可能被标记为负数，所以取当前值时要取绝对值
        for i in range(n):
            num = abs(nums[i])
            if num <= n and nums[num - 1] > 0:
                nums[num - 1] *= -1

        # 校验缺失的正数在不在【1，n】范围内，i处为正数的下标即为缺失的下标
        for i in range(n):
            if nums[i] > 0:
                return i + 1

        # 不在【1，n】内，缺失的第一个正数即为 n+1
        return n + 1
```

:::