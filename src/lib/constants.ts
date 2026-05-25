import { BarChart3, TrendingUp, Layers, Terminal } from 'lucide-react';

export const HEADER_HEIGHT = 56;

export const STORAGE_KEY_PROGRESS = 'php-python-course-progress';

export const NAV_ITEMS = [
  { id: 'overview', label: '课程概览', icon: BarChart3 },
  { id: 'roadmap', label: '学习路线', icon: TrendingUp },
  { id: 'modules', label: '课程模块', icon: Layers },
  { id: 'cheatsheet', label: '速查表', icon: Terminal },
] as const;

export const DIFF_COLORS: Record<string, string> = {
  '入门': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  '基础': 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  '进阶': 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  '高级': 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
};

export const DIFFICULTY_OPTIONS = ['全部', '入门', '基础', '进阶', '高级'] as const;

export const QUICK_TIPS = [
  {
    icon: Terminal,
    title: '安装 Python',
    tips: [
      { label: 'python.org 下载安装', url: 'https://www.python.org/downloads/' },
      { label: 'VS Code + Python 扩展', url: 'https://code.visualstudio.com/docs/languages/python' },
      { label: '使用 venv 隔离环境', url: 'https://docs.python.org/3/library/venv.html' },
    ],
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    icon: Terminal,
    title: '常用命令',
    tips: [
      { label: 'pip install 包名', url: 'https://docs.python.org/3/pip/commands.html#install' },
      { label: 'python script.py' },
      { label: 'pip freeze > requirements.txt', url: 'https://pip.pypa.io/en/stable/cli/pip_freeze/' },
    ],
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: Terminal,
    title: '学习资源',
    tips: [
      { label: 'FastAPI 官方文档', url: 'https://fastapi.tiangolo.com' },
      { label: 'Python 官方文档', url: 'https://docs.python.org/3/' },
      { label: 'LeetCode 刷题练习', url: 'https://leetcode.cn' },
    ],
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-500/10',
  },
] as const;

export const TIP_ICONS = {
  '安装 Python': Terminal,
  '常用命令': Terminal,
  '学习资源': Terminal,
} as const;
