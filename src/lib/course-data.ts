/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck — data file with deep structural nesting; known type inference limitations.
// Full restructuring to satisfy strict TS would be overly invasive for a data/config file.
/* eslint-enable @typescript-eslint/ban-ts-comment */

export interface CodeComparison {
  title: string;
  php: string;
  python: string;
  note?: string;
}

export interface Lesson {
  title: string;
  duration: string;
  description: string;
  keyPoints: string[];
  codeExamples: CodeComparison[];
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  difficulty: '入门' | '基础' | '进阶' | '高级';
  icon: string;
  color: string;
  description: string;
  lessons: Lesson[];
  phpConcept?: string;
  pythonConcept?: string;
}

export const modules: Module[] = [
  {
    id: 1,
    title: '环境搭建与快速入门',
    subtitle: '从零开始搭建 Python 开发环境',
    duration: '第 1 天',
    difficulty: '入门',
    icon: '🚀',
    color: 'from-emerald-500 to-teal-600',
    description: '了解 Python 与 PHP 的核心差异，搭建开发环境，编写第一个 Python 程序。作为有 PHP 经验的开发者，你会发现 Python 的语法更加简洁优雅。',
    phpConcept: 'PHP 环境 (XAMPP/MAMP/Composer)',
    pythonConcept: 'Python 环境 (venv/pip/poetry)',
    lessons: [
      {
        title: 'Python vs PHP：核心差异概览',
        duration: '30 分钟',
        description: '对比 Python 和 PHP 的设计哲学、运行方式、应用领域等核心区别。',
        keyPoints: [
          'PHP 是模板引擎型语言，Python 是通用编程语言',
          'PHP 以 Web 为中心，Python 覆盖 Web/AI/数据科学/自动化',
          'Python 使用缩进而非花括号定义代码块',
          'Python 是编译+解释型语言，有字节码优化',
          'PHP 的 $ 变量前缀 vs Python 无前缀',
        ],
        codeExamples: [
          {
            title: 'Hello World 对比',
            php: `<?php
// PHP: 需要标签包裹
echo "Hello, World!";

// 变量需要 $ 前缀
$name = "PHP Developer";
echo "Hello, " . $name . "!";`,
            python: `# Python: 无需标签包裹，直接写
print("Hello, World!")

# 变量无需前缀
name = "PHP Developer"
print(f"Hello, {name}!")  # f-string 格式化`,
            note: 'Python 的 f-string 类似 PHP 的双引号字符串插值，但更简洁强大。',
          },
          {
            title: '文件结构对比',
            php: `// PHP 项目典型结构
project/
├── index.php          // 入口文件
├── composer.json      // 依赖管理
├── app/
│   ├── Controllers/
│   ├── Models/
│   └── Views/
└── vendor/            // 依赖目录`,
            python: `# Python 项目典型结构
project/
├── main.py            # 入口文件
├── requirements.txt   # 依赖管理
├── app/
│   ├── __init__.py    # 包标识文件
│   ├── controllers/
│   ├── models/
│   └── views/
└── venv/              # 虚拟环境目录`,
            note: 'Python 使用 __init__.py 标识包目录，类似 PHP 的命名空间声明。',
          },
        ],
      },
      {
        title: '安装 Python 与开发环境',
        duration: '45 分钟',
        description: '安装 Python 解释器、配置 VS Code、创建虚拟环境。',
        keyPoints: [
          'Python 3.12+ 推荐（最新稳定版）',
          'VS Code + Python 扩展是最佳 IDE 选择',
          '虚拟环境 venv 隔离项目依赖',
          'pip install 类似 composer require',
        ],
        codeExamples: [
          {
            title: '环境管理对比',
            php: `# PHP: Composer 依赖管理
composer init                    # 初始化
composer require laravel/framework  # 安装包
composer install                 # 安装所有依赖
composer update                  # 更新依赖`,
            python: `# Python: pip + venv 依赖管理
python -m venv venv             # 创建虚拟环境
source venv/bin/activate        # 激活 (Mac/Linux)
venv\\Scripts\\activate          # 激活 (Windows)

pip install flask               # 安装包
pip freeze > requirements.txt   # 导出依赖
pip install -r requirements.txt # 安装所有依赖`,
            note: 'Python 的虚拟环境类似 Composer 的项目级依赖隔离，但更彻底——连 Python 解释器本身也是隔离的。',
          },
        ],
      },
      {
        title: 'Python 运行方式与 REPL 交互',
        duration: '30 分钟',
        description: '学习 Python 的多种运行方式，包括 REPL 交互模式、脚本执行、`__name__ == "__main__"` 模式，以及 Python 独有的 shebang 机制。',
        keyPoints: [
          'python 命令进入 REPL 交互模式，类似 var_dump 即时调试',
          '`__name__ == "__main__"` 防止模块被 import 时自动执行',
          'shebang `#!/usr/bin/env python3` 让脚本可直接执行',
          '`python -m` 可以直接运行模块，如 `python -m http.server`',
          'pip list / pip show / pip outdated 常用管理命令',
        ],
        codeExamples: [
          {
            title: 'Python 运行方式对比',
            php: `<?php
// PHP: 只有一种运行方式 — 通过 Web 服务器或 CLI
// CLI 运行: php script.php
// Web 运行: 通过 Apache/Nginx + mod_php/FPM

echo "Hello from PHP CLI\\n";
var_dump(get_defined_vars());`,
            python: `# Python: 多种运行方式

# 1. 交互模式 (REPL) — 即时实验
$ python
>>> 2 + 3
5
>>> name = "张三"
>>> print(f"Hello, {name}")
Hello, 张三
>>> exit()

# 2. 脚本运行
$ python script.py

# 3. 模块运行 (-m 参数)
$ python -m http.server 8080  # 启动简易HTTP服务器
$ python -m pytest           # 运行测试
$ python -m json.tool data.json  # 格式化JSON`,
            note: 'Python REPL 是最强大的即时调试工具，比 PHP 的 var_dump 更灵活。`python -m` 可以直接运行内置模块，非常实用。',
          },
          {
            title: '__name__ == "__main__" 与模块化',
            php: `<?php
// PHP: 没有等价机制，文件被 include 总是执行
echo "这段代码在 include 时也会执行!\\n";

// PHP 的变通方案:
if (!defined('RUNNING_MAIN')) {
    define('RUNNING_MAIN', true);
    // 只有主入口才执行的代码
}`,
            python: `# mymodule.py
def greet(name: str) -> str:
    return f"Hello, {name}!"

def main():
    print(greet("World"))
    print("这是主程序")

# 只有直接运行时才执行，被 import 时不会执行
if __name__ == "__main__":
    main()

# 其他文件 import 时:
# from mymodule import greet  # 不会执行 main()

# shebang: 让脚本可直接 ./script.py 执行
#!/usr/bin/env python3
import sys
print(f"Python 版本: {sys.version}")`,
            note: '`__name__ == "__main__"` 是 Python 的标准入口守卫，类似 C/Java 的 main 函数。这是 PHP 完全没有的概念，PHP 的每个文件被 include 时都会从头执行。',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: '基础语法对比',
    subtitle: '掌握 Python 的变量、类型和运算符',
    duration: '第 2-3 天',
    difficulty: '基础',
    icon: '📝',
    color: 'from-amber-500 to-orange-600',
    description: '深入对比 PHP 和 Python 的基础语法。PHP 开发者会发现 Python 的语法更加简洁，变量不需要 $ 前缀，类型系统更加灵活。',
    phpConcept: 'PHP 变量、类型、运算符',
    pythonConcept: 'Python 动态类型、运算符、None',
    lessons: [
      {
        title: '变量与命名规则',
        duration: '30 分钟',
        description: '对比 PHP 和 Python 的变量声明、命名规则和作用域。',
        keyPoints: [
          'Python 不需要 $ 前缀',
          'Python 用 snake_case，PHP 常用 camelCase',
          'Python 没有 $this，用 self',
          '常量命名: PYTHON 用 UPPER_CASE',
          'Python 变量实际上是对象引用',
        ],
        codeExamples: [
          {
            title: '变量声明对比',
            php: `<?php
// PHP: 变量需要 $ 前缀
$name = "张三";
$age = 25;
$is_active = true;
$salary = 15000.50;

// PHP 常量
define("MAX_SIZE", 100);
const APP_NAME = "MyApp";

// 类型声明 (PHP 7+)
function greet(string $name): string {
    return "Hello, " . $name;
}`,
            python: `# Python: 变量无需前缀
name = "张三"
age = 25
is_active = True  # 注意大写 T
salary = 15000.50

# Python 常量 (约定用大写)
MAX_SIZE = 100
APP_NAME = "MyApp"

# 类型提示 (Python 3.5+)
def greet(name: str) -> str:
    return f"Hello, {name}"`,
            note: 'Python 的 True/False/None 对应 PHP 的 true/false/null，但 Python 首字母大写。',
          },
        ],
      },
      {
        title: '数据类型对比',
        duration: '45 分钟',
        description: '对比 PHP 和 Python 的数据类型系统，理解两者的异同。',
        keyPoints: [
          'PHP: int, float, string, bool, array, null, object',
          'Python: int, float, str, bool, list, dict, tuple, set, None',
          'Python 有 tuple(元组) 和 set(集合) 类型',
          'Python 的 int 没有大小限制（大整数）',
          'Python 的除法 / 总返回浮点数',
        ],
        codeExamples: [
          {
            title: '类型系统对比',
            php: `<?php
// PHP 类型
$int = 42;
$float = 3.14;
$string = "hello";
$bool = true;
$array = [1, 2, 3];
$assoc = ["key" => "value"];
$null = null;

// 类型检测
gettype($int);        // "integer"
is_string($string);   // true
is_array($array);     // true

// PHP 除法
echo 10 / 3;   // 3.3333...
echo intdiv(10, 3);  // 3 (整数除法)`,
            python: `# Python 类型
integer = 42
float_num = 3.14
string = "hello"
boolean = True  # 注意大写
list_val = [1, 2, 3]
dictionary = {"key": "value"}
none_val = None  # 注意大写

# 类型检测
type(integer)          # <class 'int'>
isinstance(string, str)  # True
isinstance(list_val, list)  # True

# Python 除法
print(10 / 3)    # 3.3333...
print(10 // 3)   # 3 (地板除法)
print(10 % 3)    # 1 (取余)`,
            note: 'Python 用 isinstance() 代替 PHP 的 is_*() 系列函数，更加统一和灵活。',
          },
          {
            title: '字符串操作对比',
            php: `<?php
$name = "World";

// 字符串拼接
echo "Hello, " . $name . "!";

// 双引号插值
echo "Hello, $name!";

// 常用函数
strlen($name);           // 5
strtoupper($name);       // WORLD
strtolower($name);       // world
str_replace("o", "0", $name); // W0rld
substr($name, 0, 3);     // Wor
explode(",", "a,b,c");   // ["a", "b", "c"]
implode("-", ["a","b"]); // "a-b"
strpos($name, "rl");     // 3`,
            python: `name = "World"

# f-string 格式化 (推荐)
print(f"Hello, {name}!")

# 常用方法 (字符串是对象)
len(name)              # 5
name.upper()           # WORLD
name.lower()           # world
name.replace("o", "0") # W0rld
name[0:3]              # Wor (切片)
"a,b,c".split(",")     # ["a", "b", "c"]
"-".join(["a", "b"])   # a-b
name.find("rl")        # 3`,
            note: 'Python 的字符串方法更加面向对象，不需要记一堆独立的函数。切片语法 name[0:3] 替代了 PHP 的 substr()。',
          },
        ],
      },
      {
        title: 'f-string 格式化完全指南',
        duration: '30 分钟',
        description: 'Python 的 f-string 是字符串格式化的超能力。对比 PHP 的 sprintf、拼接和 heredoc，掌握 f-string 的高级用法，写出更优雅的代码。',
        keyPoints: [
          'f-string 是 Python 3.6+ 推荐的字符串格式化方式',
          '支持在 {} 中直接写任意 Python 表达式',
          '格式说明符: {value:.2f}、{value:>10}、{value:,.0f}',
          '调试语法 f"{var=}" 自动打印变量名和值',
          '多行 f-string 比 PHP heredoc 更灵活',
        ],
        codeExamples: [
          {
            title: '字符串格式化对比',
            php: `<?php
// PHP: 多种字符串格式化方式

// 1. 双引号插值 (最常用)
$name = "张三";
$age = 25;
echo "姓名: $name, 年龄: $age";
echo "姓名: {$name}, 年龄: {$age}";  // 复杂表达式用 {}

// 2. sprintf 格式化 (类似 C 的 printf)
$price = 99.5;
echo sprintf("价格: %.2f 元", $price);   // 价格: 99.50 元
echo sprintf("%05d", 42);                 // 00042

// 3. 字符串拼接
echo "Hello, " . $name . "! 你今年 " . $age . " 岁。";

// 4. Heredoc (多行字符串)
$html = <<<HTML
<div class="card">
    <h2>{$name}</h2>
    <p>年龄: {$age}</p>
</div>
HTML;

// 5. PHP 8: 命名参数
echo sprintf("%(name)s 今年 %(age)d 岁", [
    'name' => $name, 'age' => $age,
]);`,
            python: `# Python: f-string 格式化 (推荐!)

name = "张三"
age = 25

# 1. 基本插值
print(f"姓名: {name}, 年龄: {age}")

# 2. 支持任意表达式!
print(f"明年 {age + 1} 岁")           # 表达式
print(f"{'hello'.upper()}")           # 方法调用
print(f"{'Active' if age > 18 else 'Minor'}")  # 三元表达式

# 3. 格式说明符 (类似 sprintf)
price = 99.5
print(f"价格: {price:.2f} 元")        # 价格: 99.50 元
print(f"{42:05d}")                     # 00042
print(f"{1000000:,.0f}")               # 1,000,000 (千位分隔)

# 4. 对齐与填充
print(f"{'left':<20}")                # 左对齐
print(f"{'right':>20}")               # 右对齐
print(f"{'center':^20}")              # 居中
print(f"{'hello':*^20}")              # 用 * 填充: *******hello********

# 5. 字典和属性访问
user = {"name": "张三", "age": 25}
print(f"姓名: {user['name']}")         # 字典访问

# 6. 调试语法 (Python 3.8+)
print(f"{name=}")     # name='张三'
print(f"{age + 5=}")  # age + 5=30

# 7. 多行 f-string
html = f\"\"\"
<div class="card">
    <h2>{name}</h2>
    <p>年龄: {age}</p>
</div>
\"\"\"`,
            note: 'f-string 是 Python 字符串格式的终极方案，比 % 格式化和 .format() 都更简洁。{} 内支持任意表达式、方法调用、格式说明符。调试语法 {var=} 是 Python 3.8+ 的新特性，调试时非常方便。',
          },
          {
            title: '正则表达式 re 模块',
            duration: '35 分钟',
            description: 'PHP 开发者经常使用 preg_match/preg_replace 处理字符串。Python 的 re 模块功能等价但语法不同，配合 raw string 使用更加优雅。',
            keyPoints: [
              're.match() 从开头匹配，re.search() 搜索任意位置，re.findall() 返回所有匹配',
              'Python 推荐 re.compile() 预编译正则，提升性能',
              'raw string r"" 避免转义地狱，正则必备',
              're.sub() 替代 PHP preg_replace，re.split() 替代 preg_split',
              '命名捕获组 (?P<name>...) 比 PHP 的 (?P<name>) 更常用',
            ],
            codeExamples: [
              {
                title: '正则匹配对比',
                php: `<?php
// PHP: preg_match / preg_match_all
$url = "https://www.example.com/path?id=123";

// preg_match — 匹配一次
if (preg_match('/^https?:\\/\\/(.+?)\\/(.+)$/', $url, $matches)) {
    $domain = $matches[1];
    $path = $matches[2];
}

// preg_match_all — 匹配所有
$html = "价格: ¥99 和 ¥199";
preg_match_all('/¥(\\d+)/', $html, $prices);
// $prices[1] = ['99', '199']

// preg_replace — 替换
$clean = preg_replace('/[^a-zA-Z0-9]/', '_', $input);`,
                python: `import re

url = "https://www.example.com/path?id=123"

# re.search — 搜索任意位置 (类似 preg_match with no ^)
match = re.search(r'^https?://(.+?)/(.+)$', url)
if match:
    domain = match.group(1)
    path = match.group(2)

# re.findall — 匹配所有 (返回列表)
html = "价格: ¥99 和 ¥199"
prices = re.findall(r'¥(\\d+)', html)
# ['99', '199']

# re.sub — 替换
clean = re.sub(r'[^a-zA-Z0-9]', '_', input_str)

# re.compile — 预编译 (推荐!)
url_pattern = re.compile(r'^https?://(?P<domain>.+?)/(?P<path>.+)$')
match = url_pattern.match(url)
if match:
    print(match.group('domain'))  # 命名捕获组`,
                note: 'Python 的 raw string `r""` 让正则表达式不需要双重转义。r\'\\d+\' 比 \'/\\\\d+/\' 更清晰。re.compile() 预编译正则对象，重复使用时性能更好。',
              },
              {
                title: '正则高级用法对比',
                php: `<?php
// PHP: 分割、命名组、验证
// preg_split
$parts = preg_split('/[;,]\\s*/', "a, b; c, d");

// 命名捕获组
$pattern = '/(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})/';
preg_match($pattern, "2024-01-15", $m);
// $m['year'] = '2024'

// 贪婪 vs 非贪婪
$html = '<b>bold</b> and <b>also bold</b>';
preg_match_all('/<b>(.*?)<\\/b>/', $html, $matches);`,
                python: `import re

# re.split — 分割
parts = re.split(r'[,;]\\s*', "a, b; c, d")
# ['a', 'b', 'c', 'd']

# 命名捕获组
pattern = re.compile(r'(?P<year>\\d{4})-(?P<month>\\d{2})-(?P<day>\\d{2})')
m = pattern.match("2024-01-15")
print(m.group('year'))   # '2024'
print(m.groupdict())    # {'year': '2024', 'month': '01', 'day': '15'}

# 贪婪 vs 非贪婪
html = '<b>bold</b> and <b>also bold</b>'
re.findall(r'<b>(.*?)</b>', html)  # 非贪婪: ['bold', 'also bold']
re.findall(r'<b>(.*)</b>', html)   # 贪婪: ['bold</b> and <b>also bold']

# re.IGNORECASE 等标志
re.findall(r'hello', 'Hello HELLO', re.IGNORECASE)  # ['Hello', 'HELLO']`,
                note: 'Python 的 `groupdict()` 返回字典，比 PHP 的 $matches 关联数组更直观。re.IGNORECASE 等标志作为函数参数传入，比 PHP 的 /i 修饰符更清晰。',
              },
            ],
          },
          {
            title: 'f-string 高级: 日期与自定义格式',
            php: `<?php
// PHP: 日期格式化
$date = new DateTime('2024-01-15 14:30:00');

// format() 方法
echo $date->format('Y-m-d H:i:s');       // 2024-01-15 14:30:00
echo $date->format('F j, Y');            // January 15, 2024
echo $date->format('今天是一年中的第 z 天');

// 相对时间计算
$future = $date->modify('+30 days');
echo $future->format('Y-m-d');

// 数字格式化
$percent = 0.8567;
echo sprintf("%.1f%%", $percent * 100);  // 85.7%
echo number_format(1234567.89, 2, '.', ',');  // 1,234,567.89`,
            python: `from datetime import datetime

# Python: f-string + 日期格式化
now = datetime(2024, 1, 15, 14, 30, 0)

# f-string 直接格式化日期!
print(f"{now:%Y-%m-%d %H:%M:%S}")       # 2024-01-15 14:30:00
print(f"{now:%B %d, %Y}")               # January 15, 2024
print(f"{now:%Y年%m月%d日}")             # 2024年01月15日

# 日期计算
from datetime import timedelta
future = now + timedelta(days=30)
print(f"{future:%Y-%m-%d}")  # 2024-02-14

# 数字格式化
percent = 0.8567
print(f"{percent:.1%}")                  # 85.7%
print(f"{1234567.89:,.2f}")             # 1,234,567.89

# 宽度 + 格式说明符组合
items = [("苹果", 5, 3.5), ("香蕉", 12, 2.0)]
print("商品      数量    价格")
print("-" * 25)
for name, qty, price in items:
    print(f"{name:<8}{qty:>6}{price:>10.2f}")
# 商品      数量    价格
# -------------------------
# 苹果          5      3.50
# 香蕉         12      2.00`,
            note: 'f-string 的日期格式化用 :%Y-%m-%d 语法，直接替代 PHP 的 format() 方法。对齐 + 格式组合 ({name:<8}{qty:>6}) 是生成表格式输出的利器。',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: '控制流与数据结构',
    subtitle: '条件语句、循环和核心数据结构',
    duration: '第 4-5 天',
    difficulty: '基础',
    icon: '🔄',
    color: 'from-sky-500 to-cyan-600',
    description: '学习 Python 的控制流语句和核心数据结构。Python 的缩进语法、列表推导式、以及丰富的内置数据结构，将让你的代码更加简洁高效。',
    phpConcept: 'if/else, foreach, for, array',
    pythonConcept: 'if/elif/else, for/while, list/dict/set/tuple',
    lessons: [
      {
        title: '条件语句对比',
        duration: '30 分钟',
        description: '对比 PHP 和 Python 的条件语句语法差异。',
        keyPoints: [
          'Python 用 elif 代替 else if',
          'Python 用缩进代替花括号',
          'Python 支持链式比较: 1 < x < 10',
          'Python 的 and/or/not 代替 &&/||/!',
        ],
        codeExamples: [
          {
            title: '条件语句对比',
            php: `<?php
$score = 85;

if ($score >= 90) {
    $grade = "A";
} elseif ($score >= 80) {
    $grade = "B";
} elseif ($score >= 70) {
    $grade = "C";
} else {
    $grade = "D";
}

// 三元运算符
$status = ($score >= 60) ? "pass" : "fail";

// Null 合并运算符
$name = $_GET["name"] ?? "Anonymous";

// PHP 8 match (类似 switch)
$result = match($grade) {
    "A" => "优秀",
    "B" => "良好",
    default => "继续努力",
};`,
            python: `score = 85

if score >= 90:
    grade = "A"
elif score >= 80:        # 注意: elif 不是 else if
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "D"

# 三元表达式
status = "pass" if score >= 60 else "fail"

# 或运算符 (类似 null 合并)
name = request.get("name") or "Anonymous"

# match 语句 (Python 3.10+)
match grade:
    case "A":
        result = "优秀"
    case "B":
        result = "良好"
    case _:
        result = "继续努力"`,
            note: 'Python 3.10+ 引入了 match/case 语句，功能类似 PHP 8 的 match 表达式。',
          },
        ],
      },
      {
        title: '循环语句对比',
        duration: '30 分钟',
        description: '对比 PHP 和 Python 的 for 和 while 循环。',
        keyPoints: [
          'Python 的 for 类似 PHP 的 foreach',
          'Python 用 range() 生成数字序列',
          'Python 用 enumerate() 同时获取索引和值',
          'break/continue 语法一致',
          'Python 有 while...else 和 for...else 语法',
        ],
        codeExamples: [
          {
            title: '循环对比',
            php: `<?php
// PHP: 遍历数组
$fruits = ["苹果", "香蕉", "橙子"];
foreach ($fruits as $fruit) {
    echo $fruit . "\\n";
}

// 带索引
foreach ($fruits as $index => $fruit) {
    echo "$index: $fruit\\n";
}

// 传统 for 循环
for ($i = 0; $i < 10; $i++) {
    echo $i;
}

// while 循环
$i = 0;
while ($i < 5) {
    echo $i++;
}`,
            python: `fruits = ["苹果", "香蕉", "橙子"]

# Python: 遍历列表
for fruit in fruits:
    print(fruit)

# 带索引 (使用 enumerate)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# range() 生成序列
for i in range(10):     # 0 到 9
    print(i)

for i in range(2, 10):  # 2 到 9
    print(i)

# while 循环
i = 0
while i < 5:
    print(i)
    i += 1`,
            note: 'Python 的 enumerate() 是 PHP foreach($arr as $k => $v) 的优雅替代方案。',
          },
        ],
      },
      {
        title: '列表与字典',
        duration: '45 分钟',
        description: '深入学习 Python 的列表和字典，以及 Python 独有的列表推导式。',
        keyPoints: [
          'Python list ≈ PHP array (索引数组)',
          'Python dict ≈ PHP array (关联数组)',
          'Python tuple 是不可变列表',
          'Python set 是无序不重复集合',
          '列表推导式是 Python 的杀手特性',
        ],
        codeExamples: [
          {
            title: '数组/列表操作对比',
            php: `<?php
// PHP 数组操作
$nums = [1, 2, 3, 4, 5];
array_push($nums, 6);       // 追加
array_pop($nums);           // 弹出
array_unshift($nums, 0);    // 前插
array_shift($nums);         // 前弹
sort($nums);                // 排序
rsort($nums);               // 逆序
array_reverse($nums);       // 反转
array_slice($nums, 1, 3);   // 切片 [1,3)
count($nums);               // 长度
in_array(3, $nums);         // 包含检测
array_map(fn($n) => $n * 2, $nums);  // 映射
array_filter($nums, fn($n) => $n > 3); // 过滤`,
            python: `# Python 列表操作
nums = [1, 2, 3, 4, 5]
nums.append(6)           # 追加
nums.pop()               # 弹出
nums.insert(0, 0)        # 前插
nums.pop(0)              # 前弹
nums.sort()              # 排序
nums.sort(reverse=True)  # 逆序
nums.reverse()           # 反转
nums[1:4]                # 切片 [1,4)
len(nums)                # 长度
3 in nums                # 包含检测
[n * 2 for n in nums]   # 列表推导式 (映射)
[n for n in nums if n > 3] # 列表推导式 (过滤)`,
            note: 'Python 的列表推导式 [expr for x in iter if cond] 是 PHP array_map + array_filter 的合体，更加简洁。',
          },
          {
            title: '关联数组/字典对比',
            php: `<?php
// PHP 关联数组
$user = [
    "name" => "张三",
    "age" => 25,
    "email" => "zhangsan@example.com",
];

// 访问
echo $user["name"];

// 修改
$user["age"] = 26;
$user["city"] = "北京";  // 新增

// 常用操作
array_key_exists("name", $user);  // true
array_keys($user);     // ["name", "age", "email"]
array_values($user);   // ["张三", 25, "..."]
isset($user["phone"]); // false
unset($user["email"]); // 删除`,
            python: `# Python 字典
user = {
    "name": "张三",
    "age": 25,
    "email": "zhangsan@example.com",
}

# 访问
print(user["name"])
print(user.get("name"))     # 更安全

# 修改
user["age"] = 26
user["city"] = "北京"       # 新增

# 常用操作
"name" in user              # True
user.keys()                 # dict_keys
user.values()               # dict_values
user.items()                # dict_items (键值对)
user.get("phone", "N/A")    # 带默认值
del user["email"]           # 删除
user.pop("email")           # 删除并返回`,
            note: 'Python 的 dict.get(key, default) 是 PHP $arr[$key] ?? $default 的替代，但更安全。',
          },
          {
            title: '列表推导式 - Python 杀手特性',
            php: `<?php
// PHP: 需要多步操作
$numbers = range(1, 11);
$squares = array_map(fn($n) => $n ** 2, $numbers);
$even_squares = array_filter(
    $squares,
    fn($n) => $n % 2 === 0
);
$even_squares = array_values($even_squares); // 重建索引

// 扁平化二维数组
$matrix = [[1,2], [3,4], [5,6]];
$flat = array_merge(...$matrix);`,
            python: `# Python: 一行搞定！
# 基本推导式
squares = [n ** 2 for n in range(1, 11)]

# 带条件的推导式
even_squares = [n ** 2 for n in range(1, 11) if n ** 2 % 2 == 0]

# 字典推导式
word_lengths = {word: len(word) for word in ["hello", "world", "python"]}

# 集合推导式
unique_lengths = {len(word) for word in ["aa", "bbb", "cc"]}

# 生成器表达式 (惰性计算)
total = sum(n ** 2 for n in range(1, 1001))  # 内存高效`,
            note: '列表推导式是 Python 最具特色的语法之一，用简洁的语法替代了 PHP 中的 array_map/array_filter/ array_reduce。',
          },
        ],
      },
      {
        title: '内置函数: zip/map/filter',
        duration: '30 分钟',
        description: 'Python 的内置函数让数据处理更加优雅简洁。对比 PHP 的 array_map/array_filter/array_combine，掌握 Python 独有的 zip 和解包操作符。',
        keyPoints: [
          'zip() 同时遍历多个可迭代对象，类似 PHP array_combine',
          'map() 返回迭代器，通常配合 list() 使用',
          'filter() 返回迭代器，优先用列表推导式替代',
          '* 解包操作符展开列表/字典，非常实用',
          'sorted() 比 PHP sort() 更灵活，支持 key/reverse',
        ],
        codeExamples: [
          {
            title: 'zip/map/filter 对比',
            php: `<?php
// PHP: array_combine - 合并两个数组为关联数组
$keys = ["name", "age", "email"];
$values = ["张三", 25, "z@test.com"];
$combined = array_combine($keys, $values);
// ["name" => "张三", "age" => 25, "email" => "z@test.com"]

// PHP: 同时遍历多个数组 (需要索引)
$names = ["张三", "李四", "王五"];
$scores = [90, 85, 92];
foreach ($names as $i => $name) {
    echo "$name: {$scores[$i]}\\n";
}

// PHP: array_map (返回数组)
$doubled = array_map(fn($n) => $n * 2, [1, 2, 3, 4, 5]);

// PHP: array_filter (保留键)
$evens = array_filter([1,2,3,4,5,6], fn($n) => $n % 2 === 0);
$evens = array_values($evens);  // 重建索引

// PHP: 解包参数
$nums = [1, 2, 3];
$result = max(...$nums);  // 3

// PHP: 合并数组
$all = [...$arr1, ...$arr2];`,
            python: `# Python: zip() 同时遍历多个列表
names = ["张三", "李四", "王五"]
scores = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# zip 创建字典 (代替 array_combine)
keys = ["name", "age", "email"]
values = ["张三", 25, "z@test.com"]
combined = dict(zip(keys, values))
# {'name': '张三', 'age': 25, 'email': 'z@test.com'}

# zip 限制长度 (类似 array_slice)
for name, score in zip(names, scores):  # 自动以最短的为准
    print(f"{name}: {score}")

# * 解包操作符 (展开列表)
nums = [1, 2, 3]
print(max(*nums))         # 3
print(max(nums))          # 3 (列表直接传也行)

# 合并字典 (** 解包)
config1 = {"debug": True}
config2 = {"port": 8080}
merged = {**config1, **config2}
# {'debug': True, 'port': 8080}

# 合并列表 (* 解包)
list1 = [1, 2, 3]
list2 = [4, 5, 6]
merged = [*list1, *list2]  # [1, 2, 3, 4, 5, 6]`,
            note: 'Python 的 zip() 是最优雅的内置函数之一，可以同时遍历多个列表。配合 dict() 可以一行实现 PHP 的 array_combine。* 和 ** 解包操作符让函数调用和数据合并更加灵活。',
          },
          {
            title: 'sorted/map/filter 实战',
            php: `<?php
// PHP: 多种排序方式
$users = [
    ["name" => "张三", "age" => 25],
    ["name" => "李四", "age" => 20],
    ["name" => "王五", "age" => 30],
];

// 按字段排序 (需要 usort + 回调)
usort($users, fn($a, $b) => $a["age"] <=> $b["age"]);

// 多字段排序
usort($users, fn($a, $b) => $a["age"] <=> $b["age"]
    ?: strcmp($a["name"], $b["name"]));

// 按长度排序字符串数组
$words = ["banana", "apple", "cherry"];
usort($words, fn($a, $b) => strlen($a) <=> strlen($b));

// 链式数组操作
$result = array_values(array_filter(
    array_map(fn($n) => $n * 2, [1,2,3,4,5,6,7,8,9,10]),
    fn($n) => $n > 10
));  // [12, 14, 16, 18, 20]`,
            python: `# Python: sorted() 更灵活
users = [
    {"name": "张三", "age": 25},
    {"name": "李四", "age": 20},
    {"name": "王五", "age": 30},
]

# 按字段排序 (key 参数 + lambda)
sorted_users = sorted(users, key=lambda u: u["age"])

# 多字段排序 (key 返回元组)
sorted_users = sorted(users, key=lambda u: (u["age"], u["name"]))

# 按字符串长度排序
words = ["banana", "apple", "cherry"]
by_length = sorted(words, key=len)  # key=len 比 key=lambda w: len(w) 更简洁!

# 降序排序
by_length_desc = sorted(words, key=len, reverse=True)

# 注意: sorted() 返回新列表，.sort() 原地排序
numbers = [3, 1, 4, 1, 5]
numbers.sort()       # 原地排序
sorted_nums = sorted(numbers)  # 返回新列表

# 链式操作 (列表推导式更简洁!)
result = [n * 2 for n in range(1, 11) if n * 2 > 10]
# [12, 14, 16, 18, 20]

# sorted 逆序获取前 N 名
top3 = sorted(users, key=lambda u: u["age"], reverse=True)[:3]`,
            note: 'Python 的 sorted() 比 PHP 的 usort() 更优雅: key 参数指定排序依据，reverse 控制升降序。key=len 这种直接传函数引用的写法比 key=lambda w: len(w) 更 Pythonic。',
          },
        ],
      },
      {
        title: '元组与集合: PHP 没有的两大数据结构',
        duration: '40 分钟',
        description: '深入学习 Python 的 tuple(元组) 和 set(集合)，这两种数据结构在 PHP 中没有对应物。元组是不可变序列，用于保护数据不被修改；集合是无序不重复元素集，用于去重和集合运算。',
        keyPoints: [
          'tuple 是不可变序列，创建后不能修改元素',
          'tuple 可以作为字典的 key，list 不行',
          '单元素元组必须加逗号: (1,)，否则只是括号',
          'set 自动去重，支持交集(&)、并集(|)、差集(-)、对称差集(^)',
          'frozenset 是不可变集合，可以作为字典 key',
        ],
        codeExamples: [
          {
            title: '元组操作对比',
            php: `<?php
// PHP 没有元组类型，通常用数组模拟
$point = [3, 4];              // 模拟元组
[$x, $y] = $point;             // 解构赋值

// 交换变量 (PHP 7.1+)
$a = 1; $b = 2;
[$a, $b] = [$b, $a];          // 交换

// PHP 数组可以作为 key 吗？不行，数组不能作为数组 key
// $dict = [[1,2] => "value"];  // Fatal error!

// PHP 用 SplFixedArray 或 class 模拟不可变数据
class Point {
    public function __construct(
        public readonly int $x,
        public readonly int $y,
    ) {}
}
$p = new Point(3, 4);         // 只读属性，不可修改

// 获取数组长度
count($point);                  // 2`,
            python: `# Python: tuple(元组) 是不可变序列
point = (3, 4)                  # 创建元组
point = 3, 4                    # 省略括号也行
x, y = point                    # 解构赋值

# 交换变量 (Pythonic!)
a, b = 1, 2
a, b = b, a                    # 一行交换，利用元组打包解包

# tuple 作为字典的 key (list 不行!)
location = {(35.6, 139.7): "东京", (39.9, 116.4): "北京"}
print(location[(35.6, 139.7)])  # 东京

# 单元素元组陷阱: 必须加逗号!
single = (1,)                   # 这是元组 (1,)
not_tuple = (1)                 # 这只是整数 1

# namedtuple: 带字段名的元组
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
print(p.x, p.y)                # 3 4
print(p[0], p[1])              # 3 4 (支持下标)

# 元组是不可变的
point[0] = 5                   # TypeError!

# 索引和切片
point = (1, 2, 3, 4, 5)
point[0]                       # 1
point[-1]                      # 5
point[1:3]                     # (2, 3)
len(point)                     # 5`,
            note: 'PHP 没有元组类型，PHP 8.1+ 的 readonly class 可以模拟不可变数据，但远不如 Python 的 tuple 简洁。Python 的 tuple 是真正的不可变序列，可以作为字典 key 使用，这是 list 做不到的。',
          },
          {
            title: '集合操作对比',
            php: `<?php
// PHP: 用数组模拟集合操作 (比较笨拙)

// 去重
$arr = [1, 2, 2, 3, 3, 3, 4];
$unique = array_unique($arr);       // [1, 2, 3, 4]
$unique = array_values($unique);    // 重建索引

// 交集
$a = [1, 2, 3, 4];
$b = [3, 4, 5, 6];
$intersect = array_intersect($a, $b); // [3, 4]

// 并集
$union = array_unique(array_merge($a, $b)); // [1, 2, 3, 4, 5, 6]

// 差集 (a 有 b 没有)
$diff = array_diff($a, $b);        // [1, 2]

// 对称差集 (只在一个集合中出现的元素)
$sym_diff = array_diff(
    array_unique(array_merge($a, $b)),
    array_intersect($a, $b)
);  // [1, 2, 5, 6] — 非常繁琐!

// 判断子集: 没有内置函数，需要手动判断
function isSubset(array $a, array $b): bool {
    return count(array_diff($a, $b)) === 0;
}

// 判断元素是否存在
in_array(3, $a);                    // true`,
            python: `# Python: set(集合) 天生为集合运算而生

# 创建集合 (自动去重)
nums = {1, 2, 2, 3, 3, 3, 4}       # {1, 2, 3, 4}
nums = set([1, 2, 2, 3, 3, 3, 4])  # 从列表创建

a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# 交集 &
print(a & b)                        # {3, 4}

# 并集 |
print(a | b)                        # {1, 2, 3, 4, 5, 6}

# 差集 (a 有 b 没有)
print(a - b)                        # {1, 2}

# 对称差集 (^) — 只在一个集合中出现的元素
print(a ^ b)                        # {1, 2, 5, 6}

# 子集/超集判断
print(a <= {1, 2, 3, 4, 5})        # True (子集)
print(a >= {3, 4})                  # True (超集)

# 判断元素是否存在
3 in a                               # True

# 集合推导式
squares = {x ** 2 for x in range(5)} # {0, 1, 4, 9, 16}

# frozenset: 不可变集合，可作为字典 key
fs = frozenset([1, 2, 3])
data = {frozenset([1,2]): "group_a", frozenset([3,4]): "group_b"}
print(data[fs])                      # group_a

# 集合常用方法
a.add(5)            # 添加元素
a.discard(2)        # 移除元素 (不存在不报错)
a.remove(3)         # 移除元素 (不存在报 KeyError)`,
            note: 'Python 的 set 用简洁的运算符 (& | - ^) 完成了 PHP 需要多个函数才能实现的集合运算。对称差集在 PHP 中需要组合 array_unique + array_merge + array_diff，在 Python 中只需一个 ^ 操作符。',
          },
        ],
      },
      {
        title: 'collections 高级容器',
        duration: '35 分钟',
        description: 'Python 的 collections 模块提供了多种高级数据结构，弥补了内置类型的不足。掌握 Counter(计数器)、defaultdict(默认字典)、deque(双端队列)、namedtuple(命名元组) 四大容器，写出更 Pythonic 的代码。',
        keyPoints: [
          'Counter: 自动计数，most_common() 获取 Top N',
          'defaultdict: 访问不存在的 key 自动创建默认值',
          'deque: 双端队列，appendleft/popleft 是 O(1)',
          'namedtuple: 带字段名的元组，比普通元组更可读',
          'ChainMap: 合并多个字典，类似 PHP 的多层配置覆盖',
        ],
        codeExamples: [
          {
            title: 'Counter 与 defaultdict',
            php: `<?php
// PHP: 手动计数 (没有 Counter)
$text = "hello world hello python";
$words = explode(" ", $text);

// 手动统计词频
$counts = [];
foreach ($words as $word) {
    $counts[$word] = ($counts[$word] ?? 0) + 1;
}
// ['hello' => 2, 'world' => 1, 'python' => 1]

// 获取 Top N (需要排序)
arsort($counts);
$top2 = array_slice($counts, 0, 2, true);

// PHP: 手动分组 (没有 defaultdict)
$students = [
    ["name" => "张三", "grade" => "A"],
    ["name" => "李四", "grade" => "B"],
    ["name" => "王五", "grade" => "A"],
];

// 手动按成绩分组
$groups = [];
foreach ($students as $s) {
    $grade = $s["grade"];
    if (!isset($groups[$grade])) {
        $groups[$grade] = [];
    }
    $groups[$grade][] = $s["name"];
}
// ['A' => ['张三', '王五'], 'B' => ['李四']]`,
            python: `from collections import Counter, defaultdict

# Counter: 自动计数!
text = "hello world hello python"
words = text.split()
counts = Counter(words)
print(counts)               # Counter({'hello': 2, 'world': 1, 'python': 1})

# 获取 Top N (一行搞定!)
print(counts.most_common(2))  # [('hello', 2), ('world', 1)]

# Counter 支持数学运算
c1 = Counter("abracadabra")
c2 = Counter("alacazam")
print(c1 + c2)              # 并集: 各字符最大计数
print(c1 - c2)              # 差集: 只保留正数
print(c1 & c2)              # 交集: 各字符最小计数

# Counter 常用方法
print(counts["hello"])      # 2 (直接用 key 访问)
print(counts["xxx"])        # 0 (不存在返回 0，不会报错)
counts.update(["hello"])    # 追加计数
counts["world"] += 1        # 直接加

# defaultdict: 访问不存在的 key 自动创建默认值
students = [
    {"name": "张三", "grade": "A"},
    {"name": "李四", "grade": "B"},
    {"name": "王五", "grade": "A"},
]

# 一行搞定分组!
groups = defaultdict(list)
for s in students:
    groups[s["grade"]].append(s["name"])
# defaultdict(<class 'list'>, {'A': ['张三', '王五'], 'B': ['李四']})

# 不用再判断 key 是否存在了
print(groups["C"])           # [] (自动创建空列表)

# defaultdict(int) 用于计数
counter = defaultdict(int)
for word in words:
    counter[word] += 1`,
            note: 'PHP 没有内置的 Counter 和 defaultdict，需要手动判断 isset 和初始化。Python 的 Counter 把 3 行计数代码简化为 1 行，most_common() 一行搞定 Top N。defaultdict 彻底消除了 "key 不存在" 的 KeyError。',
          },
          {
            title: 'deque 与 namedtuple',
            php: `<?php
// PHP: array_shift/array_unshift 是 O(n) 操作
// 因为 PHP 数组底层是哈希表，删除头部元素需要重新索引
$queue = [1, 2, 3, 4, 5];

// 头部插入/删除 (性能差 O(n))
array_unshift($queue, 0);    // [0, 1, 2, 3, 4, 5]
array_shift($queue);          // [1, 2, 3, 4, 5]

// 尾部插入/删除 (性能好 O(1))
array_push($queue, 6);        // [1, 2, 3, 4, 5, 6]
array_pop($queue);            // [1, 2, 3, 4, 5]

// PHP: 用 class 模拟命名元组
class User {
    public function __construct(
        public readonly string $name,
        public readonly int $age,
        public readonly string $email,
    ) {}
    // 需要手动实现 __toString, toArray 等方法...
}

// PHP: 多层配置覆盖 (手动实现)
$default = ["debug" => false, "port" => 80, "host" => "localhost"];
$env = ["port" => 8080];
$user = ["debug" => true];
// 手动合并: 后面的覆盖前面的
$config = array_merge($default, $env, $user);`,
            python: `from collections import deque, namedtuple, ChainMap

# deque: 双端队列，头部操作是 O(1)!
queue = deque([1, 2, 3, 4, 5])

# 头部插入/删除 (性能好 O(1)!)
queue.appendleft(0)           # deque([0, 1, 2, 3, 4, 5])
queue.popleft()               # deque([1, 2, 3, 4, 5])

# 尾部操作 (同样 O(1))
queue.append(6)               # deque([1, 2, 3, 4, 5, 6])
queue.pop()                   # deque([1, 2, 3, 4, 5])

# deque 实用方法
queue.rotate(2)               # 右旋转 2 步
queue.extendleft([0, -1])     # 批量左扩展
queue maxlen = 10             # 限制最大长度 (自动丢弃另一端)

# namedtuple: 带字段名的元组，比 class 更轻量
User = namedtuple('User', ['name', 'age', 'email'])
u = User("张三", 25, "z@test.com")

# 支持属性访问和下标访问
print(u.name)                 # 张三
print(u[0])                   # 张三
print(u._asdict())            # {'name': '张三', 'age': 25, 'email': 'z@test.com'}

# namedtuple 不可变 (保护数据)
u.name = "李四"               # AttributeError!

# ChainMap: 合并多个字典 (不复制数据)
default = {"debug": False, "port": 80, "host": "localhost"}
env = {"port": 8080}
user = {"debug": True}

config = ChainMap(user, env, default)
print(config["debug"])        # True (user 覆盖 default)
print(config["host"])         # localhost (从 default 找到)
print(config.maps)            # [{'debug': True}, {'port': 8080}, {...}]`,
            note: 'PHP 的 array_shift/array_unshift 是 O(n) 操作，而 Python 的 deque 是 O(1)。在频繁操作队列头部的场景下（如 BFS、滑动窗口），性能差距巨大。ChainMap 类似 PHP 的 array_merge 覆盖逻辑，但不会复制数据，修改会反映到源字典。',
          },
        ],
      },
      {
        title: '深浅拷贝、可变性与字符串进阶',
        duration: '35 分钟',
        description: 'Python 的变量赋值是引用传递，与 PHP 有重要差异。理解深浅拷贝的区别，掌握字符串的进阶方法，避免常见的可变性陷阱。',
        keyPoints: [
          'Python 赋值 = 是引用绑定，不是复制',
          'copy.copy() 浅拷贝: 只复制第一层',
          'copy.deepcopy() 深拷贝: 递归复制所有层',
          'is 比较引用同一性，== 比较值相等',
          '字符串常用进阶方法: startswith/endswith, strip, partition, isdigit',
        ],
        codeExamples: [
          {
            title: '赋值、浅拷贝与深拷贝对比',
            php: `<?php
// PHP: 数组赋值默认是值复制 (不是引用!)
$a = [1, [2, 3]];
$b = $a;           // $b 是 $a 的副本 (复制)
$b[0] = 99;
echo $a[0];        // 1 (不受影响!)

// PHP: 要传引用需要用 &
$b = &$a;
$b[0] = 99;
echo $a[0];        // 99 (被影响了!)

// PHP: 嵌套数组也是值复制
$a = [1, [2, 3]];
$b = $a;
$b[1][0] = 99;
echo $a[1][0];     // 2 (不受影响!)

// PHP: 对象默认是引用赋值
class Foo {
    public int $x = 0;
}
$a = new Foo();
$b = $a;           // $a 和 $b 指向同一对象
$b->x = 10;
echo $a->x;        // 10 (被影响了!)

// PHP: clone 深拷贝对象
$b = clone $a;
$b->x = 20;
echo $a->x;        // 10 (不受影响!)

// PHP: === 比较值和类型
// PHP 没有 is 运算符 (没有引用同一性比较)`,
            python: `import copy

# Python: 赋值 = 是引用绑定 (不是复制!)
a = [1, [2, 3]]
b = a               # b 和 a 指向同一个列表
b[0] = 99
print(a[0])          # 99 (被影响了!)

# copy.copy() 浅拷贝: 只复制第一层
a = [1, [2, 3]]
b = copy.copy(a)     # 或 a[:]
b[0] = 99
print(a[0])          # 1 (第一层不受影响)
b[1][0] = 99
print(a[1][0])       # 99 (嵌套层被影响了!)

# copy.deepcopy() 深拷贝: 递归复制所有层
a = [1, [2, 3]]
b = copy.deepcopy(a)
b[1][0] = 99
print(a[1][0])       # 2 (完全不受影响!)

# is vs == 的区别
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)         # True (值相等)
print(a is b)         # False (不是同一对象)

c = a
print(a is c)         # True (同一对象)

# 小整数缓存 (Python 优化)
x = 256
y = 256
print(x is y)         # True (-5~256 缓存)
x = 257
y = 257
print(x is y)         # False (超出缓存范围)

# None 的判断用 is (Python 惯例)
val = None
if val is None:       # 推荐 (不用 == None)
    print("是 None")`,
            note: 'PHP 数组赋值默认是值复制，Python 赋值是引用绑定——这是最大的差异！PHP 开发者转 Python 最容易踩的坑就是忘记用 copy()。Python 的 is 运算符是 PHP 没有的，它比较两个变量是否指向同一个对象。',
          },
          {
            title: '字符串进阶方法对比',
            php: `<?php
// PHP 8: 字符串前缀/后缀判断
$url = "https://example.com/api/users";
str_starts_with($url, "https://");   // true
str_ends_with($url, "/users");       // true

// 去除空白字符
$name = "  hello world  ";
trim($name);                         // "hello world"
ltrim($name);                        // "hello world  "
rtrim($name);                        // "  hello world"

// 分割字符串 (带限制)
$csv = "a,b,c,d,e";
$parts = explode(",", $csv, 3);      // ["a", "b", "c,d,e"]

// 字符串搜索
$pos = strpos($url, "/api");         // 19
if ($pos !== false) { ... }

// 判断字符类型
ctype_digit("12345");                 // true
ctype_alpha("hello");                 // true
ctype_alnum("hello123");              // true

// PHP 没有原生的 partition/rpartition 方法
// 需要手动实现
$parts = explode(":", "key:value:extra", 2);
// ["key", "value:extra"]`,
            python: `# Python: 字符串前缀/后缀判断
url = "https://example.com/api/users"
print(url.startswith("https://"))    # True
print(url.endswith("/users"))        # True

# startswith/endswith 支持元组参数 (多条件判断)
print(url.startswith(("http://", "https://")))  # True
print(filename.endswith((".jpg", ".png", ".gif")))  # 批量判断

# 去除空白字符
name = "  hello world  "
print(name.strip())                  # "hello world"
print(name.lstrip())                 # "hello world  "
print(name.rstrip())                 # "  hello world"

# strip 还可以指定要去除的字符
print("###hello###".strip("#"))      # "hello"

# 分割字符串 (带限制)
csv = "a,b,c,d,e"
parts = csv.split(",", 2)            # ["a", "b", "c,d,e"]

# partition: 按分隔符分成 3 部分 (元组)
result = "key:value:extra".partition(":")
print(result)                        # ("key", ":", "value:extra")
key, sep, rest = result              # 解构

# rpartition: 从右边分割
result = "key:value:extra".rpartition(":")
print(result)                        # ("key:value", ":", "extra")

# 判断字符类型
print("12345".isdigit())             # True
print("hello".isalpha())             # True
print("hello123".isalnum())          # True
print("   ".isspace())               # True
print("Hello".istitle())             # True (每个单词首字母大写)
print("HELLO".isupper())             # True
print("hello".islower())             # True

# f-string 的 = 调试语法
name = "world"
print(f"{name=!r}")                  # name='world' (!r 用 repr 格式)`,
            note: 'Python 的 startswith/endswith 原生支持元组参数做多条件判断，PHP 需要多次调用或用 str_starts_with + in_array。partition 返回 3 元组，比 PHP 的 explode + limit 更精确。Python 的 isdigit/isalpha 等方法是字符串对象的方法，而 PHP 用 ctype_* 独立函数。',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: '函数与模块化编程',
    subtitle: '函数定义、装饰器和包管理',
    duration: '第 6-7 天',
    difficulty: '基础',
    icon: '⚡',
    color: 'from-violet-500 to-purple-600',
    description: '深入学习 Python 的函数特性，包括参数类型、Lambda 表达式、装饰器等高级特性。对比 PHP 的闭包和中间件概念，理解 Python 模块化编程思想。',
    phpConcept: 'function, closure, use, namespace',
    pythonConcept: 'def, lambda, decorator, import',
    lessons: [
      {
        title: '函数定义与参数',
        duration: '40 分钟',
        description: '对比 PHP 和 Python 的函数定义方式、参数传递机制。',
        keyPoints: [
          'Python 用 def 关键字定义函数',
          'Python 支持 *args 和 **kwargs',
          'Python 有默认参数、关键字参数',
          'Python 函数是第一类对象（可作为参数传递）',
          'Python 没有 PHP 的引用传递 (&$var)',
        ],
        codeExamples: [
          {
            title: '函数定义对比',
            php: `<?php
// PHP 函数
function greet(string $name, string $greeting = "Hello"): string {
    return "$greeting, $name!";
}

echo greet("World");           // Hello, World!
echo greet("World", "Hi");     // Hi, World!

// 可变参数
function sum(int ...$numbers): int {
    return array_sum($numbers);
}

// 闭包
$multiplier = function(int $n): callable {
    return function(int $x) use ($n): int {
        return $x * $n;
    };
};
$double = $multiplier(2);
echo $double(5);  // 10`,
            python: `# Python 函数
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

print(greet("World"))           # Hello, World!
print(greet("World", "Hi"))     # Hi, World!

# 可变参数
def sum_numbers(*numbers: int) -> int:
    return sum(numbers)

# 关键字参数
def create_user(name: str, **kwargs) -> dict:
    user = {"name": name}
    user.update(kwargs)
    return user

# 闭包 (不需要 use 关键字!)
def multiplier(n: int):
    def inner(x: int) -> int:
        return x * n
    return inner

double = multiplier(2)
print(double(5))  # 10`,
            note: 'Python 闭包自动捕获外部变量，不需要 PHP 的 use 关键字。**kwargs 类似 PHP 的关联数组参数。',
          },
        ],
      },
      {
        title: '装饰器 - Python 的杀手特性',
        duration: '45 分钟',
        description: '学习 Python 装饰器，这是 PHP 中间件思想的函数级实现。',
        keyPoints: [
          '装饰器本质是高阶函数（接受函数并返回函数）',
          '类似 PHP 的中间件模式',
          '可以叠加多个装饰器',
          '@语法糖使代码更优雅',
          'functools.wraps 保留原始函数信息',
        ],
        codeExamples: [
          {
            title: '装饰器 vs 中间件',
            php: `<?php
// PHP: 中间件模式 (需要完整类)
class TimerMiddleware {
    public function handle($request, Closure $next) {
        $start = microtime(true);
        $response = $next($request);
        $time = microtime(true) - $start;
        error_log("耗时: {$time}s");
        return $response;
    }
}

// PHP: 简单包装函数
function withTimer(callable $fn): callable {
    return function(...$args) use ($fn) {
        $start = microtime(true);
        $result = $fn(...$args);
        $time = microtime(true) - $start;
        echo "耗时: {$time}s\\n";
        return $result;
    };
}
$timedFunction = withTimer(function() {
    // 耗时操作
});`,
            python: `# Python: 装饰器 (简洁优雅!)
import functools
import time

def timer(func):
    """计时装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} 耗时: {elapsed:.4f}s")
        return result
    return wrapper

# 使用装饰器
@timer
def process_data():
    """处理数据"""
    time.sleep(1)
    return "done"

# 等价于: process_data = timer(process_data)
process_data()  # 自动打印耗时

# 多个装饰器叠加
@timer
@log_calls
def important_function():
    pass`,
            note: 'Python 的 @decorator 语法糖让装饰器的使用极其简洁，比 PHP 的中间件模式更轻量。在 Python 中你不需要框架支持就能使用装饰器。',
          },
        ],
      },
      {
        title: 'Lambda 与高阶函数',
        duration: '25 分钟',
        description: '对比 PHP 匿名函数/箭头函数和 Python lambda。理解 lambda 的适用场景和局限性，掌握高阶函数的实战用法。',
        keyPoints: [
          'Python lambda 只能写单行表达式，比 PHP 匿名函数更受限',
          'sorted() 的 key 参数是 lambda 最常用场景',
          'map/filter 优先用列表推导式替代 lambda',
          'Python 没有箭头函数 (=>)，lambda 是唯一的匿名函数',
          '复杂逻辑请用 def 定义普通函数，不要滥用 lambda',
        ],
        codeExamples: [
          {
            title: 'Lambda 对比',
            php: `<?php
// PHP: 匿名函数
$double = function(int $n): int {
    return $n * 2;
};
echo $double(5);  // 10

// PHP 7.4+: 箭头函数 (更简洁)
$double = fn(int $n): int => $n * 2;
echo $double(5);  // 10

// 实际用法: 自定义排序
$users = [
    ["name" => "张三", "age" => 25],
    ["name" => "李四", "age" => 20],
];
usort($users, fn($a, $b) => $a["age"] <=> $b["age"]);

// array_map + 箭头函数
$names = array_map(fn($u) => $u["name"], $users);

// array_filter + 箭头函数
$adults = array_filter($users, fn($u) => $u["age"] >= 21);`,
            python: `# Python: lambda (只能单行表达式!)
double = lambda n: n * 2
print(double(5))  # 10

# 推荐: 用 def 代替复杂 lambda
def double(n: int) -> int:
    return n * 2

# 实际用法: sorted() 的 key 参数 (lambda 最常用场景)
users = [
    {"name": "张三", "age": 25},
    {"name": "李四", "age": 20},
]
sorted_users = sorted(users, key=lambda u: u["age"])

# 按多个字段排序
sorted_users = sorted(users, key=lambda u: (u["age"], u["name"]))

# max/min 配合 lambda
oldest = max(users, key=lambda u: u["age"])

# 注意: 优先用列表推导式替代 map/filter + lambda
names = [u["name"] for u in users]           # 代替 map
adults = [u for u in users if u["age"] >= 21]  # 代替 filter

# lambda 的局限: 只能单行，不能有赋值或语句
# 错误写法: lambda x: x = x + 1  (语法错误!)
# 正确做法: 用 def`,
            note: 'Python lambda 的设计哲学是 "简单即美"。它只能包含单个表达式，不能有 if/for/赋值等语句。复杂逻辑请用 def，Python 社区强烈反对滥用 lambda。sorted() 的 key 参数是 lambda 最佳使用场景。',
          },
        ],
      },
      {
        title: '模块与包管理',
        duration: '30 分钟',
        description: '对比 PHP 的 namespace/use/autoloading 和 Python 的 import/from...import。理解 Python 的模块系统和包管理工具。',
        keyPoints: [
          'Python 用 import/from...import 代替 PHP 的 use',
          'Python 用 __init__.py 标识包目录，类似 composer autoload',
          'pip ≈ composer，poetry ≈ composer (更现代)',
          'pyproject.toml 正在成为 Python 项目的标准配置文件',
          '相对导入 (.module) vs 绝对导入 (package.module)',
        ],
        codeExamples: [
          {
            title: '模块导入对比',
            php: `<?php
// PHP: namespace + use
namespace App\\Services;

use App\\Models\\User;
use App\\Repositories\\UserRepository as UserRepo;

// Composer PSR-4 自动加载 (无需手动 require)
class UserService {
    public function __construct(
        private UserRepo $repo
    ) {}

    public function find(int $id): ?User {
        return $this->repo->find($id);
    }
}

// composer.json PSR-4 配置
// {
//     "autoload": {
//         "psr-4": {
//             "App\\\\": "src/"
//         }
//     }
// }`,
            python: `# Python: import 机制

# 导入整个模块
import os
os.path.join("path", "to", "file")

# 导入特定函数/类
from datetime import datetime, timedelta
now = datetime.now()

# 给导入起别名
import numpy as np
from django.db import models as db_models

# 从包中导入 (类似 PHP use)
from app.models import User
from app.services.user_service import UserService
from app.repositories import UserRepository as UserRepo

# 包结构
# myproject/
# ├── app/
# │   ├── __init__.py    # 必须有! 标识为 Python 包
# │   ├── models/
# │   │   ├── __init__.py
# │   │   └── user.py    # class User
# │   └── services/
# │       ├── __init__.py
# │       └── user_service.py
# └── main.py`,
            note: 'Python 的 import 系统比 PHP 的 namespace 更灵活。__init__.py 文件是 Python 包的标志，也可以用来简化导入路径。Python 3.3+ 支持命名空间包 (无 __init__.py)，但显式创建仍然推荐。',
          },
          {
            title: '包管理工具对比',
            php: `# PHP: Composer 包管理
composer init                          # 初始化
composer require laravel/framework    # 安装
composer require --dev phpunit/phpunit # 开发依赖
composer install                       # 安装所有
composer update                        # 更新

# composer.json
# {
#     "require": {
#         "laravel/framework": "^11.0"
#     },
#     "require-dev": {
#         "phpunit/phpunit": "^10.0"
#     },
#     "autoload": {
#         "psr-4": {"App\\\\": "src/"}
#     }
# }

# vendor/autoload.php 自动加载
require_once "vendor/autoload.php";`,
            python: `# Python: pip 包管理 (基础)
pip install flask                     # 安装
pip install flask==3.0.0              # 指定版本
pip install -r requirements.txt       # 从文件安装
pip freeze > requirements.txt         # 导出依赖

# Python: Poetry (现代包管理，类似 Composer)
poetry init                           # 初始化
poetry add flask                      # 安装
poetry add --group dev pytest         # 开发依赖
poetry install                        # 安装所有
poetry update                         # 更新

# pyproject.toml (现代 Python 标准配置)
# [project]
# name = "myproject"
# version = "0.1.0"
# requires-python = ">=3.11"
# dependencies = [
#     "flask>=3.0",
# ]
#
# [project.optional-dependencies]
# dev = ["pytest>=8.0", "mypy>=1.0"]

# __init__.py 控制包的公开 API
# app/services/__init__.py
from .user_service import UserService
__all__ = ["UserService"]  # 限制 from app.services import *`,
            note: 'pip + requirements.txt 是 Python 最基础的包管理方式。Poetry 提供了类似 Composer 的完整体验（锁文件、虚拟环境管理、发布）。pyproject.toml 是 Python 社区正在统一的配置文件标准，类似 composer.json。',
          },
        ],
      },
      {
        title: '装饰器进阶与 functools 工具箱',
        duration: '35 分钟',
        description: '深入装饰器的高级用法，包括带参数的装饰器和类装饰器。同时学习 functools 模块的实用工具：partial（柯里化）、reduce（折叠）、lru_cache（缓存），这些是 PHP 没有的函数式编程利器。',
        keyPoints: [
          '带参数的装饰器通过闭包工厂实现，类似 PHP 的可配置中间件',
          '类装饰器用 __call__ 实现，适合需要状态的装饰器',
          'functools.partial 固定函数部分参数，类似 PHP 的部分应用',
          'functools.lru_cache 自动缓存函数返回值，极大提升性能',
          'functools.reduce 折叠操作，类似 PHP 的 array_reduce',
        ],
        codeExamples: [
          {
            title: '带参数装饰器与类装饰器',
            php: `<?php
// PHP: 可配置中间件 (需要类实现)
class RateLimitMiddleware {
    public function __construct(private int $maxRequests, private int $perSeconds) {}
    public function handle($request, Closure $next) {
        // 检查速率限制
        return $next($request);
    }
}

// 使用
Route::middleware(new RateLimitMiddleware(100, 60))->group(function () { ... });`,
            python: `import functools
import time

# 带参数的装饰器 (闭包工厂)
def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts:
                        raise
                    print(f"第{attempt}次失败，{delay}秒后重试...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=2.0)
def fetch_data(url: str) -> str:
    pass  # 网络请求

# 类装饰器 (适合需要维护状态的场景)
class Counter:
    def __init__(self, func):
        functools.update_wrapper(self, func)
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"{self.func.__name__} 已调用 {self.count} 次")
        return self.func(*args, **kwargs)

@Counter
def say_hello():
    print("Hello!")`,
            note: '带参数装饰器是"三层嵌套"结构：外层接收参数 → 中层接收函数 → 内层是包装逻辑。类装饰器用 __call__ 让实例可调用，适合需要维护状态（如计数器、缓存）的场景。',
          },
          {
            title: 'functools 实用工具',
            php: `<?php
// PHP: 没有内置的 partial / cache 工具

// array_reduce (类似 functools.reduce)
$numbers = [1, 2, 3, 4, 5];
$sum = array_reduce($numbers, fn($carry, $n) => $carry + $n, 0);

// 手动实现部分应用
$add5 = fn(int $x): int => $x + 5;

// PHP 没有内置缓存，需要第三方库或手动实现`,
            python: `import functools
from functools import partial, reduce, lru_cache

# partial — 固定部分参数 (柯里化)
def power(base: int, exp: int) -> int:
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))  # 25
print(cube(3))   # 27

# lru_cache — 自动缓存 (memoization!)
@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(100))  # 极快! 没有缓存会非常慢
print(fibonacci.cache_info())  # 查看缓存统计

# reduce — 折叠操作
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, numbers, 0)  # 15
product = reduce(lambda x, y: x * y, numbers, 1)  # 120

# 但是! reduce 优先用 sum()/内置函数替代
total = sum(numbers)  # 更 Pythonic
product = 1
for n in numbers:
    product *= n  # 或用 math.prod()`,
            note: '`lru_cache` 是 Python 性能优化的神器，一行代码就能缓存函数结果。注意: 缓存的参数必须是可哈希的(不可变类型)。`partial` 类似 PHP 的闭包预设参数，但更简洁。`reduce` 在 Python 中不推荐过度使用，优先用 sum/max/min/内置函数。',
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: '面向对象编程',
    subtitle: '类、继承、魔术方法深度对比',
    duration: '第 8-10 天',
    difficulty: '进阶',
    icon: '🏗️',
    color: 'from-rose-500 to-pink-600',
    description: '深入对比 PHP 和 Python 的 OOP 实现。两者都支持类、继承、接口等特性，但 Python 有独特的魔术方法、属性描述符等特性。',
    phpConcept: 'class, extends, interface, trait, __construct',
    pythonConcept: 'class, super(), ABC, @property, __init__',
    lessons: [
      {
        title: '类与对象基础',
        duration: '45 分钟',
        description: '对比 PHP 和 Python 的类定义、构造函数、属性访问。',
        keyPoints: [
          'PHP 用 $this，Python 用 self',
          'PHP 用 __construct，Python 用 __init__',
          'Python 的 self 必须显式声明',
          'PHP 有 public/protected/private，Python 约定用 _ 和 __',
          'Python 用 @property 实现属性访问控制',
        ],
        codeExamples: [
          {
            title: '类定义对比',
            php: `<?php
class User {
    public string $name;
    private int $age;
    protected string $email;

    public function __construct(
        string $name,
        int $age,
        string $email
    ) {
        $this->name = $name;
        $this->age = $age;
        $this->email = $email;
    }

    public function getAge(): int {
        return $this->age;
    }

    public function greet(): string {
        return "Hello, I'm {$this->name}";
    }
}

$user = new User("张三", 25, "z@test.com");
echo $user->greet();`,
            python: `class User:
    def __init__(self, name: str, age: int, email: str):
        self.name = name          # 公有属性
        self._age = age           # 约定: 受保护
        self.__email = email      # 约定: 私有 (名称改写)

    @property
    def age(self) -> int:         # getter
        return self._age

    @age.setter
    def age(self, value: int):    # setter
        if value < 0:
            raise ValueError("年龄不能为负数")
        self._age = value

    def greet(self) -> str:
        return f"Hello, I'm {self.name}"

user = User("张三", 25, "z@test.com")
print(user.greet())`,
            note: 'Python 没有真正的访问修饰符，但通过 _ (受保护) 和 __ (私有) 命名约定来实现。@property 装饰器可以优雅地实现 getter/setter。',
          },
        ],
      },
      {
        title: '继承与多态',
        duration: '40 分钟',
        description: '对比 PHP 和 Python 的继承、接口和抽象类。',
        keyPoints: [
          'Python 用 class Child(Parent) 代替 extends',
          'Python 用 super() 代替 parent::',
          'Python 用 ABC + @abstractmethod 实现抽象类',
          'Python 用 Protocol (结构化子类型) 替代接口',
          'Python 支持多继承，用 MRO 解决钻石问题',
        ],
        codeExamples: [
          {
            title: '继承与接口对比',
            php: `<?php
// PHP: 抽象类
abstract class Shape {
    abstract public function area(): float;
    abstract public function perimeter(): float;
}

// PHP: 接口
interface Drawable {
    public function draw(): void;
    public function resize(float $factor): void;
}

class Circle extends Shape implements Drawable {
    private float $radius;

    public function __construct(float $radius) {
        $this->radius = $radius;
    }

    public function area(): float {
        return pi() * $this->radius ** 2;
    }

    public function perimeter(): float {
        return 2 * pi() * $this->radius;
    }

    public function draw(): void {
        echo "Drawing circle...\\n";
    }

    public function resize(float $factor): void {
        $this->radius *= $factor;
    }
}`,
            python: `from abc import ABC, abstractmethod
from typing import Protocol

# Python: 抽象类
class Shape(ABC):
    @abstractmethod
    def area(self) -> float:
        pass

    @abstractmethod
    def perimeter(self) -> float:
        pass

# Python: Protocol (结构化接口)
class Drawable(Protocol):
    def draw(self) -> None: ...
    def resize(self, factor: float) -> None: ...

class Circle(Shape):
    def __init__(self, radius: float):
        self.radius = radius

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

    def perimeter(self) -> float:
        import math
        return 2 * math.pi * self.radius

    def draw(self) -> None:
        print("Drawing circle...")

    def resize(self, factor: float) -> None:
        self.radius *= factor`,
            note: 'Python 的 Protocol 是结构化子类型（鸭子类型），不需要显式 implements，只要实现了相同方法就满足接口。这比 PHP 的 interface 更灵活。',
          },
        ],
      },
      {
        title: '魔术方法对比',
        duration: '30 分钟',
        description: '对比 PHP 和 Python 的魔术方法（双下划线方法）。',
        keyPoints: [
          'PHP: __construct/__destruct/__get/__set/__toString',
          'Python: __init__/__del__/__getattr__/__setattr__/__str__',
          'Python 有更多魔术方法: __add__, __eq__, __len__ 等',
          'Python 可以重载运算符',
          'Python 的 __call__ 使对象可调用',
        ],
        codeExamples: [
          {
            title: '魔术方法对比',
            php: `<?php
class Money {
    public function __construct(
        private float $amount,
        private string $currency = "CNY"
    ) {}

    public function __toString(): string {
        return "{$this->amount} {$this->currency}";
    }

    // PHP 不支持运算符重载
    public function add(Money $other): Money {
        if ($this->currency !== $other->currency) {
            throw new InvalidArgumentException("货币不匹配");
        }
        return new Money(
            $this->amount + $other->amount,
            $this->currency
        );
    }
}

$a = new Money(100);
$b = new Money(50);
$c = $a->add($b);  // 不能用 $a + $b
echo $c;  // 150 CNY`,
            python: `class Money:
    def __init__(self, amount: float, currency: str = "CNY"):
        self.amount = amount
        self.currency = currency

    def __str__(self) -> str:
        return f"{self.amount} {self.currency}"

    # 运算符重载!
    def __add__(self, other: 'Money') -> 'Money':
        if self.currency != other.currency:
            raise ValueError("货币不匹配")
        return Money(
            self.amount + other.amount,
            self.currency
        )

    # 比较运算符
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return False
        return (self.amount == other.amount and
                self.currency == other.currency)

    # 使对象可调用
    def __call__(self, exchange_rate: float) -> 'Money':
        return Money(self.amount * exchange_rate)

a = Money(100)
b = Money(50)
c = a + b  # 可以用 + 运算符!
print(c)   # 150.0 CNY
usd = a(0.14)  # 对象当函数用!
print(usd)  # 14.0 CNY`,
            note: 'Python 的运算符重载让自定义类型可以像内置类型一样使用 +, -, *, == 等，这是 PHP 不支持的高级特性。',
          },
        ],
      },
      {
        title: '类方法与静态方法',
        duration: '25 分钟',
        description: '对比 PHP 静态方法和 Python 的 @staticmethod/@classmethod。Python 用装饰器区分，而非 static 关键字。',
        keyPoints: [
          'Python 没有 static 关键字，用 @staticmethod 和 @classmethod 装饰器',
          '@staticmethod: 普通函数放在类中，不接收 self 或 cls',
          '@classmethod: 接收 cls 参数，可以访问类属性和创建实例',
          'PHP 的 static:: (延迟静态绑定) ≈ Python 的 cls',
          '工厂模式是 @classmethod 最常见的使用场景',
        ],
        codeExamples: [
          {
            title: '静态方法对比',
            php: `<?php
class MathHelper {
    // PHP: 静态方法 (不需要实例化)
    public static function add(int $a, int $b): int {
        return $a + $b;
    }

    // 访问静态属性
    private static int $instanceCount = 0;

    public function __construct() {
        self::$instanceCount++;
    }

    public static function getInstanceCount(): int {
        return self::$instanceCount;
    }

    // 延迟静态绑定 (static:: 代替 self::)
    public static function create(): static {
        return new static();
    }
}

// 调用静态方法
echo MathHelper::add(2, 3);         // 5
echo MathHelper::getInstanceCount(); // 0

$obj = new MathHelper();
echo MathHelper::getInstanceCount(); // 1`,
            python: `class MathHelper:
    count = 0  # 类属性 (类似 PHP static 属性)

    # @staticmethod: 纯工具函数，不需要 self 或 cls
    @staticmethod
    def add(a: int, b: int) -> int:
        return a + b

    def __init__(self):
        MathHelper.count += 1

    # @classmethod: 接收 cls 参数，可以访问类属性
    @classmethod
    def get_instance_count(cls) -> int:
        return cls.count

    # @classmethod: 工厂模式 (替代 PHP 的 new static())
    @classmethod
    def create(cls):
        return cls()

# 调用静态方法
print(MathHelper.add(2, 3))           # 5
print(MathHelper.get_instance_count()) # 0

obj = MathHelper()
print(MathHelper.get_instance_count()) # 1

# 工厂模式: 根据参数创建不同子类
class Dog:
    @classmethod
    def create(cls, name: str) -> 'Dog':
        return cls(name)

class GuideDog(Dog):
    def __init__(self, name: str):
        self.name = name

# cls 正确指向调用时的类
dog = GuideDog.create("Buddy")  # 返回 GuideDog 实例!`,
            note: 'Python 的 @classmethod + cls 完美替代 PHP 的延迟静态绑定 (static::)。@staticmethod 适合工具函数，@classmethod 适合工厂模式。两者都不需要实例化对象即可调用。',
          },
        ],
      },
      {
        title: 'dataclass 数据类',
        duration: '30 分钟',
        description: 'Python 的 @dataclass 是 PHP 开发者最应该掌握的特性之一。自动生成 __init__、__repr__、__eq__ 等方法，大幅减少样板代码。',
        keyPoints: [
          '@dataclass 自动生成 __init__、__repr__、__eq__ 方法',
          '相比 PHP 手写构造函数 + 属性，减少 70% 样板代码',
          'field() 定义默认值、类型和验证规则',
          'frozen=True 创建不可变对象 (类似 PHP readonly)',
          'Pydantic BaseModel 是 dataclass 的进化版，带运行时验证',
        ],
        codeExamples: [
          {
            title: 'dataclass vs PHP 手写类对比',
            php: `<?php
// PHP: 需要手写大量样板代码
class User {
    public function __construct(
        public string $name,
        public string $email,
        public int $age = 0,
        public bool $is_active = true,
    ) {}

    // 手动实现 __toString (类似 __repr__)
    public function __toString(): string {
        return "User(name={$this->name}, email={$this->email})";
    }

    // 手动实现相等比较
    public function equals(self $other): bool {
        return $this->name === $other->name
            && $this->email === $other->email;
    }

    // PHP 8.1+: readonly 不可变类
}

$user = new User("张三", "z@test.com", 25);
echo $user;  // User(name=张三, email=z@test.com)`,
            python: `from dataclasses import dataclass, field

# Python: @dataclass 自动生成所有样板代码!
@dataclass
class User:
    name: str
    email: str
    age: int = 0                    # 默认值
    is_active: bool = True           # 默认值

# 自动生成 __init__(name, email, age=0, is_active=True)
# 自动生成 __repr__: User(name='张三', email='z@test.com', age=25)
# 自动生成 __eq__: 两个属性相同则相等
user = User("张三", "z@test.com", 25)
print(user)  # User(name='张三', email='z@test.com', age=25, is_active=True)

# 相等比较 (自动生成的 __eq__)
user2 = User("张三", "z@test.com", 25)
print(user == user2)  # True

# 排序 (自动生成 __lt__，如果指定 order=True)
@dataclass(order=True)
class Score:
    value: int
    subject: str

scores = [Score(90, "数学"), Score(85, "语文"), Score(95, "英语")]
print(sorted(scores))  # 按第一个字段 value 排序

# 不可变对象 (类似 PHP readonly)
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(3, 4)
# p.x = 5  # 会抛出 FrozenInstanceError!

# field() 高级用法
@dataclass
class Team:
    name: str
    members: list[str] = field(default_factory=list)
    # 不要用 members: list = []! 会导致共享引用 bug`,
            note: '@dataclass 是 Python 3.7+ 引入的特性，是 PHP 开发者转向 Python 后最值得学习的特性之一。它消除了 PHP 中最常见的样板代码（构造函数、toString、equals）。注意: 默认可变值必须用 field(default_factory=...)。',
          },
          {
            title: 'Pydantic BaseModel: dataclass 的进化版',
            php: `<?php
// PHP: 需要 FormRequest 或手动验证
class CreateUserRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:2|max:100',
            'email' => 'required|email|unique:users',
            'age' => 'required|integer|min:0|max:150',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '姓名不能为空',
            'email.email' => '邮箱格式不正确',
        ];
    }
}`,
            python: `# Pydantic BaseModel: 带运行时验证的 dataclass
from pydantic import BaseModel, EmailStr, Field, field_validator

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr  # 自动验证邮箱格式
    age: int = Field(ge=0, le=150, default=0)

    @field_validator("name")
    @classmethod
    def name_must_contain_space(cls, v: str) -> str:
        if " " not in v:
            raise ValueError("姓名必须包含空格")
        return v

    # 自动生成 JSON Schema!
    # UserCreate.model_json_schema()

# 使用: 自动验证!
try:
    user = UserCreate(name="张三", email="invalid", age=200)
except Exception as e:
    print(e)  # 显示所有验证错误

# 正确的输入
user = UserCreate(name="张 三", email="z@test.com", age=25)

# 自动转换为 dict / JSON
print(user.model_dump())    # {'name': '张 三', 'email': 'z@test.com', 'age': 25}
print(user.model_dump_json())  # JSON 字符串
print(user.model_json_schema())  # OpenAPI Schema

# 从 dict 创建 (自动验证)
data = {"name": "李四", "email": "l@test.com", "age": 30}
user2 = UserCreate.model_validate(data)`,
            note: 'Pydantic BaseModel 是 FastAPI 的核心依赖。它结合了 dataclass 的简洁和 Laravel FormRequest 的验证能力，还自动生成 JSON Schema (用于 Swagger 文档)。Python 生态中没有比它更好的数据验证方案。',
          },
        ],
      },
      {
        title: 'Enum 枚举与特殊魔术方法',
        duration: '35 分钟',
        description: 'Python 的 enum 模块提供类型安全的枚举，类似 PHP 8.1+ 的 enum 但功能更丰富。同时学习 __slots__ 内存优化、__new__ vs __init__ 的区别，以及 Mixin 模式替代 PHP trait。',
        keyPoints: [
          'enum.Enum 定义枚举，Python 3.11+ 新增 StrEnum/IntEnum',
          '__slots__ 显式声明属性，减少 40-50% 内存占用',
          '__new__ 控制对象创建(单例)，__init__ 初始化对象',
          'Mixin 多继承组合功能，替代 PHP 的 trait',
          'Python 不支持传统重载，用默认参数或 @singledispatch 替代',
        ],
        codeExamples: [
          {
            title: 'Enum 枚举对比',
            php: `<?php
// PHP 8.1+: Enum
enum Status: string {
    case Active = 'active';
    case Inactive = 'inactive';
    case Pending = 'pending';
}

$user->status = Status::Active;
$value = $user->status->value;  // 'active'

// Enum 方法
enum Color: int {
    case Red = 1;
    case Green = 2;
    case Blue = 3;

    public function label(): string {
        return match($this) {
            self::Red => '红色',
            self::Green => '绿色',
            self::Blue => '蓝色',
        };
    }
}`,
            python: `from enum import Enum, IntEnum, StrEnum, auto

# Python 3.11+: StrEnum (推荐!)
class Status(StrEnum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"

user.status = Status.ACTIVE
print(user.status)     # Status.ACTIVE
print(user.status.value)  # 'active'

# IntEnum (类似 PHP enum int)
class Color(IntEnum):
    RED = 1
    GREEN = 2
    BLUE = 3

    @property
    def label(self) -> str:
        labels = {1: "红色", 2: "绿色", 3: "蓝色"}
        return labels[self.value]

print(Color.RED)         # Color.RED
print(Color.RED.value)   # 1
print(Color.RED.label)   # 红色
print(Color.RED == 1)    # True (IntEnum 可直接比较整数)

# auto() 自动赋值
class Priority(IntEnum):
    LOW = auto()      # 1
    MEDIUM = auto()   # 2
    HIGH = auto()     # 3

# 枚举遍历
for status in Status:
    print(f"{status.name}: {status.value}")`,
            note: 'Python 的 Enum 比 PHP 更灵活: 支持 auto() 自动命名、@property 方法、IntEnum 可与整数直接比较。Python 3.11+ 的 StrEnum 是最常用的枚举类型。注意 Python 枚举用大写命名 (ACTIVE)，PHP 用 PascalCase (Active)。',
          },
          {
            title: '__slots__ 与 __new__ vs __init__',
            php: `<?php
// PHP: 所有对象属性自动存在 __dict__
class Point {
    public function __construct(
        public readonly float $x,
        public readonly float $y,
    ) {}
}

// PHP 没有 __new__，只有 __construct
// PHP 用 trait 混入功能
trait Timestampable {
    public ?DateTime $createdAt = null;
    public function touch(): void {
        $this->createdAt = new DateTime();
    }
}

class User {
    use Timestampable;  // 混入
}`,
            python: `# __slots__ — 内存优化 (减少 40-50%!)
class Point:
    __slots__ = ('x', 'y')  # 显式声明属性

    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

# 没有 __slots__: 每个对象有 __dict__ (字典开销)
# 有 __slots__: 属性存储在固定数组中
# p.__dict__  → AttributeError!

# __new__ vs __init__
class Singleton:
    _instance = None

    def __new__(cls):
        # __new__ 控制对象创建 (类似工厂方法)
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def __init__(self):
        # __init__ 初始化对象 (每次都会调用!)
        if not hasattr(self, 'initialized'):
            self.initialized = True

# Mixin 模式 (替代 PHP trait)
class TimestampMixin:
    created_at = None

    def touch(self):
        from datetime import datetime
        self.created_at = datetime.now()

class LogMixin:
    def log(self, message: str):
        print(f"[LOG] {message}")

class User(TimestampMixin, LogMixin):
    def __init__(self, name: str):
        self.name = name

user = User("张三")
user.touch()          # 来自 TimestampMixin
user.log("已创建")    # 来自 LogMixin`,
            note: '__slots__ 在创建大量对象时(如从数据库读取 10000 条记录)效果显著。__new__ 是类方法，负责创建对象(分配内存)；__init__ 是实例方法，负责初始化对象(设置属性)。PHP 只有 __construct 合二为一。Mixin 是 Python 的"代码复用"方案，类似 PHP trait 但基于多继承。',
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: '异常处理与文件操作',
    subtitle: '错误处理、上下文管理器和文件 I/O',
    duration: '第 11-12 天',
    difficulty: '进阶',
    icon: '🛡️',
    color: 'from-teal-500 to-emerald-600',
    description: '学习 Python 的异常处理机制和文件操作。Python 的上下文管理器 (with 语句) 是处理资源管理的优雅方式，相比 PHP 更加简洁安全。',
    phpConcept: 'try/catch/finally, fopen/fread/fwrite',
    pythonConcept: 'try/except/finally, with, open',
    lessons: [
      {
        title: '异常处理对比',
        duration: '35 分钟',
        description: '对比 PHP 和 Python 的异常处理语法。',
        keyPoints: [
          'Python 用 except 代替 catch',
          'Python 可以同时捕获多种异常',
          'Python 的 else 子句在无异常时执行',
          'Python 的 finally 用法相同',
          'Python 常见异常: ValueError, TypeError, KeyError 等',
        ],
        codeExamples: [
          {
            title: '异常处理对比',
            php: `<?php
try {
    $result = 1 / 0;
} catch (DivisionByZeroError $e) {
    error_log("错误: " . $e->getMessage());
    $result = 0;
} catch (Exception $e) {
    error_log("其他错误: " . $e->getMessage());
} finally {
    error_log("总是执行");
}

// 自定义异常
class ValidationException extends Exception {
    private array $errors;

    public function __construct(array $errors) {
        $this->errors = $errors;
        parent::__construct("验证失败");
    }

    public function getErrors(): array {
        return $this->errors;
    }
}`,
            python: `try:
    result = 1 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")
    result = 0
except (ValueError, TypeError) as e:  # 多个异常
    print(f"类型错误: {e}")
except Exception as e:  # 基类异常
    print(f"其他错误: {e}")
else:  # 无异常时执行
    print("没有发生异常")
finally:
    print("总是执行")

# 自定义异常
class ValidationException(Exception):
    def __init__(self, errors: list[str]):
        self.errors = errors
        super().__init__("验证失败")

    def get_errors(self) -> list[str]:
        return self.errors`,
            note: 'Python 的 try/except/else/finally 四段式结构比 PHP 的 try/catch/finally 更加完整，else 子句让正常逻辑和异常逻辑分离更清晰。',
          },
        ],
      },
      {
        title: '上下文管理器 - with 语句',
        duration: '30 分钟',
        description: '学习 Python 独有的上下文管理器，优雅处理资源管理。',
        keyPoints: [
          'with 语句自动处理资源的获取和释放',
          '类似 PHP 的 try/finally 但更简洁',
          '可以自定义上下文管理器',
          '支持同时打开多个资源',
        ],
        codeExamples: [
          {
            title: '资源管理对比',
            php: `<?php
// PHP: 手动管理资源
$handle = fopen("data.txt", "r");
try {
    while ($line = fgets($handle)) {
        echo $line;
    }
} finally {
    fclose($handle);  // 必须手动关闭
}

// PHP 8.1+: using 关键字 (类似 with)
// 但目前支持有限`,
            python: `# Python: with 自动管理资源
with open("data.txt", "r") as f:
    for line in f:
        print(line, end="")
# 文件自动关闭！无需手动 close()

# 同时管理多个资源
with open("input.txt") as inp, \\
     open("output.txt", "w") as out:
    out.write(inp.read())

# 自定义上下文管理器
class DatabaseConnection:
    def __enter__(self):
        print("连接数据库...")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("关闭数据库连接...")
        return False  # 不抑制异常

with DatabaseConnection() as db:
    print("执行查询...")`,
            note: 'Python 的 with 语句是资源管理的最佳实践，比 PHP 的 try/finally 更加简洁和安全。忘记关闭文件？在 Python 中几乎不可能。',
          },
        ],
      },
      {
        title: 'JSON 与数据处理',
        duration: '25 分钟',
        description: '对比 PHP 和 Python 的 JSON 处理方式。JSON 是 Web 开发中最重要的数据格式，掌握 Python 的 json 模块是必备技能。',
        keyPoints: [
          'json.dumps() 对应 PHP json_encode()，序列化为 JSON 字符串',
          'json.loads() 对应 PHP json_decode()，反序列化为 Python 对象',
          'json.dump()/load() 直接读写 JSON 文件',
          'ensure_ascii=False 支持中文输出',
          'indent 参数美化输出，类似 JSON_PRETTY_PRINT',
        ],
        codeExamples: [
          {
            title: 'JSON 序列化与反序列化对比',
            php: `<?php
// PHP: json_encode / json_decode
$user = [
    "name" => "张三",
    "age" => 25,
    "hobbies" => ["编程", "阅读"],
    "address" => [
        "city" => "北京",
        "zip" => "100000"
    ],
];

// 序列化
$json = json_encode($user);
// {"name":"张三","age":25,"hobbies":["编程","阅读"],"address":{"city":"北京","zip":"100000"}}

// 美化输出 (类似 indent)
$jsonPretty = json_encode($user, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

// 反序列化 (默认返回关联数组)
$data = json_decode($json, true);  // true = 关联数组
$name = $data["name"];  // "张三"

// 不传 true 则返回 stdClass 对象
$obj = json_decode($json);
$name = $obj->name;

// 错误处理
$json = '{"invalid": }';
$result = json_decode($json);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_last_error_msg();
}`,
            python: `import json

# Python: json.dumps / json.loads
user = {
    "name": "张三",
    "age": 25,
    "hobbies": ["编程", "阅读"],
    "address": {
        "city": "北京",
        "zip": "100000"
    },
}

# 序列化
json_str = json.dumps(user)
# {"name": "\\u5f20\\u4e09", ...}

# 美化 + 中文支持
json_pretty = json.dumps(user, ensure_ascii=False, indent=2)
# {
#   "name": "张三",
#   "age": 25,
#   "hobbies": ["编程", "阅读"],
#   "address": {"city": "北京", "zip": "100000"}
# }

# 反序列化 (自动返回 dict)
data = json.loads(json_str)
name = data["name"]  # "张三"

# 错误处理
try:
    data = json.loads('{"invalid": }')
except json.JSONDecodeError as e:
    print(f"JSON 解析错误: {e}")`,
            note: 'Python 的 json.loads() 默认返回 dict，而 PHP 的 json_decode() 默认返回 stdClass 对象。Python 不需要传参数就能得到类似 PHP json_decode($json, true) 的效果。',
          },
          {
            title: 'JSON 文件读写对比',
            php: `<?php
// PHP: JSON 文件读写

// 写入 JSON 文件
$data = ["name" => "张三", "scores" => [90, 85, 92]];
$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
file_put_contents("data.json", $json);

// PHP 8.1+ json_file 改进 (需要扩展)
// $data = json_file_load("data.json");

// 读取 JSON 文件
$json = file_get_contents("data.json");
$data = json_decode($json, true);

// 处理 API 响应 (常见场景)
$response = file_get_contents("https://api.example.com/users");
$users = json_decode($response, true);
foreach ($users as $user) {
    echo $user["name"] . "\\n";
}`,
            python: `import json

# Python: JSON 文件读写 (更简洁!)

# 写入 JSON 文件 (自动处理格式化)
data = {"name": "张三", "scores": [90, 85, 92]}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON 文件 (一行搞定!)
with open("data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 处理 API 响应 (常见场景)
import urllib.request
with urllib.request.urlopen("https://api.example.com/users") as resp:
    users = json.loads(resp.read().decode("utf-8"))
for user in users:
    print(user["name"])

# 自定义序列化 (处理 datetime 等特殊类型)
from datetime import datetime
def default_serializer(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    raise TypeError(f"无法序列化 {type(obj)}")

event = {"name": "会议", "time": datetime.now()}
json_str = json.dumps(event, default=default_serializer, ensure_ascii=False)`,
            note: 'Python 的 json.dump()/json.load() 直接操作文件对象，比 PHP 的 file_put_contents + json_encode 两步操作更简洁。自定义序列化用 default 参数，比 PHP 的 JsonSerializable 接口更灵活。',
          },
        ],
      },
      {
        title: 'pathlib、logging 与文件操作进阶',
        duration: '40 分钟',
        description: '学习 Python 现代文件路径处理方式 pathlib、内置日志模块 logging，以及 csv 文件处理。这些是 Python 独有的标准化工具，比 PHP 的碎片化函数更优雅。',
        keyPoints: [
          'pathlib.Path 是现代路径处理方式，替代 os.path',
          'Path 支持 / 运算符拼接路径，.exists()、.mkdir()、.glob() 等方法',
          'logging 模块类似 PHP 的 Monolog，但内置无需安装',
          'csv 模块替代 PHP 的 fgetcsv/fputcsv',
          '@contextmanager 装饰器比类实现更简洁',
        ],
        codeExamples: [
          {
            title: 'pathlib 现代路径处理',
            php: `<?php
// PHP: 文件路径操作 (碎片化函数)
$path = __DIR__ . '/data/users.json';
$dir = dirname($path);           // /data
$ext = pathinfo($path, PATHINFO_EXTENSION);  // json
$exists = file_exists($path);
mkdir('/data/cache', 0755, true);  // 递归创建

// 遍历目录
$files = glob('/data/*.json');
foreach (glob('/data/**/*', GLOB_BRACE) as $file) {
    echo basename($file) . "\\n";
}

// 读写文件
$content = file_get_contents($path);
file_put_contents($path, $content);`,
            python: `from pathlib import Path

# Path 对象 (现代化!)
data_dir = Path("data")
file_path = data_dir / "users.json"  # / 运算符拼接!
print(file_path)           # data/users.json
print(file_path.exists())  # True
print(file_path.stem)      # users (文件名)
print(file_path.suffix)    # .json (扩展名)
print(file_path.parent)    # data (父目录)

# 目录操作
Path("cache").mkdir(parents=True, exist_ok=True)  # 递归创建

# 遍历文件
for f in Path("data").glob("*.json"):  # glob 模式匹配
    print(f.name)  # 文件名

for f in Path("data").rglob("*"):  # 递归遍历
    print(f)

# 读写文件 (Path 方法)
content = file_path.read_text(encoding="utf-8")
file_path.write_text(content, encoding="utf-8")
data = file_path.read_bytes()
file_path.write_bytes(data)

# 常用路径
Path.home()           # 用户主目录
Path.cwd()            # 当前工作目录
Path(__file__).parent # 当前文件所在目录`,
            note: 'pathlib 是 Python 3.4+ 的现代路径处理方案，用面向对象的方式替代了 os.path 的所有函数。/ 运算符拼接路径比 os.path.join() 更优雅，.read_text()/.write_text() 比open()更简洁。PHP 没有等价方案。',
          },
          {
            title: 'logging 日志与 csv 处理',
            php: `<?php
// PHP: 需要 Monolog 或 error_log
error_log("普通日志");
error_log("警告信息", 3, "/tmp/app.log");

// CSV 读写
$handle = fopen("data.csv", "r");
while ($row = fgetcsv($handle)) {
    list($name, $age, $city) = $row;
}
fclose($handle);

// 写 CSV
$handle = fopen("output.csv", "w");
fputcsv($handle, ["姓名", "年龄", "城市"]);
fputcsv($handle, ["张三", 25, "北京"]);
fclose($handle);`,
            python: `import logging
import csv
from contextlib import contextmanager

# logging — 内置日志模块 (无需安装!)
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='app.log',
)
logger = logging.getLogger(__name__)

logger.debug("调试信息")
logger.info("普通信息")
logger.warning("警告信息")
logger.error("错误信息")
logger.critical("严重错误")

# @contextmanager — 简洁的上下文管理器
@contextmanager
def database_connection(url: str):
    conn = connect(url)
    try:
        yield conn  # yield 而不是 return
    finally:
        conn.close()

with database_connection("postgresql://...") as db:
    db.query("SELECT 1")

# CSV 读写
with open("data.csv", "r", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)  # 自动转为字典!
    for row in reader:
        print(row["姓名"], row["年龄"])

with open("output.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["姓名", "年龄", "城市"])
    writer.writeheader()
    writer.writerow({"姓名": "张三", "年龄": 25, "城市": "北京"})`,
            note: 'Python 的 logging 是内置标准库，类似 PHP 的 Monolog 但无需 Composer 安装。csv.DictReader/DictWriter 用字典操作 CSV，比 PHP 的 fgetcsv 更直观。@contextmanager 用 yield 定义上下文管理器，比 __enter__/__exit__ 类更简洁。',
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: 'Python Web 开发',
    subtitle: 'FastAPI/Django 框架入门',
    duration: '第 13-15 天',
    difficulty: '进阶',
    icon: '🌐',
    color: 'from-orange-500 to-red-600',
    description: '将你的 PHP Web 开发经验迁移到 Python 世界。优先推荐 FastAPI（现代高性能异步框架），再学习 Django（全栈框架类似 Laravel/Symfony），掌握 Python Web 开发的核心思想。',
    phpConcept: 'Laravel, Symfony, Composer, PSR',
    pythonConcept: 'FastAPI, Django, pip, PEP 8',
    lessons: [
      {
        title: 'FastAPI 快速入门（首推）',
        duration: '60 分钟',
        description: '用 FastAPI 快速搭建高性能 Web API，对比 Laravel 的路由和控制器。FastAPI 是目前最推荐的 Python Web 框架，原生支持异步和自动文档。',
        keyPoints: [
          'FastAPI 是现代高性能框架，原生支持 async/await',
          '自动生成 OpenAPI 文档（类似 Swagger），开发体验极佳',
          '内置请求验证（Pydantic），类似 Laravel FormRequest',
          '路由装饰器 @app.get 代替路由文件，更简洁',
          'Django 是全栈框架，类似 Laravel/Symfony，适合大型项目',
        ],
        codeExamples: [
          {
            title: '路由与控制器对比',
            php: `<?php
// Laravel: routes/api.php
Route::get('/', [HomeController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);

// Laravel: Controller
class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
        ]);
        $user = User::create($validated);
        return response()->json($user, 201);
    }
}

// Laravel: 中间件
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});`,
            python: `# FastAPI: 现代高性能框架（首推！）
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, EmailStr

app = FastAPI(title="My API", version="1.0.0")

# Pydantic 模型 = 自动请求验证 (类似 FormRequest)
class UserCreate(BaseModel):
    name: str
    email: EmailStr

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        from_attributes = True

# 路由装饰器，类型提示自动生效
@app.get("/")
async def root():
    return {"message": "Hello, World!"}

@app.get("/users/{user_id}", response_model=UserResponse)
async def show_user(user_id: int):
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(data: UserCreate):
    user = await User.create(**data.model_dump())
    return user

# 依赖注入 (类似 Laravel 服务容器)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    return await verify_token(token)

@app.get("/me", dependencies=[Depends(get_current_user)])
async def me():
    return {"user": "..."}`,
            note: 'FastAPI 的路由装饰器 + Pydantic 模型让代码极其简洁，自动生成 Swagger 文档。相比 Flask，FastAPI 原生支持异步、自动类型验证、依赖注入，是现代 Python Web 开发的首选。',
          },
          {
            title: '模板引擎对比',
            php: `{{-- Laravel Blade 模板 --}}
@extends('layouts.app')

@section('content')
    <h1>{{ $title }}</h1>

    @if($users->count() > 0)
        <ul>
        @foreach($users as $user)
            <li>{{ $user->name }}</li>
        @endforeach
        </ul>
    @else
        <p>没有用户</p>
    @endif

    {{-- 表单 --}}
    <form method="POST" action="/users">
        @csrf
        <input type="text" name="name">
        <button type="submit">提交</button>
    </form>
@endsection`,
            python: `{# Jinja2 模板 #}
{% extends "layouts/app.html" %}

{% block content %}
    <h1>{{ title }}</h1>

    {% if users|length > 0 %}
        <ul>
        {% for user in users %}
            <li>{{ user.name }}</li>
        {% endfor %}
        </ul>
    {% else %}
        <p>没有用户</p>
    {% endif %}

    {# 表单 #}
    <form method="POST" action="/users">
        <input type="hidden" name="csrf_token"
               value="{{ csrf_token() }}">
        <input type="text" name="name">
        <button type="submit">提交</button>
    </form>
{% endblock %}`,
            note: 'Jinja2 和 Blade 语法非常相似，PHP 开发者可以快速上手。主要区别: {{ }} 相同, {% %} 代替 @, | 过滤器代替管道。',
          },
        ],
      },
      {
        title: 'ORM 数据库操作',
        duration: '45 分钟',
        description: '对比 Laravel Eloquent 和 SQLAlchemy (Python 最主流 ORM)。学习如何用 Python 优雅地进行数据库操作，包括模型定义、CRUD、关联关系和迁移。',
        keyPoints: [
          'SQLAlchemy 2.0 是 Python 最主流 ORM，类似 Laravel Eloquent',
          'SQLAlchemy 用 DeclarativeBase 定义模型，类似 Eloquent Model',
          'Session 管理 CRUD 操作，类似 Eloquent 的查询构建器',
          'relationship() 定义关联关系，类似 Eloquent 关联',
          'Alembic 是数据库迁移工具，类似 Laravel Migrations',
        ],
        codeExamples: [
          {
            title: 'ORM 模型定义对比',
            php: `<?php
// Laravel Eloquent: 模型定义
namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class User extends Model
{
    protected $fillable = ['name', 'email', 'age'];

    // 类型转换
    protected $casts = [
        'age' => 'integer',
        'is_active' => 'boolean',
    ];

    // 一对多关联
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    // 访问器
    public function getFullNameAttribute(): string
    {
        return $this->name;
    }
}

// 数据库迁移
// php artisan make:migration create_users_table
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->integer('age');
    $table->timestamps();
});`,
            python: `# SQLAlchemy 2.0: 模型定义 (现代风格)
from sqlalchemy import Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    # 类型注解风格 (SQLAlchemy 2.0 推荐)
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(255), unique=True)
    age: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)

    # 一对多关联 (类似 Eloquent 的 hasMany)
    posts: Mapped[list["Post"]] = relationship(back_populates="user")

    def __repr__(self) -> str:
        return f"User(id={self.id}, name='{self.name}')"

class Post(Base):
    __tablename__ = "posts"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(255))
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="posts")

# Alembic 迁移 (类似 Laravel Migration)
# alembic init migrations  # 初始化
# alembic revision --autogenerate -m "create users"  # 自动生成
# alembic upgrade head  # 执行迁移`,
            note: 'SQLAlchemy 2.0 的 Mapped/mapped_column 风格比旧版更加类型安全，配合 mypy 可以做静态检查。Alembic 迁移类似 Laravel 的 php artisan migrate，支持自动检测模型变更。',
          },
          {
            title: 'CRUD 操作对比',
            php: `<?php
// Laravel Eloquent: CRUD

// Create
$user = User::create([
    'name' => '张三',
    'email' => 'z@test.com',
    'age' => 25,
]);

// Read
$user = User::find(1);
$users = User::where('age', '>=', 18)->get();
$active = User::where('is_active', true)
    ->orderBy('name')
    ->take(10)
    ->get();

// Update
$user->update(['age' => 26]);
User::where('is_active', false)->update(['age' => 0]);

// Delete
$user->delete();
User::where('age', 0)->delete();

// 关联操作
$user->posts()->create(['title' => 'First Post']);
$posts = $user->posts()->where('title', 'like', '%Hello%')->get();`,
            python: `# SQLAlchemy 2.0: CRUD
from sqlalchemy import select, update, delete
from sqlalchemy.orm import Session

# Create
user = User(name="张三", email="z@test.com", age=25)
session.add(user)
session.commit()
session.refresh(user)  # 获取自增 ID

# Read - SQLAlchemy 2.0 select 风格
user = session.get(User, 1)
stmt = select(User).where(User.age >= 18)
users = session.scalars(stmt).all()

# 带排序和限制
stmt = (select(User)
    .where(User.is_active == True)
    .order_by(User.name)
    .limit(10))
active = session.scalars(stmt).all()

# Update
user.age = 26
session.commit()
# 批量更新
stmt = (update(User)
    .where(User.is_active == False)
    .values(age=0))
session.execute(stmt)
session.commit()

# Delete
session.delete(user)
session.commit()

# 关联操作
post = Post(title="First Post", user_id=user.id)
user.posts.append(post)
session.commit()

# 预加载关联 (类似 Eloquent 的 with/eager load)
stmt = select(User).options(joinedload(User.posts))
users_with_posts = session.scalars(stmt).unique().all()`,
            note: 'SQLAlchemy 2.0 的 select() 风格比旧版 query() 更现代化，类型提示支持更好。注意 SQLAlchemy 默认需要手动 session.commit()，不像 Eloquent 自动提交。joinedload 解决 N+1 查询问题。',
          },
        ],
      },
      {
        title: 'FastAPI 中间件、认证与环境配置',
        duration: '45 分钟',
        description: 'FastAPI 完整的 Web 开发体验，包括中间件、JWT 认证、CORS 配置、分页和环境变量管理。这些是构建生产级 API 的必备知识，对应 Laravel 中间件和 Sanctum 认证。',
        keyPoints: [
          'CORS 中间件允许前端跨域访问，类似 Laravel CORS 配置',
          'JWT 认证用 python-jose 实现，类似 Laravel Sanctum',
          '依赖注入实现认证，类似 Laravel Route::middleware',
          'pydantic-settings 管理 .env 环境变量，类似 Laravel config',
          '分页用 skip/limit 或 OffsetPagination 实现',
        ],
        codeExamples: [
          {
            title: '中间件与 JWT 认证',
            php: `<?php
// Laravel: 中间件
Route::middleware(['auth:sanctum', 'throttle:60,1'])->group(function () {
    Route::get('/api/user', [UserController::class, 'me']);
});

// Laravel: Sanctum 生成 Token
$token = $user->createToken('api-token')->plainTextToken;

// CORS 配置 (config/cors.php)
return [
    'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
];`,
            python: `from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta

app = FastAPI(title="My API")

# CORS 中间件 (类似 Laravel CORS 配置)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT 配置
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# 生成 JWT Token
def create_token(data: dict):
    return jwt.encode(
        {**data, "exp": datetime.utcnow() + timedelta(hours=24)},
        SECRET_KEY, algorithm=ALGORITHM,
    )

# 认证依赖 (类似 Laravel auth middleware)
async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
    except JWTError:
        raise HTTPException(status_code=401, detail="无效Token")
    user = await User.get_or_none(id=user_id)
    if not user:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user

# 使用认证保护路由
@app.get("/me")
async def me(user=Depends(get_current_user)):
    return user`,
            note: 'FastAPI 的 CORSMiddleware 类似 Laravel 的 CORS 配置。JWT 认证用依赖注入实现，比 Laravel 的中间件更灵活——可以组合多个依赖。python-jose 是 Python 最常用的 JWT 库。',
          },
          {
            title: '分页与环境配置',
            php: `<?php
// Laravel: 分页
$users = User::query()
    ->where('is_active', true)
    ->orderBy('created_at', 'desc')
    ->paginate(perPage: 15, page: $request->page);

// Laravel: .env 配置
// .env
// DB_HOST=localhost
// DB_PORT=5432

// 使用: config('database.connections.pgsql.host')
$app_url = env('APP_URL', 'http://localhost');`,
            python: `from fastapi import FastAPI, Query, Depends
from pydantic_settings import BaseSettings

app = FastAPI()

# 分页 (类似 Laravel paginate)
@app.get("/users")
async def list_users(
    page: int = Query(1, ge=1),
    size: int = Query(15, ge=1, le=100),
):
    offset = (page - 1) * size
    stmt = select(User).offset(offset).limit(size)
    users = session.scalars(stmt).all()
    total = session.scalar(select(func.count()).select_from(User))
    return {
        "data": users,
        "total": total,
        "page": page,
        "size": size,
        "pages": (total + size - 1) // size,
    }

# 环境配置 (类似 Laravel .env + config)
class Settings(BaseSettings):
    database_url: str = "postgresql://localhost/mydb"
    secret_key: str = "change-me"
    debug: bool = False
    port: int = 8000

    class Config:
        env_file = ".env"

settings = Settings()  # 自动读取 .env
print(settings.database_url)
print(settings.secret_key)

# 在 FastAPI 中使用
@app.get("/config")
async def get_config():
    return {"debug": settings.debug, "port": settings.port}`,
            note: 'pydantic-settings 自动从 .env 读取配置并验证类型，比 Laravel 的 env() 函数更安全。分页模式 offset=(page-1)*size 是通用做法。Query() 参数自动生成 Swagger 文档中的分页控件。',
          },
        ],
      },
      {
        title: '文件上传与全局异常处理',
        duration: '30 分钟',
        description: '学习 FastAPI 的文件上传下载功能，以及全局异常处理器。这些是 Web 开发中最常见的功能需求。',
        keyPoints: [
          'FastAPI 用 UploadFile 处理文件上传，类似 PHP $_FILES',
          '文件上传后保存到服务器，支持大小和类型限制',
          '全局异常处理器统一处理错误，类似 Laravel Handler',
          '文件下载用 StreamingResponse，支持大文件流式传输',
          '后台任务 BackgroundTasks 替代 PHP 队列的轻量方案',
        ],
        codeExamples: [
          {
            title: '文件上传与全局异常处理',
            php: `<?php
// Laravel: 文件上传
Route::post('/upload', function (Request $request) {
    $request->validate([
        'file' => 'required|file|max:10240|mimes:jpg,png,pdf',
    ]);
    $path = $request->file('file')->store('uploads');
    return response()->json(['path' => $path]);
});

// Laravel: 全局异常处理
// app/Exceptions/Handler.php
public function register(): void {
    $this->reportable(function (ValidationException $e) {
        // 记录日志
    });
}

// 下载文件
return response()->download($filePath);`,
            python: `from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.exceptions import RequestValidationError
from fastapi import BackgroundTasks
import shutil

app = FastAPI()

# 全局异常处理器 (类似 Laravel Handler)
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors(), "message": "请求参数验证失败"},
    )

@app.exception_handler(ValueError)
async def value_error_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": str(exc)},
    )

# 文件上传 (类似 PHP $_FILES)
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # 验证文件类型
    if file.content_type not in ["image/jpeg", "image/png", "application/pdf"]:
        raise HTTPException(400, "不支持的文件类型")
    
    # 保存文件
    save_path = f"uploads/{file.filename}"
    with open(save_path, "wb") as f:
        shutil.copyfileobj(file.file, f)
    
    return {"path": save_path, "size": file.size}

# 多文件上传
@app.post("/upload/multiple")
async def upload_files(files: list[UploadFile] = File(...)):
    paths = []
    for file in files:
        save_path = f"uploads/{file.filename}"
        with open(save_path, "wb") as f:
            shutil.copyfileobj(file.file, f)
        paths.append(save_path)
    return {"paths": paths}

# 后台任务 (轻量级队列替代)
@app.post("/send-email")
async def send_email(background_tasks: BackgroundTasks):
    background_tasks.add_task(send_welcome_email, "user@example.com")
    return {"message": "邮件发送中..."}`,
            note: 'FastAPI 的 UploadFile 自动处理临时文件，比 PHP 的 $_FILES 更安全。全局异常处理器用 @app.exception_handler 装饰器注册，统一错误返回格式。BackgroundTasks 是轻量级的异步任务方案，适合邮件发送、日志记录等不需要持久化队列的场景。',
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: '高级特性与实战',
    subtitle: '生成器、异步编程、测试和项目实战',
    duration: '第 16-20 天',
    difficulty: '高级',
    icon: '🎯',
    color: 'from-fuchsia-500 to-violet-600',
    description: '掌握 Python 的高级特性，包括生成器、异步编程、类型提示等。通过实战项目巩固所学知识，完成从 PHP 到 Python 的华丽转身。',
    phpConcept: 'Generator, Fiber, PHPStan, PHPUnit',
    pythonConcept: 'Generator, async/await, mypy, pytest',
    lessons: [
      {
        title: '生成器与迭代器',
        duration: '40 分钟',
        description: '学习 Python 生成器，一种惰性求值的强大工具。',
        keyPoints: [
          'yield 关键字创建生成器',
          '生成器是惰性求值，节省内存',
          '类似 PHP Generator 但更常用',
          '生成器表达式是最简洁的写法',
          '适合处理大数据集和无限序列',
        ],
        codeExamples: [
          {
            title: '生成器对比',
            php: `<?php
// PHP 生成器
function readLogFile(string $path): Generator {
    $handle = fopen($path, "r");
    while (($line = fgets($handle)) !== false) {
        yield trim($line);
    }
    fclose($handle);
}

// 使用生成器
$lineCount = 0;
foreach (readLogFile("app.log") as $line) {
    if (str_contains($line, "ERROR")) {
        $lineCount++;
    }
}
echo "错误行数: $lineCount";

// PHP 生成器返回值
function squares(int $n): Generator {
    for ($i = 1; $i <= $n; $i++) {
        yield $i ** 2;
    }
    return "生成了 {$n} 个平方数";
}

$gen = squares(5);
foreach ($gen as $square) {
    echo $square . " ";
}
echo $gen->getReturn();`,
            python: `# Python 生成器
def read_log_file(path: str):
    with open(path, "r") as f:
        for line in f:
            yield line.strip()

# 使用生成器
line_count = sum(
    1 for line in read_log_file("app.log")
    if "ERROR" in line
)
print(f"错误行数: {line_count}")

# 生成器表达式 (更简洁!)
squares = (i ** 2 for i in range(1, 11))
print(list(squares))  # [1, 4, 9, 16, ...]

# send() 发送值到生成器
def echo_generator():
    while True:
        received = yield
        yield f"收到: {received}"

gen = echo_generator()
next(gen)  # 启动
print(gen.send("hello"))  # 收到: hello
print(gen.send("world"))  # 收到: world

# yield from 委托生成器
def flatten(nested_list):
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

print(list(flatten([1, [2, [3, 4]], 5])))`,
            note: 'Python 的 yield from 可以优雅地委托给子生成器，而 PHP 没有这个特性。生成器表达式 (x for x in ...) 是 Python 的独特语法。',
          },
        ],
      },
      {
        title: '异步编程 async/await',
        duration: '50 分钟',
        description: '学习 Python 的异步编程，对比 PHP 的 Fiber。',
        keyPoints: [
          'async/await 语法与 JS/PHP 相似',
          'asyncio 是 Python 异步编程核心',
          '适合 I/O 密集型任务（HTTP 请求、数据库）',
          'FastAPI 框架原生支持异步',
          '对比 PHP Swoole/Octane',
        ],
        codeExamples: [
          {
            title: '异步编程对比',
            php: `<?php
// PHP 8.1+: Fiber
$fiber = new Fiber(function(): void {
    $value = Fiber::suspend('fiber');
    echo "Fiber resumed with: $value";
});

$result = $fiber->start();     // 'fiber'
$fiber->resume('hello');       // Fiber resumed with: hello

// PHP Swoole 异步 HTTP
go(function () {
    $client = new Swoole\\Coroutine\\Http\\Client('api.example.com', 443, true);
    $client->get('/users');
    $users = json_decode($client->body, true);
});`,
            python: `import asyncio

# Python async/await (更直观!)
async def fetch_user(user_id: int) -> dict:
    """模拟异步获取用户数据"""
    await asyncio.sleep(1)  # 模拟网络延迟
    return {"id": user_id, "name": f"User {user_id}"}

async def fetch_posts(user_id: int) -> list:
    """模拟异步获取用户帖子"""
    await asyncio.sleep(0.5)
    return [{"id": i, "title": f"Post {i}"} for i in range(3)]

async def main():
    # 并发执行! (不是顺序执行)
    user, posts = await asyncio.gather(
        fetch_user(1),
        fetch_posts(1)
    )
    print(f"用户: {user}")
    print(f"帖子: {posts}")

asyncio.run(main())  # 运行事件循环

# aiohttp 异步 HTTP 客户端
import aiohttp

async def fetch_api(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.json()`,
            note: 'Python 的 async/await 生态更加成熟，asyncio + aiohttp + FastAPI 是现代 Python 异步开发的标配。相比 PHP 的 Fiber/Swoole，Python 的异步方案更加标准化。',
          },
        ],
      },
      {
        title: '类型提示与测试',
        duration: '40 分钟',
        description: '学习 Python 的类型提示系统和 pytest 测试框架。',
        keyPoints: [
          'Python 3.5+ 支持类型提示 (Type Hints)',
          'mypy 是 Python 的静态类型检查器',
          'pytest 比 PHP 的 PHPUnit 更简洁',
          'fixtures 是 pytest 的核心概念',
          'Python 测试文化非常浓厚',
        ],
        codeExamples: [
          {
            title: '类型提示对比',
            php: `<?php
// PHP: 原生类型支持
function processUser(
    string $name,
    int $age,
    array $hobbies,
    ?string $nickname = null
): array {
    return [
        'name' => $name,
        'age' => $age,
        'hobbies' => $hobbies,
        'nickname' => $nickname ?? $name,
    ];
}

// PHPStan 静态分析
// composer require --dev phpstan/phpstan`,
            python: `from typing import Optional, List, Dict, Any
from dataclasses import dataclass

# Python: 类型提示
def process_user(
    name: str,
    age: int,
    hobbies: List[str],
    nickname: Optional[str] = None
) -> Dict[str, Any]:
    return {
        "name": name,
        "age": age,
        "hobbies": hobbies,
        "nickname": nickname or name,
    }

# dataclass (自动生成 __init__, __repr__ 等)
@dataclass
class User:
    name: str
    age: int
    hobbies: List[str]
    nickname: str | None = None  # Python 3.10+

# mypy 静态类型检查
# pip install mypy
# mypy script.py`,
            note: 'Python 的 dataclass 类似 PHP 的只读类或值对象，自动生成样板代码。| 语法 (Python 3.10+) 代替 Union[] 使类型提示更简洁。',
          },
          {
            title: '测试框架对比',
            php: `<?php
// PHPUnit 测试
use PHPUnit\\Framework\\TestCase;

class UserServiceTest extends TestCase
{
    private UserService $service;

    protected function setUp(): void
    {
        $this->service = new UserService();
    }

    public function testCreateUser(): void
    {
        $user = $this->service->create([
            'name' => '张三',
            'email' => 'z@test.com',
        ]);

        $this->assertInstanceOf(User::class, $user);
        $this->assertEquals('张三', $user->name);
        $this->assertNotEmpty($user->id);
    }

    public function testDuplicateEmail(): void
    {
        $this->expectException(ValidationException::class);
        $this->service->create([
            'name' => '李四',
            'email' => 'z@test.com',
        ]);
    }
}`,
            python: `# pytest 测试 (更简洁!)
import pytest
from app.service import UserService
from app.models import User

@pytest.fixture
def service():
    return UserService()

def test_create_user(service):
    user = service.create(
        name="张三",
        email="z@test.com",
    )

    assert isinstance(user, User)
    assert user.name == "张三"
    assert user.id is not None

def test_duplicate_email(service):
    with pytest.raises(ValidationException):
        service.create(
            name="李四",
            email="z@test.com",
        )

# 参数化测试 (pytest 独有!)
@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4),
    (3, 6),
    (10, 20),
])
def test_double(service, input, expected):
    assert service.double(input) == expected

# 运行: pytest -v`,
            note: 'pytest 不需要继承任何类，函数即测试用例。@pytest.mark.parametrize 参数化测试是 pytest 的杀手特性，比 PHPUnit 的 dataProvider 更简洁。',
          },
        ],
      },
      {
        title: 'pytest 测试框架深度指南',
        duration: '35 分钟',
        description: '深入对比 PHPUnit 和 pytest 测试框架。pytest 是 Python 测试生态的基石，比 PHPUnit 更简洁、更强大。',
        keyPoints: [
          'pytest 不需要继承 TestCase 类，普通函数即可作为测试',
          'assert 语句代替 assertEquals/assertInstanceOf 等断言方法',
          'fixture 是依赖注入式的测试辅助，比 setUp 更灵活',
          '@pytest.mark.parametrize 实现参数化测试',
          'pytest 插件生态丰富 (cov, mock, asyncio 等)',
        ],
        codeExamples: [
          {
            title: 'pytest vs PHPUnit 对比',
            php: `<?php
// PHPUnit: 必须继承 TestCase
use PHPUnit\\Framework\\TestCase;

class CalculatorTest extends TestCase
{
    private Calculator $calc;

    // 每个 test 方法前执行
    protected function setUp(): void
    {
        $this->calc = new Calculator();
    }

    // 断言方法
    public function testAdd(): void
    {
        $this->assertEquals(4, $this->calc->add(2, 2));
        $this->assertGreaterThan(3, $this->calc->add(2, 2));
        $this->assertIsInt($this->calc->add(2, 2));
    }

    // 测试异常
    public function testDivideByZero(): void
    {
        $this->expectException(\\InvalidArgumentException::class);
        $this->calc->divide(1, 0);
    }

    // 数据提供器
    public static function additionProvider(): array
    {
        return [
            [0, 0, 0],
            [1, 1, 2],
            [2, 3, 5],
        ];
    }

    #[\\PHPUnit\\Framework\\Attributes\\DataProvider('additionProvider')]
    public function testAddWithData(int $a, int $b, int $expected): void
    {
        $this->assertEquals($expected, $this->calc->add($a, $b));
    }
}`,
            python: `# pytest: 不需要继承任何类!
import pytest
from calculator import Calculator

# fixture 代替 setUp (更灵活的依赖注入)
@pytest.fixture
def calc():
    return Calculator()

# 直接用 assert (比 assertEquals 更简洁!)
def test_add(calc):
    assert calc.add(2, 2) == 4
    assert calc.add(2, 2) > 3
    assert isinstance(calc.add(2, 2), int)

# 测试异常
def test_divide_by_zero(calc):
    with pytest.raises(InvalidArgumentException):
        calc.divide(1, 0)

# 参数化测试 (比 dataProvider 简洁得多!)
@pytest.mark.parametrize("a,b,expected", [
    (0, 0, 0),
    (1, 1, 2),
    (2, 3, 5),
])
def test_add_with_data(calc, a, b, expected):
    assert calc.add(a, b) == expected

# fixture 的高级用法: scope 和 yield 清理
@pytest.fixture(scope="module")
def db_session():
    session = create_session()
    yield session  # 传给测试
    session.close()  # 测试后清理

# conftest.py: 共享 fixtures (不需要手动引入!)
# pytest 会自动发现同级目录的 conftest.py`,
            note: 'pytest 的核心理念是 "简单即美"。不需要继承类、不需要记 assert 方法名、fixture 提供了强大的依赖注入。conftest.py 是 pytest 的独特机制，可实现跨文件共享 fixtures。',
          },
          {
            title: 'pytest 常用命令与配置',
            php: `# PHPUnit 常用命令
./vendor/bin/phpunit                  # 运行所有测试
./vendor/bin/phpunit --filter testAdd  # 过滤测试
./vendor/bin/phpunit --stop-on-failure # 失败即停
./vendor/bin/phpunit --coverage-text   # 覆盖率

# phpunit.xml 配置
# <phpunit bootstrap="vendor/autoload.php">
#   <testsuites>
#     <testsuite name="Unit">
#       <directory>tests/Unit</directory>
#     </testsuite>
#   </testsuites>
# </phpunit>`,
            python: `# pytest 常用命令
pytest                              # 运行所有测试
pytest tests/test_calc.py           # 运行指定文件
pytest -k "test_add"                # 按名称过滤
pytest -x                           # 失败即停
pytest --cov=app                    # 覆盖率报告
pytest -v                           # 详细输出
pytest -s                           # 显示 print 输出

# pytest.ini 或 pyproject.toml 配置
# [tool.pytest.ini_options]
# testpaths = ["tests"]
# python_files = ["test_*.py"]
# python_functions = ["test_*"]
# addopts = "-v --cov=app"`,
            note: 'pytest 的命令行比 PHPUnit 更简洁，不需要写长长的命令路径。--cov 是覆盖率插件，需要安装 pytest-cov。pyproject.toml 是 Python 项目的现代配置文件标准。',
          },
        ],
      },
      {
        title: '标准库精选: collections/itertools',
        duration: '30 分钟',
        description: 'Python 标准库中的 collections 和 itertools 是数据处理利器，大幅减少代码量。对比 PHP 的数组函数，感受 Python 的优雅。',
        keyPoints: [
          'defaultdict: 带默认值的字典，避免 KeyError',
          'Counter: 计数器，统计元素出现次数',
          'namedtuple / dataclass: 轻量级数据容器',
          'itertools.chain: 链接多个可迭代对象',
          'itertools.groupby / combinations / product',
        ],
        codeExamples: [
          {
            title: 'collections vs PHP 数组函数',
            php: `<?php
// PHP: 统计单词频率
$text = "hello world hello python world hello";
$words = explode(" ", $text);
$freq = array_count_values($words);
// ["hello" => 3, "world" => 2, "python" => 1]
arsort($freq);  // 按频率降序

// PHP: 分组数据 (需要手动实现)
$users = [
    ["name" => "张三", "dept" => "技术"],
    ["name" => "李四", "dept" => "市场"],
    ["name" => "王五", "dept" => "技术"],
];
$groups = [];
foreach ($users as $user) {
    $dept = $user["dept"];
    $groups[$dept][] = $user["name"];
}
// ["技术" => ["张三", "王五"], "市场" => ["李四"]]

// PHP: 合并多个数组
$merged = array_merge($arr1, $arr2, $arr3);

// PHP: 笛卡尔积 (需要嵌套循环)
$sizes = ["S", "M", "L"];
$colors = ["红", "蓝"];
$combinations = [];
foreach ($sizes as $size) {
    foreach ($colors as $color) {
        $combinations[] = ["size" => $size, "color" => $color];
    }
}`,
            python: `from collections import Counter, defaultdict, namedtuple

# Counter: 统计词频 (一行搞定!)
text = "hello world hello python world hello"
freq = Counter(text.split())
# Counter({'hello': 3, 'world': 2, 'python': 1})
print(freq.most_common(2))  # [('hello', 3), ('world', 2)]

# defaultdict: 带默认值的字典 (无需判断 key 是否存在!)
from collections import defaultdict
users = [
    {"name": "张三", "dept": "技术"},
    {"name": "李四", "dept": "市场"},
    {"name": "王五", "dept": "技术"},
]
groups = defaultdict(list)
for user in users:
    groups[user["dept"]].append(user["name"])
# defaultdict(<class 'list'>, {'技术': ['张三', '王五'], '市场': ['李四']})
print(dict(groups))

# namedtuple: 轻量级数据类
Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)
print(p.x, p.y)          # 3 4
print(p[0] + p[1])       # 7 (支持索引访问)

# itertools.chain: 合并多个可迭代对象
from itertools import chain
merged = list(chain([1, 2], [3, 4], [5, 6]))

# itertools.product: 笛卡尔积
from itertools import product
sizes = ["S", "M", "L"]
colors = ["红", "蓝"]
combinations = [{"size": s, "color": c} for s, c in product(sizes, colors)]
# [{'size': 'S', 'color': '红'}, {'size': 'S', 'color': '蓝'}, ...]`,
            note: 'Python 的 Counter 和 defaultdict 是 PHP 开发者最容易爱上的工具。PHP 需要 array_count_values + 手动分组，Python 只需 Counter 和 defaultdict 各一行。',
          },
          {
            title: 'itertools 更多实用工具',
            php: `<?php
// PHP: 组合 (C(3,2) = 3 种)
$items = ["A", "B", "C"];
$combinations = [];
for ($i = 0; $i < count($items); $i++) {
    for ($j = $i + 1; $j < count($items); $j++) {
        $combinations[] = [$items[$i], $items[$j]];
    }
}
// [["A","B"], ["A","C"], ["B","C"]]

// PHP: 排列 (需要递归实现)
function permutations(array $items): array {
    if (count($items) <= 1) return [$items];
    $result = [];
    foreach ($items as $i => $item) {
        $rest = array_values(array_diff_key($items, [$i => 0]));
        foreach (permutations($rest) as $perm) {
            $result[] = array_merge([$item], $perm);
        }
    }
    return $result;
}

// PHP: 分组连续相同元素 (需要手动实现)
$data = [1, 1, 2, 3, 3, 3, 2, 2];
$groups = [];
$current = null;
foreach ($data as $val) {
    if ($val !== $current) {
        $groups[] = [];
        $current = $val;
    }
    $groups[count($groups) - 1][] = $val;
}`,
            python: `from itertools import combinations, permutations, groupby

# combinations: 组合 C(n, r)
from itertools import combinations
items = ["A", "B", "C"]
print(list(combinations(items, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# permutations: 排列 P(n, r)
from itertools import permutations
print(list(permutations(items, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]

# groupby: 分组连续相同元素 (必须先排序!)
from itertools import groupby
data = [1, 1, 2, 3, 3, 3, 2, 2]
for key, group in groupby(data):
    print(f"{key}: {list(group)}")
# 1: [1, 1]
# 2: [2]
# 3: [3, 3, 3]
# 2: [2, 2]

# accumulate: 累加/累乘
from itertools import accumulate
import operator
data = [1, 2, 3, 4, 5]
print(list(accumulate(data)))                    # [1, 3, 6, 10, 15]
print(list(accumulate(data, operator.mul)))      # [1, 2, 6, 24, 120]`,
            note: 'itertools 是 Python 的"瑞士军刀"。combinations 和 permutations 在 PHP 中需要复杂递归实现，Python 标准库一行搞定。groupby 注意要先排序。',
          },
        ],
      },
      {
        title: '综合实战: 构建待办事项 REST API',
        duration: '60 分钟',
        description: '综合运用前 7 个模块的知识，从零构建一个完整的待办事项 REST API。这是课程的终极实战项目，涵盖 FastAPI 路由、Pydantic 数据验证、SQLAlchemy ORM、JWT 认证、依赖注入、全局异常处理和 pytest 测试。',
        keyPoints: [
          '项目结构: app/main.py 入口, app/models.py 模型, app/schemas.py 数据模式, app/routers/ 路由',
          'Pydantic schema 分离请求/响应模型，类似 Laravel FormRequest + Resource',
          'SQLAlchemy CRUD 封装在服务层，路由层只负责 HTTP 逻辑',
          'JWT 认证保护部分路由，公共路由无需认证',
          'pytest + httpx 测试 API 端点，替代 PHPUnit HTTP 测试',
        ],
        codeExamples: [
          {
            title: '项目结构与核心代码',
            php: `<?php
// Laravel: 待办事项项目结构
// app/
// ├── Http/Controllers/TaskController.php
// ├── Models/Task.php
// ├── Http/Requests/StoreTaskRequest.php
// └── Http/Resources/TaskResource.php
// routes/api.php
// database/migrations/

class TaskController extends Controller
{
    public function index(Request $request) {
        return TaskResource::collection(
            $request->user()->tasks()->paginate(15)
        );
    }

    public function store(StoreTaskRequest $request) {
        return new TaskResource(
            $request->user()->tasks()->create($request->validated())
        );
    }

    public function destroy(Task $task) {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->noContent();
    }
}`,
            python: `# 项目结构:
# todo_api/
# ├── main.py           # FastAPI 入口
# ├── models.py         # SQLAlchemy 模型
# ├── schemas.py        # Pydantic 请求/响应模式
# ├── database.py       # 数据库连接
# ├── auth.py           # JWT 认证
# ├── routers/
# │   ├── tasks.py      # 任务路由
# │   └── auth.py       # 认证路由
# └── tests/
#     └── test_tasks.py # pytest 测试

# schemas.py — 数据验证层 (类似 FormRequest + Resource)
from pydantic import BaseModel, Field
from datetime import datetime

class TaskCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = ""
    priority: int = Field(default=1, ge=1, le=5)

class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    priority: int
    is_completed: bool
    created_at: datetime

    class Config:
        from_attributes = True

# models.py — 数据模型层
class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text, default="")
    priority: Mapped[int] = mapped_column(default=1)
    is_completed: Mapped[bool] = mapped_column(default=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))

# routers/tasks.py — 路由层 (只负责 HTTP 逻辑)
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter(prefix="/api/tasks", tags=["tasks"])

@router.get("/", response_model=list[TaskResponse])
async def list_tasks(
    user=Depends(get_current_user),
    session: Session = Depends(get_session),
):
    stmt = select(Task).where(Task.user_id == user.id).order_by(Task.created_at.desc())
    return session.scalars(stmt).all()

@router.post("/", response_model=TaskResponse, status_code=201)
async def create_task(
    data: TaskCreate,
    user=Depends(get_current_user),
    session: Session = Depends(get_session),
):
    task = Task(**data.model_dump(), user_id=user.id)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

@router.delete("/{task_id}", status_code=204)
async def delete_task(
    task_id: int,
    user=Depends(get_current_user),
    session: Session = Depends(get_session),
):
    task = session.get(Task, task_id)
    if not task or task.user_id != user.id:
        raise HTTPException(404, "任务不存在")
    session.delete(task)
    session.commit()`,
            note: 'FastAPI 项目的分层结构与 Laravel 类似: schemas.py ≈ FormRequest + Resource，models.py ≈ Eloquent Model，routers/ ≈ Controller。Pydantic 自动验证请求体并生成 OpenAPI 文档，SQLAlchemy 负责数据库操作，依赖注入负责认证和会话管理。',
          },
          {
            title: 'pytest 测试 API',
            php: `<?php
// Laravel: PHPUnit HTTP 测试
class TaskTest extends TestCase
{
    public function test_can_create_task(): void
    {
        $response = $this->postJson('/api/tasks', [
            'title' => '学习 Python',
            'priority' => 3,
        ]);

        $response->assertStatus(201)
            ->assertJson(['title' => '学习 Python']);
    }

    public function test_requires_auth(): void
    {
        $this->getJson('/api/tasks')
            ->assertStatus(401);
    }
}`,
            python: `# tests/test_tasks.py — pytest + httpx 测试
import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.fixture
async def client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test",
    ) as c:
        yield c

@pytest.fixture
async def auth_client(client):
    # 注册并登录获取 token
    await client.post("/api/auth/register", json={
        "email": "test@example.com", "password": "123456",
    })
    resp = await client.post("/api/auth/login", json={
        "email": "test@example.com", "password": "123456",
    })
    token = resp.json()["access_token"]
    client.headers["Authorization"] = f"Bearer {token}"
    return client

@pytest.mark.asyncio
async def test_create_task(auth_client):
    resp = await auth_client.post("/api/tasks", json={
        "title": "学习 Python",
        "priority": 3,
    })
    assert resp.status_code == 201
    data = resp.json()
    assert data["title"] == "学习 Python"
    assert data["priority"] == 3
    assert "id" in data

@pytest.mark.asyncio
async def test_list_tasks(auth_client):
    # 先创建任务
    await auth_client.post("/api/tasks", json={"title": "Task 1"})
    await auth_client.post("/api/tasks", json={"title": "Task 2"})

    resp = await auth_client.get("/api/tasks")
    assert resp.status_code == 200
    assert len(resp.json()) == 2

@pytest.mark.asyncio
async def test_unauthorized_access(client):
    resp = await client.get("/api/tasks")
    assert resp.status_code == 401

@pytest.mark.asyncio
async def test_delete_task(auth_client):
    # 创建任务
    resp = await auth_client.post("/api/tasks", json={"title": "To Delete"})
    task_id = resp.json()["id"]

    # 删除任务
    resp = await auth_client.delete(f"/api/tasks/{task_id}")
    assert resp.status_code == 204

    # 确认已删除
    resp = await auth_client.get("/api/tasks")
    assert len(resp.json()) == 0

# 运行: pytest tests/ -v`,
            note: 'pytest + httpx 是 FastAPI 项目的标准测试方案。ASGITransport 让测试直接调用 FastAPI 应用，无需启动服务器，测试速度极快。fixture 复用认证逻辑，@pytest.mark.asyncio 支持异步测试。相比 PHPUnit，pytest 的断言语法更简洁(assert 直接断言，无需 $this->assertXxx())。',
          },
        ],
      },
    ],
  },
];

export const phpToPythonMap = [
  { php: '$variable', python: 'variable', note: '去掉 $ 前缀' },
  { php: 'echo / print', python: 'print()', note: '统一用 print 函数' },
  { php: '. (字符串拼接)', python: 'f-string / +', note: '推荐使用 f-string' },
  { php: 'array()', python: '[] / {} / ()', note: '列表/字典/元组' },
  { php: 'array_push()', python: 'list.append()', note: '方法调用代替函数' },
  { php: 'count()', python: 'len()', note: '内置函数' },
  { php: 'isset()', python: "'key' in dict / is not None" },
  { php: 'empty()', python: 'not value' },
  { php: 'null', python: 'None', note: '首字母大写' },
  { php: 'true / false', python: 'True / False', note: '首字母大写' },
  { php: '&& / || / !', python: 'and / or / not', note: '更自然的关键词' },
  { php: 'elseif', python: 'elif', note: '缩写不同' },
  { php: 'foreach ($arr as $v)', python: 'for v in arr:', note: '更简洁' },
  { php: 'function', python: 'def', note: '定义函数' },
  { php: '__construct', python: '__init__', note: '构造函数' },
  { php: '$this', python: 'self', note: '引用当前实例' },
  { php: '->', python: '.', note: '对象访问' },
  { php: '::', python: '.', note: '类访问' },
  { php: 'try/catch', python: 'try/except', note: '异常处理' },
  { php: 'require/include', python: 'import', note: '引入模块' },
  { php: 'use Namespace\\Class', python: 'from module import Class' },
  { php: 'composer require', python: 'pip install / poetry add' },
  { php: '// 注释', python: '# 注释', note: '单行注释' },
  { php: '/* */ 注释', python: '""" """ 注释', note: '多行/文档注释' },
  { php: 'sprintf()', python: 'f-string', note: 'f"{var}" 更简洁强大' },
  { php: 'json_encode/json_decode', python: 'json.dumps/json.loads', note: 'json 模块' },
  { php: 'array_map()', python: 'map() / 列表推导式', note: '推荐列表推导式' },
  { php: 'array_filter()', python: 'filter() / 列表推导式', note: '推荐列表推导式' },
  { php: 'usort($arr, fn)', python: 'sorted(arr, key=)', note: 'key 参数更优雅' },
  { php: 'array_combine()', python: 'dict(zip(keys, values))', note: 'zip 创建字典' },
  { php: 'fn($x) => $x * 2', python: 'lambda x: x * 2', note: 'lambda 只能单行' },
  { php: 'static method', python: '@staticmethod / @classmethod', note: '装饰器代替关键字' },
  { php: 'new static()', python: 'cls() in @classmethod', note: '工厂模式' },
  { php: 'class with __construct', python: '@dataclass', note: '自动生成样板代码' },
  { php: 'Eloquent ORM', python: 'SQLAlchemy 2.0', note: 'Python 主流 ORM' },
  { php: 'PHPUnit', python: 'pytest', note: '更简洁的测试框架' },
  { php: '...$args (解包)', python: '*args / **kwargs', note: 'Python 解包更灵活' },
];

export const learningPath = [
  { day: '1', title: '环境搭建', milestones: ['安装 Python', '配置 VS Code', '创建虚拟环境', '运行 Hello World', 'REPL 交互模式', 'pip 常用命令'], color: '#10b981' },
  { day: '2-3', title: '基础语法', milestones: ['变量与类型', '字符串操作', '运算符', 'f-string 格式化', '正则表达式'], color: '#f59e0b' },
  { day: '4-5', title: '控制流与数据结构', milestones: ['条件语句', '循环', '列表/字典', '元组/集合', '列表推导式', 'zip/map/filter', 'collections 容器', '深浅拷贝'], color: '#06b6d4' },
  { day: '6-7', title: '函数编程', milestones: ['函数定义', 'Lambda', '装饰器', '模块与包管理'], color: '#8b5cf6' },
  { day: '8-10', title: '面向对象', milestones: ['类与继承', '魔术方法', '类方法/静态方法', 'dataclass 数据类'], color: '#ef4444' },
  { day: '11-12', title: '异常与文件', milestones: ['异常处理', '上下文管理器', '文件读写', 'JSON 处理'], color: '#14b8a6' },
  { day: '13-15', title: 'Web 开发', milestones: ['FastAPI 入门', '模板引擎', 'ORM 操作', 'JWT 认证', 'CORS/中间件', '文件上传'], color: '#f97316' },
  { day: '16-20', title: '高级实战', milestones: ['生成器', '异步编程', 'pytest 测试', 'collections/itertools', '综合实战: REST API'], color: '#d946ef' },
];
