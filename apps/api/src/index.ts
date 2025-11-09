import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { corsMiddleware } from './middlewares/cors'
import { auth } from './lib/better-auth'

const app = new OpenAPIHono<{
  Bindings: CloudflareBindings
}>()

app.use('/*', corsMiddleware)

app.on(['GET', 'POST'], '/api/v1/auth/*', (c) => auth(c.env).handler(c.req.raw))

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
})

app.get(
  '/ui',
  swaggerUI<{ Bindings: CloudflareBindings }>({
    url: '/doc',
  }),
)

export default app
