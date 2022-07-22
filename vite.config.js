import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    server: {
        https: true,
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/index.tsx"],
            refresh: true,
        }),
    ],
});
