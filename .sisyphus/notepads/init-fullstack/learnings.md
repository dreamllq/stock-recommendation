# Learnings

## 2026-06-06 Session Start
- Project is completely empty (only .git, LICENSE, README.md)
- pnpm NOT installed — needs corepack enable pnpm first
- Windows platform (win32) — avoid POSIX-only commands
- Node.js v22.22.2, npm v10.9.7, corepack v0.34.6

## Task 1: Monorepo Root Configuration
- pnpm v11.5.2 activated via corepack
- `corepack enable pnpm && corepack prepare pnpm@latest --activate` works on Node v22.22.2
- pnpm workspaces require `pnpm-workspace.yaml` at root (not `workspaces` field in package.json)
- `pnpm add -Dw` installs to root workspace (-w flag required)
- `shamefully-hoist=true` in .npmrc needed for compatibility with some tools
- On Windows (win32), `cat` works in Git Bash but `type` is CMD-only
- concurrently 10.0.3 installed as root dev dependency

## Task 4: ESLint + Prettier + Husky + lint-staged
- Vue 3 + TypeScript ESLint: use `@vue/eslint-config-typescript` with `defineConfigWithVueTs` for flat config
- Must add `ignores: ['dist/**']` to ESLint flat config — otherwise dist/ gets linted (393 errors from minified JS)
- `husky init` creates `.husky/pre-commit` with `pnpm test` as default — must overwrite
- Husky 9 adds `prepare: "husky"` script to package.json automatically
- Server ESLint (NestJS flat config) exits 0 with only warnings
- `@vue/eslint-config-typescript` v14+ uses `defineConfigWithVueTs` + `vueTsConfigs` export pattern
