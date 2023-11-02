// app/api/completion/route.ts
 
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
export const runtime = 'edge';
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});
 
export async function POST(req: Request) {

  const { prompt } = await req.json();
 
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: "system",
        content: "Task: Personalise the reference guide as per user's details and preferences.\nThe output should be \n(i) summarised in less than 200 words with funny tone, \n(ii) formatted in markdown, \n (iii) no title but include sub titles"
      },
      {
        role: 'user',
        content: `
        ${prompt}
        \n---\n
        Output:\n`,
      },
    ],
    temperature: 0.1,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}