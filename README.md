# PHP to Python — 快速进阶教程

> 专为有 PHP 经验的开发者设计的 Python 交互式学习课程，通过对比学习法快速掌握 Python。

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)

## 特性

-   **8 大核心模块，39 个课时** — 从环境搭建到高级实战，系统化的学习路径
-   **63 组 PHP vs Python 代码对比** — 每个知识点都有左右对照的代码示例，直观感受语法差异
-   **37 条 PHP → Python 语法速查表** — 最常用的语法对照，随时搜索查阅
-   **20 天学习路线图** — 循序渐进的学习计划，合理分配学习节奏
-   **课后测验** — 每个模块配套选择题，即时反馈，巩固知识点
-   **交互式学习体验** — 课时完成进度追踪、搜索过滤、难度筛选、Python 代码在线运行
-   **进度管理** — 进度本地自动保存，支持 JSON 导出/导入，跨设备迁移
-   **响应式设计** — 桌面端 / 移动端自适应，含底部导航 + 安全区适配
-   **亮色 / 暗色主题** — 支持一键切换，跟随系统偏好，自动记忆
-   **离线进度保存** — 学习进度自动保存到浏览器本地存储

## 课程大纲

| 模块 | 内容 | 课时 | 代码对比 |
| :--- | :--- | --: | --: |
| 1. 环境搭建与快速入门 | Python 安装、开发环境配置、运行方式 | 3 | 5 |
| 2. 基础语法对比 | 变量、类型、字符串、运算符、f-string | 4 | 7 |
| 3. 控制流与数据结构 | 条件、循环、列表、字典、元组、集合、推导式 | 7 | 13 |
| 4. 函数与模块化 | 函数定义、参数、Lambda、装饰器、包管理 | 5 | 7 |
| 5. 面向对象编程 | 类、继承、魔术方法、dataclass | 6 | 8 |
| 6. 异常处理与文件操作 | try/except、上下文管理器、文件读写、JSON | 4 | 6 |
| 7. Web 开发入门 | FastAPI、模板引擎、ORM、JWT 认证 | 4 | 7 |
| 8. 高级特性与实战 | 生成器、异步编程、pytest、综合实战 | 6 | 10 |
| **合计** | | **39** | **63** |

## 技术栈

| 类别 | 技术 | 版本 |
| :--- | :--- | :--- |
| 框架 | [Next.js](https://nextjs.org/) (App Router) | 16.x |
| 语言 | [TypeScript](https://www.typescriptlang.org/) | 5.9 |
| UI 库 | [React](https://react.dev/) | 19.x |
| 样式 | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | 4.x |
| 动画 | [Framer Motion](https://www.framer.com/motion/) | 12.x |
| 主题 | [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 |
| 运行时 | [Bun](https://bun.sh/) | — |
| 图标 | [lucide-react](https://lucide.dev/) | 0.5 |

## 快速开始

### 环境要求

-   [Bun](https://bun.sh/) >= 1.0
-   Python >= 3.8（代码在线运行功能需要）

### 安装与运行

```bash
# 克隆仓库
git clone https://github.com/jnewer/php2python-tutorial.git
cd php2python-tutorial

# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
# 构建
bun run build

# 启动生产服务
bun run start
```

生产环境默认监听 3000 端口。

### WebSocket 示例（教学用途）

项目包含一个 WebSocket 聊天室示例：

```bash
# 启动 WebSocket 服务器
bun run ws:server
```

示例代码位于 `examples/websocket/` 目录下。

## 部署

### Docker

```dockerfile
FROM oven/bun:1 AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["bun", ".next/standalone/server.js"]
```

```bash
docker build -t php2python-tutorial .
docker run -p 3000:3000 php2python-tutorial
```

### Nginx / Caddy 反向代理

项目提供 `Caddyfile` 示例，开箱即用。也可使用 Nginx：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 项目结构

```
src/
├── app/
│   ├── api/
│   │   ├── route.ts               # Health-check API
│   │   └── execute/
│   │       └── route.ts           # Python 代码在线运行 API
│   ├── page.tsx                    # 主页面
│   ├── layout.tsx                  # 根布局（主题 Provider + Skip-to-Content）
│   └── globals.css                 # 全局样式 + Tailwind v4 配置
├── components/
│   ├── course/                     # 课程通用组件 (11 个)
│   │   ├── animated-counter.tsx    #   数字滚动动画
│   │   ├── celebration-overlay.tsx #   模块完成庆祝
│   │   ├── code-block.tsx          #   代码块（高亮 / 复制 / 运行）
│   │   ├── code-comparison-panel.tsx # PHP vs Python 对照面板
│   │   ├── fade-in.tsx             #   入场渐变动画
│   │   ├── learning-path-timeline.tsx # 学习路线时间线
│   │   ├── module-card.tsx         #   课程模块卡片
│   │   ├── quiz.tsx                #   课后测验
│   │   ├── scroll-to-top.tsx       #   回到顶部
│   │   ├── theme-toggle.tsx        #   亮色/暗色切换
│   │   └── toast.tsx               #   全局 Toast 提示
│   ├── sections/                   # 页面区块组件 (7 个)
│   │   ├── hero-section.tsx        #   首屏英雄区
│   │   ├── stats-section.tsx       #   统计展示
│   │   ├── roadmap-section.tsx     #   学习路线图
│   │   ├── modules-section.tsx     #   课程模块列表
│   │   ├── cheatsheet-section.tsx  #   语法速查表
│   │   ├── navigation-bar.tsx      #   导航栏（含进度条 / 移动端底部导航）
│   │   └── footer-section.tsx      #   页脚
│   └── ui/                         # shadcn/ui 组件库 (8 个)
├── hooks/
│   ├── use-hydrated.ts             #   客户端 hydration 检测
│   ├── use-mobile.ts               #   移动端检测
│   └── use-prefers-reduced-motion.ts # 减少动画偏好
├── lib/
│   ├── cheatsheet-data.ts          #   语法速查表数据 (37 条)
│   ├── constants.ts                #   共享常量
│   ├── course-data.ts              #   课程核心数据 (8 模块 39 课时)
│   ├── learning-path-data.ts       #   学习路线数据
│   ├── progress-store.ts           #   学习进度持久化
│   ├── quiz-data.ts                #   课后测验数据 (5 模块)
│   ├── syntax-highlight.tsx        #   零依赖 PHP/Python 语法高亮
│   └── utils.ts                    #   tailwind-merge 工具函数
examples/
└── websocket/                      # WebSocket 聊天室示例
    ├── frontend.tsx
    └── server.ts
```

## 自定义

### 修改课程内容

编辑 `src/lib/course-data.ts`，按现有 `Module` / `Lesson` 格式添加或修改模块和课时数据。

### 修改速查表

编辑 `src/lib/cheatsheet-data.ts`，在 `phpToPythonMap` 数组中添加新的 PHP → Python 语法对照条目。

### 修改测验题目

编辑 `src/lib/quiz-data.ts`，按 `"模块ID-课时索引"` 的 key 格式添加 `QuizQuestion[]`。

### 修改主题配色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
    --primary: ...;
    --background: ...;
    /* ... */
}
```

## 开发

```bash
# 代码检查
bun run lint

# 开发模式（热更新）
bun run dev
```

## License

MIT
