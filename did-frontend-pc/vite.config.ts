import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            static: fileURLToPath(
                new URL("./public/app/did/static", import.meta.url)
            ),
        },
    },
    build: {
        assetsDir: "app/did/assets",
    },
});
