import type { APIRoute, GetStaticPaths } from "astro";
import { getDocsCollection } from "../utils/content";
import { stringifyCleanMarkdown } from "../utils/markdown";
import { markdownResponse } from "../utils/response";

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = await getDocsCollection();
  return docs.map((doc: { id: string }) => ({ params: { slug: doc.id } }));
};

export const GET: APIRoute = async ({ params }) => {
  const docs = await getDocsCollection();
  const entry = docs.find((d) => d.id === params.slug);
  if (!entry?.body) return new Response(null, { status: 404 });
  return markdownResponse(stringifyCleanMarkdown(entry.body));
};
