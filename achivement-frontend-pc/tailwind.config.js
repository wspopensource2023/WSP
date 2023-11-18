/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
        preflight: false,
    },
    prefix: "tw-",
    content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            spacing: {
                '128': '32rem',
            }
        },
    },
    darkMode: "class",
    plugins: [],
};
