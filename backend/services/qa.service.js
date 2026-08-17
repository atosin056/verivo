import { createEmbedding } from "./embedding.service.js";
import retrievalQueryBuilder from "./retrievalquerybuilder.service.js";
import generateQa from "./qagenerator.service.js";
import index from "./connectpinecone.service.js";

const generateQuestionandAnswer = async (trade, category) => {
  const query = retrievalQueryBuilder(trade, category);

  const vector = await createEmbedding(query);

  const [synthetic, nbte, onet] = await Promise.all([
    index.query({
      vector,
      topK: 2,
      filter: {
        trade,
        source: "llm_generated_synthetic",
      },
      includeMetadata: true,
    }),

    index.query({
      vector,
      topK: 2,
      filter: {
        trade,
        source: "NBTE",
      },
      includeMetadata: true,
    }),

    index.query({
      vector,
      topK: 2,
      filter: {
        trade,
        source: "ONET",
      },
      includeMetadata: true,
    }),
  ]);

  const chunks = [...synthetic.matches, ...nbte.matches, ...onet.matches];

  console.log("RETRIEVED CHUNKS:");
  console.dir(chunks, { depth: null });

  const qa = await generateQa(trade, category, chunks);

  return qa;
};

export default generateQuestionandAnswer;
