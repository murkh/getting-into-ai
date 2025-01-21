import { z } from "zod";
import * as dotenv from "dotenv";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
dotenv.config({ path: __dirname + "/../../.env" });

async function main() {
  const schema = z.object({
    recipe: z.object({
      ingredients: z.array(
        z.object({
          content: z.string(),
          quantity: z.number().positive(),
        })
      ),
    }),
  });

  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    schema,
    prompt: "Give me the recipe for custard apple cake",
    schemaName: "Recipe",
  });

  console.dir(object.recipe, { depth: null });
}

main();
