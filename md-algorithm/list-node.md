## 相交链表

**题目描述：https://leetcode.cn/problems/intersection-of-two-linked-lists/description/**

::: tip 解题思路
- 思路一：双指针移动。链表a与链表b如果有相交节点，那么它们尾部是相同的。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    let pA = headA
    let pB = headB
    if (!pA || !pB) return null

    // a与b有相交节点，说明尾部有一段是相同的：如果链表长度相同，a和b的相交节点在同一个位置；如果链表长度不相同，长链表先减去｜a.length-b.length｜长度后，a和b的相交节点在同一位置
    while (pA != pB) {
        pA = pA == null ? headB : pA.next
        pB = pB == null ? headA : pB.next
    }
    return pA
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def getIntersectionNode(
        self, headA: ListNode, headB: ListNode
    ) -> Optional[ListNode]:
        # 定义双指针，分别指向a、b链表
        a, b = headA, headB
        if not a or not b:
            return null

        # 相交链表的尾部是相同的
        while a != b:
            a = a.next if a else headB
            b = b.next if b else headA

        return a
```

:::


## 反转链表

**题目描述：https://leetcode.cn/problems/reverse-linked-list/description/**

::: tip 解题思路
- 思路一：双指针迭代。让头部指针指向尾部指针，再更新头部指针的位置。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
    // 双指针移动，起始指针一个指向头部，一个指向尾部
    let pre = null // 尾部指针
    let cur = head // 头部指针
    while (cur) {
        const next = cur.next
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 头指针、尾指针
        pre, cur = None, head

        while cur:
            temp = cur.next  # 暂存后续节点，cur更新使用
            cur.next = pre  # 当前节点断开，next指向pre
            pre = cur  # 当前节点移动到尾指针位置
            cur = temp  # 头部指针移动到下一个节点位置
        return pre
```

:::


## 回文链表

**题目描述：https://leetcode.cn/problems/palindrome-linked-list/description/**

::: tip 解题思路
- 思路一：递归、左右双指针。`回文链表是指一个链表，其节点值的序列正着读和反着读都一样`。先递归把右指针移到最右侧，再比较逐层比较左右指针是否相等。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：迭代、快慢指针。使用快慢指针找中间点，然后翻转一半指针，再与原指针比较。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    let left = head
    const isPal = (right) => {
        // 指针不断右移，递归最后再返回
        if (right.next && !isPal(right.next)) {
            return false
        }
        // 此时已递归到最底层，right指针在最右侧，left指针在最左侧；层层返回操作
        if (left.val !== right.val) {
            return false
        }
        left = left.next

        // 如果链表都相等表示是回文链表
        return true
    }
    return isPal(head)
};
```

```js [JavaScript 思路二]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
    // 用快慢指针找出链表的中间节点:奇数在中间，偶数在中间偏右
    const midNode = (head) => {
        let slow = fast = head
        while (fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }
        return slow
    }

    // 使用左右指针反转链表
    const reverseList = (head) => {
        let right = null
        let left = head
        while (left) {
            // 获取下一个节点
            const nextNode = left.next
            // 更改当前节点的指向
            left.next = right
            right = left
            left = nextNode
        }
        return right
    }

    let head2 = reverseList(midNode(head))
    while (head2) {
        if (head2.val !== head.val) {
            return false
        }
        head = head.next
        head2 = head2.next
    }
    return true
};
```

```python [Python3 思路二]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        # 获取中间节点：正中间或中间偏右节点
        def midNode(head):
            slow = fast = head
            while fast and fast.next:
                slow = slow.next
                fast = fast.next.next
            return slow

        # 反转链表
        def reverseList(head):
            right, left = None, head
            while left:
                nextNode = left.next
                left.next = right
                right = left
                left = nextNode
            return right

        # 中间节点反转链表后与原链表对比
        head2 = reverseList(midNode(head))
        while head2:
            if head2.val != head.val:
                return False
            head, head2 = head.next, head2.next
        return True
```

:::


## 环形链表

**题目描述：https://leetcode.cn/problems/linked-list-cycle/description/**

::: tip 解题思路
- 思路一：标记检测环。节点额外增加一个属性，当再次检测到属性存在时则表示是环
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
- 思路二：快慢指针检测环。快指针等于慢指针时则表示是环
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    while (head) {
        if (head.visited) {
            return true
        } else {
            head.visited = true
        }
        head = head.next
    }
    return false
};
```

```js [JavaScript 思路二]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
    if (!head || !head.next) return false
    let slow = head
    let fast = head.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) {
            return true
        }
    }
    return false
};
```

```python [Python3 思路二]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        slow, fast = head, head.next
        while fast and fast.next:
            slow, fast = slow.next, fast.next.next
            if slow == fast:
                return True
        return False
```

:::


## 环形链表 II

**题目描述：https://leetcode.cn/problems/linked-list-cycle-ii/description/**

::: tip 解题思路
- 思路一：哈希表检测环。把节点存到哈希表中，判断节点是否存在。
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
    const visited = new Set()
    while (head) {
        if (visited.has(head)) {
            return head
        }
        visited.add(head)
        head = head.next
    }
    return null
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None


class Solution:
    def detectCycle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        visited = {}
        while head:
            if head in visited:
                return head
            visited[head] = True
            head = head.next
        return None
```

:::


## 合并两个有序链表

**题目描述：https://leetcode.cn/problems/merge-two-sorted-lists/description/**

::: tip 解题思路
- 思路一：迭代。创建一个起始节点，逐渐链接下一个节点，注意边界情况。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
    // 边界处理
    if (!list1) return list2
    if (!list2) return list1

    // 创建起始节点
    const start = new ListNode()
    let merge = start
    // 两个链表都存在时迭代
    while (list1 && list2) {
        if (list1.val < list2.val) {
            merge.next = list1
            list1 = list1.next
        } else {
            merge.next = list2
            list2 = list2.next
        }
        merge = merge.next
    }
    // 注意一个链表迭代完成，另一个链表还有剩余的情况
    merge.next = list1 || list2
    return start.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(
        self, list1: Optional[ListNode], list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        # 边界处理
        if not list1:
            return list2
        if not list2:
            return list1

        # 创建起始节点
        merge = start = ListNode()
        # 开始迭代
        while list1 and list2:
            if list1.val < list2.val:
                merge.next = list1
                list1 = list1.next
            else:
                merge.next = list2
                list2 = list2.next
            merge = merge.next

        # 考虑剩余节点
        merge.next = list1 if list1 else list2

        return start.next
```

:::


## 两数相加

**题目描述：https://leetcode.cn/problems/add-two-numbers/description/**

::: tip 解题思路
- 思路一：迭代。创建起始节点，先指向任意存在节点，再更新节点val。注意出现溢出一个节点的情况。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    const start = new ListNode()
    let merge = start
    let count = 0
    while (l1 || l2) {
        // 两个节点值之和
        let val = count
        if (l1) val += l1.val
        if (l2) val += l2.val
        // 向下取整
        count = Math.floor(val / 10)
        // 求余数
        val %= 10
        // 当前节点赋值
        merge.next = l1 ? l1 : l2
        merge.next.val = val

        // 移动节点
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
        merge = merge.next
    }
    // 如果count值不为0需要多增加一个节点
    if (count > 0) {
        merge.next = new ListNode(count)
    }
    return start.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        # 虚拟节点和当前节点
        dummy = cur = ListNode()
        carry = 0  # 进位
        while l1 or l2 or carry:
            total = carry
            if l1:
                total += l1.val
                l1 = l1.next
            if l2:
                total += l2.val
                l2 = l2.next
            # 更新carry
            carry = total // 10
            cur.next = ListNode(total % 10)
            cur = cur.next
        return dummy.next
```

:::


## 三数之和

**题目描述：https://leetcode.cn/problems/3sum/description/**

::: tip 解题思路
- 思路一：计算链表长度，创建虚拟节点，获取新链表。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    // 计算链表长度
    let length = 0
    let cur = head
    while (cur) {
        length++
        cur = cur.next
    }

    // 新链表
    const dummy = new ListNode()
    cur = dummy
    while (head) {
        if (length === n) {
            cur.next = head.next
            return dummy.next
        }
        cur.next = head
        length--
        head = head.next
        cur = cur.next
    }
    return dummy.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # 第一步：计算链表长度
        l = 0
        lHead = head
        while lHead:
            l += 1
            lHead = lHead.next

        # 第二步：获取新链表
        dummy = cur = ListNode()
        while head:
            if l == n:
                cur.next = head.next
                return dummy.next
            cur.next = head
            l -= 1
            head = head.next
            cur = cur.next
        return dummy.next
```

:::


## 两两交换链表中的节点

**题目描述：https://leetcode.cn/problems/swap-nodes-in-pairs/description/**

::: tip 解题思路
- 思路一：迭代。创建一个虚拟节点开头，head结尾的新链表，每次交换两个节点的指向并移动节点位置
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    // 创建新链表
    const dummy = new ListNode(0, head)
    let cur = dummy
    // 节点交换
    while (cur.next && cur.next.next) {
        const node1 = cur.next
        const node2 = cur.next.next

        node1.next = node2.next
        node2.next = node1
        cur.next = node2

        // 节点位置移到node1
        cur = node1
    }
    return dummy.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapPairs(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 虚拟节点开头，此时指针指向虚拟节点，指针下两个节点位置进行交换
        dummy = cur = ListNode(0, head)

        # 交换节点
        while cur.next and cur.next.next:
            node1 = cur.next
            node2 = cur.next.next
            node1.next = node2.next
            node2.next = node1

            cur.next = node2
            cur = node1

        return dummy.next
```

:::


## K 个一组翻转链表

**题目描述：https://leetcode.cn/problems/reverse-nodes-in-k-group/description/**

::: tip 解题思路
- 思路一：k个节点组先局部翻转，再重新链接指针的指向
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
    // 翻转k 从【head，tail】的链表
    const reverseK = (head, tail) => {
        let pre = tail.next
        let cur = head
        while (pre != tail) {
            const next = cur.next
            cur.next = pre
            pre = cur
            cur = next
        }
        return [tail, head]
    }
    let dummy = new ListNode()
    let cur = dummy
    let node = head
    while (node) {
        // 获取翻转的开始和结束节点
        let start = node
        let tail = null
        let count = 0
        while (node && count < k) {
            count++
            tail = node
            node = node.next
        }
        // 不足翻转
        if (count < k) {
            cur.next = start
            break
        }
        // 翻转
        [newHead, newTail] = reverseK(start, tail)
        // 重新指向
        cur.next = newHead
        cur = newTail
    }
    return dummy.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        def reverseK(head, tail):  # k个节点局部翻转
            pre = tail.next
            cur = head
            while pre != tail:
                nextNode = cur.next
                cur.next = pre
                pre = cur
                cur = nextNode
            return tail, head

        dummy = cur = ListNode()
        node = head
        while node:
            # 获取翻转的头尾节点
            start = node
            tail = None
            count = 0
            while node and count < k:
                count += 1
                tail = node
                node = node.next

            # 处理不足k的链表
            if count < k:
                cur.next = start
                break

            # 开始翻转
            newHead, newTail = reverseK(start, tail)

            cur.next = newHead
            cur = newTail

        return dummy.next
```

:::


## 随机链表的复制

**题目描述：https://leetcode.cn/problems/copy-list-with-random-pointer/description/**

::: tip 解题思路
- 思路一：哈希表。先创建新节点到哈希表表中，再设置新节点的next和random
    - 时间复杂度：O(n)
    - 空间复杂度：O(n)
- 思路二：左右指针算法，比较左右指针的高度，高度低的指针移动，高度相同则左右指针任意一个移动
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript 思路一]
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
    if (!head) return null
    // 哈希表存储新节点
    const hashMap = new Map()
    let cur = head
    while (cur) {
        hashMap.set(cur, new _Node(cur.val))
        cur = cur.next
    }

    // 给新节点设置next和random
    cur = head
    while (cur) {
        const hashNode = hashMap.get(cur)
        hashNode.next = cur.next ? hashMap.get(cur.next) : null
        hashNode.random = cur.random ? hashMap.get(cur.random) : null
        cur = cur.next
    }
    return hashMap.get(head)
};
```

```js [JavaScript 思路二]
/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
    if (!head) return null

    // 第一步：复制原节点, a-b-c 转化为 a-a1-b-b1-c-c1
    for (let node = head; node; node = node.next.next) {
        const newNode = new _Node(node.val, node.next, null)
        node.next = newNode
    }

    // 第二步：给复制节点设置random
    for (let node = head; node; node = node.next.next) {
        if (node.random) {
            node.next.random = node.random.next
        }
    }

    // 第三步：分离链表
    const dummy = new _Node()
    let cur = dummy
    while (head) {
        cur.next = head.next
        cur = cur.next
        head.next = cur.next
        head = head.next
    }
    return dummy.next
};
```

```python [Python3 思路二]
"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""


class Solution:
    def copyRandomList(self, head: "Optional[Node]") -> "Optional[Node]":
        # 空值边界
        if not head:
            return None
        # 第一步：复制节点 a-b-c 转 a-a1-b-b1-c-c1
        node = head
        while node:
            newNode = Node(node.val, node.next, None)
            node.next = newNode
            node = newNode.next

        # 第二步：复制的新节点设置random
        node = head
        while node:
            if node.random:
                node.next.random = node.random.next
            node = node.next.next

        # 第三步：分离链表，只要复制的新节点
        dummy = cur = Node(0)
        while head:
            cur.next = head.next
            cur = cur.next
            head.next = cur.next
            head = head.next
        return dummy.next
```

:::


## 排序链表

**题目描述：https://leetcode.cn/problems/sort-list/description/**

::: tip 解题思路
- 思路一：归并排序算法。先节点入队列数组，再排序，最后拼接新链表。注意需要断开原链表
    - 时间复杂度：O(nlogn)
    - 空间复杂度：O(n)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
    if (!head || !head.next) {
        return head
    }
    // 第一步：node 放入数组
    let list = []
    while (head) {
        list.push(head)
        head = head.next
    }

    // 第二步：list 排序
    list.sort((a, b) => a.val - b.val)

    // 第三步：组建新链表
    let dummy = new ListNode()
    let cur = dummy
    for (const node of list) {
        node.next = null // 断开原链接
        cur.next = node
        cur = cur.next
    }
    return dummy.next
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # 边界处理
        if not head or not head.next:
            return head

        # 节点入数组
        list = []
        while head:
            list.append(head)
            head = head.next

        # list 排序
        list.sort(key=lambda x: x.val)

        # 新链表
        dummy = cur = ListNode()
        for node in list:
            node.next = None  # 注意需要断开原链表
            cur.next = node
            cur = cur.next
        return dummy.next
```

:::


## 合并 K 个升序链表

**题目描述：https://leetcode.cn/problems/merge-k-sorted-lists/description/**

::: tip 解题思路
- 思路一：顺序合并。先合并两个链表，再按顺序合并k个链表
    - 时间复杂度：O(nk)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
    const mergeTwoLists = (list1, list2) => {
        const dummy = new ListNode()
        let cur = dummy
        while (list1 && list2) {
            if (list1.val < list2.val) {
                cur.next = list1
                list1 = list1.next
            } else {
                cur.next = list2
                list2 = list2.next
            }
            cur = cur.next
        }

        // 拼接剩余节点
        cur.next = list1 || list2
        return dummy.next
    }
    let merge = null
    for (const list of lists) {
        merge = mergeTwoLists(merge, list)
    }
    return merge
};
```

```python [Python3]
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # 两个链表合并
        def mergeTwoLists(list1, list2):
            dummy = cur = ListNode(0)
            while list1 and list2:
                if list1.val < list2.val:
                    cur.next = list1
                    list1 = list1.next
                else:
                    cur.next = list2
                    list2 = list2.next
                cur = cur.next
            cur.next = list1 if list1 else list2
            return dummy.next

        # k 个链表合并
        merge = None
        for lst in lists:
            merge = mergeTwoLists(merge, lst)
        return merge
```

:::


## LRU 缓存

**题目描述：https://leetcode.cn/problems/lru-cache/description/**

::: tip 解题思路
- 思路一：哈希表。哈希表有序存储数据，get取值时，取值后删除当前数据再重新插入；put插入时，超出长度删除第一条，存在删除当前，然后再插入。
    - 时间复杂度：O(n)
    - 空间复杂度：O(1)
:::

::: details 参考答案
::: code-group

```js [JavaScript]
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity
    // 哈希表缓存
    this.cache = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    // 缓存不存在
    if (!this.cache.has(key)) return -1
    // 缓存存在，先删除后重新插入
    const val = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, val)
    return val
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    if (this.cache.has(key)) {
        // 缓存存在，需要删除
        this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
        // 缓存不存在且超出长度，删除第一条数据
        const firstKey = this.cache.keys().next().value
        this.cache.delete(firstKey)
    }
    // 插入数据
    this.cache.set(key, value)
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```

```python [Python3]
class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}

    def get(self, key: int) -> int:
        # 不在哈希表中
        if key not in self.cache:
            return -1
        # 在哈希表中，先删除后插入
        val = self.cache.pop(key)
        self.cache[key] = val
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            # 删除第一个，最久未使用的数据
            firstKey = next(iter(self.cache))
            self.cache.pop(firstKey)
        self.cache[key] = value


# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)
```

:::