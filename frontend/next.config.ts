import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚡ Ignore ESLint errors during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;