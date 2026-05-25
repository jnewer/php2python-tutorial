import type { QuizQuestion } from '@/components/course/quiz';

// Quiz questions keyed by "moduleId-lessonIndex"
export const quizData: Record<string, QuizQuestion[]> = {
  // Module 1: 环境搭建与快速入门
  '1-0': [
    {
      id: 'm1l1q1',
      question: 'Python 使用什么来定义代码块？',
      options: ['花括号 {}', '缩进 (indentation)', 'begin/end 关键字', '方括号 []'],
      correctIndex: 1,
      explanation: 'Python 使用统一的缩进来定义代码块，这区别于 PHP 使用的花括号 {}。推荐使用 4 个空格缩进。',
    },
    {
      id: 'm1l1q2',
      question: 'Python 中如何格式化字符串？',
      options: ['sprintf()', 'f"Hello, {name}"', 'echo "Hello, $name"', 'String.format()'],
      correctIndex: 1,
      explanation: 'Python 的 f-string（f"..."）是格式化字符串最推荐的方式，类似于 PHP 的双引号字符串插值，但功能更强大。',
    },
  ],
  // Module 2: 基础语法对比
  '2-0': [
    {
      id: 'm2l1q1',
      question: 'PHP 变量以 $ 开头，Python 变量如何声明？',
      options: ['以 var 开头', '以 let 开头', '直接使用变量名', '以 def 开头'],
      correctIndex: 2,
      explanation: 'Python 变量不需要任何前缀或关键字，直接写变量名即可赋值，如 name = "Alice"。',
    },
    {
      id: 'm2l1q2',
      question: 'Python 中 None 对应 PHP 中的什么？',
      options: ['false', 'null', 'undefined', 'empty'],
      correctIndex: 1,
      explanation: 'Python 的 None 对应 PHP 的 null，但注意 Python 中 None 首字母大写。',
    },
  ],
  // Module 3: 控制流与数据结构
  '3-0': [
    {
      id: 'm3l1q1',
      question: 'Python 的条件语句 elif 对应 PHP 中的？',
      options: ['else if', 'elseif', 'elif', 'else when'],
      correctIndex: 1,
      explanation: 'Python 使用 elif（不是 elseif），这是必须记住的关键区别。',
    },
  ],
  // Module 4: 函数与模块化
  '4-0': [
    {
      id: 'm4l1q1',
      question: 'Python 使用哪个关键字定义函数？',
      options: ['function', 'def', 'fn', 'func'],
      correctIndex: 1,
      explanation: 'Python 使用 def 关键字定义函数，如 def hello():，而 PHP 使用 function。',
    },
  ],
  // Module 5: 面向对象编程
  '5-0': [
    {
      id: 'm5l1q1',
      question: 'Python 的构造函数叫什么？',
      options: ['__construct', '__init__', 'initialize', 'constructor'],
      correctIndex: 1,
      explanation: 'Python 使用 __init__ 作为构造函数（双下划线 init 双下划线），对应 PHP 的 __construct。',
    },
    {
      id: 'm5l1q2',
      question: 'Python 中访问实例属性和方法使用什么符号？',
      options: ['->', '.', '::', '#'],
      correctIndex: 1,
      explanation: 'Python 统一使用 . 访问属性和方法，不同于 PHP 的 -> 访问实例成员、:: 访问静态成员。',
    },
  ],
};
