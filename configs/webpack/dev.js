const { resolve } = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')

const baseConfig = require('./base')

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './main.tsx',
  ],
  devServer: {
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})
