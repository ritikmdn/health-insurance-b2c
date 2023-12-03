import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json();
  const { messages } = json;

  try {
    const query = encodeURIComponent(messages[messages.length - 1].content);
    const externalResponse = await fetch(`https://ritikmdn--web-guide-chat-v0-web.modal.run?query=${query}`);
    
    if (!externalResponse.ok) {
      throw new Error(`HTTP error! Status: ${externalResponse.status}`);
    }

    const responseText = await externalResponse.text();
    const answer = JSON.parse(responseText).answer;

    return new Response(answer, {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    // Check if error is an instance of Error and then access its message property
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}