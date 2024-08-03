import { openai } from "@ai-sdk/openai";
import { embed, embedMany } from "ai";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import { db } from "../db";
import { embeddings } from "@/lib/db/schema/embeddings";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (text: string): Array<string> => {
    return text
        .trim()
        .split(".")
        .filter(chunk => chunk !== "");
}

export const generateEmbeddings = async (
    text: string
): Promise<Array<{ embedding: Array<number>, content: string}>> => {
    const chunks = generateChunks(text);
    const { embeddings } = await embedMany({
        model: embeddingModel,
        values: chunks
    });

    return embeddings.map((e, i) => ({
        embedding: e,
        content: chunks[i],
    }));
}

const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll('\\n', ' ');

    const { embedding } = await embed({
        model:embeddingModel,
        value: input,
    });

    return embedding;
}

export const findRelevantContent = async (userQuery: string) => {
    const userQueryEmbedded = await generateEmbedding(userQuery);
    const similarity = sql<number>`1 - (${cosineDistance(
      embeddings.embedding,
      userQueryEmbedded,
    )})`;

    const similarGuides = await db
      .select({ name: embeddings.content, similarity })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy(t => desc(t.similarity))
      .limit(4);
      
    return similarGuides;
  };