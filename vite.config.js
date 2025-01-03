import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" }); // Load the custom config.env file

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
});
