# non_spa_frontend

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

```
root
  |-- build
  |   |-- build.js              // 生产环境打包脚本
  |   |-- check-versions.js     // 检查node和npm版本
  |   |-- dev-client.js         // 开发环境客户端hot reload配置
  |   |-- utils.js              // 自定义style-loader
  |   |-- dev-server.js         // 开发服务器配置
  |   |-- webpack.base.conf.js  // 公用webpack基本配置
  |   |-- webpack.dev.conf.js   // 开发环境webpack配置
  |   |__ webpack.prod.conf.js  // 生产环境webpack配置
  |
  |-- config
  |   |-- dev.env.js  // 开发环境变量
  |   |-- index.js    // webpack配置入口
  |   |__ prod.env.js // 生产环境变量
```
