import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  devIndicators: false,
  reactCompiler: true,
  images: {
    qualities: [100, 75],
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
