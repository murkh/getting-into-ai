import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });
import { generateText, LanguageModel, streamText } from "ai";
import { google } from "@ai-sdk/google";

async function ask(prompt: string, model: LanguageModel) {
  const messages = [{ role: "user" as const, content: prompt }];

  const { textStream } = streamText({
    model,
    messages,
    maxTokens: 1280,
    temperature: 0.7,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
}

async function main() {
  ask("Hey there, how are you?", google("gemini-1.5-flash"));
}

main().catch(console.error);
