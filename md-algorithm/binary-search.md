## 搜索插入位置

**题目描述：https://leetcode.cn/problems/search-insert-position/description/**

::: tip 解题思路
- 思路一：二分查找。
    - 时间复杂度：O(log n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
    let left = 0, right = nums.length - 1, ans = 0
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (target == nums[mid]) {
            ans = mid
            break
        } else if (target > nums[mid]) {
            left = mid + 1
            ans = left
        } else {
            right = mid - 1
        }
    }
    return ans
};
```

```python [Python3]
class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        left, right, ans = 0, len(nums) - 1, 0
        while left <= right:
            mid = (left + right) // 2
            if target == nums[mid]:
                ans = mid
                break
            elif target > nums[mid]:
                left = mid + 1
                ans = left
            else:
                right = mid - 1
        return ans
```

:::



## 搜索二维矩阵

**题目描述：https://leetcode.cn/problems/search-a-2d-matrix/description/**

::: tip 解题思路
- 思路一：双指针、贪心算法。每次移动排除一行或一列
    - 时间复杂度：O(m + n)
    - 空间复杂度：O(1)
- 思路二：二分查找。先对第一列或最后一列进行二分查找，锁定target所在行；再对该行进行二分查找。
    - 时间复杂度：O(m + n)
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
    if (!matrix || !matrix[0]) return false
    const rows = matrix.length
    const cols = matrix[0].length
    let m = 0, n = cols - 1
    let ans = false
    while (m < rows && n >= 0) {
        const val = matrix[m][n]
        if (target == val) {
            ans = true
            break
        } else if (target > val) {
            m++
        } else {
            n--
        }
    }
    return ans
};
```

```js [JavaScript 思路二]
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    if (!matrix || !matrix[0]) return false
    const rows = matrix.length
    const cols = matrix[0].length
    // 二分查找：小数 -> 大数
    const binarySearch = (matrix, target, row = null) => {
        // row = null 为第一列二分查找，否则为行查找；如果查找最后一列，m的初始值和处理逻辑需要发生变化
        let start = 0
        let end = row === null ? rows - 1 : cols - 1
        let ans = false
        let m = rows - 1
        while (start <= end) {
            const mid = Math.floor((start + end) / 2)
            const val = row === null ? matrix[mid][0] : matrix[row][mid]
            if (target == val) {
                ans = true
                break
            } else if (target > val) {
                start = mid + 1
            } else {
                end = mid - 1
                m = end
            }
        }
        return [m, ans]
    }
    // 找出target所在行
    const [row, ans] = binarySearch(matrix, target)
    if (ans) return true
    if (row < 0) return false

    return binarySearch(matrix, target, row)[1]
};
```

```python [Python3 思路二]
class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        rows, cols = len(matrix), len(matrix[0])

        # 对第一列或某一行进行二分查找
        def binarySearch(matrix, target, row=None):
            start = 0
            end = main = rows - 1 if row == None else cols - 1
            ans = False
            while start <= end:
                mid = (start + end) // 2
                val = matrix[mid][0] if row == None else matrix[row][mid]
                if target == val:
                    ans = True
                    break
                elif target > val:
                    start = mid + 1
                else:
                    end = mid - 1
                    main = end
            return [main, ans]

        # 找出target所在行
        row, ans = binarySearch(matrix, target)
        if ans:
            return True
        if row < 0:
            return False

        return binarySearch(matrix, target, row)[1]
```

:::



## 在排序数组中查找元素的第一个和最后一个位置

**题目描述：https://leetcode.cn/problems/find-first-and-last-position-of-element-in-sorted-array/description/**

::: tip 解题思路
- 思路一：二分查找。二分查找一直取左侧范围为左边届，取右侧范围为右边届。
    - 时间复杂度：O(log n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const findBound = (nums, target, isLeft = true) => {
        let left = 0
        let right = nums.length - 1
        let ans = -1
        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            const val = nums[mid]
            if (target == val) {
                ans = mid
                if (isLeft) {
                    right = mid - 1
                } else {
                    left = mid + 1
                }
            } else if (target > val) {
                left = mid + 1
            } else {
                right = mid - 1
            }
        }
        return ans
    }

    // 左边届
    const left = findBound(nums, target, true)
    if (left == -1) return [-1, -1]
    // 右边届
    const right = findBound(nums, target, false)
    return [left, right]

};
```

```python [Python3]
class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        def findBound(nums, target, isLeft=True):
            left, right = 0, len(nums) - 1
            ans = -1
            while left <= right:
                mid = (left + right) // 2
                val = nums[mid]
                if target == val:
                    ans = mid
                    if isLeft:
                        right = mid - 1
                    else:
                        left = mid + 1
                elif target > val:
                    left = mid + 1
                else:
                    right = mid - 1
            return ans

        # 左边届
        left = findBound(nums, target)
        if left == -1:
            return [-1, -1]
        # 右边届
        right = findBound(nums, target, False)
        return [left, right]
```

:::


## 搜索旋转排序数组

**题目描述：https://leetcode.cn/problems/search-in-rotated-sorted-array/description/**

::: tip 解题思路
- 思路一：二分查找。把数组分成A、B两个区，B区数字永远比A小。考虑中间点和目标值是在A区还是B区。
    - 时间复杂度：O(log n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
    if (!nums || !nums.length) return -1
    let left = 0
    let right = nums.length - 1
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const val = nums[mid]
        const fistVal = nums[0]
        const lastVal = nums[nums.length - 1]
        if (target == val) {
            return mid
        }
        // 可以把数组分成A、B区，B区数字永远比A区小
        if (val >= fistVal) {
            // 中间点落入A区
            if (target >= fistVal && target <= val) {
                // 如果目标值在A区
                right = mid - 1
            } else {
                // 目标值在A区后续+B区
                left = mid + 1
            }
        } else {
            // 中间点落入B区
            if (target >= val && target <= lastVal) {
                // 如果目标值在B区
                left = mid + 1
            } else {
                // 目标值在A区+B区前序
                right = mid - 1
            }
        }
    }
    return -1
};
```

```python [Python3]
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        if not nums:
            return -1
        n = len(nums)
        left, right = 0, n - 1
        while left <= right:
            mid = (left + right) // 2
            midVal = nums[mid]
            firstVal = nums[0]
            lastVal = nums[n - 1]
            if target == midVal:
                return mid
            if midVal >= firstVal:  # 中间点落入A区
                if firstVal <= target <= midVal:  # 目标值落入A区
                    right = mid - 1
                else:  # 目标值落入AB区
                    left = mid + 1
            else:  # 中间点落入B区
                if midVal <= target <= lastVal:  # 目标值落入B区
                    left = mid + 1
                else:  # 目标值落入AB区
                    right = mid - 1
        return -1
```

:::


## 寻找旋转排序数组中的最小值

**题目描述：https://leetcode.cn/problems/find-minimum-in-rotated-sorted-array/description/**

::: tip 解题思路
- 思路一：二分查找。数组分A、B区，判断中间点小于前后值，即为答案。
    - 时间复杂度：O(log n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
    const length = nums.length
    let l = 0
    let r = length - 1
    while (l <= r) {
        const mid = Math.floor((l + r) / 2)
        const midVal = nums[mid]
        const midPreVal = mid - 1 >= 0 ? nums[mid - 1] : nums[0]
        const midNextVal = mid + 1 < length ? nums[mid + 1] : nums[length - 1]
        if (midVal <= midPreVal && midVal <= midNextVal) {
            return midVal
        }
        if (midVal >= nums[0]) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }
    return nums[0]
};
```

```python [Python3]
class Solution:
    def findMin(self, nums: List[int]) -> int:
        if not nums:
            return None
        length = len(nums)
        l, r = 0, length - 1
        while l <= r:
            mid = (l + r) // 2
            midVal = nums[mid]
            midPreVal = nums[mid - 1] if mid - 1 >= 0 else nums[0]
            midNextVal = nums[mid + 1] if mid + 1 < length else nums[length - 1]
            if midVal <= midPreVal and midVal <= midNextVal:
                return midVal
            if midVal >= nums[0]:
                l = mid + 1
            else:
                r = mid - 1
        return min(nums[0], nums[length - 1])
```

:::


## 寻找两个正序数组的中位数

**题目描述：https://leetcode.cn/problems/median-of-two-sorted-arrays/description/**

::: tip 解题思路
- 思路一：二分查找。1、以长度最短的数组为二分查找基准数组 2、对两个数组进行分割，使两个数组左侧之和等于整体的一半 3、找出正确的分割点：num1左侧最大值小于num2右侧最小值 且 num2左侧最大值小于num1右侧最小值 4、根据整体是奇数或偶数求中位数。
    - 时间复杂度：O(log(m+n))
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
    // 1. 最短数组为基准
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1]
    }
    const m = nums1.length
    const n = nums2.length
    // 左半部分需要的元素个数
    const totalLeft = Math.ceil((m + n) / 2)
    // nums1在[0,m]内找分割点，分割点在第几个元素上
    let l = 0
    let r = m
    while (l <= r) {
        // num1 的二分查找分割点
        const i = Math.floor((l + r) / 2)
        // num2 的根据i而来的分割点
        const j = totalLeft - i

        /**
        左侧部分包括分割点
        i，j==0,分割点在第0个元素上，左侧部分不存在，最大值为负无穷
        i==m，j==n,分割点在第最后一个元素上，右侧部分不存在，最小值为正无穷
        */
        const num1LeftMax = i == 0 ? -Infinity : nums1[i - 1]
        const num1RightMin = i == m ? Infinity : nums1[i]
        const num2LeftMax = j == 0 ? -Infinity : nums2[j - 1]
        const num2RightMin = j == n ? Infinity : nums2[j]
        if (num1LeftMax <= num2RightMin && num2LeftMax <= num1RightMin) {
            if ((m + n) % 2) {
                // 总数为奇数
                return Math.max(num1LeftMax, num2LeftMax)
            } else {
                // 总数为偶数
                const left = Math.max(num1LeftMax, num2LeftMax)
                const right = Math.min(num1RightMin, num2RightMin)
                return (left + right) / 2
            }
        } else if (num1LeftMax > num2RightMin) {
            // 当num1左侧值比较大时，指针需要往左移
            r = i - 1
        } else {
            l = i + 1
        }
    }
};
```

```python [Python3]
import sys


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # 二分查找最短的数组
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        # 左侧部分所需元素个数
        totalLeft = (m + n + 1) // 2

        # nums1 在【0，m】中查找分割点，左侧部分包括分割点
        l, r = 0, m
        while l <= r:
            # nums2的分割点j根据i而来
            i = (l + r) // 2
            j = totalLeft - i

            # nums1,nums2的左侧部分最大值和右侧部分最小值
            nums1LeftMax = -sys.maxsize if i == 0 else nums1[i - 1]
            nums1RightMin = sys.maxsize if i == m else nums1[i]
            nums2LeftMax = -sys.maxsize if j == 0 else nums2[j - 1]
            nums2RightMin = sys.maxsize if j == n else nums2[j]

            # 如果nums1 nums2的左侧部分都是最小的，则说明找到分割点
            if nums1LeftMax <= nums2RightMin and nums2LeftMax <= nums1RightMin:
                if (m + n) % 2:
                    # 奇数时，中位数就是中间值
                    return max(nums1LeftMax, nums2LeftMax)
                else:
                    # 偶数时，中位数是左侧最大值和右侧最小值的平均值
                    left = max(nums1LeftMax, nums2LeftMax)
                    right = min(nums1RightMin, nums2RightMin)
                    return (left + right) / 2
            elif nums1LeftMax > nums2RightMin:
                # nums1左侧值比较大时，向左移动指针
                r = i - 1
            else:
                l = i + 1
```

:::