import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "primary": "#5865f2",
                "primary-hover": "#4855e2",
                "font-main": "#ffffff",
                "background": "#36393f",
                "background-secondary": "#202225",
                "icon": "#b9bbbe",
                "icon-hover": "#9ca3af",
            },
        },
    },

    plugins: [forms],
};
