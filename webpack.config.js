const path = require('path');
const webpack = require('webpack');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output:{
    path: path.resolve(__dirname, 'build'),
    filename:'index.js',
    chunkFilename:'[name].js',
    publicPath: '/',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  devtool: 'inline-source-map',
  target: 'node',
  externals: [nodeExternals()],
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      title: "testPlugin",
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({ filename: './build/react-loadable.json', }),
  ],
  devServer: {
    contentBase: './build',
    publicPath: '/build',
    hot: true
  },
  mode: 'development',
}
