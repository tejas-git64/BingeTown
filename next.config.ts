import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "api.dicebear.com",
        protocol: "https",
      },
      {
        hostname: "upload.wikimedia.org",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "image.tmdb.org",
        protocol: "https",
      },
      {
        hostname: "img.youtube.com",
        protocol: "https",
      },
      {
        hostname: "i.pinimg.com",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
