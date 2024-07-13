import { openai } from "@ai-sdk/openai";
import { embedMany } from "ai";

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