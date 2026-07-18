import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./",
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg"],
      manifest: {
        name: "learn — Dave's study system",
        short_name: "learn",
        description: "Multimodal, spaced-repetition learning system — Splunk certs and beyond.",
        theme_color: "#0f172a",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "./",
        icons: [
          { src: "favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,json}"],
        runtimeCaching: [
          {
            urlPattern: /\/decks\/.*\.json$/,
            handler: "StaleWhileRevalidate",
            options: { cacheName: "deck-data" },
          },
        ],
      },
    }),
  ],
});
