import type { GenerateResponse } from "ollama";
import { Ollama as OllamaClient } from "ollama";
import { Embedding, Model } from "./types";
import { generateEmbeddings } from "./helpers";
import { EmbeddingsManager } from "./EmbeddingsManager";

const embeddingsManager = new EmbeddingsManager();

const questions = [
  "The ADC1 system shall perform self-calibration",
  "The ADC1 system shall verify its completion using `LL_ADC_IsCalibrationOnGoing()` before activation.",
  "The ADC1 activation process shall confirm the ADC is disabled using `LL_ADC_IsEnabled()` before proceeding to enable the ADC.",
];

const models: Model[] = [
  {
    name: "prefixed-nomic",
    model: "nomic-embed-text",
    qprefix: "search_query: ",
    dprefix: "search_document: ",
  },
];

const files = ["example/main.c"];

async function interrogateOllama(similarDocs: Embedding[], question: string) {
  const relativeDocs = similarDocs
    .map((doc) => doc.source)
    .filter((d) => !d?.includes(question))
    .join("\n");

  const ollama = new OllamaClient({ host: "http://127.0.0.1:11434" });
  const result = await ollama.generate({
    model: "qwen2.5-coder:7b",
    prompt: `${question} This is a requirement that the following code must implement. Return a fixed structure with this structure: {file: filepath, line: line_number}. In this structure filepath is the path of the file that implement the requirement while line_number is the line in witch is implemented. Use only the following code: ${relativeDocs}`,
    stream: false,
  });

  return result;
}

const rawEmbeddingList = generateEmbeddings(files);

for await (const model of models) {
  embeddingsManager.clear(model.name);
  await embeddingsManager.addEmbeddings(model, rawEmbeddingList);

  const responses: GenerateResponse[] = [];
  for (const question of questions) {
    const similarDocs = await embeddingsManager.findSimilar(model, question);
    console.log(similarDocs.map((d) => d.source));

    const res = await interrogateOllama(similarDocs, question);
    responses.push(res);
  }

  console.log("\n- Questions:");
  console.table(questions);

  console.log("\n");

  console.log("\n- RESULT:");
  console.log(responses.map((i) => i.response));
}
