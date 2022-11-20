/** @type {import('next').NextConfig} */
// const withPWA = require("next-pwa");

// const nextConfig = {
// 	reactStrictMode: true,
// 	compiler: {
// 		styledComponents: true,
// 	},
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//   },

// };

const withPWA = require("next-pwa")({
	dest: "public",
});

module.exports = withPWA({
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
});
// module.exports = nextConfig;
