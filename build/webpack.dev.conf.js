var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

var devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

// https://github.com/ampedandwired/html-webpack-plugin
/**
 * 每个配置对应于一个页面，有几个需要写几个
 * filename: webpack编译指定文件，由html-webpack-plugin储存为html文件到输出目录。默认文件名为index.html
 * template: 指定入口的html文件路径
 * chunks: Limit the chunks being used
 * inject: When passing true or 'body' all javascript resources will be
   placed at the bottom of the body element
 */
var filename = ''
config.build.entries.forEach(function(fname) {
  if (fname === 'home') {
    filename = 'index.html'
  } else {
    filename = fname + '.html'
  }

  devWebpackConfig.plugins.push(new HtmlWebpackPlugin({
    'filename': filename,
    'template': './src/pages/'+ fname +'/index.html',
    'chunks': [fname],
    'inject': true
  }))
})

module.exports = devWebpackConfig
