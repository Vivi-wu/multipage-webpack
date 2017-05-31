/*If you want to use webpack-hot-middleware module with browsers that don't support eventsource, you'll need to use a polyfill*/
// https://libraries.io/search?platforms=NPM&q=eventsource+polyfill
require('eventsource-polyfill')
/*Add 'webpack-hot-middleware/client' into the entry array. This connects to the server to receive notifications when the bundle rebuilds and then updates your client bundle accordingly.*/
// https://www.npmjs.com/package/webpack-hot-middleware
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function (event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
