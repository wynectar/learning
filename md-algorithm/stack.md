## 有效的括号

**题目描述：https://leetcode.cn/problems/valid-parentheses/description/**

::: tip 解题思路
- 思路一：栈、哈希表。利用栈的后进先出思想，只要是左括号都入栈，后续碰到的右括号对应的左括号一定在栈顶，否则无效。最后栈空则比对完，否则有剩余则表示有无效的括号。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const l = s.length
    if (l % 2) return false
    const charMap = new Map([
        [')', '('],
        [']', '['],
        ['}', '{'],
    ])
    const stack = []
    for (let i = 0; i < l; i++) {
        const char = s[i]
        if (charMap.has(char)) {
            const stackChar = stack.pop()
            if (stackChar != charMap.get(char)) return false
        } else {
            stack.push(char)
        }
    }
    return !stack.length
};
```

```python [Python3]
class Solution:
    def isValid(self, s: str) -> bool:
        # 奇数必是无效
        if len(s) % 2:
            return False
        # 创建字典
        charMap = {")": "(", "]": "[", "}": "{"}
        stack = []
        for char in list(s):
            if char in charMap:
                lastChar = stack.pop() if stack else ""
                if lastChar != charMap[char]:
                    return False
            else:
                stack.append(char)
        return not len(stack)
```

:::


## 最小栈

**题目描述：https://leetcode.cn/problems/min-stack/description/**

::: tip 解题思路
- 思路一：栈。主栈、最小辅助栈。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]

var MinStack = function () {
    this.stack = []
    this.minStack = []
};

/** 
 * @param {number} value
 * @return {void}
 */
MinStack.prototype.push = function (value) {
    this.stack.push(value)
    const l = this.minStack.length
    if (!l || value <= this.minStack[l - 1]) {
        this.minStack.push(value)
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
    const val = this.stack.pop()
    if (val == this.minStack[this.minStack.length - 1]) {
        this.minStack.pop()
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
    return this.minStack[this.minStack.length - 1]
};

/** 
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
```

```python [Python3]
class MinStack:

    def __init__(self):
        self.stack = []
        self.minStack = []

    def push(self, value: int) -> None:
        self.stack.append(value)
        if not self.minStack or value <= self.minStack[-1]:
            self.minStack.append(value)

    def pop(self) -> None:
        val = self.stack.pop()
        if self.minStack and val == self.minStack[-1]:
            self.minStack.pop()

    def top(self) -> int:
        return self.stack[-1] if self.stack else None

    def getMin(self) -> int:
        return self.minStack[-1] if self.minStack else None


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(value)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()
```

:::


## 字符串解码

**题目描述：https://leetcode.cn/problems/decode-string/description/**

::: tip 解题思路
- 思路一：栈。使用栈存储元组，【重复次数，数字前面的字符】，注意数字前后的字母：前面字母+数字*后面字母
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    // 栈存储元组：重复数字，数字之前的字母
    const stack = []
    let curNum = 0
    let curStr = ''
    for (const char of s) {
        if (!isNaN(char)) {
            // 如果是数字更新当前次数
            curNum = curNum * 10 + char * 1
        } else if (char == '[') {
            // 如果是左括号，开始入栈
            stack.push([curNum, curStr])
            curNum = 0
            curStr = ''
        } else if (char == ']') {
            // 如果是右括号，开始出栈
            const [count, preStr] = stack.pop()
            curStr = preStr + curStr.repeat(count)
        } else {
            curStr += char
        }
    }
    return curStr
};
```

```python [Python3]
class Solution:
    def decodeString(self, s: str) -> str:
        stack = []
        curNum = 0
        curStr = ""
        for char in list(s):
            if char.isdigit():  # 如果是数字，注意num不仅仅是个位数
                curNum = curNum * 10 + int(char)
            elif char == "[":  # 入栈
                stack.append([curNum, curStr])
                curNum = 0
                curStr = ""
            elif char == "]":  # 出栈
                count, preStr = stack.pop()
                # 解密：数字之前的字符串+当前字符的重复次数
                curStr = preStr + curStr * count
            else:
                curStr += char
        return curStr
```

:::


## 每日温度

**题目描述：https://leetcode.cn/problems/daily-temperatures/description/**

::: tip 解题思路
- 思路一：单调栈。栈存储温度下标，当前温度比栈里面温度高时，开始出栈并记录几天升温。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
    const answer = new Array(temperatures.length).fill(0)
    // 存储当前位置下标
    const stack = []
    for (let i = 0; i < temperatures.length; i++) {
        const val = temperatures[i]
        while (stack.length && val > temperatures[stack[stack.length - 1]]) {
            const index = stack.pop()
            answer[index] = i - index
        }
        stack.push(i)
    }
    return answer
};
```

```python [Python3]
class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        n = len(temperatures)
        answer = [0] * n
        stack = []
        for i in range(n):
            # 栈里面的温度与当前温度对比，并标记天数
            while stack and temperatures[i] > temperatures[stack[-1]]:
                preIndex = stack.pop()
                answer[preIndex] = i - preIndex
            # 下标入栈
            stack.append(i)
        return answer
```

:::



## 柱状图中最大的矩形

**题目描述：https://leetcode.cn/problems/largest-rectangle-in-histogram/description/**

::: tip 解题思路
- 思路一：单调递增栈。栈存储下标，计算出当前柱子左侧形成矩形的最大面积，矩形边界：`右侧最近矮柱位置-左侧最近矮柱位置-1`，如果左侧矮柱不存在则默认下标为`[-1]`。注意最后位置`[length - 1]`柱子面积计算不到，需遍历到`[length]`位置，设置哨兵为0.
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
    // 单调栈：存储下标
    const stack = []
    let maxArea = 0
    const n = heights.length
    for (let i = 0; i <= n; i++) {
        // 最后加一个0柱，作为哨兵遍历
        const curHeight = i < n ? heights[i] : 0
        // 出栈，比较所有可能的矩形面积
        while (stack.length && curHeight < heights[stack[stack.length - 1]]) {
            // 当前高度小于栈顶高度时，出栈并逐个遍历比较面积
            const height = heights[stack.pop()]
            // 当前栈左侧边界，左边界可能不存在
            const left = stack.length ? stack[stack.length - 1] : -1
            const width = i - left - 1
            maxArea = Math.max(maxArea, width * height)
        }

        // 入栈:只存递增栈
        stack.push(i)
    }
    return maxArea
};
```

```python [Python3]
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        # 下标递增栈
        stack = []
        maxArea = 0
        n = len(heights)

        for i in range(n + 1):
            # n 时增加0哨兵柱子
            cur = heights[i] if i < n else 0

            while stack and cur < heights[stack[-1]]:
                height = heights[stack.pop()]
                # 左侧边界不存在时，默认哨兵-1
                left = stack[-1] if stack else -1
                width = i - left - 1
                maxArea = max(maxArea, width * height)

            stack.append(i)
        return maxArea
```

:::