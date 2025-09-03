/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                'rubik': ['var(--font-rubik)', 'Arial', 'sans-serif'],
            },
            colors: {
                primary: '#B8A47E', // Refined gold accent
                'primary-light': '#D4C7AD',
                'primary-dark': '#96845E',
                background: '#FFFFFF',
                foreground: '#1A1A1A',
                neutral: {
                    50: '#F9F9F9',
                    100: '#F3F3F3',
                    200: '#E8E8E8',
                    300: '#DDDDDD',
                    400: '#CCCCCC',
                    500: '#999999',
                    600: '#666666',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                },
            },
            fontFamily: {
                arabic: ['arabicc', 'sans-serif'],
                gaza: ['DG-Gaza', 'serif'],
                geist: ['GeistVF', 'sans-serif'],
                geistMono: ['GeistMonoVF', 'monospace'],
                lantx: ['LANTX', 'serif'],
                rubik: ['var(--font-rubik)', 'Arial', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
            },
            boxShadow: {
                'soft': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
                'medium': '0 8px 30px 0 rgba(0, 0, 0, 0.1)',
            },
            gridTemplateColumns: {
                'fluid': 'repeat(auto-fill, minmax(300px, 1fr))',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
