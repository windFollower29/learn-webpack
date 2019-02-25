var Koa = require('koa')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')

var config = require('./webpack.config.js')
var compiler = webpack(config)

// var app = new Koa()
var app = express()

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(require("webpack-hot-middleware")(compiler, {
  log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

app.listen(3000, () => {
  console.log('server is listening on port: ', 3000)
})