var path = require('path')
var utils = require('./utils')
var config = require('../config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// 遍历入口文件夹列表，生成入口配置对象
var entryConfig = {}
config.build.entries.forEach(function(fname) {
  entryConfig[fname] = './src/pages/'+ fname +'/index.js'
})

module.exports = {
  entry: entryConfig,
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    // 指定静态资源url的路径前缀
    publicPath: process.env.NODE_ENV === 'development'
      ? config.dev.assetsPublicPath
      : config.build.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    /*
     配置各种类型文件的加载器, 称之为loader。当webpack遇到import ... 时,
     会调用这里配置的loader对引用的文件进行编译
    */
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      /*
       使用babel编译ES6/ES7/ES8为ES5代码
       使用正则表达式匹配后缀名为.js的文件
      */
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      { // The url loader return a Data Url if the file is smaller than a byte limit.
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
