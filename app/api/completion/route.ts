// app/api/completion/route.ts
 
import OpenAI from 'openai';
import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai';
 
export const runtime = 'edge';
 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)
 
export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
 
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'user',
        content: `You're an successful health insurance advisor that specialises in helping customers understand health insurance by tailoring content as per user's requirements.
        ---
        Task: Summarise in 200 words and format output in markdown.
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