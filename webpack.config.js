const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  // target: 'node',
  // externals: [nodeExternals()],
  entry: path.resolve(__dirname, './src/client.js'),
  output:{
    path: path.resolve(__dirname, 'build'),
    filename:'index.js',
    chunkFilename:'[name].js',
    publicPath: '/',
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
  plugins: [
    // new HTMLWebpackPlugin({
    //   template: './index.html',
    //   title: "testPlugin",
    //   inject: 'body',
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new ReactLoadablePlugin({
      filename: './build/react-loadable.json',
    }),
  ],
  devServer: {
    contentBase: './build',
    publicPath: '/build',
    hot: true
  },
  mode: 'development',
  // optimization: {
  //   runtimeChunk: false,
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         chunks: 'all',
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         maxAsyncRequests: 5,
  //         priority: 10,
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
}
