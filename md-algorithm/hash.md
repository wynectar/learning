## 两数之和

**题目描述：https://leetcode.cn/problems/two-sum/description/**

::: tip 解题思路
- 思路一：定义一个哈希表。如果 目标值-当前值 在哈希表中，则找到答案；如果不在，则把当前值和下标存入哈希表，用于后续的对比。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    let result = []
    let hashtable = new Map() // 定义一个哈希表，存储{nums值: nums下标}
    for (let i = 0; i < nums.length; i++) {
        if (hashtable.has(target - nums[i])) {
            // （目标值 - 当前值）=key，如果key在哈希表中，则表示找到答案
            // 答案：哈希表中key对应的值 和 当前下标i
            result = [hashtable.get(target - nums[i]), i];
            break;
        } else {
            // 如果不在哈希表中，则需要把当前值和下标存入哈希表
            hashtable.set(nums[i], i);
        }
    }
    return result
};
```

```python [Python3]
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hashtable = dict()  # 定义一个哈希表字典
        for i, num in enumerate(nums):
            if target - num in hashtable:
                # 如果(目标值 - 当前值)在哈希表中，则输出答案
                return [hashtable[target - num], i]
            else:
                # 如果不在，则把当前值和下标存入字典
                hashtable[num] = i
        return []
```

:::


## 字母异位词分组

**题目描述：https://leetcode.cn/problems/group-anagrams/description/**

::: tip 解题思路
- 思路一：遍历字符串数组中，先把排序后的字符串作为哈希表的key，原字符串作为key对应的值，然后通过`.values()`函数把哈希表转为可迭代对象，再通过`Array.from`函数转为数组
    - 时间复杂度：O(n * k log k)
    - 空间复杂度：O(n²)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    let hashtable = new Map() // 存储:字符串排序后作为key -> 异位词集合
    for (let str of strs) {
        // 两种不同处理key的方式，性能会有所差异
        // const key = Array.from(str).sort().toString()
        const key = str.split('').sort().join('')
        if (hashtable.has(key)) {
            // 存在哈希表中，把当前字符串push进去
            hashtable.get(key).push(str)
        } else {
            // 不存在哈希表中，给当前key赋值
            hashtable.set(key, [str])
        }
    }
    // 生成可迭代的 MapIterator 对象后转化为数组
    return Array.from(hashtable.values())
};
```

```python [Python3]
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        hashtable = collections.defaultdict(list)  # 创建一个默认值为空列表的字典

        for str in strs:
            key = "".join(sorted(str))  # 字符串排序后转化为key
            hashtable[key].append(str)  # 当前key对应的list末尾插入str

        # 把字典先转化为可迭代对象，再转化为列表
        return list(hashtable.values())
```

:::


## 最长连续序列

**题目描述：https://leetcode.cn/problems/longest-consecutive-sequence/description/**

::: tip 解题思路
- 思路一：先给数组排序，再累计当前连续序列的长度，最后使用`Math.max`函数更新最大长度
    - 时间复杂度：O(n log n)
    - 空间复杂度：O(1)

- 思路二：先利用哈希表获取连续序列的第一个数，然后`while`循环累计当前连续序列的长度，最后使用`Math.max`函数更新最大长度
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    nums.sort((a, b) => a - b) // 先排序
    let maxlong = 0
    let curlong = 0

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            // 相同元素跳过操作
            continue;
        } else if (nums[i] === nums[i - 1] + 1) {
            // 连续元素，累计计数并更新最大值
            curlong += 1
            maxlong = Math.max(maxlong, curlong)
        } else {
            // 断续元素，重新计数
            curlong = 1
            maxlong = Math.max(maxlong, curlong)
        }
    }
    return maxlong
};
```

```js [JavaScript 思路二]
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
    const hashset = new Set(nums) // 建立一个去重后的哈希表
    let maxlong = 0
    for (const num of hashset) {
        if (!hashset.has(num - 1)) {
            // num-1 不在哈希表中，即表示 num 是连续序列的第一个数
            let curnum = num
            let curlong = 1
            while (hashset.has(curnum + 1)) {
                // curnum+1 在哈希表中，即表示一直是连续序列需计数
                curnum += 1
                curlong += 1
            }
            // 更新 maxlong
            maxlong = Math.max(maxlong, curlong)
        }
    }
    return maxlong
};
```

```python [Python3 思路二]
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        hashset = set(nums)  # 创建一个去重的哈希表
        maxlong = 0

        for num in hashset:
            if num - 1 not in hashset:  # 获取连续序列的第一个数num
                curnum = num
                curlong = 1

                while curnum + 1 in hashset: # 累计连续序列的长度
                    curnum += 1
                    curlong += 1

                # 更新最大长度
                maxlong = max(maxlong, curlong)
        return maxlong
```

:::