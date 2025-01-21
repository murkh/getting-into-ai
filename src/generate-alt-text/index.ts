import { z } from "zod";
import * as dotenv from "dotenv";
import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { readFileSync } from "fs";
dotenv.config({ path: __dirname + "/../../.env" });

const systemPrompt =
  "You will receive an image. " +
  "Please create an alt text for the image. " +
  "Be concise. " +
  "Use adjectives only when necessary. " +
  "Do not pass 160 characters." +
  "Use simple language. ";

async function main() {
  const filePath = __dirname + "/sample.jpg";
  console.log(filePath);
  const fileContent = readFileSync(filePath);

  const schema = z.object({
    sentiment: z.enum(["positive", "negative", "neutral"]),
  });

  const { response } = await generateText({
    model: google("models/gemini-1.5-flash-001"),
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [{ type: "image", image: fileContent }],
      },
    ],
  });

  console.dir(response.messages, { depth: null });
}

main();
