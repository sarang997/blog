import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ResearchFeature } from "./components/research-feature";
import { engineeringWork, projects, socialLinks } from "../lib/site-data";
import { getAllPosts } from "../lib/content";
import { PostList } from "./components/post-list";
import { sitePath } from "../lib/site";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="home-main shell">
        <section className="profile-intro" aria-labelledby="profile-name">
          <div className="profile-copy">
            <p className="eyebrow">Data engineering · Statistics · Machine learning</p>
            <h1 id="profile-name">Sarang Bhatnagar</h1>
            <p className="profile-role">
              I build data pipelines, backend services and distributed systems.
            </p>
            <p className="profile-summary">
              I recently completed an MSc in Statistics and Data Science at the
              University of Bath, where I studied statistical modelling,
              machine learning and the mathematics behind them.
            </p>
            <div className="profile-links" aria-label="Contact and research links">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}>
                  {link.label}
                </a>
              ))}
              <a href={sitePath("/dissertation.pdf")} target="_blank" rel="noreferrer">Dissertation PDF</a>
            </div>
          </div>
          <aside className="profile-background" aria-label="Background">
            <p className="profile-location">London, UK</p>
            <p className="background-label">University of Bath</p>
            <p className="background-degree">MSc Statistics<br />and Data Science</p>
            <p className="background-date">Completed September 2026</p>
            <a href={sitePath("/work/#research")}>Audio classification research</a>
          </aside>
        </section>

        <section className="home-section" id="experience" aria-labelledby="engineering-title">
          <div className="simple-heading">
            <h2 id="engineering-title">Engineering work</h2>
            <a href={sitePath("/work/#engineering")}>More about the work</a>
          </div>
          <p className="section-intro">Data Engineer at Knimbus · December 2022 to September 2025</p>
          <div className="engineering-list">
            {engineeringWork.slice(0, 2).map((work) => (
              <article className="engineering-row" key={work.slug}>
                <h3>{work.title}</h3>
                <div>
                  <p>{work.summary}</p>
                  <p className="work-tools">{work.technologies.join(" · ")}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" aria-labelledby="research-title">
          <div className="simple-heading">
            <h2 id="research-title">Research</h2>
            <a href={sitePath("/work/#research")}>Methods and findings</a>
          </div>
          <ResearchFeature />
        </section>

        <section className="home-section" aria-labelledby="projects-title">
          <div className="simple-heading">
            <h2 id="projects-title">Projects</h2>
            <a href={sitePath("/work/#projects")}>All projects</a>
          </div>
          <p className="section-intro">Independent work in systems and machine learning.</p>
          <div className="project-list">
            {projects.slice(0, 2).map((project) => (
              <article className="project-row" key={project.slug}>
                <div>
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

        <section className="home-section" aria-labelledby="writing-title">
          <div className="simple-heading">
            <h2 id="writing-title">Writing</h2>
            <a href={sitePath("/writing/")}>All notes</a>
          </div>
          <p className="section-intro">Notes from things I’m building, reading and trying to understand.</p>
          <PostList posts={posts.slice(0, 3)} />
        </section>

        <section className="home-section personal-section" id="about" aria-labelledby="about-title">
          <div>
            <h2 id="about-title">Outside work</h2>
            <p>
              I play competitive chess, with an ECF rating of 2030. I’ve also spent
              time learning Indian classical music and tabla, and recording and
              producing music at home. That interest in sound was one reason I
              chose audio classification for my dissertation.
            </p>
          </div>
          <div className="contact-note">
            <h2>Get in touch</h2>
            <p>For work, research or a conversation about something on this site:</p>
            <a href="mailto:bhatnagar.sarang1@gmail.com">bhatnagar.sarang1@gmail.com</a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
