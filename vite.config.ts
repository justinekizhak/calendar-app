import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import * as path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [solidPlugin(), WindiCSS()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
