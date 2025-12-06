import OpenAI from "openai";

export const client = new OpenAI({
  apiKey: process.env.KOLOSAL_API_KEY,
  baseURL: "https://api.kolosal.ai/v1",
});