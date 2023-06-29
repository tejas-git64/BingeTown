/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				jakartaSans: ["Plus Jakarta Sans", "sans-serif"],
			},
		},
	},
	plugins: [],
};
