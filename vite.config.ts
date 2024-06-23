import react from "@vitejs/plugin-react-swc";
import { compression } from "vite-plugin-compression2";
import preload from "vite-plugin-preload";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		preload({
			includeCss: true,
			includeJs: true,
			mode: "prefetch",
		}),
		compression({ algorithm: "brotliCompress", deleteOriginalAssets: false }),
	],
	build: {
		outDir: "./dist",
		minify: true,
		cssCodeSplit: true,
		modulePreload: true,
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
