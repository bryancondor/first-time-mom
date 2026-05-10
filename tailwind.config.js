// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:    '#fdf6f0',
        pink:     '#fda4af',
        pinkLight:'#fce7f3',
        blue:     '#93c5fd',
        blueLight:'#dbeafe',
        lavender: '#c4b5fd',
        yellow:   '#fcd34d',
        green:    '#86efac',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Lato"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
