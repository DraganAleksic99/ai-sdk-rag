import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import { z } from "zod";
import { createResource } from "@/lib/actions/resources";
import { findRelevantContent } from "@/lib/ai/embeddings";

export const maxDuration = 30;

export async function POST(request: Request) {
    const { messages } = await request.json();

    const result = await streamText({
        model: openai("gpt-4"),
        system: `You are a helpful assistant. Check your knowledge base before answering any questions.
            Only respond to questions using information from tool calls.
            If no relevant information is found in the tool calls, respond "Sorry, I don't know."`,
        messages: convertToCoreMessages(messages),
        tools: {
            addResource: tool({
                description: `Add a resource to your knowledge base.
                    If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
                parameters: z.object({
                    content: z
                        .string()
                        .describe('The content or resource to add to the knowledge base'),
                }),
                execute: async ({ content }) => createResource({ content }),
            }),
            getInformation: tool({
                description: "Get information from your knowledge base to answer questions.",
                parameters: z.object({
                    question: z.string().describe("The users question"),
                }),
                execute: async ({ question }) => findRelevantContent(question),
            })
        },   
    });

    return result.toAIStreamResponse();
}