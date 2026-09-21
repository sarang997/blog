import { sitePath } from "../../lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <p>© {new Date().getFullYear()} Sarang Bhatnagar</p>
        <div>
          <a href={sitePath("/rss.xml")}>RSS</a>
          <a href="https://github.com/sarang997" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
