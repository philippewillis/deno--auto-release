import { Hono } from "hono";

export function createApp() {
  const app = new Hono();

  // Routes
  app.get("/", (c) => c.text("Hono!"));

  return app;
}
