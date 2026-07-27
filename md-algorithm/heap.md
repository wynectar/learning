## 数组中的第K个最大元素

**题目描述：https://leetcode.cn/problems/kth-largest-element-in-an-array/description/**

::: tip 解题思路
- 思路一：归并排序。先排序后取值。
    - 时间复杂度：O(n log n)
    - 空间复杂度：O(n)
- 思路二：快速排序。先排序后取值。注意第K大，升序的话是从后往前数，也就是`下标为：num.length - k`
    - 时间复杂度：O(n log n)
    - 空间复杂度：O(1)
- 思路三：快速选择。基于快速排序的演化，只排到`num.length - k`处即可。
    - 时间复杂度：O(n log n)
    - 空间复杂度：O(1)
- 思路四：堆排序、TOPK。维护一个长度为k的最小堆，heap[0]就是第k个最大元素。数组与堆的对应关系：**父节点索引：`(i - 1) / 2`、左子节点索引：`2 * i + 1`、右子节点索引：`2 * i + 2`**。
    - 时间复杂度：O(n log k)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
};
```

```js [JavaScript 思路二]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 快速排序：升序
    const quickSort = (arr = [], left = 0, right = arr.length - 1) => {
        // 退出条件
        if (left >= right) return arr
        // 以最右侧为基准点：把小于基准点的数据往前移动
        const pivot = arr[right]
        let move = left
        for (let i = left; i < right; i++) {
            // 小数据往前移
            if (arr[i] <= pivot) {
                [arr[move], arr[i]] = [arr[i], arr[move]]
                move++
            }
        }
        // 以move为分割点，左侧[0,move)为小于等于基准点，右侧[move,right)大于基准点
        // 把基准点往前移
        [arr[move], arr[right]] = [arr[right], arr[move]]
        // 此时 move 左侧都是小数据，右侧都是大数据
        quickSort(arr, left, move - 1)
        quickSort(arr, move + 1, right)
        return arr
    }
    quickSort(nums)
    return nums[nums.length - k]
};
```

```js [JavaScript 思路三]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    if (k > nums.length) return null
    const targetIndex = nums.length - k
    // 快速排序：升序
    const quickSelect = (arr = [], targetIndex, left = 0, right = arr.length - 1) => {
        // 退出条件
        if (left >= right) return arr[left]
        // 以最右侧为基准点：把小于基准点的数据往前移动
        const pivot = arr[right]
        let move = left
        for (let i = left; i < right; i++) {
            // 小数据往前移
            if (arr[i] <= pivot) {
                [arr[move], arr[i]] = [arr[i], arr[move]]
                move++
            }
        }
        // 以move为分割点，左侧[0,move)为小于等于基准点，右侧[move,right)大于基准点
        // 把基准点往前移
        [arr[move], arr[right]] = [arr[right], arr[move]]
        // 此时 move 是目标位置则抛出，否则像右或像左查，不需要两侧都查
        if (move === targetIndex) {
            return arr[move]
        } else if (move < targetIndex) {
            return quickSelect(arr, targetIndex, move + 1, right)
        } else {
            return quickSelect(arr, targetIndex, left, move - 1)
        }
    }
    return quickSelect(nums, targetIndex)
};
```

```js [JavaScript 思路四]
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    // 上沉调整：最小堆（父节点的值大于子节点的值）
    const heapifyUp = (heap, i) => {
        // i默认为堆尾，不断与父节点比较
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            if (heap[parent] <= heap[i]) break
            [heap[parent], heap[i]] = [heap[i], heap[parent]]
            i = parent
        }
    }

    // 下沉调整：最小堆
    const heapifyDown = (heap, i) => {
        const n = heap.length
        while (true) {
            // 堆顶最小
            let smallest = i
            let left = 2 * i + 1
            let right = 2 * i + 2

            if (left < n && heap[left] < heap[smallest]) {
                smallest = left
            }
            if (right < n && heap[right] < heap[smallest]) {
                smallest = right
            }
            // 如果父节点比左右节点都大则比较完毕
            if (smallest == i) break
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]]
            i = smallest
        }
    }

    const heap = []
    for (const num of nums) {
        if (heap.length < k) {
            heap.push(num)
            heapifyUp(heap, heap.length - 1)
        } else if (num > heap[0]) {
            heap[0] = num
            heapifyDown(heap, 0)
        }
    }
    return heap[0]
};
```

```python [Python3 思路四]
class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        # 上沉调整：最小堆。堆尾向堆顶移动
        def heapifyUp(heap, i):
            # 只要当前节点不是根节点（索引 > 0），就继续向上调整
            while i > 0:
                parent = (i - 1) // 2
                if heap[parent] <= heap[i]:
                    break
                heap[parent], heap[i] = heap[i], heap[parent]
                i = parent

        # 下沉调整：最小堆。堆顶向堆尾移动
        def heapifyDown(heap, i):
            n = len(heap)
            while True:
                smallest = i
                left = 2 * i + 1
                right = 2 * i + 2
                if left < n and heap[left] < heap[smallest]:
                    smallest = left
                if right < n and heap[right] < heap[smallest]:
                    smallest = right
                if smallest == i:
                    break
                heap[i], heap[smallest] = heap[smallest], heap[i]
                i = smallest

        heap = []
        for num in nums:
            if len(heap) < k:
                heap.append(num)
                heapifyUp(heap, len(heap) - 1)
            elif num > heap[0]:
                heap[0] = num
                heapifyDown(heap, 0)
        return heap[0]
```

:::



## 前 K 个高频元素

**题目描述：https://leetcode.cn/problems/top-k-frequent-elements/description/**

::: tip 解题思路
- 思路一：堆排序。先使用哈希表记录数字出现的次数，再维护长度为k的最小堆。
    - 时间复杂度：O(n log k)
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
var topKFrequent = function (nums, k) {
    // 上浮调整
    function heapifyUp(heap, i) {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            // 通过数字计数比较
            if (numMap.get(heap[parent]) <= numMap.get(heap[i])) break
            [heap[i], heap[parent]] = [heap[parent], heap[i]]
            i = parent
        }
    }
    // 下沉调整
    function heapifyDown(heap, i) {
        const n = heap.length
        while (true) {
            let smallest = i
            let left = 2 * i + 1
            let right = 2 * i + 2
            if (left < n && numMap.get(heap[left]) < numMap.get(heap[smallest])) {
                smallest = left
            }
            if (right < n && numMap.get(heap[right]) < numMap.get(heap[smallest])) {
                smallest = right
            }
            if (smallest == i) break
            [heap[i], heap[smallest]] = [heap[smallest], heap[i]]
            i = smallest
        }
    }

    const numMap = new Map()
    for (const num of nums) {
        if (numMap.has(num)) {
            numMap.set(num, numMap.get(num) + 1)
        } else {
            numMap.set(num, 1)
        }
    }
    const heap = []
    for (const key of numMap.keys()) {
        if (heap.length < k) {
            heap.push(key)
            heapifyUp(heap, heap.length - 1)
        } else if (numMap.get(key) > numMap.get(heap[0])) {
            heap[0] = key
            heapifyDown(heap, 0)
        }
    }
    return heap
};
```

```python [Python3]
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        # 上浮调整：最小堆
        def heapifyUp(heap, i):
            while i > 0:
                parent = (i - 1) // 2
                if numMap[heap[parent]] <= numMap[heap[i]]:
                    break
                heap[i], heap[parent] = heap[parent], heap[i]
                i = parent

        # 下沉调整：最小堆
        def heapifyDown(heap, i):
            n = len(heap)
            while True:
                smallest, left, right = i, 2 * i + 1, 2 * i + 2
                if left < n and numMap[heap[left]] < numMap[heap[smallest]]:
                    smallest = left
                if right < n and numMap[heap[right]] < numMap[heap[smallest]]:
                    smallest = right
                if smallest == i:
                    break
                heap[i], heap[smallest] = heap[smallest], heap[i]
                i = smallest

        numMap = {}
        for num in nums:
            if num not in numMap:
                numMap[num] = 1
            else:
                numMap[num] += 1
        heap = []
        for key in numMap.keys():
            if len(heap) < k:
                heap.append(key)
                heapifyUp(heap, len(heap) - 1)
            elif numMap[key] > numMap[heap[0]]:
                heap[0] = key
                heapifyDown(heap, 0)
        return heap
```

:::



## 数据流的中位数

**题目描述：https://leetcode.cn/problems/find-median-from-data-stream/description/**

::: tip 解题思路
- 思路一：堆排序。把数据分为两个堆：`最大堆+最小堆`，最大堆存储数据较小的值，最小堆存储数据较大的值，最大堆的长度>=最小堆的长度。中位数计算：如果数据长度为奇数则是`最大堆的栈顶`，如果为偶数则是`(最大堆的栈顶+最小堆的栈顶)/2`
    - 时间复杂度：O(log n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]

var MedianFinder = function () {
    // 最大堆：存储较小的值，长度大于等于最小堆
    this.maxHeap = []
    // 最小堆：存储较大的值
    this.minHeap = []

    this.heapifyUp = (heap, i, isMaxHeap = false) => {
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2)
            const stop = isMaxHeap ? heap[parent] >= heap[i] : heap[parent] <= heap[i]
            if (stop) break
            [heap[i], heap[parent]] = [heap[parent], heap[i]]
            i = parent
        }
    }
    this.heapifyDown = (heap, i, isMaxHeap = false) => {
        const n = heap.length
        while (true) {
            let est = i
            let left = 2 * i + 1
            let right = 2 * i + 2

            if (left < n && (isMaxHeap && heap[left] > heap[est] || !isMaxHeap && heap[left] < heap[est])) {
                est = left
            }
            if (right < n && (isMaxHeap && heap[right] > heap[est] || !isMaxHeap && heap[right] < heap[est])) {
                est = right
            }
            if (est == i) break
            [heap[i], heap[est]] = [heap[est], heap[i]]
            i = est
        }
    }
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    // 1. 都存最大堆中，确保最大堆的元素数量大于最小堆的元素数量
    this.maxHeap.push(num)
    this.heapifyUp(this.maxHeap, this.maxHeap.length - 1, true)

    // 2. 平衡两个堆的数量，最大堆元素数量大于等于最小堆，最多多一个
    if (this.maxHeap.length > this.minHeap.length + 1) {
        // 取出最大值
        const top = this.maxHeap[0]
        this.maxHeap[0] = this.maxHeap.pop()
        this.heapifyDown(this.maxHeap, 0, true)
        this.minHeap.push(top)
        this.heapifyUp(this.minHeap, this.minHeap.length - 1, false)
    }

    // 3. 确保最大堆的所有元素都小于最小堆
    if (this.maxHeap.length && this.minHeap.length && this.maxHeap[0] > this.minHeap[0]) {
        // 栈顶交换
        [this.maxHeap[0], this.minHeap[0]] = [this.minHeap[0], this.maxHeap[0]]
        this.heapifyDown(this.maxHeap, 0, true)
        this.heapifyDown(this.minHeap, 0, false)
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    const maxl = this.maxHeap.length
    const minl = this.minHeap.length
    if ((minl + maxl) % 2) {
        return this.maxHeap[0]
    } else {
        return (this.maxHeap[0] + this.minHeap[0]) / 2
    }
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */
```

```python [Python3]
class MedianFinder:
    def heapifyUp(self, heap, i, isMaxHeap=False):
        while i > 0:
            parent = (i - 1) // 2
            stop = heap[parent] >= heap[i] if isMaxHeap else heap[parent] <= heap[i]
            if stop:
                break
            heap[i], heap[parent] = heap[parent], heap[i]
            i = parent

    def heapifyDown(self, heap, i, isMaxHeap=False):
        n = len(heap)
        while True:
            est, left, right = i, 2 * i + 1, 2 * i + 2
            if left < n and (
                isMaxHeap
                and heap[left] > heap[est]
                or not isMaxHeap
                and heap[left] < heap[est]
            ):
                est = left
            if right < n and (
                isMaxHeap
                and heap[right] > heap[est]
                or not isMaxHeap
                and heap[right] < heap[est]
            ):
                est = right
            if est == i:
                break
            heap[i], heap[est] = heap[est], heap[i]
            i = est

    def __init__(self):
        # 最大堆、最小堆、上浮调整、下沉调整
        self.maxHeap = []
        self.minHeap = []

    def addNum(self, num: int) -> None:
        # 1. 先入最大堆，保证最大堆数量最多
        self.maxHeap.append(num)
        self.heapifyUp(self.maxHeap, len(self.maxHeap) - 1, True)
        # 2. 平衡两个堆
        if len(self.maxHeap) > len(self.minHeap) + 1:
            top = self.maxHeap[0]
            self.maxHeap[0] = self.maxHeap.pop()
            self.heapifyDown(self.maxHeap, 0, True)
            self.minHeap.append(top)
            self.heapifyUp(self.minHeap, len(self.minHeap) - 1, False)
        # 3. 保证最大堆所有元素小于最小堆
        if (
            len(self.maxHeap)
            and len(self.minHeap)
            and self.maxHeap[0] > self.minHeap[0]
        ):
            self.maxHeap[0], self.minHeap[0] = self.minHeap[0], self.maxHeap[0]
            self.heapifyDown(self.maxHeap, 0, True)
            self.heapifyDown(self.minHeap, 0, False)

    def findMedian(self) -> float:
        total = len(self.maxHeap) + len(self.minHeap)
        if total % 2:
            return self.maxHeap[0]
        else:
            return (self.maxHeap[0] + self.minHeap[0]) / 2


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
```

:::