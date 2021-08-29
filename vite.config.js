import { defineConfig, Plugin } from "vite";
import { minifyHtml } from "vite-plugin-html";
import liveReload from "vite-plugin-live-reload";

export default defineConfig({
    plugins: [
        minifyHtml(),
        liveReload([
            "./**/*.html",
            "./src/scss/**/*.scss"
        ])
    ]
});
