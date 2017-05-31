require('./check-versions')()

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.conf')
var proxyMiddleware = require('http-proxy-middleware')

// 获取 config/index.js 的默认配置
var config = require('../config')
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
/*default port where dev server listens for incoming traffic
如果没有指定运行端口，使用 config.dev.port 作为运行端口*/
var port = process.env.PORT || config.dev.port
var uri = 'http://localhost:' + port
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)

// 使用 express 启动一个服务
var app = express()
// 启动 webpack 进行编译
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false
})


/*如果 Node 的环境无法判断当前是 dev / product 环境
使用 config.dev.env.NODE_ENV 作为当前的环境*/
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
app.use(staticPath, express.static('./static'))


var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
