import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    // HSTS on pages too (Netlify otherwise adds its own 1-year value to pages); matches netlify.toml.
    return [{ source: "/:path*", headers: [{ key: "Strict-Transport-Security", value: "max-age=63072000" }] }];
  },
  async redirects() {
    return [
      // Retired page from an earlier campaign.
      { source: "/silentstack", destination: "/services", permanent: true },
      { source: "/silentstack/:path*", destination: "/services", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
