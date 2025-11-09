import { Hono } from 'hono'
import { corsMiddleware } from './middlewares/cors'

const app = new Hono()

app.use('/*', corsMiddleware)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
