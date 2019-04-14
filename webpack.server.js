const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = 
  // webpack-isomorphic-tools settings reside in a separate .js file 
  // (because they will be used in the web server code too).
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development()

module.exports = {
	target: 'node',
	mode: 'development',
  entry: './src/server.js',
  context: path.resolve(__dirname),
	output: {
		filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
    publicPath: '/'
	},
	externals: [nodeExternals()],
	module: {
		rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },{
			test: /\.css?$/,
			use: ['isomorphic-style-loader', {
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: true,
					localIdentName: '[name]_[local]_[hash:base64:5]'
				}
			}]
    },
    // {
		// 	test: /\.(png|jpeg|jpg|gif|svg)?$/,
		// 	loader: 'url-loader',
		// 	options: {
		// 		limit: 8000,
		// 		outputPath: '../public/',
		// 		publicPath: '/'
		// 	}
    // }
  ]},
  plugins: [
    webpackIsomorphicToolsPlugin,
  ]
};
