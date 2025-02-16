import type { Metadata } from "chromadb";

export type Model = {
  name: string;
  model: string;
  qprefix: string;
  dprefix: string;
};

export type Embedding = {
  source: string;
  embed: number[];
  metadata: Metadata;
};

export type RawEmbed = {
  content: string;
  metadata: {
    file: string;
    line: number;
  };
};
