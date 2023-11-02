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
        role: 'user',
        content: `You're an expert health insurance advisor that specialises in helping customers understand health insurance by tailoring content as per user's requirements.
        ---
        Task: Personalise a dark humour joke for the user, convincing them to buy health insurance. Restrict the joke to 5 lines.
        ---
        ${prompt}
        ---
        Output:\n`,
      },
    ],
    temperature: 0.3,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
 
  const stream = OpenAIStream(response);
 
  return new StreamingTextResponse(stream);
}