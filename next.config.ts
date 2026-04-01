import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*"],
  turbopack: {},
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
