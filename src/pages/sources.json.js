import { loadSourcesIndex } from '../lib/sources/load.mjs';

export async function GET() {
  const index = await loadSourcesIndex();
  const body = JSON.stringify({ generatedAt: new Date().toISOString(), ...index }, null, 2);
  return new Response(body, { headers: { 'Content-Type': 'application/json' } });
}
