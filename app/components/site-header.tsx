import { sitePath } from "../../lib/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a className="wordmark" href={sitePath("/")} aria-label="Sarang Bhatnagar, home">
          Sarang Bhatnagar
        </a>
        <div className="header-actions">
          <nav aria-label="Primary navigation">
            <a href={sitePath("/writing/")}>Writing</a>
            <a href={sitePath("/work/")}>Work</a>
            <a href={sitePath("/#experience")}>Experience</a>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
