module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                groupomania_dark: {
                    DEFAULT: "#030303",
                    brighter: "#1a1a1a",
                    brightest: "#272728",
                },
                groupomania_border: {
                    DEFAULT: "#343536",
                },
                groupomania_text: {
                    DEFAULT: "rgb(215,218,220)",
                    darker: "#818384",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
