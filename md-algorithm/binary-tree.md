## 二叉树的中序遍历

**题目描述：https://leetcode.cn/problems/binary-tree-inorder-traversal/description/**

::: tip 解题思路
- 思路一：递归、深度优先检索。`中序遍历顺序为：左子树 → 根节点 → 右子树`。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：迭代、栈。利用栈后进先出的特性，模拟递归。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const result = []
    const dfs = (node) => {
        if (!node) return
        // 左子树深度优先检索
        dfs(node.left)
        // 根节点存入
        result.push(node.val)
        // 右子树深度优先检索
        dfs(node.right)
    }
    dfs(root)
    return result
};
```

```js [JavaScript 思路二]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    const result = []
    const stack = []
    while (root || stack.length) {
        // 栈存储节点：按照左根右存储
        while (root) {
            stack.push(root)
            root = root.left
        }
        root = stack.pop()
        result.push(root.val)
        root = root.right
    }
    return result
};
```

```python [Python3 思路二]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def inorderTraversal(self, root: Optional[TreeNode]) -> List[int]:
        result = []
        stack = []
        while root or stack:
            # 第一轮：先把最左侧子树入栈
            while root:
                stack.append(root)
                root = root.left
            # 后进先出：最后进来的节点出栈
            root = stack.pop()
            result.append(root.val)
            # 如果有右节点，需要进行第2、3、。。。n轮的树入栈
            root = root.right
        return result
```

:::


## 二叉树的最大深度

**题目描述：https://leetcode.cn/problems/maximum-depth-of-binary-tree/description/**

::: tip 解题思路
- 思路一：递归、深度优先搜索dfs。先递归到节点的最底层，再往上层层累加长度。
    - 时间复杂度：O(n)
    - 空间复杂度：O(height)
- 思路二：广度优先搜索bfs、队列。
    - 时间复杂度：O(n)
    - 空间复杂度：O(height)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (!root) return 0
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

```js [JavaScript 思路二]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
    if (!root) return 0
    let queue = [root]
    let height = 1
    while (queue.length) {
        const curQueue = []
        while (queue.length) {
            const node = queue.shift()
            if (node.left) curQueue.push(node.left)
            if (node.right) curQueue.push(node.right)
        }
        queue = curQueue
        if (queue.length) height++
    }
    return height
};
```

```python [Python3 思路二]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0

        queue = [root]
        height = 1
        while queue:
            # 广度优先搜索：获取当前层节点
            curQueue = []
            while queue:
                node = queue.pop(0)
                if node.left:
                    curQueue.append(node.left)
                if node.right:
                    curQueue.append(node.right)
            queue = curQueue
            if queue:
                height += 1
        return height
```

:::


## 翻转二叉树

**题目描述：https://leetcode.cn/problems/invert-binary-tree/description/**

::: tip 解题思路
- 思路一：递归、层序遍历。从上往下逐层对左右节点对换。
    - 时间复杂度：O(n)
    - 空间复杂度：O(height)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
    if (!root) return null
    const temp = root.left
    root.left = root.right
    root.right = temp
    invertTree(root.left)
    invertTree(root.right)
    return root
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        # 左右节点交换
        root.left, root.right = root.right, root.left
        # 进行下一层的交换
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root
```

:::


## 对称二叉树

**题目描述：https://leetcode.cn/problems/symmetric-tree/description/**

::: tip 解题思路
- 思路一：递归。对称二叉树：1.根节点值相等 2.两个根节点的左右子树互为镜像
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const mirror = (l, r) => {
    // 左右节点都为空时，是对称的
    if (!l && !r) return true
    // 左右节点有一个为空，不对称
    if (!l || !r) return false
    // 左右节点都存在时，先判断值是否相等，再判断左右子树是否镜像
    return l.val === r.val && mirror(l.left, r.right) && mirror(l.right, r.left)
}
var isSymmetric = function (root) {
    if (!root) return true
    return mirror(root.left, root.right)
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def mirror(self, l, r) -> bool:
        if not l and not r:  # 都不存在
            return True
        elif not l or not r:  # 有一个存在
            return False
        else:  # 都存在时，需要先比较值，再比较子树是否镜像
            return (
                l.val == r.val
                and self.mirror(l.left, r.right)
                and self.mirror(l.right, r.left)
            )

    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:  # 根节点为空时，是对称树
            return True
        return self.mirror(root.left, root.right)
```

:::


## 二叉树的直径

**题目描述：https://leetcode.cn/problems/diameter-of-binary-tree/description/**

::: tip 解题思路
- 思路一：递归、深度优先搜到。每个节点的左子树深度+右子树深度，即为当前节点的路径长度。比较每个节点的路径长度。
    - 时间复杂度：O(n)
    - 空间复杂度：O(h)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
    let answer = 0
    // 注意到：每个节点的左子树深度+右子树深度，即为当前节点的路径长度。取出最大的长度即为答案。
    const depth = (node) => {
        if (!node) return 0
        const l = depth(node.left)
        const r = depth(node.right)
        answer = Math.max(answer, l + r)
        return Math.max(l, r) + 1
    }
    depth(root)
    return answer
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        answer = 0

        # 求节点深度，并比较每个节点的路径长度
        def depth(node):
            if not node:
                return 0
            l = depth(node.left)
            r = depth(node.right)
            nonlocal answer  # 声明使用外层的 answer
            answer = max(answer, l + r)
            return max(l, r) + 1

        depth(root)
        return answer
```

:::


## 二叉树的层序遍历

**题目描述：https://leetcode.cn/problems/binary-tree-level-order-traversal/description/**

::: tip 解题思路
- 思路一：广度优先搜索、队列。逐层把节点值存储起来，并更新节点队列。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return []
    let queue = [root]
    const answer = []
    while (queue.length) {
        // 先创建每层节点值容器，再插入
        answer.push([])
        const end = answer.length - 1
        // 下一层节点数据
        const curQueue = []
        while (queue.length) {
            const node = queue.shift()
            answer[end].push(node.val)
            if (node.left) curQueue.push(node.left)
            if (node.right) curQueue.push(node.right)
        }
        queue = curQueue
    }
    return answer
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        answer = []
        queue = [root]
        while queue:
            cur = []
            answer.append([])
            end = len(answer) - 1
            # 存储当前层节点值，并更新下一层节点
            while queue:
                node = queue.pop(0)
                answer[end].append(node.val)
                if node.left:
                    cur.append(node.left)
                if node.right:
                    cur.append(node.right)
            queue = cur
        return answer
```

:::


## 将有序数组转换为二叉搜索树

**题目描述：https://leetcode.cn/problems/convert-sorted-array-to-binary-search-tree/description/**

::: tip 解题思路
- 思路一：中序遍历、递归。二叉搜索树的特性：左子树节点值<根节点值<右子树节点值。总以中间位置左边或右边的数字为根节点。
    - 时间复杂度：O(n)
    - 空间复杂度：O(logn)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
    const helper = (nums, left, right) => {
        if (left > right) return null
        // 总以中心偏左的数为根节点
        const mid = Math.floor((left + right) / 2)
        const root = new TreeNode(nums[mid])
        root.left = helper(nums, left, mid - 1)
        root.right = helper(nums, mid + 1, right)
        return root
    }
    return helper(nums, 0, nums.length - 1)
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:
        def helper(nums, left, right):
            if left > right:
                return None
            # 向下取整，中间偏左数为根节点
            mid = (left + right) // 2
            root = TreeNode(nums[mid])
            root.left = helper(nums, left, mid - 1)
            root.right = helper(nums, mid + 1, right)
            return root

        return helper(nums, 0, len(nums) - 1)
```

:::



## 验证二叉搜索树

**题目描述：https://leetcode.cn/problems/validate-binary-search-tree/description/**

::: tip 解题思路
- 思路一：递归。创建一个辅助函数，判断节点值在不在【min，max】范围内。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：中序遍历。注意到：二叉搜索树是升序的，利用中序遍历，验证后一个值比前一个值大
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    const helper = (node, min, max) => {
        if (!node) return true
        const val = node.val
        if (val <= min || val >= max) return false
        return helper(node.left, min, val) && helper(node.right, val, max)
    }
    return helper(root, -Infinity, Infinity)
};
```

```js [JavaScript 思路二]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
    const stack = []
    let min = -Infinity
    while (stack.length || root) {
        // 中序遍历，先存入栈
        while (root) {
            stack.push(root)
            root = root.left
        }
        // 后进先出
        const node = stack.pop()
        // 二叉搜索树是升序的
        if (node.val <= min) return false
        min = node.val
        root = node.right
    }
    return true
};
```

```python [Python3 思路二]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        stack = []
        minVal = None
        while stack or root:
            # 最左侧先入栈
            while root:
                stack.append(root)
                root = root.left
            # 出栈
            node = stack.pop()
            if minVal != None and node.val <= minVal:
                return False
            minVal = node.val
            root = node.right
        return True
```

:::


## 二叉搜索树中第 K 小的元素

**题目描述：https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/**

::: tip 解题思路
- 思路一：中序遍历。
    - 时间复杂度：O(n)
    - 空间复杂度：O(h)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    const stack = []
    let count = 0
    while (stack.length || root) {
        while (root) {
            stack.push(root)
            root = root.left
        }
        const node = stack.pop()
        count++
        if (count === k) return node.val
        root = node.right
    }
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        count = 0
        while stack or root:
            while root:
                stack.append(root)
                root = root.left
            node = stack.pop()
            count += 1
            if count == k:
                return node.val
            root = node.right
        return None
```

:::



## 二叉树的右视图

**题目描述：https://leetcode.cn/problems/binary-tree-right-side-view/description/**

::: tip 解题思路
- 思路一：广度优先搜索、队列。从下到下，从左到右的遍历节点，取出每层最右节点的值
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    if (!root) return []
    let queue = [root]
    const answer = []
    while (queue.length) {
        answer.push(queue[queue.length - 1].val)
        const cur = []
        while (queue.length) {
            const node = queue.shift()
            if (node.left) cur.push(node.left)
            if (node.right) cur.push(node.right)
        }
        queue = cur
    }
    return answer
};
```

```python [Python3]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []
        q = [root]
        ans = []
        while q:
            # 取每层最右的节点值
            ans.append(q[-1].val)
            cur = []
            # 更新下一层节点
            while q:
                node = q.pop(0)
                if node.left:
                    cur.append(node.left)
                if node.right:
                    cur.append(node.right)
            q = cur
        return ans
```

:::


## 二叉树展开为链表

**题目描述：https://leetcode.cn/problems/flatten-binary-tree-to-linked-list/description/**

::: tip 解题思路
- 思路一：先序遍历、递归。选前序遍历获取所有节点，再更改节点指针。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：迭代、Morris 遍历思想。`Morris 遍历思想：一种空间复杂度为 O(1) 的二叉树遍历算法，利用二叉树中的空闲指针（叶子节点的右指针）来临时存储信息，从而实现不需要栈或递归的遍历。`
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    const nodeList = []
    // 前序遍历
    const helper = (node) => {
        if (!node) return null
        nodeList.push(node)
        helper(node.left)
        helper(node.right)
    }
    // 按前序遍历获取所有节点
    helper(root)
    for (let i = 1; i < nodeList.length; i++) {
        const pre = nodeList[i - 1]
        const cur = nodeList[i]
        pre.left = null
        pre.right = cur
    }
};
```

```js [JavaScript 思路二]
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
    while (root) {

        if (root.left) {
            // 找到左子树的最右节点
            let pre = root.left
            while (pre.right) {
                pre = pre.right
            }
            // 当前节点右指针被指向左子树最右节点
            pre.right = root.right

            // 当前节点更改指针
            root.right = root.left
            root.left = null
        }
        root = root.right
    }
};
```

```python [Python3 思路二]
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        while root:
            # 如果左子树存在，需要更改节点的right前后指向
            if root.left:
                # 找出左子树的最右节点
                pre = root.left
                while pre.right:
                    pre = pre.right
                # 最右节点指向root.right
                pre.right = root.right

                # 更新当前节点指向
                root.right = root.left
                root.left = None
            root = root.right
```

:::


## 从前序与中序遍历序列构造二叉树

**题目描述：https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/**

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