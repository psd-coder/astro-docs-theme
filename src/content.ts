import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { docEntryDataSchema } from "./utils/schemas";

type Options = {
  directory?: string;
  pattern?: string;
};

export function defineDocsCollections(options: Options = {}) {
  return {
    docs: defineCollection({
      loader: glob({
        pattern: options.pattern ?? "**/*.{md,mdx}",
        base: options.directory ?? "src/content/docs",
      }),
      schema: docEntryDataSchema,
    }),
  };
}
