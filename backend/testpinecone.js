import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pc.index("verivo");

const testVector = Array(1536).fill(0.1);

await index.upsert({
  records: [
    {
      id: "test-vector-1",
      values: testVector,
      metadata: {
        test: true,
      },
    },
  ],
});

console.log("🔥 Pinecone test upload worked!");
