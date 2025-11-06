import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly pin the project root so Turbopack doesn't pick a parent workspace.
    root: __dirname,
  },
};

export default nextConfig;
