import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";

const siteUrl = "https://sarang997.github.io/blog";

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&apos;",
    "\"": "&quot;",
  })[character] ?? character);
}

async function getPosts(root) {
  const directory = resolve(root, "content", "writing");
  const entries = await readdir(directory);
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.endsWith(".mdx"))
      .map(async (entry) => {
        const source = await readFile(resolve(directory, entry), "utf8");
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
        if (!frontmatter) throw new Error(`${entry} needs YAML frontmatter.`);
        const data = parseYaml(frontmatter[1]);
        return {
          slug: entry.replace(/\.mdx$/, ""),
          title: data.title,
          description: data.description,
          publishedAt: data.publishedAt,
        };
      }),
  );
  return posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export async function generateFeeds(root = process.cwd()) {
  const posts = await getPosts(root);
  const publicDirectory = resolve(root, "public");
  const items = posts.map((post) => {
    const url = `${siteUrl}/writing/${post.slug}/`;
    return `    <item>\n      <title>${escapeXml(post.title)}</title>\n      <link>${url}</link>\n      <guid>${url}</guid>\n      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>\n      <description>${escapeXml(post.description)}</description>\n    </item>`;
  }).join("\n");
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>\n<rss version="2.0"><channel>\n  <title>Sarang Bhatnagar</title>\n  <link>${siteUrl}/</link>\n  <description>Field notes on data systems, statistics and machine learning.</description>\n${items}\n</channel></rss>\n`;
  const paths = ["/", "/writing/", "/work/", ...posts.map((post) => `/writing/${post.slug}/`)];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((path) => `  <url><loc>${siteUrl}${path}</loc></url>`).join("\n")}\n</urlset>\n`;

  await Promise.all([
    writeFile(resolve(publicDirectory, "rss.xml"), rss),
    writeFile(resolve(publicDirectory, "sitemap.xml"), sitemap),
  ]);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await generateFeeds();
}
