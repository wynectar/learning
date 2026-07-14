## 岛屿数量

**题目描述：https://leetcode.cn/problems/number-of-islands/description/**

::: tip 解题思路
- 思路一：递归、深度优先搜索。定义击沉陆地辅助函数，当遍历为陆地时，岛屿数量+1，并击沉相关的陆地。
    - 时间复杂度：O(mxn)
    - 空间复杂度：O(mxn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (!grid || !grid[0]) return 0
    let count = 0
    const rows = grid.length
    const cols = grid[0].length
    // 深度优先搜索，击沉岛屿
    const dfs = (row, col) => {
        // 水域时不做操作
        if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
            return
        }
        // 陆地时击沉
        grid[row][col] = '0'
        // 陆地时，四个方向相关联的陆地也需要击沉
        const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
        for (const [dr, dc] of dirs) {
            dfs(row + dr, col + dc)
        }
    }

    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (grid[m][n] !== '1') continue
            count++
            dfs(m, n)
        }
    }
    return count
};
```

```python [Python3]
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # 无数据时
        if not grid or not grid[0]:
            return 0
        # 获取行列数
        rows = len(grid)
        cols = len(grid[0])

        # 深度优先检索：击沉函数
        def dfs(row, col):
            # 水域时，不做操作
            if (
                row < 0
                or row >= rows
                or col < 0
                or col >= cols
                or grid[row][col] == "0"
            ):
                return
            # 陆地时，击沉当前陆地和四个方向相连接陆地
            grid[row][col] = "0"
            dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
            for dr, dc in dirs:
                dfs(row + dr, col + dc)

        # 遍历网格
        count = 0
        for m in range(rows):
            for n in range(cols):
                if grid[m][n] == "1":
                    count += 1
                    dfs(m, n)
        return count
```

:::


## 腐烂的橘子

**题目描述：https://leetcode.cn/problems/rotting-oranges/description/**

::: tip 解题思路
- 思路一：广度优先搜索。先获取初始腐烂橘子队列，再开始广度腐烂橘子并计算出腐烂时间，最后再检索网格。如果有新鲜橘子，则为不可能返回-1；如果没有，则返回腐烂时间。
    - 时间复杂度：O(mxn)
    - 空间复杂度：O(mxn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
    if (!grid || !grid[0]) return 0
    const rows = grid.length
    const cols = grid[0].length
    // 广度优先搜索：腐蚀新鲜橘子最短时间
    const bfs = (queue = []) => {
        let time = 0
        while (queue.length) {
            const nextQueue = []
            const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]]
            while (queue.length) {
                const [row, col] = queue.shift()
                for (const [dr, dc] of dirs) {
                    const m = row + dr
                    const n = col + dc
                    // 新鲜橘子变腐烂且作为下一次的腐烂源
                    if (m >= 0 && m < rows && n >= 0 && n < cols && grid[m][n] === 1) {
                        grid[m][n] = 2
                        nextQueue.push([m, n])
                    }
                }
            }
            queue = nextQueue
            if (queue.length) time++
        }
        return time
    }

    // 获取起始腐烂橘子的坐标
    const rotQueue = []
    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (grid[m][n] === 2) {
                rotQueue.push([m, n])
            }
        }
    }

    // 腐烂橘子的时间
    let time = bfs(rotQueue)
    // 腐烂后仍有新鲜橘子，说明新鲜橘子不能再被腐烂，即为不可能 返回-1
    for (let m = 0; m < rows; m++) {
        for (let n = 0; n < cols; n++) {
            if (grid[m][n] === 1) {
                time = -1
            }
        }
    }
    return time
};
```

```python [Python3]
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        if not grid or not grid[0]:
            return 0
        # 行列数
        rows = len(grid)
        cols = len(grid[0])

        # 广度优先搜索：腐烂橘子
        def bfs(queue):
            time = 0
            while queue:
                nextQueue = []
                # 上下左右四个方向
                dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
                while queue:
                    row, col = queue.pop(0)
                    # 下一次腐烂的橘子队列
                    for dr, dc in dirs:
                        m = row + dr
                        n = col + dc
                        # 新鲜橘子变腐烂橘子并入队
                        if (
                            m >= 0
                            and m < rows
                            and n >= 0
                            and n < cols
                            and grid[m][n] == 1
                        ):
                            grid[m][n] = 2
                            nextQueue.append((m, n))

                queue = nextQueue
                if queue:
                    time += 1
            return time

        # 获取初始腐烂橘子
        rotQueue = []
        for m in range(rows):
            for n in range(cols):
                if grid[m][n] == 2:
                    rotQueue.append((m, n))
        # 腐烂橘子并获取时间
        time = bfs(rotQueue)

        # 检索腐烂后是否还有新鲜橘子
        for m in range(rows):
            for n in range(cols):
                if grid[m][n] == 1:
                    time = -1
        return time
```

:::



## 课程表

**题目描述：https://leetcode.cn/problems/course-schedule/description/**

::: tip 解题思路
- 思路一：拓扑排序、哈希表。拓扑排序是对有向无环图（DAG） 的所有顶点进行线性排序，要想完成A必先完成B。有环则不能完成，无环则能完成。
    - 时间复杂度：O(V + E)
    - 空间复杂度：O(V + E)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
    // 创建前置课程与当前课程关系，当前课程入度哈希表
    const graph = new Map()
    const indegree = new Map()
    // 初始化哈希表
    for (let i = 0; i < numCourses; i++) {
        graph.set(i, [])
        indegree.set(i, 0)
    }
    // 构建哈希表
    for (const [cur, pre] of prerequisites) {
        // pre->cur 完成pre后才能做cur
        graph.get(pre).push(cur)
        // 入度：当前课程需要前置课程的数量
        indegree.set(cur, indegree.get(cur) + 1)
    }

    // 取出不需要前置课程的队列
    const queue = []
    for (const [key, val] of indegree) {
        if (val === 0) {
            queue.push(key)
        }
    }

    // 拓扑排序
    let count = 0
    while (queue.length) {
        // 当前无需前置课程的课程
        const cur = queue.shift()
        count++
        // 遍历当前课程的后续课程
        for (const next of graph.get(cur)) {
            indegree.set(next, indegree.get(next) - 1)
            if (indegree.get(next) === 0) {
                queue.push(next)
            }
        }
    }
    return count === numCourses
};
```

```python [Python3]
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]  # 先学课程与当前课程的关系
        indegree = [0] * numCourses  # 当前课程所需的前置课程数
        # 构建图
        for cur, pre in prerequisites:
            # 先学习前置课程，再学习当前课程
            graph[pre].append(cur)
            # 当前课程所需的学习的前置课程数
            indegree[cur] += 1

        # 获取不需要前置课程的学习课程
        queue = []
        for cur in range(numCourses):
            if indegree[cur] == 0:
                queue.append(cur)

        # 拓扑排序，学习计数
        count = 0
        while queue:
            # 先学习无前置课程的课程
            cur = queue.pop(0)
            count += 1
            # 再学习后续课程，后续课程如果全部学完，则入队计数
            for nex in graph[cur]:
                indegree[nex] -= 1
                if indegree[nex] == 0:
                    queue.append(nex)
        # 如果可以全部学完，则通过
        return count == numCourses
```

:::


## 实现 Trie (前缀树)

**题目描述：https://leetcode.cn/problems/implement-trie-prefix-tree/description/**

::: tip 解题思路
- 思路一：哈希表。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]

var Trie = function () {
    this.cache = new Map()
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
    if (!this.cache.has(word)) {
        this.cache.set(word)
    }
};

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
    return this.cache.has(word)
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
    let l = prefix.length
    let isStart = false
    for (const key of this.cache.keys()) {
        if (key.slice(0, l) === prefix) {
            isStart = true
            break
        }
    }
    return isStart
};

/** 
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
```

```python [Python3]
class Trie:

    def __init__(self):
        self.cache = {}

    def insert(self, word: str) -> None:
        self.cache[word] = True

    def search(self, word: str) -> bool:
        return self.cache.get(word, False)

    def startsWith(self, prefix: str) -> bool:
        for key in self.cache.keys():
            if key.startswith(prefix):
                return True
        return False


# Your Trie object will be instantiated and called as such:
# obj = Trie()
# obj.insert(word)
# param_2 = obj.search(word)
# param_3 = obj.startsWith(prefix)
```

:::