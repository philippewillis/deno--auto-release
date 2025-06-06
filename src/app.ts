import { Hono } from "hono";
import { cors } from "hono/cors";
import { compress } from "hono/compress";

export function createApp() {
  const app = new Hono();

  // Middleware
  app.use(compress());
  app.use("*", cors());

  // Routes
  app.get("/", (c) => c.text("Hono!"));

  return app;
}
