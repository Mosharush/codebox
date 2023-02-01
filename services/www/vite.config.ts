import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import config from "@c/config";

// https://vitejs.dev/config/
export default defineConfig({
  ssr: {
    external: ["child_process"],
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: config.port,
    host: config.host,
    proxy: {
      "/api": {
        target: config.api.proxy_url,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
