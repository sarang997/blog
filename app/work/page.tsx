import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { projects } from "../../lib/site-data";
import { absoluteUrl, sitePath } from "../../lib/site";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected work in machine learning, data engineering and distributed systems.",
  alternates: { canonical: absoluteUrl("/work/") },
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main className="interior-main">
        <header className="page-intro shell">
          <p className="eyebrow">Projects</p>
          <h1>Selected work</h1>
          <p>Projects in machine learning, data engineering and distributed systems.</p>
        </header>
        <section className="work-index shell" aria-label="Selected projects">
          {projects.map((project) => (
            <article className="work-index-item" key={project.slug} id={project.slug}>
              <div>
                <p className="work-kicker">{project.kicker} · {project.year}</p>
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>
              </div>
              <div className="work-index-meta">
                <p>{project.technologies.join(" · ")}</p>
                <a href={sitePath(project.url)} target="_blank" rel="noreferrer">{project.linkLabel ?? "Repository"} ↗</a>
              </div>
            </article>
          ))}
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
