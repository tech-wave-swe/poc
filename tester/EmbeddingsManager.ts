import type { Embedding, Model, RawEmbed } from "./types";
import { Ollama as OllamaClient } from "ollama";

export class EmbeddingsManager {
  private collections: Map<string, Embedding[]> = new Map();

  async addEmbeddings(model: Model, sourceList: RawEmbed[]): Promise<void> {
    const embeddings: Embedding[] = [];
    const ollama = new OllamaClient({ host: "http://127.0.0.1:11434" });

    for (const item of sourceList) {
      const embedResponse = await ollama.embed({
        model: model.model,
        input: `${model.dprefix}${item.content}`,
      });

      embeddings.push({
        source: item.content,
        embed: embedResponse.embeddings[0],
        metadata: item.metadata,
      });
    }

    this.collections.set(model.name, embeddings);
  }

  async findSimilar(
    model: Model,
    question: string,
    nResults: number = 5,
  ): Promise<Embedding[]> {
    const ollama = new OllamaClient({ host: "http://127.0.0.1:11434" });

    const embedResponse = await ollama.embed({
      model: model.model,
      input: `${model.qprefix}${question}`,
    });
    const queryEmbedding = embedResponse.embeddings[0];

    const collection = this.collections.get(model.name);
    if (!collection) {
      throw new Error(`Collection ${model.name} not found`);
    }

    const withSimilarity = collection.map((embedding) => ({
      ...embedding,
      similarity: this.cosineSimilarity(queryEmbedding, embedding.embed),
    }));

    return withSimilarity
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, nResults);
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    if (magnitudeA === 0 || magnitudeB === 0) {
      return 0;
    }
    return dotProduct / (magnitudeA * magnitudeB);
  }

  clear(modelName: string): void {
    this.collections.delete(modelName);
  }
}
