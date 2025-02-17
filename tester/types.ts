export type Model = {
  name: string;
  model: string;
  qprefix: string;
  dprefix: string;
};

export type Embedding = {
  source: string;
  embed: number[];
  metadata: {
    file: string;
    line: number;
  };
};

export type RawEmbed = {
  content: string;
  metadata: {
    file: string;
    line: number;
  };
};
