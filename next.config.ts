import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig: NextConfig = {
  images: apiBaseUrl
    ? {
        remotePatterns: [
          {
            hostname: new URL(apiBaseUrl).hostname,
            pathname: "/img_curry/**",
            port: new URL(apiBaseUrl).port,
            protocol: new URL(apiBaseUrl).protocol.replace(":", "") as "http" | "https",
          },
        ],
      }
    : undefined,
};

export default nextConfig;
