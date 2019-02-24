var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  // entry: {
  //   index: './src/main.js',
  //   app: './src/app.js'
  // },
  entry: [
    // 'react-dev-utils/webpackHotDevClient',
    // require.resolve('react-dev-utils/webpackHotDevClient'),
    // 'react-hot-loader/patch',
    // 'webpack-dev-server/client?http://localhost:8080/',
    // 'webpack/hot/only-dev-server',
    './src/main.js'
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json',
    //   publicPath: publicPath,
    // })
  ]
}