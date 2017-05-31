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
  |   |-- base
  |   |-- check-versions.js // 检查node和npm版本
  |   |-- dev-client.js  // 配置开发环境客户端hot reload
  |   |-- utils.js  // 自定义style-loader
  |   |-- dev-server.js  // 配置开发服务器
  |   |-- webpack.base.conf.js  // webpack基本配置
  |   |__ webpack.dev.conf.js  // 开发环境webpack配置
  |
  |
  |-- config
  |   |-- dev.env.js  // 开发环境变量
  |   |-- index.js    // webpack配置入口
  |   |__ prod.env.js // 生产环境变量
```
