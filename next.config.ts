import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Add remote image hosts here if you serve assets from a CDN.
    ],
  },
};

export default nextConfig;
