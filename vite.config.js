import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    })
  ],
  build: {
    // GitHub Pages (Deploy from branch) only allows /(root) or /docs as source.
    outDir: "docs",
    emptyOutDir: true
  }
});
