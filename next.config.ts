import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "biztoc.com",
      },
      {
        protocol: "https",
        hostname: "i0.statig.com.br",
      },
      {
        protocol: "https",
        hostname: "r2.thesportsdb.com",
      },
    ],
  },
};

export default nextConfig;