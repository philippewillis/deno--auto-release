import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'

export function createApp() {
  const app = new Hono()

  // Middleware
  app.use(compress())
  app.use('*', cors())
  app.use(logger())

  // Routes
  app.get('/', (c) => c.text('Hono!'))

  return app
}
