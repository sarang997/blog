import type { Metadata } from "next";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { ResearchFeature } from "../components/research-feature";
import { engineeringWork, earlierWork, projects } from "../../lib/site-data";
import { absoluteUrl } from "../../lib/site";

export const metadata: Metadata = {
  title: "Work and Research",
  description: "Data engineering and distributed systems work, MSc research in audio classification, and independent software projects by Sarang Bhatnagar.",
  alternates: { canonical: absoluteUrl("/work/") },
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="interior-main shell work-main">
        <header className="page-intro">
          <p className="eyebrow">Engineering and research</p>
          <h1>Work</h1>
          <p>Data systems I’ve built, my MSc research, and projects I work on independently.</p>
        </header>

        <section className="work-section" id="engineering" aria-labelledby="engineering-title">
          <div className="simple-heading">
            <h2 id="engineering-title">Engineering work</h2>
          </div>
          <p className="section-intro">Data Engineer at Knimbus · December 2022 to September 2025</p>
          <div className="engineering-list">
            {engineeringWork.map((work) => (
              <article className="engineering-row" key={work.slug} id={work.slug}>
                <h3>{work.title}</h3>
                <div>
                  <p>{work.summary}</p>
                  <p>{work.detail}</p>
                  <p className="work-tools">{work.technologies.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="earlier-work">
            {earlierWork.map((work) => (
              <article key={work.company}>
                <h3>{work.company}</h3>
                <p className="earlier-work-meta">{work.role} · {work.dates}</p>
                <p>{work.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="work-section" id="research" aria-labelledby="research-title">
          <div className="simple-heading">
            <h2 id="research-title">Research</h2>
          </div>
          <ResearchFeature detailed />
        </section>

        <section className="work-section" id="projects" aria-labelledby="projects-title">
          <div className="simple-heading">
            <h2 id="projects-title">Independent projects</h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.slug} id={project.slug}>
                <div>
                  <p className="work-kicker">{project.year}</p>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>
                <div className="project-meta">
                  <span>{project.technologies.join(" · ")}</span>
                  <a href={project.url} target="_blank" rel="noreferrer">View code</a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
