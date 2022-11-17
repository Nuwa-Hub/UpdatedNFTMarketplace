/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		screens: {
			xs: "475px",

			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		extend: {
			padding: {
				"1/2": "50%",
				"1/4": "25%",
				full: "100%",
			},
		},
	},
	variants: {
		extend: {
			display: [
				"group-hover",
				"responsive",
				"group-hover",
				"focus-within",
				"first",
				"last",
				"odd",
				"even",
				"hover",
				"focus",
				"active",
				"visited",
				"disabled",
			],
		},
	},
	colors: {
		transparent: "transparent",
		current: "currentColor",
		white: "#ffffff",
		purple: "#3f3cbb",
		midnight: "#121063",
		metal: "#565584",
		tahiti: "#3ab7bf",
		silver: "#ecebff",
		"bubble-gum": "#ff77e9",
		bermuda: "#78dcca",
		slate: "#e2e8f0",
	},
	boxShadow: {
		"3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
	},
	borderWidth: {
		DEFAULT: "1px",
		0: "0",
		2: "2px",
		3: "3px",
		4: "4px",
		6: "6px",
		10: "10px",
	},
	plugins: [require("@tailwindcss/forms")],
	darkMode: "class",
};
