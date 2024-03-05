import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  projectId: "x61mvz",
  e2e: {
    baseUrl: "http://localhost:3000/",
    setupNodeEvents(_on, _config) {},
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  env: {
    ...process.env,
  },
});
