import fs from "fs";
import type { RawEmbed } from "./types";

export function generateEmbeddings(files: string[]): RawEmbed[] {
  const embeddings: RawEmbed[] = [];

  for (const file of files) {
    const sourceScript = fs.readFileSync(file, "utf-8");

    sourceScript.split("\n").forEach((line, index) => {
      if (line.trim().length > 0) {
        embeddings.push({
          content: `Filename: ${file}, line: ${index + 1}, content: ${line}`,
          metadata: { file: file, line: index + 1 },
        });
      }
    });
  }

  return embeddings;
}
