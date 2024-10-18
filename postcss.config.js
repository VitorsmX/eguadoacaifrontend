module.exports = {
  plugins: {
    'tailwindcss': {},
    'postcss-import': {},
    'autoprefixer': {},
    'postcss-preset-env': {
      stage: 0,
      features: {
        'nesting-rules': true,
      },
    },
    'cssnano': {},
  },
}
