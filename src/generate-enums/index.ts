import { z } from "zod";
import * as dotenv from "dotenv";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
dotenv.config({ path: __dirname + "/../../.env" });

async function main() {
  const schema = z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]),
  });

  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    schema,
    prompt: "What is the sentiment for this sentence? 'I don't feel so good'",
    schemaName: "Sentiment Analysis",
  });

  console.dir(object.sentiment, { depth: null });
}

main();
