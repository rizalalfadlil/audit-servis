import { client } from "@/backend/config/kolosal";
import { prompt } from "@/utils/prompt";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: Request) {
  const systemMessage = {
    role: "system" as const,
    content: prompt.systemInstruction,
  };
  const { messages }: { messages: Message[] } = await req.json();
  const completion = await client.chat.completions.create({
    model: "Qwen 3 30BA3B",
    messages: [systemMessage, ...messages],
  });
  return Response.json(completion.choices[0].message.content);
}
