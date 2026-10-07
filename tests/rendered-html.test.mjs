import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const clientDirectory = resolve(import.meta.dirname, "..", "dist", "client");

async function output(path) {
  return readFile(resolve(clientDirectory, path), "utf8");
}

test("exports the editorial home page at the GitHub Pages base path", async () => {
  const html = await output("index.html");
  assert.match(html, /I build data pipelines, backend services and distributed systems/);
  assert.match(html, /MSc in Statistics and Data Science/);
  assert.match(html, /ML operations in C/);
  assert.match(html, /Sarang Bhatnagar/);
  assert.match(html, /href="\/blog\/writing\//);
  assert.match(html, /href="\/blog\/work\//);
  assert.match(html, /href="\/blog\/assets\//);
  assert.match(html, /href="\/blog\/rss\.xml"/);
  assert.doesNotMatch(html, /href="\/assets\//);
  assert.doesNotMatch(html, /<span>structure<\/span>|Learning in public, from the metal up/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("exports the new ML reading note with its core ideas", async () => {
  const html = await output("writing/what-cnns-give-image-models-for-free/index.html");
  assert.match(html, /What CNNs give image models for free/);
  assert.match(html, /locality and translation equivariance/);
  assert.match(html, /more data, stronger regularisation, or useful pretraining/);
  assert.match(html, /A different kind of assumption in VAEs/);
  assert.match(html, /class="katex"/);
  assert.match(html, /href="\/blog\/writing\/tensor-without-numpy\//);
  assert.match(html, /https:\/\/sarang997\.github\.io\/blog\/writing\/what-cnns-give-image-models-for-free\//);
});

test("exports the existing articles, figures, feed and sitemap", async () => {
  const html = await output("writing/training-autonomous-cars-unity-ml-agents/index.html");
  assert.match(html, /Training autonomous cars in Unity with ML-Agents/);
  assert.match(html, /article-links/);
  assert.match(html, /\/blog\/figures\/training-autonomous-cars-unity-ml-agents\/sensor-rays-overview\.png/);
  assert.match(html, /cumulative-reward\.png/);
  assert.match(html, /decision-frequency\.gif/);
  assert.match(html, /Proximal Policy Optimization/);
  assert.match(html, /summary_large_image/);
  const rssHtml = await output("rss.xml");
  assert.match(rssHtml, /<rss version="2.0">/);
  assert.match(rssHtml, /What CNNs give image models for free/);
  const sitemapHtml = await output("sitemap.xml");
  assert.match(sitemapHtml, /<urlset/);
  assert.match(sitemapHtml, /https:\/\/sarang997\.github\.io\/blog\/writing\/what-cnns-give-image-models-for-free\//);
  const workHtml = await output("work/index.html");
  assert.doesNotMatch(workHtml, /The question|The approach/);
  assert.match(await output("404.html"), /This page is not in the index/);
  await access(resolve(clientDirectory, ".nojekyll"));
});
