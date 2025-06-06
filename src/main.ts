import { createApp } from '~/app.ts'

const app = createApp()
const PORT = 8080

Deno.serve({ port: PORT }, app.fetch)
