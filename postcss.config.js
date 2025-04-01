const tailwindcss = require('tailwindcss')('./tailwind.config.js');
const autoprefixer = require('autoprefixer');

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [
    tailwindcss,    // Tailwind CSS
    autoprefixer,   // Add vendor prefixes to your CSS
  ]
}

module.exports = config;