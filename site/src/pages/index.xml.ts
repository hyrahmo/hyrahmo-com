import type { APIRoute } from 'astro';

// Redirect root RSS to knowledge base RSS
export const GET: APIRoute = () => {
  return new Response(null, {
    status: 301,
    headers: { Location: '/kb/index.xml' },
  });
};
