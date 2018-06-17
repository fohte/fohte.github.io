const merge = require('webpack-merge')
const { resolve } = require('path')

const baseConfig = require('./base')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: './main.tsx',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  plugins: [],
})
