import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const index = params.index;
  const res = await fetch(`https://www.dnd5eapi.co/api/conditions/${index}`);
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};