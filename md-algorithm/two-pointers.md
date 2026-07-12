## 移动零

**题目描述：https://leetcode.cn/problems/move-zeroes//description/**

::: tip 解题思路
- 思路一：相向指针（左右指针）算法，左指针为0时，使用 `.splice` 函数删除当前0，`.push` 函数末尾插入0
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)

- 思路二：同向指针（快慢指针）算法，0值向右移动，非0向左移动。当fast指针指向的值不为0时，快慢指针指向的值交换，slow指针向右移一位
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let left = 0
    let right = nums.length - 1
    // 双指针移动
    while (left < right) {
        if (nums[left] === 0) {
            // 左指针为0，删除当前元素，并在末尾插入0
            nums.splice(left, 1)
            nums.push(0)
        } else {
            // 左指针不为0，指针向右移动一位
            left += 1
        }
        if (nums[right] === 0) {
            // 右指针为0，指针向左移动一位
            right -= 1
        }
    }
    return nums
};
```

```js [JavaScript 思路二]
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let slow = 0
    // 快慢指针解法
    for (let fast = 0; fast < nums.length; fast++) {
        if (nums[fast] !== 0) {
            if (slow !== fast) {
                // slow和fast的值相互交换，即非0值往左移，0值往右移
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
            }
            slow++
        }
    }
};
```

```python [Python3 思路二]
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        n = len(nums)
        slow = fast = 0
        while fast < n:
            if nums[fast] != 0:
                # 快指针数据不为0时，快慢指针数据交换，即不为0数据向左移动
                if slow != fast:
                    nums[slow], nums[fast] = nums[fast], nums[slow]
                slow += 1

            # fast 指针向右移动
            fast += 1
```

:::


## 盛最多水的容器

**题目描述：https://leetcode.cn/problems/container-with-most-water/description/**

::: tip 解题思路
- 思路一：左右指针算法，比较左右指针的高度，高度低的指针移动，高度相同则左右指针任意一个移动
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
    let left = 0
    let right = height.length - 1
    let maxWater = 0
    while (left < right) {
        // 当前容器面积
        const curWater = (right - left) * Math.min(height[left], height[right])
        // 更新最大容器面积
        maxWater = Math.max(maxWater, curWater)

        // 左侧高低于右侧时，左指针向右移一位；反之亦然
        if (height[left] <= height[right]) {
            left++
        } else {
            right--
        }
    }
    return maxWater
};
```

```python [Python3]
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left = 0
        right = len(height) - 1
        maxWater = 0
        while left < right:
            curWater = (right - left) * min(height[left], height[right])
            maxWater = max(maxWater, curWater)

            # 指针移动判断，谁的高度低谁移动
            if height[left] <= height[right]:
                left += 1
            else:
                right -= 1
        return maxWater
```

:::


## 三数之和

**题目描述：https://leetcode.cn/problems/3sum/description/**

::: tip 解题思路
- 思路一：先对nums排序，第一层遍历时单指针移动，从第二次遍历开始相同元素跳过；第二层遍历时双指针移动，从第二次遍历开始相同元素跳过
    - 时间复杂度：O(n²)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    // 先对nums排序
    nums.sort((a, b) => a - b)
    const result = []
    for (let i = 0; i < nums.length; i++) {
        // 从第二次遍历开始相同元素需要跳过
        if (i > 0 && nums[i] === nums[i - 1]) continue

        // 到这里类似于求两数之和
        const target = 0 - nums[i]
        let left = i + 1
        let right = nums.length - 1
        while (left < right) {
            // 从第二次遍历开始相同元素需要跳过
            if (left > i + 1 && nums[left] === nums[left - 1]) {
                left++
                continue
            }
            const sum = nums[left] + nums[right]
            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]])
                left++
                right--
            } else if (sum < target) {
                left++
            } else {
                right--
            }
        }
    }
    return result
};
```

```python [Python3]
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()  # 对原数组排序
        length = len(nums)
        result = list()

        for i in range(length):
            # 从第二次遍历开始相同元素跳出循环
            if i > 0 and nums[i] == nums[i - 1]:
                continue

            target = 0 - nums[i]
            left = i + 1  # 左指针起始为i的下一位
            right = length - 1
            while left < right:
                # 从第二次遍历开始相同元素跳出循环
                if left > i + 1 and nums[left] == nums[left - 1]:
                    left += 1
                    continue
                # 判断左右指针之和与目标值是否相等
                twoSum = nums[left] + nums[right]
                if twoSum == target:
                    result.append([nums[i], nums[left], nums[right]])
                    left += 1
                    right -= 1
                elif twoSum < target:
                    left += 1
                else:
                    right -= 1

        return result
```

:::


## 接雨水

**题目描述：https://leetcode.cn/problems/trapping-rain-water/description/**

::: tip 解题思路
- 思路一：暴力解法会超出时间限制。第一层遍历获取当前i，第二层遍历获取i左右两边的最大值，最后判断当左右两边最大值都大于i时累加 `两个最大值中的最小值-当前值`
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)

- 思路一：分离指针，先正向遍历求出i处左侧最大值，并放入leftMax数组中；再反向遍历求出i处右侧最大值，并放入rightMax数组中；最后遍历累加i处的接水量
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    let sumWater = 0
    for (let i = 0; i < height.length; i++) {
        // 找出i两边的最大值
        let leftMax = 0
        let rightMax = 0

        // 第一和最后肯定不能存水 跳过
        if (i === 0 || i === height.length - 1) continue

        for (let j = 0; j < height.length; j++) {
            if (j < i) {
                leftMax = Math.max(leftMax, height[j])
            } else if (j > i) {
                rightMax = Math.max(rightMax, height[j])
            }
        }

        // i 存水等于 左右最大值中的最小值 减 当前值
        if (leftMax > height[i] && rightMax > height[i]) {
            sumWater += Math.min(leftMax, rightMax) - height[i]
        }
    }
    return sumWater
};
```

```js [JavaScript 思路二]
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
    const len = height.length

    // 正向获取i处左侧最大值
    const leftMax = new Array(len).fill(0)
    for (let i = 0; i < len; i++) {
        /**
            如果左侧没值，左侧最大值就是 i处的值
            如果左侧有值，左侧最大值就取 i-1 处的最大值 和 i处的值 两者之间的最大值
        */
        if (i === 0) {
            leftMax[i] = height[i]
        } else {
            leftMax[i] = Math.max(leftMax[i - 1], height[i])
        }
    }

    // 反向获取i处右侧最大值
    const rightMax = new Array(len).fill(0)
    for (let i = len - 1; i >= 0; i--) {
        /**
            如果右侧没值，右侧最大值就是 i处的值
            如果右侧有值，右侧最大值就取 i+1 处的最大值 和 i处的值 两者之间的最大值
        */
        if (i === len - 1) {
            rightMax[i] = height[i]
        } else {
            rightMax[i] = Math.max(rightMax[i + 1], height[i])
        }
    }

    // 计算总接水量
    let sumWater = 0
    for (let i = 0; i < len; i++) {
        sumWater += Math.min(leftMax[i], rightMax[i]) - height[i]
    }
    return sumWater
};
```

```python [Python3 思路二]
class Solution:
    def trap(self, height: List[int]) -> int:
        l = len(height)

        # 获取 i 处左侧最大值
        leftMax = [0] * l
        for i in range(l):
            # 左侧没值，最大值为 当前值
            if i == 0:
                leftMax[i] = height[i]
            # 左侧有值，最大值为 当前值 和 i-1处最大值 两者之间的最大值
            else:
                leftMax[i] = max(leftMax[i - 1], height[i])

        # 获取 i 处右侧最大值
        rightMax = [0] * l
        for i in reversed(range(l)):
            # 右侧没值，最大值为 当前值
            if i == l - 1:
                rightMax[i] = height[i]
            # 右侧有值，最大值为 当前值 和 i+1处最大值 两者之前的最大值
            else:
                rightMax[i] = max(rightMax[i + 1], height[i])

        #  总接水量累加
        sumWater = 0
        for i in range(l):
            sumWater += min(leftMax[i], rightMax[i]) - height[i]

        return sumWater
```

:::