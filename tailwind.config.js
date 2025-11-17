// tailwind.config.js
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                oswald: ['Oswald', 'sans-serif'],
                'pragati': ['"Pragati Narrow"', 'sans-serif'],
                'playfair': ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [],
}
