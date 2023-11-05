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
        content: "You're a helpful health insurance advisor who personalises the reference guide as per user's details and preferences."
      },
      {
        role: 'user',
        content: `
        Task: Generate a personalised guide in less than 200 words
        \n---\n
        Output guidelines:\n(i) Funny and respectful\n(ii) Format in markdown (with no title)\n(iii) Re-order content basis user details\n(iv) Exclude irrelevant content
        \n---\n
        Please please ensure the guide is fun and personalised! Otherwise I might lose my job.
        \n---\n
        ${prompt}
        \n---\n
        Output:\n`
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