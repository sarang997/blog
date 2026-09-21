import GithubSlugger from "github-slugger";
import hljs from "highlight.js";
import { marked } from "marked";
import markedFootnote from "marked-footnote";
import { gfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import readingTime from "reading-time";
import { parse as parseYaml } from "yaml";
import { sitePath } from "./site";
import autonomousCarsSource from "../content/writing/training-autonomous-cars-unity-ml-agents.mdx?raw";
import tensorSource from "../content/writing/tensor-without-numpy.mdx?raw";
import transformerSource from "../content/writing/tiny-transformer-jax.mdx?raw";
import visionAssumptionsSource from "../content/writing/what-cnns-give-image-models-for-free.mdx?raw";

function withBasePath(path: string): string {
  return sitePath(path);
}

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  topics: string[];
  featured: boolean;
  type: string;
  coverImage?: string;
  coverImageAlt?: string;
  readingTime: string;
};

export type TableOfContentsItem = {
  level: 2 | 3;
  title: string;
  id: string;
};

export type Post = PostMeta & {
  body: string;
  html: string;
  tableOfContents: TableOfContentsItem[];
};

const sources: Record<string, string> = {
  "training-autonomous-cars-unity-ml-agents": autonomousCarsSource,
  "tensor-without-numpy": tensorSource,
  "tiny-transformer-jax": transformerSource,
  "what-cnns-give-image-models-for-free": visionAssumptionsSource,
};

marked.use(
  markedFootnote(),
  markedKatex({ throwOnError: false, nonStandard: true }),
  gfmHeadingId(),
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, language) {
      const validLanguage = language && hljs.getLanguage(language) ? language : "plaintext";
      return hljs.highlight(code, { language: validLanguage }).value;
    },
  }),
);

function assertString(value: unknown, field: string, slug: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Post "${slug}" requires a non-empty ${field}.`);
  }
  return value;
}

function parsePost(slug: string, source: string): Post {
  const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!frontmatter) {
    throw new Error(`Post "${slug}" requires YAML frontmatter.`);
  }
  const data = parseYaml(frontmatter[1]) as Record<string, unknown>;
  const content = source.slice(frontmatter[0].length);
  const title = assertString(data.title, "title", slug);
  const description = assertString(data.description, "description", slug);
  const publishedAt = assertString(data.publishedAt, "publishedAt", slug);
  const type = typeof data.type === "string" && data.type.trim() ? data.type.trim() : "Project note";
  const coverImage = typeof data.coverImage === "string" ? withBasePath(data.coverImage.trim()) : undefined;
  const coverImageAlt = typeof data.coverImageAlt === "string" ? data.coverImageAlt.trim() : undefined;

  if (Number.isNaN(Date.parse(publishedAt))) {
    throw new Error(`Post "${slug}" has an invalid publishedAt date.`);
  }
  if (!Array.isArray(data.topics) || !data.topics.every((topic) => typeof topic === "string")) {
    throw new Error(`Post "${slug}" requires a string array for topics.`);
  }
  if ((coverImage && !coverImageAlt) || (!coverImage && coverImageAlt)) {
    throw new Error(`Post "${slug}" requires coverImage and coverImageAlt together.`);
  }

  const slugger = new GithubSlugger();
  const tableOfContents: TableOfContentsItem[] = [];
  for (const match of content.matchAll(/^(#{2,3})\s+(.+)$/gm)) {
    const titleText = match[2].replace(/[*_`]/g, "").trim();
    tableOfContents.push({
      level: match[1].length as 2 | 3,
      title: titleText,
      id: slugger.slug(titleText),
    });
  }

  const html = (marked.parse(content, { async: false }) as string).replace(
    /\bsrc=(["'])\/(?!\/)/g,
    `src=$1${process.env.GITHUB_PAGES_BASE_PATH ?? ""}/`,
  );
  return {
    slug,
    title,
    description,
    publishedAt,
    updatedAt: typeof data.updatedAt === "string" ? data.updatedAt : undefined,
    topics: data.topics,
    featured: data.featured === true,
    type,
    coverImage,
    coverImageAlt,
    readingTime: readingTime(content).text,
    body: content,
    html,
    tableOfContents,
  };
}

const posts = Object.entries(sources)
  .map(([slug, source]) => parsePost(slug, source))
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

function toMeta(post: Post): PostMeta {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    topics: post.topics,
    featured: post.featured,
    type: post.type,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    readingTime: post.readingTime,
  };
}

export function getAllPosts(): PostMeta[] {
  return posts.map(toMeta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getAdjacentPosts(slug: string): { previous?: PostMeta; next?: PostMeta } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return {
    previous: posts[index + 1] ? toMeta(posts[index + 1]) : undefined,
    next: posts[index - 1] ? toMeta(posts[index - 1]) : undefined,
  };
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
