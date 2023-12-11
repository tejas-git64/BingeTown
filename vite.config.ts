import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), splitVendorChunkPlugin()],
	build: {
		outDir: "./dist",
		minify: true,
		rollupOptions: {
			output: {
				globals: {
					react: "React",
				},
				manualChunks: (id: string) => {
					if (id.includes("react")) {
						return "react";
					}
					if (id.includes("react-router-dom") || id.includes("react-router")) {
						return "react-router";
					}
					if (id.includes("framer-motion")) {
						return "framer-motion";
					}
				},
			},
		},
	},
});
