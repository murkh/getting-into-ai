import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { once } from "node:events";
import { CoreMessage, generateText } from "ai";
import { google } from "@ai-sdk/google";

async function main() {
  const app = new Hono();

  app.post("/api/get-completions", async (ctx) => {
    const messages: CoreMessage[] = await ctx.req.json();
    const result = await generateText({
      model: google("gemini-1.5-flash"),
      messages,
    });

    return ctx.json(result.response.messages);
  });

  const server = serve({
    fetch: app.fetch,
    port: 3000,
    hostname: "0.0.0.0",
  });

  await once(server, "listening");

  return server;
}

main();
