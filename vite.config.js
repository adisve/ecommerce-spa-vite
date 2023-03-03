import { defineConfig } from "vite";
import liveReload from 'vite-plugin-live-reload';

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
  },
  plugins: [
    liveReload('./html/**/*.html', { alwaysReload: true })
  ]
});