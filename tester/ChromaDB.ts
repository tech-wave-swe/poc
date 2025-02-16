import { ChromaClient } from "chromadb";

export default class ChromaDB {
  private static instance: ChromaDB;
  private client: ChromaClient;

  private constructor() {
    this.client = new ChromaClient({ path: "http://localhost:8000" });
  }

  public static getInstance(): ChromaDB {
    if (!ChromaDB.instance) ChromaDB.instance = new ChromaDB();
    return ChromaDB.instance;
  }

  public getClient(): ChromaClient {
    return this.client;
  }
}
