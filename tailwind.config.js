/** @type {import('tailwindcss').Config} */
import animationDelay from "tailwindcss-animation-delay";
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				jakartaSans: ["Plus Jakarta Sans", "sans-serif"],
			},
			keyframes: {
				slide: {
					"0%,4%,5%": {
						transform: "translateX(0%)",
					},
					"6%,8%,9%": {
						transform: "translateX(-100%)",
					},
					"10%,14%,15%": {
						transform: "translateX(-200%)",
					},
					"16%,18%,19%": {
						transform: "translateX(-300%)",
					},
					"20%,24%,25%": {
						transform: "translateX(-400%)",
					},
					"26%,28%,29%": {
						transform: "translateX(-500%)",
					},
					"30%,34%,35%": {
						transform: "translateX(-600%)",
					},
					"36%,38%,39%": {
						transform: "translateX(-700%)",
					},
					"40%,44%,45%": {
						transform: "translateX(-800%)",
					},
					"46%,48%,49%": {
						transform: "translateX(-900%)",
					},
					"50%,54%,55%": {
						transform: "translateX(-1000%)",
					},
					"56%,58%,59%": {
						transform: "translateX(-1100%)",
					},
					"60%,64%,65%": {
						transform: "translateX(-1200%)",
					},
					"66%,68%,69%": {
						transform: "translateX(-1300%)",
					},
					"70%,74%,75%": {
						transform: "translateX(-1400%)",
					},
					"76%,78%,79%": {
						transform: "translateX(-1500%)",
					},
					"80%,84%,85%": {
						transform: "translateX(-1600%)",
					},
					"86%,88%,89%": {
						transform: "translateX(-1700%)",
					},
					"90%,94%,95%": {
						transform: "translateX(-1800%)",
					},
					"96%,98%,99%": {
						transform: "translateX(-1900%)",
					},
				},
			},
			animation: {
				slide: "slide 45s ease-in-out alternate infinite",
			},
			animationDelay: {
				1000: "1000ms",
				2000: "2000ms",
				3000: "3000ms",
				4000: "4000ms",
				5000: "5000ms",
			},
		},
	},
	variants: {
		animationDelay: ["responsive", "hover"],
	},
	plugins: [animationDelay],
};
