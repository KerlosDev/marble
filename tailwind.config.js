/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#C8A96A', // Gold accent
                'primary-light': '#D8BC8A',
                'primary-dark': '#B89A5A',
                background: '#FFFFFF',
                foreground: '#000000',
            },
            fontFamily: {
                arabic: ['arabicc', 'sans-serif'],
                gaza: ['DG-Gaza', 'serif'],
                geist: ['GeistVF', 'sans-serif'],
                geistMono: ['GeistMonoVF', 'monospace'],
                lantx: ['LANTX', 'serif'],
                rubik: ['Rubik', 'sans-serif'],
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
