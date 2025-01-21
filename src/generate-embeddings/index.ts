import { z } from "zod";
import * as dotenv from "dotenv";
import { cosineSimilarity, embed, embedMany } from "ai";
import { google } from "@ai-sdk/google";
dotenv.config({ path: __dirname + "/../../.env" });

async function main() {
  const animals = ["Cat", "Dog", "Parrot"];
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel("text-embedding-004"),
    values: animals,
  });

  const vectorDatabase = animals.map((val, index) => ({
    val,
    embedding: embeddings[index],
  }));

  const searchTerm = await embed({
    model: google.textEmbeddingModel("text-embedding-004"),
    value: "Man's Best Friend",
  });

  const entries = vectorDatabase.map((entry) => {
    return {
      value: entry.val,
      similarity: cosineSimilarity(entry.embedding, searchTerm.embedding),
    };
  });

  const sortedResp = entries.sort((a, b) => b["similarity"] - a["similarity"]);

  console.dir(sortedResp, { depth: null });
}

main();
