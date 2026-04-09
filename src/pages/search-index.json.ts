import type { APIRoute } from "astro";
import { slug as githubSlug } from "github-slugger";
import type { BlockEntry } from "../components/Search/types";
import { docsConfig } from "virtual:theme-integration-config";
import { getDocsCollection } from "../utils/content";
import { splitMarkdownIntoSections } from "../utils/markdown";
import { jsonResponse } from "../utils/response";

export const GET: APIRoute = async () => {
  if (!docsConfig) {
    return jsonResponse([]);
  }

  const docs = await getDocsCollection();
  const index: BlockEntry[] = [];

  for (const entry of docs) {
    if (!entry.body) continue;

    const sections = splitMarkdownIntoSections(entry.body);
    const slugOccurrences = new Map<string, number>();

    for (const section of sections) {
      let anchor = "";
      if (section.heading) {
        const baseSlug = githubSlug(section.heading);
        const count = slugOccurrences.get(baseSlug) ?? 0;
        anchor = count === 0 ? baseSlug : `${baseSlug}-${count}`;
        slugOccurrences.set(baseSlug, count + 1);
      }

      if (!section.body && !section.heading) continue;

      index.push({
        pageId: entry.id,
        pageTitle: entry.data.title,
        pageOrder: entry.data.order,
        heading: section.heading,
        anchor,
        body: section.body,
      });
    }
  }

  return jsonResponse(index);
};
