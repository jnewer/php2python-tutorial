# PHP to Python - 快速进阶教程

> 专为有 PHP 经验的开发者设计的 Python 交互式学习课程，通过对比学习法快速掌握 Python。

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black)

## 特性

- **8 大核心模块，36 个课时** — 从环境搭建到高级实战，系统化的学习路径
- **PHP vs Python 代码对比** — 每个知识点都有左右对照的代码示例，直观感受语法差异
- **20 天学习路线图** — 循序渐进的学习计划，合理分配学习节奏
- **PHP → Python 语法速查表** — 最常用的语法对照，随时查阅
- **交互式学习体验** — 课时完成进度追踪、搜索过滤、难度筛选
- **响应式设计** — 完美适配桌面端和移动端
- **亮色/暗色主题** — 支持一键切换，自动记忆偏好
- **离线进度保存** — 学习进度自动保存到浏览器本地存储

## 课程大纲

| 模块 | 内容 | 课时 |
|------|------|------|
| 1. 环境搭建与快速入门 | Python 安装、开发环境配置、运行方式 | 3 |
| 2. 基础语法对比 | 变量、类型、字符串、运算符、f-string | 4 |
| 3. 控制流与数据结构 | 条件、循环、列表、字典、元组、集合、推导式 | 7 |
| 4. 函数与模块化 | 函数定义、参数、Lambda、装饰器、包管理 | 5 |
| 5. 面向对象编程 | 类、继承、魔术方法、dataclass | 6 |
| 6. 异常处理与文件操作 | try/except、上下文管理器、文件读写、JSON | 4 |
| 7. Web 开发入门 | FastAPI、模板引擎、ORM、JWT 认证 | 4 |
| 8. 高级特性与实战 | 生成器、异步编程、pytest、综合实战 | 6 |

## 技术栈

- **框架**: [Next.js 16](https://nextjs.org/) (App Router)
- **语言**: TypeScript 5
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **动画**: [Framer Motion](https://www.framer.com/motion/)
- **主题**: [next-themes](https://github.com/pacocoursey/next-themes)
- **运行时**: [Bun](https://bun.sh/)

## 快速开始

### 环境要求

- Node.js >= 18 或 Bun >= 1.0
- Python >= 3.8（代码运行功能需要）

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

### WebSocket 示例

项目包含一个 WebSocket 聊天室示例（教学用途）：

```bash
# 启动 WebSocket 服务器
bun run ws:server
```

示例代码位于 `examples/websocket/` 目录下。

## 部署

### Docker

```dockerfile
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN corepack enable bun && bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable bun && bun run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```bash
docker build -t php2python-tutorial .
docker run -p 3000:3000 php2python-tutorial
```

### Nginx 反向代理

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
│   │   └── route.ts        # Health-check API
│   ├── page.tsx             # 主页面
│   ├── layout.tsx           # 根布局（主题 Provider）
│   └── globals.css          # 全局样式 + Tailwind v4 配置
├── components/
│   ├── course/              # 课程组件
│   │   ├── animated-counter.tsx
│   │   ├── celebration-overlay.tsx
│   │   ├── code-block.tsx
│   │   ├── code-comparison-panel.tsx
│   │   ├── fade-in.tsx
│   │   ├── learning-path-timeline.tsx
│   │   ├── module-card.tsx
│   │   ├── scroll-to-top.tsx
│   │   ├── theme-toggle.tsx
│   │   └── toast.tsx
│   └── ui/                  # shadcn/ui 组件库
├── hooks/
│   ├── use-hydrated.ts
│   ├── use-prefers-reduced-motion.ts
│   └── use-toast.ts
├── lib/
│   ├── constants.ts         # 共享常量
│   ├── course-data.ts       # 课程数据（8模块36课时 + 速查表 + 学习路径）
│   ├── db.ts                # Prisma 客户端（待数据库集成使用）
│   ├── progress-store.ts    # 学习进度持久化
│   └── utils.ts             # 工具函数
examples/
├── websocket/               # WebSocket 聊天室示例
│   ├── frontend.tsx
│   └── server.ts
prisma/
└── schema.prisma            # 数据库 Schema（预留）
```

## 自定义

### 修改课程内容

编辑 `src/lib/course-data.ts`，按现有格式添加或修改模块和课时数据。

### 修改主题配色

编辑 `src/app/globals.css` 中的 CSS 变量：

```css
:root {
  --primary: ...;
  --background: ...;
  /* ... */
}
```

### 修改速查表

在 `src/lib/course-data.ts` 的 `phpToPythonMap` 数组中添加新的语法对照条目。

## 开发

```bash
# 代码检查
bun run lint

# 开发模式（热更新）
bun run dev
```

## License

MIT
