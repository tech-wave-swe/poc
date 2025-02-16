import ChromaDB from "./ChromaDB";
import ollama from "ollama";
import type { Model, Embedding, RawEmbed } from "./types";

export async function deleteCollection(model: string) {
  try {
    await ChromaDB.getInstance().getClient().deleteCollection({ name: model });
  } catch (_error) {
    console.log(`Collection ${model} did not exist`);
  }
}

export async function embedSource(model: Model, sourceList: RawEmbed[]) {
  const collection = await ChromaDB.getInstance()
    .getClient()
    .getOrCreateCollection({
      name: model.name,
      metadata: { "hnsw:space": "cosine" },
    });

  const embeddings: Embedding[] = [];
  for await (const item of sourceList) {
    const embedresponse = await ollama.embed({
      model: model.model,
      input: `${model.dprefix}${item.content}`,
    });

    embeddings.push({
      source: item.content,
      embed: embedresponse.embeddings[0],
      metadata: item.metadata,
    });
  }

  const embeds = embeddings.map((e) => e.embed);
  const docs = embeddings.map((e) => e.source);
  const ids = docs.map((_, index) => `${model.name}-${index}`);
  const metadatas = embeddings.map((e) => e.metadata);

  await collection.add({
    ids: ids,
    embeddings: embeds,
    documents: docs,
    metadatas: metadatas,
  });
}

export async function getRelativeDocs(model: Model, question: string) {
  const collection = await ChromaDB.getInstance()
    .getClient()
    .getOrCreateCollection({ name: model.name });

  const embeddingResponse = await ollama.embed({
    model: model.model,
    input: `${model.qprefix}${question}`,
  });
  const questionEmbed = embeddingResponse.embeddings[0];

  const relativeVector = await collection.query({
    queryEmbeddings: questionEmbed,
    nResults: 5,
  });

  return relativeVector;
}

export async function interrogateOllama(relativeVector, question: string) {
  const relativeDocs = relativeVector.documents[0]
    .filter((d) => !d?.includes(question))
    .join("\n");

  const result = await ollama.generate({
    model: "qwen2.5-coder:7b",
    prompt: `${question} This is a requirement that the following code must implement. Return a fixed structure with this structure: {file: filepath, line: line_number}. In this structure filepath is the path of the file that implement the requirement while line_number is the line in witch is implemented. Use only the following code: ${relativeDocs}`,
    // prompt: `${question} Answer as brief and concisely as possible. Use only the following information to generate an answer: ${relativeDocs}`,
    stream: false,
  });

  return result;
}
