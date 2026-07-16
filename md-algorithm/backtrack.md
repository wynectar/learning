## 全排列

**题目描述：https://leetcode.cn/problems/permutations/description/**

::: tip 解题思路
- 思路一：回溯法。回溯三步骤：选择路径-判断约束条件是否可行-不可行时撤销选择回溯。总共选择路径：nums.length!
    - 时间复杂度：O(n!)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    const ans = []
    const length = nums.length
    // 总共的变化是length！
    const backtrack = (index = 0) => {
        // 约束条件：完全填充时保存数据。index数据发生变化的位置
        if (index === length) {
            ans.push([...nums])
            return
        }
        for (let i = index; i < length; i++) {
            // 选择路径：数据交换
            [nums[i], nums[index]] = [nums[index], nums[i]]
            // 递归
            backtrack(index + 1)
            // 回溯
            if (index < length) {
                // index < length 这个条件时一直满足的，但不加次条件leetcode判定报错
                [nums[i], nums[index]] = [nums[index], nums[i]]
            }
        }
    }
    backtrack(0)
    return ans
};
```

```python [Python3]
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        ans=[]
        l=len(nums)
        # 回溯函数:index 数据变换的位置 
        def backtrack(index=0):
            # 当变换位置超出nums时，说明已经完成变化
            if index == l:
                ans.append(nums.copy())
                return
            for i in range(index,l):
                # 数据变换
                nums[i],nums[index]=nums[index],nums[i]
                # 进行下位的选择，选择路径为：l-index
                backtrack(index+1)
                # 回溯
                nums[i],nums[index]=nums[index],nums[i]
        backtrack()
        return ans
```

:::



## 子集

**题目描述：https://leetcode.cn/problems/subsets/description/**

::: tip 解题思路
- 思路一：回溯法。每次的子集变化都保存下来。
    - 时间复杂度：O(n×2^n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    // 回溯函数
    const length = nums.length
    const stack = []
    const backtrack = (start = 0) => {
        ans.push([...stack])
        if (start === length) return
        for (let i = start; i < length; i++) {
            // 数据每次增加一位
            stack.push(nums[i])
            // 递归
            backtrack(i + 1)
            // 回溯原来的数据
            stack.pop()
        }
    }
    const ans = []
    backtrack()
    return ans
};
```

```python [Python3]
class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        stack = []  # 子集栈
        l = len(nums)

        def backtrack(start=0):
            # 收集子集
            ans.append(stack[:])

            # 超出nums范围，递归结束
            if start == l:
                return

            for i in range(start, l):
                # 子集变化
                stack.append(nums[i])
                # 递归
                backtrack(i + 1)
                # 子集回溯
                stack.pop()

        ans = []
        backtrack()
        return ans
```

:::



## 电话号码的字母组合

**题目描述：https://leetcode.cn/problems/letter-combinations-of-a-phone-number/description/**

::: tip 解题思路
- 思路一：回溯法。每次字母拼接完成就存储起来。
    - 时间复杂度：O(n×2^n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    const wordMap = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    const length = digits.length
    const stack = []
    const backtrack = (start = 0) => {
        // 终止条件
        if (start === length) {
            ans.push(stack.join(''))
            return
        }
        const word = wordMap[digits[start]]
        for (let i = 0; i < word.length; i++) {
            // 获取每个字母的可能性
            stack.push(word[i])
            // 递归
            backtrack(start + 1)
            // 回溯
            stack.pop()
        }
    }
    const ans = []
    backtrack()
    return ans
};
```

```python [Python3]
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        # 字典映射
        wordMap = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }
        n = len(digits)
        stack = []

        def backtrack(start=0):
            # 终止条件：字母拼接完成
            if start == n:
                ans.append("".join(stack))
                return
            letters = wordMap[digits[start]]
            for letter in letters:
                stack.append(letter)
                backtrack(start + 1)
                stack.pop()

        ans = []
        backtrack()
        return ans
```

:::


## 组合总和

**题目描述：https://leetcode.cn/problems/combination-sum/description/**

::: tip 解题思路
- 思路一：回溯法。因为数字可以被无限制次数使用，所以每次递归要从当前项开始。
    - 时间复杂度：O(n×2^n)
    - 空间复杂度：O(target)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
    const length = candidates.length
    const stack = []
    const backtrack = (start = 0, remaining) => {
        // 终止条件：找到答案
        if (remaining === 0) {
            ans.push([...stack])
        }
        // 终止条件：此路不通
        if (remaining < 0) return
        for (let i = start; i < length; i++) {
            const num = candidates[i]
            stack.push(num)
            // 从当前项开始，再次递归，同一数字可以无限制被选取
            backtrack(i, remaining - num)
            stack.pop()
        }
    }
    const ans = []
    backtrack(0, target)
    return ans
};
```

```python [Python3]
class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        n = len(candidates)
        stack = []

        def backtrack(start=0, remaining=0):
            # 找到答案终止
            if remaining == 0:
                ans.append(stack[:])
                return
            # 条件越界终止
            if remaining < 0:
                return
            for i in range(start, n):
                num = candidates[i]
                stack.append(num)
                backtrack(i, remaining - num)
                stack.pop()

        ans = []
        backtrack(0, target)
        return ans
```

:::


## 括号生成

**题目描述：https://leetcode.cn/problems/generate-parentheses/description/**

::: tip 解题思路
- 思路一：回溯法。先左`(`，后右`)`。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
    const ans = []
    const stack = []
    const backtrack = (left = 0, right = 0) => {
        // 终止条件：找到答案
        if (stack.length == 2 * n) {
            ans.push(stack.join(''))
            return
        }
        if (left < n) {
            stack.push('(')
            backtrack(left + 1, right)
            stack.pop()
        }
        if (right < left) {
            stack.push(')')
            backtrack(left, right + 1)
            stack.pop()
        }
    }
    backtrack()
    return ans
};
```

```python [Python3]
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        ans = []
        stack = []

        def backtrack(left=0, right=0):
            if len(stack) == 2 * n:
                ans.append("".join(stack))
                return
            if left < n:
                stack.append("(")
                backtrack(left + 1, right)
                stack.pop()
            if right < left:
                stack.append(")")
                backtrack(left, right + 1)
                stack.pop()

        backtrack()
        return ans
```

:::



## 单词搜索

**题目描述：https://leetcode.cn/problems/word-search/description/**

::: tip 解题思路
- 思路一：回溯法。网格每个位置都是起始点，从起始点开始查找，符合的即为答案。
    - 时间复杂度：O(M × N × 3^L)
    - 空间复杂度：O(L)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
    if (!board || !board[0]) return false
    const rows = board.length
    const cols = board[0].length
    // 回溯函数：逐一找到对应的单词
    const backtrack = (m = 0, n = 0, index = 0) => {
        // 终止条件：找到答案
        if (index === word.length) {
            return true
        }
        // 终止条件：越界
        if (m < 0 || m >= rows || n < 0 || n >= cols || board[m][n] !== word[index]) {
            return false
        }
        const letter = board[m][n]
        // 标记当前单词已使用
        board[m][n] = '#'
        // 下一步当前字母的四个方向都有可能走
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        for (const [dr, dc] of dirs) {
            if (backtrack(m + dr, n + dc, index + 1)) {
                return true
            }
        }
        // 如果没找到回溯
        board[m][n] = letter
        return false
    }
    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (backtrack(m, n, 0)) {
                return true
            }
        }
    }
    return false
};
```

```python [Python3]
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board or not board[0]:
            return False
        rows = len(board)
        cols = len(board[0])

        # 以任意位置为起点，每次移动都与word对应的字母比较
        def backtrack(m=0, n=0, index=0):
            # word每个字符都匹配上，即为找到答案
            if index == len(word):
                return True
            # 如果越界或与word对应字符不匹配，则此条路径不通
            if m < 0 or m >= rows or n < 0 or n >= cols or board[m][n] != word[index]:
                return False

            # 此时当前字符在word对应位置上
            letter = board[m][n]
            board[m][n] = "#"

            #  下一步：四个方向路径
            dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
            for dr, dc in dirs:
                if backtrack(m + dr, n + dc, index + 1):
                    return True
            # 下一步的路径不通则回溯
            board[m][n] = letter
            return False

        # 网格任意位置开始
        for m in range(rows):
            for n in range(cols):
                if backtrack(m, n, 0):
                    return True
        return False
```

:::



## 分割回文串

**题目描述：https://leetcode.cn/problems/palindrome-partitioning/description/**

::: tip 解题思路
- 思路一：回溯+记忆化搜索。判断回文字符串时，使用记忆化搜索，防止重复校验。再利用回溯找出需要的答案。
    - 时间复杂度：O(n × 2^n)
    - 空间复杂度：O(n²)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function (s) {
    const n = s.length
    const memo = new Array(n).fill(0).map((v) => new Array(n).fill(0))
    // 回文判断：0未校验，1为回文，-1为非回文
    const isPalindrome = (left, right) => {
        // 如果比较最后左指针 大于等于 右指针，说明判断结束且为回文字符
        if (left >= right) {
            return 1
        }
        // 如果已校验，则直接返回结果
        if (memo[left][right]) {
            return memo[left][right]
        }
        // 如果首位相等，再接着往中间移动是否是回文
        if (s[left] === s[right]) {
            memo[left][right] = isPalindrome(left + 1, right - 1)
        } else {
            memo[left][right] = -1
        }
        return memo[left][right]
    }

    const ans = []
    const stack = []
    const backtrack = (start = 0) => {
        // 字符已分割完
        if (start === n) {
            ans.push([...stack])
            return
        }
        for (let end = start; end < n; end++) {
            if (isPalindrome(start, end) == 1) {
                // 存入回文字符
                stack.push(s.slice(start, end + 1))
                // 递归处理剩余字符
                backtrack(end + 1)
                // 回溯
                stack.pop()
            }
        }
    }
    backtrack()
    return ans
};
```

```python [Python3]
class Solution:
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        # 记录校验过的字符串，减少重复校验的消耗。0未校验，1回文，-1非回文
        memo = [[0] * n for _ in range(n)]

        def isPalindrome(left=0, right=0):
            if left >= right:
                return 1
            if memo[left][right]:
                return memo[left][right]

            if s[left] == s[right]:
                memo[left][right] = isPalindrome(left + 1, right - 1)
            else:
                memo[left][right] = -1
            return memo[left][right]

        ans = []
        stack = []

        def backtrack(start=0):
            if start == n:
                ans.append(stack[:])
            for end in range(start, n):
                if isPalindrome(start, end) == 1:
                    stack.append(s[start : end + 1])
                    backtrack(end + 1)
                    stack.pop()

        backtrack()
        return ans
```

:::


## N 皇后

**题目描述：https://leetcode.cn/problems/n-queens/description/**

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