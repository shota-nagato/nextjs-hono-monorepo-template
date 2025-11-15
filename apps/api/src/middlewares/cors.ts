import { cors } from 'hono/cors'
export const corsMiddleware = (env: CloudflareBindings) =>
  cors({
    origin: (origin) => {
      const ALLOWED_ORIGINS = [env.FRONTEND_URL]

      return ALLOWED_ORIGINS.includes(origin) ? origin : null
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'User-Agent'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  })
