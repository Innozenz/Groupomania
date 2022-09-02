module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                like:  {
                    DEFAULT: '#ffffff',
                    blue: '#3B82F6',
                } ,
                groupomania_dark: {
                    DEFAULT: "#FFFFFF",
                    brighter: "#091f43",
                    brightest: "#d1515a",
                },
                groupomania_border: {
                    DEFAULT: "#d1515a",
                },
                groupomania_text: {
                    DEFAULT: "rgb(215,218,220)",
                    darker: "#F5F5DC",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
