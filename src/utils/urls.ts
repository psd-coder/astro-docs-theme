import type { AstroGlobal } from "astro";

export function getHref(href: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = href.startsWith("/") ? href.slice(1) : href;
  // "/base/index" → "/base/", "/base/foo/index" → "/base/foo/", others untouched.
  return (base + normalized).replace(/(^|\/)index$/, "$1");
}

export function isActiveHref(ctx: AstroGlobal, href: string): boolean {
  const currentPath = ctx.url.pathname;
  const base = import.meta.env.BASE_URL;
  const fullPath = getHref(href);

  if (fullPath === base || fullPath === base.replace(/\/$/, "")) {
    return currentPath === base || currentPath === base.replace(/\/$/, "");
  }

  return currentPath.startsWith(fullPath);
}
