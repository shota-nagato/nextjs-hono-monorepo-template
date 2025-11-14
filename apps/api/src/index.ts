import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { corsMiddleware } from './middlewares/cors'
import { auth } from './lib/better-auth'
import { logger } from 'hono/logger'
import { apiKeyAuthMiddleware } from './middlewares/secret-key'
import { createSeedUserRouteHandler } from './routes/add-seed-user/post'

const app = new OpenAPIHono<{
  Bindings: CloudflareBindings
}>()

// TODO: 環境によってログ設定を変える
app.use('*', logger())
app.use('/*', corsMiddleware)
app.use('/api/v1/secret/*', apiKeyAuthMiddleware)

app.on(['GET', 'POST'], '/api/v1/auth/*', (c) => auth(c.env).handler(c.req.raw))

app.get('/health', (c) => c.json({ status: 'ok' }))

export const routes = app.route('/', createSeedUserRouteHandler)

routes
  .doc('/api', {
    openapi: '3.0.0',
    info: {
      title: 'API',
      version: '1.0.0',
    },
  })
  .get(
    '/docs',
    swaggerUI<{ Bindings: CloudflareBindings }>({
      url: '/api',
    }),
  )

export type ApiType = typeof routes

export default routes
