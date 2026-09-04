import { createEmbedding } from "./embedding.service.js";
import retrievalQueryBuilder from "./retrievalquerybuilder.service.js";
import generateQa from "./qagenerator.service.js";
import index from "./connectpinecone.service.js";

const TRADE_ALIASES = {
  phone_repair: "mobile_phone_repair",
};

const generateQuestionandAnswer = async (trade, category) => {
  const pineconeTrade = TRADE_ALIASES[trade] || trade;
  const query = retrievalQueryBuilder(pineconeTrade, category);

  const vector = await createEmbedding(query);

  const [synthetic, nbte, onet] = await Promise.all([
    index.query({
      vector,
      topK: 2,
      filter: {
        trade: pineconeTrade,
        category,
        source: "llm_generated_synthetic",
      },
      includeMetadata: true,
    }),

    index.query({
      vector,
      topK: 2,
      filter: {
        trade: pineconeTrade,

        source: "NBTE",
      },
      includeMetadata: true,
    }),

    index.query({
      vector,
      topK: 2,
      filter: {
        trade: pineconeTrade,
        source: "ONET",
      },
      includeMetadata: true,
    }),
  ]);

  const chunks = [
    ...(synthetic?.matches || []),
    ...(nbte?.matches || []),
    ...(onet?.matches || []),
  ];

  console.log("RETRIEVED CHUNKS:");
  console.dir(chunks, { depth: null });

  const qa = await generateQa(pineconeTrade, category, chunks);

  return qa;
};

export default generateQuestionandAnswer;
