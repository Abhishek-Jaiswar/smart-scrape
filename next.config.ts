import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Disables TypeScript errors in Vercel
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint in Vercel
  },
  trailingSlash: false, // Ensure this is false
};

export default nextConfig;
