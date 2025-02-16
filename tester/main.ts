import ollama from "ollama";
import type { GenerateResponse } from "ollama";
import { ChromaClient } from "chromadb";
import { Model } from "./types";
import { generateEmbeddings } from "./helpers";
import {
  deleteCollection,
  embedSource,
  getRelativeDocs,
  interrogateOllama,
} from "./chromaDBHelper";

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

const rawEmbeddingList = generateEmbeddings(files);

for await (const model of models) {
  await deleteCollection(model.name);
  await embedSource(model, rawEmbeddingList);

  const responses: GenerateResponse[] = [];
  for (const question of questions) {
    const topDocs = await getRelativeDocs(model, question);

    console.log(topDocs.documents);

    const res = await interrogateOllama(topDocs, question);

    responses.push(res);
  }

  console.log("\n- Questions:");
  console.table(questions);

  console.log("\n");

  console.log("\n- RESULT:");
  console.log(responses.map((i) => i.response));
}
