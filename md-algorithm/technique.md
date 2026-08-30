## 只出现一次的数字

**题目描述：https://leetcode.cn/problems/single-number/description/**

::: tip 解题思路
- 思路一：异或运算。异或运算三大数学性质：交换律` a ^ b = b ^ a `，结合律` (a ^ b) ^ c = a ^ (b ^ c) `，自反性` a ^ a = 0  a ^ 0 = a`。利用异或运算的自反性 a ^ a = 0，所有数字异或的结果就是出现一次的数字。
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
var singleNumber = function (nums) {
    let result = 0
    for (const num of nums) {
        result ^= num
    }
    return result
};
```

```python [Python3]
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        # 利用异或运算的自反性 a ^ a = 0，所有数字异或的结果就是出现一次的数字
        result = 0
        for num in nums:
            result ^= num
        return result
```

:::


## 多数元素

**题目描述：https://leetcode.cn/problems/majority-element/description/**

::: tip 解题思路
- 思路一：Boyer-Moore 投票算法。大于 n/2 数量的元素，票数一定大于其他元素的票数之和。
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
var majorityElement = function (nums) {
    let answer = null
    let count = 0
    for (const num of nums) {
        // 票数为0的时候，选择参考数
        if (count == 0) answer = num
        // 与参考数相同投票加1，否则减1
        count += answer == num ? 1 : -1
    }
    return answer
};
```

```python [Python3]
class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        answer = None
        count = 0
        for num in nums:
            if count == 0:
                answer = num
            count += 1 if answer == num else -1
        return answer
```

:::


## 颜色分类

**题目描述：https://leetcode.cn/problems/sort-colors/description/**

::: tip 解题思路
- 思路一：计数填充。遍历统计0、1、2出现的次数，再填充到数组中。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
    // 计数填充
    let count0 = 0
    let count1 = 0
    let count2 = 0
    for (const num of nums) {
        if (num == 0) count0++
        else if (num == 1) count1++
        else count2++
    }
    let i = 0
    while (count0--) nums[i++] = 0
    while (count1--) nums[i++] = 1
    while (count2--) nums[i++] = 2
    return nums
};
```

```python [Python3]
class Solution:
    def sortColors(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        #  计数
        red, white, blue = 0, 0, 0
        for num in nums:
            if num == 0:
                red += 1
            elif num == 1:
                white += 1
            else:
                blue += 1

        # 填充
        i = 0
        for _ in range(red):
            nums[i] = 0
            i += 1
        for _ in range(white):
            nums[i] = 1
            i += 1
        for _ in range(blue):
            nums[i] = 2
            i += 1
        return nums
```

:::


## 下一个排列

**题目描述：https://leetcode.cn/problems/next-permutation/description/**

::: tip 解题思路
- 思路一：字典序、双指针。先从右到左找到降低点位置i；如果存在最低点，则再从右往左找到大于nums[i]的nums[j]位置，两者交换；再从[i+1]位置开始把降序的数据改为升序。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
    let n = nums.length
    // 从右到左找到最低点i
    let i = n - 2
    while (i >= 0 && nums[i] >= nums[i + 1]) {
        i--
    }
    // 从右到左找到比nums[i]大的nums[j]
    if (i >= 0) {
        let j = n - 1
        while (j > i && nums[j] <= nums[i]) j--
        [nums[i], nums[j]] = [nums[j], nums[i]]
    }
    // i+1 开始升序改为降序
    let left = i + 1
    let right = n - 1
    while (left < right) {
        [nums[left], nums[right]] = [nums[right], nums[left]]
        left++
        right--
    }
    return nums
};
```

```python [Python3]
class Solution:
    def nextPermutation(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # 降低点i，默认从倒数第二位置开始
        i = len(nums) - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1

        # 再找到大于nums[i]的位置j，如果i=-1，则表示当前序为最大序，下一个排序为最小值
        if i >= 0:
            j = len(nums) - 1
            while j > i and nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]

        # i+1 开始升序数据改降序
        left = i + 1
        right = len(nums) - 1
        while left < right:
            nums[left], nums[right] = nums[right], nums[left]
            left += 1
            right -= 1
        return nums
```

:::


## 寻找重复数

**题目描述：https://leetcode.cn/problems/find-the-duplicate-number/description/**

::: tip 解题思路
- 思路一：二分查找。取左右指针的中间值mid，计算nums里面小于等于mid的数量。如果数量大于mid，说明重复数在[left, mid]中；否则重复数在[mid+1, right]中。一直收缩到left==right。
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
var findDuplicate = function (nums) {
    // 双指针起始值
    let left = 1
    let right = nums.length - 1
    while (left < right) {
        const mid = Math.floor((left + right) / 2)
        // count 数值小于等于mid的计数
        let count = 0
        for (const num of nums) {
            if (num <= mid) count++
        }
        if (count > mid) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return left
};
```

```python [Python3]
class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        l, r = 1, len(nums) - 1

        while l < r:
            mid = (l + r) // 2
            # 小于等于mid的计数
            count = 0
            for num in nums:
                if num <= mid:
                    count += 1
            if count > mid:
                r = mid
            else:
                l = mid + 1
        return l
```

:::