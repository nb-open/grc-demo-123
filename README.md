# Cloudflare Workers Full-Stack Chat Demo

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/nb-open/sentinel-grc-risk-register)]](https://workers.cloudflare.com)

A production-ready full-stack chat application powered by Cloudflare Workers. Features a serverless Hono backend with Durable Objects for persistent user and chat entities, paired with a modern React frontend using shadcn/ui, Tailwind CSS, and Tanstack Query.

## ✨ Key Features

- **Durable Objects for Stateful Entities**: One DO per User and ChatBoard, with embedded messages and automatic indexing for efficient listing/pagination.
- **Real-time Chat**: Send and list messages within chat boards.
- **Type-Safe APIs**: Shared TypeScript types between frontend and backend.
- **Modern UI**: shadcn/ui components, Tailwind CSS, dark/light theme support.
- **CRUD Operations**: Create/read/update/delete users, chats, and messages with bulk operations.
- **Optimized for Edge**: Zero-cold-start backend, global replication via Cloudflare.
- **Development-Friendly**: Hot reload, TypeScript, Vite, Bun scripts.
- **Production-Ready**: CORS, error handling, logging, health checks.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Backend** | Cloudflare Workers, Hono, Durable Objects |
| **Frontend** | React 18, Vite, TypeScript, Tanstack Query |
| **UI/UX** | shadcn/ui, Tailwind CSS, Lucide Icons, Sonner (toasts) |
| **State/Data** | React Router, Zustand, Immer |
| **Dev Tools** | Bun, ESLint, Wrangler, Vitest |
| **Other** | Framer Motion (animations), React Hook Form, Zod |

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh/) (package manager)
- [Cloudflare Account](https://dash.cloudflare.com/) & [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-update/)
- Node.js (for some deps, but Bun handles everything)

### Installation
```bash
bun install
```

### Development
```bash
# Start dev server (frontend + backend proxy)
bun run dev
```
- Frontend: http://localhost:3000 (or $PORT)
- API: http://localhost:3000/api/*
- Backend logs in console

### Build for Production
```bash
bun run build
```
Output in `dist/` (static assets) and Worker ready for deploy.

## 📚 Usage Examples

### API Endpoints
All APIs follow `{ success: boolean, data?: T, error?: string }` pattern.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | List users (?cursor= & ?limit=) |
| POST | `/api/users` | Create user `{ name: string }` |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/deleteMany` | Bulk delete `{ ids: string[] }` |
| GET | `/api/chats` | List chats |
| POST | `/api/chats` | Create chat `{ title: string }` |
| GET | `/api/chats/:chatId/messages` | List messages |
| POST | `/api/chats/:chatId/messages` | Send message `{ userId: string, text: string }` |

Seed data auto-loads on first request.

### Frontend Customization
- Edit `src/pages/HomePage.tsx` for your UI.
- Use `src/lib/api-client.ts` for type-safe API calls.
- shadcn/ui components in `src/components/ui/*`.
- Hooks: `useTheme`, `useMobile`, Tanstack Query.

## ☁️ Deployment

Deploy to Cloudflare Workers in one command:

```bash
# Login (if needed)
wrangler login

# Deploy (builds frontend + deploys Worker)
bun run deploy
```

Your app will be live at `https://your-worker.your-subdomain.workers.dev`.

**[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/nb-open/sentinel-grc-risk-register)**

### Custom Domain
```bash
wrangler deploy --var SUBDOMAIN:myapp
wrangler pages publish dist --project-name=myapp
```

### Environment Variables
Durable Objects auto-configured. Add custom vars in `wrangler.jsonc`.

## 🤝 Contributing

1. Fork & clone
2. `bun install`
3. `bun run dev`
4. Create feature branch
5. PR with clear description

Lint: `bun run lint`

## 📄 License

MIT - see [LICENSE](LICENSE) (or add one).

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Issues: [GitHub Issues](https://github.com/user/repo/issues)

Built with ❤️ for Cloudflare Workers.