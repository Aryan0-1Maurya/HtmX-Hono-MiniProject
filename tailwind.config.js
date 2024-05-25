/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
    "./html/**/*.{html,js}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'flex', 'items-center', 'rounded-full', 'bg-gray-100', 'text-gray-400', 'hover:text-gray-600', 
    'focus:outline-none', 'focus:ring-2', 'focus:ring-indigo-500', 'focus:ring-offset-2', 
    'focus:ring-offset-gray-100', 'h-5', 'w-5', 'sr-only'
  ],
}

