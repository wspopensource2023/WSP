import { defineConfig } from "vite";
// @ts-ignore
import nested from "tailwindcss/nesting";
import tailwindcss from "tailwindcss";
import tailwindcssConfig from "./tailwind.config.js"; // 注意匹配实际文件
// @ts-ignore
import postcssPresetEnv from "postcss-preset-env";
import uni from "@dcloudio/vite-plugin-uni";
import uniTailwind from "@uni-helper/vite-plugin-uni-tailwind";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/",
    css: {
        postcss: {
            plugins: [
                nested(),
                tailwindcss({
                    config: tailwindcssConfig,
                }),
                postcssPresetEnv({
                    stage: 3,
                    features: {
                        "nesting-rules": false,
                    },
                }),
            ],
        },
    },
    plugins: [
        uni(),
        uniTailwind({
            /* options */
        }),
    ],
    build: {
        outDir: "dist",
        assetsDir: "app/assets",
        rollupOptions: {},
    },
});
