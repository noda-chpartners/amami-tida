// @ts-check
import { defineConfig } from "astro/config";

// 公開URLが決まったら絶対URLになる。例: SITE_URL=https://example.com npm run build
const site = process.env.SITE_URL?.trim().replace(/\/$/, "");

// https://astro.build/config
export default defineConfig({
  site: site || undefined,
});
