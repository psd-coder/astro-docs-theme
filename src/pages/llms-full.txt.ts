import type { APIRoute } from "astro";
import { siteConfig } from "virtual:theme-integration-config";
import { getDocsCollection } from "../utils/content";
import { stringifyCleanMarkdown } from "../utils/markdown";
import { markdownResponse } from "../utils/response";

export const GET: APIRoute = async () => {
  const docs = await getDocsCollection();
  const parts = docs.map(
    (doc) => `# ${doc.data.title}\n\n${stringifyCleanMarkdown(doc.body ?? "")}`,
  );
  const content = `# ${siteConfig.project.name}\n\n${siteConfig.project.description}\n\n${parts.join("\n\n")}`;

  return markdownResponse(content);
};
