import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const res = await fetch("https://www.dnd5eapi.co/api/monsters");
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};