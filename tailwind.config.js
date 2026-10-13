/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#FF6B5B',
                secondary: '#7A7A7A',
                ink: {
                    950: '#09090b',
                    900: '#111113',
                    800: '#18181b',
                    700: '#27272a',
                },
            },
            fontFamily: {
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
