## 前端常见的数据类型？
前端（JavaScript）中的数据类型是基础中的基础。根据 ECMAScript 标准，JavaScript 共有 **8 种** 数据类型，分为两大类：**原始类型（Primitive Types）** 和 **引用类型（Reference Types）**。

### 原始类型（7 种）（Primitive Types）

存储在**栈内存**中，直接保存值，**不可变**（每次修改都会创建新值）。

| 类型 | 说明 | 示例 |
|------|------|------|
| **`number`** | 整数 + 浮点数，2^53 内安全 | `42`, `3.14`, `NaN`, `Infinity` |
| **`bigint`** | 大整数（ES2020） | `9007199254740991n` |
| **`string`** | 文本字符串 | `"hello"`, `'world'`, `` `模板` `` |
| **`boolean`** | 逻辑值 | `true`, `false` |
| **`undefined`** | 声明未赋值 | `let a;` → `undefined` |
| **`null`** | 空值（主动赋值） | `let b = null;` |
| **`symbol`** | 唯一标识（ES6） | `Symbol('id')` |

`特殊注意点`：
- **`typeof null === 'object'`**（语言遗留 bug，实际是原始类型）
- **`NaN !== NaN`**（要用 `isNaN()` 或 `Number.isNaN()` 判断）

### 引用类型（1 种 + 若干子类型）（Reference Types）

存储在**堆内存**中，变量存的是**引用地址**，**可变**。

核心引用类型：`object`，以及常见子类型：

| 子类型 | 说明 | 示例 |
|--------|------|------|
| **普通对象** | 键值对集合 | `{ name: '张三' }` |
| **数组** | 有序集合 | `[1, 2, 3]` |
| **函数** | 可调用对象 | `function() {}` |
| **日期** | 时间操作 | `new Date()` |
| **正则** | 模式匹配 | `/abc/g` |
| **Map / Set** | ES6 新集合 | `new Map()` |
| **WeakMap / WeakSet** | 弱引用集合 | `new WeakMap()` |


### 类型判断方法

| 方法 | 适用场景 | 局限性 |
|------|----------|--------|
| **`typeof`** | 区分原始类型和函数 | `null` 误判为 `'object'`，不能区分对象具体类型 |
| **`instanceof`** | 判断是否为某个构造函数的实例 | 不适用原始类型，跨框架可能失效 |
| **`Object.prototype.toString.call()`** | **最准确**，区分所有类型 | 写法麻烦 |
| **`Array.isArray()`** | 专门判断数组 | 只能判断数组 |

### 隐式转换规则

| 场景 | 规则 |
|------|------|
| **`+` 运算** | 有字符串则转字符串，否则转数字 |
| **`- * / %`** | 全部转数字 |
| **`==`** | 不同类型会互相转换（`null == undefined` 为 true） |
| **`if` / `&&` / `\|\|`** | 转布尔值 |

```javascript
// 经典隐式转换例子
'5' + 3        // '53'
'5' - 3        // 2
true + true    // 2
[] + []        // ''（空字符串）
{} + []        // 0（奇葩，{} 被解析为代码块）
[] + {}        // '[object Object]'
!!''           // false（空字符串转布尔）
```

### 假值（Falsy Values）—— 共 8 种
```javascript
false, 0, -0, 0n, '', null, undefined, NaN
// 其他所有值都是真值（包括 []、{}、"0"）
```


## 后端常见的数据类型？

### Java 数据类型（两大类）

#### 1. 基本类型（8 种）- 存值在栈中

| 类型 | 字节 | 取值范围 | 默认值 | 示例 |
|------|------|---------|--------|------|
| `byte` | 1 | -128 ~ 127 | 0 | `byte b = 100;` |
| `short` | 2 | -32768 ~ 32767 | 0 | `short s = 1000;` |
| `int` | 4 | -2^31 ~ 2^31-1 | 0 | `int i = 100000;` |
| `long` | 8 | -2^63 ~ 2^63-1 | 0L | `long l = 100000L;` |
| `float` | 4 | 单精度浮点数 | 0.0f | `float f = 3.14f;` |
| `double` | 8 | 双精度浮点数 | 0.0d | `double d = 3.14159;` |
| `char` | 2 | 0 ~ 65535 | '\u0000' | `char c = 'A';` |
| `boolean` | 1 (JVM 依赖) | true/false | false | `boolean flag = true;` |

**关键特性**：
- 直接存储值，**不涉及 new**，效率高
- 包装类型（`Integer`、`Long` 等）提供对象方法，用于集合类

```java
// 基本类型 vs 包装类型
int a = 10;
Integer b = 10;        // 自动装箱
int c = b;             // 自动拆箱

// 注意：包装类型比较用 equals，不用 ==
Integer x = 127;
Integer y = 127;
System.out.println(x == y);    // true（缓存池 -128~127）
Integer m = 128;
Integer n = 128;
System.out.println(m == n);    // false（超出缓存范围）
```

#### 2. 引用类型（无数种）- 存引用在栈、对象在堆

| 类型 | 说明 | 示例 |
|------|------|------|
| **类** | 自定义对象 | `class User { String name; }` |
| **接口** | 契约定义 | `interface Runnable { void run(); }` |
| **数组** | 同类型集合 | `int[] arr = {1,2,3};` |
| **枚举** | 常量集合 | `enum Status { PENDING, DONE }` |
| **注解** | 元数据 | `@Override` |

**常用内置引用类型**：
```java
// 字符串（最特殊，不可变）
String str = "hello";

// 集合框架（最核心）
List<String> list = new ArrayList<>();
Set<Integer> set = new HashSet<>();
Map<String, Object> map = new HashMap<>();
Queue<Task> queue = new LinkedList<>();

// 日期时间（Java 8+）
LocalDate date = LocalDate.now();
LocalDateTime datetime = LocalDateTime.now();
```

### Python 的动态类型

Python 是**动态强类型**，变量无需声明类型：

| 类型 | 示例 | 特点 |
|------|------|------|
| `int` | `age = 25` | 任意大小（不像 Java 有范围限制） |
| `float` | `pi = 3.14` | 双精度浮点 |
| `bool` | `flag = True` | True/False（首字母大写） |
| `str` | `name = "张三"` | 不可变字符串 |
| `list` | `[1, 2, 3]` | 可变数组，可存不同类型 |
| `tuple` | `(1, "a")` | 不可变列表 |
| `dict` | `{"name": "张三"}` | 字典（类似 HashMap） |
| `set` | `{1, 2, 3}` | 无序不重复集合 |
| `None` | `value = None` | 空值（相当于 Java 的 null） |

```python
# Python 的灵活性
mixed = [1, "hello", 3.14, True, None]  # list 可混装类型
d = {"name": "张三", "age": 25}
d["new_key"] = "任意添加"  # 动态添加属性
```

### Go 语言的静态类型

Go 是**静态强类型**，但支持类型推断：

| 类型 | 示例 | 特点 |
|------|------|------|
| `int/int32/int64` | `var age int = 25` | 明确位数 |
| `float32/float64` | `var pi float64 = 3.14` | 需明确精度 |
| `string` | `name := "张三"` | UTF-8 编码 |
| `bool` | `flag := true` | true/false |
| `array` | `[3]int{1,2,3}` | 固定长度 |
| `slice` | `[]int{1,2,3}` | 动态数组（最常用） |
| `map` | `map[string]int{"age": 25}` | 哈希表 |
| `struct` | `type User struct{ Name string }` | 类似 Java 的 class |
| `interface{}` | `var any interface{}` | 空接口（类似 Java Object） |
| `nil` | `var p *int = nil` | 空指针 |

```go
// Go 的类型推断和零值
var name string        // 零值：""
var age int            // 零值：0
var active bool        // 零值：false
user := User{Name: "张三"}  // := 推断类型
```


### 后端特有的重要数据类型

#### 1. 高精度数值（金融/账务系统）
```java
// Java：BigDecimal（不可变，任意精度）
BigDecimal price = new BigDecimal("19.99");
BigDecimal total = price.multiply(BigDecimal.valueOf(3));

// Python：Decimal
from decimal import Decimal
price = Decimal("19.99")
```

#### 2. 二进制数据（文件/图片/加密）
```java
// Java
byte[] imageData = Files.readAllBytes(Paths.get("image.jpg"));

// Python
with open("image.jpg", "rb") as f:
    data = f.read()  # bytes 类型
```

#### 3. 日期时间（数据库交互核心）
```java
// Java 8+（必须掌握）
LocalDate date = LocalDate.now();           // 2026-05-15
LocalTime time = LocalTime.now();           // 14:30:25
LocalDateTime dt = LocalDateTime.now();     // 2026-05-15T14:30:25
Instant timestamp = Instant.now();          // 时间戳（UTC）

// 数据库映射（JDBC/MyBatis/JPA）
@Column(name = "create_time")
private LocalDateTime createTime;
```

#### 4. 枚举（状态机/常量）
```java
public enum OrderStatus {
    PENDING(0, "待支付"),
    PAID(1, "已支付"),
    SHIPPED(2, "已发货"),
    COMPLETED(3, "已完成");

    private int code;
    private String desc;

    OrderStatus(int code, String desc) {
        this.code = code;
        this.desc = desc;
    }
}
```

#### 5. Optional（避免空指针）
```java
// Java 8+ 核心特性
Optional<User> user = findById(123);
user.ifPresent(u -> System.out.println(u.getName()));
User defaultUser = user.orElse(new User("默认用户"));
```
