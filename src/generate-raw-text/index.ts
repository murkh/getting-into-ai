import * as dotenv from "dotenv";
import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { readFileSync } from "fs";
dotenv.config({ path: __dirname + "/../../.env" });

const systemPrompt =
  "You will receive a pdf. " +
  "Please extract the text from the pdf. " +
  "Maintain the layout of the document. " +
  "Do not modify the content at all. ";

async function main() {
  const filePath = __dirname + "/sample.pdf";
  console.log(filePath);
  const fileContent = readFileSync(filePath);

  const { response } = await generateText({
    model: google("models/gemini-1.5-flash-001"),
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "file",
            data: fileContent.buffer,
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  console.dir(response.messages, { depth: null });
}

main();
