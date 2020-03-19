var webpack = require("webpack"),
  merge = require('webpack-merge'),
  baseWebpackConfig = require('./webpack.base.config'),
  proxy = require("./proxy");

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      '__DEV__': true
    })
  ],
  devServer: {
    inline: true,
    proxy: proxy,
    disableHostCheck: true,
    port: Number(process.env.VUE_PORT) - 1 || 3000,
  }
})

console.log("initializing webpack developent build....");
