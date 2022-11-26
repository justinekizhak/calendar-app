import * as path from "path";
import devtools from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    devtools({
      name: true,
      componentLocation: true,
    }),
    solidPlugin(),
    WindiCSS(),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
