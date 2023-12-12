import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

export async function POST(req: Request) {
  const messages = await req.json();

  try {
    const externalResponse = await fetch('https://ritikmdn--web-guide-chat-v0-web.modal.run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(messages)
    });
    if (!externalResponse.ok) {
      throw new Error(`HTTP error! Status: ${externalResponse.status}`);
    }

    const responseText = await externalResponse.text();
    const answer = JSON.parse(responseText).response;

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