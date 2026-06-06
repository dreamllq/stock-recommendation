# 初始化 Stock Recommendation 全栈项目

## TL;DR

> **Quick Summary**: 在空仓库中搭建 Vue 3 + NestJS 全栈项目脚手架，采用 pnpm monorepo 结构，配置完整的开发工具链。
> 
> **Deliverables**:
> - Monorepo 根配置（pnpm workspaces + concurrently 开发脚本）
> - Vue 3 前端（Vite + TypeScript + Vue Router + Pinia + Element Plus）
> - NestJS 后端（TypeScript + Prisma + SQLite）
> - 代码质量工具（ESLint + Prettier + Husky + lint-staged）
> - Vite API 代理配置
> 
> **Estimated Effort**: Quick → Short
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Task 1 → Task 2/3 (并行) → Task 4 → Task 5 → F1-F4

---

## Context

### Original Request
用户要求初始化一个前后端项目：前端使用 Vue 3，后端使用 NestJS。项目名为 stock-recommendation（股票推荐系统）。

### Interview Summary
**Key Discussions**:
- 项目结构：选择 Monorepo（/client + /server）
- 包管理器：pnpm
- 前端工具链：Vite + TypeScript + Vue Router + Pinia + Element Plus
- 后端工具链：NestJS + TypeScript + Prisma + SQLite
- 代码规范：ESLint + Prettier + Git hooks（基础配置）

**Research Findings**:
- 项目当前为空仓库，仅有 .git, LICENSE, README.md
- pnpm 尚未安装，需通过 corepack 启用
- 平台为 Windows（win32），需注意路径和脚本兼容性

### Metis Review
**Identified Gaps** (addressed):
- pnpm 未安装 → 第一个任务包含 corepack enable pnpm
- 需要配置 Vite API 代理 → 已纳入前端任务
- Windows 兼容性 → 所有脚本避免 POSIX-only 命令
- Element Plus 自动导入 → 已纳入前端配置步骤
- 范围蔓延风险 → 设置明确的 Must NOT Have 清单

---

## Work Objectives

### Core Objective
搭建一个可以立即运行的全栈项目脚手架，前后端均能独立启动和构建，开发体验流畅。

### Concrete Deliverables
- `package.json` — 根 monorepo 配置（workspaces + scripts）
- `client/` — Vue 3 前端完整项目
- `server/` — NestJS 后端完整项目
- `server/prisma/schema.prisma` — 示例 Prisma 模型
- `.gitignore` — 覆盖 node_modules, dist, *.db, .env
- `.husky/pre-commit` — Git pre-commit hook
- ESLint + Prettier 配置文件

### Definition of Done
- [ ] `pnpm install` 成功，无错误
- [ ] `pnpm dev` 同时启动前端(Vite :5173)和后端(NestJS :3000)
- [ ] `pnpm --filter client build` 构建成功
- [ ] `pnpm --filter server build` 构建成功
- [ ] `curl http://localhost:5173/` 返回 Vue 应用 HTML
- [ ] `curl http://localhost:3000/` 返回 JSON 响应
- [ ] `pnpm --filter client lint` 通过
- [ ] `pnpm --filter server lint` 通过
- [ ] Git pre-commit hook 触发 lint-staged

### Must Have
- pnpm workspaces 配置正确的 monorepo 结构
- Vite 开发代理 `/api` → `http://localhost:3000`
- Vue Router 至少一个示例路由（`/` → HomeView）
- Pinia 在 main.ts 中注册
- Element Plus 自动导入配置（unplugin-auto-import + unplugin-vue-components）
- NestJS 至少一个示例端点 `GET /` → `{ message: 'Hello World' }`
- Prisma 连接 SQLite，至少一个示例模型证明连接有效
- `.gitignore` 覆盖所有必要模式
- ESLint + Prettier 各 workspace 独立配置
- Husky + lint-staged 根级 pre-commit hook
- TypeScript strict mode 在两个 workspace 中启用
- `"packageManager"` 字段在根 package.json 中指定 pnpm 版本

### Must NOT Have (Guardrails)
- ❌ 不安装图表库（ECharts 等）
- ❌ 不实现认证/鉴权（JWT、Guards、登录页）
- ❌ 不创建业务数据模型（股票、用户等），仅一个 Prisma 占位模型
- ❌ 不配置 Swagger/OpenAPI
- ❌ 不配置 Docker/容器化
- ❌ 不配置 CI/CD
- ❌ 不配置测试框架（Jest、Vitest）
- ❌ 不配置 WebSocket/实时数据
- ❌ 不集成外部 API（股票数据 API）
- ❌ 不做生产构建优化/部署配置
- ❌ 不做自定义 Element Plus 主题
- ❌ 不配置 commitlint（仅 pre-commit lint）
- ❌ 不使用 TypeScript project references（保持 tsconfig 独立）
- ❌ 不创建共享 types 包或内部库

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** - ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: NO（全新项目）
- **Automated tests**: None（不在范围内）
- **Framework**: N/A
- **Focus**: Agent-executed QA scenarios（启动验证 + 构建验证 + API 调用验证）

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Frontend/UI**: Use Playwright (playwright skill) - 导航、截图验证
- **API/Backend**: Use Bash (curl) - 发送请求、验证响应
- **Build**: Use Bash - 运行构建命令、验证输出

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — 根 monorepo + pnpm):
└── Task 1: Monorepo 根配置 + pnpm 启用 + .gitignore [quick]

Wave 2 (After Wave 1 — 前后端并行搭建):
├── Task 2: NestJS 后端脚手架 + Prisma/SQLite [unspecified-high]
└── Task 3: Vue 3 前端脚手架 + Element Plus + Vite 代理 [visual-engineering]

Wave 3 (After Wave 2 — 代码质量 + 集成):
├── Task 4: ESLint + Prettier + Husky + lint-staged 配置 [quick]
└── Task 5: 端到端集成验证 + concurrently 开发脚本 [quick]

Wave FINAL (After ALL tasks — 4 parallel reviews):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high)
└── F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: T1 → T2/T3 → T4 → T5 → F1-F4
Parallel Speedup: ~40% faster than sequential
Max Concurrent: 2 (Wave 2)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1    | -         | 2, 3   | 1    |
| 2    | 1         | 4, 5   | 2    |
| 3    | 1         | 4, 5   | 2    |
| 4    | 2, 3      | 5      | 3    |
| 5    | 4         | F1-F4  | 3    |

### Agent Dispatch Summary

- **Wave 1**: 1 task — T1 → `quick`
- **Wave 2**: 2 tasks — T2 → `unspecified-high`, T3 → `visual-engineering`
- **Wave 3**: 2 tasks — T4 → `quick`, T5 → `quick`
- **FINAL**: 4 tasks — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [x] 1. **Monorepo 根配置 + pnpm 启用 + .gitignore**

  **What to do**:
  - 运行 `corepack enable pnpm` 启用 pnpm（已确认 corepack v0.34.6 可用）
  - 运行 `corepack prepare pnpm@latest --activate` 激活最新版 pnpm
  - 在项目根目录创建 `package.json`，包含：
    - `"name": "stock-recommendation"`
    - `"private": true`
    - `"workspaces": ["client", "server"]`（注意：pnpm 使用 pnpm-workspace.yaml）
    - `"packageManager": "pnpm@<当前安装的版本>"`（通过 `pnpm --version` 获取精确版本）
    - `"scripts": { "dev": "concurrently \"pnpm --filter server start:dev\" \"pnpm --filter client dev\"", "build": "pnpm --filter server build && pnpm --filter client build" }`
  - 创建 `pnpm-workspace.yaml`，内容为 `packages: ['client', 'server']`
  - 创建 `.npmrc`，设置 `shamefully-hoist=true`（确保 NestJS 和 Vue 依赖能正确解析）
  - 创建完整的 `.gitignore`，覆盖：
    - `node_modules/`
    - `dist/`
    - `*.db`、`*.db-journal`
    - `.env`、`.env.*`、`!.env.example`
    - `.DS_Store`、`Thumbs.db`
    - `*.log`
    - `.sisyphus/evidence/`
  - 运行 `pnpm install` 验证 monorepo 配置正确（虽然还没有子项目，但根 package.json 应能正常 install）
  - 安装 `concurrently` 作为根开发依赖：`pnpm add -Dw concurrently`

  **Must NOT do**:
  - 不创建 client/ 或 server/ 目录（留给后续任务）
  - 不安装任何业务依赖
  - 不使用 POSIX-only 命令（如 `rm -rf`），所有脚本必须 Windows 兼容

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 单纯的文件创建和配置任务，无需复杂逻辑
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `playwright`: 无 UI 涉及
    - `git-master`: 不需要复杂 git 操作

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (solo)
  - **Blocks**: Task 2, Task 3
  - **Blocked By**: None

  **References**:

  **Pattern References**:
  - 无（全新项目，无现有模式）

  **External References**:
  - pnpm workspaces: `https://pnpm.io/workspaces` — pnpm-workspace.yaml 格式和配置
  - corepack: `https://nodejs.org/api/corepack.html` — corepack 启用 pnpm 的正确方式

  **WHY Each Reference Matters**:
  - pnpm workspaces 文档：确认 pnpm-workspace.yaml 的正确格式，与 npm workspaces 不同
  - corepack 文档：确认 `corepack enable pnpm` 是推荐的启用方式，避免全局安装

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: pnpm 已安装且可用
    Tool: Bash
    Preconditions: 项目根目录
    Steps:
      1. 运行 `pnpm --version`
      2. 检查退出码为 0
      3. 输出应为一个语义化版本号（如 9.x.x）
    Expected Result: pnpm 版本号输出，退出码 0
    Failure Indicators: "command not found" 或非零退出码
    Evidence: .sisyphus/evidence/task-1-pnpm-version.txt

  Scenario: Monorepo 配置正确
    Tool: Bash
    Preconditions: package.json 和 pnpm-workspace.yaml 已创建
    Steps:
      1. 运行 `cat pnpm-workspace.yaml`
      2. 验证包含 `packages: ['client', 'server']`
      3. 运行 `cat package.json` 并验证包含 `workspaces` 和 `packageManager` 字段
    Expected Result: 两个文件内容正确
    Failure Indicators: 缺少任何必需字段或格式错误
    Evidence: .sisyphus/evidence/task-1-monorepo-config.txt

  Scenario: .gitignore 覆盖所有必要模式
    Tool: Bash
    Preconditions: .gitignore 已创建
    Steps:
      1. 运行 `grep "node_modules" .gitignore`
      2. 运行 `grep "dist" .gitignore`
      3. 运行 `grep "\.db" .gitignore`
      4. 运行 `grep "\.env" .gitignore`
    Expected Result: 所有 4 个模式都找到匹配
    Failure Indicators: 任何 grep 返回非零退出码
    Evidence: .sisyphus/evidence/task-1-gitignore-check.txt

  Scenario: pnpm install 在根目录成功执行
    Tool: Bash
    Preconditions: package.json 已创建，concurrently 已添加
    Steps:
      1. 运行 `pnpm install`
      2. 检查退出码为 0
      3. 验证 `node_modules` 目录已创建
    Expected Result: 安装成功，无 peer dependency 错误
    Failure Indicators: 安装失败或 peer dependency 警告
    Evidence: .sisyphus/evidence/task-1-pnpm-install.txt
  ```

  **Commit**: YES
  - Message: `chore: initialize monorepo root with pnpm workspaces`
  - Files: `package.json`, `pnpm-workspace.yaml`, `.npmrc`, `.gitignore`
  - Pre-commit: 无（husky 尚未配置）

- [x] 2. **NestJS 后端脚手架 + Prisma/SQLite**

  **What to do**:
  - 在 `/server` 目录创建 NestJS 项目：
    - 方式 A：运行 `npx @nestjs/cli new server --package-manager pnpm --skip-git --strict`（推荐，自动生成标准结构）
    - 方式 B：如果 CLI 不兼容 monorepo，则手动创建目录结构和文件
  - 确保 `server/package.json` 的 `name` 字段为 `"server"`
  - 修改 `server/tsconfig.json` 启用 `"strict": true`
  - 安装 Prisma 相关依赖：`pnpm --filter server add prisma @prisma/client` 和 `pnpm --filter server add -D prisma`
  - 运行 `pnpm --filter server exec -- npx prisma init --datasource-provider sqlite`
  - 修改 `server/prisma/schema.prisma`：
    ```prisma
    generator client {
      provider = "prisma-client-js"
    }

    datasource db {
      provider = "sqlite"
      url      = env("DATABASE_URL")
    }

    // 占位模型 — 仅用于验证数据库连接
    model Placeholder {
      id        Int      @id @default(autoincrement())
      name      String
      createdAt DateTime @default(now())
    }
    ```
  - 创建 `server/.env` 文件：`DATABASE_URL="file:./dev.db"`
  - 创建 `server/.env.example` 文件（同内容，供参考）
  - 创建 `server/src/prisma/prisma.module.ts`（PrismaModule 封装）：
    ```typescript
    import { Global, Module } from '@nestjs/common';
    import { PrismaService } from './prisma.service';

    @Global()
    @Module({
      providers: [PrismaService],
      exports: [PrismaService],
    })
    export class PrismaModule {}
    ```
  - 创建 `server/src/prisma/prisma.service.ts`：
    ```typescript
    import { Injectable, OnModuleInit } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';

    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit {
      async onModuleInit() {
        await this.$connect();
      }
    }
    ```
  - 在 `server/src/app.module.ts` 中导入 `PrismaModule`
  - 确保 `server/src/app.controller.ts` 有一个 `GET /` 端点返回 `{ message: 'Hello World' }`
  - 运行 `pnpm --filter server exec -- npx prisma db push` 创建 SQLite 数据库
  - 运行 `pnpm --filter server build` 验证 TypeScript 编译通过
  - 运行 `pnpm --filter server start:dev` 验证 NestJS 能正常启动

  **Must NOT do**:
  - 不创建业务模型（Stock, User 等）
  - 不配置 Swagger
  - 不配置认证/Guards
  - 不安装测试框架
  - 不配置 Docker
  - 不修改默认的 NestJS 目录结构（保持 CLI 生成的标准结构）

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: 需要创建多个文件、安装依赖、配置 Prisma，步骤较多但无复杂逻辑
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `playwright`: 无 UI
    - `git-master`: 无复杂 git 操作

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 3)
  - **Blocks**: Task 4, Task 5
  - **Blocked By**: Task 1

  **References**:

  **External References**:
  - NestJS CLI: `https://docs.nestjs.com/cli/overview` — `nest new` 命令和选项
  - Prisma with NestJS: `https://docs.nestjs.com/recipes/prisma` — NestJS 官方 Prisma 集成指南
  - Prisma SQLite: `https://www.prisma.io/docs/concepts/database-connectors/sqlite` — SQLite 连接配置

  **WHY Each Reference Matters**:
  - NestJS CLI 文档：确认 `--package-manager pnpm` 和 `--strict` 选项的可用性
  - Prisma + NestJS 食谱：确认 PrismaService/PrismaModule 的推荐封装模式
  - Prisma SQLite 文档：确认 SQLite 的 DATABASE_URL 格式（`file:./dev.db`）

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: NestJS 项目结构完整
    Tool: Bash
    Preconditions: server/ 目录已创建
    Steps:
      1. 运行 `ls server/src/main.ts`
      2. 运行 `ls server/src/app.module.ts`
      3. 运行 `ls server/src/app.controller.ts`
      4. 运行 `ls server/tsconfig.json`
    Expected Result: 所有文件存在
    Failure Indicators: 任何文件不存在
    Evidence: .sisyphus/evidence/task-2-nestjs-structure.txt

  Scenario: NestJS TypeScript 编译成功
    Tool: Bash
    Preconditions: 所有文件已创建
    Steps:
      1. 运行 `pnpm --filter server build`
      2. 检查退出码为 0
      3. 验证 `server/dist/` 目录存在
    Expected Result: 编译成功，dist/ 目录已创建
    Failure Indicators: TypeScript 编译错误或非零退出码
    Evidence: .sisyphus/evidence/task-2-nestjs-build.txt

  Scenario: NestJS 开发服务器启动并响应
    Tool: Bash
    Preconditions: 构建成功
    Steps:
      1. 在后台运行 `pnpm --filter server start:dev`
      2. 等待 10 秒让服务器启动
      3. 运行 `curl -s http://localhost:3000/`
      4. 验证响应包含 `"Hello World"`
      5. 停止后台服务器进程
    Expected Result: curl 返回 JSON 包含 `{"message":"Hello World"}`
    Failure Indicators: 连接被拒绝或响应内容不匹配
    Evidence: .sisyphus/evidence/task-2-nestjs-response.txt

  Scenario: Prisma SQLite 数据库创建成功
    Tool: Bash
    Preconditions: schema.prisma 已配置
    Steps:
      1. 运行 `ls server/prisma/schema.prisma`
      2. 运行 `ls server/prisma/dev.db`
      3. 验证两个文件都存在
    Expected Result: schema.prisma 和 dev.db 都存在
    Failure Indicators: dev.db 不存在表示 prisma db push 未执行或失败
    Evidence: .sisyphus/evidence/task-2-prisma-db.txt

  Scenario: PrismaService 配置正确
    Tool: Bash
    Preconditions: prisma module 和 service 已创建
    Steps:
      1. 运行 `grep "PrismaModule" server/src/app.module.ts`
      2. 运行 `grep "PrismaClient" server/src/prisma/prisma.service.ts`
    Expected Result: 两个 grep 都找到匹配
    Failure Indicators: PrismaModule 未导入或 PrismaClient 未使用
    Evidence: .sisyphus/evidence/task-2-prisma-module.txt
  ```

  **Commit**: YES
  - Message: `feat(server): scaffold NestJS backend with Prisma + SQLite`
  - Files: `server/`
  - Pre-commit: `pnpm --filter server build`

- [x] 3. **Vue 3 前端脚手架 + Element Plus + Vite 代理**

  **What to do**:
  - 在 `/client` 目录创建 Vue 3 项目：
    - 运行 `npm create vue@latest client -- --typescript --router --pinia`（使用 create-vue 脚手架）
    - 如果交互式 CLI 不兼容，手动创建项目结构
  - 确保 `client/package.json` 的 `name` 字段为 `"client"`
  - 修改 `client/tsconfig.json` 确保启用 `"strict": true`
  - 安装 Element Plus 及自动导入插件：
    - `pnpm --filter client add element-plus`
    - `pnpm --filter client add -D unplugin-auto-import unplugin-vue-components`
  - 配置 `client/vite.config.ts`：
    ```typescript
    import { fileURLToPath, URL } from 'node:url'
    import { defineConfig } from 'vite'
    import vue from '@vitejs/plugin-vue'
    import AutoImport from 'unplugin-auto-import/vite'
    import Components from 'unplugin-vue-components/vite'
    import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

    export default defineConfig({
      plugins: [
        vue(),
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, '')
          }
        }
      }
    })
    ```
  - 确保 `client/src/router/index.ts` 有一个默认路由 `/` → `HomeView`
  - 确保 `client/src/main.ts` 中注册了 Pinia：
    ```typescript
    import { createApp } from 'vue'
    import { createPinia } from 'pinia'
    import App from './App.vue'
    import router from './router'
    const app = createApp(App)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
    ```
  - 修改 `client/src/views/HomeView.vue` 内容为一个简单的欢迎页面，使用几个 Element Plus 组件（如 `el-button`, `el-card`）来验证 Element Plus 自动导入是否生效
  - 运行 `pnpm --filter client build` 验证构建通过
  - 运行 `pnpm --filter client dev` 验证 Vite 开发服务器启动

  **Must NOT do**:
  - 不安装图表库（ECharts 等）
  - 不创建登录页或认证相关 UI
  - 不创建多个页面/路由（仅 HomeView）
  - 不配置自定义 Element Plus 主题
  - 不安装 axios 或其他 HTTP 客户端
  - 不创建 API 服务层

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: 前端项目搭建涉及 Vue 组件、Vite 配置、UI 组件库集成
  - **Skills**: `[]`
  - **Skills Evaluated but Omitted**:
    - `playwright`: 后续 QA 使用，搭建阶段不需要

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Task 2)
  - **Blocks**: Task 4, Task 5
  - **Blocked By**: Task 1

  **References**:

  **External References**:
  - create-vue: `https://github.com/vuejs/create-vue` — Vue 3 项目脚手架选项
  - Element Plus auto-import: `https://element-plus.org/en-US/guide/quickstart.html#on-demand-import` — unplugin 自动导入配置
  - Vite server proxy: `https://vitejs.dev/config/server-options.html#server-proxy` — API 代理配置

  **WHY Each Reference Matters**:
  - create-vue：确认 CLI 参数（`--typescript --router --pinia`）是否支持非交互模式
  - Element Plus 自动导入：确认 `ElementPlusResolver` 的正确导入路径和配置方式
  - Vite proxy：确认 proxy 配置语法，特别是 `rewrite` 规则

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Vue 3 项目结构完整
    Tool: Bash
    Preconditions: client/ 目录已创建
    Steps:
      1. 运行 `ls client/src/main.ts`
      2. 运行 `ls client/src/router/index.ts`
      3. 运行 `ls client/src/views/HomeView.vue`
      4. 运行 `ls client/vite.config.ts`
    Expected Result: 所有文件存在
    Failure Indicators: 任何文件不存在
    Evidence: .sisyphus/evidence/task-3-vue-structure.txt

  Scenario: Vite 构建成功
    Tool: Bash
    Preconditions: 所有文件已创建
    Steps:
      1. 运行 `pnpm --filter client build`
      2. 检查退出码为 0
      3. 验证 `client/dist/` 目录存在
      4. 验证 `client/dist/index.html` 存在
    Expected Result: 构建成功，dist/index.html 已创建
    Failure Indicators: 构建错误或 dist/ 为空
    Evidence: .sisyphus/evidence/task-3-vue-build.txt

  Scenario: Vite 开发服务器启动并可访问
    Tool: Bash
    Preconditions: 构建成功
    Steps:
      1. 在后台运行 `pnpm --filter client dev`
      2. 等待 8 秒
      3. 运行 `curl -s http://localhost:5173/ | head -20`
      4. 验证 HTML 包含 `<div id="app">`
      5. 停止后台进程
    Expected Result: 返回 HTML 包含 Vue app 挂载点
    Failure Indicators: 连接被拒绝或 HTML 不包含 app div
    Evidence: .sisyphus/evidence/task-3-vue-dev.txt

  Scenario: Element Plus 自动导入配置正确
    Tool: Bash
    Preconditions: vite.config.ts 已配置
    Steps:
      1. 运行 `grep "ElementPlusResolver" client/vite.config.ts`
      2. 运行 `grep "unplugin-auto-import" client/vite.config.ts`
      3. 运行 `grep "element-plus" client/package.json`
    Expected Result: 三个 grep 都找到匹配
    Failure Indicators: 缺少 Element Plus 配置
    Evidence: .sisyphus/evidence/task-3-element-plus.txt

  Scenario: API 代理配置正确
    Tool: Bash
    Preconditions: vite.config.ts 已配置 proxy
    Steps:
      1. 运行 `grep "proxy" client/vite.config.ts`
      2. 验证包含 `target: 'http://localhost:3000'`
      3. 验证包含 `/api` 路径
    Expected Result: proxy 配置包含正确的 target 和路径
    Failure Indicators: 缺少 proxy 配置或 target 不正确
    Evidence: .sisyphus/evidence/task-3-proxy-config.txt

  Scenario: Pinia 已注册
    Tool: Bash
    Preconditions: main.ts 已修改
    Steps:
      1. 运行 `grep "createPinia" client/src/main.ts`
    Expected Result: 找到 `createPinia` 引用
    Failure Indicators: Pinia 未在 main.ts 中注册
    Evidence: .sisyphus/evidence/task-3-pinia.txt
  ```

  **Commit**: YES
  - Message: `feat(client): scaffold Vue 3 frontend with Element Plus`
  - Files: `client/`
  - Pre-commit: `pnpm --filter client build`

- [x] 4. **ESLint + Prettier + Husky + lint-staged 配置**

  **What to do**:
  - 在根目录安装代码质量工具：
    - `pnpm add -Dw eslint prettier husky lint-staged`
  - 在根目录运行 `pnpm exec husky init` 初始化 Husky
  - 修改 `.husky/pre-commit` 内容为 `pnpm exec lint-staged`
  - 在根 `package.json` 添加 `lint-staged` 配置：
    ```json
    "lint-staged": {
      "client/**/*.{ts,vue}": ["pnpm --filter client lint"],
      "server/**/*.ts": ["pnpm --filter server lint"]
    }
    ```
  - 在 `client/` 配置 ESLint（使用 Vue 3 + TypeScript 预设）：
    - 验证 `client/eslint.config.js` 已由 create-vue 生成
    - 如果未生成，创建基础配置
    - 添加 Prettier 集成：`pnpm --filter client add -D eslint-config-prettier`
    - 在 client 的 package.json 添加 scripts：`"lint": "eslint . --ext .vue,.js,.jsx,.cjs,.mjs,.ts,.tsx,.cts,.mts --fix", "format": "prettier --write src/"`
  - 在 `client/` 添加 `.prettierrc.json`：
    ```json
    {
      "semi": false,
      "singleQuote": true,
      "tabWidth": 2,
      "trailingComma": "none",
      "printWidth": 100
    }
    ```
  - 在 `server/` 配置 ESLint（使用 NestJS 默认配置）：
    - 验证 `server/eslintrc.js` 或 `server/.eslintrc.js` 已由 NestJS CLI 生成
    - 如果未生成，创建基础配置
    - 添加 Prettier 集成：`pnpm --filter server add -D eslint-config-prettier`
    - 确保 server 的 package.json 有 `"lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"` 和 `"format": "prettier --write \"src/**/*.ts\""` scripts
  - 在 `server/` 添加 `.prettierrc.json`：
    ```json
    {
      "singleQuote": true,
      "trailingComma": "all",
      "tabWidth": 2,
      "semi": true,
      "printWidth": 100
    }
    ```
  - 运行 `pnpm --filter client lint` 验证前端 lint 通过
  - 运行 `pnpm --filter server lint` 验证后端 lint 通过
  - 注意：Windows 环境下避免 POSIX-only 命令

  **Must NOT do**:
  - 不配置 commitlint（仅 pre-commit hook）
  - 不使用共享 ESLint 配置（前后端独立配置）
  - 不使用 TypeScript project references
  - 不配置 ESLint flat config（使用传统格式，兼容性更好）

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 配置文件创建和安装依赖，步骤标准化
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential after T2, T3)
  - **Blocks**: Task 5
  - **Blocked By**: Task 2, Task 3

  **References**:

  **External References**:
  - Husky: `https://typicode.github.io/husky/` — 初始化和配置 pre-commit hook
  - lint-staged: `https://github.com/okonet/lint-staged` — monorepo 配置方式
  - eslint-config-prettier: `https://github.com/prettier/eslint-config-prettier` — 关闭 ESLint 中与 Prettier 冲突的规则

  **WHY Each Reference Matters**:
  - Husky 文档：确认 `pnpm exec husky init` 是 pnpm 环境下的正确初始化方式
  - lint-staged：确认 monorepo 中 lint-staged 的 glob 配置语法
  - eslint-config-prettier：确认需要在 ESLint 配置中 extend "prettier" 来关闭冲突规则

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: 前端 ESLint 运行通过
    Tool: Bash
    Preconditions: client eslint 配置完成
    Steps:
      1. 运行 `pnpm --filter client lint`
      2. 检查退出码为 0
    Expected Result: lint 通过，无错误
    Failure Indicators: lint 错误或非零退出码
    Evidence: .sisyphus/evidence/task-4-client-lint.txt

  Scenario: 后端 ESLint 运行通过
    Tool: Bash
    Preconditions: server eslint 配置完成
    Steps:
      1. 运行 `pnpm --filter server lint`
      2. 检查退出码为 0
    Expected Result: lint 通过，无错误
    Failure Indicators: lint 错误或非零退出码
    Evidence: .sisyphus/evidence/task-4-server-lint.txt

  Scenario: Husky pre-commit hook 已配置
    Tool: Bash
    Preconditions: husky 已初始化
    Steps:
      1. 运行 `ls .husky/pre-commit`
      2. 运行 `cat .husky/pre-commit`
      3. 验证内容包含 `lint-staged`
    Expected Result: pre-commit 文件存在且包含 lint-staged 命令
    Failure Indicators: 文件不存在或内容不正确
    Evidence: .sisyphus/evidence/task-4-husky.txt

  Scenario: lint-staged 配置正确
    Tool: Bash
    Preconditions: package.json 已更新
    Steps:
      1. 运行 `grep "lint-staged" package.json`
      2. 验证包含 client 和 server 的 glob 规则
    Expected Result: lint-staged 配置包含前后端的规则
    Failure Indicators: 配置缺失或不完整
    Evidence: .sisyphus/evidence/task-4-lint-staged.txt
  ```

  **Commit**: YES
  - Message: `chore: add ESLint, Prettier, Husky, lint-staged`
  - Files: `.husky/`, `client/.prettierrc.json`, `server/.prettierrc.json`, `package.json`
  - Pre-commit: 无（自引用 — hook 刚配置好）

- [x] 5. **端到端集成验证 + concurrently 开发脚本**

  **What to do**:
  - 验证根 `package.json` 的 `dev` 脚本正确：`concurrently "pnpm --filter server start:dev" "pnpm --filter client dev"`
  - 确认 `concurrently` 已作为根开发依赖安装
  - 运行 `pnpm install` 从根目录重新安装，确保所有 workspace 依赖正确链接
  - 启动开发环境验证：
    - 运行 `pnpm dev`
    - 等待两个服务都启动（Vite :5173 + NestJS :3000）
    - 用 curl 验证 NestJS 端点：`curl http://localhost:3000/` → `{ "message": "Hello World" }`
    - 用 curl 验证 Vue 前端：`curl http://localhost:5173/` → HTML
    - 用 curl 验证 API 代理：`curl http://localhost:5173/api/` → 应代理到 NestJS
    - 停止服务
  - 验证整体构建：`pnpm build` 应成功构建前后端
  - 更新 `README.md` 添加项目说明和开发指南：
    ```markdown
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
    ```

  **Must NOT do**:
  - 不修改任何业务逻辑
  - 不添加新的功能代码
  - 不修改 ESLint/Prettier 配置

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 纯验证和文档任务
  - **Skills**: `[]`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (sequential after T4)
  - **Blocks**: F1-F4
  - **Blocked By**: Task 4

  **References**:

  **External References**:
  - concurrently: `https://github.com/open-cli-tools/concurrently` — 命令格式和选项

  **WHY Each Reference Matters**:
  - concurrently：确认引号转义和命令格式（Windows 环境需注意双引号使用）

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: pnpm dev 同时启动前后端
    Tool: Bash
    Preconditions: 所有依赖已安装
    Steps:
      1. 运行 `pnpm dev` 在后台
      2. 等待 15 秒
      3. 运行 `curl -s http://localhost:3000/`
      4. 验证响应包含 "Hello World"
      5. 运行 `curl -s http://localhost:5173/ | head -5`
      6. 验证返回 HTML
      7. 停止后台进程
    Expected Result: 两个服务都响应正确
    Failure Indicators: 任一服务无法访问
    Evidence: .sisyphus/evidence/task-5-dev-servers.txt

  Scenario: API 代理工作正常
    Tool: Bash
    Preconditions: 前后端都在运行
    Steps:
      1. 确保 `pnpm dev` 在后台运行
      2. 运行 `curl -s http://localhost:5173/api/`
      3. 验证响应包含 NestJS 的响应（代理到 :3000）
      4. 停止后台进程
    Expected Result: /api/ 请求被代理到 NestJS 后端
    Failure Indicators: 404 或连接错误
    Evidence: .sisyphus/evidence/task-5-api-proxy.txt

  Scenario: 整体构建成功
    Tool: Bash
    Preconditions: 所有代码已就绪
    Steps:
      1. 运行 `pnpm build` 或手动分别构建
      2. 验证 `client/dist/index.html` 存在
      3. 验证 `server/dist/main.js` 存在
      4. 检查退出码为 0
    Expected Result: 两个 workspace 都构建成功
    Failure Indicators: 构建失败或 dist 文件缺失
    Evidence: .sisyphus/evidence/task-5-build.txt

  Scenario: README 包含开发指南
    Tool: Bash
    Preconditions: README.md 已更新
    Steps:
      1. 运行 `grep "pnpm install" README.md`
      2. 运行 `grep "pnpm dev" README.md`
      3. 运行 `grep "Vue 3" README.md`
    Expected Result: README 包含安装、启动命令和技术栈说明
    Failure Indicators: 关键信息缺失
    Evidence: .sisyphus/evidence/task-5-readme.txt
  ```

  **Commit**: YES
  - Message: `chore: add concurrently dev script and verify integration`
  - Files: `package.json`, `README.md`
  - Pre-commit: 无

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [x] F2. **Code Quality Review** — `unspecified-high`
  Run `pnpm --filter client build` + `pnpm --filter server build` + lint commands. Review all created files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, unused imports. Check AI slop: excessive comments, over-abstraction, generic names.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Files [N clean/N issues] | VERDICT`

- [x] F3. **Real Manual QA** — `unspecified-high` (+ `playwright` skill if needed)
  Start from clean state (`pnpm install`). Run `pnpm dev`. Verify both servers start. Test API proxy. Test NestJS endpoint. Take screenshots of browser. Test `pnpm build` for both workspaces. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | VERDICT`

- [x] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual files. Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Flag unaccounted files.
  Output: `Tasks [N/N compliant] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **T1**: `chore: initialize monorepo root with pnpm workspaces` - package.json, pnpm-workspace.yaml, .gitignore, .npmrc
- **T2**: `feat(server): scaffold NestJS backend with Prisma + SQLite` - server/
- **T3**: `feat(client): scaffold Vue 3 frontend with Element Plus` - client/
- **T4**: `chore: add ESLint, Prettier, Husky, lint-staged` - .eslintrc.*, .prettierrc*, .husky/
- **T5**: `chore: add concurrently dev script and verify integration` - package.json (scripts update)

---

## Success Criteria

### Verification Commands
```bash
pnpm install                                        # Expected: exit code 0
pnpm dev                                            # Expected: Vite on :5173 + NestJS on :3000
pnpm --filter client build                          # Expected: exit code 0, client/dist/ created
pnpm --filter server build                          # Expected: exit code 0, server/dist/ created
curl http://localhost:3000/                          # Expected: {"message":"Hello World"}
curl http://localhost:5173/                          # Expected: HTML with Vue app
curl http://localhost:5173/api/                      # Expected: proxied to NestJS
pnpm --filter client lint                           # Expected: exit code 0
pnpm --filter server lint                           # Expected: exit code 0
ls .husky/pre-commit                                 # Expected: file exists
ls server/prisma/schema.prisma                       # Expected: file exists
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] Both workspaces build successfully
- [ ] Dev proxy configured and working
- [ ] Pre-commit hook functional
