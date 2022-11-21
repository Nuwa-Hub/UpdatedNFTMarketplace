import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'ff9v4k',
  e2e: {
    // baseUrl: 'https://updated-nft-marketplace.vercel.app/',
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
