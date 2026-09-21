import type { NextConfig } from "next";

const isPagesBuild = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isPagesBuild ? "export" : undefined,
  trailingSlash: isPagesBuild,
};

export default nextConfig;
