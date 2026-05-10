import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Use relative base so the built assets resolve correctly whether the site is
// served from a custom domain (ozedtransport.com) or a GitHub Pages project
// subpath (username.github.io/ozed-transport/). Absolute "/" paths break the
// project-subpath case and cause GitHub to respond with the HTML 404 page,
// which the browser then refuses with the "application/octet-stream" /
// "Expected a JavaScript-or-Wasm module script" MIME error.
export default defineConfig(({ mode }) => ({
  base: "./",
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
  },
}));
