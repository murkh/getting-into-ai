import { google } from "@ai-sdk/google";
import { generateText, tool } from "ai";
import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

async function main() {
  const model = google("gemini-1.5-flash");

  const logToConsoleTool = tool({
    description: "Log a message to the console",
    parameters: z.object({
      message: z.string().describe("The message to log to the console"),
    }),
    execute: async ({ message }) => {
      console.log(message);
    },
  });

  const { steps } = await generateText({
    model,
    prompt: "Hello World!",
    system:
      "Your only role in life is to log " +
      "messages to the console. " +
      "Use the tool provided to log the" +
      "prompt to the console. ",
    tools: {
      logToConsoleTool: logToConsoleTool,
    },
  });

  console.dir(steps);
}

main();
