import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

async function main() {
  const messages = [{ role: "user" as const, content: "Hello World" }];

  const model = google("models/gemini-1.5-flash");

  const result = await generateText({
    model,
    messages,
    maxTokens: 4096,
    temperature: 0.7,
    topP: 0.4,
  });

  console.log(result.text);
}

main().catch(console.error);
