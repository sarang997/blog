import { spawn } from "node:child_process";
import { once } from "node:events";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { generateFeeds } from "./generate-feeds.mjs";

await generateFeeds();

const root = process.cwd();
const vinext = resolve(root, "node_modules", ".bin", process.platform === "win32" ? "vinext.cmd" : "vinext");
const child = spawn(vinext, ["build"], {
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    GITHUB_PAGES_BASE_PATH: process.env.GITHUB_PAGES_BASE_PATH ?? "/blog",
  },
  stdio: "inherit",
});

const [exitCode] = await once(child, "exit");
if (exitCode !== 0) process.exit(exitCode ?? 1);

const staticDirectory = resolve(root, "dist", "client");
const basePath = (process.env.GITHUB_PAGES_BASE_PATH ?? "/blog").replace(/\/$/, "");
const staticFiles = await readdir(staticDirectory, { recursive: true });

await Promise.all(staticFiles
  .filter((file) => file.endsWith(".html"))
  .map(async (file) => {
    const path = resolve(staticDirectory, file);
    const source = await readFile(path, "utf8");
    const rewritten = source
      .replaceAll('="/assets/_vinext_fonts/', `="${basePath}/assets/_vinext_fonts/`)
      .replaceAll("url(/assets/_vinext_fonts/", `url(${basePath}/assets/_vinext_fonts/`);
    if (rewritten !== source) await writeFile(path, rewritten);
  }));

await writeFile(resolve(staticDirectory, ".nojekyll"), "");
