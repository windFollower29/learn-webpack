var path = require('path')

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/main.js',
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  // devServer: {
  //   contentBase: './dist'
  // },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}