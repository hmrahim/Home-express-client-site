import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, 
      },
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "Home Express",
        short_name: "HomeExpress",
        theme_color: "#0f172a",
        display: "standalone",
      },
    }),
  ],
});
