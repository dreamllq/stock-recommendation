# Stock Recommendation

股票推荐系统

## 技术栈

- 前端: Vue 3 + Vite + TypeScript + Element Plus
- 后端: NestJS + TypeScript + Prisma + SQLite

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发环境（前后端同时启动）
pnpm dev

# 构建
pnpm build
```

## 项目结构

```
stock-recommendation/
├── client/          # Vue 3 前端
│   ├── src/
│   │   ├── views/   # 页面组件
│   │   ├── router/  # 路由配置
│   │   └── assets/  # 静态资源
│   └── vite.config.ts
├── server/          # NestJS 后端
│   ├── src/
│   │   ├── prisma/  # Prisma 服务封装
│   │   └── ...
│   └── prisma/
│       └── schema.prisma
├── package.json     # Monorepo 根配置
└── pnpm-workspace.yaml
```
