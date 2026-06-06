# Decisions

## 2026-06-06 Planning Decisions
- pnpm via corepack (not global install)
- Monorepo: /client + /server with pnpm-workspace.yaml
- shamefully-hoist=true in .npmrc
- ESLint: traditional format (not flat config) for compatibility
- Prettier: different styles for frontend (no semi) vs backend (semi + trailing comma)
- Element Plus: auto-import via unplugin
- Vite proxy: /api -> localhost:3000 with rewrite
- Prisma: SQLite with Placeholder model only
