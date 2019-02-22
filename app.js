var Koa = require('koa')
var express = require('express')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')

var config = require('./webpack.config.js')

// var app = new Koa()
var app = express()

app.use(webpackDevMiddleware(webpack(config), {
  publicPath: config.output.publicPath
}))

app.listen(3000, () => {
  console.log('server is listening on port: ', 3000)
})