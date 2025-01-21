import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { generateText, streamText } from "ai";
import { google } from "@ai-sdk/google";

async function main() {
  const messages = [
    { role: "user" as const, content: "Write something of around 30 words" },
  ];

  const model = google("models/gemini-1.5-flash");

  const { textStream } = await streamText({
    model,
    messages,
    maxTokens: 1280,
    temperature: 0.7,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
}

main().catch(console.error);
