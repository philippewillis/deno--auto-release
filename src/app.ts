import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

export function createApp() {
  const app = new Hono()

  // Middleware
  app.use(compress())
  app.use('*', cors())
  app.use(logger())
  app.use(prettyJSON())

  // Routes
  app.get('/', (c) => c.text('Hono!'))

  return app
}
