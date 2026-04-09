import { readFileSync } from "node:fs";
import type { RootContent } from "mdast";
import { toString } from "mdast-util-to-string";
import remarkParse from "remark-parse";
import { unified } from "unified";

const parser = unified().use(remarkParse);

function nodesToPlainText(nodes: RootContent[]): string {
  return nodes
    .map((n) => toString(n))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function cleanMarkdown(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n*/, "").replace(/^import\s+.*;\s*\n/gm, "");
}

export function readDocFile(directory: string, slug: string): string {
  let raw: string;
  try {
    raw = readFileSync(`${directory}/${slug}.md`, "utf-8");
  } catch {
    raw = readFileSync(`${directory}/${slug}.mdx`, "utf-8");
  }
  return cleanMarkdown(raw);
}

type Section = { title: string; methods: string[] };

export function extractSections(directory: string, slug: string): Section[] {
  const tree = parser.parse(readDocFile(directory, slug));
  const result: Section[] = [];

  for (const node of tree.children) {
    if (node.type !== "heading") continue;
    const text = toString(node);
    if (node.depth === 2) result.push({ title: text, methods: [] });
    else if (node.depth === 3 && result.length) result[result.length - 1]!.methods.push(text);
  }

  return result;
}

type MarkdownSection = { heading: string; level: number; body: string };

export function splitMarkdownIntoSections(raw: string): MarkdownSection[] {
  const tree = parser.parse(cleanMarkdown(raw));
  const sections: MarkdownSection[] = [];
  let heading = "";
  let level = 0;
  let buffer: RootContent[] = [];

  for (const node of tree.children) {
    if (node.type === "heading") {
      const body = nodesToPlainText(buffer);
      if (body || heading) sections.push({ heading, level, body });
      heading = toString(node);
      level = node.depth;
      buffer = [];
    } else {
      buffer.push(node);
    }
  }

  const body = nodesToPlainText(buffer);
  if (body || heading) sections.push({ heading, level, body });
  return sections;
}

export function formatSections(sections: Section[], deep: boolean): string[] {
  return sections.map((s) => {
    if (deep && s.methods.length) return `  - ${s.title}: ${s.methods.join(", ")}`;
    return `  - ${s.title}`;
  });
}
