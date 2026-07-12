## 无重复字符的最长子串

**题目描述：https://leetcode.cn/problems/longest-substring-without-repeating-characters/description/**

::: tip 解题思路
- 思路一：定义暂存最大子串字符串strs 和 最大子串长度longMax。遍历字符串，如果当前字符在strs中，则更新 `strs=strs.slice(index+1)`；接着继续拼接strs，更新longMax
    - 时间复杂度：O(n²)
    - 空间复杂度：O(1)

- 思路二：滑动窗口，找到最长子串的边界。每次遍历左指针向右移动，右指针滑动到最长连续字符边界
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let longMax = 0
    let strs = ''
    for (str of s) {
        const index = strs.indexOf(str)
        if (index > -1) {
            // 当前字符在字符串中，表示最长子串中断需要初始化数据
            strs = strs.slice(index + 1)
        }
        strs += str
        longMax = Math.max(longMax, strs.length)
    }
    return longMax
};
```

```js [JavaScript 思路二]
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    // 定义一个哈希集合，记录连续字符串
    const hashSet = new Set()
    // 定义右指针，相当于连续字符串的右边界
    let right = 0
    let longMax = 0

    // 左指针i 逐步向右移动
    for (let i = 0; i < s.length; i++) {
        if (i > 0) {
            // 从第二次遍历开始，需要删除前一个字符串
            hashSet.delete(s[i - 1])
        }
        while (right < s.length && !hashSet.has(s[right])) {
            // 右指针移动到最大连续子串位置
            hashSet.add(s[right])
            right++
        }
        longMax = Math.max(longMax, right - i)
    }

    return longMax
};
```

```python [Python3 思路二]
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        n = len(s)
        hashSet = set()  # 定义一个存放连续子串的集合

        right = 0  # 连续子串的右指针
        longMax = 0
        for i in range(n):
            # 左指针向右移动的同时，需要移除哈希表中的一个元素
            if i != 0:
                hashSet.remove(s[i - 1])

            # 右指针滑动到最大连续子串的边界
            while right < n and s[right] not in hashSet:
                hashSet.add(s[right])
                right += 1

            # 从i到right就是连续子串的集合，左闭右开区间
            longMax = max(longMax, right - i)

        return longMax
```

:::

## 找到字符串中所有字母异位词

**题目描述：https://leetcode.cn/problems/find-all-anagrams-in-a-string/description/**

::: tip 解题思路
- 思路一：定长滑窗移动和利用 `ASCII` 码计数，每次移动窗口的时候都要移除左边界字符和添加右边界字符
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    const sLen = s.length
    const pLen = p.length
    if (sLen < pLen) return []

    const result = []
    // 利用ASCII码计数
    const aCode = 'a'.charCodeAt()
    const sCount = new Array(26).fill(0)
    const pCount = new Array(26).fill(0)
    for (let i = 0; i < pLen; i++) {
        // s初始定长窗口异位词字母累计
        sCount[s[i].charCodeAt() - aCode]++
        // p字符串中字母累计
        pCount[p[i].charCodeAt() - aCode]++
    }
    if (sCount.toString() === pCount.toString()) {
        result.push(0)
    }
    for (let i = 1; i <= sLen - pLen; i++) {
        // 滑动时，减去 i-1 前一个字母，加i +pLen-1 处字母
        sCount[s[i - 1].charCodeAt() - aCode]--
        sCount[s[i + pLen - 1].charCodeAt() - aCode]++
        if (sCount.toString() === pCount.toString()) {
            result.push(i)
        }
    }
    return result
};
```

```python [Python3]
class Solution:
    def findAnagrams(self, s: str, p: str) -> List[int]:
        sl = len(s)
        pl = len(p)
        # s长度小于p时，两者不可能产生异位词
        if sl < pl:
            return []

        # 利用 ascii 码计数
        aCode = ord("a")
        sCount = [0] * 26
        pCount = [0] * 26
        result = []

        # s滑动窗口包含字母初始计数和p字母计数
        for i in range(pl):
            sCount[ord(s[i]) - aCode] += 1
            pCount[ord(p[i]) - aCode] += 1

        if sCount == pCount:
            result.append(0)

        # 窗口开始滑动
        for i in range(1, sl - pl + 1):
            # 移除左边届字符，添加右边界字符
            sCount[ord(s[i - 1]) - aCode] -= 1
            sCount[ord(s[i + pl - 1]) - aCode] += 1

            if sCount == pCount:
                result.append(i)

        return result
```

:::


## 和为K的子数组

**题目描述：https://leetcode.cn/problems/subarray-sum-equals-k/description/**

::: tip 解题思路
- 思路一：假设子数组 [i,j] 的和为 k，那么 [0,j]的和 - 前缀[0,i-1]的和 = k。哈希表中存储前缀和出现的次数，总和-k在哈希表中出现的次数即为答案。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    // 存储前缀和出行的次数
    const hashMap = new Map()
    // 前缀和为空数组时则为0，出现的次数计为1
    hashMap.set(0, 1)

    let sum = 0
    let count = 0
    for (let num of nums) {
        // 总和
        sum += num

        if (hashMap.has(sum - k)) {
            count += hashMap.get(sum - k)
        }
        // 当前总和作为下一组数据的前缀和存储
        if (hashMap.has(sum)) {
            hashMap.set(sum, hashMap.get(sum) + 1)
        } else {
            hashMap.set(sum, 1)
        }
    }
    return count
};
```

```python [Python3]
class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        # 哈希表存储前缀和出现的次数，默认前缀为空数组的和为0
        hashMap = {0: 1}

        preSum = 0
        count = 0
        for num in nums:
            preSum += num
            if preSum - k in hashMap:
                count += hashMap[preSum - k]

            if preSum in hashMap:
                hashMap[preSum] += 1
            else:
                hashMap[preSum] = 1

        return count
```

:::


## 滑动窗口最大值

**题目描述：https://leetcode.cn/problems/sliding-window-maximum/description/**

::: tip 解题思路
- 思路一：单调递减队列，达到窗口长度之前属于初始化队列，达到窗口长度时需要存储最大值，注意滑动窗口的时候需要考虑最大值在不在窗口内
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
    // 定义一个单调递减队列，存储nums下标值
    let queue = []
    let result = []

    for (let i = 0; i < nums.length; i++) {
        // 保证最大值下标在队列首位、保证该队列是递减队列
        while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
            queue.pop()
        }
        queue.push(i)

        // i<k-1 逐渐初始化第一个滑动窗口，跳出循环
        if (i < k - 1) continue

        // 当第二次开始移动的时候，需要考虑最大值在不在窗口内，不在需要弹出
        if (i >= k) {
            while (queue[0] <= i - k) {
                queue.shift()
            }
        }

        // i=k-1 完成初始化；以后每次循环表示窗口移动一次，都需要存储最大值
        result.push(nums[queue[0]])
    }
    return result
};
```

```python [Python3]
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        q = collections.deque()  # 定义一个单调递减队列
        result = []  # 定义一个空列表，存储每个滑动窗口的最大值

        for i in range(len(nums)):
            while q and nums[i] >= nums[q[-1]]:
                q.pop()
            q.append(i)

            if i < k - 1:  # 未达到窗口长度时，跳出循环
                continue

            # 当窗口滑动时，需要考虑最大值在不在窗口中
            if i >= k:
                while q[0] <= i - k:
                    q.popleft()

            # 达到窗口长度时，存储最大值
            result.append(nums[q[0]])
        return result
```

:::


## 最小覆盖子串

**题目描述：https://leetcode.cn/problems/minimum-window-substring/description/**

::: tip 解题思路
- 思路一：左右指针、滑动窗口。因为`覆盖子串的单一字母数`会大于等于`子串的单一字母数`，所以不能使用字母数是否相等比较，`需要比较字母种类数`。滑动窗口的右指针不断扩大窗口，找到符合条件的窗口；当找到符合条件的窗口时，滑动左指针缩小窗口；当缩小最小时，破坏当前条件即覆盖子串字母种类数减1，以便找到下一个符合条件的窗口。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
    const sl = s.length
    const tl = t.length
    if (sl < tl) return ''

    //大写字母的Unicode编码是65-90
    //小写字母的Unicode编码是97-122
    // 利用ascii码进行字母计数
    const sWindow = new Array(128).fill(0)
    const tWindow = new Array(128).fill(0)
    // 字母种类计数，当种类相同时，则表示找到答案
    let sCount = 0
    let tCount = 0
    for (const char of t) {
        const code = char.charCodeAt()
        if (tWindow[code] === 0) tCount++
        tWindow[code]++
    }

    // 满足条件的起始坐标和长度
    const result = [0, Infinity]
    // 窗口左右指针
    let left = 0
    let right = 0
    while (right < sl) {
        // 右侧扩大窗口，找到符合条件的窗口
        const code = s[right].charCodeAt()
        if (tWindow[code] > 0) {
            sWindow[code]++
            // 当t与s相同时，则需要scount计数
            if (tWindow[code] === sWindow[code]) sCount++
        }
        right++

        // 左侧收缩窗口，当找到符合条件的窗口时，左侧尽可能的收缩
        while (tCount === sCount && left <= right) {
            // 满足条件时，更新result
            if (right - left < result[1]) {
                result[0] = left
                result[1] = right - left
            }

            // 左指针不断移动，直到最左侧字母在t中，此时需要去除当前字母的计数，等待下一次收缩
            const leftCode = s[left].charCodeAt()
            if (tWindow[leftCode] > 0) {
                if (tWindow[leftCode] === sWindow[leftCode]) sCount--
                sWindow[leftCode]--
            }
            left++
        }
    }

    return result[1] === Infinity ? '' : s.slice(result[0], result[0] + result[1])

};
```

```python [Python3]
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        tl = len(t)
        sl = len(s)
        if sl < tl:
            return ""

        # 使用ascii码来对字母计数，大写【65，90】小写【97-122】
        twin = [0] * 128
        swin = [0] * 128
        # 定义字母种类变量
        tcount = 0
        scount = 0
        for char in t:
            code = ord(char)
            if twin[code] == 0:
                tcount += 1
            twin[code] += 1

        # 定义左右指针 和 符合条件的数据
        left = right = start = 0
        minlen = sl + 1

        while right < sl:
            # 右指针扩大窗口
            code = ord(s[right])
            if twin[code] > 0:
                swin[code] += 1
                # 字母数量相等时，开始计数
                if twin[code] == swin[code]:
                    scount += 1
            right += 1

            # 左指针缩小窗口
            while tcount == scount and left <= right:
                # 找到答案更新数据
                if right - left < minlen:
                    start = left
                    minlen = right - left

                # 缩小窗口
                leftcode = ord(s[left])
                if twin[leftcode] > 0:
                    # 缩小最小时，破坏平衡，以便找一个符合条件的窗口
                    if twin[leftcode] == swin[leftcode]:
                        scount -= 1
                    swin[leftcode] -= 1
                left += 1
        if minlen == sl + 1:
            return ""
        else:
            return s[start : start + minlen]
```

:::