const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // target: 'node',
  // externals: [nodeExternals()],
  entry: path.resolve(__dirname, './src/client.js'),
  output:{
    path: path.resolve(__dirname, 'build'),
    filename:'index.js',
    chunkFilename:'[name].js',
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      { 
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // "style-loader",
          // "postcss-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './build'
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]--[hash:base64:5]',
              sourceMap: true,
            }
          },
        ]
      },
      // {
      //   test: /\.css$/,
      //   // use: ["style-loader", "css-loader", "postcss-loader"]
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader,
      //       // options: {
      //         // you can specify a publicPath here
      //         // by default it use publicPath in webpackOptions.output
      //       //   publicPath: './build'
      //       // }
      //     },
      //     "style-loader",
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true
      //       }
      //     },
      //     // "style-loader",
      //     "postcss-loader"
      //   ]
      // }
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    contentBase: './',
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
