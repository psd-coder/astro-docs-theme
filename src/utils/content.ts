import { z } from "astro/zod";
import { getCollection } from "astro:content";
import { docEntrySchema } from "./schemas";
import { getHref } from "./urls";

export async function getDocsCollection() {
  const docs = await getCollection("docs");
  const parsedDocs = z.array(docEntrySchema).parse(docs);

  return parsedDocs.sort((a, b) => a.data.order - b.data.order);
}

export type DocEntry = Awaited<ReturnType<typeof getDocsCollection>>[number];

export type DocPageProps = {
  doc: DocEntry;
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
};

export async function getDocsStaticPaths() {
  const docs = await getDocsCollection();

  return docs.map((doc, i) => {
    const prev = docs[i - 1];
    const next = docs[i + 1];
    const props: DocPageProps = {
      doc,
      prev: prev ? { title: prev.data.title, href: getHref(prev.id) } : undefined,
      next: next ? { title: next.data.title, href: getHref(next.id) } : undefined,
    };

    return {
      params: { slug: doc.id === "index" ? undefined : doc.id },
      props,
    };
  });
}
