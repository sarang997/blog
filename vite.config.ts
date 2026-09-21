import vinext from "vinext";
import { defineConfig } from "vite";

const isPagesBuild = process.env.GITHUB_PAGES === "true";
const pagesBasePath = (process.env.GITHUB_PAGES_BASE_PATH ?? "/blog").replace(/\/$/, "");

export default defineConfig({
  base: isPagesBuild ? `${pagesBasePath}/` : "/",
  plugins: [vinext()],
});
