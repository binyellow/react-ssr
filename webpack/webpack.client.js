const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const clientConfig = {
	mode: 'development',
	entry: path.join(__dirname, '../src/client'),
	output: {
		filename: 'index.js',
		path: path.join(__dirname, '../build')
	},
	module: {
		rules: [{
			test: /\.css?$/,
			use: ['style-loader', {
				loader: 'css-loader',
				options: {
					importLoaders: 1,
					modules: true,
					localIdentName: '[name]_[local]_[hash:base64:5]'
				}
			}]
		},{
			test: /\.(png|jpeg|jpg|gif|svg)?$/,
			loader: 'url-loader',
			options: {
				limit: 8000,
				publicPath: '/'
			}
		}]
  },
  devServer: {
    contentBase: path.join(__dirname, '../'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new OpenBrowserPlugin({ url: 'http://localhost:9000' }),
  ]
};

module.exports = merge(config, clientConfig);