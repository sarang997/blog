import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { PostList } from "../components/post-list";
import { getAllPosts } from "../../lib/content";
import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on statistics, machine learning and data systems by Sarang Bhatnagar.",
  alternates: { canonical: absoluteUrl("/writing/") },
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="interior-main">
        <header className="page-intro shell">
          <p className="eyebrow">Notes and articles</p>
          <h1>Writing</h1>
          <p>
            Notes on statistics, machine learning, data engineering and systems
            I am building or studying.
          </p>
        </header>
        <section className="writing-index shell" aria-label="Published writing">
          <PostList posts={posts} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
