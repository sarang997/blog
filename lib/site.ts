export const siteUrl = "https://sarang997.github.io/blog";

const basePath = (process.env.GITHUB_PAGES_BASE_PATH ?? "").replace(/\/$/, "");

export function sitePath(path: string): string {
  if (/^(?:[a-z]+:|#)/i.test(path)) return path;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalizedPath}`;
}
