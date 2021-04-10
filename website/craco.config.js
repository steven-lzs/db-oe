const path = require('path')

// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  publicPath: '/',
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    })
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json', '.scss'],
      alias: {
        styles: path.resolve(__dirname, 'src/assets/scss'),
      },
    },
  },
}
