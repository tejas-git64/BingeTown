import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
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
		],
	},
};

export default nextConfig;
