module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-image': "url('../images/a.jpg')",
      },
    },
  },
  plugins: [],
}