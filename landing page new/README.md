# MCP Handle Landing Page

Marketing site for the MCP Handle stack. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 preview, and TypeScript.

Key sections:
- Hero and feature pillars
- Integrations and platform stats
- Client channel tiles
- Testimonials and final CTA
- Bottom-right assistant widget that now talks to a Dify knowledge base (with an FAQ fallback)

## Local Development

```bash
npm install                # install dependencies
npm run dev                # start Next.js locally
npm run lint               # run ESLint (Next.js rules + TypeScript)
npm run build && npm start # production build preview
```

Set `NEXT_DISABLE_TURBOPACK=1` in `.env.local` if you prefer webpack over Turbopack (already included in this repo).

## Dify Knowledge Base Integration

The assistant widget now talks to `src/app/api/assistant/route.ts`. That API route proxies prompts to Dify's `/chat-messages` endpoint and returns the answer to the UI. If the proxy fails (missing credentials, network errors, etc.) the widget automatically serves the existing local FAQ reply so visitors are never left without a response.

Add these environment variables to `.env.local` once you receive the credentials:

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `DIFY_API_KEY` | Yes | - | Server token for your Dify knowledge base or app. |
| `DIFY_API_BASE_URL` | No | `https://api.dify.ai/v1` | Override if you self-host Dify or expose it via another gateway. |
| `DIFY_CHAT_PATH` | No | `/chat-messages` | Allows pointing to a custom endpoint (for example a workflow runner). Accepts full URLs too. |
| `DIFY_RESPONSE_MODE` | No | `blocking` | Set to `streaming` if you later switch the proxy to SSE. |
| `DIFY_USER_ID` | No | `landing-page-visitor` | Identifier passed through to Dify for analytics and rate limiting. |
| `ASSISTANT_ALLOWED_ORIGINS` | Yes | `http://localhost:3000` | Comma-separated list of origins allowed to call `/api/assistant`. |
| `ASSISTANT_SESSION_SECRET` | Yes | - | Secret used to sign short-lived assistant session cookies (generate >=32 random bytes). |
| `UPSTASH_REDIS_REST_URL` | Yes (production) | - | Redis REST endpoint used for persistent daily rate limits. Required outside local dev. |
| `UPSTASH_REDIS_REST_TOKEN` | Yes (production) | - | Redis REST token used alongside the URL above. |

How the proxy works:
1. The client posts `{ prompt, conversationId, locale }` to `/api/assistant`.
2. The server adds the env-driven config, forwards the call to Dify, and extracts `answer` plus `conversation_id`.
3. The response is returned to the widget; errors come back as structured JSON so the UI can fall back gracefully.

### Abuse Protection
- Requests must originate from `ASSISTANT_ALLOWED_ORIGINS`; anything else is rejected with `403`.
- Each visitor receives a short-lived, server-signed session cookie via `/api/assistant/session`; `/api/assistant` validates that cookie before proxying to Dify so external scripts can't blindly re-use the widget endpoint.
- Rate limits are tracked per origin + IP pair. Upstash credentials are mandatory in production so quotas persist across deployments; only local development falls back to the in-memory limiter.

### Front-end Behavior
- Shows the initial canned greeting instantly.
- Locks the input while a Dify request is in flight to prevent race conditions.
- Displays a small notice (`"Dify knowledge base is unavailable..."`) when the FAQ fallback is used.
- Keeps the existing suggestion buttons; their copy doubles as the fallback answer if Dify is unreachable.

## Deployment

Any Node 18+ environment works. For Vercel:
1. Add the `.env` values (especially `DIFY_API_KEY`) to the project dashboard.
2. Deploy as normal; the App Router API endpoint runs as a serverless function with zero additional setup.
3. Optionally set `DIFY_RESPONSE_MODE=streaming` later and adapt the component to consume SSE if you need token-level updates.

Once the secret and API URL are available, drop them into `.env.local` (and your hosting provider's secret store) and the landing page assistant will start serving live answers from Dify.
