import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { sitePath } from "../lib/site";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="not-found shell">
        <p className="eyebrow">404 / Outside the notebook</p>
        <h1>This page is not in the index.</h1>
        <p>The note may have moved, or the address may be incomplete.</p>
        <a className="text-link text-link-strong" href={sitePath("/")}>Return home <span aria-hidden="true">→</span></a>
      </main>
      <SiteFooter />
    </>
  );
}
