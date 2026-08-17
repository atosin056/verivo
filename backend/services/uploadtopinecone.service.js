import fs from "fs";
import { createEmbedding } from "./embedding.service.js";
import index from "./connectpinecone.service.js";

export async function uploadChunks() {
  const chunks = JSON.parse(
    fs.readFileSync(
      "./knowledge/phonerepair/chunks/Pineconechunks.json",
      "utf8",
    ),
  );

  console.log("Number of chunks:", chunks.length);

  for (const chunk of chunks) {
    console.log(`Embedding ${chunk.id}...`);

    const vector = await createEmbedding(chunk.text);

    console.log("Vector length:", vector.length);

    await index.upsert({
      records: [
        {
          id: chunk.id,
          values: vector,
          metadata: {
            text: chunk.text,
            ...chunk.metadata,
          },
        },
      ],
    });
    console.log(`Uploaded ${chunk.id}`);
  }

  console.log("🔥 All chunks embedded and uploaded!");
}
