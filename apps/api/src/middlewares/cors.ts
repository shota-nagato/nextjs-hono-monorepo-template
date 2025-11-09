import { cors } from 'hono/cors'
export const corsMiddleware = cors({
  origin: (origin) => {
    const ALLOWED_ORIGINS = ['http://localhost:3000']

    return ALLOWED_ORIGINS.includes(origin) ? origin : null
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
})
