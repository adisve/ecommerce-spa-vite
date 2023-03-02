import { defineConfig } from "vite";

export default defineConfig({
  css: {
    devSourcemap: true
  },
  build: {
    outDir: "./dist",
    target: "esnext",
    polyfillDynamicImport: false
  },
  server: {
    port: 8080,
    hot: true
  }
});