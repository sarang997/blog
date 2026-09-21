import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { experience, projects, socialLinks } from "../lib/site-data";
import { getAllPosts } from "../lib/content";
import { PostList } from "./components/post-list";
import { sitePath } from "../lib/site";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <SiteHeader />
      <main className="home-main shell">
        <section className="profile-intro" aria-labelledby="profile-name">
          <div className="profile-copy">
            <h1 id="profile-name">Sarang Bhatnagar</h1>
            <p className="profile-role">
              End-to-end data guy. I enjoy the whole process—from building
              production-grade data systems and reliable pipelines to training
              predictive and deep-learning models.
            </p>
            <p className="profile-summary">
              Through my MSc in Statistics &amp; Data Science at the University
              of Bath, I’ve built a deep understanding of statistics, so I care
              about both how models work and how they perform in the real world.
            </p>
            <div className="profile-links" aria-label="Contact links">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                >
                  {link.label}
                  {link.external && <span aria-hidden="true"> ↗</span>}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="writing-title">
          <div className="simple-heading">
            <h2 id="writing-title">Writing</h2>
            <a href={sitePath("/writing/")}>View all</a>
          </div>
          <PostList posts={posts} />
        </section>

        <section className="home-section" aria-labelledby="work-title">
          <div className="simple-heading">
            <h2 id="work-title">Selected work</h2>
            <a href={sitePath("/work/")}>View details</a>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.slug}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.shortDescription}</p>
                </div>
                <div className="project-meta">
                  <span>{project.technologies.join(" · ")}</span>
                  <a href={project.url} target="_blank" rel="noreferrer">Repository ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section" id="experience" aria-labelledby="experience-title">
          <div className="simple-heading">
            <h2 id="experience-title">Experience</h2>
          </div>
          <div className="experience-table">
            {experience.map((role) => (
              <article key={`${role.company}-${role.role}`}>
                <p className="experience-period">{role.dates}</p>
                <div>
                  <h3>{role.role}</h3>
                  <p className="experience-company">{role.company}</p>
                </div>
                <p>{role.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section contact-section" aria-labelledby="contact-title">
          <h2 id="contact-title">Contact</h2>
          <p>
            For work, research discussions, or questions about a project, email
            me at <a href="mailto:bhatnagar.sarang1@gmail.com">bhatnagar.sarang1@gmail.com</a>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
