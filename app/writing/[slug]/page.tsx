import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { formatPostDate, getAdjacentPosts, getAllPosts, getPostBySlug } from "../../../lib/content";
import { absoluteUrl, sitePath } from "../../../lib/site";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Note not found" };
  const postUrl = absoluteUrl(`/writing/${post.slug}/`);

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: postUrl },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      tags: post.topics,
      url: postUrl,
      images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt }] : undefined,
    },
    twitter: {
      card: post.coverImage ? "summary_large_image" : "summary",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const adjacent = getAdjacentPosts(slug);

  return (
    <>
      <SiteHeader />
      <main className="article-page">
        <header className="article-hero shell">
          <a className="article-back" href={sitePath("/writing/")}><span aria-hidden="true">←</span> All field notes</a>
          <div className="article-hero-grid">
            <div>
              <p className="eyebrow">{post.topics.join(" · ")}</p>
              <h1>{post.title}</h1>
              <p className="article-deck">{post.description}</p>
            </div>
            <dl className="article-details">
              <div><dt>Published</dt><dd><time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time></dd></div>
              <div><dt>Reading time</dt><dd>{post.readingTime}</dd></div>
              <div><dt>Type</dt><dd>{post.type}</dd></div>
            </dl>
          </div>
        </header>
        <div className="article-layout shell">
          <aside className="article-toc" aria-label="On this page">
            <p>On this page</p>
            <ol>
              {post.tableOfContents.map((item) => (
                <li className={item.level === 3 ? "toc-subitem" : undefined} key={item.id}>
                  <a href={`#${item.id}`}>{item.title}</a>
                </li>
              ))}
            </ol>
          </aside>
          <article className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <nav className="article-pagination shell" aria-label="More writing">
          {adjacent.previous ? (
            <a href={sitePath(`/writing/${adjacent.previous.slug}/`)}>
              <span>Previous note</span><strong>{adjacent.previous.title}</strong>
            </a>
          ) : <span />}
          {adjacent.next ? (
            <a className="next-note" href={sitePath(`/writing/${adjacent.next.slug}/`)}>
              <span>Next note</span><strong>{adjacent.next.title}</strong>
            </a>
          ) : <span />}
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
